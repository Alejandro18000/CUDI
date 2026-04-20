import os
import re

NEW_LINK = "https://www.instagram.com/cudi.ia?igsh=bjdmNXhyeHZvMXo0&utm_source=qr"

# List of old patterns to replace
OLD_PATTERNS = [
    r"https://www\.instagram\.com/cudi\.ai2026/?",
    r"https://instagram\.com/cudi\.ai/?",
    r"https://www\.instagram\.com/cudi\.ai/?"
]

def fix_links():
    count = 0
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    for filename in html_files:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        for pattern in OLD_PATTERNS:
            # Handle both quoted and unquoted cases in HTML
            content = re.sub(pattern, NEW_LINK, content)
            
        if content != original_content:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated: {filename}")
            count += 1
            
    print(f"Total files updated: {count}")

if __name__ == "__main__":
    fix_links()
