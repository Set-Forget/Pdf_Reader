import endpoints from "../utils/endpoints";

function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject("No file provided");
      }
  
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        resolve({
          name: file.name,
          base64: base64,
          type: file.type
        });
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsDataURL(file);
    });
}

export default async function UploadFileAppscript(file) {
    const fileProcesed = await readFileAsBase64(file)
    const formData = new FormData();
    formData.append("action", "upload");
    formData.append("fileData", fileProcesed.base64);
    formData.append("fileName", fileProcesed.name);
    formData.append("mimeType", fileProcesed.type);

    try {
        const urlAppscript = endpoints.files.urlBase
        const response = await fetch(urlAppscript, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Error en la carga de archivos')
        }
        return await response.json()
    } catch (error) {
       console.error('Error al cargar el archivo en drive: ', error);
    }
    return null
}