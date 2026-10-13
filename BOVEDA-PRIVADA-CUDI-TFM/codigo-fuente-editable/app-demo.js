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
    "hardware": {
        "label": "Dispositivos & Hardware IoT",
        "icon": "fa-satellite-dish",
        "color": "#e0f2fe",
        "iconColor": "#0284c7",
        "products": [
            {
                "name": "Smart Collar CUDI GPS Ultra",
                "price": 149.0,
                "img": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
                "partner": "CUDI Hardware Labs",
                "desc": "Collar biométrico de titanio y polímero médico con GPS multibanda L1+L5 a 10 Hz, sensor PP..."
            },
            {
                "name": "Smart Collar CUDI Feline Nano",
                "price": 129.0,
                "img": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
                "partner": "CUDI Feline Tech",
                "desc": "El localizador y monitor de salud más ligero del mundo para gatos (22g) con cierre de libe..."
            },
            {
                "name": "Base de Carga Rápida & Nodo Baliza CUDI",
                "price": 39.0,
                "img": "cudi-smart-collar-geolocalizacion-gps.png",
                "partner": "CUDI Hardware Labs",
                "desc": "Estación de acoplamiento magnético con baliza BLE 5.4 integrada que establece la zona segu..."
            },
            {
                "name": "Arnés Ergonómico CUDI Explorer con Integración Bio",
                "price": 64.0,
                "img": "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=800&q=80",
                "partner": "Adventure Paws Lab",
                "desc": "Arnés antitirones con bolsillo blindado para módulo Smart Collar, costuras reflectantes 3M..."
            },
            {
                "name": "Pack de Balizas Perimetrales CUDI Smart Beacons (3 uds)",
                "price": 49.0,
                "img": "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80",
                "partner": "CUDI Hardware Labs",
                "desc": "Microbalizas adhesivas para delimitar zonas prohibidas en casa (cocina, piscina, plantas t..."
            },
            {
                "name": "Sensor Pod BioTemp para Almohadillas & Piel CUDI",
                "price": 34.0,
                "img": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=800&q=80",
                "partner": "BioSense Vet Tech",
                "desc": "Dispositivo infrarrojo de contacto suave para medir la inflamación podal y temperatura art..."
            },
            {
                "name": "Dispensador Inteligente CUDI BioFeeder con IA",
                "price": 119.0,
                "img": "https://images.unsplash.com/photo-1561948955-570b270e7c36?auto=format&fit=crop&w=800&q=80",
                "partner": "SmartPet Robotics",
                "desc": "Tolva automatizada con báscula de precisión que ajusta los gramos de pienso exactos en fun..."
            },
            {
                "name": "Fuente Hidratante CUDI PureWater con Sensor de Ingesta",
                "price": 59.0,
                "img": "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80",
                "partner": "AquaPet BioSystems",
                "desc": "Fuente de acero quirúrgico 304 con filtrado cuádruple UVC y conteo de mililitros bebidos r..."
            },
            {
                "name": "Correa Amortiguadora CUDI SmartLead con Medidor de Tracción",
                "price": 38.0,
                "img": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80",
                "partner": "Adventure Paws Lab",
                "desc": "Correa de adiestramiento no tirón con dinamómetro Bluetooth que registra los picos de reac..."
            },
            {
                "name": "Colchón Ortopédico CUDI SleepSense con Malla de Presión",
                "price": 139.0,
                "img": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80",
                "partner": "VetRest Technologies",
                "desc": "Cama viscoelástica de grado médico con matriz de sensores piezoeléctricos para monitorizar..."
            },
            {
                "name": "Clip LED Inteligente CUDI NightSafety RGB",
                "price": 19.5,
                "img": "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=800&q=80",
                "partner": "CUDI Hardware Labs",
                "desc": "Faro de seguridad programable desde la app que se activa automáticamente al anochecer o cu..."
            },
            {
                "name": "Fijación ISOFIX con Sensor de Tensión CUDI CarSafe",
                "price": 29.9,
                "img": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80",
                "partner": "SafeTravel Pets",
                "desc": "Conector directo al sistema ISOFIX del vehículo certificado para crash-test con sensor que..."
            },
            {
                "name": "Bálsamo Regenerador & Botín Transpirable CUDI PawCare",
                "price": 24.5,
                "img": "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80",
                "partner": "BioSense Vet Tech",
                "desc": "Cera biológica reparadora de almohadillas con cera de abeja, caléndula y botines de trekki..."
            },
            {
                "name": "Chapa Digital de Identificación CUDI BioID NFC + QR",
                "price": 14.9,
                "img": "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=800&q=80",
                "partner": "CUDI Security Cloud",
                "desc": "Chapa de resina epoxi indestructible con chip NFC y código QR dinámico que muestra histori..."
            },
            {
                "name": "Repetidor Satelital CUDI WildRange para Rutas Sin Cobertura",
                "price": 89.0,
                "img": "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=800&q=80",
                "partner": "Adventure Paws Lab",
                "desc": "Transmisor LoRa de bolsillo que conecta directamente tu smartphone con el collar de tu per..."
            }
        ]
    },
    "nutricion": {
        "label": "Nutrición & Dieta Biológica",
        "icon": "fa-bowl-food",
        "color": "#dcfce7",
        "iconColor": "#15803d",
        "products": [
            {
                "name": "EcoPet Organic - Dieta BARF Biológica",
                "price": 45.0,
                "img": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80",
                "partner": "EcoPet Biologics",
                "desc": "Menús crudos biológicamente apropiados formulados con carne de pasto, vísceras nobles, ver..."
            },
            {
                "name": "PureBites Clinic - Pienso Hipoalergénico Monoproteico",
                "price": 38.5,
                "img": "https://images.unsplash.com/photo-1571566882372-1598d88abd90?auto=format&fit=crop&w=800&q=80",
                "partner": "PureBites Clinical",
                "desc": "Receta clínica de caballo y boniato cocinada a baja temperatura para animales con intolera..."
            },
            {
                "name": "Vitality Mix - Complejo Articular & Inmunológico Dual",
                "price": 24.99,
                "img": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
                "partner": "BioSense Vet Tech",
                "desc": "Polvo nutracéutico con Glucosamina pura, Condroitina marina, MSM, cúrcuma biodisponible y ..."
            },
            {
                "name": "OceanPure - Aceite de Salmón Salvaje & Krill Antártico",
                "price": 21.5,
                "img": "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=800&q=80",
                "partner": "EcoPet Biologics",
                "desc": "Aceite puro de prensado en frío con concentrado de fosfolípidos EPA y DHA para salud cardi..."
            },
            {
                "name": "DigestShield - Probióticos Multicepa con Prebióticos FOS",
                "price": 26.0,
                "img": "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
                "partner": "BioSense Vet Tech",
                "desc": "Sobres monodosis con 10.000 millones de UFC viables de Enterococcus faecium y Lactobacillu..."
            },
            {
                "name": "Dentapaws Sticks - Cuidado Dental con Espirulina & Ascophyllum",
                "price": 16.5,
                "img": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
                "partner": "EcoPet Biologics",
                "desc": "Snacks dentales masticables en forma de cruz que limpian mecánicamente la placa bacteriana..."
            },
            {
                "name": "CalmPaws Chews - Bocaditos Antiestrés con L-Teanina & Ashwagandha",
                "price": 22.9,
                "img": "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=800&q=80",
                "partner": "BioSense Vet Tech",
                "desc": "Bocaditos masticables semihúmedos diseñados para tormentas, fuegos artificiales, visitas a..."
            },
            {
                "name": "BioBroth - Caldo de Huesos Orgánico de Cocción Lenta (24h)",
                "price": 14.5,
                "img": "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80",
                "partner": "EcoPet Biologics",
                "desc": "Elixir reconstituyente hervido a fuego lento durante 24 horas repleto de colágeno nativo, ..."
            },
            {
                "name": "NephroProtect - Quelante de Fósforo & Soporte Renal Avanzado",
                "price": 29.5,
                "img": "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=800&q=80",
                "partner": "PureBites Clinical",
                "desc": "Polvo insípido quelante intestinal de fósforo enriquecido con quitosano y astrágalo para r..."
            },
            {
                "name": "TrainBites - Premios Liofilizados 100% Corazón de Ternera",
                "price": 12.9,
                "img": "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80",
                "partner": "EcoPet Biologics",
                "desc": "Snacks liofilizados al vacío en frío que conservan todo el aroma y sabor natural para sesi..."
            },
            {
                "name": "LactoCudi - Leche de Inicio con Calostro & DHA para Cachorros",
                "price": 28.0,
                "img": "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?auto=format&fit=crop&w=800&q=80",
                "partner": "PureBites Clinical",
                "desc": "Sustituto lácteo en polvo homogeneizado con calostro bovino rico en inmunoglobulinas IgG y..."
            },
            {
                "name": "HepatoCare - Cardo Mariano (Silimarina 80%) & SAMe",
                "price": 31.0,
                "img": "dietas-personalizadas-longevidad-mascotas.png",
                "partner": "BioSense Vet Tech",
                "desc": "Cápsulas gastroprotegidas con S-Adenosilmetionina (SAMe) y extracto fitosomal de Silimarin..."
            },
            {
                "name": "CocoPet - Aceite de Coco Virgen Extra Ecológico Prensado Frío",
                "price": 13.9,
                "img": "https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?auto=format&fit=crop&w=800&q=80",
                "partner": "EcoPet Biologics",
                "desc": "Aceite de coco 100% puro rico en ácido láurico y MCT. Puede ingerirse para soporte metaból..."
            },
            {
                "name": "FiberGlow - Cáscara de Psyllium Ecológica & Prebióticos",
                "price": 15.5,
                "img": "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&w=800&q=80",
                "partner": "PureBites Clinical",
                "desc": "Fibra soluble formadora de mucílago que regula tanto el estreñimiento como las heces bland..."
            },
            {
                "name": "SuperBerry Bites - Snack Antioxidante de Arándanos Rojos & Pavo",
                "price": 11.5,
                "img": "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=800&q=80",
                "partner": "EcoPet Biologics",
                "desc": "Galletitas semihúmedas con alto contenido de proantocianidinas (PACs) de arándano rojo que..."
            }
        ]
    },
    "clinica": {
        "label": "Veterinaria & Salud 24/7",
        "icon": "fa-stethoscope",
        "color": "#fee2e2",
        "iconColor": "#ef4444",
        "products": [
            {
                "name": "VetHome CUDI - Urgencias Veterinarias a Domicilio 24/7",
                "price": 75.0,
                "img": "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80",
                "partner": "Red Clínicas Partners CUDI",
                "desc": "Unidad móvil veterinaria con ecografía portátil y analítica sanguínea instantánea enviada ..."
            },
            {
                "name": "MediPet Express - Teleconsulta Veterinaria Inmediata con Triaje IA",
                "price": 35.0,
                "img": "triaje-ia-veterinario-urgencias.png",
                "partner": "TeleVet Specialists",
                "desc": "Videoconsulta de alta definición con veterinario colegiado en menos de 3 minutos con recet..."
            },
            {
                "name": "Hospital Clínico Dual - Chequeo Preventivo Integral Anual",
                "price": 60.0,
                "img": "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80",
                "partner": "Hospital Veterinario Central",
                "desc": "Revisión física exhaustiva que incluye analítica de sangre completa, bioquímica de 16 pará..."
            },
            {
                "name": "Pack Vacunación Oficial & Pasaporte Europeo de Mascota",
                "price": 42.0,
                "img": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
                "partner": "Red Clínicas Partners CUDI",
                "desc": "Emisión del Pasaporte Oficial de la Unión Europea para animales de compañía con vacuna ant..."
            },
            {
                "name": "Profilaxis Dental por Ultrasonidos & Pulido con Flúor",
                "price": 95.0,
                "img": "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&w=800&q=80",
                "partner": "Hospital Veterinario Central",
                "desc": "Limpieza profunda subgingival con escarificador ultrasónico y pulido de esmalte para preve..."
            },
            {
                "name": "Esterilización / Castración por Laparoscopia Mínimamente Invasiva",
                "price": 180.0,
                "img": "https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?auto=format&fit=crop&w=800&q=80",
                "partner": "Hospital Veterinario Central",
                "desc": "Intervención quirúrgica con óptica de alta resolución a través de dos microincisiones de 5..."
            },
            {
                "name": "Test Genético CUDI BioDNA - Salud, Razas & Longevidad",
                "price": 89.0,
                "img": "https://images.unsplash.com/photo-1506755855567-92ff770e8d00?auto=format&fit=crop&w=800&q=80",
                "partner": "BioSense Vet Tech",
                "desc": "Hisopo bucal no invasivo que analiza más de 250 variantes de enfermedades hereditarias, se..."
            },
            {
                "name": "Ecografía Abdominal Completa con Especialista de Imagen",
                "price": 68.0,
                "img": "https://images.unsplash.com/photo-1536590158209-e9d615d525e4?auto=format&fit=crop&w=800&q=80",
                "partner": "Hospital Veterinario Central",
                "desc": "Estudio ecográfico abdominal de 8 órganos con sondas de microconvex y lineal de alta frecu..."
            },
            {
                "name": "Sesión de Fisioterapia & Hidroterapia Subacuática Canina",
                "price": 50.0,
                "img": "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=800&q=80",
                "partner": "Red Clínicas Partners CUDI",
                "desc": "Cinta subacuática con agua termal climatizada, láser terapéutico clase IV y magnetoterapia..."
            },
            {
                "name": "Consulta Clínica de Etología & Modificación de Conducta",
                "price": 70.0,
                "img": "comportamiento-canino-barcelona.png",
                "partner": "Red Clínicas Partners CUDI",
                "desc": "Evaluación por veterinario especialista en etología clínica para tratar agresividad, miedo..."
            },
            {
                "name": "Perfil Bioquímico & Hematológico Integral de Laboratorio",
                "price": 48.0,
                "img": "https://images.unsplash.com/photo-1516750484197-6b28d10c91ea?auto=format&fit=crop&w=800&q=80",
                "partner": "Hospital Veterinario Central",
                "desc": "Analítica en laboratorio acreditado con hemograma completo de 5 poblaciones, bioquímica ge..."
            },
            {
                "name": "Ecocardiograma Color & Electrocardiograma Digital",
                "price": 85.0,
                "img": "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=800&q=80",
                "partner": "Hospital Veterinario Central",
                "desc": "Estudio morfológico y hemodinámico de las cavidades cardíacas para diagnosticar soplos, va..."
            },
            {
                "name": "Cribado Rápido Serológico de Leishmania, Filaria & Borrelia (4DX)",
                "price": 32.0,
                "img": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=800&q=80",
                "partner": "Red Clínicas Partners CUDI",
                "desc": "Test de sangre en 8 minutos para descartar enfermedades transmitidas por mosquitos (filari..."
            },
            {
                "name": "Estudio Radiográfico Digital Directo de Alta Definición (2 Proyecciones)",
                "price": 55.0,
                "img": "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?auto=format&fit=crop&w=800&q=80",
                "partner": "Hospital Veterinario Central",
                "desc": "Placas radiológicas digitales con revelado instantáneo para diagnóstico de fracturas, disp..."
            },
            {
                "name": "Consulta Oncológica & Biopsia / Citología de Bultos con Informe",
                "price": 65.0,
                "img": "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=800&q=80",
                "partner": "Hospital Veterinario Central",
                "desc": "Punción-aspiración con aguja fina (PAAF) de nódulos cutáneos y masas subcutáneas analizada..."
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
                "img": "perro-urbano-barcelona-paseo.png",
                "partner": "Urban Pet Walkers",
                "desc": "Paseo individualizado de 60 minutos con monitorización de ruta GPS en vivo, reporte de hid..."
            },
            {
                "name": "Urban Pet Walkers - Paseo de Estimulación Olfativa & Cognitiva",
                "price": 18.0,
                "img": "paseadores-perros-actividad-fisica.png",
                "partner": "Urban Pet Walkers",
                "desc": "Paseo diseñado por educadores enfocado en juegos de rastro, calma y discriminación de olor..."
            },
            {
                "name": "NannyPets 24/7 - Cuidador Certificado a Domicilio (Día & Noche)",
                "price": 32.0,
                "img": "reduccion-ansiedad-separacion-perros.png",
                "partner": "NannyPets Care",
                "desc": "Cuidado respetuoso en tu propia casa sin el trauma de hoteles caninos o jaulas para estanc..."
            },
            {
                "name": "CampPaws - Guardería de Día en Finca Rústica Vallada con Transporte",
                "price": 28.0,
                "img": "guarderia-canina-confianza.png",
                "partner": "Urban Pet Walkers",
                "desc": "Día completo de juegos en praderas valladas con piscina para perros, zonas de sombra y fur..."
            },
            {
                "name": "FeliCare - Cuidadora a Domicilio Exclusiva para Gatos (ISFM)",
                "price": 19.0,
                "img": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
                "partner": "NannyPets Care",
                "desc": "Visitas a domicilio respetuosas con los ritmos felinos: limpieza de areneros, cambio de ag..."
            },
            {
                "name": "Paseo Matinal Express Higiénico (30 min)",
                "price": 9.5,
                "img": "rutas-paseos-seguros-barcelona.png",
                "partner": "Urban Pet Walkers",
                "desc": "Paseo funcional a primera hora de la mañana para necesidades fisiológicas y estiramiento a..."
            },
            {
                "name": "Sesión de Adiestramiento Canino en Positivo a Domicilio",
                "price": 45.0,
                "img": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=800&q=80",
                "partner": "Urban Pet Walkers",
                "desc": "Clase particular de 60 minutos con educador canino profesional para pasear sin tirones, ll..."
            },
            {
                "name": "PetTaxi CUDI - Vehículo Adaptado con Jaulas Crash-Tested",
                "price": 22.0,
                "img": "https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?auto=format&fit=crop&w=800&q=80",
                "partner": "SafeTravel Pets",
                "desc": "Traslado puerta a puerta de animales al veterinario, peluquería o aeropuerto en furgonetas..."
            },
            {
                "name": "Pack Senderismo Canino CUDI Trail (4 Horas en Naturaleza)",
                "price": 38.0,
                "img": "senderismo-familiar-mascota-naturaleza.png",
                "partner": "Urban Pet Walkers",
                "desc": "Excursión de medio día por senderos de montaña seguros con paradas en ríos, agua fresca y ..."
            },
            {
                "name": "HomeStay CUDI - Alojamiento en Casa de Familia Certificada (24h)",
                "price": 30.0,
                "img": "https://images.unsplash.com/photo-1520315342629-6ea920342047?auto=format&fit=crop&w=800&q=80",
                "partner": "NannyPets Care",
                "desc": "Tu mascota duerme en el hogar cálido de una familia amante de los animales inspeccionada p..."
            },
            {
                "name": "GentlePaws - Paseo Terapéutico para Perros Abuelos & Senior",
                "price": 13.0,
                "img": "perro-senior-calidad-vida-longevidad.png",
                "partner": "Urban Pet Walkers",
                "desc": "Paseo a paso muy pausado sobre césped suave con arnés de asistencia trasera para perros co..."
            },
            {
                "name": "PuppyWalk - Sesión Grupal de Socialización Temprana para Cachorros",
                "price": 20.0,
                "img": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80",
                "partner": "Urban Pet Walkers",
                "desc": "Encuentros en recinto higienizado para cachorros con pauta vacunal al día con estímulos so..."
            },
            {
                "name": "DuoWalk - Paseo Conjunto para Familias con 2 Perros",
                "price": 21.0,
                "img": "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=800&q=80",
                "partner": "Urban Pet Walkers",
                "desc": "Paseo de 60 minutos para dos perros del mismo hogar con precio especial unificado y contro..."
            },
            {
                "name": "Canicross Runner - Entrenamiento Deportivo & Carrera Guiada",
                "price": 22.0,
                "img": "pareja-corriendo-mascota-activa.png",
                "partner": "Urban Pet Walkers",
                "desc": "Salida de running continuo de 5 a 8 km con paseador corredor federado para perros con exce..."
            },
            {
                "name": "FlashWalk - Paseo Urgente en Menos de 45 Minutos por Imprevisto",
                "price": 19.5,
                "img": "prevencion-golpes-calor-paseos.png",
                "partner": "Urban Pet Walkers",
                "desc": "Te ha surgido un viaje imprevisto, una reunión que se alarga o una urgencia médica: un pas..."
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
                "img": "seguros-gastos-veterinarios-perros-gatos.png",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Cobertura veterinaria de urgencias y accidentes de hasta 1.500€/año con libre elección de ..."
            },
            {
                "name": "Global Pet Protect - Cobertura Total de Enfermedad & Cirugía",
                "price": 34.0,
                "img": "https://images.unsplash.com/photo-1504595403659-9088ce801e29?auto=format&fit=crop&w=800&q=80",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "El seguro más completo de España: hasta 3.500€/año tanto por accidentes como por enfermeda..."
            },
            {
                "name": "SafeHome MultiPet - Póliza Familiar para Hogares Multiespecie",
                "price": 28.0,
                "img": "familia-multiespecie-paz-mental.png",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Póliza combinada que asegura a perros y gatos del mismo hogar bajo una única cuota reducid..."
            },
            {
                "name": "CUDI LegalGuard - Seguro de Responsabilidad Civil Oficial (Ley Bienestar)",
                "price": 2.9,
                "img": "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=800&q=80",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Póliza obligatoria de RC de hasta 350.000€ adaptada a la Ley de Bienestar Animal con certi..."
            },
            {
                "name": "CUDI TravelSafe - Seguro Médico Internacional para Viajes & Vacaciones",
                "price": 15.0,
                "img": "rutas-pet-friendly-barcelona.png",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Cobertura veterinaria temporal en cualquier país de la UE y Reino Unido con repatriación d..."
            },
            {
                "name": "SeniorPaws Protect - Póliza Especial para Mascotas de +9 Años",
                "price": 39.0,
                "img": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "El único seguro que no excluye a tu mascota por edad avanzada. Cobertura de enfermedades c..."
            },
            {
                "name": "DentalCare Plus - Cobertura Específica de Limpiezas & Cirugías Orales",
                "price": 8.5,
                "img": "https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?auto=format&fit=crop&w=800&q=80",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Módulo complementario que cubre limpiezas dentales anuales, extracciones complejas de muel..."
            },
            {
                "name": "WildRescue - Cobertura de Búsqueda, Rescate & Recompensa por Pérdida",
                "price": 4.5,
                "img": "mascota-sana-feliz.png",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Cubre los costes de unidades de rescate canino, drones térmicos, publicidad y recompensa l..."
            },
            {
                "name": "CatShield Total - Póliza de Salud Diseñada para las Patologías del Gato",
                "price": 21.0,
                "img": "gato-explorando-seguro-collar-gps.png",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Cubre las enfermedades típicas felinas: obstrucciones urinarias (FLUTD), fallo renal cróni..."
            },
            {
                "name": "FarewellCare - Cobertura de Eutanasia Digna, Incineración & Apoyo al Duelo",
                "price": 3.5,
                "img": "mejora-descanso-salud-felina.png",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Garantiza una despedida serena en tu hogar con eutanasia compasiva sin dolor, incineración..."
            },
            {
                "name": "ProBreed Safe - Seguro Especializado para Razas de Manejo Especial",
                "price": 6.9,
                "img": "bienestar-integral-perros-gatos.png",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Póliza con cobertura ampliada de 500.000€ exigida para gatos catalogados de manejo especia..."
            },
            {
                "name": "FieldGuard - Seguro para Perros de Caza, Pastoreo & Trabajo de Campo",
                "price": 16.5,
                "img": "https://images.unsplash.com/photo-1597633425046-08f5110420b5?auto=format&fit=crop&w=800&q=80",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Cobertura especializada contra ataques de jabalíes, mordeduras de víboras, espigas clavada..."
            },
            {
                "name": "PharmaPaws - Póliza de Cobertura Continua de Medicamentos Crónicos",
                "price": 12.0,
                "img": "https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=800&q=80",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Reembolso del 80% en facturas de medicamentos de prescripción para tratamientos crónicos (..."
            },
            {
                "name": "SecondOpinion Global - Acceso a Especialistas Universitarios Internacionales",
                "price": 7.0,
                "img": "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=800&q=80",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Revisión del caso médico de tu mascota por catedráticos diplomados europeos (ECVIM, ECVS, ..."
            },
            {
                "name": "HolisticVet Care - Seguro de Terapias Complementarias, Fisio & Acupuntura",
                "price": 11.5,
                "img": "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?auto=format&fit=crop&w=800&q=80",
                "partner": "CUDI Seguros & Reaseguros",
                "desc": "Cubre sesiones de acupuntura veterinaria, quiropráctica animal, hidroterapia y rehabilitac..."
            }
        ]
    },
    "estetica": {
        "label": "Estética, Baño & Spa",
        "icon": "fa-bath",
        "color": "#f3e8ff",
        "iconColor": "#7e22ce",
        "products": [
            {
                "name": "Grooming Master - Baño Terapéutico con Ozonoterapia & Masaje",
                "price": 42.0,
                "img": "estetica-canina-bienestar.png",
                "partner": "Bubbles & Paws Spa",
                "desc": "Hidromasaje con microburbujas de ozono purificante que oxigena la piel, elimina olores en ..."
            },
            {
                "name": "ZenPet Spa - Deslanado Técnico en Profundidad & Baño Antiprurito",
                "price": 38.0,
                "img": "https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?auto=format&fit=crop&w=800&q=80",
                "partner": "ZenPet Grooming",
                "desc": "Elimina hasta el 90% del pelo muerto de muda en mantos dobles (Golden, Husky, Pastor Alemá..."
            },
            {
                "name": "Bubbles & Paws - Peluquería Felina Especializada (Cero Sedación)",
                "price": 46.0,
                "img": "https://images.unsplash.com/photo-1586042091284-bd35c8c1d917?auto=format&fit=crop&w=800&q=80",
                "partner": "Bubbles & Paws Spa",
                "desc": "Tratamiento de nudos, corte a tijera y baño en seco o con toallas tibias en sala libre de ..."
            },
            {
                "name": "Stripping Tradicional a Mano para Perros de Pelo Duro",
                "price": 55.0,
                "img": "https://images.unsplash.com/photo-1554456854-55a089fd4cb2?auto=format&fit=crop&w=800&q=80",
                "partner": "ZenPet Grooming",
                "desc": "Técnica artesanal de renovación de manto muerto a mano con dedales de goma para Teckels, S..."
            },
            {
                "name": "PawCure Spa - Limado Suave de Uñas con Torno & Masaje de Almohadillas",
                "price": 16.0,
                "img": "https://images.unsplash.com/photo-1503777119540-ce54b422baff?auto=format&fit=crop&w=800&q=80",
                "partner": "Bubbles & Paws Spa",
                "desc": "Olvídate del doloroso alicate: limado con dremel diamantado ultrasilencioso sin cortar la ..."
            },
            {
                "name": "Haute Coiffure - Corte Integral a Tijera Personalizado por Raza",
                "price": 50.0,
                "img": "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80",
                "partner": "ZenPet Grooming",
                "desc": "Esculpido a mano con tijeras curvas japonesas adaptado a la morfología de Caniches, Bichon..."
            },
            {
                "name": "SilkPaws - Tratamiento de Keratina & Aceite de Argán Puro de Marruecos",
                "price": 25.0,
                "img": "https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=800&q=80",
                "partner": "Bubbles & Paws Spa",
                "desc": "Batería de aminoácidos y lípidos para mantos quebradizos, secos o castigados que regenera ..."
            },
            {
                "name": "OtiClean Spa - Higiene Auricular Profunda & Eliminación de Vello Ótico",
                "price": 14.5,
                "img": "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=800&q=80",
                "partner": "Bubbles & Paws Spa",
                "desc": "Limpieza del canal auditivo externo con limpiador enzimático vegetal y depilado suave de p..."
            },
            {
                "name": "HydroZen - Baño de Hidromasaje con Sal Marina & Aromaterapia Canina",
                "price": 48.0,
                "img": "https://images.unsplash.com/photo-1587402092301-725e37c70fd8?auto=format&fit=crop&w=800&q=80",
                "partner": "ZenPet Grooming",
                "desc": "Inmersión en agua templada con sales ricas en magnesio del Mar Muerto y vapores de lavanda..."
            },
            {
                "name": "ShieldBath - Baño Antiparasitario Natural con Neem & Citronela",
                "price": 32.0,
                "img": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
                "partner": "Bubbles & Paws Spa",
                "desc": "Eliminación activa de pulgas, garrapatas y ácaros con extracto de Margosa (Neem) ecológico..."
            },
            {
                "name": "PawsMassage - Masaje Terapéutico Miofascial & Puntos Gatillo (45 min)",
                "price": 35.0,
                "img": "https://images.unsplash.com/photo-1560743641-3914f2c45636?auto=format&fit=crop&w=800&q=80",
                "partner": "ZenPet Grooming",
                "desc": "Terapia manual sobre fascias y grupos musculares de cuello, escápulas y lumbares para perr..."
            },
            {
                "name": "CatClaws Care - Recorte & Limado Amable de Uñas Felinas",
                "price": 12.0,
                "img": "https://images.unsplash.com/photo-1518288774672-b94e808873ff?auto=format&fit=crop&w=800&q=80",
                "partner": "Bubbles & Paws Spa",
                "desc": "Recorte indoloro de la punta afilada transparente de las 18 uñas del gato sin tocar la mat..."
            },
            {
                "name": "WhiteGlow - Tratamiento Óptico Antiamarilleo para Mantos Blancos",
                "price": 36.0,
                "img": "https://images.unsplash.com/photo-1588774069410-84ae30757c8e?auto=format&fit=crop&w=800&q=80",
                "partner": "ZenPet Grooming",
                "desc": "Champú azul óptico con pigmentos violetas botánicos que neutralizan el tono óxido y amaril..."
            },
            {
                "name": "LuxeComb - Sesión de Cepillado Profundo & Apertura de Nudos sin Cortar",
                "price": 29.0,
                "img": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80",
                "partner": "Bubbles & Paws Spa",
                "desc": "Desenredado paciente mechón a mechón con spray bifásico de siliconas vegetales solubles pa..."
            },
            {
                "name": "PuppySpa - Bautismo de Agua & Primera Experiencia Positiva de Baño",
                "price": 24.0,
                "img": "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80",
                "partner": "ZenPet Grooming",
                "desc": "Sesión lúdica para cachorros (3 a 7 meses) donde conocen el agua tibia, el ruido del secad..."
            }
        ]
    }
};

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

