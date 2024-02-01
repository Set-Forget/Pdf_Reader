import endpoints from "../utils/endpoints";

// get Drive's file list 
export default async function GetAllFiles () {
    
    try {    
        const baseUrl = endpoints.chat.files;
        const response = await fetch(baseUrl)
        if (!response.ok) {
            throw new Error('Error en la carga de archivos')
        }
        return await response.json()
    } catch (error) {
       console.error('Error al obtener el listado de archivos: ', error);
    }
    return null
  }