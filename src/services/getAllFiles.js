export default async function GetAllFiles () {
    const baseApi = '/api/files/list'
    try {    
        const response = await fetch(baseApi)
        if (!response.ok) {
            throw new Error('Error en la carga de usuario')
        }
        return await response.json()
    } catch (error) {
       console.error('Error al obtener el listado de archivos: ', error);
    }
    return null
  }