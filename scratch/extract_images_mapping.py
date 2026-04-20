import zipfile
import xml.etree.ElementTree as ET
import json
import os

def extract_content_with_images(path):
    ns = {
        'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
        'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
    }
    try:
        with zipfile.ZipFile(path) as docx:
            # 1. Map relationships
            rels_xml = docx.read('word/_rels/document.xml.rels')
            rels_tree = ET.fromstring(rels_xml)
            rel_map = {}
            for rel in rels_tree:
                rid = rel.get('Id')
                target = rel.get('Target')
                if 'media/' in target:
                    rel_map[rid] = os.path.basename(target)
            
            # 2. Parse document
            xml_content = docx.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            body = tree.find('w:body', ns)
            
            elements = []
            
            for child in body:
                if child.tag.endswith('p'):
                    pPr = child.find('w:pPr', ns)
                    style = "Normal"
                    if pPr is not None:
                        pStyle = pPr.find('w:pStyle', ns)
                        if pStyle is not None:
                            style = pStyle.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val')
                    
                    text_parts = []
                    found_images = []
                    
                    for run in child.findall('.//w:r', ns):
                        t_tags = run.findall('w:t', ns)
                        for t in t_tags:
                            if t.text:
                                text_parts.append(t.text)
                        
                        # Look for blight/drawing
                        drawings = run.findall('.//w:drawing', ns)
                        for d in drawings:
                            blips = d.findall('.//{http://schemas.openxmlformats.org/drawingml/2006/main}blip')
                            for b in blips:
                                rid = b.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
                                if rid in rel_map:
                                    found_images.append(rel_map[rid])
                    
                    text = "".join(text_parts).strip()
                    if text or found_images:
                        elements.append({
                            'type': 'p',
                            'style': style,
                            'text': text,
                            'images': found_images
                        })
                elif child.tag.endswith('tbl'):
                    elements.append({'type': 'table'})
            
            return elements
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    file_path = "TFM CUDI  3 version 2.docx"
    content = extract_content_with_images(file_path)
    with open("scratch/tfm_content_with_images.json", "w", encoding="utf-8") as f:
        json.dump(content, f, ensure_ascii=False, indent=2)
    print("Content with image filenames extracted.")
