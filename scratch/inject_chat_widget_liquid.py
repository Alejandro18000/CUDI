import os
import re

# Liquid Glass AI Widget Template
AI_WIDGET_TEMPLATE = """    <!-- Global AI Chat Widget (Liquid Glass Edition) -->
    <div class="cudi-chat-widget" style="position:fixed; bottom:30px; right:30px; z-index:10000;">
        <div class="cudi-chat-btn" onclick="toggleAIChat()" style="overflow:hidden; padding:3px; background:white; width:65px; height:65px; border-radius:50%; box-shadow:0 10px 25px rgba(0,0,0,0.25); cursor:pointer; border: 3px solid #0077b6;">
            <img src="logo.jpeg" alt="CUDI AI" style="width:100%; height:100%; object-fit:contain; border-radius:50%;">
        </div>
        <div class="cudi-chat-panel liquid-glass-card" id="cudi-chat-panel" style="display:none; position:absolute; bottom:85px; right:0; width:360px; border-radius:30px; box-shadow:0 20px 45px rgba(0,0,0,0.2); overflow:hidden; border:1px solid rgba(255,255,255,0.2); flex-direction:column;">
            <div class="chat-panel-header" style="background:#0077b6; color:white; padding:18px; position:relative; display:flex; align-items:center;">
                <div class="title" style="font-weight:800; font-size:1.05rem; flex:1;"><i class="fa-solid fa-shield-dog"></i> CUDI Triaje IA</div>
                <div class="status" style="font-size:0.8rem; color:#e0f2fe; margin-right:30px; font-weight:600;"><span style="display:inline-block; width:8px; height:8px; background:#10b981; border-radius:50%; margin-right:5px;"></span>24/7 Activo</div>
                <div style="position:absolute; top:-25px; right:-15px; width:75px; height:75px; border-radius:50%; border:4px solid #F8FAFC; overflow:hidden; background:white; z-index:10; box-shadow:0 10px 20px rgba(0,0,0,0.2);">
                   <img src="avatar-mascota-perfil-gemelo-digital.png" alt="Perfil" style="width:100%; height:100%; object-fit:cover;">
                </div>
                <button onclick="toggleAIChat()" style="position:absolute; top:18px; right:15px; background:transparent; border:none; color:white; cursor:pointer; font-size:1.1rem;"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="chat-panel-body" id="chat-body" style="height:320px; padding:15px; overflow-y:auto; background:rgba(248,250,252,0.85); display:flex; flex-direction:column;">
                <div style="background:white; padding:12px 15px; border-radius:15px; margin-bottom:12px; font-size:0.9rem; color:#333; border:1px solid #f1f5f9; border-top-left-radius:0; box-shadow:0 2px 5px rgba(0,0,0,0.02); line-height:1.5;">
                    ¡Hola! Soy CUDI, tu asistente preventivo. Estoy conectado a la telemetría inteligente.<br><br><b>¿Qué necesitas?</b> Puedes probar palabras como *"vómito"*, *"fiebre"*, *"comprar"*, o *"paseo"*.
                </div>
            </div>
            <div class="chat-panel-footer" style="padding:15px; background:rgba(255,255,255,0.9); border-top:1px solid rgba(0,0,0,0.05); display:flex; gap:10px; align-items:center;">
                <input type="text" id="chat-input" placeholder="Pregúntame sobre su salud..." onkeypress="handleChatEnter(event)" style="flex:1; padding:12px 16px; border-radius:30px; border:1px solid #cbd5e1; outline:none; font-family:inherit; font-size:0.9rem; background:white; transition:all 0.3s;" onfocus="this.style.borderColor='#0077b6';">
                <button onclick="sendChatMessage()" style="background:#0077b6; color:white; border:none; width:45px; height:45px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-paper-plane"></i></button>
            </div>
        </div>
    </div>"""

def inject():
    html_files = [f for f in os.listdir('.') if f.endswith('.html') and 'BACKUP' not in f]
    count = 0
    
    for filename in html_files:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if widget exists (different versions)
        if '<div class="cudi-chat-widget"' in content:
            # Replace existing
            content = re.sub(r'<!-- Global AI Chat Widget.*?</div>\s*</div>', AI_WIDGET_TEMPLATE, content, flags=re.DOTALL)
        else:
            # Insert after <body>
            content = re.sub(r'(<body.*?>)', r'\1\n' + AI_WIDGET_TEMPLATE, content, flags=re.IGNORECASE)

        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Injected: {filename}")
        count += 1
        
    print(f"Total files processed: {count}")

if __name__ == "__main__":
    inject()
