/* ===================================================
   CUDI FINANCIAL SIMULATOR LOGIC (OFICIAL TFM CUDI)
   Desarrollo realizado por Sergio Alejandro Ospina Rocha
   Alineado con el Modelo Financiero Definitivo (Excel Entrega 4)
   =================================================== */

// Estado del escenario seleccionado ('negativo', 'equilibrio', 'positivo')
let currentScenarioId = 'equilibrio';

// Variables de supuestos interactivos
let current = {
    // Tarifas y Precios (EUR)
    premiumPrice: 30.00,
    collarPrice: 89.50,
    shieldPrice: 18.00,
    vethomePrice: 75.00,
    marketplaceMargin: 5.00,

    // Crecimiento y Fidelización
    organicGrowth: 8.0,
    conversionRate: 2.0,
    churnRate: 4.8,
    cplPaid: 11.0,

    // Tasas de Agregación
    shieldAttach: 30.0,
    vethomeVisitRate: 4.5,
    marketplacePurchaseRate: 20.0,

    // Multiplicadores OPEX
    staffSalaryMultiplier: 100,
    fixedOpexMultiplier: 100
};

// Proyecciones calculadas (60 meses)
let monthlyProjections = [];

// Instancias de Chart.js
let plChart = null;
let cashChart = null;
let scenariosChart = null;
let revenueMixChart = null;

// Mes seleccionado para el detalle (0-59, 11 = Dic-26 Break-Even)
let selectedMonthIndex = 11;

// Nombres de los 60 meses (Ene-26 a Dic-30)
const MONTH_NAMES = [];
const years = [2026, 2027, 2028, 2029, 2030];
const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
for (let y of years) {
    for (let m of months) {
        MONTH_NAMES.push(`${m}-${y.toString().slice(-2)}`);
    }
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    initSliders();
    initMonthSelector();
    setupCollapsibleTable();
    selectScenario('equilibrio', false);
    calculateProjections();
    initCharts();
    updateUI();
});

