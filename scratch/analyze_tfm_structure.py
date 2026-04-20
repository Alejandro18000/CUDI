import zipfile
import xml.etree.ElementTree as ET

def extract_detailed_structure(path):
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    try:
        with zipfile.ZipFile(path) as docx:
            xml_content = docx.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            
            body = tree.find('w:body', ns)
            elements = []
            
            for child in body:
                if child.tag.endswith('p'):
                    # Check for heading style
                    pPr = child.find('w:pPr', ns)
                    style = "Normal"
                    if pPr is not None:
                        pStyle = pPr.find('w:pStyle', ns)
                        if pStyle is not None:
                            style = pStyle.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val')
                    
                    text = "".join([t.text for t in child.findall('.//w:t', ns) if t.text])
                    if text:
                        elements.append({'style': style, 'text': text})
            return elements
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    file_path = "TFM CUDI  3 version 2.docx"
    structure = extract_detailed_structure(file_path)
    # Print the first 100 elements to understand the structure
    for item in structure[:200]:
        print(f"[{item['style']}] {item['text']}")
