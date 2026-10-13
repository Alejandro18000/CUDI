const fs = require('fs');
const { packFile } = require('./pack_module.cjs');

const master = JSON.parse(fs.readFileSync('cudi-products-master.json', 'utf8'));

// Build JSON map by category
const catMap = {
  hardware: master.filter(p => p.categorySlug === 'hardware'),
  nutricion: master.filter(p => p.categorySlug === 'nutricion'),
  clinica: master.filter(p => p.categorySlug === 'clinica'),
  paseos: master.filter(p => p.categorySlug === 'paseos'),
  seguros: master.filter(p => p.categorySlug === 'seguros'),
  estetica: master.filter(p => p.categorySlug === 'estetica')
};

console.log('Categories counts:');
Object.keys(catMap).forEach(k => console.log(k, catMap[k].length));

const srcPath = 'BOVEDA-PRIVADA-CUDI-TFM/codigo-fuente-editable/cudi-ai.js';
let aiCode = fs.readFileSync(srcPath, 'utf8');

// Build the helper function to generate the 15-product scrollable cards block
function generateCategoryBlock(slug, categoryName, introText, icon) {
  const prods = catMap[slug] || [];
  const cardsHtml = prods.map(p => {
    const descShort = (p.desc || '').slice(0, 110) + '...';
    const escapedName = p.name.replace(/'/g, "\\'");
    return `
                    <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin-bottom:10px; display:flex; gap:12px; align-items:center;">
                        <a href="${p.url}" style="flex-shrink:0;">
                            <img src="${p.img || 'cudi-collar-hardware-hero.jpg'}" alt="${p.name}" style="width:54px; height:54px; border-radius:8px; object-fit:cover; border:1px solid #e2e8f0;" onerror="this.src='cudi-collar-hardware-hero.jpg'">
                        </a>
                        <div style="flex:1; min-width:0;">
                            <a href="${p.url}" style="text-decoration:none; display:block; font-weight:700; font-size:0.85rem; color:#0f172a; margin-bottom:2px; line-height:1.3;">${p.name}</a>
                            <div style="font-size:0.74rem; color:#64748b; line-height:1.35; margin-bottom:4px;">${descShort}</div>
                            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
                                <span style="font-weight:800; color:#0284c7; font-size:0.85rem;">${p.price.toFixed(2)} €</span>
                                <div style="display:flex; gap:6px;">
                                    <button class="ai-btn-action primary" style="padding:4px 10px; font-size:0.72rem;" onclick="CudiAI.goToProduct('${p.url}', '${escapedName}', ${p.price}, '${p.img}')">
                                        <i class="fa-solid fa-cart-plus"></i> Ficha & Comprar
                                    </button>
                                    ${p.studyUrl ? `
                                    <button class="ai-btn-action secondary" style="padding:4px 10px; font-size:0.72rem;" onclick="window.location.href='${p.studyUrl}'">
                                        <i class="fa-solid fa-flask"></i> Estudio
                                    </button>` : ''}
                                </div>
                            </div>
                        </div>
                    </div>`;
  }).join('');

  return `
        // ---------------------------------------------------------------------
        // CATÁLOGO COMPLETO DE ${categoryName.toUpperCase()} (15 PRODUCTOS)
        // ---------------------------------------------------------------------
        return \`
            <div class="ai-source-badge"><i class="fa-solid ${icon}"></i> Catálogo Oficial CUDI &bull; ${categoryName}</div><br>
            ${introText}
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:12px; margin:10px 0; max-height:360px; overflow-y:auto;">
                ${cardsHtml}
            </div>
            <div class="ai-actions-wrap">
                <button class="ai-btn-action primary" onclick="window.location.href='index.html#store-grid'">
                    <i class="fa-solid fa-store"></i> Ver en Catálogo Web
                </button>
                <button class="ai-btn-action secondary" onclick="CudiAI.activateDemoTab('store')">
                    <i class="fa-solid fa-mobile-screen"></i> Ver en Demo App
                </button>
            </div>
        \`;`;
}

// Generate the 6 handlers
const hardwareHandler = `
        if (has('collares', 'collar', 'gps', 'hardware', 'dispositivos', 'dispositivo', 'tecnologia', 'sensores', 'antena', 'balizas', 'baliza', 'comedero', 'fuente', 'chapa', 'cama biometrica', 'arnes', 'correa inteligente', 'catalogo de hardware', 'que collares')) {
${generateCategoryBlock('hardware', 'Hardware & Telemetría IoT', 'En <strong>CUDI</strong> disponemos de <strong>15 dispositivos biométricos, collares inteligentes y hardware IoT de grado médico</strong> sincronizados con el gemelo digital de tu mascota:', 'fa-satellite-dish')}
        }
`;

const nutricionHandler = `
        if (has('comida', 'comidas', 'alimento', 'alimentos', 'alimentacion', 'pienso', 'piensos', 'barf', 'dieta', 'dietas', 'nutricion', 'suplemento', 'suplementos', 'que alimentos venden', 'que comida venden', 'que productos de comida', 'catalogo de comida')) {
${generateCategoryBlock('nutricion', 'Nutrición & Dieta Biológica', 'En <strong>CUDI</strong> disponemos de <strong>15 productos de nutrición biológica, dietas BARF, piensos hipoalergénicos clínicos y suplementos funcionales</strong> diseñados según la biometría y telemetría de tu mascota:', 'fa-bowl-food')}
        }
`;

const veterinariaHandler = `
        if (has('veterinario', 'veterinarios', 'urgencias', 'vethome', 'medipet', 'consulta veterinaria', 'clinica veterinaria', 'hospital veterinario', 'ecografia', 'vacuna', 'vacunas', 'adn canino', 'adn felino', 'cirugia', 'castracion', 'etologia', 'oncologia', 'catalogo veterinaria', 'servicios veterinarios')) {
${generateCategoryBlock('clinica', 'Veterinaria & Salud 24/7', 'En <strong>CUDI</strong> disponemos de <strong>15 servicios clínicos certificados, urgencias a domicilio, telemedicina 24/7 y pruebas diagnósticas de alta resolución</strong>:', 'fa-stethoscope')}
        }
`;

const paseosHandler = `
        if (has('paseo', 'paseos', 'paseador', 'paseadores', 'cuidador', 'cuidadores', 'guarderia', 'activepaws', 'nannypets', 'hotel canino', 'hospedaje', 'senderismo canino', 'canicross', 'catalogo paseos', 'servicios de paseo')) {
${generateCategoryBlock('paseos', 'Paseos & Cuidadores Certificados', 'En <strong>CUDI</strong> disponemos de <strong>15 servicios de paseadores certificados, cuidadores a domicilio y hospedaje familiar sin jaulas</strong> con telemetría en vivo:', 'fa-person-walking-dog')}
        }
`;

const segurosHandler = `
        if (has('seguro', 'seguros', 'poliza', 'polizas', 'shield', 'cobertura', 'reembolso veterinario', 'responsabilidad civil', 'decesos', 'global pet', 'safehome', 'catalogo seguros', 'que seguros ofrecen')) {
${generateCategoryBlock('seguros', 'Seguros & Protección Familiar', 'En <strong>CUDI</strong> disponemos de <strong>15 pólizas de seguros y coberturas veterinarias integrales con reembolso directo y liquidación instantánea</strong>:', 'fa-shield-heart')}
        }
`;

const spaHandler = `
        if (has('spa', 'peluqueria', 'peluqueria canina', 'peluqueria felina', 'bano', 'grooming', 'ozonoterapia', 'deslanado', 'corte de pelo', 'uñas', 'stripping', 'keratina', 'zenpet', 'bubbles', 'catalogo spa', 'servicios de spa')) {
${generateCategoryBlock('estetica', 'Estética, Baño & Spa Terapéutico', 'En <strong>CUDI</strong> disponemos de <strong>15 tratamientos de estética, peluquería de bajo estrés, ozonoterapia y spa dermatológico</strong>:', 'fa-spa')}
        }
`;

// Legal Documents Handlers
const legalHandlers = `
        // ---------------------------------------------------------------------
        // DOCUMENTOS LEGALES, POLÍTICAS Y CONFORMIDAD RGPD
        // ---------------------------------------------------------------------
        if (has('privacidad', 'rgpd', 'proteccion de datos', 'gdpr', 'datos biometricos', 'arco', 'derecho de supresion', 'quien guarda mis datos')) {
            return \`
                <div class="ai-source-badge"><i class="fa-solid fa-user-shield"></i> Privacidad &bull; RGPD / GDPR Oficial CUDI</div><br>
                <strong>Política de Privacidad y Protección de Datos Biométricos (<code>politica-privacidad-datos-mascotas.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:14px; margin:10px 0; font-size:0.82rem; line-height:1.65; color:#1e293b;">
                    🔒 <strong>Propiedad Exclusiva del Tutor:</strong> Todos los datos de telemetría (frecuencia cardíaca, temperatura dérmica, posicionamiento GPS y registros médicos) pertenecen al tutor. CUDI <strong>nunca comercializa ni cede datos a terceros</strong>.<br><br>
                    🛡️ <strong>Cifrado Militar de Extremo a Extremo:</strong> Las transmisiones entre el Smart Collar, la antena LTE-M y el servidor cloud están cifradas con protocolo AES-256.<br><br>
                    ⚖️ <strong>Derechos ARCO & Supresión Inmediata:</strong> Puedes ejercer tus derechos de acceso, rectificación, portabilidad y borrado total en cualquier momento enviando un correo al Delegado de Protección de Datos (DPO) en <code>cudi.ai2026@gmail.com</code>.<br><br>
                    🇪🇺 <strong>Servidores en la Unión Europea:</strong> Base de datos alojada íntegramente en centros de datos regulados de la UE.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="window.location.href='politica-privacidad-datos-mascotas.html'">
                        <i class="fa-solid fa-file-shield"></i> Leer Política de Privacidad Completa
                    </button>
                    <button class="ai-btn-action secondary" onclick="window.location.href='legal.html'">
                        <i class="fa-solid fa-scale-balanced"></i> Aviso Legal
                    </button>
                </div>
            \`;
        }

        if (has('terminos', 'condiciones', 'contrato', 'terminos y condiciones', 'cancelar suscripcion', 'dar de baja', 'permanencia')) {
            return \`
                <div class="ai-source-badge"><i class="fa-solid fa-file-contract"></i> Términos &amp; Condiciones &bull; Contrato de Servicio</div><br>
                <strong>Términos y Condiciones del Ecosistema CUDI (<code>terminos-condiciones-app.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:14px; margin:10px 0; font-size:0.82rem; line-height:1.65; color:#1e293b;">
                    📋 <strong>Sin Permanencia Obligatoria:</strong> Los planes mensuales se pueden cancelar en cualquier momento con 1 solo clic desde tu perfil sin costes ni penalizaciones ocultas.<br><br>
                    👑 <strong>Modalidad Anual (-20% de Descuento):</strong> Incluye el Smart Collar CUDI GPS Ultra gratis y garantía de sustitución exprés en 24h ante rotura o daño accidental.<br><br>
                    ⏱️ <strong>SLA de Telemedicina:</strong> Tiempo de respuesta inferior a 2 minutos en triaje de urgencias IA y videoconsultas veterinarias garantizadas 24 horas al día, los 365 días del año.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="window.location.href='terminos-condiciones-app.html'">
                        <i class="fa-solid fa-file-contract"></i> Ver Términos y Condiciones
                    </button>
                    <button class="ai-btn-action secondary" onclick="window.location.href='planes-suscripcion-bienestar-animal.html'">
                        <i class="fa-solid fa-shield-cat"></i> Ver Planes y Suscripciones
                    </button>
                </div>
            \`;
        }

        if (has('cookies', 'politica de cookies', 'que cookies usan', 'rastreadores', 'tracking')) {
            return \`
                <div class="ai-source-badge"><i class="fa-solid fa-cookie-bite"></i> Política de Cookies &bull; Privacidad Web</div><br>
                <strong>Política Oficial de Cookies de la Plataforma CUDI (<code>politica-cookies-plataforma.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:14px; margin:10px 0; font-size:0.82rem; line-height:1.65; color:#1e293b;">
                    🍪 <strong>Cookies Técnicas Estrictamente Necesarias:</strong> Mantienen la sesión de usuario activa y la persistencia de la cesta de compras sin almacenar información publicitaria.<br><br>
                    📊 <strong>Analítica Agregada y Anónima:</strong> Métricas de rendimiento con Google Tag Manager y Microsoft Clarity anonimizando IPs sin cruce con perfiles biométricos.<br><br>
                    ⚙️ <strong>Control Total del Usuario:</strong> Puedes revocar o configurar el consentimiento de cookies analíticas en cualquier momento mediante el panel de preferencias.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="window.location.href='politica-cookies-plataforma.html'">
                        <i class="fa-solid fa-cookie-bite"></i> Leer Política de Cookies
                    </button>
                </div>
            \`;
        }

        if (has('devolucion', 'devoluciones', 'garantia', 'desistimiento', 'devolver collar', 'reembolso de compra', 'cuanto tiempo tengo para devolver')) {
            return \`
                <div class="ai-source-badge"><i class="fa-solid fa-rotate-left"></i> Garantía &amp; Devoluciones &bull; Compromiso CUDI</div><br>
                <strong>Garantía Oficial y Política de Devoluciones (<code>politica-devoluciones-smart-collar.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:14px; margin:10px 0; font-size:0.82rem; line-height:1.65; color:#1e293b;">
                    📦 <strong>30 Días de Prueba Sin Compromiso:</strong> Si el Smart Collar no se adapta a tu mascota o no cumple al 100% tus expectativas, te reembolsamos el importe total sin preguntas.<br><br>
                    🛡️ <strong>3 Años de Garantía Europea Oficial:</strong> Cobertura frente a cualquier fallo de hardware, defecto de fábrica de la batería o estanqueidad del sello IP68.<br><br>
                    🚚 <strong>Envío y Retorno Gratuitos:</strong> La devolución no tiene ningún coste para el tutor en toda la Península Ibérica y Baleares.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="window.location.href='politica-devoluciones-smart-collar.html'">
                        <i class="fa-solid fa-rotate-left"></i> Consultar Política de Devoluciones
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.buyCollar()">
                        <i class="fa-solid fa-shield-dog"></i> Probar Smart Collar (30 Días)
                    </button>
                </div>
            \`;
        }

        if (has('aviso legal', 'legal', 'contacto legal', 'quien es la empresa', 'cif', 'sede')) {
            return \`
                <div class="ai-source-badge"><i class="fa-solid fa-scale-balanced"></i> Información Corporativa &bull; Aviso Legal</div><br>
                <strong>Aviso Legal y Datos Identificativos (<code>legal.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:14px; margin:10px 0; font-size:0.82rem; line-height:1.65; color:#1e293b;">
                    🏛️ <strong>Titularidad:</strong> CUDI Animal Ecosystem S.L. &bull; Proyecto TFM Internacional 2026.<br>
                    👨‍💻 <strong>Fundador &amp; Arquitecto:</strong> Sergio Alejandro Ospina Rocha.<br>
                    📍 <strong>Sede y Operaciones:</strong> Distrito 22@, Poblenou, Barcelona, España.<br>
                    📧 <strong>Contacto Institucional:</strong> <code>cudi.ai2026@gmail.com</code>.<br>
                    ⚖️ <strong>Cumplimiento Normativo:</strong> Ley de Servicios de la Sociedad de la Información (LSSI-CE), RGPD UE 2016/679 y Ley 7/2023 de Bienestar Animal.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="window.location.href='legal.html'">
                        <i class="fa-solid fa-file-lines"></i> Abrir Aviso Legal Completo
                    </button>
                </div>
            \`;
        }
`;

// Open Domain Intelligence Engine
const openDomainEngine = `
    getGeneralOpenDomainAnswer(rawQuery) {
        const q = (rawQuery || '').toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
        const p = this.petProfile || { name: 'tu mascota' };

        // 1. Preguntas generales de etología / comportamiento canino y felino
        if (/tormenta|petardo|fuegos artificiales|trueno|miedo a los ruidos/.test(q)) {
            return \`
                <strong>Cómo calmar a \${p.name} ante tormentas o pirotecnia:</strong>
                <ul style="margin:6px 0 10px 18px; padding:0; font-size:0.8rem; line-height:1.5;">
                    <li><strong>Crea un refugio seguro:</strong> Prepara una habitación interior sin ventanas o con persianas bajadas, con su cama, mantas y una prenda con tu olor.</li>
                    <li><strong>Aislamiento acústico:</strong> Pon música relajante clásica o ruido blanco suave para enmascarar las detonaciones externas.</li>
                    <li><strong>Transmite serenidad:</strong> No lo sobreprotejas con voz ansiosa ni lo castigues por temblar; acompáñalo con caricias firmes y calmadas.</li>
                    <li><strong>Monitoreo biométrico:</strong> Si tiene el Smart Collar CUDI, podrás vigilar si su pulso cardíaco desciende progresivamente hacia la calma.</li>
                </ul>\`;
        }

        if (/por que los gatos ronronean|por que ronronea/.test(q)) {
            return \`
                <strong>¿Por qué ronronean los gatos? (Base neurobiológica):</strong>
                <p style="font-size:0.8rem; line-height:1.55; color:#334155; margin:0 0 8px;">
                    El ronroneo felino se produce mediante vibraciones en los músculos de la laringe a una frecuencia constante de <strong>20 a 140 Hz</strong>. Aunque tradicionalmente se asocia al bienestar, placer y afecto con su tutor, los estudios etológicos demuestran que también ronronean como mecanismo de autorreparación ósea y alivio del estrés o dolor (liberación de endorfinas).
                </p>\`;
        }

        if (/frutas? (pueden? comer|aptas?|seguras?)|que frutas|manzana|platano|fresa|sandia/.test(q)) {
            return \`
                <strong>Guía Nutricional de Frutas Seguras vs Tóxicas:</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; font-size:0.8rem; line-height:1.55;">
                    ✅ <strong>Frutas recomendadas (en moderación y sin semillas):</strong> Manzana (sin corazón/pepitas), plátano, arándanos (gran antioxidante), sandía (sin corteza ni pepitas), pera y fresas.<br><br>
                    ❌ <strong>FRUTAS TÓXICAS PROHIBIDAS:</strong> <strong>Uvas y pasas</strong> (causan insuficiencia renal aguda fulminante), aguacate (contiene persina) y cerezas (el hueso contiene cianuro).
                </div>\`;
        }

        if (/por que come hierba|por que come pasto/.test(q)) {
            return \`
                <strong>¿Por qué los perros y gatos comen hierba o pasto?</strong>
                <p style="font-size:0.8rem; line-height:1.55; color:#334155; margin:0 0 8px;">
                    Es un comportamiento heredado de sus ancestros cánidos y félidos salvajes. Ocurre por tres razones principales:
                </p>
                <ol style="margin:4px 0 10px 18px; padding:0; font-size:0.79rem; line-height:1.5; color:#475569;">
                    <li><strong>Aporte de fibra vegetal:</strong> Ayuda a estimular la motilidad gastrointestinal y eliminar pelos acumulados.</li>
                    <li><strong>Alivio gástrico leve:</strong> En ocasiones buscan inducir el vómito si sienten pesadez estomacal.</li>
                    <li><strong>Instinto y exploración olfativa:</strong> Muchos animales simplemente disfrutan del frescor y la textura.</li>
                </ol>
                <div style="font-size:0.75rem; color:#dc2626; font-weight:700;">⚠️ Asegúrate de que el césped no haya sido tratado con pesticidas ni fertilizantes químicos.</div>\`;
        }

        if (/cuantas horas duerme|cuanto debe dormir|sueno/.test(q)) {
            return \`
                <strong>Ciclos Circadianos y Horas de Sueño en Mascotas:</strong>
                <ul style="margin:6px 0 10px 18px; padding:0; font-size:0.8rem; line-height:1.5;">
                    <li><strong>Perros adultos:</strong> Duermen entre <strong>12 y 14 horas</strong> al día (combinando descanso nocturno y siestas ligeras).</li>
                    <li><strong>Cachorros y perros sénior:</strong> Pueden dormir entre <strong>18 y 20 horas</strong> diarias debido a su desarrollo neurológico o desgaste celular.</li>
                    <li><strong>Gatos:</strong> Dedican de <strong>12 a 16 horas</strong> diarias a dormitar en ciclos polifásicos de caza y descanso.</li>
                </ul>\`;
        }

        if (/chiste|broma|hazme reir/.test(q)) {
            return \`
                😄 <strong>¡Aquí va un chiste perruno!</strong><br><br>
                <em>— ¿Por qué los perros no juegan a las cartas en la selva?<br>
                — ¡Porque hay demasiados guepardos!</em> 🐆🃏<br><br>
                🐕 Y recuerda: el mejor amigo del hombre no juzga tus chistes, ¡solo espera que le lances la pelota! 🎾
            \`;
        }

        if (/capital de|cuanto es|fotosintesis|que es la ia|como funciona|universo|tierra|gravedad|filosofia/.test(q)) {
            return \`
                <strong>Respuesta de Conocimiento General:</strong><br><br>
                <p style="font-size:0.82rem; line-height:1.6; color:#334155; margin:0 0 8px;">
                    Sobre tu consulta: <em>"\${rawQuery}"</em>.<br>
                    Como asistente inteligente, estoy preparado no solo para cuidar de \${p.name} y monitorizar sus constantes vitales, sino también para ayudarte con cualquier duda de cultura, ciencia, biología y aprendizaje general.
                </p>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; font-size:0.8rem; line-height:1.6; color:#1e293b;">
                    💡 Si necesitas asesoramiento etológico, nutricional o médico veterinario sobre \${p.name}, o deseas explorar cualquiera de nuestras 90 soluciones clínicas certificadas, estoy siempre a tu lado 24/7.
                </div>
            \`;
        }

        if (/hola|buenos dias|buenas tardes|que tal|como estas|hey|saludos/.test(q)) {
            return \`
                ¡Hola! 👋 Qué alegría saludarte. Soy la <strong>IA de Bienestar y Telemetría CUDI</strong>.<br><br>
                Actualmente estoy monitorizando a <strong>\${p.name}</strong> en segundo plano. ¿En qué te gustaría que te ayude hoy?
                <ul style="margin:6px 0 10px 18px; padding:0; font-size:0.8rem; line-height:1.5;">
                    <li>Consultar constantes vitales, pulso o ubicación GPS.</li>
                    <li>Revisar síntomas, nutrición clínica o vacunas.</li>
                    <li>Explorar nuestro catálogo de 90 productos y ensayos científicos.</li>
                    <li>Resolver cualquier duda general sobre el cuidado de tu compañero.</li>
                </ul>
            \`;
        }

        // Respuesta abierta elocuente y amigable
        return \`
            <div class="ai-source-badge"><i class="fa-solid fa-brain"></i> Asistente de Inteligencia CUDI &bull; \${p.name}</div><br>
            Entiendo perfectamente tu inquietud sobre: <strong>"\${rawQuery}"</strong>.<br><br>
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.81rem; line-height:1.6; color:#334155;">
                Como IA integral de salud animal y conocimiento abierto, evalúo continuamente tanto las necesidades comportamentales como fisiológicas de \${p.name} (\${p.type === 'gato' ? 'felino' : 'canino'}). 
                Si tu consulta guarda relación con su bienestar diario, alimentación, comportamiento o salud preventiva, recuerda que disponemos de un equipo veterinario colegiado 24/7 y 90 ensayos clínicos publicados para orientarte.
            </div>
            <div class="ai-actions-wrap">
                <button class="ai-btn-action primary" onclick="CudiAI.goToMetrics()">
                    <i class="fa-solid fa-heart-pulse"></i> Ver Gemelo de \${p.name}
                </button>
                <button class="ai-btn-action secondary" onclick="window.location.href='index.html#store-grid'">
                    <i class="fa-solid fa-store"></i> Explorar Catálogo
                </button>
                <button class="ai-btn-action secondary" onclick="window.location.href='index.html#ciencia'">
                    <i class="fa-solid fa-microscope"></i> Ver 90 Ensayos Clínicos
                </button>
            </div>
        \`;
    },
`;

// Replace in cudi-ai.js:
// Find target position where section 14 was
const targetPos = aiCode.indexOf('// 14. VETERINARIO A DOMICILIO');
if (targetPos === -1) {
  console.error('Target position for category handlers not found');
  process.exit(1);
}

// Remove the older nutrition-only block if it exists around line 1475
const oldNutriStart = aiCode.indexOf('// SECCIÓN ESPECÍFICA: CATÁLOGO COMPLETO DE ALIMENTACIÓN');
if (oldNutriStart !== -1) {
  const oldNutriEnd = aiCode.indexOf('// ---------------------------------------------------------------------', oldNutriStart + 200);
  if (oldNutriEnd !== -1) {
    aiCode = aiCode.slice(0, oldNutriStart) + aiCode.slice(oldNutriEnd);
  }
}

const targetPos2 = aiCode.indexOf('// 14. VETERINARIO A DOMICILIO');
const combinedHandlers = `
        // =====================================================================
        // HANDLERS SEMÁNTICOS PARA TODAS LAS 6 CATEGORÍAS (15 PRODUCTOS CADA UNA)
        // =====================================================================
${hardwareHandler}
${nutricionHandler}
${veterinariaHandler}
${paseosHandler}
${segurosHandler}
${spaHandler}
${legalHandlers}
`;

aiCode = aiCode.slice(0, targetPos2) + combinedHandlers + aiCode.slice(targetPos2);

// Now update section 20 to use getGeneralOpenDomainAnswer
const sec20Pos = aiCode.indexOf('// 20. RESPUESTA CLÍNICA Y NAVEGACIONAL COMPLETA PARA CONSULTAS ABIERTAS');
if (sec20Pos !== -1) {
  const sec20End = aiCode.indexOf('// -------------------------------------------------------------------------', sec20Pos);
  if (sec20End !== -1) {
    const updatedSec20 = `// 20. RESPUESTA CLÍNICA Y NAVEGACIONAL COMPLETA PARA CONSULTAS ABIERTAS
        return this.getGeneralOpenDomainAnswer(rawQuery);
    },
`;
    aiCode = aiCode.slice(0, sec20Pos) + updatedSec20 + aiCode.slice(sec20End);
  }
}

// Add getGeneralOpenDomainAnswer method right after generateResponseSync
const afterGenerate = aiCode.indexOf('ensureDemoDashboardUnlocked()');
if (afterGenerate !== -1) {
  aiCode = aiCode.slice(0, afterGenerate) + openDomainEngine + '\n    ' + aiCode.slice(afterGenerate);
}

fs.writeFileSync(srcPath, aiCode, 'utf8');
console.log('Successfully updated editable cudi-ai.js with all 6 categories (15 prods each), legal docs, and open domain intelligence!');

// Pack to root cudi-ai.js
packFile(srcPath, 'cudi-ai.js');
