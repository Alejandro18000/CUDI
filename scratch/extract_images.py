import zipfile
import os

def extract_images_from_docx(docx_path, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
        
    try:
        with zipfile.ZipFile(docx_path, 'r') as docx:
            for file_info in docx.infolist():
                if file_info.filename.startswith('word/media/'):
                    # Extract only the base filename
                    filename = os.path.basename(file_info.filename)
                    if filename: # Avoid directories
                        output_path = os.path.join(output_folder, filename)
                        with open(output_path, "wb") as f:
                            f.write(docx.read(file_info.filename))
                        print(f"Extracted: {filename}")
        return True
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    docx_file = "TFM CUDI  3 version 2.docx"
    output_dir = "audit_assets/tfm_images"
    extract_images_from_docx(docx_file, output_dir)
