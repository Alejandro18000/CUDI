/**
 * ============================================================================
 * MÓDULO TRANSVERSAL 4: NÚCLEO TRANSVERSAL DE COMPONENTES (modulos/nucleo-transversal.js)
 * Centraliza los elementos transversales entre las 49 páginas y la Demo App
 * para poder intervenir en el futuro desde 1 solo archivo sin dañar nada:
 *  1. Sincronización en vivo del Carrito (Web <-> Demo App) y Perfil ('dee')
 *  2. Migas de Pan (Breadcrumbs) automáticas en fichas de producto y blog
 *  3. Sección de Productos Relacionados en las 14 fichas producto-*.html
 *  4. Barra de progreso de lectura + Estudios Relacionados en artículos clínicos
 *  5. Botón flotante "Volver Arriba" (Back to Top) y cierre accesible con Escape
 *  6. Optimización automática de imágenes (loading="lazy" decoding="async")
 * Desarrollo 100% realizado por Sergio Alejandro Ospina Rocha
 * ============================================================================
 */
(function () {
    'use strict';

    function getFileName() {
        const path = window.location.pathname || '';
        return path.split('/').pop() || 'index.html';
    }

    function t(key) {
        if (window.CudiI18n && typeof window.CudiI18n.t === 'function') {
            return window.CudiI18n.t(key);
        }
        return key;
    }

    // 1. Optimización automática de imágenes para mejorar Core Web Vitals (LCP / CLS)
    function optimizeImagesPerformance() {
        const images = Array.from(document.querySelectorAll('img'));
        images.forEach((img, idx) => {
            if (idx === 0 || img.closest('.navbar-island') || img.closest('.hero')) {
                if (!img.hasAttribute('fetchpriority')) img.setAttribute('fetchpriority', 'high');
                img.setAttribute('decoding', 'async');
            } else {
                if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
                if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
            }
        });
    }

    // 2. Sincronización bidireccional en vivo del carrito (Web <-> Demo App)
    function syncOmnichannelCartBadges() {
        let cart = [];
        try {
            cart = JSON.parse(localStorage.getItem('cudi_cart') || '[]');
        } catch (e) {}
        const totalItems = cart.reduce((acc, item) => acc + (parseInt(item.qty || item.quantity || 1, 10) || 1), 0);

        const globalBadge = document.getElementById('global-cart-badge');
        if (globalBadge) globalBadge.textContent = String(totalItems);

        const appBadge = document.getElementById('app-cart-badge');
        if (appBadge) appBadge.textContent = String(totalItems);
    }

    // Interceptar cambios en carrito dentro de la Demo App o la Web para refrescar ambos al instante
    function bindBidirectionalCartSync() {
        ['addToCart', 'removeFromCart', 'addToAppCart', 'removeFromAppCart', 'completeOrder'].forEach(fnName => {
            const orig = window[fnName];
            if (typeof orig === 'function' && !orig._cudiShellCartSynced) {
                const wrapped = function () {
                    const res = orig.apply(this, arguments);
                    setTimeout(syncOmnichannelCartBadges, 30);
                    return res;
                };
                wrapped._cudiShellCartSynced = true;
                window[fnName] = wrapped;
            }
        });

        window.addEventListener('cudi:cart_updated', syncOmnichannelCartBadges);
    }

    // 3. Inyectar Migas de Pan (Breadcrumbs) y Productos Relacionados en las 14 fichas producto-*.html
    function enhanceProductPages() {
        const fileName = getFileName();
        if (!fileName.startsWith('producto-') && fileName !== 'smart-collar-cudi-gps.html') return;
        if (!window.CudiCatalog) return;

        const currentProduct = window.CudiCatalog.getProductByUrl(fileName);
        const relatedProducts = window.CudiCatalog.getRelatedProducts(fileName, 3);
        const mainContainer = document.querySelector('main') || document.querySelector('.container');
        if (!mainContainer) return;

        // A. Inyectar barra de Breadcrumbs SEO si no existe
        if (!document.getElementById('cudi-transversal-breadcrumbs') && currentProduct) {
            const bc = document.createElement('nav');
            bc.id = 'cudi-transversal-breadcrumbs';
            bc.setAttribute('aria-label', 'Breadcrumb');
            bc.className = 'cudi-breadcrumbs-bar';
            bc.innerHTML = `
                <div class="container" style="display:flex; align-items:center; flex-wrap:wrap; gap:8px; font-size:0.84rem; color:#64748b; padding-top:10px; padding-bottom:6px;">
                    <a href="index.html" style="color:var(--clr-primary); text-decoration:none; font-weight:700;"><i class="fa-solid fa-house"></i> <span data-i18n="breadcrumb_home">${t('breadcrumb_home')}</span></a>
                    <i class="fa-solid fa-chevron-right" style="font-size:0.68rem; color:#cbd5e1;"></i>
                    <a href="index.html#store-grid" style="color:#475569; text-decoration:none; font-weight:600;" data-i18n="breadcrumb_store">${t('breadcrumb_store')}</a>
                    <i class="fa-solid fa-chevron-right" style="font-size:0.68rem; color:#cbd5e1;"></i>
                    <span style="background:#e0f2fe; color:#0284c7; padding:2px 10px; border-radius:50px; font-size:0.74rem; font-weight:800;">${currentProduct.category}</span>
                    <i class="fa-solid fa-chevron-right" style="font-size:0.68rem; color:#cbd5e1;"></i>
                    <strong style="color:#0f172a; font-weight:800;">${currentProduct.shortTitle}</strong>
                </div>
            `;
            mainContainer.insertBefore(bc, mainContainer.firstChild);
        }

        // B. Inyectar bloque de 3 Productos Complementarios Relacionados antes del footer
        if (!document.getElementById('cudi-related-products-section') && relatedProducts.length > 0) {
            const relSection = document.createElement('section');
            relSection.id = 'cudi-related-products-section';
            relSection.className = 'cudi-related-section';
            relSection.innerHTML = `
                <div class="container" style="padding: 40px 20px 60px; max-width: 1140px; margin: 0 auto;">
                    <div style="text-align:center; margin-bottom:32px;">
                        <span style="display:inline-block; background:#e0f2fe; color:#0077b6; font-weight:800; font-size:0.75rem; padding:5px 14px; border-radius:50px; letter-spacing:0.8px; text-transform:uppercase; margin-bottom:10px;" data-i18n="related_products_badge">${t('related_products_badge')}</span>
                        <h2 style="font-family:'Outfit',sans-serif; font-size:clamp(1.6rem, 3.5vw, 2.2rem); color:#0f172a; margin:0 0 8px;" data-i18n="related_products_title">${t('related_products_title')}</h2>
                        <p style="color:#64748b; font-size:0.95rem; max-width:650px; margin:0 auto;" data-i18n="related_products_sub">${t('related_products_sub')}</p>
                    </div>
                    <div class="cudi-related-grid">
                        ${relatedProducts.map(prod => `
                            <article class="cudi-related-card">
                                <div class="cudi-related-img-wrap">
                                    <img src="${prod.img}" alt="${prod.title}" loading="lazy" decoding="async">
                                    <span class="cudi-related-cat-badge"><i class="fa-solid ${prod.icon}"></i> ${prod.category}</span>
                                </div>
                                <div class="cudi-related-body">
                                    <h3>${prod.title}</h3>
                                    <p>${prod.desc}</p>
                                    <div class="cudi-related-footer">
                                        <span class="cudi-related-price">${prod.priceFormatted}</span>
                                        <div style="display:flex; gap:8px;">
                                            <button type="button" class="cudi-rel-btn-cart" onclick="if(typeof addToCart==='function'){addToCart('${prod.shortTitle.replace(/'/g, "\\'")}', ${prod.price}, '${prod.img}');}" title="Añadir a la cesta">
                                                <i class="fa-solid fa-cart-plus"></i>
                                            </button>
                                            <a href="${prod.url}" class="cudi-rel-btn-link" data-i18n="btn_view_detail">${t('btn_view_detail')} <i class="fa-solid fa-arrow-right"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                </div>
            `;
            const footer = document.querySelector('footer');
            if (footer && footer.parentNode) {
                footer.parentNode.insertBefore(relSection, footer);
            } else {
                document.body.appendChild(relSection);
            }
        }
    }

    // 4. Barra de progreso de lectura + Estudios Clínicos Relacionados en los artículos del Blog / Journal
    function enhanceClinicalArticles() {
        const fileName = getFileName();
        if (!window.CudiCatalog) return;
        const currentArticle = window.CudiCatalog.getArticleByUrl(fileName);
        if (!currentArticle) return;

        // A. Barra de progreso de lectura superior
        if (!document.getElementById('cudi-reading-progress-bar')) {
            const barWrap = document.createElement('div');
            barWrap.id = 'cudi-reading-progress-bar';
            barWrap.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:4px; background:rgba(226,232,240,0.4); z-index:99999; pointer-events:none;';
            barWrap.innerHTML = `<div id="cudi-reading-progress-fill" style="width:0%; height:100%; background:linear-gradient(90deg, #0077b6, #10b981); transition:width 0.1s ease-out;"></div>`;
            document.body.appendChild(barWrap);

            window.addEventListener('scroll', function () {
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
                const fill = document.getElementById('cudi-reading-progress-fill');
                if (fill) fill.style.width = pct + '%';
            }, { passive: true });
        }

        // B. Estudios clínicos relacionados al final del artículo
        const relatedArticles = window.CudiCatalog.getRelatedArticles(fileName, 3);
        if (!document.getElementById('cudi-related-articles-section') && relatedArticles.length > 0) {
            const relSec = document.createElement('section');
            relSec.id = 'cudi-related-articles-section';
            relSec.className = 'cudi-related-section';
            relSec.innerHTML = `
                <div class="container" style="padding: 40px 20px 60px; max-width: 1140px; margin: 0 auto;">
                    <div style="text-align:center; margin-bottom:32px;">
                        <span style="display:inline-block; background:#dcfce7; color:#15803d; font-weight:800; font-size:0.75rem; padding:5px 14px; border-radius:50px; letter-spacing:0.8px; text-transform:uppercase; margin-bottom:10px;" data-i18n="related_articles_badge">${t('related_articles_badge')}</span>
                        <h2 style="font-family:'Outfit',sans-serif; font-size:clamp(1.6rem, 3.5vw, 2.2rem); color:#0f172a; margin:0;" data-i18n="related_articles_title">${t('related_articles_title')}</h2>
                    </div>
                    <div class="cudi-related-grid">
                        ${relatedArticles.map(art => `
                            <article class="cudi-related-card">
                                <div class="cudi-related-img-wrap">
                                    <img src="${art.img}" alt="${art.title}" loading="lazy" decoding="async">
                                    <span class="cudi-related-cat-badge"><i class="fa-solid fa-flask"></i> ${art.badge}</span>
                                </div>
                                <div class="cudi-related-body">
                                    <div style="font-size:0.75rem; color:#64748b; font-weight:700; margin-bottom:6px;"><i class="fa-regular fa-clock"></i> ${art.readTime}</div>
                                    <h3>${art.title}</h3>
                                    <p>${art.desc}</p>
                                    <div class="cudi-related-footer" style="justify-content:flex-end;">
                                        <a href="${art.url}" class="cudi-rel-btn-link" data-i18n="btn_read_study">${t('btn_read_study')} <i class="fa-solid fa-arrow-right"></i></a>
                                    </div>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                </div>
            `;
            const footer = document.querySelector('footer');
            if (footer && footer.parentNode) {
                footer.parentNode.insertBefore(relSec, footer);
            }
        }
    }

    // 5. Botón "Volver Arriba" (Back to Top) y atajo global Escape para cerrar paneles
    function initGlobalErgonomics() {
        // Cierre accesible con tecla Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                if (typeof window.closeAllPanels === 'function') window.closeAllPanels();
                const aiPanel = document.querySelector('.cudi-ai-panel.open');
                if (aiPanel && window.CudiAI && typeof window.CudiAI.toggle === 'function') {
                    window.CudiAI.toggle(false);
                }
            }
        });

        // Botón Volver Arriba en páginas largas (excepto en la Demo App móvil)
        if (!document.body.classList.contains('app-demo-body') && !document.getElementById('cudi-back-to-top')) {
            const btn = document.createElement('button');
            btn.id = 'cudi-back-to-top';
            btn.className = 'cudi-back-to-top-btn';
            btn.setAttribute('aria-label', t('back_to_top'));
            btn.setAttribute('title', t('back_to_top'));
            btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
            btn.onclick = function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
            document.body.appendChild(btn);

            window.addEventListener('scroll', function () {
                if ((window.scrollY || document.documentElement.scrollTop) > 550) {
                    btn.classList.add('visible');
                } else {
                    btn.classList.remove('visible');
                }
            }, { passive: true });
        }
    }

    // 6. Escudo Transversal de Propiedad Intelectual y Anti-Inspección
    function initIpProtectionShield() {
        if (window.__cudiIpShieldActive) return;
        window.__cudiIpShieldActive = true;

        let toastTimer = null;
        function showSecurityNotice(reason) {
            let badge = document.getElementById('cudi-ip-shield-toast');
            if (!badge) {
                badge = document.createElement('div');
                badge.id = 'cudi-ip-shield-toast';
                badge.setAttribute('role', 'status');
                badge.style.cssText = [
                    'position:fixed',
                    'bottom:24px',
                    'left:50%',
                    'transform:translateX(-50%) translateY(20px)',
                    'background:rgba(15,23,42,0.95)',
                    'color:#f8fafc',
                    'border:1px solid rgba(56,189,248,0.45)',
                    'border-radius:999px',
                    'padding:10px 20px',
                    'font-family:Inter,system-ui,sans-serif',
                    'font-size:12.5px',
                    'font-weight:600',
                    'letter-spacing:0.02em',
                    'box-shadow:0 12px 32px rgba(2,6,23,0.45)',
                    'backdrop-filter:blur(10px)',
                    'z-index:2147483647',
                    'pointer-events:none',
                    'opacity:0',
                    'transition:opacity 0.22s ease, transform 0.22s ease',
                    'display:flex',
                    'align-items:center',
                    'gap:8px',
                    'white-space:nowrap'
                ].join(';');
                document.body.appendChild(badge);
            }
            badge.innerHTML = '<span style="color:#38bdf8;font-size:14px;">🛡️</span> <span>© CUDI Portafolio — ' + (reason || 'Propiedad Intelectual Protegida') + '</span>';
            requestAnimationFrame(function () {
                badge.style.opacity = '1';
                badge.style.transform = 'translateX(-50%) translateY(0)';
            });
            clearTimeout(toastTimer);
            toastTimer = setTimeout(function () {
                badge.style.opacity = '0';
                badge.style.transform = 'translateX(-50%) translateY(20px)';
            }, 2200);
        }

        if (!document.getElementById('cudi-ip-shield-styles')) {
            const style = document.createElement('style');
            style.id = 'cudi-ip-shield-styles';
            style.textContent = [
                'img, video, svg, canvas { -webkit-user-drag: none !important; user-select: none !important; -webkit-touch-callout: none !important; }',
                'body { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }',
                'input, textarea, [contenteditable="true"] { -webkit-user-select: text !important; -moz-user-select: text !important; user-select: text !important; }'
            ].join('\n');
            (document.head || document.documentElement).appendChild(style);
        }

        document.querySelectorAll('img, video, svg').forEach(function (el) {
            el.setAttribute('draggable', 'false');
            if (el.tagName === 'VIDEO') {
                el.setAttribute('controlsList', 'nodownload');
                el.disablePictureInPicture = true;
            }
        });

        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            showSecurityNotice('Descarga e inspección deshabilitadas');
            return false;
        }, { capture: true });

        document.addEventListener('dragstart', function (e) {
            const tag = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : '';
            if (tag === 'img' || tag === 'video' || tag === 'svg' || tag === 'a') {
                e.preventDefault();
                return false;
            }
        }, { capture: true });

        document.addEventListener('keydown', function (e) {
            const key = (e.key || '').toUpperCase();
            const ctrlOrCmd = e.ctrlKey || e.metaKey;
            const shift = e.shiftKey;

            if (e.keyCode === 123 || key === 'F12') {
                e.preventDefault();
                e.stopPropagation();
                showSecurityNotice('Inspector de código protegido');
                return false;
            }
            if (ctrlOrCmd && shift && (key === 'I' || key === 'J' || key === 'C' || key === 'K')) {
                e.preventDefault();
                e.stopPropagation();
                showSecurityNotice('Herramientas de desarrollo deshabilitadas');
                return false;
            }
            if (ctrlOrCmd && !shift && (key === 'U' || key === 'S' || key === 'P')) {
                e.preventDefault();
                e.stopPropagation();
                showSecurityNotice('Exportación y código fuente protegidos');
                return false;
            }
        }, { capture: true });

        document.addEventListener('copy', function (e) {
            const active = document.activeElement;
            const tag = active && active.tagName ? active.tagName.toLowerCase() : '';
            if (tag === 'input' || tag === 'textarea' || (active && active.isContentEditable)) {
                return;
            }
            e.preventDefault();
            if (e.clipboardData) {
                e.clipboardData.setData('text/plain', '© CUDI Ecosystem — Proyecto de Portafolio Protegido. Todos los derechos reservados.');
            }
            showSecurityNotice('Copia de contenido deshabilitada');
        }, { capture: true });

        try {
            console.log(
                '%c🛡️ CUDI ECOSYSTEM — PROPIEDAD INTELECTUAL PROTEGIDA',
                'background:#0f172a;color:#38bdf8;font-size:15px;font-weight:800;padding:8px 14px;border-radius:6px;border:1px solid #38bdf8;'
            );
            console.log(
                '%cEste proyecto forma parte de un portafolio profesional de ingeniería y producto. Queda prohibida la reproducción, extracción o distribución no autorizada de su código, arquitectura o activos visuales. Todos los derechos reservados.',
                'color:#94a3b8;font-size:12px;font-family:Inter,sans-serif;'
            );
        } catch (_) {}
    }

    function initTransversalShell() {
        initIpProtectionShield();
        optimizeImagesPerformance();
        syncOmnichannelCartBadges();
        bindBidirectionalCartSync();
        enhanceProductPages();
        enhanceClinicalArticles();
        initGlobalErgonomics();
    }

    window.CudiShell = {
        init: initTransversalShell,
        syncCart: syncOmnichannelCartBadges
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTransversalShell);
    } else {
        initTransversalShell();
    }
})();
