/* ===================================================
   CUDI FINANCIAL SIMULATOR LOGIC
   Desarrollo realizado por Sergio Alejandro Ospina Rocha
   =================================================== */

// Supuestos y valores por defecto (basados en TFM CUDI y Excel Entrega 4)
const DEFAULTS = {
    // Tarifas y Precios (EUR)
    premiumPrice: 30.00,
    shieldPrice: 18.00,
    collarPrice: 25.00,
    vethomePrice: 75.00,
    marketplaceMargin: 5.00,

    // Captación y Conversión
    conversionRate: 5.0, // en porcentaje (%)
    churnRate: 5.0,      // en porcentaje (%)
    initialTraffic: 1000,
    organicGrowth: 10.0, // en porcentaje (%)

    // Attachment Rates (Agregación)
    shieldAttach: 30.0, // %
    vethomeVisitRate: 5.0, // %
    marketplacePurchaseRate: 15.0, // %

    // Paid Marketing (Publicidad)
    paidBudgetStart: 1000,
    paidBudgetGrowth: 100,
    paidBudgetMax: 10000,
    cplPaid: 10.00,

    // COGS (Coste de Ventas)
    awsUserCost: 0.60,
    stripeFeePercent: 2.5, // %
    apiBaseFee: 100,
    apiClaudeUserCost: 0.37,
    collarHardwareCost: 25.00,
    collarDeliveryCost: 6.50,

    // Multiplicadores Operativos
    staffSalaryMultiplier: 100, // %
    fixedOpexMultiplier: 100    // %
};

// Estado actual del simulador (copia de defaults al inicio)
let current = { ...DEFAULTS };

// Proyecciones mensuales (60 meses)
let monthlyProjections = [];

// Instancias de Chart.js
let plChart = null;
let cashChart = null;

// Mes seleccionado para mostrar en el KPI y desglose (1-60)
let selectedMonthIndex = 11; // Mes 12 (Dic-26) por defecto

// Nombres de los meses (Jan-26 a Dec-30)
const MONTH_NAMES = [];
const years = [2026, 2027, 2028, 2029, 2030];
const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
for (let y of years) {
    for (let m of months) {
        MONTH_NAMES.push(`${m}-${y.toString().slice(-2)}`);
    }
}

// Inicialización del simulador
document.addEventListener("DOMContentLoaded", () => {
    initSliders();
    initMonthSelector();
    calculateProjections();
    initCharts();
    setupCollapsibleTable();
});

// Vincula los sliders HTML con los valores y actualiza dinámicamente
function initSliders() {
    const sliders = document.querySelectorAll(".sim-slider");
    sliders.forEach(slider => {
        const id = slider.id;
        const valueSpan = document.getElementById(`${id}-val`);
        
        // Carga valor por defecto
        slider.value = current[id];
        updateValueDisplay(id, current[id], valueSpan);

        // Evento de arrastre (tiempo real)
        slider.addEventListener("input", (e) => {
            let val = parseFloat(e.target.value);
            current[id] = val;
            updateValueDisplay(id, val, valueSpan);
            
            // Recalcula e inyecta actualizaciones
            calculateProjections();
            updateUI();
        });
    });

    // Botón de restablecer
    document.getElementById("btn-reset-sim").addEventListener("click", () => {
        current = { ...DEFAULTS };
        sliders.forEach(slider => {
            slider.value = current[slider.id];
            const valueSpan = document.getElementById(`${slider.id}-val`);
            updateValueDisplay(slider.id, current[slider.id], valueSpan);
        });
        calculateProjections();
        updateUI();
    });

    // Botón de exportar CSV
    document.getElementById("btn-export-csv").addEventListener("click", exportToCSV);
}

// Actualiza el indicador visual de cada slider
function updateValueDisplay(id, val, span) {
    if (!span) return;
    if (id.includes("Price") || id.includes("Margin") || id.includes("Cost") || id.includes("Budget") || id === "cplPaid") {
        span.textContent = `${val.toLocaleString("es-ES", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} €`;
    } else if (id.includes("Rate") || id.includes("Growth") || id.includes("Attach") || id.includes("Percent") || id.includes("Multiplier")) {
        span.textContent = `${val} %`;
    } else {
        span.textContent = val.toLocaleString("es-ES");
    }
}

