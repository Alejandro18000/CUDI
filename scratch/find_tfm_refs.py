import zipfile
import xml.etree.ElementTree as ET

def find_references(path):
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    try:
        with zipfile.ZipFile(path) as docx:
            xml_content = docx.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            body = tree.find('w:body', ns)
            
            ref_started = False
            refs = []
            
            for child in body:
                if child.tag.endswith('p'):
                    text = "".join([t.text for t in child.findall('.//w:t', ns) if t.text])
                    if "Bibliografía" in text or "Referencias" in text or "Anexo" in text:
                        ref_started = True
                    if ref_started:
                        refs.append(text)
            return refs
    except Exception as e:
        return [str(e)]

if __name__ == "__main__":
    file_path = "TFM CUDI  3 version 2.docx"
    refs = find_references(file_path)
    # Output with UTF-8 encoding to avoid terminal errors
    import sys
    sys.stdout.reconfigure(encoding='utf-8')
    for line in refs:
        print(line)
