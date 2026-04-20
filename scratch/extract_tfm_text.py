import zipfile
import xml.etree.ElementTree as ET

def get_docx_text(path):
    """
    Extracts text from a .docx file using standard library zipfile and xml.
    """
    try:
        with zipfile.ZipFile(path) as docx:
            xml_content = docx.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            
            # Namespace for Word elements
            ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            
            text = []
            for p in tree.findall('.//w:p', ns):
                para_text = []
                for t in p.findall('.//w:t', ns):
                    if t.text:
                        para_text.append(t.text)
                text.append("".join(para_text))
            
            return "\n".join(text)
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    file_path = "TFM CUDI  3 version 2.docx"
    content = get_docx_text(file_path)
    # Output only the first 5000 characters to verify
    print(content[:5000])
