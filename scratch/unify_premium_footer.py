import os
import re

CLEAN_FOOTER = """    <footer class="premium-footer">
        <div class="container">
            <div class="footer-grid">
                <!-- Columna 1: Marca (Fase 1) -->
                <div class="footer-col">
                    <a href="index.html" class="logo" style="margin-bottom:30px;display:inline-block;">
                        <img src="logo.jpeg" alt="CUDI" style="height:70px;border-radius:12px;">
                    </a>
                    <p>CUDI es el primer ecosistema integral de salud y bienestar animal impulsado por IA. Monitorizamos, protegemos y conectamos todo el universo de tu compañero hoy para un mañana más sano.</p>
                </div>

                <!-- Columna 2: Recursos (Fase 1) -->
                <div class="footer-col">
                    <h4>Comunidad CUDI</h4>
                    <ul class="footer-links-list">
                        <li><a href="index.html">Inicio</a></li>
                        <li><a href="index.html#store-grid">Tienda Marketplace</a></li>
                        <li><a href="index.html#suscripciones">Planes de Protección</a></li>
                        <li><a href="comunidad-cudi.html">Red Social</a></li>
                        <li><a href="red-socios-clinicas-veterinarias.html">Partners</a></li>
                    </ul>
                </div>

                <!-- Columna 3: Legal (Fase 1) -->
                <div class="footer-col">
                    <h4>Información Legal</h4>
                    <ul class="footer-links-list">
                        <li><a href="terminos-condiciones-app.html">Términos y Condiciones</a></li>
                        <li><a href="politica-cookies-plataforma.html">Política de Cookies</a></li>
                        <li><a href="politica-privacidad-datos-mascotas.html">Política de Privacidad</a></li>
                        <li><a href="politica-devoluciones-smart-collar.html">Devoluciones y Cambios</a></li>
                        <li><a href="legal.html">Información Legal</a></li>
                    </ul>
                </div>

                <!-- Columna 4: Conecta (Fase 1) -->
                <div class="footer-col">
                    <h4>Conecta con nosotros</h4>
                    <p style="margin-bottom:20px;">Recibe consejos de salud preventiva y noticias del ecosistema CUDI.</p>
                    <div style="display:flex; gap:10px; margin-bottom:25px;">
                        <input type="email" placeholder="Tu email..." style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); padding:12px 15px; border-radius:12px; color:white; outline:none; font-family:inherit; font-size:0.9rem; flex:1;">
                        <button style="background:#0077b6; color:white; border:none; padding:12px 20px; border-radius:12px; cursor:pointer; font-weight:700;"><i class="fa-solid fa-paper-plane"></i></button>
                    </div>
                    <div class="footer-socials">
                        <a href="https://www.instagram.com/cudi.ai2026/" target="_blank" class="social-btn"><i class="fa-brands fa-instagram"></i></a>
                        <a href="https://www.facebook.com/Cudi2026" target="_blank" class="social-btn"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="#" class="social-btn"><i class="fa-brands fa-tiktok"></i></a>
                        <a href="#" class="social-btn"><i class="fa-brands fa-youtube"></i></a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2026 CUDI AI Ecosystem S.L. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>"""

def unify_footer():
    directory = "."
    processed_count = 0
    
    for filename in os.listdir(directory):
        if filename.endswith(".html") and not filename.endswith(".BACKUP.html"):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Use regex to find and replace the entire footer block
            new_content = re.sub(
                r'<footer class="premium-footer">.*?</footer>', 
                CLEAN_FOOTER, 
                content, 
                flags=re.DOTALL
            )
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                processed_count += 1
                # print(f"Updated: {filename}")
                
    # print(f"Successfully unified footers in {processed_count} files.")

if __name__ == "__main__":
    unify_footer()
