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
                "id": "SKU-COLLAR-GPS-01",
                "slug": "collar-cudi-gps-ultra",
                "name": "Smart Collar CUDI GPS Ultra",
                "shortTitle": "Collar CUDI GPS Ultra",
                "category": "Hardware & IoT",
                "categorySlug": "hardware",
                "categoryLabel": "Hardware & Telemetría",
                "price": 149,
                "rating": 5,
                "reviewsCount": 248,
                "species": "both",
                "partner": "CUDI Hardware Labs",
                "partnerRole": "Laboratorio Oficial CUDI",
                "badge": "Buque Insignia",
                "badgeIcon": "fa-satellite-dish",
                "badgeColor": "#0284c7",
                "img": "cudi-collar-hardware-hero.jpg",
                "gallery": [
                    "cudi-collar-hardware-hero.jpg",
                    "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Collar biométrico de titanio y polímero médico con GPS multibanda L1+L5 a 10 Hz, sensor PPG dual, electrocardiograma continuo de 1 derivación y resistencia IP68.",
                "fullDesc": "El Smart Collar CUDI Ultra representa el estándar más avanzado en telemetría animal. Equipado con antenas cerámicas satelitales multibanda L1/L5 y conectividad NB-IoT / LTE-M sin puntos ciegos. Sus sensores dérmicos registran pulso, saturación de oxígeno, temperatura basal en continuo y envían alertas al gemelo digital antes de que los síntomas sean clínicamente observables.",
                "specs": {
                    "Dimensiones & Peso": "38g • Ajustable para cuellos de 20cm a 65cm",
                    "Conectividad": "GPS GNSS L1/L5, LTE-M, NB-IoT, BLE 5.3, WiFi Geofencing",
                    "Autonomía & Carga": "14 a 21 días (modo dinámico) • Carga magnética rápida en 45 min",
                    "Certificación": "IP68 sumergible a 3 metros • Grado militar MIL-STD-810H",
                    "Sensores Médicos": "PPG fotopletismografía, ECG 1 derivación, termistor clínico ±0.1°C"
                },
                "expertVerdict": "Dr. Fernando Morales (Cardiología Veterinaria): 'La precisión del trazo de ritmo cardíaco a 120 Hz en reposo nos ha permitido diagnosticar arritmias tempranas en perros senior antes de cuadros de síncope.'",
                "userReviews": [
                    {
                        "user": "Marta & Thor",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "Thor se escapó persiguiendo un conejo en la sierra y la brújula en tiempo real me llevó exactamente hasta él en 4 minutos. Imprescindible."
                    },
                    {
                        "user": "Carlos R.",
                        "city": "Barcelona",
                        "rating": 5,
                        "comment": "La batería dura semanas y los reportes de sueño en la app son una maravilla."
                    }
                ],
                "url": "producto-collar-cudi-gps-ultra.html",
                "priceFormatted": "149.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-collar-cudi-gps-ultra.html",
                "studyTitle": "Evaluación Clínica del Impacto de Smart Collar CUDI GPS Ultra en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.99106",
                "studyJournal": "Journal of Veterinary Medical Devices & Biotelemetry",
                "studyAuthors": "Dr. Fernando Morales (PhD, Cardiología Veterinaria), Dra. Elena Puig (Bioingeniería Animal)",
                "studyInstitution": "CUDI Bio-IoT Clinical Laboratory & Hospital Clínico Veterinario",
                "studySourceName": "PubMed / JAVMA Index",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+gps+telemetry+heart+rate",
                "studyMetricLabel": "Reducción de Picos Anómalos ECG",
                "studyMetricVal": "-84.2%",
                "studyChartType": "line",
                "studyChartLabel": "Frecuencia Cardíaca Basal (bpm)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4",
                    "Semana 6",
                    "Semana 8"
                ],
                "studyChartControl": [
                    118,
                    114,
                    110,
                    108,
                    105,
                    102
                ],
                "studyChartCudi": [
                    118,
                    98,
                    86,
                    78,
                    74,
                    72
                ]
            },
            {
                "id": "SKU-COLLAR-GPS-02",
                "slug": "collar-cudi-feline-nano",
                "name": "Smart Collar CUDI Feline Nano",
                "shortTitle": "Collar Feline Nano",
                "category": "Hardware & IoT",
                "categorySlug": "hardware",
                "categoryLabel": "Hardware & Telemetría",
                "price": 129,
                "rating": 4.9,
                "reviewsCount": 182,
                "species": "cat",
                "partner": "CUDI Feline Tech",
                "partnerRole": "Especialistas en Felinos",
                "badge": "Especial Gatos",
                "badgeIcon": "fa-cat",
                "badgeColor": "#8b5cf6",
                "img": "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "El localizador y monitor de salud más ligero del mundo para gatos (22g) con cierre de liberación de seguridad antipánico y geocercas para chalets y jardines.",
                "fullDesc": "Diseñado anatómicamente para felinos de interior y exterior con hebilla patentada QuickRelease que se libera automáticamente ante un enganchón superior a 1.2 kg de tracción. Registra saltos, rascado compulsivo, ciclos circadianos y telemetría térmica.",
                "specs": {
                    "Peso Ultra-ligero": "22 gramos • Ancho de cinta 12mm de tacto seda",
                    "Seguridad": "Cierre magnético de desprendimiento de emergencia calibrado",
                    "Autonomía": "10 días de batería con geovalla WiFi inteligente",
                    "Resistencia": "IP67 resistente a lluvia intensa y barro",
                    "Detección de Estrés": "Algoritmo FeliCalm de frecuencia de lamido y vigilia"
                },
                "expertVerdict": "Dra. Sofía Alarcón (Medicina Felina ISFM): 'El peso de 22 gramos no compromete la biomecánica cervical del gato y permite monitorizar signos de cistitis idiopática con semanas de antelación.'",
                "userReviews": [
                    {
                        "user": "Clara G.",
                        "city": "Valencia",
                        "rating": 5,
                        "comment": "Mi gata Kira pasea por el jardín y ahora sé al milímetro si cruza la valla vecina."
                    },
                    {
                        "user": "Álvaro N.",
                        "city": "Sevilla",
                        "rating": 5,
                        "comment": "El cierre antipánico me da una tranquilidad infinita."
                    }
                ],
                "url": "producto-collar-cudi-feline-nano.html",
                "priceFormatted": "129.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-collar-cudi-feline-nano.html",
                "studyTitle": "Evaluación Clínica del Impacto de Smart Collar CUDI Feline Nano en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.75279",
                "studyJournal": "Journal of Veterinary Medical Devices & Biotelemetry",
                "studyAuthors": "Dr. Fernando Morales (PhD, Cardiología Veterinaria), Dra. Elena Puig (Bioingeniería Animal)",
                "studyInstitution": "CUDI Bio-IoT Clinical Laboratory & Hospital Clínico Veterinario",
                "studySourceName": "PubMed / JAVMA Index",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+gps+telemetry+heart+rate",
                "studyMetricLabel": "Reducción de Picos Anómalos ECG",
                "studyMetricVal": "-84.2%",
                "studyChartType": "line",
                "studyChartLabel": "Frecuencia Cardíaca Basal (bpm)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4",
                    "Semana 6",
                    "Semana 8"
                ],
                "studyChartControl": [
                    118,
                    114,
                    110,
                    108,
                    105,
                    102
                ],
                "studyChartCudi": [
                    118,
                    98,
                    86,
                    78,
                    74,
                    72
                ]
            },
            {
                "id": "SKU-COLLAR-GPS-03",
                "slug": "cudi-base-dock-pro",
                "name": "Base de Carga Rápida & Nodo Baliza CUDI",
                "shortTitle": "Base Dock & Baliza CUDI",
                "category": "Hardware & IoT",
                "categorySlug": "hardware",
                "categoryLabel": "Hardware & Telemetría",
                "price": 39,
                "rating": 4.8,
                "reviewsCount": 94,
                "species": "both",
                "partner": "CUDI Hardware Labs",
                "partnerRole": "Oficial CUDI",
                "badge": "Accesorio Clave",
                "badgeIcon": "fa-bolt",
                "badgeColor": "#f59e0b",
                "img": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Estación de acoplamiento magnético con baliza BLE 5.4 integrada que establece la zona segura del hogar sin consumir batería celular del collar.",
                "fullDesc": "La base dock no solo recarga el collar al 100% en menos de 40 minutos sino que actúa como nodo perimetral de ultra bajo consumo en casa, liberando la radio LTE y extendiendo la vida del dispositivo hasta 30 días.",
                "specs": {
                    "Alimentación": "USB-C Power Delivery 20W",
                    "Radiobaliza": "Bluetooth 5.4 Long Range (alcance 80m en interiores)",
                    "Leds de Estado": "Anillo RGB ambiental regulable para noche",
                    "Fijación": "Base pesada de aluminio antideslizante"
                },
                "expertVerdict": "Ing. Marc Vidal (IoT Lead): 'Crea un perímetro milimétrico de presencia en el hogar sin falsas alarmas de GPS en interiores.'",
                "userReviews": [
                    {
                        "user": "Elena B.",
                        "city": "Bilbao",
                        "rating": 5,
                        "comment": "Queda genial en el salón y carga el collar volando."
                    }
                ],
                "url": "producto-cudi-base-dock-pro.html",
                "priceFormatted": "39.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-cudi-base-dock-pro.html",
                "studyTitle": "Evaluación Clínica del Impacto de Base de Carga Rápida & Nodo Baliza CUDI en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.51780",
                "studyJournal": "Journal of Veterinary Medical Devices & Biotelemetry",
                "studyAuthors": "Dr. Fernando Morales (PhD, Cardiología Veterinaria), Dra. Elena Puig (Bioingeniería Animal)",
                "studyInstitution": "CUDI Bio-IoT Clinical Laboratory & Hospital Clínico Veterinario",
                "studySourceName": "PubMed / JAVMA Index",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+gps+telemetry+heart+rate",
                "studyMetricLabel": "Reducción de Picos Anómalos ECG",
                "studyMetricVal": "-84.2%",
                "studyChartType": "line",
                "studyChartLabel": "Frecuencia Cardíaca Basal (bpm)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4",
                    "Semana 6",
                    "Semana 8"
                ],
                "studyChartControl": [
                    118,
                    114,
                    110,
                    108,
                    105,
                    102
                ],
                "studyChartCudi": [
                    118,
                    98,
                    86,
                    78,
                    74,
                    72
                ]
            },
            {
                "id": "SKU-COLLAR-GPS-04",
                "slug": "arnes-tactico-cudi-explorer",
                "name": "Arnés Ergonómico CUDI Explorer con Integración Bio",
                "shortTitle": "Arnés CUDI Explorer",
                "category": "Hardware & IoT",
                "categorySlug": "hardware",
                "categoryLabel": "Hardware & Telemetría",
                "price": 64,
                "rating": 4.9,
                "reviewsCount": 115,
                "species": "dog",
                "partner": "Adventure Paws Lab",
                "partnerRole": "Equipamiento de Montaña",
                "badge": "Aventura Segura",
                "badgeIcon": "fa-mountain",
                "badgeColor": "#059669",
                "img": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Arnés antitirones con bolsillo blindado para módulo Smart Collar, costuras reflectantes 3M y tejido ripstop transpirable de alta tracción.",
                "fullDesc": "Diseñado en colaboración con unidades caninas de rescate. Distribuye la fuerza de tracción equitativamente sobre el esternón protegiendo la columna y tráquea de tu perro mientras mantiene la antena GPS orientada al cenit satelital para máxima recepción.",
                "specs": {
                    "Material": "Cordura 1000D balística con malla interna transpirable",
                    "Herrajes": "Hebillas de aleación de zinc de 250 kg de rotura",
                    "Alineación GPS": "Soporte dorsal antivibración para el Smart Collar CUDI",
                    "Reflectividad": "Ribetes 3M Scotchlite visibles a 300 metros"
                },
                "expertVerdict": "Fisioterapeuta Canino Roberto M.: 'Elimina por completo el impacto cervical y permite a perros de alta energía correr sin interferir en su cadencia articular.'",
                "userReviews": [
                    {
                        "user": "Guillermo P.",
                        "city": "Granada",
                        "rating": 5,
                        "comment": "Ideal para rutas en Sierra Nevada. No roza las axilas y el collar queda fijado a la perfección."
                    }
                ],
                "url": "producto-arnes-tactico-cudi-explorer.html",
                "priceFormatted": "64.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-arnes-tactico-cudi-explorer.html",
                "studyTitle": "Evaluación Clínica del Impacto de Arnés Ergonómico CUDI Explorer con Integración Bio en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.29844",
                "studyJournal": "Journal of Veterinary Medical Devices & Biotelemetry",
                "studyAuthors": "Dr. Fernando Morales (PhD, Cardiología Veterinaria), Dra. Elena Puig (Bioingeniería Animal)",
                "studyInstitution": "CUDI Bio-IoT Clinical Laboratory & Hospital Clínico Veterinario",
                "studySourceName": "PubMed / JAVMA Index",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+gps+telemetry+heart+rate",
                "studyMetricLabel": "Reducción de Picos Anómalos ECG",
                "studyMetricVal": "-84.2%",
                "studyChartType": "line",
                "studyChartLabel": "Frecuencia Cardíaca Basal (bpm)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4",
                    "Semana 6",
                    "Semana 8"
                ],
                "studyChartControl": [
                    118,
                    114,
                    110,
                    108,
                    105,
                    102
                ],
                "studyChartCudi": [
                    118,
                    98,
                    86,
                    78,
                    74,
                    72
                ]
            },
            {
                "id": "SKU-COLLAR-GPS-05",
                "slug": "cudi-beacons-multizone",
                "name": "Pack de Balizas Perimetrales CUDI Smart Beacons (3 uds)",
                "shortTitle": "Smart Beacons Multizona (x3)",
                "category": "Hardware & IoT",
                "categorySlug": "hardware",
                "categoryLabel": "Hardware & Telemetría",
                "price": 49,
                "rating": 4.8,
                "reviewsCount": 73,
                "species": "both",
                "partner": "CUDI Hardware Labs",
                "partnerRole": "Hardware Oficial CUDI",
                "badge": "Delimitación Hogar",
                "badgeIcon": "fa-bullseye",
                "badgeColor": "#6366f1",
                "img": "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Microbalizas adhesivas para delimitar zonas prohibidas en casa (cocina, piscina, plantas tóxicas) con alertas vibratorias amigables al collar.",
                "fullDesc": "Crea micro-geocercas de precisión de hasta 30 cm de resolución en el interior de tu vivienda. Si la mascota se aproxima a la baliza de la piscina o a un armario con comida, el collar emite un leve tono audible o vibración suave preventiva.",
                "specs": {
                    "Radio de Acción": "Ajustable desde 0.5 metros hasta 12 metros",
                    "Pila": "Pila de botón CR2477 con 2 años de vida continua",
                    "Montaje": "Adhesivo 3M ultra resistente o fijación con tornillo",
                    "Protocolo": "BLE Mesh con conexión directa a la app CUDI"
                },
                "expertVerdict": "Etóloga Marina Soler: 'Una herramienta de educación positiva no aversiva insustituible para evitar accidentes domésticos con cachorros.'",
                "userReviews": [
                    {
                        "user": "Beatriz T.",
                        "city": "Alicante",
                        "rating": 5,
                        "comment": "Se acabó que mi perro se acerque a la piscina cuando no estamos delante."
                    }
                ],
                "url": "producto-cudi-beacons-multizone.html",
                "priceFormatted": "49.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-cudi-beacons-multizone.html",
                "studyTitle": "Evaluación Clínica del Impacto de Pack de Balizas Perimetrales CUDI Smart Beacons (3 uds) en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.32474",
                "studyJournal": "Journal of Veterinary Medical Devices & Biotelemetry",
                "studyAuthors": "Dr. Fernando Morales (PhD, Cardiología Veterinaria), Dra. Elena Puig (Bioingeniería Animal)",
                "studyInstitution": "CUDI Bio-IoT Clinical Laboratory & Hospital Clínico Veterinario",
                "studySourceName": "PubMed / JAVMA Index",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+gps+telemetry+heart+rate",
                "studyMetricLabel": "Reducción de Picos Anómalos ECG",
                "studyMetricVal": "-84.2%",
                "studyChartType": "line",
                "studyChartLabel": "Frecuencia Cardíaca Basal (bpm)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4",
                    "Semana 6",
                    "Semana 8"
                ],
                "studyChartControl": [
                    118,
                    114,
                    110,
                    108,
                    105,
                    102
                ],
                "studyChartCudi": [
                    118,
                    98,
                    86,
                    78,
                    74,
                    72
                ]
            },
            {
                "id": "SKU-COLLAR-GPS-06",
                "slug": "cudi-termometro-biometrico-pata",
                "name": "Sensor Pod BioTemp para Almohadillas & Piel CUDI",
                "shortTitle": "Pod Térmico BioTemp",
                "category": "Hardware & IoT",
                "categorySlug": "hardware",
                "categoryLabel": "Hardware & Telemetría",
                "price": 34,
                "rating": 4.7,
                "reviewsCount": 61,
                "species": "both",
                "partner": "BioSense Vet Tech",
                "partnerRole": "Investigación Biomédica",
                "badge": "Diagnóstico",
                "badgeIcon": "fa-temperature-high",
                "badgeColor": "#ef4444",
                "img": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Dispositivo infrarrojo de contacto suave para medir la inflamación podal y temperatura articular antes y después del ejercicio intenso.",
                "fullDesc": "Sincronizado vía NFC instantáneo con la app CUDI. Evalúa en 3 segundos si el asfalto ha provocado quemaduras dérmicas o si existe asimetría de temperatura entre patas indicativa de sobrecarga o artritis incipiente.",
                "specs": {
                    "Sensor": "Sensor termopila infrarroja médica ±0.05°C",
                    "Lectura": "Instantánea en 1.5 segundos con confirmación háptica",
                    "Sincronización": "NFC instantáneo y Bluetooth Smart",
                    "Batería": "Recargable USB-C para 1.000 lecturas"
                },
                "expertVerdict": "Dra. Carmen Valls (Traumatología): 'Nos alerta de tendinitis canina en fase preclínica simplemente por gradiente térmico.'",
                "userReviews": [
                    {
                        "user": "Javier L.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "En verano en Madrid es oro puro para saber si el pavimento quema sus almohadillas."
                    }
                ],
                "url": "producto-cudi-termometro-biometrico-pata.html",
                "priceFormatted": "34.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-cudi-termometro-biometrico-pata.html",
                "studyTitle": "Evaluación Clínica del Impacto de Sensor Pod BioTemp para Almohadillas & Piel CUDI en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.93371",
                "studyJournal": "Journal of Veterinary Medical Devices & Biotelemetry",
                "studyAuthors": "Dr. Fernando Morales (PhD, Cardiología Veterinaria), Dra. Elena Puig (Bioingeniería Animal)",
                "studyInstitution": "CUDI Bio-IoT Clinical Laboratory & Hospital Clínico Veterinario",
                "studySourceName": "PubMed / JAVMA Index",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+gps+telemetry+heart+rate",
                "studyMetricLabel": "Reducción de Picos Anómalos ECG",
                "studyMetricVal": "-84.2%",
                "studyChartType": "line",
                "studyChartLabel": "Frecuencia Cardíaca Basal (bpm)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4",
                    "Semana 6",
                    "Semana 8"
                ],
                "studyChartControl": [
                    118,
                    114,
                    110,
                    108,
                    105,
                    102
                ],
                "studyChartCudi": [
                    118,
                    98,
                    86,
                    78,
                    74,
                    72
                ]
            },
            {
                "id": "SKU-COLLAR-GPS-07",
                "slug": "dispensador-inteligente-cudi-feeder",
                "name": "Dispensador Inteligente CUDI BioFeeder con IA",
                "shortTitle": "Dispensador CUDI BioFeeder",
                "category": "Hardware & IoT",
                "categorySlug": "hardware",
                "categoryLabel": "Hardware & Telemetría",
                "price": 119,
                "rating": 4.9,
                "reviewsCount": 142,
                "species": "both",
                "partner": "SmartPet Robotics",
                "partnerRole": "Domótica de Precisión",
                "badge": "Alimentación Conectada",
                "badgeIcon": "fa-bowl-food",
                "badgeColor": "#10b981",
                "img": "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Tolva automatizada con báscula de precisión que ajusta los gramos de pienso exactos en función de los pasos y calorías quemadas por el collar.",
                "fullDesc": "La sinergia definitiva: el Smart Collar CUDI mide los kilómetros y actividad diaria y comunica a la tolva la cantidad exacta de ración para mantener a tu compañero en su peso ideal, previniendo la obesidad y diabetes.",
                "specs": {
                    "Capacidad": "4.5 Litros con sellado triple desecante al vacío",
                    "Báscula": "Célula de carga de grado comercial precisión 1g",
                    "Cámara HD": "Cámara gran angular 1080p con visión nocturna y micro bidireccional",
                    "Conexión": "WiFi Dual Band 2.4/5GHz + integración CUDI App"
                },
                "expertVerdict": "Dr. Raúl Peñafiel (Nutrición Clínica): 'La regulación dinámica calórica automatizada reduce el sobrepeso un 40% en 90 días.'",
                "userReviews": [
                    {
                        "user": "Nuria S.",
                        "city": "Zaragoza",
                        "rating": 5,
                        "comment": "Si mi border collie corrió 10 km le da su porción exacta de recuperación. Una genialidad."
                    }
                ],
                "url": "producto-dispensador-inteligente-cudi-feeder.html",
                "priceFormatted": "119.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-dispensador-inteligente-cudi-feeder.html",
                "studyTitle": "Evaluación Clínica del Impacto de Dispensador Inteligente CUDI BioFeeder con IA en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.16246",
                "studyJournal": "Journal of Veterinary Medical Devices & Biotelemetry",
                "studyAuthors": "Dr. Fernando Morales (PhD, Cardiología Veterinaria), Dra. Elena Puig (Bioingeniería Animal)",
                "studyInstitution": "CUDI Bio-IoT Clinical Laboratory & Hospital Clínico Veterinario",
                "studySourceName": "PubMed / JAVMA Index",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+gps+telemetry+heart+rate",
                "studyMetricLabel": "Reducción de Picos Anómalos ECG",
                "studyMetricVal": "-84.2%",
                "studyChartType": "line",
                "studyChartLabel": "Frecuencia Cardíaca Basal (bpm)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4",
                    "Semana 6",
                    "Semana 8"
                ],
                "studyChartControl": [
                    118,
                    114,
                    110,
                    108,
                    105,
                    102
                ],
                "studyChartCudi": [
                    118,
                    98,
                    86,
                    78,
                    74,
                    72
                ]
            },
            {
                "id": "SKU-COLLAR-GPS-08",
                "slug": "fuente-agua-cudi-purewater",
                "name": "Fuente Hidratante CUDI PureWater con Sensor de Ingesta",
                "shortTitle": "Fuente CUDI PureWater",
                "category": "Hardware & IoT",
                "categorySlug": "hardware",
                "categoryLabel": "Hardware & Telemetría",
                "price": 59,
                "rating": 4.8,
                "reviewsCount": 110,
                "species": "both",
                "partner": "AquaPet BioSystems",
                "partnerRole": "Salud Renal Animal",
                "badge": "Salud Renal",
                "badgeIcon": "fa-droplet",
                "badgeColor": "#06b6d4",
                "img": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Fuente de acero quirúrgico 304 con filtrado cuádruple UVC y conteo de mililitros bebidos registrado directamente en el gemelo digital.",
                "fullDesc": "Monitoriza la ingesta hídrica exacta de gatos y perros en mililitros. Vital para detectar precozmente fallo renal crónico felino, diabetes insípida o infecciones del tracto urinario.",
                "specs": {
                    "Capacidad": "2.5 Litros con bomba magnética ultra-silenciosa (20 dB)",
                    "Filtración": "Carbón activado de coco, resina de intercambio iónico y LED germicida UVC",
                    "Telemetría": "Sensor óptico de nivel e identificación por proximidad de collar",
                    "Higiene": "Apta para lavavajillas sin plásticos tóxicos BPA"
                },
                "expertVerdict": "Dra. Inés Gómez (Nefrología Veterinaria): 'Registrar caídas bruscas o picos de sed en gatos salva vidas frente a cálculos y daño renal.'",
                "userReviews": [
                    {
                        "user": "Teresa M.",
                        "city": "Mallorca",
                        "rating": 5,
                        "comment": "Mi persa ahora bebe el doble de agua y en la app veo cuántos ml toma al día."
                    }
                ],
                "url": "producto-fuente-agua-cudi-purewater.html",
                "priceFormatted": "59.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-fuente-agua-cudi-purewater.html",
                "studyTitle": "Evaluación Clínica del Impacto de Fuente Hidratante CUDI PureWater con Sensor de Ingesta en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.22286",
                "studyJournal": "Journal of Veterinary Medical Devices & Biotelemetry",
                "studyAuthors": "Dr. Fernando Morales (PhD, Cardiología Veterinaria), Dra. Elena Puig (Bioingeniería Animal)",
                "studyInstitution": "CUDI Bio-IoT Clinical Laboratory & Hospital Clínico Veterinario",
                "studySourceName": "PubMed / JAVMA Index",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+gps+telemetry+heart+rate",
                "studyMetricLabel": "Reducción de Picos Anómalos ECG",
                "studyMetricVal": "-84.2%",
                "studyChartType": "line",
                "studyChartLabel": "Frecuencia Cardíaca Basal (bpm)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4",
                    "Semana 6",
                    "Semana 8"
                ],
                "studyChartControl": [
                    118,
                    114,
                    110,
                    108,
                    105,
                    102
                ],
                "studyChartCudi": [
                    118,
                    98,
                    86,
                    78,
                    74,
                    72
                ]
            },
            {
                "id": "SKU-COLLAR-GPS-09",
                "slug": "correa-inteligente-cudi-lead",
                "name": "Correa Amortiguadora CUDI SmartLead con Medidor de Tracción",
                "shortTitle": "Correa SmartLead",
                "category": "Hardware & IoT",
                "categorySlug": "hardware",
                "categoryLabel": "Hardware & Telemetría",
                "price": 38,
                "rating": 4.7,
                "reviewsCount": 88,
                "species": "dog",
                "partner": "Adventure Paws Lab",
                "partnerRole": "Equipamiento de Paseo",
                "badge": "Educación Canina",
                "badgeIcon": "fa-dog",
                "badgeColor": "#f97316",
                "img": "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Correa de adiestramiento no tirón con dinamómetro Bluetooth que registra los picos de reactividad y fuerza ejercida en cada paseo.",
                "fullDesc": "Permite al educador canino y a la familia medir objetivamente la reducción de reactividad callejera con gráficas semanales de tensión Newtons/paseo.",
                "specs": {
                    "Resistencia": "Cinta elástica de polipropileno con núcleo elástico antilatigazo",
                    "Sensor": "Célula extensométrica Bluetooth de alta precisión",
                    "Longitud": "Ajustable de 1.2m a 2m con asa de control acolchada",
                    "Mosquetón": "Aluminio de aviación con cierre de rosca de seguridad"
                },
                "expertVerdict": "Educador Dani Santos: 'Ver la curva de tensión descender semana a semana motiva a los dueños y refuerza el refuerzo positivo.'",
                "userReviews": [
                    {
                        "user": "Ángel G.",
                        "city": "Toledo",
                        "rating": 5,
                        "comment": "Mi pastor belga dejó de destrozarme el hombro gracias al feedback de la app."
                    }
                ],
                "url": "producto-correa-inteligente-cudi-lead.html",
                "priceFormatted": "38.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-correa-inteligente-cudi-lead.html",
                "studyTitle": "Evaluación Clínica del Impacto de Correa Amortiguadora CUDI SmartLead con Medidor de Tracción en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.74656",
                "studyJournal": "Journal of Veterinary Medical Devices & Biotelemetry",
                "studyAuthors": "Dr. Fernando Morales (PhD, Cardiología Veterinaria), Dra. Elena Puig (Bioingeniería Animal)",
                "studyInstitution": "CUDI Bio-IoT Clinical Laboratory & Hospital Clínico Veterinario",
                "studySourceName": "PubMed / JAVMA Index",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+gps+telemetry+heart+rate",
                "studyMetricLabel": "Reducción de Picos Anómalos ECG",
                "studyMetricVal": "-84.2%",
                "studyChartType": "line",
                "studyChartLabel": "Frecuencia Cardíaca Basal (bpm)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4",
                    "Semana 6",
                    "Semana 8"
                ],
                "studyChartControl": [
                    118,
                    114,
                    110,
                    108,
                    105,
                    102
                ],
                "studyChartCudi": [
                    118,
                    98,
                    86,
                    78,
                    74,
                    72
                ]
            },
            {
                "id": "SKU-COLLAR-GPS-10",
                "slug": "cudi-cama-ortopedica-biometrica",
                "name": "Colchón Ortopédico CUDI SleepSense con Malla de Presión",
                "shortTitle": "Colchón CUDI SleepSense",
                "category": "Hardware & IoT",
                "categorySlug": "hardware",
                "categoryLabel": "Hardware & Telemetría",
                "price": 139,
                "rating": 5,
                "reviewsCount": 77,
                "species": "both",
                "partner": "VetRest Technologies",
                "partnerRole": "Descanso Terapéutico",
                "badge": "Descanso & Artrosis",
                "badgeIcon": "fa-bed",
                "badgeColor": "#3b82f6",
                "img": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Cama viscoelástica de grado médico con matriz de sensores piezoeléctricos para monitorizar sueño REM, dolor articular y cambios posturales.",
                "fullDesc": "Diseñada para perros y gatos geriátricos o en postoperatorio. Su espuma ortopédica alivia puntos de presión en cadera y codos mientras su tejido inteligente informa a tu veterinario de la calidad real de descanso.",
                "specs": {
                    "Núcleo": "Doble capa: 7cm espuma HR alta densidad + 5cm Memory Foam con gel refrigerante",
                    "Funda": "Tejido hidrófugo antibacteriano OEKO-TEX desenfundable y lavable a 60°C",
                    "Malla Sensorial": "Monitoreo cardíaco balistocardiográfico no invasivo",
                    "Tallas": "M (70x50cm), L (90x70cm), XL (120x85cm)"
                },
                "expertVerdict": "Dra. Laura Pascual (Rehabilitación Veterinaria): 'Espectacular para monitorizar la efectividad de analgésicos en pacientes con displasia de cadera.'",
                "userReviews": [
                    {
                        "user": "Cristina V.",
                        "city": "Oviedo",
                        "rating": 5,
                        "comment": "Mi labrador de 12 años se levanta sin cojear por las mañanas. Vale cada euro."
                    }
                ],
                "url": "producto-cudi-cama-ortopedica-biometrica.html",
                "priceFormatted": "139.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-cudi-cama-ortopedica-biometrica.html",
                "studyTitle": "Evaluación Clínica del Impacto de Colchón Ortopédico CUDI SleepSense con Malla de Presión en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.49584",
                "studyJournal": "Journal of Veterinary Medical Devices & Biotelemetry",
                "studyAuthors": "Dr. Fernando Morales (PhD, Cardiología Veterinaria), Dra. Elena Puig (Bioingeniería Animal)",
                "studyInstitution": "CUDI Bio-IoT Clinical Laboratory & Hospital Clínico Veterinario",
                "studySourceName": "PubMed / JAVMA Index",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+gps+telemetry+heart+rate",
                "studyMetricLabel": "Reducción de Picos Anómalos ECG",
                "studyMetricVal": "-84.2%",
                "studyChartType": "line",
                "studyChartLabel": "Frecuencia Cardíaca Basal (bpm)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4",
                    "Semana 6",
                    "Semana 8"
                ],
                "studyChartControl": [
                    118,
                    114,
                    110,
                    108,
                    105,
                    102
                ],
                "studyChartCudi": [
                    118,
                    98,
                    86,
                    78,
                    74,
                    72
                ]
            },
            {
                "id": "SKU-COLLAR-GPS-11",
                "slug": "cudi-luz-led-nocturna-smart",
                "name": "Clip LED Inteligente CUDI NightSafety RGB",
                "shortTitle": "Luz Nocturna CUDI NightSafety",
                "category": "Hardware & IoT",
                "categorySlug": "hardware",
                "categoryLabel": "Hardware & Telemetría",
                "price": 19.5,
                "rating": 4.8,
                "reviewsCount": 165,
                "species": "both",
                "partner": "CUDI Hardware Labs",
                "partnerRole": "Hardware Oficial CUDI",
                "badge": "Visibilidad 360°",
                "badgeIcon": "fa-lightbulb",
                "badgeColor": "#eab308",
                "img": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Faro de seguridad programable desde la app que se activa automáticamente al anochecer o cuando activas la búsqueda de rescate.",
                "fullDesc": "Visible a más de 500 metros en niebla o noche cerrada. Cuenta con estroboscopio de rescate que se sincroniza con el radar del smartphone.",
                "specs": {
                    "Luminosidad": "120 Lúmenes regulables desde la app en color personalizado",
                    "Batería": "30 horas de encendido continuo por carga USB-C",
                    "Peso": "Solo 14 gramos con enganche universal para collares y arneses",
                    "Sensor Lumínico": "Fotocélula que enciende la luz de forma autónoma con poca luz"
                },
                "expertVerdict": "Guía de Montaña Sergio R.: 'Elemento imprescindible para paseos nocturnos en descampados y carreteras rurales.'",
                "userReviews": [
                    {
                        "user": "Pau F.",
                        "city": "Girona",
                        "rating": 5,
                        "comment": "Desde 300 metros veo a mi perro negro como si fuera de día."
                    }
                ],
                "url": "producto-cudi-luz-led-nocturna-smart.html",
                "priceFormatted": "19.50 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-cudi-luz-led-nocturna-smart.html",
                "studyTitle": "Evaluación Clínica del Impacto de Clip LED Inteligente CUDI NightSafety RGB en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.99534",
                "studyJournal": "Journal of Veterinary Medical Devices & Biotelemetry",
                "studyAuthors": "Dr. Fernando Morales (PhD, Cardiología Veterinaria), Dra. Elena Puig (Bioingeniería Animal)",
                "studyInstitution": "CUDI Bio-IoT Clinical Laboratory & Hospital Clínico Veterinario",
                "studySourceName": "PubMed / JAVMA Index",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+gps+telemetry+heart+rate",
                "studyMetricLabel": "Reducción de Picos Anómalos ECG",
                "studyMetricVal": "-84.2%",
                "studyChartType": "line",
                "studyChartLabel": "Frecuencia Cardíaca Basal (bpm)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4",
                    "Semana 6",
                    "Semana 8"
                ],
                "studyChartControl": [
                    118,
                    114,
                    110,
                    108,
                    105,
                    102
                ],
                "studyChartCudi": [
                    118,
                    98,
                    86,
                    78,
                    74,
                    72
                ]
            },
            {
                "id": "SKU-COLLAR-GPS-12",
                "slug": "cudi-cinturon-seguridad-coche",
                "name": "Fijación ISOFIX con Sensor de Tensión CUDI CarSafe",
                "shortTitle": "Anclaje ISOFIX CUDI CarSafe",
                "category": "Hardware & IoT",
                "categorySlug": "hardware",
                "categoryLabel": "Hardware & Telemetría",
                "price": 29.9,
                "rating": 4.9,
                "reviewsCount": 98,
                "species": "dog",
                "partner": "SafeTravel Pets",
                "partnerRole": "Seguridad Vial Canina",
                "badge": "Seguridad en Coche",
                "badgeIcon": "fa-car",
                "badgeColor": "#64748b",
                "img": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Conector directo al sistema ISOFIX del vehículo certificado para crash-test con sensor que avisa si el perro se desengancha.",
                "fullDesc": "Cumple con la normativa europea de transporte de animales. Bloqueo de acero forjado y amortiguador cinético para frenazos bruscos.",
                "specs": {
                    "Anclaje": "Enganche directo ISOFIX de acero forjado",
                    "Carga de Rotura": "Homologado hasta 1.200 kg de fuerza cinética",
                    "Sensor Smart": "Avisa al móvil en caso de que el perro manipule la hebilla"
                },
                "expertVerdict": "Perito de Seguridad Vial A. Ramos: 'La única forma legal y físicamente segura de evitar que el animal salga proyectado en una colisión.'",
                "userReviews": [
                    {
                        "user": "Rubén H.",
                        "city": "Valladolid",
                        "rating": 5,
                        "comment": "Sólido como una roca, da muchísima tranquilidad viajar en autopista."
                    }
                ],
                "url": "producto-cudi-cinturon-seguridad-coche.html",
                "priceFormatted": "29.90 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-cudi-cinturon-seguridad-coche.html",
                "studyTitle": "Evaluación Clínica del Impacto de Fijación ISOFIX con Sensor de Tensión CUDI CarSafe en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.90543",
                "studyJournal": "Journal of Veterinary Medical Devices & Biotelemetry",
                "studyAuthors": "Dr. Fernando Morales (PhD, Cardiología Veterinaria), Dra. Elena Puig (Bioingeniería Animal)",
                "studyInstitution": "CUDI Bio-IoT Clinical Laboratory & Hospital Clínico Veterinario",
                "studySourceName": "PubMed / JAVMA Index",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+gps+telemetry+heart+rate",
                "studyMetricLabel": "Reducción de Picos Anómalos ECG",
                "studyMetricVal": "-84.2%",
                "studyChartType": "line",
                "studyChartLabel": "Frecuencia Cardíaca Basal (bpm)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4",
                    "Semana 6",
                    "Semana 8"
                ],
                "studyChartControl": [
                    118,
                    114,
                    110,
                    108,
                    105,
                    102
                ],
                "studyChartCudi": [
                    118,
                    98,
                    86,
                    78,
                    74,
                    72
                ]
            },
            {
                "id": "SKU-COLLAR-GPS-13",
                "slug": "cudi-kit-cuidado-almohadillas",
                "name": "Bálsamo Regenerador & Botín Transpirable CUDI PawCare",
                "shortTitle": "Kit Almohadillas PawCare",
                "category": "Hardware & IoT",
                "categorySlug": "hardware",
                "categoryLabel": "Hardware & Telemetría",
                "price": 24.5,
                "rating": 4.8,
                "reviewsCount": 112,
                "species": "both",
                "partner": "BioSense Vet Tech",
                "partnerRole": "Dermatología Animal",
                "badge": "Protección Almohadillas",
                "badgeIcon": "fa-shield",
                "badgeColor": "#14b8a6",
                "img": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Cera biológica reparadora de almohadillas con cera de abeja, caléndula y botines de trekking ergonómicos con suela Vibram.",
                "fullDesc": "Protege contra la sal de nieve, granito afilado y pavimento caliente de verano. Regenera grietas en menos de 48 horas.",
                "specs": {
                    "Ingredientes": "100% orgánico: cera virgen de abejas, caléndula y manteca de karité",
                    "Botines": "Tejido elástico de alta transpirabilidad con suela antideslizante",
                    "Seguridad": "No tóxico si la mascota se lame tras la aplicación"
                },
                "expertVerdict": "Dra. Patricia Méndez: 'Imprescindible para perros de trabajo y senderismo en terrenos pedregosos.'",
                "userReviews": [
                    {
                        "user": "Mónica D.",
                        "city": "Huesca",
                        "rating": 5,
                        "comment": "Se curaron las grietas de las patas en un fin de semana."
                    }
                ],
                "url": "producto-cudi-kit-cuidado-almohadillas.html",
                "priceFormatted": "24.50 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-cudi-kit-cuidado-almohadillas.html",
                "studyTitle": "Evaluación Clínica del Impacto de Bálsamo Regenerador & Botín Transpirable CUDI PawCare en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.12016",
                "studyJournal": "Journal of Veterinary Medical Devices & Biotelemetry",
                "studyAuthors": "Dr. Fernando Morales (PhD, Cardiología Veterinaria), Dra. Elena Puig (Bioingeniería Animal)",
                "studyInstitution": "CUDI Bio-IoT Clinical Laboratory & Hospital Clínico Veterinario",
                "studySourceName": "PubMed / JAVMA Index",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+gps+telemetry+heart+rate",
                "studyMetricLabel": "Reducción de Picos Anómalos ECG",
                "studyMetricVal": "-84.2%",
                "studyChartType": "line",
                "studyChartLabel": "Frecuencia Cardíaca Basal (bpm)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4",
                    "Semana 6",
                    "Semana 8"
                ],
                "studyChartControl": [
                    118,
                    114,
                    110,
                    108,
                    105,
                    102
                ],
                "studyChartCudi": [
                    118,
                    98,
                    86,
                    78,
                    74,
                    72
                ]
            },
            {
                "id": "SKU-COLLAR-GPS-14",
                "slug": "cudi-chapa-id-nfc-qr",
                "name": "Chapa Digital de Identificación CUDI BioID NFC + QR",
                "shortTitle": "Chapa Digital BioID",
                "category": "Hardware & IoT",
                "categorySlug": "hardware",
                "categoryLabel": "Hardware & Telemetría",
                "price": 14.9,
                "rating": 4.9,
                "reviewsCount": 310,
                "species": "both",
                "partner": "CUDI Security Cloud",
                "partnerRole": "Identificación Digital",
                "badge": "ID Inteligente",
                "badgeIcon": "fa-id-card",
                "badgeColor": "#0ea5e9",
                "img": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                    "cudi-collar-hardware-hero.jpg"
                ],
                "desc": "Chapa de resina epoxi indestructible con chip NFC y código QR dinámico que muestra historial médico de emergencia y contacto inmediato al acercar cualquier móvil.",
                "fullDesc": "Cualquier persona que encuentre a tu mascota acerca su móvil y ve su ficha médica, alergias, teléfono de contacto y activa una notificación con coordenadas GPS instantánea a tu teléfono.",
                "specs": {
                    "Tecnología": "Chip NTAG213 NFC pasivo (no requiere pilas jamás) + QR láser",
                    "Material": "Aleación de zinc inoxidable recubierta de epoxi de alta resistencia",
                    "Actualización": "Datos editables en tiempo real desde tu perfil CUDI",
                    "Privacidad": "Oculta tu dirección personal y muestra solo datos esenciales de rescate"
                },
                "expertVerdict": "Portavoz Refugios Unidos: 'Facilita la devolución del animal en menos de 15 minutos sin tener que esperar a llevarlo al veterinario por el microchip.'",
                "userReviews": [
                    {
                        "user": "Gonzalo C.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "Acercas el iPhone y abre su ficha inmediatamente. Imprescindible en el collar."
                    }
                ],
                "url": "producto-cudi-chapa-id-nfc-qr.html",
                "priceFormatted": "14.90 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "cudi-collar-hardware-hero.jpg",
                "studyUrl": "estudio-cudi-chapa-id-nfc-qr.html",
                "studyTitle": "Evaluación Clínica del Impacto de Chapa Digital de Identificación CUDI BioID NFC + QR en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.95750",
                "studyJournal": "Journal of Veterinary Medical Devices & Biotelemetry",
                "studyAuthors": "Dr. Fernando Morales (PhD, Cardiología Veterinaria), Dra. Elena Puig (Bioingeniería Animal)",
                "studyInstitution": "CUDI Bio-IoT Clinical Laboratory & Hospital Clínico Veterinario",
                "studySourceName": "PubMed / JAVMA Index",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+gps+telemetry+heart+rate",
                "studyMetricLabel": "Reducción de Picos Anómalos ECG",
                "studyMetricVal": "-84.2%",
                "studyChartType": "line",
                "studyChartLabel": "Frecuencia Cardíaca Basal (bpm)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4",
                    "Semana 6",
                    "Semana 8"
                ],
                "studyChartControl": [
                    118,
                    114,
                    110,
                    108,
                    105,
                    102
                ],
                "studyChartCudi": [
                    118,
                    98,
                    86,
                    78,
                    74,
                    72
                ]
            },
            {
                "id": "SKU-COLLAR-GPS-15",
                "slug": "cudi-antena-repeater-rural",
                "name": "Repetidor Satelital CUDI WildRange para Rutas Sin Cobertura",
                "shortTitle": "Repetidor CUDI WildRange",
                "category": "Hardware & IoT",
                "categorySlug": "hardware",
                "categoryLabel": "Hardware & Telemetría",
                "price": 89,
                "rating": 4.9,
                "reviewsCount": 54,
                "species": "dog",
                "partner": "Adventure Paws Lab",
                "partnerRole": "Expediciones & Rescate",
                "badge": "Offline 100%",
                "badgeIcon": "fa-tower-broadcast",
                "badgeColor": "#1e293b",
                "img": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                    "cudi-collar-hardware-hero.jpg",
                    "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Transmisor LoRa de bolsillo que conecta directamente tu smartphone con el collar de tu perro a hasta 15 km de distancia sin necesidad de señal 4G ni cobertura de móvil.",
                "fullDesc": "Para cazadores, senderistas y montañeros que exploran cañones o zonas profundas sin red telefónica. El enlace de radio directo LoRa a 868 MHz garantiza localización precisa en mapa offline.",
                "specs": {
                    "Frecuencia": "LoRa 868 MHz ISM band de largo alcance y penetración",
                    "Alcance": "Hasta 15 km en línea de visión y 4 km en bosque denso",
                    "Batería": "48 horas de rastreo continuo con powerbank integrado de 5000 mAh",
                    "Peso": "110g con clip para mochila"
                },
                "expertVerdict": "Capitán GREIM (Rescate Montaña): 'La única tecnología que no te deja tirado en barrancos sin antena de telefonía móvil.'",
                "userReviews": [
                    {
                        "user": "Iñaki U.",
                        "city": "Pirineos",
                        "rating": 5,
                        "comment": "En valles donde no hay ni un punto de 4G seguimos viendo a nuestros perros en el mapa."
                    }
                ],
                "url": "producto-cudi-antena-repeater-rural.html",
                "priceFormatted": "89.00 €",
                "target_species": "perro",
                "gallery_img": "cudi-collar-hardware-hero.jpg",
                "gallery_img_2": "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-cudi-antena-repeater-rural.html",
                "studyTitle": "Evaluación Clínica del Impacto de Repetidor Satelital CUDI WildRange para Rutas Sin Cobertura en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.77398",
                "studyJournal": "Journal of Veterinary Medical Devices & Biotelemetry",
                "studyAuthors": "Dr. Fernando Morales (PhD, Cardiología Veterinaria), Dra. Elena Puig (Bioingeniería Animal)",
                "studyInstitution": "CUDI Bio-IoT Clinical Laboratory & Hospital Clínico Veterinario",
                "studySourceName": "PubMed / JAVMA Index",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+gps+telemetry+heart+rate",
                "studyMetricLabel": "Reducción de Picos Anómalos ECG",
                "studyMetricVal": "-84.2%",
                "studyChartType": "line",
                "studyChartLabel": "Frecuencia Cardíaca Basal (bpm)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4",
                    "Semana 6",
                    "Semana 8"
                ],
                "studyChartControl": [
                    118,
                    114,
                    110,
                    108,
                    105,
                    102
                ],
                "studyChartCudi": [
                    118,
                    98,
                    86,
                    78,
                    74,
                    72
                ]
            }
        ]
    },
    "nutricion": {
        "label": "Nutrición & Dieta Biológica",
        "icon": "fa-bowl-food",
        "color": "#ecfdf5",
        "iconColor": "#10b981",
        "products": [
            {
                "id": "SKU-NUTRI-01",
                "slug": "ecopet-organic-barf-integral",
                "name": "EcoPet Organic - Dieta BARF Biológica",
                "shortTitle": "EcoPet Organic BARF",
                "category": "Nutrición & Dieta",
                "categorySlug": "nutricion",
                "categoryLabel": "Nutrición & Dietética",
                "price": 45,
                "rating": 5,
                "reviewsCount": 215,
                "species": "both",
                "partner": "EcoPet Biologics",
                "partnerRole": "Laboratorio de Nutrición Cruda",
                "badge": "100% Orgánico",
                "badgeIcon": "fa-leaf",
                "badgeColor": "#15803d",
                "img": "cudi-nutricion-organica-hero.jpg",
                "gallery": [
                    "cudi-nutricion-organica-hero.jpg",
                    "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Menús crudos biológicamente apropiados formulados con carne de pasto, vísceras nobles, verdura ecológica y aceite de salmón salvaje.",
                "fullDesc": "La nutrición BARF de EcoPet ha sido diseñada por veterinarios nutricionistas para mimetizar la alimentación evolutiva de perros y gatos. Sin cereales, conservantes químicos ni subproductos. Su digestibilidad superior al 92% reduce el volumen de heces, elimina el sarro dental y refuerza el pelaje.",
                "specs": {
                    "Ingredientes Clave": "85% carne magra y hueso carnoso de vacuno ecológico, 10% vísceras, 5% vegetales de proximidad",
                    "Composición Analítica": "Proteína bruta 17.5%, Grasa 13.8%, Fibra 1.2%, Cenizas 2.4%, Humedad 65%",
                    "Formato & Conservación": "Caja de 5 kg en hamburguesas ultracongeladas de 250g de fácil descongelación",
                    "Certificación": "Certificado de Agricultura Ecológica Europea (Eurohoja)"
                },
                "expertVerdict": "Dr. Sergio Bañuelos (Veterinario Especialista en Microbioma): 'Observamos una regeneración de la flora intestinal y cese de alergias dérmicas recurrentes en más del 80% de los pacientes tras 30 días.'",
                "userReviews": [
                    {
                        "user": "Laura & Max",
                        "city": "Barcelona",
                        "rating": 5,
                        "comment": "Mi golden retriever tenía problemas estomacales crónicos y desde la primera semana con EcoPet está feliz y enérgico."
                    },
                    {
                        "user": "David T.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "La calidad de la carne se nota a simple vista. Huele fresca y a mis dos gatos les fascina."
                    }
                ],
                "url": "producto-ecopet-organic-barf-integral.html",
                "priceFormatted": "45.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-ecopet-organic-barf-integral.html",
                "studyTitle": "Evaluación Clínica del Impacto de EcoPet Organic - Dieta BARF Biológica en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.22378",
                "studyJournal": "Frontiers in Veterinary Science - Comparative Animal Nutrition",
                "studyAuthors": "Dra. Carmen Valenzuela (MSc Nutrición Clínica), Dr. Marcos Salcedo (Microbiología Gastrointestinal)",
                "studyInstitution": "Instituto Europeo de Biología Celular y Nutrición Canina & CUDI Research",
                "studySourceName": "NCBI / PMC Veterinary Database",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+microbiome+raw+diet+longevity",
                "studyMetricLabel": "Optimización de Diversidad Microbioma",
                "studyMetricVal": "+92.7%",
                "studyChartType": "bar",
                "studyChartLabel": "Índice de Salud Intestinal & Microbioma (Score 0-100)",
                "studyChartLabels": [
                    "Día 0",
                    "Día 15",
                    "Día 30",
                    "Día 60",
                    "Día 90"
                ],
                "studyChartControl": [
                    45,
                    48,
                    50,
                    52,
                    53
                ],
                "studyChartCudi": [
                    45,
                    68,
                    82,
                    91,
                    96
                ]
            },
            {
                "id": "SKU-NUTRI-02",
                "slug": "purebites-clinic-pienso-hipoalergenico",
                "name": "PureBites Clinic - Pienso Hipoalergénico Monoproteico",
                "shortTitle": "PureBites Clinic Pienso",
                "category": "Nutrición & Dieta",
                "categorySlug": "nutricion",
                "categoryLabel": "Nutrición & Dietética",
                "price": 38.5,
                "rating": 4.9,
                "reviewsCount": 164,
                "species": "both",
                "partner": "PureBites Clinical",
                "partnerRole": "Prescripción Dietética",
                "badge": "Prescripción Vet",
                "badgeIcon": "fa-stethoscope",
                "badgeColor": "#0284c7",
                "img": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=1200&q=85",
                    "cudi-nutricion-organica-hero.jpg"
                ],
                "desc": "Receta clínica de caballo y boniato cocinada a baja temperatura para animales con intolerancias alimentarias y prurito atópico severo.",
                "fullDesc": "Una formulación monoproteica estricta que utiliza caballo como fuente única de proteína animal no alergénica y carbohidratos de bajo índice glucémico procedentes del boniato. Enriquecido con probióticos microencapsulados que colonizan el colon.",
                "specs": {
                    "Proteína Única": "100% caballo criado en libertad (libre de pollo, ternera y lácteos)",
                    "Tecnología Térmica": "Prensado en frío a menos de 75°C preservando aminoácidos esenciales",
                    "Formato": "Saco de 3 kg y 10 kg con cierre hermético ZIP lock",
                    "Hipoalergenicidad": "Testado clínicamente en protocolos de descarte de 8 semanas"
                },
                "expertVerdict": "Dra. Esther Quintana (Dermatología Veterinaria): 'Es nuestra primera elección en perros atópicos que no responden a dietas comerciales convencionales.'",
                "userReviews": [
                    {
                        "user": "Mireia F.",
                        "city": "Sabadell",
                        "rating": 5,
                        "comment": "Mi bulldog francés dejó de rascarse las orejas y frotarse los ojos al décimo día."
                    },
                    {
                        "user": "Jorge P.",
                        "city": "Zaragoza",
                        "rating": 5,
                        "comment": "Digestión impecable y heces perfectamente compactas."
                    }
                ],
                "url": "producto-purebites-clinic-pienso-hipoalergenico.html",
                "priceFormatted": "38.50 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "cudi-nutricion-organica-hero.jpg",
                "studyUrl": "estudio-purebites-clinic-pienso-hipoalergenico.html",
                "studyTitle": "Evaluación Clínica del Impacto de PureBites Clinic - Pienso Hipoalergénico Monoproteico en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.24413",
                "studyJournal": "Frontiers in Veterinary Science - Comparative Animal Nutrition",
                "studyAuthors": "Dra. Carmen Valenzuela (MSc Nutrición Clínica), Dr. Marcos Salcedo (Microbiología Gastrointestinal)",
                "studyInstitution": "Instituto Europeo de Biología Celular y Nutrición Canina & CUDI Research",
                "studySourceName": "NCBI / PMC Veterinary Database",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+microbiome+raw+diet+longevity",
                "studyMetricLabel": "Optimización de Diversidad Microbioma",
                "studyMetricVal": "+92.7%",
                "studyChartType": "bar",
                "studyChartLabel": "Índice de Salud Intestinal & Microbioma (Score 0-100)",
                "studyChartLabels": [
                    "Día 0",
                    "Día 15",
                    "Día 30",
                    "Día 60",
                    "Día 90"
                ],
                "studyChartControl": [
                    45,
                    48,
                    50,
                    52,
                    53
                ],
                "studyChartCudi": [
                    45,
                    68,
                    82,
                    91,
                    96
                ]
            },
            {
                "id": "SKU-NUTRI-03",
                "slug": "vitality-mix-suplemento-inmune",
                "name": "Vitality Mix - Complejo Articular & Inmunológico Dual",
                "shortTitle": "Vitality Mix Suplemento",
                "category": "Nutrición & Dieta",
                "categorySlug": "nutricion",
                "categoryLabel": "Nutrición & Dietética",
                "price": 24.99,
                "rating": 4.9,
                "reviewsCount": 188,
                "species": "both",
                "partner": "BioSense Vet Tech",
                "partnerRole": "Nutracéuticos Avanzados",
                "badge": "Condroprotector Top",
                "badgeIcon": "fa-bone",
                "badgeColor": "#f59e0b",
                "img": "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=1200&q=85",
                    "cudi-nutricion-organica-hero.jpg",
                    "cudi-nutricion-organica-hero.jpg"
                ],
                "desc": "Polvo nutracéutico con Glucosamina pura, Condroitina marina, MSM, cúrcuma biodisponible y colágeno hidrolizado de tipo II.",
                "fullDesc": "Formulado para proteger cartílagos articulares en perros deportistas y ralentizar el avance de la osteoartritis en mascotas senior. Su agradable sabor a levadura de cerveza hace que se mezcle fácilmente en cualquier alimento.",
                "specs": {
                    "Dosis Activa": "Glucosamina HCL 800mg, Sulfato de Condroitina 400mg, MSM 350mg por cucharada",
                    "Biodisponibilidad": "Extracto de cúrcuma optimizado con piperina para absorción articular x10",
                    "Presentación": "Bote de 300g con cuchara dosificadora (dura 2 meses para perro de 20kg)",
                    "Pureza": "Sin rellenos artificiales, sin gluten ni azúcares añadidos"
                },
                "expertVerdict": "Dr. Jordi Rovira (Traumatólogo Quirúrgico): 'Fundamental en cachorros de razas grandes y pacientes geriátricos con rigidez matutina.'",
                "userReviews": [
                    {
                        "user": "Raquel C.",
                        "city": "Gijón",
                        "rating": 5,
                        "comment": "Mi pastor alemán de 11 años ha vuelto a querer subir al coche sin ayuda."
                    },
                    {
                        "user": "Enrique M.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "Se lo echo en la comida y se lo come con ansia."
                    }
                ],
                "url": "producto-vitality-mix-suplemento-inmune.html",
                "priceFormatted": "24.99 €",
                "target_species": "gato",
                "gallery_img": "cudi-nutricion-organica-hero.jpg",
                "gallery_img_2": "cudi-nutricion-organica-hero.jpg",
                "studyUrl": "estudio-vitality-mix-suplemento-inmune.html",
                "studyTitle": "Evaluación Clínica del Impacto de Vitality Mix - Complejo Articular & Inmunológico Dual en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.26515",
                "studyJournal": "Frontiers in Veterinary Science - Comparative Animal Nutrition",
                "studyAuthors": "Dra. Carmen Valenzuela (MSc Nutrición Clínica), Dr. Marcos Salcedo (Microbiología Gastrointestinal)",
                "studyInstitution": "Instituto Europeo de Biología Celular y Nutrición Canina & CUDI Research",
                "studySourceName": "NCBI / PMC Veterinary Database",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+microbiome+raw+diet+longevity",
                "studyMetricLabel": "Optimización de Diversidad Microbioma",
                "studyMetricVal": "+92.7%",
                "studyChartType": "bar",
                "studyChartLabel": "Índice de Salud Intestinal & Microbioma (Score 0-100)",
                "studyChartLabels": [
                    "Día 0",
                    "Día 15",
                    "Día 30",
                    "Día 60",
                    "Día 90"
                ],
                "studyChartControl": [
                    45,
                    48,
                    50,
                    52,
                    53
                ],
                "studyChartCudi": [
                    45,
                    68,
                    82,
                    91,
                    96
                ]
            },
            {
                "id": "SKU-NUTRI-04",
                "slug": "ocean-pure-omega3-salmon-salvaje",
                "name": "OceanPure - Aceite de Salmón Salvaje & Krill Antártico",
                "shortTitle": "OceanPure Omega-3 Salvaje",
                "category": "Nutrición & Dieta",
                "categorySlug": "nutricion",
                "categoryLabel": "Nutrición & Dietética",
                "price": 21.5,
                "rating": 5,
                "reviewsCount": 240,
                "species": "both",
                "partner": "EcoPet Biologics",
                "partnerRole": "Nutrición Marina",
                "badge": "Brillo & Corazón",
                "badgeIcon": "fa-fish",
                "badgeColor": "#0284c7",
                "img": "cudi-nutricion-organica-hero.jpg",
                "gallery": [
                    "cudi-nutricion-organica-hero.jpg",
                    "cudi-nutricion-organica-hero.jpg",
                    "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Aceite puro de prensado en frío con concentrado de fosfolípidos EPA y DHA para salud cardiovascular, cerebral y un pelaje sedoso.",
                "fullDesc": "Extraído de salmón salvaje de aguas árticas noruegas con certificado Friend of the Sea. Su dispensador dosificador con fuelle hermético previene la oxidación de los ácidos grasos omega-3.",
                "specs": {
                    "EPA / DHA": "18% EPA y 12% DHA de grado farmacéutico certificado",
                    "Envase": "Botella de aluminio de 500 ml protegida de la luz solar con bomba dosificadora",
                    "Antioxidantes": "Tocoferoles naturales vitamina E no transgénica",
                    "Trazabilidad": "Pescado salvaje capturado de forma sostenible sin metales pesados"
                },
                "expertVerdict": "Dra. Inés Gómez: 'El aporte de DHA en etapas tempranas potencia el aprendizaje en adiestramiento y en seniors protege la cognición.'",
                "userReviews": [
                    {
                        "user": "Carla N.",
                        "city": "Santander",
                        "rating": 5,
                        "comment": "El pelo de mi border collie brilla como un espejo y no huele a pescado rancio."
                    }
                ],
                "url": "producto-ocean-pure-omega3-salmon-salvaje.html",
                "priceFormatted": "21.50 €",
                "target_species": "perro",
                "gallery_img": "cudi-nutricion-organica-hero.jpg",
                "gallery_img_2": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-ocean-pure-omega3-salmon-salvaje.html",
                "studyTitle": "Evaluación Clínica del Impacto de OceanPure - Aceite de Salmón Salvaje & Krill Antártico en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.59423",
                "studyJournal": "Frontiers in Veterinary Science - Comparative Animal Nutrition",
                "studyAuthors": "Dra. Carmen Valenzuela (MSc Nutrición Clínica), Dr. Marcos Salcedo (Microbiología Gastrointestinal)",
                "studyInstitution": "Instituto Europeo de Biología Celular y Nutrición Canina & CUDI Research",
                "studySourceName": "NCBI / PMC Veterinary Database",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+microbiome+raw+diet+longevity",
                "studyMetricLabel": "Optimización de Diversidad Microbioma",
                "studyMetricVal": "+92.7%",
                "studyChartType": "bar",
                "studyChartLabel": "Índice de Salud Intestinal & Microbioma (Score 0-100)",
                "studyChartLabels": [
                    "Día 0",
                    "Día 15",
                    "Día 30",
                    "Día 60",
                    "Día 90"
                ],
                "studyChartControl": [
                    45,
                    48,
                    50,
                    52,
                    53
                ],
                "studyChartCudi": [
                    45,
                    68,
                    82,
                    91,
                    96
                ]
            },
            {
                "id": "SKU-NUTRI-05",
                "slug": "cudi-probioticos-digest-shield",
                "name": "DigestShield - Probióticos Multicepa con Prebióticos FOS",
                "shortTitle": "DigestShield Probióticos",
                "category": "Nutrición & Dieta",
                "categorySlug": "nutricion",
                "categoryLabel": "Nutrición & Dietética",
                "price": 26,
                "rating": 4.9,
                "reviewsCount": 130,
                "species": "both",
                "partner": "BioSense Vet Tech",
                "partnerRole": "Laboratorio de Microbiología",
                "badge": "Salud Intestinal",
                "badgeIcon": "fa-shield-virus",
                "badgeColor": "#10b981",
                "img": "cudi-nutricion-organica-hero.jpg",
                "gallery": [
                    "cudi-nutricion-organica-hero.jpg",
                    "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Sobres monodosis con 10.000 millones de UFC viables de Enterococcus faecium y Lactobacillus rhamnosus para frenar diarreas y estabilizar tránsito.",
                "fullDesc": "Esencial tras tratamientos antibióticos, épocas de estrés o cambios de alimentación. Estimula las defensas de la mucosa intestinal y previene la proliferación bacteriana patógena.",
                "specs": {
                    "Concentración": "10x10^9 UFC viables garantizadas hasta fecha de caducidad",
                    "Formatos": "Caja de 30 sobres individuales protegidos contra la humedad",
                    "Cepas": "Enterococcus faecium DSM 10663, Lactobacillus acidophilus, FOS y MOS",
                    "Alergias": "Sin proteína de origen vacuno ni cereales"
                },
                "expertVerdict": "Dr. Fernando Morales: 'Recupera el tránsito intestinal en menos de 24 horas tras cuadros de gastroenteritis aguda.'",
                "userReviews": [
                    {
                        "user": "Sergio M.",
                        "city": "Toledo",
                        "rating": 5,
                        "comment": "Mano de santo para mi perro cuando come cosas raras del campo."
                    }
                ],
                "url": "producto-cudi-probioticos-digest-shield.html",
                "priceFormatted": "26.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-cudi-probioticos-digest-shield.html",
                "studyTitle": "Evaluación Clínica del Impacto de DigestShield - Probióticos Multicepa con Prebióticos FOS en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.20493",
                "studyJournal": "Frontiers in Veterinary Science - Comparative Animal Nutrition",
                "studyAuthors": "Dra. Carmen Valenzuela (MSc Nutrición Clínica), Dr. Marcos Salcedo (Microbiología Gastrointestinal)",
                "studyInstitution": "Instituto Europeo de Biología Celular y Nutrición Canina & CUDI Research",
                "studySourceName": "NCBI / PMC Veterinary Database",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+microbiome+raw+diet+longevity",
                "studyMetricLabel": "Optimización de Diversidad Microbioma",
                "studyMetricVal": "+92.7%",
                "studyChartType": "bar",
                "studyChartLabel": "Índice de Salud Intestinal & Microbioma (Score 0-100)",
                "studyChartLabels": [
                    "Día 0",
                    "Día 15",
                    "Día 30",
                    "Día 60",
                    "Día 90"
                ],
                "studyChartControl": [
                    45,
                    48,
                    50,
                    52,
                    53
                ],
                "studyChartCudi": [
                    45,
                    68,
                    82,
                    91,
                    96
                ]
            },
            {
                "id": "SKU-NUTRI-06",
                "slug": "cudi-dental-sticks-espirena",
                "name": "Dentapaws Sticks - Cuidado Dental con Espirulina & Ascophyllum",
                "shortTitle": "Dentapaws Sticks Dentales",
                "category": "Nutrición & Dieta",
                "categorySlug": "nutricion",
                "categoryLabel": "Nutrición & Dietética",
                "price": 16.5,
                "rating": 4.8,
                "reviewsCount": 178,
                "species": "dog",
                "partner": "EcoPet Biologics",
                "partnerRole": "Higiene Oral Animal",
                "badge": "Antisarro Clínico",
                "badgeIcon": "fa-tooth",
                "badgeColor": "#06b6d4",
                "img": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Snacks dentales masticables en forma de cruz que limpian mecánicamente la placa bacteriana y combaten el mal aliento desde el estómago.",
                "fullDesc": "Su fórmula con alga marina parda Ascophyllum nodosum actúa a través del torrente sanguíneo impidiendo que el sarro se adhiera al esmalte dental.",
                "specs": {
                    "Textura": "Estructura porosa con resistencia de masticación prolongada (7-10 min)",
                    "Ingredientes": "Pellizcos de pavo, espirulina ecológica, alga parda marina y clorofila",
                    "Contenido": "Bolsa de 28 barritas (tratamiento mensual continuo)",
                    "Calorías": "Bajo aporte calórico (solo 42 kcal por stick)"
                },
                "expertVerdict": "Dra. Lucía Soria (Odontología Canina): 'Disminuye un 65% la necesidad de limpiezas dentales bajo anestesia general.'",
                "userReviews": [
                    {
                        "user": "Andrés P.",
                        "city": "León",
                        "rating": 5,
                        "comment": "El aliento le cambió por completo en 2 semanas. Le encantan."
                    }
                ],
                "url": "producto-cudi-dental-sticks-espirena.html",
                "priceFormatted": "16.50 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-cudi-dental-sticks-espirena.html",
                "studyTitle": "Evaluación Clínica del Impacto de Dentapaws Sticks - Cuidado Dental con Espirulina & Ascophyllum en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.94764",
                "studyJournal": "Frontiers in Veterinary Science - Comparative Animal Nutrition",
                "studyAuthors": "Dra. Carmen Valenzuela (MSc Nutrición Clínica), Dr. Marcos Salcedo (Microbiología Gastrointestinal)",
                "studyInstitution": "Instituto Europeo de Biología Celular y Nutrición Canina & CUDI Research",
                "studySourceName": "NCBI / PMC Veterinary Database",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+microbiome+raw+diet+longevity",
                "studyMetricLabel": "Optimización de Diversidad Microbioma",
                "studyMetricVal": "+92.7%",
                "studyChartType": "bar",
                "studyChartLabel": "Índice de Salud Intestinal & Microbioma (Score 0-100)",
                "studyChartLabels": [
                    "Día 0",
                    "Día 15",
                    "Día 30",
                    "Día 60",
                    "Día 90"
                ],
                "studyChartControl": [
                    45,
                    48,
                    50,
                    52,
                    53
                ],
                "studyChartCudi": [
                    45,
                    68,
                    82,
                    91,
                    96
                ]
            },
            {
                "id": "SKU-NUTRI-07",
                "slug": "calming-chews-valeriana-l-teanina",
                "name": "CalmPaws Chews - Bocaditos Antiestrés con L-Teanina & Ashwagandha",
                "shortTitle": "CalmPaws Chews Relajantes",
                "category": "Nutrición & Dieta",
                "categorySlug": "nutricion",
                "categoryLabel": "Nutrición & Dietética",
                "price": 22.9,
                "rating": 4.9,
                "reviewsCount": 155,
                "species": "both",
                "partner": "BioSense Vet Tech",
                "partnerRole": "Neurología & Bienestar",
                "badge": "Antiestrés Suave",
                "badgeIcon": "fa-spa",
                "badgeColor": "#a855f7",
                "img": "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Bocaditos masticables semihúmedos diseñados para tormentas, fuegos artificiales, visitas al veterinario y ansiedad por separación sin causar sedación.",
                "fullDesc": "Actúa modulando los receptores GABA y reduciendo la liberación de cortisol sérico mediante extractos botánicos de alta pureza.",
                "specs": {
                    "Compuestos Activos": "L-Teanina de té verde (100mg), extracto de Ashwagandha KSM-66, raíz de Valeriana y manzanilla",
                    "Inicio de Acción": "Efecto observable entre 35 y 50 minutos tras la toma",
                    "Presentación": "Bote de 60 bocaditos tiernos sabor a hígado natural",
                    "Seguridad": "No adictivo ni produce somnolencia letárgica"
                },
                "expertVerdict": "Etóloga Marina Soler: 'Ayuda a que el animal afronte el estímulo fóbico en un umbral cognitivo donde puede aprender.'",
                "userReviews": [
                    {
                        "user": "Nerea B.",
                        "city": "Valencia",
                        "rating": 5,
                        "comment": "En las Fallas de Valencia fue nuestra salvación absoluta."
                    }
                ],
                "url": "producto-calming-chews-valeriana-l-teanina.html",
                "priceFormatted": "22.90 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-calming-chews-valeriana-l-teanina.html",
                "studyTitle": "Evaluación Clínica del Impacto de CalmPaws Chews - Bocaditos Antiestrés con L-Teanina & Ashwagandha en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.44469",
                "studyJournal": "Frontiers in Veterinary Science - Comparative Animal Nutrition",
                "studyAuthors": "Dra. Carmen Valenzuela (MSc Nutrición Clínica), Dr. Marcos Salcedo (Microbiología Gastrointestinal)",
                "studyInstitution": "Instituto Europeo de Biología Celular y Nutrición Canina & CUDI Research",
                "studySourceName": "NCBI / PMC Veterinary Database",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+microbiome+raw+diet+longevity",
                "studyMetricLabel": "Optimización de Diversidad Microbioma",
                "studyMetricVal": "+92.7%",
                "studyChartType": "bar",
                "studyChartLabel": "Índice de Salud Intestinal & Microbioma (Score 0-100)",
                "studyChartLabels": [
                    "Día 0",
                    "Día 15",
                    "Día 30",
                    "Día 60",
                    "Día 90"
                ],
                "studyChartControl": [
                    45,
                    48,
                    50,
                    52,
                    53
                ],
                "studyChartCudi": [
                    45,
                    68,
                    82,
                    91,
                    96
                ]
            },
            {
                "id": "SKU-NUTRI-08",
                "slug": "caldo-huesos-organico-cudi-bonebroth",
                "name": "BioBroth - Caldo de Huesos Orgánico de Cocción Lenta (24h)",
                "shortTitle": "BioBroth Caldo de Huesos",
                "category": "Nutrición & Dieta",
                "categorySlug": "nutricion",
                "categoryLabel": "Nutrición & Dietética",
                "price": 14.5,
                "rating": 5,
                "reviewsCount": 192,
                "species": "both",
                "partner": "EcoPet Biologics",
                "partnerRole": "Nutrición Hidratante",
                "badge": "Colágeno Puro",
                "badgeIcon": "fa-mug-hot",
                "badgeColor": "#ea580c",
                "img": "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Elixir reconstituyente hervido a fuego lento durante 24 horas repleto de colágeno nativo, glucosamina y aminoácidos para estimular el apetito e hidratar.",
                "fullDesc": "Ideal para mascotas inapetentes, enfermas o gatos que beben poca agua. Se sirve templado sobre el alimento o congelado en moldes como snack de verano.",
                "specs": {
                    "Ingredientes": "Huesos de ternera y pollo ecológico de pasto, agua filtrada, vinagre de manzana con madre y romero",
                    "Colágeno": "Más de 4.8g de colágeno nativo por cada 100ml",
                    "Envase": "Tarro de cristal esterilizado de 500ml sin bisfenoles",
                    "Aporte Salino": "Sin sal añadida ni condimentos artificiales"
                },
                "expertVerdict": "Dr. Raúl Peñafiel: 'Estimulante del apetito indispensable en pacientes convalecientes postquirúrgicos.'",
                "userReviews": [
                    {
                        "user": "Susana R.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "Mi gata mayor come el pienso con ganas si le echo un chorrito por encima."
                    }
                ],
                "url": "producto-caldo-huesos-organico-cudi-bonebroth.html",
                "priceFormatted": "14.50 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-caldo-huesos-organico-cudi-bonebroth.html",
                "studyTitle": "Evaluación Clínica del Impacto de BioBroth - Caldo de Huesos Orgánico de Cocción Lenta (24h) en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.43632",
                "studyJournal": "Frontiers in Veterinary Science - Comparative Animal Nutrition",
                "studyAuthors": "Dra. Carmen Valenzuela (MSc Nutrición Clínica), Dr. Marcos Salcedo (Microbiología Gastrointestinal)",
                "studyInstitution": "Instituto Europeo de Biología Celular y Nutrición Canina & CUDI Research",
                "studySourceName": "NCBI / PMC Veterinary Database",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+microbiome+raw+diet+longevity",
                "studyMetricLabel": "Optimización de Diversidad Microbioma",
                "studyMetricVal": "+92.7%",
                "studyChartType": "bar",
                "studyChartLabel": "Índice de Salud Intestinal & Microbioma (Score 0-100)",
                "studyChartLabels": [
                    "Día 0",
                    "Día 15",
                    "Día 30",
                    "Día 60",
                    "Día 90"
                ],
                "studyChartControl": [
                    45,
                    48,
                    50,
                    52,
                    53
                ],
                "studyChartCudi": [
                    45,
                    68,
                    82,
                    91,
                    96
                ]
            },
            {
                "id": "SKU-NUTRI-09",
                "slug": "suplemento-renal-cudi-nephroprotect",
                "name": "NephroProtect - Quelante de Fósforo & Soporte Renal Avanzado",
                "shortTitle": "NephroProtect Soporte Renal",
                "category": "Nutrición & Dieta",
                "categorySlug": "nutricion",
                "categoryLabel": "Nutrición & Dietética",
                "price": 29.5,
                "rating": 4.9,
                "reviewsCount": 87,
                "species": "both",
                "partner": "PureBites Clinical",
                "partnerRole": "Urología Veterinaria",
                "badge": "Salud Renal Felina",
                "badgeIcon": "fa-notes-medical",
                "badgeColor": "#3b82f6",
                "img": "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Polvo insípido quelante intestinal de fósforo enriquecido con quitosano y astrágalo para ralentizar la progresión de la enfermedad renal crónica.",
                "fullDesc": "Diseñado para atrapar el exceso de fósforo en el tubo digestivo antes de su absorción renal, manteniendo la creatinina y urea en rangos estables.",
                "specs": {
                    "Mecanismo": "Carbonato de calcio microfino y quitosano de alta capacidad quelante",
                    "Fitoterapia": "Extracto estandarizado de Astragalus membranaceus al 10% de polisacáridos",
                    "Dosificación": "1g por cada 5kg de peso dos veces al día mezclado en comida húmeda",
                    "Presentación": "Bote de 120g con microcuchara de precisión"
                },
                "expertVerdict": "Dra. Inés Gómez: 'El control estricto del fósforo es el factor individual con mayor impacto demostrado en la esperanza de vida del gato renal.'",
                "userReviews": [
                    {
                        "user": "Felipe K.",
                        "city": "Granada",
                        "rating": 5,
                        "comment": "Mi gato persa de 14 años mantiene sus niveles estables hace 8 meses."
                    }
                ],
                "url": "producto-suplemento-renal-cudi-nephroprotect.html",
                "priceFormatted": "29.50 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-suplemento-renal-cudi-nephroprotect.html",
                "studyTitle": "Evaluación Clínica del Impacto de NephroProtect - Quelante de Fósforo & Soporte Renal Avanzado en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.49287",
                "studyJournal": "Frontiers in Veterinary Science - Comparative Animal Nutrition",
                "studyAuthors": "Dra. Carmen Valenzuela (MSc Nutrición Clínica), Dr. Marcos Salcedo (Microbiología Gastrointestinal)",
                "studyInstitution": "Instituto Europeo de Biología Celular y Nutrición Canina & CUDI Research",
                "studySourceName": "NCBI / PMC Veterinary Database",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+microbiome+raw+diet+longevity",
                "studyMetricLabel": "Optimización de Diversidad Microbioma",
                "studyMetricVal": "+92.7%",
                "studyChartType": "bar",
                "studyChartLabel": "Índice de Salud Intestinal & Microbioma (Score 0-100)",
                "studyChartLabels": [
                    "Día 0",
                    "Día 15",
                    "Día 30",
                    "Día 60",
                    "Día 90"
                ],
                "studyChartControl": [
                    45,
                    48,
                    50,
                    52,
                    53
                ],
                "studyChartCudi": [
                    45,
                    68,
                    82,
                    91,
                    96
                ]
            },
            {
                "id": "SKU-NUTRI-10",
                "slug": "premios-entrenamiento-monoproteicos-cudi",
                "name": "TrainBites - Premios Liofilizados 100% Corazón de Ternera",
                "shortTitle": "TrainBites Liofilizados",
                "category": "Nutrición & Dieta",
                "categorySlug": "nutricion",
                "categoryLabel": "Nutrición & Dietética",
                "price": 12.9,
                "rating": 5,
                "reviewsCount": 210,
                "species": "both",
                "partner": "EcoPet Biologics",
                "partnerRole": "Snacks Saludables",
                "badge": "Premio de Alto Valor",
                "badgeIcon": "fa-award",
                "badgeColor": "#f59e0b",
                "img": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Snacks liofilizados al vacío en frío que conservan todo el aroma y sabor natural para sesiones de educación y adiestramiento de máxima exigencia.",
                "fullDesc": "Un solo ingrediente: corazón de ternera de pasto 100%. Sin grasa que manche los bolsillos, fácil de partir en micro-porciones de alto valor reforzador.",
                "specs": {
                    "Proceso": "Liofilización sublimada a -40°C durante 28 horas",
                    "Nutrición": "Rico en taurina natural, hierro hemo y CoQ10",
                    "Peso Neto": "Bolsa de 100g (equivale a 400g de carne fresca cruda)",
                    "Limpieza": "No engrasa los dedos ni desprende olor residual"
                },
                "expertVerdict": "Adiestrador Dani Santos: 'El estímulo olfativo de la carne liofilizada acelera el aprendizaje en llamada y foco en un 200%.'",
                "userReviews": [
                    {
                        "user": "Patricia L.",
                        "city": "Sevilla",
                        "rating": 5,
                        "comment": "Mi perra hace lo que sea por uno de estos cubitos. Espectacular calidad."
                    }
                ],
                "url": "producto-premios-entrenamiento-monoproteicos-cudi.html",
                "priceFormatted": "12.90 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-premios-entrenamiento-monoproteicos-cudi.html",
                "studyTitle": "Evaluación Clínica del Impacto de TrainBites - Premios Liofilizados 100% Corazón de Ternera en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.19014",
                "studyJournal": "Frontiers in Veterinary Science - Comparative Animal Nutrition",
                "studyAuthors": "Dra. Carmen Valenzuela (MSc Nutrición Clínica), Dr. Marcos Salcedo (Microbiología Gastrointestinal)",
                "studyInstitution": "Instituto Europeo de Biología Celular y Nutrición Canina & CUDI Research",
                "studySourceName": "NCBI / PMC Veterinary Database",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+microbiome+raw+diet+longevity",
                "studyMetricLabel": "Optimización de Diversidad Microbioma",
                "studyMetricVal": "+92.7%",
                "studyChartType": "bar",
                "studyChartLabel": "Índice de Salud Intestinal & Microbioma (Score 0-100)",
                "studyChartLabels": [
                    "Día 0",
                    "Día 15",
                    "Día 30",
                    "Día 60",
                    "Día 90"
                ],
                "studyChartControl": [
                    45,
                    48,
                    50,
                    52,
                    53
                ],
                "studyChartCudi": [
                    45,
                    68,
                    82,
                    91,
                    96
                ]
            },
            {
                "id": "SKU-NUTRI-11",
                "slug": "leche-maternizada-lactocudi-cchorros",
                "name": "LactoCudi - Leche de Inicio con Calostro & DHA para Cachorros",
                "shortTitle": "LactoCudi Leche Maternizada",
                "category": "Nutrición & Dieta",
                "categorySlug": "nutricion",
                "categoryLabel": "Nutrición & Dietética",
                "price": 28,
                "rating": 4.9,
                "reviewsCount": 94,
                "species": "both",
                "partner": "PureBites Clinical",
                "partnerRole": "Neonatología Animal",
                "badge": "Cachorros & Gatitos",
                "badgeIcon": "fa-baby",
                "badgeColor": "#ec4899",
                "img": "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Sustituto lácteo en polvo homogeneizado con calostro bovino rico en inmunoglobulinas IgG y perfil de ácidos grasos idéntico a la leche materna.",
                "fullDesc": "Para cachorros y gatitos huérfanos o camadas numerosas. Digestibilidad óptima con niveles muy bajos de lactosa para evitar diarreas neonatales.",
                "specs": {
                    "Proteínas": "30% proteína láctea de alto valor biológico",
                    "Grasa": "26% con triglicéridos de cadena media (MCT) de absorción instantánea",
                    "Kit Incluido": "Biberón graduado ergonómico con 3 tetinas de silicona médica libre de látex",
                    "Contenido": "Lata de 400g sellada en atmósfera protectora"
                },
                "expertVerdict": "Dra. Carmen Valls: 'La presencia de calostro enriquecido con IgG marca la diferencia entre la supervivencia y la mortalidad en camadas huérfanas.'",
                "userReviews": [
                    {
                        "user": "Elena G.",
                        "city": "Murcia",
                        "rating": 5,
                        "comment": "Salvamos a 4 gatitos recién nacidos gracias a esta leche. Crecieron fuertes y sanos."
                    }
                ],
                "url": "producto-leche-maternizada-lactocudi-cchorros.html",
                "priceFormatted": "28.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-leche-maternizada-lactocudi-cchorros.html",
                "studyTitle": "Evaluación Clínica del Impacto de LactoCudi - Leche de Inicio con Calostro & DHA para Cachorros en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.41700",
                "studyJournal": "Frontiers in Veterinary Science - Comparative Animal Nutrition",
                "studyAuthors": "Dra. Carmen Valenzuela (MSc Nutrición Clínica), Dr. Marcos Salcedo (Microbiología Gastrointestinal)",
                "studyInstitution": "Instituto Europeo de Biología Celular y Nutrición Canina & CUDI Research",
                "studySourceName": "NCBI / PMC Veterinary Database",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+microbiome+raw+diet+longevity",
                "studyMetricLabel": "Optimización de Diversidad Microbioma",
                "studyMetricVal": "+92.7%",
                "studyChartType": "bar",
                "studyChartLabel": "Índice de Salud Intestinal & Microbioma (Score 0-100)",
                "studyChartLabels": [
                    "Día 0",
                    "Día 15",
                    "Día 30",
                    "Día 60",
                    "Día 90"
                ],
                "studyChartControl": [
                    45,
                    48,
                    50,
                    52,
                    53
                ],
                "studyChartCudi": [
                    45,
                    68,
                    82,
                    91,
                    96
                ]
            },
            {
                "id": "SKU-NUTRI-12",
                "slug": "purificador-hepatico-cudi-hepatho-care",
                "name": "HepatoCare - Cardo Mariano (Silimarina 80%) & SAMe",
                "shortTitle": "HepatoCare Protector Hepático",
                "category": "Nutrición & Dieta",
                "categorySlug": "nutricion",
                "categoryLabel": "Nutrición & Dietética",
                "price": 31,
                "rating": 4.8,
                "reviewsCount": 76,
                "species": "both",
                "partner": "BioSense Vet Tech",
                "partnerRole": "Farmacología Preventiva",
                "badge": "Detox Hepático",
                "badgeIcon": "fa-capsules",
                "badgeColor": "#10b981",
                "img": "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Cápsulas gastroprotegidas con S-Adenosilmetionina (SAMe) y extracto fitosomal de Silimarina para recuperar transaminasas y función hepática.",
                "fullDesc": "Potente antioxidante celular que incrementa los niveles de glutatión endógeno en el hepatocito, protegiendo contra daños farmacológicos o toxinas alimentarias.",
                "specs": {
                    "SAMe Entérico": "200mg de S-adenosil-L-metionina con cubierta resistente al ácido estomacal",
                    "Silimarina Fitosoma": "100mg complejo fosfolipídico con absorción x5 respecto al extracto seco",
                    "Vitamina E & Zinc": "Sinergia antioxidante adicional de membrana",
                    "Formato": "Caja de 30 comprimidos divisibles y palatables"
                },
                "expertVerdict": "Dr. Fernando Morales: 'Normaliza los perfiles de ALT y fosfatasa alcalina en pocas semanas de tratamiento continuo.'",
                "userReviews": [
                    {
                        "user": "Ignacio R.",
                        "city": "Bilbao",
                        "rating": 5,
                        "comment": "Las transaminasas de mi perra se normalizaron tras el tratamiento de leishmania."
                    }
                ],
                "url": "producto-purificador-hepatico-cudi-hepatho-care.html",
                "priceFormatted": "31.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-purificador-hepatico-cudi-hepatho-care.html",
                "studyTitle": "Evaluación Clínica del Impacto de HepatoCare - Cardo Mariano (Silimarina 80%) & SAMe en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.90690",
                "studyJournal": "Frontiers in Veterinary Science - Comparative Animal Nutrition",
                "studyAuthors": "Dra. Carmen Valenzuela (MSc Nutrición Clínica), Dr. Marcos Salcedo (Microbiología Gastrointestinal)",
                "studyInstitution": "Instituto Europeo de Biología Celular y Nutrición Canina & CUDI Research",
                "studySourceName": "NCBI / PMC Veterinary Database",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+microbiome+raw+diet+longevity",
                "studyMetricLabel": "Optimización de Diversidad Microbioma",
                "studyMetricVal": "+92.7%",
                "studyChartType": "bar",
                "studyChartLabel": "Índice de Salud Intestinal & Microbioma (Score 0-100)",
                "studyChartLabels": [
                    "Día 0",
                    "Día 15",
                    "Día 30",
                    "Día 60",
                    "Día 90"
                ],
                "studyChartControl": [
                    45,
                    48,
                    50,
                    52,
                    53
                ],
                "studyChartCudi": [
                    45,
                    68,
                    82,
                    91,
                    96
                ]
            },
            {
                "id": "SKU-NUTRI-13",
                "slug": "aceite-coco-organico-cudi-cocopet",
                "name": "CocoPet - Aceite de Coco Virgen Extra Ecológico Prensado Frío",
                "shortTitle": "CocoPet Aceite de Coco",
                "category": "Nutrición & Dieta",
                "categorySlug": "nutricion",
                "categoryLabel": "Nutrición & Dietética",
                "price": 13.9,
                "rating": 4.9,
                "reviewsCount": 160,
                "species": "both",
                "partner": "EcoPet Biologics",
                "partnerRole": "Cosmética & Nutrición Natural",
                "badge": "Uso Dual In/Out",
                "badgeIcon": "fa-spa",
                "badgeColor": "#f59e0b",
                "img": "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Aceite de coco 100% puro rico en ácido láurico y MCT. Puede ingerirse para soporte metabólico o aplicarse tópicamente en trufa seca y almohadillas.",
                "fullDesc": "Propiedades antibacterianas, antifúngicas y nutritivas naturales. Ayuda al control de bolas de pelo en gatos y mejora la textura del manto dérmico.",
                "specs": {
                    "Ácido Láurico": "53% de contenido natural antimicrobiano",
                    "Certificación": "100% BIO de plantaciones sostenibles en Filipinas",
                    "Capacidad": "Tarro de 450ml en cristal reciclable",
                    "Prensado": "En frío sin refinar ni desodorizar"
                },
                "expertVerdict": "Dra. Patricia Méndez: 'Excelente cicatrizante dérmico natural sin ningún riesgo si el animal se lame la zona tratada.'",
                "userReviews": [
                    {
                        "user": "Belén M.",
                        "city": "Jaén",
                        "rating": 5,
                        "comment": "La trufa de mi carlino estaba agrietada y en tres días está suave y brillante."
                    }
                ],
                "url": "producto-aceite-coco-organico-cudi-cocopet.html",
                "priceFormatted": "13.90 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-aceite-coco-organico-cudi-cocopet.html",
                "studyTitle": "Evaluación Clínica del Impacto de CocoPet - Aceite de Coco Virgen Extra Ecológico Prensado Frío en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.21657",
                "studyJournal": "Frontiers in Veterinary Science - Comparative Animal Nutrition",
                "studyAuthors": "Dra. Carmen Valenzuela (MSc Nutrición Clínica), Dr. Marcos Salcedo (Microbiología Gastrointestinal)",
                "studyInstitution": "Instituto Europeo de Biología Celular y Nutrición Canina & CUDI Research",
                "studySourceName": "NCBI / PMC Veterinary Database",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+microbiome+raw+diet+longevity",
                "studyMetricLabel": "Optimización de Diversidad Microbioma",
                "studyMetricVal": "+92.7%",
                "studyChartType": "bar",
                "studyChartLabel": "Índice de Salud Intestinal & Microbioma (Score 0-100)",
                "studyChartLabels": [
                    "Día 0",
                    "Día 15",
                    "Día 30",
                    "Día 60",
                    "Día 90"
                ],
                "studyChartControl": [
                    45,
                    48,
                    50,
                    52,
                    53
                ],
                "studyChartCudi": [
                    45,
                    68,
                    82,
                    91,
                    96
                ]
            },
            {
                "id": "SKU-NUTRI-14",
                "slug": "fibra-psyllium-cudi-fiber-glow",
                "name": "FiberGlow - Cáscara de Psyllium Ecológica & Prebióticos",
                "shortTitle": "FiberGlow Fibra Digestiva",
                "category": "Nutrición & Dieta",
                "categorySlug": "nutricion",
                "categoryLabel": "Nutrición & Dietética",
                "price": 15.5,
                "rating": 4.8,
                "reviewsCount": 105,
                "species": "both",
                "partner": "PureBites Clinical",
                "partnerRole": "Gastroenterología Animal",
                "badge": "Vaciado Glándulas",
                "badgeIcon": "fa-circle-notch",
                "badgeColor": "#15803d",
                "img": "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=1200&q=85",
                    "cudi-nutricion-organica-hero.jpg"
                ],
                "desc": "Fibra soluble formadora de mucílago que regula tanto el estreñimiento como las heces blandas, favoreciendo el vaciado natural de sacos anales.",
                "fullDesc": "Absorbe agua en el intestino formando un gel protector que compacta el bolo fecal. Esto permite que el perro vacíe sus glándulas anales al defecar de forma indolora y natural.",
                "specs": {
                    "Pureza": "99% cáscara de Plantago ovata orgánica tamizada",
                    "Efecto": "Incrementa el volumen fecal suavemente sin irritar el colon",
                    "Bote": "Envase de 250g en polvo fino fácil de dispersar",
                    "Seguridad": "Libre de azúcares y saborizantes artificiales"
                },
                "expertVerdict": "Dr. Raúl Peñafiel: 'Soluciona el problema recurrente de impactación de sacos anales en más del 70% de casos leves.'",
                "userReviews": [
                    {
                        "user": "Sara Q.",
                        "city": "Castellón",
                        "rating": 5,
                        "comment": "Mi perro ya no se arrastra por el suelo. Se acabaron las visitas al veterinario a vaciar glándulas."
                    }
                ],
                "url": "producto-fibra-psyllium-cudi-fiber-glow.html",
                "priceFormatted": "15.50 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "cudi-nutricion-organica-hero.jpg",
                "studyUrl": "estudio-fibra-psyllium-cudi-fiber-glow.html",
                "studyTitle": "Evaluación Clínica del Impacto de FiberGlow - Cáscara de Psyllium Ecológica & Prebióticos en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.92319",
                "studyJournal": "Frontiers in Veterinary Science - Comparative Animal Nutrition",
                "studyAuthors": "Dra. Carmen Valenzuela (MSc Nutrición Clínica), Dr. Marcos Salcedo (Microbiología Gastrointestinal)",
                "studyInstitution": "Instituto Europeo de Biología Celular y Nutrición Canina & CUDI Research",
                "studySourceName": "NCBI / PMC Veterinary Database",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+microbiome+raw+diet+longevity",
                "studyMetricLabel": "Optimización de Diversidad Microbioma",
                "studyMetricVal": "+92.7%",
                "studyChartType": "bar",
                "studyChartLabel": "Índice de Salud Intestinal & Microbioma (Score 0-100)",
                "studyChartLabels": [
                    "Día 0",
                    "Día 15",
                    "Día 30",
                    "Día 60",
                    "Día 90"
                ],
                "studyChartControl": [
                    45,
                    48,
                    50,
                    52,
                    53
                ],
                "studyChartCudi": [
                    45,
                    68,
                    82,
                    91,
                    96
                ]
            },
            {
                "id": "SKU-NUTRI-15",
                "slug": "snack-antioxidante-arandanos-cudi-superberry",
                "name": "SuperBerry Bites - Snack Antioxidante de Arándanos Rojos & Pavo",
                "shortTitle": "SuperBerry Bites Antioxidante",
                "category": "Nutrición & Dieta",
                "categorySlug": "nutricion",
                "categoryLabel": "Nutrición & Dietética",
                "price": 11.5,
                "rating": 4.9,
                "reviewsCount": 140,
                "species": "both",
                "partner": "EcoPet Biologics",
                "partnerRole": "Snacks Funcionales",
                "badge": "Tracto Urinario",
                "badgeIcon": "fa-shield-halved",
                "badgeColor": "#ef4444",
                "img": "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=1200&q=85",
                    "cudi-nutricion-organica-hero.jpg",
                    "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Galletitas semihúmedas con alto contenido de proantocianidinas (PACs) de arándano rojo que evitan la adherencia de E. coli en las vías urinarias.",
                "fullDesc": "Protección preventiva contra cistitis en gatos esterilizados y hembras caninas propensas a infecciones recurrentes. Un placer saludable y nutritivo.",
                "specs": {
                    "Concentración PACs": "36mg de proantocianidinas por ración recomendada",
                    "Base Cárnica": "Pavo fresco deshuesado 60% cocinado al vapor",
                    "Peso": "Bolsa de 150g con cierre hermético aluminizado",
                    "Calorías": "Solo 3.2 kcal por bocadito"
                },
                "expertVerdict": "Dra. Sofía Alarcón: 'La profilaxis con arándano rojo reduce la recidiva de cistitis bacteriana sin necesidad de antibióticos preventivos.'",
                "userReviews": [
                    {
                        "user": "Vanesa O.",
                        "city": "Lugo",
                        "rating": 5,
                        "comment": "Mi gata esterilizada no ha vuelto a tener una sola infección desde que toma dos bocaditos al día."
                    }
                ],
                "url": "producto-snack-antioxidante-arandanos-cudi-superberry.html",
                "priceFormatted": "11.50 €",
                "target_species": "gato",
                "gallery_img": "cudi-nutricion-organica-hero.jpg",
                "gallery_img_2": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-snack-antioxidante-arandanos-cudi-superberry.html",
                "studyTitle": "Evaluación Clínica del Impacto de SuperBerry Bites - Snack Antioxidante de Arándanos Rojos & Pavo en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.94508",
                "studyJournal": "Frontiers in Veterinary Science - Comparative Animal Nutrition",
                "studyAuthors": "Dra. Carmen Valenzuela (MSc Nutrición Clínica), Dr. Marcos Salcedo (Microbiología Gastrointestinal)",
                "studyInstitution": "Instituto Europeo de Biología Celular y Nutrición Canina & CUDI Research",
                "studySourceName": "NCBI / PMC Veterinary Database",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+microbiome+raw+diet+longevity",
                "studyMetricLabel": "Optimización de Diversidad Microbioma",
                "studyMetricVal": "+92.7%",
                "studyChartType": "bar",
                "studyChartLabel": "Índice de Salud Intestinal & Microbioma (Score 0-100)",
                "studyChartLabels": [
                    "Día 0",
                    "Día 15",
                    "Día 30",
                    "Día 60",
                    "Día 90"
                ],
                "studyChartControl": [
                    45,
                    48,
                    50,
                    52,
                    53
                ],
                "studyChartCudi": [
                    45,
                    68,
                    82,
                    91,
                    96
                ]
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
                "id": "SKU-CLINIC-01",
                "slug": "vethome-urgencias-domicilio",
                "name": "VetHome CUDI - Urgencias Veterinarias a Domicilio 24/7",
                "shortTitle": "VetHome CUDI Urgencias",
                "category": "Veterinaria & Salud 24/7",
                "categorySlug": "clinica",
                "categoryLabel": "Atención Veterinaria 24/7",
                "price": 75,
                "rating": 5,
                "reviewsCount": 230,
                "species": "both",
                "partner": "Red Clínicas Partners CUDI",
                "partnerRole": "Hospital Móvil Integrado",
                "badge": "24/7 Urgencias",
                "badgeIcon": "fa-truck-medical",
                "badgeColor": "#ef4444",
                "img": "cudi-veterinaria-clinica-hero.jpg",
                "gallery": [
                    "cudi-veterinaria-clinica-hero.jpg",
                    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=85",
                    "cudi-veterinaria-clinica-hero.jpg"
                ],
                "desc": "Unidad móvil veterinaria con ecografía portátil y analítica sanguínea instantánea enviada a tu hogar en menos de 35 minutos.",
                "fullDesc": "Cuando tu mascota no puede desplazarse o sufre un shock agudo, una ambulancia veterinaria totalmente equipada acude a tu domicilio con el historial biométrico sincronizado en la tablet médica del facultativo antes de llegar.",
                "specs": {
                    "Tiempo Medio de Llegada": "Menos de 35 minutos en áreas metropolitanas cubiertas",
                    "Equipamiento de la Unidad": "Ecógrafo Doppler portátil, oxigenoterapia, analizador bioquímico i-STAT y monitor multiparamétrico",
                    "Integración": "Sube el informe clínico y prescripciones farmacológicas directamente a la app CUDI",
                    "Disponibilidad": "365 días al año, las 24 horas del día"
                },
                "expertVerdict": "Dra. Elena Sánchez: 'Poder atender a un animal con torsión o traumatismo sin el estrés añadido del traslado a la clínica aumenta la probabilidad de éxito de manera crítica.'",
                "userReviews": [
                    {
                        "user": "Marcos G.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "Mi perro empezó a convulsionar de noche y la veterinaria llegó rapidísimo con medicación. Le salvaron la vida."
                    },
                    {
                        "user": "Lidia V.",
                        "city": "Barcelona",
                        "rating": 5,
                        "comment": "Atención humana y profesional inmejorable en un momento de pánico."
                    }
                ],
                "url": "producto-vethome-urgencias-domicilio.html",
                "priceFormatted": "75.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "cudi-veterinaria-clinica-hero.jpg",
                "studyUrl": "estudio-vethome-urgencias-domicilio.html",
                "studyTitle": "Evaluación Clínica del Impacto de VetHome CUDI - Urgencias Veterinarias a Domicilio 24/7 en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.99239",
                "studyJournal": "Journal of Veterinary Internal Medicine (JVIM)",
                "studyAuthors": "Dr. Javier Méndez (Diplomado ECVIM-CA), Dra. Rocío Santamaría (Medicina Preventiva)",
                "studyInstitution": "Red Hospitalaria Veterinaria CUDI & Departamento de Medicina Interna",
                "studySourceName": "PubMed / JVIM Archive",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+preventive+medicine+early+triage",
                "studyMetricLabel": "Tasa de Detección Temprana Pre-Sintomática",
                "studyMetricVal": "+79.5%",
                "studyChartType": "line",
                "studyChartLabel": "Eficacia de Intervención Temprana (%)",
                "studyChartLabels": [
                    "Mes 1",
                    "Mes 3",
                    "Mes 6",
                    "Mes 9",
                    "Mes 12"
                ],
                "studyChartControl": [
                    32,
                    35,
                    41,
                    45,
                    48
                ],
                "studyChartCudi": [
                    32,
                    65,
                    84,
                    92,
                    95
                ]
            },
            {
                "id": "SKU-CLINIC-02",
                "slug": "medipet-express-teleconsulta-ia",
                "name": "MediPet Express - Teleconsulta Veterinaria Inmediata con Triaje IA",
                "shortTitle": "MediPet Express Teleconsulta",
                "category": "Veterinaria & Salud 24/7",
                "categorySlug": "clinica",
                "categoryLabel": "Atención Veterinaria 24/7",
                "price": 35,
                "rating": 4.9,
                "reviewsCount": 312,
                "species": "both",
                "partner": "TeleVet Specialists",
                "partnerRole": "Telemedicina Oficial",
                "badge": "Respuesta < 3 min",
                "badgeIcon": "fa-video",
                "badgeColor": "#0284c7",
                "img": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=85",
                    "cudi-veterinaria-clinica-hero.jpg",
                    "https://images.unsplash.com/photo-1599443015574-be5fe8a05783?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Videoconsulta de alta definición con veterinario colegiado en menos de 3 minutos con receta electrónica oficial válida en farmacias.",
                "fullDesc": "Resuelve dudas de ingestión de tóxicos, heridas leves, diarreas o dosis de medicamentos desde el sofá con receta homologada y derivación preferente a clínica física si es necesario.",
                "specs": {
                    "Tiempo de Conexión": "Promedio de 2 minutos 40 segundos",
                    "Plataforma": "Videollamada encriptada punto a punto en la app CUDI con captura fotográfica HD",
                    "Receta Médica": "Receta electrónica oficial con firma digital del Colegio de Veterinarios",
                    "Seguimiento": "Chat médico de control activo durante 48 horas tras la consulta"
                },
                "expertVerdict": "Dr. Fernando Morales: 'El triaje previo con los datos del collar inteligente nos permite saber la frecuencia cardíaca y temperatura antes de contestar la videollamada.'",
                "userReviews": [
                    {
                        "user": "Natalia R.",
                        "city": "Valencia",
                        "rating": 5,
                        "comment": "Mi cachorro comió chocolate y en 2 minutos el veterinario me guió paso a paso. Eficacia total."
                    }
                ],
                "url": "producto-medipet-express-teleconsulta-ia.html",
                "priceFormatted": "35.00 €",
                "target_species": "gato",
                "gallery_img": "cudi-veterinaria-clinica-hero.jpg",
                "gallery_img_2": "https://images.unsplash.com/photo-1599443015574-be5fe8a05783?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-medipet-express-teleconsulta-ia.html",
                "studyTitle": "Evaluación Clínica del Impacto de MediPet Express - Teleconsulta Veterinaria Inmediata con Triaje IA en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.38396",
                "studyJournal": "Journal of Veterinary Internal Medicine (JVIM)",
                "studyAuthors": "Dr. Javier Méndez (Diplomado ECVIM-CA), Dra. Rocío Santamaría (Medicina Preventiva)",
                "studyInstitution": "Red Hospitalaria Veterinaria CUDI & Departamento de Medicina Interna",
                "studySourceName": "PubMed / JVIM Archive",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+preventive+medicine+early+triage",
                "studyMetricLabel": "Tasa de Detección Temprana Pre-Sintomática",
                "studyMetricVal": "+79.5%",
                "studyChartType": "line",
                "studyChartLabel": "Eficacia de Intervención Temprana (%)",
                "studyChartLabels": [
                    "Mes 1",
                    "Mes 3",
                    "Mes 6",
                    "Mes 9",
                    "Mes 12"
                ],
                "studyChartControl": [
                    32,
                    35,
                    41,
                    45,
                    48
                ],
                "studyChartCudi": [
                    32,
                    65,
                    84,
                    92,
                    95
                ]
            },
            {
                "id": "SKU-CLINIC-03",
                "slug": "hospital-clinico-dual-chequeo-anual",
                "name": "Hospital Clínico Dual - Chequeo Preventivo Integral Anual",
                "shortTitle": "Hospital Dual Chequeo Anual",
                "category": "Veterinaria & Salud 24/7",
                "categorySlug": "clinica",
                "categoryLabel": "Atención Veterinaria 24/7",
                "price": 60,
                "rating": 4.9,
                "reviewsCount": 189,
                "species": "both",
                "partner": "Hospital Veterinario Central",
                "partnerRole": "Red Hospitalaria Certificada",
                "badge": "Medicina Preventiva",
                "badgeIcon": "fa-hospital",
                "badgeColor": "#10b981",
                "img": "cudi-veterinaria-clinica-hero.jpg",
                "gallery": [
                    "cudi-veterinaria-clinica-hero.jpg",
                    "https://images.unsplash.com/photo-1599443015574-be5fe8a05783?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Revisión física exhaustiva que incluye analítica de sangre completa, bioquímica de 16 parámetros, ecografía abdominal básica y vacunas anuales.",
                "fullDesc": "La clave de la longevidad de tu perro o gato. Detecta enfermedades silentes antes de que den la cara con informe médico digitalizado en el expediente CUDI.",
                "specs": {
                    "Pruebas Incluidas": "Hemograma, perfil renal y hepático, glucosa, ecografía de cribado y revisión oftalmológica/dental",
                    "Vacunación": "Rabia y Polivalente según pauta autonómica oficial",
                    "Duración": "Cita presencial de 45 minutos sin esperas con cita previa prioritaria",
                    "Red de Centros": "Más de 140 hospitales veterinarios asociados en España"
                },
                "expertVerdict": "Dra. Esther Quintana: 'El chequeo anual preventivo aumenta la esperanza media de vida de perros y gatos en más de 2.5 años.'",
                "userReviews": [
                    {
                        "user": "Rubén F.",
                        "city": "Zaragoza",
                        "rating": 5,
                        "comment": "Trato exquisito y el informe completo quedó guardado en el perfil de mi mascota en la app."
                    }
                ],
                "url": "producto-hospital-clinico-dual-chequeo-anual.html",
                "priceFormatted": "60.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1599443015574-be5fe8a05783?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-hospital-clinico-dual-chequeo-anual.html",
                "studyTitle": "Evaluación Clínica del Impacto de Hospital Clínico Dual - Chequeo Preventivo Integral Anual en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.40355",
                "studyJournal": "Journal of Veterinary Internal Medicine (JVIM)",
                "studyAuthors": "Dr. Javier Méndez (Diplomado ECVIM-CA), Dra. Rocío Santamaría (Medicina Preventiva)",
                "studyInstitution": "Red Hospitalaria Veterinaria CUDI & Departamento de Medicina Interna",
                "studySourceName": "PubMed / JVIM Archive",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+preventive+medicine+early+triage",
                "studyMetricLabel": "Tasa de Detección Temprana Pre-Sintomática",
                "studyMetricVal": "+79.5%",
                "studyChartType": "line",
                "studyChartLabel": "Eficacia de Intervención Temprana (%)",
                "studyChartLabels": [
                    "Mes 1",
                    "Mes 3",
                    "Mes 6",
                    "Mes 9",
                    "Mes 12"
                ],
                "studyChartControl": [
                    32,
                    35,
                    41,
                    45,
                    48
                ],
                "studyChartCudi": [
                    32,
                    65,
                    84,
                    92,
                    95
                ]
            },
            {
                "id": "SKU-CLINIC-04",
                "slug": "cudi-vacunacion-pasaporte-rabia",
                "name": "Pack Vacunación Oficial & Pasaporte Europeo de Mascota",
                "shortTitle": "Vacunación & Pasaporte UE",
                "category": "Veterinaria & Salud 24/7",
                "categorySlug": "clinica",
                "categoryLabel": "Atención Veterinaria 24/7",
                "price": 42,
                "rating": 4.8,
                "reviewsCount": 140,
                "species": "both",
                "partner": "Red Clínicas Partners CUDI",
                "partnerRole": "Clínicas Colegiadas",
                "badge": "Documentación Oficial",
                "badgeIcon": "fa-passport",
                "badgeColor": "#6366f1",
                "img": "https://images.unsplash.com/photo-1599443015574-be5fe8a05783?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1599443015574-be5fe8a05783?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Emisión del Pasaporte Oficial de la Unión Europea para animales de compañía con vacuna antirrábica y desparasitación equinocócica para viajar.",
                "fullDesc": "Deja a tu perro o gato listo para viajar en avión, tren o cruzar fronteras europeas sin complicaciones burocráticas.",
                "specs": {
                    "Documento": "Pasaporte Oficial UE homologado por la DGT y Ministerio de Agricultura",
                    "Vacuna": "Vacuna antirrábica con validez comunitaria de 1 a 3 años",
                    "Microchip": "Lectura y certificación en bases de datos AIAC/REIAC",
                    "Cita": "Presencial en tu clínica asociada más cercana"
                },
                "expertVerdict": "Dra. Sofía Alarcón: 'Esencial planificarlo con 21 días de antelación al viaje por periodo de seroconversión de la rabia.'",
                "userReviews": [
                    {
                        "user": "Andrea M.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "Todo tramitado en 20 minutos para volar a Francia con mi caniche."
                    }
                ],
                "url": "producto-cudi-vacunacion-pasaporte-rabia.html",
                "priceFormatted": "42.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-cudi-vacunacion-pasaporte-rabia.html",
                "studyTitle": "Evaluación Clínica del Impacto de Pack Vacunación Oficial & Pasaporte Europeo de Mascota en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.47987",
                "studyJournal": "Journal of Veterinary Internal Medicine (JVIM)",
                "studyAuthors": "Dr. Javier Méndez (Diplomado ECVIM-CA), Dra. Rocío Santamaría (Medicina Preventiva)",
                "studyInstitution": "Red Hospitalaria Veterinaria CUDI & Departamento de Medicina Interna",
                "studySourceName": "PubMed / JVIM Archive",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+preventive+medicine+early+triage",
                "studyMetricLabel": "Tasa de Detección Temprana Pre-Sintomática",
                "studyMetricVal": "+79.5%",
                "studyChartType": "line",
                "studyChartLabel": "Eficacia de Intervención Temprana (%)",
                "studyChartLabels": [
                    "Mes 1",
                    "Mes 3",
                    "Mes 6",
                    "Mes 9",
                    "Mes 12"
                ],
                "studyChartControl": [
                    32,
                    35,
                    41,
                    45,
                    48
                ],
                "studyChartCudi": [
                    32,
                    65,
                    84,
                    92,
                    95
                ]
            },
            {
                "id": "SKU-CLINIC-05",
                "slug": "limpieza-dental-ultrasonidos-cudi",
                "name": "Profilaxis Dental por Ultrasonidos & Pulido con Flúor",
                "shortTitle": "Limpieza Dental Ultrasonidos",
                "category": "Veterinaria & Salud 24/7",
                "categorySlug": "clinica",
                "categoryLabel": "Atención Veterinaria 24/7",
                "price": 95,
                "rating": 4.9,
                "reviewsCount": 118,
                "species": "both",
                "partner": "Hospital Veterinario Central",
                "partnerRole": "Unidad Dental Quirúrgica",
                "badge": "Salud Gingival",
                "badgeIcon": "fa-teeth",
                "badgeColor": "#06b6d4",
                "img": "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Limpieza profunda subgingival con escarificador ultrasónico y pulido de esmalte para prevenir periodontitis y pérdida prematura de piezas dentales.",
                "fullDesc": "Incluye monitorización anestésica avanzada por anestesiólogo colegiado y medicación analgésica preventiva para una recuperación rápida y sin dolor.",
                "specs": {
                    "Tecnología": "Piezotome dental veterinario que no daña el esmalte sano",
                    "Anestesia": "Anestesia inhalatoria con sevoflurano y premedicación multimodal",
                    "Postoperatorio": "Entrega al dueño despierto y caminando el mismo día",
                    "Garantía": "Dientes libres de sarro y encías desinflamadas"
                },
                "expertVerdict": "Dra. Lucía Soria: 'Las bacterias periodontales viajan al corazón y riñones; cuidar la boca alarga los años de vida del animal.'",
                "userReviews": [
                    {
                        "user": "Moisés B.",
                        "city": "Bilbao",
                        "rating": 5,
                        "comment": "A mi yorkshire le desapareció el mal olor de boca por completo. Excelente atención."
                    }
                ],
                "url": "producto-limpieza-dental-ultrasonidos-cudi.html",
                "priceFormatted": "95.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-limpieza-dental-ultrasonidos-cudi.html",
                "studyTitle": "Evaluación Clínica del Impacto de Profilaxis Dental por Ultrasonidos & Pulido con Flúor en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.68955",
                "studyJournal": "Journal of Veterinary Internal Medicine (JVIM)",
                "studyAuthors": "Dr. Javier Méndez (Diplomado ECVIM-CA), Dra. Rocío Santamaría (Medicina Preventiva)",
                "studyInstitution": "Red Hospitalaria Veterinaria CUDI & Departamento de Medicina Interna",
                "studySourceName": "PubMed / JVIM Archive",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+preventive+medicine+early+triage",
                "studyMetricLabel": "Tasa de Detección Temprana Pre-Sintomática",
                "studyMetricVal": "+79.5%",
                "studyChartType": "line",
                "studyChartLabel": "Eficacia de Intervención Temprana (%)",
                "studyChartLabels": [
                    "Mes 1",
                    "Mes 3",
                    "Mes 6",
                    "Mes 9",
                    "Mes 12"
                ],
                "studyChartControl": [
                    32,
                    35,
                    41,
                    45,
                    48
                ],
                "studyChartCudi": [
                    32,
                    65,
                    84,
                    92,
                    95
                ]
            },
            {
                "id": "SKU-CLINIC-06",
                "slug": "castracion-laparoscopica-avanzada",
                "name": "Esterilización / Castración por Laparoscopia Mínimamente Invasiva",
                "shortTitle": "Esterilización Laparoscópica",
                "category": "Veterinaria & Salud 24/7",
                "categorySlug": "clinica",
                "categoryLabel": "Atención Veterinaria 24/7",
                "price": 180,
                "rating": 5,
                "reviewsCount": 156,
                "species": "both",
                "partner": "Hospital Veterinario Central",
                "partnerRole": "Cirugía Avanzada",
                "badge": "Cirugía Mínima Invasión",
                "badgeIcon": "fa-scissors",
                "badgeColor": "#8b5cf6",
                "img": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Intervención quirúrgica con óptica de alta resolución a través de dos microincisiones de 5mm con recuperación en 48 horas y sin collar isabelino.",
                "fullDesc": "La técnica quirúrgica más segura y respetuosa disponible en medicina veterinaria moderna. Reduce el dolor postoperatorio un 70% comparado con la cirugía abierta.",
                "specs": {
                    "Incisión": "Dos orificios milimétricos cerrados con pegamento dérmico quirúrgico (sin puntos externos)",
                    "Dolor": "Mínimo trauma tisular que no requiere collar de protección en la mayoría de casos",
                    "Analgesia": "Infusión continua intraoperatoria y analgesia domiciliaria de rescate",
                    "Alta": "El mismo día en régimen ambulatorio"
                },
                "expertVerdict": "Dr. Jordi Rovira: 'Es el estándar de oro en perras y gatas; corren al día siguiente como si nada hubiera pasado.'",
                "userReviews": [
                    {
                        "user": "Paloma S.",
                        "city": "Málaga",
                        "rating": 5,
                        "comment": "Mi perra no se enteró de la operación. Sin puntos molestos ni cono plástico. Impresionante."
                    }
                ],
                "url": "producto-castracion-laparoscopica-avanzada.html",
                "priceFormatted": "180.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-castracion-laparoscopica-avanzada.html",
                "studyTitle": "Evaluación Clínica del Impacto de Esterilización / Castración por Laparoscopia Mínimamente Invasiva en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.17292",
                "studyJournal": "Journal of Veterinary Internal Medicine (JVIM)",
                "studyAuthors": "Dr. Javier Méndez (Diplomado ECVIM-CA), Dra. Rocío Santamaría (Medicina Preventiva)",
                "studyInstitution": "Red Hospitalaria Veterinaria CUDI & Departamento de Medicina Interna",
                "studySourceName": "PubMed / JVIM Archive",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+preventive+medicine+early+triage",
                "studyMetricLabel": "Tasa de Detección Temprana Pre-Sintomática",
                "studyMetricVal": "+79.5%",
                "studyChartType": "line",
                "studyChartLabel": "Eficacia de Intervención Temprana (%)",
                "studyChartLabels": [
                    "Mes 1",
                    "Mes 3",
                    "Mes 6",
                    "Mes 9",
                    "Mes 12"
                ],
                "studyChartControl": [
                    32,
                    35,
                    41,
                    45,
                    48
                ],
                "studyChartCudi": [
                    32,
                    65,
                    84,
                    92,
                    95
                ]
            },
            {
                "id": "SKU-CLINIC-07",
                "slug": "test-genetico-adn-longevidad-cudi",
                "name": "Test Genético CUDI BioDNA - Salud, Razas & Longevidad",
                "shortTitle": "Test Genético BioDNA",
                "category": "Veterinaria & Salud 24/7",
                "categorySlug": "clinica",
                "categoryLabel": "Atención Veterinaria 24/7",
                "price": 89,
                "rating": 4.9,
                "reviewsCount": 204,
                "species": "both",
                "partner": "BioSense Vet Tech",
                "partnerRole": "Genómica Animal",
                "badge": "Genética Preventiva",
                "badgeIcon": "fa-dna",
                "badgeColor": "#ec4899",
                "img": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Hisopo bucal no invasivo que analiza más de 250 variantes de enfermedades hereditarias, sensibilidad a fármacos (MDR1) y porcentaje de razas.",
                "fullDesc": "Toma la muestra en casa frotando la mejilla de tu mascota y recibe en 3 semanas un informe genómico de 40 páginas sincronizado en el gemelo digital.",
                "specs": {
                    "Marcadores": "Cribado de 250+ mutaciones monogénicas y longitud de telómeros",
                    "Farmacogenética": "Detección de la mutación MDR1 que hace mortales a ciertos antibióticos y antiparasitarios",
                    "Envío": "Kit con franqueo de devolución al laboratorio certificado incluido",
                    "Integración": "La IA de CUDI adapta las alertas nutricionales y farmacológicas al perfil genético"
                },
                "expertVerdict": "Dra. Patricia Méndez: 'Descubrir una mutación MDR1 a tiempo salva la vida del animal ante una simple sedación común.'",
                "userReviews": [
                    {
                        "user": "Carles T.",
                        "city": "Girona",
                        "rating": 5,
                        "comment": "Descubrimos que nuestro perro mestizo era 50% border collie y tenía sensibilidad a fármacos. Una información vital."
                    }
                ],
                "url": "producto-test-genetico-adn-longevidad-cudi.html",
                "priceFormatted": "89.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-test-genetico-adn-longevidad-cudi.html",
                "studyTitle": "Evaluación Clínica del Impacto de Test Genético CUDI BioDNA - Salud, Razas & Longevidad en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.54750",
                "studyJournal": "Journal of Veterinary Internal Medicine (JVIM)",
                "studyAuthors": "Dr. Javier Méndez (Diplomado ECVIM-CA), Dra. Rocío Santamaría (Medicina Preventiva)",
                "studyInstitution": "Red Hospitalaria Veterinaria CUDI & Departamento de Medicina Interna",
                "studySourceName": "PubMed / JVIM Archive",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+preventive+medicine+early+triage",
                "studyMetricLabel": "Tasa de Detección Temprana Pre-Sintomática",
                "studyMetricVal": "+79.5%",
                "studyChartType": "line",
                "studyChartLabel": "Eficacia de Intervención Temprana (%)",
                "studyChartLabels": [
                    "Mes 1",
                    "Mes 3",
                    "Mes 6",
                    "Mes 9",
                    "Mes 12"
                ],
                "studyChartControl": [
                    32,
                    35,
                    41,
                    45,
                    48
                ],
                "studyChartCudi": [
                    32,
                    65,
                    84,
                    92,
                    95
                ]
            },
            {
                "id": "SKU-CLINIC-08",
                "slug": "ecografia-abdominal-alta-resolucion",
                "name": "Ecografía Abdominal Completa con Especialista de Imagen",
                "shortTitle": "Ecografía Abdominal Especialista",
                "category": "Veterinaria & Salud 24/7",
                "categorySlug": "clinica",
                "categoryLabel": "Atención Veterinaria 24/7",
                "price": 68,
                "rating": 4.9,
                "reviewsCount": 97,
                "species": "both",
                "partner": "Hospital Veterinario Central",
                "partnerRole": "Diagnóstico por Imagen",
                "badge": "Ecografía Doppler",
                "badgeIcon": "fa-wave-square",
                "badgeColor": "#0284c7",
                "img": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Estudio ecográfico abdominal de 8 órganos con sondas de microconvex y lineal de alta frecuencia para diagnóstico de patologías ocultas.",
                "fullDesc": "Evaluación detallada de hígado, bazo, riñones, páncreas, estómago, vejiga y ganglios linfáticos sin dolor ni anestesia.",
                "specs": {
                    "Sondas": "Sondas matriciales de 12 MHz para máxima resolución de cortes tisulares",
                    "Doppler": "Doppler color y pulsado para flujos vasculares porta y renales",
                    "Informe": "Vídeos e imágenes DICOM subidos a la nube médica de CUDI con firma facultativa",
                    "Tiempo": "Sesión de 30 minutos sin requerir sedación en el 95% de casos"
                },
                "expertVerdict": "Dr. Fernando Morales: 'Imprescindible en animales con vómitos crónicos, pérdida de peso o sospecha de cuerpo extraño.'",
                "userReviews": [
                    {
                        "user": "Beatriz G.",
                        "city": "Sevilla",
                        "rating": 5,
                        "comment": "Detectaron a tiempo un cálculo que no salía en las radiografías convencionales."
                    }
                ],
                "url": "producto-ecografia-abdominal-alta-resolucion.html",
                "priceFormatted": "68.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-ecografia-abdominal-alta-resolucion.html",
                "studyTitle": "Evaluación Clínica del Impacto de Ecografía Abdominal Completa con Especialista de Imagen en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.96641",
                "studyJournal": "Journal of Veterinary Internal Medicine (JVIM)",
                "studyAuthors": "Dr. Javier Méndez (Diplomado ECVIM-CA), Dra. Rocío Santamaría (Medicina Preventiva)",
                "studyInstitution": "Red Hospitalaria Veterinaria CUDI & Departamento de Medicina Interna",
                "studySourceName": "PubMed / JVIM Archive",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+preventive+medicine+early+triage",
                "studyMetricLabel": "Tasa de Detección Temprana Pre-Sintomática",
                "studyMetricVal": "+79.5%",
                "studyChartType": "line",
                "studyChartLabel": "Eficacia de Intervención Temprana (%)",
                "studyChartLabels": [
                    "Mes 1",
                    "Mes 3",
                    "Mes 6",
                    "Mes 9",
                    "Mes 12"
                ],
                "studyChartControl": [
                    32,
                    35,
                    41,
                    45,
                    48
                ],
                "studyChartCudi": [
                    32,
                    65,
                    84,
                    92,
                    95
                ]
            },
            {
                "id": "SKU-CLINIC-09",
                "slug": "fisioterapia-rehabilitacion-hidroterapia",
                "name": "Sesión de Fisioterapia & Hidroterapia Subacuática Canina",
                "shortTitle": "Fisioterapia Canina & Hidro",
                "category": "Veterinaria & Salud 24/7",
                "categorySlug": "clinica",
                "categoryLabel": "Atención Veterinaria 24/7",
                "price": 50,
                "rating": 5,
                "reviewsCount": 110,
                "species": "dog",
                "partner": "Red Clínicas Partners CUDI",
                "partnerRole": "Rehabilitación Motora",
                "badge": "Recuperación Articular",
                "badgeIcon": "fa-water",
                "badgeColor": "#06b6d4",
                "img": "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Cinta subacuática con agua termal climatizada, láser terapéutico clase IV y magnetoterapia para recuperar movilidad tras cirugías o artrosis.",
                "fullDesc": "La flotabilidad del agua reduce el impacto en articulaciones un 80%, permitiendo a perros con hernias discales o displasias ganar masa muscular sin dolor.",
                "specs": {
                    "Instalación": "Piscina y cinta hidroterápica con turbinas de resistencia contracorriente",
                    "Láser": "Láser terapéutico K-Laser de alta potencia para regeneración tisular y desinflamación",
                    "Duración": "Sesión personalizada de 50 minutos con fisioterapeuta exclusivo",
                    "Monitoreo": "Medición de rango articular con goniómetro en cada cita"
                },
                "expertVerdict": "Fisioterapeuta Roberto M.: 'Perros que salían operados de ligamento cruzado han vuelto a correr en la mitad de tiempo gracias al agua.'",
                "userReviews": [
                    {
                        "user": "Lorena D.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "Mi teckel con hernia discal ha vuelto a caminar gracias a estas sesiones. Pura magia."
                    }
                ],
                "url": "producto-fisioterapia-rehabilitacion-hidroterapia.html",
                "priceFormatted": "50.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-fisioterapia-rehabilitacion-hidroterapia.html",
                "studyTitle": "Evaluación Clínica del Impacto de Sesión de Fisioterapia & Hidroterapia Subacuática Canina en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.55508",
                "studyJournal": "Journal of Veterinary Internal Medicine (JVIM)",
                "studyAuthors": "Dr. Javier Méndez (Diplomado ECVIM-CA), Dra. Rocío Santamaría (Medicina Preventiva)",
                "studyInstitution": "Red Hospitalaria Veterinaria CUDI & Departamento de Medicina Interna",
                "studySourceName": "PubMed / JVIM Archive",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+preventive+medicine+early+triage",
                "studyMetricLabel": "Tasa de Detección Temprana Pre-Sintomática",
                "studyMetricVal": "+79.5%",
                "studyChartType": "line",
                "studyChartLabel": "Eficacia de Intervención Temprana (%)",
                "studyChartLabels": [
                    "Mes 1",
                    "Mes 3",
                    "Mes 6",
                    "Mes 9",
                    "Mes 12"
                ],
                "studyChartControl": [
                    32,
                    35,
                    41,
                    45,
                    48
                ],
                "studyChartCudi": [
                    32,
                    65,
                    84,
                    92,
                    95
                ]
            },
            {
                "id": "SKU-CLINIC-10",
                "slug": "consulta-etologia-comportamiento-canino",
                "name": "Consulta Clínica de Etología & Modificación de Conducta",
                "shortTitle": "Consulta Etología Clínica",
                "category": "Veterinaria & Salud 24/7",
                "categorySlug": "clinica",
                "categoryLabel": "Atención Veterinaria 24/7",
                "price": 70,
                "rating": 4.9,
                "reviewsCount": 142,
                "species": "both",
                "partner": "Red Clínicas Partners CUDI",
                "partnerRole": "Medicina del Comportamiento",
                "badge": "Psicología Animal",
                "badgeIcon": "fa-brain",
                "badgeColor": "#f59e0b",
                "img": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Evaluación por veterinario especialista en etología clínica para tratar agresividad, miedos fóbicos, ansiedad por separación o eliminación inadecuada.",
                "fullDesc": "Incluye diagnóstico etológico diferencial para descartar dolor físico subyacente y plan integral de modificación conductual en positivo.",
                "specs": {
                    "Duración": "Consulta inicial intensiva de 90 minutos en clínica o domicilio",
                    "Plan Escrito": "Protocolo detallado de enriquecimiento ambiental y pautas familiares",
                    "Soporte": "Revisión de vídeos de conducta por mensajería durante 30 días",
                    "Psicofarmacología": "Prescripción facultativa de moduladores de serotonina si el cuadro lo requiere"
                },
                "expertVerdict": "Etóloga Marina Soler: 'Más del 60% de los problemas de conducta son secundarios a dolor o patologías médicas inadvertidas.'",
                "userReviews": [
                    {
                        "user": "Guillermo F.",
                        "city": "Pamplona",
                        "rating": 5,
                        "comment": "La relación con nuestro perro adoptado cambió de la noche a la mañana con las pautas de Marina."
                    }
                ],
                "url": "producto-consulta-etologia-comportamiento-canino.html",
                "priceFormatted": "70.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-consulta-etologia-comportamiento-canino.html",
                "studyTitle": "Evaluación Clínica del Impacto de Consulta Clínica de Etología & Modificación de Conducta en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.24330",
                "studyJournal": "Journal of Veterinary Internal Medicine (JVIM)",
                "studyAuthors": "Dr. Javier Méndez (Diplomado ECVIM-CA), Dra. Rocío Santamaría (Medicina Preventiva)",
                "studyInstitution": "Red Hospitalaria Veterinaria CUDI & Departamento de Medicina Interna",
                "studySourceName": "PubMed / JVIM Archive",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+preventive+medicine+early+triage",
                "studyMetricLabel": "Tasa de Detección Temprana Pre-Sintomática",
                "studyMetricVal": "+79.5%",
                "studyChartType": "line",
                "studyChartLabel": "Eficacia de Intervención Temprana (%)",
                "studyChartLabels": [
                    "Mes 1",
                    "Mes 3",
                    "Mes 6",
                    "Mes 9",
                    "Mes 12"
                ],
                "studyChartControl": [
                    32,
                    35,
                    41,
                    45,
                    48
                ],
                "studyChartCudi": [
                    32,
                    65,
                    84,
                    92,
                    95
                ]
            },
            {
                "id": "SKU-CLINIC-11",
                "slug": "analisis-sangre-completo-bioquimica",
                "name": "Perfil Bioquímico & Hematológico Integral de Laboratorio",
                "shortTitle": "Analítica Sanguínea Completa",
                "category": "Veterinaria & Salud 24/7",
                "categorySlug": "clinica",
                "categoryLabel": "Atención Veterinaria 24/7",
                "price": 48,
                "rating": 4.9,
                "reviewsCount": 165,
                "species": "both",
                "partner": "Hospital Veterinario Central",
                "partnerRole": "Laboratorio Clínico",
                "badge": "Laboratorio Central",
                "badgeIcon": "fa-vial",
                "badgeColor": "#ef4444",
                "img": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Analítica en laboratorio acreditado con hemograma completo de 5 poblaciones, bioquímica general de 18 parámetros y electrolitos séricos.",
                "fullDesc": "Resultados en menos de 12 horas con interpretación clínica automática por IA y aviso a tu veterinario de cabecera.",
                "specs": {
                    "Parámetros": "Urea, Creatinina, SDMA, ALT, AST, FA, Bilirrubina, Glucosa, Proteínas totales, Albúmina, Na+, K+, Cl-",
                    "Plazo de Entrega": "Mismo día por la tarde vía app en formato PDF firmado",
                    "Muestra": "Extracción rápida en menos de 3 minutos por personal de enfermería especializado"
                },
                "expertVerdict": "Dra. Esther Quintana: 'La inclusión del marcador renal temprano SDMA permite detectar daño renal cuando aún queda un 60% de función activa.'",
                "userReviews": [
                    {
                        "user": "Claudia P.",
                        "city": "Salamanca",
                        "rating": 5,
                        "comment": "Rápido, indoloro y con explicaciones muy claras de cada valor en el informe."
                    }
                ],
                "url": "producto-analisis-sangre-completo-bioquimica.html",
                "priceFormatted": "48.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-analisis-sangre-completo-bioquimica.html",
                "studyTitle": "Evaluación Clínica del Impacto de Perfil Bioquímico & Hematológico Integral de Laboratorio en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.77552",
                "studyJournal": "Journal of Veterinary Internal Medicine (JVIM)",
                "studyAuthors": "Dr. Javier Méndez (Diplomado ECVIM-CA), Dra. Rocío Santamaría (Medicina Preventiva)",
                "studyInstitution": "Red Hospitalaria Veterinaria CUDI & Departamento de Medicina Interna",
                "studySourceName": "PubMed / JVIM Archive",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+preventive+medicine+early+triage",
                "studyMetricLabel": "Tasa de Detección Temprana Pre-Sintomática",
                "studyMetricVal": "+79.5%",
                "studyChartType": "line",
                "studyChartLabel": "Eficacia de Intervención Temprana (%)",
                "studyChartLabels": [
                    "Mes 1",
                    "Mes 3",
                    "Mes 6",
                    "Mes 9",
                    "Mes 12"
                ],
                "studyChartControl": [
                    32,
                    35,
                    41,
                    45,
                    48
                ],
                "studyChartCudi": [
                    32,
                    65,
                    84,
                    92,
                    95
                ]
            },
            {
                "id": "SKU-CLINIC-12",
                "slug": "ecocardiograma-doppler-cardiaco",
                "name": "Ecocardiograma Color & Electrocardiograma Digital",
                "shortTitle": "Ecocardiograma Doppler",
                "category": "Veterinaria & Salud 24/7",
                "categorySlug": "clinica",
                "categoryLabel": "Atención Veterinaria 24/7",
                "price": 85,
                "rating": 5,
                "reviewsCount": 82,
                "species": "both",
                "partner": "Hospital Veterinario Central",
                "partnerRole": "Unidad de Cardiología",
                "badge": "Cardiología Avanzada",
                "badgeIcon": "fa-heart-pulse",
                "badgeColor": "#e11d48",
                "img": "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Estudio morfológico y hemodinámico de las cavidades cardíacas para diagnosticar soplos, valvulopatía mitral o miocardiopatía hipertrófica felina.",
                "fullDesc": "Imprescindible antes de someter a animales senior a cirugías o para razas predispuestas (Cavalier, Dóberman, Maine Coon, Sphynx).",
                "specs": {
                    "Técnica": "Modo B, Modo M, Doppler espectral continuo/pulsado y Doppler tisular",
                    "ECG Simultáneo": "Registro continuo de ritmo para sincronización de ondas",
                    "Especialista": "Realizado por cardiólogo veterinario certificado",
                    "Tratamiento": "Prescripción de IECA o pimobendán ajustada al estadio clínico exacto"
                },
                "expertVerdict": "Dr. Fernando Morales: 'Identificar una disfunción ventricular antes de la aparición de edema pulmonar duplica los meses de calidad de vida.'",
                "userReviews": [
                    {
                        "user": "Ángeles R.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "Ajustaron la dosis del corazón de mi cavalier y ahora no tose nada por las noches."
                    }
                ],
                "url": "producto-ecocardiograma-doppler-cardiaco.html",
                "priceFormatted": "85.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-ecocardiograma-doppler-cardiaco.html",
                "studyTitle": "Evaluación Clínica del Impacto de Ecocardiograma Color & Electrocardiograma Digital en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.64700",
                "studyJournal": "Journal of Veterinary Internal Medicine (JVIM)",
                "studyAuthors": "Dr. Javier Méndez (Diplomado ECVIM-CA), Dra. Rocío Santamaría (Medicina Preventiva)",
                "studyInstitution": "Red Hospitalaria Veterinaria CUDI & Departamento de Medicina Interna",
                "studySourceName": "PubMed / JVIM Archive",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+preventive+medicine+early+triage",
                "studyMetricLabel": "Tasa de Detección Temprana Pre-Sintomática",
                "studyMetricVal": "+79.5%",
                "studyChartType": "line",
                "studyChartLabel": "Eficacia de Intervención Temprana (%)",
                "studyChartLabels": [
                    "Mes 1",
                    "Mes 3",
                    "Mes 6",
                    "Mes 9",
                    "Mes 12"
                ],
                "studyChartControl": [
                    32,
                    35,
                    41,
                    45,
                    48
                ],
                "studyChartCudi": [
                    32,
                    65,
                    84,
                    92,
                    95
                ]
            },
            {
                "id": "SKU-CLINIC-13",
                "slug": "test-leishmania-cribado-vectoriales",
                "name": "Cribado Rápido Serológico de Leishmania, Filaria & Borrelia (4DX)",
                "shortTitle": "Cribado 4DX Leishmania & Parásitos",
                "category": "Veterinaria & Salud 24/7",
                "categorySlug": "clinica",
                "categoryLabel": "Atención Veterinaria 24/7",
                "price": 32,
                "rating": 4.9,
                "reviewsCount": 218,
                "species": "dog",
                "partner": "Red Clínicas Partners CUDI",
                "partnerRole": "Enfermedades Infecciosas",
                "badge": "Cribado Vectorial",
                "badgeIcon": "fa-bug",
                "badgeColor": "#f97316",
                "img": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Test de sangre en 8 minutos para descartar enfermedades transmitidas por mosquitos (filaria, leishmaniosis) y garrapatas (anaplasma, lyme).",
                "fullDesc": "Recomendado en otoño y primavera para todos los perros que habitan o veranean en la cuenca mediterránea e interior peninsular.",
                "specs": {
                    "Método": "Inmunocromatografía ELISA con anticuerpos monoclonales de alta sensibilidad (>98%)",
                    "Resultados": "Inmediatos en 8 minutos durante la misma consulta",
                    "Consejo": "Recomendación del antiparasitario más adecuado según la carga de riesgo de tu zona en el mapa CUDI"
                },
                "expertVerdict": "Dra. Sofía Alarcón: 'La detección en fase prepatente permite tratar la leishmania con fármacos suaves sin daño renal permanente.'",
                "userReviews": [
                    {
                        "user": "Tomás N.",
                        "city": "Toledo",
                        "rating": 5,
                        "comment": "Todos los otoños se lo hago a mis dos perros. Rápido, económico y vital."
                    }
                ],
                "url": "producto-test-leishmania-cribado-vectoriales.html",
                "priceFormatted": "32.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-test-leishmania-cribado-vectoriales.html",
                "studyTitle": "Evaluación Clínica del Impacto de Cribado Rápido Serológico de Leishmania, Filaria & Borrelia (4DX) en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.31551",
                "studyJournal": "Journal of Veterinary Internal Medicine (JVIM)",
                "studyAuthors": "Dr. Javier Méndez (Diplomado ECVIM-CA), Dra. Rocío Santamaría (Medicina Preventiva)",
                "studyInstitution": "Red Hospitalaria Veterinaria CUDI & Departamento de Medicina Interna",
                "studySourceName": "PubMed / JVIM Archive",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+preventive+medicine+early+triage",
                "studyMetricLabel": "Tasa de Detección Temprana Pre-Sintomática",
                "studyMetricVal": "+79.5%",
                "studyChartType": "line",
                "studyChartLabel": "Eficacia de Intervención Temprana (%)",
                "studyChartLabels": [
                    "Mes 1",
                    "Mes 3",
                    "Mes 6",
                    "Mes 9",
                    "Mes 12"
                ],
                "studyChartControl": [
                    32,
                    35,
                    41,
                    45,
                    48
                ],
                "studyChartCudi": [
                    32,
                    65,
                    84,
                    92,
                    95
                ]
            },
            {
                "id": "SKU-CLINIC-14",
                "slug": "radiografia-digital-traumatologia",
                "name": "Estudio Radiográfico Digital Directo de Alta Definición (2 Proyecciones)",
                "shortTitle": "Radiografía Digital Directa",
                "category": "Veterinaria & Salud 24/7",
                "categorySlug": "clinica",
                "categoryLabel": "Atención Veterinaria 24/7",
                "price": 55,
                "rating": 4.8,
                "reviewsCount": 114,
                "species": "both",
                "partner": "Hospital Veterinario Central",
                "partnerRole": "Radiología Médica",
                "badge": "Rayos X Digital",
                "badgeIcon": "fa-x-ray",
                "badgeColor": "#475569",
                "img": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                    "cudi-veterinaria-clinica-hero.jpg"
                ],
                "desc": "Placas radiológicas digitales con revelado instantáneo para diagnóstico de fracturas, displasias, artrosis o cuerpos extraños radiopacos.",
                "fullDesc": "Baja dosis de radiación con procesado digital por software que permite ampliar y medir ángulos anatómicos con precisión submilimétrica.",
                "specs": {
                    "Proyecciones": "2 vistas ortogonales (laterolateral y ventrodorsal)",
                    "Tecnología": "Panel detector plano DR de cesio con resolución de 3.5 lp/mm",
                    "Formato": "Imágenes DICOM enviadas al teléfono del propietario al instante"
                },
                "expertVerdict": "Dr. Jordi Rovira: 'La radiología digital directa elimina la repetición de placas y el estrés del animal en la sala de rayos.'",
                "userReviews": [
                    {
                        "user": "Lucía H.",
                        "city": "Burgos",
                        "rating": 5,
                        "comment": "Vimos claramente la fisura en la pata y nos dieron cita con el traumatólogo para esa misma tarde."
                    }
                ],
                "url": "producto-radiografia-digital-traumatologia.html",
                "priceFormatted": "55.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "cudi-veterinaria-clinica-hero.jpg",
                "studyUrl": "estudio-radiografia-digital-traumatologia.html",
                "studyTitle": "Evaluación Clínica del Impacto de Estudio Radiográfico Digital Directo de Alta Definición (2 Proyecciones) en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.90966",
                "studyJournal": "Journal of Veterinary Internal Medicine (JVIM)",
                "studyAuthors": "Dr. Javier Méndez (Diplomado ECVIM-CA), Dra. Rocío Santamaría (Medicina Preventiva)",
                "studyInstitution": "Red Hospitalaria Veterinaria CUDI & Departamento de Medicina Interna",
                "studySourceName": "PubMed / JVIM Archive",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+preventive+medicine+early+triage",
                "studyMetricLabel": "Tasa de Detección Temprana Pre-Sintomática",
                "studyMetricVal": "+79.5%",
                "studyChartType": "line",
                "studyChartLabel": "Eficacia de Intervención Temprana (%)",
                "studyChartLabels": [
                    "Mes 1",
                    "Mes 3",
                    "Mes 6",
                    "Mes 9",
                    "Mes 12"
                ],
                "studyChartControl": [
                    32,
                    35,
                    41,
                    45,
                    48
                ],
                "studyChartCudi": [
                    32,
                    65,
                    84,
                    92,
                    95
                ]
            },
            {
                "id": "SKU-CLINIC-15",
                "slug": "plan-oncologico-cribado-biopsia",
                "name": "Consulta Oncológica & Biopsia / Citología de Bultos con Informe",
                "shortTitle": "Consulta Oncológica & Citología",
                "category": "Veterinaria & Salud 24/7",
                "categorySlug": "clinica",
                "categoryLabel": "Atención Veterinaria 24/7",
                "price": 65,
                "rating": 4.9,
                "reviewsCount": 79,
                "species": "both",
                "partner": "Hospital Veterinario Central",
                "partnerRole": "Oncología Animal",
                "badge": "Oncología Especializada",
                "badgeIcon": "fa-microscope",
                "badgeColor": "#7c3aed",
                "img": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                    "cudi-veterinaria-clinica-hero.jpg",
                    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Punción-aspiración con aguja fina (PAAF) de nódulos cutáneos y masas subcutáneas analizada por patólogo veterinario para diagnóstico precoz.",
                "fullDesc": "No esperes a que un bulto crezca. Conocer si una masa es un lipoma benigno o un mastocitoma agresivo en fase inicial permite salvar la vida del animal con una cirugía sencilla.",
                "specs": {
                    "Procedimiento": "Punción indolora sin anestesia en consulta de 5 minutos",
                    "Patología": "Tinciones Diff-Quik y envío a laboratorio de histopatología certificado",
                    "Plazo de Informe": "Resultado preliminar en 24h y biopsia definitiva en 5 días hábiles"
                },
                "expertVerdict": "Dra. Esther Quintana: 'La regla número uno ante cualquier bulto dérmico es pinchar; el diagnóstico temprano marca la curación definitiva.'",
                "userReviews": [
                    {
                        "user": "Bernat V.",
                        "city": "Tarragona",
                        "rating": 5,
                        "comment": "Le descubrieron un mastocitoma diminuto a mi boxer y se lo quitaron en el acto sin que se extendiera. Infinitamente agradecido."
                    }
                ],
                "url": "producto-plan-oncologico-cribado-biopsia.html",
                "priceFormatted": "65.00 €",
                "target_species": "perro",
                "gallery_img": "cudi-veterinaria-clinica-hero.jpg",
                "gallery_img_2": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-plan-oncologico-cribado-biopsia.html",
                "studyTitle": "Evaluación Clínica del Impacto de Consulta Oncológica & Biopsia / Citología de Bultos con Informe en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.13275",
                "studyJournal": "Journal of Veterinary Internal Medicine (JVIM)",
                "studyAuthors": "Dr. Javier Méndez (Diplomado ECVIM-CA), Dra. Rocío Santamaría (Medicina Preventiva)",
                "studyInstitution": "Red Hospitalaria Veterinaria CUDI & Departamento de Medicina Interna",
                "studySourceName": "PubMed / JVIM Archive",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+preventive+medicine+early+triage",
                "studyMetricLabel": "Tasa de Detección Temprana Pre-Sintomática",
                "studyMetricVal": "+79.5%",
                "studyChartType": "line",
                "studyChartLabel": "Eficacia de Intervención Temprana (%)",
                "studyChartLabels": [
                    "Mes 1",
                    "Mes 3",
                    "Mes 6",
                    "Mes 9",
                    "Mes 12"
                ],
                "studyChartControl": [
                    32,
                    35,
                    41,
                    45,
                    48
                ],
                "studyChartCudi": [
                    32,
                    65,
                    84,
                    92,
                    95
                ]
            }
        ]
    },
    "paseos": {
        "label": "Paseos & Cuidadores Certificados",
        "icon": "fa-person-walking-dog",
        "color": "#eff6ff",
        "iconColor": "#3b82f6",
        "products": [
            {
                "id": "SKU-WALK-01",
                "slug": "activepaws-paseo-guiado-telemetria",
                "name": "ActivePaws - Paseo Guiado con Telemetría GPS en Vivo",
                "shortTitle": "ActivePaws Paseo Guiado",
                "category": "Paseos & Cuidadores",
                "categorySlug": "paseos",
                "categoryLabel": "Paseos & Cuidadores Profesionales",
                "price": 14,
                "rating": 5,
                "reviewsCount": 340,
                "species": "dog",
                "partner": "Urban Pet Walkers",
                "partnerRole": "Red de Paseadores Certificados",
                "badge": "Paseo Seguro",
                "badgeIcon": "fa-person-walking-dog",
                "badgeColor": "#3b82f6",
                "img": "cudi-paseos-aventura-hero.jpg",
                "gallery": [
                    "cudi-paseos-aventura-hero.jpg",
                    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Paseo individualizado de 60 minutos con monitorización de ruta GPS en vivo, reporte de hidratación y pulso sincronizado en la app.",
                "fullDesc": "Paseadores profesionales con certificación oficial en primeros auxilios caninos y manejo en positivo. Ves el mapa en tiempo real, recibes fotos y el collar registra pasos y gasto calórico.",
                "specs": {
                    "Duración": "60 minutos reales de paseo enriquecido en parques seguros",
                    "Ratio": "Individual o máximo 2 perros compatibles del mismo dueño",
                    "Seguridad": "Paseador con seguro de responsabilidad civil y geolocalización permanente",
                    "Reporte": "Fotos, ruta, deposiciones y gráfica de pulso al finalizar"
                },
                "expertVerdict": "Etólogo Dani Santos: 'El ejercicio olfativo guiado disminuye la ansiedad por aislamiento en más de un 75% en perros urbanos.'",
                "userReviews": [
                    {
                        "user": "Sonia G.",
                        "city": "Barcelona",
                        "rating": 5,
                        "comment": "Mi paseador Álvaro es un encanto. Mi perro lo adora y veo la ruta en directo desde la oficina."
                    },
                    {
                        "user": "Miguel A.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "Puntuales, cariñosos y el reporte con fotos me alegra el día."
                    }
                ],
                "url": "producto-activepaws-paseo-guiado-telemetria.html",
                "priceFormatted": "14.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-activepaws-paseo-guiado-telemetria.html",
                "studyTitle": "Evaluación Clínica del Impacto de ActivePaws - Paseo Guiado con Telemetría GPS en Vivo en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.42488",
                "studyJournal": "Applied Animal Behaviour Science - Canine Stress & Welfare",
                "studyAuthors": "Dra. Laura Domènech (Etóloga Clínica UAB), Marcos Bermejo (Educador Canino Acreditado)",
                "studyInstitution": "Centro de Bienestar Conductual & Movilidad Canina CUDI",
                "studySourceName": "ScienceDirect / Elsevier Vet",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+cortisol+exercise+separation+anxiety",
                "studyMetricLabel": "Disminución de Cortisol en Saliva",
                "studyMetricVal": "-68.4%",
                "studyChartType": "line",
                "studyChartLabel": "Niveles de Cortisol Salival (ng/mL)",
                "studyChartLabels": [
                    "Línea Base",
                    "Día 7",
                    "Día 14",
                    "Día 21",
                    "Día 30"
                ],
                "studyChartControl": [
                    8.9,
                    8.7,
                    8.5,
                    8.4,
                    8.2
                ],
                "studyChartCudi": [
                    8.9,
                    6.1,
                    4.3,
                    3.2,
                    2.8
                ]
            },
            {
                "id": "SKU-WALK-02",
                "slug": "urban-pet-walkers-estimulacion-cognitiva",
                "name": "Urban Pet Walkers - Paseo de Estimulación Olfativa & Cognitiva",
                "shortTitle": "Urban Walkers Cognitivo",
                "category": "Paseos & Cuidadores",
                "categorySlug": "paseos",
                "categoryLabel": "Paseos & Cuidadores Profesionales",
                "price": 18,
                "rating": 4.9,
                "reviewsCount": 215,
                "species": "dog",
                "partner": "Urban Pet Walkers",
                "partnerRole": "Adiestradores Caninos",
                "badge": "Estimulación Olfativa",
                "badgeIcon": "fa-brain",
                "badgeColor": "#f59e0b",
                "img": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Paseo diseñado por educadores enfocado en juegos de rastro, calma y discriminación de olores para reducir estrés en perros reactivos.",
                "fullDesc": "No todos los perros necesitan correr kilómetros: muchos necesitan pensar y oler. Este paseo reduce el ritmo cardíaco y fomenta la calma mental.",
                "specs": {
                    "Duración": "75 minutos en entornos naturales con vegetación abundante",
                    "Metodología": "Ejercicios de búsqueda de premios (mantrailing lúdico) y calma con correa larga",
                    "Certificación": "Realizado exclusivamente por educadores titulados en positivo"
                },
                "expertVerdict": "Marina Soler: '20 minutos de olfateo estructurado cansan y equilibran a un perro más que una hora corriendo detrás de una pelota.'",
                "userReviews": [
                    {
                        "user": "Teresa O.",
                        "city": "Valencia",
                        "rating": 5,
                        "comment": "Mi border collie llega a casa súper relajado y duerme como un tronco toda la tarde."
                    }
                ],
                "url": "producto-urban-pet-walkers-estimulacion-cognitiva.html",
                "priceFormatted": "18.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-urban-pet-walkers-estimulacion-cognitiva.html",
                "studyTitle": "Evaluación Clínica del Impacto de Urban Pet Walkers - Paseo de Estimulación Olfativa & Cognitiva en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.90374",
                "studyJournal": "Applied Animal Behaviour Science - Canine Stress & Welfare",
                "studyAuthors": "Dra. Laura Domènech (Etóloga Clínica UAB), Marcos Bermejo (Educador Canino Acreditado)",
                "studyInstitution": "Centro de Bienestar Conductual & Movilidad Canina CUDI",
                "studySourceName": "ScienceDirect / Elsevier Vet",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+cortisol+exercise+separation+anxiety",
                "studyMetricLabel": "Disminución de Cortisol en Saliva",
                "studyMetricVal": "-68.4%",
                "studyChartType": "line",
                "studyChartLabel": "Niveles de Cortisol Salival (ng/mL)",
                "studyChartLabels": [
                    "Línea Base",
                    "Día 7",
                    "Día 14",
                    "Día 21",
                    "Día 30"
                ],
                "studyChartControl": [
                    8.9,
                    8.7,
                    8.5,
                    8.4,
                    8.2
                ],
                "studyChartCudi": [
                    8.9,
                    6.1,
                    4.3,
                    3.2,
                    2.8
                ]
            },
            {
                "id": "SKU-WALK-03",
                "slug": "nannypets-cuidador-domicilio-24-7",
                "name": "NannyPets 24/7 - Cuidador Certificado a Domicilio (Día & Noche)",
                "shortTitle": "NannyPets Cuidador Domicilio",
                "category": "Paseos & Cuidadores",
                "categorySlug": "paseos",
                "categoryLabel": "Paseos & Cuidadores Profesionales",
                "price": 32,
                "rating": 5,
                "reviewsCount": 280,
                "species": "both",
                "partner": "NannyPets Care",
                "partnerRole": "Cuidado Domiciliario Certificado",
                "badge": "Cero Jaulas",
                "badgeIcon": "fa-house-chimney-heart",
                "badgeColor": "#10b981",
                "img": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Cuidado respetuoso en tu propia casa sin el trauma de hoteles caninos o jaulas para estancias de fin de semana o vacaciones.",
                "fullDesc": "Tu perro o gato se queda en su entorno habitual con sus rutinas, olores y cama. El cuidador acude a jugar, alimentar, pasear y administrar medicación.",
                "specs": {
                    "Cobertura": "Visitas de 90 minutos o régimen de pernocta completa en tu domicilio",
                    "Perfil": "Cuidadores verificados con antecedentes penales limpios y seguro civil de 300.000€",
                    "Supervisión": "Check-in biométrico al entrar y salir del hogar con informe multimedia"
                },
                "expertVerdict": "Dra. Sofía Alarcón: 'Para gatos, el cuidado a domicilio es la única opción médicamente recomendable; sacarlos de su territorio dispara cistitis por estrés.'",
                "userReviews": [
                    {
                        "user": "Fernando L.",
                        "city": "Bilbao",
                        "rating": 5,
                        "comment": "Nos fuimos de viaje 5 días y nuestros 2 gatos estuvieron como reyes en su sofá."
                    }
                ],
                "url": "producto-nannypets-cuidador-domicilio-24-7.html",
                "priceFormatted": "32.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-nannypets-cuidador-domicilio-24-7.html",
                "studyTitle": "Evaluación Clínica del Impacto de NannyPets 24/7 - Cuidador Certificado a Domicilio (Día & Noche) en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.32688",
                "studyJournal": "Applied Animal Behaviour Science - Canine Stress & Welfare",
                "studyAuthors": "Dra. Laura Domènech (Etóloga Clínica UAB), Marcos Bermejo (Educador Canino Acreditado)",
                "studyInstitution": "Centro de Bienestar Conductual & Movilidad Canina CUDI",
                "studySourceName": "ScienceDirect / Elsevier Vet",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+cortisol+exercise+separation+anxiety",
                "studyMetricLabel": "Disminución de Cortisol en Saliva",
                "studyMetricVal": "-68.4%",
                "studyChartType": "line",
                "studyChartLabel": "Niveles de Cortisol Salival (ng/mL)",
                "studyChartLabels": [
                    "Línea Base",
                    "Día 7",
                    "Día 14",
                    "Día 21",
                    "Día 30"
                ],
                "studyChartControl": [
                    8.9,
                    8.7,
                    8.5,
                    8.4,
                    8.2
                ],
                "studyChartCudi": [
                    8.9,
                    6.1,
                    4.3,
                    3.2,
                    2.8
                ]
            },
            {
                "id": "SKU-WALK-04",
                "slug": "cudi-guarderia-campestre-daycare",
                "name": "CampPaws - Guardería de Día en Finca Rústica Vallada con Transporte",
                "shortTitle": "CampPaws Guardería Campestre",
                "category": "Paseos & Cuidadores",
                "categorySlug": "paseos",
                "categoryLabel": "Paseos & Cuidadores Profesionales",
                "price": 28,
                "rating": 4.9,
                "reviewsCount": 175,
                "species": "dog",
                "partner": "Urban Pet Walkers",
                "partnerRole": "Complejo Rústico Canino",
                "badge": "Finca 5 Hectáreas",
                "badgeIcon": "fa-tree",
                "badgeColor": "#059669",
                "img": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Día completo de juegos en praderas valladas con piscina para perros, zonas de sombra y furgoneta climatizada que recoge y entrega en tu puerta.",
                "fullDesc": "Ideal para personas que trabajan jornadas largas. Tu perro socializa libremente bajo supervisión constante de monitores y regresa a casa bañado y relajado.",
                "specs": {
                    "Horario": "Recogida de 8:00 a 9:30 y entrega de 18:00 a 19:30",
                    "Instalaciones": "50.000 m² con vallado de 2.2m de altura y piscina canina de poca profundidad",
                    "Alimentación": "Menú adaptado a las indicaciones de cada dueño a mediodía"
                },
                "expertVerdict": "Educador Dani Santos: 'Una socialización equilibrada en espacios abiertos evita frustración y destrozos en casa.'",
                "userReviews": [
                    {
                        "user": "Marisa C.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "Mi perro ve llegar la furgoneta y salta de felicidad. Es su día favorito de la semana."
                    }
                ],
                "url": "producto-cudi-guarderia-campestre-daycare.html",
                "priceFormatted": "28.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-cudi-guarderia-campestre-daycare.html",
                "studyTitle": "Evaluación Clínica del Impacto de CampPaws - Guardería de Día en Finca Rústica Vallada con Transporte en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.32623",
                "studyJournal": "Applied Animal Behaviour Science - Canine Stress & Welfare",
                "studyAuthors": "Dra. Laura Domènech (Etóloga Clínica UAB), Marcos Bermejo (Educador Canino Acreditado)",
                "studyInstitution": "Centro de Bienestar Conductual & Movilidad Canina CUDI",
                "studySourceName": "ScienceDirect / Elsevier Vet",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+cortisol+exercise+separation+anxiety",
                "studyMetricLabel": "Disminución de Cortisol en Saliva",
                "studyMetricVal": "-68.4%",
                "studyChartType": "line",
                "studyChartLabel": "Niveles de Cortisol Salival (ng/mL)",
                "studyChartLabels": [
                    "Línea Base",
                    "Día 7",
                    "Día 14",
                    "Día 21",
                    "Día 30"
                ],
                "studyChartControl": [
                    8.9,
                    8.7,
                    8.5,
                    8.4,
                    8.2
                ],
                "studyChartCudi": [
                    8.9,
                    6.1,
                    4.3,
                    3.2,
                    2.8
                ]
            },
            {
                "id": "SKU-WALK-05",
                "slug": "cat-sitting-visita-especialista-felino",
                "name": "FeliCare - Cuidadora a Domicilio Exclusiva para Gatos (ISFM)",
                "shortTitle": "FeliCare Cat Sitting",
                "category": "Paseos & Cuidadores",
                "categorySlug": "paseos",
                "categoryLabel": "Paseos & Cuidadores Profesionales",
                "price": 19,
                "rating": 5,
                "reviewsCount": 198,
                "species": "cat",
                "partner": "NannyPets Care",
                "partnerRole": "Especialistas Cat-Friendly",
                "badge": "Certificado ISFM",
                "badgeIcon": "fa-cat",
                "badgeColor": "#8b5cf6",
                "img": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Visitas a domicilio respetuosas con los ritmos felinos: limpieza de areneros, cambio de agua fresca, cepillado suave y juegos de caza.",
                "fullDesc": "Diseñado para los dueños que viajan y buscan alguien que entienda el lenguaje sutil de los gatos, administre insulina o pastillas y les dé cariño sin invadir.",
                "specs": {
                    "Duración": "45 minutos por visita con informe fotográfico y de báscula",
                    "Medicación": "Administración de fármacos orales y subcutáneos sin coste extra",
                    "Higiene": "Desinfección estricta de zapatos y manos antes de acceder al hogar"
                },
                "expertVerdict": "Dra. Sofía Alarcón: 'La manipulación libre de estrés en gatos con enfermedad crónica es un arte que no cualquiera sabe hacer.'",
                "userReviews": [
                    {
                        "user": "Paula B.",
                        "city": "Zaragoza",
                        "rating": 5,
                        "comment": "Mi gato no se acerca a desconocidos pero con esta cuidadora ronronea desde el minuto uno."
                    }
                ],
                "url": "producto-cat-sitting-visita-especialista-felino.html",
                "priceFormatted": "19.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-cat-sitting-visita-especialista-felino.html",
                "studyTitle": "Evaluación Clínica del Impacto de FeliCare - Cuidadora a Domicilio Exclusiva para Gatos (ISFM) en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.29556",
                "studyJournal": "Applied Animal Behaviour Science - Canine Stress & Welfare",
                "studyAuthors": "Dra. Laura Domènech (Etóloga Clínica UAB), Marcos Bermejo (Educador Canino Acreditado)",
                "studyInstitution": "Centro de Bienestar Conductual & Movilidad Canina CUDI",
                "studySourceName": "ScienceDirect / Elsevier Vet",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+cortisol+exercise+separation+anxiety",
                "studyMetricLabel": "Disminución de Cortisol en Saliva",
                "studyMetricVal": "-68.4%",
                "studyChartType": "line",
                "studyChartLabel": "Niveles de Cortisol Salival (ng/mL)",
                "studyChartLabels": [
                    "Línea Base",
                    "Día 7",
                    "Día 14",
                    "Día 21",
                    "Día 30"
                ],
                "studyChartControl": [
                    8.9,
                    8.7,
                    8.5,
                    8.4,
                    8.2
                ],
                "studyChartCudi": [
                    8.9,
                    6.1,
                    4.3,
                    3.2,
                    2.8
                ]
            },
            {
                "id": "SKU-WALK-06",
                "slug": "paseo-matinal-express-higienico",
                "name": "Paseo Matinal Express Higiénico (30 min)",
                "shortTitle": "Paseo Express Higiénico",
                "category": "Paseos & Cuidadores",
                "categorySlug": "paseos",
                "categoryLabel": "Paseos & Cuidadores Profesionales",
                "price": 9.5,
                "rating": 4.8,
                "reviewsCount": 150,
                "species": "dog",
                "partner": "Urban Pet Walkers",
                "partnerRole": "Paseadores Urbanos",
                "badge": "Rápido & Práctico",
                "badgeIcon": "fa-clock",
                "badgeColor": "#64748b",
                "img": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Paseo funcional a primera hora de la mañana para necesidades fisiológicas y estiramiento antes de que salgas al trabajo.",
                "fullDesc": "Para mañanas con prisas o reuniones tempranas. Un paseador puntual de tu mismo barrio saca a tu perro, limpia sus patitas y le deja agua limpia.",
                "specs": {
                    "Horario Flexible": "Franjas de 7:00 a 9:30 de lunes a viernes",
                    "Duración": "30 minutos enfocados en desahogo fisiológico y calma",
                    "Recurrencia": "Bono semanal con descuento automático"
                },
                "expertVerdict": "Educador Dani Santos: 'Evita accidentes en casa y permite que el animal comience el día relajado.'",
                "userReviews": [
                    {
                        "user": "Javier E.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "Me salva las mañanas de atasco en la M-30. Excelente servicio."
                    }
                ],
                "url": "producto-paseo-matinal-express-higienico.html",
                "priceFormatted": "9.50 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-paseo-matinal-express-higienico.html",
                "studyTitle": "Evaluación Clínica del Impacto de Paseo Matinal Express Higiénico (30 min) en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.23302",
                "studyJournal": "Applied Animal Behaviour Science - Canine Stress & Welfare",
                "studyAuthors": "Dra. Laura Domènech (Etóloga Clínica UAB), Marcos Bermejo (Educador Canino Acreditado)",
                "studyInstitution": "Centro de Bienestar Conductual & Movilidad Canina CUDI",
                "studySourceName": "ScienceDirect / Elsevier Vet",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+cortisol+exercise+separation+anxiety",
                "studyMetricLabel": "Disminución de Cortisol en Saliva",
                "studyMetricVal": "-68.4%",
                "studyChartType": "line",
                "studyChartLabel": "Niveles de Cortisol Salival (ng/mL)",
                "studyChartLabels": [
                    "Línea Base",
                    "Día 7",
                    "Día 14",
                    "Día 21",
                    "Día 30"
                ],
                "studyChartControl": [
                    8.9,
                    8.7,
                    8.5,
                    8.4,
                    8.2
                ],
                "studyChartCudi": [
                    8.9,
                    6.1,
                    4.3,
                    3.2,
                    2.8
                ]
            },
            {
                "id": "SKU-WALK-07",
                "slug": "adiestramiento-canino-base-positivo",
                "name": "Sesión de Adiestramiento Canino en Positivo a Domicilio",
                "shortTitle": "Adiestramiento en Positivo",
                "category": "Paseos & Cuidadores",
                "categorySlug": "paseos",
                "categoryLabel": "Paseos & Cuidadores Profesionales",
                "price": 45,
                "rating": 5,
                "reviewsCount": 220,
                "species": "dog",
                "partner": "Urban Pet Walkers",
                "partnerRole": "Educación Canina Amable",
                "badge": "Sin Tirones ni Castigos",
                "badgeIcon": "fa-graduation-cap",
                "badgeColor": "#0284c7",
                "img": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Clase particular de 60 minutos con educador canino profesional para pasear sin tirones, llamada perfecta y autocontrol en el parque.",
                "fullDesc": "Aprende el lenguaje de tu perro y establece un vínculo basado en la confianza mutua y el refuerzo positivo sin collares de castigo.",
                "specs": {
                    "Duración": "60 minutos con toda la familia en vuestro entorno real de paseo",
                    "Material Incluido": "Guía práctica en PDF y seguimiento de dudas por WhatsApp",
                    "Objetivos": "Paseo con correa floja, llamada de emergencia y saludo tranquilo a personas"
                },
                "expertVerdict": "Dra. Patricia Méndez: 'La educación temprana evita abandonos y problemas graves de reactividad en la edad adulta.'",
                "userReviews": [
                    {
                        "user": "Clara S.",
                        "city": "Gijón",
                        "rating": 5,
                        "comment": "En dos sesiones mi perro dejó de tirar como una locomotora de la correa."
                    }
                ],
                "url": "producto-adiestramiento-canino-base-positivo.html",
                "priceFormatted": "45.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-adiestramiento-canino-base-positivo.html",
                "studyTitle": "Evaluación Clínica del Impacto de Sesión de Adiestramiento Canino en Positivo a Domicilio en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.80885",
                "studyJournal": "Applied Animal Behaviour Science - Canine Stress & Welfare",
                "studyAuthors": "Dra. Laura Domènech (Etóloga Clínica UAB), Marcos Bermejo (Educador Canino Acreditado)",
                "studyInstitution": "Centro de Bienestar Conductual & Movilidad Canina CUDI",
                "studySourceName": "ScienceDirect / Elsevier Vet",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+cortisol+exercise+separation+anxiety",
                "studyMetricLabel": "Disminución de Cortisol en Saliva",
                "studyMetricVal": "-68.4%",
                "studyChartType": "line",
                "studyChartLabel": "Niveles de Cortisol Salival (ng/mL)",
                "studyChartLabels": [
                    "Línea Base",
                    "Día 7",
                    "Día 14",
                    "Día 21",
                    "Día 30"
                ],
                "studyChartControl": [
                    8.9,
                    8.7,
                    8.5,
                    8.4,
                    8.2
                ],
                "studyChartCudi": [
                    8.9,
                    6.1,
                    4.3,
                    3.2,
                    2.8
                ]
            },
            {
                "id": "SKU-WALK-08",
                "slug": "taxi-mascotas-transporte-veterinario",
                "name": "PetTaxi CUDI - Vehículo Adaptado con Jaulas Crash-Tested",
                "shortTitle": "PetTaxi CUDI Adaptado",
                "category": "Paseos & Cuidadores",
                "categorySlug": "paseos",
                "categoryLabel": "Paseos & Cuidadores Profesionales",
                "price": 22,
                "rating": 4.9,
                "reviewsCount": 134,
                "species": "both",
                "partner": "SafeTravel Pets",
                "partnerRole": "Transporte Homologado",
                "badge": "Crash-Test Seguro",
                "badgeIcon": "fa-taxi",
                "badgeColor": "#f59e0b",
                "img": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Traslado puerta a puerta de animales al veterinario, peluquería o aeropuerto en furgonetas climatizadas con conductor auxiliar veterinario.",
                "fullDesc": "Si no tienes coche o tu mascota no cabe en un taxi convencional. Viajan seguros con rampas para perros mayores y transportines acolchados.",
                "specs": {
                    "Seguridad": "Jaulas de aluminio fijadas al chasis del vehículo y arneses ISOFIX",
                    "Climatización": "Aire acondicionado independiente y difusores de feromonas calmantes",
                    "Acompañamiento": "El dueño puede viajar en el vehículo sin coste adicional"
                },
                "expertVerdict": "Veterinario Fernando Morales: 'Un alivio inmenso para dueños mayores que necesitan traer a su perro de 35 kg a consulta.'",
                "userReviews": [
                    {
                        "user": "Mercedes V.",
                        "city": "Alicante",
                        "rating": 5,
                        "comment": "Llevaron a mi mastín a su revisión con un cariño infinito. Un 10."
                    }
                ],
                "url": "producto-taxi-mascotas-transporte-veterinario.html",
                "priceFormatted": "22.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-taxi-mascotas-transporte-veterinario.html",
                "studyTitle": "Evaluación Clínica del Impacto de PetTaxi CUDI - Vehículo Adaptado con Jaulas Crash-Tested en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.32713",
                "studyJournal": "Applied Animal Behaviour Science - Canine Stress & Welfare",
                "studyAuthors": "Dra. Laura Domènech (Etóloga Clínica UAB), Marcos Bermejo (Educador Canino Acreditado)",
                "studyInstitution": "Centro de Bienestar Conductual & Movilidad Canina CUDI",
                "studySourceName": "ScienceDirect / Elsevier Vet",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+cortisol+exercise+separation+anxiety",
                "studyMetricLabel": "Disminución de Cortisol en Saliva",
                "studyMetricVal": "-68.4%",
                "studyChartType": "line",
                "studyChartLabel": "Niveles de Cortisol Salival (ng/mL)",
                "studyChartLabels": [
                    "Línea Base",
                    "Día 7",
                    "Día 14",
                    "Día 21",
                    "Día 30"
                ],
                "studyChartControl": [
                    8.9,
                    8.7,
                    8.5,
                    8.4,
                    8.2
                ],
                "studyChartCudi": [
                    8.9,
                    6.1,
                    4.3,
                    3.2,
                    2.8
                ]
            },
            {
                "id": "SKU-WALK-09",
                "slug": "paseo-senderismo-montana-aventura",
                "name": "Pack Senderismo Canino CUDI Trail (4 Horas en Naturaleza)",
                "shortTitle": "Pack Senderismo CUDI Trail",
                "category": "Paseos & Cuidadores",
                "categorySlug": "paseos",
                "categoryLabel": "Paseos & Cuidadores Profesionales",
                "price": 38,
                "rating": 5,
                "reviewsCount": 160,
                "species": "dog",
                "partner": "Urban Pet Walkers",
                "partnerRole": "Guías de Montaña",
                "badge": "Aventura en Bosque",
                "badgeIcon": "fa-mountain-sun",
                "badgeColor": "#059669",
                "img": "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Excursión de medio día por senderos de montaña seguros con paradas en ríos, agua fresca y monitorización del Smart Collar CUDI.",
                "fullDesc": "Tu perro vivirá una aventura auténtica en la naturaleza con manadas reducidas y supervisión experta. Desconexión total de la ciudad.",
                "specs": {
                    "Duración": "4 horas en la sierra + transporte ida y vuelta incluido",
                    "Seguridad": "Collar CUDI en live tracking y botiquín de primeros auxilios de montaña",
                    "Ratio": "Máximo 4 perros compatibles por monitor especializado"
                },
                "expertVerdict": "Fisioterapeuta Roberto M.: 'El terreno irregular fortalece los ligamentos y la propiocepción del animal de forma natural.'",
                "userReviews": [
                    {
                        "user": "Bruno K.",
                        "city": "Barcelona",
                        "rating": 5,
                        "comment": "Subió a la sierra de Collserola y llegó feliz, cansado y con fotos increíbles."
                    }
                ],
                "url": "producto-paseo-senderismo-montana-aventura.html",
                "priceFormatted": "38.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-paseo-senderismo-montana-aventura.html",
                "studyTitle": "Evaluación Clínica del Impacto de Pack Senderismo Canino CUDI Trail (4 Horas en Naturaleza) en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.37169",
                "studyJournal": "Applied Animal Behaviour Science - Canine Stress & Welfare",
                "studyAuthors": "Dra. Laura Domènech (Etóloga Clínica UAB), Marcos Bermejo (Educador Canino Acreditado)",
                "studyInstitution": "Centro de Bienestar Conductual & Movilidad Canina CUDI",
                "studySourceName": "ScienceDirect / Elsevier Vet",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+cortisol+exercise+separation+anxiety",
                "studyMetricLabel": "Disminución de Cortisol en Saliva",
                "studyMetricVal": "-68.4%",
                "studyChartType": "line",
                "studyChartLabel": "Niveles de Cortisol Salival (ng/mL)",
                "studyChartLabels": [
                    "Línea Base",
                    "Día 7",
                    "Día 14",
                    "Día 21",
                    "Día 30"
                ],
                "studyChartControl": [
                    8.9,
                    8.7,
                    8.5,
                    8.4,
                    8.2
                ],
                "studyChartCudi": [
                    8.9,
                    6.1,
                    4.3,
                    3.2,
                    2.8
                ]
            },
            {
                "id": "SKU-WALK-10",
                "slug": "hospedaje-familiar-sin-jaulas-cudi",
                "name": "HomeStay CUDI - Alojamiento en Casa de Familia Certificada (24h)",
                "shortTitle": "HomeStay Alojamiento Familiar",
                "category": "Paseos & Cuidadores",
                "categorySlug": "paseos",
                "categoryLabel": "Paseos & Cuidadores Profesionales",
                "price": 30,
                "rating": 5,
                "reviewsCount": 290,
                "species": "both",
                "partner": "NannyPets Care",
                "partnerRole": "Familias de Acogida Verificadas",
                "badge": "100% Familiar",
                "badgeIcon": "fa-couch",
                "badgeColor": "#ec4899",
                "img": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Tu mascota duerme en el hogar cálido de una familia amante de los animales inspeccionada por CUDI con máximo un huésped a la vez.",
                "fullDesc": "La alternativa humana a las residencias caninas frías. Duermen dentro de casa, reciben mimos en el sofá y tienen acceso a jardín seguro.",
                "specs": {
                    "Entorno": "Casa con jardín vallado o piso amplio con ascensor",
                    "Inspección CUDI": "Auditoría de seguridad de ventanas, cerramientos y compatibilidad de mascotas",
                    "Cobertura": "Seguro veterinario de estancia de hasta 2.000€ incluido"
                },
                "expertVerdict": "Marina Soler: 'El ambiente doméstico previene el síndrome de estrés agudo que sufren muchos perros en boxes residenciales.'",
                "userReviews": [
                    {
                        "user": "Inés T.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "Mi teckel fue tratado como un hijo más de la familia. Me enviaban vídeos todos los días."
                    }
                ],
                "url": "producto-hospedaje-familiar-sin-jaulas-cudi.html",
                "priceFormatted": "30.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-hospedaje-familiar-sin-jaulas-cudi.html",
                "studyTitle": "Evaluación Clínica del Impacto de HomeStay CUDI - Alojamiento en Casa de Familia Certificada (24h) en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.35394",
                "studyJournal": "Applied Animal Behaviour Science - Canine Stress & Welfare",
                "studyAuthors": "Dra. Laura Domènech (Etóloga Clínica UAB), Marcos Bermejo (Educador Canino Acreditado)",
                "studyInstitution": "Centro de Bienestar Conductual & Movilidad Canina CUDI",
                "studySourceName": "ScienceDirect / Elsevier Vet",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+cortisol+exercise+separation+anxiety",
                "studyMetricLabel": "Disminución de Cortisol en Saliva",
                "studyMetricVal": "-68.4%",
                "studyChartType": "line",
                "studyChartLabel": "Niveles de Cortisol Salival (ng/mL)",
                "studyChartLabels": [
                    "Línea Base",
                    "Día 7",
                    "Día 14",
                    "Día 21",
                    "Día 30"
                ],
                "studyChartControl": [
                    8.9,
                    8.7,
                    8.5,
                    8.4,
                    8.2
                ],
                "studyChartCudi": [
                    8.9,
                    6.1,
                    4.3,
                    3.2,
                    2.8
                ]
            },
            {
                "id": "SKU-WALK-11",
                "slug": "paseo-perros-senior-movilidad-reducida",
                "name": "GentlePaws - Paseo Terapéutico para Perros Abuelos & Senior",
                "shortTitle": "GentlePaws Paseo Senior",
                "category": "Paseos & Cuidadores",
                "categorySlug": "paseos",
                "categoryLabel": "Paseos & Cuidadores Profesionales",
                "price": 13,
                "rating": 4.9,
                "reviewsCount": 115,
                "species": "dog",
                "partner": "Urban Pet Walkers",
                "partnerRole": "Geriatría Canina",
                "badge": "Ritmo Muy Lento",
                "badgeIcon": "fa-heart",
                "badgeColor": "#f43f5e",
                "img": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Paseo a paso muy pausado sobre césped suave con arnés de asistencia trasera para perros con artrosis, ceguera o edad avanzada.",
                "fullDesc": "Los abueletes también necesitan salir a oler el mundo pero sin prisas ni perros jóvenes que les salten encima. Atención paciente y amorosa.",
                "specs": {
                    "Superficie": "100% caminos de hierba y tierra blanda (evitando asfalto duro)",
                    "Asistencia": "Paseadores formados en soporte de cadera con arnés HelpEmUp",
                    "Duración": "40 minutos con bancos de descanso frecuentes"
                },
                "expertVerdict": "Dra. Esther Quintana: 'Mantener la rutina de paseo en animales senior preserva la función cognitiva y previene la demencia canina.'",
                "userReviews": [
                    {
                        "user": "Pedro S.",
                        "city": "Sevilla",
                        "rating": 5,
                        "comment": "Pasean a mi labrador ciego de 14 años con un cuidado y paciencia dignos de admirar."
                    }
                ],
                "url": "producto-paseo-perros-senior-movilidad-reducida.html",
                "priceFormatted": "13.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-paseo-perros-senior-movilidad-reducida.html",
                "studyTitle": "Evaluación Clínica del Impacto de GentlePaws - Paseo Terapéutico para Perros Abuelos & Senior en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.88825",
                "studyJournal": "Applied Animal Behaviour Science - Canine Stress & Welfare",
                "studyAuthors": "Dra. Laura Domènech (Etóloga Clínica UAB), Marcos Bermejo (Educador Canino Acreditado)",
                "studyInstitution": "Centro de Bienestar Conductual & Movilidad Canina CUDI",
                "studySourceName": "ScienceDirect / Elsevier Vet",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+cortisol+exercise+separation+anxiety",
                "studyMetricLabel": "Disminución de Cortisol en Saliva",
                "studyMetricVal": "-68.4%",
                "studyChartType": "line",
                "studyChartLabel": "Niveles de Cortisol Salival (ng/mL)",
                "studyChartLabels": [
                    "Línea Base",
                    "Día 7",
                    "Día 14",
                    "Día 21",
                    "Día 30"
                ],
                "studyChartControl": [
                    8.9,
                    8.7,
                    8.5,
                    8.4,
                    8.2
                ],
                "studyChartCudi": [
                    8.9,
                    6.1,
                    4.3,
                    3.2,
                    2.8
                ]
            },
            {
                "id": "SKU-WALK-12",
                "slug": "socializacion-cachorros-puppy-class",
                "name": "PuppyWalk - Sesión Grupal de Socialización Temprana para Cachorros",
                "shortTitle": "PuppyWalk Socialización",
                "category": "Paseos & Cuidadores",
                "categorySlug": "paseos",
                "categoryLabel": "Paseos & Cuidadores Profesionales",
                "price": 20,
                "rating": 5,
                "reviewsCount": 165,
                "species": "dog",
                "partner": "Urban Pet Walkers",
                "partnerRole": "Socialización Canina",
                "badge": "Cachorros 2 a 6 meses",
                "badgeIcon": "fa-paw",
                "badgeColor": "#14b8a6",
                "img": "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Encuentros en recinto higienizado para cachorros con pauta vacunal al día con estímulos sonoros, texturas y perros adultos equilibrados.",
                "fullDesc": "La ventana crítica de socialización ocurre antes de los 4 meses. Enseña a tu cachorro a no tener miedo a los ruidos urbanos, bicicletas y otros perros.",
                "specs": {
                    "Edad": "Exclusivo para cachorros de 8 a 24 semanas con cartilla veterinaria revisada",
                    "Supervisión": "2 educadores caninos por cada grupo de 5 cachorros",
                    "Instalación": "Suelo de caucho esterilizado tras cada sesión"
                },
                "expertVerdict": "Dani Santos: 'Un cachorro bien socializado jamás será un perro agresivo o miedoso en el futuro.'",
                "userReviews": [
                    {
                        "user": "Nora J.",
                        "city": "Valencia",
                        "rating": 5,
                        "comment": "Mi perra aprendió a inhibir la mordida y a jugar sin miedo con perros de todos los tamaños."
                    }
                ],
                "url": "producto-socializacion-cachorros-puppy-class.html",
                "priceFormatted": "20.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-socializacion-cachorros-puppy-class.html",
                "studyTitle": "Evaluación Clínica del Impacto de PuppyWalk - Sesión Grupal de Socialización Temprana para Cachorros en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.60462",
                "studyJournal": "Applied Animal Behaviour Science - Canine Stress & Welfare",
                "studyAuthors": "Dra. Laura Domènech (Etóloga Clínica UAB), Marcos Bermejo (Educador Canino Acreditado)",
                "studyInstitution": "Centro de Bienestar Conductual & Movilidad Canina CUDI",
                "studySourceName": "ScienceDirect / Elsevier Vet",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+cortisol+exercise+separation+anxiety",
                "studyMetricLabel": "Disminución de Cortisol en Saliva",
                "studyMetricVal": "-68.4%",
                "studyChartType": "line",
                "studyChartLabel": "Niveles de Cortisol Salival (ng/mL)",
                "studyChartLabels": [
                    "Línea Base",
                    "Día 7",
                    "Día 14",
                    "Día 21",
                    "Día 30"
                ],
                "studyChartControl": [
                    8.9,
                    8.7,
                    8.5,
                    8.4,
                    8.2
                ],
                "studyChartCudi": [
                    8.9,
                    6.1,
                    4.3,
                    3.2,
                    2.8
                ]
            },
            {
                "id": "SKU-WALK-13",
                "slug": "paseo-doble-pack-dos-perros",
                "name": "DuoWalk - Paseo Conjunto para Familias con 2 Perros",
                "shortTitle": "DuoWalk Paseo Dual",
                "category": "Paseos & Cuidadores",
                "categorySlug": "paseos",
                "categoryLabel": "Paseos & Cuidadores Profesionales",
                "price": 21,
                "rating": 4.9,
                "reviewsCount": 140,
                "species": "dog",
                "partner": "Urban Pet Walkers",
                "partnerRole": "Paseadores Urbanos",
                "badge": "Ahorro Familiar",
                "badgeIcon": "fa-users",
                "badgeColor": "#6366f1",
                "img": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Paseo de 60 minutos para dos perros del mismo hogar con precio especial unificado y control simultáneo con correas de seguridad.",
                "fullDesc": "Salen juntos como están acostumbrados pero sin que tengas que pagar dos tarifas completas de paseo. Paseadores con experiencia en manejo multicanino.",
                "specs": {
                    "Capacidad": "2 perros que conviven en el mismo domicilio",
                    "Duración": "60 minutos con juego y descanso",
                    "Ahorro": "30% de descuento respecto a dos paseos individuales"
                },
                "expertVerdict": "Marina Soler: 'Pasear a ambos perros juntos refuerza su jerarquía afectiva positiva en casa.'",
                "userReviews": [
                    {
                        "user": "Alba M.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "Tengo dos beagles y con esta tarifa puedo tenerlos paseados mientras trabajo."
                    }
                ],
                "url": "producto-paseo-doble-pack-dos-perros.html",
                "priceFormatted": "21.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-paseo-doble-pack-dos-perros.html",
                "studyTitle": "Evaluación Clínica del Impacto de DuoWalk - Paseo Conjunto para Familias con 2 Perros en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.13341",
                "studyJournal": "Applied Animal Behaviour Science - Canine Stress & Welfare",
                "studyAuthors": "Dra. Laura Domènech (Etóloga Clínica UAB), Marcos Bermejo (Educador Canino Acreditado)",
                "studyInstitution": "Centro de Bienestar Conductual & Movilidad Canina CUDI",
                "studySourceName": "ScienceDirect / Elsevier Vet",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+cortisol+exercise+separation+anxiety",
                "studyMetricLabel": "Disminución de Cortisol en Saliva",
                "studyMetricVal": "-68.4%",
                "studyChartType": "line",
                "studyChartLabel": "Niveles de Cortisol Salival (ng/mL)",
                "studyChartLabels": [
                    "Línea Base",
                    "Día 7",
                    "Día 14",
                    "Día 21",
                    "Día 30"
                ],
                "studyChartControl": [
                    8.9,
                    8.7,
                    8.5,
                    8.4,
                    8.2
                ],
                "studyChartCudi": [
                    8.9,
                    6.1,
                    4.3,
                    3.2,
                    2.8
                ]
            },
            {
                "id": "SKU-WALK-14",
                "slug": "cudi-running-canino-canicross",
                "name": "Canicross Runner - Entrenamiento Deportivo & Carrera Guiada",
                "shortTitle": "Canicross Runner Deportivo",
                "category": "Paseos & Cuidadores",
                "categorySlug": "paseos",
                "categoryLabel": "Paseos & Cuidadores Profesionales",
                "price": 22,
                "rating": 4.8,
                "reviewsCount": 88,
                "species": "dog",
                "partner": "Urban Pet Walkers",
                "partnerRole": "Deporte Canino Oficial",
                "badge": "Alta Intensidad",
                "badgeIcon": "fa-person-running",
                "badgeColor": "#ea580c",
                "img": "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                    "cudi-paseos-aventura-hero.jpg"
                ],
                "desc": "Salida de running continuo de 5 a 8 km con paseador corredor federado para perros con exceso de energía (pastores, huskies, bracos).",
                "fullDesc": "Tu perro descarga toda su adrenalina corriendo al trote controlado con arnés de tiro ergonómico y paradas de hidratación reglamentarias.",
                "specs": {
                    "Distancia": "Adaptada a la condición física del perro (entre 5k y 9k)",
                    "Material": "Línea de tiro amortiguada de 2m y arnés cruzado de tracción",
                    "Clima": "Solo se realiza con temperaturas inferiores a 20°C para evitar golpes de calor"
                },
                "expertVerdict": "Dr. Fernando Morales: 'Imprescindible monitorizar la temperatura con el Smart Collar para no sobrecargar el sistema cardíaco.'",
                "userReviews": [
                    {
                        "user": "Guillermo R.",
                        "city": "Granada",
                        "rating": 5,
                        "comment": "Mi braco alemán quemó toda la hiperactividad. Servicio espectacular."
                    }
                ],
                "url": "producto-cudi-running-canino-canicross.html",
                "priceFormatted": "22.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "cudi-paseos-aventura-hero.jpg",
                "studyUrl": "estudio-cudi-running-canino-canicross.html",
                "studyTitle": "Evaluación Clínica del Impacto de Canicross Runner - Entrenamiento Deportivo & Carrera Guiada en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.28291",
                "studyJournal": "Applied Animal Behaviour Science - Canine Stress & Welfare",
                "studyAuthors": "Dra. Laura Domènech (Etóloga Clínica UAB), Marcos Bermejo (Educador Canino Acreditado)",
                "studyInstitution": "Centro de Bienestar Conductual & Movilidad Canina CUDI",
                "studySourceName": "ScienceDirect / Elsevier Vet",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+cortisol+exercise+separation+anxiety",
                "studyMetricLabel": "Disminución de Cortisol en Saliva",
                "studyMetricVal": "-68.4%",
                "studyChartType": "line",
                "studyChartLabel": "Niveles de Cortisol Salival (ng/mL)",
                "studyChartLabels": [
                    "Línea Base",
                    "Día 7",
                    "Día 14",
                    "Día 21",
                    "Día 30"
                ],
                "studyChartControl": [
                    8.9,
                    8.7,
                    8.5,
                    8.4,
                    8.2
                ],
                "studyChartCudi": [
                    8.9,
                    6.1,
                    4.3,
                    3.2,
                    2.8
                ]
            },
            {
                "id": "SKU-WALK-15",
                "slug": "visita-urgente-paseo-inmediato",
                "name": "FlashWalk - Paseo Urgente en Menos de 45 Minutos por Imprevisto",
                "shortTitle": "FlashWalk Paseo Inmediato",
                "category": "Paseos & Cuidadores",
                "categorySlug": "paseos",
                "categoryLabel": "Paseos & Cuidadores Profesionales",
                "price": 19.5,
                "rating": 4.9,
                "reviewsCount": 145,
                "species": "dog",
                "partner": "Urban Pet Walkers",
                "partnerRole": "Red de Paseadores Certificados",
                "badge": "Llegada < 45 min",
                "badgeIcon": "fa-bolt",
                "badgeColor": "#eab308",
                "img": "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                    "cudi-paseos-aventura-hero.jpg",
                    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Te ha surgido un viaje imprevisto, una reunión que se alarga o una urgencia médica: un paseador acude a tu domicilio en menos de 45 min.",
                "fullDesc": "Servicio de guardia inmediata conectado con la red de paseadores activos en tu código postal. Confirmación al instante vía app.",
                "specs": {
                    "Tiempo de Respuesta": "Confirmación de paseador en menos de 10 min y llegada en < 45 min",
                    "Disponibilidad": "Todos los días de 8:00 a 22:00",
                    "Duración": "Paseo de 45 minutos completo"
                },
                "expertVerdict": "Dani Santos: 'La tranquilidad de saber que tu perro no se queda solo 12 horas seguidas ante cualquier imprevisto de la vida.'",
                "userReviews": [
                    {
                        "user": "Carla Z.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "Me quedé atrapada en un vuelo retrasado y en 40 minutos ya estaban paseando a mi perrita. Impagable."
                    }
                ],
                "url": "producto-visita-urgente-paseo-inmediato.html",
                "priceFormatted": "19.50 €",
                "target_species": "gato",
                "gallery_img": "cudi-paseos-aventura-hero.jpg",
                "gallery_img_2": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-visita-urgente-paseo-inmediato.html",
                "studyTitle": "Evaluación Clínica del Impacto de FlashWalk - Paseo Urgente en Menos de 45 Minutos por Imprevisto en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.83156",
                "studyJournal": "Applied Animal Behaviour Science - Canine Stress & Welfare",
                "studyAuthors": "Dra. Laura Domènech (Etóloga Clínica UAB), Marcos Bermejo (Educador Canino Acreditado)",
                "studyInstitution": "Centro de Bienestar Conductual & Movilidad Canina CUDI",
                "studySourceName": "ScienceDirect / Elsevier Vet",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=canine+cortisol+exercise+separation+anxiety",
                "studyMetricLabel": "Disminución de Cortisol en Saliva",
                "studyMetricVal": "-68.4%",
                "studyChartType": "line",
                "studyChartLabel": "Niveles de Cortisol Salival (ng/mL)",
                "studyChartLabels": [
                    "Línea Base",
                    "Día 7",
                    "Día 14",
                    "Día 21",
                    "Día 30"
                ],
                "studyChartControl": [
                    8.9,
                    8.7,
                    8.5,
                    8.4,
                    8.2
                ],
                "studyChartCudi": [
                    8.9,
                    6.1,
                    4.3,
                    3.2,
                    2.8
                ]
            }
        ]
    },
    "seguros": {
        "label": "Seguros & Cobertura Total",
        "icon": "fa-shield-heart",
        "color": "#fef3c7",
        "iconColor": "#f59e0b",
        "products": [
            {
                "id": "SKU-INS-01",
                "slug": "cudi-shield-basic-accidentes",
                "name": "CUDI Shield Basic - Cobertura Esencial de Accidentes & Urgencias",
                "shortTitle": "CUDI Shield Basic",
                "category": "Seguros & Protección",
                "categorySlug": "seguros",
                "categoryLabel": "Seguros & Cobertura Veterinaria",
                "price": 18,
                "rating": 4.9,
                "reviewsCount": 260,
                "species": "both",
                "partner": "CUDI Seguros & Reaseguros",
                "partnerRole": "Aseguradora Oficial CUDI",
                "badge": "Más Popular",
                "badgeIcon": "fa-shield-heart",
                "badgeColor": "#0284c7",
                "img": "cudi-seguros-salud-hero.jpg",
                "gallery": [
                    "cudi-seguros-salud-hero.jpg",
                    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Cobertura veterinaria de urgencias y accidentes de hasta 1.500€/año con libre elección de clínica y reembolso en 48 horas.",
                "fullDesc": "Protege a tu mascota ante atropellos, ingestión de cuerpos extraños, peleas o caídas imprevistas. Incluye responsabilidad civil legal obligatoria de hasta 300.000€.",
                "specs": {
                    "Límite Anual": "1.500€ en gastos veterinarios por accidente e intervención quirúrgica",
                    "Responsabilidad Civil": "300.000€ sin franquicia (cumple la Ley de Bienestar Animal)",
                    "Clínica": "Libre elección de cualquier veterinario en toda España",
                    "Reembolso": "Vía app CUDI subiendo la factura en foto en menos de 48 horas"
                },
                "expertVerdict": "Corredor de Seguros M. Albiol: 'El seguro indispensable para dormir tranquilo sabiendo que una operación urgente de 1.000€ no arruinará tu economía.'",
                "userReviews": [
                    {
                        "user": "Marta G.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "Mi perro se tragó una pelota y la operación de 1.200€ me la ingresaron en 2 días. Servicio de 10."
                    },
                    {
                        "user": "Pablo K.",
                        "city": "Barcelona",
                        "rating": 5,
                        "comment": "Todo transparente y sin letra pequeña en la app."
                    }
                ],
                "url": "producto-cudi-shield-basic-accidentes.html",
                "priceFormatted": "18.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-cudi-shield-basic-accidentes.html",
                "studyTitle": "Evaluación Clínica del Impacto de CUDI Shield Basic - Cobertura Esencial de Accidentes & Urgencias en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.71488",
                "studyJournal": "Veterinary Evidence & Health Economics Review",
                "studyAuthors": "Dr. Alejandro Garrido (Economía de la Salud Animal), Dra. Patricia Navarro (Bioética)",
                "studyInstitution": "Observatorio de Salud Animal y Prevención de Eutanasia CUDI",
                "studySourceName": "AVMA Veterinary Policy Library",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+insurance+economic+euthanasia+prevention",
                "studyMetricLabel": "Supervivencia Frente a Urgencias Severas",
                "studyMetricVal": "+88.1%",
                "studyChartType": "bar",
                "studyChartLabel": "Tasa de Tratamiento y Supervivencia (%)",
                "studyChartLabels": [
                    "Traumatología",
                    "Cuerpos Extraños",
                    "Torsión Gástrica",
                    "Insuficiencia Renal",
                    "Oncología"
                ],
                "studyChartControl": [
                    52,
                    61,
                    44,
                    38,
                    29
                ],
                "studyChartCudi": [
                    94,
                    97,
                    89,
                    85,
                    78
                ]
            },
            {
                "id": "SKU-INS-02",
                "slug": "global-pet-protect-enfermedad-accidente",
                "name": "Global Pet Protect - Cobertura Total de Enfermedad & Cirugía",
                "shortTitle": "Global Pet Protect Total",
                "category": "Seguros & Protección",
                "categorySlug": "seguros",
                "categoryLabel": "Seguros & Cobertura Veterinaria",
                "price": 34,
                "rating": 5,
                "reviewsCount": 195,
                "species": "both",
                "partner": "CUDI Seguros & Reaseguros",
                "partnerRole": "Aseguradora Oficial CUDI",
                "badge": "Cobertura 100% Enfermedad",
                "badgeIcon": "fa-shield-halved",
                "badgeColor": "#10b981",
                "img": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "El seguro más completo de España: hasta 3.500€/año tanto por accidentes como por enfermedades imprevistas (cáncer, diabetes, artrosis, alergias).",
                "fullDesc": "Cubre hospitalizaciones, pruebas diagnósticas complejas (TAC, Resonancia Magnética), analíticas, quimioterapia y cirugías con copago del 15% o 0% en red concertada.",
                "specs": {
                    "Límite Máximo": "3.500€/año en intervenciones por enfermedad y traumatismos",
                    "Diagnóstico Avanzado": "TAC, RMN, biopsias y ecografías cubiertas al 85%",
                    "Carencia": "Solo 15 días para enfermedades agudas y sin carencia para accidentes",
                    "Red CUDI": "Sin adelantar dinero si acudes a una de nuestras 140 clínicas asociadas"
                },
                "expertVerdict": "Dra. Elena Sánchez: 'Permite a los veterinarios aplicar los tratamientos oncológicos o quirúrgicos más avanzados sin que el dinero sea una barrera de vida o muerte.'",
                "userReviews": [
                    {
                        "user": "Lucía P.",
                        "city": "Zaragoza",
                        "rating": 5,
                        "comment": "Le diagnosticaron linfoma a mi perra y cubrieron toda la quimioterapia. Le salvaron la vida."
                    }
                ],
                "url": "producto-global-pet-protect-enfermedad-accidente.html",
                "priceFormatted": "34.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-global-pet-protect-enfermedad-accidente.html",
                "studyTitle": "Evaluación Clínica del Impacto de Global Pet Protect - Cobertura Total de Enfermedad & Cirugía en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.32794",
                "studyJournal": "Veterinary Evidence & Health Economics Review",
                "studyAuthors": "Dr. Alejandro Garrido (Economía de la Salud Animal), Dra. Patricia Navarro (Bioética)",
                "studyInstitution": "Observatorio de Salud Animal y Prevención de Eutanasia CUDI",
                "studySourceName": "AVMA Veterinary Policy Library",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+insurance+economic+euthanasia+prevention",
                "studyMetricLabel": "Supervivencia Frente a Urgencias Severas",
                "studyMetricVal": "+88.1%",
                "studyChartType": "bar",
                "studyChartLabel": "Tasa de Tratamiento y Supervivencia (%)",
                "studyChartLabels": [
                    "Traumatología",
                    "Cuerpos Extraños",
                    "Torsión Gástrica",
                    "Insuficiencia Renal",
                    "Oncología"
                ],
                "studyChartControl": [
                    52,
                    61,
                    44,
                    38,
                    29
                ],
                "studyChartCudi": [
                    94,
                    97,
                    89,
                    85,
                    78
                ]
            },
            {
                "id": "SKU-INS-03",
                "slug": "safehome-multipet-familiar",
                "name": "SafeHome MultiPet - Póliza Familiar para Hogares Multiespecie",
                "shortTitle": "SafeHome MultiPet Familiar",
                "category": "Seguros & Protección",
                "categorySlug": "seguros",
                "categoryLabel": "Seguros & Cobertura Veterinaria",
                "price": 28,
                "rating": 4.9,
                "reviewsCount": 140,
                "species": "both",
                "partner": "CUDI Seguros & Reaseguros",
                "partnerRole": "Aseguradora Oficial CUDI",
                "badge": "Hasta 3 Mascotas",
                "badgeIcon": "fa-people-roof",
                "badgeColor": "#f59e0b",
                "img": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Póliza combinada que asegura a perros y gatos del mismo hogar bajo una única cuota reducida con bolsa compartida de gastos médicos de 4.000€.",
                "fullDesc": "Diseñado para familias con más de una mascota. Elimina el sobrecoste de contratar seguros individuales y unifica la gestión de salud en una sola app.",
                "specs": {
                    "Capacidad": "Hasta 3 animales incluidos (perros, gatos o combinación) en la misma póliza",
                    "Bolsa Común": "4.000€ anuales utilizables indistintamente por cualquier miembro asegurado",
                    "Responsabilidad Civil": "500.000€ global para todos los perros del hogar",
                    "Descuento": "Ahorro del 40% respecto a contratar 3 pólizas separadas"
                },
                "expertVerdict": "M. Albiol: 'El producto más demandado en hogares españoles modernos que conviven con perro y gato.'",
                "userReviews": [
                    {
                        "user": "Raúl M.",
                        "city": "Valencia",
                        "rating": 5,
                        "comment": "Tengo 2 gatos y 1 perro y me sale infinitamente más barato y ordenado."
                    }
                ],
                "url": "producto-safehome-multipet-familiar.html",
                "priceFormatted": "28.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-safehome-multipet-familiar.html",
                "studyTitle": "Evaluación Clínica del Impacto de SafeHome MultiPet - Póliza Familiar para Hogares Multiespecie en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.66636",
                "studyJournal": "Veterinary Evidence & Health Economics Review",
                "studyAuthors": "Dr. Alejandro Garrido (Economía de la Salud Animal), Dra. Patricia Navarro (Bioética)",
                "studyInstitution": "Observatorio de Salud Animal y Prevención de Eutanasia CUDI",
                "studySourceName": "AVMA Veterinary Policy Library",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+insurance+economic+euthanasia+prevention",
                "studyMetricLabel": "Supervivencia Frente a Urgencias Severas",
                "studyMetricVal": "+88.1%",
                "studyChartType": "bar",
                "studyChartLabel": "Tasa de Tratamiento y Supervivencia (%)",
                "studyChartLabels": [
                    "Traumatología",
                    "Cuerpos Extraños",
                    "Torsión Gástrica",
                    "Insuficiencia Renal",
                    "Oncología"
                ],
                "studyChartControl": [
                    52,
                    61,
                    44,
                    38,
                    29
                ],
                "studyChartCudi": [
                    94,
                    97,
                    89,
                    85,
                    78
                ]
            },
            {
                "id": "SKU-INS-04",
                "slug": "seguro-responsabilidad-civil-ley-bienestar",
                "name": "CUDI LegalGuard - Seguro de Responsabilidad Civil Oficial (Ley Bienestar)",
                "shortTitle": "CUDI LegalGuard RC Oficial",
                "category": "Seguros & Protección",
                "categorySlug": "seguros",
                "categoryLabel": "Seguros & Cobertura Veterinaria",
                "price": 2.9,
                "rating": 5,
                "reviewsCount": 420,
                "species": "dog",
                "partner": "CUDI Seguros & Reaseguros",
                "partnerRole": "Seguros de Cumplimiento Legal",
                "badge": "Cumple Ley 100%",
                "badgeIcon": "fa-scale-balanced",
                "badgeColor": "#1e293b",
                "img": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Póliza obligatoria de RC de hasta 350.000€ adaptada a la Ley de Bienestar Animal con certificado digital instantáneo descargable para presentar.",
                "fullDesc": "Protección contra daños a terceros, mordeduras, caídas de ciclistas o roturas causadas por tu perro sin franquicias y con defensa jurídica incluida.",
                "specs": {
                    "Límite de Indemnización": "350.000€ por siniestro sin franquicia de pago",
                    "Defensa Jurídica": "Hasta 3.000€ en abogados y costas judiciales cubiertos",
                    "Certificado": "Documento oficial con código QR emitido al segundo de contratar",
                    "Válido": "Aceptado por ayuntamientos, comunidades autónomas y policía local"
                },
                "expertVerdict": "Abogado Animalista Jordi Climent: 'Cumple escrupulosamente con el artículo legal obligatorio sin cláusulas trampa.'",
                "userReviews": [
                    {
                        "user": "Santiago V.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "Lo contraté desde el móvil en 2 minutos y ya tengo el certificado guardado en Apple Wallet."
                    }
                ],
                "url": "producto-seguro-responsabilidad-civil-ley-bienestar.html",
                "priceFormatted": "2.90 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-seguro-responsabilidad-civil-ley-bienestar.html",
                "studyTitle": "Evaluación Clínica del Impacto de CUDI LegalGuard - Seguro de Responsabilidad Civil Oficial (Ley Bienestar) en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.14673",
                "studyJournal": "Veterinary Evidence & Health Economics Review",
                "studyAuthors": "Dr. Alejandro Garrido (Economía de la Salud Animal), Dra. Patricia Navarro (Bioética)",
                "studyInstitution": "Observatorio de Salud Animal y Prevención de Eutanasia CUDI",
                "studySourceName": "AVMA Veterinary Policy Library",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+insurance+economic+euthanasia+prevention",
                "studyMetricLabel": "Supervivencia Frente a Urgencias Severas",
                "studyMetricVal": "+88.1%",
                "studyChartType": "bar",
                "studyChartLabel": "Tasa de Tratamiento y Supervivencia (%)",
                "studyChartLabels": [
                    "Traumatología",
                    "Cuerpos Extraños",
                    "Torsión Gástrica",
                    "Insuficiencia Renal",
                    "Oncología"
                ],
                "studyChartControl": [
                    52,
                    61,
                    44,
                    38,
                    29
                ],
                "studyChartCudi": [
                    94,
                    97,
                    89,
                    85,
                    78
                ]
            },
            {
                "id": "SKU-INS-05",
                "slug": "cudi-travel-seguro-viajes-mascota",
                "name": "CUDI TravelSafe - Seguro Médico Internacional para Viajes & Vacaciones",
                "shortTitle": "CUDI TravelSafe Internacional",
                "category": "Seguros & Protección",
                "categorySlug": "seguros",
                "categoryLabel": "Seguros & Cobertura Veterinaria",
                "price": 15,
                "rating": 4.9,
                "reviewsCount": 110,
                "species": "both",
                "partner": "CUDI Seguros & Reaseguros",
                "partnerRole": "Asistencia en Viaje",
                "badge": "Europa & Mundo",
                "badgeIcon": "fa-plane-departure",
                "badgeColor": "#0ea5e9",
                "img": "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Cobertura veterinaria temporal en cualquier país de la UE y Reino Unido con repatriación del animal y gastos de hotel por prolongación médica.",
                "fullDesc": "Contrátalo para tus escapadas de vacaciones desde 1 semana hasta 3 meses. Asistencia telefónica multilingüe 24h para localizar la clínica más cercana en el extranjero.",
                "specs": {
                    "Gastos Médicos en Extranjero": "Hasta 2.500€ por intervención de urgencia en cualquier clínica de Europa",
                    "Repatriación de Mascota": "Cubierto al 100% en caso de imposibilidad del dueño de viajar",
                    "Búsqueda por Pérdida": "Hasta 500€ en cartelería y anuncios de rescate",
                    "Cancelación": "Reembolso del billete de avión/tren si el animal enferma antes de salir"
                },
                "expertVerdict": "M. Albiol: 'Viajar fuera de España sin cobertura veterinaria puede costar miles de euros por una simple gastroenteritis en Francia o Suiza.'",
                "userReviews": [
                    {
                        "user": "Clara E.",
                        "city": "Bilbao",
                        "rating": 5,
                        "comment": "Viajamos a los Alpes y atendieron a mi perro de un corte en Suiza sin pagar un franco de más."
                    }
                ],
                "url": "producto-cudi-travel-seguro-viajes-mascota.html",
                "priceFormatted": "15.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-cudi-travel-seguro-viajes-mascota.html",
                "studyTitle": "Evaluación Clínica del Impacto de CUDI TravelSafe - Seguro Médico Internacional para Viajes & Vacaciones en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.26885",
                "studyJournal": "Veterinary Evidence & Health Economics Review",
                "studyAuthors": "Dr. Alejandro Garrido (Economía de la Salud Animal), Dra. Patricia Navarro (Bioética)",
                "studyInstitution": "Observatorio de Salud Animal y Prevención de Eutanasia CUDI",
                "studySourceName": "AVMA Veterinary Policy Library",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+insurance+economic+euthanasia+prevention",
                "studyMetricLabel": "Supervivencia Frente a Urgencias Severas",
                "studyMetricVal": "+88.1%",
                "studyChartType": "bar",
                "studyChartLabel": "Tasa de Tratamiento y Supervivencia (%)",
                "studyChartLabels": [
                    "Traumatología",
                    "Cuerpos Extraños",
                    "Torsión Gástrica",
                    "Insuficiencia Renal",
                    "Oncología"
                ],
                "studyChartControl": [
                    52,
                    61,
                    44,
                    38,
                    29
                ],
                "studyChartCudi": [
                    94,
                    97,
                    89,
                    85,
                    78
                ]
            },
            {
                "id": "SKU-INS-06",
                "slug": "seguro-perros-senior-mayores-9-anos",
                "name": "SeniorPaws Protect - Póliza Especial para Mascotas de +9 Años",
                "shortTitle": "SeniorPaws Protect +9 Años",
                "category": "Seguros & Protección",
                "categorySlug": "seguros",
                "categoryLabel": "Seguros & Cobertura Veterinaria",
                "price": 39,
                "rating": 4.8,
                "reviewsCount": 98,
                "species": "both",
                "partner": "CUDI Seguros & Reaseguros",
                "partnerRole": "Geriatría Asegurada",
                "badge": "Acepta Animales Mayores",
                "badgeIcon": "fa-heart",
                "badgeColor": "#f43f5e",
                "img": "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "El único seguro que no excluye a tu mascota por edad avanzada. Cobertura de enfermedades crónicas, artrosis y medicación paliativa continua.",
                "fullDesc": "Mientras otras compañías cancelan la póliza al cumplir 7 u 8 años, CUDI acompaña a tu compañero hasta el final con chequeos y tratamientos de confort.",
                "specs": {
                    "Edad de Admisión": "Sin límite de edad (perros y gatos de 9 a 18 años)",
                    "Límite Anual": "2.000€ en medicación, fisioterapia, analíticas y revisiones",
                    "Eutanasia e Incineración": "Hasta 350€ cubiertos con el máximo respeto y dignidad",
                    "Permanencia": "Garantía de no cancelación vitalicia por parte de la compañía"
                },
                "expertVerdict": "Dra. Esther Quintana: 'La verdadera prueba de amor a un animal es cuidarlo cuando envejece y los costes médicos aumentan.'",
                "userReviews": [
                    {
                        "user": "Joaquín D.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "Nadie me aseguraba a mi bodeguero de 11 años. CUDI nos ha devuelto la tranquilidad."
                    }
                ],
                "url": "producto-seguro-perros-senior-mayores-9-anos.html",
                "priceFormatted": "39.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-seguro-perros-senior-mayores-9-anos.html",
                "studyTitle": "Evaluación Clínica del Impacto de SeniorPaws Protect - Póliza Especial para Mascotas de +9 Años en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.42301",
                "studyJournal": "Veterinary Evidence & Health Economics Review",
                "studyAuthors": "Dr. Alejandro Garrido (Economía de la Salud Animal), Dra. Patricia Navarro (Bioética)",
                "studyInstitution": "Observatorio de Salud Animal y Prevención de Eutanasia CUDI",
                "studySourceName": "AVMA Veterinary Policy Library",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+insurance+economic+euthanasia+prevention",
                "studyMetricLabel": "Supervivencia Frente a Urgencias Severas",
                "studyMetricVal": "+88.1%",
                "studyChartType": "bar",
                "studyChartLabel": "Tasa de Tratamiento y Supervivencia (%)",
                "studyChartLabels": [
                    "Traumatología",
                    "Cuerpos Extraños",
                    "Torsión Gástrica",
                    "Insuficiencia Renal",
                    "Oncología"
                ],
                "studyChartControl": [
                    52,
                    61,
                    44,
                    38,
                    29
                ],
                "studyChartCudi": [
                    94,
                    97,
                    89,
                    85,
                    78
                ]
            },
            {
                "id": "SKU-INS-07",
                "slug": "seguro-odontologia-animal-dentalcare",
                "name": "DentalCare Plus - Cobertura Específica de Limpiezas & Cirugías Orales",
                "shortTitle": "DentalCare Plus Cobertura Oral",
                "category": "Seguros & Protección",
                "categorySlug": "seguros",
                "categoryLabel": "Seguros & Cobertura Veterinaria",
                "price": 8.5,
                "rating": 4.9,
                "reviewsCount": 160,
                "species": "both",
                "partner": "CUDI Seguros & Reaseguros",
                "partnerRole": "Especialidades Dentales",
                "badge": "Higiene Oral Cubierta",
                "badgeIcon": "fa-tooth",
                "badgeColor": "#06b6d4",
                "img": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Módulo complementario que cubre limpiezas dentales anuales, extracciones complejas de muelas rotas y fístulas oronasales.",
                "fullDesc": "Las pólizas estándar suelen excluir la boca considerándola 'estética'. Este anexo cubre todas las patologías odontológicas con anestesia general.",
                "specs": {
                    "Limpieza Dental": "1 profilaxis ultrasónica anual completa incluida al 100%",
                    "Cirugías Dentales": "Hasta 800€/año en extracciones y tratamientos de periodontitis",
                    "Sin Copago": "En cualquier clínica asociada de la red dental CUDI"
                },
                "expertVerdict": "Dra. Lucía Soria: 'Imprescindible en razas pequeñas (yorkshire, bichón, pomerania) que acumulan sarro severo genéticamente.'",
                "userReviews": [
                    {
                        "user": "Gemma R.",
                        "city": "Barcelona",
                        "rating": 5,
                        "comment": "Mi caniche se limpia la boca gratis cada año y le salvaron una muela fisurada."
                    }
                ],
                "url": "producto-seguro-odontologia-animal-dentalcare.html",
                "priceFormatted": "8.50 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-seguro-odontologia-animal-dentalcare.html",
                "studyTitle": "Evaluación Clínica del Impacto de DentalCare Plus - Cobertura Específica de Limpiezas & Cirugías Orales en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.87523",
                "studyJournal": "Veterinary Evidence & Health Economics Review",
                "studyAuthors": "Dr. Alejandro Garrido (Economía de la Salud Animal), Dra. Patricia Navarro (Bioética)",
                "studyInstitution": "Observatorio de Salud Animal y Prevención de Eutanasia CUDI",
                "studySourceName": "AVMA Veterinary Policy Library",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+insurance+economic+euthanasia+prevention",
                "studyMetricLabel": "Supervivencia Frente a Urgencias Severas",
                "studyMetricVal": "+88.1%",
                "studyChartType": "bar",
                "studyChartLabel": "Tasa de Tratamiento y Supervivencia (%)",
                "studyChartLabels": [
                    "Traumatología",
                    "Cuerpos Extraños",
                    "Torsión Gástrica",
                    "Insuficiencia Renal",
                    "Oncología"
                ],
                "studyChartControl": [
                    52,
                    61,
                    44,
                    38,
                    29
                ],
                "studyChartCudi": [
                    94,
                    97,
                    89,
                    85,
                    78
                ]
            },
            {
                "id": "SKU-INS-08",
                "slug": "cudi-seguro-rescate-extravio-wild",
                "name": "WildRescue - Cobertura de Búsqueda, Rescate & Recompensa por Pérdida",
                "shortTitle": "WildRescue Búsqueda & Rescate",
                "category": "Seguros & Protección",
                "categorySlug": "seguros",
                "categoryLabel": "Seguros & Cobertura Veterinaria",
                "price": 4.5,
                "rating": 5,
                "reviewsCount": 178,
                "species": "dog",
                "partner": "CUDI Seguros & Reaseguros",
                "partnerRole": "Seguridad en Montaña",
                "badge": "Rescate en Montaña",
                "badgeIcon": "fa-tower-broadcast",
                "badgeColor": "#ea580c",
                "img": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Cubre los costes de unidades de rescate canino, drones térmicos, publicidad y recompensa legal de hasta 800€ si tu mascota se extravía.",
                "fullDesc": "Si tu perro se cae por un barranco o se pierde en un parque nacional, este seguro financia el despliegue de equipos especializados y recompensas.",
                "specs": {
                    "Despliegue de Rescate": "Hasta 2.500€ en bomberos, guías de montaña o servicios de rescate",
                    "Drones Térmicos": "Operador de dron con cámara infrarroja en zonas rurales",
                    "Fondo de Recompensa": "Hasta 800€ acreditados directamente para quien localice al animal",
                    "Campañas en Redes": "CUDI activa alertas geolocalizadas a todos los usuarios en un radio de 15 km"
                },
                "expertVerdict": "GREIM Montaña: 'El coste de un rescate vertical en montaña puede superar los 1.800€ si requiere medios especializados.'",
                "userReviews": [
                    {
                        "user": "Iker B.",
                        "city": "Huesca",
                        "rating": 5,
                        "comment": "Recuperamos a nuestro pointer en una sima del Pirineo gracias al equipo activado por CUDI."
                    }
                ],
                "url": "producto-cudi-seguro-rescate-extravio-wild.html",
                "priceFormatted": "4.50 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-cudi-seguro-rescate-extravio-wild.html",
                "studyTitle": "Evaluación Clínica del Impacto de WildRescue - Cobertura de Búsqueda, Rescate & Recompensa por Pérdida en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.39520",
                "studyJournal": "Veterinary Evidence & Health Economics Review",
                "studyAuthors": "Dr. Alejandro Garrido (Economía de la Salud Animal), Dra. Patricia Navarro (Bioética)",
                "studyInstitution": "Observatorio de Salud Animal y Prevención de Eutanasia CUDI",
                "studySourceName": "AVMA Veterinary Policy Library",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+insurance+economic+euthanasia+prevention",
                "studyMetricLabel": "Supervivencia Frente a Urgencias Severas",
                "studyMetricVal": "+88.1%",
                "studyChartType": "bar",
                "studyChartLabel": "Tasa de Tratamiento y Supervivencia (%)",
                "studyChartLabels": [
                    "Traumatología",
                    "Cuerpos Extraños",
                    "Torsión Gástrica",
                    "Insuficiencia Renal",
                    "Oncología"
                ],
                "studyChartControl": [
                    52,
                    61,
                    44,
                    38,
                    29
                ],
                "studyChartCudi": [
                    94,
                    97,
                    89,
                    85,
                    78
                ]
            },
            {
                "id": "SKU-INS-09",
                "slug": "seguro-felino-total-catshield",
                "name": "CatShield Total - Póliza de Salud Diseñada para las Patologías del Gato",
                "shortTitle": "CatShield Total Felino",
                "category": "Seguros & Protección",
                "categorySlug": "seguros",
                "categoryLabel": "Seguros & Cobertura Veterinaria",
                "price": 21,
                "rating": 4.9,
                "reviewsCount": 185,
                "species": "cat",
                "partner": "CUDI Seguros & Reaseguros",
                "partnerRole": "Medicina Felina Asegurada",
                "badge": "Especial Gatos",
                "badgeIcon": "fa-cat",
                "badgeColor": "#8b5cf6",
                "img": "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Cubre las enfermedades típicas felinas: obstrucciones urinarias (FLUTD), fallo renal crónico, caídas desde balcones (síndrome paracaidista) y diabetes.",
                "fullDesc": "Un seguro pensado de verdad por veterinarios felinos sin las exclusiones absurdas que imponen los seguros generalistas caninos.",
                "specs": {
                    "Síndrome Paracaidista": "Cirugías por caídas desde altura cubiertas al 100% hasta 3.000€",
                    "Urología": "Sondajes de urgencia y desobstrucción uretral sin periodo de carencia",
                    "Pienso Terapéutico": "Hasta 150€/año en piensos renales y urinarios prescritos",
                    "Clínicas Cat-Friendly": "Acceso preferente a centros certificados sin perros en sala de espera"
                },
                "expertVerdict": "Dra. Sofía Alarcón: 'Una sola obstrucción uretral con ingreso en UCI supera los 900€ en cualquier clínica de urgencias.'",
                "userReviews": [
                    {
                        "user": "Eva M.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "Mi gato se cayó del tercer piso; lo operaron de mandíbula y cadera y el seguro pagó todo sin rechistar."
                    }
                ],
                "url": "producto-seguro-felino-total-catshield.html",
                "priceFormatted": "21.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-seguro-felino-total-catshield.html",
                "studyTitle": "Evaluación Clínica del Impacto de CatShield Total - Póliza de Salud Diseñada para las Patologías del Gato en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.94851",
                "studyJournal": "Veterinary Evidence & Health Economics Review",
                "studyAuthors": "Dr. Alejandro Garrido (Economía de la Salud Animal), Dra. Patricia Navarro (Bioética)",
                "studyInstitution": "Observatorio de Salud Animal y Prevención de Eutanasia CUDI",
                "studySourceName": "AVMA Veterinary Policy Library",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+insurance+economic+euthanasia+prevention",
                "studyMetricLabel": "Supervivencia Frente a Urgencias Severas",
                "studyMetricVal": "+88.1%",
                "studyChartType": "bar",
                "studyChartLabel": "Tasa de Tratamiento y Supervivencia (%)",
                "studyChartLabels": [
                    "Traumatología",
                    "Cuerpos Extraños",
                    "Torsión Gástrica",
                    "Insuficiencia Renal",
                    "Oncología"
                ],
                "studyChartControl": [
                    52,
                    61,
                    44,
                    38,
                    29
                ],
                "studyChartCudi": [
                    94,
                    97,
                    89,
                    85,
                    78
                ]
            },
            {
                "id": "SKU-INS-10",
                "slug": "seguro-decesos-duelo-respetuoso",
                "name": "FarewellCare - Cobertura de Eutanasia Digna, Incineración & Apoyo al Duelo",
                "shortTitle": "FarewellCare Despedida Digna",
                "category": "Seguros & Protección",
                "categorySlug": "seguros",
                "categoryLabel": "Seguros & Cobertura Veterinaria",
                "price": 3.5,
                "rating": 5,
                "reviewsCount": 142,
                "species": "both",
                "partner": "CUDI Seguros & Reaseguros",
                "partnerRole": "Despedida Digna & Respeto",
                "badge": "Paz & Dignidad",
                "badgeIcon": "fa-dove",
                "badgeColor": "#64748b",
                "img": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Garantiza una despedida serena en tu hogar con eutanasia compasiva sin dolor, incineración individual ecológica y devolución de cenizas en urna de madera.",
                "fullDesc": "En el momento más doloroso, no te preocupes de gestiones ni facturas. Un profesional acude a tu casa para que tu mascota se duerma en tus brazos con paz.",
                "specs": {
                    "Eutanasia a Domicilio": "Sedación profunda previa y eutanasia indolora en la cama del animal",
                    "Incineración Individual": "Crematorio ecológico homologado con certificado de cenizas",
                    "Urna Biodegradable": "Urna artesanal de madera noble o cerámica grabada con su nombre",
                    "Apoyo Psicológico": "2 sesiones de acompañamiento al duelo con psicólogo especializado"
                },
                "expertVerdict": "Psicóloga de Duelo Animal C. Rivas: 'Poder despedirse en el hogar rodeado de amor previene el duelo traumático infantil y familiar.'",
                "userReviews": [
                    {
                        "user": "Jordi V.",
                        "city": "Girona",
                        "rating": 5,
                        "comment": "La sensibilidad y respeto con la que trataron a nuestro perro en su último aliento no tiene precio."
                    }
                ],
                "url": "producto-seguro-decesos-duelo-respetuoso.html",
                "priceFormatted": "3.50 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-seguro-decesos-duelo-respetuoso.html",
                "studyTitle": "Evaluación Clínica del Impacto de FarewellCare - Cobertura de Eutanasia Digna, Incineración & Apoyo al Duelo en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.91715",
                "studyJournal": "Veterinary Evidence & Health Economics Review",
                "studyAuthors": "Dr. Alejandro Garrido (Economía de la Salud Animal), Dra. Patricia Navarro (Bioética)",
                "studyInstitution": "Observatorio de Salud Animal y Prevención de Eutanasia CUDI",
                "studySourceName": "AVMA Veterinary Policy Library",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+insurance+economic+euthanasia+prevention",
                "studyMetricLabel": "Supervivencia Frente a Urgencias Severas",
                "studyMetricVal": "+88.1%",
                "studyChartType": "bar",
                "studyChartLabel": "Tasa de Tratamiento y Supervivencia (%)",
                "studyChartLabels": [
                    "Traumatología",
                    "Cuerpos Extraños",
                    "Torsión Gástrica",
                    "Insuficiencia Renal",
                    "Oncología"
                ],
                "studyChartControl": [
                    52,
                    61,
                    44,
                    38,
                    29
                ],
                "studyChartCudi": [
                    94,
                    97,
                    89,
                    85,
                    78
                ]
            },
            {
                "id": "SKU-INS-11",
                "slug": "seguro-ppp-razas-potencialmente-peligrosas",
                "name": "ProBreed Safe - Seguro Especializado para Razas de Manejo Especial",
                "shortTitle": "ProBreed Safe Manejo Especial",
                "category": "Seguros & Protección",
                "categorySlug": "seguros",
                "categoryLabel": "Seguros & Cobertura Veterinaria",
                "price": 6.9,
                "rating": 4.9,
                "reviewsCount": 210,
                "species": "dog",
                "partner": "CUDI Seguros & Reaseguros",
                "partnerRole": "Seguros Normativos",
                "badge": "RC 500.000€ Oficial",
                "badgeIcon": "fa-shield-dog",
                "badgeColor": "#b91c1c",
                "img": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Póliza con cobertura ampliada de 500.000€ exigida para gatos catalogados de manejo especial (Rottweiler, Pitbull, Dogo, Staffordshire).",
                "fullDesc": "Sin exclusiones por raza, sin recargos abusivos y con asesoramiento jurídico para obtención o renovación de la licencia municipal.",
                "specs": {
                    "Suma Asegurada": "500.000€ por siniestro y año sin franquicia",
                    "Licencia Municipal": "Certificado específico sellado apto para entrega en el ayuntamiento",
                    "Asesoría": "Gestión jurídica de alegaciones ante multas administrativas injustas",
                    "Test de Sociabilidad": "Descuento del 15% si el perro supera el test de temperamento CUDI"
                },
                "expertVerdict": "Jordi Climent: 'El seguro más justo del mercado para razas tradicionalmente discriminadas.'",
                "userReviews": [
                    {
                        "user": "Víctor B.",
                        "city": "Valencia",
                        "rating": 5,
                        "comment": "Me cobraban barbaridades en otras aseguradoras solo por ser rottweiler. Aquí todo claro y precio honesto."
                    }
                ],
                "url": "producto-seguro-ppp-razas-potencialmente-peligrosas.html",
                "priceFormatted": "6.90 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-seguro-ppp-razas-potencialmente-peligrosas.html",
                "studyTitle": "Evaluación Clínica del Impacto de ProBreed Safe - Seguro Especializado para Razas de Manejo Especial en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.52421",
                "studyJournal": "Veterinary Evidence & Health Economics Review",
                "studyAuthors": "Dr. Alejandro Garrido (Economía de la Salud Animal), Dra. Patricia Navarro (Bioética)",
                "studyInstitution": "Observatorio de Salud Animal y Prevención de Eutanasia CUDI",
                "studySourceName": "AVMA Veterinary Policy Library",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+insurance+economic+euthanasia+prevention",
                "studyMetricLabel": "Supervivencia Frente a Urgencias Severas",
                "studyMetricVal": "+88.1%",
                "studyChartType": "bar",
                "studyChartLabel": "Tasa de Tratamiento y Supervivencia (%)",
                "studyChartLabels": [
                    "Traumatología",
                    "Cuerpos Extraños",
                    "Torsión Gástrica",
                    "Insuficiencia Renal",
                    "Oncología"
                ],
                "studyChartControl": [
                    52,
                    61,
                    44,
                    38,
                    29
                ],
                "studyChartCudi": [
                    94,
                    97,
                    89,
                    85,
                    78
                ]
            },
            {
                "id": "SKU-INS-12",
                "slug": "seguro-perros-caza-trabajo-campo",
                "name": "FieldGuard - Seguro para Perros de Caza, Pastoreo & Trabajo de Campo",
                "shortTitle": "FieldGuard Trabajo & Campo",
                "category": "Seguros & Protección",
                "categorySlug": "seguros",
                "categoryLabel": "Seguros & Cobertura Veterinaria",
                "price": 16.5,
                "rating": 4.8,
                "reviewsCount": 115,
                "species": "dog",
                "partner": "CUDI Seguros & Reaseguros",
                "partnerRole": "Mundo Rural Asegurado",
                "badge": "Campo & Jabalí",
                "badgeIcon": "fa-tree",
                "badgeColor": "#15803d",
                "img": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Cobertura especializada contra ataques de jabalíes, mordeduras de víboras, espigas clavadas, cortes de zarzas y golpes de calor en jornadas rurales.",
                "fullDesc": "Protege a los perros activos en el campo donde los riesgos veterinarios son completamente diferentes a los del entorno urbano.",
                "specs": {
                    "Ataques de Jabalí": "Cirugía reconstructiva y suturas cubiertas hasta 1.800€",
                    "Envenenamientos": "Tratamiento de urgencia por antídotos y víboras al 100%",
                    "Espigas & Cuerpos": "Endoscopia de extracción de espigas en oídos, nariz o pulmón",
                    "RC Rural": "Responsabilidad civil en cotos y fincas rústicas"
                },
                "expertVerdict": "Veterinario Rural A. Soler: 'Una herida por colmillo de jabalí requiere drenaje y cirugías complejas que este seguro cubre sin trabas.'",
                "userReviews": [
                    {
                        "user": "Manolo F.",
                        "city": "Jaén",
                        "rating": 5,
                        "comment": "Mi podenco se clavó una espiga en el pulmón; la endoscopia costó 800€ y la aseguradora respondió al día."
                    }
                ],
                "url": "producto-seguro-perros-caza-trabajo-campo.html",
                "priceFormatted": "16.50 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-seguro-perros-caza-trabajo-campo.html",
                "studyTitle": "Evaluación Clínica del Impacto de FieldGuard - Seguro para Perros de Caza, Pastoreo & Trabajo de Campo en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.11812",
                "studyJournal": "Veterinary Evidence & Health Economics Review",
                "studyAuthors": "Dr. Alejandro Garrido (Economía de la Salud Animal), Dra. Patricia Navarro (Bioética)",
                "studyInstitution": "Observatorio de Salud Animal y Prevención de Eutanasia CUDI",
                "studySourceName": "AVMA Veterinary Policy Library",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+insurance+economic+euthanasia+prevention",
                "studyMetricLabel": "Supervivencia Frente a Urgencias Severas",
                "studyMetricVal": "+88.1%",
                "studyChartType": "bar",
                "studyChartLabel": "Tasa de Tratamiento y Supervivencia (%)",
                "studyChartLabels": [
                    "Traumatología",
                    "Cuerpos Extraños",
                    "Torsión Gástrica",
                    "Insuficiencia Renal",
                    "Oncología"
                ],
                "studyChartControl": [
                    52,
                    61,
                    44,
                    38,
                    29
                ],
                "studyChartCudi": [
                    94,
                    97,
                    89,
                    85,
                    78
                ]
            },
            {
                "id": "SKU-INS-13",
                "slug": "seguro-reembolso-medicacion-cronica",
                "name": "PharmaPaws - Póliza de Cobertura Continua de Medicamentos Crónicos",
                "shortTitle": "PharmaPaws Farmacia Crónica",
                "category": "Seguros & Protección",
                "categorySlug": "seguros",
                "categoryLabel": "Seguros & Cobertura Veterinaria",
                "price": 12,
                "rating": 4.9,
                "reviewsCount": 150,
                "species": "both",
                "partner": "CUDI Seguros & Reaseguros",
                "partnerRole": "Farmacia Veterinaria",
                "badge": "Medicación al 80%",
                "badgeIcon": "fa-pills",
                "badgeColor": "#0ea5e9",
                "img": "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Reembolso del 80% en facturas de medicamentos de prescripción para tratamientos crónicos (insulina, leishmania, epilepsia, cardiopatías, tiroides).",
                "fullDesc": "El gasto mensual en farmacia para una mascota enferma puede ser demoledor. PharmaPaws asume el peso de la medicación prescrita por tu veterinario.",
                "specs": {
                    "Límite Anual": "Hasta 1.000€/año en medicamentos oficiales de farmacia veterinaria o humana",
                    "Fácil Reembolso": "Escanea el ticket de la farmacia y la receta en la app CUDI",
                    "Sin Copago Oculto": "80% íntegro transferido a tu cuenta bancaria",
                    "Fármacos Incluidos": "Cardiovasculares, antiepilépticos, insulina, alopurinol, condroprotectores clínicos"
                },
                "expertVerdict": "Dra. Esther Quintana: 'Garantiza la adherencia terapéutica de la familia, evitando que dejen el tratamiento por falta de liquidez.'",
                "userReviews": [
                    {
                        "user": "Nuria C.",
                        "city": "Sevilla",
                        "rating": 5,
                        "comment": "Ahorro más de 60€ al mes en la medicación cardíaca de mi perro. Una ayuda gigantesca."
                    }
                ],
                "url": "producto-seguro-reembolso-medicacion-cronica.html",
                "priceFormatted": "12.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-seguro-reembolso-medicacion-cronica.html",
                "studyTitle": "Evaluación Clínica del Impacto de PharmaPaws - Póliza de Cobertura Continua de Medicamentos Crónicos en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.47301",
                "studyJournal": "Veterinary Evidence & Health Economics Review",
                "studyAuthors": "Dr. Alejandro Garrido (Economía de la Salud Animal), Dra. Patricia Navarro (Bioética)",
                "studyInstitution": "Observatorio de Salud Animal y Prevención de Eutanasia CUDI",
                "studySourceName": "AVMA Veterinary Policy Library",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+insurance+economic+euthanasia+prevention",
                "studyMetricLabel": "Supervivencia Frente a Urgencias Severas",
                "studyMetricVal": "+88.1%",
                "studyChartType": "bar",
                "studyChartLabel": "Tasa de Tratamiento y Supervivencia (%)",
                "studyChartLabels": [
                    "Traumatología",
                    "Cuerpos Extraños",
                    "Torsión Gástrica",
                    "Insuficiencia Renal",
                    "Oncología"
                ],
                "studyChartControl": [
                    52,
                    61,
                    44,
                    38,
                    29
                ],
                "studyChartCudi": [
                    94,
                    97,
                    89,
                    85,
                    78
                ]
            },
            {
                "id": "SKU-INS-14",
                "slug": "cudi-seguro-segunda-opinion-medica",
                "name": "SecondOpinion Global - Acceso a Especialistas Universitarios Internacionales",
                "shortTitle": "SecondOpinion Especialistas",
                "category": "Seguros & Protección",
                "categorySlug": "seguros",
                "categoryLabel": "Seguros & Cobertura Veterinaria",
                "price": 7,
                "rating": 5,
                "reviewsCount": 92,
                "species": "both",
                "partner": "CUDI Seguros & Reaseguros",
                "partnerRole": "Colegio Europeo de Especialistas",
                "badge": "Especialistas Diplomados",
                "badgeIcon": "fa-user-doctor",
                "badgeColor": "#6366f1",
                "img": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                    "cudi-seguros-salud-hero.jpg"
                ],
                "desc": "Revisión del caso médico de tu mascota por catedráticos diplomados europeos (ECVIM, ECVS, ECVN) ante diagnósticos difíciles o cirugías de alto riesgo.",
                "fullDesc": "Ante un diagnóstico grave de cáncer o neurología, ten la certeza médica absoluta con un informe independiente emitido por los mayores expertos del continente.",
                "specs": {
                    "Diplomados Europeos": "Acceso a especialistas EBVS certificados",
                    "Informe Completo": "Dictamen pericial en 72 horas revisando analíticas, TACs e histopatologías",
                    "Videoconsulta": "Reunión explicativa de 30 minutos con el especialista",
                    "Soporte": "Coordinación directa con tu veterinario de cabecera"
                },
                "expertVerdict": "Dr. Fernando Morales: 'Una segunda opinión especializada a tiempo cambia el abordaje clínico en un 35% de los casos complejos.'",
                "userReviews": [
                    {
                        "user": "Alejandro B.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "Nos dijeron que había que amputar y el especialista nos propuso una técnica conservadora que salvó la pata."
                    }
                ],
                "url": "producto-cudi-seguro-segunda-opinion-medica.html",
                "priceFormatted": "7.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "cudi-seguros-salud-hero.jpg",
                "studyUrl": "estudio-cudi-seguro-segunda-opinion-medica.html",
                "studyTitle": "Evaluación Clínica del Impacto de SecondOpinion Global - Acceso a Especialistas Universitarios Internacionales en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.32677",
                "studyJournal": "Veterinary Evidence & Health Economics Review",
                "studyAuthors": "Dr. Alejandro Garrido (Economía de la Salud Animal), Dra. Patricia Navarro (Bioética)",
                "studyInstitution": "Observatorio de Salud Animal y Prevención de Eutanasia CUDI",
                "studySourceName": "AVMA Veterinary Policy Library",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+insurance+economic+euthanasia+prevention",
                "studyMetricLabel": "Supervivencia Frente a Urgencias Severas",
                "studyMetricVal": "+88.1%",
                "studyChartType": "bar",
                "studyChartLabel": "Tasa de Tratamiento y Supervivencia (%)",
                "studyChartLabels": [
                    "Traumatología",
                    "Cuerpos Extraños",
                    "Torsión Gástrica",
                    "Insuficiencia Renal",
                    "Oncología"
                ],
                "studyChartControl": [
                    52,
                    61,
                    44,
                    38,
                    29
                ],
                "studyChartCudi": [
                    94,
                    97,
                    89,
                    85,
                    78
                ]
            },
            {
                "id": "SKU-INS-15",
                "slug": "seguro-reembolso-fisioterapia-acupuntura",
                "name": "HolisticVet Care - Seguro de Terapias Complementarias, Fisio & Acupuntura",
                "shortTitle": "HolisticVet Fisio & Terapias",
                "category": "Seguros & Protección",
                "categorySlug": "seguros",
                "categoryLabel": "Seguros & Cobertura Veterinaria",
                "price": 11.5,
                "rating": 4.9,
                "reviewsCount": 105,
                "species": "both",
                "partner": "CUDI Seguros & Reaseguros",
                "partnerRole": "Medicina Integrativa",
                "badge": "Terapias Holísticas",
                "badgeIcon": "fa-spa",
                "badgeColor": "#14b8a6",
                "img": "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                    "cudi-seguros-salud-hero.jpg",
                    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Cubre sesiones de acupuntura veterinaria, quiropráctica animal, hidroterapia y rehabilitación articular prescritas por tu veterinario.",
                "fullDesc": "La medicina integrativa ayuda a controlar el dolor crónico sin abusar de antiinflamatorios que dañan el estómago. Este seguro financia tus sesiones de bienestar.",
                "specs": {
                    "Límite Anual": "Hasta 800€/año en centros de rehabilitación certificados",
                    "Terapias Cubiertas": "Acupuntura, láser terapéutico, ozonoterapia, quiropráctica e hidroterapia",
                    "Reembolso Rápido": "Abono del 85% del importe de las sesiones en 48 horas"
                },
                "expertVerdict": "Fisioterapeuta Roberto M.: 'El complemento perfecto para pacientes neurológicos y geriátricos que necesitan mantenimiento semanal.'",
                "userReviews": [
                    {
                        "user": "Teresa L.",
                        "city": "Barcelona",
                        "rating": 5,
                        "comment": "Las sesiones de acupuntura le quitaron el dolor de espalda a mi perra y el seguro las cubre casi al completo."
                    }
                ],
                "url": "producto-seguro-reembolso-fisioterapia-acupuntura.html",
                "priceFormatted": "11.50 €",
                "target_species": "perro",
                "gallery_img": "cudi-seguros-salud-hero.jpg",
                "gallery_img_2": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-seguro-reembolso-fisioterapia-acupuntura.html",
                "studyTitle": "Evaluación Clínica del Impacto de HolisticVet Care - Seguro de Terapias Complementarias, Fisio & Acupuntura en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.60544",
                "studyJournal": "Veterinary Evidence & Health Economics Review",
                "studyAuthors": "Dr. Alejandro Garrido (Economía de la Salud Animal), Dra. Patricia Navarro (Bioética)",
                "studyInstitution": "Observatorio de Salud Animal y Prevención de Eutanasia CUDI",
                "studySourceName": "AVMA Veterinary Policy Library",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+insurance+economic+euthanasia+prevention",
                "studyMetricLabel": "Supervivencia Frente a Urgencias Severas",
                "studyMetricVal": "+88.1%",
                "studyChartType": "bar",
                "studyChartLabel": "Tasa de Tratamiento y Supervivencia (%)",
                "studyChartLabels": [
                    "Traumatología",
                    "Cuerpos Extraños",
                    "Torsión Gástrica",
                    "Insuficiencia Renal",
                    "Oncología"
                ],
                "studyChartControl": [
                    52,
                    61,
                    44,
                    38,
                    29
                ],
                "studyChartCudi": [
                    94,
                    97,
                    89,
                    85,
                    78
                ]
            }
        ]
    },
    "estetica": {
        "label": "Estética, Baño & Spa",
        "icon": "fa-spa",
        "color": "#f3e8ff",
        "iconColor": "#8b5cf6",
        "products": [
            {
                "id": "SKU-SPA-01",
                "slug": "grooming-master-bano-ozonoterapia",
                "name": "Grooming Master - Baño Terapéutico con Ozonoterapia & Masaje",
                "shortTitle": "Grooming Master Ozonoterapia",
                "category": "Estética & Spa",
                "categorySlug": "estetica",
                "categoryLabel": "Estética Canina & Spa Felino",
                "price": 42,
                "rating": 5,
                "reviewsCount": 290,
                "species": "both",
                "partner": "Bubbles & Paws Spa",
                "partnerRole": "Spa & Dermatología Cosmética",
                "badge": "Spa Premium",
                "badgeIcon": "fa-bath",
                "badgeColor": "#7e22ce",
                "img": "cudi-estetica-spa-hero.jpg",
                "gallery": [
                    "cudi-estetica-spa-hero.jpg",
                    "cudi-estetica-spa-hero.jpg",
                    "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Hidromasaje con microburbujas de ozono purificante que oxigena la piel, elimina olores en profundidad y calma dermatitis y alergias dérmicas.",
                "fullDesc": "El tratamiento de spa más avanzado para la piel de perros y gatos. El gas ozono actúa como bactericida y antifúngico natural de alta potencia, reparando el manto lipídico sin químicos agresivos.",
                "specs": {
                    "Tecnología": "Bañera de spa con generador de nanoburbujas de ozono activo",
                    "Cosmética": "Champú y mascarilla ecológica vegana con aceite de argán y avena coloidal",
                    "Duración": "75 minutos de relajación con secado silencioso a baja temperatura",
                    "Incluye": "Corte higiénico, vaciado de glándulas si procede, limado de uñas y limpieza auricular"
                },
                "expertVerdict": "Dra. Patricia Méndez: 'El ozono reduce las colonias de Malassezia y bacterias sin generar resistencia a antibióticos tópicos.'",
                "userReviews": [
                    {
                        "user": "Sofía R.",
                        "city": "Barcelona",
                        "rating": 5,
                        "comment": "A mi caniche le duró el olor a limpio y el pelo esponjoso más de 3 semanas. Repetiremos seguro."
                    },
                    {
                        "user": "Hugo D.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "La piel con rojeces de mi bulldog mejoró en un solo baño. Maravilloso."
                    }
                ],
                "url": "producto-grooming-master-bano-ozonoterapia.html",
                "priceFormatted": "42.00 €",
                "target_species": "gato",
                "gallery_img": "cudi-estetica-spa-hero.jpg",
                "gallery_img_2": "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-grooming-master-bano-ozonoterapia.html",
                "studyTitle": "Evaluación Clínica del Impacto de Grooming Master - Baño Terapéutico con Ozonoterapia & Masaje en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.85197",
                "studyJournal": "Veterinary Dermatology & Barrier Integrity Studies",
                "studyAuthors": "Dra. Cristina Font (Especialista en Dermatología Veterinaria), Marta Vila (Cosmecéutica Animal)",
                "studyInstitution": "Laboratorio de Dermatología Biológica y Terapias Dermocosméticas CUDI",
                "studySourceName": "PubMed / Vet Dermatology",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+dermatology+ozone+therapy+skin+barrier",
                "studyMetricLabel": "Regeneración de Barrera Cutánea & Piel",
                "studyMetricVal": "+86.3%",
                "studyChartType": "line",
                "studyChartLabel": "Integridad Epidérmica (TEWL Score)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4"
                ],
                "studyChartControl": [
                    42,
                    40,
                    39,
                    37
                ],
                "studyChartCudi": [
                    42,
                    28,
                    19,
                    14
                ]
            },
            {
                "id": "SKU-SPA-02",
                "slug": "zenpet-spa-deslanado-completo",
                "name": "ZenPet Spa - Deslanado Técnico en Profundidad & Baño Antiprurito",
                "shortTitle": "ZenPet Spa Deslanado",
                "category": "Estética & Spa",
                "categorySlug": "estetica",
                "categoryLabel": "Estética Canina & Spa Felino",
                "price": 38,
                "rating": 4.9,
                "reviewsCount": 240,
                "species": "both",
                "partner": "ZenPet Grooming",
                "partnerRole": "Especialistas en Mudas",
                "badge": "Adiós Pelos en Casa",
                "badgeIcon": "fa-shield",
                "badgeColor": "#0284c7",
                "img": "cudi-estetica-spa-hero.jpg",
                "gallery": [
                    "cudi-estetica-spa-hero.jpg",
                    "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Elimina hasta el 90% del pelo muerto de muda en mantos dobles (Golden, Husky, Pastor Alemán, gatos de pelo largo) sin cortar ni estropear la capa de cobertura.",
                "fullDesc": "Apertura de nudos con expulsador de aire templado y cosmética acondicionadora botánica. Deja la piel del animal aireada y fresca en verano.",
                "specs": {
                    "Técnica": "Cardado y deslanado técnico manual respetuoso con el subpelo primario",
                    "Beneficio": "Regula la temperatura corporal del animal y acaba con las bolas de pelo en casa",
                    "Duración": "90 minutos de sesión minuciosa"
                },
                "expertVerdict": "Peluquero Canino Master Pau Serra: 'Jamás se debe rapar un manto doble; el deslanado es la única forma correcta de que no pasen calor.'",
                "userReviews": [
                    {
                        "user": "Mónica L.",
                        "city": "Valencia",
                        "rating": 5,
                        "comment": "Le quitaron kilos de subpelo a mi husky y su manto brilla como nunca."
                    }
                ],
                "url": "producto-zenpet-spa-deslanado-completo.html",
                "priceFormatted": "38.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-zenpet-spa-deslanado-completo.html",
                "studyTitle": "Evaluación Clínica del Impacto de ZenPet Spa - Deslanado Técnico en Profundidad & Baño Antiprurito en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.73402",
                "studyJournal": "Veterinary Dermatology & Barrier Integrity Studies",
                "studyAuthors": "Dra. Cristina Font (Especialista en Dermatología Veterinaria), Marta Vila (Cosmecéutica Animal)",
                "studyInstitution": "Laboratorio de Dermatología Biológica y Terapias Dermocosméticas CUDI",
                "studySourceName": "PubMed / Vet Dermatology",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+dermatology+ozone+therapy+skin+barrier",
                "studyMetricLabel": "Regeneración de Barrera Cutánea & Piel",
                "studyMetricVal": "+86.3%",
                "studyChartType": "line",
                "studyChartLabel": "Integridad Epidérmica (TEWL Score)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4"
                ],
                "studyChartControl": [
                    42,
                    40,
                    39,
                    37
                ],
                "studyChartCudi": [
                    42,
                    28,
                    19,
                    14
                ]
            },
            {
                "id": "SKU-SPA-03",
                "slug": "bubbles-paws-peluqueria-felina-sin-sedacion",
                "name": "Bubbles & Paws - Peluquería Felina Especializada (Cero Sedación)",
                "shortTitle": "Peluquería Felina Sin Sedación",
                "category": "Estética & Spa",
                "categorySlug": "estetica",
                "categoryLabel": "Estética Canina & Spa Felino",
                "price": 46,
                "rating": 5,
                "reviewsCount": 180,
                "species": "cat",
                "partner": "Bubbles & Paws Spa",
                "partnerRole": "Especialistas Cat-Friendly",
                "badge": "Sin Sedar al Gato",
                "badgeIcon": "fa-cat",
                "badgeColor": "#ec4899",
                "img": "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Tratamiento de nudos, corte a tijera y baño en seco o con toallas tibias en sala libre de gatos con técnicas Low Stress certificadas.",
                "fullDesc": "Muchos dueños creen que para peinar a un gato persa agresivo hay que dormirlo con anestesia. Nuestros estilistas felinos logran desenredar sin violencia ni sedaciones peligrosas.",
                "specs": {
                    "Ambiente": "Sala insonorizada aislada con difusores de Feliway Optimum continuos",
                    "Técnicas": "Sujeción en toalla (burrito felino) y tiempos de pausa según el estrés del animal",
                    "Higiene": "Corte de uñas higiénico, limpieza de lagrimales y eliminación de nudos axilares"
                },
                "expertVerdict": "Dra. Sofía Alarcón: 'Evitar la anestesia para un simple cepillado ahorra riesgos cardiorrespiratorios innecesarios al gato.'",
                "userReviews": [
                    {
                        "user": "Carla F.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "Mi gato persa salía traumatizado de otros sitios y aquí se quedó ronroneando. Son unos magos."
                    }
                ],
                "url": "producto-bubbles-paws-peluqueria-felina-sin-sedacion.html",
                "priceFormatted": "46.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-bubbles-paws-peluqueria-felina-sin-sedacion.html",
                "studyTitle": "Evaluación Clínica del Impacto de Bubbles & Paws - Peluquería Felina Especializada (Cero Sedación) en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.86897",
                "studyJournal": "Veterinary Dermatology & Barrier Integrity Studies",
                "studyAuthors": "Dra. Cristina Font (Especialista en Dermatología Veterinaria), Marta Vila (Cosmecéutica Animal)",
                "studyInstitution": "Laboratorio de Dermatología Biológica y Terapias Dermocosméticas CUDI",
                "studySourceName": "PubMed / Vet Dermatology",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+dermatology+ozone+therapy+skin+barrier",
                "studyMetricLabel": "Regeneración de Barrera Cutánea & Piel",
                "studyMetricVal": "+86.3%",
                "studyChartType": "line",
                "studyChartLabel": "Integridad Epidérmica (TEWL Score)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4"
                ],
                "studyChartControl": [
                    42,
                    40,
                    39,
                    37
                ],
                "studyChartCudi": [
                    42,
                    28,
                    19,
                    14
                ]
            },
            {
                "id": "SKU-SPA-04",
                "slug": "corte-raza-stripping-terriers",
                "name": "Stripping Tradicional a Mano para Perros de Pelo Duro",
                "shortTitle": "Stripping Manual Pelo Duro",
                "category": "Estética & Spa",
                "categorySlug": "estetica",
                "categoryLabel": "Estética Canina & Spa Felino",
                "price": 55,
                "rating": 4.9,
                "reviewsCount": 132,
                "species": "dog",
                "partner": "ZenPet Grooming",
                "partnerRole": "Estilistas de Pelo Duro",
                "badge": "Stripping Manual",
                "badgeIcon": "fa-hand",
                "badgeColor": "#f59e0b",
                "img": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Técnica artesanal de renovación de manto muerto a mano con dedales de goma para Teckels, Schnauzers, Fox Terriers y Westies.",
                "fullDesc": "Mantiene el color brillante y la textura alambrada impermeable del pelo duro. Si se rasura con máquina, el pelo se vuelve blando, rizado y pierde su color intenso.",
                "specs": {
                    "Procedimiento": "Arrancado suave del pelo maduro que ya no tiene riego sanguíneo (indoloro)",
                    "Frecuencia Recomendada": "Cada 8 a 12 semanas según el ciclo de muda",
                    "Finalizado": "Baño con champú calmante de aloe vera para cerrar poros"
                },
                "expertVerdict": "Pau Serra: 'El stripping es salud dérmica; un pelo muerto que no se retira tapa el poro y provoca foliculitis.'",
                "userReviews": [
                    {
                        "user": "Ramón D.",
                        "city": "Bilbao",
                        "rating": 5,
                        "comment": "El schnauzer luce los colores vivos y el pelo duro perfecto como de exposición."
                    }
                ],
                "url": "producto-corte-raza-stripping-terriers.html",
                "priceFormatted": "55.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-corte-raza-stripping-terriers.html",
                "studyTitle": "Evaluación Clínica del Impacto de Stripping Tradicional a Mano para Perros de Pelo Duro en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.35568",
                "studyJournal": "Veterinary Dermatology & Barrier Integrity Studies",
                "studyAuthors": "Dra. Cristina Font (Especialista en Dermatología Veterinaria), Marta Vila (Cosmecéutica Animal)",
                "studyInstitution": "Laboratorio de Dermatología Biológica y Terapias Dermocosméticas CUDI",
                "studySourceName": "PubMed / Vet Dermatology",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+dermatology+ozone+therapy+skin+barrier",
                "studyMetricLabel": "Regeneración de Barrera Cutánea & Piel",
                "studyMetricVal": "+86.3%",
                "studyChartType": "line",
                "studyChartLabel": "Integridad Epidérmica (TEWL Score)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4"
                ],
                "studyChartControl": [
                    42,
                    40,
                    39,
                    37
                ],
                "studyChartCudi": [
                    42,
                    28,
                    19,
                    14
                ]
            },
            {
                "id": "SKU-SPA-05",
                "slug": "pedicura-spa-almohadillas-cudi-pawcure",
                "name": "PawCure Spa - Limado Suave de Uñas con Torno & Masaje de Almohadillas",
                "shortTitle": "PawCure Spa Pedicura",
                "category": "Estética & Spa",
                "categorySlug": "estetica",
                "categoryLabel": "Estética Canina & Spa Felino",
                "price": 16,
                "rating": 5,
                "reviewsCount": 310,
                "species": "both",
                "partner": "Bubbles & Paws Spa",
                "partnerRole": "Podología Cosmética",
                "badge": "Cero Miedo al Corte",
                "badgeIcon": "fa-paw",
                "badgeColor": "#10b981",
                "img": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Olvídate del doloroso alicate: limado con dremel diamantado ultrasilencioso sin cortar la vena viva, recorte interdigital y cera nutritiva.",
                "fullDesc": "Uñas redondeadas que no arañan el parqué ni se astillan, y almohadillas hidratadas con bálsamo de karité y cera de abejas 100% comestible.",
                "specs": {
                    "Herramienta": "Lima eléctrica de diamante a 6.000 rpm con tope de seguridad de profundidad",
                    "Tratamiento": "Masaje de patas con crema reparadora BioPaw",
                    "Duración": "20 minutos relajantes con refuerzo de premios saludables"
                },
                "expertVerdict": "Fisioterapeuta Roberto M.: 'Uñas demasiado largas modifican el apoyo de los dedos y provocan dolores crónicos de espalda.'",
                "userReviews": [
                    {
                        "user": "Elena S.",
                        "city": "Alicante",
                        "rating": 5,
                        "comment": "Mi perra tenía pánico al cortauñas y con la lima ni se entera. Quedan redondeadas y suaves."
                    }
                ],
                "url": "producto-pedicura-spa-almohadillas-cudi-pawcure.html",
                "priceFormatted": "16.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-pedicura-spa-almohadillas-cudi-pawcure.html",
                "studyTitle": "Evaluación Clínica del Impacto de PawCure Spa - Limado Suave de Uñas con Torno & Masaje de Almohadillas en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.25248",
                "studyJournal": "Veterinary Dermatology & Barrier Integrity Studies",
                "studyAuthors": "Dra. Cristina Font (Especialista en Dermatología Veterinaria), Marta Vila (Cosmecéutica Animal)",
                "studyInstitution": "Laboratorio de Dermatología Biológica y Terapias Dermocosméticas CUDI",
                "studySourceName": "PubMed / Vet Dermatology",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+dermatology+ozone+therapy+skin+barrier",
                "studyMetricLabel": "Regeneración de Barrera Cutánea & Piel",
                "studyMetricVal": "+86.3%",
                "studyChartType": "line",
                "studyChartLabel": "Integridad Epidérmica (TEWL Score)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4"
                ],
                "studyChartControl": [
                    42,
                    40,
                    39,
                    37
                ],
                "studyChartCudi": [
                    42,
                    28,
                    19,
                    14
                ]
            },
            {
                "id": "SKU-SPA-06",
                "slug": "corte-tijera-alta-costura-canina",
                "name": "Haute Coiffure - Corte Integral a Tijera Personalizado por Raza",
                "shortTitle": "Corte a Tijera Alta Costura",
                "category": "Estética & Spa",
                "categorySlug": "estetica",
                "categoryLabel": "Estética Canina & Spa Felino",
                "price": 50,
                "rating": 4.9,
                "reviewsCount": 210,
                "species": "dog",
                "partner": "ZenPet Grooming",
                "partnerRole": "Estilistas de Raza",
                "badge": "Acabado de Exposición",
                "badgeIcon": "fa-scissors",
                "badgeColor": "#ec4899",
                "img": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Esculpido a mano con tijeras curvas japonesas adaptado a la morfología de Caniches, Bichones Malteses, Shih Tzu y Cobradores.",
                "fullDesc": "Líneas estilizadas, pompones perfectos y caritas de osito (estilo asiático teddy bear) respetando el bienestar y la dignidad del animal.",
                "specs": {
                    "Instrumental": "Tijeras de acero VG10 japonés de precisión milimétrica",
                    "Estilo": "A elegir: Corte de raza estándar, Corte Asiático (Asian Fusion) o Corte Práctico de Cachorro",
                    "Completo": "Incluye baño con champú voluminizador, mascarilla de keratina y peinado con secador de pie"
                },
                "expertVerdict": "Pau Serra: 'La tijera permite realzar los mejores ángulos de la fisonomía de cada perro con armonía.'",
                "userReviews": [
                    {
                        "user": "Lorena V.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "Mi caniche parece un peluche de cuento de hadas. Qué manos tienen."
                    }
                ],
                "url": "producto-corte-tijera-alta-costura-canina.html",
                "priceFormatted": "50.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-corte-tijera-alta-costura-canina.html",
                "studyTitle": "Evaluación Clínica del Impacto de Haute Coiffure - Corte Integral a Tijera Personalizado por Raza en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.18333",
                "studyJournal": "Veterinary Dermatology & Barrier Integrity Studies",
                "studyAuthors": "Dra. Cristina Font (Especialista en Dermatología Veterinaria), Marta Vila (Cosmecéutica Animal)",
                "studyInstitution": "Laboratorio de Dermatología Biológica y Terapias Dermocosméticas CUDI",
                "studySourceName": "PubMed / Vet Dermatology",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+dermatology+ozone+therapy+skin+barrier",
                "studyMetricLabel": "Regeneración de Barrera Cutánea & Piel",
                "studyMetricVal": "+86.3%",
                "studyChartType": "line",
                "studyChartLabel": "Integridad Epidérmica (TEWL Score)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4"
                ],
                "studyChartControl": [
                    42,
                    40,
                    39,
                    37
                ],
                "studyChartCudi": [
                    42,
                    28,
                    19,
                    14
                ]
            },
            {
                "id": "SKU-SPA-07",
                "slug": "mascarilla-hidronutritiva-keratina-argan",
                "name": "SilkPaws - Tratamiento de Keratina & Aceite de Argán Puro de Marruecos",
                "shortTitle": "Tratamiento Keratina SilkPaws",
                "category": "Estética & Spa",
                "categorySlug": "estetica",
                "categoryLabel": "Estética Canina & Spa Felino",
                "price": 25,
                "rating": 5,
                "reviewsCount": 165,
                "species": "both",
                "partner": "Bubbles & Paws Spa",
                "partnerRole": "Cosmética Capilar Animal",
                "badge": "Pelo Extra Suave",
                "badgeIcon": "fa-wand-magic-sparkles",
                "badgeColor": "#f59e0b",
                "img": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Batería de aminoácidos y lípidos para mantos quebradizos, secos o castigados que regenera la cutícula y previene nuevos enredos durante semanas.",
                "fullDesc": "Se aplica con toalla caliente tibia como en los mejores spas humanos. Facilita el cepillado diario en casa y evita tirones molestos.",
                "specs": {
                    "Ingredientes": "Keratina vegetal hidrolizada, aceite virgen de argán y provitamina B5",
                    "Tiempo de Pose": "15 minutos de envoltura termoterápica agradable",
                    "Efecto Antiestático": "Evita que el polvo y ramitas se peguen al manto durante el paseo"
                },
                "expertVerdict": "Dra. Patricia Méndez: 'Nutre la fibra capilar desde el córtex sin dejar residuo graso que atraiga suciedad.'",
                "userReviews": [
                    {
                        "user": "Silvia R.",
                        "city": "Granada",
                        "rating": 5,
                        "comment": "Mi yorkshire tenía el pelo seco y ahora parece seda líquida. Increíble tacto."
                    }
                ],
                "url": "producto-mascarilla-hidronutritiva-keratina-argan.html",
                "priceFormatted": "25.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-mascarilla-hidronutritiva-keratina-argan.html",
                "studyTitle": "Evaluación Clínica del Impacto de SilkPaws - Tratamiento de Keratina & Aceite de Argán Puro de Marruecos en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.59966",
                "studyJournal": "Veterinary Dermatology & Barrier Integrity Studies",
                "studyAuthors": "Dra. Cristina Font (Especialista en Dermatología Veterinaria), Marta Vila (Cosmecéutica Animal)",
                "studyInstitution": "Laboratorio de Dermatología Biológica y Terapias Dermocosméticas CUDI",
                "studySourceName": "PubMed / Vet Dermatology",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+dermatology+ozone+therapy+skin+barrier",
                "studyMetricLabel": "Regeneración de Barrera Cutánea & Piel",
                "studyMetricVal": "+86.3%",
                "studyChartType": "line",
                "studyChartLabel": "Integridad Epidérmica (TEWL Score)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4"
                ],
                "studyChartControl": [
                    42,
                    40,
                    39,
                    37
                ],
                "studyChartCudi": [
                    42,
                    28,
                    19,
                    14
                ]
            },
            {
                "id": "SKU-SPA-08",
                "slug": "limpieza-auricular-otica-spa",
                "name": "OtiClean Spa - Higiene Auricular Profunda & Eliminación de Vello Ótico",
                "shortTitle": "OtiClean Higiene Auricular",
                "category": "Estética & Spa",
                "categorySlug": "estetica",
                "categoryLabel": "Estética Canina & Spa Felino",
                "price": 14.5,
                "rating": 4.8,
                "reviewsCount": 190,
                "species": "both",
                "partner": "Bubbles & Paws Spa",
                "partnerRole": "Higiene Especializada",
                "badge": "Prevención Otitis",
                "badgeIcon": "fa-ear-listen",
                "badgeColor": "#06b6d4",
                "img": "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Limpieza del canal auditivo externo con limpiador enzimático vegetal y depilado suave de pelos en razas de orejas caídas propensas a infecciones.",
                "fullDesc": "Ventila el oído interno, retira el cerumen oxidado y previene las temidas otitis bacterianas causadas por falta de aireación.",
                "specs": {
                    "Fórmula": "Solución fisiológica no irritante con extracto de caléndula y árbol del té diluido",
                    "Método": "Gasas estériles sin bastoncillos que puedan empujar cera hacia el tímpano",
                    "Revisión": "Inspección otoscópica visual básica para descartar espigas"
                },
                "expertVerdict": "Dra. Elena Sánchez: 'Mantener las orejas limpias y secas tras los baños ahorra cientos de euros en antibióticos óticos.'",
                "userReviews": [
                    {
                        "user": "Arturo M.",
                        "city": "Santander",
                        "rating": 5,
                        "comment": "A mi cocker spaniel le hacían falta estas sesiones para no tener mal olor de oídos."
                    }
                ],
                "url": "producto-limpieza-auricular-otica-spa.html",
                "priceFormatted": "14.50 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-limpieza-auricular-otica-spa.html",
                "studyTitle": "Evaluación Clínica del Impacto de OtiClean Spa - Higiene Auricular Profunda & Eliminación de Vello Ótico en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.78956",
                "studyJournal": "Veterinary Dermatology & Barrier Integrity Studies",
                "studyAuthors": "Dra. Cristina Font (Especialista en Dermatología Veterinaria), Marta Vila (Cosmecéutica Animal)",
                "studyInstitution": "Laboratorio de Dermatología Biológica y Terapias Dermocosméticas CUDI",
                "studySourceName": "PubMed / Vet Dermatology",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+dermatology+ozone+therapy+skin+barrier",
                "studyMetricLabel": "Regeneración de Barrera Cutánea & Piel",
                "studyMetricVal": "+86.3%",
                "studyChartType": "line",
                "studyChartLabel": "Integridad Epidérmica (TEWL Score)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4"
                ],
                "studyChartControl": [
                    42,
                    40,
                    39,
                    37
                ],
                "studyChartCudi": [
                    42,
                    28,
                    19,
                    14
                ]
            },
            {
                "id": "SKU-SPA-09",
                "slug": "hidromasaje-terapeutico-aromatoterapia",
                "name": "HydroZen - Baño de Hidromasaje con Sal Marina & Aromaterapia Canina",
                "shortTitle": "HydroZen Hidromasaje & Sales",
                "category": "Estética & Spa",
                "categorySlug": "estetica",
                "categoryLabel": "Estética Canina & Spa Felino",
                "price": 48,
                "rating": 5,
                "reviewsCount": 125,
                "species": "dog",
                "partner": "ZenPet Grooming",
                "partnerRole": "Bienestar Holístico Animal",
                "badge": "Relajación Total",
                "badgeIcon": "fa-water",
                "badgeColor": "#3b82f6",
                "img": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Inmersión en agua templada con sales ricas en magnesio del Mar Muerto y vapores de lavanda y manzanilla para aliviar contracturas musculares.",
                "fullDesc": "Recomendado para perros nerviosos, deportistas tras competiciones o con rigidez muscular. Salen relajados y con el sistema nervioso en calma.",
                "specs": {
                    "Sales Minerales": "Magnesio, potasio y azufre que desintoxican la piel y relajan fibras musculares",
                    "Aromaterapia": "Aceites esenciales botánicos dosificados de forma no invasiva para el fino olfato canino",
                    "Duración": "45 minutos en bañera de hidromasaje con chorros subacuáticos lumbares"
                },
                "expertVerdict": "Fisioterapeuta Roberto M.: 'El calor húmedo y el magnesio aumentan la circulación periférica y aceleran el drenaje de ácido láctico.'",
                "userReviews": [
                    {
                        "user": "Miriam C.",
                        "city": "Zaragoza",
                        "rating": 5,
                        "comment": "Mi galgo de rescate siempre le tenía pánico al agua y en este hidromasaje se quedó dormido de la paz que sintió."
                    }
                ],
                "url": "producto-hidromasaje-terapeutico-aromatoterapia.html",
                "priceFormatted": "48.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-hidromasaje-terapeutico-aromatoterapia.html",
                "studyTitle": "Evaluación Clínica del Impacto de HydroZen - Baño de Hidromasaje con Sal Marina & Aromaterapia Canina en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.24331",
                "studyJournal": "Veterinary Dermatology & Barrier Integrity Studies",
                "studyAuthors": "Dra. Cristina Font (Especialista en Dermatología Veterinaria), Marta Vila (Cosmecéutica Animal)",
                "studyInstitution": "Laboratorio de Dermatología Biológica y Terapias Dermocosméticas CUDI",
                "studySourceName": "PubMed / Vet Dermatology",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+dermatology+ozone+therapy+skin+barrier",
                "studyMetricLabel": "Regeneración de Barrera Cutánea & Piel",
                "studyMetricVal": "+86.3%",
                "studyChartType": "line",
                "studyChartLabel": "Integridad Epidérmica (TEWL Score)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4"
                ],
                "studyChartControl": [
                    42,
                    40,
                    39,
                    37
                ],
                "studyChartCudi": [
                    42,
                    28,
                    19,
                    14
                ]
            },
            {
                "id": "SKU-SPA-10",
                "slug": "bano-desparasitante-natural-repelente",
                "name": "ShieldBath - Baño Antiparasitario Natural con Neem & Citronela",
                "shortTitle": "ShieldBath Baño Repelente",
                "category": "Estética & Spa",
                "categorySlug": "estetica",
                "categoryLabel": "Estética Canina & Spa Felino",
                "price": 32,
                "rating": 4.9,
                "reviewsCount": 210,
                "species": "both",
                "partner": "Bubbles & Paws Spa",
                "partnerRole": "Cosmética Preventiva",
                "badge": "Repelente 100% BIO",
                "badgeIcon": "fa-shield-halved",
                "badgeColor": "#15803d",
                "img": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Eliminación activa de pulgas, garrapatas y ácaros con extracto de Margosa (Neem) ecológico que crea una barrera repelente sin insecticidas químicos.",
                "fullDesc": "Ideal antes de salir al campo o a la montaña. Seguro para cachorros y animales convalecientes que no toleran pipetas químicas agresivas.",
                "specs": {
                    "Ingredientes Activos": "Azadiractina natural de semilla de Neem, aceite de árbol del té y citronela de Java",
                    "Efectividad": "Elimina parásitos visibles por asfixia y repele flebótomos hasta 2 semanas",
                    "Dermatología": "pH 7.0 neutro con aloe vera para calmar las picaduras previas"
                },
                "expertVerdict": "Dra. Sofía Alarcón: 'Una opción maravillosa para mantener a raya los parásitos en hogares con niños pequeños que abrazan al animal.'",
                "userReviews": [
                    {
                        "user": "Gonzalo T.",
                        "city": "Cáceres",
                        "rating": 5,
                        "comment": "Trajo garrapatas del campo y salieron todas en el baño sin tener que usar venenos químicos."
                    }
                ],
                "url": "producto-bano-desparasitante-natural-repelente.html",
                "priceFormatted": "32.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-bano-desparasitante-natural-repelente.html",
                "studyTitle": "Evaluación Clínica del Impacto de ShieldBath - Baño Antiparasitario Natural con Neem & Citronela en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.93038",
                "studyJournal": "Veterinary Dermatology & Barrier Integrity Studies",
                "studyAuthors": "Dra. Cristina Font (Especialista en Dermatología Veterinaria), Marta Vila (Cosmecéutica Animal)",
                "studyInstitution": "Laboratorio de Dermatología Biológica y Terapias Dermocosméticas CUDI",
                "studySourceName": "PubMed / Vet Dermatology",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+dermatology+ozone+therapy+skin+barrier",
                "studyMetricLabel": "Regeneración de Barrera Cutánea & Piel",
                "studyMetricVal": "+86.3%",
                "studyChartType": "line",
                "studyChartLabel": "Integridad Epidérmica (TEWL Score)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4"
                ],
                "studyChartControl": [
                    42,
                    40,
                    39,
                    37
                ],
                "studyChartCudi": [
                    42,
                    28,
                    19,
                    14
                ]
            },
            {
                "id": "SKU-SPA-11",
                "slug": "masaje-miofascial-relajante-perros",
                "name": "PawsMassage - Masaje Terapéutico Miofascial & Puntos Gatillo (45 min)",
                "shortTitle": "PawsMassage Miofascial",
                "category": "Estética & Spa",
                "categorySlug": "estetica",
                "categoryLabel": "Estética Canina & Spa Felino",
                "price": 35,
                "rating": 5,
                "reviewsCount": 110,
                "species": "dog",
                "partner": "ZenPet Grooming",
                "partnerRole": "Terapia Manual Animal",
                "badge": "Alivio de Contracturas",
                "badgeIcon": "fa-hand-holding-heart",
                "badgeColor": "#f43f5e",
                "img": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Terapia manual sobre fascias y grupos musculares de cuello, escápulas y lumbares para perros con tensión postural, estrés o sobrecargas.",
                "fullDesc": "Reduce los niveles de cortisol en saliva y libera endorfinas naturales. Una experiencia de bienestar puro con música relajante a 432 Hz.",
                "specs": {
                    "Técnica": "Liberación miofascial suave, effleurage y petrissage canino",
                    "Ambiente": "Colchoneta viscoelástica climatizada y luz tenue cálida",
                    "Reporte": "Mapa de calor de contracturas detectadas entregado al propietario"
                },
                "expertVerdict": "Fisioterapeuta Roberto M.: 'Desactiva los puntos gatillo que provocan cojeras intermitentes sin causa ósea aparente.'",
                "userReviews": [
                    {
                        "user": "Diana P.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "Mi pastor alemán cerraba los ojos y suspiraba. La masajista tiene una conexión mágica con los perros."
                    }
                ],
                "url": "producto-masaje-miofascial-relajante-perros.html",
                "priceFormatted": "35.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-masaje-miofascial-relajante-perros.html",
                "studyTitle": "Evaluación Clínica del Impacto de PawsMassage - Masaje Terapéutico Miofascial & Puntos Gatillo (45 min) en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.93348",
                "studyJournal": "Veterinary Dermatology & Barrier Integrity Studies",
                "studyAuthors": "Dra. Cristina Font (Especialista en Dermatología Veterinaria), Marta Vila (Cosmecéutica Animal)",
                "studyInstitution": "Laboratorio de Dermatología Biológica y Terapias Dermocosméticas CUDI",
                "studySourceName": "PubMed / Vet Dermatology",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+dermatology+ozone+therapy+skin+barrier",
                "studyMetricLabel": "Regeneración de Barrera Cutánea & Piel",
                "studyMetricVal": "+86.3%",
                "studyChartType": "line",
                "studyChartLabel": "Integridad Epidérmica (TEWL Score)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4"
                ],
                "studyChartControl": [
                    42,
                    40,
                    39,
                    37
                ],
                "studyChartCudi": [
                    42,
                    28,
                    19,
                    14
                ]
            },
            {
                "id": "SKU-SPA-12",
                "slug": "corte-unas-gatos-limado-seguro",
                "name": "CatClaws Care - Recorte & Limado Amable de Uñas Felinas",
                "shortTitle": "CatClaws Cuidado Uñas Gatos",
                "category": "Estética & Spa",
                "categorySlug": "estetica",
                "categoryLabel": "Estética Canina & Spa Felino",
                "price": 12,
                "rating": 4.9,
                "reviewsCount": 260,
                "species": "cat",
                "partner": "Bubbles & Paws Spa",
                "partnerRole": "Especialistas Cat-Friendly",
                "badge": "Cero Rasguños en Muebles",
                "badgeIcon": "fa-cat",
                "badgeColor": "#8b5cf6",
                "img": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Recorte indoloro de la punta afilada transparente de las 18 uñas del gato sin tocar la matriz vascular viva y sin peleas en casa.",
                "fullDesc": "Salva tu sofá y cortinas sin necesidad de desungulaciones brutales (que son ilegales). Realizado por estilistas felinos con golosinas líquidas como distracción positiva.",
                "specs": {
                    "Tiempo": "Solo 10 minutos con refuerzo de pasta de malta o churu",
                    "Seguridad": "Tijeras guillotinadas de filo cóncavo que no astillan la uña",
                    "Asesoría": "Te enseñan los trucos para mantenerlas en casa si lo deseas"
                },
                "expertVerdict": "Dra. Sofía Alarcón: 'Esencial en gatos de interior que no desgastan las uñas de forma natural y pueden clavárselas en las almohadillas.'",
                "userReviews": [
                    {
                        "user": "Marisa N.",
                        "city": "Barcelona",
                        "rating": 5,
                        "comment": "En casa era una guerra sangrienta. Aquí tardaron 5 minutos y el gato ni se inmutó."
                    }
                ],
                "url": "producto-corte-unas-gatos-limado-seguro.html",
                "priceFormatted": "12.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-corte-unas-gatos-limado-seguro.html",
                "studyTitle": "Evaluación Clínica del Impacto de CatClaws Care - Recorte & Limado Amable de Uñas Felinas en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.17279",
                "studyJournal": "Veterinary Dermatology & Barrier Integrity Studies",
                "studyAuthors": "Dra. Cristina Font (Especialista en Dermatología Veterinaria), Marta Vila (Cosmecéutica Animal)",
                "studyInstitution": "Laboratorio de Dermatología Biológica y Terapias Dermocosméticas CUDI",
                "studySourceName": "PubMed / Vet Dermatology",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+dermatology+ozone+therapy+skin+barrier",
                "studyMetricLabel": "Regeneración de Barrera Cutánea & Piel",
                "studyMetricVal": "+86.3%",
                "studyChartType": "line",
                "studyChartLabel": "Integridad Epidérmica (TEWL Score)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4"
                ],
                "studyChartControl": [
                    42,
                    40,
                    39,
                    37
                ],
                "studyChartCudi": [
                    42,
                    28,
                    19,
                    14
                ]
            },
            {
                "id": "SKU-SPA-13",
                "slug": "blanqueamiento-manto-blanco-optico",
                "name": "WhiteGlow - Tratamiento Óptico Antiamarilleo para Mantos Blancos",
                "shortTitle": "WhiteGlow Manto Blanco Óptico",
                "category": "Estética & Spa",
                "categorySlug": "estetica",
                "categoryLabel": "Estética Canina & Spa Felino",
                "price": 36,
                "rating": 4.9,
                "reviewsCount": 175,
                "species": "both",
                "partner": "ZenPet Grooming",
                "partnerRole": "Cosmética de Alta Gama",
                "badge": "Blanco Puro sin Lejía",
                "badgeIcon": "fa-snowflake",
                "badgeColor": "#0284c7",
                "img": "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85"
                ],
                "desc": "Champú azul óptico con pigmentos violetas botánicos que neutralizan el tono óxido y amarillo de patas, babas y lagrimales en Bichones, Caniches y Westies.",
                "fullDesc": "100% libre de peróxido de hidrógeno, cloro o lejías oxidantes. Devuelve el blanco níveo y el brillo cristalino a la fibra capilar.",
                "specs": {
                    "Tecnología": "Pigmentos botánicos de aciano y flor de malva violeta",
                    "Seguridad": "No decolora la piel ni reseca las glándulas sebáceas",
                    "Resultado": "Blanco reluciente y luminoso visible desde la primera sesión"
                },
                "expertVerdict": "Pau Serra: 'Los blanqueadores químicos queman el pelo; nuestra fórmula de flores violetas es pura ciencia cosmética respetuosa.'",
                "userReviews": [
                    {
                        "user": "Esther O.",
                        "city": "Madrid",
                        "rating": 5,
                        "comment": "Mi bichón maltés volvió a ser blanco nuclear sin picores ni rojeces."
                    }
                ],
                "url": "producto-blanqueamiento-manto-blanco-optico.html",
                "priceFormatted": "36.00 €",
                "target_species": "gato",
                "gallery_img": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                "studyUrl": "estudio-blanqueamiento-manto-blanco-optico.html",
                "studyTitle": "Evaluación Clínica del Impacto de WhiteGlow - Tratamiento Óptico Antiamarilleo para Mantos Blancos en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.47873",
                "studyJournal": "Veterinary Dermatology & Barrier Integrity Studies",
                "studyAuthors": "Dra. Cristina Font (Especialista en Dermatología Veterinaria), Marta Vila (Cosmecéutica Animal)",
                "studyInstitution": "Laboratorio de Dermatología Biológica y Terapias Dermocosméticas CUDI",
                "studySourceName": "PubMed / Vet Dermatology",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+dermatology+ozone+therapy+skin+barrier",
                "studyMetricLabel": "Regeneración de Barrera Cutánea & Piel",
                "studyMetricVal": "+86.3%",
                "studyChartType": "line",
                "studyChartLabel": "Integridad Epidérmica (TEWL Score)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4"
                ],
                "studyChartControl": [
                    42,
                    40,
                    39,
                    37
                ],
                "studyChartCudi": [
                    42,
                    28,
                    19,
                    14
                ]
            },
            {
                "id": "SKU-SPA-14",
                "slug": "peinado-desenredado-manto-largo-afgano",
                "name": "LuxeComb - Sesión de Cepillado Profundo & Apertura de Nudos sin Cortar",
                "shortTitle": "LuxeComb Cepillado Profundo",
                "category": "Estética & Spa",
                "categorySlug": "estetica",
                "categoryLabel": "Estética Canina & Spa Felino",
                "price": 29,
                "rating": 4.8,
                "reviewsCount": 140,
                "species": "both",
                "partner": "Bubbles & Paws Spa",
                "partnerRole": "Mantenimiento de Mantos",
                "badge": "Salva el Pelo Largo",
                "badgeIcon": "fa-brush",
                "badgeColor": "#f59e0b",
                "img": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                    "cudi-estetica-spa-hero.jpg"
                ],
                "desc": "Desenredado paciente mechón a mechón con spray bifásico de siliconas vegetales solubles para no tener que rapar al animal cuando tiene nudos.",
                "fullDesc": "Si tu perro o gato tiene rastas o nudos difíciles pero quieres conservar su melena larga, nuestros especialistas abren los nudos sin dolor.",
                "specs": {
                    "Instrumentos": "Peines de púas giratorias de teflón y cardas flexibles alemanas",
                    "Spray Bifásico": "Emulsión de jojoba y aceite de camelia que desliza el nudo hacia fuera",
                    "Duración": "Sesión de 60 minutos con pausas relajantes"
                },
                "expertVerdict": "Pau Serra: 'Rapar por nudos es la salida fácil de las malas peluquerías; con paciencia y buen producto se salva el 90% del manto.'",
                "userReviews": [
                    {
                        "user": "Carles F.",
                        "city": "Lleida",
                        "rating": 5,
                        "comment": "Iban a rapar a mi setter irlandés en otro sitio y aquí le desenredaron las orejas sin cortar ni un centímetro."
                    }
                ],
                "url": "producto-peinado-desenredado-manto-largo-afgano.html",
                "priceFormatted": "29.00 €",
                "target_species": "perro",
                "gallery_img": "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                "gallery_img_2": "cudi-estetica-spa-hero.jpg",
                "studyUrl": "estudio-peinado-desenredado-manto-largo-afgano.html",
                "studyTitle": "Evaluación Clínica del Impacto de LuxeComb - Sesión de Cepillado Profundo & Apertura de Nudos sin Cortar en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.17494",
                "studyJournal": "Veterinary Dermatology & Barrier Integrity Studies",
                "studyAuthors": "Dra. Cristina Font (Especialista en Dermatología Veterinaria), Marta Vila (Cosmecéutica Animal)",
                "studyInstitution": "Laboratorio de Dermatología Biológica y Terapias Dermocosméticas CUDI",
                "studySourceName": "PubMed / Vet Dermatology",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+dermatology+ozone+therapy+skin+barrier",
                "studyMetricLabel": "Regeneración de Barrera Cutánea & Piel",
                "studyMetricVal": "+86.3%",
                "studyChartType": "line",
                "studyChartLabel": "Integridad Epidérmica (TEWL Score)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4"
                ],
                "studyChartControl": [
                    42,
                    40,
                    39,
                    37
                ],
                "studyChartCudi": [
                    42,
                    28,
                    19,
                    14
                ]
            },
            {
                "id": "SKU-SPA-15",
                "slug": "spa-express-cachorros-bautismo",
                "name": "PuppySpa - Bautismo de Agua & Primera Experiencia Positiva de Baño",
                "shortTitle": "PuppySpa Bautismo de Agua",
                "category": "Estética & Spa",
                "categorySlug": "estetica",
                "categoryLabel": "Estética Canina & Spa Felino",
                "price": 24,
                "rating": 5,
                "reviewsCount": 235,
                "species": "both",
                "partner": "ZenPet Grooming",
                "partnerRole": "Habituación Temprana",
                "badge": "Primer Baño del Cachorro",
                "badgeIcon": "fa-baby",
                "badgeColor": "#ec4899",
                "img": "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                "gallery": [
                    "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
                    "cudi-estetica-spa-hero.jpg",
                    "cudi-estetica-spa-hero.jpg"
                ],
                "desc": "Sesión lúdica para cachorros (3 a 7 meses) donde conocen el agua tibia, el ruido del secador y los peines con caricias y comida rica.",
                "fullDesc": "Un mal primer baño traumatiza a un perro de por vida. En PuppySpa el cachorro aprende que la peluquería es una fiesta divertida y relajante.",
                "specs": {
                    "Duración": "40 minutos sin prisas ni estrés con el dueño presente en cabina",
                    "Secado Progresivo": "Habituación al sonido del soplador con control gradual de volumen",
                    "Regalo": "Foto de recuerdo con su primer look y diploma de graduación en la app CUDI"
                },
                "expertVerdict": "Dani Santos: 'La impronta positiva del primer baño garantiza un perro cooperativo en la peluquería durante los siguientes 15 años.'",
                "userReviews": [
                    {
                        "user": "Nuria V.",
                        "city": "Toledo",
                        "rating": 5,
                        "comment": "Mi cachorro entró con miedo y salió lamiendo a la peluquera. Ahora adora la bañera en casa."
                    }
                ],
                "url": "producto-spa-express-cachorros-bautismo.html",
                "priceFormatted": "24.00 €",
                "target_species": "gato",
                "gallery_img": "cudi-estetica-spa-hero.jpg",
                "gallery_img_2": "cudi-estetica-spa-hero.jpg",
                "studyUrl": "estudio-spa-express-cachorros-bautismo.html",
                "studyTitle": "Evaluación Clínica del Impacto de PuppySpa - Bautismo de Agua & Primera Experiencia Positiva de Baño en Biomarcadores de Salud y Bienestar Animal",
                "studyDoi": "10.1016/j.cudi.vetmed.2026.15448",
                "studyJournal": "Veterinary Dermatology & Barrier Integrity Studies",
                "studyAuthors": "Dra. Cristina Font (Especialista en Dermatología Veterinaria), Marta Vila (Cosmecéutica Animal)",
                "studyInstitution": "Laboratorio de Dermatología Biológica y Terapias Dermocosméticas CUDI",
                "studySourceName": "PubMed / Vet Dermatology",
                "studySourceUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=veterinary+dermatology+ozone+therapy+skin+barrier",
                "studyMetricLabel": "Regeneración de Barrera Cutánea & Piel",
                "studyMetricVal": "+86.3%",
                "studyChartType": "line",
                "studyChartLabel": "Integridad Epidérmica (TEWL Score)",
                "studyChartLabels": [
                    "Semana 1",
                    "Semana 2",
                    "Semana 3",
                    "Semana 4"
                ],
                "studyChartControl": [
                    42,
                    40,
                    39,
                    37
                ],
                "studyChartCudi": [
                    42,
                    28,
                    19,
                    14
                ]
            }
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


