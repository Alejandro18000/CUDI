const fs = require('fs');

const file = 'BOVEDA-PRIVADA-CUDI-TFM/codigo-fuente-editable/cudi-ai.js';
let content = fs.readFileSync(file, 'utf8');

const oldLegalStartStr = '// A1. POLÍTICA DE DEVOLUCIONES, CAMBIOS, REEMBOLSOS Y CANCELACIONES';
const oldLegalEndStr = '// A5. ESTRATEGIA SEO';
const catStartStr = '// =====================================================================\n        // HANDLERS SEMÁNTICOS PARA TODAS LAS 6 CATEGORÍAS';
const catEndStr = '// DOCUMENTOS LEGALES, POLÍTICAS Y CONFORMIDAD RGPD';
const botLegalStartStr = catEndStr;
const botLegalEndStr = '// 14. VETERINARIO A DOMICILIO & CITAS';

const oldLegalStart = content.indexOf(oldLegalStartStr);
const oldLegalEnd = content.indexOf(oldLegalEndStr);

const catStart = content.indexOf(catStartStr);
const catEnd = content.indexOf(catEndStr);

const botLegalStart = content.indexOf(botLegalStartStr);
const botLegalEnd = content.indexOf(botLegalEndStr);

if (oldLegalStart === -1 || oldLegalEnd === -1 || catStart === -1 || botLegalStart === -1 || botLegalEnd === -1) {
  console.error('Could not locate markers!');
  process.exit(1);
}

// Extract blocks
let catBlock = content.substring(catStart, catEnd).trim();
let legalBlock = content.substring(botLegalStart, botLegalEnd).trim();

// Enhance triggers in legalBlock
legalBlock = legalBlock.replace(
  "if (has('privacidad', 'rgpd', 'proteccion de datos', 'gdpr', 'datos biometricos', 'arco', 'derecho de supresion', 'quien guarda mis datos'))",
  "if (has('privacidad', 'rgpd', 'proteccion de datos', 'gdpr', 'datos biometricos', 'arco', 'derecho de supresion', 'quien guarda mis datos', 'politica de privacidad', 'politica de privacidad y datos'))"
);

legalBlock = legalBlock.replace(
  "if (has('devolucion', 'devoluciones', 'garantia', 'desistimiento', 'devolver collar', 'reembolso de compra', 'cuanto tiempo tengo para devolver'))",
  "if (has('devolucion', 'devoluciones', 'garantia', 'desistimiento', 'devolver collar', 'reembolso', 'reembolsos', 'cancelacion', 'cancelar', 'cambio', 'cambios', 'como devolver el collar garantia', 'devolver el collar garantia', 'politica de devoluciones'))"
);

// Enhance triggers in catBlock for hardware
catBlock = catBlock.replace(
  "if (has('collares', 'collar', 'gps', 'hardware', 'dispositivos', 'dispositivo', 'tecnologia', 'sensores', 'antena', 'balizas', 'baliza', 'comedero', 'fuente', 'chapa', 'cama biometrica', 'arnes', 'correa inteligente', 'catalogo de hardware', 'que collares'))",
  "if (has('collares', 'que collares', 'hardware', 'dispositivos', 'dispositivo', 'sensores', 'antena', 'balizas', 'baliza', 'comedero', 'fuente', 'chapa', 'cama biometrica', 'arnes', 'correa inteligente', 'catalogo de hardware', 'que collares') || (has('gps') && has('collar', 'collares', 'tienen', 'venden', 'catalogo', 'comprar', 'modelos')) || (has('collar') && !has('devolver', 'devolucion', 'garantia', 'baja', 'roto')))"
);

// Combined categories + legal block to place at oldLegalStart
const combinedTopBlock = `        // ---------------------------------------------------------------------
        // SECCIÓN MAESTRA: CATÁLOGO COMPLETO (6 CATEGORÍAS x 15 PRODUCTOS = 90 ITEMS)
        // ---------------------------------------------------------------------
${catBlock}

        // ---------------------------------------------------------------------
        // SECCIÓN MAESTRA: DOCUMENTOS LEGALES, POLÍTICAS Y CONFORMIDAD RGPD
        // ---------------------------------------------------------------------
${legalBlock}

        `;

// Reconstruct string:
// 1. Prefix up to oldLegalStart
const part1 = content.substring(0, oldLegalStart);
// 2. Middle between oldLegalEnd and catStart
const part2 = content.substring(oldLegalEnd, catStart);
// 3. Suffix after botLegalEnd
const part3 = content.substring(botLegalEnd);

let newContent = part1 + combinedTopBlock + part2 + part3;

// Now update searchAllPagesKnowledge call and getGeneralOpenDomainAnswer
const searchPagesMarker = 'const matchedPage = this.searchAllPagesKnowledge(rawQuery);';
if (!newContent.includes(searchPagesMarker)) {
  console.error('searchPagesMarker not found!');
  process.exit(1);
}

const openDomainGuard = `// Chequeo prioritario de preguntas abiertas / comportamiento / conocimiento general
        const directOpenAnswer = this.getGeneralOpenDomainAnswer(rawQuery, true);
        if (directOpenAnswer) {
            return directOpenAnswer;
        }

        const matchedPage = this.searchAllPagesKnowledge(rawQuery);`;

newContent = newContent.replace(searchPagesMarker, openDomainGuard);

// Update signature and strictOnly in getGeneralOpenDomainAnswer
newContent = newContent.replace(
  'getGeneralOpenDomainAnswer(rawQuery) {',
  'getGeneralOpenDomainAnswer(rawQuery, strictOnly = false) {'
);

const holaMarker = `        if (/hola|buenos dias|buenas tardes|que tal|como estas|hey|saludos/.test(q)) {`;
const strictGuard = `        if (strictOnly) return null;\n\n` + holaMarker;

if (newContent.includes(holaMarker) && !newContent.includes('if (strictOnly) return null;')) {
  newContent = newContent.replace(holaMarker, strictGuard);
}

fs.writeFileSync(file, newContent, 'utf8');
console.log('Successfully reordered cudi-ai.js!');
