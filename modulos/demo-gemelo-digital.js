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

    perro: ['Husky Siberiano','Golden Retriever','Bulldog Francés','Beagle Tricolor','Border Collie','Pomerania Toy','Pug Carlino','Pastor Alemán','Labrador Retriever','Poodle','Chihuahua','Yorkshire Terrier','Mestizo'],

    gato:  ['Siamés Real','Europeo Atigrado','Bengalí Dorado','Maine Coon Real','Ragdoll Azul','British Shorthair','Bombay Negro','Scottish Fold','Persa Blanco','Europeo Común','Abisinio','Mestizo']

};



const ONBOARDING_PHOTOS = {

    perro: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',

    gato:  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',

    default: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=800&q=80'

};



// ---- PRODUCTOS DEMO ----

// ---- PRODUCTOS OFICIALES DE LA PLATAFORMA CUDI ----

const STORE_CATEGORIES = {
    "hardware_planes": {
        "label": "Dispositivos & Suscripción CUDI",
        "icon": "fa-shield-dog",
        "color": "#e0f2fe",
        "iconColor": "#0077b6",
        "products": [
            {
                "name": "Smart Collar CUDI GPS Ultra",
                "price": 149.0,
                "img": "cudi-collar-hardware-hero.jpg",
                "partner": "CUDI Hardware Labs",
                "desc": "Collar biométrico de titanio y polímero médico con GPS multibanda L1+L5 a 10 Hz, sensor PPG dual, electrocardiograma continuo de 1 derivación y resistencia IP68."
            },
            {
                "name": "Smart Collar CUDI Feline Nano",
                "price": 129.0,
                "img": "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=85",
                "partner": "CUDI Feline Tech",
                "desc": "El localizador y monitor de salud más ligero del mundo para gatos (22g) con cierre de liberación de seguridad antipánico y geocercas para chalets y jardines."
            },
            {
                "name": "Base de Carga Rápida & Nodo Baliza CUDI",
                "price": 39.0,
                "img": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=85",
                "partner": "CUDI Hardware Labs",
                "desc": "Estación de acoplamiento magnético con baliza BLE 5.4 integrada que establece la zona segura del hogar sin consumir batería celular del collar."
            },
            {
                "name": "Arnés Ergonómico CUDI Explorer con Integración Bio",
                "price": 64.0,
                "img": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1200&q=85",
                "partner": "Adventure Paws Lab",
                "desc": "Arnés antitirones con bolsillo blindado para módulo Smart Collar, costuras reflectantes 3M y tejido ripstop transpirable de alta tracción."
            },
            {
                "name": "Pack de Balizas Perimetrales CUDI Smart Beacons (3 uds)",
                "price": 49.0,
                "img": "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                "partner": "CUDI Hardware Labs",
                "desc": "Microbalizas adhesivas para delimitar zonas prohibidas en casa (cocina, piscina, plantas tóxicas) con alertas vibratorias amigables al collar."
            },
            {
                "name": "Sensor Pod BioTemp para Almohadillas & Piel CUDI",
                "price": 34.0,
                "img": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                "partner": "BioSense Vet Tech",
                "desc": "Dispositivo infrarrojo de contacto suave para medir la inflamación podal y temperatura articular antes y después del ejercicio intenso."
            },
            {
                "name": "Dispensador Inteligente CUDI BioFeeder con IA",
                "price": 119.0,
                "img": "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=1200&q=85",
                "partner": "SmartPet Robotics",
                "desc": "Tolva automatizada con báscula de precisión que ajusta los gramos de pienso exactos en función de los pasos y calorías quemadas por el collar."
            },
            {
                "name": "Fuente Hidratante CUDI PureWater con Sensor de Ingesta",
                "price": 59.0,
                "img": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                "partner": "AquaPet BioSystems",
                "desc": "Fuente de acero quirúrgico 304 con filtrado cuádruple UVC y conteo de mililitros bebidos registrado directamente en el gemelo digital."
            },
            {
                "name": "Correa Amortiguadora CUDI SmartLead con Medidor de Tracción",
                "price": 38.0,
                "img": "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1200&q=85",
                "partner": "Adventure Paws Lab",
                "desc": "Correa de adiestramiento no tirón con dinamómetro Bluetooth que registra los picos de reactividad y fuerza ejercida en cada paseo."
            },
            {
                "name": "Colchón Ortopédico CUDI SleepSense con Malla de Presión",
                "price": 139.0,
                "img": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                "partner": "VetRest Technologies",
                "desc": "Cama viscoelástica de grado médico con matriz de sensores piezoeléctricos para monitorizar sueño REM, dolor articular y cambios posturales."
            },
            {
                "name": "Clip LED Inteligente CUDI NightSafety RGB",
                "price": 19.5,
                "img": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                "partner": "CUDI Hardware Labs",
                "desc": "Faro de seguridad programable desde la app que se activa automáticamente al anochecer o cuando activas la búsqueda de rescate."
            },
            {
                "name": "Fijación ISOFIX con Sensor de Tensión CUDI CarSafe",
                "price": 29.9,
                "img": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                "partner": "SafeTravel Pets",
                "desc": "Conector directo al sistema ISOFIX del vehículo certificado para crash-test con sensor que avisa si el perro se desengancha."
            },
            {
                "name": "Bálsamo Regenerador & Botín Transpirable CUDI PawCare",
                "price": 24.5,
                "img": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=85",
                "partner": "BioSense Vet Tech",
                "desc": "Cera biológica reparadora de almohadillas con cera de abeja, caléndula y botines de trekking ergonómicos con suela Vibram."
            },
            {
                "name": "Chapa Digital de Identificación CUDI BioID NFC + QR",
                "price": 14.9,
                "img": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                "partner": "CUDI Security Cloud",
                "desc": "Chapa de resina epoxi indestructible con chip NFC y código QR dinámico que muestra historial médico de emergencia y contacto inmediato al acercar cualquier móvil."
            },
            {
                "name": "Repetidor Satelital CUDI WildRange para Rutas Sin Cobertura",
                "price": 89.0,
                "img": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                "partner": "Adventure Paws Lab",
                "desc": "Transmisor LoRa de bolsillo que conecta directamente tu smartphone con el collar de tu perro a hasta 15 km de distancia sin necesidad de señal 4G ni cobertura de móvil."
            }
        ]
    },
    "paseos": {
        "label": "Paseos & Cuidadores",
        "icon": "fa-person-walking-dog",
        "color": "#dbeafe",
        "iconColor": "#3b82f6",
        "products": [
            {
                "name": "ActivePaws - Paseo Guiado con Telemetría GPS en Vivo",
                "price": 14.0,
                "img": "cudi-paseos-aventura-hero.jpg",
                "partner": "Urban Pet Walkers",
                "desc": "Paseo individualizado de 60 minutos con monitorización de ruta GPS en vivo, reporte de hidratación y pulso sincronizado en la app."
            },
            {
                "name": "Urban Pet Walkers - Paseo de Estimulación Olfativa & Cognitiva",
                "price": 18.0,
                "img": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85",
                "partner": "Urban Pet Walkers",
                "desc": "Paseo diseñado por educadores enfocado en juegos de rastro, calma y discriminación de olores para reducir estrés en perros reactivos."
            },
            {
                "name": "NannyPets 24/7 - Cuidador Certificado a Domicilio (Día & Noche)",
                "price": 32.0,
                "img": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                "partner": "NannyPets Care",
                "desc": "Cuidado respetuoso en tu propia casa sin el trauma de hoteles caninos o jaulas para estancias de fin de semana o vacaciones."
            },
            {
                "name": "CampPaws - Guardería de Día en Finca Rústica Vallada con Transporte",
                "price": 28.0,
                "img": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                "partner": "Urban Pet Walkers",
                "desc": "Día completo de juegos en praderas valladas con piscina para perros, zonas de sombra y furgoneta climatizada que recoge y entrega en tu puerta."
            },
            {
                "name": "FeliCare - Cuidadora a Domicilio Exclusiva para Gatos (ISFM)",
                "price": 19.0,
                "img": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                "partner": "NannyPets Care",
                "desc": "Visitas a domicilio respetuosas con los ritmos felinos: limpieza de areneros, cambio de agua fresca, cepillado suave y juegos de caza."
            },
            {
                "name": "Paseo Matinal Express Higiénico (30 min)",
                "price": 9.5,
                "img": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                "partner": "Urban Pet Walkers",
                "desc": "Paseo funcional a primera hora de la mañana para necesidades fisiológicas y estiramiento antes de que salgas al trabajo."
            },
            {
                "name": "Sesión de Adiestramiento Canino en Positivo a Domicilio",
                "price": 45.0,
                "img": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                "partner": "Urban Pet Walkers",
                "desc": "Clase particular de 60 minutos con educador canino profesional para pasear sin tirones, llamada perfecta y autocontrol en el parque."
            },
            {
                "name": "PetTaxi CUDI - Vehículo Adaptado con Jaulas Crash-Tested",
                "price": 22.0,
                "img": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                "partner": "SafeTravel Pets",
                "desc": "Traslado puerta a puerta de animales al veterinario, peluquería o aeropuerto en furgonetas climatizadas con conductor auxiliar veterinario."
            },
            {
                "name": "Pack Senderismo Canino CUDI Trail (4 Horas en Naturaleza)",
                "price": 38.0,
                "img": "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                "partner": "Urban Pet Walkers",
                "desc": "Excursión de medio día por senderos de montaña seguros con paradas en ríos, agua fresca y monitorización del Smart Collar CUDI."
            },
            {
                "name": "HomeStay CUDI - Alojamiento en Casa de Familia Certificada (24h)",
                "price": 30.0,
                "img": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                "partner": "NannyPets Care",
                "desc": "Tu mascota duerme en el hogar cálido de una familia amante de los animales inspeccionada por CUDI con máximo un huésped a la vez."
            },
            {
                "name": "GentlePaws - Paseo Terapéutico para Perros Abuelos & Senior",
                "price": 13.0,
                "img": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                "partner": "Urban Pet Walkers",
                "desc": "Paseo a paso muy pausado sobre césped suave con arnés de asistencia trasera para perros con artrosis, ceguera o edad avanzada."
            },
            {
                "name": "PuppyWalk - Sesión Grupal de Socialización Temprana para Cachorros",
                "price": 20.0,
                "img": "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                "partner": "Urban Pet Walkers",
                "desc": "Encuentros en recinto higienizado para cachorros con pauta vacunal al día con estímulos sonoros, texturas y perros adultos equilibrados."
            },
            {
                "name": "DuoWalk - Paseo Conjunto para Familias con 2 Perros",
                "price": 21.0,
                "img": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                "partner": "Urban Pet Walkers",
                "desc": "Paseo de 60 minutos para dos perros del mismo hogar con precio especial unificado y control simultáneo con correas de seguridad."
            },
            {
                "name": "Canicross Runner - Entrenamiento Deportivo & Carrera Guiada",
                "price": 22.0,
                "img": "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=1200&q=85",
                "partner": "Urban Pet Walkers",
                "desc": "Salida de running continuo de 5 a 8 km con paseador corredor federado para perros con exceso de energía (pastores, huskies, bracos)."
            },
            {
                "name": "FlashWalk - Paseo Urgente en Menos de 45 Minutos por Imprevisto",
                "price": 19.5,
                "img": "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                "partner": "Urban Pet Walkers",
                "desc": "Te ha surgido un viaje imprevisto, una reunión que se alarga o una urgencia médica: un paseador acude a tu domicilio en menos de 45 min."
            }
        ]
    },
    "clinica": {
        "label": "Veterinaria & Salud",
        "icon": "fa-stethoscope",
        "color": "#fce7f3",
        "iconColor": "#ec4899",
        "products": [
            {
                "name": "VetHome CUDI - Urgencias Veterinarias a Domicilio 24/7",
                "price": 75.0,
                "img": "cudi-veterinaria-clinica-hero.jpg",
                "partner": "Red Clínicas Partners CUDI",
                "desc": "Unidad móvil veterinaria con ecografía portátil y analítica sanguínea instantánea enviada a tu hogar en menos de 35 minutos."
            },
            {
                "name": "MediPet Express - Teleconsulta Veterinaria Inmediata con Triaje IA",
                "price": 35.0,
                "img": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=85",
                "partner": "TeleVet Specialists",
                "desc": "Videoconsulta de alta definición con veterinario colegiado en menos de 3 minutos con receta electrónica oficial válida en farmacias."
            },
            {
                "name": "Hospital Clínico Dual - Chequeo Preventivo Integral Anual",
                "price": 60.0,
                "img": "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=1200&q=85",
                "partner": "Hospital Veterinario Central",
                "desc": "Revisión física exhaustiva que incluye analítica de sangre completa, bioquímica de 16 parámetros, ecografía abdominal básica y vacunas anuales."
            },
            {
                "name": "Pack Vacunación Oficial & Pasaporte Europeo de Mascota",
                "price": 42.0,
                "img": "https://images.unsplash.com/photo-1599443015574-be5fe8a05783?auto=format&fit=crop&w=1200&q=85",
                "partner": "Red Clínicas Partners CUDI",
                "desc": "Emisión del Pasaporte Oficial de la Unión Europea para animales de compañía con vacuna antirrábica y desparasitación equinocócica para viajar."
            },
            {
                "name": "Profilaxis Dental por Ultrasonidos & Pulido con Flúor",
                "price": 95.0,
                "img": "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=85",
                "partner": "Hospital Veterinario Central",
                "desc": "Limpieza profunda subgingival con escarificador ultrasónico y pulido de esmalte para prevenir periodontitis y pérdida prematura de piezas dentales."
            },
            {
                "name": "Esterilización / Castración por Laparoscopia Mínimamente Invasiva",
                "price": 180.0,
                "img": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85",
                "partner": "Hospital Veterinario Central",
                "desc": "Intervención quirúrgica con óptica de alta resolución a través de dos microincisiones de 5mm con recuperación en 48 horas y sin collar isabelino."
            },
            {
                "name": "Test Genético CUDI BioDNA - Salud, Razas & Longevidad",
                "price": 89.0,
                "img": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                "partner": "BioSense Vet Tech",
                "desc": "Hisopo bucal no invasivo que analiza más de 250 variantes de enfermedades hereditarias, sensibilidad a fármacos (MDR1) y porcentaje de razas."
            },
            {
                "name": "Ecografía Abdominal Completa con Especialista de Imagen",
                "price": 68.0,
                "img": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                "partner": "Hospital Veterinario Central",
                "desc": "Estudio ecográfico abdominal de 8 órganos con sondas de microconvex y lineal de alta frecuencia para diagnóstico de patologías ocultas."
            },
            {
                "name": "Sesión de Fisioterapia & Hidroterapia Subacuática Canina",
                "price": 50.0,
                "img": "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=1200&q=85",
                "partner": "Red Clínicas Partners CUDI",
                "desc": "Cinta subacuática con agua termal climatizada, láser terapéutico clase IV y magnetoterapia para recuperar movilidad tras cirugías o artrosis."
            },
            {
                "name": "Consulta Clínica de Etología & Modificación de Conducta",
                "price": 70.0,
                "img": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                "partner": "Red Clínicas Partners CUDI",
                "desc": "Evaluación por veterinario especialista en etología clínica para tratar agresividad, miedos fóbicos, ansiedad por separación o eliminación inadecuada."
            },
            {
                "name": "Perfil Bioquímico & Hematológico Integral de Laboratorio",
                "price": 48.0,
                "img": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                "partner": "Hospital Veterinario Central",
                "desc": "Analítica en laboratorio acreditado con hemograma completo de 5 poblaciones, bioquímica general de 18 parámetros y electrolitos séricos."
            },
            {
                "name": "Ecocardiograma Color & Electrocardiograma Digital",
                "price": 85.0,
                "img": "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                "partner": "Hospital Veterinario Central",
                "desc": "Estudio morfológico y hemodinámico de las cavidades cardíacas para diagnosticar soplos, valvulopatía mitral o miocardiopatía hipertrófica felina."
            },
            {
                "name": "Cribado Rápido Serológico de Leishmania, Filaria & Borrelia (4DX)",
                "price": 32.0,
                "img": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                "partner": "Red Clínicas Partners CUDI",
                "desc": "Test de sangre en 8 minutos para descartar enfermedades transmitidas por mosquitos (filaria, leishmaniosis) y garrapatas (anaplasma, lyme)."
            },
            {
                "name": "Estudio Radiográfico Digital Directo de Alta Definición (2 Proyecciones)",
                "price": 55.0,
                "img": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                "partner": "Hospital Veterinario Central",
                "desc": "Placas radiológicas digitales con revelado instantáneo para diagnóstico de fracturas, displasias, artrosis o cuerpos extraños radiopacos."
            },
            {
                "name": "Consulta Oncológica & Biopsia / Citología de Bultos con Informe",
                "price": 65.0,
                "img": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                "partner": "Hospital Veterinario Central",
                "desc": "Punción-aspiración con aguja fina (PAAF) de nódulos cutáneos y masas subcutáneas analizada por patólogo veterinario para diagnóstico precoz."
            }
        ]
    },
    "seguros": {
        "label": "Seguros & Protección",
        "icon": "fa-shield-heart",
        "color": "#fef3c7",
        "iconColor": "#d97706",
        "products": [
            {
                "name": "CUDI Shield Basic - Cobertura Esencial de Accidentes & Urgencias",
                "price": 18.0,
                "img": "cudi-seguros-salud-hero.jpg",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Cobertura veterinaria de urgencias y accidentes de hasta 1.500€/año con libre elección de clínica y reembolso en 48 horas."
            },
            {
                "name": "Global Pet Protect - Cobertura Total de Enfermedad & Cirugía",
                "price": 34.0,
                "img": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "El seguro más completo de España: hasta 3.500€/año tanto por accidentes como por enfermedades imprevistas (cáncer, diabetes, artrosis, alergias)."
            },
            {
                "name": "SafeHome MultiPet - Póliza Familiar para Hogares Multiespecie",
                "price": 28.0,
                "img": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Póliza combinada que asegura a perros y gatos del mismo hogar bajo una única cuota reducida con bolsa compartida de gastos médicos de 4.000€."
            },
            {
                "name": "CUDI LegalGuard - Seguro de Responsabilidad Civil Oficial (Ley Bienestar)",
                "price": 2.9,
                "img": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Póliza obligatoria de RC de hasta 350.000€ adaptada a la Ley de Bienestar Animal con certificado digital instantáneo descargable para presentar."
            },
            {
                "name": "CUDI TravelSafe - Seguro Médico Internacional para Viajes & Vacaciones",
                "price": 15.0,
                "img": "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Cobertura veterinaria temporal en cualquier país de la UE y Reino Unido con repatriación del animal y gastos de hotel por prolongación médica."
            },
            {
                "name": "SeniorPaws Protect - Póliza Especial para Mascotas de +9 Años",
                "price": 39.0,
                "img": "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "El único seguro que no excluye a tu mascota por edad avanzada. Cobertura de enfermedades crónicas, artrosis y medicación paliativa continua."
            },
            {
                "name": "DentalCare Plus - Cobertura Específica de Limpiezas & Cirugías Orales",
                "price": 8.5,
                "img": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Módulo complementario que cubre limpiezas dentales anuales, extracciones complejas de muelas rotas y fístulas oronasales."
            },
            {
                "name": "WildRescue - Cobertura de Búsqueda, Rescate & Recompensa por Pérdida",
                "price": 4.5,
                "img": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Cubre los costes de unidades de rescate canino, drones térmicos, publicidad y recompensa legal de hasta 800€ si tu mascota se extravía."
            },
            {
                "name": "CatShield Total - Póliza de Salud Diseñada para las Patologías del Gato",
                "price": 21.0,
                "img": "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=85",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Cubre las enfermedades típicas felinas: obstrucciones urinarias (FLUTD), fallo renal crónico, caídas desde balcones (síndrome paracaidista) y diabetes."
            },
            {
                "name": "FarewellCare - Cobertura de Eutanasia Digna, Incineración & Apoyo al Duelo",
                "price": 3.5,
                "img": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Garantiza una despedida serena en tu hogar con eutanasia compasiva sin dolor, incineración individual ecológica y devolución de cenizas en urna de madera."
            },
            {
                "name": "ProBreed Safe - Seguro Especializado para Razas de Manejo Especial",
                "price": 6.9,
                "img": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Póliza con cobertura ampliada de 500.000€ exigida para gatos catalogados de manejo especial (Rottweiler, Pitbull, Dogo, Staffordshire)."
            },
            {
                "name": "FieldGuard - Seguro para Perros de Caza, Pastoreo & Trabajo de Campo",
                "price": 16.5,
                "img": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Cobertura especializada contra ataques de jabalíes, mordeduras de víboras, espigas clavadas, cortes de zarzas y golpes de calor en jornadas rurales."
            },
            {
                "name": "PharmaPaws - Póliza de Cobertura Continua de Medicamentos Crónicos",
                "price": 12.0,
                "img": "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Reembolso del 80% en facturas de medicamentos de prescripción para tratamientos crónicos (insulina, leishmania, epilepsia, cardiopatías, tiroides)."
            },
            {
                "name": "SecondOpinion Global - Acceso a Especialistas Universitarios Internacionales",
                "price": 7.0,
                "img": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Revisión del caso médico de tu mascota por catedráticos diplomados europeos (ECVIM, ECVS, ECVN) ante diagnósticos difíciles o cirugías de alto riesgo."
            },
            {
                "name": "HolisticVet Care - Seguro de Terapias Complementarias, Fisio & Acupuntura",
                "price": 11.5,
                "img": "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Cubre sesiones de acupuntura veterinaria, quiropráctica animal, hidroterapia y rehabilitación articular prescritas por tu veterinario."
            }
        ]
    },
    "estetica": {
        "label": "Estética & Bienestar",
        "icon": "fa-scissors",
        "color": "#f0fdf4",
        "iconColor": "#16a34a",
        "products": [
            {
                "name": "Grooming Master - Baño Terapéutico con Ozonoterapia & Masaje",
                "price": 42.0,
                "img": "cudi-estetica-spa-hero.jpg",
                "partner": "Bubbles & Paws Spa",
                "desc": "Hidromasaje con microburbujas de ozono purificante que oxigena la piel, elimina olores en profundidad y calma dermatitis y alergias dérmicas."
            },
            {
                "name": "ZenPet Spa - Deslanado Técnico en Profundidad & Baño Antiprurito",
                "price": 38.0,
                "img": "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=85",
                "partner": "ZenPet Grooming",
                "desc": "Elimina hasta el 90% del pelo muerto de muda en mantos dobles (Golden, Husky, Pastor Alemán, gatos de pelo largo) sin cortar ni estropear la capa de cobertura."
            },
            {
                "name": "Bubbles & Paws - Peluquería Felina Especializada (Cero Sedación)",
                "price": 46.0,
                "img": "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                "partner": "Bubbles & Paws Spa",
                "desc": "Tratamiento de nudos, corte a tijera y baño en seco o con toallas tibias en sala libre de gatos con técnicas Low Stress certificadas."
            },
            {
                "name": "Stripping Tradicional a Mano para Perros de Pelo Duro",
                "price": 55.0,
                "img": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                "partner": "ZenPet Grooming",
                "desc": "Técnica artesanal de renovación de manto muerto a mano con dedales de goma para Teckels, Schnauzers, Fox Terriers y Westies."
            },
            {
                "name": "PawCure Spa - Limado Suave de Uñas con Torno & Masaje de Almohadillas",
                "price": 16.0,
                "img": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                "partner": "Bubbles & Paws Spa",
                "desc": "Olvídate del doloroso alicate: limado con dremel diamantado ultrasilencioso sin cortar la vena viva, recorte interdigital y cera nutritiva."
            },
            {
                "name": "Haute Coiffure - Corte Integral a Tijera Personalizado por Raza",
                "price": 50.0,
                "img": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                "partner": "ZenPet Grooming",
                "desc": "Esculpido a mano con tijeras curvas japonesas adaptado a la morfología de Caniches, Bichones Malteses, Shih Tzu y Cobradores."
            },
            {
                "name": "SilkPaws - Tratamiento de Keratina & Aceite de Argán Puro de Marruecos",
                "price": 25.0,
                "img": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                "partner": "Bubbles & Paws Spa",
                "desc": "Batería de aminoácidos y lípidos para mantos quebradizos, secos o castigados que regenera la cutícula y previene nuevos enredos durante semanas."
            },
            {
                "name": "OtiClean Spa - Higiene Auricular Profunda & Eliminación de Vello Ótico",
                "price": 14.5,
                "img": "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                "partner": "Bubbles & Paws Spa",
                "desc": "Limpieza del canal auditivo externo con limpiador enzimático vegetal y depilado suave de pelos en razas de orejas caídas propensas a infecciones."
            },
            {
                "name": "HydroZen - Baño de Hidromasaje con Sal Marina & Aromaterapia Canina",
                "price": 48.0,
                "img": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                "partner": "ZenPet Grooming",
                "desc": "Inmersión en agua templada con sales ricas en magnesio del Mar Muerto y vapores de lavanda y manzanilla para aliviar contracturas musculares."
            },
            {
                "name": "ShieldBath - Baño Antiparasitario Natural con Neem & Citronela",
                "price": 32.0,
                "img": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                "partner": "Bubbles & Paws Spa",
                "desc": "Eliminación activa de pulgas, garrapatas y ácaros con extracto de Margosa (Neem) ecológico que crea una barrera repelente sin insecticidas químicos."
            },
            {
                "name": "PawsMassage - Masaje Terapéutico Miofascial & Puntos Gatillo (45 min)",
                "price": 35.0,
                "img": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                "partner": "ZenPet Grooming",
                "desc": "Terapia manual sobre fascias y grupos musculares de cuello, escápulas y lumbares para perros con tensión postural, estrés o sobrecargas."
            },
            {
                "name": "CatClaws Care - Recorte & Limado Amable de Uñas Felinas",
                "price": 12.0,
                "img": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                "partner": "Bubbles & Paws Spa",
                "desc": "Recorte indoloro de la punta afilada transparente de las 18 uñas del gato sin tocar la matriz vascular viva y sin peleas en casa."
            },
            {
                "name": "WhiteGlow - Tratamiento Óptico Antiamarilleo para Mantos Blancos",
                "price": 36.0,
                "img": "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                "partner": "ZenPet Grooming",
                "desc": "Champú azul óptico con pigmentos violetas botánicos que neutralizan el tono óxido y amarillo de patas, babas y lagrimales en Bichones, Caniches y Westies."
            },
            {
                "name": "LuxeComb - Sesión de Cepillado Profundo & Apertura de Nudos sin Cortar",
                "price": 29.0,
                "img": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                "partner": "Bubbles & Paws Spa",
                "desc": "Desenredado paciente mechón a mechón con spray bifásico de siliconas vegetales solubles para no tener que rapar al animal cuando tiene nudos."
            },
            {
                "name": "PuppySpa - Bautismo de Agua & Primera Experiencia Positiva de Baño",
                "price": 24.0,
                "img": "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                "partner": "ZenPet Grooming",
                "desc": "Sesión lúdica para cachorros (3 a 7 meses) donde conocen el agua tibia, el ruido del secador y los peines con caricias y comida rica."
            }
        ]
    },
    "nutricion": {
        "label": "Nutrición & Dieta",
        "icon": "fa-bowl-food",
        "color": "#fff7ed",
        "iconColor": "#ea580c",
        "products": [
            {
                "name": "EcoPet Organic - Dieta BARF Biológica",
                "price": 45.0,
                "img": "cudi-nutricion-organica-hero.jpg",
                "partner": "EcoPet Biologics",
                "desc": "Menús crudos biológicamente apropiados formulados con carne de pasto, vísceras nobles, verdura ecológica y aceite de salmón salvaje."
            },
            {
                "name": "PureBites Clinic - Pienso Hipoalergénico Monoproteico",
                "price": 38.5,
                "img": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1200&q=85",
                "partner": "PureBites Clinical",
                "desc": "Receta clínica de caballo y boniato cocinada a baja temperatura para animales con intolerancias alimentarias y prurito atópico severo."
            },
            {
                "name": "Vitality Mix - Complejo Articular & Inmunológico Dual",
                "price": 24.99,
                "img": "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=1200&q=85",
                "partner": "BioSense Vet Tech",
                "desc": "Polvo nutracéutico con Glucosamina pura, Condroitina marina, MSM, cúrcuma biodisponible y colágeno hidrolizado de tipo II."
            },
            {
                "name": "OceanPure - Aceite de Salmón Salvaje & Krill Antártico",
                "price": 21.5,
                "img": "https://images.unsplash.com/photo-1585846416120-3a7354ed7d39?auto=format&fit=crop&w=1200&q=85",
                "partner": "EcoPet Biologics",
                "desc": "Aceite puro de prensado en frío con concentrado de fosfolípidos EPA y DHA para salud cardiovascular, cerebral y un pelaje sedoso."
            },
            {
                "name": "DigestShield - Probióticos Multicepa con Prebióticos FOS",
                "price": 26.0,
                "img": "https://images.unsplash.com/photo-1563460716037-460b3dd14ba9?auto=format&fit=crop&w=1200&q=85",
                "partner": "BioSense Vet Tech",
                "desc": "Sobres monodosis con 10.000 millones de UFC viables de Enterococcus faecium y Lactobacillus rhamnosus para frenar diarreas y estabilizar tránsito."
            },
            {
                "name": "Dentapaws Sticks - Cuidado Dental con Espirulina & Ascophyllum",
                "price": 16.5,
                "img": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=85",
                "partner": "EcoPet Biologics",
                "desc": "Snacks dentales masticables en forma de cruz que limpian mecánicamente la placa bacteriana y combaten el mal aliento desde el estómago."
            },
            {
                "name": "CalmPaws Chews - Bocaditos Antiestrés con L-Teanina & Ashwagandha",
                "price": 22.9,
                "img": "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&w=1200&q=85",
                "partner": "BioSense Vet Tech",
                "desc": "Bocaditos masticables semihúmedos diseñados para tormentas, fuegos artificiales, visitas al veterinario y ansiedad por separación sin causar sedación."
            },
            {
                "name": "BioBroth - Caldo de Huesos Orgánico de Cocción Lenta (24h)",
                "price": 14.5,
                "img": "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                "partner": "EcoPet Biologics",
                "desc": "Elixir reconstituyente hervido a fuego lento durante 24 horas repleto de colágeno nativo, glucosamina y aminoácidos para estimular el apetito e hidratar."
            },
            {
                "name": "NephroProtect - Quelante de Fósforo & Soporte Renal Avanzado",
                "price": 29.5,
                "img": "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=85",
                "partner": "PureBites Clinical",
                "desc": "Polvo insípido quelante intestinal de fósforo enriquecido con quitosano y astrágalo para ralentizar la progresión de la enfermedad renal crónica."
            },
            {
                "name": "TrainBites - Premios Liofilizados 100% Corazón de Ternera",
                "price": 12.9,
                "img": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                "partner": "EcoPet Biologics",
                "desc": "Snacks liofilizados al vacío en frío que conservan todo el aroma y sabor natural para sesiones de educación y adiestramiento de máxima exigencia."
            },
            {
                "name": "LactoCudi - Leche de Inicio con Calostro & DHA para Cachorros",
                "price": 28.0,
                "img": "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                "partner": "PureBites Clinical",
                "desc": "Sustituto lácteo en polvo homogeneizado con calostro bovino rico en inmunoglobulinas IgG y perfil de ácidos grasos idéntico a la leche materna."
            },
            {
                "name": "HepatoCare - Cardo Mariano (Silimarina 80%) & SAMe",
                "price": 31.0,
                "img": "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=1200&q=85",
                "partner": "BioSense Vet Tech",
                "desc": "Cápsulas gastroprotegidas con S-Adenosilmetionina (SAMe) y extracto fitosomal de Silimarina para recuperar transaminasas y función hepática."
            },
            {
                "name": "CocoPet - Aceite de Coco Virgen Extra Ecológico Prensado Frío",
                "price": 13.9,
                "img": "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                "partner": "EcoPet Biologics",
                "desc": "Aceite de coco 100% puro rico en ácido láurico y MCT. Puede ingerirse para soporte metabólico o aplicarse tópicamente en trufa seca y almohadillas."
            },
            {
                "name": "FiberGlow - Cáscara de Psyllium Ecológica & Prebióticos",
                "price": 15.5,
                "img": "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=1200&q=85",
                "partner": "PureBites Clinical",
                "desc": "Fibra soluble formadora de mucílago que regula tanto el estreñimiento como las heces blandas, favoreciendo el vaciado natural de sacos anales."
            },
            {
                "name": "SuperBerry Bites - Snack Antioxidante de Arándanos Rojos & Pavo",
                "price": 11.5,
                "img": "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=1200&q=85",
                "partner": "EcoPet Biologics",
                "desc": "Galletitas semihúmedas con alto contenido de proantocianidinas (PACs) de arándano rojo que evitan la adherencia de E. coli en las vías urinarias."
            }
        ]
    }
};

