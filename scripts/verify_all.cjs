const fs = require('fs');

// 1. Verify cudi-products-master.json has 0 bad photos
const master = JSON.parse(fs.readFileSync('cudi-products-master.json', 'utf8'));
const badPhotos = [
  'photo-1585846416120-3a7354ed7d39',
  'photo-1563460716037-460b3dd14ba9',
  'photo-1628009368231-7bb7cfcb0def',
  'photo-1516734212186-a967f81ad0d7'
];

let masterBadCount = 0;
master.forEach(p => {
  const allImgs = [p.img, ...(p.gallery || [])];
  allImgs.forEach(img => {
    badPhotos.forEach(bad => {
      if (img && img.includes(bad)) {
        masterBadCount++;
        console.error(`Found bad photo ${bad} in product ${p.id}`);
      }
    });
  });
});
console.log(`[TEST 1] Master products bad photos count: ${masterBadCount} (Expected: 0)`);

// 2. Setup robust browser globals for testing packed scripts
const memStorage = {};
const mockLocalStorage = {
  getItem: (k) => memStorage[k] || null,
  setItem: (k, v) => { memStorage[k] = String(v); },
  removeItem: (k) => { delete memStorage[k]; },
  clear: () => { Object.keys(memStorage).forEach(k => delete memStorage[k]); }
};

global.localStorage = mockLocalStorage;
global.window = {
  location: { pathname: '/index.html', href: 'index.html' },
  localStorage: mockLocalStorage,
  addEventListener: () => {},
  dispatchEvent: () => {},
  innerWidth: 1200
};
global.document = {
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  createElement: () => ({ setAttribute: () => {}, appendChild: () => {}, style: {} }),
  body: { appendChild: () => {} },
  head: { appendChild: () => {} },
  readyState: 'complete',
  addEventListener: () => {}
};

// 3. Test Packed cudi-ai.js
try {
  require('../cudi-ai.js');
  console.log('[TEST 2] Packed cudi-ai.js loaded and evaluated successfully!');
  
  if (global.window.CudiAI) {
    const ai = global.window.CudiAI;
    ai.petProfile = { name: 'Mimi', type: 'gato', breed: 'Común', weight: 4.2 };

    const tests = [
      { q: 'que collares de gps tienen', expect: 'Hardware & Telemetría IoT' },
      { q: 'que comida venden para gatos', expect: 'Nutrición & Dieta Biológica' },
      { q: 'servicios veterinarios de urgencia', expect: 'Veterinaria & Salud 24/7' },
      { q: 'cuidadores y paseos', expect: 'Paseos & Cuidadores Certificados' },
      { q: 'que seguros ofrecen', expect: 'Seguros & Protección Familiar' },
      { q: 'servicios de peluqueria y spa', expect: 'Estética, Baño & Spa Terapéutico' },
      { q: 'politica de privacidad y datos', expect: 'Política de Privacidad y Protección de Datos Biométricos' },
      { q: 'como devolver el collar garantia', expect: 'Garantía Oficial y Política de Devoluciones' },
      { q: 'como calmar a mi perro en una tormenta', expect: 'Cómo calmar a' },
      { q: 'por que los gatos ronronean', expect: '¿Por qué ronronean los gatos?' },
      { q: 'cuentame un chiste', expect: 'chiste perruno' },
      { q: 'cual es la capital de francia', expect: 'Respuesta de Conocimiento General' }
    ];

    let passed = 0;
    tests.forEach((t) => {
      const res = ai.generateResponseSync(t.q, false);
      if (res && res.includes(t.expect)) {
        passed++;
        console.log(`  ✓ Query "${t.q}" -> Match "${t.expect}"`);
      } else {
        console.error(`  ✗ Query "${t.q}" failed to match "${t.expect}". Response snippet: ${(res || '').slice(0, 100)}`);
      }
    });
    console.log(`[TEST 3] AI Queries passed: ${passed}/${tests.length}`);
  }
} catch (e) {
  console.error('[TEST 2 FAILED] Error evaluating cudi-ai.js:', e);
}

// 4. Test Packed nucleo-transversal.js cart engine
try {
  require('../modulos/nucleo-transversal.js');
  console.log('[TEST 4] Packed nucleo-transversal.js loaded and evaluated successfully!');
  console.log(`  window.addToCart available?: ${typeof global.window.addToCart === 'function'}`);
  console.log(`  window.toggleCart available?: ${typeof global.window.toggleCart === 'function'}`);
  console.log(`  window.renderUniversalCart available?: ${typeof global.window.renderUniversalCart === 'function'}`);
  
  // Test addToCart functionality and image matching
  global.window.addToCart('Smart Collar CUDI GPS Ultra', 149.0, '');
  const cartJson = global.localStorage.getItem('cudi_cart');
  const cartItems = JSON.parse(cartJson || '[]');
  console.log(`  Cart items in storage: ${cartItems.length}`);
  console.log(`  Item 0 name: ${cartItems[0]?.name}`);
  console.log(`  Item 0 image: ${cartItems[0]?.img}`);
  console.log(`  Item 0 studyUrl: ${cartItems[0]?.studyUrl}`);
} catch (e) {
  console.error('[TEST 4 FAILED] Error in nucleo-transversal.js:', e);
}

// 5. Test Packed app-demo.js
try {
  require('../app-demo.js');
  console.log('[TEST 5] Packed app-demo.js loaded and evaluated successfully!');
} catch (e) {
  console.error('[TEST 5 FAILED] Error in app-demo.js:', e);
}
