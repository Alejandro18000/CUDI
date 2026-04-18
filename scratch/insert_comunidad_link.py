import os
import re

def insert_comunidad_link():
    target_link = '<li><a href="comunidad-cudi.html">Comunidad</a></li>'
    # Pattern to find the insertion point after "Lanzamiento"
    # Matches: <li><a href="smart-collar-aventuras-sin-sustos.html">Lanzamiento</a></li>
    pattern = re.compile(r'(<li><a href="smart-collar-aventuras-sin-sustos\.html">Lanzamiento</a></li>)')
    
    html_files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'comunidad-cudi.html' and 'BACKUP' not in f]
    
    count = 0
    for filename in html_files:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if already exists
        if 'comunidad-cudi.html' in content:
            print(f"Skipping {filename}: Link already exists.")
            continue
            
        if pattern.search(content):
            new_content = pattern.sub(r'\1\n                    ' + target_link, content)
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
            count += 1
        else:
            print(f"Pattern not found in {filename}")
            
    print(f"Total files updated: {count}")

if __name__ == "__main__":
    insert_comunidad_link()
