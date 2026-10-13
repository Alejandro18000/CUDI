// Desarrollo 100% realizado por Sergio Alejandro Ospina Rocha
var CUDI_SEARCH_INDEX = [
    // --- PRODUCTOS DE TIENDA (15 PRODUCTOS + SMART COLLAR) ---
    {
        url: "smart-collar-cudi-gps.html",
        title: "Smart Collar CUDI GPS - Collar Biométrico IoT",
        category: "Hardware IoT",
        badgeClass: "badge-hardware",
        icon: "fa-satellite-dish",
        price: "89.50 €",
        desc: "Collar clínico con ECG óptico, VFC, temperatura dérmica, GPS L1+L5 + eSIM 4G autónoma, IP68 y garantía de 30 días.",
        tags: ["collar", "smart collar", "gps", "rastreo", "localizador", "geolocalizacion", "ubicar", "donde esta", "perdida", "mapa", "hardware", "dispositivo", "producto", "productos", "tienda", "catalogo", "bateria", "sensor"]
    },
    {
        url: "producto-ecopet-organic.html",
        title: "EcoPet Organic - Dieta BARF Biológica",
        category: "Nutrición",
        badgeClass: "badge-nutrition",
        icon: "fa-bowl-food",
        price: "45.00 €",
        desc: "Alimento crudo biológicamente apropiado (BARF) con carne de pasto y vegetales orgánicos. Cero cereales, balance microbioma.",
        tags: ["comida", "alimento", "pienso", "barf", "dieta", "carne", "croquetas", "nutricion", "organico", "ecopet", "comer", "hambre", "producto", "productos", "tienda", "catalogo"]
    },
    {
        url: "producto-purebites-clinic.html",
        title: "PureBites Clinic - Pienso Hipoalergénico IA",
        category: "Nutrición",
        badgeClass: "badge-nutrition",
        icon: "fa-prescription-bottle",
        price: "58.00 €",
        desc: "Piensos clínicos especializados prescritos por IA para sensibilidades gástricas, alergias cutáneas, vómitos e intolerancias digestivas.",
        tags: ["comida", "alimento", "pienso", "croquetas", "dieta", "hipoalergenico", "gastrico", "alergia", "digestion", "estomago", "nutricion", "purebites", "vomito", "diarrea", "rasca", "dermatitis", "producto", "productos", "tienda"]
    },
    {
        url: "producto-vitality-mix.html",
        title: "Vitality Mix - Suplemento Inmune Dual",
        category: "Nutrición",
        badgeClass: "badge-nutrition",
        icon: "fa-capsules",
        price: "32.50 €",
        desc: "Suplementos nutricionales con Omega-3 EPA/DHA, prebióticos FOS, cúrcuma y zinc para reforzar el sistema inmune de perros y gatos.",
        tags: ["suplemento", "vitaminas", "omega3", "inmune", "nutricion", "vitality", "defensas", "comida", "complemento", "articulaciones", "producto", "productos", "tienda", "catalogo"]
    },
    {
        url: "producto-cudi-shield-basic.html",
        title: "CUDI Shield Basic - Seguro Urgencias y RC",
        category: "Seguros",
        badgeClass: "badge-insurance",
        icon: "fa-shield-halved",
        price: "18.00 €/mes",
        desc: "Reembolso del 80% en urgencias y accidentes más cobertura obligatoria de Responsabilidad Civil familiar hasta 150.000 €.",
        tags: ["seguro", "seguros", "responsabilidad civil", "rc", "ley bienestar animal", "cobertura", "poliza", "shield", "proteger", "accidente", "producto", "productos", "tienda"]
    },
    {
        url: "producto-global-pet-protect.html",
        title: "Global Pet Protect - Seguro Quirúrgico Total 100%",
        category: "Seguros",
        badgeClass: "badge-insurance",
        icon: "fa-shield-heart",
        price: "35.00 €/mes",
        desc: "Seguro veterinario integral con reembolso del 100% en cirugías, urgencias 24h, hospitalización UCI y cobertura internacional.",
        tags: ["seguro", "seguros", "salud", "veterinario", "cirugia", "hospital", "reembolso", "urgencias", "cobertura medica", "global pet protect", "operacion", "producto", "productos"]
    },
    {
        url: "producto-safehome-multipet.html",
        title: "SafeHome MultiPet - Seguro Hogares Multiespecie",
        category: "Seguros",
        badgeClass: "badge-insurance",
        icon: "fa-house-chimney-medical",
        price: "28.00 €/mes",
        desc: "Protección unificada para familias donde conviven perros y gatos bajo una sola póliza de urgencias y accidentes domésticos.",
        tags: ["seguro", "seguros", "multiespecie", "hogar", "gatos", "perros", "cobertura", "accidentes", "safehome", "multipet", "poliza", "producto", "productos"]
    },
    {
        url: "producto-vethome-cudi.html",
        title: "VetHome CUDI - Veterinario Colegiado a Domicilio",
        category: "Salud 24/7",
        badgeClass: "badge-health",
        icon: "fa-user-doctor",
        price: "75.00 €",
        desc: "Atención médica presencial en tu hogar en menos de 45 min, urgencias, vacunación y revisiones sin estrés de transporte.",
        tags: ["veterinario", "domicilio", "casa", "vethome", "vacunas", "vacunar", "revision", "urgencia", "urgencias", "medico", "visita", "vomito", "diarrea", "fiebre", "cojea", "chocolate", "toxico", "producto", "servicios"]
    },
    {
        url: "producto-medipet-express.html",
        title: "MediPet Express - Telemedicina y Clínicas 24h",
        category: "Salud 24/7",
        badgeClass: "badge-health",
        icon: "fa-truck-medical",
        price: "35.00 €",
        desc: "Videoconsulta veterinaria inmediata 24/7 con receta electrónica y red de clínicas de barrio conectadas al Gemelo Digital.",
        tags: ["veterinario", "clinica", "urgencias", "24h", "medico", "doctor", "enfermo", "consulta", "medipet", "salud", "telemedicina", "videollamada", "tos", "producto", "servicios"]
    },
    {
        url: "producto-hospital-clinico-dual.html",
        title: "Hospital Clínico Dual - Medicina Interna y UCI 24h",
        category: "Salud 24/7",
        badgeClass: "badge-health",
        icon: "fa-hospital",
        price: "60.00 €",
        desc: "Hospital de referencia con quirófanos de última generación, TAC, ecografía Doppler y UCI avanzada para caninos y felinos.",
        tags: ["hospital", "veterinario", "cirugia", "uci", "medicina interna", "especialista", "graves", "dual", "clinico", "quirofano", "producto", "servicios"]
    },
    {
        url: "producto-activepaws.html",
        title: "ActivePaws - Ejercicio Guiado y Agilidad Canina",
        category: "Paseos & Deporte",
        badgeClass: "badge-walks",
        icon: "fa-person-running",
        price: "19.99 €",
        desc: "Sesiones de ejercicio guiado, estimulación olfativa y control de pulsaciones y ruta GPS en directo con monitores titulados.",
        tags: ["paseo", "paseos", "paseador", "paseadores", "ejercicio", "entrenamiento", "correr", "energia", "activo", "activepaws", "deporte", "producto", "servicios"]
    },
    {
        url: "producto-urban-pet-walkers.html",
        title: "Urban Pet Walkers - Paseos Urbanos Certificados GPS",
        category: "Paseos & Deporte",
        badgeClass: "badge-walks",
        icon: "fa-dog",
        price: "15.00 €",
        desc: "Caminatas seguras en grupos reducidos y transporte técnico felino con seguimiento GPS en tiempo real desde la App.",
        tags: ["paseador", "paseadores", "paseo", "paseos", "caminar", "walkers", "urban pet walkers", "perros", "barrio", "gps paseo", "cuidado", "producto", "servicios"]
    },
    {
        url: "producto-nannypets-247.html",
        title: "NannyPets 24/7 - Cuidadores Verificados a Domicilio",
        category: "Paseos & Deporte",
        badgeClass: "badge-walks",
        icon: "fa-couch",
        price: "25.00 €/día",
        desc: "Cuidado profesional en tu propio hogar sin jaulas para que perros y gatos permanezcan juntos durante tu ausencia con reportes biométricos.",
        tags: ["cuidador", "cuidadores", "guarderia", "hotel", "viaje", "domicilio", "nanny", "nannypets", "quedarse", "canguro", "producto", "servicios"]
    },
    {
        url: "producto-bubbles--paws.html",
        title: "Bubbles & Paws - Baño Ecológico y Ozonoterapia",
        category: "Higiene & Spa",
        badgeClass: "badge-spa",
        icon: "fa-soap",
        price: "22.00 €",
        desc: "Baño dermoprotector 100% biodegradable y ozonoterapia en cabinas acústicas libres de estrés y ruido.",
        tags: ["bano", "banar", "lavar", "higiene", "champu", "limpieza", "burbujas", "bubbles", "peluqueria", "ozonoterapia", "piel", "picor", "producto", "servicios"]
    },
    {
        url: "producto-grooming-master.html",
        title: "Grooming Master - Peluquería y Corte a Tijera",
        category: "Higiene & Spa",
        badgeClass: "badge-spa",
        icon: "fa-scissors",
        price: "30.00 €",
        desc: "Corte a tijera de alta escuela, deslanado, arreglo higiénico y cuidado adaptado a la sensibilidad dérmica de tu mascota.",
        tags: ["peluqueria", "corte", "estilismo", "grooming", "tijera", "pelo", "ozono", "peinado", "belleza", "estetica", "producto", "servicios"]
    },
    {
        url: "producto-zenpet-spa.html",
        title: "ZenPet Spa - Hidroterapia y Spa Antiestrés con Feromonas",
        category: "Higiene & Spa",
        badgeClass: "badge-spa",
        icon: "fa-spa",
        price: "50.00 €",
        desc: "Hidroterapia articular, masaje relajante y cabinas con feromonas apaciguadoras para reducir activamente el cortisol y la ansiedad.",
        tags: ["spa", "relajacion", "estres", "ansiedad", "cortisol", "masaje", "hidroterapia", "feromonas", "zenpet", "calma", "bienestar", "producto", "servicios"]
    },

    // --- ARTÍCULOS CLÍNICOS E INVESTIGACIÓN IA (CUDI JOURNAL — 6 ESTUDIOS) ---
    {
        url: "gemelos-digitales-salud-predictiva.html",
        title: "Gemelos Digitales y Salud Predictiva",
        category: "CUDI Journal / Artículo",
        badgeClass: "badge-clinical",
        icon: "fa-network-wired",
        price: "6 min lectura",
        desc: "Cómo la monitorización continua las 8.760 horas del año anticipa patologías cardíacas y metabólicas con 94.8% de precisión.",
        tags: ["articulo", "articulos", "estudio", "estudios", "journal", "investigacion", "investigaciones", "cientifico", "cientificos", "paper", "lectura", "blog", "gemelo digital", "gemelos digitales", "salud predictiva", "telemetria", "biomedicina", "prediccion"]
    },
    {
        url: "triaje-ia-esperanza-vida-veterinaria.html",
        title: "Triaje con IA y Reducción de Mortalidad Aguda",
        category: "CUDI Journal / Artículo",
        badgeClass: "badge-clinical",
        icon: "fa-microchip",
        price: "6 min lectura",
        desc: "La evaluación algorítmica reduce el tiempo de reacción a <18 min y eleva la supervivencia en urgencias críticas al 91%.",
        tags: ["articulo", "articulos", "estudio", "estudios", "journal", "investigacion", "investigaciones", "cientifico", "cientificos", "paper", "lectura", "blog", "triaje", "ia", "inteligencia artificial", "urgencias", "mortalidad", "esperanza de vida", "ventana de oro"]
    },
    {
        url: "microbioma-nutricion-longevidad-canina.html",
        title: "Microbioma, Nutrición Orgánica y Longevidad",
        category: "CUDI Journal / Artículo",
        badgeClass: "badge-clinical",
        icon: "fa-dna",
        price: "7 min lectura",
        desc: "El ajuste calórico dinámico y dietas orgánicas aumentan un +68% la flora intestinal beneficiosa y +2.4 años la esperanza de vida.",
        tags: ["articulo", "articulos", "estudio", "estudios", "journal", "investigacion", "investigaciones", "cientifico", "cientificos", "paper", "lectura", "blog", "microbioma", "nutricion", "longevidad", "pienso", "barf", "flora intestinal", "comida"]
    },
    {
        url: "geo-telemetria-prevencion-perdida.html",
        title: "Geo-Telemetría GNSS contra el Extravío",
        category: "CUDI Journal / Artículo",
        badgeClass: "badge-clinical",
        icon: "fa-tower-broadcast",
        price: "5 min lectura",
        desc: "Arquitectura híbrida LTE-M + GPS multibanda que previene el 99.4% de pérdidas con rescate medio en menos de 4 minutos.",
        tags: ["articulo", "articulos", "estudio", "estudios", "journal", "investigacion", "investigaciones", "cientifico", "cientificos", "paper", "lectura", "blog", "perdida", "extravio", "gps", "geolocalizacion", "telemetria", "seguridad", "recuperacion"]
    },
    {
        url: "ansiedad-separacion-cortisol-mascotas.html",
        title: "Reducción de Cortisol en Ansiedad por Separación",
        category: "CUDI Journal / Artículo",
        badgeClass: "badge-clinical",
        icon: "fa-brain",
        price: "5 min lectura",
        desc: "Biomarcadores VFC de variabilidad cardíaca, paseos activos y feromonas reducen un 47% el cortisol plasmático en 21 días.",
        tags: ["articulo", "articulos", "estudio", "estudios", "journal", "investigacion", "investigaciones", "cientifico", "cientificos", "paper", "lectura", "blog", "ansiedad", "estres", "cortisol", "separacion", "comportamiento", "etologia", "salud mental"]
    },
    {
        url: "seguros-veterinarios-mortalidad.html",
        title: "Seguros Preventivos vs. Eutanasia Económica",
        category: "CUDI Journal / Artículo",
        badgeClass: "badge-clinical",
        icon: "fa-heart-crack",
        price: "5 min lectura",
        desc: "Cómo la cobertura preventiva elimina la barrera financiera ante cirugías de +2.000 € reduciendo un 88% la mortalidad económica.",
        tags: ["articulo", "articulos", "estudio", "estudios", "journal", "investigacion", "investigaciones", "cientifico", "cientificos", "paper", "lectura", "blog", "seguros", "eutanasia economica", "costes veterinarios", "cobertura", "mortalidad"]
    },

    // --- DEMO INTERACTIVA Y SUS 6 PESTAÑAS + MI MASCOTA ---
    {
        url: "simulador-gemelo-digital-telemetria.html",
        title: "Demo App CUDI: Gemelo Digital y Telemetría (6 Pestañas)",
        category: "Demo App",
        badgeClass: "badge-demo",
        icon: "fa-mobile-screen",
        price: "Interactiva",
        desc: "Simulador interactivo completo de la App CUDI con signos vitales en vivo, Triaje IA Holter, GPS, Vacunas, Comunidad y Tienda.",
        tags: ["demo", "app", "simulador", "aplicacion", "gemelo digital", "telemetria", "movil", "celular", "interfaz", "probar", "pestanas"]
    },
    {
        url: "mi-mascota.html#web-sec-metricas",
        title: "Panel de Métricas y Signos Vitales en Vivo",
        category: "Telemetría en Vivo",
        badgeClass: "badge-demo",
        icon: "fa-heart-pulse",
        price: "98/100 Salud",
        desc: "Frecuencia cardíaca ECG (bpm), temperatura dérmica (38.4°C), respiración, estrés VFC, calidad de sueño y calorías quemadas.",
        tags: ["metrica", "metricas", "signos vitales", "vitales", "constantes", "bpm", "corazon", "latidos", "pulso", "temperatura", "respiracion", "rpm", "sueno", "descanso", "calorias", "pasos", "vfc", "estres", "como esta", "estado de salud"]
    },
    {
        url: "mi-mascota.html#web-sec-ubicacion",
        title: "Mapa GPS Satelital y Geocerca en Tiempo Real",
        category: "Rastreo GPS",
        badgeClass: "badge-demo",
        icon: "fa-location-crosshairs",
        price: "En Zona Segura",
        desc: "Coordenadas exactas GNSS L1+L5, perímetro seguro de geocerca (150m), distancia a casa y zumbador acústico de 85 dB.",
        tags: ["ubicacion", "localizacion", "donde esta", "gps", "mapa", "coordenadas", "geocerca", "geovalla", "radar", "perdido", "perdida", "distancia", "sonar"]
    },
    {
        url: "mi-mascota.html#web-sec-vacunas",
        title: "Calendario de Vacunas, Desparasitación y Citas Médicas",
        category: "Salud Preventiva",
        badgeClass: "badge-health",
        icon: "fa-syringe",
        price: "Expediente Activo",
        desc: "Estado de Polivalente/Trivalente, Rabia, Leucemia/Bordetella, pipeta mensual, comprimido trimestral y próxima cita en clínica.",
        tags: ["vacuna", "vacunas", "vacunar", "vacunarlo", "vacunacion", "cuando vacunar", "cuando le toca", "calendario", "rabia", "polivalente", "trivalente", "leucemia", "bordetella", "desparasitar", "desparasitacion", "pipeta", "pastilla", "cita", "citas", "cartilla"]
    },
    {
        url: "simulador-gemelo-digital-telemetria.html?tab=triage",
        title: "Simulador de Triaje IA Bio-Neural (Escáner Holter)",
        category: "Demo App",
        badgeClass: "badge-demo",
        icon: "fa-bolt",
        price: "Triaje 24/7",
        desc: "Ejecuta una simulación de análisis Holter con IA para detectar arritmias, fiebre, golpe de calor o intoxicaciones al instante.",
        tags: ["triaje", "holter", "escaner", "simular triaje", "emergencia", "urgencia", "sintomas", "vomito", "diarrea", "chocolate", "toxico", "fiebre", "sangre", "cojea", "tos"]
    },
    {
        url: "mi-mascota.html",
        title: "Mi Mascota - Ficha Biométrica y Dashboard Web",
        category: "Perfil Mascota",
        badgeClass: "badge-demo",
        icon: "fa-paw",
        price: "Sincronizado",
        desc: "Ficha digital sincronizada de tu mascota (raza, edad, peso, dieta, constantes vitales, mapa GPS y cartilla de vacunación).",
        tags: ["perfil", "mi mascota", "ficha", "peso", "raza", "edad", "panel mascota", "dashboard"]
    },
    {
        url: "simulador-solo-app.html",
        title: "App CUDI - Vista Exclusiva Móvil Fullscreen",
        category: "Demo App",
        badgeClass: "badge-demo",
        icon: "fa-mobile",
        price: "Interactiva",
        desc: "Vista dedicada del dispositivo móvil con las 6 pestañas interactivas del Gemelo Digital CUDI.",
        tags: ["solo app", "vista movil", "pantalla movil", "celular"]
    },

    // --- PÁGINAS HUB, COMUNIDAD, CAMPAÑAS, FINANZAS Y B2B ---
    {
        url: "planes-suscripcion-bienestar-animal.html",
        title: "Suscripciones y Planes de Cuidado CUDI (Básico, Care+, Prime)",
        category: "Suscripciones",
        badgeClass: "badge-subscription",
        icon: "fa-crown",
        price: "Desde 0 € / 30 €",
        desc: "Compara los planes de suscripción CUDI: Plan Prime Total (30€/mes con Smart Collar incluido), Care+ y coberturas preventivas.",
        tags: ["plan", "planes", "suscripcion", "suscripciones", "precios", "precio", "cuanto cuesta", "tarifa", "tarifas", "prime", "premium", "cuotas", "membresia"]
    },
    {
        url: "contratar-plan-premium-cudi.html",
        title: "Pasarela de Pago Seguro CUDI Pay y Envíos 24-48h",
        category: "Checkout & Envío",
        badgeClass: "badge-subscription",
        icon: "fa-credit-card",
        price: "SSL 256-bit",
        desc: "Contratación segura con tarjeta, Apple Pay, Google Pay o SEPA. Envío express 24-48h del Smart Collar y activación instantánea.",
        tags: ["contratar", "pago", "pagar", "metodo de pago", "metodos de pago", "formas de pago", "envio", "envios", "entrega", "logistica", "checkout", "tarjeta", "factura"]
    },
    {
        url: "nutricion-personalizada-perros-gatos.html",
        title: "Hub de Nutrición Animal Premium y Dietas Clínicas",
        category: "Categoría Tienda",
        badgeClass: "badge-nutrition",
        icon: "fa-seedling",
        desc: "Comparativa de planes nutricionales formulados por IA: EcoPet Organic (45€), Vitality Mix (32.50€) y PureBites Clinic (58€).",
        tags: ["nutricion", "comida", "planes comida", "alimentacion", "dieta personalizada", "alimento perros", "alimento gatos", "catalogo nutricion"]
    },
    {
        url: "seguros-salud-mascotas-barcelona.html",
        title: "Hub de Seguros para Mascotas y Protección Legal",
        category: "Categoría Tienda",
        badgeClass: "badge-insurance",
        icon: "fa-file-contract",
        desc: "Comparativa de pólizas veterinarias: CUDI Shield Basic (18€), SafeHome MultiPet (28€) y Global Pet Protect (35€).",
        tags: ["seguro", "seguros", "seguros mascotas", "poliza", "polizas", "coberturas", "proteccion legal", "responsabilidad civil"]
    },
    {
        url: "telemedicina-veterinaria-24-7.html",
        title: "Hub de Clínicas Veterinarias, Telemedicina y Hospitales 24h",
        category: "Categoría Salud",
        badgeClass: "badge-health",
        icon: "fa-laptop-medical",
        desc: "Red clínica certificada 24/7: MediPet Express (35€), Hospital Clínico Dual (60€) y VetHome a Domicilio (75€).",
        tags: ["telemedicina", "veterinario online", "videoconsulta", "24/7", "clinicas", "hospitales", "urgencia veterinaria", "red veterinaria"]
    },
    {
        url: "paseadores-perros-certificados-barcelona.html",
        title: "Hub de Paseadores Certificados y Cuidadores 24/7",
        category: "Categoría Paseos",
        badgeClass: "badge-walks",
        icon: "fa-person-walking",
        desc: "Paseadores y cuidadores con seguimiento GPS: Urban Pet Walkers (15€), ActivePaws (19.99€) y NannyPets 24/7 (25€).",
        tags: ["paseadores", "cuidadores", "paseador perros", "guarderia", "confianza", "paseos"]
    },
    {
        url: "bienestar-integral-multiespecie.html",
        title: "Hub de Peluquería, Ozonoterapia y Spa Animal",
        category: "Categoría Spa",
        badgeClass: "badge-spa",
        icon: "fa-spa",
        desc: "Bienestar dermatológico y relajación: Bubbles & Paws (22€), Grooming Master (30€) y ZenPet Spa con feromonas (50€).",
        tags: ["bienestar", "holistica", "peluqueria", "spa", "estetica", "bano", "ozonoterapia", "hidroterapia", "multiespecie"]
    },
    {
        url: "smart-collar-aventuras-sin-sustos.html",
        title: "Campaña La Gran Ruta CUDI: Aventuras sin Sustos",
        category: "Campaña",
        badgeClass: "badge-hardware",
        icon: "fa-map-location-dot",
        desc: "Gran Mapa Colaborativo de rutas seguras pet-friendly, cálculo de gasto calórico y recompensas en redes sociales.",
        tags: ["aventuras sin sustos", "gran ruta", "rutas", "campana", "lanzamiento", "mapa colaborativo", "excursion"]
    },
    {
        url: "comunidad-cudi.html",
        title: "Comunidad CUDI - Red Social de Tutores y Quedadas",
        category: "Comunidad",
        badgeClass: "badge-community",
        icon: "fa-people-group",
        desc: "Punto de encuentro para tutores responsables: muro interactivo, quedadas en parques de Barcelona y consejos verificados.",
        tags: ["comunidad", "red social", "foro", "amigos", "consejos", "tutores", "social", "eventos", "quedadas"]
    },
    {
        url: "cudi-redes-sociales-bot.html",
        title: "CUDI Social Bot - Conexión con Instagram y TikTok",
        category: "Comunidad",
        badgeClass: "badge-community",
        icon: "fa-hashtag",
        desc: "Valida tus publicaciones en redes sociales con el hashtag oficial de CUDI y desbloquea meses de suscripción Prime.",
        tags: ["redes sociales", "bot", "instagram", "tiktok", "hashtag", "embajador", "recompensas", "descuento"]
    },
    {
        url: "red-socios-clinicas-veterinarias.html",
        title: "CUDI Partners B2B - Red de Profesionales y Clínicas Socias",
        category: "Partners B2B",
        badgeClass: "badge-health",
        icon: "fa-handshake",
        desc: "Portal B2B para clínicas veterinarias, paseadores y spas: derivación inteligente con Holter pre-triado y cobro garantizado CUDI Pay.",
        tags: ["partner", "partners", "socio", "socios", "b2b", "veterinarios", "clinicas socias", "profesionales", "afiliados", "convenios", "asociarme", "trabajar"]
    },
    {
        url: "simulador-financiero.html",
        title: "Simulador Financiero Multiescenario CUDI (TFM)",
        category: "Finanzas TFM",
        badgeClass: "badge-finance",
        icon: "fa-chart-line",
        price: "LTV/CAC 11.6x",
        desc: "Simulador interactivo con 3 escenarios (Negativo 1.25M€, Base 2.82M€ EBITDA 24%, Positivo 4.48M€), Break-Even Mes 14 y Unit Economics.",
        tags: ["finanzas", "financiero", "simulador financiero", "modelo financiero", "inversion", "escenarios", "ebitda", "tir", "van", "modelo", "tfm", "calculadora", "ltv", "cac", "break even", "rentabilidad", "negocio"]
    },
    {
        url: "modelo_financiero.html",
        title: "Cuadro de Mando Completo del Modelo Financiero TFM",
        category: "Finanzas TFM",
        badgeClass: "badge-finance",
        icon: "fa-file-invoice-dollar",
        desc: "Vista analítica extendida de proyecciones financieras, flujos de caja, CAPEX, OPEX y márgenes por línea de negocio.",
        tags: ["modelo financiero", "cuadro de mando", "capex", "opex", "flujo de caja", "estados financieros"]
    },
    {
        url: "estrategia-seo.html",
        title: "Estrategia SEO, Posicionamiento y Analítica GA4 + Clarity",
        category: "SEO & Analítica",
        badgeClass: "badge-finance",
        icon: "fa-magnifying-glass-chart",
        desc: "Arquitectura SEO local B2B/B2C, larga cola científica Schema.org y medición en tiempo real con Google Analytics 4 y Microsoft Clarity.",
        tags: ["seo", "estrategia seo", "posicionamiento", "keywords", "palabras clave", "google analytics", "ga4", "clarity", "microsoft clarity", "marketing", "embudo", "funnel", "analitica"]
    },

    // --- LEGAL, POLÍTICAS, DEVOLUCIONES Y CUMPLIMIENTO (5 PÁGINAS) ---
    {
        url: "politica-devoluciones-smart-collar.html",
        title: "Política de Devoluciones, Cambios, Reembolsos y Cancelaciones",
        category: "Legal & Garantía",
        badgeClass: "badge-legal",
        icon: "fa-rotate-left",
        price: "30 Días Garantía",
        desc: "30 días de prueba con reembolso del 100% en Smart Collar, baja sin permanencia en suscripciones y reembolsos del 100% (>72h) en servicios.",
        tags: ["politica", "politicas", "devolucion", "devoluciones", "devolver", "reembolso", "reembolsos", "cancelacion", "cancelaciones", "cancelar", "cambio", "cambios", "garantia", "desistimiento", "baja", "dar de baja", "politica de devolucion", "politicas de devolucion"]
    },
    {
        url: "politica-privacidad-datos-mascotas.html",
        title: "Política de Privacidad y Protección de Datos (RGPD)",
        category: "Legal & RGPD",
        badgeClass: "badge-legal",
        icon: "fa-user-shield",
        desc: "Tratamiento encriptado de datos biométricos y GPS de tu mascota, finalidad preventiva con IA y ejercicio de derechos ARCO en privacidad@cudi.ai.",
        tags: ["politica", "politicas", "privacidad", "politica de privacidad", "proteccion de datos", "rgpd", "gdpr", "datos", "datos personales", "derechos arco", "confidencialidad"]
    },
    {
        url: "politica-cookies-plataforma.html",
        title: "Política de Cookies de la Plataforma CUDI",
        category: "Legal & Cookies",
        badgeClass: "badge-legal",
        icon: "fa-cookie-bite",
        desc: "Detalle de cookies técnicas esenciales (sesión, Gemelo Digital y Cesta CUDI) y analíticas agregadas (Google Analytics 4 y Microsoft Clarity).",
        tags: ["politica", "politicas", "cookie", "cookies", "politica de cookies", "rastreo", "consentimiento"]
    },
    {
        url: "terminos-condiciones-app.html",
        title: "Términos y Condiciones de Uso de la Plataforma y App",
        category: "Legal",
        badgeClass: "badge-legal",
        icon: "fa-book-bookmark",
        desc: "Normativa de uso del ecosistema CUDI, alcance preventivo del triaje por IA, responsabilidades del tutor y propiedad intelectual.",
        tags: ["termino", "terminos", "condiciones", "terminos y condiciones", "normas", "uso", "contrato", "propiedad intelectual"]
    },
    {
        url: "legal.html",
        title: "Aviso Legal e Información Societaria (CUDI AI Ecosystem S.L.)",
        category: "Legal",
        badgeClass: "badge-legal",
        icon: "fa-scale-balanced",
        desc: "Datos registrales de CUDI AI Ecosystem S.L. (NIF B-12345678, Paseo de la Castellana 200 Madrid / Sede Barcelona, Registro Mercantil, legal@cudi.ai).",
        tags: ["legal", "aviso legal", "informacion legal", "titularidad", "nif", "cif", "razon social", "registro mercantil", "empresa", "castellana"]
    },
    {
        url: "index.html",
        title: "Inicio - Ecosistema Integral CUDI de Bienestar Animal",
        category: "Portada Principal",
        badgeClass: "badge-demo",
        icon: "fa-house",
        desc: "Página principal de CUDI con acceso a la tienda completa (15 productos), 6 estudios científicos, planes de suscripción y Demo del Gemelo Digital.",
        tags: ["inicio", "home", "portada", "principal", "cudi", "ecosistema", "tienda", "productos"]
    }
];

