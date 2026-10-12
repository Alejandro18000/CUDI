// Desarrollo 100% realizado por Sergio Alejandro Ospina Rocha
const CUDI_SEARCH_INDEX = [
    // --- PRODUCTOS DE TIENDA ---
    {
        url: "producto-ecopet-organic.html",
        title: "EcoPet Organic - Dieta BARF Biológica",
        category: "Nutrición",
        badgeClass: "badge-nutrition",
        icon: "fa-bowl-food",
        price: "42.00 €",
        desc: "Alimento crudo biológicamente apropiado (BARF) con carne de pasto y vegetales orgánicos. Cero cereales, balance microbioma.",
        tags: ["comida", "alimento", "pienso", "barf", "dieta", "carne", "croquetas", "nutricion", "organico", "ecopet", "comer", "hambre"]
    },
    {
        url: "producto-purebites-clinic.html",
        title: "PureBites Clinic - Pienso Hipoalergénico",
        category: "Nutrición",
        badgeClass: "badge-nutrition",
        icon: "fa-prescription-bottle",
        price: "38.50 €",
        desc: "Piensos clínicos especializados prescritos por IA para sensibilidades gástricas, alergias cutáneas e intolerancias digestivas.",
        tags: ["comida", "alimento", "pienso", "croquetas", "dieta", "hipoalergenico", "gastrico", "alergia", "digestion", "estomago", "nutricion", "purebites"]
    },
    {
        url: "producto-vitality-mix.html",
        title: "Vitality Mix - Suplemento Inmune Dual",
        category: "Nutrición",
        badgeClass: "badge-nutrition",
        icon: "fa-capsules",
        price: "24.99 €",
        desc: "Suplementos nutricionales con Omega-3, cúrcuma y zinc para reforzar las defensas de perros y gatos en cualquier etapa.",
        tags: ["suplemento", "vitaminas", "omega3", "inmune", "nutricion", "vitality", "defensas", "comida", "complemento", "articulaciones"]
    },
    {
        url: "smart-collar-cudi-gps.html",
        title: "Smart Collar CUDI GPS - Collar Inteligente",
        category: "Hardware",
        badgeClass: "badge-hardware",
        icon: "fa-satellite-dish",
        price: "149.00 €",
        desc: "Collar biométrico con GPS multibanda, telemetría cardíaca y respiratoria continua, batería de 14 días y geocercas activas.",
        tags: ["collar", "smart collar", "gps", "rastreo", "localizador", "geolocalizacion", "ubicar", "donde esta", "perdida", "mapa", "hardware", "dispositivo"]
    },
    {
        url: "producto-cudi-shield-basic.html",
        title: "CUDI Shield Basic - Seguro Responsabilidad Civil",
        category: "Seguros",
        badgeClass: "badge-insurance",
        icon: "fa-shield-halved",
        price: "6.99 €/mes",
        desc: "Cobertura obligatoria por Ley de Bienestar Animal con hasta 300.000€ en responsabilidad civil y asistencia jurídica completa.",
        tags: ["seguro", "responsabilidad civil", "rc", "ley bienestar animal", "cobertura", "poliza", "shield", "proteger", "legal"]
    },
    {
        url: "producto-global-pet-protect.html",
        title: "Global Pet Protect - Seguro de Salud Total",
        category: "Seguros",
        badgeClass: "badge-insurance",
        icon: "fa-shield-heart",
        price: "29.99 €/mes",
        desc: "Seguro veterinario integral con reembolso del 80% en cirugías, urgencias 24h, hospitalización y pruebas diagnósticas.",
        tags: ["seguro", "salud", "veterinario", "cirugia", "hospital", "reembolso", "urgencias", "cobertura medica", "global pet protect"]
    },
    {
        url: "producto-safehome-multipet.html",
        title: "SafeHome MultiPet - Seguro Hogares Multiespecie",
        category: "Seguros",
        badgeClass: "badge-insurance",
        icon: "fa-house-chimney-medical",
        price: "15.50 €/mes",
        desc: "Protección combinada ante accidentes domésticos e intoxicaciones para familias que conviven con perros y gatos.",
        tags: ["seguro", "multiespecie", "hogar", "gatos", "perros", "cobertura", "accidentes", "safehome", "poliza"]
    },
    {
        url: "producto-medipet-express.html",
        title: "MediPet Express - Clínicas Veterinarias 24h",
        category: "Salud 24/7",
        badgeClass: "badge-health",
        icon: "fa-truck-medical",
        price: "45.00 €",
        desc: "Red de clínicas de cercanía conectadas al historial biométrico CUDI para urgencias y consultas prioritarias sin esperas.",
        tags: ["veterinario", "clinica", "urgencias", "24h", "medico", "doctor", "enfermo", "consulta", "medipet", "salud"]
    },
    {
        url: "producto-hospital-clinico-dual.html",
        title: "Hospital Clínico Dual - Medicina Interna y UCI",
        category: "Salud 24/7",
        badgeClass: "badge-health",
        icon: "fa-hospital",
        price: "85.00 €",
        desc: "Hospital de referencia con quirófanos de vanguardia, diagnóstico por imagen y UCI avanzada para caninos y felinos.",
        tags: ["hospital", "veterinario", "cirugia", "uci", "medicina interna", "especialista", "graves", "dual", "clinico"]
    },
    {
        url: "producto-vethome-cudi.html",
        title: "VetHome CUDI - Veterinario a Domicilio",
        category: "Salud 24/7",
        badgeClass: "badge-health",
        icon: "fa-user-doctor",
        price: "55.00 €",
        desc: "Atención médica presencial en tu hogar, vacunación y revisiones sin el estrés del transportín ni desplazamientos.",
        tags: ["veterinario", "domicilio", "casa", "vethome", "vacunas", "revision", "estres", "medico", "visita"]
    },
    {
        url: "producto-activepaws.html",
        title: "ActivePaws - Ejercicio y Agilidad Canina",
        category: "Paseos & Deporte",
        badgeClass: "badge-walks",
        icon: "fa-person-running",
        price: "19.99 €",
        desc: "Entrenamiento físico adaptado a razas de alta energía, juegos de olfato y control de hiperactividad con monitores titulados.",
        tags: ["paseo", "paseador", "ejercicio", "entrenamiento", "correr", "energia", "activo", "activepaws", "deporte"]
    },
    {
        url: "producto-urban-pet-walkers.html",
        title: "Urban Pet Walkers - Paseos Urbanos Certificados",
        category: "Paseos & Deporte",
        badgeClass: "badge-walks",
        icon: "fa-dog",
        price: "14.50 €",
        desc: "Caminatas seguras en grupos reducidos con seguimiento GPS en directo por tu barrio y fotos de cada ruta.",
        tags: ["paseador", "paseo", "caminar", "walkers", "perros", "barrio", "gps paseo", "cuidado"]
    },
    {
        url: "producto-nannypets-247.html",
        title: "NannyPets 24/7 - Cuidadores a Domicilio",
        category: "Paseos & Deporte",
        badgeClass: "badge-walks",
        icon: "fa-couch",
        price: "49.00 €/día",
        desc: "Cuidado profesional en tu propia casa mientras estás de viaje o trabajando, manteniendo las rutinas de tu mascota.",
        tags: ["cuidador", "cuidadores", "guarderia", "hotel", "viaje", "domicilio", "nanny", "nannypets", "quedarse"]
    },
    {
        url: "producto-bubbles--paws.html",
        title: "Bubbles & Paws - Baño Ecológico y Secado",
        category: "Higiene & Spa",
        badgeClass: "badge-spa",
        icon: "fa-soap",
        price: "22.00 €",
        desc: "Servicio exprés de baño y secado con cosmética 100% biodegradable y cabinas acústicas que eliminan el pánico al ruido.",
        tags: ["bano", "banar", "lavar", "higiene", "champu", "limpieza", "burbujas", "bubbles", "peluqueria"]
    },
    {
        url: "producto-grooming-master.html",
        title: "Grooming Master - Peluquería y Estilismo",
        category: "Higiene & Spa",
        badgeClass: "badge-spa",
        icon: "fa-scissors",
        price: "35.00 €",
        desc: "Corte a tijera de alta escuela, deslanado, arreglo higiénico y ozonoterapia regeneradora para piel y pelo.",
        tags: ["peluqueria", "corte", "estilismo", "grooming", "tijera", "pelo", "ozono", "peinado", "belleza"]
    },
    {
        url: "producto-zenpet-spa.html",
        title: "ZenPet Spa - Spa Antiestrés con Feromonas",
        category: "Higiene & Spa",
        badgeClass: "badge-spa",
        icon: "fa-spa",
        price: "45.00 €",
        desc: "Sesiones de hidroterapia relajante con difusión de feromonas apaciguadoras, aromaterapia y masaje muscular.",
        tags: ["spa", "relajacion", "estres", "masaje", "hidroterapia", "feromonas", "zenpet", "calma", "bienestar"]
    },

    // --- HERRAMIENTAS INTERACTIVAS Y DEMO ---
    {
        url: "simulador-gemelo-digital-telemetria.html",
        title: "Demo App CUDI: Gemelo Digital y Telemetría",
        category: "Demo App",
        badgeClass: "badge-demo",
        icon: "fa-mobile-screen",
        price: "Interactiva",
        desc: "Simulador interactivo nativo de la app CUDI con signos vitales en vivo, GPS en tiempo real, tienda unificada y triaje clínico con IA.",
        tags: ["demo", "app", "simulador", "aplicacion", "gemelo digital", "telemetria", "movil", "celular", "interfaz", "probar", "ia demo"]
    },
    {
        url: "simulador-gemelo-digital-telemetria.html#tab-gps",
        title: "Rastreo GPS en Tiempo Real (Demo App)",
        category: "Demo App",
        badgeClass: "badge-demo",
        icon: "fa-location-crosshairs",
        price: "Interactiva",
        desc: "Pestaña GPS de la app CUDI: mapa satelital en vivo con posición de la mascota, geocercas activas y pitido acústico.",
        tags: ["gps", "mapa", "rastreo", "localizacion", "demo gps", "geocerca", "ubicar", "en vivo"]
    },
    {
        url: "simulador-financiero.html",
        title: "Simulador Financiero CUDI (TFM)",
        category: "Finanzas",
        badgeClass: "badge-finance",
        icon: "fa-chart-line",
        price: "TFM Tool",
        desc: "Simulador financiero interactivo con 3 escenarios (Conservador, Base, Agresivo), proyecciones a 5 años, TIR, VAN y EBITDA en tiempo real.",
        tags: ["finanzas", "simulador financiero", "inversion", "escenarios", "ebitda", "tir", "van", "modelo", "tfm", "calculadora", "metricas"]
    },
    {
        url: "mi-mascota.html",
        title: "Mi Mascota - Perfil y Constantes Vitales",
        category: "Demo App",
        badgeClass: "badge-demo",
        icon: "fa-paw",
        price: "Perfil",
        desc: "Ficha médica biomédica de tu mascota: ritmo cardíaco, temperatura, calorías, peso y sincronización con el Smart Collar.",
        tags: ["perfil", "mi mascota", "constantes", "signos vitales", "salud mascota", "ficha", "peso", "latidos"]
    },
    {
        url: "simulador-solo-app.html",
        title: "App CUDI - Vista Completa de Aplicación",
        category: "Demo App",
        badgeClass: "badge-demo",
        icon: "fa-mobile",
        price: "Interactiva",
        desc: "Vista completa y limpia del teléfono móvil con todas las pestañas de salud, telemetría y tienda de CUDI.",
        tags: ["app", "aplicacion", "movil", "celular", "solo app", "pantalla", "interfaz"]
    },

    // --- PÁGINAS HUB Y SERVICIOS ---
    {
        url: "nutricion-personalizada-perros-gatos.html",
        title: "Nutrición Animal Premium y Planes de Alimentación",
        category: "Servicio",
        badgeClass: "badge-nutrition",
        icon: "fa-seedling",
        desc: "Planes nutricionales a medida formulados por algoritmos clínicos según peso, raza y analíticas biométricas.",
        tags: ["nutricion", "comida", "planes comida", "alimentacion", "dieta personalizada", "alimento perros", "alimento gatos"]
    },
    {
        url: "seguros-salud-mascotas-barcelona.html",
        title: "Seguros para Mascotas y Protección Legal",
        category: "Servicio",
        badgeClass: "badge-insurance",
        icon: "fa-file-contract",
        desc: "Comparativa y contratación directa de coberturas médicas y seguros de responsabilidad civil para animales de compañía.",
        tags: ["seguro", "seguros mascotas", "poliza", "coberturas", "proteccion legal", "responsabilidad civil"]
    },
    {
        url: "telemedicina-veterinaria-24-7.html",
        title: "Telemedicina Veterinaria 24/7 y Clínicas",
        category: "Salud 24/7",
        badgeClass: "badge-health",
        icon: "fa-laptop-medical",
        desc: "Videoconsulta inmediata con veterinarios colegiados 24/7 con triaje asistido por IA para diagnosticar síntomas tempranos.",
        tags: ["telemedicina", "veterinario online", "videoconsulta", "24/7", "medico", "urgencia veterinaria", "chat medico"]
    },
    {
        url: "paseadores-perros-certificados-barcelona.html",
        title: "Red de Paseadores y Cuidadores de Confianza",
        category: "Servicio",
        badgeClass: "badge-walks",
        icon: "fa-person-walking",
        desc: "Paseadores y cuidadores auditados con seguro de responsabilidad civil, formación en primeros auxilios y seguimiento GPS.",
        tags: ["paseadores", "cuidadores", "paseador perros", "guarderia", "confianza", "paseos"]
    },
    {
        url: "smart-collar-aventuras-sin-sustos.html",
        title: "Campaña Aventuras Sin Sustos - Smart Collar",
        category: "Campaña",
        badgeClass: "badge-hardware",
        icon: "fa-map-location-dot",
        desc: "Comunidad de rutas seguras pet-friendly en España y prevención activa de pérdidas con el Collar Inteligente CUDI.",
        tags: ["aventuras sin sustos", "rutas", "collar", "campana", "lanzamiento", "mapa rutas", "seguridad"]
    },
    {
        url: "comunidad-cudi.html",
        title: "Comunidad CUDI - Red Social Multiespecie",
        category: "Comunidad",
        badgeClass: "badge-community",
        icon: "fa-people-group",
        desc: "Punto de encuentro para tutores responsables: foros temáticos, quedadas de socialización y consejos de expertos.",
        tags: ["comunidad", "red social", "foro", "amigos", "consejos", "tutores", "social", "eventos"]
    },
    {
        url: "planes-suscripcion-bienestar-animal.html",
        title: "Suscripciones y Planes de Cuidado CUDI",
        category: "Suscripciones",
        badgeClass: "badge-subscription",
        icon: "fa-shield-cat",
        desc: "Compara los planes Esencial, Premium y MultiPet con telemedicina ilimitada, descuentos en tienda y monitoreo continuo.",
        tags: ["planes", "suscripciones", "precios", "tarifas", "premium", "cuotas", "membresia"]
    },
    {
        url: "contratar-plan-premium-cudi.html",
        title: "Contratar Plan Premium CUDI",
        category: "Suscripciones",
        badgeClass: "badge-subscription",
        icon: "fa-gem",
        price: "19.99 €/mes",
        desc: "Contratación directa del plan más completo de bienestar animal con telemedicina 24/7, seguro veterinario y IA predictiva.",
        tags: ["contratar", "premium", "alta", "plan premium", "suscripcion mensual"]
    },
    {
        url: "red-socios-clinicas-veterinarias.html",
        title: "Red para Profesionales y Clínicas Socias",
        category: "Partners",
        badgeClass: "badge-health",
        icon: "fa-handshake",
        desc: "Únete a la red médica CUDI: capta nuevos pacientes, accede al historial biométrico de clientes y digitaliza tu clínica.",
        tags: ["partners", "socios", "veterinarios", "clinicas socias", "profesionales", "afiliados", "convenios"]
    },
    {
        url: "bienestar-integral-multiespecie.html",
        title: "Bienestar y Salud Holística Multiespecie",
        category: "Salud 24/7",
        badgeClass: "badge-health",
        icon: "fa-heart-pulse",
        desc: "Guía completa de convivencia y salud armoniosa entre perros y gatos: etología, prevención de estrés y salud física.",
        tags: ["bienestar", "holistica", "salud integral", "multiespecie", "gatos y perros", "convivencia"]
    },
    {
        url: "cudi-redes-sociales-bot.html",
        title: "CUDI en Redes Sociales y Asistente Bot",
        category: "Comunidad",
        badgeClass: "badge-community",
        icon: "fa-hashtag",
        desc: "Accede a los canales oficiales de CUDI en Instagram, TikTok y activa el bot de triaje desde mensajería instantánea.",
        tags: ["redes sociales", "bot", "whatsapp", "instagram", "asistente", "chat bot"]
    },

    // --- ARTÍCULOS CLÍNICOS E INVESTIGACIÓN IA ---
    {
        url: "triaje-ia-esperanza-vida-veterinaria.html",
        title: "Eficacia del Triaje con IA en Urgencias Veterinarias",
        category: "Clínico / IA",
        badgeClass: "badge-clinical",
        icon: "fa-microchip",
        desc: "Estudio sobre cómo la evaluación algorítmica de síntomas y signos vitales reduce la mortalidad aguda en la hora de oro médica.",
        tags: ["triaje", "ia", "inteligencia artificial", "urgencias", "mortalidad", "estudio clinico", "diagnostico", "algoritmo"]
    },
    {
        url: "gemelos-digitales-salud-predictiva.html",
        title: "Gemelos Digitales Biomédicos en Mascotas",
        category: "Clínico / IA",
        badgeClass: "badge-clinical",
        icon: "fa-network-wired",
        desc: "Cómo el gemelo digital analiza 8.760 horas de telemetría anual para predecir patologías cardíacas y metabólicas antes de síntomas visibles.",
        tags: ["gemelo digital", "digital twin", "salud predictiva", "telemetria", "biomedicina", "prediccion", "ia salud"]
    },
    {
        url: "geo-telemetria-prevencion-perdida.html",
        title: "Telemetría y Geolocalización en Prevención de Pérdidas",
        category: "Clínico / IA",
        badgeClass: "badge-clinical",
        icon: "fa-tower-broadcast",
        desc: "Análisis empírico del impacto del GPS continuo y alertas geográficas en la recuperación inmediata de mascotas extraviadas.",
        tags: ["perdida", "extravio", "gps", "geolocalizacion", "telemetria", "seguridad", "recuperacion"]
    },
    {
        url: "ansiedad-separacion-cortisol-mascotas.html",
        title: "Reducción de Cortisol en Ansiedad por Separación",
        category: "Clínico / IA",
        badgeClass: "badge-clinical",
        icon: "fa-brain",
        desc: "Investigación biomédica sobre picos de cortisol en soledad urbana y estrategias de enriquecimiento ambiental y paseos activos.",
        tags: ["ansiedad", "estres", "cortisol", "separacion", "comportamiento", "etologia", "salud mental"]
    },
    {
        url: "microbioma-nutricion-longevidad-canina.html",
        title: "Microbioma y Nutrición Orgánica en Longevidad",
        category: "Clínico / IA",
        badgeClass: "badge-clinical",
        icon: "fa-dna",
        desc: "Impacto del cambio de ultraprocesados a dietas biológicamente apropiadas en la flora intestinal y esperanza de vida animal.",
        tags: ["microbioma", "nutricion", "longevidad", "pienso", "barf", "flora intestinal", "estudio", "comida"]
    },
    {
        url: "seguros-veterinarios-mortalidad.html",
        title: "Eutanasia Económica y Cobertura Veterinaria",
        category: "Clínico / IA",
        badgeClass: "badge-clinical",
        icon: "fa-heart-crack",
        desc: "Análisis socioeconómico de la tenencia responsable y cómo los seguros de salud eliminan decisiones críticas por coste quirúrgico.",
        tags: ["seguros", "eutanasia economica", "costes veterinarios", "cobertura", "salud", "analisis"]
    },

    // --- FINANZAS Y ESTRATEGIA ---
    {
        url: "simulador-financiero.html",
        title: "Dashboard del Modelo Financiero CUDI",
        category: "Finanzas",
        badgeClass: "badge-finance",
        icon: "fa-file-invoice-dollar",
        desc: "Cuadro de mando interactivo con las variables de unit economics, CAPEX, OPEX y ratios de rentabilidad del plan de negocio.",
        tags: ["modelo financiero", "finanzas", "unit economics", "capex", "opex", "rentabilidad"]
    },
    {
        url: "estrategia-seo.html",
        title: "Estrategia SEO y Arquitectura Web CUDI",
        category: "SEO / Arquitectura",
        badgeClass: "badge-finance",
        icon: "fa-magnifying-glass-chart",
        desc: "Estructura de enlazado interno, palabras clave de alta intención de compra y optimización técnica de la plataforma.",
        tags: ["seo", "posicionamiento", "keywords", "estrategia seo", "google", "indexacion"]
    },

    // --- LEGAL & CUMPLIMIENTO ---
    {
        url: "legal.html",
        title: "Aviso Legal e Información Corporativa",
        category: "Legal",
        badgeClass: "badge-legal",
        icon: "fa-scale-balanced",
        desc: "Datos identificativos de la entidad, condiciones de navegación y régimen legal aplicable a CUDI.",
        tags: ["legal", "aviso legal", "condiciones", "informacion legal", "titularidad"]
    },
    {
        url: "politica-privacidad-datos-mascotas.html",
        title: "Política de Privacidad y RGPD",
        category: "Legal",
        badgeClass: "badge-legal",
        icon: "fa-user-shield",
        desc: "Tratamiento confidencial de datos de tutores y mascotas, consentimiento informado y derechos ARCO.",
        tags: ["privacidad", "rgpd", "datos", "seguridad datos", "politica privacidad"]
    },
    {
        url: "politica-cookies-plataforma.html",
        title: "Política de Cookies de la Plataforma",
        category: "Legal",
        badgeClass: "badge-legal",
        icon: "fa-cookie-bite",
        desc: "Descripción de cookies técnicas, de analítica y publicitarias empleadas para mejorar la navegación.",
        tags: ["cookies", "politica cookies", "rastreo", "consentimiento cookies"]
    },
    {
        url: "politica-devoluciones-smart-collar.html",
        title: "Política de Devoluciones y Garantía de 3 Años",
        category: "Legal",
        badgeClass: "badge-legal",
        icon: "fa-rotate-left",
        desc: "Condiciones de desistimiento de 30 días naturales sin coste y garantía europea de 3 años para el Smart Collar.",
        tags: ["devolucion", "devoluciones", "garantia", "reembolso", "cambios", "cancelacion"]
    },
    {
        url: "terminos-condiciones-app.html",
        title: "Términos y Condiciones del Servicio y App",
        category: "Legal",
        badgeClass: "badge-legal",
        icon: "fa-book-bookmark",
        desc: "Reglas de uso del ecosistema digital, contratación de suscripciones y responsabilidades del usuario.",
        tags: ["terminos", "condiciones", "contratacion", "normas", "uso"]
    }
];

