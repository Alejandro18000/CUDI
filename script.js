// Desarrollo 100% realizado por Sergio Alejandro Ospina Rocha
const CUDI_SEARCH_INDEX = [
    {
        "url": "ansiedad-separacion-cortisol-mascotas.html",
        "title": "Reducción de Cortisol Sistémico en Trastornos de Ansiedad por Separación Moderada",
        "desc": "El aislamiento prolongado en apartamentos urbanos dispara la curva glucocorticoide, generando desde destrozos hogareños hasta depresión sistémica."
    },
    {
        "url": "bienestar-integral-multiespecie.html",
        "title": "Bienestar y Salud Holística para Mascotas",
        "desc": ""
    },
    {
        "url": "contratar-plan-premium-cudi.html",
        "title": "CUDI",
        "desc": ""
    },
    {
        "url": "cudi-redes-sociales-bot.html",
        "title": "CUDI - Conexión desde Redes Sociales",
        "desc": "Bienvenido a CUDI desde nuestras redes sociales. Comienza la revolución en bienestar animal preventivo."
    },
    {
        "url": "gemelos-digitales-salud-predictiva.html",
        "title": "El Impacto Clínico de los Gemelos Digitales Biomédicos en la Familia Multiespecie",
        "desc": "Un control clínico tradicional extrae datos 1 hora de cada 8,760 horas que tiene un año. Los Gemelos Digitales (Digital Twins) proponen la recolección 100% ininterrumpida."
    },
    {
        "url": "geo-telemetria-prevencion-perdida.html",
        "title": "Impacto de la Telemetría y Geolocalización Canina en la Prevención de Pérdidas Reales",
        "desc": "La pérdida de una mascota genera traumas familiares severos. Documentamos cómo la geolocalización continua ha reducido las pérdidas definitivas en un alarmante porcentaje."
    },
    {
        "url": "index.html",
        "title": "CUDI",
        "desc": ""
    },
    {
        "url": "legal.html",
        "title": "Información Legal",
        "desc": ""
    },
    {
        "url": "memoria-tfm-ecosistema-cudi.html",
        "title": "Memoria TFM: Estrategia de Marketing CUDI",
        "desc": "Reporte académico del despliegue estratégico de marketing, localización y arquitectura de la plataforma CUDI."
    },
    {
        "url": "microbioma-nutricion-longevidad-canina.html",
        "title": "Manipulación del Microbioma a través de Nutrición Orgánica: Impacto en Longevidad",
        "desc": "Los piensos ultraprocesados son los principales causantes de alergias, tumores y fallas renales. La biología celular dicta un retorno estricto a las fuentes orgánicas."
    },
    {
        "url": "nutricion-personalizada-perros-gatos.html",
        "title": "Nutrición Animal Premium y Planes de Alimentación",
        "desc": ""
    },
    {
        "url": "paseadores-perros-certificados-barcelona.html",
        "title": "Paseadores y Cuidadores de Confianza",
        "desc": ""
    },
    {
        "url": "planes-suscripcion-bienestar-animal.html",
        "title": "Suscripciones y Planes de Cuidado",
        "desc": ""
    },
    {
        "url": "politica-cookies-plataforma.html",
        "title": "Política de Cookies",
        "desc": ""
    },
    {
        "url": "politica-devoluciones-smart-collar.html",
        "title": "Política de Devoluciones y Cancelaciones",
        "desc": ""
    },
    {
        "url": "politica-privacidad-datos-mascotas.html",
        "title": "Política de Privacidad",
        "desc": ""
    },
    {
        "url": "producto-activepaws.html",
        "title": "ActivePaws",
        "desc": "Información detallada sobre ActivePaws. Entrenamiento físico adaptado a razas de alta energía y juegos moderados para gatos."
    },
    {
        "url": "producto-bubbles--paws.html",
        "title": "Bubbles & Paws",
        "desc": "Información detallada sobre Bubbles & Paws. Servicio rápido de baño y secado con productos 100% biodegradables."
    },
    {
        "url": "producto-cudi-shield-basic.html",
        "title": "CUDI Shield Basic",
        "desc": "Información detallada sobre CUDI Shield Basic. Cobertura esencial de responsabilidad civil para todos los animales de la unidad familiar."
    },
    {
        "url": "producto-ecopet-organic.html",
        "title": "EcoPet Organic",
        "desc": "Información detallada sobre EcoPet Organic. Dietas crudas y biológicamente apropiadas para perros y gatos que conviven en el mismo hogar."
    },
    {
        "url": "producto-global-pet-protect.html",
        "title": "Global Pet Protect",
        "desc": "Información detallada sobre Global Pet Protect. Seguro de salud total con reembolso de gastos quirúrgicos y hospitalarios."
    },
    {
        "url": "producto-grooming-master.html",
        "title": "Grooming Master",
        "desc": "Información detallada sobre Grooming Master. Corte a tijera y tratamientos de ozonoterapia para perros y gatos."
    },
    {
        "url": "producto-hospital-clinico-dual.html",
        "title": "Hospital Clínico Dual",
        "desc": "Información detallada sobre Hospital Clínico Dual. Especialistas en medicina interna para caninos y felinos con quirófanos de última generación."
    },
    {
        "url": "producto-medipet-express.html",
        "title": "MediPet Express",
        "desc": "Información detallada sobre MediPet Express. Red de clínicas de barrio conectadas al historial biométrico de CUDI para urgencias."
    },
    {
        "url": "producto-nannypets-247.html",
        "title": "NannyPets 24/7",
        "desc": "Información detallada sobre NannyPets 24/7. Cuidado a domicilio para que el perro y el gato permanezcan juntos durante tu ausencia."
    },
    {
        "url": "producto-purebites-clinic.html",
        "title": "PureBites Clinic",
        "desc": "Información detallada sobre PureBites Clinic. Piensos especializados prescritos por IA para sensibilidades gástricas específicas."
    },
    {
        "url": "producto-safehome-multipet.html",
        "title": "SafeHome MultiPet",
        "desc": "Información detallada sobre SafeHome MultiPet. Protección específica para hogares con más de una especie animal."
    },
    {
        "url": "producto-urban-pet-walkers.html",
        "title": "Urban Pet Walkers",
        "desc": "Información detallada sobre Urban Pet Walkers. Expertos en caminatas grupales y transporte seguro de gatos en mochilas técnicas."
    },
    {
        "url": "producto-vethome-cudi.html",
        "title": "VetHome CUDI",
        "desc": "Información detallada sobre VetHome CUDI. Servicio médico presencial en tu hogar para evitar el estrés del transporte animal."
    },
    {
        "url": "producto-vitality-mix.html",
        "title": "Vitality Mix",
        "desc": "Información detallada sobre Vitality Mix. Suplementos nutricionales diseñados para fortalecer el sistema inmune dual de ambas especies."
    },
    {
        "url": "producto-zenpet-spa.html",
        "title": "ZenPet Spa",
        "desc": "Información detallada sobre ZenPet Spa. Ambiente relajado con feromonas para que la higiene sea una experiencia libre de estrés."
    },
    {
        "url": "red-socios-clinicas-veterinarias.html",
        "title": "Red para Profesionales y Entidades de Bienestar",
        "desc": ""
    },
    {
        "url": "seguros-salud-mascotas-barcelona.html",
        "title": "Seguros para Mascotas y Protección Legal",
        "desc": ""
    },
    {
        "url": "seguros-veterinarios-mortalidad.html",
        "title": "Análisis Transaccional: «Eutanasia Económica» y Cobertura Veterinaria en Milennials",
        "desc": "Miles de mascotas son dormidas anualmente porque el tutor no puede hacer frente a intervenciones repentinas de +2,000 euros. Analizamos el blindaje del seguro integral."
    },
    {
        "url": "simulador-gemelo-digital-telemetria.html",
        "title": "CUDI App",
        "desc": ""
    },
    {
        "url": "smart-collar-aventuras-sin-sustos.html",
        "title": "Campaña Aventuras sin Sustos",
        "desc": "Únete al primer mapa colaborativo de rutas pet-friendly en España. Gana suscripciones compartiendo tus aventuras con CUDI."
    },
    {
        "url": "smart-collar-cudi-gps.html",
        "title": "Comprar Collar CUDI Smart",
        "desc": ""
    },
    {
        "url": "telemedicina-veterinaria-24-7.html",
        "title": "Clínicas Veterinarias y Hospitales 24h",
        "desc": ""
    },
    {
        "url": "terminos-condiciones-app.html",
        "title": "Términos y Condiciones de Uso",
        "desc": ""
    },
    {
        "url": "triaje-ia-esperanza-vida-veterinaria.html",
        "title": "Eficacia del Triaje mediante Inteligencia Artificial: Reducción de la Mortalidad Aguda",
        "desc": "La ventana de oro en cardiología y traumas veterinarios es de menos de una hora. La capacidad algorítmica de evaluar síntomas cambia las reglas del juego."
    }
];

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar-island');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth reveal animation for elements on scroll
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.card, .info-content, .hero-content');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
};

