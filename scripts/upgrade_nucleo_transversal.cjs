const fs = require('fs');
const { packFile } = require('./pack_module.cjs');

const filePath = 'BOVEDA-PRIVADA-CUDI-TFM/codigo-fuente-editable/modulos/nucleo-transversal.js';
let content = fs.readFileSync(filePath, 'utf8');

// Add the Universal Apple Glass Cart Engine to nucleo-transversal.js
const cartEngineCode = `
    // =========================================================================
    // MOTOR UNIVERSAL DE CESTA DE COMPRAS OMNICANAL (APPLE GLASS v7.6)
    // Sincronización Total con cudi-products-master.json y 0 fotos humanas
    // =========================================================================
    function getCanonicalProduct(nameOrId) {
        if (!nameOrId) return null;
        const catalog = window.CUDI_PRODUCTS_MASTER || (window.CudiCatalog ? window.CudiCatalog.getAll() : []);
        const term = String(nameOrId).toLowerCase().trim();
        return catalog.find(p => 
            p.id.toLowerCase() === term ||
            p.name.toLowerCase() === term ||
            p.shortTitle.toLowerCase() === term ||
            term.includes(p.name.toLowerCase()) ||
            p.name.toLowerCase().includes(term)
        ) || null;
    }

    function ensureUniversalCartDOM() {
        if (!document.getElementById('cart-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'cart-overlay';
            overlay.id = 'cart-overlay';
            overlay.onclick = function() { window.toggleCart(); };
            document.body.appendChild(overlay);
        }

        if (!document.getElementById('side-cart')) {
            const cart = document.createElement('div');
            cart.className = 'side-cart';
            cart.id = 'side-cart';
            cart.innerHTML = \`
                <div class="cart-header">
                    <h3><i class="fa-solid fa-bag-shopping"></i> Tu Cesta CUDI</h3>
                    <button class="close-cart" aria-label="Cerrar Carrito" onclick="window.toggleCart()"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="cart-items" id="cart-items-container"></div>
                <div class="cart-footer">
                    <div class="cart-total">
                        <span>Total Estimado:</span>
                        <span id="cart-total-price">0.00 €</span>
                    </div>
                    <a href="contratar-plan-premium-cudi.html" class="btn-primary" aria-label="Acción principal" style="display:block; text-align:center; margin-top:10px;">Procesar Pago Seguro <i class="fa-solid fa-lock"></i></a>
                </div>
            \`;
            document.body.appendChild(cart);
        }

        if (!document.getElementById('cudi-cart-styles')) {
            const style = document.createElement('style');
            style.id = 'cudi-cart-styles';
            style.textContent = \`
                .cart-overlay {
                    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                    background: rgba(15, 23, 42, 0.45); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
                    opacity: 0; pointer-events: none; transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                    z-index: 99998;
                }
                .cart-overlay.active { opacity: 1; pointer-events: auto; }
                .side-cart {
                    position: fixed; top: 0; right: -420px; width: 100%; max-width: 400px; height: 100vh;
                    background: rgba(255, 255, 255, 0.96); backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
                    box-shadow: -15px 0 45px rgba(0,0,0,0.12); border-left: 1px solid rgba(226, 232, 240, 0.8);
                    display: flex; flex-direction: column; transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    z-index: 99999; font-family: var(--font-body, system-ui, sans-serif);
                }
                .side-cart.active { right: 0; }
                .cart-header {
                    padding: 22px 24px; border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: space-between;
                }
                .cart-header h3 {
                    margin: 0; font-family: var(--font-heading, 'Outfit', sans-serif); font-size: 1.25rem; font-weight: 800; color: #0f172a;
                    display: flex; align-items: center; gap: 10px;
                }
                .cart-header h3 i { color: #0284c7; }
                .close-cart {
                    background: #f1f5f9; border: none; border-radius: 50%; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;
                    cursor: pointer; color: #64748b; font-size: 1rem; transition: all 0.2s;
                }
                .close-cart:hover { background: #e2e8f0; color: #0f172a; }
                .cart-items { flex: 1; overflow-y: auto; padding: 20px 24px; }
                .cart-item-card {
                    display: flex; gap: 14px; padding: 14px; margin-bottom: 12px; background: white; border-radius: 16px;
                    border: 1px solid #f1f5f9; box-shadow: 0 4px 15px rgba(0,0,0,0.03); transition: transform 0.2s;
                }
                .cart-item-card:hover { transform: translateY(-2px); }
                .cart-item-thumb {
                    width: 64px; height: 64px; border-radius: 12px; object-fit: cover; flex-shrink: 0; border: 1px solid #e2e8f0;
                }
                .cart-item-info { flex: 1; min-width: 0; display: flex; flex-direction: column; justify-content: space-between; }
                .cart-item-title {
                    font-size: 0.88rem; font-weight: 700; color: #0f172a; text-decoration: none; line-height: 1.35;
                    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
                }
                .cart-item-title:hover { color: #0284c7; }
                .cart-item-study {
                    font-size: 0.72rem; color: #0284c7; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; font-weight: 600; margin-top: 2px;
                }
                .cart-item-study:hover { text-decoration: underline; }
                .cart-item-row { display: flex; align-items: center; justify-content: space-between; margin-top: 8px; }
                .cart-item-price { font-weight: 800; color: #0284c7; font-size: 0.95rem; }
                .cart-qty-ctrl { display: flex; align-items: center; gap: 6px; background: #f8fafc; padding: 2px 6px; border-radius: 50px; border: 1px solid #e2e8f0; }
                .cart-qty-btn { background: none; border: none; cursor: pointer; font-weight: 800; font-size: 0.85rem; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; color: #475569; }
                .cart-qty-btn:hover { color: #0284c7; }
                .cart-qty-num { font-size: 0.82rem; font-weight: 800; color: #0f172a; min-width: 14px; text-align: center; }
                .cart-remove-btn { background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 0.8rem; padding: 2px 4px; }
                .cart-remove-btn:hover { color: #ef4444; }
                .cart-footer { padding: 20px 24px; border-top: 1px solid #f1f5f9; background: rgba(248, 250, 252, 0.8); }
                .cart-total { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; font-weight: 800; font-size: 1.1rem; color: #0f172a; }
                .cart-empty-state { text-align: center; padding: 60px 20px; color: #64748b; }
                .cart-empty-state i { font-size: 3rem; color: #cbd5e1; margin-bottom: 16px; }
            \`;
            document.head.appendChild(style);
        }
    }

    window.toggleCart = function() {
        ensureUniversalCartDOM();
        const overlay = document.getElementById('cart-overlay');
        const cart = document.getElementById('side-cart');
        if (!cart) return;

        const isActive = cart.classList.contains('active');
        if (isActive) {
            cart.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
        } else {
            window.renderUniversalCart();
            cart.classList.add('active');
            if (overlay) overlay.classList.add('active');
        }
    };

    window.closeAllPanels = function() {
        const overlay = document.getElementById('cart-overlay');
        const cart = document.getElementById('side-cart');
        if (cart) cart.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    };

    window.renderUniversalCart = function() {
        ensureUniversalCartDOM();
        const container = document.getElementById('cart-items-container');
        const totalEl = document.getElementById('cart-total-price');
        if (!container) return;

        let cart = [];
        try {
            cart = JSON.parse(localStorage.getItem('cudi_cart') || '[]');
        } catch (e) {
            cart = [];
        }

        // Auto-saneado y sincronización con el catálogo maestro (0 imágenes humanas, fotos actuales)
        let changed = false;
        cart.forEach(item => {
            const canonical = getCanonicalProduct(item.name || item.id);
            if (canonical) {
                if (item.img !== canonical.img) {
                    item.img = canonical.img;
                    changed = true;
                }
                if (!item.studyUrl) {
                    item.studyUrl = canonical.studyUrl;
                    changed = true;
                }
                if (!item.url) {
                    item.url = canonical.url;
                    changed = true;
                }
                if (typeof item.price !== 'number' || isNaN(item.price)) {
                    item.price = canonical.price;
                    changed = true;
                }
            } else if (!item.img || item.img.includes('photo-1585846416120') || item.img.includes('photo-1563460716037')) {
                item.img = 'cudi-nutricion-organica-hero.jpg';
                changed = true;
            }
        });
        if (changed) {
            localStorage.setItem('cudi_cart', JSON.stringify(cart));
        }

        if (cart.length === 0) {
            container.innerHTML = \`
                <div class="cart-empty-state">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <h4 style="margin:0 0 8px; color:#0f172a; font-weight:700;">Tu cesta está vacía</h4>
                    <p style="margin:0 0 20px; font-size:0.85rem; color:#64748b;">Explora nuestros 90 productos y servicios certificados.</p>
                    <a href="index.html#store-grid" onclick="window.toggleCart()" class="btn-secondary" style="padding:10px 20px; border-radius:50px; text-decoration:none; display:inline-block; font-size:0.85rem; font-weight:700; background:#f1f5f9; color:#0f172a;">
                        Explorar Catálogo
                    </a>
                </div>
            \`;
            if (totalEl) totalEl.textContent = '0.00 €';
            syncOmnichannelCartBadges();
            return;
        }

        let total = 0;
        container.innerHTML = cart.map((item, idx) => {
            const qty = parseInt(item.qty || item.quantity || 1, 10) || 1;
            const price = parseFloat(item.price) || 0;
            const subtotal = price * qty;
            total += subtotal;

            return \`
                <div class="cart-item-card">
                    <a href="\${item.url || 'index.html#store-grid'}">
                        <img src="\${item.img || 'cudi-collar-hardware-hero.jpg'}" alt="\${item.name}" class="cart-item-thumb" onerror="this.src='cudi-collar-hardware-hero.jpg'">
                    </a>
                    <div class="cart-item-info">
                        <div>
                            <a href="\${item.url || 'index.html#store-grid'}" class="cart-item-title">\${item.name}</a>
                            \${item.studyUrl ? \`<a href="\${item.studyUrl}" class="cart-item-study"><i class="fa-solid fa-microscope"></i> Ver Estudio Clínico</a>\` : ''}
                        </div>
                        <div class="cart-item-row">
                            <span class="cart-item-price">\${subtotal.toFixed(2)} €</span>
                            <div style="display:flex; align-items:center; gap:8px;">
                                <div class="cart-qty-ctrl">
                                    <button class="cart-qty-btn" onclick="window.changeCartQty(\${idx}, -1)">-</button>
                                    <span class="cart-qty-num">\${qty}</span>
                                    <button class="cart-qty-btn" onclick="window.changeCartQty(\${idx}, 1)">+</button>
                                </div>
                                <button class="cart-remove-btn" onclick="window.removeFromCart(\${idx})" title="Eliminar"><i class="fa-solid fa-trash-can"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            \`;
        }).join('');

        if (totalEl) totalEl.textContent = total.toFixed(2) + ' €';
        syncOmnichannelCartBadges();
    };

    window.addToCart = function(name, price, img, qty = 1) {
        let cart = [];
        try {
            cart = JSON.parse(localStorage.getItem('cudi_cart') || '[]');
        } catch (e) {
            cart = [];
        }

        const canonical = getCanonicalProduct(name);
        const finalName = canonical ? canonical.name : (name || 'Producto CUDI');
        const finalPrice = canonical ? canonical.price : (parseFloat(price) || 0);
        const finalImg = canonical ? canonical.img : (img || 'cudi-collar-hardware-hero.jpg');
        const finalStudy = canonical ? canonical.studyUrl : '';
        const finalUrl = canonical ? canonical.url : '';

        const existing = cart.find(i => (i.name && i.name.toLowerCase() === finalName.toLowerCase()));
        if (existing) {
            existing.qty = (parseInt(existing.qty || 1, 10)) + qty;
            existing.img = finalImg;
            existing.price = finalPrice;
            if (finalStudy) existing.studyUrl = finalStudy;
            if (finalUrl) existing.url = finalUrl;
        } else {
            cart.push({
                name: finalName,
                price: finalPrice,
                img: finalImg,
                qty: qty,
                studyUrl: finalStudy,
                url: finalUrl
            });
        }

        localStorage.setItem('cudi_cart', JSON.stringify(cart));
        window.dispatchEvent(new CustomEvent('cudi:cart_updated'));
        syncOmnichannelCartBadges();

        // Mostrar notificación toast o abrir carrito
        if (typeof showToast === 'function') {
            showToast(finalName + ' añadido a la cesta ✓');
        }
        window.toggleCart();
    };

    window.removeFromCart = function(index) {
        let cart = [];
        try {
            cart = JSON.parse(localStorage.getItem('cudi_cart') || '[]');
        } catch (e) {
            cart = [];
        }
        if (cart[index]) {
            cart.splice(index, 1);
            localStorage.setItem('cudi_cart', JSON.stringify(cart));
            window.dispatchEvent(new CustomEvent('cudi:cart_updated'));
            window.renderUniversalCart();
        }
    };

    window.changeCartQty = function(index, delta) {
        let cart = [];
        try {
            cart = JSON.parse(localStorage.getItem('cudi_cart') || '[]');
        } catch (e) {
            cart = [];
        }
        if (cart[index]) {
            let current = parseInt(cart[index].qty || 1, 10);
            current += delta;
            if (current <= 0) {
                cart.splice(index, 1);
            } else {
                cart[index].qty = current;
            }
            localStorage.setItem('cudi_cart', JSON.stringify(cart));
            window.dispatchEvent(new CustomEvent('cudi:cart_updated'));
            window.renderUniversalCart();
        }
    };
`;

// Replace the old cart sync code with the enhanced engine
content = content.replace(
  /\/\/ 2\. Sincronización bidireccional en vivo del carrito[\s\S]*?\/\/ 3\. Inyectar Migas de Pan/,
  `// 2. Sincronización bidireccional en vivo del carrito y Carrito Universal\n${cartEngineCode}\n\n    // 3. Inyectar Migas de Pan`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated BOVEDA-PRIVADA-CUDI-TFM/codigo-fuente-editable/modulos/nucleo-transversal.js');

// Pack to modulos/nucleo-transversal.js
packFile(filePath, 'modulos/nucleo-transversal.js');