// DICCIONARIO DE CORRECCIÓN ORTOGRÁFICA / TYPOS
const CUDI_SPELL_CORRECTIONS = {
    "comda": "comida",
    "comidaa": "comida",
    "cmida": "comida",
    "comi": "comida",
    "alimento": "alimento",
    "alimnto": "alimento",
    "alimentos": "alimento",
    "penso": "pienso",
    "croketas": "croquetas",
    "croqueta": "croquetas",
    "croquetas": "croquetas",
    "nutricon": "nutricion",
    "nutrison": "nutricion",
    "nutricion": "nutricion",
    "suplemnto": "suplemento",
    "vitamina": "vitaminas",
    "colar": "collar",
    "cllar": "collar",
    "colllar": "collar",
    "collares": "collar",
    "gpss": "gps",
    "gsp": "gps",
    "rastre": "rastreo",
    "localisador": "localizador",
    "geolocalisacion": "geolocalizacion",
    "vterinario": "veterinario",
    "veterinrio": "veterinario",
    "vetrinario": "veterinario",
    "vet": "veterinario",
    "veterinaria": "veterinario",
    "clinca": "clinica",
    "urgencia": "urgencias",
    "urgensias": "urgencias",
    "hospital": "hospital",
    "ospita": "hospital",
    "triag": "triaje",
    "triaje": "triaje",
    "segro": "seguro",
    "segroos": "seguro",
    "segur": "seguro",
    "seguros": "seguro",
    "polisa": "poliza",
    "cobertra": "cobertura",
    "pasador": "paseador",
    "pasedor": "paseador",
    "paseo": "paseo",
    "paseos": "paseo",
    "pasear": "paseo",
    "bano": "bano",
    "banos": "bano",
    "pelukeria": "peluqueria",
    "pelukera": "peluqueria",
    "pelnado": "peluqueria",
    "champu": "champu",
    "shampoo": "champu",
    "dmo": "demo",
    "demmo": "demo",
    "ap": "app",
    "apliacion": "aplicacion",
    "simlador": "simulador",
    "sumulador": "simulador",
    "gemlo": "gemelo",
    "finazas": "finanzas",
    "fianzas": "finanzas",
    "financiero": "finanzas",
    "inversion": "inversion",
    "escenario": "escenarios"
};

