import json
import re
import string

def robust_read(path):
    for encoding in ['utf-8', 'utf-16', 'latin-1', 'utf-8-sig']:
        try:
            with open(path, "r", encoding=encoding) as f:
                return f.read()
        except:
            continue
    return ""

def parse_apa_citations(content):
    lines = content.splitlines()
    mapping = {}
    for line in lines:
        match = re.match(r'\[(\d+)\]\s*(.*?)\.\s*\((.*?)\)', line)
        if match:
            num = match.group(1)
            author_full = match.group(2).strip()
            apa_author = author_full.split(',')[0].strip()
            year_match = re.search(r'\d{4}', match.group(3))
            year = year_match.group(0) if year_match else "s.f."
            mapping[num] = f"{apa_author}, {year}"
    return mapping

def clean_text(text):
    if not text: return ""
    text = text.replace('\x00', '')
    replacements = {
        '├í': 'á', '├®': 'é', '├í': 'á', '├│': 'ó', '├║': 'ú', '├▒': 'ñ', '├¡': 'í',
        '├ü': 'Á', '├ë': 'É', '├ì': 'Í', '├ô': 'Ó', '├Ú': 'Ú', '├æ': 'Ñ',
        'ǭ': 'á', 'Ǹ': 'é', 'ǫ': 'í', 'ǲ': 'ó', 'ǧ': 'ú', 'Ǩ': 'ñ',
        'Boletn': 'Boletín', 'espaola': 'española', 'Mster': 'Máster',
    }
    for k, v in replacements.items():
        if len(k) > 1: text = text.replace(k, v)
    text = text.replace('ǭ', 'á').replace('Ǹ', 'é').replace('ǫ', 'í').replace('ǲ', 'ó').replace('ǧ', 'ú').replace('Ǩ', 'ñ')
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def generate_apa_html(content_path, mapping, refs_content):
    with open(content_path, "r", encoding="utf-8") as f:
        elements = json.load(f)
    
    def citation_repl(m):
        nums = re.findall(r'(\d+)', m.group(0))
        citations = []
        for n in nums:
            if n in mapping: citations.append(mapping[n])
            else: citations.append(f"Ref {n}")
        unique_citations = sorted(list(set(citations)))
        return "(" + "; ".join(unique_citations) + ")"

    companies_list = ['Rover', 'Gudog', '11pets', 'Petme', 'Holidog', 'Santevet', 'Tractive', 'Invoxia', 'Kiwoko', 'Tiendanimal', 'Barkibu']
    policies_list = ['Target prioritario', 'Target secundario', 'Formas de pago', 'Política de cancelación', 'Rango de precios', 'Redes sociales', 'Tipos de promociones']

    # Counters
    n1, n2, n3, n4 = 0, 0, 0, 0

    html_parts = []
    html_parts.append("""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>TFM CUDI - Edición Final Numerada APA 7</title>
    <link href="https://fonts.googleapis.com/css2?family=Times+New+Roman&family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root { --margin: 2.54cm; --indent: 1.27cm; --primary: #003366; }
        @page { size: A4; margin: 0; }
        body { font-family: 'Times New Roman', serif; line-height: 2.0; color: #1a1a1a; margin: 0; padding: 0; background: #f8f9fa; }
        .page { background: white; width: 21cm; min-height: 29.7cm; padding: var(--margin); margin: 40px auto; box-shadow: 0 10px 40px rgba(0,0,0,0.1); box-sizing: border-box; position: relative; }
        @media print { body { background: none; } .page { margin: 0; box-shadow: none; border: none; page-break-after: always; } }
        p { margin: 0 0 1.5em 0; text-indent: var(--indent); text-align: justify; font-size: 12pt; }
        
        h1, h2, h3, h4 { font-family: 'Outfit', sans-serif; line-height: 1.2; text-indent: 0; margin: 1.5em 0; counter-reset: none; }
        h1 { font-size: 20pt; font-weight: 700; text-align: center; margin-top: 5em; border-bottom: 5px solid var(--primary); padding-bottom: 20px; }
        h2 { font-size: 16pt; font-weight: 700; margin-top: 3.5em; color: var(--primary); border-left: 10px solid var(--primary); padding-left: 15px; }
        h3 { font-size: 14pt; font-weight: 700; margin-top: 2.5em; border-bottom: 2px solid #eee; padding-bottom: 5px; }
        h4 { font-size: 12pt; font-weight: 700; margin-top: 1.5em; color: #444; }
        .inline-title { font-weight: 700; display: inline; margin-right: 5px; }

        .toc { text-indent: 0; min-height: 29.7cm; }
        .toc h1 { border: none; font-size: 26pt; text-align: center; margin-bottom: 2em; }
        .toc ul { list-style: none; padding-left: 0; }
        .toc li { margin-bottom: 12px; }
        .toc .level-1 { font-weight: 700; font-size: 15pt; margin-top: 35px; border-bottom: 2px solid #ddd; }
        .toc .level-2 { margin-left: 20px; font-weight: 600; font-size: 13pt; color: var(--primary); }
        .toc .level-3 { margin-left: 45px; font-size: 11pt; color: #333; }
        .toc .level-4 { margin-left: 70px; font-size: 10pt; color: #777; font-style: italic; }
        
        .toc a { text-decoration: none; color: inherit; display: flex; align-items: baseline; }
        .toc a::after { content: " " leader(dotted) " " target-counter(attr(href), page); flex: 1; text-align: right; margin-left: 10px; font-weight: normal; font-style: normal; }
        
        .page-number { position: absolute; top: 1cm; right: 1cm; font-size: 11pt; color: #ccc; }
        .cover { text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 29.7cm; border: none; }
        .cover .title { font-weight: bold; font-size: 32pt; margin-bottom: 2em; font-family: 'Outfit', sans-serif; }
        .cover img { width: 260px; margin-bottom: 80px; }
        
        .figure { text-align: center; margin: 3em 0; text-indent: 0; page-break-inside: avoid; }
        .figure img { max-width: 100%; height: auto; border: 1px solid #ddd; }
        .table-wrapper { width: 100%; overflow-x: auto; margin: 2.5em 0; border: 1px solid #eee; }
        table { width: 100%; border-collapse: collapse; font-size: 8.5pt; font-family: 'Outfit', sans-serif; min-width: 650px; }
        th, td { padding: 10px; border: 1px solid #e0e0e0; vertical-align: top; text-align: left; }
        th { background: #f8f9fa; font-weight: 700; }
    </style>
</head>
<body>
    <div class="content-wrapper">
""")

    # Cover & TOC
    html_parts.append("""
    <div class="page cover">
        <div class="page-number">1</div>
        <img src="logo.jpeg" alt="Logo CUDI">
        <p class="title">CUDI: Ecosistema Integral de Bienestar Animal mediante IA y IoT</p>
        <p style="font-size: 20pt;"><b>Sergio Alejandro Ospina Rocha</b></p>
        <br><br>
        <p>Trabajo Final de Máster</p>
        <p>Transformación Digital | 2026</p>
    </div>
    <div class="page toc">
        <div class="page-number">2</div>
        <h1>Tabla de Contenido</h1>
        <div id="dynamic-toc"></div>
    </div>
""")

    # body content
    html_parts.append('<div class="page main-body"><div class="page-number">3</div>')
    
    fig_count = 1
    h_idx = 0
    entered_e1 = False

    for item in elements:
        if item['type'] == 'p':
            text = clean_text(item.get('text', ''))
            if not text and not item.get('images'): continue
            
            text = re.sub(r'(\[\d+(?:,\s*\d+)*\])+', citation_repl, text)
            style = item.get('style', 'Normal')
            segments = item.get('segments', [])
            is_bold = item.get('is_bold', False)
            
            # Identify Entregas
            is_entrega = "ENTREGA" in text.upper() and len(text) < 100
            if not entered_e1 and "MASTER DE ADMINISTRACI" in text.upper():
                n1 += 1; n2, n3, n4 = 0, 0, 0; h_idx += 1
                entered_e1 = True
                html_parts.append(f'<h1 class="h-toc level-1" id="h-{h_idx}">{n1}. ENTREGA 1: DEFINICIÓN Y MODELADO</h1>')
            
            if is_entrega:
                n1 += 1; n2, n3, n4 = 0, 0, 0; h_idx += 1
                html_parts.append(f'<h1 class="h-toc level-1" id="h-{h_idx}">{n1}. {text}</h1>')
            elif style == 'Ttulo' or (is_bold and len(text) < 60 and ("Analisis" in text or "Análisis" in text or "Matriz" in text)):
                n2 += 1; n3, n4 = 0, 0; h_idx += 1
                html_parts.append(f'<h2 class="h-toc level-2" id="h-{h_idx}">{n1}.{n2}. {text}</h2>')
            elif any(c == text for c in companies_list) or style == 'Ttulo1' or style == 'Ttulo2' or (is_bold and len(text) < 50 and not any(p in text for p in policies_list)):
                n3 += 1; n4 = 0; h_idx += 1
                html_parts.append(f'<h3 class="h-toc level-3" id="h-{h_idx}">{n1}.{n2}.{n3}. {text}</h3>')
            # H4: Policies or Minor Subtitles (LENGTH CHECK ADDED)
            elif (any(p in text for p in policies_list) or style == 'Ttulo3' or (is_bold and len(text) < 100)):
                # If it has a colon and is long, split it!
                if ":" in text and len(text) > 80:
                    parts = text.split(":", 1)
                    title_part = parts[0].strip()
                    body_part = parts[1].strip()
                    n4 += 1; h_idx += 1
                    html_parts.append(f'<p><span class="inline-title h-toc level-4" id="h-{h_idx}">{n1}.{n2}.{n3}.{n4}. {title_part}:</span> {body_part}</p>')
                else:
                    n4 += 1; h_idx += 1
                    html_parts.append(f'<h4 class="h-toc level-4" id="h-{h_idx}">{n1}.{n2}.{n3}.{n4} {text}</h4>')
            elif segments and segments[0]['bold'] and ":" in segments[0]['text'] and len(segments[0]['text']) < 150:
                h_idx += 1 # Paragraph headings often don't need full numbering or can be H4 level
                parts = segments[0]['text'].split(":", 1)
                bold_part = clean_text(parts[0])
                rest_p1 = clean_text(parts[1]) if len(parts) > 1 else ""
                rest_all = clean_text("".join([s['text'] for s in segments[1:]]))
                html_parts.append(f'<p><span class="inline-title h-toc level-4" id="h-{h_idx}">{bold_part}:</span> {rest_p1}{rest_all}</p>')
            else:
                if text:
                    text = re.sub(r'\s+', ' ', text)
                    html_parts.append(f"<p>{text}</p>")
            
            for img in item.get('images', []):
                html_parts.append(f'<div class="figure"><div class="figure-label">Figura {fig_count}</div><img src="audit_assets/tfm_images/{img}"></div>')
                fig_count += 1
                
        elif item['type'] == 'table':
            html_parts.append('<div class="table-wrapper"><table>')
            rows = item.get('rows', [])
            if rows:
                html_parts.append('<thead><tr>')
                for cell in rows[0]: html_parts.append(f'<th>{clean_text(cell)}</th>')
                html_parts.append('</tr></thead><tbody>')
                for row in rows[1:]:
                    html_parts.append('<tr>')
                    for cell in row: html_parts.append(f'<td>{clean_text(cell)}</td>')
                    html_parts.append('</tr>')
            html_parts.append('</tbody></table></div>')

    html_parts.append("</div>")

    # References
    html_parts.append("""<div class="page references"><h1 class="h-toc level-1" id="h-refs">Referencias Bibliográficas</h1>""")
    refs_raw = list(dict.fromkeys([clean_text(r) for r in refs_content.splitlines() if r.strip()]))
    refs_raw.sort(key=lambda x: re.sub(r'\[\d+\]\s*', '', x))
    for ref in refs_raw: html_parts.append(f"<p>{re.sub(r'\[\d+\]\s*', '', ref)}</p>")
    html_parts.append("</div></div>")

    # Script for TOC
    html_parts.append("""
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const headings = document.querySelectorAll('.h-toc');
            const toc = document.getElementById('dynamic-toc');
            if (toc && headings.length > 0) {
                const ul = document.createElement('ul');
                headings.forEach((h) => {
                    const li = document.createElement('li');
                    li.className = Array.from(h.classList).find(c => c.startsWith('level-'));
                    const anchor = document.createElement('a');
                    anchor.href = "#" + h.id;
                    anchor.innerHTML = `<span>${h.innerText.trim()}</span>`;
                    li.appendChild(anchor);
                    ul.appendChild(li);
                });
                toc.appendChild(ul);
            }
        });
    </script>
</body>
</html>
""")

    with open("TFM_APA_EDITION.html", "w", encoding="utf-8") as f:
        f.write("".join(html_parts))

if __name__ == "__main__":
    refs_text = robust_read("scratch/tfm_refs_raw.txt")
    mapping = parse_apa_citations(refs_text)
    generate_apa_html("scratch/tfm_detailed_extraction.json", mapping, refs_text)
    print("Numbered & TOC Paged TFM_APA_EDITION.html generated.")
