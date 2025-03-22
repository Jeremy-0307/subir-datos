import os
import subprocess
import urllib.request
import zipfile
import shutil
import pandas as pd

# 1. Descargar e instalar npm en Windows
def install_node_npm():
    node_installer_url = "https://nodejs.org/dist/v20.9.0/node-v20.9.0-x64.msi"  # Cambia esto si hay una nueva versión
    node_installer_path = "node_installer.msi"
    
    print("Descargando Node.js y npm...")
    urllib.request.urlretrieve(node_installer_url, node_installer_path)
    
    print("Instalando Node.js y npm...")
    subprocess.run(["msiexec", "/i", node_installer_path, "/quiet", "/norestart"], check=True)
    
    print("Eliminando instalador...")
    os.remove(node_installer_path)

# 2. Descargar el paquete zip del repositorio
def download_and_extract_zip():
    repo_url = "https://github.com/Jeremy-0307/subir-datos/archive/refs/heads/main.zip"
    zip_path = "subir-datos.zip"
    
    print("Descargando el proyecto...")
    urllib.request.urlretrieve(repo_url, zip_path)
    
    print("Descomprimiendo el archivo...")
    with zipfile.ZipFile(zip_path, "r") as zip_ref:
        zip_ref.extractall(".")
    
    print("Eliminando archivo zip...")
    os.remove(zip_path)

    # La carpeta extraída tendrá un nombre como "subir-datos-main", la renombramos
    extracted_folder = "subir-datos-main"
    if os.path.exists(extracted_folder):
        shutil.move(extracted_folder, "subir-datos")

# 3. Crear un archivo funciones.xlsx en la carpeta de Descargas
def create_excel_file():
    home = os.path.expanduser("~")  # Carpeta del usuario
    downloads_folder = os.path.join(home, "Downloads" if os.name == "nt" else "Descargas")

    # Si la carpeta no existe (caso de Linux o configuraciones personalizadas), usar "Downloads"
    if not os.path.exists(downloads_folder):
        downloads_folder = os.path.join(home, "Downloads")

    file_path = os.path.join(downloads_folder, "funciones.xlsx")

    print("Creando funciones.xlsx en la carpeta de Descargas...")
    data = { 
        "funciones": ["created", "lastUpdate", "currentLocation", "contacts", "tagIds", "tags", "cellPhone"],
        "type": ["number", "number", "json", "array", "array", "array", "string"]
    }
    
    df = pd.DataFrame(data)
    df.to_excel(file_path, index=False)
    
    print("Archivo funciones.xlsx creado en:", file_path)

# 4. Entrar en la carpeta del proyecto y ejecutar npm install
def install_npm_dependencies():
    project_path = os.path.join("subir-datos", "app")
    
    print(f"Entrando en la carpeta {project_path}...")
    os.chdir(project_path)
    
    print("Ejecutando npm install...")
    subprocess.run(["npm", "install"], shell=True, check=True)

# Ejecutar las funciones en orden
if __name__ == "__main__":
    install_node_npm()
    download_and_extract_zip()
    create_excel_file()
    install_npm_dependencies()
    
    print("Proceso completado con éxito. ✅")