document.addEventListener('DOMContentLoaded', observeElements);

// Simple form handle (Con protección Heurística contra fallos en páginas sin formulario)
const earlyAccessForm = document.getElementById('earlyAccessForm');
if (earlyAccessForm) {
    earlyAccessForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Registrando...';
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Suscrito!';
            btn.style.background = '#FFB703';
            btn.style.color = '#000';
            e.target.querySelector('input').value = '';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style = '';
            }, 3000);
        }, 1500);
    });
}

// En la vida real aquí cargaríamos la imagen generada por IA en la clase .hero-visual
const heroVisual = document.querySelector('.hero-visual');
if(heroVisual) {
    heroVisual.style.background = 'url("bienestar-integral-perros-gatos.png") center/cover no-repeat';
    heroVisual.style.boxShadow = '0 0 20px rgba(0,0,0,0.1)';
}

// === FUNCIONALIDADES E-COMMERCE TFM ===

// Estado Global del Carrito
let globalCart = JSON.parse(localStorage.getItem('cudi_cart')) || [];

function toggleCart() {
    const cart = document.getElementById('side-cart');
    const overlay = document.getElementById('cart-overlay');
    const drawer = document.getElementById('mobile-drawer');
    
    if (!cart || !overlay) return;

    // Si el menú móvil está abierto, lo cerramos
    if (drawer && drawer.classList.contains('active')) {
        drawer.classList.remove('active');
        // El overlay ya está activo, no lo alteramos
    } else {
        overlay.classList.toggle('active');
    }

    if (cart.classList.contains('active')) {
        cart.classList.remove('active');
        // Si no cerramos el menú arriba, removemos el overlay aquí si el carrito se cierra solo
        if (!drawer || !drawer.classList.contains('active')) {
             overlay.classList.remove('active');
        }
    } else {
        cart.classList.add('active');
        overlay.classList.add('active');
        renderCartUI();
    }
}

