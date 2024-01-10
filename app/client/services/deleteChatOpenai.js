import endpoints from "@client/utils/endpoints";

export default async function DeleteChatOpenai(assistantId) {
    try {  
        const urlChat = endpoints.chat.delete
        const response = await fetch(urlChat, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ assistantId }),
        })
        if (!response.ok) {
            throw new Error('Error al eliminar asistente')
        }
        return await response.json()
    } catch (error) {
       console.error('Error al eliminar el asistente en openai: ', error);
    }
    return null
}