import endpoints from "@client/utils/endpoints";

export default async function getChatResponse(threadId, runId) {
    
    try {
        const urlChat = endpoints.chat.message
        const obj = {
            threadId: threadId,
            runId: runId
        }
        const response = await fetch(urlChat, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        })
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al obtener el asistente:', error);
    }
}