function addToCart(name, price, img) {
    // Principio Heurístico: Prevención de errores -> Si ya existe, aumentar cantidad
    const existing = globalCart.find(i => i.name === name);
    if (existing) {
        existing.qty += 1;
    } else {
        globalCart.push({ name, price, img, qty: 1 });
    }
    saveCart();
    renderCartUI();
    
    // Feedback Premium: Toast en lugar de Alert
    if (typeof showCudiToast === 'function') {
        showCudiToast(`¡${name} añadido al carrito!`);
    }
}

function removeFromCart(index) {
    globalCart.splice(index, 1);
    saveCart();
    renderCartUI();
}

function updateQty(index, delta) {
    globalCart[index].qty += delta;
    if (globalCart[index].qty <= 0) {
        removeFromCart(index);
    } else {
        saveCart();
        renderCartUI();
    }
}

function saveCart() {
    localStorage.setItem('cudi_cart', JSON.stringify(globalCart));
}

function renderCartUI() {
    const badge = document.getElementById('global-cart-badge');
    const container = document.getElementById('cart-items-container');
    const totalDisplay = document.getElementById('cart-total-price');
    const checkoutTotal = document.getElementById('checkout-total-price');
    const summaryTotal = document.getElementById('summary-total');
    const checkoutList = document.getElementById('checkout-items-list');
    
    // Calcula cuántos ítems totales hay
    let totalItems = globalCart.reduce((acc, item) => acc + item.qty, 0);
    if(badge) {
        badge.innerText = totalItems;
        badge.classList.remove('pulse');
        void badge.offsetWidth; // Force reflow
        badge.classList.add('pulse');
    }
    
    // 1. Calcular el precio total (Siempre necesario)
    let finalPrice = globalCart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    let formattedPrice = finalPrice.toFixed(2) + " €";
    
    // 2. Actualizar displays de precio si existen
    if(totalDisplay) totalDisplay.innerText = formattedPrice;
    if(checkoutTotal) checkoutTotal.innerText = formattedPrice;
    if(summaryTotal) summaryTotal.innerText = formattedPrice;

    // 3. Renderizar lista en el checkout si existe
    if(checkoutList) {
        if(globalCart.length === 0) {
            checkoutList.innerHTML = '<p style="text-align:center; padding:10px; color:#94a3b8;">No hay productos</p>';
        } else {
            checkoutList.innerHTML = globalCart.map(item => `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; font-size:0.9rem;">
                    <span>${item.qty}x ${item.name}</span>
                    <span style="font-weight:700;">${(item.price * item.qty).toFixed(2)} €</span>
                </div>
            `).join('');
        }
    }

    // 4. Si no hay contenedor de items lateral, salimos
    if(!container) return;

    if (globalCart.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 20px; color:var(--clr-text-muted);">
                <i class="fa-solid fa-basket-shopping" style="font-size:2rem; margin-bottom:10px;"></i>
                <p>El carrito de CUDI está vacío.</p>
            </div>
        `;
        return;
    }

    let htmlBlock = "";
    globalCart.forEach((item, index) => {
        let imgDisplay = item.img || ''; 
        htmlBlock += `
        <div class="cart-item">
            ${imgDisplay ? `<div class="cart-item-img" style="background-image:url('${imgDisplay}')"></div>` : `<div class="cart-item-img" style="background-color:#eee"><i class="fa-solid fa-box" style="margin:25px; color:#aaa;"></i></div>`}
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-row" style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
                    <div class="cart-item-price">${item.price.toFixed(2)} €</div>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="updateQty(${index}, -1)"><i class="fa-solid fa-minus"></i></button>
                        <span class="qty-number">${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${index}, 1)"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                <button class="remove-item" style="margin-top:10px;" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash-can"></i> Eliminar</button>
            </div>
        </div>
        `;
    });
    container.innerHTML = htmlBlock;
}

// Simulador Transaccional (Para contratar-plan-premium-cudi.html con Interfaz de Rastreo)
function simulatePayment() {
    const btn = document.getElementById('btn-pay');
    const form = document.getElementById('checkout-form');
    const trackingUI = document.getElementById('success-message');
    const progressFill = document.querySelector('.progress-line-fill');
    const nodes = document.querySelectorAll('.step-node');

    if(!btn) return;
    
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Verificando Autorización...';
    
    setTimeout(() => {
        // Transición a Éxito y Rastreo
        form.style.display = 'none';
        if(trackingUI) trackingUI.style.display = 'block';
        if(progressFill) progressFill.style.width = '100%';
        if(nodes[2]) nodes[2].classList.add('active');
        
        // Ocultar resumen al finalizar
        const summary = document.querySelector('.order-summary-mini');
        if(summary) summary.style.display = 'none';

        // Vaciar y guardar estado limpio
        globalCart = [];
        saveCart();
        renderCartUI();

        // Iniciar animación de "Paradas" en el rastreo
        startTrackingSimulation();
    }, 2000);
}

function toggleSummary() {
    const content = document.getElementById('summary-content');
    const chevron = document.getElementById('summary-chevron');
    if(content.classList.contains('show')) {
        content.classList.remove('show');
        chevron.style.transform = 'rotate(0deg)';
    } else {
        content.classList.add('show');
        chevron.style.transform = 'rotate(180deg)';
    }
}

function selectPayment(el) {
    document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('active'));
    el.classList.add('active');
    el.querySelector('input').checked = true;
}

function startTrackingSimulation() {
    const stopsEl = document.getElementById('stops-remaining');
    const statusEl = document.getElementById('current-status-text');
    if(!stopsEl) return;

    let stops = 8;
    const interval = setInterval(() => {
        stops--;
        stopsEl.innerText = stops;
        
        if(stops <= 5) {
            statusEl.innerText = "En Distribución Local";
            const distStep = document.querySelector('.step-distribution');
            if(distStep) distStep.classList.add('active');
            const lineFill = document.getElementById('track-line-fill');
            if(lineFill) lineFill.style.width = '100%';
        }
        if(stops <= 2) {
            statusEl.innerText = "Vehículo de Reparto en tu zona";
        }
        
        if(stops <= 0) {
            clearInterval(interval);
            statusEl.innerText = "Entregado / En Conserjería";
            stopsEl.parentElement.innerHTML = "<strong>¡Pedido Entregado!</strong>";
        }
    }, 4000);
}

// === GLOBAL SESSION / PERSISTENCE & AUTH ===
function handleHeroAction() {
    const profileStr = localStorage.getItem('cudi_pet_profile');
    const heroBtn = document.querySelector('.hero-actions .btn-primary');
    
    // Si ya existe un perfil personalizado O si el botón indica acceso al panel
    const isDashboardLink = heroBtn && (heroBtn.textContent.toLowerCase().includes('panel') || heroBtn.textContent.toLowerCase().includes('mi mascota'));

    if (profileStr || isDashboardLink) {
        // Redirección directa y robusta
        window.location.assign('mi-mascota.html');
    } else {
        openAuthModal();
    }
}

function openAuthModal() {
    const modal = document.getElementById('cudi-auth-modal');
    if (modal) modal.style.display = 'flex';
}

function closeAuthModal() {
    const modal = document.getElementById('cudi-auth-modal');
    if (modal) modal.style.display = 'none';
}

function cudi_logout() {
    if (confirm('¿Deseas cerrar la sesión de tu mascota?')) {
        localStorage.removeItem('cudi_pet_profile');
        window.location.href = 'index.html';
    }
}

function handleWebRegister(event) {
    if (event) event.preventDefault();
    const name = document.getElementById('web-pet-name').value;
    const type = document.getElementById('web-pet-type').value;
    
    if (!name) return alert('Por favor, dinos el nombre de tu mascota');

    const profile = {
        name: name,
        photo: type === 'gato' ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80' : 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
        breed: 'Mestizo', // Default for quick reg
        age: 2,
        weight: 10,
        energy: 'moderado',
        food: 'pienso'
    };

    localStorage.setItem('cudi_pet_profile', JSON.stringify(profile));
    cudi_check_session();
    closeAuthModal();
    
    // Smooth redirect to dashboard
    window.location.href = 'mi-mascota.html';
}

function cudi_check_session() {
    let profileStr = localStorage.getItem('cudi_pet_profile');
    let profile = profileStr ? JSON.parse(profileStr) : null;
    
    // Default Academic Session seeding (Neutral & Generic)
    if (!profile) {
        profile = {
            name: 'Companion',
            photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
            breed: 'Golden Retriever',
            age: 2,
            weight: 25,
            energy: 'Alto',
            food: 'Premium Orgánico'
        };
    }

    const navItem = document.getElementById('nav-session-item');
    const mobileItem = document.getElementById('mobile-session-item');
    const heroBtn = document.querySelector('.hero-actions .btn-primary');

    // Update Hero Button if it exists (on index.html)
    if (heroBtn) {
        // Ahora permitimos ir al panel incluso con la sesión demo para que el botón "funcione" siempre
        heroBtn.innerHTML = `<i class="fa-solid fa-chart-line" style="font-size:1.4rem;"></i> Ir a mi Panel`;
        // Nota: Si el usuario quiere vincular su propia mascota, el modal sigue disponible
        // pero el botón principal ahora siempre da acceso al ecosistema.
    }

    const sessionHtml = `
        <div class="session-badge-premium" style="display:flex !important; position:relative;">
            <a href="mi-mascota.html" style="display:flex; align-items:center; text-decoration:none; color:inherit; gap:10px;">
                <img src="${profile.photo}" alt="${profile.name}" class="session-badge-photo">
                <span class="session-badge-name">Sesion: ${profile.name}</span>
            </a>
            <button onclick="cudi_logout()" title="Cerrar Sesión" style="background:none; border:none; color:var(--app-primary); opacity:0.6; cursor:pointer; margin-left:10px; font-size:0.9rem; padding:5px;">
                <i class="fa-solid fa-power-off"></i>
            </button>
        </div>
    `;

    if (navItem) navItem.innerHTML = sessionHtml;
    if (mobileItem) {
        mobileItem.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:5px;">
                <a href="mi-mascota.html" style="display:flex; align-items:center; gap:10px; padding:15px; background:#f0f9ff; border-radius:12px; margin-top:10px; text-decoration:none; color:var(--clr-primary); font-weight:800;" onclick="toggleMobileMenu()">
                    <img src="${profile.photo}" alt="${profile.name}" style="width:30px; height:30px; border-radius:50%; object-fit:cover; border:2px solid var(--clr-primary);">
                    <span>Mi Mascota: ${profile.name}</span>
                </a>
                <button onclick="cudi_logout()" style="background:none; border:none; color:#ef4444; padding:10px; font-weight:600; text-align:left; padding-left:15px; cursor:pointer;">
                    <i class="fa-solid fa-power-off"></i> Cerrar Sesión
                </button>
            </div>
        `;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    cudi_check_session();
    
    // Auto-open registration if requested via URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('action') === 'register') {
        setTimeout(openAuthModal, 500);
    }
    
    if(document.getElementById('global-cart-badge') || 
       document.getElementById('checkout-total-price') || 
       document.getElementById('cart-items-container')) {
        renderCartUI();
    }
});

