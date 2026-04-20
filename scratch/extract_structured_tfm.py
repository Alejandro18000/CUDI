import zipfile
import xml.etree.ElementTree as ET
import json

def extract_content(path):
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    try:
        with zipfile.ZipFile(path) as docx:
            xml_content = docx.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            body = tree.find('w:body', ns)
            
            elements = []
            
            for child in body:
                if child.tag.endswith('p'):
                    # Paragraph or Heading
                    pPr = child.find('w:pPr', ns)
                    style = "Normal"
                    if pPr is not None:
                        pStyle = pPr.find('w:pStyle', ns)
                        if pStyle is not None:
                            style = pStyle.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val')
                    
                    text_parts = []
                    images = []
                    
                    # Search for text AND drawings
                    for run in child.findall('.//w:r', ns):
                        # Text
                        for t in run.findall('w:t', ns):
                            if t.text:
                                text_parts.append(t.text)
                        
                        # Images (simplified)
                        drawings = run.findall('.//w:drawing', ns)
                        for d in drawings:
                            images.append("IMAGE_FOUND") # We can't easily map the specific image ID here without Relationship parsing
                    
                    text = "".join(text_parts).strip()
                    if text or images:
                        elements.append({
                            'type': 'p',
                            'style': style,
                            'text': text,
                            'has_image': len(images) > 0
                        })
                elif child.tag.endswith('tbl'):
                    # Table
                    elements.append({'type': 'table', 'text': '[Tabla Omita por simplicidad en extracción inicial]'})
            
            return elements
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    file_path = "TFM CUDI  3 version 2.docx"
    content = extract_content(file_path)
    with open("scratch/tfm_content_v2.json", "w", encoding="utf-8") as f:
        json.dump(content, f, ensure_ascii=False, indent=2)
    print("Content extracted to scratch/tfm_content_v2.json")
