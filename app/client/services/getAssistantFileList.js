import endpoints from "../utils/endpoints";

// get assistant file list base on files on drive
export default async function GetAssistantFiles () {
    
    try {    
        const baseUrl = endpoints.chat.files;
        const response = await fetch(baseUrl)
        if (!response.ok) {
            throw new Error('Error en la carga de files IDs')
        }
        const jsonData = await response.json()
        const data = jsonData.data
        const list = {}
        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            list[row.fileId] = { assistantId:row.assistantId, assistantFileId: row.assistantFileId }
        }
        return list
    } catch (error) {
       console.error('Error al obtener el listado de archivos: ', error);
    }
    return null
  }