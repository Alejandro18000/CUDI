/**
 * CUDI — Escudo de Protección de Propiedad Intelectual y Anti-Inspección
 * Protege activos visuales, código fuente y documentación frente a copia o descarga no autorizada.
 */
(function () {
    'use strict';
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

    function injectProtectionStyles() {
        if (document.getElementById('cudi-ip-shield-styles')) return;
        const style = document.createElement('style');
        style.id = 'cudi-ip-shield-styles';
        style.textContent = [
            'img, video, svg, canvas { -webkit-user-drag: none !important; user-select: none !important; -webkit-touch-callout: none !important; }',
            'body { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }',
            'input, textarea, [contenteditable="true"] { -webkit-user-select: text !important; -moz-user-select: text !important; user-select: text !important; }'
        ].join('\n');
        (document.head || document.documentElement).appendChild(style);
    }

    function lockMediaAssets() {
        document.querySelectorAll('img, video, svg').forEach(function (el) {
            el.setAttribute('draggable', 'false');
            if (el.tagName === 'VIDEO') {
                el.setAttribute('controlsList', 'nodownload');
                el.disablePictureInPicture = true;
            }
        });
    }

    // 1. Bloqueo de clic derecho (contextmenu)
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        showSecurityNotice('Descarga e inspección deshabilitadas');
        return false;
    }, { capture: true });

    // 2. Bloqueo de arrastre de imágenes y diagramas
    document.addEventListener('dragstart', function (e) {
        const tag = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : '';
        if (tag === 'img' || tag === 'video' || tag === 'svg' || tag === 'a') {
            e.preventDefault();
            return false;
        }
    }, { capture: true });

    // 3. Bloqueo de atajos de inspección y descarga de código fuente
    document.addEventListener('keydown', function (e) {
        const key = (e.key || '').toUpperCase();
        const ctrlOrCmd = e.ctrlKey || e.metaKey;
        const shift = e.shiftKey;

        // F12
        if (e.keyCode === 123 || key === 'F12') {
            e.preventDefault();
            e.stopPropagation();
            showSecurityNotice('Inspector de código protegido');
            return false;
        }

        // Ctrl+Shift+I / J / C / K (DevTools)
        if (ctrlOrCmd && shift && (key === 'I' || key === 'J' || key === 'C' || key === 'K')) {
            e.preventDefault();
            e.stopPropagation();
            showSecurityNotice('Herramientas de desarrollo deshabilitadas');
            return false;
        }

        // Ctrl+U (Ver código fuente), Ctrl+S (Guardar página), Ctrl+P (Imprimir/Exportar PDF)
        if (ctrlOrCmd && !shift && (key === 'U' || key === 'S' || key === 'P')) {
            e.preventDefault();
            e.stopPropagation();
            showSecurityNotice('Exportación y código fuente protegidos');
            return false;
        }
    }, { capture: true });

    // 4. Bloqueo de copia masiva fuera de inputs
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

    // 5. Aviso legal en consola
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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            injectProtectionStyles();
            lockMediaAssets();
        });
    } else {
        injectProtectionStyles();
        lockMediaAssets();
    }
})();
