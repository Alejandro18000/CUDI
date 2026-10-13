const fs = require('fs');
const { packFile } = require('./pack_module.cjs');

const filePath = 'BOVEDA-PRIVADA-CUDI-TFM/codigo-fuente-editable/modulos/nucleo-transversal.js';
let content = fs.readFileSync(filePath, 'utf8');

// Ensure syncOmnichannelCartBadges is defined
if (!content.includes('function syncOmnichannelCartBadges()')) {
  content = content.replace(
    'function getCanonicalProduct(nameOrId) {',
    `function syncOmnichannelCartBadges() {
        let cart = [];
        try {
            cart = JSON.parse(localStorage.getItem('cudi_cart') || '[]');
        } catch (e) {}
        const totalItems = cart.reduce((acc, item) => acc + (parseInt(item.qty || item.quantity || 1, 10) || 1), 0);

        const globalBadge = document.getElementById('global-cart-badge');
        if (globalBadge) globalBadge.textContent = String(totalItems);

        const cartBadge = document.getElementById('cart-badge');
        if (cartBadge) cartBadge.textContent = String(totalItems);

        const appBadge = document.getElementById('app-cart-badge');
        if (appBadge) appBadge.textContent = String(totalItems);

        const floatCnt = document.getElementById('cart-float-count');
        if (floatCnt) floatCnt.textContent = String(totalItems);
    }

    function getCanonicalProduct(nameOrId) {`
  );
  fs.writeFileSync(filePath, content, 'utf8');
}

packFile(filePath, 'modulos/nucleo-transversal.js');
console.log('Fixed syncOmnichannelCartBadges in nucleo-transversal.js');
