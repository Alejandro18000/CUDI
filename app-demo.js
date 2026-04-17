// ---- ESTADO Y DATOS SINCRONIZADOS ----
let appCart = JSON.parse(localStorage.getItem('cudi_cart')) || [];
let activeDynamicProduct = null;
let checkoutStep = 1;
let selectedPayMethod = 'card';
let petProfile = {};

function saveAppCart() {
    localStorage.setItem('cudi_cart', JSON.stringify(appCart));
    updateCartUI();
}

function updateCartUI() {
    const badge = document.getElementById('app-cart-badge');
    const floatCount = document.getElementById('cart-float-count');
    const floatBtn = document.getElementById('cart-float-btn');
    let totalItems = appCart.reduce((acc, item) => acc + item.qty, 0);
    if (badge) badge.innerText = totalItems;
    if (floatCount) floatCount.innerText = totalItems;
    if (floatBtn) floatBtn.style.display = totalItems > 0 ? 'flex' : 'none';
    renderInlineCart();
}

function renderInlineCart() {
    const container = document.getElementById('inline-cart-items');
    if (!container) return;
    if (appCart.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#94a3b8; font-size:0.8rem; padding:10px;">El carrito está vacío</p>';
        return;
    }
    container.innerHTML = appCart.map((item, idx) => `
        <div style="display:flex; align-items:center; gap:10px; padding:8px 0; border-bottom:1px solid #f1f5f9;">
            <div style="width:40px; height:40px; border-radius:8px; background:url('${item.img}') center/cover; background-color:#e2e8f0; flex-shrink:0;"></div>
            <div style="flex:1; min-width:0;">
                <div style="font-weight:700; font-size:0.8rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.name}</div>
                <div style="font-size:0.75rem; color:var(--app-primary); font-weight:700;">${item.price.toFixed(2)} €</div>
            </div>
            <div style="display:flex; align-items:center; gap:6px;">
                <button onclick="changeCartQty(${idx}, -1)" style="width:24px; height:24px; border-radius:50%; border:1px solid #e2e8f0; background:white; cursor:pointer; font-weight:700; display:flex; align-items:center; justify-content:center; font-size:0.85rem;">-</button>
                <span style="font-weight:700; font-size:0.85rem; min-width:16px; text-align:center;">${item.qty}</span>
                <button onclick="changeCartQty(${idx}, 1)" style="width:24px; height:24px; border-radius:50%; border:none; background:var(--app-primary); color:white; cursor:pointer; font-weight:700; display:flex; align-items:center; justify-content:center; font-size:0.85rem;">+</button>
            </div>
        </div>
    `).join('');
    const total = appCart.reduce((a, i) => a + i.price * i.qty, 0);
    const totalEl = document.getElementById('inline-cart-total');
    if (totalEl) totalEl.textContent = total.toFixed(2) + ' €';
}

function changeCartQty(idx, delta) {
    appCart[idx].qty += delta;
    if (appCart[idx].qty <= 0) appCart.splice(idx, 1);
    saveAppCart();
}

function addToAppCart(name, price, img = '') {
    const existing = appCart.find(i => i.name === name);
    if (existing) {
        existing.qty++;
    } else {
        appCart.push({ name, price, qty: 1, img });
    }
    saveAppCart();

    // Mostrar el panel del carrito
    const panel = document.getElementById('inline-cart-panel');
    if (panel) panel.style.display = 'block';

    // Toast rápido
    if (typeof showCudiToast === 'function') showCudiToast(`"${name}" añadido al carrito ✓`);
}

