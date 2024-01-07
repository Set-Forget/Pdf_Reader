import endpoints from "@/pages/api/endpoints";

export default async function GetAllFiles () {
    
    try {    
        const baseUrl = endpoints.files.urlBase;
        const endpoint = endpoints.files.list;
        const response = await fetch(baseUrl + endpoint)
        if (!response.ok) {
            throw new Error('Error en la carga de archivos')
        }
        return await response.json()
    } catch (error) {
       console.error('Error al obtener el listado de archivos: ', error);
    }
    return null
  }