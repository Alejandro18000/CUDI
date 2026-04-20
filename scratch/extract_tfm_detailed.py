import zipfile
import xml.etree.ElementTree as ET
import json
import re

def extract_text_from_node(node, ns):
    """Recursively extract text from a node, keeping track of bold/italic segments."""
    parts = []
    for r in node.findall('.//w:r', ns):
        is_bold = r.find('.//w:b', ns) is not None
        t_elements = r.findall('.//w:t', ns)
        for t in t_elements:
            if t.text:
                parts.append({"text": t.text, "bold": is_bold})
    return parts

def extract_tfm_detailed():
    docx_path = 'TFM CUDI  3 version 2.docx'
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
          'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
    
    with zipfile.ZipFile(docx_path) as z:
        # 1. Map relationships to find images
        rel_xml = z.read('word/_rels/document.xml.rels')
        rel_root = ET.fromstring(rel_xml)
        rels = {}
        for r in rel_root.findall('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
            rels[r.get('Id')] = r.get('Target').split('/')[-1]

        # 2. Extract Document Content
        xml_content = z.read('word/document.xml')
        root = ET.fromstring(xml_content)
        
        body = root.find('w:body', ns)
        if body is None:
            print("Error: No body found in document.xml")
            return

        elements = []
        # Iterate through immediate children of body to preserve order (p and tbl)
        for child in body:
            if child.tag == '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p':
                # Process Paragraph
                p_style_elem = child.find('.//w:pStyle', ns)
                style = p_style_elem.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val') if p_style_elem is not None else 'Normal'
                
                text_segments = extract_text_from_node(child, ns)
                full_text = "".join([s['text'] for s in text_segments])
                
                # Check for images in this paragraph
                p_images = []
                drawings = child.findall('.//w:drawing', ns)
                for d in drawings:
                    blips = d.findall('.//{http://schemas.openxmlformats.org/drawingml/2006/main}blip', 
                                     {'a': 'http://schemas.openxmlformats.org/drawingml/2006/main'})
                    for b in blips:
                        r_id = b.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
                        if r_id in rels:
                            p_images.append(rels[r_id])

                elements.append({
                    "type": "p",
                    "style": style,
                    "text": full_text,
                    "segments": text_segments,
                    "images": p_images,
                    "is_bold": all(s['bold'] for s in text_segments) if text_segments else False
                })
                
            elif child.tag == '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tbl':
                # Process Table
                rows = []
                for tr in child.findall('.//w:tr', ns):
                    cells = []
                    for tc in tr.findall('.//w:tc', ns):
                        # A cell can contain multiple paragraphs
                        cell_p_list = []
                        for cell_p in tc.findall('.//w:p', ns):
                            cell_text = "".join([t.text for t in cell_p.findall('.//w:t', ns) if t.text])
                            cell_p_list.append(cell_text)
                        cells.append("\n".join(cell_p_list))
                    rows.append(cells)
                elements.append({
                    "type": "table",
                    "rows": rows
                })

    with open('scratch/tfm_detailed_extraction.json', 'w', encoding='utf-8') as f:
        json.dump(elements, f, ensure_ascii=False, indent=2)
    print(f"Extraction successful: {len(elements)} elements found.")

if __name__ == "__main__":
    extract_tfm_detailed()
