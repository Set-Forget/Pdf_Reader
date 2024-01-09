import endpoints from "@/client/utils/endpoints";

export default async function DeleteFilesOnSheet(fileId) {
    const formData = new FormData();
    formData.append("action", "delete");
    formData.append("fileId", fileId);

    try {
        const urlAppscript = endpoints.chat.files
        const response = await fetch(urlAppscript, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Error en la carga de archivos')
        }
        return await response.json()
    } catch (error) {
       console.error('Error al cargar el archivo en drive: ', error);
    }
    return null
}