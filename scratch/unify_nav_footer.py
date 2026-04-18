import os
import re

# Gold Standard Templates (Sanitized: "Artículos" removed)
NAVBAR_TEMPLATE = """    <nav class="navbar-island">
        <div class="nav-capsule">
            <a href="index.html" class="logo" style="display:flex; align-items:center;">
                <img src="logo.jpeg" alt="CUDI" style="height:55px; width:auto; border-radius: 8px;">
            </a>
            <div class="nav-search-island">
                <i class="fa-solid fa-magnifying-glass" style="color:var(--clr-primary); font-size:0.9rem;"></i>
                <input type="text" placeholder="¿Qué necesita tu compañero hoy?">
            </div>
            <div class="nav-right-island">
                <ul class="nav-links-island" style="gap:25px;">
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="smart-collar-aventuras-sin-sustos.html">Lanzamiento</a></li>
                    <li><a href="comunidad-cudi.html" {active_comunidad}>Comunidad</a></li>
                    <li><a href="index.html#store-grid">Tienda</a></li>
                    <li><a href="index.html#suscripciones">Planes</a></li>
                    <li><a href="red-socios-clinicas-veterinarias.html">Partners</a></li>
                    <li id="nav-session-item"></li>
                </ul>
                <div class="cart-trigger-island" onclick="toggleCart()">
                    <i class="cart-icon-cudi" style="font-size:1.2rem;"></i>
                    <span class="cart-badge" id="global-cart-badge" style="position:absolute;top:-8px;right:-12px;background:var(--clr-primary);color:white;font-size:0.65rem;font-weight:700;border-radius:50px;width:18px;height:18px;display:flex;align-items:center;justify-content:center;border: 2px solid white;">0</span>
                </div>
                <button class="menu-trigger-mobile" onclick="toggleMobileMenu()"><i class="fa-solid fa-bars-staggered"></i></button>
            </div>
        </div>
    </nav>"""

FOOTER_TEMPLATE = """    <footer class="premium-footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <a href="index.html" class="logo" style="margin-bottom:30px;display:inline-block;">
                        <img src="logo.jpeg" alt="CUDI" style="height:70px;border-radius:12px;">
                    </a>
                    <p>CUDI es el primer ecosistema integral de salud y bienestar animal impulsado por IA. Monitorizamos, protegemos y conectamos todo el universo de tu compañero hoy para un mañana más sano.</p>
                </div>
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
                <div class="footer-col">
                    <h4>Conecta con nosotros</h4>
                    <p style="margin-bottom:20px;">Recibe consejos de salud preventiva validados por expertos.</p>
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

MOBILE_DRAWER_TEMPLATE = """        <ul class="drawer-links">
            <li><a href="index.html" onclick="toggleMobileMenu()"><i class="fa-solid fa-house"></i> Inicio</a></li>
            <li><a href="smart-collar-aventuras-sin-sustos.html" onclick="toggleMobileMenu()"><i class="fa-solid fa-rocket"></i> Lanzamiento</a></li>
            <li><a href="comunidad-cudi.html" onclick="toggleMobileMenu()"><i class="fa-solid fa-people-group"></i> Comunidad</a></li>
            <li><a href="index.html#store-grid" onclick="toggleMobileMenu()"><i class="fa-solid fa-store"></i> Tienda</a></li>
            <li><a href="index.html#suscripciones" onclick="toggleMobileMenu()"><i class="fa-solid fa-shield-cat"></i> Planes</a></li>
            <li><a href="red-socios-clinicas-veterinarias.html" onclick="toggleMobileMenu()"><i class="fa-solid fa-handshake"></i> Partners</a></li>
            <li id="mobile-session-item"></li>
        </ul>"""

def unify():
    html_files = [f for f in os.listdir('.') if f.endswith('.html') and 'BACKUP' not in f]
    count = 0
    
    for filename in html_files:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()

        # 1. Update Navbar
        active_com = 'class="active" style="color:var(--clr-primary); font-weight:800;"' if filename == 'comunidad-cudi.html' else ''
        nav_final = NAVBAR_TEMPLATE.format(active_comunidad=active_com)
        content = re.sub(r'<nav class="navbar-island">.*?</nav>', nav_final, content, flags=re.DOTALL)

        # 2. Update Footer
        content = re.sub(r'<footer class="premium-footer">.*?</footer>', FOOTER_TEMPLATE, content, flags=re.DOTALL)
        # Handle cases with footers and class without quotes or with different quotes
        content = re.sub(r'<footer class=premium-footer>.*?</footer>', FOOTER_TEMPLATE, content, flags=re.DOTALL)

        # 3. Update Mobile Drawer
        content = re.sub(r'<ul class="drawer-links">.*?</ul>', MOBILE_DRAWER_TEMPLATE, content, flags=re.DOTALL)

        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Unified: {filename}")
        count += 1
        
    print(f"Total files unified: {count}")

if __name__ == "__main__":
    unify()