// ---- SIMULACIONES IA ALINEADAS CON CATÁLOGO ----

// ---- ESCENARIOS DE TRIAJE IA VETERINARIOS Y PREDICTIVOS ----

const IA_SCENARIOS = {

    calor: {

        title: 'Golpe de Calor & Taquicardia Severa',

        desc: 'El sensor térmico y acelerómetro registran temperatura dérmica de 39.9 °C y FC de 148 bpm tras actividad en horas de alta radiación.',

        severityScore: 88,

        severityLabel: '88/100 Crítico',

        severityColor: '#ef4444',

        biomarkers: [

            { name: 'Frecuencia Cardíaca', val: '148 bpm', dev: '+48% Taquicardia', color: '#ef4444' },

            { name: 'Temperatura Dérmica', val: '39.9 °C', dev: '+1.4°C Hipertermia', color: '#ef4444' },

            { name: 'VFC / Estrés (HRV)', val: '18 ms', dev: '-65% Fatiga Aguda', color: '#f59e0b' }

        ],

        diagTitle: 'Riesgo Inminente de Shock Térmico:',

        diagDesc: 'Se detecta estrés circulatorio severo y sobrecalentamiento. Requiere enfriamiento gradual y atención veterinaria inmediata (< 30 min).',

        options: [

            STORE_CATEGORIES.clinica.products[0], // VetHome CUDI (75€)

            STORE_CATEGORIES.hardware_planes.products[2], // CUDI Shield Basic (18€)

            STORE_CATEGORIES.nutricion.products[0] // Vitality Mix (32.50€)

        ]

    },

    estres: {

        title: 'Pico de Estrés Agudo & Ansiedad Ambiental',

        desc: 'El Smart Collar detecta taquicardia refleja y desorganización motriz compatible con detonaciones, ruidos o pirotecnia.',

        severityScore: 64,

        severityLabel: '64/100 Moderado',

        severityColor: '#f59e0b',

        biomarkers: [

            { name: 'Frecuencia Cardíaca', val: '122 bpm', dev: '+28% Alerta Reactiva', color: '#f59e0b' },

            { name: 'VFC / Cortisol', val: '24 ms', dev: '-45% Tensión Aguda', color: '#ef4444' },

            { name: 'Acelerometría', val: 'Temblores', dev: 'Micro-sacudidas', color: '#f59e0b' }

        ],

        diagTitle: 'Ansiedad Reactiva por Fobia Acústica:',

        diagDesc: 'Parámetros compatibles con estrés agudo fóbico. Recomendamos aislamiento en zona segura y sesión calmante o paseo terapéutico.',

        options: [

            STORE_CATEGORIES.estetica.products[2], // ZenPet Spa (50€)

            STORE_CATEGORIES.paseos.products[0], // ActivePaws (12€)

            STORE_CATEGORIES.seguros.products[0] // CUDI Shield (18€)

        ]

    },

    letargo: {

        title: 'Letargo Pronunciado & Caída de Vitalidad',

        desc: 'El gemelo digital detecta un descenso del 72% en el movimiento y pulso basal apagado durante las horas activas habituales.',

        severityScore: 78,

        severityLabel: '78/100 Severo',

        severityColor: '#ec4899',

        biomarkers: [

            { name: 'Actividad Diaria', val: '1.1 km', dev: '-72% vs Media Basal', color: '#ec4899' },

            { name: 'Temperatura Corporal', val: '37.8 °C', dev: 'Hipotermia leve', color: '#f59e0b' },

            { name: 'Frecuencia Cardíaca', val: '58 bpm', dev: 'Bradicardia en reposo', color: '#ec4899' }

        ],

        diagTitle: 'Sospecha de Cuadro Infeccioso o Dolor Oculto:',

        diagDesc: 'El cese drástico de actividad sugiere malestar físico o proceso inflamatorio interno. Se aconseja revisión clínica preventiva.',

        options: [

            STORE_CATEGORIES.clinica.products[0], // VetHome CUDI (75€)

            STORE_CATEGORIES.clinica.products[1], // MediPet Express (35€)

            STORE_CATEGORIES.seguros.products[1] // SafeHome MultiPet (28€)

        ]

    },

    sueno: {

        title: 'Sueño Fragmentado & Malestar Articular',

        desc: 'Se registran más de 14 micro-despertares nocturnos y rigidez postural al iniciar la mañana en la telemetría del collar.',

        severityScore: 52,

        severityLabel: '52/100 Preventivo',

        severityColor: '#8b5cf6',

        biomarkers: [

            { name: 'Calidad de Sueño', val: '58/100', dev: '-36% Sueño Profundo', color: '#8b5cf6' },

            { name: 'Micro-Despertares', val: '14 veces', dev: 'Alta Inquietud', color: '#8b5cf6' },

            { name: 'Temperatura Articular', val: 'Normal', dev: 'Sin inflamación externa', color: '#10b981' }

        ],

        diagTitle: 'Fase Preventiva de Soporte Osteoarticular:',

        diagDesc: 'Indicativo de dolor articular postural o incomodidad en descanso. Se sugiere suplementación condroprotectora y descanso adaptado.',

        options: [

            STORE_CATEGORIES.nutricion.products[2], // PureBites Clinic (58€)

            STORE_CATEGORIES.estetica.products[1], // Grooming / Masaje (30€)

            STORE_CATEGORIES.hardware_planes.products[1] // CUDI Premium Care (30€)

        ]

    },

    metab: {

        title: 'Desbalance Calórico & Recalibración Dietética',

        desc: 'El gasto energético superó en un 28% la ingesta nutricional estimada, con aceleración del metabolismo basal esta semana.',

        severityScore: 35,

        severityLabel: '35/100 Leve',

        severityColor: '#10b981',

        biomarkers: [

            { name: 'Gasto Calórico', val: '640 kcal/d', dev: '+28% Aumento', color: '#10b981' },

            { name: 'Masa Estimada', val: '-0.3 kg', dev: 'Tendencia a la baja', color: '#f59e0b' },

            { name: 'Hidratación Basal', val: '92%', dev: 'Óptima', color: '#10b981' }

        ],

        diagTitle: 'Ajuste Metabólico Requerido:',

        diagDesc: 'Tu compañero está rindiendo al máximo, pero requiere mayor densidad calórica y proteínas biológicas de alto valor para mantener peso.',

        options: [

            STORE_CATEGORIES.nutricion.products[0], // Vitality Mix (32.50€)

            STORE_CATEGORIES.nutricion.products[1], // EcoPet Organic (45€)

            STORE_CATEGORIES.paseos.products[1] // Urban Walkers (15€)

        ]

    }

};