// Selector de Escenarios
function selectScenario(scenarioId, shouldUpdate = true) {
    if (!TFM_SCENARIOS[scenarioId]) return;
    currentScenarioId = scenarioId;
    const scen = TFM_SCENARIOS[scenarioId];

    // Actualizar botones visuales
    ['negativo', 'equilibrio', 'positivo'].forEach(id => {
        const btn = document.getElementById(`btn-esc-${id}`);
        if (btn) {
            if (id === scenarioId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        }
    });

    // Actualizar pill en header de supuestos
    const tagEl = document.getElementById('active-scenario-tag');
    if (tagEl) {
        tagEl.textContent = `Activo: ${scen.name}`;
        if (scenarioId === 'negativo') {
            tagEl.style.background = '#FEE2E2';
            tagEl.style.color = '#DC2626';
        } else if (scenarioId === 'positivo') {
            tagEl.style.background = '#DCFCE7';
            tagEl.style.color = '#16A34A';
        } else {
            tagEl.style.background = '#E0F2FE';
            tagEl.style.color = '#0284C7';
        }
    }

    // Cargar parámetros por defecto del escenario
    current.organicGrowth = scen.growth;
    current.conversionRate = scen.conversion;
    current.churnRate = scen.churn;
    current.cplPaid = scen.cpl;
    current.shieldAttach = scen.shieldAttach;
    current.vethomeVisitRate = scen.vethomeRate;
    current.marketplacePurchaseRate = scen.marketRate;
    current.premiumPrice = scen.premiumPrice;
    current.shieldPrice = scen.shieldPrice;
    current.collarPrice = scen.collarPrice;
    current.vethomePrice = scen.vethomePrice;
    current.staffSalaryMultiplier = 100;
    current.fixedOpexMultiplier = 100;

    // Sincronizar sliders y valores
    syncSlidersToCurrent();

    if (shouldUpdate) {
        calculateProjections();
        updateUI();
    }
}

// Sincronizar los sliders del DOM con los valores de `current`
function syncSlidersToCurrent() {
    Object.keys(current).forEach(id => {
        const slider = document.getElementById(id);
        const valueSpan = document.getElementById(`${id}-val`);
        if (slider) {
            slider.value = current[id];
        }
        if (valueSpan) {
            updateValueDisplay(id, current[id], valueSpan);
        }
    });
}

// Toggle para colapsar / expandir el panel de supuestos
function toggleAssumptionsPanel() {
    const panel = document.getElementById("assumptions-panel");
    if (panel) {
        panel.classList.toggle("collapsed");
    }
}

// Vincula los sliders HTML con los eventos de arrastre
function initSliders() {
    const sliders = document.querySelectorAll(".sim-slider");
    sliders.forEach(slider => {
        const id = slider.id;
        const valueSpan = document.getElementById(`${id}-val`);
        
        slider.addEventListener("input", (e) => {
            let val = parseFloat(e.target.value);
            current[id] = val;
            updateValueDisplay(id, val, valueSpan);
            
            // Recalcula y actualiza gráficos y métricas
            calculateProjections();
            updateUI();
        });
    });

    // Botón de aplicar cambios
    const btnApply = document.getElementById("btn-apply-sim");
    if (btnApply) {
        btnApply.addEventListener("click", () => {
            calculateProjections();
            updateUI();
            const originalText = btnApply.innerHTML;
            btnApply.innerHTML = '<i class="fa-solid fa-check"></i> ¡Configuración Aplicada!';
            btnApply.style.background = '#10b981';
            setTimeout(() => {
                btnApply.innerHTML = originalText;
                btnApply.style.background = 'var(--clr-primary)';
            }, 1500);
        });
    }

    // Botón de restablecer
    const btnReset = document.getElementById("btn-reset-sim");
    if (btnReset) {
        btnReset.addEventListener("click", () => {
            selectScenario(currentScenarioId, true);
        });
    }

    // Botón de exportar CSV
    const btnExport = document.getElementById("btn-export-csv");
    if (btnExport) {
        btnExport.addEventListener("click", exportToCSV);
    }
}

// Actualiza el texto formateado al lado de cada slider
function updateValueDisplay(id, val, span) {
    if (!span) return;
    if (id.includes("Price") || id.includes("Margin") || id.includes("Cost") || id.includes("Budget") || id === "cplPaid") {
        span.textContent = `${val.toLocaleString("es-ES", { minimumFractionDigits: 0, maximumFractionDigits: 1 })} €`;
    } else if (id.includes("Rate") || id.includes("Growth") || id.includes("Attach") || id.includes("Percent") || id.includes("Multiplier") || id === "conversionRate" || id === "churnRate" || id === "organicGrowth") {
        span.textContent = `${val.toLocaleString("es-ES", { minimumFractionDigits: 0, maximumFractionDigits: 1 })} %`;
    } else {
        span.textContent = val.toLocaleString("es-ES");
    }
}

// Inicializa el slider del mes de inspección
function initMonthSelector() {
    const monthSlider = document.getElementById("selected-month-slider");
    const monthValSpan = document.getElementById("selected-month-val");
    if (!monthSlider || !monthValSpan) return;

    monthSlider.value = selectedMonthIndex;
    monthValSpan.textContent = `${MONTH_NAMES[selectedMonthIndex]} (Mes ${selectedMonthIndex + 1}${selectedMonthIndex === 11 ? ' - Break-Even Base' : ''})`;

    monthSlider.addEventListener("input", (e) => {
        selectedMonthIndex = parseInt(e.target.value);
        monthValSpan.textContent = `${MONTH_NAMES[selectedMonthIndex]} (Mes ${selectedMonthIndex + 1}${selectedMonthIndex === 11 ? ' - Break-Even Base' : ''})`;
        updateMonthKPIs();
        updateRevenueMixChart();
    });
}

// Tabla colapsable
function setupCollapsibleTable() {
    const panel = document.getElementById("collapsible-table-panel");
    if (!panel) return;
    const header = panel.querySelector(".sim-table-header");
    if (header) {
        header.addEventListener("click", () => {
            panel.classList.toggle("collapsed");
        });
    }
}

// MOTOR DE CÁLCULO FINANCIERO DINÁMICO (60 MESES)
function calculateProjections() {
    monthlyProjections = [];

    // Si estamos usando los supuestos base de TFM sin modificación, usamos la base oficial calibrada
    const scen = TFM_SCENARIOS[currentScenarioId];
    const isBaseEquilibrio = (currentScenarioId === 'equilibrio');

    // Factores de escala según inputs
    const pPriceRatio = current.premiumPrice / 30.0;
    const sPriceRatio = current.shieldPrice / 18.0;
    const cPriceRatio = current.collarPrice / 89.5;
    const vPriceRatio = current.vethomePrice / 75.0;

    const growthRatio = current.organicGrowth / scen.growth;
    const convRatio = current.conversionRate / scen.conversion;
    const churnRatio = current.churnRate / scen.churn;

    const salaryMult = current.staffSalaryMultiplier / 100;
    const fixedMult = current.fixedOpexMultiplier / 100;

    // Coeficiente acumulativo de escala para usuarios
    let cumulativeVolume = 1.0;
    let runningCash = 172490; // Caja inicial con ronda de inversión TFM (100k + 72.49k)

    // Coeficiente de escenario para adaptar la curva base mensual
    let scenarioScale = 1.0;
    if (currentScenarioId === 'negativo') {
        scenarioScale = 0.328; // TFM Año 1 Rev Ratio: 99.68k vs 303.74k
    } else if (currentScenarioId === 'positivo') {
        scenarioScale = 3.578; // TFM Año 1 Rev Ratio: 1.087M vs 303.74k
    }

    for (let m = 0; m < 60; m++) {
        const baseM = TFM_MONTHS_BASE[m] || TFM_MONTHS_BASE[59];
        
        // Crecimiento mensual compuesto
        if (m > 0) {
            cumulativeVolume *= Math.pow(1 + (current.organicGrowth - scen.growth) / 100, 0.5) * (convRatio / (1 + (churnRatio - 1) * 0.1));
        }

        const vol = Math.max(0.1, cumulativeVolume * scenarioScale);

        // Desglose de ingresos con escalado paramétrico
        const revPremium = baseM.rev_saas * vol * pPriceRatio;
        const revShield = baseM.rev_shield * vol * sPriceRatio * (current.shieldAttach / scen.shieldAttach);
        const revCollar = baseM.rev_collar * vol * cPriceRatio;
        const revVethome = baseM.rev_vethome * vol * vPriceRatio * (current.vethomeRate ? (current.vethomeVisitRate / scen.vethomeRate) : 1);
        const revMarketplace = baseM.rev_market * vol * (current.marketplacePurchaseRate / (scen.marketRate || 20));
        
        const totalRevenue = revPremium + revShield + revCollar + revVethome + revMarketplace;

        // COGS
        // Coste collar = 35€ manuf + 6.5€ envío = 41.5€ por collar vendido
        // Collares vendidos proporcionales a revCollar / current.collarPrice
        const collarsUnits = revCollar / (current.collarPrice || 89.5);
        const cogsHardware = collarsUnits * 41.50;
        const cogsAWS = baseM.rev_saas > 0 ? (baseM.cogs * 0.25 * vol) : 150;
        const cogsStripe = totalRevenue * 0.025; // 2.5%
        const cogsAPI = 100 + (baseM.rev_saas * 0.015 * vol);
        const totalCOGS = cogsHardware + cogsAWS + cogsStripe + cogsAPI;
        const grossProfit = totalRevenue - totalCOGS;

        // OPEX
        const staffPayroll = baseM.staff * salaryMult;
        const adsSpend = baseM.ads * (current.cplPaid / scen.cpl) * (currentScenarioId === 'negativo' ? 0.7 : currentScenarioId === 'positivo' ? 1.6 : 1.0);
        const rentAticco = 2160 * fixedMult;
        const fixedOther = (baseM.opex - baseM.staff - baseM.ads) * fixedMult;
        const totalSGA = staffPayroll + adsSpend + fixedOther;

        const netIncome = grossProfit - totalSGA; // EBITDA

        // Caja
        const netCashFlow = netIncome; // Flujo operativo aproximado
        runningCash += netCashFlow;

        // Estimación de clientes activos y nuevos
        const activePremium = Math.round(revPremium / (current.premiumPrice || 30));
        const newCustTotal = Math.round(collarsUnits);

        monthlyProjections.push({
            monthIndex: m,
            monthName: MONTH_NAMES[m],
            activePremium,
            newCustTotal,
            // Ingresos
            revPremium,
            revShield,
            revCollar,
            revVethome,
            revMarketplace,
            totalRevenue,
            // COGS
            cogsAWS,
            cogsStripe,
            cogsAPI,
            cogsCollarHard: cogsHardware,
            totalCOGS,
            grossProfit,
            // OPEX
            staffPayroll,
            adsSpend,
            rentAticco,
            fixedOpexOther: fixedOther,
            totalSGA,
            netIncome,
            // Caja
            netCashFlow,
            endingCash: runningCash,
            cashOutCAPEX: m === 0 ? 36943 : 0
        });
    }
}

// Actualiza toda la interfaz
function updateUI() {
    updateMonthKPIs();
    updateCharts();
    updateAnnualTable();
}

// Actualiza las tarjetas KPI y el desglose del mes
function updateMonthKPIs() {
    const data = monthlyProjections[selectedMonthIndex];
    if (!data) return;

    // Ingresos
    document.getElementById("kpi-revenue-val").textContent = `${Math.round(data.totalRevenue).toLocaleString("es-ES")} €`;
    document.getElementById("kpi-cogs-val").textContent = `${Math.round(data.totalCOGS).toLocaleString("es-ES")} €`;
    
    // Margen Bruto
    const marginPercent = data.totalRevenue > 0 ? (data.grossProfit / data.totalRevenue * 100) : 0;
    document.getElementById("kpi-margin-val").textContent = `${marginPercent.toFixed(1)} %`;

    // OPEX
    document.getElementById("kpi-sga-val").textContent = `${Math.round(data.totalSGA).toLocaleString("es-ES")} €`;
    
    // EBITDA
    const netEl = document.getElementById("kpi-net-val");
    netEl.textContent = `${Math.round(data.netIncome).toLocaleString("es-ES")} €`;
    if (data.netIncome >= 0) {
        netEl.style.color = "var(--clr-accent)";
        document.getElementById("kpi-net-status").textContent = "EBITDA Operativo Positivo";
    } else {
        netEl.style.color = "#ef4444";
        document.getElementById("kpi-net-status").textContent = "Net Burn (Inversión en Crecimiento)";
    }

    // Caja Disponible y Runway
    const cashEl = document.getElementById("kpi-cash-val");
    const runwayEl = document.getElementById("kpi-runway-val");
    cashEl.textContent = `${Math.round(data.endingCash).toLocaleString("es-ES")} €`;

    if (data.endingCash < 0) {
        cashEl.style.color = "#ef4444";
        runwayEl.textContent = "Déficit de Caja (Ronda requerida)";
        runwayEl.className = "runway-critical";
    } else if (data.netIncome >= 0) {
        cashEl.style.color = "#0284c7";
        runwayEl.textContent = "Superávit / Rentable";
        runwayEl.className = "runway-profitable";
    } else {
        const burnRate = Math.abs(data.netIncome);
        const runwayMonths = burnRate > 0 ? (data.endingCash / burnRate) : 99;
        cashEl.style.color = "#0284c7";
        runwayEl.textContent = `${runwayMonths.toFixed(1)} meses`;
        runwayEl.className = runwayMonths < 6 ? "runway-critical" : "sim-kpi-val";
    }

    // Inyectar en el panel de desglose detallado
    updateMonthDetails(data);
}

// Desglose del mes seleccionado
function updateMonthDetails(data) {
    document.getElementById("det-rev-premium").textContent = `${Math.round(data.revPremium).toLocaleString("es-ES")} €`;
    document.getElementById("det-rev-shield").textContent = `${Math.round(data.revShield).toLocaleString("es-ES")} €`;
    document.getElementById("det-rev-collar").textContent = `${Math.round(data.revCollar).toLocaleString("es-ES")} €`;
    document.getElementById("det-rev-vethome").textContent = `${Math.round(data.revVethome).toLocaleString("es-ES")} €`;
    document.getElementById("det-rev-market").textContent = `${Math.round(data.revMarketplace).toLocaleString("es-ES")} €`;

    document.getElementById("det-cust-premium").textContent = data.activePremium.toLocaleString("es-ES");
    document.getElementById("det-cust-new").textContent = data.newCustTotal.toLocaleString("es-ES");

    document.getElementById("det-cogs-aws").textContent = `${Math.round(data.cogsAWS).toLocaleString("es-ES")} €`;
    document.getElementById("det-cogs-api").textContent = `${Math.round(data.cogsAPI).toLocaleString("es-ES")} €`;
    document.getElementById("det-cogs-hardware").textContent = `${Math.round(data.cogsCollarHard).toLocaleString("es-ES")} €`;

    document.getElementById("det-sga-staff").textContent = `${Math.round(data.staffPayroll).toLocaleString("es-ES")} €`;
    document.getElementById("det-sga-ads").textContent = `${Math.round(data.adsSpend).toLocaleString("es-ES")} €`;
    document.getElementById("det-sga-rent").textContent = `${Math.round(data.rentAticco).toLocaleString("es-ES")} €`;
    document.getElementById("det-sga-other").textContent = `${Math.round(data.fixedOpexOther).toLocaleString("es-ES")} €`;
}

// Inicialización de los 4 Gráficos Chart.js
function initCharts() {
    const months24 = monthlyProjections.slice(0, 24);
    const labels24 = months24.map(d => d.monthName);

    // 1. P&L Chart (Bar & Line)
    const ctxPL = document.getElementById("plChart");
    if (ctxPL) {
        plChart = new Chart(ctxPL.getContext("2d"), {
            type: 'bar',
            data: {
                labels: labels24,
                datasets: [
                    {
                        label: 'Ingresos Totales',
                        data: months24.map(d => Math.round(d.totalRevenue)),
                        backgroundColor: '#0077b6',
                        borderRadius: 4
                    },
                    {
                        label: 'Costes (COGS)',
                        data: months24.map(d => Math.round(d.totalCOGS)),
                        backgroundColor: '#ef4444',
                        borderRadius: 4
                    },
                    {
                        label: 'Gastos SG&A',
                        data: months24.map(d => Math.round(d.totalSGA)),
                        backgroundColor: '#3b82f6',
                        borderRadius: 4
                    },
                    {
                        label: 'EBITDA Operativo',
                        data: months24.map(d => Math.round(d.netIncome)),
                        type: 'line',
                        borderColor: '#10b981',
                        borderWidth: 3,
                        pointRadius: 3,
                        pointBackgroundColor: '#10b981',
                        fill: false,
                        tension: 0.25
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 600, easing: 'easeOutQuart' },
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12, font: { family: 'Inter', size: 11 } } },
                    tooltip: {
                        callbacks: {
                            label: function(ctx) { return `${ctx.dataset.label}: ${Math.round(ctx.raw).toLocaleString("es-ES")} €`; }
                        }
                    }
                },
                scales: {
                    y: {
                        grid: { color: '#E2E8F0' },
                        ticks: { font: { family: 'Inter', size: 10 }, callback: v => v.toLocaleString("es-ES") + ' €' }
                    },
                    x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 10 } } }
                }
            }
        });
    }

    // 2. Cash Evolution Chart (Area Line)
    const ctxCash = document.getElementById("cashChart");
    if (ctxCash) {
        cashChart = new Chart(ctxCash.getContext("2d"), {
            type: 'line',
            data: {
                labels: labels24,
                datasets: [{
                    label: 'Caja Disponible en Cuenta',
                    data: months24.map(d => Math.round(d.endingCash)),
                    borderColor: '#0284c7',
                    backgroundColor: 'rgba(2, 132, 199, 0.12)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.3,
                    pointRadius: 3,
                    pointBackgroundColor: '#0284c7'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 600, easing: 'easeOutQuart' },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: ctx => `Caja: ${Math.round(ctx.raw).toLocaleString("es-ES")} €`
                        }
                    }
                },
                scales: {
                    y: {
                        grid: { color: '#E2E8F0' },
                        ticks: { font: { family: 'Inter', size: 10 }, callback: v => v.toLocaleString("es-ES") + ' €' }
                    },
                    x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 10 } } }
                }
            }
        });
    }

    // 3. Scenarios Comparison Chart (Grouped Bar Chart)
    const ctxScen = document.getElementById("scenariosChart");
    if (ctxScen) {
        scenariosChart = new Chart(ctxScen.getContext("2d"), {
            type: 'bar',
            data: {
                labels: ['Año 1 (2026)', 'Año 2 (2027)', 'Año 3 (2028)'],
                datasets: [
                    {
                        label: 'Negativo (Pesimista)',
                        data: [TFM_SCENARIOS.negativo.summary.y1_rev, TFM_SCENARIOS.negativo.summary.y2_rev, TFM_SCENARIOS.negativo.summary.y3_rev],
                        backgroundColor: '#ef4444',
                        borderRadius: 6
                    },
                    {
                        label: 'Equilibrio (Caso Base TFM)',
                        data: [TFM_SCENARIOS.equilibrio.summary.y1_rev, TFM_SCENARIOS.equilibrio.summary.y2_rev, TFM_SCENARIOS.equilibrio.summary.y3_rev],
                        backgroundColor: '#0077b6',
                        borderRadius: 6
                    },
                    {
                        label: 'Positivo (Alta Tracción)',
                        data: [TFM_SCENARIOS.positivo.summary.y1_rev, TFM_SCENARIOS.positivo.summary.y2_rev, TFM_SCENARIOS.positivo.summary.y3_rev],
                        backgroundColor: '#10b981',
                        borderRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 600 },
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12, font: { family: 'Inter', size: 11 } } },
                    tooltip: {
                        callbacks: {
                            label: ctx => `${ctx.dataset.label}: ${Math.round(ctx.raw).toLocaleString("es-ES")} €`
                        }
                    }
                },
                scales: {
                    y: {
                        grid: { color: '#E2E8F0' },
                        ticks: { font: { family: 'Inter', size: 10 }, callback: v => (v >= 1000000 ? (v / 1000000).toFixed(1) + ' M€' : (v / 1000).toFixed(0) + ' K€') }
                    },
                    x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 10 } } }
                }
            }
        });
    }

    // 4. Revenue Mix Doughnut Chart
    const ctxMix = document.getElementById("revenueMixChart");
    if (ctxMix) {
        const curM = monthlyProjections[selectedMonthIndex];
        revenueMixChart = new Chart(ctxMix.getContext("2d"), {
            type: 'doughnut',
            data: {
                labels: ['SaaS Premium Care', 'CUDI Shield', 'Smart Collar HW', 'VetHome', 'Marketplace'],
                datasets: [{
                    data: curM ? [
                        Math.round(curM.revPremium),
                        Math.round(curM.revShield),
                        Math.round(curM.revCollar),
                        Math.round(curM.revVethome),
                        Math.round(curM.revMarketplace)
                    ] : [1000, 300, 2000, 200, 50],
                    backgroundColor: ['#0077b6', '#0284c7', '#38bdf8', '#10b981', '#f59e0b'],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 500 },
                plugins: {
                    legend: { position: 'right', labels: { boxWidth: 12, font: { family: 'Inter', size: 11 } } },
                    tooltip: {
                        callbacks: {
                            label: ctx => `${ctx.label}: ${Math.round(ctx.raw).toLocaleString("es-ES")} €`
                        }
                    }
                },
                cutout: '65%'
            }
        });
    }
}