// DICCIONARIO DE CORRECCIÓN ORTOGRÁFICA / TYPOS REALES
var CUDI_SPELL_CORRECTIONS = {
    "comda": "comida", "comidaa": "comida", "cmida": "comida", "comi": "comida",
    "alimnto": "alimento", "penso": "pienso", "croketas": "croquetas",
    "nutricon": "nutricion", "nutrison": "nutricion", "suplemnto": "suplemento",
    "colar": "collar", "cllar": "collar", "colllar": "collar",
    "gpss": "gps", "gsp": "gps", "rastre": "rastreo",
    "localisador": "localizador", "geolocalisacion": "geolocalizacion",
    "vterinario": "veterinario", "veterinrio": "veterinario", "vetrinario": "veterinario",
    "clinca": "clinica", "urgensias": "urgencias",
    "ospita": "hospital", "triag": "triaje",
    "segro": "seguro", "segroos": "seguro", "segur": "seguro",
    "polisa": "poliza", "cobertra": "cobertura",
    "pasador": "paseador", "pasedor": "paseador",
    "pelukeria": "peluqueria", "pelukera": "peluqueria", "shampoo": "champu",
    "dmo": "demo", "demmo": "demo", "apliacion": "aplicacion",
    "simlador": "simulador", "sumulador": "simulador", "gemlo": "gemelo",
    "finazas": "finanzas", "fianzas": "finanzas",
    "artikulos": "articulos", "artculo": "articulo",
    "polticas": "politicas", "debolucion": "devolucion", "devolusion": "devolucion"
};

