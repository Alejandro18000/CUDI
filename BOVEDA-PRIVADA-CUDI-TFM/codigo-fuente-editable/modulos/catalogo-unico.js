/**
 * ============================================================================
 * MÓDULO TRANSVERSAL 2: CATÁLOGO MAESTRO ÚNICO (modulos/catalogo-unico.js)
 * Unifica los 18 productos, servicios veterinarios, seguros, hardware y los
 * artículos científicos del ecosistema CUDI para:
 *  - Tienda Web y 14 fichas producto-*.html (Breadcrumbs + Relacionados)
 *  - Artículos del Blog / CUDI Journal (Estudios Relacionados)
 *  - Pestaña Tienda y Triaje IA en la Demo App
 * Desarrollo 100% realizado por Sergio Alejandro Ospina Rocha
 * ============================================================================
 */
(function () {
    'use strict';

    const PRODUCTOS = [
        {
            id: 'SKU-COLLAR-GPS',
            url: 'smart-collar-cudi-gps.html',
            title: 'Smart Collar CUDI GPS',
            shortTitle: 'Smart Collar CUDI GPS',
            category: 'Hardware & Telemetría',
            categorySlug: 'hardware',
            price: 149.00,
            priceFormatted: '149.00 €',
            img: 'cudi-smart-collar-geolocalizacion-gps.png',
            icon: 'fa-satellite-dish',
            desc: 'Collar biométrico con GPS multibanda, ECG continuo, sensor térmico y geocercas activas.'
        },
        {
            id: 'SKU-ECOPET-01',
            url: 'producto-ecopet-organic.html',
            title: 'EcoPet Organic - Dieta BARF Biológica',
            shortTitle: 'EcoPet Organic',
            category: 'Nutrición & Dieta',
            categorySlug: 'nutricion',
            price: 42.00,
            priceFormatted: '42.00 €',
            img: 'dietas-personalizadas-longevidad-mascotas.png',
            icon: 'fa-bowl-food',
            desc: 'Alimento crudo biológicamente apropiado (BARF) con carne de pasto y vegetales orgánicos.'
        },
        {
            id: 'SKU-PUREBITES-02',
            url: 'producto-purebites-clinic.html',
            title: 'PureBites Clinic - Pienso Hipoalergénico',
            shortTitle: 'PureBites Clinic',
            category: 'Nutrición & Dieta',
            categorySlug: 'nutricion',
            price: 38.50,
            priceFormatted: '38.50 €',
            img: 'marketplace-alimentos-organicos-perros.png',
            icon: 'fa-prescription-bottle',
            desc: 'Pienso clínico prescrito por IA para sensibilidades gástricas, alergias cutáneas y soporte renal.'
        },
        {
            id: 'SKU-VITALITY-03',
            url: 'producto-vitality-mix.html',
            title: 'Vitality Mix - Suplemento Inmune Dual',
            shortTitle: 'Vitality Mix',
            category: 'Nutrición & Dieta',
            categorySlug: 'nutricion',
            price: 24.99,
            priceFormatted: '24.99 €',
            img: 'marketplace-alimentos-organicos-perros.png',
            icon: 'fa-capsules',
            desc: 'Suplemento con Omega-3, cúrcuma y condroprotectores ajustado al gasto calórico del Smart Collar.'
        },
        {
            id: 'SKU-SHIELD-BASIC',
            url: 'producto-cudi-shield-basic.html',
            title: 'CUDI Shield Basic - Seguro RC y Urgencias',
            shortTitle: 'CUDI Shield Basic',
            category: 'Seguros & Protección',
            categorySlug: 'seguros',
            price: 6.99,
            priceFormatted: '6.99 €/mes',
            img: 'seguros-gastos-veterinarios-perros-gatos.png',
            icon: 'fa-shield-halved',
            desc: 'Cobertura legal de Responsabilidad Civil hasta 300.000€ y asistencia veterinaria urgente.'
        },
        {
            id: 'SKU-GLOBAL-PROTECT',
            url: 'producto-global-pet-protect.html',
            title: 'Global Pet Protect - Seguro de Salud Total',
            shortTitle: 'Global Pet Protect',
            category: 'Seguros & Protección',
            categorySlug: 'seguros',
            price: 29.99,
            priceFormatted: '29.99 €/mes',
            img: 'clinica-veterinaria-red-socios.png',
            icon: 'fa-shield-heart',
            desc: 'Seguro veterinario integral con reembolso del 80% en cirugías, hospitalización y diagnóstico.'
        },
        {
            id: 'SKU-SAFEHOME-MULTI',
            url: 'producto-safehome-multipet.html',
            title: 'SafeHome MultiPet - Seguro Hogares Multiespecie',
            shortTitle: 'SafeHome MultiPet',
            category: 'Seguros & Protección',
            categorySlug: 'seguros',
            price: 15.50,
            priceFormatted: '15.50 €/mes',
            img: 'familia-multiespecie-paz-mental.png',
            icon: 'fa-house-chimney-medical',
            desc: 'Protección combinada para hogares donde conviven perros y gatos con telemedicina incluida.'
        },
        {
            id: 'SKU-MEDIPET-24H',
            url: 'producto-medipet-express.html',
            title: 'MediPet Express - Clínicas Veterinarias 24h',
            shortTitle: 'MediPet Express',
            category: 'Veterinaria & Salud 24/7',
            categorySlug: 'clinica',
            price: 45.00,
            priceFormatted: '45.00 €',
            img: 'clinica-veterinaria-red-socios.png',
            icon: 'fa-truck-medical',
            desc: 'Atención prioritaria sin esperas en clínicas asociadas conectadas al Gemelo Digital CUDI.'
        },
        {
            id: 'SKU-HOSPITAL-DUAL',
            url: 'producto-hospital-clinico-dual.html',
            title: 'Hospital Clínico Dual - Medicina Interna y UCI',
            shortTitle: 'Hospital Clínico Dual',
            category: 'Veterinaria & Salud 24/7',
            categorySlug: 'clinica',
            price: 85.00,
            priceFormatted: '85.00 €',
            img: 'servicios-telemedicina-veterinaria-domicilio.png',
            icon: 'fa-hospital',
            desc: 'Diagnóstico por imagen avanzado, cirugía especializada y UCI 24h canina y felina.'
        },
        {
            id: 'SKU-VETHOME-DOM',
            url: 'producto-vethome-cudi.html',
            title: 'VetHome CUDI - Veterinario a Domicilio',
            shortTitle: 'VetHome CUDI',
            category: 'Veterinaria & Salud 24/7',
            categorySlug: 'clinica',
            price: 55.00,
            priceFormatted: '55.00 €',
            img: 'triaje-ia-veterinario-urgencias.png',
            icon: 'fa-user-doctor',
            desc: 'Consulta médica y vacunación en tu propio hogar sin estrés de desplazamiento.'
        },
        {
            id: 'SKU-ACTIVEPAWS',
            url: 'producto-activepaws.html',
            title: 'ActivePaws - Ejercicio y Agilidad Canina',
            shortTitle: 'ActivePaws',
            category: 'Paseos & Cuidadores',
            categorySlug: 'paseos',
            price: 19.99,
            priceFormatted: '19.99 €',
            img: 'humanizacion-mascotas-familia.png',
            icon: 'fa-person-running',
            desc: 'Sesiones de ejercicio guiado y estimulación olfativa monitorizadas por GPS y pulsómetro.'
        },
        {
            id: 'SKU-URBAN-WALKERS',
            url: 'producto-urban-pet-walkers.html',
            title: 'Urban Pet Walkers - Paseos Urbanos Certificados',
            shortTitle: 'Urban Pet Walkers',
            category: 'Paseos & Cuidadores',
            categorySlug: 'paseos',
            price: 14.50,
            priceFormatted: '14.50 €',
            img: 'paseadores-perros-actividad-fisica.png',
            icon: 'fa-dog',
            desc: 'Paseos seguros en grupos reducidos con seguimiento GPS en tiempo real desde la App.'
        },
        {
            id: 'SKU-NANNYPETS-247',
            url: 'producto-nannypets-247.html',
            title: 'NannyPets 24/7 - Cuidadores a Domicilio',
            shortTitle: 'NannyPets 24/7',
            category: 'Paseos & Cuidadores',
            categorySlug: 'paseos',
            price: 49.00,
            priceFormatted: '49.00 €/día',
            img: 'guarderia-canina-confianza.png',
            icon: 'fa-couch',
            desc: 'Cuidadores certificados en tu hogar con reportes biométricos continuos.'
        },
        {
            id: 'SKU-BUBBLES-PAWS',
            url: 'producto-bubbles--paws.html',
            title: 'Bubbles & Paws - Baño Ecológico y Ozonoterapia',
            shortTitle: 'Bubbles & Paws',
            category: 'Estética & Spa',
            categorySlug: 'estetica',
            price: 22.00,
            priceFormatted: '22.00 €',
            img: 'mejora-descanso-salud-felina.png',
            icon: 'fa-soap',
            desc: 'Baño dermoprotector biodegradable en cabinas acústicas libres de estrés.'
        },
        {
            id: 'SKU-GROOMING-MASTER',
            url: 'producto-grooming-master.html',
            title: 'Grooming Master - Peluquería y Estilismo',
            shortTitle: 'Grooming Master',
            category: 'Estética & Spa',
            categorySlug: 'estetica',
            price: 35.00,
            priceFormatted: '35.00 €',
            img: 'estetica-canina-bienestar.png',
            icon: 'fa-scissors',
            desc: 'Corte higiénico y estilismo de raza adaptado a la sensibilidad dérmica de tu mascota.'
        },
        {
            id: 'SKU-ZENPET-SPA',
            url: 'producto-zenpet-spa.html',
            title: 'ZenPet Spa - Hidroterapia y Relajación',
            shortTitle: 'ZenPet Spa',
            category: 'Estética & Spa',
            categorySlug: 'estetica',
            price: 50.00,
            priceFormatted: '50.00 €',
            img: 'reduccion-ansiedad-separacion-perros.png',
            icon: 'fa-spa',
            desc: 'Hidroterapia articular, masaje relajante y reducción de cortisol asistida.'
        }
    ];

    const ARTICULOS_CLINICOS = [
        {
            url: 'gemelos-digitales-salud-predictiva.html',
            title: 'Impacto Clínico de los Gemelos Digitales en la Salud Predictiva',
            badge: 'Telemetría & IA',
            readTime: '6 min lectura',
            img: 'dashboard-biometrico-gemelo-digital-mascotas.png',
            desc: 'Cómo la monitorización continua las 8.760 horas del año anticipa patologías subclínicas.'
        },
        {
            url: 'ansiedad-separacion-cortisol-mascotas.html',
            title: 'Reducción de Cortisol Sistémico en Ansiedad por Separación',
            badge: 'Etología Clínica',
            readTime: '5 min lectura',
            img: 'reduccion-ansiedad-separacion-perros.png',
            desc: 'Biomarcadores HRV de variabilidad cardíaca para detectar y mitigar el estrés en hogares urbanos.'
        },
        {
            url: 'geo-telemetria-prevencion-perdida.html',
            title: 'Geo-Telemetría GNSS y Geocercas Dinámicas contra el Extravío',
            badge: 'Seguridad GPS',
            readTime: '5 min lectura',
            img: 'radar-gps-prevencion-perdidas.png',
            desc: 'Arquitectura híbrida LTE-M + GPS multibanda para rescate inmediato en menos de 4 minutos.'
        },
        {
            url: 'microbioma-nutricion-longevidad-canina.html',
            title: 'Microbioma Intestinal y Nutrición de Precisión en Longevidad',
            badge: 'Nutrición Clínica',
            readTime: '7 min lectura',
            img: 'dietas-personalizadas-longevidad-mascotas.png',
            desc: 'Ajuste calórico dinámico según telemetría de actividad y prevención de inflamación crónica.'
        },
        {
            url: 'triaje-ia-esperanza-vida-veterinaria.html',
            title: 'Triaje Algorítmico 24/7 y Aumento de la Esperanza de Vida',
            badge: 'Urgencias & IA',
            readTime: '6 min lectura',
            img: 'triaje-ia-veterinario-urgencias.png',
            desc: 'Detección temprana de golpe de calor, torsión gástrica e insuficiencia cardíaca mediante IA.'
        },
        {
            url: 'seguros-veterinarios-mortalidad.html',
            title: 'Impacto de los Seguros Preventivos en la Reducción de Eutanasia Económica',
            badge: 'Salud Pública',
            readTime: '5 min lectura',
            img: 'seguros-gastos-veterinarios-perros-gatos.png',
            desc: 'Por qué el modelo de suscripción preventiva elimina la barrera financiera ante urgencias graves.'
        }
    ];

    function getProductByUrl(fileName) {
        return PRODUCTOS.find(p => p.url === fileName) || null;
    }

    function getRelatedProducts(currentFileName, limit = 3) {
        const current = getProductByUrl(currentFileName);
        const others = PRODUCTOS.filter(p => p.url !== currentFileName);
        if (!current) return others.slice(0, limit);
        const sameCategory = others.filter(p => p.categorySlug === current.categorySlug);
        const diffCategory = others.filter(p => p.categorySlug !== current.categorySlug);
        return sameCategory.concat(diffCategory).slice(0, limit);
    }

    function getArticleByUrl(fileName) {
        return ARTICULOS_CLINICOS.find(a => a.url === fileName) || null;
    }

    function getRelatedArticles(currentFileName, limit = 3) {
        return ARTICULOS_CLINICOS.filter(a => a.url !== currentFileName).slice(0, limit);
    }

    window.CudiCatalog = {
        PRODUCTOS: PRODUCTOS,
        ARTICULOS_CLINICOS: ARTICULOS_CLINICOS,
        getProductByUrl: getProductByUrl,
        getRelatedProducts: getRelatedProducts,
        getArticleByUrl: getArticleByUrl,
        getRelatedArticles: getRelatedArticles
    };
})();
