import endpoints from "@client/utils/endpoints";

export async function fetchCreateAssistant(assistantName) {
    try {
        const response = await fetch( endpoints.chat.create, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({assistantName: assistantName}),
        } );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al obtener el asistente:', error);
    }
}