// Inicializa el slider selector de mes del Dashboard
function initMonthSelector() {
    const monthSlider = document.getElementById("selected-month-slider");
    const monthValSpan = document.getElementById("selected-month-val");

    monthSlider.value = selectedMonthIndex;
    monthValSpan.textContent = MONTH_NAMES[selectedMonthIndex];

    monthSlider.addEventListener("input", (e) => {
        selectedMonthIndex = parseInt(e.target.value);
        monthValSpan.textContent = MONTH_NAMES[selectedMonthIndex];
        updateMonthKPIs();
    });
}

// Configuración de tabla colapsable
function setupCollapsibleTable() {
    const panel = document.getElementById("collapsible-table-panel");
    const header = panel.querySelector(".sim-table-header");
    header.addEventListener("click", () => {
        panel.classList.toggle("collapsed");
    });
}

// LÓGICA DE CÁLCULO FINANCIERO PRINCIPAL
function calculateProjections() {
    monthlyProjections = [];
    
    // Capital Inicial en caja
    let cashBalance = 100000.00;
    
    // Supuestos actuales desglosados y convertidos
    const pPrice = current.premiumPrice;
    const sPrice = current.shieldPrice;
    const cPrice = current.collarPrice;
    const vPrice = current.vethomePrice;
    const mMargin = current.marketplaceMargin;

    const conv = current.conversionRate / 100;
    const churn = current.churnRate / 100;
    const orgTrafficInit = current.initialTraffic;
    const orgGrowth = current.organicGrowth / 100;

    const sAttach = current.shieldAttach / 100;
    const vRate = current.vethomeVisitRate / 100;
    const mRate = current.marketplacePurchaseRate / 100;

    const adsStart = current.paidBudgetStart;
    const adsGrowth = current.paidBudgetGrowth;
    const adsMax = current.paidBudgetMax;
    const adsCPL = current.cplPaid;

    const awsUser = current.awsUserCost;
    const stripeFee = current.stripeFeePercent / 100;
    const apiBase = current.apiBaseFee;
    const apiClaude = current.apiClaudeUserCost;
    const collarHard = current.collarHardwareCost;
    const collarDeliv = current.collarDeliveryCost;

    const salaryMult = current.staffSalaryMultiplier / 100;
    const fixedMult = current.fixedOpexMultiplier / 100;

    let prevActivePremium = 0;

    for (let m = 0; m < 60; m++) {
        // --- 1. REVENUE ENGINE ---
        // Tráfico Orgánico
        const organicTraffic = orgTrafficInit * Math.pow(1 + orgGrowth, m);
        const newCustOrganic = Math.round(organicTraffic * conv);

        // Tráfico Pagado (Ads)
        const paidBudget = Math.min(adsMax, adsStart + m * adsGrowth);
        const newCustPaid = Math.round(paidBudget / adsCPL);

        const newCustTotal = newCustOrganic + newCustPaid;

        // Clientes Activos Premium Care (SaaS)
        let activePremium = 0;
        if (m === 0) {
            activePremium = newCustTotal;
        } else {
            activePremium = Math.round(prevActivePremium * (1 - churn) + newCustTotal);
        }

        // Attachment rates
        const activeShield = Math.round(activePremium * sAttach);
        const collarsSold = newCustTotal; // 100% de nuevos clientes compran collar
        const vethomeVisits = Math.round(activePremium * vRate);
        const marketplacePurchases = Math.round(activePremium * mRate);

        // Ingresos por línea
        const revPremium = activePremium * pPrice;
        const revShield = activeShield * sPrice;
        const revCollar = collarsSold * cPrice;
        const revVethome = vethomeVisits * vPrice;
        const revMarketplace = marketplacePurchases * mMargin;
        const totalRevenue = revPremium + revShield + revCollar + revVethome + revMarketplace;

        // --- 2. COGS (Costes Directos de Ventas) ---
        const cogsAWS = activePremium * awsUser;
        const cogsStripe = totalRevenue * stripeFee;
        const cogsAPI = apiBase + (activePremium * apiClaude);
        const cogsCollarHard = collarsSold * collarHard;
        const cogsCollarDeliv = collarsSold * collarDeliv;
        const totalCOGS = cogsAWS + cogsStripe + cogsAPI + cogsCollarHard + cogsCollarDeliv;
        const grossProfit = totalRevenue - totalCOGS;

        // --- 3. SG&A (Gastos Operativos de Estructura) ---
        // Personal (Fundadores y Contrataciones según mes de inicio en TFM)
        // CEO ($60k), COO ($50k), CTO ($65k), SrDev ($55k) -> Mes 1 (m >= 0)
        // Sr Marketer ($48k) -> Mes 2 (m >= 1)
        // Sr Sales B2B ($45k) -> Mes 3 (m >= 2)
        // CS Manager ($36k) -> Mes 5 (m >= 4)
        // Jr Dev ($40k) -> Mes 6 (m >= 5)
        // Cotizaciones / Seg Social = 30%
        let staffBase = (60000 + 50000 + 65000 + 55000) / 12 * 1.30;
        if (m >= 1) staffBase += 48000 / 12 * 1.30;
        if (m >= 2) staffBase += 45000 / 12 * 1.30;
        if (m >= 4) staffBase += 36000 / 12 * 1.30;
        if (m >= 5) staffBase += 40000 / 12 * 1.30;
        
        const staffPayroll = staffBase * salaryMult;

        // Gastos Fijos & Estructura (Entrega 4 TFM)
        const rentAticco = 2160.00 * fixedMult; // Alquiler Aticco Bogatell
        const mobileLines = 100.00 * fixedMult;
        const chatgptTeam = 112.00 * fixedMult;
        const googleWorkspace = 60.00 * fixedMult;
        const hubspotCRM = 50.00 * fixedMult;
        const mixpanelGA4 = 224.40 * fixedMult;
        const n8nCloud = 50.00 * fixedMult;
        const ohmyboxSpace = 187.00 * fixedMult;
        const stockInsurance = 49.50 * fixedMult;

        // Marketing OPEX
        const adsSpend = paidBudget; // Meta & TikTok pauta
        const techSEODev = 400.00 * fixedMult;
        const vetRedactorSEO = 400.05 * fixedMult;
        const seoSpecialist = 400.05 * fixedMult;
        const seoTools = 250.00 * fixedMult;
        const backlinksPR = 550.00 * fixedMult;
        const creativeArt = 480.00 * fixedMult;
        const influencerCPA = 300.00;
        const ambassadorsMgmt = 200.00 * fixedMult;
        const performanceTrafficker = 250.00 * fixedMult;
        const vetDashboardSaaS = 50.00 * fixedMult;
        const remarketingAds = 200.00 * fixedMult;
        const b2bPolicySubsidy = 180.00;
        const csB2bDirector = 400.05 * fixedMult;
        const crmAutomation = 300.00 * fixedMult;
        const salesNavLicenses = 160.00 * fixedMult;

        // Administración y Otros
        const accounting = 150.00 * fixedMult;
        const legalServices = 200.00 * fixedMult;
        const bankFees = 50.00;
        const travelExpenses = 100.00;

        // Amortización / Depreciación (MacBook a 4 años, intangible software/legal a 5 años)
        // MacBook Pro M5: €10,196 / 48 = €212.42/mes
        // Otros Capex (Desarrollos, marca, GDPR, etc. de Entrega 4) = 24,587.45 / 60 = 409.79/mes
        const deprMacBook = (m < 48) ? (10196 / 48) : 0;
        const deprIntangible = (m < 60) ? (24587.45 / 60) : 0;
        const depreciation = deprMacBook + deprIntangible;

        // Suma de SG&A
        const totalSGA = staffPayroll + rentAticco + mobileLines + chatgptTeam + googleWorkspace +
                         hubspotCRM + mixpanelGA4 + n8nCloud + ohmyboxSpace + stockInsurance +
                         adsSpend + techSEODev + vetRedactorSEO + seoSpecialist + seoTools +
                         backlinksPR + creativeArt + influencerCPA + ambassadorsMgmt +
                         performanceTrafficker + vetDashboardSaaS + remarketingAds +
                         b2bPolicySubsidy + csB2bDirector + crmAutomation + salesNavLicenses +
                         accounting + legalServices + bankFees + travelExpenses + depreciation;

        const netIncome = grossProfit - totalSGA; // EBITDA / Net Income para simplificar

        // --- 4. CASH FLOW STATEMENT ---
        const beginningCash = cashBalance;
        const cashIn = totalRevenue;
        const cashOutCOGS = totalCOGS;
        const cashOutSGA = totalSGA - depreciation; // Gasto de caja (sin amortización)
        
        // Inversiones CAPEX en Mes 1
        // Suma de activos fijos MacBook + desarrollos + legal + depósito Aticco ($2,160) = $36,943.45
        const cashOutCAPEX = (m === 0) ? 36943.45 : 0;

        const netCashFlow = cashIn - cashOutCOGS - cashOutSGA - cashOutCAPEX;
        cashBalance = beginningCash + netCashFlow;

        // Guardar métricas del mes
        monthlyProjections.push({
            monthIndex: m,
            monthName: MONTH_NAMES[m],
            // Tráfico e Hitos
            organicTraffic,
            newCustTotal,
            activePremium,
            activeShield,
            collarsSold,
            vethomeVisits,
            marketplacePurchases,
            // P&L
            revPremium,
            revShield,
            revCollar,
            revVethome,
            revMarketplace,
            totalRevenue,
            cogsAWS,
            cogsStripe,
            cogsAPI,
            cogsCollarHard,
            cogsCollarDeliv,
            totalCOGS,
            grossProfit,
            staffPayroll,
            rentAticco,
            adsSpend,
            depreciation,
            fixedOpexOther: totalSGA - staffPayroll - adsSpend - depreciation, // Otros costes de estructura agrupados
            totalSGA,
            netIncome,
            // Caja
            beginningCash,
            netCashFlow,
            endingCash: cashBalance,
            cashOutCAPEX
        });

        prevActivePremium = activePremium;
    }
}

