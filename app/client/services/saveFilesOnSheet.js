import endpoints from "@/client/utils/endpoints";

export default async function SaveFilesIds(fileId, assistantFileId ) {
    const formData = new FormData();
    formData.append("action", "upload");
    formData.append("fileId", fileId);
    formData.append("assistantFileId", assistantFileId);

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