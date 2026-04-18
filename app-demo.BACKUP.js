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
        container.innerHTML = '<p style="text-align:center; color:#94a3b8; font-size:0.8rem; padding:10px;">El carrito est├í vac├¡o</p>';
        return;
    }
    container.innerHTML = appCart.map((item, idx) => `
        <div style="display:flex; align-items:center; gap:10px; padding:8px 0; border-bottom:1px solid #f1f5f9;">
            <div style="width:40px; height:40px; border-radius:8px; background:url('${item.img}') center/cover; background-color:#e2e8f0; flex-shrink:0;"></div>
            <div style="flex:1; min-width:0;">
                <div style="font-weight:700; font-size:0.8rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.name}</div>
                <div style="font-size:0.75rem; color:var(--app-primary); font-weight:700;">${item.price.toFixed(2)} Ôé¼</div>
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
    if (totalEl) totalEl.textContent = total.toFixed(2) + ' Ôé¼';
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

    // Toast r├ípido
    if (typeof showCudiToast === 'function') showCudiToast(`"${name}" a├▒adido al carrito Ô£ô`);
}

function toggleInlineCart() {
    const panel = document.getElementById('inline-cart-panel');
    if (panel) panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

// ---- REGISTRO DIN├üMICO ----
const BREEDS = {
    perro: ['Golden Retriever','Labrador','Pastor Alem├ín','Bulldog Franc├®s','Beagle','Poodle','Chihuahua','Husky Siberiano','Yorkshire Terrier','Mestizo'],
    gato: ['Europeo Com├║n','Persa','Maine Coon','Ragdoll','Siam├®s','Bengal├¡','British Shorthair','Scottish Fold','Abisinio','Mestizo']
};

const CARE_BY_AGE = {
    primera: {
        label: 'Primera Aventura',
        perro: ['Vacunaci├│n primaria (6-8 semanas)', 'Socializaci├│n temprana (hasta 16 semanas)', 'Entrenamiento b├ísico y l├¡mites', 'Dieta espec├¡fica para crecimiento'],
        gato: ['Vacunaci├│n: triple felina y rabia', 'Destete y socializaci├│n', 'Revisi├│n parasitaria', 'Dieta alta en prote├¡nas para crecimiento'],
        special: ['Vacunaci├│n temprana', 'Socializaci├│n', 'Control crecimiento']
    },
    explorer: {
        label: 'Energ├¡a Desatada',
        perro: ['Esterilizaci├│n recomendada (6-18 meses)', 'Ejercicio diario >= 45 min', 'Educaci├│n avanzada y agility', 'Desparasitaci├│n trimestral'],
        gato: ['Esterilizaci├│n/castraci├│n (5-7 meses)', 'Enriquecimiento ambiental', 'Revisi├│n oftalmol├│gica', 'Dieta equilibrada activa'],
        special: ['Esterilizaci├│n', 'Ejercicio intensivo', 'Control peso']
    },
    plenitud: {
        label: 'Plenitud Vital',
        perro: ['Revisi├│n anual completa', 'Profilaxis dental bianual', 'Mantenimiento de peso', 'An├ílisis de sangre rutinario'],
        gato: ['An├ílisis de orina anual', 'Limpieza dental', 'Control peso y dieta', 'Revisi├│n de tiroides (>6 a├▒os)'],
        special: ['Revisi├│n anual', 'Dental', 'An├ílisis sangre']
    },
    golden: {
        label: 'Sabidur├¡a Golden',
        perro: ['Revisiones semestrales obligatorias', 'Control articular y movilidad', 'Dieta baja en f├│sforo', 'An├ílisis renal y hep├ítico'],
        gato: ['Revisiones cada 4 meses', 'Detecci├│n precoz de hipertiroidismo', 'Dieta h├║meda renal', 'Control presi├│n arterial'],
        special: ['Revisi├│n semestral', 'Dieta renal', 'Control articular']
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

    // Cambiar imagen de fondo seg├║n especie
    if (hero) {
        hero.style.backgroundImage = type === 'perro'
            ? "url('bienestar-integral-perros-gatos.png')"
            : "url('dietas-personalizadas-longevidad-mascotas.png')";
    }

    // Actualizar etiqueta de alimentaci├│n
    const foodLabel = document.getElementById('food-label');
    if (foodLabel) foodLabel.textContent = type === 'gato' ? 'Preferencia Alimentaria' : 'Tipo de Alimentaci├│n';

    onPetAgeChange(); // actualizar cuidados tambi├®n
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
    careSelect.innerHTML = '<option value="ninguno">Ninguno espec├¡fico</option>';
    const items = type && careData[type] ? careData[type] : careData.special;
    items.forEach(c => {
        careSelect.innerHTML += `<option value="${c}">${c}</option>`;
    });
}

// ==== BASE DE DATOS DE SIMULACI├ôN IA (LAS 8 ALERTAS TFM EMP├üTICO) ====
// Se incluyen descripciones ajustadas al TFM y referencias a 18 im├ígenes ├║nicas de subproductos.
const simulatedAlerts = {
    energia: {
        title: "Picos de Energ├¡a Detectados",
        desc: "Hemos notado que tu peludo tiene much├¡sima vitalidad acumulada hoy. Sabemos que trabajas duro, as├¡ que te sugerimos algunas opciones para que libere toda esa fuerza de forma segura y guiada por nuestros profesionales.",
        color: "var(--app-warning)",
        options: [
            { name: "Paseo de Barrio (30 min)", price: 12.00, img: "product_paseo_1776342822512.png", partner: "Paseador de la Red CUDI", desc: "Un paseo tranquilo por sus calles favoritas." },
            { name: "Paseo de Alta Intensidad (1h)", price: 20.00, img: "product_paseo_vip_1776342839317.png", partner: "Paseador VIP CUDI", desc: "Carrera supervisada para agotar su bater├¡a." },
            { name: "Excursi├│n Grupal con Juegos", price: 35.00, img: "product_paseo_grupo.png", partner: "Centro Recreativo", desc: "Socializaci├│n y ejercicio en manada." }
        ]
    },
    sueno: {
        title: "Descanso Intermitente",
        desc: "Anoche su sue├▒o no fue tan profundo como de costumbre. No es motivo de alarma, pero su bienestar es tu prioridad. Una breve revisi├│n virtual puede asegurarnos de que todo va sobre ruedas.",
        color: "var(--app-danger)",
        options: [
            { name: "Consulta Virtual por Chat", price: 15.00, img: "product_consulta_chat.png", partner: "Triaje CUDI 24/7", desc: "Resuelve dudas al instante por chat." },
            { name: "Videoconsulta Veterinaria", price: 35.00, img: "product_videoconsulta.png", partner: "Cl├¡nica Asociada", desc: "Revisi├│n visual cara a cara con un experto." },
            { name: "Revisi├│n Domiciliaria Expr├®s", price: 55.00, img: "product_vet_domicilio.png", partner: "Veterinaria M├│vil", desc: "Atenci├│n premium sin salir del sal├│n de casa." }
        ]
    },
    nutricion: {
        title: "Ajuste Nutricional Sugerido",
        desc: "El ritmo metab├│lico de tu compa├▒ero cambia y su dieta debe acompa├▒arlo. Hemos calculado la raci├│n perfecta para esta temporada, sin que tengas que medir ni preocuparte.",
        color: "var(--app-success)",
        options: [
            { name: "Pienso Est├índar Ajustado (3kg)", price: 28.50, img: "prod_nutri_1.png", partner: "Tienda CUDI", desc: "Su pienso habitual, ajustado en gramaje." },
            { name: "Dieta Premium Espec├¡fica (5kg)", price: 45.50, img: "prod_nutri_2.png", partner: "Nutrici├│n a Medida CUDI", desc: "Formulaci├│n especial para su edad." },
            { name: "Plan Nutricional Org├ínico Mensual", price: 85.00, img: "prod_nutri_3.png", partner: "Chef Canino B2B", desc: "Comida natural preparada al nivel humano." }
        ]
    },
    ansiedad: {
        title: "Tensi├│n Ambiental Detectada",
        desc: "Parece que algo en el ambiente ha inquietado a tu querido amigo. Recuperar la paz en casa es f├ícil con un poco de ayuda extra para devolverle la tranquilidad.",
        color: "var(--app-primary-light)",
        options: [
            { name: "Difusor de Feromonas Calma", price: 21.00, img: "prod_ans_1.png", partner: "Tienda CUDI", desc: "Ambiente sereno al instante." },
            { name: "Pack Juguetes de Inteligencia", price: 14.50, img: "prod_ans_2.png", partner: "Tienda CUDI", desc: "Distracci├│n mental para reducir nervios." },
            { name: "Terapia de Conducta Domicilio", price: 45.00, img: "prod_ans_3.png", partner: "Et├│logo Asociado", desc: "Soporte psicol├│gico profesional para ├®l." }
        ]
    },
    prevencion: {
        title: "Escudo Preventivo Activo",
        desc: "Proteger hoy es evitar sustos ma├▒ana. Nos adelantamos a los desaf├¡os de salud con coberturas dise├▒adas a la medida de tu mejor amigo.",
        color: "var(--app-primary)",
        options: [
            { name: "Ampliaci├│n de P├│liza Quir├║rgica", price: 12.00, img: "prod_prev_1.png", partner: "Seguros CUDI", desc: "Cobertura total de emergencias hospitalarias." },
            { name: "Desparasitaci├│n Anual a Domicilio", price: 19.50, img: "prod_prev_2.png", partner: "Mutua de Salud", desc: "Pastillas e inyecciones directas a casa." },
            { name: "Protecci├│n Total Platinum Anual", price: 35.00, img: "prod_prev_3.png", partner: "Seguros CUDI Elite", desc: "Todo incluido, 0 preocupaciones." }
        ]
    },
    rutina: {
        title: "Hora de Socializar",
        desc: "Los d├¡as pueden hacerse mon├│tonos para ellos tambi├®n. Reg├ílale a tu peludo un d├¡a entero en compa├▒├¡a de nuevos amigos, volver├í feliz y agotado.",
        color: "#64748B",
        options: [
            { name: "Acceso Tarde de Guarder├¡a", price: 15.00, img: "prod_rut_1.png", partner: "Guarder├¡a CUDI", desc: "Una tarde de juegos libres en grupo." },
            { name: "Sesi├│n Juegos de Agility", price: 22.00, img: "prod_rut_2.png", partner: "Centro Etolog├¡a", desc: "Ejercicio f├¡sico y mental dirigido." },
            { name: "D├¡a Completo Resort Canino", price: 40.00, img: "prod_rut_3.png", partner: "Club Campestre", desc: "Piscina y praderas para un d├¡a inolvidable." }
        ]
    }
}


// ==== PANTALLA 1: ONBOARDING EMPATICO ====
function checkRegistration() {
    const name = document.getElementById('pet-name')?.value.trim() || '';
    const btnNext = document.getElementById('btn-next-1');
    const displayPetName = document.getElementById('display-pet-name');
    // Habilitamos si hay al menos nombre
    if (btnNext) btnNext.disabled = name === '';
    if (displayPetName && name) displayPetName.innerText = name;
}

// Llamamos al cargar para asegurarnos de que el botón está activo con "Mimi" predefinida
document.addEventListener('DOMContentLoaded', () => { checkRegistration(); });

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
    const typeLabels = { perro: '­ƒÉÂ Perro', gato: '­ƒÉ▒ Gato' };
    const ageLabels  = { primera: '­ƒî▒ Primera Aventura', explorer: 'ÔÜí Energ├¡a Desatada', plenitud: '­ƒîƒ Plenitud Vital', golden: '­ƒÅà Sabidur├¡a Golden' };
    const energyLabels = { tranquilo: '­ƒÿ┤ Tranquilo', moderado: '­ƒÄ¥ Moderado', activo: 'ÔÜí Activo' };
    const foodLabels = { pienso: 'Pienso Seco', barf: 'BARF Natural', mixta: 'Mixta' };

    const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val || 'ÔÇö'; };

    set('profile-pet-name', p.name);
    set('profile-type',   typeLabels[p.type] || p.type);
    set('profile-breed',  p.breed);
    set('profile-age',    ageLabels[p.age] || p.age);
    set('profile-weight', p.weight ? `${p.weight} kg` : 'ÔÇö');
    set('profile-energy', energyLabels[p.energy] || p.energy);
    set('profile-food',   foodLabels[p.food] || p.food);

    // El badge Premium Elite se mantiene del HTML, pero podemos actualizar subt├¡tulos si es necesario
    const badge = document.getElementById('profile-pet-badge');
    if (badge) badge.textContent = 'PREMIUM ELITE';

    // Avatar: foto real del animal seleccionado
    const avatar = document.getElementById('pet-avatar-display');
    if (avatar && p.type) {
        const avatarUrl = p.type === 'gato'
            ? 'gato-explorando-seguro-collar-gps.png'
            : (p.age === 'golden' ? 'perro-senior-calidad-vida-longevidad.png' : 'perro-urbano-barcelona-paseo.png');
        avatar.style.backgroundImage = `url('${avatarUrl}')`;
        avatar.style.backgroundSize = 'cover';
        avatar.style.backgroundPosition = 'center top';
    }

    // Nombre visible debajo del avatar ÔÇö siempre desde el perfil
    const nameEl = document.getElementById('profile-pet-name');
    if (nameEl) nameEl.textContent = p.name || 'ÔÇö';

    // Cuidados especiales
    const careCard = document.getElementById('profile-care-card');
    const careText = document.getElementById('profile-care-text');
    if (careCard && careText && p.age) {
        const careData = CARE_BY_AGE[p.age];
        if (careData) {
            const items = p.type && careData[p.type] ? careData[p.type] : careData.special;
            careText.innerHTML = items.map(c => `ÔÇó ${c}`).join('<br>');
            careCard.style.display = 'block';
        }
    }
}


// ==== CAT├üLOGO STORE ÔÇö SERVICIOS REALES DEL TFM ====
const STORE_CATALOG = {
    paseos: {
        icon: 'fa-person-walking', label: '­ƒª« Paseos & Cuidadores', color: '#0077b6',
        products: [
            { name: 'Paseo Urbano (30 min)',    price: 12.00, img: 'perro-urbano-barcelona-paseo.png',     desc: 'Paseador certificado CUDI en tu barrio. Reporte GPS + foto de actividad en tiempo real.' },
            { name: 'Guarder├¡a de D├¡a',          price: 18.00, img: 'guarderia-canina-confianza.png',      desc: 'Tu mascota pasa el d├¡a con un cuidador verificado. C├ímaras en vivo, informe al final del d├¡a.' },
            { name: 'Cuidado a Domicilio (noche)', price: 35.00, img: 'familia-multiespecie-paz-mental.png', desc: 'El cuidador se queda en tu casa. Perfecto para viajes. Tu rutina, sin estr├®s para tu mascota.' }
        ]
    },
    clinica: {
        icon: 'fa-user-doctor', label: '­ƒ®║ Veterinaria & Salud', color: '#ef4444',
        products: [
            { name: 'Chat Veterinario 24/7',     price: 15.00, img: 'triaje-ia-veterinario-urgencias.png',          desc: 'Consulta con un veterinario en menos de 10 minutos por chat. Triaje IA + supervisi├│n humana.' },
            { name: 'Videoconsulta Veterinaria', price: 35.00, img: 'servicios-telemedicina-veterinaria-domicilio.png', desc: 'Videollamada con especialista de la red CUDI. Horario 8h-22h todos los d├¡as.' },
            { name: 'Visita Veterinaria a Domicilio', price: 65.00, img: 'clinica-veterinaria-red-socios.png',       desc: 'El veterinario te visita en casa en menos de 90 minutos. Sin colas, sin estr├®s.' }
        ]
    },
    estetica: {
        icon: 'fa-scissors', label: 'Ô£é´©Å Est├®tica & Peluquer├¡a', color: '#10b981',
        products: [
            { name: 'Ba├▒o + Secado',             price: 25.00, img: 'estetica-canina-bienestar.png',       desc: 'Ba├▒o con productos hipoalerg├®nicos, secado profesional y fragancia suave. Para perros y gatos.' },
            { name: 'Corte de Pelo + Arreglo',   price: 40.00, img: 'mascota-sana-feliz.png',              desc: 'Corte personalizado seg├║n raza, estilo y temporada. Incluye limpieza de o├¡dos y u├▒as.' },
            { name: 'Pack Bienestar Completo',   price: 60.00, img: 'mejora-descanso-salud-felina.png',    desc: 'Ba├▒o, corte, tratamiento antiparasitario, hidrataci├│n del pelaje y revisi├│n b├ísica de salud.' }
        ]
    },
    petshop: {
        icon: 'fa-store', label: '­ƒøì´©Å Pet Shop', color: '#d97706',
        products: [
            { name: 'Alimento Premium (5 kg)',   price: 38.00, img: 'marketplace-alimentos-organicos-perros.png', desc: 'F├│rmula sin cereales, alta en prote├¡na, recomendada por la IA seg├║n el perfil de tu mascota.' },
            { name: 'Pack Higiene & Accesorios', price: 22.00, img: 'tienda-productos-mascotas-barcelona.png',    desc: 'Shampoo, cepillo, limpiador dental y bolsas biodegradables. Todo lo esencial en un pack.' },
            { name: 'Juguetes & Enriquecimiento', price: 18.00, img: 'reduccion-ansiedad-separacion-perros.png', desc: 'Kit de juguetes cognitivos para reducir la ansiedad de separaci├│n y estimular el instinto natural.' }
        ]
    },
    adiestramiento: {
        icon: 'fa-graduation-cap', label: '­ƒÄô Adiestramiento', color: '#8b5cf6',
        products: [
            { name: 'Sesi├│n Adiestramiento (1h)', price: 45.00, img: 'comportamiento-canino-barcelona.png',  desc: 'Entrenador certificado CUDI. Metodolog├¡a positiva. Obediencia b├ísica, socializaci├│n y comportamiento.' },
            { name: 'Pack 5 Sesiones',            price: 180.00, img: 'rutas-paseos-seguros-barcelona.png', desc: 'Programa de 5 sesiones consecutivas con seguimiento semanal. Ideal para cachorros y perros adultos.' },
            { name: 'Taller Grupal (2h)',          price: 25.00, img: 'senderismo-familiar-mascota-naturaleza.png', desc: 'Clase colectiva con otras mascotas compatibles. Socializaci├│n guiada y aprendizaje en entorno natural.' }
        ]
    }
};

let activeCategoryId = null;

function openStoreCategory(catId) {
    const panel = document.getElementById('store-products-panel');
    if (!panel) return;

    if (activeCategoryId === catId) {
        panel.style.display = 'none';
        activeCategoryId = null;
        document.querySelectorAll('.store-cat-btn').forEach(b => b.classList.remove('active-cat'));
        return;
    }

    activeCategoryId = catId;
    document.querySelectorAll('.store-cat-btn').forEach(b => b.classList.remove('active-cat'));
    const activeBtn = document.getElementById(`cat-btn-${catId}`);
    if (activeBtn) activeBtn.classList.add('active-cat');

    const cat = STORE_CATALOG[catId];
    if (!cat) return;

    panel.style.display = 'block';
    panel.innerHTML = `
        <div style="font-weight:800; font-size:0.85rem; color:${cat.color}; margin-bottom:12px; display:flex; align-items:center; gap:6px; text-transform:uppercase; letter-spacing:0.3px;">
            <i class="fa-solid ${cat.icon}"></i> ${cat.label}
        </div>
        ${cat.products.map(p => `
            <div style="display:flex; align-items:flex-start; gap:12px; background:white; border-radius:14px; padding:12px; margin-bottom:10px; border:1px solid #e2e8f0; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
                <div style="width:64px; height:64px; border-radius:10px; background:url('${p.img}') center/cover; background-color:#f1f5f9; flex-shrink:0;"></div>
                <div style="flex:1; min-width:0;">
                    <div style="font-weight:800; font-size:0.85rem; margin-bottom:3px; color:#0f172a;">${p.name}</div>
                    <div style="font-size:0.75rem; color:#64748b; margin-bottom:8px; line-height:1.4;">${p.desc}</div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-weight:900; color:${cat.color}; font-size:1rem;">${p.price.toFixed(2)} Ôé¼</span>
                        <button onclick="addToAppCart('${p.name}', ${p.price}, '${p.img}')" style="background:${cat.color}; color:white; border:none; border-radius:8px; padding:8px 14px; font-size:0.8rem; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:5px; transition:opacity 0.2s;" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">
                            <i class="fa-solid fa-cart-plus"></i> A├▒adir
                        </button>
                    </div>
                </div>
            </div>
        `).join('')}
    `;
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ==== RED SOCIAL CUDI PAWS ====
const SOCIAL_PETS = [
    { name: 'Berto', type: 'Perro', breed: 'Golden Retriever', age: 'ÔÜí Energ├¡a Desatada', distance: '180m', img: 'bienestar-integral-perros-gatos.png', status: 'Disponible esta tarde' },
    { name: 'Mimi',  type: 'Gata',  breed: 'Europeo Com├║n',    age: '­ƒîƒ Plenitud Vital',  distance: '320m', img: 'gato-explorando-seguro-collar-gps.png', status: 'Salida ma├▒ana por la ma├▒ana' },
    { name: 'Zeus',  type: 'Perro', breed: 'Husky Siberiano',  age: '­ƒî▒ Primera Aventura', distance: '450m', img: 'comportamiento-canino-barcelona.png', status: 'Busca compa├▒├¡a para paseo' },
    { name: 'Coco',  type: 'Perro', breed: 'Beagle',           age: '­ƒÅà Sabidur├¡a Golden', distance: '600m', img: 'perro-senior-calidad-vida-longevidad.png', status: 'Paseo tranquilo preferido' }
];

function renderSocialPets() {
    const list = document.getElementById('social-pets-list');
    if (!list) return;
    list.innerHTML = SOCIAL_PETS.map((pet, idx) => `
        <div style="background:white; border-radius:24px; overflow:hidden; border:1px solid #e2e8f0; box-shadow:0 10px 25px rgba(0,0,0,0.04); margin-bottom:15px; transition:transform 0.2s;">
            <div style="height:150px; background:url('${pet.img}') center/cover; position:relative;">
                <div style="position:absolute; top:12px; right:12px; background:rgba(0,0,0,0.4); backdrop-filter:blur(5px); color:white; padding:4px 10px; border:1px solid rgba(255,255,255,0.2); border-radius:10px; font-size:0.7rem; font-weight:700;">
                    ­ƒôì ${pet.distance}
                </div>
                <div style="position:absolute; bottom:12px; left:12px; background:var(--app-primary); color:white; padding:4px 10px; border-radius:10px; font-size:0.65rem; font-weight:800; letter-spacing:0.5px;">
                    ${pet.type.toUpperCase()}
                </div>
            </div>
            <div style="padding:15px;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
                    <div>
                        <h4 style="font-weight:900; font-size:1.1rem; color:#0f172a; margin-bottom:2px;">${pet.name}</h4>
                        <div style="font-size:0.75rem; color:#64748b;">${pet.breed} &bull; ${pet.age.split(' ')[0]} ${pet.age.split(' ')[1]}</div>
                    </div>
                    <div style="text-align:right;">
                        <div style="font-size:0.6rem; font-weight:800; color:#10b981; text-transform:uppercase; letter-spacing:1px; margin-bottom:2px;">Compatibilidad</div>
                        <div style="display:flex; align-items:center; gap:4px;">
                            <div style="width:50px; height:6px; background:#f1f5f9; border-radius:10px; overflow:hidden;">
                                <div style="width:${85 + (idx * 3)}%; height:100%; background:linear-gradient(90deg, #10b981, #34d399);"></div>
                            </div>
                            <span style="font-size:0.75rem; font-weight:800; color:#10b981;">${85 + (idx * 3)}%</span>
                        </div>
                    </div>
                </div>
                <p style="font-size:0.75rem; color:#64748b; margin-bottom:15px; line-height:1.4;">"${pet.status}"</p>
                <button onclick="connectWithPet('${pet.name}', ${idx})" id="connect-btn-${idx}" style="width:100%; background:#0f172a; color:white; border:none; border-radius:14px; padding:12px; font-size:0.85rem; font-weight:800; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; justify-content:center; gap:8px;">
                    <i class="fa-solid fa-heart"></i> Enviar solicitud de amistad
                </button>
            </div>
        </div>
    `).join('');
}

function connectWithPet(name, idx) {
    const btn = document.getElementById(`connect-btn-${idx}`);
    if (btn) {
        btn.innerHTML = 'Ô£ô ┬íConectado!';
        btn.style.background = '#10b981';
        btn.disabled = true;
    }
    if (typeof showCudiToast === 'function') showCudiToast(`┬íSolicitud enviada a ${name}! Te notificamos cuando acepten ­ƒÉ¥`);
}

function proposeOuting() {
    if (typeof showCudiToast === 'function') showCudiToast('­ƒôì Salida propuesta enviada a mascotas compatibles cerca de ti');
}

// ==== PANTALLA 2 A 5: NAVEGADOR DE TABS ====
function switchNav(tabId, element) {
    document.querySelectorAll('.tab-view').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById(`tab-${tabId}`).classList.add('active');
    element.classList.add('active');

    // Renderizar la red social al entrar al tab
    if (tabId === 'social') {
        setTimeout(renderSocialPets, 100);
    }
}

// ==== CHARTS.JS INTEGRATION (10 GRAPHICS) ====
function initCharts() {
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#64748B';

    // 1. Radar (Bio-Dash)
    new Chart(document.getElementById('chart-radar'), {
        type: 'radar',
        data: {
            labels: ['Coraz├│n', 'Sue├▒o', 'Movimiento', 'Relax', 'Hidrataci├│n'],
            datasets: [{
                label: 'Score Biom├®trico',
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
            labels: ['Sue├▒o Profundo', 'Sue├▒o Ligero', 'Fase REM', 'Desvelos'],
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
            labels: ['D├¡a 1', 'D├¡a 2', 'D├¡a 3'],
            datasets: [{ label: 'Temp Normal (┬░C)', data: [38.2, 38.3, 38.1], backgroundColor: '#20C997' },
                       { label: 'Febr├¡cula', data: [0.5, 0.1, 0], backgroundColor: '#FFD166' }]
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

    // 6. Area (Estr├®s)
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
                label: 'Kil├│metros',
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
            labels: ['Prote├¡na', 'Carbohidratos', 'Grasas'],
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

    // 10. Scatter (Anomal├¡as Geogr├íficas)
    new Chart(document.getElementById('chart-scatter-geo'), {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Zonas Frecuentes',
                data: [{x: -3.7, y: 40.4}, {x: -3.6, y: 40.5}, {x: -3.8, y: 40.3}],
                backgroundColor: '#0077B6'
            }, {
                label: 'Fugas/Anomal├¡as',
                data: [{x: -3.9, y: 40.7}],
                backgroundColor: '#EF476F'
            }]
        }
    });
}


// ==== FLUJO DE SIMULACI├ôN IA B2B ====
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
        "Calculando m├®tricas...",
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
            statusText.innerText = "An├ílisis completado.";
            
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
                    ${opt.price.toFixed(2)}Ôé¼
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
        if (typeof showCudiToast === 'function') showCudiToast('A├▒ade productos al carrito primero ­ƒøÆ');
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
                <div style="font-weight:800; color:var(--app-primary);">${(item.price * item.qty).toFixed(2)}Ôé¼</div>
            </div>
        `).join('');
    }
    const total = appCart.reduce((a, i) => a + i.price * i.qty, 0);
    const sub = document.getElementById('chk-subtotal');
    const tot = document.getElementById('chk-total');
    if (sub) sub.textContent = total.toFixed(2) + ' Ôé¼';
    if (tot) tot.textContent = total.toFixed(2) + ' Ôé¼';
    
    setCheckoutUI(1, 'Continuar al pago <i class="fa-solid fa-arrow-right"></i>', 'Paso 1 de 3 ÔÇö Tu cesta');
}