// Actualiza los gráficos existentes con animación
function updateCharts() {
    const months24 = monthlyProjections.slice(0, 24);
    const labels24 = months24.map(d => d.monthName);

    if (plChart) {
        plChart.data.labels = labels24;
        plChart.data.datasets[0].data = months24.map(d => Math.round(d.totalRevenue));
        plChart.data.datasets[1].data = months24.map(d => Math.round(d.totalCOGS));
        plChart.data.datasets[2].data = months24.map(d => Math.round(d.totalSGA));
        plChart.data.datasets[3].data = months24.map(d => Math.round(d.netIncome));
        plChart.update();
    }

    if (cashChart) {
        cashChart.data.labels = labels24;
        cashChart.data.datasets[0].data = months24.map(d => Math.round(d.endingCash));
        const hasNegative = months24.some(d => d.endingCash < 0);
        if (hasNegative) {
            cashChart.data.datasets[0].borderColor = '#ef4444';
            cashChart.data.datasets[0].backgroundColor = 'rgba(239, 68, 68, 0.12)';
            cashChart.data.datasets[0].pointBackgroundColor = '#ef4444';
        } else {
            cashChart.data.datasets[0].borderColor = '#0284c7';
            cashChart.data.datasets[0].backgroundColor = 'rgba(2, 132, 199, 0.12)';
            cashChart.data.datasets[0].pointBackgroundColor = '#0284c7';
        }
        cashChart.update();
    }

    updateRevenueMixChart();
}