function toggleInlineCart() {
    const panel = document.getElementById('inline-cart-panel');
    if (panel) panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

// ---- REGISTRO DINÁMICO ----
const BREEDS = {
    perro: ['Golden Retriever','Labrador','Pastor Alemán','Bulldog Francés','Beagle','Poodle','Chihuahua','Husky Siberiano','Yorkshire Terrier','Mestizo'],
    gato: ['Europeo Común','Persa','Maine Coon','Ragdoll','Siamés','Bengalí','British Shorthair','Scottish Fold','Abisinio','Mestizo']
};

const CARE_BY_AGE = {
    cachorro: {
        label: 'Cuidados de Cachorro',
        perro: ['Vacunación primaria (6-8 semanas)', 'Socialización temprana (hasta 16 semanas)', 'Entrenamiento básico y límites', 'Dieta específica para crecimiento'],
        gato: ['Vacunación: triple felina y rabia', 'Destete y socialización', 'Revisión parasitaria', 'Dieta alta en proteínas para crecimiento'],
        special: ['Vacunación temprana', 'Socialización', 'Control crecimiento']
    },
    joven: {
        label: 'Cuidados de Joven Activo',
        perro: ['Esterilización recomendada (6-18 meses)', 'Ejercicio diario >= 45 min', 'Educación avanzada y agility', 'Desparasitación trimestral'],
        gato: ['Esterilización/castración (5-7 meses)', 'Enriquecimiento ambiental', 'Revisión oftalmológica', 'Dieta equilibrada activa'],
        special: ['Esterilización', 'Ejercicio intensivo', 'Control peso']
    },
    adulto: {
        label: 'Cuidados de Adulto',
        perro: ['Revisión anual completa', 'Profilaxis dental bianual', 'Mantenimiento de peso', 'Análisis de sangre rutinario'],
        gato: ['Análisis de orina anual', 'Limpieza dental', 'Control peso y dieta', 'Revisión de tiroides (>6 años)'],
        special: ['Revisión anual', 'Dental', 'Análisis sangre']
    },
    senior: {
        label: 'Cuidados Senior',
        perro: ['Revisiones semestrales obligatorias', 'Control articular y movilidad', 'Dieta baja en fósforo', 'Análisis renal y hepático'],
        gato: ['Revisiones cada 4 meses', 'Detección precoz de hipertiroidismo', 'Dieta húmeda renal', 'Control presión arterial'],
        special: ['Revisión semestral', 'Dieta renal', 'Control articular']
    }
};

const PET_AVATAR = {
    perro: 'avatar-mascota-perfil-gemelo-digital.png',
    gato: 'avatar-mascota-perfil-gemelo-digital.png'
};

function onPetTypeChange() {
    const type = document.getElementById('pet-type').value;
    const breedGroup = document.getElementById('breed-group');
    const breedSelect = document.getElementById('pet-breed');
    const hero = document.getElementById('onboarding-hero');

    if (!type) { breedGroup.style.display = 'none'; return; }

    breedGroup.style.display = 'block';
    breedSelect.innerHTML = '<option value="">Selecciona la raza</option>';
    (BREEDS[type] || []).forEach(b => {
        breedSelect.innerHTML += `<option value="${b}">${b}</option>`;
    });

    // Cambiar imagen de fondo según especie
    if (hero) {
        hero.style.backgroundImage = type === 'perro'
            ? "url('bienestar-integral-perros-gatos.png')"
            : "url('dietas-personalizadas-longevidad-mascotas.png')";
    }

    // Actualizar etiqueta de alimentación
    const foodLabel = document.getElementById('food-label');
    if (foodLabel) foodLabel.textContent = type === 'gato' ? 'Preferencia Alimentaria' : 'Tipo de Alimentación';

    onPetAgeChange(); // actualizar cuidados también
}

function onPetAgeChange() {
    const age = document.getElementById('pet-age').value;
    const type = document.getElementById('pet-type').value;
    const careGroup = document.getElementById('special-care-group');
    const careLabel = document.getElementById('special-care-label');
    const careSelect = document.getElementById('pet-care');

    if (!age) { careGroup.style.display = 'none'; return; }

    careGroup.style.display = 'block';
    const careData = CARE_BY_AGE[age];
    if (!careData) return;

    careLabel.textContent = careData.label;
    careSelect.innerHTML = '<option value="ninguno">Ninguno específico</option>';
    const items = type && careData[type] ? careData[type] : careData.special;
    items.forEach(c => {
        careSelect.innerHTML += `<option value="${c}">${c}</option>`;
    });
}

// ==== BASE DE DATOS DE SIMULACIÓN IA (LAS 8 ALERTAS TFM EMPÁTICO) ====
// Se incluyen descripciones ajustadas al TFM y referencias a 18 imágenes únicas de subproductos.
const simulatedAlerts = {
    energia: {
        title: "Picos de Energía Detectados",
        desc: "Hemos notado que tu peludo tiene muchísima vitalidad acumulada hoy. Sabemos que trabajas duro, así que te sugerimos algunas opciones para que libere toda esa fuerza de forma segura y guiada por nuestros profesionales.",
        color: "var(--app-warning)",
        options: [
            { name: "Paseo de Barrio (30 min)", price: 12.00, img: "product_paseo_1776342822512.png", partner: "Paseador de la Red CUDI", desc: "Un paseo tranquilo por sus calles favoritas." },
            { name: "Paseo de Alta Intensidad (1h)", price: 20.00, img: "product_paseo_vip_1776342839317.png", partner: "Paseador VIP CUDI", desc: "Carrera supervisada para agotar su batería." },
            { name: "Excursión Grupal con Juegos", price: 35.00, img: "product_paseo_grupo.png", partner: "Centro Recreativo", desc: "Socialización y ejercicio en manada." }
        ]
    },
    sueno: {
        title: "Descanso Intermitente",
        desc: "Anoche su sueño no fue tan profundo como de costumbre. No es motivo de alarma, pero su bienestar es tu prioridad. Una breve revisión virtual puede asegurarnos de que todo va sobre ruedas.",
        color: "var(--app-danger)",
        options: [
            { name: "Consulta Virtual por Chat", price: 15.00, img: "product_consulta_chat.png", partner: "Triaje CUDI 24/7", desc: "Resuelve dudas al instante por chat." },
            { name: "Videoconsulta Veterinaria", price: 35.00, img: "product_videoconsulta.png", partner: "Clínica Asociada", desc: "Revisión visual cara a cara con un experto." },
            { name: "Revisión Domiciliaria Exprés", price: 55.00, img: "product_vet_domicilio.png", partner: "Veterinaria Móvil", desc: "Atención premium sin salir del salón de casa." }
        ]
    },
    nutricion: {
        title: "Ajuste Nutricional Sugerido",
        desc: "El ritmo metabólico de tu compañero cambia y su dieta debe acompañarlo. Hemos calculado la ración perfecta para esta temporada, sin que tengas que medir ni preocuparte.",
        color: "var(--app-success)",
        options: [
            { name: "Pienso Estándar Ajustado (3kg)", price: 28.50, img: "prod_nutri_1.png", partner: "Tienda CUDI", desc: "Su pienso habitual, ajustado en gramaje." },
            { name: "Dieta Premium Específica (5kg)", price: 45.50, img: "prod_nutri_2.png", partner: "Nutrición a Medida CUDI", desc: "Formulación especial para su edad." },
            { name: "Plan Nutricional Orgánico Mensual", price: 85.00, img: "prod_nutri_3.png", partner: "Chef Canino B2B", desc: "Comida natural preparada al nivel humano." }
        ]
    },
    ansiedad: {
        title: "Tensión Ambiental Detectada",
        desc: "Parece que algo en el ambiente ha inquietado a tu querido amigo. Recuperar la paz en casa es fácil con un poco de ayuda extra para devolverle la tranquilidad.",
        color: "var(--app-primary-light)",
        options: [
            { name: "Difusor de Feromonas Calma", price: 21.00, img: "prod_ans_1.png", partner: "Tienda CUDI", desc: "Ambiente sereno al instante." },
            { name: "Pack Juguetes de Inteligencia", price: 14.50, img: "prod_ans_2.png", partner: "Tienda CUDI", desc: "Distracción mental para reducir nervios." },
            { name: "Terapia de Conducta Domicilio", price: 45.00, img: "prod_ans_3.png", partner: "Etólogo Asociado", desc: "Soporte psicológico profesional para él." }
        ]
    },
    prevencion: {
        title: "Escudo Preventivo Activo",
        desc: "Proteger hoy es evitar sustos mañana. Nos adelantamos a los desafíos de salud con coberturas diseñadas a la medida de tu mejor amigo.",
        color: "var(--app-primary)",
        options: [
            { name: "Ampliación de Póliza Quirúrgica", price: 12.00, img: "prod_prev_1.png", partner: "Seguros CUDI", desc: "Cobertura total de emergencias hospitalarias." },
            { name: "Desparasitación Anual a Domicilio", price: 19.50, img: "prod_prev_2.png", partner: "Mutua de Salud", desc: "Pastillas e inyecciones directas a casa." },
            { name: "Protección Total Platinum Anual", price: 35.00, img: "prod_prev_3.png", partner: "Seguros CUDI Elite", desc: "Todo incluido, 0 preocupaciones." }
        ]
    },
    rutina: {
        title: "Hora de Socializar",
        desc: "Los días pueden hacerse monótonos para ellos también. Regálale a tu peludo un día entero en compañía de nuevos amigos, volverá feliz y agotado.",
        color: "#64748B",
        options: [
            { name: "Acceso Tarde de Guardería", price: 15.00, img: "prod_rut_1.png", partner: "Guardería CUDI", desc: "Una tarde de juegos libres en grupo." },
            { name: "Sesión Juegos de Agility", price: 22.00, img: "prod_rut_2.png", partner: "Centro Etología", desc: "Ejercicio físico y mental dirigido." },
            { name: "Día Completo Resort Canino", price: 40.00, img: "prod_rut_3.png", partner: "Club Campestre", desc: "Piscina y praderas para un día inolvidable." }
        ]
    }
}


// ==== PANTALLA 1: ONBOARDING EMPATICO ====
function checkRegistration() {
    const name = document.getElementById('pet-name').value.trim();
    const type = document.getElementById('pet-type').value;
    const weight = document.getElementById('pet-weight').value.trim();
    
    const btnNext = document.getElementById('btn-next-1');
    const displayPetName = document.getElementById('display-pet-name');

    if(name !== "" && type !== "" && weight !== "") {
        btnNext.disabled = false;
        if(displayPetName) displayPetName.innerText = name;
    } else {
        btnNext.disabled = true;
    }
}

function initializeDashboard() {
    document.getElementById('screen-1').classList.remove('active');
    document.getElementById('screen-main').classList.add('active');
    document.getElementById('global-app-nav').style.display = 'flex';
    
    // Guardar perfil de la mascota
    petProfile = {
        name:   document.getElementById('pet-name').value.trim(),
        type:   document.getElementById('pet-type').value,
        breed:  document.getElementById('pet-breed')?.value || 'Mestizo',
        age:    document.getElementById('pet-age').value,
        weight: document.getElementById('pet-weight').value,
        energy: document.getElementById('pet-energy').value,
        food:   document.getElementById('pet-food').value
    };

    populatePetProfile();
    
    // Inicia Charts y simulaciones
    setTimeout(initCharts, 300);
    simulateNewNotification();

    // Nombre en el dashboard
    const displayPetName = document.getElementById('display-pet-name');
    if (displayPetName) displayPetName.innerText = petProfile.name || 'tu peque';
}

function populatePetProfile() {
    const p = petProfile;
    const typeLabels = { perro: '🐶 Perro', gato: '🐱 Gato' };
    const ageLabels  = { cachorro: '🍼 Cachorro', joven: '⚡ Joven', adulto: '🎯 Adulto', senior: '🧓 Senior' };
    const energyLabels = { tranquilo: '😴 Tranquilo', moderado: '🎾 Moderado', activo: '⚡ Activo' };
    const foodLabels = { pienso: 'Pienso Seco', barf: 'BARF Natural', mixta: 'Mixta' };

    const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val || '—'; };

    set('profile-pet-name', p.name);
    set('profile-type',   typeLabels[p.type] || p.type);
    set('profile-breed',  p.breed);
    set('profile-age',    ageLabels[p.age] || p.age);
    set('profile-weight', p.weight ? `${p.weight} kg` : '—');
    set('profile-energy', energyLabels[p.energy] || p.energy);
    set('profile-food',   foodLabels[p.food] || p.food);

    // Badge
    const badge = document.getElementById('profile-pet-badge');
    if (badge) badge.textContent = `${typeLabels[p.type] || ''}  ${ageLabels[p.age] || ''}`;

    // Avatar
    const avatar = document.getElementById('pet-avatar-display');
    if (avatar && p.type) {
        const avatarUrl = p.type === 'gato'
            ? 'dietas-personalizadas-longevidad-mascotas.png'
            : 'avatar-mascota-perfil-gemelo-digital.png';
        avatar.style.backgroundImage = `url('${avatarUrl}')`;
    }

    // Cuidados especiales
    const careCard = document.getElementById('profile-care-card');
    const careText = document.getElementById('profile-care-text');
    if (careCard && careText && p.age) {
        const careData = CARE_BY_AGE[p.age];
        if (careData) {
            const items = p.type && careData[p.type] ? careData[p.type] : careData.special;
            careText.innerHTML = items.map(c => `• ${c}`).join('<br>');
            careCard.style.display = 'block';
        }
    }
}