// Actualiza toda la interfaz
function updateUI() {
    updateMonthKPIs();
    updateCharts();
    updateAnnualTable();
}

// Actualiza los KPIs del mes seleccionado y el desglose de costes
function updateMonthKPIs() {
    const data = monthlyProjections[selectedMonthIndex];
    if (!data) return;

    // Inyectar en tarjetas KPI
    document.getElementById("kpi-revenue-val").textContent = `${Math.round(data.totalRevenue).toLocaleString("es-ES")} €`;
    document.getElementById("kpi-cogs-val").textContent = `${Math.round(data.totalCOGS).toLocaleString("es-ES")} €`;
    
    const marginPercent = data.totalRevenue > 0 ? (data.grossProfit / data.totalRevenue * 100) : 0;
    document.getElementById("kpi-margin-val").textContent = `${marginPercent.toFixed(1)} %`;

    document.getElementById("kpi-sga-val").textContent = `${Math.round(data.totalSGA).toLocaleString("es-ES")} €`;
    
    const netEl = document.getElementById("kpi-net-val");
    netEl.textContent = `${Math.round(data.netIncome).toLocaleString("es-ES")} €`;
    if (data.netIncome >= 0) {
        netEl.style.color = "var(--clr-accent)";
    } else {
        netEl.style.color = "#ef4444";
    }

    // Runway de caja
    const runwayEl = document.getElementById("kpi-runway-val");
    if (data.netIncome >= 0) {
        runwayEl.textContent = "Rentable";
        runwayEl.className = "sim-kpi-val runway-profitable";
    } else {
        // Runway = Caja actual / Burn Rate mensual (gasto neto)
        const burnRate = -data.netIncome;
        const runway = data.endingCash / burnRate;
        if (runway <= 0) {
            runwayEl.textContent = "Sin Caja";
            runwayEl.className = "sim-kpi-val runway-critical";
        } else {
            runwayEl.textContent = `${runway.toFixed(1)} meses`;
            if (runway < 6) {
                runwayEl.className = "sim-kpi-val runway-critical";
            } else {
                runwayEl.className = "sim-kpi-val";
            }
        }
    }

    // Inyectar saldo de caja
    document.getElementById("kpi-cash-val").textContent = `${Math.round(data.endingCash).toLocaleString("es-ES")} €`;

    // Actualizar desglose detallado del mes en el panel
    updateMonthDetails(data);
}

