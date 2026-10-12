/**
 * ============================================================================
 * MÓDULO TRANSVERSAL 1: ESTADO COMPARTIDO REACTIVO (modulos/estado-compartido.js)
 * Fuente única de verdad ("Single Source of Truth") para:
 *  - Perfil unificado de la mascota activa ('dee' por defecto)
 *  - Carrito de compras omnicanal (sincronizado entre Web y Demo App)
 *  - Sesión del usuario e idioma activo ('es' | 'ca' | 'en')
 * Desarrollo 100% realizado por Sergio Alejandro Ospina Rocha
 * ============================================================================
 */
(function () {
    'use strict';

    const KEYS = {
        PET_DATA: 'cudi_pet_data',
        USER_PET: 'cudi_user_pet',
        CART: 'cudi_cart',
        LANG: 'cudi_lang_pref',
        USER_SESSION: 'cudi_logged_user'
    };

    const DEFAULT_PET = {
        name: 'dee',
        type: 'perro',
        species: 'perro',
        breed: 'Golden Retriever',
        weight: 28,
        age: 'explorer',
        ageLabel: 'Adulto Joven (3 años)',
        energy: 'moderado',
        food: 'barf',
        avatar: 'avatar-mascota-perfil-gemelo-digital.png',
        healthScore: 98,
        bpm: 74,
        temp: 38.4,
        steps: 6420,
        battery: 94
    };

    function getPet() {
        try {
            const raw = localStorage.getItem(KEYS.PET_DATA) || localStorage.getItem(KEYS.USER_PET);
            if (raw) {
                const parsed = JSON.parse(raw);
                return Object.assign({}, DEFAULT_PET, parsed, {
                    name: parsed.name || DEFAULT_PET.name,
                    type: parsed.type || parsed.species || DEFAULT_PET.type,
                    species: parsed.species || parsed.type || DEFAULT_PET.species
                });
            }
        } catch (e) {}
        return Object.assign({}, DEFAULT_PET);
    }

    function setPet(partialPet) {
        const updated = Object.assign({}, getPet(), partialPet);
        try {
            const serialized = JSON.stringify(updated);
            localStorage.setItem(KEYS.PET_DATA, serialized);
            localStorage.setItem(KEYS.USER_PET, serialized);
            window.dispatchEvent(new CustomEvent('cudi:pet_updated', { detail: updated }));
        } catch (e) {}
        return updated;
    }

    function getCart() {
        try {
            const raw = localStorage.getItem(KEYS.CART);
            const parsed = raw ? JSON.parse(raw) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            return [];
        }
    }

    function setCart(items) {
        const safeItems = Array.isArray(items) ? items : [];
        try {
            localStorage.setItem(KEYS.CART, JSON.stringify(safeItems));
            window.dispatchEvent(new CustomEvent('cudi:cart_updated', { detail: safeItems }));
        } catch (e) {}
        return safeItems;
    }

    function getCartTotal() {
        return getCart().reduce((acc, item) => {
            const price = parseFloat(item.price) || 0;
            const qty = parseInt(item.qty || item.quantity || 1, 10) || 1;
            return acc + price * qty;
        }, 0);
    }

    function getLanguage() {
        try {
            return localStorage.getItem(KEYS.LANG) || 'es';
        } catch (e) {
            return 'es';
        }
    }

    function setLanguage(lang) {
        const valid = ['es', 'ca', 'en'].includes(lang) ? lang : 'es';
        try {
            localStorage.setItem(KEYS.LANG, valid);
            window.dispatchEvent(new CustomEvent('cudi:lang_updated', { detail: { lang: valid } }));
        } catch (e) {}
        return valid;
    }

    // Sincronizar entre pestañas o iframes si cambia localStorage
    window.addEventListener('storage', function (e) {
        if (e.key === KEYS.CART) {
            window.dispatchEvent(new CustomEvent('cudi:cart_updated', { detail: getCart() }));
        } else if (e.key === KEYS.PET_DATA || e.key === KEYS.USER_PET) {
            window.dispatchEvent(new CustomEvent('cudi:pet_updated', { detail: getPet() }));
        } else if (e.key === KEYS.LANG) {
            window.dispatchEvent(new CustomEvent('cudi:lang_updated', { detail: { lang: getLanguage() } }));
        }
    });

    window.CudiState = {
        KEYS: KEYS,
        getPet: getPet,
        setPet: setPet,
        getCart: getCart,
        setCart: setCart,
        getCartTotal: getCartTotal,
        getLanguage: getLanguage,
        setLanguage: setLanguage
    };
})();