// Actualiza el gráfico de donut de líneas de negocio
function updateRevenueMixChart() {
    if (!revenueMixChart) return;
    const curM = monthlyProjections[selectedMonthIndex];
    if (!curM) return;

    revenueMixChart.data.datasets[0].data = [
        Math.round(curM.revPremium),
        Math.round(curM.revShield),
        Math.round(curM.revCollar),
        Math.round(curM.revVethome),
        Math.round(curM.revMarketplace)
    ];
    revenueMixChart.update();
}

// Actualiza la tabla de 5 años consolidada
function updateAnnualTable() {
    const tbody = document.getElementById("annual-table-body");
    if (!tbody) return;

    const yearsData = [];
    for (let y = 0; y < 5; y++) {
        yearsData.push({
            activeUsers: 0,
            revPremium: 0,
            revShield: 0,
            revCollar: 0,
            revVethome: 0,
            revMarket: 0,
            totalRevenue: 0,
            totalCOGS: 0,
            grossProfit: 0,
            staffPayroll: 0,
            adsSpend: 0,
            otherSGA: 0,
            totalSGA: 0,
            netIncome: 0,
            endingCash: 0,
            capexOutflow: 0
        });
    }

    for (let m = 0; m < 60; m++) {
        const yIdx = Math.floor(m / 12);
        const data = monthlyProjections[m];

        yearsData[yIdx].revPremium += data.revPremium;
        yearsData[yIdx].revShield += data.revShield;
        yearsData[yIdx].revCollar += data.revCollar;
        yearsData[yIdx].revVethome += data.revVethome;
        yearsData[yIdx].revMarket += data.revMarketplace;
        yearsData[yIdx].totalRevenue += data.totalRevenue;
        yearsData[yIdx].totalCOGS += data.totalCOGS;
        yearsData[yIdx].grossProfit += data.grossProfit;
        yearsData[yIdx].staffPayroll += data.staffPayroll;
        yearsData[yIdx].adsSpend += data.adsSpend;
        yearsData[yIdx].otherSGA += (data.totalSGA - data.staffPayroll - data.adsSpend);
        yearsData[yIdx].totalSGA += data.totalSGA;
        yearsData[yIdx].netIncome += data.netIncome;
        yearsData[yIdx].capexOutflow += data.cashOutCAPEX;

        if (m % 12 === 11) {
            yearsData[yIdx].activeUsers = data.activePremium;
            yearsData[yIdx].endingCash = data.endingCash;
        }
    }

    let html = `
        <tr>
            <td>Clientes Activos Premium Care (Fin de Año)</td>
            ${yearsData.map(y => `<td>${y.activeUsers.toLocaleString("es-ES")}</td>`).join('')}
        </tr>
        
        <tr class="table-row-group">
            <td colspan="6">Ingresos (P&L)</td>
        </tr>
        <tr>
            <td>Suscripción Premium Care (SaaS)</td>
            ${yearsData.map(y => `<td>${Math.round(y.revPremium).toLocaleString("es-ES")} €</td>`).join('')}
        </tr>
        <tr>
            <td>Seguro CUDI Shield Basic</td>
            ${yearsData.map(y => `<td>${Math.round(y.revShield).toLocaleString("es-ES")} €</td>`).join('')}
        </tr>
        <tr>
            <td>Smart Collars (Hardware)</td>
            ${yearsData.map(y => `<td>${Math.round(y.revCollar).toLocaleString("es-ES")} €</td>`).join('')}
        </tr>
        <tr>
            <td>Visitas Médicas VetHome</td>
            ${yearsData.map(y => `<td>${Math.round(y.revVethome).toLocaleString("es-ES")} €</td>`).join('')}
        </tr>
        <tr>
            <td>Comisiones de Marketplace</td>
            ${yearsData.map(y => `<td>${Math.round(y.revMarket).toLocaleString("es-ES")} €</td>`).join('')}
        </tr>
        <tr class="table-row-subtotal">
            <td>INGRESOS TOTALES</td>
            ${yearsData.map(y => `<td><strong>${Math.round(y.totalRevenue).toLocaleString("es-ES")} €</strong></td>`).join('')}
        </tr>

        <tr class="table-row-group">
            <td colspan="6">Costes de Ventas (COGS)</td>
        </tr>
        <tr>
            <td>Hosting, APIs IA, Stripe & Pasarela</td>
            ${yearsData.map(y => `<td>${Math.round(y.totalCOGS * 0.35).toLocaleString("es-ES")} €</td>`).join('')}
        </tr>
        <tr>
            <td>Costes Collar Inteligente & Logística</td>
            ${yearsData.map(y => `<td>${Math.round(y.totalCOGS * 0.65).toLocaleString("es-ES")} €</td>`).join('')}
        </tr>
        <tr class="table-row-subtotal">
            <td>COGS TOTAL</td>
            ${yearsData.map(y => `<td class="negative-val">${Math.round(y.totalCOGS).toLocaleString("es-ES")} €</td>`).join('')}
        </tr>
        <tr class="table-row-subtotal" style="background:#FFFDF5;">
            <td>MARGEN BRUTO (%)</td>
            ${yearsData.map(y => `<td><strong>${(y.totalRevenue > 0 ? (y.grossProfit / y.totalRevenue * 100) : 0).toFixed(1)} %</strong></td>`).join('')}
        </tr>

        <tr class="table-row-group">
            <td colspan="6">Gastos de Estructura (SG&A)</td>
        </tr>
        <tr>
            <td>Personal & Cargas Sociales</td>
            ${yearsData.map(y => `<td>${Math.round(y.staffPayroll).toLocaleString("es-ES")} €</td>`).join('')}
        </tr>
        <tr>
            <td>Pauta Publicitaria (Ads)</td>
            ${yearsData.map(y => `<td>${Math.round(y.adsSpend).toLocaleString("es-ES")} €</td>`).join('')}
        </tr>
        <tr>
            <td>Herramientas, Oficina & Gastos Fijos</td>
            ${yearsData.map(y => `<td>${Math.round(y.otherSGA).toLocaleString("es-ES")} €</td>`).join('')}
        </tr>
        <tr class="table-row-subtotal">
            <td>SG&A OPERATIVO TOTAL</td>
            ${yearsData.map(y => `<td class="negative-val">${Math.round(y.totalSGA).toLocaleString("es-ES")} €</td>`).join('')}
        </tr>

        <tr class="table-row-total">
            <td>RESULTADO NETO / EBITDA</td>
            ${yearsData.map(y => `<td class="${y.netIncome >= 0 ? 'positive-val' : 'negative-val'}">${Math.round(y.netIncome).toLocaleString("es-ES")} €</td>`).join('')}
        </tr>

        <tr class="table-row-group">
            <td colspan="6">Flujo de Caja (Cash Flow)</td>
        </tr>
        <tr>
            <td>Inversión de Capital CAPEX Inicial</td>
            <td>${Math.round(yearsData[0].capexOutflow).toLocaleString("es-ES")} €</td>
            <td>0 €</td>
            <td>0 €</td>
            <td>0 €</td>
            <td>0 €</td>
        </tr>
        <tr class="table-row-total" style="background: rgba(245, 158, 11, 0.08);">
            <td>CAJA FINAL ACUMULADA</td>
            ${yearsData.map(y => `<td style="color:${y.endingCash >= 0 ? '#0284c7' : '#ef4444'}; font-weight:800;">${Math.round(y.endingCash).toLocaleString("es-ES")} €</td>`).join('')}
        </tr>
    `;

    tbody.innerHTML = html;
}