// Inyecta el desglose del mes seleccionado en la sub-tarjeta
function updateMonthDetails(data) {
    // Ingresos
    document.getElementById("det-rev-premium").textContent = `${Math.round(data.revPremium).toLocaleString("es-ES")} €`;
    document.getElementById("det-rev-shield").textContent = `${Math.round(data.revShield).toLocaleString("es-ES")} €`;
    document.getElementById("det-rev-collar").textContent = `${Math.round(data.revCollar).toLocaleString("es-ES")} €`;
    document.getElementById("det-rev-vethome").textContent = `${Math.round(data.revVethome).toLocaleString("es-ES")} €`;
    document.getElementById("det-rev-market").textContent = `${Math.round(data.revMarketplace).toLocaleString("es-ES")} €`;

    // Clientes
    document.getElementById("det-cust-premium").textContent = data.activePremium.toLocaleString("es-ES");
    document.getElementById("det-cust-new").textContent = data.newCustTotal.toLocaleString("es-ES");

    // COGS
    document.getElementById("det-cogs-aws").textContent = `${Math.round(data.cogsAWS).toLocaleString("es-ES")} €`;
    document.getElementById("det-cogs-api").textContent = `${Math.round(data.cogsAPI).toLocaleString("es-ES")} €`;
    document.getElementById("det-cogs-hardware").textContent = `${Math.round(data.cogsCollarHard).toLocaleString("es-ES")} €`;

    // Gastos SG&A
    document.getElementById("det-sga-staff").textContent = `${Math.round(data.staffPayroll).toLocaleString("es-ES")} €`;
    document.getElementById("det-sga-ads").textContent = `${Math.round(data.adsSpend).toLocaleString("es-ES")} €`;
    document.getElementById("det-sga-rent").textContent = `${Math.round(data.rentAticco).toLocaleString("es-ES")} €`;
    document.getElementById("det-sga-other").textContent = `${Math.round(data.fixedOpexOther).toLocaleString("es-ES")} €`;
}