// ==========================
// TIENDA / STORE (MOTOR DE PROFUNDIDAD, FILTROS Y MODAL DE 4 PESTAÑAS)
// ==========================
let currentDemoCat = 'todos';
let currentDemoSpecies = 'todos';
let currentDemoSort = 'relevance';
let currentDemoSearch = '';

function getAllDemoProducts() {
    const list = [];
    Object.keys(STORE_CATEGORIES).forEach(k => {
        const cat = STORE_CATEGORIES[k];
        if (cat && Array.isArray(cat.products)) {
            cat.products.forEach(p => {
                list.push({ ...p, _catKey: k, _catLabel: cat.label });
            });
        }
    });
    return list;
}

function populateStoreCats() {
    renderDemoStoreCatalog();
}

function renderDemoStoreCatalog() {
    const panel = document.getElementById('store-products-panel');
    if (!panel) return;
    panel.style.display = 'block';
    panel.innerHTML = `
        <div class="store-filter-bar" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:12px; margin-bottom:14px;">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                <h4 style="margin:0; font-size:0.88rem; font-weight:800; color:#0f172a;">
                    ${currentDemoCat === 'todos' ? 'Todos los Productos y Servicios (90)' : (STORE_CATEGORIES[currentDemoCat]?.label || 'Catálogo')}
                </h4>
                <button onclick="document.getElementById('store-products-panel').style.display='none'" style="background:#e2e8f0; border:none; border-radius:50%; width:26px; height:26px; cursor:pointer; font-size:0.8rem; display:flex; align-items:center; justify-content:center;" title="Cerrar">✕</button>
            </div>
            
            <!-- Buscador en tiempo real -->
            <div style="position:relative; margin-bottom:8px;">
                <i class="fa-solid fa-magnifying-glass" style="position:absolute; left:10px; top:10px; font-size:0.75rem; color:#94a3b8;"></i>
                <input type="text" id="demo-store-search" oninput="filterDemoStoreInput(this.value)" placeholder="Buscar por nombre, síntoma, dieta, telemetría..." style="width:100%; box-sizing:border-box; padding:7px 10px 7px 28px; border-radius:10px; border:1px solid #cbd5e1; font-size:0.75rem; outline:none; background:white;">
            </div>

            <!-- Filtros por especie y ordenacion -->
            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:6px;">
                <div style="display:flex; gap:6px; flex-wrap:wrap;">
                    <button class="store-chip-btn ${currentDemoSpecies === 'todos' ? 'active' : ''}" onclick="setDemoSpeciesFilter('todos')" style="border:1px solid #cbd5e1; background:${currentDemoSpecies === 'todos' ? '#0284c7' : 'white'}; color:${currentDemoSpecies === 'todos' ? 'white' : '#475569'}; border-radius:20px; padding:6px 12px; font-size:0.72rem; font-weight:700; cursor:pointer; min-height:32px; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-paw"></i> Todos</button>
                    <button class="store-chip-btn ${currentDemoSpecies === 'perro' ? 'active' : ''}" onclick="setDemoSpeciesFilter('perro')" style="border:1px solid #cbd5e1; background:${currentDemoSpecies === 'perro' ? '#0284c7' : 'white'}; color:${currentDemoSpecies === 'perro' ? 'white' : '#475569'}; border-radius:20px; padding:6px 12px; font-size:0.72rem; font-weight:700; cursor:pointer; min-height:32px; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-dog"></i> Perros</button>
                    <button class="store-chip-btn ${currentDemoSpecies === 'gato' ? 'active' : ''}" onclick="setDemoSpeciesFilter('gato')" style="border:1px solid #cbd5e1; background:${currentDemoSpecies === 'gato' ? '#0284c7' : 'white'}; color:${currentDemoSpecies === 'gato' ? 'white' : '#475569'}; border-radius:20px; padding:6px 12px; font-size:0.72rem; font-weight:700; cursor:pointer; min-height:32px; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-cat"></i> Gatos</button>
                </div>
                <select onchange="setDemoSort(this.value)" style="border:1px solid #cbd5e1; border-radius:8px; padding:5px 8px; font-size:0.72rem; color:#475569; background:white; min-height:32px;">
                    <option value="relevance">Relevancia</option>
                    <option value="price-asc">Precio: Menor a Mayor</option>
                    <option value="price-desc">Precio: Mayor a Menor</option>
                </select>
            </div>
        </div>

        <div id="demo-products-grid" style="display:flex; flex-direction:column; gap:10px;">
            <!-- Se inyectan productos con renderFilteredDemoProducts() -->
        </div>
    `;
    renderFilteredDemoProducts();
}

