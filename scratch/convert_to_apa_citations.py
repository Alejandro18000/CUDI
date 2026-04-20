import json
import re

def parse_apa_citations(refs_path):
    # Try different encodings
    for encoding in ['utf-8', 'utf-16', 'latin-1', 'utf-8-sig']:
        try:
            with open(refs_path, "r", encoding=encoding) as f:
                content = f.read()
            break
        except:
            continue
    
    lines = content.splitlines()
    mapping = {}
    for line in lines:
        # Match [1] Author (Year) ...
        match = re.match(r'\[(\d+)\]\s*(.*?)\.\s*\((.*?)\)', line)
        if match:
            num = match.group(1)
            author_full = match.group(2).strip()
            
            # APA Author logic:
            # If "Gobierno de España" -> "Gobierno de España"
            # If "Ospina Rocha, S. A." -> "Ospina Rocha"
            # If "Santévet" -> "Santévet"
            
            apa_author = author_full.split(',')[0].strip()
            if " " in apa_author and len(apa_author.split(" ")) > 3:
                # Likely an organization, keep full if short, else first part
                pass 
            
            year_match = re.search(r'\d{4}', match.group(3))
            year = year_match.group(0) if year_match else "s.f."
            
            mapping[num] = f"{apa_author}, {year}"
    return mapping

def process_content_to_apa(content_path, mapping):
    with open(content_path, "r", encoding="utf-8") as f:
        content = json.load(f)
    
    new_content = []
    for item in content:
        text = item['text']
        
        # Replace citations like [1], [1][2], [1, 2]
        def repl(m):
            # Extract numbers from [1], [1][2], [1, 2, 3]
            nums = re.findall(r'(\d+)', m.group(0))
            citations = []
            for n in nums:
                if n in mapping:
                    citations.append(mapping[n])
                else:
                    citations.append(f"Ref {n}")
            # Unique and sorted to avoid redundancy (APA style)
            unique_citations = sorted(list(set(citations)))
            return "(" + "; ".join(unique_citations) + ")"
        
        # This regex matches blocks of citations (numeric)
        text = re.sub(r'(\[\d+(?:,\s*\d+)*\])+', repl, text)
        text = re.sub(r'(\[\d+\])+', repl, text)
        
        item['text'] = text
        new_content.append(item)
    return new_content

if __name__ == "__main__":
    mapping = parse_apa_citations("scratch/tfm_refs_raw.txt")
    new_content = process_content_to_apa("scratch/tfm_content_v2.json", mapping)
    with open("scratch/tfm_content_apa.json", "w", encoding="utf-8") as f:
        json.dump(new_content, f, ensure_ascii=False, indent=2)
    print(f"Content converted to APA style citations. Mapping size: {len(mapping)}")
