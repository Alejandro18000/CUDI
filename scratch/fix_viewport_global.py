import os
import re

def fix_viewport(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Proteger contra etiquetas mal formadas o sin comillas
                new_content = re.sub(
                    r'<meta name=["\']?viewport["\']? content=["\']?width=device-width,\s*initial-scale=1\.0["\']?>',
                    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                    content,
                    flags=re.IGNORECASE
                )
                
                if content != new_content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed viewport in {file}")

if __name__ == "__main__":
    fix_viewport(".")