// VOCABULARIO RAÍZ PARA DISTANCIA LEVENSHTEIN
var CUDI_ROOT_VOCABULARY = [
    "comida", "alimento", "pienso", "croquetas", "dieta", "nutricion", "suplemento", "organico", "barf",
    "collar", "gps", "rastreo", "localizador", "geolocalizacion", "mapa", "hardware", "aventuras",
    "veterinario", "clinica", "hospital", "urgencias", "triaje", "telemedicina", "medico", "salud",
    "seguro", "poliza", "cobertura", "responsabilidad", "shield",
    "paseo", "paseador", "caminar", "ejercicio", "cuidador", "guarderia",
    "bano", "peluqueria", "grooming", "spa", "higiene",
    "demo", "app", "simulador", "gemelo", "telemetria", "movil", "perfil", "metrica", "vitales",
    "finanzas", "inversion", "escenarios", "ebitda", "tir", "van", "modelo", "tfm",
    "comunidad", "amigos", "redes", "foro",
    "ia", "inteligencia", "asistente", "algoritmo", "predictivo",
    "planes", "suscripciones", "premium", "legal", "privacidad", "cookies", "politica", "devolucion", "reembolso", "garantia", "terminos",
    "articulo", "estudio", "journal", "investigacion", "cientifico", "microbioma", "cortisol", "longevidad",
    "vacuna", "calendario", "rabia", "desparasitar", "pipeta", "producto", "tienda", "catalogo", "partners", "seo", "envio", "pago"
];

