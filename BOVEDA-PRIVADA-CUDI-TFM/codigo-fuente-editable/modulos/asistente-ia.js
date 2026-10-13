/**
 * ==========================================================================
 * CUDI AI — UNIFIED DIGITAL ASSISTANT & BIO-NEURAL VETERINARY BRAIN v5.0
 * Plataforma Integral de Bienestar Animal & Telemetría IoT en Tiempo Real
 * Diseñado y Desarrollado por Sergio Alejandro Ospina Rocha
 * ==========================================================================
 */

const CudiAI = {
    isOpen: false,
    petProfile: null,
    isTyping: false,
    history: [],
    chatMemory: [],
    llmEngine: null,
    llmReady: false,
    initPromise: null,
    ollamaReady: false,
    ollamaModel: 'llama3.2',
    isDownloadingLLM: false,
    selectedModel: localStorage.getItem('cudi_selected_llm_model') || 'Qwen2.5-0.5B-Instruct-q4f16_1-MLC',

    init() {
        this.loadProfile();
        this.injectWidget();
        this.addEventListeners();
        this.restoreHistory();
        this.checkWebGPUStatus();
        this.checkLocalOllama();
        console.log('🐾 CUDI AI Bio-Neural Brain v6.2 (Real WebGPU Local LLM + RAG) Initialized.');
    },

    async checkLocalOllama() {
        try {
            const ctrl = new AbortController();
            const timer = setTimeout(() => ctrl.abort(), 1200);
            const res = await fetch('http://localhost:11434/api/tags', { signal: ctrl.signal });
            clearTimeout(timer);
            if (res.ok) {
                const data = await res.json();
                if (data && Array.isArray(data.models) && data.models.length > 0) {
                    this.ollamaReady = true;
                    this.ollamaModel = data.models[0].name;
                    const label = document.getElementById('ai-engine-label');
                    const dot = document.getElementById('ai-engine-dot');
                    if (dot) dot.className = 'ai-engine-dot ready';
                    if (label) label.textContent = `🧠 IA Local Ollama Activa (${this.ollamaModel})`;
                }
            }
        } catch (e) {
            // Ollama no activo localmente, se usa WebGPU en navegador
        }
    },

    checkWebGPUStatus() {
        const dot = document.getElementById('ai-engine-dot');
        const label = document.getElementById('ai-engine-label');
        const btn = document.getElementById('ai-model-load-btn');
        const sel = document.getElementById('ai-model-select');
        if (sel) sel.value = this.selectedModel;

        if (dot) dot.className = 'ai-engine-dot ready';
        if (typeof navigator !== 'undefined' && navigator.gpu) {
            const wasCached = localStorage.getItem('cudi_local_llm_cached') === 'true';
            if (label) {
                label.textContent = wasCached
                    ? '⚡ Motor Clínico & Telemetría Activo (GPU Lista)'
                    : '⚡ Motor Clínico & Telemetría en Tiempo Real Activo';
            }
            if (btn && wasCached) {
                btn.innerHTML = '<i class="fa-solid fa-bolt"></i> <span>Activar GPU</span>';
                btn.classList.add('cached');
            }
        } else {
            if (label) label.textContent = '⚡ Motor Clínico & Telemetría en Tiempo Real Activo';
            if (btn) btn.style.display = 'none';
        }
    },

    onModelChange(modelId) {
        this.selectedModel = modelId;
        try { localStorage.setItem('cudi_selected_llm_model', modelId); } catch(e) {}
        this.llmEngine = null;
        this.llmReady = false;
        this.isDownloadingLLM = false;
        this.initPromise = null;
        this.initLocalLLM(modelId);
    },

    async initLocalLLM(modelId) {
        const targetModel = modelId || this.selectedModel || 'Qwen2.5-0.5B-Instruct-q4f16_1-MLC';
        if (this.llmReady && this.llmEngine && this.selectedModel === targetModel) {
            return this.llmEngine;
        }
        if (this.isDownloadingLLM && this.initPromise) {
            return this.initPromise;
        }

        const dot = document.getElementById('ai-engine-dot');
        const label = document.getElementById('ai-engine-label');
        const btn = document.getElementById('ai-model-load-btn');
        const progWrap = document.getElementById('ai-progress-wrap');
        const progFill = document.getElementById('ai-progress-fill');
        const progText = document.getElementById('ai-progress-text');
        const progPct = document.getElementById('ai-progress-pct');

        if (typeof navigator === 'undefined' || !navigator.gpu) {
            if (label) label.textContent = 'Motor RAG Local Activo (Sin WebGPU)';
            return null;
        }

        this.isDownloadingLLM = true;
        if (dot) dot.className = 'ai-engine-dot loading';
        if (label) label.textContent = 'Descargando IA Local en navegador...';
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Cargando...</span>';
        }
        if (progWrap) progWrap.classList.add('visible');

        this.initPromise = (async () => {
            try {
                const webllm = await import('https://esm.run/@mlc-ai/web-llm');
                const appConfig = {
                    ...webllm.prebuiltAppConfig,
                    useIndexedDBCache: true
                };

                this.llmEngine = await webllm.CreateMLCEngine(targetModel, {
                    appConfig,
                    initProgressCallback: (report) => {
                        const pct = Math.min(100, Math.round((report.progress || 0) * 100));
                        if (progFill) progFill.style.width = `${pct}%`;
                        if (progPct) progPct.textContent = `${pct}%`;
                        if (progText) {
                            const cleanMsg = (report.text || 'Sincronizando tensores WebGPU...')
                                .replace(/\[.*?\]/g, '')
                                .trim();
                            progText.textContent = cleanMsg || 'Guardando modelo en caché local...';
                        }
                        if (label) label.textContent = `Cargando IA Local WebGPU (${pct}%)...`;
                        const waitBadge = document.getElementById('ai-waiting-gpu-pct');
                        if (waitBadge) waitBadge.textContent = `${pct}%`;
                    }
                });

                this.llmReady = true;
                this.isDownloadingLLM = false;
                try { localStorage.setItem('cudi_local_llm_cached', 'true'); } catch(e) {}

                if (dot) dot.className = 'ai-engine-dot ready';
                if (label) label.textContent = '🧠 IA Local WebGPU Activa (En Caché)';
                if (progWrap) setTimeout(() => progWrap.classList.remove('visible'), 1200);
                if (btn) {
                    btn.disabled = false;
                    btn.className = 'ai-model-load-btn cached';
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>IA Local Lista</span>';
                }
                console.log(`✅ Modelo Local WebLLM (${targetModel}) cargado en GPU e IndexedDB.`);
                return this.llmEngine;
            } catch (err) {
                console.warn('Aviso al inicializar WebLLM:', err);
                this.isDownloadingLLM = false;
                this.llmReady = false;
                this.initPromise = null;
                if (dot) dot.className = 'ai-engine-dot ready';
                if (label) label.textContent = '⚡ Motor Clínico RAG Local Activo';
                if (progWrap) progWrap.classList.remove('visible');
                if (btn) {
                    btn.disabled = false;
                    btn.className = 'ai-model-load-btn cached';
                    btn.innerHTML = '<i class="fa-solid fa-brain"></i> <span>RAG Local Activo</span>';
                }
                return null;
            }
        })();

        return this.initPromise;
    },

    loadProfile() {
        if (typeof window.cudi_heal_stored_profiles === 'function') {
            window.cudi_heal_stored_profiles();
        }
        const isSessionActive = typeof cudi_is_session_active === 'function' ? cudi_is_session_active() : (localStorage.getItem('cudi_session_active') === 'true');
        try {
            const stored = localStorage.getItem('cudi_pet_profile');
            if (stored && isSessionActive) {
                this.petProfile = JSON.parse(stored);
            } else {
                this.petProfile = null;
            }
        } catch (e) {
            console.warn('Error reading cudi_pet_profile', e);
        }

        if (!this.petProfile || !this.petProfile.name) {
            const candidate = (typeof cudi_get_random_pet_candidate === 'function') ? cudi_get_random_pet_candidate() : null;
            this.petProfile = candidate || {
                name: 'Mimi',
                photo: 'avatar-mascota-perfil-gemelo-digital.png',
                type: 'perro',
                breed: 'Mestizo',
                weight: '8',
                age: 'Adulto Joven',
                energy: 'Moderado',
                food: 'Pienso Seco'
            };
        }

        if (typeof window.cudi_resolve_pet_photo === 'function') {
            this.petProfile.photo = window.cudi_resolve_pet_photo(this.petProfile);
        } else if (!this.petProfile.photo || String(this.petProfile.photo).includes('1513360309081')) {
            this.petProfile.photo = this.petProfile.type === 'gato'
                ? 'gato-explorando-seguro-collar-gps.png'
                : 'avatar-mascota-perfil-gemelo-digital.png';
        }
    },

    injectWidget() {
        const old = document.querySelector('.cudi-ai-container');
        if (old) old.remove();

        const container = document.createElement('div');
        container.className = 'cudi-ai-container';
        container.id = 'cudi-ai-global-widget';
        container.innerHTML = `
            <div class="cudi-ai-trigger" onclick="CudiAI.toggle()" title="Hablar con la IA Local de CUDI">
                <img src="logo.jpeg" alt="CUDI AI" onerror="this.onerror=null;this.src='avatar-mascota-perfil-gemelo-digital.png'">
                <div class="ai-notif-dot" id="ai-notif"></div>
            </div>
            
            <div class="cudi-ai-panel" id="ai-panel">
                <div class="ai-header">
                    <div class="ai-header-left">
                        <div class="ai-header-avatar-slot" title="Mascota Activa: ${this.petProfile.name}">
                            <img id="ai-avatar" src="${this.petProfile.photo || 'avatar-mascota-perfil-gemelo-digital.png'}" alt="${this.petProfile.name}" onerror="this.onerror=null;this.src='avatar-mascota-perfil-gemelo-digital.png'">
                            <span class="ai-avatar-online-dot"></span>
                        </div>
                        <div class="ai-header-info">
                            <h3 class="ai-header-title"><i class="fa-solid fa-brain" style="color:#38bdf8;"></i> CUDI AI Companion</h3>
                            <div class="ai-header-status">
                                <span class="ai-status-tag">Triaje Activo</span>
                                <span class="ai-pet-tag" id="ai-header-pet-name"><i class="fa-solid fa-paw"></i> ${this.petProfile.name}</span>
                            </div>
                        </div>
                    </div>
                    <div class="ai-header-actions">
                        <button class="ai-tool-btn" onclick="CudiAI.clearChat()" title="Reiniciar conversación"><i class="fa-solid fa-rotate-left"></i></button>
                        <button class="ai-close-btn" onclick="CudiAI.toggle()" title="Cerrar"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                </div>

                <!-- Barra de Motor IA Local en Navegador (WebGPU + IndexedDB Cache) -->
                <div class="ai-model-status-bar" id="ai-model-status-bar">
                    <div class="ai-model-row">
                        <div class="ai-engine-indicator">
                            <span class="ai-engine-dot" id="ai-engine-dot"></span>
                            <span id="ai-engine-label">Cerebro CUDI RAG + WebGPU</span>
                        </div>
                        <div class="ai-model-controls">
                            <select id="ai-model-select" class="ai-model-select" onchange="CudiAI.onModelChange(this.value)" title="Seleccionar modelo neuronal local">
                                <option value="Qwen2.5-0.5B-Instruct-q4f16_1-MLC">Qwen 2.5 (0.5B Español Rápido)</option>
                                <option value="Qwen2.5-1.5B-Instruct-q4f16_1-MLC">Qwen 2.5 (1.5B Alta Precisión)</option>
                                <option value="Llama-3.2-1B-Instruct-q4f16_1-MLC">Llama 3.2 (1B Multilingüe)</option>
                                <option value="SmolLM2-360M-Instruct-q4f16_1-MLC">SmolLM2 (360M Ultra-Ligero)</option>
                            </select>
                            <button class="ai-model-load-btn" id="ai-model-load-btn" onclick="CudiAI.initLocalLLM()">
                                <i class="fa-solid fa-download"></i> <span>Activar IA Local</span>
                            </button>
                        </div>
                    </div>
                    <div class="ai-progress-wrap" id="ai-progress-wrap">
                        <div class="ai-progress-track">
                            <div class="ai-progress-fill" id="ai-progress-fill"></div>
                        </div>
                        <div class="ai-progress-detail">
                            <span id="ai-progress-text">Preparando caché IndexedDB del navegador...</span>
                            <span id="ai-progress-pct">0%</span>
                        </div>
                    </div>
                </div>
                
                <div class="ai-body" id="ai-body">
                    <!-- Mensajes inyectados dinámicamente -->
                </div>

                <div class="ai-suggestions" id="ai-suggestions">
                    <div class="ai-chip" onclick="CudiAI.handleSuggestion('¿Cuáles son las métricas y signos vitales de ${this.petProfile.name}?')">📊 Métricas en vivo</div>
                    <div class="ai-chip" onclick="CudiAI.handleSuggestion('¿Cuál es la ubicación de ${this.petProfile.name} ahora mismo?')">📍 Ubicación GPS</div>
                    <div class="ai-chip" onclick="CudiAI.handleSuggestion('¿Cuándo debo vacunar a ${this.petProfile.name} y qué vacunas tiene?')">💉 ¿Cuándo vacunarlo?</div>
                    <div class="ai-chip" onclick="CudiAI.handleSuggestion('¿Cómo funciona el Smart Collar y qué lo diferencia?')">📡 Smart Collar</div>
                    <div class="ai-chip" onclick="CudiAI.handleSuggestion('Mi mascota ha comido chocolate, ¿qué hago?')">🍫 Urgencia Tóxicos</div>
                    <div class="ai-chip" onclick="CudiAI.handleSuggestion('Necesito una consulta veterinaria a domicilio')">🚑 VetHome Urgente</div>
                    <div class="ai-chip" onclick="CudiAI.handleSuggestion('¿Qué alimentación me recomiendas para ${this.petProfile.name}?')">🥣 Dieta & Nutrición</div>
                    <div class="ai-chip" onclick="CudiAI.handleSuggestion('¿Cuál es el modelo financiero del proyecto CUDI?')">📈 Modelo de Negocio</div>
                </div>
                
                <div class="ai-footer">
                    <div class="ai-input-wrap">
                        <input type="text" id="ai-input" class="ai-input" placeholder="Pregunta por sus métricas, ubicación, vacunas o cualquier duda..." autocomplete="off">
                    </div>
                    <button class="ai-send-btn" onclick="CudiAI.sendMessage()" title="Enviar mensaje">
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(container);
    },

    addEventListeners() {
        const input = document.getElementById('ai-input');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        window.addEventListener('cudi:sessionChanged', () => {
            this.loadProfile();
            const avatar = document.getElementById('ai-avatar');
            if (avatar && this.petProfile) {
                avatar.src = this.petProfile.photo || 'avatar-mascota-perfil-gemelo-digital.png';
            }
            const petTag = document.getElementById('ai-header-pet-name');
            if (petTag && this.petProfile) {
                petTag.innerHTML = `<i class="fa-solid fa-paw"></i> ${this.petProfile.name}`;
            }
        });
    },

    restoreHistory() {
        const body = document.getElementById('ai-body');
        if (!body) return;
        body.innerHTML = '';

        try {
            const raw = sessionStorage.getItem('cudi_ai_chat_history');
            if (raw) {
                this.history = JSON.parse(raw);
                this.history.forEach(m => this.renderMessage(m.role, m.text, false));
                return;
            }
        } catch(e) {}

        // Saludo inicial inteligente y personalizado
        const p = this.petProfile;
        const bpmVal = p.bpm || (p.type === 'gato' ? 138 : 74);
        const speciesIcon = p.type === 'gato' ? '🐱' : '🐶';
        const initialGreeting = `
            <div class="ai-source-badge"><i class="fa-solid fa-microchip"></i> IA Neuronal + Gemelo Digital Sincronizado</div><br>
            ¡Hola! 👋 Soy tu <strong>Asistente Veterinario y Guardián Bio-Neural CUDI</strong>.
            <br><br>
            Monitorizo en tiempo real las constantes vitales de <strong>${speciesIcon} ${p.name}</strong> (${p.breed || (p.type === 'gato' ? 'Europeo Común' : 'Mestizo')}, ${p.weight || (p.type === 'gato' ? '4.2' : '8')} kg):
            <div class="ai-info-card">
                ❤️ <strong>Ritmo Cardíaco:</strong> ${bpmVal} bpm (Reposo Óptimo)<br>
                ⚡ <strong>Vitalidad hoy:</strong> 4.2 km &bull; 4,280 pasos completados<br>
                📍 <strong>Ubicación:</strong> Zona Segura &bull; Parc Poblenou<br>
                💉 <strong>Próxima Vacuna:</strong> Polivalente Anual (¡Vence Hoy!)
            </div>
            Pregúntame por sus <strong>métricas</strong>, su <strong>ubicación GPS</strong>, <strong>cuándo debes vacunarlo</strong> o cualquier síntoma clínico.
            <div class="ai-actions-wrap">
                <button class="ai-btn-action primary" onclick="CudiAI.handleSuggestion('¿Cuáles son las métricas de ' + '${p.name}' + '?')">
                    <i class="fa-solid fa-heart-pulse"></i> Ver Métricas
                </button>
                <button class="ai-btn-action secondary" onclick="CudiAI.handleSuggestion('¿Cuándo debo vacunar a ' + '${p.name}' + '?')">
                    <i class="fa-solid fa-syringe"></i> Vacunación
                </button>
            </div>
        `;
        this.addMessage('ia', initialGreeting);
    },

    saveHistory() {
        try {
            sessionStorage.setItem('cudi_ai_chat_history', JSON.stringify(this.history.slice(-15)));
        } catch(e) {}
    },

    clearChat() {
        this.history = [];
        this.chatMemory = [];
        try { sessionStorage.removeItem('cudi_ai_chat_history'); } catch(e) {}
        this.restoreHistory();
    },

    toggle() {
        this.isOpen = !this.isOpen;
        const panel = document.getElementById('ai-panel');
        const notif = document.getElementById('ai-notif');
        if (panel) {
            if (this.isOpen) {
                panel.classList.add('active');
                if (notif) notif.style.display = 'none';
                setTimeout(() => {
                    const inp = document.getElementById('ai-input');
                    if (inp) inp.focus();
                }, 150);
            } else {
                panel.classList.remove('active');
            }
        }
    },

    open() {
        if (!this.isOpen) this.toggle();
    },

    close() {
        if (this.isOpen) this.toggle();
    },

    renderMessage(role, text, animate = true) {
        const body = document.getElementById('ai-body');
        if (!body) return null;

        const msg = document.createElement('div');
        msg.className = `ai-msg ${role}`;
        msg.innerHTML = text;
        if (!animate) msg.style.animation = 'none';
        body.appendChild(msg);
        body.scrollTop = body.scrollHeight;
        return msg;
    },

    addMessage(role, text) {
        this.history.push({ role, text, time: Date.now() });
        const el = this.renderMessage(role, text, true);
        this.saveHistory();
        return el;
    },

    showTyping() {
        if (this.isTyping) return;
        this.isTyping = true;
        const body = document.getElementById('ai-body');
        if (!body) return;
        const typing = document.createElement('div');
        typing.className = 'ai-typing';
        typing.id = 'ai-typing-indicator';
        typing.innerHTML = '<div class="ai-dot"></div><div class="ai-dot"></div><div class="ai-dot"></div><span style="font-size:0.7rem; color:#475569; margin-left:6px; font-weight:700;">CUDI generando respuesta neuronal...</span>';
        body.appendChild(typing);
        body.scrollTop = body.scrollHeight;
    },

    hideTyping() {
        this.isTyping = false;
        const indicator = document.getElementById('ai-typing-indicator');
        if (indicator) indicator.remove();
    },

    handleSuggestion(text) {
        const input = document.getElementById('ai-input');
        if (input) {
            input.value = text;
            this.sendMessage();
        }
    },

    formatMarkdownToHTML(md) {
        if (!md) return '';
        let html = md
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^###\s+(.*)$/gm, '<strong style="display:block; margin-top:6px; color:#0f172a;">$1</strong>')
            .replace(/^##\s+(.*)$/gm, '<strong style="display:block; margin-top:6px; color:#0f172a;">$1</strong>')
            .replace(/^\s*[-•]\s+(.*)$/gm, '&bull; $1<br>')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');
        return html;
    },

    buildSystemPromptWithRAG(rawQuery) {
        this.loadProfile();
        const p = this.petProfile;
        const speciesLabel = p.type === 'gato' ? 'Gato (Felino)' : 'Perro (Canino)';
        const bpmVal = p.bpm || (p.type === 'gato' ? 138 : 74);
        const ragInfo = this.retrieveRAGContext(rawQuery);

        return `Eres CUDI AI Companion, el veterinario clínico oficial de CUDI en Barcelona.
Tienes acceso en tiempo real al perfil y Smart Collar de la mascota del usuario:
- Nombre de la mascota: ${p.name} (${speciesLabel}, Raza: ${p.breed || (p.type === 'gato' ? 'Europeo Común' : 'Mestizo')}, Peso: ${p.weight || (p.type === 'gato' ? '4.2' : '8')} kg, Etapa: ${p.age || 'Adulto Joven'}, Dieta: ${p.food || 'Pienso Seco'}).
- Constantes vitales del Smart Collar: ${bpmVal} bpm (óptimo), 38.5°C, 94% batería.

GUÍA CLÍNICA VETERINARIA OFICIAL DE CUDI:
${ragInfo}

REGLAS: Responde siempre en español de forma empática, precisa y breve (máximo 95 palabras). Usa únicamente los datos de la Guía Clínica anterior y menciona a ${p.name} por su nombre.`;
    },

    buildMessagesWithRAG(rawQuery) {
        this.loadProfile();
        const p = this.petProfile;
        const speciesLabel = p.type === 'gato' ? 'Gato (Felino)' : 'Perro (Canino)';
        const bpmVal = p.bpm || (p.type === 'gato' ? 138 : 74);
        const ragInfo = this.retrieveRAGContext(rawQuery);
        const sysPrompt = this.buildSystemPromptWithRAG(rawQuery);
        const augmentedUserContent = `Contexto de mi mascota ${p.name} (${speciesLabel}, ${p.breed || 'Europeo Común'}, ${p.weight || '4.2'} kg, Collar CUDI: ${bpmVal} bpm) y datos clínicos CUDI:\n${ragInfo}\n\nPregunta: ${rawQuery}\nResponde directamente en español a todas las partes de la pregunta usando los datos clínicos anteriores:`;

        return [
            { role: 'system', content: sysPrompt },
            ...this.chatMemory.slice(-4),
            { role: 'user', content: augmentedUserContent }
        ];
    },

    retrieveRAGContext(rawQuery) {
        const q = (rawQuery || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const chunks = [];

        if (/ronrone|amasa|manta|cola|maull|ladr|comportamiento|estres|ansiedad|miedo|juega|duerme/.test(q)) {
            chunks.push('- Etología y Comportamiento Clínico: En gatos, amasar la manta ("hacer pan") junto con el ronroneo es un reflejo instintivo neonatal de bienestar, seguridad afectiva y liberación de endorfinas/feromonas. Un movimiento suave de cola indica calma; si la punta se agita rápido indica curiosidad o alerta de caza. El Smart Collar CUDI mide la Variabilidad de Frecuencia Cardíaca (VFC) para distinguir ronroneo de placer frente a ronroneo por dolor/estrés.');
        }
        if (/desparasit|vacun|calendario|pipeta|garrapata|pulga|gusano|lombrices|rabia|trivalente|polivalente/.test(q)) {
            chunks.push('- Medicina Preventiva y Desparasitación: La desparasitación interna (comprimido o pasta oral frente a nematodos y cestodos) debe realizarse cada 3 meses (trimestral), y la externa (pipeta o collar antiparasitario frente a pulgas, garrapatas y flebótomos) cada mes. En gatos se vacuna anualmente de Trivalente Felina (Panleucopenia, Calicivirus, Rinotraqueítis) y Leucemia (FeLV); en perros Polivalente y Rabia.');
        }
        if (/vomito|diarrea|estomago|apetito|come poco|digest|heces|sangre|estreñi/.test(q)) {
            chunks.push('- Gastroenterología Veterinaria: Si hay vómitos o diarrea aislados sin fiebre, mantener hidratación y dieta blanda gastrointestinal 24h. Si hay más de 3 vómitos en 12h, sangre en heces, apatía o fiebre (>39.2°C en el Smart Collar), riesgo de deshidratación o cuerpo extraño: solicitar VetHome a domicilio (75€).');
        }
        if (/piel|rasca|pelo|alergia|dermat|oido|oreja|otitis|ojos|legaña|cojea|pata|articulacion/.test(q)) {
            chunks.push('- Dermatología y Traumatología: El prurito o rascado frecuente suele deberse a dermatitis alérgica (ambiental o alimentaria) o ectoparásitos; se recomienda pienso hipoalergénico PureBites Clinic (42.90€) y baño ozonoterapia ZenPet Spa (48€). Si hay cojera aguda o dolor articular, reposo y revisión con VetHome (75€).');
        }
        if (/collar|gps|sensor|bateria|telemetria|ubicacion|perd/.test(q)) {
            chunks.push('- Smart Collar CUDI (89.50€, o gratis con plan anual): Sensores PPG ópticos de frecuencia cardíaca y VFC, temperatura dérmica continua, acelerómetro triaxial, GPS L1+L5 de alta precisión (±1.2m), conectividad 4G LTE-M, zumbador acústico 85dB, luz LED nocturna, resistencia al agua IP68 y batería de 4-5 días (actualmente al 94%).');
        }
        if (/chocolate|uva|pasa|cebolla|ajo|xilitol|toxico|veneno|comio|intoxica|hueso|aguacate|lirio|planta/.test(q)) {
            chunks.push('- Protocolo Toxicología Veterinaria: El chocolate contiene teobromina (tóxico cardíaco y neurológico: >20mg/kg causa vómito y taquicardia, >40mg/kg arritmias graves). Las uvas/pasas causan fallo renal agudo. Cebolla/ajo destruyen glóbulos rojos (anemia hemolítica). En gatos, los lirios causan fallo renal agudo mortal y el paracetamol es letal. NO inducir el vómito sin supervisión veterinaria; solicitar VetHome Urgente (75€).');
        }
        if (/seguro|shield|cobertura|reembolso|poliza|protect/.test(q)) {
            chunks.push('- Seguros CUDI: CUDI Shield Basic (18.00€/mes, reembolso del 80% en urgencias y accidentes, hasta 2.500€/año, responsabilidad civil 150.000€). Global Pet Protect (34.90€/mes, cobertura mundial 100% hospitalización y cirugías hasta 6.000€/año).');
        }
        if (/plan|suscripcion|precio|cuanto cuesta|tarifa|mensual|premium/.test(q)) {
            chunks.push('- Planes de Suscripción CUDI: Plan Básico (Gratis, perfil digital y tienda), Plan CUDI Care+ (9.99€/mes, telemetría básica y descuentos), Plan CUDI Prime Total (30.00€/mes, incluye Smart Collar valorado en 89.50€, Triaje IA 24/7 ilimitado, telemedicina MediPet Express gratis y 20% dto en VetHome).');
        }
        if (/vethome|veterinario|cita|urgencia|domicilio|medipet|consulta|hospital/.test(q)) {
            chunks.push('- Servicios Clínicos CUDI: VetHome a Domicilio (75.00€, veterinario colegiado en casa en menos de 45 min con acceso previo al gemelo digital), MediPet Express Telemedicina 24/7 (45.00€, videollamada inmediata y receta electrónica), Hospital Clínico Dual (ingreso preferente sin esperas).');
        }
        if (/comida|pienso|dieta|nutricion|barf|alergia|peso|vitality|purebites|ecopet/.test(q)) {
            chunks.push('- Nutrición Clínica CUDI: Vitality Mix (32.50€, con Omega-3 EPA/DHA y prebióticos FOS), PureBites Clinic Hipoalergénico (42.90€, proteína hidrolizada para alergias y dermatitis), EcoPet Organic (28.00€, ingredientes 100% ecológicos de proximidad).');
        }
        if (/paseo|paseador|guarderia|cuidador|activepaws|nannypets|spa|peluqueria|zenpet/.test(q)) {
            chunks.push('- Bienestar y Movilidad: ActivePaws (12.00€/paseo de 1h monitorizado por GPS), Urban Pet Walkers (15.00€), NannyPets 24/7 (35.00€/día cuidado en hogar sin jaulas), ZenPet Spa & Grooming (48.00€, baño dermatológico ozonoterapia).');
        }
        if (/finanz|modelo|tfm|negocio|rentabilidad|ebitda|ltv|cac|break|inversion/.test(q)) {
            chunks.push('- Modelo Financiero TFM CUDI 2026: 3 escenarios a 3 años (Conservador: 1.25M€, Base: 2.82M€ con EBITDA 24% y Break-Even en el Mes 14, Optimista: 4.48M€). Unit Economics: CAC 24.50€, LTV 285.00€ (Ratio LTV/CAC 11.6x). Margen bruto hardware 48%, margen servicios SaaS/IA 82%.');
        }

        if (chunks.length === 0) {
            chunks.push('- Ecosistema CUDI: Combina Smart Collar IoT (89.50€), Triaje IA 24/7, VetHome veterinario a domicilio (75€), telemedicina MediPet (45€), seguro CUDI Shield (18€/mes) y nutrición Vitality Mix (32.50€).');
        }
        return chunks.join('\n');
    },

    getContextualActionButtons(rawQuery) {
        const q = (rawQuery || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (/vomito|diarrea|sangre|fiebre|calor|toxico|chocolate|urgencia|vethome|duele|cojea|tose|rasca/.test(q)) {
            return `
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.triggerUrgentVet()">
                        <i class="fa-solid fa-truck-medical"></i> Solicitar VetHome (75€)
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.triggerTriageSimulation()">
                        <i class="fa-solid fa-bolt"></i> Simular Triaje IA
                    </button>
                </div>`;
        }
        if (/collar|gps|ubicacion|perd|donde esta|mapa/.test(q)) {
            return `
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.goToGpsTab()">
                        <i class="fa-solid fa-map-location-dot"></i> Abrir Mapa GPS
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.buyCollar()">
                        <i class="fa-solid fa-cart-plus"></i> Smart Collar (89.50€)
                    </button>
                </div>`;
        }
        if (/comida|dieta|nutricion|pienso|barf|vitality/.test(q)) {
            return `
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.buyNutrition()">
                        <i class="fa-solid fa-bowl-food"></i> Añadir Vitality Mix (32.50€)
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.goToProfileTab()">
                        <i class="fa-solid fa-id-card"></i> Ver Ficha Nutricional
                    </button>
                </div>`;
        }
        if (/seguro|shield|plan|suscripcion|precio/.test(q)) {
            return `
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.buyPremium()">
                        <i class="fa-solid fa-crown"></i> Plan Prime Total (30€)
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.buyShield()">
                        <i class="fa-solid fa-shield-cat"></i> CUDI Shield (18€)
                    </button>
                </div>`;
        }
        return `
            <div class="ai-actions-wrap">
                <button class="ai-btn-action primary" onclick="CudiAI.triggerTriageSimulation()">
                    <i class="fa-solid fa-bolt"></i> Simular Triaje IA
                </button>
                <button class="ai-btn-action secondary" onclick="CudiAI.triggerUrgentVet()">
                    <i class="fa-solid fa-stethoscope"></i> Consultar Veterinario
                </button>
            </div>`;
    },

    async callRealGenerativeLLM(rawQuery) {
        const messages = this.buildMessagesWithRAG(rawQuery);

        // 1. Asegurar que el motor WebGPU Local (@mlc-ai/web-llm) esté cargado si hay GPU disponible
        if (!this.llmReady && typeof navigator !== 'undefined' && navigator.gpu) {
            await this.initLocalLLM(this.selectedModel);
        }

        if (this.llmReady && this.llmEngine) {
            try {
                const reply = await this.llmEngine.chat.completions.create({
                    messages,
                    temperature: 0.2,
                    max_tokens: 180
                });
                const text = reply.choices?.[0]?.message?.content?.trim();
                if (text) {
                    return { text, source: `IA Local WebGPU (${this.selectedModel.split('-Instruct')[0]})` };
                }
            } catch (e) {
                console.warn('Aviso en WebLLM local, pasando a inferencia alternativa:', e);
            }
        }

        // 2. Si hay un servidor Ollama local corriendo en localhost:11434
        if (this.ollamaReady) {
            try {
                const res = await fetch('http://localhost:11434/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        model: this.ollamaModel,
                        messages,
                        stream: false
                    })
                });
                if (res.ok) {
                    const data = await res.json();
                    const text = data?.message?.content?.trim();
                    if (text) {
                        return { text, source: `IA Local Ollama (${this.ollamaModel})` };
                    }
                }
            } catch (e) {
                console.warn('Ollama local no disponible:', e);
            }
        }

        return null;
    },

    async sendMessage() {
        const input = document.getElementById('ai-input');
        if (!input) return;
        const text = input.value.trim();
        if (!text || this.isTyping) return;

        input.value = '';
        this.addMessage('user', text);

        // Respuesta instantánea sin bloquear el hilo principal (<180ms)
        this.showTyping();
        await new Promise((resolve) => setTimeout(resolve, 160));
        const responseHtml = await this.generateResponse(text);
        this.hideTyping();
        this.addMessage('ia', responseHtml);
    },

    async generateResponse(rawQuery) {
        // 1. Priorizar SIEMPRE el motor de precisión clínica y telemetría exacta para métricas, ubicación, vacunas, síntomas, precios y finanzas
        const exactMatch = this.generateResponseSync(rawQuery, true);
        if (exactMatch) {
            this.chatMemory.push({ role: 'user', content: rawQuery }, { role: 'assistant', content: exactMatch });
            return exactMatch;
        }

        // 2. Solo si es una pregunta abierta fuera de catálogo y el motor LLM ya está cargado y listo (sin bloquear)
        if (this.llmReady && this.llmEngine) {
            try {
                const messages = this.buildMessagesWithRAG(rawQuery);
                const reply = await this.llmEngine.chat.completions.create({
                    messages,
                    temperature: 0.2,
                    max_tokens: 180
                });
                const llmText = reply.choices?.[0]?.message?.content?.trim();
                if (llmText) {
                    const modelShort = this.selectedModel.split('-Instruct')[0];
                    this.chatMemory.push({ role: 'user', content: rawQuery }, { role: 'assistant', content: llmText });
                    return `<div class="ai-source-badge"><i class="fa-solid fa-microchip"></i> IA Local WebGPU (${modelShort}) &bull; ${this.petProfile.name}</div><br>${this.formatMarkdownToHTML(llmText)}${this.getContextualActionButtons(rawQuery)}`;
                }
            } catch (e) {
                console.warn('Error en inferencia opcional WebLLM:', e);
            }
        }

        return this.generateResponseSync(rawQuery, false);
    },

    /**
     * =========================================================================
     * MOTOR SEMÁNTICO VETERINARIO & BASE DE CONOCIMIENTO COMPLETA DE CUDI (RAG)
     * =========================================================================
     */
    isDemoContext() {
        const path = (window.location.pathname || '').toLowerCase();
        return typeof switchTab === 'function' || path.includes('simulador-gemelo-digital') || path.includes('simulador-solo-app');
    },

    getLiveTelemetrySnapshot() {
        this.loadProfile();
        const p = this.petProfile || {};
        const isCat = p.type === 'gato';
        const domBpmEl = document.getElementById('val-bpm') || document.getElementById('live-bpm');
        const domBpmNum = domBpmEl ? parseInt(domBpmEl.textContent, 10) : NaN;
        const bpm = !isNaN(domBpmNum) && domBpmNum > 30 ? domBpmNum : (p.bpm || (isCat ? 138 : 74));

        const zoneEl = document.getElementById('gps-zone-text');
        const distEl = document.getElementById('gps-dist-text');
        const speedEl = document.getElementById('gps-pin-speed');
        const zoneTag = document.getElementById('gps-zone-tag');

        return {
            name: p.name || 'Mimi',
            species: isCat ? 'Gato (Felino)' : 'Perro (Canino)',
            breed: p.breed || (isCat ? 'Europeo Común' : 'Mestizo'),
            weight: p.weight || (isCat ? '4.2' : '8'),
            age: p.age || 'Adulto Joven',
            energy: p.energy || 'Moderado',
            food: p.food || 'Pienso Seco',
            bpm,
            bpmRange: isCat ? '120 - 160 bpm' : '60 - 110 bpm',
            respRate: isCat ? '24 rpm' : '18 rpm',
            temp: '38.4 °C',
            hrv: '68 ms (Cortisol basal mínimo • Relajado)',
            sleep: '8.5 horas (6.2h sueño profundo + 2.3h REM • Calidad 94/100)',
            activity: '4.2 km • 4,280 pasos • 340 kcal quemadas (86% meta diaria)',
            healthScore: '98 / 100',
            battery: '94% (4 días restantes • 4G LTE-M activo)',
            locationZone: zoneEl ? zoneEl.textContent.trim() : 'Parc del Poblenou • Jardín Principal (Vila Olímpica, Barcelona)',
            coords: '41.4012° N, 2.2065° E (Precisión GNSS L1+L5 ± 1.2 m)',
            distance: distEl ? distEl.textContent.trim() : '45 metros de casa',
            speed: speedEl ? speedEl.textContent.trim() : '0.8 km/h',
            geofenceStatus: zoneTag ? zoneTag.textContent.trim() : 'En Zona Segura de Casa (Perímetro 150m)',
            vaxMainName: isCat ? 'Trivalente Felina (RCP)' : 'Polivalente Anual (DHPPL)',
            vaxSecondaryName: isCat ? 'Leucemia Felina (FeLV)' : 'Tos de las Perreras (Bordetella)'
        };
    },

    PAGES_KNOWLEDGE_BASE: [{"url": "ansiedad-separacion-cortisol-mascotas.html", "title": "Reducción de Cortisol Sistémico en Trastornos de Ansiedad por Separación Moderada | CUDI Journal", "desc": "El aislamiento prolongado en apartamentos urbanos dispara la curva glucocorticoide, generando desde destrozos hogareños hasta depresión sistémica.", "content": "Reducción de Cortisol Sistémico en Trastornos de Ansiedad por Separación Moderada | CUDI Journal cudi.ai2026@gmail.com 900 123 456 ES CA EN Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro El aislamiento prolongado en apartamentos urbanos dispara la curva glucocorticoide, generando desde destrozos hogareños hasta depresión sistémica. Se ha validado que rutinas de paseo grupales olfativas de solo 45 minutos disminuyen el estrés endócrino durante las siguientes 24 horas. Los paseadores certificados que transmiten señales geográficas actúan no solo como ejercicio motriz, sino como pilar de salud mental. Picogramos de Cortisol Sanguíneo (Efecto Paseadores) Paseadores Urbanos Homologados Implementa inmediatamente las recomendaciones clínicas del estudio en tu hogar multiespecie. Reservar NannyPets 24/7 (15€/h) Garantía y Respaldo por la red CUDI Inicio Lanzamiento Comunidad Simulador"}, {"url": "bienestar-integral-multiespecie.html", "title": "Bienestar y Salud Holística para Mascotas | CUDI Marketplace", "desc": "", "content": "Bienestar y Salud Holística para Mascotas | CUDI Marketplace cudi.ai2026@gmail.com 900 123 456 ES CA EN Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Tienda > Bienestar Peluquería y Spa Animal Explora los mejores servicios certificados por CUDI para tu perro y tu gato. Rango de Precio Económico (0-20€) Estándar (20-50€) Premium (+50€) Proximidad Menos de 5km Menos de 10km En toda la ciudad Disponibilidad Reserva Inmediata Fines de semana Verificado Grooming Master Corte a tijera y tratamientos de ozonoterapia para perros y gatos. 30.00 € Ver Detalles del Producto Verificado ZenPet Spa Ambiente relajado con feromonas para que la higiene sea una experiencia libre de estrés. 50.00 € Ver Detalles del Producto Verificado Bubbles & Paws Servicio rápido de baño y secado con productos 100% biodegradables. 22.00 € Ver Detalles del Producto Inicio Lanzamiento Comunidad Simulador Tienda"}, {"url": "comunidad-cudi.html", "title": "Comunidad CUDI | Red Social de Bienestar", "desc": "", "content": "Comunidad CUDI | Red Social de Bienestar cudi.ai2026@gmail.com 900 123 456 Tú Max Cooper Cleo Bella Rex Mimi Companion (Demo) Golden Retriever • 2 años 124 Seguidores 56 Siguiendo Feed Principal Grupos Mis Eventos ¿Qué aventura vivió tu mascota hoy? Comparte una foto... Cooper Hace 2 horas • Parque del Retiro Seguir + Disfrutando de un paseo matutino. ¡Mis niveles de energía están por las nubes según mi CUDI Smart Collar! 🦴✨ 45 12 Compartir Bella Hace 5 horas • Barcelona Seguir + ¿Quién más está listo para el fin de semana de juegos? La IA dice que soy un 98% compatible con Labradores hoy. ¡A jugar! 🎾 32 8 Compartir Luna Hace 8 horas • Sierra de Guadarrama Seguir + 14 km recorridos hoy en la ruta pet-friendly con el Collar CUDI GPS. Batería al 91% y ritmo cardíaco estable en 74 bpm. ❄️🐺 ¿Quién se apunta al próximo encuentro? 68 19 Compartir Recomendación IA del día ¡Match detectado! Luna"}, {"url": "contratar-plan-premium-cudi.html", "title": "CUDI | Pago Transaccional Seguro", "desc": "", "content": "CUDI | Pago Transaccional Seguro cudi.ai2026@gmail.com 900 123 456 ES CA EN Resumen de tu pedido 0.00 € 1 2 3 Datos Logísticos de Envío Nombre Completo Dirección de Entrega Método de Pago Seguro Tarjeta PayPal Bizum Apple Pay Total Final: 0.00 € Confirmar y Pagar Ahora ¡Pago Confirmado! SEGUIMIENTO ACTIVO Estado Actual Validando Transacción ETA Estimado 24-48h Pedido Preparado En Camino Entrega Tu pedido CUDI está siendo procesado con prioridad premium. Finalizar y Volver CUDI es el primer ecosistema integral de salud y bienestar animal impulsado por IA. Monitorizamos, protegemos y conectamos todo el universo de tu compañero hoy para un mañana más sano. Comunidad CUDI Inicio Tienda Marketplace Planes de Protección Portal Educativo Partners Información Legal Términos y Condiciones Política de Cookies Política de Privacidad Devoluciones y Cambios Información Legal Conecta con nosotros Reci"}, {"url": "cudi-redes-sociales-bot.html", "title": "CUDI - Conexión desde Redes Sociales", "desc": "Bienvenido a CUDI desde nuestras redes sociales. Comienza la revolución en bienestar animal preventivo.", "content": "CUDI - Conexión desde Redes Sociales Selecciona una opción rápida Comprar Smart Collar + App Probar Demo de la App Ir a la página principal Únete al Ecosistema CUDI Registra a tu mascota para activar su gemelo digital Nombre de tu compañero Especie Perro Gato Comenzar conexión Al registrarte, aceptas que CUDI cuide de la felicidad de tu mascota 24/7. Inicio Lanzamiento Comunidad Simulador Tienda Planes Partners cudi.ai2026@gmail.com"}, {"url": "estrategia-seo.html", "title": "Estrategia SEO y Visibilidad Digital | CUDI Ecosystem", "desc": "", "content": "Estrategia SEO y Visibilidad Digital | CUDI Ecosystem cudi.ai2026@gmail.com 900 123 456 1. SEO Local y Geolocalización (B2B) Nuestra red de socios profesionales se beneficia de una estrategia de **Local Business SEO**. Cada clínica, paseador y tienda asociada tiene una página optimizada con microdatos que permite a CUDI derivar tráfico orgánico según la ubicación en tiempo real de la mascota, capturada por el Smart Collar. Integración con Google Maps API Microdatos de Schema.org para negocios locales Optimización por barrios y zonas metropolitanas 2. Portal Educativo: SEO de Larga Cola El portal preventivo de CUDI ataca intenciones de búsqueda informativas mediante artículos técnicos de alta autoridad (E-E-A-T). Respondemos a las dudas de salud antes de que se conviertan en emergencias, posicionándonos como el recurso de referencia para familias multiespecie. Keywords de Mantenimiento: \""}, {"url": "gemelos-digitales-salud-predictiva.html", "title": "El Impacto Clínico de los Gemelos Digitales Biomédicos en la Familia Multiespecie | CUDI Journal", "desc": "Un control clínico tradicional extrae datos 1 hora de cada 8,760 horas que tiene un año. Los Gemelos Digitales (Digital Twins) proponen la recolección 100% ininterrumpida.", "content": "El Impacto Clínico de los Gemelos Digitales Biomédicos en la Familia Multiespecie | CUDI Journal cudi.ai2026@gmail.com 900 123 456 ES CA EN Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Un control clínico tradicional extrae datos 1 hora de cada 8,760 horas que tiene un año. Los Gemelos Digitales (Digital Twins) proponen la recolección 100% ininterrumpida. Recrear algoritmos predictivos del sueño y el metabolismo ha destronado la medicina reactiva. Ahora, antes de que el propietario perciba cojera, el algoritmo notifica a la comunidad un descenso en la longitud de zancada o un aumento de decibelios en llanto al dormir. Esto solidifica la Paz Mental que los padres de mascotas modernos adolecen desesperadamente. Fiabilidad del Perfil Biométrico CUDI Obtén Acceso a la Plataforma Completa Implementa inmediatamente las recomendaciones clínicas del estudio en tu hogar multiespecie. "}, {"url": "geo-telemetria-prevencion-perdida.html", "title": "Impacto de la Telemetría y Geolocalización Canina en la Prevención de Pérdidas Reales | CUDI Journal", "desc": "La pérdida de una mascota genera traumas familiares severos. Documentamos cómo la geolocalización continua ha reducido las pérdidas definitivas en un alarmante porcentaje.", "content": "Impacto de la Telemetría y Geolocalización Canina en la Prevención de Pérdidas Reales | CUDI Journal cudi.ai2026@gmail.com 900 123 456 ES CA EN Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro La pérdida de una mascota genera traumas familiares severos. Documentamos cómo la geolocalización continua ha reducido las pérdidas definitivas en un alarmante porcentaje. Los sistemas tradicionales de microchip solo son efectivos post-captura. Con tecnologías como CUDI, el índice de recuperación pasa del 30% a más del 98% en las primeras horas, previniendo accidentes fatales. El geovallado (Geo-fencing) alertará de inmediato al tutor si la familia multiespecie se ve fracturada espacialmente. Reducción de Mascotas Extraviadas (CUDI vs Sin Collar) Adquiere el Collar Inteligente Implementa inmediatamente las recomendaciones clínicas del estudio en tu hogar multiespecie. Añadir Dispositivo al"}, {"url": "index.html", "title": "CUDI | El Ecosistema Definitivo para el Bienestar Animal de Perros y Gatos", "desc": "", "content": "CUDI | El Ecosistema Definitivo para el Bienestar Animal de Perros y Gatos cudi.ai2026@gmail.com 900 123 456 ES CA EN Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Confían en nosotros y hablan de CUDI El Periódico FORBES TechCrunch Revista Veterinaria El Catálogo Omnicanal Todo el ecosistema de bienestar en un solo lugar Dispositivo Hardware Collar Inteligente CUDI Dispositivo de hardware con geolocalización y telemetría de salud. Ver Hardware Software e IA Plan de Suscripción CUDI Acceso a la aplicación para el control de datos y gemelo digital. Ver Planes Protección Seguros para Mascotas CUDI Protección de salud preventiva y cobertura de accidentes para toda la familia. Saber Más Clínica 24/7 Atención Veterinaria Integrada CUDI Sistema de triaje digital conectado a una red de clínicas físicas certificadas para la reserva directa de citas presenciales. Ver Red Médica Activid"}, {"url": "legal.html", "title": "Información Legal | CUDI", "desc": "", "content": "Información Legal | CUDI cudi.ai2026@gmail.com 900 123 456 ES CA EN Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Información Legal Titular: CUDI AI Ecosystem S.L. NIF: B-12345678 Domicilio Social: Paseo de la Castellana 200, 28046 Madrid, España. Inscripción: Registro Mercantil de Madrid, Tomo 1234, Folio 56, Hoja M-7890. Contacto: legal@cudi.ai Inicio Lanzamiento Comunidad Simulador Tienda Planes Partners cudi.ai2026@gmail.com"}, {"url": "mi-mascota.html", "title": "Mi Mascota | CUDI Dashboard Premium", "desc": "Panel de control biométrico avanzado para tu mascota. Visualiza salud, energía y descanso en tiempo real.", "content": "Mi Mascota | CUDI Dashboard Premium PERFIL PREMIUM ELITE CONEXIÓN ACTIVA Cargando... Abrir Versión Móvil Raza / Identidad - Etapa de Vida - Peso Corporal - kg Plan Nutricional - Nivel de Energía - Frecuencia Cardíaca -- BPM NORMAL: 70-110 Desglose de Energía --% Actividad Reposo Ciclos de Descanso -- hrs Profundo REM Balance Biométrico Óptimo Análisis CUDI IA ACTUALIZADO AHORA Analizando el perfil genético y biometría actual para generar recomendaciones... Ubicación GPS y Geocerca Activa En Zona Segura (150m) 📍 Zona Actual: Parc del Poblenou • Jardín Principal (Vila Olímpica, Barcelona) 🌐 Coordenadas GNSS (L1+L5): 41.4012° N, 2.2065° E (Precisión ± 1.2 m) 📏 Distancia al Hogar: 45 metros • Velocidad: 0.8 km/h 🔋 Smart Collar 4G LTE-M: 94% batería • Último ping hace 2 segundos Hacer Sonar Collar (85dB) Abrir Radar Interactivo en App Calendario de Vacunas y Prevención 1 Dosis Pendiente Hoy 💉"}, {"url": "microbioma-nutricion-longevidad-canina.html", "title": "Manipulación del Microbioma a través de Nutrición Orgánica: Impacto en Longevidad | CUDI Journal", "desc": "Los piensos ultraprocesados son los principales causantes de alergias, tumores y fallas renales. La biología celular dicta un retorno estricto a las fuentes orgánicas.", "content": "Manipulación del Microbioma a través de Nutrición Orgánica: Impacto en Longevidad | CUDI Journal cudi.ai2026@gmail.com 900 123 456 ES CA EN Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Los piensos ultraprocesados son los principales causantes de alergias, tumores y fallas renales. La biología celular dicta un retorno estricto a las fuentes orgánicas. La absorción proteica y la restauración del epitelio intestinal están intrínsecamente ligadas a la diversidad del microbioma. La personalización de la dosis exacta según el gasto calórico medido —vía el gemelo digital— impide la obesidad visceral en perros castrados y felinos de interior. Cepa del Microbioma con Pienso Orgánico Alimentación Automatizada Biométrica Implementa inmediatamente las recomendaciones clínicas del estudio en tu hogar multiespecie. Suscríbete al Vitality Mix Orgánico Garantía y Respaldo por la red CUDI In"}, {"url": "modelo_financiero.html", "title": "CUDI — Simulador Financiero Interactivo", "desc": "", "content": "CUDI — Simulador Financiero Interactivo Redirigiendo al Simulador Financiero Interactivo de CUDI... Si no es redirigido automáticamente, haga clic aquí ."}, {"url": "nutricion-personalizada-perros-gatos.html", "title": "Nutrición Animal Premium y Planes de Alimentación | CUDI Marketplace", "desc": "", "content": "Nutrición Animal Premium y Planes de Alimentación | CUDI Marketplace cudi.ai2026@gmail.com 900 123 456 ES CA EN Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Tienda > Nutrición Nutrición Premium Personalizada Explora los mejores servicios certificados por CUDI para tu perro y tu gato. Rango de Precio Económico (0-20€) Estándar (20-50€) Premium (+50€) Proximidad Menos de 5km Menos de 10km En toda la ciudad Disponibilidad Reserva Inmediata Fines de semana Verificado EcoPet Organic Dietas crudas y biológicamente apropiadas para perros y gatos que conviven en el mismo hogar. 45.00 € Ver Detalles del Producto Verificado Vitality Mix Suplementos nutricionales diseñados para fortalecer el sistema inmune dual de ambas especies. 32.50 € Ver Detalles del Producto Verificado PureBites Clinic Piensos especializados prescritos por IA para sensibilidades gástricas específicas. 58.00 € Ver "}, {"url": "paseadores-perros-certificados-barcelona.html", "title": "Paseadores y Cuidadores de Confianza | CUDI Marketplace", "desc": "", "content": "Paseadores y Cuidadores de Confianza | CUDI Marketplace cudi.ai2026@gmail.com 900 123 456 ES CA EN Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Tienda > Paseadores Red de Paseadores y Cuidadores Explora los mejores servicios certificados por CUDI para tu perro y tu gato. Rango de Precio Económico (0-20€) Estándar (20-50€) Premium (+50€) Proximidad Menos de 5km Menos de 10km En toda la ciudad Disponibilidad Reserva Inmediata Fines de semana Verificado Urban Pet Walkers Expertos en caminatas grupales y transporte seguro de gatos en mochilas técnicas. 15.00 € Ver Detalles del Producto Verificado NannyPets 24/7 Cuidado a domicilio para que el perro y el gato permanezcan juntos durante tu ausencia. 15.00 € Ver Detalles del Producto Verificado ActivePaws Entrenamiento físico adaptado a razas de alta energía y juegos moderados para gatos. 12.00 € Ver Detalles del Producto Inicio La"}, {"url": "planes-suscripcion-bienestar-animal.html", "title": "Suscripciones y Planes de Cuidado | CUDI Marketplace", "desc": "", "content": "Suscripciones y Planes de Cuidado | CUDI Marketplace cudi.ai2026@gmail.com 900 123 456 ES CA EN Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro ¿Por qué elegir CUDI? Prevención antes que reacción No esperamos a que tu mascota se sienta mal. Nuestro sistema detecta anomalías en su rutina para que puedas actuar a tiempo. Ahorro inteligente Centralizar sus cuidados, alimentación y salud en una sola plataforma te permite acceder a descuentos exclusivos y evitar gastos médicos de urgencia. Comodidad absoluta Desde agendar un baño hasta consultar a un veterinario de madrugada, todo se resuelve con un solo clic en tu teléfono. Nuestros Planes de Cuidado Sin compromisos de permanencia. Cambia de plan cuando quieras. CUDI Esencial Perfecto para organizar la vida de tu mascota y descubrir nuestra red de confianza. 0€ /mes Expediente digital completo Alertas de vacunación Acceso al catálo"}, {"url": "politica-cookies-plataforma.html", "title": "Política de Cookies | CUDI", "desc": "", "content": "Política de Cookies | CUDI cudi.ai2026@gmail.com 900 123 456 ES CA EN Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Política de Cookies Utilizamos cookies propias y de terceros para mejorar tu experiencia y analizar tus hábitos de navegación. ¿Qué son las cookies? Son pequeños archivos de texto que se almacenan en tu dispositivo para recordar tus preferencias y ofrecerte servicios personalizados. Tipos de cookies Técnicas: Necesarias para el funcionamiento de la cesta y el login. Analíticas: Nos ayudan a entender cómo usas CUDI. Inicio Lanzamiento Comunidad Simulador Tienda Planes Partners cudi.ai2026@gmail.com"}, {"url": "politica-devoluciones-smart-collar.html", "title": "Política de Devoluciones y Cancelaciones | CUDI", "desc": "", "content": "Política de Devoluciones y Cancelaciones | CUDI cudi.ai2026@gmail.com 900 123 456 ES CA EN Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Política de Devoluciones, Cambios y Cancelaciones La política de devoluciones, cambios y cancelaciones del ecosistema CUDI se estructura en tres bloques diferenciados para cubrir la naturaleza híbrida del modelo de negocio, cumpliendo obligatoriamente con la Ley 34/2002 de Servicios de la Sociedad de la Información. 1. Dispositivo Físico (Smart Collar) CUDI adopta una política de garantía de satisfacción de 30 días. Durante este periodo, el cliente puede solicitar la devolución íntegra tanto del importe del hardware como de la suscripción inicial vinculada en caso de insatisfacción o falta de cobertura. El dispositivo debe ser devuelto con todos sus componentes originales. Tras el periodo inicial, el producto queda amparado por la garantía l"}, {"url": "politica-privacidad-datos-mascotas.html", "title": "Política de Privacidad | CUDI", "desc": "", "content": "Política de Privacidad | CUDI cudi.ai2026@gmail.com 900 123 456 ES CA EN Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Política de Privacidad CUDI AI Ecosystem se compromete con la protección de los datos de carácter personal de sus usuarios y sus mascotas. Información que recopilamos Datos de registro (email, nombre) y telemetría de salud de la mascota (pulso, actividad, ubicación en tiempo real). Finalidad Mejorar el cuidado preventivo y ofrecer asesoramiento veterinario personalizado mediante algoritmos de IA. Tus Derechos Puedes acceder, rectificar o suprimir tus datos en cualquier momento enviando un correo a privacidad@cudi.ai. Inicio Lanzamiento Comunidad Simulador Tienda Planes Partners cudi.ai2026@gmail.com"}, {"url": "producto-activepaws.html", "title": "ActivePaws | CUDI Marketplace Premium", "desc": "Información detallada sobre ActivePaws. Entrenamiento físico adaptado a razas de alta energía y juegos moderados para gatos.", "content": "ActivePaws | CUDI Marketplace Premium cudi.ai2026@gmail.com 900 123 456 ES CA EN CUDI Verificado ActivePaws 12.00 € Entrenamiento físico adaptado a razas de alta energía y juegos moderados para gatos. Este producto cuenta con nuestra estricta política de bienestar y conexión automática mediante la Smart App. Tu mascota siempre protegida. Añadir al Carrito de Bienestar Transacción protegida por CUDI Pay Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Inicio Lanzamiento Comunidad Simulador Tienda Planes Partners cudi.ai2026@gmail.com"}, {"url": "producto-bubbles--paws.html", "title": "Bubbles & Paws | CUDI Marketplace Premium", "desc": "Información detallada sobre Bubbles & Paws. Servicio rápido de baño y secado con productos 100% biodegradables.", "content": "Bubbles & Paws | CUDI Marketplace Premium cudi.ai2026@gmail.com 900 123 456 ES CA EN CUDI Verificado Bubbles & Paws 22.00 € Servicio rápido de baño y secado con productos 100% biodegradables. Este producto cuenta con nuestra estricta política de bienestar y conexión automática mediante la Smart App. Tu mascota siempre protegida. Añadir al Carrito de Bienestar Transacción protegida por CUDI Pay Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Inicio Lanzamiento Comunidad Simulador Tienda Planes Partners cudi.ai2026@gmail.com"}, {"url": "producto-cudi-shield-basic.html", "title": "CUDI Shield Basic | CUDI Marketplace Premium", "desc": "Información detallada sobre CUDI Shield Basic. Cobertura esencial de responsabilidad civil para todos los animales de la unidad familiar.", "content": "CUDI Shield Basic | CUDI Marketplace Premium cudi.ai2026@gmail.com 900 123 456 ES CA EN CUDI Verificado CUDI Shield Basic 18.00 € Cobertura esencial de responsabilidad civil para todos los animales de la unidad familiar. Este producto cuenta con nuestra estricta política de bienestar y conexión automática mediante la Smart App. Tu mascota siempre protegida. Añadir al Carrito de Bienestar Transacción protegida por CUDI Pay Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Inicio Lanzamiento Comunidad Simulador Tienda Planes Partners cudi.ai2026@gmail.com"}, {"url": "producto-ecopet-organic.html", "title": "EcoPet Organic | CUDI Marketplace Premium", "desc": "Información detallada sobre EcoPet Organic. Dietas crudas y biológicamente apropiadas para perros y gatos que conviven en el mismo hogar.", "content": "EcoPet Organic | CUDI Marketplace Premium cudi.ai2026@gmail.com 900 123 456 ES CA EN CUDI Verificado EcoPet Organic 45.00 € Dietas crudas y biológicamente apropiadas para perros y gatos que conviven en el mismo hogar. Este producto cuenta con nuestra estricta política de bienestar y conexión automática mediante la Smart App. Tu mascota siempre protegida. Añadir al Carrito de Bienestar Transacción protegida por CUDI Pay Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Inicio Lanzamiento Comunidad Simulador Tienda Planes Partners cudi.ai2026@gmail.com"}, {"url": "producto-global-pet-protect.html", "title": "Global Pet Protect | CUDI Marketplace Premium", "desc": "Información detallada sobre Global Pet Protect. Seguro de salud total con reembolso de gastos quirúrgicos y hospitalarios.", "content": "Global Pet Protect | CUDI Marketplace Premium cudi.ai2026@gmail.com 900 123 456 ES CA EN CUDI Verificado Global Pet Protect 35.00 € Seguro de salud total con reembolso de gastos quirúrgicos y hospitalarios. Este producto cuenta con nuestra estricta política de bienestar y conexión automática mediante la Smart App. Tu mascota siempre protegida. Añadir al Carrito de Bienestar Transacción protegida por CUDI Pay Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Inicio Lanzamiento Comunidad Simulador Tienda Planes Partners cudi.ai2026@gmail.com"}, {"url": "producto-grooming-master.html", "title": "Grooming Master | CUDI Marketplace Premium", "desc": "Información detallada sobre Grooming Master. Corte a tijera y tratamientos de ozonoterapia para perros y gatos.", "content": "Grooming Master | CUDI Marketplace Premium cudi.ai2026@gmail.com 900 123 456 ES CA EN CUDI Verificado Grooming Master 30.00 € Corte a tijera y tratamientos de ozonoterapia para perros y gatos. Este producto cuenta con nuestra estricta política de bienestar y conexión automática mediante la Smart App. Tu mascota siempre protegida. Añadir al Carrito de Bienestar Transacción protegida por CUDI Pay Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Inicio Lanzamiento Comunidad Simulador Tienda Planes Partners cudi.ai2026@gmail.com"}, {"url": "producto-hospital-clinico-dual.html", "title": "Hospital Clínico Dual | CUDI Marketplace Premium", "desc": "Información detallada sobre Hospital Clínico Dual. Especialistas en medicina interna para caninos y felinos con quirófanos de última generación.", "content": "Hospital Clínico Dual | CUDI Marketplace Premium cudi.ai2026@gmail.com 900 123 456 ES CA EN CUDI Verificado Hospital Clínico Dual 60.00 € Especialistas en medicina interna para caninos y felinos con quirófanos de última generación. Este producto cuenta con nuestra estricta política de bienestar y conexión automática mediante la Smart App. Tu mascota siempre protegida. Añadir al Carrito de Bienestar Transacción protegida por CUDI Pay Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Inicio Lanzamiento Comunidad Simulador Tienda Planes Partners cudi.ai2026@gmail.com"}, {"url": "producto-medipet-express.html", "title": "MediPet Express | CUDI Marketplace Premium", "desc": "Información detallada sobre MediPet Express. Red de clínicas de barrio conectadas al historial biométrico de CUDI para urgencias.", "content": "MediPet Express | CUDI Marketplace Premium cudi.ai2026@gmail.com 900 123 456 ES CA EN CUDI Verificado MediPet Express 35.00 € Red de clínicas de barrio conectadas al historial biométrico de CUDI para urgencias. Este producto cuenta con nuestra estricta política de bienestar y conexión automática mediante la Smart App. Tu mascota siempre protegida. Añadir al Carrito de Bienestar Transacción protegida por CUDI Pay Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Inicio Lanzamiento Comunidad Simulador Tienda Planes Partners cudi.ai2026@gmail.com"}, {"url": "producto-nannypets-247.html", "title": "NannyPets 24/7 | CUDI Marketplace Premium", "desc": "Información detallada sobre NannyPets 24/7. Cuidado a domicilio para que el perro y el gato permanezcan juntos durante tu ausencia.", "content": "NannyPets 24/7 | CUDI Marketplace Premium cudi.ai2026@gmail.com 900 123 456 ES CA EN CUDI Verificado NannyPets 24/7 25.00 € Cuidado a domicilio para que el perro y el gato permanezcan juntos durante tu ausencia. Este producto cuenta con nuestra estricta política de bienestar y conexión automática mediante la Smart App. Tu mascota siempre protegida. Añadir al Carrito de Bienestar Transacción protegida por CUDI Pay Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Inicio Lanzamiento Comunidad Simulador Tienda Planes Partners cudi.ai2026@gmail.com"}, {"url": "producto-purebites-clinic.html", "title": "PureBites Clinic | CUDI Marketplace Premium", "desc": "Información detallada sobre PureBites Clinic. Piensos especializados prescritos por IA para sensibilidades gástricas específicas.", "content": "PureBites Clinic | CUDI Marketplace Premium cudi.ai2026@gmail.com 900 123 456 ES CA EN CUDI Verificado PureBites Clinic 58.00 € Piensos especializados prescritos por IA para sensibilidades gástricas específicas. Este producto cuenta con nuestra estricta política de bienestar y conexión automática mediante la Smart App. Tu mascota siempre protegida. Añadir al Carrito de Bienestar Transacción protegida por CUDI Pay Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Inicio Lanzamiento Comunidad Simulador Tienda Planes Partners cudi.ai2026@gmail.com"}, {"url": "producto-safehome-multipet.html", "title": "SafeHome MultiPet | CUDI Marketplace Premium", "desc": "Información detallada sobre SafeHome MultiPet. Protección específica para hogares con más de una especie animal.", "content": "SafeHome MultiPet | CUDI Marketplace Premium cudi.ai2026@gmail.com 900 123 456 ES CA EN CUDI Verificado SafeHome MultiPet 28.00 € Protección específica para hogares con más de una especie animal. Este producto cuenta con nuestra estricta política de bienestar y conexión automática mediante la Smart App. Tu mascota siempre protegida. Añadir al Carrito de Bienestar Transacción protegida por CUDI Pay Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Inicio Lanzamiento Comunidad Simulador Tienda Planes Partners cudi.ai2026@gmail.com"}, {"url": "producto-urban-pet-walkers.html", "title": "Urban Pet Walkers | CUDI Marketplace Premium", "desc": "Información detallada sobre Urban Pet Walkers. Expertos en caminatas grupales y transporte seguro de gatos en mochilas técnicas.", "content": "Urban Pet Walkers | CUDI Marketplace Premium cudi.ai2026@gmail.com 900 123 456 ES CA EN CUDI Verificado Urban Pet Walkers 15.00 € Expertos en caminatas grupales y transporte seguro de gatos en mochilas técnicas. Este producto cuenta con nuestra estricta política de bienestar y conexión automática mediante la Smart App. Tu mascota siempre protegida. Añadir al Carrito de Bienestar Transacción protegida por CUDI Pay Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Inicio Lanzamiento Comunidad Simulador Tienda Planes Partners cudi.ai2026@gmail.com"}, {"url": "producto-vethome-cudi.html", "title": "VetHome CUDI | CUDI Marketplace Premium", "desc": "Información detallada sobre VetHome CUDI. Servicio médico presencial en tu hogar para evitar el estrés del transporte animal.", "content": "VetHome CUDI | CUDI Marketplace Premium cudi.ai2026@gmail.com 900 123 456 ES CA EN CUDI Verificado VetHome CUDI 75.00 € Servicio médico presencial en tu hogar para evitar el estrés del transporte animal. Este producto cuenta con nuestra estricta política de bienestar y conexión automática mediante la Smart App. Tu mascota siempre protegida. Añadir al Carrito de Bienestar Transacción protegida por CUDI Pay Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Inicio Lanzamiento Comunidad Simulador Tienda Planes Partners cudi.ai2026@gmail.com"}, {"url": "producto-vitality-mix.html", "title": "Vitality Mix | CUDI Marketplace Premium", "desc": "Información detallada sobre Vitality Mix. Suplementos nutricionales diseñados para fortalecer el sistema inmune dual de ambas especies.", "content": "Vitality Mix | CUDI Marketplace Premium cudi.ai2026@gmail.com 900 123 456 ES CA EN CUDI Verificado Vitality Mix 32.50 € Suplementos nutricionales diseñados para fortalecer el sistema inmune dual de ambas especies. Este producto cuenta con nuestra estricta política de bienestar y conexión automática mediante la Smart App. Tu mascota siempre protegida. Añadir al Carrito de Bienestar Transacción protegida por CUDI Pay Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Inicio Lanzamiento Comunidad Simulador Tienda Planes Partners cudi.ai2026@gmail.com"}, {"url": "producto-zenpet-spa.html", "title": "ZenPet Spa | CUDI Marketplace Premium", "desc": "Información detallada sobre ZenPet Spa. Ambiente relajado con feromonas para que la higiene sea una experiencia libre de estrés.", "content": "ZenPet Spa | CUDI Marketplace Premium cudi.ai2026@gmail.com 900 123 456 ES CA EN CUDI Verificado ZenPet Spa 50.00 € Ambiente relajado con feromonas para que la higiene sea una experiencia libre de estrés. Este producto cuenta con nuestra estricta política de bienestar y conexión automática mediante la Smart App. Tu mascota siempre protegida. Añadir al Carrito de Bienestar Transacción protegida por CUDI Pay Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Inicio Lanzamiento Comunidad Simulador Tienda Planes Partners cudi.ai2026@gmail.com"}, {"url": "red-socios-clinicas-veterinarias.html", "title": "Partners y Red de Profesionales | CUDI Partners", "desc": "", "content": "Partners y Red de Profesionales | CUDI Partners cudi.ai2026@gmail.com 900 123 456 ES CA EN Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Módulos de Integración por Especialidad Nuestra arquitectura tecnológica se adapta a las necesidades exactas de tu sector, proporcionando herramientas específicas para que escales tu negocio sin esfuerzo administrativo. Para Clínicas Veterinarias Derivación Inteligente de Pacientes Nuestra plataforma no sustituye tu labor, la potencia. El asistente inteligente de CUDI realiza un triaje preventivo monitorizando las constantes vitales de las mascotas de forma remota. Cuando el algoritmo detecta una anomalía real, deriva al paciente directamente a los centros asociados más cercanos, garantizando un flujo constante de consultas justificadas. Para Paseadores y Cuidadores Justifica tu Valor con Tecnología Eleva tu servicio al nivel de un profesion"}, {"url": "seguros-salud-mascotas-barcelona.html", "title": "Seguros para Mascotas y Protección Legal | CUDI Marketplace", "desc": "", "content": "Seguros para Mascotas y Protección Legal | CUDI Marketplace cudi.ai2026@gmail.com 900 123 456 ES CA EN Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Tienda > Seguros Planes de Protección y Seguros Explora los mejores servicios certificados por CUDI para tu perro y tu gato. Rango de Precio Económico (0-20€) Estándar (20-50€) Premium (+50€) Proximidad Menos de 5km Menos de 10km En toda la ciudad Disponibilidad Reserva Inmediata Fines de semana Verificado CUDI Shield Basic Cobertura esencial de responsabilidad civil para todos los animales de la unidad familiar. 18.00 € Ver Detalles del Producto Verificado Global Pet Protect Seguro de salud total con reembolso de gastos quirúrgicos y hospitalarios. 35.00 € Ver Detalles del Producto Verificado SafeHome MultiPet Protección específica para hogares con más de una especie animal. 28.00 € Ver Detalles del Producto Inicio Lanzamiento C"}, {"url": "seguros-veterinarios-mortalidad.html", "title": "Análisis Transaccional: «Eutanasia Económica» y Cobertura Veterinaria en Milennials | CUDI Journal", "desc": "Miles de mascotas son dormidas anualmente porque el tutor no puede hacer frente a intervenciones repentinas de +2,000 euros. Analizamos el blindaje del seguro integral.", "content": "Análisis Transaccional: «Eutanasia Económica» y Cobertura Veterinaria en Milennials | CUDI Journal cudi.ai2026@gmail.com 900 123 456 ES CA EN Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Miles de mascotas son dormidas anualmente porque el tutor no puede hacer frente a intervenciones repentinas de +2,000 euros. Analizamos el blindaje del seguro integral. El seguro veterinario transiciona la economía familiar: en vez de shocks aleatorios y paralizantes frente al diagnóstico de una displasia grave o un accidente oncológico, el modelo predictivo diluye el impacto. El resultado final es una prolongación de la vida digna de la mascota del núcleo familiar. Carga Financiera en Cirugías con Seguro CUDI Escudo CUDI Multipet Implementa inmediatamente las recomendaciones clínicas del estudio en tu hogar multiespecie. Añadir Seguro Global CUDI Garantía y Respaldo por la red CUDI Inicio L"}, {"url": "simulador-financiero.html", "title": "CUDI | Simulador Financiero Interactivo", "desc": "Simulador financiero interactivo del ecosistema CUDI. Proyecta ingresos, costes, caja y runway en tiempo real con diferentes escenarios de crecimiento.", "content": "CUDI | Simulador Financiero Interactivo cudi.ai2026@gmail.com 900 123 456 ES CA EN Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Supuestos del Plan y Variables Operativas Activo: Equilibrio (Caso Base) Personalizar variables Precios del Catálogo Suscripción SaaS 30 € Smart Collar (HW) 89.5 € CUDI Shield Basic 18 € Consulta VetHome 75 € Tracción y Churn Crecimiento Orgánico 8 % Conversión Leads 2 % Churn Mensual 4.8 % Coste por Lead (CPL) 11 € Tasas de Agregación Adhesión Shield 30 % Visitas VetHome 4.5 % Compras Marketplace 20 % Multiplicadores OPEX Masa Salarial 100 % Fijos & Estructura 100 % Aplicar Cambios Reset CSV Mes de Inspección Detallada Dic-26 (Mes 12) Mes 1 (Ene-26) Mes 12 (Dic-26 Break-Even) Mes 36 (Dic-28) Mes 60 (Dic-30) Ingresos Totales 0 € SaaS, Hardware, Seguros y Marketplace COGS (Coste Ventas) 0 € AWS, Stripe, APIs IA y Hardware Margen Bruto 0 % Eficiencia "}, {"url": "simulador-gemelo-digital-telemetria.html", "title": "CUDI | Tu conexión digital con su bienestar", "desc": "Descarga la App CUDI para un control total de la salud de tu mascota. Telemetria en tiempo real, chat veterinario y gestion de expedientes digitales.", "content": "CUDI | Tu conexión digital con su bienestar cudi.ai2026@gmail.com 900 123 456 ES CA EN Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Demo Interactiva 2026 Su latido en tus manos Siente la tranquilidad de estar siempre a su lado. Nuestra tecnología de conexión profunda te permite cuidar de su felicidad y salud en tiempo real, desde cualquier lugar. 10 graficos biomedicos en tiempo real Triaje IA con 5 escenarios simulados Marketplace con checkout de 3 pasos Red social CUDI Paws con mascotas cercanas Calendario de vacunas y citas medicas Volver al inicio CUDI Live Mimi IA 0 Notificaciones Marcar leidas PASO 1 • REGISTRO VITAL Conecta su Gemelo Digital Monitoreo biométrico y telemetría 24/7 Identidad de tu Mascota Configura el perfil biométrico para calibrar el algoritmo bio-neural del Smart Collar. Especie Perro Gato Nombre Peso (kg) Raza Mestizo Etapa de vida Cachorro Adulto J"}, {"url": "simulador-solo-app.html", "title": "CUDI | Simulador Móvil Gemelo Digital", "desc": "", "content": "CUDI | Simulador Móvil Gemelo Digital CUDI Live Mimi IA 0 Notificaciones Marcar leidas PASO 1 • REGISTRO VITAL Conecta su Gemelo Digital Monitoreo biométrico y telemetría 24/7 Identidad de tu Mascota Configura el perfil biométrico para calibrar el algoritmo bio-neural del Smart Collar. Especie Perro Gato Nombre Peso (kg) Raza Mestizo Etapa de vida Cachorro Adulto Joven Adulto Senior Nivel energia Tranquilo Moderado Imparable Tipo de alimentacion Pienso Seco Dieta Natural (BARF) Mixta Conectar Corazones Mimi Mestizo • Adulto Joven Collar Activo • 94% Bat 98% Salud Óptima Guardián CUDI Bio-Neural 24/7 ACTIVO Telemetría continua en reposo. Gemelo digital sin anomalías en las últimas 24h. Smart Collar vinculado • Telemetría estable Simular Triaje Clínico con IA Corazón Óptimo 75 bpm Reposo (±2 bpm) Vitalidad 86% Meta 82 % 4.2 km • 4,280 pasos Descanso Profundo 8.5 h Calidad 94/100 Estrés Mín"}, {"url": "smart-collar-aventuras-sin-sustos.html", "title": "Campaña Aventuras sin Sustos | CUDI", "desc": "Únete al primer mapa colaborativo de rutas pet-friendly en España. Gana suscripciones compartiendo tus aventuras con CUDI.", "content": "Campaña Aventuras sin Sustos | CUDI cudi.ai2026@gmail.com 900 123 456 ES CA EN Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Sigue su rastro en directo. Nuestro Smart Collar registra cada metro recorrido de forma precisa. Mientras tu mascota explora libremente, el simulador de rutas en tu App CUDI evalúa el gasto calórico y te muestra advertencias si se aleja de la Zona Segura que has delimitado. Mapa Colaborativo B2C Descubre rutas subidas por otros usuarios verificados de la comunidad en Barcelona. Radar de Seguridad Local Alertas sonoras y lumínicas (LED) si salen del perímetro que has dibujado con tu dedo. SAT-LINK ACTIVO BAT 82% LAT: 41.3651 °N LON: 2.1583 °E FC (BPM) 115 VELOCIDAD 6.5 km/h DISTANCIA 3.24 km 452 180 m El Gran Mapa Colaborativo Descubre rutas validadas por otros Pet Parents en Barcelona. Comparte tus trayectos, clasifica puntos seguros y gana recompensas "}, {"url": "smart-collar-cudi-gps.html", "title": "Comprar Collar CUDI Smart | Tecnología de Salud Proactiva", "desc": "", "content": "Comprar Collar CUDI Smart | Tecnología de Salud Proactiva cudi.ai2026@gmail.com 900 123 456 ES CA EN Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Tienda > Hardware > Collar Inteligente Base MÁS VENDIDO Collar Inteligente Biométrico CUDI 89.50 € Telemetría 24/7 : Análisis del gasto calórico y patrones de sueño dinámicos. GPS Dual Integrado : Prevención efectiva de extravíos. Precisión < 2 metros. Autonomía Extendida : Batería Li-Po con duración estimada de 21 días. Resistencia Ambiental : Certificación IP68 sumergible para paseos rigurosos. Añadir al Carrito Envío transaccional gratuito a nivel nacional en 48 horas. Capa de Producto BOFU Tecnología para paz mental absoluta. Este dispositivo IoT es la puerta de entrada a la inteligencia proactiva CUDI. Conecta la vida biológica de tu mascota con nuestra IA para garantizar su seguridad 24/7. GPS Ultrarrápido Geolocalización en "}, {"url": "telemedicina-veterinaria-24-7.html", "title": "Clínicas Veterinarias y Hospitales 24h | CUDI Marketplace", "desc": "", "content": "Clínicas Veterinarias y Hospitales 24h | CUDI Marketplace cudi.ai2026@gmail.com 900 123 456 ES CA EN Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Tienda > Salud Red Veterinaria Certificada Explora los mejores servicios certificados por CUDI para tu perro y tu gato. Rango de Precio Económico (0-20€) Estándar (20-50€) Premium (+50€) Proximidad Menos de 5km Menos de 10km En toda la ciudad Disponibilidad Reserva Inmediata Fines de semana Verificado Hospital Clínico Dual Especialistas en medicina interna para caninos y felinos con quirófanos de última generación. 60.00 € Ver Detalles del Producto Verificado MediPet Express Red de clínicas de barrio conectadas al historial biométrico de CUDI para urgencias. 35.00 € Ver Detalles del Producto Verificado VetHome CUDI Servicio médico presencial en tu hogar para evitar el estrés del transporte animal. 75.00 € Ver Detalles del Producto "}, {"url": "terminos-condiciones-app.html", "title": "Términos y Condiciones de Uso | CUDI", "desc": "", "content": "Términos y Condiciones de Uso | CUDI cudi.ai2026@gmail.com 900 123 456 ES CA EN Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro Términos y Condiciones El acceso y uso de la plataforma CUDI implica la aceptación de los siguientes términos: 1. Uso de la Plataforma CUDI ofrece una herramienta de monitorización para el bienestar animal. El usuario se compromete a hacer un uso lícito y adecuado de los dispositivos y la aplicación. 2. Responsabilidad de Salud CUDI es una herramienta preventiva. En ningún caso sustituye el diagnóstico presencial de un veterinario colegiado en situaciones de urgencia clínica. 3. Propiedad Intelectual Todo el contenido, algoritmos y diseño de la plataforma son propiedad exclusiva de CUDI AI Ecosystem. Inicio Lanzamiento Comunidad Simulador Tienda Planes Partners cudi.ai2026@gmail.com"}, {"url": "triaje-ia-esperanza-vida-veterinaria.html", "title": "Eficacia del Triaje mediante Inteligencia Artificial: Reducción de la Mortalidad Aguda | CUDI Journal", "desc": "La ventana de oro en cardiología y traumas veterinarios es de menos de una hora. La capacidad algorítmica de evaluar síntomas cambia las reglas del juego.", "content": "Eficacia del Triaje mediante Inteligencia Artificial: Reducción de la Mortalidad Aguda | CUDI Journal cudi.ai2026@gmail.com 900 123 456 ES CA EN Tu Cesta CUDI Total Estimado: 0.00 € Procesar Pago Seguro La ventana de oro en cardiología y traumas veterinarios es de menos de una hora. La capacidad algorítmica de evaluar síntomas cambia las reglas del juego. Un tutor promedio tarda 4 horas en decidir acudir al veterinario ante los primeros síntomas. El Triaje Asistido con IA, alimentado por telemetría del collar en tiempo real, presiona asertivamente para la intervención médica inmediata, lo que incrementa estadísticamente las tasas de recuperación posquirúrgica. Tasa de Supervivencia en Urgencias (%) Suscripción a Consultas 24/7 Implementa inmediatamente las recomendaciones clínicas del estudio en tu hogar multiespecie. Activar CUDI Premium Care (30€/mes) Garantía y Respaldo por la red CUD"}],

    searchAllPagesKnowledge(rawQuery) {
        const normalize = (str) => (str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[.,/#!$%^&*;:{}=\-_`~()?¿!¡]/g, ' ').replace(/\s+/g, ' ').trim();
        const q = normalize(rawQuery);
        const stopWords = new Set(['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'al', 'a', 'en', 'con', 'por', 'para', 'sobre', 'que', 'es', 'son', 'como', 'cual', 'cuales', 'quiero', 'quiro', 'me', 'mi', 'mis', 'tu', 'tus', 'su', 'sus', 'muestres', 'muestra', 'mostrar', 'ver', 'dime', 'explica', 'explicame', 'saber', 'hay', 'tiene', 'tienen', 'cudi', 'pagina', 'web', 'app', 'mascota', 'perro', 'gato']);
        const tokens = q.split(' ').filter(w => w.length >= 3 && !stopWords.has(w));
        if (tokens.length === 0) return null;

        let bestPage = null;
        let bestScore = 0;

        for (const page of (this.PAGES_KNOWLEDGE_BASE || [])) {
            const titleNorm = normalize(page.title);
            const urlNorm = normalize(page.url.replace('.html', '').replace(/-/g, ' '));
            const descNorm = normalize(page.desc);
            const contentNorm = normalize(page.content);

            let score = 0;
            for (const tk of tokens) {
                const rx = new RegExp('(?:^|\\s)' + tk.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
                if (rx.test(urlNorm)) score += 6;
                if (rx.test(titleNorm)) score += 5;
                if (rx.test(descNorm)) score += 3;
                if (rx.test(contentNorm)) score += 2;
            }
            if (score > bestScore) {
                bestScore = score;
                bestPage = page;
            }
        }

        if (bestPage && bestScore >= 5) {
            return bestPage;
        }
        return null;
    },

    generateResponseSync(rawQuery, strictOnly = false) {
        this.loadProfile();
        const p = this.petProfile;
        const t = this.getLiveTelemetrySnapshot();
        const inDemo = this.isDemoContext();
        
        const normalize = (str) => {
            return (str || '').toLowerCase()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                .replace(/[.,/#!$%^&*;:{}=\-_`~()?¿!¡]/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
        };

        const q = normalize(rawQuery);
        // Word-boundary matcher so "muestres" NEVER matches "estres", "datos"/"productos" NEVER matches "tos", etc.
        const has = (...keywords) => keywords.some(k => {
            const nk = normalize(k);
            if (!nk) return false;
            const escaped = nk.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const rx = new RegExp('(?:^|\\s)' + escaped + '(?:s|es)?(?:\\s|$)', 'i');
            return rx.test(q);
        });

        // ---------------------------------------------------------------------
        // A1. POLÍTICA DE DEVOLUCIONES, CAMBIOS, REEMBOLSOS Y CANCELACIONES
        // ---------------------------------------------------------------------
        if (has('devolucion', 'devoluciones', 'devolver', 'reembolso', 'reembolsos', 'cancelacion', 'cancelaciones', 'cancelar', 'cambio', 'cambios', 'garantia', 'desistimiento', 'dar de baja', 'baja de suscripcion', 'politica de devolucion', 'politicas de devolucion')) {
            return `
                <div class="ai-source-badge"><i class="fa-solid fa-rotate-left"></i> Garantía Oficial &amp; Devoluciones CUDI</div><br>
                <strong>Política Oficial de Devoluciones, Cambios y Cancelaciones (<code>politica-devoluciones-smart-collar.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.62;">
                    📦 <strong>1. Dispositivo Físico (Smart Collar — 30 Días de Garantía):</strong> Dispones de <strong>30 días naturales</strong> desde la entrega para probar el Smart Collar CUDI. Si no estás 100% satisfecho, te reembolsamos el <strong>100% del hardware (89.50 €) y la suscripción inicial</strong> (devolviendo el dispositivo en su empaque original sin daños por mal uso).<br><br>
                    🔄 <strong>2. Suscripciones Recurrentes (Plan CUDI Prime / Shield):</strong> <strong>Sin permanencia</strong>. Puedes cancelar en cualquier momento desde tu panel de usuario con un clic y mantendrás el servicio activo hasta finalizar el periodo ya facturado sin cargos extra.<br><br>
                    🐕 <strong>3. Servicios del Marketplace (Paseadores, Cuidadores, Spa y Clínica):</strong><br>
                    &bull; Cancelación con <strong>más de 72h</strong> de antelación: <strong>Reembolso del 100%</strong>.<br>
                    &bull; Cancelación con <strong>menos de 72h</strong>: <strong>Reembolso del 50%</strong> (reserva de agenda del profesional).<br>
                    &bull; Servicios ya iniciados o en curso: <strong>No reembolsables (0%)</strong>.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="window.location.href='politica-devoluciones-smart-collar.html'">
                        <i class="fa-solid fa-file-shield"></i> Abrir Política de Devoluciones
                    </button>
                    <button class="ai-btn-action secondary" onclick="window.location.href='contratar-plan-premium-cudi.html'">
                        <i class="fa-solid fa-credit-card"></i> Gestionar Suscripción / Pago
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // A2. POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS (RGPD / GDPR)
        // ---------------------------------------------------------------------
        if (has('privacidad', 'politica de privacidad', 'politicas de privacidad', 'proteccion de datos', 'rgpd', 'gdpr', 'datos personales', 'derechos arco', 'confidencialidad', 'mis datos', 'tratamiento de datos')) {
            return `
                <div class="ai-source-badge"><i class="fa-solid fa-user-shield"></i> Privacidad &amp; RGPD Europeo CUDI</div><br>
                <strong>Política de Privacidad y Protección de Datos de Mascotas (<code>politica-privacidad-datos-mascotas.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.62;">
                    🔐 <strong>1. Información que recopilamos:</strong> Datos de registro del tutor y perfil de <strong>${t.name}</strong> (especie, raza, peso, edad) junto con la telemetría bio-neural encriptada del Smart Collar (frecuencia cardíaca ECG, VFC, temperatura dérmica, sueño y coordenadas GPS).<br><br>
                    🧠 <strong>2. Finalidad Clínica y Preventiva:</strong> Prestar triaje predictivo 24/7, alertar de anomalías antes de que sean graves, entrenar modelos de bienestar animal (100% anonimizados) y compartir constantes en tiempo real con el veterinario VetHome en caso de urgencia.<br><br>
                    ⚖️ <strong>3. Tus Derechos (ARCO / RGPD):</strong> Tienes derecho de acceso, rectificación, supresión (derecho al olvido), portabilidad y oposición en cualquier momento escribiendo a <strong><code>privacidad@cudi.ai</code></strong>.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="window.location.href='politica-privacidad-datos-mascotas.html'">
                        <i class="fa-solid fa-lock"></i> Abrir Política de Privacidad
                    </button>
                    <button class="ai-btn-action secondary" onclick="window.location.href='legal.html'">
                        <i class="fa-solid fa-scale-balanced"></i> Ver Aviso Legal
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // A3. POLÍTICA DE COOKIES DE LA PLATAFORMA
        // ---------------------------------------------------------------------
        if (has('cookie', 'cookies', 'politica de cookies', 'politicas de cookies', 'rastreo web')) {
            return `
                <div class="ai-source-badge"><i class="fa-solid fa-cookie-bite"></i> Transparencia Digital &amp; Cookies CUDI</div><br>
                <strong>Política de Cookies de la Plataforma (<code>politica-cookies-plataforma.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.62;">
                    ⚙️ <strong>1. Cookies Técnicas y Funcionales (Esenciales):</strong> Permiten mantener tu sesión iniciada, recordar la ficha sincronizada del Gemelo Digital de <strong>${t.name}</strong> y conservar los productos en <strong>Tu Cesta CUDI</strong>.<br><br>
                    📊 <strong>2. Cookies Analíticas y de Experiencia (GA4 &amp; Clarity):</strong> Utilizamos <strong>Google Analytics 4 (<code>G-ZWK5NC6Z51</code>)</strong> y <strong>Microsoft Clarity (<code>ywsuqovlxx</code>)</strong> de forma agregada para analizar el rendimiento del simulador y mejorar la usabilidad clínica, sin vender jamás datos a terceros.<br><br>
                    🛡️ <strong>3. Gestión de Consentimiento:</strong> Puedes aceptar, configurar o revocar las cookies desde el banner inferior de privacidad o los ajustes de tu navegador.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="window.location.href='politica-cookies-plataforma.html'">
                        <i class="fa-solid fa-cookie"></i> Abrir Política de Cookies
                    </button>
                    <button class="ai-btn-action secondary" onclick="window.location.href='politica-privacidad-datos-mascotas.html'">
                        <i class="fa-solid fa-user-shield"></i> Política de Privacidad
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // A4. TÉRMINOS Y CONDICIONES DE USO E INFORMACIÓN LEGAL
        // ---------------------------------------------------------------------
        if (has('termino', 'terminos', 'condiciones', 'terminos y condiciones', 'aviso legal', 'informacion legal', 'legal', 'nif', 'cif', 'razon social', 'registro mercantil', 'propiedad intelectual', 'castellana', 'normativa')) {
            return `
                <div class="ai-source-badge"><i class="fa-solid fa-scale-balanced"></i> Marco Legal &amp; Términos de Uso CUDI</div><br>
                <strong>Información Legal y Términos y Condiciones Oficiales (<code>legal.html</code> y <code>terminos-condiciones-app.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.62;">
                    🏢 <strong>1. Titularidad Societaria (<code>legal.html</code>):</strong><br>
                    &bull; <strong>Razón Social:</strong> CUDI AI Ecosystem S.L. &bull; <strong>NIF:</strong> B-12345678<br>
                    &bull; <strong>Domicilio Social:</strong> Paseo de la Castellana 200, 28046 Madrid (Sede clínica y operativa en Barcelona).<br>
                    &bull; <strong>Registro Mercantil:</strong> Madrid, Tomo 1234, Folio 56, Hoja M-7890 &bull; <strong>Contacto:</strong> <code>legal@cudi.ai</code><br><br>
                    🩺 <strong>2. Responsabilidad Médica y Uso de la App (<code>terminos-condiciones-app.html</code>):</strong><br>
                    &bull; El Gemelo Digital y CUDI AI ofrecen <strong>triaje preventivo y alertas tempranas</strong> de apoyo, pero no reemplazan el diagnóstico presencial de un veterinario colegiado ante emergencias.<br>
                    &bull; <strong>Propiedad Intelectual:</strong> Todo el software, algoritmos bio-neurales, diseños de hardware y marca registrada están protegidos por CUDI AI Ecosystem S.L.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="window.location.href='terminos-condiciones-app.html'">
                        <i class="fa-solid fa-file-contract"></i> Términos y Condiciones
                    </button>
                    <button class="ai-btn-action secondary" onclick="window.location.href='legal.html'">
                        <i class="fa-solid fa-building-shield"></i> Información Legal
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // A5. ESTRATEGIA SEO, MARKETING DIGITAL, GA4 Y MICROSOFT CLARITY
        // ---------------------------------------------------------------------
        if (has('seo', 'estrategia seo', 'posicionamiento', 'google analytics', 'ga4', 'clarity', 'microsoft clarity', 'palabras clave', 'keywords', 'visibilidad digital', 'marketing digital', 'embudo', 'funnel', 'analitica web')) {
            return `
                <div class="ai-source-badge"><i class="fa-solid fa-magnifying-glass-chart"></i> Estrategia SEO &amp; Analítica Digital CUDI</div><br>
                <strong>Estrategia de Visibilidad Orgánica, SEO y Analítica (<code>estrategia-seo.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.62;">
                    📍 <strong>1. SEO Local y Transaccional (B2B/B2C):</strong> Arquitectura de landing pages optimizadas por intención de búsqueda (<em>"seguros salud mascotas barcelona"</em>, <em>"paseadores perros certificados barcelona"</em>, <em>"telemedicina veterinaria 24/7"</em>, <em>"comprar smart collar gps"</em>).<br><br>
                    📚 <strong>2. SEO de Larga Cola (CUDI Journal):</strong> 6 artículos científicos indexados con datos estructurados <strong>Schema.org</strong> (<code>MedicalWebPage</code>, <code>Product</code>, <code>Organization</code>) para captar tráfico orgánico de alta autoridad clínica.<br><br>
                    📈 <strong>3. Analítica y Conversión en Tiempo Real:</strong> Medición activa con <strong>Google Analytics 4 (ID: <code>G-ZWK5NC6Z51</code>)</strong> y mapas de calor / sesiones en vivo con <strong>Microsoft Clarity (ID: <code>ywsuqovlxx</code>)</strong> en las 45 páginas del ecosistema.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="window.location.href='estrategia-seo.html'">
                        <i class="fa-solid fa-chart-Simple"></i> Abrir Página de Estrategia SEO
                    </button>
                    <button class="ai-btn-action secondary" onclick="window.location.href='simulador-financiero.html'">
                        <i class="fa-solid fa-calculator"></i> Ver CAC y Funnel en Simulador
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // A6. RED DE PARTNERS Y CLÍNICAS VETERINARIAS (B2B)
        // ---------------------------------------------------------------------
        if (has('partner', 'partners', 'socio', 'socios', 'b2b', 'asociarme', 'unirse como clinica', 'red de profesionales', 'red de socios', 'integracion veterinaria', 'afiliados', 'trabajar con cudi', 'clinicas asociadas')) {
            return `
                <div class="ai-source-badge"><i class="fa-solid fa-handshake"></i> Portal Oficial B2B &bull; CUDI Partners</div><br>
                <strong>Red de Socios, Clínicas Veterinarias y Profesionales (<code>red-socios-clinicas-veterinarias.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.62;">
                    🏥 <strong>1. Módulos de Integración por Especialidad:</strong> Conectamos Hospitales Veterinarios 24h, Clínicas de Barrio, Paseadores Certificados, Centros de Hidroterapia/Spa y Marcas de Nutrición Orgánica a la API del Gemelo Digital CUDI.<br><br>
                    ⚡ <strong>2. Derivación Inteligente de Pacientes:</strong> Cuando el Smart Collar detecta una anomalía en <strong>${t.name}</strong>, la clínica asociada recibe el informe Holter/ECG y la ficha médica antes de que llegue el paciente, reduciendo un <strong>40% el tiempo de admisión</strong>.<br><br>
                    💳 <strong>3. Ventajas Financieras B2B:</strong> Liquidación inmediata garantizada mediante <strong>CUDI Pay / CUDI Shield</strong> sin impagos, flujo recurrente de clientes verificados y sello oficial <em>CUDI Verified Partner</em>.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="window.location.href='red-socios-clinicas-veterinarias.html'">
                        <i class="fa-solid fa-handshake"></i> Abrir Portal de Partners B2B
                    </button>
                    <button class="ai-btn-action secondary" onclick="window.location.href='telemedicina-veterinaria-24-7.html'">
                        <i class="fa-solid fa-hospital"></i> Ver Red Veterinaria 24/7
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // A7. PASARELA DE PAGO, CHECKOUT, ENVÍOS Y LOGÍSTICA
        // ---------------------------------------------------------------------
        if (has('envio', 'envios', 'entrega', 'cuanto tarda en llegar', 'metodo de pago', 'metodos de pago', 'formas de pago', 'como pagar', 'pasarela de pago', 'checkout', 'contratar plan', 'logistica', 'facturacion')) {
            return `
                <div class="ai-source-badge"><i class="fa-solid fa-truck-fast"></i> CUDI Pay &amp; Logística Express 24/48h</div><br>
                <strong>Contratación, Métodos de Pago Seguro y Envíos (<code>contratar-plan-premium-cudi.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.62;">
                    🔒 <strong>1. Pasarela Transaccional CUDI Pay:</strong> Pago 100% encriptado (SSL/TLS 256 bits) compatible con tarjetas Visa, Mastercard, American Express, Apple Pay, Google Pay y domiciliación bancaria SEPA.<br><br>
                    🚚 <strong>2. Envío Express 24–48 Horas:</strong> El <strong>Smart Collar CUDI</strong> y los pedidos de nutrición (Vitality Mix, PureBites, EcoPet) se entregan en tu domicilio en <strong>24 a 48h laborables</strong> con envío gratuito en el Plan Prime.<br><br>
                    ⚡ <strong>3. Activación Digital Instantánea:</strong> El acceso al Gemelo Digital, Triaje IA 24/7, Telemedicina MediPet y póliza CUDI Shield queda activo en el mismo segundo de confirmar la transacción.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="window.location.href='contratar-plan-premium-cudi.html'">
                        <i class="fa-solid fa-credit-card"></i> Ir a Pasarela de Pago CUDI
                    </button>
                    <button class="ai-btn-action secondary" onclick="window.location.href='politica-devoluciones-smart-collar.html'">
                        <i class="fa-solid fa-rotate-left"></i> Garantía de 30 Días
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // A8. CAMPAÑA "AVENTURAS SIN SUSTOS" & BOT DE REDES SOCIALES
        // ---------------------------------------------------------------------
        if (has('aventuras sin sustos', 'gran ruta', 'campana', 'mapa colaborativo', 'redes sociales', 'instagram', 'tiktok', 'bot de redes', 'hashtag', 'embajador', 'lanzamiento')) {
            return `
                <div class="ai-source-badge"><i class="fa-solid fa-compass"></i> Campaña Oficial &bull; La Gran Ruta CUDI</div><br>
                <strong>Campaña "Aventuras sin Sustos" y Conexión Social (<code>smart-collar-aventuras-sin-sustos.html</code> &amp; <code>cudi-redes-sociales-bot.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.62;">
                    🗺️ <strong>1. La Gran Ruta CUDI (<code>smart-collar-aventuras-sin-sustos.html</code>):</strong> El Smart Collar registra en directo cada sendero de <strong>${t.name}</strong>, calcula su gasto calórico real y alimenta el <strong>Gran Mapa Colaborativo</strong> con fuentes de agua, zonas verdes seguras y alertas vecinales (procesionaria, espigas o cristales).<br><br>
                    📲 <strong>2. Bot de Redes Sociales y Suscripción Gratis (<code>cudi-redes-sociales-bot.html</code>):</strong> Al compartir tus aventuras etiquetando a CUDI en Instagram o TikTok, nuestro bot valida automáticamente tu publicación y desbloquea recompensas y meses de suscripción <strong>CUDI Prime</strong>.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="window.location.href='smart-collar-aventuras-sin-sustos.html'">
                        <i class="fa-solid fa-route"></i> Ver Campaña Aventuras sin Sustos
                    </button>
                    <button class="ai-btn-action secondary" onclick="window.location.href='cudi-redes-sociales-bot.html'">
                        <i class="fa-solid fa-share-nodes"></i> Abrir Bot de Redes Sociales
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // A9. LOS 6 ESTUDIOS CIENTÍFICOS DEL CUDI JOURNAL (ESPECÍFICOS Y GENERAL)
        // ---------------------------------------------------------------------
        if (has('estudio', 'estudios', 'articulo', 'articulos', 'journal', 'investigacion', 'investigaciones', 'cientifico', 'cientificos', 'evidencia cientifica', 'microbioma', 'eutanasia economica', 'ansiedad por separacion', 'cortisol', 'geo telemetria', 'esperanza de vida', 'salud predictiva')) {
            if (has('microbioma', 'longevidad')) {
                return `
                    <div class="ai-source-badge"><i class="fa-solid fa-microscope"></i> CUDI Journal &bull; Nutrición &amp; Microbioma</div><br>
                    <strong>Estudio Clínico: Manipulación del Microbioma a través de Nutrición Orgánica e Impacto en Longevidad (<code>microbioma-nutricion-longevidad-canina.html</code>):</strong>
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.62;">
                        🧬 <strong>Hallazgo Principal:</strong> La transición a dietas biológicamente apropiadas (EcoPet Organic y Vitality Mix) ajustadas dinámicamente según el gasto calórico medido por el Smart Collar incrementa un <strong>+68% las cepas beneficiosas</strong> (<em>Lactobacillus</em> y <em>Bifidobacterium</em>).<br>
                        📈 <strong>Impacto en Longevidad:</strong> Reduce los marcadores de inflamación intestinal crónica en un 54% y prolonga la esperanza de vida saludable entre <strong>1.8 y 2.4 años</strong>.
                    </div>
                    <div class="ai-actions-wrap">
                        <button class="ai-btn-action primary" onclick="window.location.href='microbioma-nutricion-longevidad-canina.html'">
                            <i class="fa-solid fa-book-medical"></i> Leer Estudio de Microbioma
                        </button>
                        <button class="ai-btn-action secondary" onclick="window.location.href='nutricion-personalizada-perros-gatos.html'">
                            <i class="fa-solid fa-bowl-food"></i> Ver Nutrición CUDI
                        </button>
                    </div>
                `;
            }
            if (has('ansiedad por separacion', 'cortisol')) {
                return `
                    <div class="ai-source-badge"><i class="fa-solid fa-brain"></i> CUDI Journal &bull; Etología Clínica</div><br>
                    <strong>Estudio Clínico: Reducción de Cortisol Sistémico en Ansiedad por Separación (<code>ansiedad-separacion-cortisol-mascotas.html</code>):</strong>
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.62;">
                        📉 <strong>Hallazgo Principal:</strong> Mediante el sensor de Variabilidad de Frecuencia Cardíaca (VFC/HRV) del Smart Collar, CUDI detecta picos de estrés simpático antes del llanto o ladrido compulsivo.<br>
                        🐕 <strong>Resultado Clínico:</strong> Combinar alertas tempranas con paseos de estimulación olfativa (ActivePaws) y sesiones de feromonas (ZenPet Spa) reduce el <strong>cortisol sanguíneo en un 47%</strong> en 3 semanas.
                    </div>
                    <div class="ai-actions-wrap">
                        <button class="ai-btn-action primary" onclick="window.location.href='ansiedad-separacion-cortisol-mascotas.html'">
                            <i class="fa-solid fa-book-medical"></i> Leer Estudio de Cortisol
                        </button>
                        <button class="ai-btn-action secondary" onclick="window.location.href='producto-zenpet-spa.html'">
                            <i class="fa-solid fa-spa"></i> Ver ZenPet Spa (50€)
                        </button>
                    </div>
                `;
            }
            if (has('eutanasia economica', 'mortalidad financier', 'carga financiera')) {
                return `
                    <div class="ai-source-badge"><i class="fa-solid fa-shield-heart"></i> CUDI Journal &bull; Salud Pública Veterinaria</div><br>
                    <strong>Estudio Clínico: "Eutanasia Económica" y Cobertura Veterinaria en Millennials (<code>seguros-veterinarios-mortalidad.html</code>):</strong>
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.62;">
                        🏥 <strong>Problema Analizado:</strong> Miles de mascotas sufren eutanasia económica o abandono de tratamiento cada año cuando el tutor afronta cirugías imprevistas superiores a <strong>2.000 €</strong>.<br>
                        🛡️ <strong>Impacto CUDI Shield:</strong> El modelo de suscripción preventiva con reembolso automático del 80% al 100% elimina la barrera financiera en urgencias y reduce la mortalidad evitable en un <strong>88%</strong>.
                    </div>
                    <div class="ai-actions-wrap">
                        <button class="ai-btn-action primary" onclick="window.location.href='seguros-veterinarios-mortalidad.html'">
                            <i class="fa-solid fa-book-medical"></i> Leer Estudio Completo
                        </button>
                        <button class="ai-btn-action secondary" onclick="window.location.href='seguros-salud-mascotas-barcelona.html'">
                            <i class="fa-solid fa-shield-cat"></i> Ver Seguros CUDI
                        </button>
                    </div>
                `;
            }
            if (has('esperanza de vida', 'mortalidad aguda', 'ventana de oro')) {
                return `
                    <div class="ai-source-badge"><i class="fa-solid fa-bolt"></i> CUDI Journal &bull; Urgencias &amp; Triaje IA</div><br>
                    <strong>Estudio Clínico: Eficacia del Triaje mediante IA en la Reducción de la Mortalidad Aguda (<code>triaje-ia-esperanza-vida-veterinaria.html</code>):</strong>
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.62;">
                        ⏱️ <strong>La Ventana de Oro:</strong> Mientras que un tutor promedio tarda 4 horas en decidir acudir a urgencias, el algoritmo de Triaje IA de CUDI detecta descompensaciones hemodinámicas en <strong>menos de 18 minutos</strong>.<br>
                        ❤️ <strong>Tasa de Supervivencia:</strong> Eleva la supervivencia en urgencias críticas (torsión gástrica, golpe de calor, insuficiencia cardíaca) del 62% al <strong>91%</strong>.
                    </div>
                    <div class="ai-actions-wrap">
                        <button class="ai-btn-action primary" onclick="window.location.href='triaje-ia-esperanza-vida-veterinaria.html'">
                            <i class="fa-solid fa-book-medical"></i> Leer Estudio de Triaje IA
                        </button>
                        <button class="ai-btn-action secondary" onclick="CudiAI.triggerTriageSimulation()">
                            <i class="fa-solid fa-heart-pulse"></i> Probar Simulador Triaje IA
                        </button>
                    </div>
                `;
            }
            if (has('geo telemetria', 'prevencion de perdida', 'extravio')) {
                return `
                    <div class="ai-source-badge"><i class="fa-solid fa-satellite"></i> CUDI Journal &bull; Geo-Telemetría GNSS</div><br>
                    <strong>Estudio Clínico: Impacto de la Telemetría y Geolocalización en la Prevención de Pérdidas Reales (<code>geo-telemetria-prevencion-perdida.html</code>):</strong>
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.62;">
                        📡 <strong>Arquitectura GNSS L1+L5 + LTE-M:</strong> A diferencia de los localizadores Bluetooth que dependen de terceros, el Smart Collar CUDI mantiene conexión celular autónoma con precisión de ±1.2 m.<br>
                        🛡️ <strong>Resultado:</strong> Reduce el extravío definitivo en un <strong>99.4%</strong>, logrando recuperar a la mascota en un tiempo medio inferior a <strong>4 minutos</strong> tras cruzar la geocerca.
                    </div>
                    <div class="ai-actions-wrap">
                        <button class="ai-btn-action primary" onclick="window.location.href='geo-telemetria-prevencion-perdida.html'">
                            <i class="fa-solid fa-book-medical"></i> Leer Estudio de Geo-Telemetría
                        </button>
                        <button class="ai-btn-action secondary" onclick="CudiAI.goToGpsTab()">
                            <i class="fa-solid fa-location-dot"></i> Abrir Radar GPS en Vivo
                        </button>
                    </div>
                `;
            }

            // Resumen completo de los 6 estudios del CUDI Journal
            return `
                <div class="ai-source-badge"><i class="fa-solid fa-graduation-cap"></i> CUDI Journal &bull; 6 Estudios Clínicos Oficiales</div><br>
                <strong>Biblioteca Científica del Ecosistema CUDI (6 Publicaciones Clínicas):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.78rem; line-height:1.58;">
                    1️⃣ <a href="gemelos-digitales-salud-predictiva.html" style="color:#0284c7; font-weight:700;">Gemelos Digitales y Salud Predictiva</a> — Monitorización 8.760h/año con 94.8% de precisión subclínica.<br>
                    2️⃣ <a href="triaje-ia-esperanza-vida-veterinaria.html" style="color:#0284c7; font-weight:700;">Triaje IA y Reducción de Mortalidad Aguda</a> — Respuesta en &lt;18 min y 91% de supervivencia en urgencias.<br>
                    3️⃣ <a href="microbioma-nutricion-longevidad-canina.html" style="color:#0284c7; font-weight:700;">Microbioma y Nutrición Orgánica en Longevidad</a> — +68% flora beneficiosa y +2.4 años de vida saludable.<br>
                    4️⃣ <a href="geo-telemetria-prevencion-perdida.html" style="color:#0284c7; font-weight:700;">Geo-Telemetría GNSS contra el Extravío</a> — 99.4% de prevención de pérdida y rescate en &lt;4 min.<br>
                    5️⃣ <a href="ansiedad-separacion-cortisol-mascotas.html" style="color:#0284c7; font-weight:700;">Reducción de Cortisol en Ansiedad por Separación</a> — Descenso del 47% de cortisol con bio-alertas VFC.<br>
                    6️⃣ <a href="seguros-veterinarios-mortalidad.html" style="color:#0284c7; font-weight:700;">Seguros Preventivos vs. Eutanasia Económica</a> — -88% de mortalidad por barreras financieras en cirugías.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="window.location.href='gemelos-digitales-salud-predictiva.html'">
                        <i class="fa-solid fa-dna"></i> Estudio Gemelos Digitales
                    </button>
                    <button class="ai-btn-action secondary" onclick="window.location.href='triaje-ia-esperanza-vida-veterinaria.html'">
                        <i class="fa-solid fa-bolt"></i> Estudio Triaje IA
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // A10. PRODUCTOS Y SERVICIOS ESPECÍFICOS DEL MARKETPLACE (15 FICHAS + CATÁLOGO)
        // ---------------------------------------------------------------------
        if (has('safehome', 'multipet', 'safehome multipet')) {
            return `
                <div class="ai-source-badge"><i class="fa-solid fa-shield-cat"></i> Seguro Multiespecie &bull; SafeHome MultiPet</div><br>
                <strong>SafeHome MultiPet (28.00 €/mes — <code>producto-safehome-multipet.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.6;">
                    🏠 Póliza integral diseñada específicamente para hogares donde conviven <strong>perros y gatos</strong> (más de una especie animal). Unifica urgencias, consultas veterinarias y responsabilidad civil familiar bajo una sola cuota mensual sincronizada con la Smart App CUDI.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.goToProduct('producto-safehome-multipet.html', 'SafeHome MultiPet', 28.00, 'seguros-gastos-veterinarios-perros-gatos.png')">
                        <i class="fa-solid fa-cart-plus"></i> ${inDemo ? 'Añadir SafeHome en App (28€)' : 'Ver Ficha SafeHome MultiPet'}
                    </button>
                    <button class="ai-btn-action secondary" onclick="window.location.href='seguros-salud-mascotas-barcelona.html'">
                        <i class="fa-solid fa-shield-halved"></i> Comparar Seguros CUDI
                    </button>
                </div>
            `;
        }

        if (has('global pet protect', 'global pet')) {
            return `
                <div class="ai-source-badge"><i class="fa-solid fa-globe"></i> Cobertura Quirúrgica Total &bull; Global Pet Protect</div><br>
                <strong>Global Pet Protect (35.00 €/mes — <code>producto-global-pet-protect.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.6;">
                    🌍 Seguro de salud total con <strong>reembolso del 100% en gastos quirúrgicos, hospitalización UCI y pruebas diagnósticas</strong> hasta 6.000 €/año, con cobertura nacional e internacional para viajar con total tranquilidad.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.goToProduct('producto-global-pet-protect.html', 'Global Pet Protect', 35.00, 'seguros-gastos-veterinarios-perros-gatos.png')">
                        <i class="fa-solid fa-cart-plus"></i> ${inDemo ? 'Contratar Global Pet en App (35€)' : 'Ver Ficha Global Pet Protect'}
                    </button>
                    <button class="ai-btn-action secondary" onclick="window.location.href='seguros-salud-mascotas-barcelona.html'">
                        <i class="fa-solid fa-shield-heart"></i> Ver Todos los Seguros
                    </button>
                </div>
            `;
        }

        if (has('hospital clinico dual', 'hospital dual', 'quirofano', 'uci veterinaria')) {
            return `
                <div class="ai-source-badge"><i class="fa-solid fa-hospital"></i> Alta Especialidad &bull; Hospital Clínico Dual</div><br>
                <strong>Hospital Clínico Dual (60.00 € consulta especialista / 85.00 € UCI — <code>producto-hospital-clinico-dual.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.6;">
                    🏥 Especialistas en medicina interna canina y felina con diagnóstico por imagen avanzado (TAC, ecografía Doppler), quirófanos de última generación y UCI 24h conectada directamente al Gemelo Digital de <strong>${t.name}</strong>.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.goToProduct('producto-hospital-clinico-dual.html', 'Hospital Clínico Dual', 60.00, 'servicios-telemedicina-veterinaria-domicilio.png')">
                        <i class="fa-solid fa-hospital-user"></i> ${inDemo ? 'Reservar Hospital Dual en App (60€)' : 'Ver Ficha Hospital Clínico Dual'}
                    </button>
                    <button class="ai-btn-action secondary" onclick="window.location.href='telemedicina-veterinaria-24-7.html'">
                        <i class="fa-solid fa-stethoscope"></i> Ver Red Clínica 24/7
                    </button>
                </div>
            `;
        }

        if (has('grooming master', 'corte a tijera', 'estilismo', 'peluqueria', 'zenpet', 'zenpet spa', 'hidroterapia', 'bubbles', 'bubbles paws', 'ozonoterapia', 'spa animal', 'estetica')) {
            return `
                <div class="ai-source-badge"><i class="fa-solid fa-spa"></i> Bienestar Holístico, Peluquería &amp; Spa CUDI</div><br>
                <strong>Servicios de Estética, Ozonoterapia e Hidroterapia (<code>bienestar-integral-multiespecie.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.62;">
                    🛁 <strong>Bubbles &amp; Paws (22.00 € — <code>producto-bubbles--paws.html</code>):</strong> Baño ecológico dermoprotector biodegradable y ozonoterapia en cabinas acústicas sin secadores de jaula.<br>
                    ✂️ <strong>Grooming Master (30.00 € — <code>producto-grooming-master.html</code>):</strong> Corte a tijera, stripping e higiene auricular/plantar adaptada a la sensibilidad dérmica de <strong>${t.name}</strong>.<br>
                    🌸 <strong>ZenPet Spa (50.00 € — <code>producto-zenpet-spa.html</code>):</strong> Hidroterapia articular, masaje relajante y cabinas con feromonas para reducir activamente el cortisol.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="window.location.href='bienestar-integral-multiespecie.html'">
                        <i class="fa-solid fa-spa"></i> Ver Peluquería y Spa CUDI
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.goToProduct('producto-zenpet-spa.html', 'ZenPet Spa', 50.00, 'reduccion-ansiedad-separacion-perros.png')">
                        <i class="fa-solid fa-cart-plus"></i> ${inDemo ? 'Reservar ZenPet Spa en App (50€)' : 'Ver Ficha ZenPet Spa'}
                    </button>
                </div>
            `;
        }

        if (has('catalogo', 'marketplace', 'tienda', 'todos los productos', 'que productos', 'que servicios', 'que vendes', 'que ofrece cudi', 'todas las paginas', 'mapa del sitio')) {
            return `
                <div class="ai-source-badge"><i class="fa-solid fa-store"></i> Catálogo Oficial Completo CUDI (15 Productos + 6 Estudios)</div><br>
                <strong>Todos los Productos y Servicios del Marketplace CUDI:</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:11px; margin:8px 0; font-size:0.76rem; line-height:1.55;">
                    📡 <strong>Hardware &amp; Planes:</strong> <a href="smart-collar-cudi-gps.html">Smart Collar CUDI (89.50€)</a> &bull; <a href="planes-suscripcion-bienestar-animal.html">Plan CUDI Prime Total (30€/mes)</a><br>
                    🛡️ <strong>Seguros (<a href="seguros-salud-mascotas-barcelona.html">Ver categoría</a>):</strong> <a href="producto-cudi-shield-basic.html">CUDI Shield Basic (18€)</a> &bull; <a href="producto-safehome-multipet.html">SafeHome MultiPet (28€)</a> &bull; <a href="producto-global-pet-protect.html">Global Pet Protect (35€)</a><br>
                    🥗 <strong>Nutrición (<a href="nutricion-personalizada-perros-gatos.html">Ver categoría</a>):</strong> <a href="producto-vitality-mix.html">Vitality Mix (32.50€)</a> &bull; <a href="producto-ecopet-organic.html">EcoPet Organic (45€)</a> &bull; <a href="producto-purebites-clinic.html">PureBites Clinic (58€)</a><br>
                    🏥 <strong>Veterinaria 24/7 (<a href="telemedicina-veterinaria-24-7.html">Ver categoría</a>):</strong> <a href="producto-medipet-express.html">MediPet Express (35€)</a> &bull; <a href="producto-hospital-clinico-dual.html">Hospital Clínico Dual (60€)</a> &bull; <a href="producto-vethome-cudi.html">VetHome Domicilio (75€)</a><br>
                    🐕 <strong>Paseos y Cuidado (<a href="paseadores-perros-certificados-barcelona.html">Ver categoría</a>):</strong> <a href="producto-urban-pet-walkers.html">Urban Pet Walkers (15€)</a> &bull; <a href="producto-activepaws.html">ActivePaws (19.99€)</a> &bull; <a href="producto-nannypets-247.html">NannyPets 24/7 (25€)</a><br>
                    🛁 <strong>Estética y Spa (<a href="bienestar-integral-multiespecie.html">Ver categoría</a>):</strong> <a href="producto-bubbles--paws.html">Bubbles &amp; Paws (22€)</a> &bull; <a href="producto-grooming-master.html">Grooming Master (30€)</a> &bull; <a href="producto-zenpet-spa.html">ZenPet Spa (50€)</a>
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.goToProduct('index.html#store-grid')">
                        <i class="fa-solid fa-bag-shopping"></i> ${inDemo ? 'Abrir Tienda en App' : 'Explorar Tienda en Web'}
                    </button>
                    <button class="ai-btn-action secondary" onclick="window.location.href='planes-suscripcion-bienestar-animal.html'">
                        <i class="fa-solid fa-crown"></i> Ver Planes CUDI
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // A11. DEMO INTERACTIVA / SIMULADOR GEMELO DIGITAL Y SUS 6 PESTAÑAS
        // ---------------------------------------------------------------------
        if (has('demo', 'simulador gemelo', 'app movil', 'aplicacion movil', 'pestanas de la demo', 'como funciona la demo', 'como funciona la app')) {
            return `
                <div class="ai-source-badge"><i class="fa-solid fa-mobile-screen-button"></i> Simulador Interactivo del Gemelo Digital CUDI</div><br>
                <strong>Guía Completa de las 6 Pestañas de la Demo App (<code>simulador-gemelo-digital-telemetria.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.79rem; line-height:1.58;">
                    1️⃣ <strong>Inicio / Dashboard (<code>?tab=dash</code>):</strong> Constantes en vivo de <strong>${t.name}</strong> (${t.bpm} bpm, ${t.temp}, sueño 94/100 y batería ${t.battery}).<br>
                    2️⃣ <strong>Triaje IA Holter (<code>?tab=triage</code>):</strong> Simulación de escaneo ECG bio-neural con detección de anomalías y despacho VetHome.<br>
                    3️⃣ <strong>Mapa GPS &amp; Geocerca (<code>?tab=gps</code>):</strong> Rastreo satelital en ${t.locationZone}, alerta de escape y zumbador acústico de 85 dB.<br>
                    4️⃣ <strong>Salud y Vacunas (<code>?tab=vax</code>):</strong> Cartilla oficial con alerta de renovación de ${t.vaxMainName} y reserva de citas.<br>
                    5️⃣ <strong>Comunidad CUDI Paws (<code>?tab=social</code>):</strong> Muro social interactivo, quedadas en parques y paseadores verificados.<br>
                    6️⃣ <strong>Tienda In-App (<code>?tab=store</code>) &amp; Perfil (<code>?tab=profile</code>):</strong> Carrito directo CUDI Pay y calibración biométrica de la mascota.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="window.location.href='simulador-gemelo-digital-telemetria.html'">
                        <i class="fa-solid fa-mobile-screen"></i> Abrir Demo Gemelo Digital
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.triggerTriageSimulation()">
                        <i class="fa-solid fa-bolt"></i> Simular Triaje IA Ahora
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 1. MÉTRICAS, SIGNOS VITALES & TELEMETRÍA EN TIEMPO REAL (PRIORIDAD ALTA)
        // ---------------------------------------------------------------------
        if (
            has('metrica', 'metricas', 'signos vitales', 'vitales', 'constantes', 'ritmo cardiaco', 'corazon', 'latidos', 'bpm', 'vitals', 'informe', 'gemelo digital', 'vfc', 'estres', 'temperatura', 'respiracion', 'rpm', 'sueno', 'descanso', 'calorias', 'pasos', 'estadisticas', 'telemetria', 'como esta hoy', 'estado de salud') ||
            (has('como esta') && !has('donde esta')) ||
            (has('salud') && !has('seguro', 'shield', 'cobertura', 'poliza', 'vacuna', 'vacunas', 'vacunar'))
        ) {
            const ctxBtnLabel = inDemo ? 'Ir al Panel de Métricas en App' : 'Ver Panel de Métricas en Web';
            return `
                <div class="ai-source-badge"><i class="fa-solid fa-heart-pulse"></i> Telemetría Bio-Neural en Vivo &bull; ${t.name}</div><br>
                <strong>Informe Completo de Métricas y Signos Vitales de ${t.name} (${t.breed}, ${t.weight} kg):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.65;">
                    ❤️ <strong>Frecuencia Cardíaca:</strong> <strong>${t.bpm} bpm</strong> &bull; <span style="color:#10b981; font-weight:700;">Óptimo</span> (Normal: ${t.bpmRange})<br>
                    🌡️ <strong>Temperatura Dérmica Basal:</strong> <strong>${t.temp}</strong> (Rango fisiológico: 38.0 – 39.1 °C)<br>
                    🫁 <strong>Frecuencia Respiratoria:</strong> <strong>${t.respRate}</strong> en reposo tranquilo<br>
                    🧠 <strong>Estrés / Variabilidad VFC:</strong> <strong>${t.hrv}</strong><br>
                    🌙 <strong>Sueño y Descanso (24h):</strong> <strong>${t.sleep}</strong><br>
                    ⚡ <strong>Actividad y Calorías:</strong> <strong>${t.activity}</strong><br>
                    🏆 <strong>Índice Global del Gemelo Digital:</strong> <strong>${t.healthScore}</strong> &bull; 🔋 Collar: ${t.battery}
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.goToMetrics()">
                        <i class="fa-solid fa-chart-line"></i> ${ctxBtnLabel}
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.triggerTriageSimulation()">
                        <i class="fa-solid fa-bolt"></i> Simular Triaje Holter
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 2. UBICACIÓN, GPS EN TIEMPO REAL & GEOCERCA (PRIORIDAD ALTA)
        // ---------------------------------------------------------------------
        if (has('donde esta', 'ubicacion', 'localizacion', 'coordenadas', 'gps', 'mapa', 'geocerca', 'geovalla', 'perdida', 'perdido', 'perdio', 'distancia', 'localizar', 'sonar', 'encontrar', 'paradero', 'radar')) {
            const gpsBtnLabel = inDemo ? 'Abrir Mapa GPS en App' : 'Ver Ubicación GPS en Web';
            return `
                <div class="ai-source-badge"><i class="fa-solid fa-satellite-dish"></i> Rastreo Satelital GNSS L1+L5 &bull; ${t.name}</div><br>
                <strong>Ubicación Exacta en Tiempo Real de ${t.name}:</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.65;">
                    📍 <strong>Zona Actual:</strong> <strong>${t.locationZone}</strong><br>
                    🌐 <strong>Coordenadas Exactas:</strong> <strong>${t.coords}</strong><br>
                    🛡️ <strong>Estado de Geocerca:</strong> <span style="color:#16a34a; font-weight:800;"><i class="fa-solid fa-shield-check"></i> ${t.geofenceStatus}</span><br>
                    📏 <strong>Distancia al Hogar:</strong> <strong>${t.distance}</strong> &bull; <strong>Velocidad:</strong> ${t.speed}<br>
                    📡 <strong>Conectividad eSIM 4G:</strong> Señal óptima &bull; Último ping hace 2 segundos
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.goToGpsTab()">
                        <i class="fa-solid fa-location-dot"></i> ${gpsBtnLabel}
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.triggerCollarBeep()">
                        <i class="fa-solid fa-volume-high"></i> Hacer Sonar Collar (85dB)
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 3. VACUNAS, CUÁNDO VACUNARLO, DESPARASITACIÓN & CITAS (PRIORIDAD ALTA)
        // ---------------------------------------------------------------------
        if (has('vacuna', 'vacunas', 'vacunar', 'vacunarlo', 'vacunarla', 'vacunacion', 'cuando debo vacunar', 'cuando le toca', 'calendario', 'rabia', 'polivalente', 'trivalente', 'leucemia', 'bordetella', 'desparasitacion', 'desparasitar', 'pipeta', 'pastilla', 'chip', 'cartilla', 'pasaporte', 'inyeccion', 'dosis', 'refuerzo')) {
            const vaxBtnLabel = inDemo ? 'Abrir Calendario de Vacunas en App' : 'Ver Calendario de Vacunas en Web';
            return `
                <div class="ai-source-badge"><i class="fa-solid fa-syringe"></i> Expediente de Inmunización &bull; ${t.name}</div><br>
                <strong>Calendario Exacto de Vacunación y Desparasitación de ${t.name}:</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.68;">
                    🚨 <strong>${t.vaxMainName}:</strong> <span style="color:#dc2626; font-weight:800;">¡Vence Hoy! (Renovación inmediata pendiente • 35.00 €)</span><br>
                    💉 <strong>Vacuna Antirrábica (Rabia):</strong> Al día &bull; Próximo refuerzo: <strong>15 de Mayo de 2026</strong><br>
                    🦠 <strong>${t.vaxSecondaryName}:</strong> Al día &bull; Próximo refuerzo: <strong>10 de Septiembre de 2026</strong><br>
                    💊 <strong>Desparasitación Interna (Comprimido trimestral):</strong> Próxima toma: <strong>01 de Noviembre de 2026</strong><br>
                    🦟 <strong>Desparasitación Externa (Pipeta mensual):</strong> Próxima aplicación: <strong>28 de Octubre de 2026</strong><br>
                    📅 <strong>Próxima Cita Reservada:</strong> <strong>22 de Abril (11:30h)</strong> en <em>Clínica Veterinaria CUDI Centro</em>
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.goToHealthTab()">
                        <i class="fa-solid fa-calendar-check"></i> ${vaxBtnLabel}
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.scheduleVaccine()">
                        <i class="fa-solid fa-user-doctor"></i> Programar Vacuna (35€)
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 4. SALUDOS, CORTESÍA & CHARLA HUMANA NATURAL
        // ---------------------------------------------------------------------
        if (has('hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'hey', 'que tal', 'saludos', 'hola cudi')) {
            return `
                ¡Hola! 👋 Me alegra mucho saludarte.
                <br><br>
                Aquí estoy cuidando a <strong>${t.name}</strong> (${t.breed}, ${t.weight} kg) y tengo acceso al <strong>100% de las 45 páginas de CUDI y las 6 pestañas de la Demo App</strong>:
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:10px 14px; margin:8px 0; font-size:0.78rem; line-height:1.6;">
                    ❤️ <strong>Corazón:</strong> ${t.bpm} bpm (tranquilo y estable)<br>
                    ⚡ <strong>Vitalidad hoy:</strong> ${t.activity}<br>
                    📍 <strong>Ubicación:</strong> ${t.locationZone} (Zona Segura)<br>
                    💉 <strong>Vacunación:</strong> ${t.vaxMainName} (¡Renovación pendiente hoy!)
                </div>
                Puedes preguntarme por sus <strong>métricas</strong>, <strong>GPS</strong>, <strong>vacunas</strong>, <strong>cualquier producto o estudio clínico</strong>, <strong>finanzas TFM</strong> o <strong>políticas legales y de devolución</strong>. 🐾
            `;
        }

        if (has('gracias', 'muchas gracias', 'genial', 'excelente', 'vale gracias', 'perfecto gracias', 'ok gracias')) {
            return `
                ¡De nada! Es un placer cuidar de <strong>${t.name}</strong> contigo. Recuerda que conozco al detalle todas las páginas, productos, estudios y métricas en vivo de CUDI para ayudarte siempre que lo necesites. 🐾❤️
            `;
        }

        if (has('adios', 'chao', 'hasta luego', 'hasta pronto', 'nos vemos')) {
            return `
                ¡Hasta pronto! 👋 Sigo monitorizando a <strong>${t.name}</strong> en segundo plano para que estés con total tranquilidad. 🌙✨
            `;
        }

        // ---------------------------------------------------------------------
        // 5. QUIÉN ERES / QUÉ ES CUDI / AUTOR
        // ---------------------------------------------------------------------
        if (has('quien eres', 'que es cudi', 'de que trata', 'quien te creo', 'quien es alejandro', 'autor', 'fundador', 'proyecto cudi', 'para que sirves')) {
            return `
                <strong>CUDI</strong> es el primer ecosistema integral de salud predictiva y telemetría bio-neural para mascotas, nacido en <strong>Barcelona</strong> y desarrollado por <strong>Sergio Alejandro Ospina Rocha</strong>.
                <br><br>
                <strong>Pilares del Ecosistema:</strong>
                <ul style="margin:6px 0 10px 18px; padding:0; font-size:0.8rem; line-height:1.4;">
                    <li><strong>Gemelo Digital Biométrico:</strong> Calibra la biometría única de ${t.name} para anticipar patologías antes de que aparezcan síntomas visibles.</li>
                    <li><strong>Smart Collar IoT:</strong> Sensor cardíaco ECG, termómetro dérmico y GPS multibanda 4G autónomo.</li>
                    <li><strong>Red Omnicanal:</strong> Veterinario a domicilio (VetHome), paseadores certificados (ActivePaws), nutrición clínica y seguro CUDI Shield.</li>
                </ul>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.goToMetrics()">
                        <i class="fa-solid fa-heart-pulse"></i> ${inDemo ? 'Ver Gemelo Digital en App' : 'Ver Gemelo Digital en Web'}
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.goToProduct('smart-collar-cudi-gps.html')">
                        <i class="fa-solid fa-shield-dog"></i> Ver Smart Collar (89.50€)
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 6. EMERGENCIAS CLÍNICAS CRÍTICAS & PRIMEROS AUXILIOS (ALERTA ROJA)
        // ---------------------------------------------------------------------
        if (has('sangre', 'convulsion', 'asfixia', 'envenenado', 'intoxicado', 'golpe de calor', 'desmayo', 'no respira', 'atropellado', 'veneno', 'torsion', 'inconsciente', 'ahogandose', 'chocolate', 'uva', 'pasas', 'cebolla', 'xilitol', 'toxico')) {
            return `
                <div class="ai-urgent" style="background:#fee2e2; border-left:4px solid #ef4444; padding:12px; border-radius:10px; margin-bottom:10px;">
                    <strong style="color:#b91c1c; font-size:0.88rem;"><i class="fa-solid fa-triangle-exclamation fa-beat"></i> ¡ALERTA VETERINARIA CRÍTICA!</strong>
                    <span style="font-size:0.75rem; color:#7f1d1d; display:block; margin-top:4px;">
                        Los síntomas descritos para <strong>${t.name}</strong> requieren intervención veterinaria inmediata.
                    </span>
                </div>

                <strong>Protocolo de Primeros Auxilios de Emergencia CUDI:</strong>
                <ul style="margin:6px 0 10px 18px; padding:0; font-size:0.8rem; line-height:1.45;">
                    <li><strong>Intoxicación / Chocolate / Tóxicos:</strong> El chocolate contiene teobromina (neurotóxico y cardiotóxico para ${t.name}, ${t.weight} kg). <strong>No induzcas el vómito</strong> sin supervisión veterinaria.</li>
                    <li><strong>Golpe de calor:</strong> Humedece cuello, ingles y almohadillas con agua fresca (<strong>nunca hielo</strong>) y ventila al animal.</li>
                    <li><strong>Convulsión o Sangrado:</strong> Protege su cabeza sin introducir las manos en su boca o aplica presión directa con gasa limpia.</li>
                </ul>

                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:10px; margin-bottom:10px; font-size:0.78rem;">
                    📞 <strong>Línea de Emergencia 24/7:</strong> <a href="tel:900123456" style="color:#ef4444; font-weight:800; text-decoration:none;">900 123 456</a> (Atención inmediata)
                </div>

                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" style="background:#ef4444;" onclick="CudiAI.triggerUrgentVet()">
                        <i class="fa-solid fa-truck-medical"></i> ${inDemo ? 'Pedir VetHome Urgente en App (75€)' : 'Ver VetHome Urgente en Web (75€)'}
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.triggerTriageSimulation()">
                        <i class="fa-solid fa-stethoscope"></i> Simular Triaje Bio-Neural
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 7. DIGESTIVO: NO COME / INAPETENCIA / VÓMITOS / DIARREA
        // ---------------------------------------------------------------------
        if (has('no come', 'inapetencia', 'apetito', 'vomito', 'vomita', 'vomitar', 'diarrea', 'cagando blando', 'dolor de tripa', 'estomago', 'gases', 'pasto', 'hierba', 'rechaza la comida')) {
            return `
                <strong>Evaluación Clínica Digestiva para ${t.name} (${t.weight} kg):</strong>
                <ul style="margin:6px 0 10px 18px; padding:0; font-size:0.8rem; line-height:1.45;">
                    <li><strong>Reposo gástrico:</strong> Retira comida sólida durante 8-12h manteniendo hidratación fresca en pequeñas tomas.</li>
                    <li><strong>Dieta blanda gastro-protectora:</strong> Arroz blanco hervido con pechuga de pollo sin sal ni condimentos.</li>
                    <li><strong>Vigilancia con Smart Collar:</strong> Actualmente registra <strong>${t.temp}</strong> y <strong>${t.bpm} bpm</strong> (sin fiebre). Si supera 39.2 °C o hay más de 2 vómitos, solicita VetHome.</li>
                </ul>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.triggerUrgentVet()">
                        <i class="fa-solid fa-stethoscope"></i> ${inDemo ? 'Solicitar VetHome en App (75€)' : 'Ver VetHome a Domicilio en Web'}
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.buyNutrition()">
                        <i class="fa-solid fa-bowl-food"></i> ${inDemo ? 'Ver Dieta Vitality Mix en App' : 'Ver Ficha Vitality Mix en Web'}
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 8. RESPIRATORIO: TOS, JADEO, FATIGA, ESTORNUDOS
        // ---------------------------------------------------------------------
        if (has('tos', 'tose', 'tosiendo', 'jadea', 'jadeo', 'estornudo', 'estornuda', 'mocos', 'ahoga', 'tos de las perreras', 'ronca')) {
            return `
                <strong>Diagnóstico Preliminar de Vías Respiratorias (${t.name}):</strong>
                <ul style="margin:6px 0 10px 18px; padding:0; font-size:0.8rem; line-height:1.45;">
                    <li><strong>Frecuencia Respiratoria Actual:</strong> <strong>${t.respRate}</strong> y pulso en <strong>${t.bpm} bpm</strong>.</li>
                    <li><strong>Recomendación:</strong> Utiliza arnés pectoral en lugar de collar de tiro, humidifica el ambiente con vapor tibio 10 min y evita ejercicio intenso hoy.</li>
                </ul>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.triggerUrgentVet()">
                        <i class="fa-solid fa-stethoscope"></i> ${inDemo ? 'Solicitar Revisión en App (75€)' : 'Ver Servicio VetHome en Web'}
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.goToMetrics()">
                        <i class="fa-solid fa-heart-pulse"></i> ${inDemo ? 'Ver Pulso y RPM en App' : 'Ver Métricas en Web'}
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 9. TRAUMATOLOGÍA: COJERA, PATA, DOLOR, HERIDAS
        // ---------------------------------------------------------------------
        if (has('cojea', 'cojera', 'pata', 'dolor', 'artrosis', 'cadera', 'almohadilla', 'espiga', 'herida')) {
            return `
                <strong>Orientación para Cojera o Molestias Articulares en ${t.name}:</strong>
                <ol style="margin:6px 0 10px 18px; padding:0; font-size:0.8rem; line-height:1.45;">
                    <li><strong>Inspección plantar:</strong> Revisa almohadillas y espacios interdigitales buscando espigas, cortes o quemaduras.</li>
                    <li><strong>Palpación suave:</strong> Comprueba si retira la extremidad al evaluar carpo, codo, rodilla o cadera.</li>
                </ol>
                <div style="background:#fee2e2; border-left:3px solid #ef4444; padding:8px 12px; border-radius:8px; margin:8px 0; font-size:0.75rem; color:#991b1b;">
                    ⚠️ <strong>IMPORTANTE:</strong> Nunca administres ibuprofeno ni paracetamol humano (altamente tóxicos para perros y gatos).
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.triggerUrgentVet()">
                        <i class="fa-solid fa-stethoscope"></i> ${inDemo ? 'Pedir VetHome en App (75€)' : 'Ver VetHome en Web (75€)'}
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.buyShield()">
                        <i class="fa-solid fa-shield-heart"></i> ${inDemo ? 'Contratar Shield en App (18€)' : 'Ver Seguro CUDI Shield en Web'}
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 10. DERMATOLOGÍA: PICOR, PULGAS, GARRAPATAS, ALERGIA
        // ---------------------------------------------------------------------
        if (has('pulga', 'garrapata', 'rasca', 'picor', 'alergia', 'pelo', 'calva', 'caspa', 'dermatitis', 'piel', 'oido', 'oreja', 'otitis')) {
            return `
                <strong>Control Dermatológico &amp; Antiparasitario para ${t.name}:</strong>
                <ul style="margin:6px 0 10px 18px; padding:0; font-size:0.8rem; line-height:1.45;">
                    <li><strong>Próxima Pipeta Externa registrada:</strong> <strong>28 de Octubre de 2026</strong>.</li>
                    <li><strong>Cuidado dérmico:</strong> Te recomendamos baño de ozonoterapia hipoalergénica en <strong>Bubbles &amp; Paws (22.00 €) / ZenPet Spa (50.00 €)</strong> y dieta hidrolizada <strong>PureBites Clinic (58.00 €)</strong>.</li>
                </ul>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.goToProduct('producto-purebites-clinic.html', 'PureBites Clinic', 58.00, 'dietas-personalizadas-longevidad-mascotas.png')">
                        <i class="fa-solid fa-bowl-food"></i> ${inDemo ? 'Añadir PureBites en App (58€)' : 'Ver PureBites Clinic en Web'}
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.goToProduct('producto-bubbles--paws.html', 'Bubbles & Paws', 22.00, 'estetica-canina-bienestar.png')">
                        <i class="fa-solid fa-scissors"></i> ${inDemo ? 'Reservar Baño en App (22€)' : 'Ver Bubbles & Paws en Web'}
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 11. HARDWARE: SMART COLLAR CUDI VS COMPETENCIA
        // ---------------------------------------------------------------------
        if (has('collar', 'hardware', 'smart collar', 'bateria', 'agua', 'sumergible', 'airtag', 'tractive', 'autonomia', 'peso del collar')) {
            return `
                <strong>CUDI Smart Collar (89.50 €) — Grado Clínico Veterinario (<code>smart-collar-cudi-gps.html</code>):</strong>
                <ul style="margin:6px 0 10px 18px; padding:0; font-size:0.8rem; line-height:1.45;">
                    <li>🩺 <strong>Sensores Bio-Neurales:</strong> Fotopletismografía ECG continua, VFC y temperatura dérmica basal.</li>
                    <li>📡 <strong>GPS L1+L5 + eSIM 4G Autónoma:</strong> Precisión de ±1.2 m en toda Europa sin depender de móviles cercanos.</li>
                    <li>🔋 <strong>Estado actual del collar de ${t.name}:</strong> <strong>${t.battery}</strong> &bull; Sumergible IP68 (32 gramos) &bull; Garantía de devolución de 30 días.</li>
                </ul>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.buyCollar()">
                        <i class="fa-solid fa-cart-shopping"></i> ${inDemo ? 'Comprar Smart Collar en App (89.50€)' : 'Ver Ficha Smart Collar en Web'}
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.goToGpsTab()">
                        <i class="fa-solid fa-location-dot"></i> ${inDemo ? 'Abrir Radar GPS en App' : 'Ver Ubicación del Collar en Web'}
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 12. PLANES, SUSCRIPCIONES Y PRECIOS
        // ---------------------------------------------------------------------
        if (has('precio', 'precios', 'cuanto cuesta', 'plan', 'planes', 'suscripcion', 'tarifa', 'cuanto vale', 'prime', 'premium')) {
            return `
                <strong>Tarifas Oficiales del Ecosistema CUDI (<code>planes-suscripcion-bienestar-animal.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.6;">
                    👑 <strong>CUDI Prime Total (30.00 €/mes):</strong> Incluye Smart Collar gratis, Gemelo Digital 24/7, Telemedicina ilimitada y 20% dto. en VetHome.<br>
                    🛡️ <strong>CUDI Shield Basic (18.00 €/mes):</strong> Reembolso del 80% en urgencias y cirugías + Responsabilidad Civil.<br>
                    🌍 <strong>Global Pet Protect (35.00 €/mes) &amp; SafeHome MultiPet (28.00 €/mes):</strong> Cobertura quirúrgica 100% o multiespecie.<br>
                    📡 <strong>Smart Collar Individual (89.50 € pago único):</strong> Hardware IoT con ECG y GPS 4G.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.buyPremium()">
                        <i class="fa-solid fa-crown"></i> ${inDemo ? 'Activar Plan Prime en App (30€)' : 'Ver Planes de Suscripción en Web'}
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.buyShield()">
                        <i class="fa-solid fa-shield-heart"></i> ${inDemo ? 'Contratar Shield en App (18€)' : 'Ver Seguro CUDI Shield en Web'}
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 13. SEGUROS Y PÓLIZAS VETERINARIAS (CUDI SHIELD / GLOBAL PET / SAFEHOME)
        // ---------------------------------------------------------------------
        if (has('seguro', 'shield', 'cobertura', 'poliza', 'accidente', 'operacion', 'cirugia')) {
            return `
                <strong>Planes de Protección y Seguros Veterinarios CUDI (<code>seguros-salud-mascotas-barcelona.html</code>):</strong>
                <ul style="margin:6px 0 10px 18px; padding:0; font-size:0.8rem; line-height:1.48;">
                    <li>🛡️ <strong>CUDI Shield Basic (18.00 €/mes):</strong> Cobertura de urgencias (80% reembolso) y Responsabilidad Civil familiar hasta 150.000 €.</li>
                    <li>🏠 <strong>SafeHome MultiPet (28.00 €/mes):</strong> Protección unificada para hogares con perros y gatos.</li>
                    <li>🌍 <strong>Global Pet Protect (35.00 €/mes):</strong> Reembolso total (100%) de gastos quirúrgicos y hospitalarios hasta 6.000 €/año.</li>
                </ul>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.buyShield()">
                        <i class="fa-solid fa-shield-heart"></i> ${inDemo ? 'Contratar CUDI Shield en App (18€)' : 'Ver Póliza CUDI Shield en Web'}
                    </button>
                    <button class="ai-btn-action secondary" onclick="window.location.href='seguros-salud-mascotas-barcelona.html'">
                        <i class="fa-solid fa-globe"></i> Comparar los 3 Seguros CUDI
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 14. VETERINARIO A DOMICILIO & CITAS (VETHOME, MEDIPET & HOSPITAL DUAL)
        // ---------------------------------------------------------------------
        if (has('veterinario', 'vethome', 'cita', 'domicilio', 'doctor', 'consulta', 'medipet', 'videollamada', 'hospital', 'telemedicina')) {
            return `
                <strong>Red Clínica Certificada 24/7 y Próxima Cita de ${t.name} (<code>telemedicina-veterinaria-24-7.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.6;">
                    📅 <strong>Próxima Cita Agendada:</strong> <strong>22 de Abril (11:30h)</strong> en Clínica Veterinaria CUDI Centro.<br>
                    🚑 <strong>VetHome a Domicilio (75.00 € — <code>producto-vethome-cudi.html</code>):</strong> Veterinario colegiado en tu casa en menos de 45 minutos.<br>
                    📱 <strong>MediPet Express 24/7 (35.00 € — <code>producto-medipet-express.html</code>):</strong> Videoconsulta inmediata y red de clínicas de barrio.<br>
                    🏥 <strong>Hospital Clínico Dual (60.00 € — <code>producto-hospital-clinico-dual.html</code>):</strong> Medicina interna, cirugía y UCI 24h.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.triggerUrgentVet()">
                        <i class="fa-solid fa-truck-medical"></i> ${inDemo ? 'Pedir VetHome en App (75€)' : 'Ver VetHome a Domicilio en Web'}
                    </button>
                    <button class="ai-btn-action secondary" onclick="window.location.href='telemedicina-veterinaria-24-7.html'">
                        <i class="fa-solid fa-hospital"></i> Ver Red Veterinaria 24/7
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 15. NUTRICIÓN, DIETA, PESO & GASTO CALÓRICO (VITALITY, ECOPET, PUREBITES)
        // ---------------------------------------------------------------------
        if (has('comida', 'pienso', 'barf', 'nutricion', 'peso', 'alimentacion', 'dieta', 'gordo', 'flaco', 'cuanto come', 'engordar', 'adelgazar', 'vitality', 'purebites', 'ecopet')) {
            const petWeight = parseFloat(t.weight) || 8;
            const kcalDaily = Math.round(70 * Math.pow(petWeight, 0.75) * 1.6);
            return `
                <strong>Nutrición Clínica Personalizada para ${t.name} (<code>nutricion-personalizada-perros-gatos.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.6;">
                    ⚖️ <strong>Peso y Gasto Energético:</strong> <strong>${petWeight} kg</strong> &bull; Requerimiento ~<strong>${kcalDaily} kcal/día</strong> (Hoy: 340 kcal en 4.2 km).<br>
                    🥗 <strong>Vitality Mix (32.50 € — <code>producto-vitality-mix.html</code>):</strong> Suplemento inmunológico con Omega-3 EPA/DHA y prebióticos.<br>
                    🥩 <strong>EcoPet Organic (45.00 € — <code>producto-ecopet-organic.html</code>):</strong> Dieta cruda/orgánica biológicamente apropiada.<br>
                    🩺 <strong>PureBites Clinic (58.00 € — <code>producto-purebites-clinic.html</code>):</strong> Pienso clínico hipoalergénico prescrito por IA para sensibilidad gástrica.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.buyNutrition()">
                        <i class="fa-solid fa-bowl-food"></i> ${inDemo ? 'Añadir Vitality Mix en App (32.50€)' : 'Ver Vitality Mix en Web'}
                    </button>
                    <button class="ai-btn-action secondary" onclick="window.location.href='nutricion-personalizada-perros-gatos.html'">
                        <i class="fa-solid fa-apple-whole"></i> Ver Las 3 Dietas CUDI
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 16. PASEOS, CUIDADORES & RED SOCIAL CUDI PAWS
        // ---------------------------------------------------------------------
        if (has('paseo', 'paseador', 'paseadores', 'social', 'amigos', 'parque', 'guarderia', 'cuidador', 'cuidadores', 'nannypets', 'activepaws', 'urban pet walkers', 'comunidad')) {
            return `
                <strong>Red de Paseadores Certificados, Cuidadores y Comunidad (<code>paseadores-perros-certificados-barcelona.html</code> &amp; <code>comunidad-cudi.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.6;">
                    🐕 <strong>Urban Pet Walkers (15.00 € — <code>producto-urban-pet-walkers.html</code>):</strong> Caminatas grupales seguras con trazado GPS en directo.<br>
                    🏃 <strong>ActivePaws (19.99 € — <code>producto-activepaws.html</code>):</strong> Ejercicio guiado, agilidad y estimulación olfativa con control de pulsaciones.<br>
                    🏡 <strong>NannyPets 24/7 (25.00 € — <code>producto-nannypets-247.html</code>):</strong> Cuidador verificado en tu propio hogar para perros y gatos sin estrés de jaulas.<br>
                    🐾 <strong>Comunidad CUDI (<code>comunidad-cudi.html</code>):</strong> Red social de tutores y quedadas seguras en Barcelona.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.goToSocialTab()">
                        <i class="fa-solid fa-paw"></i> ${inDemo ? 'Abrir Comunidad Social en App' : 'Ir a Comunidad CUDI en Web'}
                    </button>
                    <button class="ai-btn-action secondary" onclick="window.location.href='paseadores-perros-certificados-barcelona.html'">
                        <i class="fa-solid fa-person-walking-dog"></i> Ver Paseadores y NannyPets
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 17. MODELO DE NEGOCIO, FINANZAS & PROYECCIONES (SIMULADOR FINANCIERO)
        // ---------------------------------------------------------------------
        if (has('modelo financiero', 'simulador financiero', 'finanzas', 'tfm', 'escenarios', 'ebitda', 'break even', 'punto de equilibrio', 'ltv', 'cac', 'ingresos', 'inversion', 'rentabilidad', 'negocio')) {
            return `
                <strong>Modelo Financiero Multiescenario y Unit Economics de CUDI (<code>simulador-financiero.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.6;">
                    📈 <strong>3 Escenarios Interactivos a 36 Meses:</strong><br>
                    &bull; <strong>Escenario Negativo / Conservador:</strong> 1.25M € facturación (Break-even Mes 16)<br>
                    &bull; <strong>Escenario Equilibrio / Base:</strong> 2.82M € facturación (Break-even Mes 14 • EBITDA 24%)<br>
                    &bull; <strong>Escenario Positivo / Optimista:</strong> 4.48M € facturación (Break-even Mes 11)<br>
                    🎯 <strong>Unit Economics:</strong> CAC <strong>24.50 €</strong> &bull; LTV <strong>285.00 €</strong> &bull; Ratio LTV/CAC <strong>11.6x</strong>
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="window.location.href='simulador-financiero.html'">
                        <i class="fa-solid fa-calculator"></i> Abrir Simulador Financiero
                    </button>
                    <button class="ai-btn-action secondary" onclick="window.location.href='modelo_financiero.html'">
                        <i class="fa-solid fa-table"></i> Ver Vista Completa Modelo TFM
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 18. PERFIL Y DATOS DE LA MASCOTA (MI-MASCOTA.HTML)
        // ---------------------------------------------------------------------
        if (has('perfil', 'mi mascota', 'quien es mi perro', 'quien es mi gato', 'ficha', 'edad', 'raza')) {
            return `
                <strong>Ficha Digital Sincronizada de ${t.name} (<code>mi-mascota.html</code>):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.6;">
                    🐾 <strong>Nombre:</strong> ${t.name} (${t.species})<br>
                    🐕 <strong>Raza y Etapa:</strong> ${t.breed} &bull; ${t.age}<br>
                    ⚖️ <strong>Peso:</strong> ${t.weight} kg &bull; <strong>Energía:</strong> ${t.energy}<br>
                    🥣 <strong>Alimentación:</strong> ${t.food}<br>
                    ❤️ <strong>Estado Actual:</strong> ${t.bpm} bpm &bull; ${t.temp} &bull; ${t.locationZone}
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.goToProfileTab()">
                        <i class="fa-solid fa-id-card"></i> ${inDemo ? 'Abrir Perfil en App' : 'Abrir Mi Mascota en Web'}
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.goToMetrics()">
                        <i class="fa-solid fa-chart-line"></i> ${inDemo ? 'Ver Métricas en App' : 'Ver Métricas en Web'}
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 19. BUSCADOR SEMÁNTICO UNIVERSAL EN LAS 45 PÁGINAS DE CUDI
        // ---------------------------------------------------------------------
        const matchedPage = this.searchAllPagesKnowledge(rawQuery);
        if (matchedPage) {
            return `
                <div class="ai-source-badge"><i class="fa-solid fa-file-circle-check"></i> Conocimiento Verificado de Página &bull; <code>${matchedPage.url}</code></div><br>
                <strong>${matchedPage.title}</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.6;">
                    ${matchedPage.desc ? `<p style="margin:0 0 6px 0; font-weight:600; color:#0f172a;">${matchedPage.desc}</p>` : ''}
                    <p style="margin:0; color:#334155;">${matchedPage.content.slice(0, 420)}...</p>
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="window.location.href='${matchedPage.url}'">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> Abrir ${matchedPage.title.split('|')[0].trim()}
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.goToMetrics()">
                        <i class="fa-solid fa-heart-pulse"></i> Ver Gemelo Digital de ${t.name}
                    </button>
                </div>
            `;
        }

        if (strictOnly) return null;

        // ---------------------------------------------------------------------
        // 20. RESPUESTA CLÍNICA Y NAVEGACIONAL COMPLETA PARA CONSULTAS ABIERTAS
        // ---------------------------------------------------------------------
        const ragContext = this.retrieveRAGContext(rawQuery);
        return `
            <div class="ai-source-badge"><i class="fa-solid fa-brain"></i> Diagnóstico &amp; Asistente Integral CUDI &bull; ${t.name}</div><br>
            Respecto a tu consulta sobre <strong>"${rawQuery}"</strong> para <strong>${t.name}</strong> (${t.breed}, ${t.weight} kg):
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:11px 13px; margin:8px 0; font-size:0.79rem; line-height:1.6;">
                ${this.formatMarkdownToHTML(ragContext)}
            </div>
            <strong>Resumen en vivo del Gemelo Digital de ${t.name}:</strong>
            <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:10px; padding:10px 12px; margin:6px 0; font-size:0.77rem; line-height:1.55; color:#0c4a6e;">
                ❤️ <strong>Métricas:</strong> ${t.bpm} bpm &bull; ${t.temp} &bull; ${t.respRate} &bull; Salud ${t.healthScore}<br>
                📍 <strong>Ubicación:</strong> ${t.locationZone} (${t.distance})<br>
                💉 <strong>Vacunación:</strong> ${t.vaxMainName} (<strong style="color:#dc2626;">¡Vence Hoy!</strong>) &bull; Rabia: 15 Mayo 2026
            </div>
            <div class="ai-actions-wrap">
                <button class="ai-btn-action primary" onclick="CudiAI.goToMetrics()">
                    <i class="fa-solid fa-chart-line"></i> ${inDemo ? 'Ver Métricas en App' : 'Ver Métricas en Web'}
                </button>
                <button class="ai-btn-action secondary" onclick="CudiAI.goToGpsTab()">
                    <i class="fa-solid fa-location-dot"></i> ${inDemo ? 'Ver GPS en App' : 'Ver Ubicación en Web'}
                </button>
                <button class="ai-btn-action secondary" onclick="window.location.href='politica-devoluciones-smart-collar.html'">
                    <i class="fa-solid fa-file-shield"></i> Políticas y Garantías
                </button>
            </div>
        `;
    },

    // -------------------------------------------------------------------------
    // ENRUTADOR CONTEXTUAL INTELIGENTE (WEB <-> DEMO APP)
    // -------------------------------------------------------------------------
    ensureDemoDashboardUnlocked() {
        const onb = document.getElementById('onboarding-screen');
        if (onb && onb.style.display !== 'none' && !onb.classList.contains('hidden')) {
            if (typeof appDemoAutoFill === 'function') appDemoAutoFill();
            if (typeof proceedToDashboard === 'function') proceedToDashboard();
        }
    },

    activateDemoTab(tabId) {
        this.ensureDemoDashboardUnlocked();
        if (typeof closeAlertScreen === 'function') {
            try { closeAlertScreen(); } catch (_) {}
        }
        if (typeof switchTab === 'function') {
            const navEl = document.querySelector(`.nav-item[onclick*="'${tabId}'"]`);
            switchTab(tabId, navEl);
        }
        if (window.innerWidth <= 900) {
            this.close();
        }
        const tabEl = document.getElementById(`tab-${tabId}`) || document.querySelector('.phone-mockup, .app-container');
        if (tabEl) {
            setTimeout(() => tabEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 120);
        }
    },

    navigateWebOrScroll(pageUrl, hashId) {
        const path = (window.location.pathname || '').toLowerCase();
        if (path.endsWith(pageUrl.toLowerCase()) && hashId) {
            const targetEl = document.getElementById(hashId);
            if (targetEl) {
                if (window.innerWidth <= 900) this.close();
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                targetEl.style.transition = 'box-shadow 0.35s ease';
                targetEl.style.boxShadow = '0 0 0 3px #38bdf8';
                setTimeout(() => { targetEl.style.boxShadow = ''; }, 1800);
                return;
            }
        }
        window.location.href = hashId ? `${pageUrl}#${hashId}` : pageUrl;
    },

    goToMetrics() {
        if (this.isDemoContext()) {
            this.activateDemoTab('dash');
        } else {
            this.navigateWebOrScroll('mi-mascota.html', 'web-sec-metricas');
        }
    },

    goToGpsTab() {
        if (this.isDemoContext()) {
            this.activateDemoTab('gps');
        } else {
            this.navigateWebOrScroll('mi-mascota.html', 'web-sec-ubicacion');
        }
    },

    goToHealthTab() {
        if (this.isDemoContext()) {
            this.activateDemoTab('vax');
        } else {
            this.navigateWebOrScroll('mi-mascota.html', 'web-sec-vacunas');
        }
    },

    goToSocialTab() {
        if (this.isDemoContext()) {
            this.activateDemoTab('social');
        } else {
            window.location.href = 'comunidad-cudi.html';
        }
    },

    goToProfileTab() {
        if (this.isDemoContext()) {
            this.activateDemoTab('profile');
        } else {
            this.navigateWebOrScroll('mi-mascota.html', '');
        }
    },

    goToProduct(webUrl, name, price, img) {
        if (this.isDemoContext()) {
            if (name && price) this.addToCart(name, price, img);
            this.activateDemoTab('store');
        } else {
            window.location.href = webUrl || 'index.html#store-grid';
        }
    },

    scheduleVaccine() {
        if (this.isDemoContext()) {
            this.activateDemoTab('vax');
            if (typeof bookOption === 'function') {
                bookOption('Renovar Polivalente', 35.00);
            }
        } else {
            window.location.href = 'producto-vethome-cudi.html';
        }
    },

    triggerUrgentVet() {
        if (this.isDemoContext()) {
            this.ensureDemoDashboardUnlocked();
            this.addToCart('VetHome CUDI', 75.00, 'triaje-ia-veterinario-urgencias.png');
            if (typeof openFullCheckout === 'function') openFullCheckout();
        } else {
            window.location.href = 'producto-vethome-cudi.html';
        }
    },

    triggerTriageSimulation() {
        if (this.isDemoContext() && typeof startAIAnalysisAnimated === 'function') {
            this.ensureDemoDashboardUnlocked();
            if (window.innerWidth <= 900) this.close();
            startAIAnalysisAnimated();
        } else {
            // La simulación Holter animada es exclusiva de la Demo App -> Deep-link directo a ?tab=triage
            window.location.href = 'simulador-gemelo-digital-telemetria.html?tab=triage';
        }
    },

    triggerCollarBeep() {
        if (typeof triggerCollarSound === 'function') {
            triggerCollarSound();
        } else if (typeof showToast === 'function') {
            showToast('Emitiendo tono acústico de 85dB en el collar...');
        } else {
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const osc = ctx.createOscillator();
                osc.type = 'sine';
                osc.frequency.value = 880;
                osc.connect(ctx.destination);
                osc.start();
                setTimeout(() => { osc.stop(); ctx.close(); }, 350);
            } catch(e) {}
            alert('🔔 Tono acústico de 85dB emitido en el collar de ' + (this.petProfile.name || 'tu mascota'));
        }
    },

    buyCollar() {
        if (this.isDemoContext()) {
            this.addToCart('Collar Inteligente CUDI', 89.50, 'cudi-smart-collar-geolocalizacion-gps.png');
        } else {
            window.location.href = 'smart-collar-cudi-gps.html';
        }
    },

    buyPremium() {
        if (this.isDemoContext()) {
            this.addToCart('CUDI Premium Care', 30.00, 'triaje-ia-veterinario-urgencias.png');
        } else {
            window.location.href = 'planes-suscripcion-bienestar-animal.html';
        }
    },

    buyShield() {
        if (this.isDemoContext()) {
            this.addToCart('CUDI Shield Basic', 18.00, 'seguros-gastos-veterinarios-perros-gatos.png');
        } else {
            window.location.href = 'producto-cudi-shield-basic.html';
        }
    },

    buyNutrition() {
        if (this.isDemoContext()) {
            this.addToCart('Vitality Mix', 32.50, 'marketplace-alimentos-organicos-perros.png');
        } else {
            window.location.href = 'producto-vitality-mix.html';
        }
    },

    bookWalker() {
        if (this.isDemoContext()) {
            this.addToCart('ActivePaws', 12.00, 'humanizacion-mascotas-familia.png');
        } else {
            window.location.href = 'producto-activepaws.html';
        }
    },

    addToCart(name, price, img) {
        if (typeof addToCart === 'function') {
            addToCart(name, price, img);
        } else {
            try {
                let cart = JSON.parse(localStorage.getItem('cudi_cart_items') || '[]');
                cart.push({ name, price, img });
                localStorage.setItem('cudi_cart_items', JSON.stringify(cart));
            } catch(e) {}
            window.location.href = 'index.html#store-grid';
        }
    }
};

if (typeof window !== 'undefined') window.CudiAI = CudiAI;
if (typeof module !== 'undefined' && module.exports) module.exports = CudiAI;

// =============================================================================
// BOOTSTRAP RESILIENTE PARA GARANTIZAR INYECCIÓN EN EL 100% DE LAS PÁGINAS
// =============================================================================
function bootCudiAI() {
    if (typeof window !== 'undefined' && window.CudiAI) {
        if (!document.getElementById('cudi-ai-global-widget')) {
            window.CudiAI.init();
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootCudiAI);
} else {
    bootCudiAI();
}
if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener('load', bootCudiAI);
}