// Inicialización de Gráficos (Chart.js)
function initCharts() {
    // Chart 1: P&L Projections (Revenues vs COGS vs SG&A)
    const ctxPL = document.getElementById("plChart").getContext("2d");
    
    // Obtener datos iniciales (primeros 12 meses)
    const months12 = monthlyProjections.slice(0, 12);
    const labels = months12.map(d => d.monthName);
    const revData = months12.map(d => d.totalRevenue);
    const cogsData = months12.map(d => d.totalCOGS);
    const sgaData = months12.map(d => d.totalSGA);
    const netData = months12.map(d => d.netIncome);

    plChart = new Chart(ctxPL, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Ingresos',
                    data: revData,
                    backgroundColor: '#0077b6',
                    borderRadius: 4
                },
                {
                    label: 'COGS',
                    data: cogsData,
                    backgroundColor: '#ef4444',
                    borderRadius: 4
                },
                {
                    label: 'Gastos SG&A',
                    data: sgaData,
                    backgroundColor: '#3b82f6',
                    borderRadius: 4
                },
                {
                    label: 'Resultado Neto',
                    data: netData,
                    type: 'line',
                    borderColor: '#10b981',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { boxWidth: 12, font: { family: 'Inter', size: 11 } }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${Math.round(context.raw).toLocaleString("es-ES")} €`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    grid: { color: '#E2E8F0' },
                    ticks: {
                        font: { family: 'Inter', size: 10 },
                        callback: function(value) { return value.toLocaleString("es-ES") + ' €'; }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { family: 'Inter', size: 10 } }
                }
            }
        }
    });

    // Chart 2: Cash Evolution
    const ctxCash = document.getElementById("cashChart").getContext("2d");
    const cashData = months12.map(d => d.endingCash);

    cashChart = new Chart(ctxCash, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Caja Acumulada (Fin de mes)',
                data: cashData,
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.1,
                pointBackgroundColor: '#f59e0b'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Caja: ${Math.round(context.raw).toLocaleString("es-ES")} €`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    grid: { color: '#E2E8F0' },
                    ticks: {
                        font: { family: 'Inter', size: 10 },
                        callback: function(value) { return value.toLocaleString("es-ES") + ' €'; }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { family: 'Inter', size: 10 } }
                }
            }
        }
    });
}