// ==== PANTALLA 2 A 5: NAVEGADOR DE TABS (5 TABS) ====
function switchNav(tabId, element) {
    document.querySelectorAll('.tab-view').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById(`tab-${tabId}`).classList.add('active');
    element.classList.add('active');
}

// ==== CHARTS.JS INTEGRATION (10 GRAPHICS) ====
function initCharts() {
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#64748B';

    // 1. Radar (Bio-Dash)
    new Chart(document.getElementById('chart-radar'), {
        type: 'radar',
        data: {
            labels: ['Corazón', 'Sueño', 'Movimiento', 'Relax', 'Hidratación'],
            datasets: [{
                label: 'Score Biométrico',
                data: [95, 80, 85, 90, 88],
                backgroundColor: 'rgba(0, 119, 182, 0.2)',
                borderColor: '#0077B6',
                pointBackgroundColor: '#20C997'
            }]
        },
        options: { scales: { r: { suggestedMin: 50, suggestedMax: 100 } } }
    });

    // 2. Line (BPM)
    new Chart(document.getElementById('chart-line-bpm'), {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [{
                label: 'LPM (Pulsaciones)',
                data: [60, 58, 85, 90, 82, 70],
                borderColor: '#EF476F',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(239, 71, 111, 0.1)'
            }]
        }
    });

    // 3. Polar Area (Sleep)
    new Chart(document.getElementById('chart-polar-sleep'), {
        type: 'polarArea',
        data: {
            labels: ['Sueño Profundo', 'Sueño Ligero', 'Fase REM', 'Desvelos'],
            datasets: [{
                data: [4, 3, 2, 1],
                backgroundColor: ['#48CAE4', '#0077B6', '#20C997', '#EF476F']
            }]
        }
    });

    // 4. Stacked Bar (Vax Temp)
    new Chart(document.getElementById('chart-stacked-temp'), {
        type: 'bar',
        data: {
            labels: ['Día 1', 'Día 2', 'Día 3'],
            datasets: [{ label: 'Temp Normal (°C)', data: [38.2, 38.3, 38.1], backgroundColor: '#20C997' },
                       { label: 'Febrícula', data: [0.5, 0.1, 0], backgroundColor: '#FFD166' }]
        },
        options: { scales: { x: { stacked: true }, y: { stacked: true, suggestedMin: 37 } } }
    });

    // 5. Pie (Alertas resueltas)
    new Chart(document.getElementById('chart-pie-alerts'), {
        type: 'pie',
        data: {
            labels: ['Inmune', 'Desparasitados', 'Pendientes'],
            datasets: [{ data: [70, 20, 10], backgroundColor: ['#0077B6', '#48CAE4', '#E2E8F0'] }]
        }
    });

    // 6. Area (Estrés)
    new Chart(document.getElementById('chart-area-stress'), {
        type: 'line',
        data: {
            labels: ['L', 'M', 'X', 'J', 'V'],
            datasets: [{
                label: 'Nivel Cortisol Estimado',
                data: [20, 45, 30, 25, 10],
                fill: true,
                borderColor: '#FFD166',
                backgroundColor: 'rgba(255, 209, 102, 0.3)'
            }]
        }
    });

    // 7. Bar (Actividad Semanal)
    new Chart(document.getElementById('chart-bar-weekly'), {
        type: 'bar',
        data: {
            labels: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
            datasets: [{
                label: 'Kilómetros',
                data: [2.1, 2.5, 3.0, 2.2, 4.5, 6.2, 5.0],
                backgroundColor: '#0077B6',
                borderRadius: 5
            }]
        }
    });

    // 8. Doughnut (Dieta)
    new Chart(document.getElementById('chart-doughnut-diet'), {
        type: 'doughnut',
        data: {
            labels: ['Proteína', 'Carbohidratos', 'Grasas'],
            datasets: [{ data: [65, 20, 15], backgroundColor: ['#EF476F', '#FFD166', '#20C997'] }]
        }
    });

    // 9. Bubble (Social Paseos)
    new Chart(document.getElementById('chart-bubble-social'), {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'Amigos Saludados',
                data: [{x: 10, y: 20, r: 15}, {x: 15, y: 10, r: 10}, {x: 25, y: 30, r: 25}],
                backgroundColor: 'rgba(72, 202, 228, 0.6)'
            }]
        }
    });

    // 10. Scatter (Anomalías Geográficas)
    new Chart(document.getElementById('chart-scatter-geo'), {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Zonas Frecuentes',
                data: [{x: -3.7, y: 40.4}, {x: -3.6, y: 40.5}, {x: -3.8, y: 40.3}],
                backgroundColor: '#0077B6'
            }, {
                label: 'Fugas/Anomalías',
                data: [{x: -3.9, y: 40.7}],
                backgroundColor: '#EF476F'
            }]
        }
    });
}


