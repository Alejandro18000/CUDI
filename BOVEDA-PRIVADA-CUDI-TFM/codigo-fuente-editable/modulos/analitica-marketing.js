/**
 * ============================================================================
 * CUDI MARKETING ANALYTICS & GOOGLE MARKETING PLATFORM CONNECTOR (v6.3)
 * Conecta las 49 páginas indexadas, la Demo App (6 pestañas SPA), el E-Commerce,
 * el Simulador Financiero y el Asistente CUDI AI WebGPU con:
 *  - Google Analytics 4 (GA4 - gtag.js / window.dataLayer)
 *  - Google Tag Manager (GTM)
 *  - Google Search Console (meta google-site-verification + sitemap.xml)
 *  - Meta Pixel & Microsoft Clarity (Funnel Convergente TFM)
 * Desarrollo 100% realizado por Sergio Alejandro Ospina Rocha
 * ============================================================================
 */
(function () {
    'use strict';

    const STORAGE_KEYS = {
        CONFIG: 'cudi_gmp_config_v1',
        EVENT_LOG: 'cudi_ga4_event_log_v1',
        SESSION_ID: 'cudi_ga4_session_id'
    };

    const DEFAULT_CONFIG = {
        ga4Id: 'G-CUDI2026TFM',
        gtmId: 'GTM-CUDI2026',
        gscToken: 'CUDI-GSC-VERIFIED-2026',
        debugMode: true,
        enhancedMeasurement: true
    };

    // Catálogo de metadatos E-Commerce para detección automática en fichas de producto
    const PRODUCT_CATALOG_MAP = {
        'producto-ecopet-organic.html': { id: 'SKU-ECOPET-01', name: 'EcoPet Organic - Dieta BARF Biológica', category: 'Nutrición', price: 42.00 },
        'producto-purebites-clinic.html': { id: 'SKU-PUREBITES-02', name: 'PureBites Clinic - Pienso Hipoalergénico', category: 'Nutrición', price: 38.50 },
        'producto-vitality-mix.html': { id: 'SKU-VITALITY-03', name: 'Vitality Mix - Suplemento Inmune Dual', category: 'Nutrición', price: 24.99 },
        'producto-collar-pro.html': { id: 'SKU-COLLAR-PRO', name: 'Smart Collar CUDI Pro GPS + ECG', category: 'Hardware', price: 149.00 },
        'smart-collar-cudi-gps.html': { id: 'SKU-COLLAR-GPS', name: 'Smart Collar CUDI GPS - Collar Inteligente', category: 'Hardware', price: 149.00 },
        'smart-collar-aventuras-sin-sustos.html': { id: 'SKU-COLLAR-LAUNCH', name: 'Smart Collar CUDI Edición Lanzamiento', category: 'Hardware', price: 149.00 },
        'producto-cudi-shield-basic.html': { id: 'SKU-SHIELD-BASIC', name: 'CUDI Shield Basic - Seguro RC', category: 'Seguros', price: 6.99 },
        'producto-global-pet-protect.html': { id: 'SKU-GLOBAL-PROTECT', name: 'Global Pet Protect - Seguro Salud Total', category: 'Seguros', price: 29.99 },
        'producto-safehome-multipet.html': { id: 'SKU-SAFEHOME-MULTI', name: 'SafeHome MultiPet - Seguro Multiespecie', category: 'Seguros', price: 15.50 },
        'producto-medipet-express.html': { id: 'SKU-MEDIPET-24H', name: 'MediPet Express - Clínicas 24h', category: 'Salud 24/7', price: 45.00 },
        'producto-hospital-clinico-dual.html': { id: 'SKU-HOSPITAL-DUAL', name: 'Hospital Clínico Dual - UCI', category: 'Salud 24/7', price: 85.00 },
        'producto-vethome-cudi.html': { id: 'SKU-VETHOME-DOM', name: 'VetHome CUDI - Veterinario a Domicilio', category: 'Salud 24/7', price: 55.00 },
        'producto-activepaws.html': { id: 'SKU-ACTIVEPAWS', name: 'ActivePaws - Ejercicio y Agilidad Canina', category: 'Paseos & Deporte', price: 19.99 },
        'producto-urban-pet-walkers.html': { id: 'SKU-URBAN-WALKERS', name: 'Urban Pet Walkers - Paseos Certificados', category: 'Paseos & Deporte', price: 14.50 },
        'producto-nannypets-247.html': { id: 'SKU-NANNYPETS-247', name: 'NannyPets 24/7 - Cuidadores a Domicilio', category: 'Paseos & Deporte', price: 49.00 },
        'producto-bubbles--paws.html': { id: 'SKU-BUBBLES-PAWS', name: 'Bubbles & Paws - Baño Ecológico', category: 'Higiene & Spa', price: 22.00 },
        'producto-grooming-master.html': { id: 'SKU-GROOMING-MASTER', name: 'Grooming Master - Peluquería y Estilismo', category: 'Higiene & Spa', price: 35.00 },
        'producto-zenpet-spa.html': { id: 'SKU-ZENPET-SPA', name: 'ZenPet Spa - Hidroterapia y Relajación', category: 'Higiene & Spa', price: 50.00 }
    };

    function getFileName() {
        const path = window.location.pathname || '';
        const clean = path.split('/').pop();
        return clean || 'index.html';
    }

    function detectContentGroup(fileName) {
        if (fileName === 'index.html' || fileName === 'home-2.html') return 'home_ecosystem';
        if (fileName === 'simulador-gemelo-digital-telemetria.html') return 'digital_twin_demo';
        if (fileName === 'simulador-financiero.html' || fileName === 'modelo_financiero.html') return 'financial_simulator';
        if (fileName.startsWith('producto-')) return 'product_detail';
        if (fileName.startsWith('smart-collar-')) return 'smart_collar_hardware';
        if (fileName.startsWith('articulo-') || fileName.startsWith('blog-')) return 'preventive_blog';
        if (fileName.startsWith('unete-') || fileName.includes('red-socios')) return 'b2b_partners';
        if (fileName.includes('contratar-') || fileName.includes('suscripciones-')) return 'checkout_conversion';
        if (fileName === 'comunidad-cudi.html' || fileName === 'mi-mascota.html' || fileName === 'acceso-clientes.html') return 'community_member_area';
        if (fileName === 'estrategia-seo.html') return 'seo_analytics_hub';
        return 'tfm_documentation';
    }

    function loadConfig() {
        let saved = {};
        try {
            saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONFIG) || '{}');
        } catch (e) {}
        const params = new URLSearchParams(window.location.search);
        if (params.get('ga_id')) saved.ga4Id = params.get('ga_id').trim();
        if (params.get('gtm_id')) saved.gtmId = params.get('gtm_id').trim();
        if (params.get('gsc_token')) saved.gscToken = params.get('gsc_token').trim();
        const merged = Object.assign({}, DEFAULT_CONFIG, saved);
        try {
            localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(merged));
        } catch (e) {}
        return merged;
    }

    function getSessionId() {
        let sid = sessionStorage.getItem(STORAGE_KEYS.SESSION_ID);
        if (!sid) {
            sid = 'cudi_sess_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7);
            try { sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, sid); } catch (e) {}
        }
        return sid;
    }

    function getActivePetContext() {
        try {
            const raw = localStorage.getItem('cudi_pet_data') || localStorage.getItem('cudi_user_pet');
            if (raw) {
                const pet = JSON.parse(raw);
                return {
                    pet_name: pet.name || 'dee',
                    pet_species: pet.type || pet.species || 'perro',
                    pet_breed: pet.breed || 'Golden Retriever'
                };
            }
        } catch (e) {}
        return { pet_name: 'dee', pet_species: 'perro', pet_breed: 'Golden Retriever' };
    }

    function getEventLog() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENT_LOG) || '[]');
        } catch (e) {
            return [];
        }
    }

    function pushToEventLog(entry) {
        try {
            const log = getEventLog();
            log.unshift(entry);
            if (log.length > 120) log.length = 120;
            localStorage.setItem(STORAGE_KEYS.EVENT_LOG, JSON.stringify(log));
            window.dispatchEvent(new CustomEvent('cudi:ga4_event', { detail: entry }));
        } catch (e) {}
    }

    const config = loadConfig();

    // 1. Inicializar window.dataLayer y window.gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
        window.dataLayer.push(arguments);
    };

    // 2. Inyectar Google Search Console meta tag si no existe
    function ensureSearchConsoleMeta() {
        if (!document.head) return;
        let meta = document.querySelector('meta[name="google-site-verification"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = 'google-site-verification';
            meta.content = config.gscToken || DEFAULT_CONFIG.gscToken;
            document.head.appendChild(meta);
        }
    }

    // 3. Inyectar Google Analytics 4 (gtag.js) si no está cargado con el ID activo
    function ensureGoogleTagScripts() {
        if (!document.head) return;
        ensureSearchConsoleMeta();

        const gaId = config.ga4Id || DEFAULT_CONFIG.ga4Id;
        const existingGtag = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
        if (!existingGtag) {
            const s = document.createElement('script');
            s.async = true;
            s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
            document.head.appendChild(s);
        }

        window.gtag('js', new Date());
        window.gtag('config', gaId, {
            debug_mode: !!config.debugMode,
            send_page_view: false,
            currency: 'EUR'
        });

        // Si el usuario configuró un ID distinto al placeholder, configurar ambos para que nunca se pierdan eventos
        if (gaId !== DEFAULT_CONFIG.ga4Id) {
            window.gtag('config', DEFAULT_CONFIG.ga4Id, { debug_mode: true, send_page_view: false });
        }
    }

    // 4. Función maestra para enviar eventos a GA4, GTM, Meta Pixel y al Monitor TFM
    function track(eventName, params = {}) {
        const fileName = getFileName();
        const contentGroup = detectContentGroup(fileName);
        const petCtx = getActivePetContext();

        const enrichedParams = Object.assign({
            page_location: window.location.href,
            page_path: fileName,
            page_title: document.title || fileName,
            content_group: contentGroup,
            session_id: getSessionId(),
            pet_name: petCtx.pet_name,
            pet_species: petCtx.pet_species,
            pet_breed: petCtx.pet_breed,
            measurement_id: config.ga4Id
        }, params);

        // Enviar a Google Analytics 4 (gtag)
        if (typeof window.gtag === 'function') {
            window.gtag('event', eventName, enrichedParams);
        }

        // Enviar objeto explícito al dataLayer para Google Tag Manager (GTM)
        window.dataLayer.push(Object.assign({
            event: eventName,
            cudi_timestamp: new Date().toISOString()
        }, enrichedParams));

        // Sincronizar con Meta Pixel si está disponible
        if (typeof window.fbq === 'function') {
            if (eventName === 'add_to_cart') window.fbq('track', 'AddToCart', { value: enrichedParams.value || 0, currency: 'EUR' });
            else if (eventName === 'begin_checkout') window.fbq('track', 'InitiateCheckout', { value: enrichedParams.value || 0, currency: 'EUR' });
            else if (eventName === 'purchase') window.fbq('track', 'Purchase', { value: enrichedParams.value || 0, currency: 'EUR' });
            else if (eventName === 'generate_lead') window.fbq('track', 'Lead', enrichedParams);
            else if (eventName === 'search') window.fbq('track', 'Search', { search_string: enrichedParams.search_term || '' });
        }

        // Guardar en el registro en tiempo real para auditoría y visualización en estrategia-seo.html
        const logEntry = {
            id: 'ev_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
            timestamp: new Date().toISOString(),
            timeFormatted: new Date().toLocaleTimeString('es-ES', { hour12: false }),
            event: eventName,
            page: fileName,
            contentGroup: contentGroup,
            measurementId: config.ga4Id,
            params: enrichedParams
        };
        pushToEventLog(logEntry);
        return logEntry;
    }

    // 5. Tracking automático de vista de página y ficha de producto (view_item)
    function trackInitialPageAndProduct() {
        const fileName = getFileName();
        const contentGroup = detectContentGroup(fileName);

        track('page_view', {
            content_group: contentGroup,
            page_type: contentGroup
        });

        // Si es una de las 14 fichas de producto o página del Smart Collar, disparar view_item E-Commerce GA4
        const prod = PRODUCT_CATALOG_MAP[fileName];
        if (prod) {
            track('view_item', {
                currency: 'EUR',
                value: prod.price,
                items: [{
                    item_id: prod.id,
                    item_name: prod.name,
                    item_category: prod.category,
                    price: prod.price,
                    quantity: 1
                }]
            });
        }

        // Si estamos en la Demo App, registrar apertura inicial de la pantalla de la Demo
        if (fileName === 'simulador-gemelo-digital-telemetria.html') {
            track('screen_view', {
                app_name: 'CUDI Gemelo Digital App',
                screen_name: 'Demo_Inicial_Onboarding'
            });
        }
    }

    // 6. Instrumentar funciones globales de la Web, Demo App, Simulador Financiero e IA
    function wrapGlobalFunction(fnName, afterCallback) {
        const orig = window[fnName];
        if (typeof orig !== 'function' || orig._cudiAnalyticsWrapped) return;
        const wrapped = function () {
            const result = orig.apply(this, arguments);
            try {
                afterCallback.apply(this, arguments);
            } catch (e) {}
            return result;
        };
        wrapped._cudiAnalyticsWrapped = true;
        window[fnName] = wrapped;
    }

    function attachEcosystemHooks() {
        // --- A. E-COMMERCE GLOBAL (script.js) ---
        wrapGlobalFunction('addToCart', function (name, price, img) {
            const numericPrice = parseFloat(price) || 0;
            track('add_to_cart', {
                currency: 'EUR',
                value: numericPrice,
                items: [{
                    item_id: 'CUDI_' + String(name || 'ITEM').toUpperCase().replace(/[^A-Z0-9]/g, '_').slice(0, 20),
                    item_name: name || 'Producto CUDI',
                    price: numericPrice,
                    quantity: 1
                }]
            });
        });

        wrapGlobalFunction('removeFromCart', function (index) {
            track('remove_from_cart', { cart_item_index: index });
        });

        wrapGlobalFunction('toggleCart', function () {
            const cart = document.getElementById('side-cart');
            if (cart && cart.classList.contains('active')) {
                track('view_cart', { source: getFileName() });
            }
        });

        wrapGlobalFunction('openCudiAiWithQuery', function (query) {
            track('ai_search_escalation', { search_term: query });
        });

        // --- B. DEMO APP SPA (app-demo.js - 6 Pestañas, Triaje, GPS, Tienda, Social, Perfil) ---
        wrapGlobalFunction('proceedToDashboard', function () {
            const typeEl = document.getElementById('selected-pet-type');
            const nameEl = document.getElementById('pet-name');
            const breedEl = document.getElementById('pet-breed');
            const ageEl = document.getElementById('pet-age');
            const foodEl = document.getElementById('pet-food');
            track('demo_onboarding_complete', {
                pet_species: typeEl ? typeEl.value : 'perro',
                pet_name: nameEl ? nameEl.value : 'dee',
                pet_breed: breedEl ? breedEl.value : 'Golden Retriever',
                pet_life_stage: ageEl ? ageEl.value : 'explorer',
                pet_diet: foodEl ? foodEl.value : 'barf'
            });
            track('screen_view', {
                app_name: 'CUDI Gemelo Digital App',
                screen_name: 'Demo_Tab_dash'
            });
        });

        wrapGlobalFunction('switchTab', function (tabId) {
            const tabNames = {
                dash: 'IA_BioDashboard',
                health: 'Salud_Expediente',
                gps: 'Ubicacion_GPS_Radar',
                store: 'Tienda_Marketplace',
                social: 'Social_CUDI_Paws',
                profile: 'Perfil_Unificado'
            };
            track('screen_view', {
                app_name: 'CUDI Gemelo Digital App',
                screen_name: 'Demo_Tab_' + (tabNames[tabId] || tabId),
                demo_tab_id: tabId
            });
            track('demo_tab_switch', {
                tab_id: tabId,
                tab_label: tabNames[tabId] || tabId
            });
        });

        wrapGlobalFunction('triggerIASimulation', function (scenarioKey) {
            track('demo_ai_triage_scan', {
                scenario_key: scenarioKey || 'general',
                source: 'demo_bio_dashboard'
            });
        });

        wrapGlobalFunction('selectTriageScenario', function (scenarioKey) {
            track('demo_ai_triage_scan', {
                scenario_key: scenarioKey || 'custom',
                source: 'triage_modal_selector'
            });
        });

        wrapGlobalFunction('toggleGpsSimulation', function () {
            track('demo_gps_interaction', { gps_action: 'simulate_escape_toggle' });
        });

        wrapGlobalFunction('triggerCollarSound', function () {
            track('demo_gps_interaction', { gps_action: 'collar_sound_beacon' });
        });

        wrapGlobalFunction('toggleCollarLED', function () {
            track('demo_gps_interaction', { gps_action: 'collar_night_led' });
        });

        wrapGlobalFunction('triggerLostMode', function () {
            track('demo_gps_interaction', { gps_action: 'collar_lost_mode_alarm' });
        });

        wrapGlobalFunction('adjustGeofence', function () {
            track('demo_gps_interaction', { gps_action: 'adjust_geofence_radius' });
        });

        wrapGlobalFunction('toggleGpsRoute', function () {
            track('demo_gps_interaction', { gps_action: 'toggle_walking_trail' });
        });

        wrapGlobalFunction('addToAppCart', function (name, price) {
            const numericPrice = parseFloat(price) || 0;
            track('add_to_cart', {
                currency: 'EUR',
                value: numericPrice,
                source: 'demo_in_app_store',
                items: [{
                    item_name: name || 'Servicio Demo CUDI',
                    price: numericPrice,
                    quantity: 1
                }]
            });
        });

        wrapGlobalFunction('openFullCheckout', function () {
            track('begin_checkout', {
                currency: 'EUR',
                source: 'demo_in_app_checkout'
            });
        });

        wrapGlobalFunction('completeOrder', function () {
            track('purchase', {
                transaction_id: 'TX_DEMO_' + Date.now(),
                currency: 'EUR',
                source: 'demo_in_app_checkout'
            });
        });

        wrapGlobalFunction('saludarMascota', function (petName) {
            track('demo_social_interaction', {
                social_action: 'saludar_paws',
                target_pet: petName || 'neighbor_pet'
            });
        });

        wrapGlobalFunction('openFichaMascota', function (petName) {
            track('demo_social_interaction', {
                social_action: 'ver_ficha_biometrica',
                target_pet: petName || 'neighbor_pet'
            });
        });

        // --- C. ASISTENTE CUDI AI COMPANION (cudi-ai.js) ---
        if (window.CudiAI) {
            if (typeof window.CudiAI.toggle === 'function' && !window.CudiAI.toggle._cudiAnalyticsWrapped) {
                const origToggle = window.CudiAI.toggle;
                window.CudiAI.toggle = function (forceOpen) {
                    const res = origToggle.apply(this, arguments);
                    const panel = document.querySelector('.cudi-ai-panel');
                    if (panel && panel.classList.contains('open')) {
                        track('ai_companion_open', { source_page: getFileName() });
                    }
                    return res;
                };
                window.CudiAI.toggle._cudiAnalyticsWrapped = true;
            }
            if (typeof window.CudiAI.loadLocalLLM === 'function' && !window.CudiAI.loadLocalLLM._cudiAnalyticsWrapped) {
                const origLoad = window.CudiAI.loadLocalLLM;
                window.CudiAI.loadLocalLLM = function () {
                    track('ai_local_model_load', { engine: 'webgpu_mlc_llm' });
                    return origLoad.apply(this, arguments);
                };
                window.CudiAI.loadLocalLLM._cudiAnalyticsWrapped = true;
            }
            if (typeof window.CudiAI.ask === 'function' && !window.CudiAI.ask._cudiAnalyticsWrapped) {
                const origAsk = window.CudiAI.ask;
                window.CudiAI.ask = function (questionText) {
                    track('ai_question_asked', {
                        question_preview: String(questionText || '').slice(0, 80),
                        ai_engine: (window.CudiAI.isLocalReady ? 'webgpu_neural' : 'rag_expert')
                    });
                    return origAsk.apply(this, arguments);
                };
                window.CudiAI.ask._cudiAnalyticsWrapped = true;
            }
        }
    }

    // 7. Listeners delegados DOM para buscador, simulador financiero, formularios B2B y checkout web
    function attachDomListeners() {
        // Buscador predictivo en navbar
        document.querySelectorAll('.nav-search-island input').forEach(inp => {
            if (inp._cudiAnalyticsBound) return;
            inp._cudiAnalyticsBound = true;
            let debounceTimer = null;
            inp.addEventListener('input', function () {
                clearTimeout(debounceTimer);
                const val = (inp.value || '').trim();
                if (val.length >= 3) {
                    debounceTimer = setTimeout(() => {
                        track('search', { search_term: val });
                    }, 900);
                }
            });
        });

        // Simulador financiero: tarjetas de escenario y sliders
        document.querySelectorAll('.scenario-card-btn').forEach(btn => {
            if (btn._cudiAnalyticsBound) return;
            btn._cudiAnalyticsBound = true;
            btn.addEventListener('click', function () {
                const title = btn.querySelector('h3') ? btn.querySelector('h3').textContent.trim() : (btn.dataset.scenario || 'escenario');
                track('financial_scenario_selected', { scenario_name: title });
            });
        });

        document.querySelectorAll('.sim-slider').forEach(slider => {
            if (slider._cudiAnalyticsBound) return;
            slider._cudiAnalyticsBound = true;
            slider.addEventListener('change', function () {
                track('financial_assumption_adjusted', {
                    parameter_id: slider.id || 'slider',
                    parameter_value: slider.value
                });
            });
        });

        // Formularios de captación B2B, Checkout y Registro
        document.querySelectorAll('form').forEach(form => {
            if (form._cudiAnalyticsBound) return;
            form._cudiAnalyticsBound = true;
            form.addEventListener('submit', function () {
                const fileName = getFileName();
                if (fileName.includes('contratar-')) {
                    track('purchase', {
                        transaction_id: 'TX_WEB_' + Date.now(),
                        currency: 'EUR',
                        value: 29.90
                    });
                } else if (fileName.startsWith('unete-') || fileName.includes('red-socios')) {
                    track('generate_lead', {
                        lead_type: 'b2b_partner_application',
                        partner_page: fileName
                    });
                } else {
                    track('generate_lead', {
                        lead_type: 'form_submission',
                        source_page: fileName
                    });
                }
            });
        });

        // Clics en botones de suscripción y checkout
        document.addEventListener('click', function (e) {
            const link = e.target.closest('a[href*="contratar-plan-premium-cudi.html"]');
            if (link) {
                track('begin_checkout', {
                    currency: 'EUR',
                    source_page: getFileName(),
                    cta_text: (link.textContent || '').trim().slice(0, 50)
                });
            }
        });
    }

    // 8. Renderizar el Centro de Control en Vivo de Google Marketing Platform en estrategia-seo.html
    function renderGmpControlCenter() {
        const container = document.getElementById('cudi-gmp-live-hub');
        if (!container) return;

        const currentCfg = loadConfig();
        const log = getEventLog();

        const countPageViews = log.filter(e => e.event === 'page_view' || e.event === 'screen_view').length;
        const countEcommerce = log.filter(e => ['view_item', 'add_to_cart', 'begin_checkout', 'purchase', 'view_cart'].includes(e.event)).length;
        const countDemoAi = log.filter(e => e.event.startsWith('demo_') || e.event.startsWith('ai_') || e.event.startsWith('financial_')).length;

        container.innerHTML = `
            <div style="background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color:white; border-radius:28px; padding:32px; box-shadow:0 24px 60px rgba(15,23,42,0.18); border:1px solid rgba(56,189,248,0.25); text-align:left;">
                <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:16px; margin-bottom:24px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:20px;">
                    <div>
                        <span style="display:inline-flex; align-items:center; gap:8px; background:rgba(16,185,129,0.18); color:#34d399; border:1px solid rgba(16,185,129,0.4); padding:5px 14px; border-radius:50px; font-size:0.76rem; font-weight:800; letter-spacing:0.6px; text-transform:uppercase;">
                            <span style="width:8px; height:8px; border-radius:50%; background:#10b981; display:inline-block;"></span>
                            Conectado a Google Marketing Platform (49 Páginas + Demo SPA + IA)
                        </span>
                        <h2 style="color:white !important; font-family:'Outfit',sans-serif; font-size:1.85rem; margin:10px 0 4px;">Centro de Conexión GA4, Tag Manager y Search Console</h2>
                        <p style="color:#94a3b8; font-size:0.92rem; margin:0;">Configura tu ID de Medición real de Google Analytics 4 (<code style="color:#38bdf8;">G-XXXXXXXXXX</code>) y audita en tiempo real el flujo <code style="color:#38bdf8;">window.dataLayer</code> de todo el ecosistema.</p>
                    </div>
                    <div style="display:flex; gap:10px; flex-wrap:wrap;">
                        <a href="https://analytics.google.com/" target="_blank" rel="noopener" style="background:#0284c7; color:white; text-decoration:none; padding:10px 16px; border-radius:12px; font-weight:700; font-size:0.84rem; display:inline-flex; align-items:center; gap:8px;">
                            <i class="fa-solid fa-chart-simple"></i> Abrir Google Analytics 4 <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.75rem;"></i>
                        </a>
                        <a href="sitemap.xml" target="_blank" style="background:rgba(255,255,255,0.1); color:white; text-decoration:none; padding:10px 16px; border-radius:12px; font-weight:700; font-size:0.84rem; display:inline-flex; align-items:center; gap:8px; border:1px solid rgba(255,255,255,0.15);">
                            <i class="fa-solid fa-sitemap"></i> Ver sitemap.xml (49 URLs)
                        </a>
                    </div>
                </div>

                <!-- Configurador de IDs de Google -->
                <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; margin-bottom:24px; background:rgba(15,23,42,0.65); padding:20px; border-radius:18px; border:1px solid rgba(255,255,255,0.08);">
                    <div>
                        <label style="display:block; font-size:0.75rem; font-weight:800; color:#38bdf8; text-transform:uppercase; margin-bottom:6px;">ID de Medición GA4 (gtag.js)</label>
                        <input id="gmp-input-ga4" type="text" value="${currentCfg.ga4Id}" placeholder="G-XXXXXXXXXX" style="width:100%; padding:10px 12px; border-radius:10px; border:1px solid rgba(255,255,255,0.2); background:#0f172a; color:white; font-weight:700; font-family:monospace; box-sizing:border-box;">
                    </div>
                    <div>
                        <label style="display:block; font-size:0.75rem; font-weight:800; color:#38bdf8; text-transform:uppercase; margin-bottom:6px;">ID Google Tag Manager (GTM)</label>
                        <input id="gmp-input-gtm" type="text" value="${currentCfg.gtmId}" placeholder="GTM-XXXXXXX" style="width:100%; padding:10px 12px; border-radius:10px; border:1px solid rgba(255,255,255,0.2); background:#0f172a; color:white; font-weight:700; font-family:monospace; box-sizing:border-box;">
                    </div>
                    <div>
                        <label style="display:block; font-size:0.75rem; font-weight:800; color:#38bdf8; text-transform:uppercase; margin-bottom:6px;">Token Google Search Console</label>
                        <div style="display:flex; gap:8px;">
                            <input id="gmp-input-gsc" type="text" value="${currentCfg.gscToken}" placeholder="Token de verificación" style="width:100%; padding:10px 12px; border-radius:10px; border:1px solid rgba(255,255,255,0.2); background:#0f172a; color:white; font-weight:700; font-family:monospace; box-sizing:border-box;">
                            <button id="gmp-btn-save" type="button" style="background:#10b981; color:#0f172a; border:none; border-radius:10px; padding:0 16px; font-weight:800; cursor:pointer; white-space:nowrap;">Guardar</button>
                        </div>
                    </div>
                </div>

                <!-- KPIs de Telemetría en Tiempo Real -->
                <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:14px; margin-bottom:24px;">
                    <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:16px;">
                        <div style="font-size:0.72rem; color:#94a3b8; font-weight:700; text-transform:uppercase;">Páginas Conectadas</div>
                        <div style="font-size:1.75rem; font-weight:800; color:#38bdf8; font-family:'Outfit',sans-serif;">49 / 49</div>
                        <div style="font-size:0.75rem; color:#34d399;">100% Indexadas + Demo SPA</div>
                    </div>
                    <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:16px;">
                        <div style="font-size:0.72rem; color:#94a3b8; font-weight:700; text-transform:uppercase;">Eventos GA4 en Sesión</div>
                        <div id="gmp-kpi-total" style="font-size:1.75rem; font-weight:800; color:white; font-family:'Outfit',sans-serif;">${log.length}</div>
                        <div style="font-size:0.75rem; color:#94a3b8;">Enviados a window.dataLayer</div>
                    </div>
                    <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:16px;">
                        <div style="font-size:0.72rem; color:#94a3b8; font-weight:700; text-transform:uppercase;">Eventos E-Commerce</div>
                        <div id="gmp-kpi-ecom" style="font-size:1.75rem; font-weight:800; color:#f59e0b; font-family:'Outfit',sans-serif;">${countEcommerce}</div>
                        <div style="font-size:0.75rem; color:#94a3b8;">view_item, add_to_cart, purchase</div>
                    </div>
                    <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:16px;">
                        <div style="font-size:0.72rem; color:#94a3b8; font-weight:700; text-transform:uppercase;">Demo App & IA WebGPU</div>
                        <div id="gmp-kpi-demo" style="font-size:1.75rem; font-weight:800; color:#34d399; font-family:'Outfit',sans-serif;">${countDemoAi}</div>
                        <div style="font-size:0.75rem; color:#94a3b8;">Triaje, GPS, 6 Pestañas, Chat IA</div>
                    </div>
                </div>

                <!-- Botones de Simulación de Eventos de Marketing en Vivo -->
                <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:12px; margin-bottom:14px;">
                    <div style="font-weight:800; font-size:0.95rem; color:#e2e8f0;">
                        <i class="fa-solid fa-satellite-dish" style="color:#38bdf8; margin-right:6px;"></i> Inspector <code style="color:#38bdf8;">DebugView</code> en Tiempo Real (<span id="gmp-active-id-badge">${currentCfg.ga4Id}</span>)
                    </div>
                    <div style="display:flex; flex-wrap:wrap; gap:8px;">
                        <button type="button" id="gmp-btn-test-demo" style="background:rgba(56,189,248,0.15); color:#38bdf8; border:1px solid rgba(56,189,248,0.35); border-radius:10px; padding:7px 12px; font-size:0.78rem; font-weight:700; cursor:pointer;">
                            <i class="fa-solid fa-bolt"></i> Simular Evento Demo + Conversión GA4
                        </button>
                        <button type="button" id="gmp-btn-export" style="background:rgba(255,255,255,0.1); color:white; border:1px solid rgba(255,255,255,0.2); border-radius:10px; padding:7px 12px; font-size:0.78rem; font-weight:700; cursor:pointer;">
                            <i class="fa-solid fa-download"></i> Exportar JSON GA4
                        </button>
                        <button type="button" id="gmp-btn-clear" style="background:rgba(239,68,68,0.15); color:#fca5a5; border:1px solid rgba(239,68,68,0.3); border-radius:10px; padding:7px 12px; font-size:0.78rem; font-weight:700; cursor:pointer;">
                            Limpiar Log
                        </button>
                    </div>
                </div>

                <!-- Tabla de Eventos en Tiempo Real -->
                <div style="background:#020617; border:1px solid rgba(255,255,255,0.1); border-radius:16px; overflow:hidden;">
                    <div style="max-height:320px; overflow-y:auto; overflow-x:auto;">
                        <table style="width:100%; border-collapse:collapse; font-size:0.8rem; font-family:monospace; color:#e2e8f0;">
                            <thead>
                                <tr style="background:#0f172a; color:#38bdf8; text-align:left; border-bottom:1px solid rgba(255,255,255,0.1);">
                                    <th style="padding:10px 12px;">Hora</th>
                                    <th style="padding:10px 12px;">Evento GA4</th>
                                    <th style="padding:10px 12px;">Página / Origen</th>
                                    <th style="padding:10px 12px;">Grupo Contenido</th>
                                    <th style="padding:10px 12px;">Parámetros Clave (dataLayer)</th>
                                </tr>
                            </thead>
                            <tbody id="gmp-live-table-body">
                                ${log.slice(0, 25).map(item => `
                                    <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                                        <td style="padding:8px 12px; color:#94a3b8; white-space:nowrap;">${item.timeFormatted || ''}</td>
                                        <td style="padding:8px 12px; font-weight:700; color:#34d399; white-space:nowrap;">${item.event}</td>
                                        <td style="padding:8px 12px; color:#bae6fd; white-space:nowrap;">${item.page}</td>
                                        <td style="padding:8px 12px; color:#f59e0b; white-space:nowrap;">${item.contentGroup}</td>
                                        <td style="padding:8px 12px; color:#cbd5e1; max-width:340px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${JSON.stringify({
                                            pet: item.params.pet_name,
                                            screen: item.params.screen_name || undefined,
                                            value: item.params.value || undefined,
                                            scenario: item.params.scenario_key || item.params.scenario_name || undefined,
                                            action: item.params.gps_action || item.params.social_action || undefined
                                        })}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        const saveBtn = document.getElementById('gmp-btn-save');
        if (saveBtn) {
            saveBtn.onclick = function () {
                const ga4Id = (document.getElementById('gmp-input-ga4').value || '').trim() || DEFAULT_CONFIG.ga4Id;
                const gtmId = (document.getElementById('gmp-input-gtm').value || '').trim() || DEFAULT_CONFIG.gtmId;
                const gscToken = (document.getElementById('gmp-input-gsc').value || '').trim() || DEFAULT_CONFIG.gscToken;
                Object.assign(config, { ga4Id, gtmId, gscToken });
                localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
                ensureGoogleTagScripts();
                track('gmp_configuration_updated', { new_ga4_id: ga4Id, new_gtm_id: gtmId });
                renderGmpControlCenter();
                if (typeof window.showCudiToast === 'function') {
                    window.showCudiToast('Conectado a Google Analytics 4: ' + ga4Id);
                }
            };
        }

        const testBtn = document.getElementById('gmp-btn-test-demo');
        if (testBtn) {
            testBtn.onclick = function () {
                track('demo_ai_triage_scan', { scenario_key: 'calor', severity_score: 88, source: 'gmp_live_test' });
                track('add_to_cart', {
                    currency: 'EUR',
                    value: 149.00,
                    items: [{ item_id: 'SKU-COLLAR-PRO', item_name: 'Smart Collar CUDI Pro GPS', price: 149.00, quantity: 1 }]
                });
                track('purchase', {
                    transaction_id: 'TX_TEST_' + Date.now(),
                    currency: 'EUR',
                    value: 149.00
                });
                renderGmpControlCenter();
            };
        }

        const exportBtn = document.getElementById('gmp-btn-export');
        if (exportBtn) {
            exportBtn.onclick = function () {
                const blob = new Blob([JSON.stringify(getEventLog(), null, 2)], { type: 'application/json' });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = 'cudi_ga4_datalayer_log.json';
                a.click();
            };
        }

        const clearBtn = document.getElementById('gmp-btn-clear');
        if (clearBtn) {
            clearBtn.onclick = function () {
                localStorage.setItem(STORAGE_KEYS.EVENT_LOG, '[]');
                track('gmp_log_initialized', { status: 'clean' });
                renderGmpControlCenter();
            };
        }
    }

    // Exponer API pública global
    window.CudiAnalytics = {
        track: track,
        getConfig: () => Object.assign({}, config),
        getEventLog: getEventLog,
        refreshHub: renderGmpControlCenter
    };

    // Inicializar inmediatamente las etiquetas de Google en <head>
    ensureGoogleTagScripts();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            trackInitialPageAndProduct();
            attachEcosystemHooks();
            attachDomListeners();
            renderGmpControlCenter();
            // Segundo pase tras carga diferida de scripts (cudi-ai.js / app-demo.js)
            setTimeout(attachEcosystemHooks, 600);
        });
    } else {
        trackInitialPageAndProduct();
        attachEcosystemHooks();
        attachDomListeners();
        renderGmpControlCenter();
        setTimeout(attachEcosystemHooks, 600);
    }

    window.addEventListener('cudi:ga4_event', function () {
        if (document.getElementById('cudi-gmp-live-hub')) {
            renderGmpControlCenter();
        }
    });
})();
