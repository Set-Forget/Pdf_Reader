import endpoints from "@client/utils/endpoints";

export default async function UploadFileOpenai(file) {
    const formData = new FormData();
      formData.append("file", file);
      
    try {  
        const urlChat = endpoints.chat.upload
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
