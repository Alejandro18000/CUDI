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
    },

    injectWidget() {
        const old = document.querySelector('.cudi-ai-container');
        if (old) old.remove();

        const container = document.createElement('div');
        container.className = 'cudi-ai-container';
        container.id = 'cudi-ai-global-widget';
        container.innerHTML = `
            <div class="cudi-ai-trigger" onclick="CudiAI.toggle()" title="Hablar con la IA Local de CUDI">
                <img src="logo.jpeg" alt="CUDI AI">
                <div class="ai-notif-dot" id="ai-notif"></div>
            </div>
            
            <div class="cudi-ai-panel" id="ai-panel">
                <div class="ai-header">
                    <div class="ai-header-left">
                        <div class="ai-header-avatar-slot" title="Mascota Activa: ${this.petProfile.name}">
                            <img id="ai-avatar" src="${this.petProfile.photo || 'avatar-mascota-perfil-gemelo-digital.png'}" alt="${this.petProfile.name}">
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
        const has = (...keywords) => keywords.some(k => q.includes(normalize(k)));

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
        if (has('vacuna', 'vacunas', 'vacunar', 'vacunarlo', 'vacunarla', 'vacunacion', 'cuando debo vacunar', 'cuando le toca', 'calendario', 'rabia', 'polivalente', 'trivalente', 'leucemia', 'bordetella', 'desparasit', 'pipeta', 'pastilla', 'chip', 'cartilla', 'pasaporte', 'inyeccion', 'dosis', 'refuerzo')) {
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
                Aquí estoy cuidando a <strong>${t.name}</strong> (${t.breed}, ${t.weight} kg). En este momento sus sensores registran constantes óptimas:
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:10px 14px; margin:8px 0; font-size:0.78rem; line-height:1.6;">
                    ❤️ <strong>Corazón:</strong> ${t.bpm} bpm (tranquilo y estable)<br>
                    ⚡ <strong>Vitalidad hoy:</strong> ${t.activity}<br>
                    📍 <strong>Ubicación:</strong> ${t.locationZone} (Zona Segura)<br>
                    💉 <strong>Vacunación:</strong> ${t.vaxMainName} (¡Renovación pendiente hoy!)
                </div>
                ¿Quieres consultar sus <strong>métricas completas</strong>, su <strong>ubicación GPS</strong>, su <strong>calendario de vacunas</strong> o algún síntoma? 🐾
            `;
        }

        if (has('gracias', 'muchas gracias', 'genial', 'excelente', 'vale gracias', 'perfecto gracias', 'ok gracias')) {
            return `
                ¡De nada! Es un placer cuidar de <strong>${t.name}</strong> contigo. Recuerda que su collar vigila sus pulsaciones, ubicación y descanso las 24 horas del día. ¡Que tengas un excelente día junto a tu compañero! 🐾❤️
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
        if (has('no come', 'inapetencia', 'apetito', 'vomit', 'diarrea', 'cagando blando', 'dolor de tripa', 'estomago', 'gases', 'pasto', 'hierba', 'rechaza la comida')) {
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
        if (has('tos', 'tose', 'jadea', 'estornud', 'mocos', 'ahoga', 'tos de las perreras', 'ronca')) {
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
        if (has('cojea', 'cojera', 'pata', 'dolor', 'artrosis', 'cadera', 'almohadilla', 'espiga', 'herida', 'caminar')) {
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
                <strong>Control Dermatológico & Antiparasitario para ${t.name}:</strong>
                <ul style="margin:6px 0 10px 18px; padding:0; font-size:0.8rem; line-height:1.45;">
                    <li><strong>Próxima Pipeta Externa registrada:</strong> <strong>28 de Octubre de 2026</strong>.</li>
                    <li><strong>Cuidado dérmico:</strong> Te recomendamos baño de ozonoterapia hipoalergénica en <strong>ZenPet Spa / Bubbles & Paws</strong> y dieta hidrolizada <strong>PureBites Clinic (42.90 €)</strong>.</li>
                </ul>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.goToProduct('producto-purebites-clinic.html', 'PureBites Clinic', 42.90, 'dietas-personalizadas-longevidad-mascotas.png')">
                        <i class="fa-solid fa-bowl-food"></i> ${inDemo ? 'Añadir PureBites en App (42.90€)' : 'Ver PureBites Clinic en Web'}
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.goToProduct('producto-bubbles--paws.html', 'Bubbles & Paws', 28.00, 'estetica-canina-bienestar.png')">
                        <i class="fa-solid fa-scissors"></i> ${inDemo ? 'Reservar Baño en App (28€)' : 'Ver Bubbles & Paws en Web'}
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 11. HARDWARE: SMART COLLAR CUDI VS COMPETENCIA
        // ---------------------------------------------------------------------
        if (has('collar', 'hardware', 'smart collar', 'bateria', 'agua', 'sumergible', 'airtag', 'tractive', 'autonomia', 'peso del collar')) {
            return `
                <strong>CUDI Smart Collar (89.50 €) — Grado Clínico Veterinario:</strong>
                <ul style="margin:6px 0 10px 18px; padding:0; font-size:0.8rem; line-height:1.45;">
                    <li>🩺 <strong>Sensores Bio-Neurales:</strong> Fotopletismografía ECG continua, VFC y temperatura dérmica basal.</li>
                    <li>📡 <strong>GPS L1+L5 + eSIM 4G Autónoma:</strong> Precisión de ±1.2 m en toda Europa sin depender de móviles cercanos.</li>
                    <li>🔋 <strong>Estado actual del collar de ${t.name}:</strong> <strong>${t.battery}</strong> &bull; Sumergible IP68 (32 gramos).</li>
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
                <strong>Tarifas Oficiales del Ecosistema CUDI:</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.6;">
                    👑 <strong>CUDI Prime Total (30.00 €/mes):</strong> Incluye Smart Collar gratis, Gemelo Digital 24/7, Telemedicina ilimitada y 20% dto. en VetHome.<br>
                    🛡️ <strong>CUDI Shield Basic (18.00 €/mes):</strong> Reembolso del 80% en urgencias y cirugías + Responsabilidad Civil.<br>
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
        // 13. SEGUROS Y PÓLIZAS VETERINARIAS (CUDI SHIELD)
        // ---------------------------------------------------------------------
        if (has('seguro', 'shield', 'cobertura', 'poliza', 'accidente', 'operacion', 'cirugia')) {
            return `
                <strong>Póliza Veterinaria CUDI Shield (18.00 €/mes):</strong>
                <ul style="margin:6px 0 10px 18px; padding:0; font-size:0.8rem; line-height:1.45;">
                    <li>Cobertura de urgencias, traumatismos, hospitalización y cirugías en toda la red CUDI.</li>
                    <li>Responsabilidad Civil incluida de hasta 300.000 €.</li>
                </ul>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.buyShield()">
                        <i class="fa-solid fa-shield-heart"></i> ${inDemo ? 'Contratar CUDI Shield en App (18€)' : 'Ver Póliza CUDI Shield en Web'}
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.goToProduct('seguros-salud-mascotas-barcelona.html', 'Global Pet Protect', 34.90, 'seguros-gastos-veterinarios-perros-gatos.png')">
                        <i class="fa-solid fa-globe"></i> ${inDemo ? 'Ver Cobertura Global en App' : 'Comparar Seguros en Web'}
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 14. VETERINARIO A DOMICILIO & CITAS (VETHOME & MEDIPET)
        // ---------------------------------------------------------------------
        if (has('veterinario', 'vethome', 'cita', 'domicilio', 'doctor', 'consulta', 'medipet', 'videollamada', 'hospital')) {
            return `
                <strong>Servicios Clínicos y Próxima Cita de ${t.name}:</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.6;">
                    📅 <strong>Próxima Cita Agendada:</strong> <strong>22 de Abril (11:30h)</strong> en Clínica Veterinaria CUDI Centro.<br>
                    🚑 <strong>VetHome a Domicilio (75.00 €):</strong> Veterinario colegiado en tu casa en menos de 45 minutos.<br>
                    📱 <strong>MediPet Express 24/7 (45.00 €):</strong> Videoconsulta inmediata con receta electrónica.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.triggerUrgentVet()">
                        <i class="fa-solid fa-truck-medical"></i> ${inDemo ? 'Pedir VetHome en App (75€)' : 'Ver VetHome a Domicilio en Web'}
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.goToHealthTab()">
                        <i class="fa-solid fa-calendar-check"></i> ${inDemo ? 'Ver Citas y Vacunas en App' : 'Ver Citas y Vacunas en Web'}
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 15. NUTRICIÓN, DIETA, PESO & GASTO CALÓRICO
        // ---------------------------------------------------------------------
        if (has('comida', 'pienso', 'barf', 'nutricion', 'peso', 'alimentacion', 'dieta', 'gordo', 'flaco', 'cuanto come', 'engordar', 'adelgazar', 'vitality', 'purebites', 'ecopet')) {
            const petWeight = parseFloat(t.weight) || 8;
            const kcalDaily = Math.round(70 * Math.pow(petWeight, 0.75) * 1.6);
            return `
                <strong>Plan Nutricional de Precisión para ${t.name}:</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.6;">
                    ⚖️ <strong>Peso Actual:</strong> <strong>${petWeight} kg</strong> (${t.breed}, ${t.age})<br>
                    🔥 <strong>Requerimiento Energético Diario (DER):</strong> ~<strong>${kcalDaily} kcal/día</strong><br>
                    🏃 <strong>Consumo Calórico Hoy:</strong> 340 kcal en 4.2 km<br>
                    🥗 <strong>Dieta Actual:</strong> ${t.food}
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.buyNutrition()">
                        <i class="fa-solid fa-bowl-food"></i> ${inDemo ? 'Añadir Vitality Mix en App (32.50€)' : 'Ver Nutrición Vitality Mix en Web'}
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.goToProfileTab()">
                        <i class="fa-solid fa-id-card"></i> ${inDemo ? 'Ver Ficha en App' : 'Ver Perfil en Web'}
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 16. PASEOS & RED SOCIAL CUDI PAWS
        // ---------------------------------------------------------------------
        if (has('paseo', 'paseador', 'social', 'amigos', 'salir', 'parque', 'guarderia', 'cuidador', 'nannypets', 'activepaws', 'comunidad')) {
            return `
                <strong>Movilidad, Paseadores GPS y Comunidad (${t.name}):</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.6;">
                    🐕 <strong>ActivePaws (12.00 €/paseo):</strong> Paseador certificado de 1h con trazado GPS en directo.<br>
                    🏡 <strong>NannyPets 24/7 (35.00 €/día):</strong> Guardería familiar en hogar verificado sin jaulas.<br>
                    🐾 <strong>Comunidad CUDI:</strong> Quedadas seguras en Parc del Poblenou y Parc de la Ciutadella.
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.goToSocialTab()">
                        <i class="fa-solid fa-paw"></i> ${inDemo ? 'Abrir Comunidad Social en App' : 'Ir a Comunidad CUDI en Web'}
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.bookWalker()">
                        <i class="fa-solid fa-person-walking-dog"></i> ${inDemo ? 'Reservar ActivePaws en App (12€)' : 'Ver Paseadores en Web'}
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 17. MODELO DE NEGOCIO, FINANZAS & PROYECCIONES
        // ---------------------------------------------------------------------
        if (has('modelo financiero', 'finanzas', 'tfm', 'escenarios', 'ebitda', 'break even', 'punto de equilibrio', 'ltv', 'cac', 'ingresos', 'inversion', 'rentabilidad', 'negocio')) {
            return `
                <strong>Modelo Financiero y Unit Economics de CUDI:</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.6;">
                    📈 <strong>3 Escenarios Proyectados:</strong><br>
                    &bull; <strong>Conservador:</strong> 1.25M € facturación (Break-even Mes 16)<br>
                    &bull; <strong>Base / Moderado:</strong> 2.82M € facturación (Break-even Mes 14 • EBITDA 24%)<br>
                    &bull; <strong>Optimista:</strong> 4.48M € facturación (Break-even Mes 11)<br>
                    🎯 <strong>Unit Economics:</strong> CAC <strong>24.50 €</strong> &bull; LTV <strong>285.00 €</strong> &bull; Ratio <strong>11.6x</strong>
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="window.location.href='simulador-financiero.html'">
                        <i class="fa-solid fa-calculator"></i> Abrir Simulador Financiero Interactivo
                    </button>
                </div>
            `;
        }

        // ---------------------------------------------------------------------
        // 18. PERFIL Y DATOS DE LA MASCOTA
        // ---------------------------------------------------------------------
        if (has('perfil', 'mi mascota', 'quien es mi perro', 'quien es mi gato', 'datos de', 'ficha', 'edad', 'raza')) {
            return `
                <strong>Ficha Digital Sincronizada de ${t.name}:</strong>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin:8px 0; font-size:0.8rem; line-height:1.6;">
                    🐾 <strong>Nombre:</strong> ${t.name} (${t.species})<br>
                    🐕 <strong>Raza y Etapa:</strong> ${t.breed} &bull; ${t.age}<br>
                    ⚖️ <strong>Peso:</strong> ${t.weight} kg &bull; <strong>Energía:</strong> ${t.energy}<br>
                    🥣 <strong>Alimentación:</strong> ${t.food}<br>
                    ❤️ <strong>Estado Actual:</strong> ${t.bpm} bpm &bull; ${t.temp} &bull; ${t.locationZone}
                </div>
                <div class="ai-actions-wrap">
                    <button class="ai-btn-action primary" onclick="CudiAI.goToProfileTab()">
                        <i class="fa-solid fa-id-card"></i> ${inDemo ? 'Abrir Perfil en App' : 'Abrir Perfil de Mascota en Web'}
                    </button>
                    <button class="ai-btn-action secondary" onclick="CudiAI.goToMetrics()">
                        <i class="fa-solid fa-chart-line"></i> ${inDemo ? 'Ver Métricas en App' : 'Ver Métricas en Web'}
                    </button>
                </div>
            `;
        }

        if (strictOnly) return null;

        // ---------------------------------------------------------------------
        // 19. RESPUESTA CLÍNICA INTELIGENTE CON TELEMETRÍA EN VIVO PARA CONSULTAS ABIERTAS
        // ---------------------------------------------------------------------
        const ragContext = this.retrieveRAGContext(rawQuery);
        return `
            <div class="ai-source-badge"><i class="fa-solid fa-brain"></i> Diagnóstico Contextual CUDI &bull; ${t.name}</div><br>
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
                <button class="ai-btn-action secondary" onclick="CudiAI.goToHealthTab()">
                    <i class="fa-solid fa-syringe"></i> ${inDemo ? 'Ver Vacunas en App' : 'Ver Vacunas en Web'}
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