// VOCABULARIO RAÍZ PARA DISTANCIA LEVENSHTEIN
const CUDI_ROOT_VOCABULARY = [
    "comida", "alimento", "pienso", "croquetas", "dieta", "nutricion", "suplemento", "organico", "barf",
    "collar", "gps", "rastreo", "localizador", "geolocalizacion", "mapa", "hardware", "aventuras",
    "veterinario", "clinica", "hospital", "urgencias", "triaje", "telemedicina", "medico", "salud",
    "seguro", "poliza", "cobertura", "responsabilidad", "shield",
    "paseo", "paseador", "caminar", "ejercicio", "cuidador", "guarderia",
    "bano", "peluqueria", "grooming", "spa", "higiene",
    "demo", "app", "simulador", "gemelo", "telemetria", "movil", "perfil",
    "finanzas", "inversion", "escenarios", "ebitda", "tir", "van", "modelo", "tfm",
    "comunidad", "amigos", "redes", "foro",
    "ia", "inteligencia", "asistente", "algoritmo", "predictivo",
    "planes", "suscripciones", "premium", "legal", "privacidad", "cookies"
];

// CLUSTERS SEMÁNTICOS CON RECOMENDACIONES DE IA
const CUDI_SEMANTIC_CLUSTERS = [
    {
        id: "nutricion",
        keywords: ["comida", "alimento", "pienso", "croquetas", "dieta", "barf", "nutricion", "suplemento", "vitaminas", "hambre", "comer", "organico", "ecopet", "purebites", "vitality"],
        aiSummary: "Nutrición biológica y clínica CUDI: dietas BARF orgánicas certificadas (EcoPet Organic), piensos clínicos para sensibilidad gástrica (PureBites Clinic) y suplementos inmunes (Vitality Mix).",
        priorityUrls: ["producto-ecopet-organic.html", "producto-purebites-clinic.html", "producto-vitality-mix.html", "nutricion-personalizada-perros-gatos.html", "microbioma-nutricion-longevidad-canina.html"]
    },
    {
        id: "gps_collar",
        keywords: ["collar", "gps", "rastreo", "localizador", "geolocalizacion", "ubicar", "donde", "mapa", "perdida", "perdido", "extravio", "geocerca", "bateria", "smart", "aventuras", "distancia"],
        aiSummary: "Smart Collar CUDI GPS: monitorización biomédica continua de signos vitales, geolocalización satelital multibanda y geocercas seguras en tiempo real con batería de 14 días.",
        priorityUrls: ["smart-collar-cudi-gps.html", "simulador-gemelo-digital-telemetria.html#tab-gps", "smart-collar-aventuras-sin-sustos.html", "geo-telemetria-prevencion-perdida.html"]
    },
    {
        id: "salud_veterinaria",
        keywords: ["veterinario", "clinica", "hospital", "urgencia", "urgencias", "medico", "doctor", "enfermo", "dolor", "triaje", "telemedicina", "salud", "vacuna", "cirugia", "vethome", "medipet", "emergencia"],
        aiSummary: "Red médica CUDI: triaje predictivo con IA 24/7, red hospitalaria de alta complejidad (Hospital Dual), clínicas de barrio (MediPet Express) y veterinario a domicilio (VetHome).",
        priorityUrls: ["producto-medipet-express.html", "producto-hospital-clinico-dual.html", "producto-vethome-cudi.html", "telemedicina-veterinaria-24-7.html", "triaje-ia-esperanza-vida-veterinaria.html"]
    },
    {
        id: "seguros",
        keywords: ["seguro", "seguros", "poliza", "cobertura", "responsabilidad", "civil", "rc", "proteger", "proteccion", "indemnizacion", "blindaje", "accidente", "shield", "global"],
        aiSummary: "Blindaje legal y veterinario CUDI: RC obligatoria por Ley de Bienestar Animal (CUDI Shield Basic a 6,99€) y cobertura médica total con reembolso quirúrgico del 80% (Global Pet Protect).",
        priorityUrls: ["producto-cudi-shield-basic.html", "producto-global-pet-protect.html", "producto-safehome-multipet.html", "seguros-salud-mascotas-barcelona.html"]
    },
    {
        id: "paseos",
        keywords: ["paseo", "paseador", "paseadores", "caminar", "ejercicio", "correr", "actividad", "nanny", "guarderia", "cuidar", "cuidador", "walkers", "activepaws"],
        aiSummary: "Cuidado activo certificado: paseos urbanos con seguimiento GPS en directo (Urban Pet Walkers), sesiones deportivas de alta energía (ActivePaws) y cuidadores 24/7 a domicilio (NannyPets).",
        priorityUrls: ["producto-urban-pet-walkers.html", "producto-activepaws.html", "producto-nannypets-247.html", "paseadores-perros-certificados-barcelona.html"]
    },
    {
        id: "higiene_spa",
        keywords: ["bano", "banar", "peluqueria", "corte", "tijera", "champu", "ozonoterapia", "spa", "relajacion", "estetica", "grooming", "unas", "limpieza", "zenpet", "bubbles"],
        aiSummary: "Higiene y bienestar dermatológico sin estrés: baños ecológicos sin ruido (Bubbles & Paws), estilismo profesional y ozonoterapia (Grooming Master) y spa relajante con feromonas (ZenPet Spa).",
        priorityUrls: ["producto-bubbles--paws.html", "producto-grooming-master.html", "producto-zenpet-spa.html"]
    },
    {
        id: "demo_app",
        keywords: ["demo", "app", "simulador", "aplicacion", "probar", "movil", "celular", "telefono", "gemelo", "digital", "telemetria", "interfaz", "biometricos"],
        aiSummary: "Demo Interactiva CUDI App: experimenta el Gemelo Digital en vivo, signos vitales continuos, mapa GPS interactivo, tienda unificada y centro de triaje de alertas clínicas.",
        priorityUrls: ["simulador-gemelo-digital-telemetria.html", "simulador-solo-app.html", "mi-mascota.html"]
    },
    {
        id: "finanzas_tfm",
        keywords: ["finanzas", "financiero", "simulador financiero", "inversion", "ebitda", "tir", "van", "escenarios", "cac", "ltv", "modelo", "presupuesto", "rentabilidad"],
        aiSummary: "Simulador Financiero Interactivo: modelo dinámico a 5 años con 3 escenarios (Conservador, Base, Agresivo), métricas SaaS (CAC, LTV, Churn) y EBITDA proyectado.",
        priorityUrls: ["simulador-financiero.html", "estrategia-seo.html"]
    },
    {
        id: "comunidad",
        keywords: ["comunidad", "foro", "amigos", "redes", "social", "consejos", "eventos", "rutas", "tutor", "historias", "bot"],
        aiSummary: "Comunidad Multiespecie CUDI: conecta con otros tutores en tu zona, comparte rutas pet-friendly seguras y accede a talleres de educación canina y bienestar felino.",
        priorityUrls: ["comunidad-cudi.html", "cudi-redes-sociales-bot.html", "smart-collar-aventuras-sin-sustos.html"]
    },
    {
        id: "ia_asistente",
        keywords: ["ia", "inteligencia", "artificial", "bot", "asistente", "algoritmo", "triaje", "diagnostico", "predictivo", "bio-neural"],
        aiSummary: "CUDI Bio-Neural AI: asistente inteligente y triaje veterinario que detecta anomalías en signos vitales y recomienda acciones clínicas inmediatas.",
        priorityUrls: ["triaje-ia-esperanza-vida-veterinaria.html", "gemelos-digitales-salud-predictiva.html", "simulador-gemelo-digital-telemetria.html"]
    }
];