function openStoreCategory(catKey) {
    currentDemoCat = catKey || 'todos';
    const panel = document.getElementById('store-products-panel');
    if (!panel) return;
    panel.style.display = 'block';
    renderDemoStoreCatalog();
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function setDemoSpeciesFilter(sp) {
    currentDemoSpecies = sp;
    renderDemoStoreCatalog();
}

function setDemoSort(st) {
    currentDemoSort = st;
    renderFilteredDemoProducts();
}

function filterDemoStoreInput(val) {
    currentDemoSearch = (val || '').toLowerCase().trim();
    renderFilteredDemoProducts();
}

function renderFilteredDemoProducts() {
    const grid = document.getElementById('demo-products-grid');
    if (!grid) return;

    let items = getAllDemoProducts();

    // Filtro por categoria
    if (currentDemoCat && currentDemoCat !== 'todos') {
        const cat = STORE_CATEGORIES[currentDemoCat];
        if (cat) items = cat.products || [];
    }

    // Filtro por especie
    if (currentDemoSpecies && currentDemoSpecies !== 'todos') {
        items = items.filter(p => p.species === currentDemoSpecies || p.species === 'both' || p.target_species === currentDemoSpecies);
    }

    // Filtro por busqueda
    if (currentDemoSearch) {
        items = items.filter(p => 
            (p.name && p.name.toLowerCase().includes(currentDemoSearch)) ||
            (p.desc && p.desc.toLowerCase().includes(currentDemoSearch)) ||
            (p.partner && p.partner.toLowerCase().includes(currentDemoSearch)) ||
            (p.id && p.id.toLowerCase().includes(currentDemoSearch))
        );
    }

    // Ordenacion
    if (currentDemoSort === 'price-asc') {
        items.sort((a, b) => a.price - b.price);
    } else if (currentDemoSort === 'price-desc') {
        items.sort((a, b) => b.price - a.price);
    }

    if (items.length === 0) {
        grid.innerHTML = `
            <div style="text-align:center; padding:24px 10px; color:#64748b; font-size:0.8rem;">
                <i class="fa-solid fa-magnifying-glass" style="font-size:1.8rem; color:#cbd5e1; margin-bottom:8px;"></i>
                <p style="margin:0;">No se encontraron productos para los filtros seleccionados.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = items.map(prod => {
        const studyBadge = prod.clinical_evidence ? `
            <div style="margin-top:4px; font-size:0.68rem; color:#0284c7; background:#e0f2fe; padding:2px 6px; border-radius:6px; display:inline-flex; align-items:center; gap:3px; font-weight:700;">
                <i class="fa-solid fa-microscope"></i> Ensayo: ${prod.clinical_evidence.metric}
                ${prod.clinical_evidence.doi ? '<span style="font-size:0.6rem; opacity:0.8;">DOI</span>' : ''}
            </div>
        ` : '';

        const speciesPill = prod.species === 'perro' ? '<span style="background:#dbeafe;color:#1e40af;font-size:0.62rem;padding:2px 6px;border-radius:10px;font-weight:700;"><i class="fa-solid fa-dog"></i> Canino</span>' :
                            prod.species === 'gato' ? '<span style="background:#fce7f3;color:#9d174d;font-size:0.62rem;padding:2px 6px;border-radius:10px;font-weight:700;"><i class="fa-solid fa-cat"></i> Felino</span>' :
                            '<span style="background:#f1f5f9;color:#475569;font-size:0.62rem;padding:2px 6px;border-radius:10px;font-weight:700;"><i class="fa-solid fa-paw"></i> Multiespecie</span>';

        return `
            <div class="product-card" style="display:flex; gap:10px; padding:10px; background:white; border-radius:14px; border:1px solid #e2e8f0; box-shadow:0 2px 8px rgba(0,0,0,0.02);">
                <div class="product-img" style="width:72px; height:72px; border-radius:10px; background-image:url('${prod.img}'); background-size:cover; background-position:center; flex-shrink:0; border:1px solid #f1f5f9; cursor:pointer;" onclick="openProductModal('${prod.id}')"></div>
                <div class="product-info" style="flex:1; min-width:0; display:flex; flex-direction:column; justify-content:space-between;">
                    <div>
                        <div style="display:flex; align-items:center; justify-content:space-between; gap:4px; margin-bottom:2px;">
                            <span style="font-weight:800; font-size:0.82rem; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; cursor:pointer;" onclick="openProductModal('${prod.id}')">${prod.name}</span>
                        </div>
                        <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px;">
                            ${speciesPill}
                            <span style="font-size:0.68rem; color:#f59e0b; font-weight:700;"><i class="fa-solid fa-star"></i> ${prod.reviews?.rating || 5.0} (${prod.reviews?.count || 120})</span>
                        </div>
                        <div style="font-size:0.72rem; color:#64748b; line-height:1.25; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${prod.desc}</div>
                        ${studyBadge}
                    </div>
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-top:8px;">
                        <span style="font-weight:900; font-size:0.92rem; color:#0f172a;">${prod.price.toFixed(2)} €</span>
                        <div style="display:flex; gap:5px;">
                            <button onclick="openProductModal('${prod.id}')" style="background:#f1f5f9; color:#0f172a; border:none; border-radius:8px; padding:5px 8px; font-weight:700; font-size:0.7rem; cursor:pointer;" title="Ficha y Estudio Clínico"><i class="fa-solid fa-eye"></i> Ficha</button>
                            <button onclick="addToCart('${prod.name.replace(/'/g, "\\'")}', ${prod.price}, '${prod.img}')" style="background:#0284c7; color:white; border:none; border-radius:8px; padding:5px 10px; font-weight:700; font-size:0.72rem; cursor:pointer;"><i class="fa-solid fa-plus"></i> Añadir</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// -------------------------------------------------------------
// MODAL DE FICHA TÉCNICA, OPINIONES Y ENSAYO CLÍNICO (4 PESTAÑAS)
// -------------------------------------------------------------
function openProductModal(prodId) {
    const prod = getAllDemoProducts().find(p => p.id === prodId || p.slug === prodId || (p.name && p.name.toLowerCase() === String(prodId).toLowerCase()));
    if (!prod) return;

    let modal = document.getElementById('product-deep-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'product-deep-modal';
        modal.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(15,23,42,0.6); backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px); z-index:99999; display:flex; align-items:center; justify-content:center; padding:12px; box-sizing:border-box;';
        document.body.appendChild(modal);
    }

    const speciesLabel = prod.species === 'perro' ? 'Canino' : prod.species === 'gato' ? 'Felino' : 'Multiespecie';
    const study = prod.clinical_evidence || {
        trial_name: "Validación de Bienestar Biomédico CUDI",
        metric: "Reducción de Picos Anómalos ECG: -84.2%",
        sample_size: "n=450 mascotas monitorizadas",
        doi: "10.1016/j.cudi.2026.04.01",
        journal: "Journal of Veterinary IoT & Animal Well-being (2026)",
        authors: "Dr. Marc Valls, et al. Hospital Clínico Veterinario"
    };

    modal.innerHTML = `
        <div style="background:white; border-radius:20px; width:100%; max-width:440px; max-height:88vh; overflow:hidden; display:flex; flex-direction:column; box-shadow:0 25px 60px rgba(0,0,0,0.3); font-family:var(--font-body, system-ui, sans-serif); margin:auto;">
            <!-- Modal Header -->
            <div style="position:relative; height:135px; background-image:url('${prod.img}'); background-size:cover; background-position:center; flex-shrink:0;">
                <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 60%);"></div>
                <button onclick="closeProductModal()" style="position:absolute; top:10px; right:10px; background:rgba(255,255,255,0.92); border:none; border-radius:50%; width:28px; height:28px; cursor:pointer; font-weight:800; font-size:0.85rem; color:#0f172a; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 6px rgba(0,0,0,0.2);">✕</button>
                <div style="position:absolute; bottom:10px; left:14px; right:14px; color:white;">
                    <div style="font-size:0.68rem; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; opacity:0.9;">${prod._catLabel || 'Catálogo'} &bull; ${speciesLabel}</div>
                    <div style="font-size:0.98rem; font-weight:800; line-height:1.2; text-shadow:0 1px 4px rgba(0,0,0,0.5); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${prod.name}</div>
                </div>
            </div>

            <!-- Modal Nav Tabs -->
            <div style="display:flex; border-bottom:1px solid #e2e8f0; background:#f8fafc; flex-shrink:0;">
                <button id="modal-tab-btn-desc" onclick="switchProductModalTab('desc')" style="flex:1; padding:9px 2px; border:none; background:white; font-size:0.68rem; font-weight:800; color:#0284c7; border-bottom:2px solid #0284c7; cursor:pointer;">Descripción</button>
                <button id="modal-tab-btn-specs" onclick="switchProductModalTab('specs')" style="flex:1; padding:9px 2px; border:none; background:none; font-size:0.68rem; font-weight:700; color:#64748b; cursor:pointer;">Ficha Técnica</button>
                <button id="modal-tab-btn-reviews" onclick="switchProductModalTab('reviews')" style="flex:1; padding:9px 2px; border:none; background:none; font-size:0.68rem; font-weight:700; color:#64748b; cursor:pointer;">Opiniones</button>
                <button id="modal-tab-btn-study" onclick="switchProductModalTab('study')" style="flex:1; padding:9px 2px; border:none; background:none; font-size:0.68rem; font-weight:700; color:#64748b; cursor:pointer;">Informe Clínico</button>
            </div>

            <!-- Modal Content (Scrollable) -->
            <div style="flex:1; overflow-y:auto; padding:16px; font-size:0.8rem; line-height:1.55; color:#334155;">
                <!-- Tab Desc -->
                <div id="modal-sec-desc">
                    <p style="margin:0 0 10px; font-weight:500;">${prod.desc}</p>
                    <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; padding:10px; margin-bottom:10px;">
                        <div style="font-weight:800; color:#166534; font-size:0.75rem; margin-bottom:4px;"><i class="fa-solid fa-circle-check"></i> Beneficios Clave:</div>
                        <ul style="margin:0; padding-left:18px; font-size:0.75rem; color:#15803d;">
                            <li>Optimizado para ${speciesLabel.toLowerCase()} con calibración fisiológica.</li>
                            <li>Trazabilidad total garantizada con el Gemelo Digital CUDI.</li>
                            <li>Aprobado por el comité médico veterinario independiente.</li>
                        </ul>
                    </div>
                </div>

                <!-- Tab Specs -->
                <div id="modal-sec-specs" style="display:none;">
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:12px;">
                        <div style="background:#f8fafc; padding:8px; border-radius:8px; border:1px solid #e2e8f0;">
                            <span style="font-size:0.68rem; color:#64748b; display:block;">Proveedor / Partner:</span>
                            <span style="font-weight:700; font-size:0.75rem; color:#0f172a;">${prod.partner}</span>
                        </div>
                        <div style="background:#f8fafc; padding:8px; border-radius:8px; border:1px solid #e2e8f0;">
                            <span style="font-size:0.68rem; color:#64748b; display:block;">Especie Objetivo:</span>
                            <span style="font-weight:700; font-size:0.75rem; color:#0f172a;">${speciesLabel}</span>
                        </div>
                        <div style="background:#f8fafc; padding:8px; border-radius:8px; border:1px solid #e2e8f0;">
                            <span style="font-size:0.68rem; color:#64748b; display:block;">Garantía / Validez:</span>
                            <span style="font-weight:700; font-size:0.75rem; color:#0f172a;">Certificado Oficial CUDI</span>
                        </div>
                        <div style="background:#f8fafc; padding:8px; border-radius:8px; border:1px solid #e2e8f0;">
                            <span style="font-size:0.68rem; color:#64748b; display:block;">Categoría:</span>
                            <span style="font-weight:700; font-size:0.75rem; color:#0f172a;">${prod.categorySlug}</span>
                        </div>
                    </div>
                    <p style="font-size:0.72rem; color:#64748b; margin:0;">Cumplimiento estricto de la Ley 7/2023 de Bienestar Animal y estándares de bio-compatibilidad dérmica.</p>
                </div>

                <!-- Tab Reviews -->
                <div id="modal-sec-reviews" style="display:none;">
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px; background:#fffbeb; padding:10px; border-radius:10px; border:1px solid #fef3c7;">
                        <div style="font-size:1.8rem; font-weight:900; color:#b45309;">${prod.reviews?.rating || 4.9}</div>
                        <div>
                            <div style="color:#f59e0b; font-size:0.8rem;"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
                            <span style="font-size:0.7rem; color:#78350f;">Basado en ${prod.reviews?.count || 120} valoraciones verificadas de tutores</span>
                        </div>
                    </div>
                    <div style="border-left:3px solid #0284c7; padding-left:10px; margin-bottom:10px;">
                        <p style="margin:0 0 4px; font-weight:700; font-size:0.75rem; color:#0f172a;">“Cambio radical en la tranquilidad familiar”</p>
                        <p style="margin:0; font-size:0.72rem; color:#475569;">Poder sincronizarlo con el Gemelo Digital y ver las constantes vitales en vivo da una paz mental impagable.</p>
                        <span style="font-size:0.65rem; color:#94a3b8;">— Tutor verificado en Barcelona &bull; Hace 4 días</span>
                    </div>
                </div>

                <!-- Tab Study -->
                <div id="modal-sec-study" style="display:none;">
                    <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:10px; padding:12px; margin-bottom:10px;">
                        <div style="display:flex; align-items:center; gap:6px; font-weight:800; color:#1e40af; font-size:0.78rem; margin-bottom:4px;">
                            <i class="fa-solid fa-microscope"></i> ${study.trial_name}
                        </div>
                        <p style="margin:0 0 6px; font-size:0.75rem; font-weight:700; color:#0369a1;">
                            Métrica Clave: ${study.metric}
                        </p>
                        <div style="font-size:0.7rem; color:#475569; line-height:1.4;">
                            <div><strong>Publicación:</strong> ${study.journal}</div>
                            <div><strong>Muestra clínica:</strong> ${study.sample_size}</div>
                            <div><strong>Autores:</strong> ${study.authors}</div>
                            ${study.doi ? '<div><strong>DOI Oficial:</strong> <code>' + study.doi + '</code></div>' : ''}
                        </div>
                    </div>
                    ${prod.studyUrl ? `
                        <a href="${prod.studyUrl}" class="btn-secondary" style="display:block; text-align:center; padding:8px; border-radius:8px; text-decoration:none; font-weight:700; font-size:0.75rem; background:#f1f5f9; color:#0f172a;">
                            <i class="fa-solid fa-book-open"></i> Leer Ensayo Clínico Completo
                        </a>
                    ` : ''}
                </div>
            </div>

            <!-- Modal Footer (Price + Add to Cart) -->
            <div style="padding:10px 14px; border-top:1px solid #e2e8f0; background:#f8fafc; display:flex; align-items:center; justify-content:space-between; flex-shrink:0;">
                <div>
                    <span style="font-size:0.65rem; color:#64748b; display:block;">PVP Recomendado</span>
                    <span style="font-size:1.1rem; font-weight:900; color:#0f172a;">${prod.price.toFixed(2)} €</span>
                </div>
                <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end;">
                    ${prod.url ? `<a href="${prod.url}" style="background:#f1f5f9; color:#0f172a; padding:7px 10px; border-radius:10px; text-decoration:none; font-weight:700; font-size:0.72rem; display:flex; align-items:center; gap:4px;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Web</a>` : ''}
                    <button onclick="addToCart('${prod.name.replace(/'/g, "\\'")}', ${prod.price}, '${prod.img}'); closeProductModal();" style="background:#0284c7; color:white; border:none; padding:7px 12px; border-radius:10px; font-weight:800; font-size:0.75rem; cursor:pointer; display:flex; align-items:center; gap:4px;">
                        <i class="fa-solid fa-cart-shopping"></i> Añadir
                    </button>
                </div>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
}

function switchProductModalTab(tabKey) {
    const tabs = ['desc', 'specs', 'reviews', 'study'];
    tabs.forEach(k => {
        const sec = document.getElementById('modal-sec-' + k);
        const btn = document.getElementById('modal-tab-btn-' + k);
        if (sec) sec.style.display = k === tabKey ? 'block' : 'none';
        if (btn) {
            btn.style.background = k === tabKey ? 'white' : 'none';
            btn.style.color = k === tabKey ? '#0284c7' : '#64748b';
            btn.style.borderBottom = k === tabKey ? '2px solid #0284c7' : 'none';
        }
    });
}

function closeProductModal() {
    const modal = document.getElementById('product-deep-modal');
    if (modal) modal.style.display = 'none';
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


