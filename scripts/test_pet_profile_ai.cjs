const fs = require('fs');

// Mock browser environment
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

require('../cudi-ai.js');
const ai = global.window.CudiAI;

console.log('=== TEST SUITE: PET DATA & GUEST MODE ===');

// 1. TEST GUEST MODE (Modo General / Sin Perfil)
ai.petProfile = null;
ai.hasActiveProfile = false;
global.localStorage.setItem('cudi_session_active', 'false');
global.localStorage.removeItem('cudi_pet_profile');

const guestAgeRes = ai.generateResponseSync('cuantos años tiene el');
console.log('[GUEST 1] "cuantos años tiene el" includes "Modo General"?:', guestAgeRes.includes('Modo General'));
if (!guestAgeRes.includes('Modo General')) throw new Error('Guest mode age query failed');

const guestGpsRes = ai.generateResponseSync('donde esta mi perro');
console.log('[GUEST 2] "donde esta mi perro" includes "Modo General"?:', guestGpsRes.includes('Modo General'));
if (!guestGpsRes.includes('Modo General')) throw new Error('Guest mode GPS query failed');

// 2. TEST ACTIVE PROFILE (Modo con Mascota Zoe)
global.localStorage.setItem('cudi_session_active', 'true');
global.localStorage.setItem('cudi_pet_profile', JSON.stringify({
  name: 'Zoe',
  photo: 'avatar-mascota-perfil-gemelo-digital.png',
  type: 'perro',
  breed: 'Border Collie Mestizo',
  weight: '14.5',
  age: '3 años',
  energy: 'Muy Activo',
  food: 'Dieta BARF Orgánica + PureBites'
}));

ai.loadProfile();
console.log('[PROFILE LOADED] Name:', ai.petProfile.name, 'hasActiveProfile:', ai.hasActiveProfile);

const ageRes = ai.generateResponseSync('cuantos años tiene el');
console.log('[PET DATA 1] Age answer includes "3 años"?:', ageRes.includes('3 años'));
if (!ageRes.includes('3 años')) throw new Error('Pet age query failed');

const breedRes = ai.generateResponseSync('que raza es');
console.log('[PET DATA 2] Breed answer includes "Border Collie Mestizo"?:', breedRes.includes('Border Collie Mestizo'));
if (!breedRes.includes('Border Collie Mestizo')) throw new Error('Pet breed query failed');

const weightRes = ai.generateResponseSync('cuanto pesa el');
console.log('[PET DATA 3] Weight answer includes "14.5 kg"?:', weightRes.includes('14.5 kg'));
if (!weightRes.includes('14.5 kg')) throw new Error('Pet weight query failed');

const foodRes = ai.generateResponseSync('que come ella');
console.log('[PET DATA 4] Food answer includes "Dieta BARF Orgánica"?:', foodRes.includes('Dieta BARF Orgánica'));
if (!foodRes.includes('Dieta BARF Orgánica')) throw new Error('Pet food query failed');

const batteryRes = ai.generateResponseSync('cuanta bateria tiene su collar');
console.log('[PET DATA 5] Battery answer includes "Batería"?:', batteryRes.includes('Batería'));
if (!batteryRes.includes('Batería')) throw new Error('Pet battery query failed');

const allDataRes = ai.generateResponseSync('todos sus datos de mi mascota');
console.log('[PET DATA 6] All data answer includes "Expediente Bio-Neural Completo"?:', allDataRes.includes('Expediente Bio-Neural Completo'));
if (!allDataRes.includes('Expediente Bio-Neural Completo')) throw new Error('Pet all data query failed');

console.log('✅ ALL PET DATA & GUEST MODE TESTS PASSED PERFECTLY!');
