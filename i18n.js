/* Motor de Traducción Corporativo CUDI (i18n NMT Wrapper) */
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
    // Forzado extra para dominios locales y subdominios
    if(window.location.hostname) {
        document.cookie = name + "=" + (value || "") + expires + "; path=/; domain=." + window.location.hostname;
    }
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function changeLanguage(langCode) {
    if(!langCode) return;
    
    if(langCode === 'es') {
        setCookie("googtrans", "", -1);
    } else {
        setCookie("googtrans", "/es/" + langCode, 1);
    }
    
    // Recarga inmediata para aplicar el motor neuronal
    window.location.reload();
}

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'es',
        includedLanguages: 'es,ca,en',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: true // Forzamos que se muestre internamente para que detecte la cookie
    }, 'google_translate_element');
}

document.addEventListener("DOMContentLoaded", () => {
    // Sincronización del selector visual con la cookie real
    const transCookie = getCookie("googtrans");
    let currentLang = 'es';
    if(transCookie) {
        const parts = transCookie.split('/');
        if(parts.length > 2) currentLang = parts[2];
    }
    
    const selectors = document.querySelectorAll('.lang-selector');
    selectors.forEach(select => {
        select.value = currentLang;
        select.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    });

    // Inyectar el contenedor oculto de Google
    if(!document.getElementById('google_translate_element')){
        const hideDiv = document.createElement('div');
        hideDiv.id = 'google_translate_element';
        hideDiv.style.position = 'absolute';
        hideDiv.style.top = '-9999px';
        hideDiv.style.left = '-9999px';
        document.body.appendChild(hideDiv);
    }
    
    // Carga del script oficial
    const gtScript = document.createElement('script');
    gtScript.type = 'text/javascript';
    gtScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(gtScript);
    
    // Limpieza de UI de Google para mantener estética CUDI
    const style = document.createElement('style');
    style.innerHTML = `
        .goog-te-banner-frame.skiptranslate, .goog-te-gadget-icon { display: none !important; }
        body { top: 0px !important; }
        .goog-tooltip { display: none !important; }
        .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; border: none !important; }
        #google_translate_element { display: none !important; }
        .goog-te-gadget { color: transparent !important; font-size: 0 !important; }
    `;
    document.head.appendChild(style);
});