// Actualiza los gráficos con los nuevos datos calculados
function updateCharts() {
    if (!plChart || !cashChart) return;

    // Proyecciones a 12 meses
    const months12 = monthlyProjections.slice(0, 12);
    
    // P&L Chart update
    plChart.data.datasets[0].data = months12.map(d => d.totalRevenue);
    plChart.data.datasets[1].data = months12.map(d => d.totalCOGS);
    plChart.data.datasets[2].data = months12.map(d => d.totalSGA);
    plChart.data.datasets[3].data = months12.map(d => d.netIncome);
    plChart.update();

    // Cash Chart update
    cashChart.data.datasets[0].data = months12.map(d => d.endingCash);
    
    // Si la caja cae por debajo de la reserva crítica (500 EUR), cambiamos el color a modo alerta
    const hasAlert = months12.some(d => d.endingCash < 500);
    if (hasAlert) {
        cashChart.data.datasets[0].borderColor = '#ef4444';
        cashChart.data.datasets[0].backgroundColor = 'rgba(239, 68, 68, 0.1)';
        cashChart.data.datasets[0].pointBackgroundColor = '#ef4444';
    } else {
        cashChart.data.datasets[0].borderColor = '#f59e0b';
        cashChart.data.datasets[0].backgroundColor = 'rgba(245, 158, 11, 0.1)';
        cashChart.data.datasets[0].pointBackgroundColor = '#f59e0b';
    }
    
    cashChart.update();
}