// CLUSTERS SEMÁNTICOS CON RECOMENDACIONES DE IA
var CUDI_SEMANTIC_CLUSTERS = [
    {
        id: "articulos_clinicos",
        keywords: ["articulo", "articulos", "estudio", "estudios", "journal", "investigacion", "investigaciones", "cientifico", "cientificos", "paper", "papers", "lectura", "lecturas", "blog", "publicaciones", "microbioma", "longevidad", "cortisol", "eutanasia"],
        aiSummary: "CUDI Journal (6 Estudios Clínicos Oficiales): investigaciones sobre Gemelos Digitales (94.8% precisión), Triaje IA (<18 min respuesta), Microbioma (+2.4 años longevidad), Geo-Telemetría GPS (99.4% rescate), Cortisol (-47% estrés) y Seguros vs. Eutanasia Económica.",
        priorityUrls: [
            "gemelos-digitales-salud-predictiva.html",
            "triaje-ia-esperanza-vida-veterinaria.html",
            "microbioma-nutricion-longevidad-canina.html",
            "geo-telemetria-prevencion-perdida.html",
            "ansiedad-separacion-cortisol-mascotas.html",
            "seguros-veterinarios-mortalidad.html"
        ]
    },
    {
        id: "legal_politicas",
        keywords: ["politica", "politicas", "devolucion", "devoluciones", "devolver", "reembolso", "reembolsos", "cancelacion", "cancelar", "garantia", "desistimiento", "baja", "privacidad", "rgpd", "gdpr", "datos", "cookies", "cookie", "terminos", "condiciones", "legal", "nif", "cif"],
        aiSummary: "Marco Legal y Garantías CUDI: 30 días de devolución 100% en Smart Collar, suscripciones sin permanencia, reembolsos del 100% (>72h) en servicios, protección RGPD (privacidad@cudi.ai), política de cookies y datos societarios de CUDI AI Ecosystem S.L.",
        priorityUrls: [
            "politica-devoluciones-smart-collar.html",
            "politica-privacidad-datos-mascotas.html",
            "politica-cookies-plataforma.html",
            "terminos-condiciones-app.html",
            "legal.html"
        ]
    },
    {
        id: "metricas_vitales",
        keywords: ["metrica", "metricas", "signos", "vitales", "constantes", "bpm", "corazon", "latidos", "pulso", "temperatura", "respiracion", "rpm", "sueno", "descanso", "calorias", "pasos", "vfc", "estres"],
        aiSummary: "Telemetría Bio-Neural en Vivo: monitorización continua de frecuencia cardíaca ECG, temperatura dérmica basal (38.4°C), variabilidad VFC antiestrés, calidad de sueño (94/100) y actividad calórica sincronizada con el Gemelo Digital.",
        priorityUrls: [
            "mi-mascota.html#web-sec-metricas",
            "simulador-gemelo-digital-telemetria.html",
            "gemelos-digitales-salud-predictiva.html",
            "smart-collar-cudi-gps.html"
        ]
    },
    {
        id: "vacunas_calendario",
        keywords: ["vacuna", "vacunas", "vacunar", "vacunarlo", "vacunacion", "calendario", "rabia", "polivalente", "trivalente", "leucemia", "bordetella", "desparasitar", "desparasitacion", "pipeta", "cartilla", "cita", "citas"],
        aiSummary: "Expediente de Inmunización y Salud Preventiva: control de vacuna Polivalente/Trivalente (renovación pendiente 35€), Antirrábica, desparasitación interna trimestral, pipeta externa mensual y reserva directa con VetHome.",
        priorityUrls: [
            "mi-mascota.html#web-sec-vacunas",
            "producto-vethome-cudi.html",
            "simulador-gemelo-digital-telemetria.html",
            "telemedicina-veterinaria-24-7.html"
        ]
    },
    {
        id: "nutricion",
        keywords: ["comida", "alimento", "pienso", "croquetas", "dieta", "barf", "nutricion", "suplemento", "vitaminas", "hambre", "comer", "organico", "ecopet", "purebites", "vitality"],
        aiSummary: "Nutrición biológica y clínica CUDI: dietas BARF orgánicas (EcoPet Organic 45€), piensos clínicos hipoalergénicos prescritos por IA (PureBites Clinic 58€) y suplementos inmunes (Vitality Mix 32.50€).",
        priorityUrls: ["producto-ecopet-organic.html", "producto-purebites-clinic.html", "producto-vitality-mix.html", "nutricion-personalizada-perros-gatos.html", "microbioma-nutricion-longevidad-canina.html"]
    },
    {
        id: "gps_collar",
        keywords: ["collar", "gps", "rastreo", "localizador", "geolocalizacion", "ubicar", "ubicacion", "donde", "mapa", "perdida", "perdido", "extravio", "geocerca", "bateria", "smart", "aventuras", "distancia", "coordenadas", "radar"],
        aiSummary: "Smart Collar CUDI GPS (89.50€): monitorización biomédica continua de signos vitales, geolocalización satelital GNSS L1+L5 + eSIM 4G autónoma, geocercas seguras en tiempo real y zumbador acústico de 85 dB.",
        priorityUrls: ["smart-collar-cudi-gps.html", "mi-mascota.html#web-sec-ubicacion", "simulador-gemelo-digital-telemetria.html", "smart-collar-aventuras-sin-sustos.html", "geo-telemetria-prevencion-perdida.html"]
    },
    {
        id: "salud_veterinaria",
        keywords: ["veterinario", "clinica", "hospital", "urgencia", "urgencias", "medico", "doctor", "enfermo", "dolor", "triaje", "telemedicina", "salud", "cirugia", "vethome", "medipet", "emergencia", "vomito", "diarrea", "tos", "cojea", "chocolate", "toxico", "fiebre", "sangre"],
        aiSummary: "Red médica CUDI 24/7: triaje predictivo con IA, veterinario colegiado a domicilio en <45 min (VetHome 75€), videoconsulta inmediata (MediPet Express 35€) y hospital quirúrgico UCI 24h (Hospital Clínico Dual 60€).",
        priorityUrls: ["producto-vethome-cudi.html", "producto-medipet-express.html", "producto-hospital-clinico-dual.html", "telemedicina-veterinaria-24-7.html", "triaje-ia-esperanza-vida-veterinaria.html"]
    },
    {
        id: "seguros",
        keywords: ["seguro", "seguros", "poliza", "cobertura", "responsabilidad", "civil", "rc", "proteger", "proteccion", "indemnizacion", "blindaje", "accidente", "shield", "global", "safehome", "multipet"],
        aiSummary: "Seguros Veterinarios CUDI: CUDI Shield Basic (18€/mes, 80% urgencias + RC), SafeHome MultiPet (28€/mes para hogares con perros y gatos) y Global Pet Protect (35€/mes, 100% cirugías y hospitalización).",
        priorityUrls: ["producto-cudi-shield-basic.html", "producto-global-pet-protect.html", "producto-safehome-multipet.html", "seguros-salud-mascotas-barcelona.html", "seguros-veterinarios-mortalidad.html"]
    },
    {
        id: "paseos",
        keywords: ["paseo", "paseos", "paseador", "paseadores", "caminar", "ejercicio", "correr", "actividad", "nanny", "nannypets", "guarderia", "cuidar", "cuidador", "cuidadores", "walkers", "activepaws"],
        aiSummary: "Movilidad y cuidado certificado: paseos urbanos con GPS en directo (Urban Pet Walkers 15€), sesiones deportivas monitorizadas (ActivePaws 19.99€) y cuidadores verificados en tu hogar sin jaulas (NannyPets 24/7 25€).",
        priorityUrls: ["producto-urban-pet-walkers.html", "producto-activepaws.html", "producto-nannypets-247.html", "paseadores-perros-certificados-barcelona.html"]
    },
    {
        id: "higiene_spa",
        keywords: ["bano", "banar", "peluqueria", "corte", "tijera", "champu", "ozonoterapia", "spa", "relajacion", "estetica", "grooming", "unas", "limpieza", "zenpet", "bubbles", "hidroterapia"],
        aiSummary: "Higiene dermatológica y Spa sin estrés: baños ecológicos con ozonoterapia (Bubbles & Paws 22€), corte a tijera (Grooming Master 30€) e hidroterapia con feromonas reductoras de cortisol (ZenPet Spa 50€).",
        priorityUrls: ["producto-bubbles--paws.html", "producto-grooming-master.html", "producto-zenpet-spa.html", "bienestar-integral-multiespecie.html"]
    },
    {
        id: "demo_app",
        keywords: ["demo", "app", "simulador", "aplicacion", "probar", "movil", "celular", "telefono", "gemelo", "digital", "telemetria", "interfaz", "biometricos", "pestanas"],
        aiSummary: "Demo Interactiva del Gemelo Digital CUDI: explora las 6 pestañas en vivo (Dashboard de Métricas, Escáner Holter IA, Mapa GPS con Geocerca, Calendario de Vacunas, Comunidad CUDI Paws y Tienda In-App).",
        priorityUrls: ["simulador-gemelo-digital-telemetria.html", "mi-mascota.html", "simulador-solo-app.html"]
    },
    {
        id: "finanzas_tfm",
        keywords: ["finanzas", "financiero", "simulador financiero", "inversion", "ebitda", "tir", "van", "escenarios", "cac", "ltv", "modelo", "presupuesto", "rentabilidad", "negocio", "tfm", "seo", "analytics", "ga4", "clarity"],
        aiSummary: "Modelo Financiero y Estrategia TFM CUDI: 3 escenarios proyectados (Conservador 1.25M€, Base 2.82M€ con EBITDA 24% y Break-Even Mes 14, Optimista 4.48M€), Ratio LTV/CAC 11.6x y analítica GA4 + Clarity.",
        priorityUrls: ["simulador-financiero.html", "modelo_financiero.html", "estrategia-seo.html", "red-socios-clinicas-veterinarias.html"]
    },
    {
        id: "marketplace_catalogo",
        keywords: ["producto", "productos", "tienda", "catalogo", "marketplace", "servicio", "servicios", "comprar", "precios", "tarifas", "planes", "suscripcion", "suscripciones", "prime", "premium", "pago", "envio", "contratar", "partners", "socios", "b2b"],
        aiSummary: "Ecosistema Transaccional CUDI: 15 productos y servicios verificados, Plan CUDI Prime Total (30€/mes con Smart Collar gratis), pasarela encriptada CUDI Pay con envío 24-48h y portal B2B para clínicas socias.",
        priorityUrls: [
            "smart-collar-cudi-gps.html",
            "planes-suscripcion-bienestar-animal.html",
            "contratar-plan-premium-cudi.html",
            "nutricion-personalizada-perros-gatos.html",
            "seguros-salud-mascotas-barcelona.html",
            "telemedicina-veterinaria-24-7.html"
        ]
    },
    {
        id: "comunidad",
        keywords: ["comunidad", "foro", "amigos", "redes", "social", "consejos", "eventos", "rutas", "tutor", "historias", "bot", "instagram", "tiktok", "campana"],
        aiSummary: "Comunidad Multiespecie y Gran Ruta CUDI: conecta con tutores en Barcelona, descubre el Gran Mapa Colaborativo de Aventuras sin Sustos y desbloquea meses gratis con el Social Bot.",
        priorityUrls: ["comunidad-cudi.html", "smart-collar-aventuras-sin-sustos.html", "cudi-redes-sociales-bot.html"]
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

function stemSpanishToken(word) {
    if (!word || word.length <= 3) return word;
    if (word.endsWith('ciones')) return word.slice(0, -6) + 'cion';
    if (word.endsWith('siones')) return word.slice(0, -6) + 'sion';
    if (word.endsWith('es') && word.length > 5 && !['planes'].includes(word)) return word.slice(0, -2);
    if (word.endsWith('s') && word.length > 4) return word.slice(0, -1);
    return word;
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

var CUDI_SEARCH_STOPWORDS = new Set([
    "el", "la", "los", "las", "un", "una", "unos", "unas", "de", "del", "al", "en", "con", "por", "para",
    "sobre", "que", "es", "son", "como", "cual", "cuales", "quiero", "quiro", "me", "mi", "mis", "tu", "tus",
    "su", "sus", "muestres", "muestra", "mostrar", "muestrame", "ver", "dime", "explica", "explicame",
    "saber", "hay", "tiene", "tienen", "puedo", "puede", "hacer", "hago", "si", "no", "mas", "muy", "todo", "todos", "todas"
]);

function correctQueryTypo(rawQuery) {
    const rawTokens = normalizeSearchText(rawQuery).split(' ').filter(Boolean);
    const filtered = rawTokens.filter(t => !CUDI_SEARCH_STOPWORDS.has(t));
    const tokens = filtered.length > 0 ? filtered : rawTokens;
    let wasCorrected = false;
    const correctedTokens = tokens.map(token => {
        if (CUDI_SPELL_CORRECTIONS[token]) {
            if (CUDI_SPELL_CORRECTIONS[token] !== token) wasCorrected = true;
            return CUDI_SPELL_CORRECTIONS[token];
        }
        const stemmed = stemSpanishToken(token);
        if (CUDI_ROOT_VOCABULARY.includes(token) || CUDI_ROOT_VOCABULARY.includes(stemmed)) {
            return token;
        }
        if (token.length >= 3) {
            let bestWord = token;
            let minDistance = 999;
            for (const root of CUDI_ROOT_VOCABULARY) {
                const dist = levenshteinDistance(token, root);
                const maxAllowed = root.length <= 4 ? 1 : (root.length <= 7 ? 2 : 2);
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
    const baseTokens = Array.from(new Set([
        ...queryInfo.normalized.split(' '),
        ...queryInfo.corrected.split(' ')
    ])).filter(Boolean);
    const searchTokens = Array.from(new Set([
        ...baseTokens,
        ...baseTokens.map(stemSpanishToken)
    ])).filter(t => t.length >= 2);

    const fullNormalized = queryInfo.normalized;
    const fullCorrected = queryInfo.corrected;

    let matchedCluster = null;
    let maxClusterScore = 0;
    for (const cluster of CUDI_SEMANTIC_CLUSTERS) {
        let clusterScore = 0;
        for (const token of searchTokens) {
            if (cluster.keywords.includes(token)) {
                clusterScore += 14;
            } else {
                for (const kw of cluster.keywords) {
                    if (kw.includes(token) || token.includes(kw)) {
                        clusterScore += 5;
                    }
                }
            }
        }
        if (clusterScore > maxClusterScore) {
            maxClusterScore = clusterScore;
            matchedCluster = cluster;
        }
    }

    const scored = CUDI_SEARCH_INDEX.map(item => {
        let score = 0;
        const normTitle = normalizeSearchText(item.title);
        const normCategory = normalizeSearchText(item.category);
        const normDesc = normalizeSearchText(item.desc);
        const normTags = (item.tags || []).map(t => normalizeSearchText(t));
        const itemUrl = item.url.toLowerCase();

        if (normTitle === fullNormalized || normTitle === fullCorrected) {
            score += 120;
        }

        if (matchedCluster && matchedCluster.priorityUrls.includes(item.url)) {
            const rankBonus = (matchedCluster.priorityUrls.length - matchedCluster.priorityUrls.indexOf(item.url)) * 8;
            score += 55 + rankBonus;
        }

        for (const token of searchTokens) {
            if (token.length < 2) continue;

            if (normTags.includes(token)) {
                score += 42;
            } else if (normTags.some(t => t.includes(token) || token.includes(t))) {
                score += 22;
            }

            if (normTitle.includes(token)) {
                score += 36;
                if (normTitle.startsWith(token)) score += 14;
            }

            if (normCategory.includes(token)) {
                score += 28;
            }

            if (normDesc.includes(token)) {
                score += 15;
            }

            if (itemUrl.includes(token)) {
                score += 12;
            }
        }

        return { ...item, score };
    }).filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    let topResults = scored.slice(0, 6);

    // Fallback inteligente desde la base de conocimiento completa de 45 páginas de CudiAI si no hubo match directo
    if (topResults.length === 0 && typeof window !== 'undefined' && window.CudiAI && typeof window.CudiAI.searchAllPagesKnowledge === 'function') {
        const kbPage = window.CudiAI.searchAllPagesKnowledge(rawQuery);
        if (kbPage) {
            topResults = [{
                url: kbPage.url,
                title: kbPage.title,
                category: "Página Verificada CUDI",
                badgeClass: "badge-clinical",
                icon: "fa-file-circle-check",
                desc: kbPage.desc || (kbPage.content ? kbPage.content.slice(0, 140) + "..." : "Recurso oficial del ecosistema CUDI.")
            }];
        }
    }

    // Si es una consulta abierta conversacional, ofrecer siempre los accesos clave del ecosistema junto con la respuesta de CUDI AI
    if (topResults.length === 0) {
        topResults = [
            CUDI_SEARCH_INDEX[0], // Smart Collar
            CUDI_SEARCH_INDEX.find(i => i.url === "simulador-gemelo-digital-telemetria.html") || CUDI_SEARCH_INDEX[1],
            CUDI_SEARCH_INDEX.find(i => i.url === "planes-suscripcion-bienestar-animal.html") || CUDI_SEARCH_INDEX[2],
            CUDI_SEARCH_INDEX.find(i => i.url === "gemelos-digitales-salud-predictiva.html") || CUDI_SEARCH_INDEX[3]
        ].filter(Boolean);
    }

    // Extraer resumen inteligente directamente del cerebro de CudiAI si está disponible
    let aiSummary = matchedCluster ? matchedCluster.aiSummary : null;
    if (typeof window !== 'undefined' && window.CudiAI && typeof window.CudiAI.generateResponseSync === 'function') {
        try {
            const rawAiHtml = window.CudiAI.generateResponseSync(rawQuery, true);
            if (rawAiHtml) {
                const tmpDiv = document.createElement('div');
                tmpDiv.innerHTML = rawAiHtml;
                tmpDiv.querySelectorAll('.ai-actions-wrap, .ai-source-badge').forEach(el => el.remove());
                const cleanText = (tmpDiv.textContent || '').replace(/\s+/g, ' ').trim();
                if (cleanText.length > 25) {
                    aiSummary = cleanText.length > 260 ? cleanText.slice(0, 257) + '...' : cleanText;
                }
            }
        } catch (e) {}
    }

    if (!aiSummary && topResults.length > 0) {
        aiSummary = `Encontramos ${topResults.length} páginas y recursos verificados en el ecosistema CUDI para "${rawQuery}". Pulsa en "Preguntar a la IA" para abrir el diagnóstico interactivo.`;
    }

    return {
        query: rawQuery,
        correction: queryInfo.wasCorrected ? queryInfo.corrected : null,
        aiSummary,
        results: topResults
    };
}


// Navbar Scroll Effect
var navbar = document.querySelector('.navbar-island');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth reveal animation for elements on scroll
var observeElements = () => {
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
var earlyAccessForm = document.getElementById('earlyAccessForm');
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
var heroVisual = document.querySelector('.hero-visual');
if(heroVisual) {
    heroVisual.style.background = 'url("bienestar-integral-perros-gatos.png") center/cover no-repeat';
    heroVisual.style.boxShadow = '0 0 20px rgba(0,0,0,0.1)';
}

// === FUNCIONALIDADES E-COMMERCE TFM ===

// Estado Global del Carrito
var globalCart = JSON.parse(localStorage.getItem('cudi_cart')) || [];

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
var CUDI_RANDOM_PETS = [
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


// --- CUDI GLOBAL SMART AI SEARCH ENGINE (APPLE LIQUID GLASS EDITION) ---
function escapeSearchHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function injectAppleGlassSearchStyles() {
    if (document.getElementById('cudi-apple-glass-search-css')) return;
    const style = document.createElement('style');
    style.id = 'cudi-apple-glass-search-css';
    style.textContent = `
        .search-results-dropdown {
            position: absolute !important;
            top: calc(100% + 12px) !important;
            left: 0 !important;
            width: 540px !important;
            max-width: 94vw !important;
            max-height: 560px !important;
            overflow-y: auto !important;
            background: rgba(255, 255, 255, 0.86) !important;
            backdrop-filter: blur(32px) saturate(200%) !important;
            -webkit-backdrop-filter: blur(32px) saturate(200%) !important;
            border: 1px solid rgba(255, 255, 255, 0.85) !important;
            box-shadow: 0 24px 60px -12px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(148, 163, 184, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.95) !important;
            border-radius: 22px !important;
            z-index: 100000 !important;
            padding: 14px !important;
            box-sizing: border-box !important;
            animation: fadeInDown 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
        }
        .search-results-dropdown::-webkit-scrollbar { width: 5px; }
        .search-results-dropdown::-webkit-scrollbar-track { background: transparent; }
        .search-results-dropdown::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, 0.35); border-radius: 10px; }

        .search-glass-section-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 2px 6px 8px;
            font-size: 0.68rem;
            font-weight: 800;
            color: #64748b;
            letter-spacing: 0.6px;
            text-transform: uppercase;
        }
        .search-glass-section-header span {
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }
        .search-glass-section-header i {
            color: #0284c7;
        }

        .search-quick-pills {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-bottom: 12px;
            padding: 0 2px;
        }
        .search-quick-pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 11px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.78);
            border: 1px solid rgba(203, 213, 225, 0.75);
            box-shadow: 0 2px 6px rgba(15, 23, 42, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.9);
            color: #1e293b;
            font-size: 0.73rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
            user-select: none;
        }
        .search-quick-pill i {
            color: #0284c7;
            font-size: 0.72rem;
        }
        .search-quick-pill:hover {
            background: #f0f9ff;
            border-color: #7dd3fc;
            color: #0369a1;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(2, 132, 199, 0.12);
        }

        /* Apple Ice-Glass AI Insight Card */
        .search-ai-card {
            background: linear-gradient(135deg, rgba(240, 249, 255, 0.92) 0%, rgba(224, 242, 254, 0.78) 100%) !important;
            border-radius: 16px !important;
            padding: 12px 14px !important;
            margin-bottom: 10px !important;
            border: 1px solid rgba(125, 211, 252, 0.65) !important;
            box-shadow: 0 6px 18px rgba(2, 132, 199, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9) !important;
            color: #0f172a !important;
        }
        .search-ai-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 6px;
            gap: 8px;
        }
        .search-ai-chip {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            background: rgba(2, 132, 199, 0.12) !important;
            color: #0369a1 !important;
            border: 1px solid rgba(2, 132, 199, 0.25) !important;
            font-size: 0.68rem !important;
            font-weight: 800 !important;
            padding: 3px 9px !important;
            border-radius: 999px !important;
            text-transform: uppercase;
            letter-spacing: 0.4px;
        }
        .search-ai-ask-btn {
            background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%) !important;
            color: #ffffff !important;
            border: none !important;
            font-size: 0.71rem !important;
            font-weight: 700 !important;
            padding: 5px 11px !important;
            border-radius: 999px !important;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            box-shadow: 0 3px 10px rgba(2, 132, 199, 0.22);
            transition: all 0.18s ease;
        }
        .search-ai-ask-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 5px 14px rgba(2, 132, 199, 0.32);
        }
        .search-ai-text {
            font-size: 0.77rem !important;
            line-height: 1.48 !important;
            color: #1e293b !important;
            margin: 0 !important;
        }

        /* Clean Apple Glass Result Cards */
        .search-result-item {
            display: block !important;
            padding: 10px 12px !important;
            text-decoration: none !important;
            border-radius: 14px !important;
            transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1) !important;
            margin-bottom: 6px !important;
            background: rgba(255, 255, 255, 0.74) !important;
            border: 1px solid rgba(226, 232, 240, 0.85) !important;
            box-shadow: 0 2px 6px rgba(15, 23, 42, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.85) !important;
        }
        .search-result-item:hover {
            background: rgba(255, 255, 255, 0.98) !important;
            border-color: rgba(125, 211, 252, 0.85) !important;
            transform: translateY(-1px) !important;
            box-shadow: 0 8px 20px -6px rgba(2, 132, 199, 0.12) !important;
        }
        .sr-icon {
            width: 28px !important;
            height: 28px !important;
            border-radius: 8px !important;
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%) !important;
            color: #0284c7 !important;
            border: 1px solid rgba(186, 230, 253, 0.7) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 0.78rem !important;
            flex-shrink: 0 !important;
        }
        .sr-title {
            font-weight: 700 !important;
            color: #0f172a !important;
            font-size: 0.84rem !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
        }
        .sr-desc {
            font-size: 0.73rem !important;
            color: #475569 !important;
            line-height: 1.38 !important;
            padding-left: 36px !important;
            margin: 0 !important;
        }
        .search-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 8px 2px !important;
            border-top: 1px solid rgba(226, 232, 240, 0.7) !important;
            margin-top: 6px !important;
            font-size: 0.69rem !important;
            color: #64748b !important;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
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
        }, 250);
    } else {
        window.location.href = `simulador-gemelo-digital-telemetria.html?ai_query=${encodeURIComponent(query)}`;
    }
};

var CUDI_FEATURED_RECOMMENDATIONS = [
    {
        url: "simulador-gemelo-digital-telemetria.html",
        title: "Demo Interactiva: Gemelo Digital y Telemetría",
        category: "Demo App",
        badgeClass: "badge-demo",
        icon: "fa-mobile-screen-button",
        price: "En Vivo",
        desc: "Explora las 6 pestañas interactivas: constantes ECG, escáner Holter IA, mapa GPS, vacunas, comunidad y tienda."
    },
    {
        url: "planes-suscripcion-bienestar-animal.html",
        title: "Planes y Suscripción CUDI Prime Total",
        category: "Suscripción",
        badgeClass: "badge-subscription",
        icon: "fa-crown",
        price: "30.00 €/mes",
        desc: "Incluye Smart Collar gratis (valorado en 89.50€), telemedicina 24/7 ilimitada, triaje IA y descuentos clínicos."
    },
    {
        url: "telemedicina-veterinaria-24-7.html",
        title: "Clínicas Veterinarias, VetHome y Telemedicina 24/7",
        category: "Veterinaria 24/7",
        badgeClass: "badge-health",
        icon: "fa-user-doctor",
        price: "Urgencias 24h",
        desc: "Veterinario colegiado a domicilio en <45 min (VetHome 75€), videoconsulta MediPet (35€) y Hospital Clínico Dual."
    },
    {
        url: "smart-collar-cudi-gps.html",
        title: "Smart Collar CUDI GPS + Bio-Sensores ECG",
        category: "Hardware IoT",
        badgeClass: "badge-hardware",
        icon: "fa-satellite-dish",
        price: "89.50 €",
        desc: "Sensor cardíaco óptico, temperatura dérmica, VFC antiestrés y GPS multibanda L1+L5 con eSIM 4G autónoma."
    },
    {
        url: "seguros-salud-mascotas-barcelona.html",
        title: "Seguros Veterinarios CUDI Shield y Global Pet",
        category: "Seguros",
        badgeClass: "badge-insurance",
        icon: "fa-shield-heart",
        price: "Desde 18 €/mes",
        desc: "Cobertura del 80% al 100% en cirugías y urgencias más Responsabilidad Civil familiar hasta 150.000 €."
    },
    {
        url: "simulador-financiero.html",
        title: "Simulador Financiero Multiescenario (TFM)",
        category: "Finanzas TFM",
        badgeClass: "badge-finance",
        icon: "fa-chart-line",
        price: "LTV/CAC 11.6x",
        desc: "Modelo interactivo a 36 meses con 3 escenarios, EBITDA 24% y punto de equilibrio en el Mes 14."
    }
];

function setupSearchInput(input) {
    if (input.dataset.searchBound) return;
    input.dataset.searchBound = "true";
    injectAppleGlassSearchStyles();

    const parent = input.parentNode;
    if (parent) parent.style.position = 'relative';

    const dropdown = document.createElement('div');
    dropdown.className = 'search-results-dropdown';
    dropdown.style.display = 'none';
    if (parent) parent.appendChild(dropdown);

    let currentResults = [];

    function renderDefaultRecommendations() {
        currentResults = CUDI_FEATURED_RECOMMENDATIONS;
        const quickPills = [
            { label: "Demo App", query: "demo", icon: "fa-mobile-screen" },
            { label: "Suscripciones", query: "planes", icon: "fa-crown" },
            { label: "Veterinaria 24/7", query: "veterinario", icon: "fa-stethoscope" },
            { label: "Smart Collar GPS", query: "collar", icon: "fa-satellite-dish" },
            { label: "Seguros", query: "seguros", icon: "fa-shield-cat" },
            { label: "Artículos Clínicos", query: "articulos", icon: "fa-book-medical" },
            { label: "Vacunas", query: "vacunas", icon: "fa-syringe" },
            { label: "Devoluciones", query: "devoluciones", icon: "fa-rotate-left" }
        ];

        let html = `
            <div class="search-glass-section-header">
                <span><i class="fa-solid fa-wand-magic-sparkles"></i> Accesos Rápidos CUDI</span>
                <button type="button" class="search-ai-ask-btn" onclick="openCudiAiWithQuery('Hola CUDI, muéstrame todo lo que puedes hacer por mi mascota')">
                    <i class="fa-solid fa-robot"></i> Abrir CUDI AI
                </button>
            </div>
            <div class="search-quick-pills">
                ${quickPills.map(p => `
                    <button type="button" class="search-quick-pill" data-quick-query="${escapeSearchHtml(p.query)}">
                        <i class="fa-solid ${p.icon}"></i> ${escapeSearchHtml(p.label)}
                    </button>
                `).join('')}
            </div>
            <div class="search-glass-section-header" style="padding-top:4px;">
                <span><i class="fa-solid fa-star"></i> Imprescindibles del Ecosistema</span>
                <span style="font-weight:600; text-transform:none; letter-spacing:0;">Selección Destacada</span>
            </div>
        `;

        html += CUDI_FEATURED_RECOMMENDATIONS.map(item => `
            <a href="${item.url}" class="search-result-item">
                <div class="sr-header-row">
                    <div class="sr-title-wrap">
                        <span class="sr-icon"><i class="fa-solid ${item.icon}"></i></span>
                        <span class="sr-title">${escapeSearchHtml(item.title)}</span>
                    </div>
                    <div class="sr-meta-wrap">
                        <span class="sr-badge ${item.badgeClass}">${escapeSearchHtml(item.category)}</span>
                        ${item.price ? `<span class="sr-price">${escapeSearchHtml(item.price)}</span>` : ''}
                    </div>
                </div>
                <p class="sr-desc">${escapeSearchHtml(item.desc)}</p>
            </a>
        `).join('');

        html += `
            <div class="search-footer">
                <span><i class="fa-solid fa-circle-nodes"></i> Ecosistema CUDI Completo (45 Páginas + Demo)</span>
                <span>Escribe cualquier duda o síntoma</span>
            </div>
        `;

        dropdown.innerHTML = html;
        dropdown.querySelectorAll('.search-quick-pill').forEach(btn => {
            btn.addEventListener('click', (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                const q = btn.getAttribute('data-quick-query') || '';
                input.value = q;
                input.focus();
                renderQueryResults(q);
            });
        });
        dropdown.style.display = 'block';
    }

    function renderQueryResults(rawQuery) {
        if (!rawQuery || rawQuery.length < 2) {
            renderDefaultRecommendations();
            return;
        }

        const data = searchCudiEcosystem(rawQuery);
        currentResults = data.results || [];

        if (currentResults.length > 0) {
            let html = '';

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

            if (data.correction) {
                html += `
                    <div class="search-correction-bar">
                        <i class="fa-solid fa-lightbulb"></i>
                        <span>Mostrando para <strong>${escapeSearchHtml(data.correction)}</strong> (corregido de <em>${escapeSearchHtml(rawQuery)}</em>)</span>
                    </div>
                `;
            }

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

            html += `
                <div class="search-footer">
                    <span><i class="fa-solid fa-circle-nodes"></i> Ecosistema CUDI Completo</span>
                    <span>${currentResults.length} coincidencias inteligentes</span>
                </div>
            `;

            dropdown.innerHTML = html;
            dropdown.style.display = 'block';
        }
    }

    input.addEventListener('input', (e) => {
        const rawQuery = e.target.value.trim();
        renderQueryResults(rawQuery);
    });

    input.addEventListener('focus', () => {
        const rawQuery = input.value.trim();
        if (rawQuery.length >= 2) {
            renderQueryResults(rawQuery);
        } else {
            renderDefaultRecommendations();
        }
    });

    input.addEventListener('click', () => {
        const rawQuery = input.value.trim();
        if (rawQuery.length >= 2) {
            renderQueryResults(rawQuery);
        } else {
            renderDefaultRecommendations();
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
        } else if (e.key === 'Escape') {
            dropdown.style.display = 'none';
        }
    });

    document.addEventListener('click', (e) => {
        if (parent && !parent.contains(e.target)) {
            dropdown.style.display = 'none';
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