// ==== FLUJO DE SIMULACIÓN IA B2B ====
let scanningInterval;
function startAIAnalysis(alertKeyInput = null) {
    const btn = document.getElementById('btn-start-analysis');
    const scanningUI = document.getElementById('ai-scanning-ui');
    const statusText = document.getElementById('scanning-status');
    const progressBar = document.getElementById('scan-progress');
    
    if(btn) btn.style.display = 'none';
    scanningUI.style.display = 'block';
    progressBar.style.width = '0%';
    
    const steps = [
        "Sincronizando...",
        "Calculando métricas...",
        "Analizando historial de actividad...",
        "Cruzando datos y entorno..."
    ];
    
    let progress = 0;
    let stepIndex = 0;
    statusText.innerText = steps[0];

    scanningInterval = setInterval(() => {
        progress += 4; 
        progressBar.style.width = `${progress}%`;
        
        if (progress > 0 && progress % 25 === 0 && stepIndex < steps.length - 1) {
            stepIndex++;
            statusText.innerText = steps[stepIndex];
        }
        
        if (progress >= 100) {
            clearInterval(scanningInterval);
            statusText.innerText = "Análisis completado.";
            
            setTimeout(() => {
                let finalKey = alertKeyInput;
                if(!finalKey) {
                    const keys = Object.keys(simulatedAlerts);
                    finalKey = keys[Math.floor(Math.random() * keys.length)];
                }
                
                if(btn) btn.style.display = 'block';
                scanningUI.style.display = 'none';
                
                triggerAlert(finalKey);
            }, 500);
        }
    }, 100);
}

