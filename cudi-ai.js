/**
 * CUDI AI — UNIFIED DIGITAL ASSISTANT
 * Core Engine v2.0
 */

const CudiAI = {
    isOpen: false,
    petProfile: null,
    isTyping: false,
    
    init() {
        this.loadProfile();
        this.injectWidget();
        this.addEventListeners();
        console.log('CUDI AI Engine Initialized');
    },

    loadProfile() {
        const stored = localStorage.getItem('cudi_pet_profile');
        if (stored) {
            this.petProfile = JSON.parse(stored);
        } else {
            // Default demo profile
            this.petProfile = {
                name: 'Companion',
                photo: 'logo.jpeg',
                type: 'perro'
            };
        }
    },

    injectWidget() {
        // Remove existing widget if any (cleanup)
        const old = document.querySelector('.cudi-chat-widget, .cudi-ai-container');
        if (old) old.remove();

        const container = document.createElement('div');
        container.className = 'cudi-ai-container';
        container.innerHTML = `
            <div class="cudi-ai-trigger" onclick="CudiAI.toggle()">
                <img src="logo.jpeg" alt="CUDI AI">
                <div class="ai-notif-dot" id="ai-notif"></div>
            </div>
            
            <div class="cudi-ai-panel" id="ai-panel">
                <div class="ai-header">
                    <div class="ai-header-info">
                        <h3 class="ai-header-title"><i class="fa-solid fa-shield-dog"></i> CUDI AI</h3>
                        <div class="ai-header-status">
                            <span class="ai-status-dot"></span>
                            Online | Triage Activo
                        </div>
                    </div>
                    <div class="ai-header-avatar">
                        <img id="ai-avatar" src="${this.petProfile.photo}" alt="Mascota">
                    </div>
                    <button class="ai-close-btn" onclick="CudiAI.toggle()"><i class="fa-solid fa-xmark"></i></button>
                </div>
                
                <div class="ai-body" id="ai-body">
                    <!-- Messages will appear here -->
                </div>

                <div class="ai-suggestions" id="ai-suggestions">
                    <div class="ai-chip" onclick="CudiAI.handleSuggestion('Mi mascota no come')">No come</div>
                    <div class="ai-chip" onclick="CudiAI.handleSuggestion('¿Cómo funciona el collar?')">Smart Collar</div>
                    <div class="ai-chip" onclick="CudiAI.handleSuggestion('Cerca de mi')">Veterinarios</div>
                </div>
                
                <div class="ai-footer">
                    <div class="ai-input-wrap">
                        <input type="text" id="ai-input" class="ai-input" placeholder="Pregúntame sobre ${this.petProfile.name}...">
                    </div>
                    <button class="ai-send-btn" onclick="CudiAI.sendMessage()">
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(container);
        
        // Initial Greeting
        this.addMessage('ia', 'Tu compañero, nuestra tecnología. Bienvenid@ a CUDI. Soy tu asistente de bienestar inteligente. ¿En qué puedo ayudarte hoy?');
    },

    addEventListeners() {
        const input = document.getElementById('ai-input');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }
    },

    toggle() {
        this.isOpen = !this.isOpen;
        const panel = document.getElementById('ai-panel');
        const notif = document.getElementById('ai-notif');
        if (this.isOpen) {
            panel.classList.add('active');
            if (notif) notif.style.display = 'none';
        } else {
            panel.classList.remove('active');
        }
    },

    addMessage(role, text, isRich = false) {
        const body = document.getElementById('ai-body');
        if (!body) return;

        const msg = document.createElement('div');
        msg.className = `ai-msg ${role}`;
        msg.innerHTML = text;
        body.appendChild(msg);
        body.scrollTop = body.scrollHeight;
    },

    showTyping() {
        if (this.isTyping) return;
        this.isTyping = true;
        const body = document.getElementById('ai-body');
        const typing = document.createElement('div');
        typing.className = 'ai-typing';
        typing.id = 'ai-typing-indicator';
        typing.innerHTML = '<div class="ai-dot"></div><div class="ai-dot"></div><div class="ai-dot"></div>';
        body.appendChild(typing);
        body.scrollTop = body.scrollHeight;
    },

    hideTyping() {
        this.isTyping = false;
        const indicator = document.getElementById('ai-typing-indicator');
        if (indicator) indicator.remove();
    },

    async sendMessage() {
        const input = document.getElementById('ai-input');
        const text = input.value.trim();
        if (!text || this.isTyping) return;

        input.value = '';
        this.addMessage('user', text);
        this.showTyping();

        // Simulate AI Thinking
        setTimeout(() => {
            this.hideTyping();
            const response = this.generateResponse(text);
            this.addMessage('ia', response);
        }, 1200 + Math.random() * 1000);
    },

    handleSuggestion(text) {
        const input = document.getElementById('ai-input');
        input.value = text;
        this.sendMessage();
    },

    generateResponse(message) {
        const msg = message.toLowerCase();
        const p = this.petProfile;
        const path = window.location.pathname;

        // EMERGENCY / TRIAGE
        if (msg.includes('sangre') || msg.includes('vomito') || msg.includes('accidente') || msg.includes('urgencia') || msg.includes('fiebre')) {
            return `<div class="ai-urgent">
                <strong style="color:var(--ai-danger);"><i class="fa-solid fa-triangle-exclamation"></i> ALERTA MÉDICA DETECTADA</strong><br>
                <span style="font-size:0.8rem; margin-top:5px; display:block;">Analizando telemetría de <strong>${p.name}</strong>...</span>
            </div>
            He detectado signos compatibles con un cuadro de urgencia. He localizado la <strong>clínica CUDI Partner más cercana a 1.2km</strong>. ¿Deseas que active el protocolo de recepción inmediata?
            <button class="ai-btn-action" onclick="CudiAI.triggerUrgentCart()">Activar Protocolo de Urgencia</button>`;
        }

        // CONTEXTUAL: Marketplace
        if (path.includes('index.html') || path.includes('producto')) {
            if (msg.includes('comprar') || msg.includes('precio') || msg.includes('tienda')) {
                return `En nuestra tienda puedes encontrar todo para el bienestar de <strong>${p.name}</strong>. Desde el Smart Collar hasta nutrición personalizada. ¿Buscas algo específico para un ${p.type}?`;
            }
        }

        // CONTEXTUAL: Smart Collar
        if (msg.includes('collar') || msg.includes('gps') || msg.includes('telemetria')) {
            return `El <strong>CUDI Smart Collar</strong> permite que monitoricemos a ${p.name} 24/7. Envía datos de frecuencia cardíaca y ubicación en tiempo real a este panel.`;
        }

        // PET PROFILE AWARENESS
        if (msg.includes('quien es') || msg.includes('mi mascota') || msg.includes('como esta')) {
            return `Estoy monitorizando a <strong>${p.name}</strong>, tu ${p.type} ${p.breed || ''}. Sus constantes vitales hoy son excelentes. ¿Deseas ver el informe de actividad?`;
        }

        // SEARCH INDEX FALLBACK (Simplified version of script.js logic)
        if (typeof CUDI_SEARCH_INDEX !== 'undefined') {
            const words = msg.split(' ').filter(w => w.length > 3);
            const match = CUDI_SEARCH_INDEX.find(item => 
                words.some(word => item.title.toLowerCase().includes(word) || item.desc.toLowerCase().includes(word))
            );
            if (match) {
                return `He encontrado información relevante en nuestro portal: <strong>${match.title}</strong>. Puedes leer más en <a href="${match.url}" style="color:var(--ai-primary); font-weight:700;">este enlace</a>.`;
            }
        }

        // UNIVERSAL FALLBACK
        return `Entiendo. Como asistente de <strong>${p.name}</strong>, estoy aquí para resolver dudas sobre salud, nutrición o el ecosistema CUDI. ¿Puedes darme más detalles?`;
    },

    triggerUrgentCart() {
        if (typeof addToCart === 'function') {
            addToCart("Fianza Urgencia Red CUDI", 45.00, "");
            this.addMessage('ia', '¡Expediente transferido! Por favor, completa el pago en el carrito para que la clínica confirme la recepción táctica.');
            this.toggle();
            if (typeof toggleCart === 'function') toggleCart();
        } else {
            this.addMessage('ia', 'Servicio de carrito no detectado en esta página, pero el protocolo ha sido registrado en tu historial.');
        }
    }
};

// Auto-init on load
document.addEventListener('DOMContentLoaded', () => CudiAI.init());
