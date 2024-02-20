import endpoints from "@client/utils/endpoints";

export default async function UploadFileOpenai(file) {
    const formData = new FormData();
      formData.append("file", file);
      
    try {  
        let urlChat = endpoints.chat.upload
        if (file.size < (4*1024*1024)) { urlChat = '/api/file/upload' } // Si el archivo es mas pequeño que 4MB, se redirige al endpoint del proyecto
        
        const response = await fetch(urlChat, {
            method: 'POST',
            body: formData,
        })
        if (!response.ok) {
            throw new Error('Error en la carga de archivos')
        }
        return await response.json()
    } catch (error) {
       console.error('Error al cargar el archivo en openai: ', error);
    }
    return null
}
