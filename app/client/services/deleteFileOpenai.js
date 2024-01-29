import endpoints from "@client/utils/endpoints";

export default async function DeleteFileOpenai(fileId) {
    try {  
        const urlChat = endpoints.chat.deleteFile
        const response = await fetch(urlChat, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileId }),
        })
        if (!response.ok) {
            throw new Error('Error al eliminar archivo')
        }
        return await response.json()
    } catch (error) {
       console.error('Error al eliminar el archivo en openai: ', error);
    }
    return null
}