function normalizeSearchText(str) {
    return (str || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function levenshteinDistance(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

function correctQueryTypo(rawQuery) {
    const tokens = normalizeSearchText(rawQuery).split(' ').filter(Boolean);
    let wasCorrected = false;
    const correctedTokens = tokens.map(token => {
        if (CUDI_SPELL_CORRECTIONS[token]) {
            if (CUDI_SPELL_CORRECTIONS[token] !== token) wasCorrected = true;
            return CUDI_SPELL_CORRECTIONS[token];
        }
        if (token.length >= 3) {
            let bestWord = token;
            let minDistance = 999;
            for (const root of CUDI_ROOT_VOCABULARY) {
                const dist = levenshteinDistance(token, root);
                const maxAllowed = root.length <= 4 ? 1 : (root.length <= 7 ? 2 : 3);
                if (dist <= maxAllowed && dist < minDistance) {
                    minDistance = dist;
                    bestWord = root;
                }
            }
            if (bestWord !== token) {
                wasCorrected = true;
                return bestWord;
            }
        }
        return token;
    });

    return {
        original: rawQuery,
        normalized: tokens.join(' '),
        corrected: correctedTokens.join(' '),
        wasCorrected: wasCorrected && (tokens.join(' ') !== correctedTokens.join(' '))
    };
}

function searchCudiEcosystem(rawQuery) {
    if (!rawQuery || rawQuery.trim().length < 2) return { results: [], aiSummary: null, correction: null };

    const queryInfo = correctQueryTypo(rawQuery);
    const searchTokens = Array.from(new Set([...queryInfo.normalized.split(' '), ...queryInfo.corrected.split(' ')]));
    const fullNormalized = queryInfo.normalized;
    const fullCorrected = queryInfo.corrected;

    let matchedCluster = null;
    let maxClusterScore = 0;
    for (const cluster of CUDI_SEMANTIC_CLUSTERS) {
        let clusterScore = 0;
        for (const token of searchTokens) {
            if (cluster.keywords.includes(token)) {
                clusterScore += 10;
            } else {
                for (const kw of cluster.keywords) {
                    if (kw.includes(token) || token.includes(kw)) {
                        clusterScore += 4;
                    }
                }
            }
        }
        if (clusterScore > maxClusterScore) {
            maxClusterScore = clusterScore;
            matchedCluster = cluster;
        }
    }

    const isLegalExplicit = searchTokens.some(t => ['legal', 'privacidad', 'cookies', 'terminos', 'condiciones', 'devolucion', 'garantia'].includes(t));

    const scored = CUDI_SEARCH_INDEX.map(item => {
        let score = 0;
        const normTitle = normalizeSearchText(item.title);
        const normDesc = normalizeSearchText(item.desc);
        const normTags = (item.tags || []).map(t => normalizeSearchText(t));
        const itemUrl = item.url.toLowerCase();

        if (normTitle === fullNormalized || normTitle === fullCorrected) {
            score += 100;
        }

        if (matchedCluster && matchedCluster.priorityUrls.includes(item.url)) {
            score += 50;
        }

        for (const token of searchTokens) {
            if (token.length < 2) continue;

            if (normTitle.includes(token)) {
                score += 35;
                if (normTitle.startsWith(token)) score += 15;
            }

            if (normTags.includes(token)) {
                score += 30;
            } else if (normTags.some(t => t.includes(token))) {
                score += 15;
            }

            if (normDesc.includes(token)) {
                score += 12;
            }

            if (itemUrl.includes(token)) {
                score += 8;
            }
        }

        if (!isLegalExplicit && (itemUrl.includes('politica') || itemUrl.includes('legal') || itemUrl.includes('terminos'))) {
            score -= 40;
        }

        return { ...item, score };
    }).filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    const topResults = scored.slice(0, 6);

    let aiSummary = matchedCluster ? matchedCluster.aiSummary : null;
    if (!aiSummary && topResults.length > 0) {
        aiSummary = `Encontramos ${topResults.length} recursos destacados en el ecosistema CUDI para tu búsqueda.`;
    }

    return {
        query: rawQuery,
        correction: queryInfo.wasCorrected ? queryInfo.corrected : null,
        aiSummary,
        results: topResults
    };
}


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

    // Si el menú móvil está abierto, primero lo cerramos
    if (drawer && drawer.classList.contains('active')) {
        drawer.classList.remove('active');
        document.body.style.overflow = '';
    }

    const isOpen = cart.classList.contains('active');

    if (isOpen) {
        // --- CERRAR CARRITO ---
        cart.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    } else {
        // --- ABRIR CARRITO ---
        cart.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
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

// === BANCO DE MASCOTAS ALEATORIAS PARA LLENADO RÁPIDO & DEMO ===
const CUDI_RANDOM_PETS = [
    {
        name: 'Luna',
        type: 'perro',
        breed: 'Husky Siberiano',
        age: 3,
        weight: 22,
        energy: 'Alto',
        food: 'Pienso Energético & Salmón',
        photo: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80',
        bpm: 78,
        temp: 38.4,
        battery: 94
    },
    {
        name: 'Rocky',
        type: 'perro',
        breed: 'Bulldog Francés',
        age: 2,
        weight: 12,
        energy: 'Moderado',
        food: 'Dieta Hipoalergénica',
        photo: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=800&q=80',
        bpm: 82,
        temp: 38.6,
        battery: 89
    },
    {
        name: 'Kira',
        type: 'gato',
        breed: 'Siamés Elegante',
        age: 2,
        weight: 4.2,
        energy: 'Curioso',
        food: 'Dieta Natural BARF Felina',
        photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
        bpm: 145,
        temp: 38.8,
        battery: 96
    },
    {
        name: 'Milo',
        type: 'perro',
        breed: 'Beagle Tricolor',
        age: 3,
        weight: 14,
        energy: 'Alto',
        food: 'Pienso Orgánico Natural',
        photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
        bpm: 85,
        temp: 38.5,
        battery: 91
    },
    {
        name: 'Oliver',
        type: 'gato',
        breed: 'Europeo Atigrado',
        age: 1,
        weight: 3.8,
        energy: 'Juguetón',
        food: 'Pavo & Pescado Blanco',
        photo: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80',
        bpm: 152,
        temp: 38.7,
        battery: 93
    },
    {
        name: 'Bella',
        type: 'perro',
        breed: 'Golden Retriever',
        age: 4,
        weight: 27,
        energy: 'Alto',
        food: 'Holística Premium',
        photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
        bpm: 74,
        temp: 38.3,
        battery: 97
    },
    {
        name: 'Simba',
        type: 'gato',
        breed: 'Maine Coon',
        age: 3,
        weight: 7.2,
        energy: 'Tranquilo',
        food: 'Hairball & Articular Care',
        photo: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80',
        bpm: 138,
        temp: 38.6,
        battery: 88
    },
    {
        name: 'Toby',
        type: 'perro',
        breed: 'Border Collie',
        age: 2,
        weight: 18,
        energy: 'Extremo',
        food: 'Proteína Pura Deportiva',
        photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
        bpm: 76,
        temp: 38.2,
        battery: 95
    },
    {
        name: 'Coco',
        type: 'perro',
        breed: 'Pomerania Toy',
        age: 1,
        weight: 3.2,
        energy: 'Juguetón',
        food: 'Mini Bites Orgánico',
        photo: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
        bpm: 95,
        temp: 38.5,
        battery: 92
    },
    {
        name: 'Nala',
        type: 'gato',
        breed: 'Bengalí Salvaje',
        age: 2,
        weight: 4.8,
        energy: 'Curioso',
        food: 'Carnívora Estricta Fresca',
        photo: 'https://images.unsplash.com/photo-1513360309081-36f20ca480d0?auto=format&fit=crop&w=800&q=80',
        bpm: 148,
        temp: 38.9,
        battery: 94
    }
];

// Helper global para candidato aleatorio
function cudi_get_random_pet_candidate() {
    if (!window.currentRandomPet) {
        const idx = Math.floor(Math.random() * CUDI_RANDOM_PETS.length);
        window.currentRandomPet = CUDI_RANDOM_PETS[idx];
    }
    return window.currentRandomPet;
}

// Verifica si la sesión está activamente iniciada por el usuario
function cudi_is_session_active() {
    try {
        const raw = localStorage.getItem('cudi_pet_profile');
        if (!raw) return false;
        const parsed = JSON.parse(raw);
        if (!parsed || !parsed.name) return false;
        const flag = localStorage.getItem('cudi_session_active');
        if (flag === 'false') return false;
        if (flag !== 'true') localStorage.setItem('cudi_session_active', 'true');
        return true;
    } catch (e) {
        return false;
    }
}

// === GLOBAL SESSION / PERSISTENCE & AUTH ===
function handleHeroAction() {
    if (cudi_is_session_active()) {
        window.location.assign('mi-mascota.html');
    } else {
        openAuthModal('register');
    }
}

function cudi_init_auth_modal(mode = 'login') {
    let modal = document.getElementById('cudi-auth-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'cudi-auth-modal';
        modal.className = 'cudi-modal-overlay';
        document.body.appendChild(modal);
    } else if (modal.parentNode !== document.body) {
        // Garantizar que el modal NUNCA quede atrapado dentro de un <section> con transform
        document.body.appendChild(modal);
    }

    modal.onclick = function(e) {
        if (e.target === modal) closeAuthModal();
    };

    const candidate = cudi_get_random_pet_candidate();
    let lastSavedPet = null;
    try {
        lastSavedPet = JSON.parse(localStorage.getItem('cudi_last_registered_pet') || 'null');
    } catch (e) {}

    const resumeHtml = lastSavedPet && lastSavedPet.name ? `
        <div id="auth-quick-resume-box" style="background:#f0f9ff; border:1.5px solid #7dd3fc; border-radius:16px; padding:12px 14px; margin-bottom:14px; display:flex; align-items:center; justify-content:space-between; gap:10px;">
            <div style="display:flex; align-items:center; gap:10px;">
                <img src="${lastSavedPet.photo || candidate.photo}" alt="${lastSavedPet.name}" style="width:42px; height:42px; border-radius:50%; object-fit:cover; border:2px solid #0284c7;">
                <div>
                    <span style="display:block; font-size:0.7rem; font-weight:800; color:#0284c7; text-transform:uppercase;">Cuenta Registrada Detectada</span>
                    <strong style="font-size:0.92rem; color:#0f172a;">${lastSavedPet.name} (${lastSavedPet.breed || 'Mascota'})</strong>
                </div>
            </div>
            <button type="button" onclick="cudi_quickResumeLastPet()" style="background:#0284c7; color:white; border:none; border-radius:10px; padding:8px 14px; font-weight:800; font-size:0.78rem; cursor:pointer; white-space:nowrap;">
                <i class="fa-solid fa-right-to-bracket"></i> Entrar
            </button>
        </div>
    ` : `
        <div id="auth-unregistered-notice" style="background:#fffbeb; border:1px solid #fde68a; border-radius:14px; padding:10px 14px; margin-bottom:14px; font-size:0.8rem; color:#92400e; display:flex; align-items:center; gap:10px;">
            <i class="fa-solid fa-circle-info" style="font-size:1.1rem; color:#d97706;"></i>
            <span><strong>¿No tienes cuenta activa?</strong> Regístrate aquí mismo completando los datos de tu mascota o usa el <strong>Llenado Rápido con IA</strong>.</span>
        </div>
    `;

    modal.innerHTML = `
        <div class="cudi-modal-content">
            <div class="modal-header-premium" style="padding:16px 22px 14px;">
                <button type="button" onclick="closeAuthModal()" style="position:absolute; top:14px; right:16px; background:rgba(255,255,255,0.2); width:32px; height:32px; border-radius:50%; border:none; color:white; cursor:pointer; font-size:1rem; display:flex; align-items:center; justify-content:center;" title="Cerrar"><i class="fa-solid fa-xmark"></i></button>
                <div style="display:flex; align-items:center; justify-content:center; gap:10px; margin-bottom:4px;">
                    <i class="fa-solid fa-shield-dog" style="font-size:1.55rem; color:#ffffff;"></i>
                    <h2 id="auth-modal-main-title" style="color:#ffffff !important; font-size:1.3rem; margin:0;">${mode === 'register' ? 'Registrar Mascota en CUDI' : 'Iniciar Sesión o Registro'}</h2>
                </div>
                <p id="auth-modal-main-sub" style="color:rgba(255,255,255,0.92) !important; font-size:0.8rem; margin:0 0 10px;">Accede a tu cuenta o registra el Gemelo Digital de tu mascota</p>
                <div style="display:inline-flex; background:rgba(15,23,42,0.22); padding:3px; border-radius:999px; gap:4px;">
                    <button type="button" id="auth-tab-btn-login" onclick="switchAuthModalTab('login')" style="border:none; padding:6px 15px; border-radius:999px; font-size:0.76rem; font-weight:800; cursor:pointer; transition:all 0.2s; ${mode !== 'register' ? 'background:white; color:#0077b6; box-shadow:0 2px 8px rgba(0,0,0,0.15);' : 'background:transparent; color:white;'}">
                        <i class="fa-solid fa-paw"></i> Iniciar Sesión
                    </button>
                    <button type="button" id="auth-tab-btn-register" onclick="switchAuthModalTab('register')" style="border:none; padding:6px 15px; border-radius:999px; font-size:0.76rem; font-weight:800; cursor:pointer; transition:all 0.2s; ${mode === 'register' ? 'background:white; color:#0077b6; box-shadow:0 2px 8px rgba(0,0,0,0.15);' : 'background:transparent; color:white;'}">
                        <i class="fa-solid fa-user-plus"></i> Registrar Mascota
                    </button>
                </div>
            </div>
            <div class="modal-body-premium" style="padding:14px 22px 18px;">
                ${resumeHtml}

                <!-- BANNER DE LLENADO AUTOMÁTICO ALEATORIO -->
                <div class="cudi-autofill-banner" style="padding:10px 14px; margin-bottom:12px;">
                    <div class="autofill-info">
                        <span class="autofill-badge"><i class="fa-solid fa-wand-magic-sparkles"></i> Llenado Rápido con IA</span>
                        <p style="margin:2px 0;">Prueba el inicio de sesión y registro en 1 segundo:</p>
                        <span class="autofill-suggestion" id="autofill-pet-suggestion">🐾 Sugerencia: <strong>${candidate.name}</strong> (${candidate.breed} • ${candidate.type === 'gato' ? 'Gato' : 'Perro'})</span>
                    </div>
                    <div class="autofill-actions">
                        <button type="button" class="btn-autofill-trigger" onclick="cudi_fillRandomPet()" title="Autollenar datos en 1 click">
                            <i class="fa-solid fa-bolt"></i> Autollenar
                        </button>
                        <button type="button" class="btn-autofill-reroll" onclick="cudi_rerollRandomPet()" title="Elegir otra mascota aleatoria">
                            <i class="fa-solid fa-shuffle"></i>
                        </button>
                    </div>
                </div>

                <!-- PREVIEW CARD SI ESTÁ SELECCIONADA -->
                <div id="auth-pet-preview-wrap" style="display:none; margin-bottom:10px;" class="autofill-pet-preview-card">
                    <img id="auth-preview-photo" src="${candidate.photo}" alt="Mascota" class="autofill-preview-avatar">
                    <div style="flex:1;">
                        <strong id="auth-preview-title" style="font-size:0.9rem; color:#0f172a; display:block;">${candidate.name}</strong>
                        <span id="auth-preview-meta" style="font-size:0.74rem; color:#64748b;">${candidate.breed} • ${candidate.weight} kg • ${candidate.type}</span>
                    </div>
                    <span style="background:#dcfce7; color:#15803d; font-size:0.7rem; font-weight:800; padding:3px 8px; border-radius:12px;"><i class="fa-solid fa-check"></i> Listo</span>
                </div>

                <form onsubmit="handleWebRegister(event)">
                    <!-- Botones visuales de Especie iguales al onboarding de la Demo App -->
                    <div class="cudi-input-group" style="margin-bottom:10px;">
                        <label style="margin-bottom:5px; font-size:0.82rem;">Especie de tu compañero</label>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                            <button type="button" id="modal-species-perro" onclick="cudi_selectModalSpecies('perro')" style="display:flex; align-items:center; justify-content:center; gap:8px; padding:8px; border-radius:10px; border:2px solid #0284c7; background:#f0f9ff; color:#0f172a; font-weight:800; cursor:pointer; font-size:0.84rem;">
                                <i class="fa-solid fa-dog" style="color:#0284c7; font-size:1rem;"></i> Perro
                            </button>
                            <button type="button" id="modal-species-gato" onclick="cudi_selectModalSpecies('gato')" style="display:flex; align-items:center; justify-content:center; gap:8px; padding:8px; border-radius:10px; border:2px solid #e2e8f0; background:#ffffff; color:#475569; font-weight:700; cursor:pointer; font-size:0.84rem;">
                                <i class="fa-solid fa-cat" style="color:#ec4899; font-size:1rem;"></i> Gato
                            </button>
                        </div>
                        <select id="web-pet-type" class="cudi-input-premium" onchange="cudi_onSpeciesChange()" style="display:none;">
                            <option value="perro">Perro</option>
                            <option value="gato">Gato</option>
                        </select>
                    </div>

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                        <div class="cudi-input-group" style="margin-bottom:10px;">
                            <label style="margin-bottom:4px; font-size:0.82rem;">Nombre de tu mascota</label>
                            <input type="text" id="web-pet-name" class="cudi-input-premium" style="padding:9px 12px;" placeholder="Ej: Luna, Max..." required>
                        </div>
                        <div class="cudi-input-group" style="margin-bottom:10px;">
                            <label style="margin-bottom:4px; font-size:0.82rem;">Raza</label>
                            <input type="text" id="web-pet-breed" class="cudi-input-premium" style="padding:9px 12px;" placeholder="Ej: Golden, Mestizo..." required>
                        </div>
                    </div>

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                        <div class="cudi-input-group" style="margin-bottom:10px;">
                            <label style="margin-bottom:4px; font-size:0.82rem;">Edad (Años)</label>
                            <input type="number" id="web-pet-age" class="cudi-input-premium" style="padding:9px 12px;" placeholder="2" min="0.5" max="25" step="0.5" required>
                        </div>
                        <div class="cudi-input-group" style="margin-bottom:10px;">
                            <label style="margin-bottom:4px; font-size:0.82rem;">Peso (kg)</label>
                            <input type="number" id="web-pet-weight" class="cudi-input-premium" style="padding:9px 12px;" placeholder="10" min="0.5" max="90" step="0.5" required>
                        </div>
                    </div>

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                        <div class="cudi-input-group" style="margin-bottom:12px;">
                            <label style="margin-bottom:4px; font-size:0.82rem;">Nivel de Energía</label>
                            <select id="web-pet-energy" class="cudi-input-premium" style="padding:9px 12px;">
                                <option value="Tranquilo">Tranquilo</option>
                                <option value="Moderado" selected>Moderado</option>
                                <option value="Alto">Alto</option>
                                <option value="Extremo">Extremo</option>
                            </select>
                        </div>
                        <div class="cudi-input-group" style="margin-bottom:12px;">
                            <label style="margin-bottom:4px; font-size:0.82rem;">Alimentación</label>
                            <select id="web-pet-food" class="cudi-input-premium" style="padding:9px 12px;">
                                <option value="Pienso Seco">Pienso Seco</option>
                                <option value="Dieta Natural BARF">Dieta Natural BARF</option>
                                <option value="Mixta">Mixta</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" id="auth-submit-main-btn" class="btn-primary" style="width:100%; padding:13px; border-radius:12px; font-weight:800; text-transform:uppercase; letter-spacing:0.6px; margin-top:2px; display:flex; align-items:center; justify-content:center; gap:10px; border:none; cursor:pointer; font-size:0.88rem;">
                        <i class="fa-solid fa-heart-pulse"></i> <span>${mode === 'register' ? 'Registrar Mascota y Conectar' : 'Iniciar Sesión / Registrar y Conectar'}</span>
                    </button>
                </form>
                <p style="text-align:center; font-size:0.72rem; color:#64748b; margin:8px 0 0;">Al continuar, tu mascota quedará sincronizada en todas las páginas, la Comunidad, el Asistente IA y la Demo App.</p>
            </div>
        </div>
    `;
}

function switchAuthModalTab(mode) {
    const title = document.getElementById('auth-modal-main-title');
    const loginBtn = document.getElementById('auth-tab-btn-login');
    const regBtn = document.getElementById('auth-tab-btn-register');
    const submitBtn = document.getElementById('auth-submit-main-btn');

    if (title) {
        title.textContent = mode === 'register' ? 'Registrar Mascota en CUDI' : 'Iniciar Sesión o Registro';
    }
    if (loginBtn && regBtn) {
        if (mode === 'register') {
            regBtn.style.background = 'white';
            regBtn.style.color = '#0077b6';
            regBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
            loginBtn.style.background = 'transparent';
            loginBtn.style.color = 'white';
            loginBtn.style.boxShadow = 'none';
        } else {
            loginBtn.style.background = 'white';
            loginBtn.style.color = '#0077b6';
            loginBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
            regBtn.style.background = 'transparent';
            regBtn.style.color = 'white';
            regBtn.style.boxShadow = 'none';
        }
    }
    if (submitBtn) {
        submitBtn.innerHTML = `<i class="fa-solid fa-heart-pulse"></i> <span>${mode === 'register' ? 'Registrar Mascota y Conectar' : 'Iniciar Sesión / Registrar y Conectar'}</span>`;
    }
}

function cudi_selectModalSpecies(type) {
    const select = document.getElementById('web-pet-type');
    if (select) select.value = type;
    const btnDog = document.getElementById('modal-species-perro');
    const btnCat = document.getElementById('modal-species-gato');
    if (btnDog && btnCat) {
        if (type === 'gato') {
            btnCat.style.borderColor = '#ec4899';
            btnCat.style.background = '#fdf2f8';
            btnCat.style.color = '#0f172a';
            btnDog.style.borderColor = '#e2e8f0';
            btnDog.style.background = '#ffffff';
            btnDog.style.color = '#475569';
        } else {
            btnDog.style.borderColor = '#0284c7';
            btnDog.style.background = '#f0f9ff';
            btnDog.style.color = '#0f172a';
            btnCat.style.borderColor = '#e2e8f0';
            btnCat.style.background = '#ffffff';
            btnCat.style.color = '#475569';
        }
    }
    cudi_onSpeciesChange();
}

function cudi_quickResumeLastPet() {
    try {
        const lastSavedPet = JSON.parse(localStorage.getItem('cudi_last_registered_pet') || 'null');
        if (!lastSavedPet || !lastSavedPet.name) return;
        lastSavedPet.sessionActive = true;
        localStorage.setItem('cudi_pet_profile', JSON.stringify(lastSavedPet));
        localStorage.setItem('cudi_session_active', 'true');
        window.dispatchEvent(new CustomEvent('cudi:sessionChanged', { detail: lastSavedPet }));
        cudi_check_session();
        closeAuthModal();
        if (typeof showCudiToast === 'function') {
            showCudiToast(`🎉 ¡Bienvenido de nuevo! Sesión iniciada con ${lastSavedPet.name}.`, 'success');
        }
        const currentPath = window.location.pathname.toLowerCase();
        if (!currentPath.includes('simulador') && !currentPath.includes('comunidad')) {
            setTimeout(() => { window.location.href = 'mi-mascota.html'; }, 500);
        }
    } catch (e) {}
}

function openAuthModal(mode = 'login') {
    cudi_init_auth_modal(mode);
    const modal = document.getElementById('cudi-auth-modal');
    if (modal) {
        modal.style.display = 'flex';
        const nameVal = document.getElementById('web-pet-name')?.value;
        if (!nameVal) {
            const candidate = cudi_get_random_pet_candidate();
            const sugg = document.getElementById('autofill-pet-suggestion');
            if (sugg) sugg.innerHTML = `🐾 Sugerencia: <strong>${candidate.name}</strong> (${candidate.breed} • ${candidate.type === 'gato' ? 'Gato' : 'Perro'})`;
        }
    }
}

function closeAuthModal() {
    const modal = document.getElementById('cudi-auth-modal');
    if (modal) modal.style.display = 'none';
}

function cudi_onSpeciesChange() {
    const type = document.getElementById('web-pet-type')?.value;
    const breedInput = document.getElementById('web-pet-breed');
    if (breedInput && (!breedInput.value || breedInput.value === 'Mestizo' || breedInput.value === 'Mestizo Inteligente' || breedInput.value === 'Europeo Atigrado' || breedInput.value === 'Europeo Común')) {
        breedInput.value = type === 'gato' ? 'Europeo Común' : 'Mestizo Inteligente';
    }
    if (window.currentRandomPet && window.currentRandomPet.type !== type) {
        window.currentSelectedPhoto = type === 'gato'
            ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80'
            : 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80';
        const previewPhoto = document.getElementById('auth-preview-photo');
        if (previewPhoto) previewPhoto.src = window.currentSelectedPhoto;
    }
}

function cudi_fillRandomPet() {
    const pet = cudi_get_random_pet_candidate();
    const nameInput = document.getElementById('web-pet-name');
    const typeSelect = document.getElementById('web-pet-type');
    const breedInput = document.getElementById('web-pet-breed');
    const ageInput = document.getElementById('web-pet-age');
    const weightInput = document.getElementById('web-pet-weight');
    const energySelect = document.getElementById('web-pet-energy');
    const foodSelect = document.getElementById('web-pet-food');

    if (nameInput) nameInput.value = pet.name;
    if (typeSelect) typeSelect.value = pet.type;
    cudi_selectModalSpecies(pet.type);
    if (breedInput) breedInput.value = pet.breed;
    if (ageInput) ageInput.value = pet.age;
    if (weightInput) weightInput.value = pet.weight;
    if (energySelect) energySelect.value = pet.energy;
    if (foodSelect) foodSelect.value = pet.food;

    window.currentSelectedPhoto = pet.photo;

    // Actualizar tarjeta preview
    const previewWrap = document.getElementById('auth-pet-preview-wrap');
    const previewPhoto = document.getElementById('auth-preview-photo');
    const previewTitle = document.getElementById('auth-preview-title');
    const previewMeta = document.getElementById('auth-preview-meta');

    if (previewWrap) {
        previewWrap.style.display = 'flex';
        if (previewPhoto) previewPhoto.src = pet.photo;
        if (previewTitle) previewTitle.textContent = pet.name;
        if (previewMeta) previewMeta.textContent = `${pet.breed} • ${pet.weight} kg • ${pet.type === 'gato' ? 'Gato' : 'Perro'}`;
    }

    // Efecto de pulso en campos para ver el proceso rápido
    [nameInput, breedInput, ageInput, weightInput].forEach(el => {
        if (el) {
            el.classList.add('field-highlight-pulse');
            setTimeout(() => el.classList.remove('field-highlight-pulse'), 600);
        }
    });

    if (typeof showCudiToast === 'function') {
        showCudiToast(`✨ Campos autollenados con ${pet.name} (${pet.breed}). ¡Haz clic en Conectar!`, 'info');
    }
}

function cudi_rerollRandomPet() {
    let nextPet;
    do {
        const idx = Math.floor(Math.random() * CUDI_RANDOM_PETS.length);
        nextPet = CUDI_RANDOM_PETS[idx];
    } while (window.currentRandomPet && nextPet.name === window.currentRandomPet.name && CUDI_RANDOM_PETS.length > 1);

    window.currentRandomPet = nextPet;
    const sugg = document.getElementById('autofill-pet-suggestion');
    if (sugg) {
        sugg.innerHTML = `🐾 Sugerencia: <strong>${nextPet.name}</strong> (${nextPet.breed} • ${nextPet.type === 'gato' ? 'Gato' : 'Perro'})`;
    }
    // Rellenar de inmediato con la nueva
    cudi_fillRandomPet();
}

function cudi_logout() {
    if (confirm('¿Deseas cerrar la sesión de tu mascota? Podrás volver a iniciar sesión o registrar otra mascota en cualquier momento.')) {
        const currentProfile = localStorage.getItem('cudi_pet_profile');
        if (currentProfile) {
            localStorage.setItem('cudi_last_registered_pet', currentProfile);
        }
        localStorage.removeItem('cudi_pet_profile');
        localStorage.removeItem('cudi_session_active');
        window.currentRandomPet = null; // Reiniciar candidato aleatorio
        window.dispatchEvent(new CustomEvent('cudi:sessionChanged', { detail: null }));

        if (typeof showCudiToast === 'function') {
            showCudiToast('👋 Sesión cerrada. Puedes volver a iniciar sesión o registrar otra mascota.', 'info');
        }

        cudi_check_session();

        if (window.location.pathname.includes('mi-mascota.html')) {
            window.location.href = 'index.html';
        }
    }
}

function handleWebRegister(event) {
    if (event) event.preventDefault();
    const name = (document.getElementById('web-pet-name')?.value || '').trim();
    if (!name) return alert('Por favor, indica el nombre de tu mascota.');

    const type = document.getElementById('web-pet-type')?.value || 'perro';
    const breed = (document.getElementById('web-pet-breed')?.value || '').trim() || (type === 'gato' ? 'Europeo Común' : 'Mestizo');
    const age = document.getElementById('web-pet-age')?.value || '2';
    const weight = document.getElementById('web-pet-weight')?.value || (type === 'gato' ? '4.2' : '12');
    const energy = document.getElementById('web-pet-energy')?.value || 'Moderado';
    const food = document.getElementById('web-pet-food')?.value || 'Pienso Seco';

    const defaultSpeciesPhoto = type === 'gato'
        ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80';

    const photo = window.currentSelectedPhoto ||
                 (window.currentRandomPet && window.currentRandomPet.type === type && window.currentRandomPet.photo
                     ? window.currentRandomPet.photo
                     : defaultSpeciesPhoto);

    const profile = {
        name,
        type,
        breed,
        age: isNaN(age) ? age : Number(age),
        weight: isNaN(weight) ? weight : Number(weight),
        energy,
        food,
        photo,
        bpm: type === 'gato' ? 142 : 78,
        temp: 38.5,
        battery: 95,
        sessionActive: true,
        savedAt: new Date().toISOString()
    };

    localStorage.setItem('cudi_pet_profile', JSON.stringify(profile));
    localStorage.setItem('cudi_last_registered_pet', JSON.stringify(profile));
    localStorage.setItem('cudi_session_active', 'true');
    window.dispatchEvent(new CustomEvent('cudi:sessionChanged', { detail: profile }));

    cudi_check_session();
    closeAuthModal();

    const currentPath = window.location.pathname.toLowerCase();
    if (currentPath.includes('simulador')) {
        // En el simulador: sincronizar al instante sin sacarlo de la demo
        if (typeof loadSavedProfile === 'function') {
            loadSavedProfile();
        }
        if (typeof showCudiToast === 'function') {
            showCudiToast(`🎉 ¡Sesión iniciada con éxito! Conectado a ${profile.name} en el simulador.`, 'success');
        }
    } else if (currentPath.includes('comunidad')) {
        // En la comunidad: sincronizar de inmediato sin redirección
        if (typeof initUserCommunitySync === 'function') {
            initUserCommunitySync();
        }
        if (typeof showCudiToast === 'function') {
            showCudiToast(`🎉 ¡Sesión iniciada! Ahora interactúas en la comunidad como ${profile.name}.`, 'success');
        }
    } else {
        // En index u otras páginas: redirección a su panel
        if (typeof showCudiToast === 'function') {
            showCudiToast(`🎉 ¡Sesión iniciada con éxito! Conectado a ${profile.name}.`, 'success');
        }
        setTimeout(() => {
            window.location.href = 'mi-mascota.html';
        }, 600);
    }
}

function cudi_check_session() {
    const isLogged = cudi_is_session_active();
    let profile = null;

    if (isLogged) {
        try {
            profile = JSON.parse(localStorage.getItem('cudi_pet_profile'));
        } catch (e) {
            console.error('Error parse cudi_pet_profile', e);
        }
    }

    const navItem = document.getElementById('nav-session-item');
    const mobileItem = document.getElementById('mobile-session-item');
    const heroBtn = document.querySelector('.hero-actions .btn-primary');

    // Botón de sesión visible directamente en cabecera móvil (al lado del carrito)
    let mobilePill = document.getElementById('mobile-nav-session-pill');
    if (!mobilePill) {
        const rightIsland = document.querySelector('.nav-right-island');
        if (rightIsland) {
            mobilePill = document.createElement('div');
            mobilePill.id = 'mobile-nav-session-pill';
            mobilePill.className = 'mobile-nav-session-pill';
            const cartTrigger = rightIsland.querySelector('.cart-trigger-island');
            if (cartTrigger) {
                rightIsland.insertBefore(mobilePill, cartTrigger);
            } else {
                rightIsland.prepend(mobilePill);
            }
        }
    }

    if (isLogged && profile) {
        // === USUARIO CON SESIÓN INICIADA ===
        if (heroBtn) {
            heroBtn.innerHTML = `<i class="fa-solid fa-chart-line" style="font-size:1.3rem;"></i> Ir a mi Panel (${profile.name})`;
            heroBtn.onclick = function(e) {
                e.preventDefault();
                window.location.assign('mi-mascota.html');
            };
        }

        const sessionHtml = `
            <div class="session-badge-premium" title="Panel de ${profile.name}">
                <a href="mi-mascota.html" class="session-badge-link">
                    <img src="${profile.photo}" alt="${profile.name}" class="session-badge-photo">
                    <span class="session-badge-name">${profile.name}</span>
                </a>
                <button onclick="cudi_logout()" class="session-logout-btn" title="Cerrar Sesión">
                    <i class="fa-solid fa-power-off"></i>
                </button>
            </div>
        `;
        if (navItem) navItem.innerHTML = sessionHtml;

        if (mobilePill) {
            mobilePill.innerHTML = `
                <a href="mi-mascota.html" class="mobile-session-badge" title="Mi Mascota: ${profile.name}">
                    <img src="${profile.photo}" alt="${profile.name}">
                    <span class="m-badge-dot"></span>
                </a>
            `;
        }

        if (mobileItem) {
            mobileItem.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:6px; padding:10px 0;">
                    <a href="mi-mascota.html" style="display:flex; align-items:center; gap:10px; padding:13px; background:#f0f9ff; border-radius:12px; text-decoration:none; color:var(--clr-primary); font-weight:800; border:1px solid #bae6fd;" onclick="toggleMobileMenu()">
                        <img src="${profile.photo}" alt="${profile.name}" style="width:32px; height:32px; border-radius:50%; object-fit:cover; border:2px solid var(--clr-primary);">
                        <span>Mi Mascota: ${profile.name}</span>
                    </a>
                    <button onclick="cudi_logout()" style="background:none; border:none; color:#ef4444; padding:8px; font-weight:600; text-align:left; cursor:pointer; display:flex; align-items:center; gap:6px;">
                        <i class="fa-solid fa-power-off"></i> Cerrar Sesión (${profile.name})
                    </button>
                </div>
            `;
        }
    } else {
        // === USUARIO SIN SESIÓN (NO INICIADA - ACCESO A LLENADO Y DEMO) ===
        if (heroBtn) {
            heroBtn.innerHTML = `<i class="fa-solid fa-heart-pulse" style="font-size:1.3rem;"></i> Conectar mi Mascota`;
            heroBtn.onclick = function(e) {
                e.preventDefault();
                openAuthModal('register');
            };
        }

        const unauthHtml = `
            <div class="session-unauth-wrap">
                <button type="button" onclick="openAuthModal('login')" class="session-btn-login" title="Iniciar Sesión o Registrar Mascota">
                    <i class="fa-solid fa-paw"></i>
                    <span>Iniciar Sesión</span>
                </button>
            </div>
        `;
        if (navItem) navItem.innerHTML = unauthHtml;

        if (mobilePill) {
            mobilePill.innerHTML = `
                <button type="button" onclick="openAuthModal('login')" class="mobile-session-login-btn" title="Iniciar Sesión o Registro">
                    <i class="fa-solid fa-paw"></i> <span>Acceder</span>
                </button>
            `;
        }

        if (mobileItem) {
            mobileItem.innerHTML = `
                <div style="padding:10px 0;">
                    <button type="button" onclick="openAuthModal('login'); toggleMobileMenu();" class="mobile-login-btn">
                        <i class="fa-solid fa-paw"></i> Iniciar Sesión / Registro Rápido
                    </button>
                </div>
            `;
        }
    }
}

window.addEventListener('cudi:sessionChanged', () => {
    cudi_check_session();
});
window.addEventListener('storage', (e) => {
    if (!e.key || e.key === 'cudi_pet_profile' || e.key === 'cudi_session_active') {
        cudi_check_session();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    cudi_check_session();

    // Auto-open registration si viene solicitado en la URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('action') === 'register') {
        setTimeout(openAuthModal, 500);
    }
    
    if(document.getElementById('global-cart-badge') || 
       document.getElementById('checkout-total-price') || 
       document.getElementById('cart-items-container')) {
        renderCartUI();
    }

    // Floating Demo Pill on every public page for easy access
    if (!window.location.pathname.includes('simulador-gemelo-digital-telemetria') && 
        !window.location.pathname.includes('simulador-solo-app')) {
        if (!document.getElementById('global-floating-demo-pill')) {
            const pill = document.createElement('a');
            pill.id = 'global-floating-demo-pill';
            pill.className = 'floating-demo-pill';
            pill.href = 'simulador-gemelo-digital-telemetria.html';
            pill.innerHTML = `
                <span class="pill-dot"></span>
                <span><i class="fa-solid fa-mobile-screen"></i> Probar Demo App</span>
            `;
            document.body.appendChild(pill);
        }
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


// --- CUDI GLOBAL SMART AI SEARCH ENGINE ---
function escapeSearchHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

window.openCudiAiWithQuery = function(query) {
    document.querySelectorAll('.search-results-dropdown').forEach(d => d.style.display = 'none');
    if (typeof CudiAI !== 'undefined' && typeof CudiAI.toggle === 'function') {
        const panel = document.getElementById('ai-panel');
        if (!panel || !panel.classList.contains('active')) {
            CudiAI.toggle();
        }
        setTimeout(() => {
            const input = document.getElementById('ai-input');
            if (input) {
                input.value = query;
                CudiAI.sendMessage();
            }
        }, 300);
    } else {
        window.location.href = `simulador-gemelo-digital-telemetria.html?ai_query=${encodeURIComponent(query)}`;
    }
};

function setupSearchInput(input) {
    if (input.dataset.searchBound) return;
    input.dataset.searchBound = "true";

    const parent = input.parentNode;
    if (parent) parent.style.position = 'relative';

    const dropdown = document.createElement('div');
    dropdown.className = 'search-results-dropdown';
    dropdown.style.display = 'none';
    if (parent) parent.appendChild(dropdown);

    let currentResults = [];

    input.addEventListener('input', (e) => {
        const rawQuery = e.target.value.trim();
        if (rawQuery.length < 2) {
            dropdown.style.display = 'none';
            currentResults = [];
            return;
        }

        const data = searchCudiEcosystem(rawQuery);
        currentResults = data.results || [];

        if (currentResults.length > 0) {
            let html = '';

            // AI Insight Header Card
            if (data.aiSummary) {
                html += `
                    <div class="search-ai-card">
                        <div class="search-ai-header">
                            <span class="search-ai-chip"><i class="fa-solid fa-wand-magic-sparkles"></i> CUDI AI Insight</span>
                            <button type="button" class="search-ai-ask-btn" onclick="openCudiAiWithQuery('${escapeSearchHtml(data.correction || rawQuery)}')">
                                <i class="fa-solid fa-comments"></i> Preguntar a la IA
                            </button>
                        </div>
                        <p class="search-ai-text">${escapeSearchHtml(data.aiSummary)}</p>
                    </div>
                `;
            }

            // Typo Correction Notice
            if (data.correction) {
                html += `
                    <div class="search-correction-bar">
                        <i class="fa-solid fa-lightbulb"></i>
                        <span>Mostrando para <strong>${escapeSearchHtml(data.correction)}</strong> (corregido de <em>${escapeSearchHtml(rawQuery)}</em>)</span>
                    </div>
                `;
            }

            // Results List
            html += currentResults.map(item => `
                <a href="${item.url}" class="search-result-item">
                    <div class="sr-header-row">
                        <div class="sr-title-wrap">
                            <span class="sr-icon"><i class="fa-solid ${item.icon || 'fa-arrow-turn-down'}"></i></span>
                            <span class="sr-title">${escapeSearchHtml(item.title)}</span>
                        </div>
                        <div class="sr-meta-wrap">
                            <span class="sr-badge ${item.badgeClass || ''}">${escapeSearchHtml(item.category || 'Recurso')}</span>
                            ${item.price ? `<span class="sr-price">${escapeSearchHtml(item.price)}</span>` : ''}
                        </div>
                    </div>
                    <p class="sr-desc">${escapeSearchHtml(item.desc)}</p>
                </a>
            `).join('');

            // Ecosystem Footer
            html += `
                <div class="search-footer">
                    <span><i class="fa-solid fa-circle-nodes"></i> Ecosistema CUDI Completo</span>
                    <span>${currentResults.length} coincidencias inteligentes</span>
                </div>
            `;

            dropdown.innerHTML = html;
            dropdown.style.display = 'block';
        } else {
            dropdown.innerHTML = `
                <div class="search-empty-state">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <p>No encontramos páginas directas para "<strong>${escapeSearchHtml(rawQuery)}</strong>"</p>
                    <button type="button" class="empty-ask-btn" onclick="openCudiAiWithQuery('${escapeSearchHtml(rawQuery)}')">
                        <i class="fa-solid fa-robot"></i> Consultar a CUDI AI
                    </button>
                </div>
            `;
            dropdown.style.display = 'block';
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (currentResults.length > 0) {
                window.location.href = currentResults[0].url;
            } else if (input.value.trim().length >= 2) {
                window.openCudiAiWithQuery(input.value.trim());
            }
        }
    });

    // Hide when clicking outside
    document.addEventListener('click', (e) => {
        if (parent && !parent.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });

    // Focus restore
    input.addEventListener('focus', () => {
        if (input.value.trim().length >= 2 && dropdown.innerHTML.trim() !== '') {
            dropdown.style.display = 'block';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInputs = document.querySelectorAll('.nav-search-island input');
    searchInputs.forEach(setupSearchInput);
});

function initMobileEnvironment() {
    const existing = document.getElementById('mobile-drawer');
    if (existing) return;

    const drawer = document.createElement('div');
    drawer.id = 'mobile-drawer';
    drawer.className = 'mobile-drawer';
    drawer.innerHTML = `
        <button class="drawer-close" onclick="toggleMobileMenu()"><i class="fa-solid fa-xmark"></i></button>
        <div style="text-align:center; margin-bottom:20px;">
            <img src="logo.jpeg" alt="CUDI" style="height:55px; border-radius:10px;">
        </div>
        <div class="mobile-search-box" style="margin-bottom:20px; padding:0 15px;">
            <div class="nav-search-island" style="display:flex !important; width:100%; box-sizing:border-box;">
                <i class="fa-solid fa-magnifying-glass" style="color:var(--clr-primary); font-size:0.9rem;"></i>
                <input type="text" placeholder="Buscar en CUDI (ej: comida, collar, demo...)">
            </div>
        </div>
        <ul class="drawer-links">
            <li><a href="index.html" onclick="toggleMobileMenu()"><i class="fa-solid fa-house"></i> Inicio</a></li>
            <li><a href="smart-collar-aventuras-sin-sustos.html" onclick="toggleMobileMenu()"><i class="fa-solid fa-rocket"></i> Lanzamiento</a></li>
            <li><a href="comunidad-cudi.html" onclick="toggleMobileMenu()"><i class="fa-solid fa-people-group"></i> Comunidad</a></li>
            <li><a href="simulador-gemelo-digital-telemetria.html" onclick="toggleMobileMenu()"><i class="fa-solid fa-mobile-screen"></i> Demo App</a></li>
            <li><a href="simulador-financiero.html" onclick="toggleMobileMenu()"><i class="fa-solid fa-chart-line"></i> Simulador Financiero</a></li>
            <li><a href="index.html#store-grid" onclick="toggleMobileMenu()"><i class="fa-solid fa-store"></i> Tienda</a></li>
            <li><a href="index.html#suscripciones" onclick="toggleMobileMenu()"><i class="fa-solid fa-shield-cat"></i> Planes</a></li>
            <li><a href="red-socios-clinicas-veterinarias.html" onclick="toggleMobileMenu()"><i class="fa-solid fa-handshake"></i> Partners</a></li>
            <li id="mobile-session-item"></li>
        </ul>
    `;
    document.body.appendChild(drawer);

    const mobileInput = drawer.querySelector('.nav-search-island input');
    if (mobileInput) setupSearchInput(mobileInput);
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

// ============================================================
// applyMobileShockforce — Cierra todos los paneles al pasar
// de móvil a desktop redimensionando el navegador.
// Esta función era llamada en el listener de resize pero
// no existía, causando un error JS que bloqueaba el menú.
// ============================================================
function applyMobileShockforce() {
    if (window.innerWidth > 1024) {
        // Al volver a escritorio: cerrar drawer, carrito y overlay
        closeAllPanels();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileEnvironment();
    cudi_check_session();
    window.addEventListener('resize', applyMobileShockforce);

    // ================================================================
    // FIX CRÍTICO: Reubicar paneles fixed (drawer, cart, overlay)
    // Se mueven al inicio del body para evitar que queden atrapados
    // por el stacking context de secciones con animaciones transform.
    // ================================================================
    const panelsToMove = ['mobile-drawer', 'side-cart', 'cart-overlay', 'cudi-auth-modal'];
    panelsToMove.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            // Se insertan al principio para asegurar prioridad visual y de contexto
            document.body.insertBefore(el, document.body.firstChild);
        }
    });
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