function checkoutNextStep() {
    if (checkoutStep === 1) {
        // Ir a paso 2
        checkoutStep = 2;
        document.getElementById('chk-step-1').style.display = 'none';
        document.getElementById('chk-step-2').style.display = 'block';
        document.getElementById('chk-step-3').style.display = 'none';
        setCheckoutUI(2, 'Confirmar y pagar <i class="fa-solid fa-lock"></i>', 'Paso 2 de 3 ÔÇö Pago');
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

        // Finalizar y mostrar pantalla de ├®xito
        showOrderSuccess();
    }, 2000);
}

function showOrderSuccess() {
    closeModal('checkout-modal');
    appCart = [];
    saveAppCart();
    document.getElementById('screen-order-success').style.display = 'block';
}

function closeOrderSuccess() {
    document.getElementById('screen-order-success').style.display = 'none';
    switchNav('dash', document.querySelector('.nav-item'));
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

// ==== RESET PARCIAL: solo limpia la simulaci├│n, sin recargar la p├ígina ====
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
    if (statusText) statusText.innerText = 'Analizando telemetr├¡a...';

    // Resetear bot├│n de pago
    const btnPay = document.getElementById('btn-pay');
    if (btnPay) {
        btnPay.innerHTML = 'Confirmar y Proteger';
        btnPay.disabled = false;
    }

    // Vaciar carrito interno (sin afectar al carrito global del sitio)
    appCart = [];
    saveAppCart();

    // Volver al tab de IA para otra simulaci├│n
    const simTab = document.querySelector('.nav-item:nth-child(2)');
    if (simTab) switchNav('sim', simTab);

    // Toast de confirmaci├│n
    setTimeout(() => {
        if (typeof showCudiToast === 'function') {
            showCudiToast('┬íPago procesado! Puedes simular otro escenario.');
        }
    }, 300);
}

// ==== SISTEMA DE NOTIFICACIONES SIMULADAS ====
let notifications = [
    { id: 1, title: "Informe Semanal Disponible", desc: "El gemelo digital ha procesado los datos de los ├║ltimos 7 d├¡as. Pulsa para ver el progreso de salud.", read: false, type: "report" },
    { id: 2, title: "Alerta de Hidrataci├│n", desc: "Se detecta un descenso del 12% en la frecuencia de ingesta de agua. Monitorizando...", read: false, type: "alert" }
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

// Simular llegada de nueva notificaci├│n al iniciar demo
function simulateNewNotification() {
    setTimeout(() => {
        notifications.unshift({
            id: Date.now(),
            title: "Plan Activo: CUDI Care",
            desc: "Tu suscripci├│n se ha sincronizado con el collar inteligente con ├®xito.",
            read: false,
            type: "info"
        });
        renderNotifications();
    }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    renderNotifications();
    renderSocialPets();
});