function triggerAlert(alertKey) {
    const data = simulatedAlerts[alertKey];
    if(!data) return;

    document.getElementById('alert-title').innerText = data.title;
    document.getElementById('alert-desc').innerText = data.desc;
    document.getElementById('screen-alert').style.borderTop = `10px solid ${data.color}`;

    const container = document.getElementById('partner-options-container');
    let htmlContent = "";
    
    data.options.forEach((opt, index) => {
        htmlContent += `
        <div class="partner-option-card" onclick="bookOption('${opt.name}', ${opt.price}, '${opt.img}')">
            <div class="partner-option-img" style="background-image:url('${opt.img}'); background-color:#e2e8f0;"></div>
            <div class="partner-option-content">
                <div style="font-size:0.7rem; color:gray; font-weight:700; text-transform:uppercase;">${opt.partner}</div>
                <div style="font-size:0.95rem; color:var(--app-text); font-weight:800; line-height:1.2; margin:2px 0;">${opt.name}</div>
                <div style="font-size:0.8rem; color:var(--app-text-muted); line-height:1.2; margin-bottom:5px;">${opt.desc}</div>
                <div style="font-weight:800; color:${data.color}; font-size:1.1rem;">
                    ${opt.price.toFixed(2)}€
                </div>
            </div>
        </div>
        `;
    });
    
    if(container) container.innerHTML = htmlContent;
    document.getElementById('screen-alert').classList.add('active');
}