// === BUSCADOR FUNCIONAL (Escaparate) ===
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector('.search-box input');
    const storeGrid = document.querySelector('.ecommerce-grid');
    
    if (searchInput && storeGrid) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const storeCards = storeGrid.querySelectorAll('.store-card');
            let hasResults = false;
            
            storeCards.forEach(card => {
                const text = card.innerText.toLowerCase();
                if (query === '' || text.includes(query)) {
                    // Si el card era "featured", tenía display:grid originamente o asume flex.
                    // Empty string rests it to the css-defined display.
                    card.style.display = ''; 
                    hasResults = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            let noResultsMsg = document.getElementById('search-no-results');
            if (!hasResults && query !== "") {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('div');
                    noResultsMsg.id = 'search-no-results';
                    noResultsMsg.style.gridColumn = '1 / -1';
                    noResultsMsg.style.textAlign = 'center';
                    noResultsMsg.style.padding = '3rem 1rem';
                    noResultsMsg.style.color = 'var(--clr-text-muted)';
                    noResultsMsg.innerHTML = '<i class="fa-solid fa-magnifying-glass" style="font-size:2.5rem; margin-bottom:15px; opacity:0.5;"></i><h3 style="color:var(--clr-text);">No hay coincidencias</h3><p>No pudimos encontrar productos relacionados con "<strong>' + query + '</strong>"</p>';
                    storeGrid.appendChild(noResultsMsg);
                } else {
                    noResultsMsg.innerHTML = '<i class="fa-solid fa-magnifying-glass" style="font-size:2.5rem; margin-bottom:15px; opacity:0.5;"></i><h3 style="color:var(--clr-text);">No hay coincidencias</h3><p>No pudimos encontrar productos relacionados con "<strong>' + query + '</strong>"</p>';
                    noResultsMsg.style.display = 'block';
                }
            } else if (noResultsMsg) {
                noResultsMsg.style.display = 'none';
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const storeSection = document.getElementById('store-grid');
                if (storeSection) {
                    storeSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }
});

// === Global AI Chat Widget Logic ===


// --- CUDI GLOBAL SEARCH ENGINE ---
document.addEventListener('DOMContentLoaded', () => {
    const searchInputs = document.querySelectorAll('.nav-search-island input');
    
    searchInputs.forEach(input => {
        // Create dropdown container
        const dropdown = document.createElement('div');
        dropdown.className = 'search-results-dropdown';
        dropdown.style.display = 'none';
        input.parentNode.style.position = 'relative';
        input.parentNode.appendChild(dropdown);
        
        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length < 2) {
                dropdown.style.display = 'none';
                return;
            }
            
            // Filter & Score Algorithm
            const results = CUDI_SEARCH_INDEX.map(item => {
                let score = 0;
                const t = item.title.toLowerCase();
                const d = item.desc.toLowerCase();
                const u = item.url.toLowerCase();
                
                if (t === query) score += 50;
                else if (t.includes(query)) score += 20;
                
                if (u.includes(query)) score += 10;
                if (d.includes(query)) score += 2;
                
                // Penalize administrative/legal pages so they don't overshadow products
                if (u.includes('politica') || u.includes('legal') || u.includes('terminos') || u.includes('condiciones')) {
                    score -= 15;
                }
                
                // Boost product pages if searching for products
                if (u.includes('producto') || u.includes('smart-collar')) {
                    score += 5;
                }
                
                return { ...item, score };
            }).filter(item => item.score > 0)
              .sort((a, b) => b.score - a.score)
              .slice(0, 5); // Max 5 resultados
            
            if (results.length > 0) {
                dropdown.innerHTML = results.map(item => `
                    <a href="${item.url}" class="search-result-item">
                        <div class="sr-title"><i class="fa-solid fa-arrow-turn-down fa-rotate-270"></i> ${item.title}</div>
                        <div class="sr-desc">${item.desc.substring(0, 70)}...</div>
                    </a>
                `).join('');
                dropdown.style.display = 'block';
            } else {
                dropdown.innerHTML = `<div class="search-result-item" style="color:#94a3b8; text-align:center;"><i class="fa-solid fa-ghost"></i> No encontramos nada para "${query}"</div>`;
                dropdown.style.display = 'block';
            }
        });
        
        // Hide on click outside
        document.addEventListener('click', (e) => {
            if(!input.parentNode.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });
        
        // Show on focus if it has text
        input.addEventListener('focus', (e) => {
            if(e.target.value.length >= 2) dropdown.style.display = 'block';
        });
    });
});

