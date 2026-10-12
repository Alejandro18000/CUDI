/**
 * ============================================================================
 * MÓDULO TRANSVERSAL 3: INTERNACIONALIZACIÓN GLOBAL (modulos/internacionalizacion.js)
 * Traduce de forma reactiva en las 49 páginas y la Demo App:
 *  - ES (Español) | CA (Català) | EN (English)
 *  - Barra de navegación, menú móvil, buscador, carrito lateral, botones
 *    comunes, migas de pan y bloques de productos/artículos relacionados.
 * Desarrollo 100% realizado por Sergio Alejandro Ospina Rocha
 * ============================================================================
 */
(function () {
    'use strict';

    const TRANSLATIONS = {
        es: {
            nav_home: 'Inicio',
            nav_launch: 'Lanzamiento',
            nav_community: 'Comunidad',
            nav_simulator: 'Simulador',
            nav_store: 'Tienda',
            nav_plans: 'Planes',
            nav_partners: 'Partners',
            nav_demo: 'Demo App',
            search_placeholder: '¿Qué necesita tu compañero hoy?',
            cart_title: 'Tu Cesta de Bienestar',
            cart_total_label: 'Total Estimado:',
            cart_checkout_btn: 'Procesar Pago Seguro',
            demo_pill_text: 'Probar Demo App',
            breadcrumb_home: 'Inicio',
            breadcrumb_store: 'Marketplace CUDI',
            breadcrumb_journal: 'CUDI Journal Clínico',
            related_products_badge: 'ECOSISTEMA CONECTADO CUDI',
            related_products_title: 'Soluciones Complementarias Recomendadas',
            related_products_sub: 'Integra este servicio con el Gemelo Digital de tu mascota para una protección preventiva 360°.',
            related_articles_badge: 'INVESTIGACIÓN Y EVIDENCIA CLÍNICA',
            related_articles_title: 'Estudios Relacionados de CUDI Journal',
            btn_add_cart: 'Añadir a la Cesta',
            btn_view_detail: 'Ver Ficha',
            btn_read_study: 'Leer Estudio Completo',
            back_to_top: 'Subir al inicio'
        },
        ca: {
            nav_home: 'Inici',
            nav_launch: 'Llançament',
            nav_community: 'Comunitat',
            nav_simulator: 'Simulador',
            nav_store: 'Botiga',
            nav_plans: 'Plans',
            nav_partners: 'Partners',
            nav_demo: 'Demo App',
            search_placeholder: 'Què necessita el teu company avui?',
            cart_title: 'La Teva Cistella de Benestar',
            cart_total_label: 'Total Estimat:',
            cart_checkout_btn: 'Processar Pagament Segur',
            demo_pill_text: 'Provar Demo App',
            breadcrumb_home: 'Inici',
            breadcrumb_store: 'Marketplace CUDI',
            breadcrumb_journal: 'CUDI Journal Clínic',
            related_products_badge: 'ECOSISTEMA CONNECTAT CUDI',
            related_products_title: 'Solucions Complementàries Recomanades',
            related_products_sub: 'Integra aquest servei amb el Bessó Digital de la teva mascota per a una protecció preventiva 360°.',
            related_articles_badge: 'RECERCA I EVIDÈNCIA CLÍNICA',
            related_articles_title: 'Estudis Relacionats de CUDI Journal',
            btn_add_cart: 'Afegir a la Cistella',
            btn_view_detail: 'Veure Fitxa',
            btn_read_study: 'Llegir Estudi Complet',
            back_to_top: 'Pujar a l\'inici'
        },
        en: {
            nav_home: 'Home',
            nav_launch: 'Launch',
            nav_community: 'Community',
            nav_simulator: 'Simulator',
            nav_store: 'Store',
            nav_plans: 'Plans',
            nav_partners: 'Partners',
            nav_demo: 'Demo App',
            search_placeholder: 'What does your companion need today?',
            cart_title: 'Your Wellness Cart',
            cart_total_label: 'Estimated Total:',
            cart_checkout_btn: 'Secure Checkout',
            demo_pill_text: 'Try Demo App',
            breadcrumb_home: 'Home',
            breadcrumb_store: 'CUDI Marketplace',
            breadcrumb_journal: 'CUDI Clinical Journal',
            related_products_badge: 'CUDI CONNECTED ECOSYSTEM',
            related_products_title: 'Recommended Complementary Solutions',
            related_products_sub: 'Integrate this service with your pet\'s Digital Twin for 360° preventive protection.',
            related_articles_badge: 'CLINICAL RESEARCH & EVIDENCE',
            related_articles_title: 'Related CUDI Journal Studies',
            btn_add_cart: 'Add to Cart',
            btn_view_detail: 'View Details',
            btn_read_study: 'Read Full Study',
            back_to_top: 'Back to top'
        }
    };

    function getCurrentLang() {
        if (window.CudiState && typeof window.CudiState.getLanguage === 'function') {
            return window.CudiState.getLanguage();
        }
        return localStorage.getItem('cudi_lang_pref') || 'es';
    }

    function t(key) {
        const lang = getCurrentLang();
        const dict = TRANSLATIONS[lang] || TRANSLATIONS.es;
        return dict[key] || TRANSLATIONS.es[key] || key;
    }

    function applyTranslations(lang) {
        const activeLang = ['es', 'ca', 'en'].includes(lang) ? lang : getCurrentLang();
        const dict = TRANSLATIONS[activeLang] || TRANSLATIONS.es;

        document.documentElement.lang = activeLang;

        // 1. Sincronizar todos los selectores .lang-selector
        document.querySelectorAll('.lang-selector').forEach(sel => {
            if (sel.value !== activeLang) sel.value = activeLang;
        });

        // 2. Traducir enlaces del navbar principal (.nav-links-island)
        const navMap = {
            'index.html': dict.nav_home,
            'smart-collar-aventuras-sin-sustos.html': dict.nav_launch,
            'comunidad-cudi.html': dict.nav_community,
            'simulador-financiero.html': dict.nav_simulator,
            'index.html#store-grid': dict.nav_store,
            '#store-grid': dict.nav_store,
            'index.html#suscripciones': dict.nav_plans,
            '#suscripciones': dict.nav_plans,
            'red-socios-clinicas-veterinarias.html': dict.nav_partners
        };

        document.querySelectorAll('.nav-links-island a').forEach(a => {
            const href = a.getAttribute('href');
            if (href && navMap[href] && !a.querySelector('i')) {
                a.textContent = navMap[href];
            }
        });

        // 3. Traducir buscadores
        document.querySelectorAll('.nav-search-island input').forEach(inp => {
            inp.placeholder = dict.search_placeholder;
        });

        // 4. Traducir cabecera y pie del carrito lateral
        const cartTitle = document.querySelector('#side-cart .cart-header h3');
        if (cartTitle) {
            cartTitle.innerHTML = `<i class="cart-icon-cudi" style="color:var(--clr-primary); margin-right:10px;"></i> ${dict.cart_title}`;
        }
        const cartTotalLbl = document.querySelector('#side-cart .cart-total span:first-child');
        if (cartTotalLbl) {
            cartTotalLbl.textContent = dict.cart_total_label;
        }
        const cartCheckoutBtn = document.querySelector('#side-cart .cart-footer a.btn-primary');
        if (cartCheckoutBtn) {
            cartCheckoutBtn.innerHTML = `${dict.cart_checkout_btn} <i class="fa-solid fa-lock"></i>`;
        }

        // 5. Traducir elementos con atributo data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });
    }

    function bindLanguageSelectors() {
        document.querySelectorAll('.lang-selector').forEach(sel => {
            if (sel._cudiI18nBound) return;
            sel._cudiI18nBound = true;
            sel.value = getCurrentLang();
            sel.addEventListener('change', function (e) {
                const newLang = e.target.value;
                if (window.CudiState && typeof window.CudiState.setLanguage === 'function') {
                    window.CudiState.setLanguage(newLang);
                } else {
                    localStorage.setItem('cudi_lang_pref', newLang);
                }
                applyTranslations(newLang);
                if (typeof window.showCudiToast === 'function') {
                    const labels = { es: 'Idioma cambiado a Español', ca: 'Idioma canviat a Català', en: 'Language switched to English' };
                    window.showCudiToast(labels[newLang] || labels.es);
                }
            });
        });
    }

    window.addEventListener('cudi:lang_updated', function (e) {
        if (e.detail && e.detail.lang) {
            applyTranslations(e.detail.lang);
        }
    });

    window.CudiI18n = {
        TRANSLATIONS: TRANSLATIONS,
        t: t,
        applyTranslations: applyTranslations,
        bindLanguageSelectors: bindLanguageSelectors
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            bindLanguageSelectors();
            applyTranslations(getCurrentLang());
        });
    } else {
        bindLanguageSelectors();
        applyTranslations(getCurrentLang());
    }
})();
