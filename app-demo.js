// ============================================================
// CUDI APP DEMO — JS limpio desde cero (sin encoding errors)
// Autor: Sergio Alejandro Ospina Rocha
// ============================================================

// ---- ESTADO GLOBAL ----
let appCart = JSON.parse(localStorage.getItem('cudi_cart') || '[]');
let petProfile = {};
let checkoutStep = 1;
let selectedPayMethod = 'card';
let activePetType = 'perro';
let charts = {};

// ---- DATOS MASCOTA ----
const BREEDS = {
    perro: ['Golden Retriever','Labrador','Pastor Aleman','Bulldog Frances','Beagle','Poodle','Chihuahua','Husky Siberiano','Yorkshire Terrier','Mestizo'],
    gato:  ['Europeo Comun','Persa','Maine Coon','Ragdoll','Siames','Bengali','British Shorthair','Scottish Fold','Abisinio','Mestizo']
};

const ONBOARDING_PHOTOS = {
    perro: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
    gato:  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
    default: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=800&q=80'
};

// ---- PRODUCTOS DEMO ----
const STORE_CATEGORIES = {
    paseos: {
        label: 'Paseos & Cuidadores',
        icon: 'fa-person-walking-dog',
        color: '#dbeafe',
        iconColor: '#3b82f6',
        products: [
            { name: 'Paseo 30 min', price: 12.00, img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&q=60', partner: 'Paseador CUDI', desc: 'Paseo tranquilo por el barrio.' },
            { name: 'Paseo Alta Intensidad 1h', price: 20.00, img: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=200&q=60', partner: 'Paseador VIP', desc: 'Carrera supervisada para liberar energia.' },
            { name: 'Excursion Grupal', price: 35.00, img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=200&q=60', partner: 'Centro Recreativo', desc: 'Socializacion y ejercicio en manada.' }
        ]
    },
    clinica: {
        label: 'Veterinaria & Salud',
        icon: 'fa-stethoscope',
        color: '#fce7f3',
        iconColor: '#ec4899',
        products: [
            { name: 'Consulta Virtual Chat', price: 15.00, img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&q=60', partner: 'Triaje CUDI 24/7', desc: 'Resuelve dudas al instante.' },
            { name: 'Videoconsulta Veterinaria', price: 35.00, img: 'https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=200&q=60', partner: 'Clinica Asociada', desc: 'Revision cara a cara con experto.' },
            { name: 'Revision Domiciliaria', price: 55.00, img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=60', partner: 'Veterinaria Movil', desc: 'Atencion premium sin salir de casa.' }
        ]
    },
    estetica: {
        label: 'Estetica & Peluqueria',
        icon: 'fa-scissors',
        color: '#f0fdf4',
        iconColor: '#16a34a',
        products: [
            { name: 'Bano y Secado', price: 22.00, img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=200&q=60', partner: 'Salon CUDI', desc: 'Bano completo con secado.' },
            { name: 'Corte de Pelo Premium', price: 35.00, img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&q=60', partner: 'Estetica Top', desc: 'Corte a la moda.' },
            { name: 'Pack Completo Spa', price: 55.00, img: 'https://images.unsplash.com/photo-1560743641-3914f2c45636?w=200&q=60', partner: 'Spa Canino', desc: 'Bano, corte, masaje y tratamiento.' }
        ]
    },
    petshop: {
        label: 'Pet Shop',
        icon: 'fa-store',
        color: '#fff7ed',
        iconColor: '#ea580c',
        products: [
            { name: 'Pienso Premium 5kg', price: 28.50, img: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=200&q=60', partner: 'Tienda CUDI', desc: 'Formulacion especial para su edad.' },
            { name: 'Pack Juguetes IA', price: 14.50, img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&q=60', partner: 'Tienda CUDI', desc: 'Juguetes de inteligencia certificados.' },
            { name: 'Difusor de Feromonas', price: 21.00, img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=200&q=60', partner: 'Tienda CUDI', desc: 'Ambiente sereno para tu mascota.' }
        ]
    },
    adiestramiento: {
        label: 'Adiestramiento',
        icon: 'fa-graduation-cap',
        color: '#ede9fe',
        iconColor: '#7c3aed',
        products: [
            { name: 'Sesion Individual 60min', price: 40.00, img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&q=60', partner: 'Etologo CUDI', desc: 'Entrenamiento personalizado.' },
            { name: 'Pack 5 Sesiones', price: 180.00, img: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=200&q=60', partner: 'Centro Etologia', desc: 'Descuento del 10%.' },
            { name: 'Terapia de Conducta', price: 60.00, img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=200&q=60', partner: 'Psicologo Animal', desc: 'Soporte para comportamientos complejos.' }
        ]
    }
};

// ---- SIMULACIONES IA ----
const IA_SCENARIOS = {
    energia: {
        title: 'Picos de Energia Detectados',
        desc: 'Hemos notado que tu mascota tiene mucha vitalidad acumulada hoy. Te sugerimos opciones para que libere esa energia de forma segura.',
        color: '#f59e0b',
        options: STORE_CATEGORIES.paseos.products
    },
    sueno: {
        title: 'Descanso Interrumpido',
        desc: 'Anoche el sueno no fue tan profundo como de costumbre. Una breve revision puede asegurarnos de que todo va bien.',
        color: '#ef4444',
        options: STORE_CATEGORIES.clinica.products
    },
    nutricion: {
        title: 'Ajuste Nutricional Sugerido',
        desc: 'El ritmo metabolico de tu companion cambia y su dieta debe acompanarlo.',
        color: '#10b981',
        options: STORE_CATEGORIES.petshop.products
    },
    ansiedad: {
        title: 'Tension Ambiental Detectada',
        desc: 'Parece que algo en el ambiente ha inquietado a tu mascota. Vamos a ayudarle a recuperar la calma.',
        color: '#0077b6',
        options: STORE_CATEGORIES.petshop.products
    },
    prevencion: {
        title: 'Escudo Preventivo Activo',
        desc: 'Proteger hoy es evitar sustos manana. Nos adelantamos a los desafios de salud.',
        color: '#0077b6',
        options: STORE_CATEGORIES.clinica.products
    }
};

// ---- NOTIFICACIONES ----
const NOTIFICATIONS_DATA = [
    { title: 'Frecuencia cardiaca optima', desc: 'Tus signos vitales son excelentes hoy.', icon: 'fa-heart-pulse', color: '#10b981', time: 'Hace 5 min', read: false },
    { title: 'Recordatorio de vacuna', desc: 'Vacuna polivalente vence en 3 dias.', icon: 'fa-syringe', color: '#f59e0b', time: 'Hace 1h', read: false },
    { title: 'Paseo programado', desc: 'Tu paseador llega en 30 minutos.', icon: 'fa-person-walking-dog', color: '#0077b6', time: 'Hace 2h', read: true }
];

// ---- SOCIAL PETS ----
const SOCIAL_PETS = [
    { name: 'Max', breed: 'Labrador', dist: '0.3 km', photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100&q=60', compat: 98 },
    { name: 'Luna', breed: 'Golden Retriever', dist: '0.7 km', photo: 'luna.png', compat: 95 },
    { name: 'Simba', breed: 'Mestizo', dist: '1.1 km', photo: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=100&q=60', compat: 89 },
    { name: 'Cleo', breed: 'Beagle', dist: '1.5 km', photo: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=100&q=60', compat: 82 }
];

// ==========================
// REGISTRO / ONBOARDING
// ==========================
function selectPetType(type) {
    activePetType = type;
    document.getElementById('selected-pet-type').value = type;

    document.getElementById('btn-species-perro').classList.toggle('active', type === 'perro');
    document.getElementById('btn-species-gato').classList.toggle('active', type === 'gato');

    // Cambiar foto de fondo
    const photo = document.getElementById('onboarding-photo');
    if (photo) photo.style.backgroundImage = `url('${ONBOARDING_PHOTOS[type]}')`;

    // Cargar razas
    const breedSel = document.getElementById('pet-breed');
    if (breedSel) {
        breedSel.innerHTML = '<option value="">Selecciona raza</option>';
        (BREEDS[type] || []).forEach(b => {
            const opt = document.createElement('option');
            opt.value = b; opt.textContent = b;
            breedSel.appendChild(opt);
        });
    }
}

function initPetType() {
    selectPetType('perro');
}

function proceedToDashboard() {
    const name   = (document.getElementById('pet-name')?.value || 'Mimi').trim() || 'Mimi';
    const type   = document.getElementById('selected-pet-type')?.value || 'perro';
    const weight = document.getElementById('pet-weight')?.value || '8';
    const age    = document.getElementById('pet-age')?.value || 'explorer';
    const energy = document.getElementById('pet-energy')?.value || 'moderado';
    const food   = document.getElementById('pet-food')?.value || 'pienso';
    const breed  = document.getElementById('pet-breed')?.value || 'Mestizo';

    petProfile = { name, type, weight, age, energy, food, breed, photo: ONBOARDING_PHOTOS[type] || ONBOARDING_PHOTOS.perro };
    localStorage.setItem('cudi_pet_profile', JSON.stringify(petProfile));

    // OCULTAR onboarding (forzamos display:none porque tiene inline style)
    const onboarding = document.getElementById('screen-onboarding');
    onboarding.classList.remove('active');
    onboarding.style.display = 'none';
    const main = document.getElementById('screen-main');
    main.classList.add('active');
    main.style.display = 'flex';

    // Mostrar status bar
    const statusBar = document.getElementById('app-status-bar');
    if (statusBar) statusBar.style.display = 'flex';

    // Actualizar nombre en UI
    const statusName = document.getElementById('status-pet-name');
    if (statusName) statusName.textContent = name;
    const displayName = document.getElementById('display-pet-name');
    if (displayName) displayName.textContent = name;

    // Inicializar todo
    setTimeout(() => {
        initCharts();
        renderSocialPets();
        renderProfileCard();
        simulateNotifications();
        populateStoreCats();
    }, 200);
}

// ==========================
// TABS
// ==========================
function switchTab(tabId, el) {
    document.querySelectorAll('.tab-view').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const tab = document.getElementById('tab-' + tabId);
    if (tab) tab.classList.add('active');
    if (el) el.classList.add('active');

    // Cerrar notificaciones si estaban abiertas
    const notifPanel = document.getElementById('notif-panel');
    if (notifPanel) notifPanel.style.display = 'none';
}

// ==========================
// CHARTS (10 en tiempo real)
// ==========================
const CHART_COLORS = {
    primary: '#0077b6',
    secondary: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    purple: '#7c3aed'
};

function makeSparklineData(base, variance, count = 12) {
    return Array.from({length: count}, () => base + (Math.random() - 0.5) * variance * 2);
}

function createSparkline(id, data, color) {
    const canvas = document.getElementById(id);
    if (!canvas) return null;
    if (charts[id]) charts[id].destroy();
    const config = {
        type: 'line',
        data: {
            labels: Array(data.length).fill(''),
            datasets: [{
                data: data,
                borderColor: color,
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            },
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            scales: { x: { display: false }, y: { display: false } }
        }
    };
    charts[id] = new Chart(canvas, config);
    return charts[id];
}

function createRadarChart(id) {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    if (charts[id]) charts[id].destroy();
    charts[id] = new Chart(canvas, {
        type: 'radar',
        data: {
            labels: ['Salud', 'Energia', 'Sueno', 'Social', 'Nutricion', 'Humor'],
            datasets: [{
                label: petProfile.name || 'Mascota',
                data: [92, 85, 78, 90, 88, 95],
                backgroundColor: CHART_COLORS.primary + '20',
                borderColor: CHART_COLORS.primary,
                borderWidth: 2,
                pointBackgroundColor: CHART_COLORS.primary
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { r: { ticks: { display: false }, grid: { color: '#f1f5f9' } } }
        }
    });
}

function createBarChart(id, labels, data, color) {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    if (charts[id]) charts[id].destroy();
    charts[id] = new Chart(canvas, {
        type: 'bar',
        data: {
            labels,
            datasets: [{ data, backgroundColor: color + '80', borderColor: color, borderWidth: 2, borderRadius: 8 }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { ticks: { font: { size: 10 } } }, y: { ticks: { font: { size: 10 } } } }
        }
    });
}

function createDoughnutChart(id, labels, data, colors) {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    if (charts[id]) charts[id].destroy();
    charts[id] = new Chart(canvas, {
        type: 'doughnut',
        data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 0 }] },
        options: {
            responsive: true, maintainAspectRatio: false,
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000,
                easing: 'easeOutCirc'
            },
            plugins: { legend: { position: 'bottom', labels: { font: { size: 10 }, boxWidth: 10, padding: 8 } } },
            cutout: '65%'
        }
    });
}

function initCharts() {
    // 4 sparklines del dashboard
    createSparkline('chart-heart',  makeSparklineData(75, 10), CHART_COLORS.danger);
    createSparkline('chart-energy', makeSparklineData(82, 12), CHART_COLORS.warning);
    createSparkline('chart-sleep',  makeSparklineData(8.5, 1.5), CHART_COLORS.primary);
    createSparkline('chart-stress', makeSparklineData(25, 8), CHART_COLORS.purple);

    // Radar en dashboard
    createRadarChart('chart-radar');

    // BPM line chart
    const bpmCanvas = document.getElementById('chart-bpm');
    if (bpmCanvas) {
        if (charts['chart-bpm']) charts['chart-bpm'].destroy();
        charts['chart-bpm'] = new Chart(bpmCanvas, {
            type: 'line',
            data: {
                labels: ['00h','03h','06h','09h','12h','15h','18h','21h','24h'],
                datasets: [{
                    label: 'BPM',
                    data: [68, 65, 72, 80, 78, 85, 75, 70, 68],
                    borderColor: CHART_COLORS.danger,
                    borderWidth: 2.5,
                    fill: true,
                    backgroundColor: CHART_COLORS.danger + '15',
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: CHART_COLORS.danger
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                animation: {
                    duration: 2000,
                    easing: 'easeOutCubic'
                },
                plugins: { legend: { display: false } },
                scales: {
                    x: { ticks: { font: { size: 9 } } },
                    y: { ticks: { font: { size: 9 } }, min: 50, max: 120 }
                }
            }
        });
    }

    // Bar semanal
    createBarChart('chart-weekly',
        ['Lun','Mar','Mie','Jue','Vie','Sab','Dom'],
        [3.2, 4.5, 2.8, 5.1, 4.0, 6.3, 3.7],
        CHART_COLORS.primary
    );

    // Doughnut dieta
    createDoughnutChart('chart-diet',
        ['Proteinas', 'Grasas', 'Carbos', 'Fibra'],
        [40, 25, 25, 10],
        [CHART_COLORS.primary, CHART_COLORS.warning, CHART_COLORS.secondary, CHART_COLORS.purple]
    );

    // Pie inmunologico
    createDoughnutChart('chart-inmuno',
        ['Activa', 'Pendiente', 'Vencida'],
        [75, 15, 10],
        [CHART_COLORS.secondary, CHART_COLORS.warning, CHART_COLORS.danger]
    );

    // Area estres
    const stressCanvas = document.getElementById('chart-stress-area');
    if (stressCanvas) {
        if (charts['chart-stress-area']) charts['chart-stress-area'].destroy();
        charts['chart-stress-area'] = new Chart(stressCanvas, {
            type: 'line',
            data: {
                labels: ['Lun','Mar','Mie','Jue','Vie','Sab','Dom'],
                datasets: [{
                    label: 'Estres',
                    data: [30, 45, 28, 60, 35, 20, 25],
                    borderColor: CHART_COLORS.purple,
                    backgroundColor: CHART_COLORS.purple + '20',
                    fill: true, tension: 0.5, borderWidth: 2.5
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                animation: {
                    duration: 2000,
                    easing: 'easeOutBack'
                },
                plugins: { legend: { display: false } },
                scales: { x: { ticks: { font: { size: 9 } } }, y: { display: false } }
            }
        });
    }

    // Temperatura stacked
    const tempCanvas = document.getElementById('chart-temp');
    if (tempCanvas) {
        if (charts['chart-temp']) charts['chart-temp'].destroy();
        charts['chart-temp'] = new Chart(tempCanvas, {
            type: 'bar',
            data: {
                labels: ['Dia 1','Dia 2','Dia 3','Dia 4','Dia 5'],
                datasets: [
                    { label: 'Normal', data: [38.5, 38.3, 38.7, 38.4, 38.6], backgroundColor: CHART_COLORS.secondary + '80', borderRadius: 6, borderWidth: 0 },
                    { label: 'Elevada', data: [0, 0, 0.3, 0, 0], backgroundColor: CHART_COLORS.danger + '80', borderRadius: 6, borderWidth: 0 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { font: { size: 9 }, boxWidth: 10 } } },
                scales: { x: { stacked: true, ticks: { font: { size: 9 } } }, y: { stacked: true, ticks: { font: { size: 9 } } } }
            }
        });
    }

    // Telemetria en tiempo real
    startLiveMetrics();
}

// ---- TELEMETRIA EN TIEMPO REAL ----
function startLiveMetrics() {
    const metrics = [
        { valId: 'val-heart',  chartId: 'chart-heart',  base: 75,  var: 10,  suffix: 'bpm', color: CHART_COLORS.danger },
        { valId: 'val-energy', chartId: 'chart-energy', base: 82,  var: 12,  suffix: '%',   color: CHART_COLORS.warning },
        { valId: 'val-sleep',  chartId: 'chart-sleep',  base: 8.5, var: 1.5, suffix: 'h',   color: CHART_COLORS.primary },
        { valId: 'val-stress', chartId: 'chart-stress', base: 25,  var: 8,   suffix: '%',   color: CHART_COLORS.purple }
    ];

    setInterval(() => {
        metrics.forEach(m => {
            const val = m.base + (Math.random() - 0.5) * m.var * 2;
            const el = document.getElementById(m.valId);
            if (el) el.textContent = Number.isInteger(m.base) ? Math.round(val) : val.toFixed(1);

            const c = charts[m.chartId];
            if (c) {
                c.data.datasets[0].data.push(val);
                c.data.datasets[0].data.shift();
                c.data.labels.push('');
                c.data.labels.shift();
                c.update('none');
            }
        });
    }, 2500);
}

// ==========================
// SOCIAL PETS
// ==========================
function renderSocialPets() {
    const container = document.getElementById('social-pets-list');
    if (!container) return;
    container.innerHTML = SOCIAL_PETS.map(p => `
        <div class="pet-social-card">
            <div class="pet-avatar-sm" style="background-image:url('${p.photo}')"></div>
            <div style="flex:1;">
                <div style="font-weight:800; font-size:0.9rem;">${p.name}</div>
                <div style="font-size:0.75rem; color:var(--app-text-muted);">${p.breed} &bull; ${p.dist}</div>
            </div>
            <div style="text-align:center;">
                <div style="font-size:0.7rem; color:var(--app-text-muted); margin-bottom:2px;">Compatibilidad</div>
                <div style="font-weight:900; color:var(--app-secondary); font-size:1rem;">${p.compat}%</div>
            </div>
            <button onclick="contactPet('${p.name}')" style="background:var(--app-primary);color:white;border:none;border-radius:10px;padding:8px 12px;font-weight:700;font-size:0.75rem;cursor:pointer;">Saludar</button>
        </div>
    `).join('');
}

function contactPet(name) {
    showToast('Solicitud enviada a ' + name + '! 🐾');
}

function proposeOuting() {
    showToast('Propuesta de salida enviada a tus vecinos! 📍');
}

// ==========================
// PERFIL
// ==========================
function renderProfileCard() {
    const p = petProfile;
    const ageLabels = { primera: 'Primera Aventura', explorer: 'Energia Desatada', plenitud: 'Plenitud Vital', golden: 'Sabiduria Golden' };
    const energyLabels = { tranquilo: 'Tranquilo', moderado: 'Moderado', activo: 'Activo' };
    const foodLabels = { pienso: 'Pienso Seco', barf: 'BARF Natural', mixta: 'Mixta' };

    const els = {
        'profile-pet-name': p.name || 'Mi Mascota',
        'profile-pet-type': p.type === 'perro' ? '🐶 Perro' : '🐱 Gato',
        'profile-pet-breed': p.breed || 'Mestizo',
        'profile-pet-age': ageLabels[p.age] || '-',
        'profile-pet-weight': p.weight ? p.weight + ' kg' : '-',
        'profile-pet-energy': energyLabels[p.energy] || '-',
        'profile-pet-food': foodLabels[p.food] || '-'
    };

    Object.entries(els).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    });
}

// ==========================
// TIENDA / STORE
// ==========================
function populateStoreCats() {
    // ya renderizado en HTML estatico, solo activamos los handlers
}

function openStoreCategory(catKey) {
    const cat = STORE_CATEGORIES[catKey];
    if (!cat) return;

    const panel = document.getElementById('store-products-panel');
    if (!panel) return;

    panel.style.display = 'block';
    panel.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px;">
            <h4 style="margin:0; font-size:0.9rem; font-weight:800;">${cat.label}</h4>
            <button onclick="document.getElementById('store-products-panel').style.display='none'" style="background:#f1f5f9;border:none;border-radius:50%;width:30px;height:30px;cursor:pointer;font-size:0.9rem;">✕</button>
        </div>
        ${cat.products.map(prod => `
            <div class="product-card">
                <div class="product-img" style="background-image:url('${prod.img}')"></div>
                <div class="product-info">
                    <div class="product-name">${prod.name}</div>
                    <div style="font-size:0.75rem; color:var(--app-text-muted); margin-bottom:6px;">${prod.partner}</div>
                    <div style="font-size:0.8rem; color:var(--app-text-muted); margin-bottom:8px;">${prod.desc}</div>
                    <div style="display:flex; align-items:center; justify-content:space-between;">
                        <div class="product-price">${prod.price.toFixed(2)} &euro;</div>
                        <button onclick="addToCart('${prod.name}',${prod.price},'${prod.img}')" style="background:var(--app-primary);color:white;border:none;border-radius:10px;padding:8px 14px;font-weight:700;font-size:0.8rem;cursor:pointer;">+ Anadir</button>
                    </div>
                </div>
            </div>
        `).join('')}
    `;
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function bookOption(name, price) {
    addToCart(name, price, '');
    showToast('Cita reservada: ' + name);
}

// ==========================
// CARRITO
// ==========================
function addToCart(name, price, img) {
    const existing = appCart.find(i => i.name === name);
    if (existing) { existing.qty++; }
    else { appCart.push({ name, price, qty: 1, img }); }
    localStorage.setItem('cudi_cart', JSON.stringify(appCart));
    updateCartBadge();
    showToast(name + ' anadido al carrito ✓');
    showCartFloatBtn();
}

function updateCartBadge() {
    const total = appCart.reduce((a, i) => a + i.qty, 0);
    const badge = document.getElementById('app-cart-badge');
    if (badge) badge.textContent = total;
    const cnt = document.getElementById('cart-float-count');
    if (cnt) cnt.textContent = total;
}

function showCartFloatBtn() {
    const btn = document.getElementById('cart-float-btn');
    if (btn && appCart.length > 0) btn.style.display = 'flex';
}

function toggleInlineCart() {
    const panel = document.getElementById('inline-cart-panel');
    if (panel) panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function renderInlineCart() {
    const container = document.getElementById('inline-cart-items');
    if (!container) return;
    if (appCart.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#94a3b8;font-size:0.8rem;padding:10px;">El carrito esta vacio</p>';
        return;
    }
    container.innerHTML = appCart.map((item, i) => `
        <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #f1f5f9;">
            <div style="width:36px;height:36px;border-radius:8px;background:url('${item.img}') center/cover;background-color:#e2e8f0;flex-shrink:0;"></div>
            <div style="flex:1;min-width:0;">
                <div style="font-weight:700;font-size:0.8rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${item.name}</div>
                <div style="font-size:0.75rem;color:var(--app-primary);font-weight:700;">${item.price.toFixed(2)} &euro;</div>
            </div>
            <button onclick="changeQty(${i},-1)" style="width:24px;height:24px;border-radius:50%;border:1px solid #e2e8f0;background:white;cursor:pointer;font-weight:700;">-</button>
            <span style="font-weight:700;font-size:0.85rem;min-width:14px;text-align:center;">${item.qty}</span>
            <button onclick="changeQty(${i},1)" style="width:24px;height:24px;border-radius:50%;border:none;background:var(--app-primary);color:white;cursor:pointer;font-weight:700;">+</button>
        </div>
    `).join('');
    const total = appCart.reduce((a, i) => a + i.price * i.qty, 0);
    const el = document.getElementById('inline-cart-total');
    if (el) el.textContent = total.toFixed(2) + ' \u20ac';
}

function changeQty(idx, delta) {
    appCart[idx].qty += delta;
    if (appCart[idx].qty <= 0) appCart.splice(idx, 1);
    localStorage.setItem('cudi_cart', JSON.stringify(appCart));
    updateCartBadge();
    renderInlineCart();
}

// ==========================
// CHECKOUT 3 PASOS
// ==========================
function openFullCheckout() {
    renderInlineCart();
    checkoutStep = 1;
    updateCheckoutUI();
    document.getElementById('inline-cart-panel').style.display = 'none';

    const modal = document.getElementById('checkout-modal');
    if (modal) modal.style.display = 'flex';

    // poblar items
    const detail = document.getElementById('chk-items-detail');
    if (detail) {
        detail.innerHTML = appCart.map(item => `
            <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9;">
                <div style="width:40px;height:40px;border-radius:10px;background:url('${item.img}') center/cover;background-color:#e2e8f0;flex-shrink:0;"></div>
                <div style="flex:1;"><div style="font-weight:700;font-size:0.85rem;">${item.name}</div><div style="font-size:0.75rem;color:var(--app-text-muted);">x${item.qty}</div></div>
                <div style="font-weight:800;color:var(--app-primary);">${(item.price * item.qty).toFixed(2)} &euro;</div>
            </div>
        `).join('');
    }

    const total = appCart.reduce((a, i) => a + i.price * i.qty, 0);
    const sub = document.getElementById('chk-subtotal');
    const tot = document.getElementById('chk-total');
    if (sub) sub.textContent = total.toFixed(2) + ' \u20ac';
    if (tot) tot.textContent = total.toFixed(2) + ' \u20ac';
}

function updateCheckoutUI() {
    ['chk-step-1','chk-step-2','chk-step-3'].forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) el.style.display = i + 1 === checkoutStep ? 'block' : 'none';
    });
    const labels = ['Paso 1 de 3 - Tu cesta','Paso 2 de 3 - Datos de envio','Paso 3 de 3 - Confirmacion'];
    const lbl = document.getElementById('chk-step-label');
    if (lbl) lbl.textContent = labels[checkoutStep - 1];
    const dots = ['chk-dot-1','chk-dot-2','chk-dot-3'];
    dots.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) el.style.background = i + 1 <= checkoutStep ? 'var(--app-primary)' : 'var(--app-border)';
    });
    const btn = document.getElementById('chk-action-btn');
    if (btn) {
        if (checkoutStep === 1) btn.innerHTML = 'Continuar <i class="fa-solid fa-arrow-right"></i>';
        else if (checkoutStep === 2) btn.innerHTML = 'Confirmar Pedido <i class="fa-solid fa-lock"></i>';
        else btn.innerHTML = 'Ver seguimiento <i class="fa-solid fa-truck-fast"></i>';
    }
}

function checkoutNextStep() {
    if (checkoutStep < 3) {
        checkoutStep++;
        updateCheckoutUI();
        if (checkoutStep === 3) {
            // generar numero de pedido
            const num = 'CDI-' + Math.floor(Math.random() * 9000 + 1000) + '-' + Math.random().toString(36).substr(2,3).toUpperCase();
            const el = document.getElementById('chk-tracking-number');
            if (el) el.textContent = num;
            showOrderTracking();
            appCart = [];
            localStorage.removeItem('cudi_cart');
            updateCartBadge();
        }
    } else {
        closeModal('checkout-modal');
        showOrderSuccess();
    }
}

function showOrderTracking() {
    setTimeout(() => {
        const dot = document.getElementById('track-dot-prepare');
        if (dot) { dot.classList.add('done'); }
    }, 2000);
    setTimeout(() => {
        const dot = document.getElementById('track-dot-transit');
        if (dot) { dot.classList.add('active'); }
    }, 4000);
}

function showOrderSuccess() {
    document.getElementById('checkout-modal').style.display = 'none';
    const success = document.getElementById('order-success-screen');
    if (success) success.style.display = 'flex';
}

function closeOrderSuccess() {
    const s = document.getElementById('order-success-screen');
    if (s) s.style.display = 'none';
    switchTab('dash', document.querySelector('.nav-item'));
}

function selectPayMethod(method) {
    selectedPayMethod = method;
    ['card','paypal','bizum','apple'].forEach(m => {
        const el = document.getElementById('pay-opt-' + m);
        if (el) {
            if (m === method) {
                el.style.background = 'var(--app-primary)';
                el.style.color = 'white';
                el.style.borderColor = 'var(--app-primary)';
            } else {
                el.style.background = 'white';
                el.style.color = '#475569';
                el.style.borderColor = 'var(--app-border)';
            }
        }
    });
}

function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
}

// ==========================
// NOTIFICACIONES
// ==========================
function toggleNotifications() {
    const panel = document.getElementById('notif-panel');
    if (!panel) return;
    const isHidden = panel.style.display === 'none' || !panel.style.display;
    panel.style.display = isHidden ? 'block' : 'none';
    if (isHidden) renderNotifications();
}

function renderNotifications() {
    const list = document.getElementById('notif-list');
    if (!list) return;
    list.innerHTML = NOTIFICATIONS_DATA.map((n, i) => `
        <div style="display:flex;align-items:flex-start;gap:10px;padding:12px;border-bottom:1px solid #f1f5f9;background:${n.read ? 'white' : '#f0f9ff'};">
            <div style="width:36px;height:36px;border-radius:12px;background:${n.color}20;color:${n.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:0.95rem;">
                <i class="fa-solid ${n.icon}"></i>
            </div>
            <div style="flex:1;">
                <div style="font-weight:700;font-size:0.85rem;margin-bottom:2px;">${n.title}</div>
                <div style="font-size:0.75rem;color:var(--app-text-muted);">${n.desc}</div>
                <div style="font-size:0.7rem;color:#94a3b8;margin-top:4px;">${n.time}</div>
            </div>
            ${!n.read ? `<div style="width:8px;height:8px;border-radius:50%;background:var(--app-primary);flex-shrink:0;margin-top:4px;"></div>` : ''}
        </div>
    `).join('');
}

function markAllRead() {
    NOTIFICATIONS_DATA.forEach(n => n.read = true);
    renderNotifications();
    const dot = document.getElementById('notif-dot');
    if (dot) dot.style.display = 'none';
}

function simulateNotifications() {
    const dot = document.getElementById('notif-dot');
    if (dot) { dot.style.display = 'block'; }
}

// ==========================
// IA TRIAGE & PREDICTIVE
// ==========================
function startAIAnalysisAnimated() {
    const btn = document.getElementById('ia-integrated-btn');
    if (btn) {
        btn.style.pointerEvents = 'none';
        const label = btn.querySelector('h4');
        if (label) {
            label.innerHTML = 'Escaneando biométricas...';
            label.classList.add('high-contrast-text');
        }
        btn.querySelector('i').classList.add('fa-spin');
    }

    // Añadir clase a los metric cards secuencialmente
    const cards = document.querySelectorAll('.metric-card');
    let delay = 0;
    
    cards.forEach((card) => {
        setTimeout(() => {
            card.classList.add('ai-scanning-glow');
        }, delay);
        
        setTimeout(() => {
            card.classList.remove('ai-scanning-glow');
        }, delay + 800);
        delay += 500; 
    });

    // Al finalizar (delay + 800), elegir y lanzar escenario
    setTimeout(() => {
        if (btn) {
            btn.style.pointerEvents = 'auto';
            btn.querySelector('h4').innerHTML = 'Análisis Predictivo IA';
            btn.querySelector('i').classList.remove('fa-spin');
        }
        const keys = Object.keys(IA_SCENARIOS);
        const randomScenario = keys[Math.floor(Math.random() * keys.length)];
        startAIAnalysis(randomScenario);
    }, delay + 500);
}

function startAIAnalysis(scenario) {
    const data = IA_SCENARIOS[scenario];
    if (!data) return;

    const alertScreen = document.getElementById('alert-screen');
    if (alertScreen) {
        alertScreen.style.display = 'flex';
        document.getElementById('alert-title').textContent = data.title;
        document.getElementById('alert-desc').textContent = data.desc;

        const opts = document.getElementById('alert-options');
        if (opts) {
            opts.innerHTML = data.options.map(opt => `
                <div style="background:white;border-radius:16px;padding:14px;border:1px solid var(--app-border);display:flex;align-items:center;gap:12px;margin-bottom:10px;">
                    <div style="width:50px;height:50px;border-radius:12px;background:url('${opt.img}') center/cover;background-color:#e2e8f0;flex-shrink:0;"></div>
                    <div style="flex:1;">
                        <div style="font-weight:800;font-size:0.85rem;">${opt.name}</div>
                        <div style="font-size:0.75rem;color:var(--app-text-muted);">${opt.partner || opt.partner}</div>
                        <div style="font-size:0.75rem;color:var(--app-text-muted);">${opt.desc}</div>
                    </div>
                    <div style="text-align:right;">
                        <div style="font-weight:900;color:var(--app-primary);font-size:0.95rem;margin-bottom:4px;">${opt.price.toFixed(2)}&euro;</div>
                        <button onclick="addToCart('${opt.name}',${opt.price},'${opt.img}'); closeAlertScreen();" style="background:var(--app-primary);color:white;border:none;border-radius:10px;padding:6px 12px;font-weight:700;font-size:0.75rem;cursor:pointer;">Contratar</button>
                    </div>
                </div>
            `).join('');
        }

        // Simular escaneo
        const scanUI = document.getElementById('ai-scan-ui');
        const bar = document.getElementById('ai-scan-bar');
        const btn = document.getElementById('alert-action-btn');
        if (scanUI && bar) {
            scanUI.style.display = 'block';
            bar.style.width = '0%';
            let w = 0;
            const interval = setInterval(() => {
                w += Math.random() * 15;
                bar.style.width = Math.min(w, 100) + '%';
                if (w >= 100) clearInterval(interval);
            }, 200);
        }
    }
}

function closeAlertScreen() {
    const el = document.getElementById('alert-screen');
    if (el) el.style.display = 'none';
}

// ==========================
// TOAST
// ==========================
function showToast(msg) {
    const existing = document.getElementById('cudi-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'cudi-toast';
    toast.textContent = msg;
    toast.style.cssText = `
        position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
        background: #0f172a; color: white; padding: 10px 20px; border-radius: 50px;
        font-size: 0.82rem; font-weight: 700; z-index: 9999; white-space: nowrap;
        box-shadow: 0 8px 25px rgba(0,0,0,0.3); animation: fadeIn 0.3s ease;
    `;

    const phone = document.querySelector('.mobile-screen');
    if (phone) phone.appendChild(toast);
    else document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 2500);
}

// ==========================
// IN-APP CHAT
// ==========================
function toggleInAppChat() {
    const panel = document.getElementById('in-app-chat-panel');
    if (panel) panel.style.display = panel.style.display === 'none' || !panel.style.display ? 'block' : 'none';
}

function sendInAppMessage() {
    const input = document.getElementById('in-app-chat-input');
    const body  = document.getElementById('in-app-chat-body');
    if (!input || !body) return;
    const txt = input.value.trim();
    if (!txt) return;

    body.innerHTML += `<div style="background:var(--app-primary);color:white;padding:9px 13px;border-radius:14px;border-top-right-radius:4px;margin-bottom:8px;font-size:0.82rem;align-self:flex-end;max-width:85%;">${txt}</div>`;
    input.value = '';
    body.scrollTop = body.scrollHeight;

    setTimeout(() => {
        const replies = [
            'Lo estoy analizando. Los signos vitales lucen estables.',
            'Puedo ver los biometricos en tiempo real. Todo parece normal.',
            'Recomiendo mantener la rutina de paseos y alimentacion.',
            'Segun el historial, esto es completamente normal para su raza.'
        ];
        const reply = replies[Math.floor(Math.random() * replies.length)];
        body.innerHTML += `<div style="background:white;border:1px solid var(--app-border);padding:9px 13px;border-radius:14px;border-top-left-radius:4px;margin-bottom:8px;font-size:0.82rem;max-width:85%;">${reply}</div>`;
        body.scrollTop = body.scrollHeight;
    }, 1200);
}

function handleInAppEnter(e) {
    if (e.key === 'Enter') sendInAppMessage();
}

// ==========================
// INICIALIZACION
// ==========================
document.addEventListener('DOMContentLoaded', () => {
    initPetType();
    updateCartBadge();
});