function closeDynamicAlert() {
    document.getElementById('screen-alert').classList.remove('active');
}

// ==== CARRITO Y CHECKOUT 3 PASOS ====
// bookOption: puente entre alertas IA y el carrito/checkout
function bookOption(name, price, img = '') {
    addToAppCart(name, price, img);
    closeDynamicAlert();
    openFullCheckout();
}

function openFullCheckout() {
    if (appCart.length === 0) {
        if (typeof showCudiToast === 'function') showCudiToast('Añade productos al carrito primero 🛒');
        return;
    }
    checkoutStep = 1;
    selectedPayMethod = 'card';
    renderCheckoutStep1();
    document.getElementById('checkout-modal').classList.add('active');
}

function openCheckoutDemo() {
    openFullCheckout();
}

function renderCheckoutStep1() {
    checkoutStep = 1;
    const container = document.getElementById('checkout-items-detail');
    if (container) {
        container.innerHTML = appCart.map(item => `
            <div style="display:flex; align-items:center; gap:12px; background:#f8fafc; border-radius:12px; padding:12px; border:1px solid #e2e8f0;">
                <div style="width:50px; height:50px; border-radius:10px; background:url('${item.img}') center/cover; background-color:#e2e8f0; flex-shrink:0;"></div>
                <div style="flex:1;">
                    <div style="font-weight:700; font-size:0.9rem;">${item.name}</div>
                    <div style="font-size:0.8rem; color:#64748b;">Cantidad: ${item.qty}</div>
                </div>
                <div style="font-weight:800; color:var(--app-primary);">${(item.price * item.qty).toFixed(2)}€</div>
            </div>
        `).join('');
    }
    const total = appCart.reduce((a, i) => a + i.price * i.qty, 0);
    const sub = document.getElementById('chk-subtotal');
    const tot = document.getElementById('chk-total');
    if (sub) sub.textContent = total.toFixed(2) + ' €';
    if (tot) tot.textContent = total.toFixed(2) + ' €';
    
    setCheckoutUI(1, 'Continuar al pago <i class="fa-solid fa-arrow-right"></i>', 'Paso 1 de 3 — Tu cesta');
}