// Agrupa las proyecciones en años y renderiza en la tabla HTML consolidada
function updateAnnualTable() {
    const tbody = document.getElementById("annual-table-body");
    if (!tbody) return;

    // Inicializamos acumuladores de 5 años
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

    // Sumamos los 12 meses correspondientes a cada año
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

        // El número de usuarios activos es la foto de final de año (mes 11, 23, 35, 47, 59)
        if (m % 12 === 11) {
            yearsData[yIdx].activeUsers = data.activePremium;
            yearsData[yIdx].endingCash = data.endingCash;
        }
    }

    // Renderizar filas
    let html = `
        <!-- Clientes -->
        <tr>
            <td>Clientes Activos Premium Care (Fin de Año)</td>
            ${yearsData.map(y => `<td>${y.activeUsers.toLocaleString("es-ES")}</td>`).join('')}
        </tr>
        
        <!-- INGRESOS -->
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
            ${yearsData.map(y => `<td>${Math.round(y.totalRevenue).toLocaleString("es-ES")} €</td>`).join('')}
        </tr>

        <!-- COGS -->
        <tr class="table-row-group">
            <td colspan="6">Costes de Ventas (COGS)</td>
        </tr>
        <tr>
            <td>Hosting, Pasarela de Pago & APIs</td>
            ${yearsData.map(y => `<td>${Math.round(y.totalCOGS - (y.revCollar / current.collarPrice * (current.collarHardwareCost + current.collarDeliveryCost))).toLocaleString("es-ES")} €</td>`).join('')}
        </tr>
        <tr>
            <td>Costes Collar Inteligente & Logística</td>
            ${yearsData.map(y => `<td>${Math.round(y.revCollar / current.collarPrice * (current.collarHardwareCost + current.collarDeliveryCost)).toLocaleString("es-ES")} €</td>`).join('')}
        </tr>
        <tr class="table-row-subtotal">
            <td>COGS TOTAL</td>
            <td class="negative-val">${Math.round(yearsData[0].totalCOGS).toLocaleString("es-ES")} €</td>
            <td class="negative-val">${Math.round(yearsData[1].totalCOGS).toLocaleString("es-ES")} €</td>
            <td class="negative-val">${Math.round(yearsData[2].totalCOGS).toLocaleString("es-ES")} €</td>
            <td class="negative-val">${Math.round(yearsData[3].totalCOGS).toLocaleString("es-ES")} €</td>
            <td class="negative-val">${Math.round(yearsData[4].totalCOGS).toLocaleString("es-ES")} €</td>
        </tr>
        <tr class="table-row-subtotal" style="background:#FFFDF5;">
            <td>MARGEN BRUTO (%)</td>
            ${yearsData.map(y => `<td>${(y.totalRevenue > 0 ? (y.grossProfit / y.totalRevenue * 100) : 0).toFixed(1)} %</td>`).join('')}
        </tr>

        <!-- SG&A -->
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
            <td class="negative-val">${Math.round(yearsData[0].totalSGA).toLocaleString("es-ES")} €</td>
            <td class="negative-val">${Math.round(yearsData[1].totalSGA).toLocaleString("es-ES")} €</td>
            <td class="negative-val">${Math.round(yearsData[2].totalSGA).toLocaleString("es-ES")} €</td>
            <td class="negative-val">${Math.round(yearsData[3].totalSGA).toLocaleString("es-ES")} €</td>
            <td class="negative-val">${Math.round(yearsData[4].totalSGA).toLocaleString("es-ES")} €</td>
        </tr>

        <!-- RESULTADOS -->
        <tr class="table-row-total">
            <td>RESULTADO NETO / EBITDA</td>
            ${yearsData.map(y => `<td class="${y.netIncome >= 0 ? 'positive-val' : 'negative-val'}">${Math.round(y.netIncome).toLocaleString("es-ES")} €</td>`).join('')}
        </tr>

        <!-- CAJA -->
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
            ${yearsData.map(y => `<td>${Math.round(y.endingCash).toLocaleString("es-ES")} €</td>`).join('')}
        </tr>
    `;

    tbody.innerHTML = html;
}

// Exporta las proyecciones de 60 meses en formato CSV para su descarga
function exportToCSV() {
    let csv = "Mes;Mes_ID;Tráfico_Orgánico;Nuevos_Clientes;Clientes_Activos_Premium;Ingresos_SaaS;Ingresos_Seguro;Ingresos_Collar;Ingresos_VetHome;Ingresos_Marketplace;Ingresos_Totales;COGS_Total;Margen_Bruto;Personal;Publicidad_Ads;Estructura_Fijos;SG&A_Total;Resultado_Neto;Caja_Inicial;Flujo_Caja_Neto;Caja_Final\n";

    monthlyProjections.forEach(d => {
        const grossMargin = d.totalRevenue > 0 ? (d.grossProfit / d.totalRevenue * 100) : 0;
        const row = [
            d.monthName,
            d.monthIndex + 1,
            Math.round(d.organicTraffic),
            d.newCustTotal,
            d.activePremium,
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
            Math.round(d.beginningCash),
            Math.round(d.netCashFlow),
            Math.round(d.endingCash)
        ];
        csv += row.join(";") + "\n";
    });

    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "cudi_simulacion_financiera_5_anos.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
