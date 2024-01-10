import endpoints from "@client/utils/endpoints";

export default async function RenewAsistantFile(selectedFileId, assistantId) {
    try {  
        const urlChat = endpoints.chat.renewFile
        const obj = {
            selectedFileId: selectedFileId,
            assistantId: assistantId
        }
        const response = await fetch(urlChat, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        })
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return await response.json()
    } catch (error) {
       console.error('Error en la respuesta del chat: ', error);
    }
    return null
}