function checkoutNextStep() {
    if (checkoutStep === 1) {
        // Ir a paso 2
        checkoutStep = 2;
        document.getElementById('chk-step-1').style.display = 'none';
        document.getElementById('chk-step-2').style.display = 'block';
        document.getElementById('chk-step-3').style.display = 'none';
        setCheckoutUI(2, 'Confirmar y pagar <i class="fa-solid fa-lock"></i>', 'Paso 2 de 3 — Pago');
    } else if (checkoutStep === 2) {
        // Procesar pago
        processDemoPayment();
    } else if (checkoutStep === 3) {
        // Cerrar y continuar
        resetSimulationState();
    }
}

function setCheckoutUI(step, btnHtml, stepLabel) {
    const dots = ['chk-dot-1','chk-dot-2','chk-dot-3'];
    dots.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) el.style.background = i < step ? 'var(--app-primary)' : '#e2e8f0';
    });
    const lbl = document.getElementById('checkout-step-label');
    if (lbl) lbl.innerHTML = stepLabel;
    const btn = document.getElementById('chk-action-btn');
    if (btn) btn.innerHTML = btnHtml;
}

function selectDemoPayment(method, el) {
    selectedPayMethod = method;
    ['card','paypal','bizum','apple'].forEach(m => {
        const opt = document.getElementById(`pay-opt-${m}`);
        if (opt) {
            opt.style.background = m === method ? 'var(--app-primary)' : 'white';
            opt.style.color = m === method ? 'white' : '#475569';
            opt.style.borderColor = m === method ? 'var(--app-primary)' : '#e2e8f0';
        }
    });
}

function processDemoPayment() {
    const btn = document.getElementById('chk-action-btn');
    if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Procesando...';
        btn.disabled = true;
    }

    setTimeout(() => {
        // Generar número de tracking simulado
        const trackNum = 'CUDI-' + Math.random().toString(36).substring(2,8).toUpperCase();
        const tn = document.getElementById('tracking-number');
        if (tn) tn.textContent = trackNum;

        appCart = [];
        saveAppCart();

        // Paso 3: tracking
        checkoutStep = 3;
        document.getElementById('chk-step-1').style.display = 'none';
        document.getElementById('chk-step-2').style.display = 'none';
        document.getElementById('chk-step-3').style.display = 'block';
        setCheckoutUI(3, 'Listo, entendido <i class="fa-solid fa-check"></i>', '✓ Pedido confirmado');
        if (btn) btn.disabled = false;

        // Animar timeline de tracking
        animateTracking();
    }, 2000);
}

