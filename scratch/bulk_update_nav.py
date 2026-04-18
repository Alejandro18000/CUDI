import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# 1. Update Red de Socios to Partners
# 2. Remove App Demo link
# 3. Add session badge placeholder

target_nav = r'<ul class=nav-links-island style=gap:30px;>.*?</ul>'
new_nav = '''<ul class="nav-links-island" style="gap:25px;">
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="smart-collar-aventuras-sin-sustos.html">Lanzamiento</a></li>
                    <li><a href="index.html#store-grid">Tienda</a></li>
                    <li><a href="index.html#suscripciones">Planes</a></li>
                    <li><a href="index.html#portal-educativo">Artículos</a></li>
                    <li><a href="red-socios-clinicas-veterinarias.html">Partners</a></li>
                    <li id="nav-session-item"></li>
                </ul>'''

target_drawer = r'<ul class="drawer-links">.*?</ul>'
new_drawer = '''<ul class="drawer-links">
            <li><a href="index.html" onclick="toggleMobileMenu()"><i class="fa-solid fa-house"></i> Inicio</a></li>
            <li><a href="smart-collar-aventuras-sin-sustos.html" onclick="toggleMobileMenu()"><i class="fa-solid fa-rocket"></i> Lanzamiento</a></li>
            <li><a href="index.html#store-grid" onclick="toggleMobileMenu()"><i class="fa-solid fa-store"></i> Tienda</a></li>
            <li><a href="index.html#suscripciones" onclick="toggleMobileMenu()"><i class="fa-solid fa-shield-cat"></i> Planes</a></li>
            <li><a href="red-socios-clinicas-veterinarias.html" onclick="toggleMobileMenu()"><i class="fa-solid fa-handshake"></i> Partners</a></li>
            <li id="mobile-session-item"></li>
        </ul>'''

for file_path in html_files:
    if file_path == 'simulador-gemelo-digital-telemetria.BACKUP.html': continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace nav
    content = re.sub(target_nav, new_nav, content, flags=re.DOTALL)
    # Replace drawer
    content = re.sub(target_drawer, new_drawer, content, flags=re.DOTALL)
    
    # Specific fix for "Red de Socios" in other places if any
    content = content.replace('Red de Socios', 'Partners')
    content = content.replace('Red para Profesionales y Entidades de Bienestar', 'Partners y Red de Profesionales')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Updated {len(html_files)} files.")
