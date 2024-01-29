import endpoints from "../utils/endpoints";

export async function fetchAssistant() {
    try {
        const response = await fetch( endpoints.chat.assistant );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al obtener el asistente:', error);
    }
}
