import os

modal_html = """
    <!-- PREMIUM REGISTRATION MODAL -->
    <div id="cudi-auth-modal" class="cudi-modal-overlay">
        <div class="cudi-modal-content">
            <div class="modal-header-premium">
                <button onclick="closeAuthModal()" style="position:absolute; top:20px; right:20px; background:transparent; border:none; color:white; cursor:pointer; font-size:1.5rem;"><i class="fa-solid fa-xmark"></i></button>
                <i class="fa-solid fa-shield-dog" style="font-size:2.5rem; margin-bottom:15px;"></i>
                <h2>Únete al Ecosistema CUDI</h2>
                <p style="opacity:0.9; font-size:0.9rem;">Registra a tu mascota para activar su gemelo digital</p>
            </div>
            <div class="modal-body-premium">
                <form onsubmit="handleWebRegister(event)">
                    <div class="cudi-input-group">
                        <label>Nombre de tu compañero</label>
                        <input type="text" id="web-pet-name" class="cudi-input-premium" placeholder="Ej: Luna, Max..." required>
                    </div>
                    <div class="cudi-input-group">
                        <label>Especie</label>
                        <select id="web-pet-type" class="cudi-input-premium">
                            <option value="perro">Perro</option>
                            <option value="gato">Gato</option>
                        </select>
                    </div>
                    <button type="submit" class="btn-primary" style="width:100%; padding:15px; border-radius:12px; font-weight:800; text-transform:uppercase; letter-spacing:1px; margin-top:10px;">Comenzar conexión <i class="fa-solid fa-heart-pulse"></i></button>
                </form>
                <p style="text-align:center; font-size:0.75rem; color:#94a3b8; margin-top:20px;">Al registrarte, aceptas que CUDI cuide de la felicidad de tu mascota 24/7.</p>
            </div>
        </div>
    </div>
"""

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file_path in html_files:
    if file_path in ['index.html', 'mi-mascota.html', 'simulador-gemelo-digital-telemetria.BACKUP.html']: continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<div id="cudi-auth-modal"' in content: continue
    
    # Insert before </body> or before script.js
    if '</body>' in content:
        content = content.replace('</body>', f'{modal_html}\n</body>')
    else:
        content += f'\n{modal_html}'

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Updated {len(html_files)} files with registration modal.")