function initMobileEnvironment() {
    // Solo creamos el drawer si NO existe ya en el HTML (Prevención de duplicados TFM)
    if (!document.getElementById('mobile-drawer')) {
        const drawer = document.createElement('div');
        drawer.id = 'mobile-drawer';
        drawer.className = 'mobile-drawer';
        drawer.innerHTML = `
            <button class="drawer-close" onclick="toggleMobileMenu()"><i class="fa-solid fa-xmark"></i></button>
            <div style="text-align:center; margin-bottom:30px;">
                <img src="logo.jpeg" alt="CUDI" style="height:60px; border-radius:10px;">
            </div>
            <ul class="drawer-links">
                <li><a href="index.html" onclick="toggleMobileMenu()"><i class="fa-solid fa-house"></i> Inicio</a></li>
                <li><a href="smart-collar-aventuras-sin-sustos.html" onclick="toggleMobileMenu()"><i class="fa-solid fa-rocket"></i> Lanzamiento</a></li>
                <li><a href="comunidad-cudi.html" onclick="toggleMobileMenu()"><i class="fa-solid fa-people-group"></i> Comunidad</a></li>
                <li><a href="index.html#store-grid" onclick="toggleMobileMenu()"><i class="fa-solid fa-store"></i> Tienda</a></li>
                <li><a href="index.html#suscripciones" onclick="toggleMobileMenu()"><i class="fa-solid fa-shield-cat"></i> Planes</a></li>
                <li><a href="red-socios-clinicas-veterinarias.html" onclick="toggleMobileMenu()"><i class="fa-solid fa-handshake"></i> Partners</a></li>
                <li id="mobile-session-item"></li>
            </ul>
        `;
        document.body.appendChild(drawer);
    }
}

function closeAllPanels() {
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('cart-overlay');
    const cart = document.getElementById('side-cart');
    
    if (drawer) drawer.classList.remove('active');
    if (cart) cart.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('cart-overlay');
    const cart = document.getElementById('side-cart');
    
    // Si el carrito está abierto, lo cerramos primero
    if (cart && cart.classList.contains('active')) {
        cart.classList.remove('active');
    }

    if (drawer) {
        const isActive = drawer.classList.toggle('active');
        if (overlay) {
            if (isActive) overlay.classList.add('active');
            else overlay.classList.remove('active');
        }
        document.body.style.overflow = isActive ? 'hidden' : '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileEnvironment();
    cudi_check_session();
    window.addEventListener('resize', applyMobileShockforce);
});

document.addEventListener('contextmenu', e => {
    if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        e.preventDefault();
    }
});

function showCudiToast(message) {
    let container = document.querySelector('.cudi-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'cudi-toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'cudi-toast';
    toast.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('active'), 10);
    setTimeout(() => {
        toast.classList.remove('active');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}