function animateTracking() {
    const steps = [
        { dot: 'track-dot-prepare',  delay: 1500 },
        { dot: 'track-dot-transit',  delay: 3500 },
        { dot: 'track-dot-delivered',delay: 6000 }
    ];
    steps.forEach(({ dot, delay }) => {
        setTimeout(() => {
            const el = document.getElementById(dot);
            if (el) el.style.background = 'var(--app-success)';
        }, delay);
    });
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// ==== RESET PARCIAL: solo limpia la simulación, sin recargar la página ====
function resetSimulationState() {
    // Cerrar modales
    closeModal('success-modal');
    closeModal('checkout-modal');
    document.getElementById('screen-alert')?.classList.remove('active');

    // Resetear barra de progreso e interfaz de escaneo
    const progressBar = document.getElementById('scan-progress');
    if (progressBar) progressBar.style.width = '0%';
    const scanningUI = document.getElementById('ai-scanning-ui');
    if (scanningUI) scanningUI.style.display = 'none';
    const statusText = document.getElementById('scanning-status');
    if (statusText) statusText.innerText = 'Analizando telemetría...';

    // Resetear botón de pago
    const btnPay = document.getElementById('btn-pay');
    if (btnPay) {
        btnPay.innerHTML = 'Confirmar y Proteger';
        btnPay.disabled = false;
    }

    // Vaciar carrito interno (sin afectar al carrito global del sitio)
    appCart = [];
    saveAppCart();

    // Volver al tab de IA para otra simulación
    const simTab = document.querySelector('.nav-item:nth-child(2)');
    if (simTab) switchNav('sim', simTab);

    // Toast de confirmación
    setTimeout(() => {
        if (typeof showCudiToast === 'function') {
            showCudiToast('¡Pago procesado! Puedes simular otro escenario.');
        }
    }, 300);
}

// ==== SISTEMA DE NOTIFICACIONES SIMULADAS ====
let notifications = [
    { id: 1, title: "Informe Semanal Disponible", desc: "El gemelo digital ha procesado los datos de los últimos 7 días. Pulsa para ver el progreso de salud.", read: false, type: "report" },
    { id: 2, title: "Alerta de Hidratación", desc: "Se detecta un descenso del 12% en la frecuencia de ingesta de agua. Monitorizando...", read: false, type: "alert" }
];

function toggleNotifications() {
    const panel = document.getElementById('app-notifications-panel');
    if(!panel) return;
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    renderNotifications();
}

function renderNotifications() {
    const list = document.getElementById('notifications-list');
    const dot = document.getElementById('notification-dot');
    if(!list) return;

    const unread = notifications.filter(n => !n.read);
    if(dot) dot.style.display = unread.length > 0 ? 'block' : 'none';

    if(notifications.length === 0) {
        list.innerHTML = '<div style="text-align:center; padding:20px; color:#94a3b8; font-size:0.85rem;">No tienes notificaciones nuevas</div>';
        return;
    }

    list.innerHTML = notifications.map(n => `
        <div style="padding:12px; border-bottom:1px solid #f1f5f9; cursor:pointer; background:${n.read ? 'white' : 'var(--clr-primary-glow)'}; transition:all 0.2s;" onclick="readNotification(${n.id})">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                <span style="font-weight:700; font-size:0.85rem; color:var(--app-text);">${n.title}</span>
                <span style="font-size:0.7rem; color:#94a3b8;">Ahora</span>
            </div>
            <p style="margin:0; font-size:0.8rem; color:var(--app-text-muted); line-height:1.4;">${n.desc}</p>
        </div>
    `).join('');
}

function readNotification(id) {
    const n = notifications.find(notif => notif.id === id);
    if(n) n.read = true;
    renderNotifications();
    // Simulate opening the relevant tab
    if(n.type === 'report') switchNav('dash', document.querySelector('.nav-item'));
}

function markAllRead() {
    notifications.forEach(n => n.read = true);
    renderNotifications();
}

// Simular llegada de nueva notificación al iniciar demo
function simulateNewNotification() {
    setTimeout(() => {
        notifications.unshift({
            id: Date.now(),
            title: "Plan Activo: CUDI Care",
            desc: "Tu suscripción se ha sincronizado con el collar inteligente con éxito.",
            read: false,
            type: "info"
        });
        renderNotifications();
    }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    renderNotifications();
});