// ---- NOTIFICACIONES ----

const NOTIFICATIONS_DATA = [

    { title: 'Frecuencia cardiaca optima', desc: 'Tus signos vitales son excelentes hoy.', icon: 'fa-heart-pulse', color: '#10b981', time: 'Hace 5 min', read: false },

    { title: 'Recordatorio de vacuna', desc: 'Vacuna polivalente vence en 3 dias.', icon: 'fa-syringe', color: '#f59e0b', time: 'Hace 1h', read: false },

    { title: 'Paseo programado', desc: 'Tu paseador llega en 30 minutos.', icon: 'fa-person-walking-dog', color: '#0077b6', time: 'Hace 2h', read: true }

];



// ---- SOCIAL PETS & MURO SINCRONIZADO CON CUDI COMUNIDAD ----

const DEMO_SHARED_SOCIAL_KEY = 'cudi_community_shared_state_v1';



const DEMO_DEFAULT_SHARED_POSTS = [

    {

        id: 'post_cooper_1',

        petId: 'cooper',

        author: 'Cooper',

        verified: true,

        avatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&h=300&q=80',

        timeLoc: 'Hace 2 horas • Parque del Retiro',

        text: 'Disfrutando de un paseo matutino. ¡Mis niveles de energía están por las nubes según mi CUDI Smart Collar! 🦴✨',

        image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',

        likes: 45,

        liked: true,

        commentsCount: 12

    },

    {

        id: 'post_bella_2',

        petId: 'bella',

        author: 'Bella',

        verified: true,

        avatar: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=300&h=300&q=80',

        timeLoc: 'Hace 5 horas • Barcelona',

        text: '¿Quién más está listo para el fin de semana de juegos? La IA dice que soy un 98% compatible con Labradores hoy. ¡A jugar! 🎾',

        image: '',

        likes: 32,

        liked: false,

        commentsCount: 8

    },

    {

        id: 'post_luna_3',

        petId: 'luna',

        author: 'Luna',

        verified: true,

        avatar: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=300&h=300&q=80',

        timeLoc: 'Hace 8 horas • Sierra de Guadarrama',

        text: '14 km recorridos hoy en la ruta pet-friendly con el Collar CUDI GPS. Batería al 91% y ritmo cardíaco estable en 74 bpm. ❄️🐺 ¿Quién se apunta al próximo encuentro?',

        image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',

        likes: 68,

        liked: false,

        commentsCount: 19

    }

];



function resolveDemoPetPhoto(input, petType, petName) {

    if (typeof window.cudi_resolve_pet_photo === 'function') {

        return window.cudi_resolve_pet_photo(input, petType, petName);

    }

    const rawUrl = (input && typeof input === 'object') ? (input.photo || input.avatar || input.img || '') : String(input || '');

    const clean = rawUrl.trim();

    const isCat = (petType === 'gato') || (input && input.type === 'gato');

    if (!clean || clean === 'undefined' || clean === 'null' || clean.includes('1513360309081-36f20ca480d0') || clean.includes('1524511751214-b0a50a01b1da')) {

        return isCat ? 'gato-explorando-seguro-collar-gps.png' : 'avatar-mascota-perfil-gemelo-digital.png';

    }

    return clean;

}



function getDemoSharedSocialState() {

    try {

        const raw = localStorage.getItem(DEMO_SHARED_SOCIAL_KEY);

        if (raw) {

            const parsed = JSON.parse(raw);

            if (parsed && Array.isArray(parsed.posts)) {

                parsed.posts.forEach(p => {

                    if (p) p.avatar = resolveDemoPetPhoto(p.avatar, p.type, p.author);

                });

                return {

                    posts: parsed.posts,

                    followedIds: Array.isArray(parsed.followedIds) ? parsed.followedIds : []

                };

            }

        }

    } catch (e) {}

    const initial = {

        posts: JSON.parse(JSON.stringify(DEMO_DEFAULT_SHARED_POSTS)),

        followedIds: []

    };

    try {

        localStorage.setItem(DEMO_SHARED_SOCIAL_KEY, JSON.stringify(initial));

    } catch (e) {}

    return initial;

}



function saveDemoSharedSocialState(state) {

    try {

        localStorage.setItem(DEMO_SHARED_SOCIAL_KEY, JSON.stringify(state));

        window.dispatchEvent(new CustomEvent('cudi:socialUpdated', { detail: state }));

    } catch (e) {}

}