// Exporta las proyecciones en CSV
function exportToCSV() {
    let csv = "Mes;Mes_ID;Clientes_Activos;Nuevos_Clientes;Ingresos_SaaS;Ingresos_Shield;Ingresos_Collar;Ingresos_VetHome;Ingresos_Marketplace;Ingresos_Totales;COGS_Total;Margen_Bruto_Pct;Personal;Publicidad_Ads;Otros_SGA;SG&A_Total;EBITDA;Caja_Final\n";

    monthlyProjections.forEach(d => {
        const grossMargin = d.totalRevenue > 0 ? (d.grossProfit / d.totalRevenue * 100) : 0;
        const row = [
            d.monthName,
            d.monthIndex + 1,
            d.activePremium,
            d.newCustTotal,
            Math.round(d.revPremium),
            Math.round(d.revShield),
            Math.round(d.revCollar),
            Math.round(d.revVethome),
            Math.round(d.revMarketplace),
            Math.round(d.totalRevenue),
            Math.round(d.totalCOGS),
            grossMargin.toFixed(2),
            Math.round(d.staffPayroll),
            Math.round(d.adsSpend),
            Math.round(d.fixedOpexOther),
            Math.round(d.totalSGA),
            Math.round(d.netIncome),
            Math.round(d.endingCash)
        ];
        csv += row.join(";") + "\n";
    });

    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `cudi_simulacion_${currentScenarioId}_60_meses.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
