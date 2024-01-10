import endpoints from "@client/utils/endpoints";

export default async function AskToChat(question, assistantId) {

    try {  
        const urlChat = endpoints.chat.question
        const obj = {
            question,
            assistantId
        }
        const response = await fetch(urlChat, {
            method: 'POST',
            body: JSON.stringify(obj),
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