const SOCIAL_PETS = [

    {

        id: 'max',

        name: 'Max',

        breed: 'Border Collie',

        type: 'perro',

        dist: '0.3 km',

        photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=300&h=300&q=80',

        compat: 98,

        energy: 'Extrema',

        bio: 'Competidor de Agility y fan de las caminatas con Urban Pet Walkers.',

        badges: ['Medalla Agility', 'Paseo Activo'],

        collar: 'GPS Activo &bull; 76 bpm'

    },

    {

        id: 'cooper',

        name: 'Cooper',

        breed: 'Beagle Tricolor',

        type: 'perro',

        dist: '0.35 km',

        photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&h=300&q=80',

        compat: 95,

        energy: 'Muy Alta',

        bio: 'Explorador profesional de senderos y olfateador de ardillas.',

        badges: ['Rastreador', 'Social Star'],

        collar: 'GPS Activo &bull; 84 bpm'

    },

    {

        id: 'luna',

        name: 'Luna',

        breed: 'Husky Siberiano',

        type: 'perro',

        dist: '0.5 km',

        photo: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=300&h=300&q=80',

        compat: 95,

        energy: 'Muy Alta',

        bio: 'Espíritu libre y pasión por las rutas de senderismo pet-friendly.',

        badges: ['Ruta Aventuras', 'Match IA 95%'],

        collar: 'GPS Activo &bull; 74 bpm'

    },

    {

        id: 'cleo',

        name: 'Cleo',

        breed: 'Podenco & Mestizo Ágil',

        type: 'perro',

        dist: '0.65 km',

        photo: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=300&h=300&q=80',

        compat: 89,

        energy: 'Equilibrada',

        bio: 'Adoptada y mimada al máximo. Fanática del queso suave y las carreras cortas.',

        badges: ['Rescate Amoroso', 'Compañero Fiel'],

        collar: 'GPS Activo &bull; 88 bpm'

    },

    {

        id: 'bella',

        name: 'Bella',

        breed: 'Pug Negro Elegante',

        type: 'perro',

        dist: '0.8 km',

        photo: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=300&h=300&q=80',

        compat: 86,

        energy: 'Tranquila / Zen',

        bio: 'Reina de las siestas, catadora certificada de EcoPet Organic y cliente VIP de ZenPet Spa.',

        badges: ['Cliente VIP Spa', 'Gourmet BARF'],

        collar: 'GPS Activo &bull; 90 bpm'

    },

    {

        id: 'rex',

        name: 'Rex',

        breed: 'Golden Retriever Cachorro',

        type: 'perro',

        dist: '0.95 km',

        photo: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=300&h=300&q=80',

        compat: 94,

        energy: 'Juguetón',

        bio: 'Todo el mundo es mi mejor amigo. Aprendiendo comandos positivos en el parque.',

        badges: ['Cachorro Escuela', 'Amigable 100%'],

        collar: 'GPS Activo &bull; 96 bpm'

    },

    {

        id: 'simba',

        name: 'Simba',

        breed: 'Pomerania Toy',

        type: 'perro',

        dist: '1.15 km',

        photo: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?auto=format&fit=crop&w=300&h=300&q=80',

        compat: 82,

        energy: 'Vivaz',

        bio: 'Mini melena de león y porte real. Adoro pasear por zonas pet-friendly.',

        badges: ['Mochilero Técnico', 'Top Model'],

        collar: 'GPS Activo &bull; 98 bpm'

    },

    {

        id: 'thor',

        name: 'Thor',

        breed: 'Golden Retriever',

        type: 'perro',

        dist: '1.3 km',

        photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=300&h=300&q=80',

        compat: 94,

        energy: 'Alta',

        bio: 'Extremadamente dulce y juguetón con cualquier perro o gato del parque.',

        badges: ['Amante del Agua', 'Terapia Canina'],

        collar: 'GPS Activo &bull; 72 bpm'

    }

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



function formatPetAgeStage(age) {

    if (!age && age !== 0) return 'Adulto Joven';

    const stageMap = {

        primera: 'Cachorro (< 1 año)',

        explorer: 'Adulto Joven',

        plenitud: 'Adulto',

        golden: 'Senior'

    };

    const key = String(age).toLowerCase().trim();

    if (stageMap[key]) return stageMap[key];

    const num = parseFloat(age);

    if (!isNaN(num)) {

        if (num <= 1) return `${num} año (Cachorro)`;

        if (num <= 3) return `${num} años (Adulto Joven)`;

        if (num <= 7) return `${num} años (Adulto)`;

        return `${num} años (Senior)`;

    }

    return String(age);

}



function syncSimulatorDOMWithProfile(p) {

    if (!p || !p.name) return;



    const safePhoto = resolveDemoPetPhoto(p, p.type, p.name);

    p.photo = safePhoto;

    const localFallback = p.type === 'gato' ? 'gato-explorando-seguro-collar-gps.png' : 'avatar-mascota-perfil-gemelo-digital.png';



    // 1. Poblar campos del formulario de onboarding por si el usuario desea editarlo

    const nameInput = document.getElementById('pet-name');

    if (nameInput) nameInput.value = p.name;

    const weightInput = document.getElementById('pet-weight');

    if (weightInput) weightInput.value = p.weight || '8';

    if (typeof selectPetType === 'function' && p.type) {

        selectPetType(p.type === 'gato' ? 'gato' : 'perro');

    }

    const breedSelect = document.getElementById('pet-breed');

    if (breedSelect && p.breed) {

        let found = false;

        for (let i = 0; i < breedSelect.options.length; i++) {

            if (breedSelect.options[i].value.toLowerCase() === p.breed.toLowerCase()) {

                breedSelect.selectedIndex = i;

                found = true;

                break;

            }

        }

        if (!found) {

            const opt = document.createElement('option');

            opt.value = p.breed;

            opt.textContent = p.breed;

            breedSelect.appendChild(opt);

            breedSelect.value = p.breed;

        }

    }

    const onboardingPhoto = document.getElementById('onboarding-photo');

    if (onboardingPhoto && safePhoto) {

        onboardingPhoto.style.backgroundImage = `url('${safePhoto}'), url('${localFallback}')`;

    }



    // 2. Mostrar pantalla principal y barra de estado

    const onboarding = document.getElementById('screen-onboarding');

    if (onboarding) {

        onboarding.classList.remove('active');

        onboarding.style.display = 'none';

    }

    const main = document.getElementById('screen-main');

    if (main) {

        main.classList.add('active');

        main.style.display = 'flex';

    }

    const statusBar = document.getElementById('app-status-bar');

    if (statusBar) statusBar.style.display = 'flex';



    // 3. Actualizar nombre, raza, etapa y foto en el Dashboard y Status Bar

    const statusName = document.getElementById('status-pet-name');

    if (statusName) statusName.textContent = p.name;

    const displayName = document.getElementById('display-pet-name');

    if (displayName) displayName.textContent = p.name;



    const breedTag = document.getElementById('display-pet-breed-tag');

    if (breedTag) {

        const cleanBreed = p.breed || (p.type === 'gato' ? 'Europeo Común' : 'Mestizo');

        breedTag.innerHTML = `${cleanBreed} &bull; ${formatPetAgeStage(p.age)}`;

    }



    const dashAvatar = document.getElementById('dash-avatar-img');

    if (dashAvatar) {

        dashAvatar.onerror = function() { this.onerror = null; this.src = localFallback; };

        dashAvatar.src = safePhoto;

        dashAvatar.alt = p.name;

        dashAvatar.style.width = '48px';

        dashAvatar.style.height = '48px';

        dashAvatar.style.borderRadius = '50%';

        dashAvatar.style.objectFit = 'cover';

    }



    const heartVal = document.getElementById('val-heart');

    if (heartVal) {

        heartVal.textContent = p.bpm || (p.type === 'gato' ? '138' : '74');

    }



    // 4. Sincronizar Pin GPS

    const gpsPinImg = document.getElementById('gps-pet-avatar-pin');

    if (gpsPinImg) {

        gpsPinImg.onerror = function() { this.onerror = null; this.src = localFallback; };

        gpsPinImg.src = safePhoto;

    }

    const gpsPinName = document.getElementById('gps-pin-name');

    if (gpsPinName) gpsPinName.textContent = p.name;

    const gpsMarkerLabel = document.getElementById('gps-marker-label');

    if (gpsMarkerLabel) {

        gpsMarkerLabel.textContent = p.name;

    }



    // 5. Sincronizar Cabecera Web y Asistente IA

    if (typeof cudi_check_session === 'function') {

        cudi_check_session();

    }

    if (typeof CudiAI !== 'undefined' && typeof CudiAI.loadProfile === 'function') {

        CudiAI.loadProfile();

        const aiAvatar = document.getElementById('ai-avatar');

        if (aiAvatar) {

            aiAvatar.onerror = function() { this.onerror = null; this.src = localFallback; };

            aiAvatar.src = safePhoto;

        }

        const aiPetTag = document.getElementById('ai-header-pet-name');

        if (aiPetTag) aiPetTag.innerHTML = `<i class="fa-solid fa-paw"></i> ${p.name}`;

    }



    const inAppIaAvatar = document.getElementById('in-app-ia-pet-avatar');

    if (inAppIaAvatar) {

        inAppIaAvatar.onerror = function() { this.onerror = null; this.src = localFallback; };

        inAppIaAvatar.src = safePhoto;

    }

    const inAppIaName = document.getElementById('in-app-ia-pet-name');

    if (inAppIaName) inAppIaName.textContent = p.name;



    setTimeout(() => {

        initCharts();

        renderSocialPets();

        renderProfileCard();

        simulateNotifications();

        populateStoreCats();

    }, 120);

}



function loadSavedProfile() {

    let saved = null;

    const isSessionActive = typeof cudi_is_session_active === 'function'

        ? cudi_is_session_active()

        : (localStorage.getItem('cudi_session_active') !== 'false' && !!localStorage.getItem('cudi_pet_profile'));



    try {

        const str = localStorage.getItem('cudi_pet_profile');

        if (str) saved = JSON.parse(str);

    } catch (e) {

        console.error("Error reading cudi_pet_profile", e);

    }



    if (saved && saved.name && isSessionActive) {

        const inferredType = saved.type || (saved.breed && saved.breed.toLowerCase().includes('gato') ? 'gato' : 'perro');

        const safePhoto = resolveDemoPetPhoto(saved, inferredType, saved.name);

        petProfile = {

            name: saved.name,

            type: inferredType,

            weight: String(saved.weight || (inferredType === 'gato' ? '4.2' : '8')),

            age: saved.age || 'explorer',

            energy: saved.energy || 'Moderado',

            food: saved.food || 'Pienso Seco',

            breed: saved.breed || (inferredType === 'gato' ? 'Europeo Común' : 'Mestizo'),

            photo: safePhoto,

            bpm: saved.bpm || (inferredType === 'gato' ? 138 : 74)

        };



        if (saved.photo !== safePhoto) {

            saved.photo = safePhoto;

            try { localStorage.setItem('cudi_pet_profile', JSON.stringify(saved)); } catch (e) {}

        }



        syncSimulatorDOMWithProfile(petProfile);

        return true;

    }



    // Si NO hay sesión iniciada, activar autollenado aleatorio en onboarding

    setupDemoOnboardingAutoFill();

    return false;

}



function showOnboardingScreen(initialTab = 'login') {

    const onboarding = document.getElementById('screen-onboarding');

    const main = document.getElementById('screen-main');

    const statusBar = document.getElementById('app-status-bar');



    if (onboarding) {

        onboarding.classList.add('active');

        onboarding.style.display = 'flex';

    }

    if (main) {

        main.classList.remove('active');

        main.style.display = 'none';

    }

    if (statusBar) {

        statusBar.style.display = 'none';

    }

    setupDemoOnboardingAutoFill();

    if (typeof switchDemoOnboardingTab === 'function') {

        switchDemoOnboardingTab(initialTab);

    }

}



function getDemoPreloadedAccount() {

    if (typeof cudi_get_preloaded_login_account === 'function') {

        return cudi_get_preloaded_login_account();

    }

    if (typeof CUDI_RANDOM_PETS !== 'undefined' && CUDI_RANDOM_PETS.length > 0) {

        return CUDI_RANDOM_PETS[0];

    }

    return {

        name: 'Luna',

        type: 'perro',

        breed: 'Husky Siberiano',

        age: 3,

        weight: 22.0,

        energy: 'Alto',

        food: 'Pienso Seco Premium',

        photo: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=600&h=600&q=80',

        bpm: 78,

        temp: 38.4,

        battery: 94,

        collarId: 'CUDI-GPS-9482',

        tutorEmail: 'luna.husky@cudi.pet'

    };

}



function setupDemoOnboardingAutoFill() {

    const onboardingForm = document.querySelector('.onboarding-form');

    if (!onboardingForm) return;



    // Asegurar step="0.1" y min="0.5" en #pet-weight para evitar errores de rango decimal

    const weightInput = document.getElementById('pet-weight');

    if (weightInput) {

        weightInput.setAttribute('step', '0.1');

        weightInput.setAttribute('min', '0.5');

        weightInput.setAttribute('max', '100');

    }



    if (document.getElementById('demo-auth-tabs-bar')) {

        updateDemoLoginCardUI(getDemoPreloadedAccount());

        return;

    }



    const loginAcc = getDemoPreloadedAccount();

    const candidate = (typeof cudi_get_random_pet_candidate === 'function') ? cudi_get_random_pet_candidate() : loginAcc;

    const petsPool = (typeof CUDI_RANDOM_PETS !== 'undefined' && CUDI_RANDOM_PETS.length) ? CUDI_RANDOM_PETS : [loginAcc];



    // Envolver los elementos originales del formulario de registro dentro de #demo-view-register

    const existingChildren = Array.from(onboardingForm.children);

    const registerContainer = document.createElement('div');

    registerContainer.id = 'demo-view-register';

    registerContainer.style.display = 'none';



    // Banner compacto de autollenado IA para la pestaña de Registro

    const banner = document.createElement('div');

    banner.id = 'demo-autofill-banner';

    banner.className = 'demo-autofill-banner';

    banner.style.cssText = 'margin-bottom:10px; background:rgba(240,249,255,0.92); backdrop-filter:blur(16px); border:1px solid rgba(186,230,253,0.95); border-radius:12px; padding:8px 10px; display:flex; align-items:center; justify-content:space-between; gap:6px;';

    banner.innerHTML = `

        <div style="min-width:0;">

            <span style="font-size:0.62rem; font-weight:800; color:#0284c7; text-transform:uppercase; display:block;">Autollenado IA</span>

            <span style="font-size:0.7rem; color:#334155; font-weight:700; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" id="demo-autofill-info-label">${candidate.name} (${candidate.breed})</span>

        </div>

        <div style="display:flex; align-items:center; gap:4px; flex-shrink:0;">

            <button type="button" onclick="appDemoAutoFill('perro')" style="background:#ffffff; color:#0369a1; border:1px solid #bae6fd; border-radius:8px; padding:5px 7px; font-size:0.66rem; font-weight:800; cursor:pointer;" title="Caso Perro">🐶</button>

            <button type="button" onclick="appDemoAutoFill('gato')" style="background:#ffffff; color:#be185d; border:1px solid #fbcfe8; border-radius:8px; padding:5px 7px; font-size:0.66rem; font-weight:800; cursor:pointer;" title="Caso Gato">🐱</button>

            <button type="button" onclick="appDemoAutoFill()" style="background:linear-gradient(135deg, #0284c7, #0ea5e9); color:white; border:none; padding:5px 9px; border-radius:8px; font-weight:800; font-size:0.68rem; cursor:pointer; display:flex; align-items:center; gap:4px;">

                <i class="fa-solid fa-bolt"></i> Llenar

            </button>

        </div>

    `;



    registerContainer.appendChild(banner);

    existingChildren.forEach(ch => registerContainer.appendChild(ch));



    // Crear Barra de Pestañas Apple Glass (Iniciar Sesión vs Registrar Mascota)

    const tabsBar = document.createElement('div');

    tabsBar.id = 'demo-auth-tabs-bar';

    tabsBar.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; background:rgba(226,232,240,0.75); backdrop-filter:blur(14px); padding:3.5px; border-radius:12px; gap:4px; margin-bottom:12px; border:1px solid rgba(255,255,255,0.9);';

    tabsBar.innerHTML = `

        <button type="button" id="demo-tab-btn-login" onclick="switchDemoOnboardingTab('login')" style="border:none; padding:7px 8px; border-radius:9px; font-size:0.73rem; font-weight:800; cursor:pointer; transition:all 0.2s; background:#ffffff; color:#0284c7; box-shadow:0 2px 8px rgba(2,132,199,0.14);">

            Iniciar Sesión

        </button>

        <button type="button" id="demo-tab-btn-register" onclick="switchDemoOnboardingTab('register')" style="border:none; padding:7px 8px; border-radius:9px; font-size:0.73rem; font-weight:800; cursor:pointer; transition:all 0.2s; background:transparent; color:#475569;">

            Registrar Mascota

        </button>

    `;



    // Crear Vista de Inicio de Sesión Limpia con Cuenta Pre-cargada Automáticamente

    const loginContainer = document.createElement('div');

    loginContainer.id = 'demo-view-login';

    loginContainer.style.display = 'block';



    const quickChipsHtml = petsPool.slice(0, 4).map((pet, idx) => {

        const pPhoto = resolveDemoPetPhoto(pet, pet.type, pet.name);

        const active = pet.name.toLowerCase() === String(loginAcc.name).toLowerCase();

        return `

            <button type="button" class="demo-login-chip" data-demo-pet-idx="${idx}" onclick="appDemoSelectLoginAccount(${idx})" style="display:inline-flex; align-items:center; gap:5px; padding:3px 8px 3px 3px; border-radius:999px; border:1.5px solid ${active ? '#0284c7' : 'rgba(203,213,225,0.85)'}; background:${active ? 'rgba(224,242,254,0.95)' : 'rgba(255,255,255,0.9)'}; color:${active ? '#0369a1' : '#334155'}; font-size:0.68rem; font-weight:700; cursor:pointer;">

                <img src="${pPhoto}" alt="${pet.name}" onerror="if(window.cudi_img_fallback)cudi_img_fallback(this,'${pet.type}','${pet.name}');" style="width:18px !important; height:18px !important; min-width:18px !important; min-height:18px !important; border-radius:50% !important; object-fit:cover !important;">

                <span>${pet.name}</span>

            </button>

        `;

    }).join('');



    const safeLoginPhoto = resolveDemoPetPhoto(loginAcc, loginAcc.type, loginAcc.name);

    const loginEmail = loginAcc.tutorEmail || `${String(loginAcc.name).toLowerCase()}@cudi.pet`;



    loginContainer.innerHTML = `

        <div style="background:rgba(255,255,255,0.94); border:1px solid rgba(203,213,225,0.85); border-radius:16px; padding:14px 12px 12px; box-shadow:0 8px 20px -6px rgba(15,23,42,0.08); text-align:center; margin-bottom:10px;">

            <img id="demo-login-photo" src="${safeLoginPhoto}" alt="${loginAcc.name}" onerror="if(window.cudi_img_fallback)cudi_img_fallback(this,'${loginAcc.type}','${loginAcc.name}');" style="width:58px !important; height:58px !important; min-width:58px !important; min-height:58px !important; aspect-ratio:1/1 !important; border-radius:50% !important; object-fit:cover !important; border:2px solid #0284c7; margin:0 auto 8px; display:block; box-shadow:0 4px 12px rgba(2,132,199,0.18);">

            <div style="display:flex; align-items:center; justify-content:center; gap:6px; margin-bottom:2px;">

                <strong id="demo-login-name" style="font-size:1.02rem; font-weight:800; color:#0f172a;">${loginAcc.name}</strong>

                <span id="demo-login-species-pill" style="font-size:0.62rem; font-weight:800; padding:1px 7px; border-radius:999px; background:${loginAcc.type === 'gato' ? '#fdf2f8' : '#eff6ff'}; color:${loginAcc.type === 'gato' ? '#be185d' : '#0284c7'};">${loginAcc.type === 'gato' ? 'Gato' : 'Perro'}</span>

            </div>

            <div id="demo-login-meta" style="font-size:0.74rem; color:#64748b; font-weight:600; margin-bottom:10px;">${loginAcc.breed} &bull; ${loginAcc.age}a</div>



            <div style="display:flex; align-items:center; justify-content:space-between; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:6px 10px; margin-bottom:11px; font-size:0.69rem;">

                <span id="demo-login-email" style="color:#334155; font-weight:700; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${loginEmail}</span>

                <span style="color:#16a34a; font-weight:800;"><i class="fa-solid fa-circle-check"></i> Activa</span>

            </div>



            <button type="button" class="app-btn primary" onclick="appDemoLoginWithPreloaded()" style="margin-top:0; padding:11px; font-size:0.82rem; display:flex; align-items:center; justify-content:center; gap:8px;">

                <i class="fa-solid fa-right-to-bracket"></i>

                <span id="demo-login-submit-text">Continuar con ${loginAcc.name}</span>

            </button>

        </div>



        <div style="display:flex; align-items:center; justify-content:space-between; gap:4px; flex-wrap:wrap;">

            <div style="display:flex; align-items:center; gap:4px; flex-wrap:wrap;">

                ${quickChipsHtml}

            </div>

            <button type="button" onclick="appDemoCycleLoginAccount()" style="background:#ffffff; color:#0284c7; border:1px solid #bae6fd; border-radius:999px; padding:4px 9px; font-size:0.66rem; font-weight:800; cursor:pointer; display:inline-flex; align-items:center; gap:4px;">

                <i class="fa-solid fa-arrows-rotate"></i> Otra

            </button>

        </div>

    `;



    onboardingForm.appendChild(tabsBar);

    onboardingForm.appendChild(loginContainer);

    onboardingForm.appendChild(registerContainer);



    updateDemoLoginCardUI(loginAcc);

}



function switchDemoOnboardingTab(mode) {

    const loginView = document.getElementById('demo-view-login');

    const regView = document.getElementById('demo-view-register');

    const loginBtn = document.getElementById('demo-tab-btn-login');

    const regBtn = document.getElementById('demo-tab-btn-register');

    const isReg = mode === 'register';



    if (loginView && regView) {

        loginView.style.display = isReg ? 'none' : 'block';

        regView.style.display = isReg ? 'block' : 'none';

    }

    if (loginBtn && regBtn) {

        if (isReg) {

            regBtn.style.background = '#ffffff';

            regBtn.style.color = '#0284c7';

            regBtn.style.boxShadow = '0 2px 8px rgba(2,132,199,0.14)';

            loginBtn.style.background = 'transparent';

            loginBtn.style.color = '#475569';

            loginBtn.style.boxShadow = 'none';

        } else {

            loginBtn.style.background = '#ffffff';

            loginBtn.style.color = '#0284c7';

            loginBtn.style.boxShadow = '0 2px 8px rgba(2,132,199,0.14)';

            regBtn.style.background = 'transparent';

            regBtn.style.color = '#475569';

            regBtn.style.boxShadow = 'none';

            updateDemoLoginCardUI(getDemoPreloadedAccount());

        }

    }

}



function updateDemoLoginCardUI(acc) {

    if (!acc) return;

    const safePhoto = resolveDemoPetPhoto(acc, acc.type, acc.name);

    acc.photo = safePhoto;

    window.currentLoginAccount = acc;



    const photoEl = document.getElementById('demo-login-photo');

    if (photoEl) {

        photoEl.dataset.cudiFallbackDone = 'false';

        photoEl.src = safePhoto;

        photoEl.alt = acc.name;

    }

    const nameEl = document.getElementById('demo-login-name');

    if (nameEl) nameEl.textContent = acc.name;



    const pillEl = document.getElementById('demo-login-species-pill');

    if (pillEl) {

        const isCat = acc.type === 'gato';

        pillEl.textContent = isCat ? 'Gato' : 'Perro';

        pillEl.style.background = isCat ? '#fdf2f8' : '#eff6ff';

        pillEl.style.color = isCat ? '#be185d' : '#0284c7';

    }



    const metaEl = document.getElementById('demo-login-meta');

    if (metaEl) metaEl.innerHTML = `${acc.breed} &bull; ${acc.age}a`;



    const emailEl = document.getElementById('demo-login-email');

    if (emailEl) {

        emailEl.textContent = acc.tutorEmail || `${String(acc.name).toLowerCase()}@cudi.pet`;

    }



    const submitTextEl = document.getElementById('demo-login-submit-text');

    if (submitTextEl) submitTextEl.textContent = `Continuar con ${acc.name}`;



    const heroPhoto = document.getElementById('onboarding-photo');

    if (heroPhoto && safePhoto) {

        const localFallback = acc.type === 'gato' ? 'gato-explorando-seguro-collar-gps.png' : 'avatar-mascota-perfil-gemelo-digital.png';

        heroPhoto.style.backgroundImage = `url('${safePhoto}'), url('${localFallback}')`;

    }



    const petsPool = (typeof CUDI_RANDOM_PETS !== 'undefined' && CUDI_RANDOM_PETS.length) ? CUDI_RANDOM_PETS : [];

    document.querySelectorAll('.demo-login-chip').forEach(chip => {

        const idx = Number(chip.getAttribute('data-demo-pet-idx'));

        const p = petsPool[idx];

        const active = p && p.name.toLowerCase() === String(acc.name).toLowerCase();

        chip.style.borderColor = active ? '#0284c7' : 'rgba(203,213,225,0.85)';

        chip.style.background = active ? 'rgba(224,242,254,0.95)' : 'rgba(255,255,255,0.9)';

        chip.style.color = active ? '#0369a1' : '#334155';

    });

}



function appDemoSelectLoginAccount(idx) {

    if (typeof CUDI_RANDOM_PETS === 'undefined' || !CUDI_RANDOM_PETS[idx]) return;

    updateDemoLoginCardUI(Object.assign({}, CUDI_RANDOM_PETS[idx]));

}



function appDemoCycleLoginAccount() {

    if (typeof CUDI_RANDOM_PETS === 'undefined' || !CUDI_RANDOM_PETS.length) return;

    const curr = getDemoPreloadedAccount();

    const currIdx = CUDI_RANDOM_PETS.findIndex(p => p.name.toLowerCase() === String(curr.name).toLowerCase());

    const nextIdx = (currIdx + 1) % CUDI_RANDOM_PETS.length;

    updateDemoLoginCardUI(Object.assign({}, CUDI_RANDOM_PETS[nextIdx]));

}



function appDemoLoginWithPreloaded() {

    const acc = getDemoPreloadedAccount();

    if (!acc || !acc.name) return;

    const safePhoto = resolveDemoPetPhoto(acc, acc.type, acc.name);



    petProfile = {

        name: acc.name,

        type: acc.type || 'perro',

        weight: String(acc.weight || (acc.type === 'gato' ? '4.2' : '12')),

        age: acc.age || 2,

        ageStageKey: Number(acc.age) > 4 ? 'golden' : (Number(acc.age) > 2 ? 'plenitud' : 'explorer'),

        energy: acc.energy || 'Moderado',

        food: acc.food || 'Pienso Seco Premium',

        breed: acc.breed || (acc.type === 'gato' ? 'Europeo Común' : 'Mestizo'),

        photo: safePhoto,

        avatar: safePhoto,

        bpm: acc.bpm || (acc.type === 'gato' ? 142 : 78),

        temp: acc.temp || 38.5,

        battery: acc.battery || 95,

        collarId: acc.collarId || (acc.type === 'gato' ? 'CUDI-CAT-7781' : 'CUDI-GPS-9482'),

        tutorEmail: acc.tutorEmail || `${String(acc.name).toLowerCase()}@cudi.pet`,

        sessionActive: true,

        savedAt: new Date().toISOString()

    };



    localStorage.setItem('cudi_pet_profile', JSON.stringify(petProfile));

    localStorage.setItem('cudi_last_registered_pet', JSON.stringify(petProfile));

    localStorage.setItem('cudi_session_active', 'true');

    window.dispatchEvent(new CustomEvent('cudi:sessionChanged', { detail: petProfile }));



    syncSimulatorDOMWithProfile(petProfile);

    if (typeof showCudiToast === 'function') {

        showCudiToast(`🎉 ¡Sesión iniciada con ${petProfile.name} (${petProfile.breed})!`, 'success');

    }

}



function appDemoAutoFill(preferredSpecies) {

    let pet;

    if (typeof CUDI_RANDOM_PETS !== 'undefined' && CUDI_RANDOM_PETS.length > 0) {

        const pool = preferredSpecies

            ? CUDI_RANDOM_PETS.filter(p => p.type === preferredSpecies)

            : CUDI_RANDOM_PETS;

        const currentName = document.getElementById('pet-name')?.value || '';

        const currIdx = pool.findIndex(p => p.name.toLowerCase() === currentName.toLowerCase());

        const nextIdx = currIdx !== -1 ? (currIdx + 1) % pool.length : Math.floor(Math.random() * pool.length);

        pet = Object.assign({}, pool[nextIdx]);

        window.currentRandomPet = pet;

    } else {

        pet = {

            name: 'Luna',

            type: 'perro',

            breed: 'Husky Siberiano',

            weight: '22',

            age: 3,

            energy: 'Alto',

            food: 'Pienso Seco Premium',

            photo: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&h=600&q=80'

        };

    }



    selectPetType(pet.type);



    const nameInput = document.getElementById('pet-name');

    if (nameInput) { nameInput.value = pet.name; nameInput.setCustomValidity(''); }

    const weightInput = document.getElementById('pet-weight');

    if (weightInput) {

        weightInput.setAttribute('step', '0.1');

        weightInput.setAttribute('min', '0.5');

        weightInput.setAttribute('max', '100');

        weightInput.value = pet.weight;

        weightInput.setCustomValidity('');

    }



    const breedSelect = document.getElementById('pet-breed');

    if (breedSelect) {

        let optExists = Array.from(breedSelect.options).some(o => o.value === pet.breed);

        if (!optExists) {

            const opt = document.createElement('option');

            opt.value = pet.breed;

            opt.textContent = pet.breed;

            breedSelect.appendChild(opt);

        }

        breedSelect.value = pet.breed;

    }



    const ageSelect = document.getElementById('pet-age');

    if (ageSelect) {

        const numAge = Number(pet.age) || 2;

        ageSelect.value = numAge > 4 ? 'golden' : (numAge > 2.5 ? 'plenitud' : (numAge <= 1 ? 'primera' : 'explorer'));

    }



    const energySelect = document.getElementById('pet-energy');

    if (energySelect) {

        const en = (pet.energy || '').toLowerCase();

        energySelect.value = en.includes('tranquilo') ? 'tranquilo' : (en.includes('extremo') || en.includes('atleta') || en.includes('alto') ? 'activo' : 'moderado');

    }



    const foodSelect = document.getElementById('pet-food');

    if (foodSelect) {

        const fd = (pet.food || '').toLowerCase();

        foodSelect.value = fd.includes('barf') ? 'barf' : (fd.includes('mixta') || fd.includes('húmeda') ? 'mixta' : 'pienso');

    }



    const safeAutoPhoto = resolveDemoPetPhoto(pet, pet.type, pet.name);

    window.appDemoSelectedPhoto = safeAutoPhoto;

    const photoEl = document.getElementById('onboarding-photo');

    if (photoEl && safeAutoPhoto) {

        const localFallback = pet.type === 'gato' ? 'gato-explorando-seguro-collar-gps.png' : 'avatar-mascota-perfil-gemelo-digital.png';

        photoEl.style.backgroundImage = `url('${safeAutoPhoto}'), url('${localFallback}')`;

    }



    [nameInput, weightInput, breedSelect].forEach(el => {

        if (el) {

            el.style.borderColor = '#0284c7';

            el.style.backgroundColor = '#eff6ff';

            setTimeout(() => {

                el.style.borderColor = '';

                el.style.backgroundColor = '';

            }, 600);

        }

    });



    const infoLabel = document.getElementById('demo-autofill-info-label');

    if (infoLabel) {

        infoLabel.innerHTML = `✨ Autollenado: <strong>${pet.name}</strong> (${pet.breed} • ${pet.weight} kg)`;

    }

}



function proceedToDashboard() {

    const name   = (document.getElementById('pet-name')?.value || 'Luna').trim() || 'Luna';

    const type   = document.getElementById('selected-pet-type')?.value || 'perro';

    const rawW   = parseFloat(String(document.getElementById('pet-weight')?.value || (type === 'gato' ? '4.2' : '14')).replace(',', '.'));

    const weight = String(isNaN(rawW) ? (type === 'gato' ? 4.2 : 14) : Math.min(100, Math.max(0.5, rawW)));

    const ageRaw = document.getElementById('pet-age')?.value || 'explorer';

    const energyRaw = document.getElementById('pet-energy')?.value || 'moderado';

    const foodRaw   = document.getElementById('pet-food')?.value || 'pienso';

    const breed  = document.getElementById('pet-breed')?.value || (type === 'gato' ? 'Europeo Común' : 'Mestizo');

    const rawPhoto = window.appDemoSelectedPhoto || ONBOARDING_PHOTOS[type] || ONBOARDING_PHOTOS.perro;

    const photo  = resolveDemoPetPhoto(rawPhoto, type, name);



    const energyMap = { tranquilo: 'Tranquilo', moderado: 'Moderado', activo: 'Alto' };

    const foodMap = { pienso: 'Pienso Seco Premium', barf: 'Dieta Natural BARF', mixta: 'Mixta (Pienso + Húmeda)' };

    const ageNumMap = { primera: 1, explorer: 2, plenitud: 4, golden: 8 };



    petProfile = { 

        name, 

        type, 

        weight, 

        age: ageNumMap[ageRaw] || ageRaw, 

        ageStageKey: ageRaw,

        energy: energyMap[energyRaw] || energyRaw, 

        food: foodMap[foodRaw] || foodRaw, 

        breed, 

        photo,

        avatar: photo,

        bpm: type === 'gato' ? 138 : 74,

        collarId: type === 'gato' ? 'CUDI-CAT-7781' : 'CUDI-GPS-9482',

        tutorEmail: `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}@cudi.pet`,

        sessionActive: true,

        savedAt: new Date().toISOString()

    };



    window.currentLoginAccount = petProfile;

    localStorage.setItem('cudi_pet_profile', JSON.stringify(petProfile));

    localStorage.setItem('cudi_last_registered_pet', JSON.stringify(petProfile));

    localStorage.setItem('cudi_session_active', 'true');

    window.dispatchEvent(new CustomEvent('cudi:sessionChanged', { detail: petProfile }));



    syncSimulatorDOMWithProfile(petProfile);

}



function appDemoResetSession() {

    if (confirm('¿Deseas desconectar o cambiar la mascota en la demo?')) {

        const currentProfile = localStorage.getItem('cudi_pet_profile');

        if (currentProfile) {

            localStorage.setItem('cudi_last_registered_pet', currentProfile);

        }

        localStorage.removeItem('cudi_pet_profile');

        localStorage.removeItem('cudi_session_active');

        window.currentRandomPet = null;

        window.dispatchEvent(new CustomEvent('cudi:sessionChanged', { detail: null }));



        const main = document.getElementById('screen-main');

        if (main) {

            main.classList.remove('active');

            main.style.display = 'none';

        }

        const statusBar = document.getElementById('app-status-bar');

        if (statusBar) statusBar.style.display = 'none';



        const onboarding = document.getElementById('screen-onboarding');

        if (onboarding) {

            onboarding.classList.add('active');

            onboarding.style.display = 'block';

        }



        setupDemoOnboardingAutoFill();

        switchDemoOnboardingTab('login');

    }

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



function getDemoPetCalibratedMetrics(p) {

    const prof = p || petProfile || { name: 'Luna', type: 'perro', weight: 14 };

    const name = String(prof.name || 'Luna');

    const seed = name.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

    const isCat = prof.type === 'gato' || (prof.breed && ['gato', 'siamés', 'persa', 'maine coon', 'bengalí', 'ragdoll', 'azul ruso', 'british', 'sphynx', 'bosque'].some(b => prof.breed.toLowerCase().includes(b)));

    const baseBpm = Number(prof.bpm) || (isCat ? 138 + (seed % 14) : 74 + (seed % 14));

    const baseSleep = isCat ? Number((11.2 + (seed % 18) * 0.1).toFixed(1)) : Number((8.4 + (seed % 16) * 0.1).toFixed(1));

    const baseEnergy = 84 + (seed % 13);

    const baseStress = 18 + (seed % 12);

    const dailyKm = isCat ? Number((1.8 + (seed % 15) * 0.1).toFixed(1)) : Number((3.8 + (seed % 28) * 0.1).toFixed(1));

    const radarScores = [

        90 + (seed % 9),

        baseEnergy,

        Math.min(98, Math.round(baseSleep * (isCat ? 7.8 : 10.4))),

        88 + ((seed * 3) % 11),

        91 + ((seed * 7) % 8),

        93 + ((seed * 5) % 7)

    ];

    const weeklyKm = [

        Number((dailyKm * 0.85).toFixed(1)),

        Number((dailyKm * 1.05).toFixed(1)),

        Number((dailyKm * 0.78).toFixed(1)),

        Number((dailyKm * 1.18).toFixed(1)),

        Number((dailyKm * 0.96).toFixed(1)),

        Number((dailyKm * 1.32).toFixed(1)),

        Number((dailyKm * 1.10).toFixed(1))

    ];

    return { isCat, baseBpm, baseSleep, baseEnergy, baseStress, dailyKm, radarScores, weeklyKm };

}



function createRadarChart(id) {

    const canvas = document.getElementById(id);

    if (!canvas) return;

    if (charts[id]) charts[id].destroy();

    const m = getDemoPetCalibratedMetrics(petProfile);

    charts[id] = new Chart(canvas, {

        type: 'radar',

        data: {

            labels: ['Salud', 'Energia', 'Sueno', 'Social', 'Nutricion', 'Humor'],

            datasets: [{

                label: petProfile.name || 'Mascota',

                data: m.radarScores,

                backgroundColor: CHART_COLORS.primary + '20',

                borderColor: CHART_COLORS.primary,

                borderWidth: 2,

                pointBackgroundColor: CHART_COLORS.primary

            }]

        },

        options: {

            responsive: true, maintainAspectRatio: false,

            plugins: { legend: { display: false } },

            scales: { r: { min: 50, max: 100, ticks: { display: false }, grid: { color: '#f1f5f9' } } }

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

    const m = getDemoPetCalibratedMetrics(petProfile);



    const heartEl = document.getElementById('val-heart');

    if (heartEl) heartEl.textContent = m.baseBpm;

    const energyEl = document.getElementById('val-energy');

    if (energyEl) energyEl.textContent = m.baseEnergy;

    const sleepEl = document.getElementById('val-sleep');

    if (sleepEl) sleepEl.textContent = m.baseSleep;

    const stressEl = document.getElementById('val-stress');

    if (stressEl) stressEl.textContent = m.baseStress + '%';



    // 4 sparklines del dashboard

    createSparkline('chart-heart',  makeSparklineData(m.baseBpm, 6), CHART_COLORS.danger);

    createSparkline('chart-energy', makeSparklineData(m.baseEnergy, 6), CHART_COLORS.warning);

    createSparkline('chart-sleep',  makeSparklineData(m.baseSleep, 0.8), CHART_COLORS.primary);

    createSparkline('chart-stress', makeSparklineData(m.baseStress, 5), CHART_COLORS.purple);



    // Radar en dashboard

    createRadarChart('chart-radar');



    // BPM line chart

    const bpmCanvas = document.getElementById('chart-bpm');

    if (bpmCanvas) {

        if (charts['chart-bpm']) charts['chart-bpm'].destroy();

        const holterCurve = [-8, -11, -4, +6, +3, +12, +4, -3, -7].map(d => m.baseBpm + d);

        charts['chart-bpm'] = new Chart(bpmCanvas, {

            type: 'line',

            data: {

                labels: ['00h','03h','06h','09h','12h','15h','18h','21h','24h'],

                datasets: [{

                    label: 'BPM',

                    data: holterCurve,

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

                    y: { ticks: { font: { size: 9 } }, min: m.isCat ? 105 : 50, max: m.isCat ? 175 : 120 }

                }

            }

        });

    }



    // Bar semanal

    createBarChart('chart-weekly',

        ['Lun','Mar','Mie','Jue','Vie','Sab','Dom'],

        m.weeklyKm,

        CHART_COLORS.primary

    );



    // Doughnut dieta

    createDoughnutChart('chart-diet',

        ['Proteinas', 'Grasas', 'Carbos', 'Fibra'],

        m.isCat ? [48, 26, 16, 10] : [40, 25, 25, 10],

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

                    data: [m.baseStress + 4, m.baseStress + 10, m.baseStress - 2, m.baseStress + 16, m.baseStress + 2, m.baseStress - 4, m.baseStress],

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

    if (window.cudiLiveMetricsInterval) {

        clearInterval(window.cudiLiveMetricsInterval);

    }

    const metrics = [

        { valId: 'val-heart',  chartId: 'chart-heart',  getBase: () => getDemoPetCalibratedMetrics(petProfile).baseBpm,    var: 5,   suffix: 'bpm', color: CHART_COLORS.danger,  isInt: true },

        { valId: 'val-energy', chartId: 'chart-energy', getBase: () => getDemoPetCalibratedMetrics(petProfile).baseEnergy, var: 4,   suffix: '%',   color: CHART_COLORS.warning, isInt: true },

        { valId: 'val-sleep',  chartId: 'chart-sleep',  getBase: () => getDemoPetCalibratedMetrics(petProfile).baseSleep,  var: 0.3, suffix: 'h',   color: CHART_COLORS.primary, isInt: false },

        { valId: 'val-stress', chartId: 'chart-stress', getBase: () => getDemoPetCalibratedMetrics(petProfile).baseStress, var: 3,   suffix: '%',   color: CHART_COLORS.purple,  isInt: true }

    ];



    window.cudiLiveMetricsInterval = setInterval(() => {

        metrics.forEach(m => {

            const base = m.getBase();

            const val = base + (Math.random() - 0.5) * m.var * 2;

            const el = document.getElementById(m.valId);

            if (el) el.textContent = m.isInt ? (m.valId === 'val-stress' ? Math.round(val) + '%' : Math.round(val)) : val.toFixed(1);



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

// SOCIAL PETS & MURO SINCRONIZADO (COMUNIDAD COMPLETA EN LA DEMO)

// ==========================

function renderSocialPets() {

    const sharedState = getDemoSharedSocialState();

    const currentPet = petProfile.name ? petProfile : {

        name: 'Mi Mascota',

        photo: 'avatar-mascota-perfil-gemelo-digital.png',

        type: 'perro'

    };

    const currentPetPhoto = resolveDemoPetPhoto(currentPet, currentPet.type, currentPet.name);

    const localFallback = currentPet.type === 'gato' ? 'gato-explorando-seguro-collar-gps.png' : 'avatar-mascota-perfil-gemelo-digital.png';



    // 1. BARRA DE STORIES SINCRONIZADA

    const storiesBar = document.getElementById('demo-stories-bar');

    if (storiesBar) {

        const allStories = [

            { id: 'user', name: `Tú (${currentPet.name})`, photo: currentPetPhoto, isUser: true },

            ...SOCIAL_PETS

        ];



        storiesBar.innerHTML = allStories.map(s => {

            const sPhoto = resolveDemoPetPhoto(s.photo, s.type, s.name);

            return `

            <div class="demo-story-item" onclick="openStoryDetail('${s.id}')" title="${s.name}">

                <div class="demo-story-ring ${s.isUser ? 'active-pulse' : ''}">

                    <img src="${sPhoto}" alt="${s.name}" class="demo-story-avatar" onerror="this.onerror=null;this.src='avatar-mascota-perfil-gemelo-digital.png';">

                </div>

                <span class="demo-story-name">${s.name}</span>

            </div>

        `}).join('');

    }



    // 2. MURO DE PUBLICACIONES SINCRONIZADO CON COMUNIDAD-CUDI.HTML

    let feedContainer = document.getElementById('demo-social-feed-list');

    const petsContainer = document.getElementById('social-pets-list');

    if (!feedContainer && petsContainer && petsContainer.parentNode) {

        feedContainer = document.createElement('div');

        feedContainer.id = 'demo-social-feed-list';

        const neighborsHeader = petsContainer.previousElementSibling;

        petsContainer.parentNode.insertBefore(feedContainer, neighborsHeader || petsContainer);

    }



    if (feedContainer) {

        feedContainer.innerHTML = `

            <div style="display:flex; justify-content:space-between; align-items:center; margin:4px 0 8px;">

                <span style="font-size:0.74rem; font-weight:800; color:#0f172a; text-transform:uppercase; letter-spacing:0.4px;">

                    <i class="fa-solid fa-newspaper" style="color:#0284c7;"></i> Muro Comunidad CUDI

                </span>

                <a href="comunidad-cudi.html" style="font-size:0.68rem; color:#0284c7; font-weight:800; text-decoration:none; display:inline-flex; align-items:center; gap:4px;">

                    Abrir Red Web <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.6rem;"></i>

                </a>

            </div>

            <div class="demo-quick-post-bar">

                <img src="${currentPetPhoto}" alt="${currentPet.name}" class="demo-feed-author-img" onerror="this.onerror=null;this.src='${localFallback}';">

                <input type="text" id="demo-quick-post-input" class="demo-quick-post-input" placeholder="Publicar como ${currentPet.name} en Comunidad...">

                <button type="button" class="demo-quick-post-btn" onclick="publishFromDemoSocial()">

                    <i class="fa-solid fa-paper-plane"></i> Publicar

                </button>

            </div>

            ${sharedState.posts.slice(0, 4).map(post => {

                const isFollowed = sharedState.followedIds.includes(post.petId);

                const postAvatar = resolveDemoPetPhoto(post.avatar, post.type, post.author);

                return `

                    <div class="demo-social-feed-card">

                        <div class="demo-feed-header">

                            <img src="${postAvatar}" alt="${post.author}" class="demo-feed-author-img" onerror="this.onerror=null;this.src='avatar-mascota-perfil-gemelo-digital.png';" onclick="openAppPetModal('${post.petId}')" style="cursor:pointer;">

                            <div style="flex:1; min-width:0;">

                                <div style="font-size:0.84rem; font-weight:800; color:#0f172a; display:flex; align-items:center; gap:4px; cursor:pointer;" onclick="openAppPetModal('${post.petId}')">

                                    ${post.author} <i class="fa-solid fa-circle-check" style="color:#0284c7; font-size:0.72rem;"></i>

                                </div>

                                <div style="font-size:0.66rem; color:#64748b;">${post.timeLoc}</div>

                            </div>

                            ${post.petId !== 'user' ? `

                                <button type="button" onclick="contactPet('${post.petId}', '${post.author}')" style="background:${isFollowed ? '#dcfce7' : '#e0f2fe'}; color:${isFollowed ? '#15803d' : '#0284c7'}; border:none; border-radius:50px; padding:4px 10px; font-size:0.66rem; font-weight:800; cursor:pointer;">

                                    ${isFollowed ? '<i class="fa-solid fa-check"></i> Siguiendo' : 'Seguir +'}

                                </button>

                            ` : `

                                <span style="background:#dcfce7; color:#15803d; padding:3px 8px; border-radius:50px; font-size:0.64rem; font-weight:800;">Tú</span>

                            `}

                        </div>

                        <p style="font-size:0.75rem; color:#334155; margin:0 0 8px; line-height:1.45;">${post.text}</p>

                        ${post.image ? `<img src="${post.image}" alt="${post.author}" class="demo-post-image" onerror="this.onerror=null;this.style.display='none';">` : ''}

                        <div style="display:flex; align-items:center; justify-content:space-between; border-top:1px solid rgba(226,232,240,0.75); padding-top:8px; margin-top:4px;">

                            <button type="button" onclick="toggleDemoPostLike('${post.id}')" style="background:none; border:none; color:${post.liked ? '#ef4444' : '#64748b'}; font-size:0.74rem; font-weight:800; cursor:pointer; display:inline-flex; align-items:center; gap:5px;">

                                <i class="fa-solid fa-heart"></i> ${post.likes} Me gusta

                            </button>

                            <span style="font-size:0.7rem; color:#64748b; font-weight:600;">

                                <i class="fa-solid fa-comment"></i> ${post.commentsCount || 0} comentarios

                            </span>

                            <span style="font-size:0.66rem; color:#10b981; font-weight:700;">

                                <i class="fa-solid fa-rotate"></i> Sync Web

                            </span>

                        </div>

                    </div>

                `;

            }).join('')}

        `;

    }



    // 3. LISTA DE MASCOTAS VECINAS (8 COMPAÑEROS SINCRONIZADOS)

    if (!petsContainer) return;



    petsContainer.innerHTML = SOCIAL_PETS.map(p => {

        const isGreeted = sharedState.followedIds.includes(p.id);

        const safePPhoto = resolveDemoPetPhoto(p.photo, p.type, p.name);

        return `

        <div class="pet-social-card-rich" id="social-card-${p.id}">

            <div class="pet-social-card-top">

                <div class="pet-avatar-rich-wrap">

                    <img src="${safePPhoto}" alt="${p.name}" class="pet-avatar-rich" onerror="this.onerror=null;this.src='avatar-mascota-perfil-gemelo-digital.png';" onclick="openAppPetModal('${p.id}')" style="cursor:pointer;">

                    <span class="pet-online-beacon" title="Smart Collar GPS Activo"></span>

                </div>

                <div class="pet-rich-meta">

                    <div class="pet-rich-name-row">

                        <span class="pet-rich-name" onclick="openAppPetModal('${p.id}')" style="cursor:pointer;">

                            ${p.name} <i class="fa-solid fa-circle-check" style="color:#0284c7; font-size:0.75rem;"></i>

                        </span>

                        <span class="pet-match-badge"><i class="fa-solid fa-heart" style="color:#ef4444;"></i> ${p.compat}% Match</span>

                    </div>

                    <div class="pet-rich-sub">

                        ${p.breed} &bull; <strong style="color:#0f172a;">${p.dist}</strong> de ti

                    </div>

                    <div style="font-size:0.7rem; color:#10b981; font-weight:700;">

                        <i class="fa-solid fa-shield-dog"></i> ${p.collar}

                    </div>

                </div>

            </div>

            

            <p style="font-size:0.73rem; color:#475569; margin:8px 0 6px; line-height:1.4;">${p.bio}</p>



            <div class="pet-badges-row">

                ${(p.badges || []).map(b => `<span class="pet-badge-tag">${b}</span>`).join('')}

            </div>



            <div class="pet-rich-actions">

                <button type="button" class="btn-social-saludar ${isGreeted ? 'saludado' : ''}" id="btn-saludar-${p.id}" onclick="contactPet('${p.id}', '${p.name}')">

                    ${isGreeted ? '<i class="fa-solid fa-check"></i> ¡Saludado! 🐾' : '<i class="fa-solid fa-paw"></i> Saludar 🐾'}

                </button>

                <button type="button" class="btn-social-ficha" onclick="openAppPetModal('${p.id}')">

                    <i class="fa-solid fa-address-card"></i> Ver Ficha

                </button>

            </div>

        </div>

        `;

    }).join('');

}



function toggleDemoPostLike(postId) {

    const state = getDemoSharedSocialState();

    const post = state.posts.find(p => p.id === postId);

    if (!post) return;

    post.liked = !post.liked;

    post.likes = Math.max(0, (post.likes || 0) + (post.liked ? 1 : -1));

    saveDemoSharedSocialState(state);

    renderSocialPets();

}



function publishFromDemoSocial() {

    const input = document.getElementById('demo-quick-post-input');

    const text = (input ? input.value.trim() : '') || `¡Listos para el paseo de hoy con el Smart Collar CUDI activo! 🐾✨`;

    const currentPet = petProfile.name ? petProfile : {

        name: 'Mi Mascota',

        photo: 'avatar-mascota-perfil-gemelo-digital.png',

        type: 'perro'

    };



    const state = getDemoSharedSocialState();

    state.posts.unshift({

        id: 'post_demo_' + Date.now(),

        petId: 'user',

        author: currentPet.name,

        verified: true,

        avatar: resolveDemoPetPhoto(currentPet, currentPet.type, currentPet.name),

        timeLoc: 'Justo ahora • Desde CUDI App Demo',

        text: text,

        image: '',

        likes: 1,

        liked: true,

        commentsCount: 0

    });

    saveDemoSharedSocialState(state);

    if (input) input.value = '';

    renderSocialPets();

    showToast(`✨ Publicación de ${currentPet.name} sincronizada con Comunidad CUDI`);

}



window.addEventListener('storage', (e) => {

    if (e.key === DEMO_SHARED_SOCIAL_KEY) {

        renderSocialPets();

    }

});



function openStoryDetail(petId) {

    if (petId === 'user') {

        showToast(`📸 ${petProfile.name || 'Tu mascota'}: Collar activo y sincronizado con Comunidad CUDI.`);

        return;

    }

    const pet = SOCIAL_PETS.find(p => p.id === petId);

    if (pet) {

        showToast(`✨ Story de ${pet.name}: ¡Paseo activo en el parque (${pet.dist} de ti)!`);

        openAppPetModal(petId);

    }

}



function openAppPetModal(petId) {

    const pet = SOCIAL_PETS.find(p => p.id === petId) || SOCIAL_PETS[0];

    if (!pet) return;



    const existing = document.getElementById('demo-inapp-modal');

    if (existing) existing.remove();



    const screen = document.querySelector('.mobile-screen');

    if (!screen) return;



    const sharedState = getDemoSharedSocialState();

    const isGreeted = sharedState.followedIds.includes(pet.id);

    const safeModalPhoto = resolveDemoPetPhoto(pet.photo, pet.type, pet.name);



    const modal = document.createElement('div');

    modal.id = 'demo-inapp-modal';

    modal.className = 'app-inapp-modal';

    modal.innerHTML = `

        <div class="app-inapp-modal-sheet">

            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">

                <span style="font-size:0.7rem; font-weight:800; background:#dbeafe; color:#0284c7; padding:3px 10px; border-radius:50px;">

                    <i class="fa-solid fa-paw"></i> FICHA SINCRONIZADA CUDI

                </span>

                <button onclick="document.getElementById('demo-inapp-modal').remove()" style="background:#f1f5f9; border:none; width:28px; height:28px; border-radius:50%; cursor:pointer; color:#64748b; font-weight:800;">

                    <i class="fa-solid fa-xmark"></i>

                </button>

            </div>



            <div style="display:flex; gap:12px; align-items:center; margin-bottom:14px;">

                <img src="${safeModalPhoto}" alt="${pet.name}" onerror="this.onerror=null;this.src='avatar-mascota-perfil-gemelo-digital.png';" style="width:64px !important; height:64px !important; min-width:64px !important; max-width:64px !important; min-height:64px !important; max-height:64px !important; aspect-ratio:1/1 !important; border-radius:50% !important; object-fit:cover !important; border:3px solid #0284c7; box-shadow:0 4px 14px rgba(2,132,199,0.25);">

                <div>

                    <h3 style="margin:0; font-size:1.15rem; color:#0f172a; font-weight:800; display:flex; align-items:center; gap:6px;">

                        ${pet.name} <i class="fa-solid fa-circle-check" style="color:#0284c7; font-size:0.85rem;"></i>

                    </h3>

                    <p style="margin:2px 0 0; font-size:0.75rem; color:#64748b;">${pet.breed} &bull; ${pet.dist} de ti</p>

                    <span style="font-size:0.7rem; font-weight:800; color:#15803d; background:#dcfce7; padding:2px 8px; border-radius:12px; display:inline-block; margin-top:4px;">

                        <i class="fa-solid fa-heart"></i> ${pet.compat}% Afinidad con ${petProfile.name || 'tu mascota'}

                    </span>

                </div>

            </div>



            <p style="font-size:0.8rem; color:#334155; line-height:1.5; margin-bottom:14px; background:rgba(248,250,252,0.9); padding:10px 12px; border-radius:12px; border:1px solid #e2e8f0;">

                "${pet.bio}"

            </p>



            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:16px;">

                <div style="background:#eff6ff; padding:10px; border-radius:12px; text-align:center;">

                    <div style="font-size:0.65rem; color:#1e40af; font-weight:700; text-transform:uppercase;">Nivel de Energía</div>

                    <div style="font-size:0.95rem; font-weight:900; color:#0284c7;">${pet.energy}</div>

                </div>

                <div style="background:#f0fdf4; padding:10px; border-radius:12px; text-align:center;">

                    <div style="font-size:0.65rem; color:#166534; font-weight:700; text-transform:uppercase;">Smart Collar</div>

                    <div style="font-size:0.95rem; font-weight:900; color:#16a34a;">Conectado</div>

                </div>

            </div>



            <div style="display:flex; gap:8px;">

                <button type="button" class="btn-social-saludar ${isGreeted ? 'saludado' : ''}" style="flex:1; padding:12px;" onclick="contactPet('${pet.id}', '${pet.name}'); document.getElementById('demo-inapp-modal').remove();">

                    <i class="fa-solid fa-paw"></i> ${isGreeted ? '¡Ya sigues a ' + pet.name + '!' : 'Saludar y Seguir en Comunidad 🐾'}

                </button>

            </div>

        </div>

    `;



    screen.appendChild(modal);

}



function contactPet(petId, name) {

    const state = getDemoSharedSocialState();

    const idx = state.followedIds.indexOf(petId);

    if (idx === -1) {

        state.followedIds.push(petId);

        showToast(`🎉 ¡Saludo enviado y siguiendo a ${name} en la App y en la Web! 🐾`);

    } else {

        state.followedIds.splice(idx, 1);

        showToast(`Dejaste de seguir a ${name}`);

    }

    saveDemoSharedSocialState(state);

    renderSocialPets();

}



function proposeOuting() {

    showToast('📍 Propuesta de paseo CUDI sincronizada con tus vecinos compatibles.');

}



// ==========================

// PERFIL (CON SINCRONIZACIÓN TRANSVERSAL)

// ==========================

function renderProfileCard() {

    const p = petProfile;

    const ageLabels = { primera: 'Primera Aventura (1 año)', explorer: 'Energía Desatada (2 años)', plenitud: 'Plenitud Vital (4 años)', golden: 'Sabiduría Golden (8+ años)' };

    const energyLabels = { tranquilo: 'Tranquilo', moderado: 'Moderado', activo: 'Alto' };

    const foodLabels = { pienso: 'Pienso Seco', barf: 'Dieta BARF', mixta: 'Dieta Mixta' };



    const ageText = ageLabels[p.ageStageKey] || ageLabels[p.age] || formatPetAgeStage(p.age);

    const energyText = energyLabels[String(p.energy || '').toLowerCase()] || p.energy || 'Moderado';

    const foodText = foodLabels[String(p.food || '').toLowerCase()] || p.food || 'Pienso Seco';



    const els = {

        'profile-pet-name': p.name || 'Mi Mascota',

        'profile-pet-type': p.type === 'gato' ? '🐱 Gato' : '🐶 Perro',

        'profile-pet-breed': p.breed || (p.type === 'gato' ? 'Europeo Común' : 'Mestizo'),

        'profile-pet-age': ageText,

        'profile-pet-weight': p.weight ? String(p.weight).replace(/\s*kg$/i, '') + ' kg' : '-',

        'profile-pet-energy': energyText,

        'profile-pet-food': foodText

    };



    Object.entries(els).forEach(([id, val]) => {

        const el = document.getElementById(id);

        if (el) el.textContent = val;

    });



    const avatar = document.querySelector('#tab-profile .profile-avatar');

    if (avatar) {

        const safeProfilePhoto = resolveDemoPetPhoto(p, p.type, p.name);

        const localFallback = p.type === 'gato' ? 'gato-explorando-seguro-collar-gps.png' : 'avatar-mascota-perfil-gemelo-digital.png';

        avatar.style.backgroundImage = `url('${safeProfilePhoto}'), url('${localFallback}')`;

        avatar.innerHTML = `<img src="${safeProfilePhoto}" alt="${p.name || 'Mascota'}" onerror="this.onerror=null;this.src='${localFallback}';" style="width:100% !important; height:100% !important; object-fit:cover !important; object-position:center !important; border-radius:50% !important; display:block;">`;

    }



    const tabProfile = document.getElementById('tab-profile');

    if (tabProfile && !document.getElementById('demo-btn-switch-pet')) {

        const switchBtn = document.createElement('button');

        switchBtn.id = 'demo-btn-switch-pet';

        switchBtn.type = 'button';

        switchBtn.onclick = appDemoResetSession;

        switchBtn.style.cssText = 'width:100%; margin-top:14px; margin-bottom:10px; padding:12px; background:#f8fafc; border:1px solid #cbd5e1; border-radius:14px; color:#475569; font-weight:800; font-size:0.8rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;';

        switchBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> Cambiar Mascota / Probar Otra';

        tabProfile.appendChild(switchBtn);



        const loginSyncBtn = document.createElement('button');

        loginSyncBtn.id = 'demo-btn-login-sync';

        loginSyncBtn.type = 'button';

        loginSyncBtn.onclick = function() {

            if (typeof openAuthModal === 'function') openAuthModal();

        };

        loginSyncBtn.style.cssText = 'width:100%; margin-bottom:24px; padding:12px; background:linear-gradient(135deg, #0284c7, #0077b6); color:white; border:none; border-radius:14px; font-weight:800; font-size:0.8rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; box-shadow:0 3px 10px rgba(2,132,199,0.25);';

        loginSyncBtn.innerHTML = '<i class="fa-solid fa-paw"></i> Iniciar Sesión / Sincronizar en la Web';

        tabProfile.appendChild(loginSyncBtn);

    }

}



// Escuchar cambios de sesión externos (desde modal web o mi mascota)

window.addEventListener('cudi:sessionChanged', (e) => {

    if (e.detail && e.detail.name) {

        loadSavedProfile();

    } else {

        // Sesión cerrada

        const main = document.getElementById('screen-main');

        if (main) {

            main.classList.remove('active');

            main.style.display = 'none';

        }

        const statusBar = document.getElementById('app-status-bar');

        if (statusBar) statusBar.style.display = 'none';



        const onboarding = document.getElementById('screen-onboarding');

        if (onboarding) {

            onboarding.classList.add('active');

            onboarding.style.display = 'block';

        }

        setupDemoOnboardingAutoFill();

    }

});



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



function syncCartState() {

    try {

        const stored = localStorage.getItem('cudi_cart');

        appCart = stored ? JSON.parse(stored) : [];

        if (typeof globalCart !== 'undefined') {

            globalCart = [...appCart];

        }

    } catch(e) {

        appCart = [];

    }

}



function addToCart(name, price, img) {

    syncCartState();

    const existing = appCart.find(i => i.name === name);

    if (existing) { 

        existing.qty++; 

    } else { 

        appCart.push({ name, price: parseFloat(price), qty: 1, img: img || '' }); 

    }

    localStorage.setItem('cudi_cart', JSON.stringify(appCart));

    

    // Si existe la instancia global del carrito de la web (script.js), actualizarla

    if (typeof globalCart !== 'undefined') {

        globalCart = [...appCart];

        if (typeof renderCartUI === 'function') renderCartUI();

    }

    

    updateCartBadge();

    showToast(name + ' añadido al carrito ✓');

    showCartFloatBtn();

    renderInlineCart();

}



function updateCartBadge() {

    syncCartState();

    const total = appCart.reduce((a, i) => a + (Number(i.qty) || 1), 0);

    const badge = document.getElementById('app-cart-badge');

    if (badge) badge.textContent = total;

    const cnt = document.getElementById('cart-float-count');

    if (cnt) cnt.textContent = total;

    const dockCnt = document.getElementById('floating-dock-cart-count');

    if (dockCnt) dockCnt.textContent = total;

    

    // También actualizar badge web si está en la misma página

    const webBadge = document.getElementById('global-cart-badge');

    if (webBadge) {

        webBadge.textContent = total;

        webBadge.classList.remove('pulse');

        void webBadge.offsetWidth;

        webBadge.classList.add('pulse');

    }

}



function showCartFloatBtn() {

    const btn = document.getElementById('cart-float-btn');

    if (btn && appCart.length > 0) btn.style.display = 'flex';

}



function toggleInlineCart() {

    syncCartState();

    renderInlineCart();

    const panel = document.getElementById('inline-cart-panel');

    if (panel) panel.style.display = panel.style.display === 'none' ? 'block' : 'none';

}



function renderInlineCart() {

    syncCartState();

    const container = document.getElementById('inline-cart-items');

    if (!container) return;

    if (appCart.length === 0) {

        container.innerHTML = '<p style="text-align:center;color:#94a3b8;font-size:0.8rem;padding:10px;">El carrito está vacío</p>';

        const el = document.getElementById('inline-cart-total');

        if (el) el.textContent = '0.00 €';

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

    syncCartState();

    if (!appCart[idx]) return;

    appCart[idx].qty += delta;

    if (appCart[idx].qty <= 0) appCart.splice(idx, 1);

    localStorage.setItem('cudi_cart', JSON.stringify(appCart));

    

    if (typeof globalCart !== 'undefined') {

        globalCart = [...appCart];

        if (typeof renderCartUI === 'function') renderCartUI();

    }

    

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

    const inlinePanel = document.getElementById('inline-cart-panel');

    if (inlinePanel) inlinePanel.style.display = 'none';



    const iaWrap = document.querySelector('.in-app-ia-wrapper');

    if (iaWrap) iaWrap.style.display = 'none';



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

            if (typeof globalCart !== 'undefined') {

                globalCart = [];

                if (typeof renderCartUI === 'function') renderCartUI();

            }

            updateCartBadge();

            renderInlineCart();

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

    const iaWrap = document.querySelector('.in-app-ia-wrapper');

    if (iaWrap) iaWrap.style.display = 'block';

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

    if (id === 'checkout-modal') {

        const iaWrap = document.querySelector('.in-app-ia-wrapper');

        if (iaWrap) iaWrap.style.display = 'block';

    }

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

// ==========================

// IA TRIAGE & CLINICAL PREDICTIVE (AVANZADO)

// ==========================

let currentTriageScenarioKey = 'calor';

let collarLedActive = false;

let gpsRouteVisible = true;

let isLostModeActive = false;



function startAIAnalysisAnimated() {

    const banner = document.getElementById('ia-integrated-btn');

    const mainBtn = document.getElementById('ai-main-analysis-btn');

    const btnText = document.getElementById('ai-btn-text');

    const btnIcon = document.getElementById('ai-btn-icon');

    const ticker = document.getElementById('ai-sentinel-ticker');

    const tickerText = document.getElementById('ai-ticker-text');

    const tickerIcon = document.getElementById('ai-ticker-icon');



    // Activar estado de escaneo en el banner y botón

    if (banner) banner.classList.add('scanning');

    if (mainBtn) mainBtn.classList.add('analyzing');

    if (btnText) btnText.textContent = 'Analizando Bio-Constantes...';

    if (btnIcon) {

        btnIcon.className = 'fa-solid fa-circle-notch fa-spin';

        btnIcon.style.color = '#38bdf8';

    }



    // Ticker interactivo paso a paso

    if (tickerText) tickerText.textContent = '⚡ [1/3] Sincronizando ECG y variabilidad cardiaca (VFC)...';

    if (tickerIcon) tickerIcon.className = 'fa-solid fa-heart-pulse fa-beat';



    setTimeout(() => {

        if (tickerText) tickerText.textContent = '🔬 [2/3] Mapeando cortisol dérmico y sensor térmico...';

        if (tickerIcon) tickerIcon.className = 'fa-solid fa-temperature-arrow-up fa-beat';

    }, 600);



    setTimeout(() => {

        if (tickerText) tickerText.textContent = '🧠 [3/3] Algoritmo Bio-Neural V4 evaluando estado clínico...';

        if (tickerIcon) tickerIcon.className = 'fa-solid fa-brain fa-beat';

    }, 1300);



    // Efecto de barrido secuencial en los metric cards

    const cards = document.querySelectorAll('.metric-card');

    let delay = 100;

    

    cards.forEach((card) => {

        setTimeout(() => {

            card.classList.add('ai-scanning-glow');

        }, delay);

        

        setTimeout(() => {

            card.classList.remove('ai-scanning-glow');

        }, delay + 600);

        delay += 250; 

    });



    // Abrir pantalla de triaje y renderizar el caso clínico seleccionado

    setTimeout(() => {

        if (banner) banner.classList.remove('scanning');

        if (mainBtn) mainBtn.classList.remove('analyzing');

        if (btnText) btnText.textContent = 'Simular Triaje Clínico con IA';

        if (btnIcon) {

            btnIcon.className = 'fa-solid fa-bolt';

            btnIcon.style.color = '#f59e0b';

        }

        if (tickerText) tickerText.textContent = 'Smart Collar vinculado • Telemetría estable';

        if (tickerIcon) tickerIcon.className = 'fa-solid fa-wave-pulse';



        selectTriageScenario(currentTriageScenarioKey || 'calor');

    }, 2000);

}



let ecgAnimationId = null;

let petEscaped = false;



function initTriageECGCanvas(scenarioKey) {

    const canvas = document.getElementById('triage-ecg-canvas');

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;



    if (ecgAnimationId) cancelAnimationFrame(ecgAnimationId);



    let offset = 0;

    const width = canvas.width;

    const height = canvas.height;

    const midY = height / 2;



    const speed = scenarioKey === 'calor' ? 3.6 : (scenarioKey === 'letargo' ? 1.2 : 2.4);

    const spikeHeight = scenarioKey === 'calor' ? 22 : (scenarioKey === 'letargo' ? 8 : 17);



    function draw() {

        ctx.fillStyle = 'rgba(2, 6, 23, 0.28)';

        ctx.fillRect(0, 0, width, height);



        // Grid médico

        ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';

        ctx.lineWidth = 0.5;

        for (let x = 0; x < width; x += 15) {

            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();

        }

        for (let y = 0; y < height; y += 12) {

            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();

        }



        // Trazado de señal

        ctx.strokeStyle = scenarioKey === 'calor' ? '#ef4444' : (scenarioKey === 'estres' ? '#f59e0b' : '#38bdf8');

        ctx.shadowColor = ctx.strokeStyle;

        ctx.shadowBlur = 8;

        ctx.lineWidth = 2;

        ctx.beginPath();



        for (let x = 0; x < width; x++) {

            const phase = (x + offset) % 85;

            let y = midY;



            if (phase > 15 && phase < 23) {

                y -= 4 * Math.sin((phase - 15) / 8 * Math.PI);

            } else if (phase >= 27 && phase <= 29) {

                y += 4;

            } else if (phase > 29 && phase < 35) {

                y -= spikeHeight;

            } else if (phase >= 35 && phase <= 38) {

                y += 6;

            } else if (phase > 46 && phase < 58) {

                y -= 6 * Math.sin((phase - 46) / 12 * Math.PI);

            }



            if (x === 0) ctx.moveTo(x, y);

            else ctx.lineTo(x, y);

        }

        ctx.stroke();

        ctx.shadowBlur = 0;



        offset += speed;

        ecgAnimationId = requestAnimationFrame(draw);

    }



    draw();

}



function selectTriageScenario(scenarioKey) {

    currentTriageScenarioKey = scenarioKey;

    const data = IA_SCENARIOS[scenarioKey];

    if (!data) return;



    // Actualizar chips visuales en el modal

    ['calor', 'estres', 'letargo', 'sueno', 'metab'].forEach(k => {

        const chip = document.getElementById(`chip-scen-${k}`);

        if (chip) {

            chip.classList.toggle('active', k === scenarioKey);

        }

    });



    const alertScreen = document.getElementById('alert-screen');

    if (alertScreen) {

        alertScreen.style.display = 'flex';



        // Iniciar trazado Holter animado

        initTriageECGCanvas(scenarioKey);



        // Animación de barra de escaneo

        const bar = document.getElementById('ai-scan-bar');

        const scanStatus = document.getElementById('triage-scan-status');

        if (bar) {

            bar.style.width = '15%';

            if (scanStatus) scanStatus.textContent = 'Analizando constantes vitales...';

            setTimeout(() => { 

                bar.style.width = '70%'; 

                if (scanStatus) scanStatus.textContent = 'Cruzando con gemelo basal...';

            }, 250);

            setTimeout(() => { 

                bar.style.width = '100%'; 

                if (scanStatus) scanStatus.textContent = 'Diagnóstico Bio-Neural Concluido';

            }, 500);

        }



        // Severidad y medidor

        const badge = document.getElementById('triage-severity-badge');

        const sevBar = document.getElementById('triage-severity-bar');

        if (badge) {

            badge.textContent = data.severityLabel;

            badge.style.color = data.severityColor;

            badge.style.background = data.severityScore >= 75 ? '#fee2e2' : (data.severityScore >= 50 ? '#fef3c7' : '#dcfce7');

        }

        if (sevBar) {

            sevBar.style.width = '0%';

            setTimeout(() => {

                sevBar.style.width = `${data.severityScore}%`;

            }, 80);

            sevBar.style.background = data.severityScore >= 75 ? 'linear-gradient(90deg, #f59e0b, #ef4444)' : 

                                      (data.severityScore >= 50 ? 'linear-gradient(90deg, #3b82f6, #f59e0b)' : 

                                      'linear-gradient(90deg, #38bdf8, #10b981)');

        }



        // Tabla de biomarcadores

        const bBody = document.getElementById('triage-biomarkers-body');

        if (bBody) {

            bBody.innerHTML = data.biomarkers.map(b => `

                <tr>

                    <td class="b-label">${b.name}</td>

                    <td class="b-val" style="color:${b.color};">${b.val}</td>

                    <td class="b-dev" style="color:${b.color};">${b.dev}</td>

                </tr>

            `).join('');

        }



        // Conclusión y protocolo

        const diagTitle = document.getElementById('triage-diag-title');

        const diagDesc = document.getElementById('triage-diag-desc');

        if (diagTitle) diagTitle.innerHTML = `<i class="fa-solid fa-stethoscope"></i> ${data.diagTitle}`;

        if (diagDesc) diagDesc.textContent = data.diagDesc;



        // Opciones de contratación / compra rápida

        const opts = document.getElementById('alert-options');

        if (opts) {

            opts.innerHTML = data.options.map(opt => `

                <div style="background:white; border-radius:14px; padding:12px; border:1px solid var(--app-border); display:flex; align-items:center; gap:10px; margin-bottom:8px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">

                    <div style="width:44px; height:44px; border-radius:10px; background:url('${opt.img}') center/cover; background-color:#e2e8f0; flex-shrink:0;"></div>

                    <div style="flex:1; min-width:0;">

                        <div style="font-weight:800; font-size:0.82rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${opt.name}</div>

                        <div style="font-size:0.7rem; color:var(--app-text-muted);">${opt.partner}</div>

                        <div style="font-size:0.72rem; color:#64748b; line-height:1.2; margin-top:2px;">${opt.desc}</div>

                    </div>

                    <div style="text-align:right; flex-shrink:0;">

                        <div style="font-weight:900; color:var(--app-primary); font-size:0.9rem; margin-bottom:3px;">${opt.price.toFixed(2)} &euro;</div>

                        <button onclick="addToCart('${opt.name}',${opt.price},'${opt.img}'); closeAlertScreen();" style="background:var(--app-primary); color:white; border:none; border-radius:8px; padding:6px 12px; font-weight:700; font-size:0.72rem; cursor:pointer;">

                            + Añadir

                        </button>

                    </div>

                </div>

            `).join('');

        }

    }

}



function closeAlertScreen() {

    const el = document.getElementById('alert-screen');

    if (el) el.style.display = 'none';

    if (ecgAnimationId) cancelAnimationFrame(ecgAnimationId);

}



// ==========================

// TELEMETRY VIEW TOGGLE (DASHBOARD)

// ==========================

function switchTelemetryView(type) {

    const btnRadar = document.getElementById('btn-telem-radar');

    const btnBpm = document.getElementById('btn-telem-bpm');

    const boxRadar = document.getElementById('box-chart-radar');

    const boxBpm = document.getElementById('box-chart-bpm');



    if (type === 'radar') {

        if (btnRadar) btnRadar.classList.add('active');

        if (btnBpm) btnBpm.classList.remove('active');

        if (boxRadar) boxRadar.style.display = 'block';

        if (boxBpm) boxBpm.style.display = 'none';

    } else {

        if (btnRadar) btnRadar.classList.remove('active');

        if (btnBpm) btnBpm.classList.add('active');

        if (boxRadar) boxRadar.style.display = 'none';

        if (boxBpm) boxBpm.style.display = 'block';

    }

}



// ==========================

// ACCIONES Y SIMULADOR DE LA PESTAÑA GPS

// ==========================

function toggleSimulateEscape() {

    const pin = document.getElementById('gps-pet-pin');

    const geofence = document.getElementById('gps-geofence-zone');

    const zoneTag = document.getElementById('gps-zone-tag');

    const zoneText = document.getElementById('gps-zone-text');

    const distText = document.getElementById('gps-dist-text');

    const speedText = document.getElementById('gps-pin-speed');

    const banner = document.getElementById('gps-alert-banner');

    const escapeMsg = document.getElementById('gps-escape-msg');

    const btnSim = document.getElementById('btn-gps-sim');

    const txtSim = document.getElementById('txt-gps-sim');

    const trail = document.getElementById('svg-walking-trail');



    petEscaped = !petEscaped;



    if (petEscaped) {

        // Mover a la mascota FUERA de la geocerca a la calle (C/ de Pallars)

        if (pin) {

            pin.style.top = '22%';

            pin.style.left = '82%';

        }

        if (trail) {

            trail.setAttribute('d', 'M 120 92 Q 210 75 328 58');

            trail.setAttribute('stroke', '#ef4444');

        }

        if (geofence) geofence.classList.add('alert');

        if (zoneTag) {

            zoneTag.className = 'gps-geofence-tag alert';

            zoneTag.innerHTML = '<i class="fa-solid fa-triangle-exclamation fa-beat"></i> ¡Fuera de Zona!';

        }

        if (zoneText) zoneText.textContent = 'C/ de Pallars 142 • En Tránsito';

        if (distText) distText.textContent = '285 m de casa';

        if (speedText) speedText.textContent = '5.4 km/h';

        if (banner) banner.style.display = 'block';

        if (escapeMsg) escapeMsg.textContent = `${petProfile.name || 'Mimi'} ha cruzado el perímetro de seguridad (150m).`;

        if (btnSim) {

            btnSim.className = 'gps-sim-btn return-sim';

        }

        if (txtSim) txtSim.textContent = 'Regresar a Zona Segura 🏡';



        try {

            const ctx = new (window.AudioContext || window.webkitAudioContext)();

            const o = ctx.createOscillator();

            o.type = 'sawtooth';

            o.frequency.value = 520;

            o.connect(ctx.destination);

            o.start();

            setTimeout(() => { o.stop(); ctx.close(); }, 250);

        } catch(e) {}



        showToast(`🚨 ¡Alerta Geocerca! ${petProfile.name || 'Tu mascota'} ha salido del área segura`);

    } else {

        // Regresar a la mascota dentro del Parc del Poblenou

        if (pin) {

            pin.style.top = '56%';

            pin.style.left = '54%';

        }

        if (trail) {

            trail.setAttribute('d', 'M 120 92 Q 165 110 216 144');

            trail.setAttribute('stroke', '#0284c7');

        }

        if (geofence) geofence.classList.remove('alert');

        if (zoneTag) {

            zoneTag.className = 'gps-geofence-tag safe';

            zoneTag.innerHTML = '<i class="fa-solid fa-shield-check"></i> En Zona Segura';

        }

        if (zoneText) zoneText.textContent = 'Parc del Poblenou • Zona Botánica';

        if (distText) distText.textContent = '45 m de casa';

        if (speedText) speedText.textContent = '0.8 km/h';

        if (banner) banner.style.display = 'none';

        if (btnSim) {

            btnSim.className = 'gps-sim-btn alert-sim';

        }

        if (txtSim) txtSim.textContent = 'Simular Salida de Zona 🏃';



        showToast(`✅ ${petProfile.name || 'Tu mascota'} ha regresado a la Zona Segura`);

    }

}



function centerGpsMap(target) {

    const pin = document.getElementById('gps-pet-pin');

    const home = document.getElementById('gps-home-marker');



    if (target === 'home' && home) {

        home.style.transform = 'translate(-50%, -50%) scale(1.35)';

        setTimeout(() => home.style.transform = 'translate(-50%, -50%) scale(1)', 350);

        showToast('Vista centrada en Casa (Hogar Poblenou) 🏠');

    } else if (pin) {

        pin.style.transform = 'translate(-50%, -50%) scale(1.35)';

        setTimeout(() => pin.style.transform = 'translate(-50%, -50%) scale(1)', 350);

        showToast(`Vista centrada en ${petProfile.name || 'Mimi'} (Precisión ±1.2m) 🎯`);

    }

}



function toggleGpsRoute() {

    gpsRouteVisible = !gpsRouteVisible;

    const trail = document.getElementById('svg-walking-trail');

    const btn = document.getElementById('btn-toggle-route');

    if (trail) trail.style.display = gpsRouteVisible ? 'block' : 'none';

    if (btn) btn.classList.toggle('active', gpsRouteVisible);

    showToast(gpsRouteVisible ? 'Rastro de paseo activado 📍' : 'Rastro oculto');

}



function triggerCollarSound() {

    const wave = document.getElementById('sound-wave-ping');

    if (wave) {

        wave.style.display = 'block';

        setTimeout(() => wave.style.display = 'none', 1800);

    }



    try {

        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        const osc = audioCtx.createOscillator();

        const gain = audioCtx.createGain();

        osc.connect(gain);

        gain.connect(audioCtx.destination);

        osc.frequency.value = 880;

        gain.gain.value = 0.12;

        osc.start();

        setTimeout(() => { osc.stop(); audioCtx.close(); }, 350);

    } catch(e) {}



    showToast('🔔 Emitiendo tono acústico de 85dB en el collar...');

}



function toggleCollarLED() {

    collarLedActive = !collarLedActive;

    const halo = document.getElementById('collar-led-halo');

    const txt = document.getElementById('txt-collar-led');

    const btn = document.getElementById('btn-collar-led');



    if (halo) halo.style.display = collarLedActive ? 'block' : 'none';

    if (txt) txt.textContent = collarLedActive ? 'LED Encendido' : 'Luz Nocturna';

    if (btn) {

        btn.style.background = collarLedActive ? '#fef3c7' : 'white';

        btn.style.borderColor = collarLedActive ? '#f59e0b' : 'var(--app-border)';

    }



    showToast(collarLedActive ? '💡 LED de seguridad nocturno activado' : 'LED apagado');

}



function triggerLostMode() {

    isLostModeActive = !isLostModeActive;

    const zoneTag = document.getElementById('gps-zone-tag');

    const txt = document.getElementById('txt-lost-mode');

    const btn = document.getElementById('btn-lost-mode');



    if (zoneTag) {

        if (isLostModeActive) {

            zoneTag.className = 'gps-geofence-tag alert';

            zoneTag.innerHTML = '<i class="fa-solid fa-satellite-dish fa-beat"></i> MODO PÉRDIDA';

            if (txt) txt.textContent = 'Desactivar Modo';

            if (btn) btn.style.background = '#fee2e2';

        } else {

            zoneTag.className = 'gps-geofence-tag safe';

            zoneTag.innerHTML = '<i class="fa-solid fa-shield-check"></i> En Zona Segura';

            if (txt) txt.textContent = 'Modo Pérdida';

            if (btn) btn.style.background = '';

        }

    }

    showToast(isLostModeActive ? '🚨 MODO PÉRDIDA: GNSS a 1 seg + Red Vecinos Notificada' : 'Modo búsqueda desactivado');

}



function adjustGeofence() {

    const currentRadius = prompt('Ajustar radio de la Zona Segura (metros):', '150');

    if (currentRadius && !isNaN(currentRadius)) {

        const zone = document.getElementById('gps-geofence-zone');

        if (zone) {

            const size = Math.max(90, Math.min(240, parseInt(currentRadius)));

            zone.style.width = `${size}px`;

            zone.style.height = `${size}px`;

        }

        showToast(`🛡️ Radio de Zona Segura configurado en ${currentRadius}m`);

    }

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

        position: fixed; bottom: 85px; left: 50%; transform: translateX(-50%);

        background: #0f172a; color: white; padding: 10px 18px; border-radius: 50px;

        font-size: 0.78rem; font-weight: 700; z-index: 9999; white-space: nowrap;

        box-shadow: 0 8px 25px rgba(0,0,0,0.3); animation: fadeIn 0.3s ease;

    `;



    const phone = document.querySelector('.mobile-screen');

    if (phone) phone.appendChild(toast);

    else document.body.appendChild(toast);



    setTimeout(() => toast.remove(), 2500);

}



// ==========================

// IN-APP CHAT (RE-INTEGRACION UNIFICADA CON MOTOR BIO-NEURAL Y SINCRONIZACIÓN WEB <-> DEMO)

// ==========================

function renderInAppSyncedHistory() {

    const body = document.getElementById('in-app-ia-body');

    if (!body) return;



    const pName = (petProfile && petProfile.name) ? petProfile.name : 'Luna';

    const pBreed = (petProfile && petProfile.breed) ? petProfile.breed : 'Husky Siberiano';

    const pBpm = (petProfile && petProfile.bpm) ? petProfile.bpm : ((petProfile && petProfile.type === 'gato') ? 138 : 74);



    const inAppIaName = document.getElementById('in-app-ia-pet-name');

    if (inAppIaName) inAppIaName.textContent = pName;

    const inAppIaAvatar = document.getElementById('in-app-ia-pet-avatar');

    if (inAppIaAvatar && petProfile && petProfile.photo) {

        inAppIaAvatar.src = petProfile.photo;

    }



    let history = [];

    if (typeof CudiAI !== 'undefined' && Array.isArray(CudiAI.history) && CudiAI.history.length > 0) {

        history = CudiAI.history;

    } else {

        try {

            const raw = sessionStorage.getItem('cudi_ai_chat_history');

            if (raw) history = JSON.parse(raw) || [];

        } catch (e) {}

    }



    body.innerHTML = '';



    // Mensaje inicial contextualizado

    const welcome = document.createElement('div');

    welcome.className = 'ia-msg-bubble';

    welcome.innerHTML = `<div class="ai-source-badge" style="margin-bottom:5px; font-size:0.65rem; color:#0284c7; font-weight:800;"><i class="fa-solid fa-microchip"></i> IA Neuronal CUDI &bull; Sincronizada</div>¡Hola! Monitorizo en vivo a <strong>${pName}</strong> (${pBreed}, <strong>${pBpm} bpm</strong>). Conozco sus métricas, ubicación y tu <strong>🛒 Cesta de Compras</strong>. ¿En qué te ayudo?`;

    body.appendChild(welcome);



    history.forEach((item, idx) => {

        const role = item.role || item.sender || 'ia';

        const content = item.text || item.html || '';

        if (!content) return;

        // Evitar duplicar el saludo inicial largo del panel web en el primer mensaje

        if (idx === 0 && role === 'ia' && content.includes('Asistente Veterinario y Guardián Bio-Neural CUDI')) return;

        const div = document.createElement('div');

        div.className = role === 'user' ? 'user-msg-bubble' : 'ia-msg-bubble';

        div.innerHTML = content;

        body.appendChild(div);

    });



    setTimeout(() => {

        body.scrollTop = body.scrollHeight;

    }, 30);

}



function toggleInAppChat() {

    const panel = document.getElementById('in-app-ia-panel');

    if (panel) {

        const isHidden = panel.style.display === 'none' || !panel.style.display;

        panel.style.display = isHidden ? 'flex' : 'none';

        if (isHidden) {

            renderInAppSyncedHistory();

            if (typeof CudiAI !== 'undefined' && !CudiAI.llmReady && !CudiAI.isDownloadingLLM && typeof navigator !== 'undefined' && navigator.gpu) {

                CudiAI.initLocalLLM(CudiAI.selectedModel);

            }

            setTimeout(() => {

                const inp = document.getElementById('in-app-ia-input');

                if (inp) inp.focus();

            }, 100);

        }

    }

}



function clearInAppChatHistory() {

    if (typeof CudiAI !== 'undefined' && typeof CudiAI.clearChat === 'function') {

        CudiAI.clearChat();

    } else {

        sessionStorage.removeItem('cudi_ai_chat_history');

    }

    renderInAppSyncedHistory();

}



function sendInAppQuickPrompt(promptText) {

    const panel = document.getElementById('in-app-ia-panel');

    if (panel && (panel.style.display === 'none' || !panel.style.display)) {

        panel.style.display = 'flex';

        renderInAppSyncedHistory();

    }

    const input = document.getElementById('in-app-ia-input');

    if (input) {

        input.value = promptText;

        sendInAppChatMessage();

    }

}



function handleInAppChatEnter(e) {

    if (e.key === 'Enter') sendInAppChatMessage();

}



async function sendInAppChatMessage() {

    const input = document.getElementById('in-app-ia-input');

    if (!input) return;

    const msg = input.value.trim();

    if (!msg || typeof CudiAI === 'undefined') return;



    input.value = '';

    addInAppMsg('user', msg);



    // Sincronizar con historial global de CudiAI (para que se vea también en el panel Web)

    if (typeof CudiAI.addMessage === 'function') {

        CudiAI.addMessage('user', msg);

    }



    // Indicador de escritura

    const body = document.getElementById('in-app-ia-body');

    const typingId = 'typing-' + Date.now();

    const typingDiv = document.createElement('div');

    typingDiv.id = typingId;

    typingDiv.className = 'typing-mini';

    typingDiv.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> CUDI analizando biometría y cesta...';

    body.appendChild(typingDiv);

    body.scrollTop = body.scrollHeight;



    // Obtener respuesta del motor central unificado

    const response = await CudiAI.generateResponse(msg);



    // Limpiar typing y añadir respuesta

    if (document.getElementById(typingId)) {

        document.getElementById(typingId).remove();

    }

    addInAppMsg('ia', response);



    // Sincronizar respuesta con el panel Web de CudiAI

    if (typeof CudiAI.addMessage === 'function') {

        CudiAI.addMessage('ia', response);

    }

}



function addInAppMsg(sender, text) {

    const body = document.getElementById('in-app-ia-body');

    if (!body) return;

    

    const div = document.createElement('div');

    div.className = sender === 'user' ? 'user-msg-bubble' : 'ia-msg-bubble';

    div.innerHTML = text;

    body.appendChild(div);

    

    div.style.opacity = '0';

    div.style.transform = 'translateY(8px)';

    div.style.transition = 'all 0.25s ease';

    

    setTimeout(() => {

        div.style.opacity = '1';

        div.style.transform = 'translateY(0)';

        body.scrollTop = body.scrollHeight;

    }, 40);

}





// ==========================

// INICIALIZACION Y SINCRONIZACIÓN UNIFICADA WEB <-> DEMO

// ==========================

document.addEventListener('DOMContentLoaded', () => {

    initPetType();

    syncCartState();

    updateCartBadge();



    const urlParams = new URLSearchParams(window.location.search);

    const requestedTab = urlParams.get('tab');

    const forceDashboard = urlParams.get('screen') === 'dashboard' || urlParams.get('autoplay') === 'true' || Boolean(requestedTab);



    // 1. Verificar siempre si ya existe un perfil activo en la aplicación web

    const hasActiveSession = loadSavedProfile();



    if (!hasActiveSession) {

        if (forceDashboard) {

            appDemoAutoFill();

            proceedToDashboard();

        } else {

            showOnboardingScreen();

        }

    }



    if (requestedTab) {

        setTimeout(() => {

            if (requestedTab === 'triage') {

                if (typeof startAIAnalysisAnimated === 'function') startAIAnalysisAnimated();

            } else if (typeof switchTab === 'function') {

                const navEl = document.querySelector(`.nav-item[onclick*="'${requestedTab}'"]`);

                switchTab(requestedTab, navEl);

            }

            const phoneEl = document.querySelector('.phone-mockup, .app-container');

            if (phoneEl) phoneEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

        }, 350);

    }

});



// Escuchar cambios de sesión desde el modal web o pestañas externas para mantener Demo y Web 100% unificados

window.addEventListener('cudi:sessionChanged', (e) => {

    if (e.detail && e.detail.name) {

        loadSavedProfile();

    } else if (e.detail === null) {

        showOnboardingScreen();

    }

});



window.addEventListener('cudi:aiHistoryUpdated', () => {

    const panel = document.getElementById('in-app-ia-panel');

    if (panel && panel.style.display === 'flex') {

        renderInAppSyncedHistory();

    }

});



window.addEventListener('cudi:cartUpdated', () => {

    updateCartBadge();

    if (document.getElementById('inline-cart-panel')?.classList.contains('active')) {

        renderInlineCart();

    }

});



window.addEventListener('storage', (e) => {

    if (e.key === 'cudi_pet_profile' || e.key === 'cudi_session_active') {

        const active = loadSavedProfile();

        if (!active) {

            showOnboardingScreen();

        }

    } else if (e.key === 'cudi_cart') {

        updateCartBadge();

    }

});


