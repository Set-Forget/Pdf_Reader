import endpoints from "@/client/utils/endpoints";

export default async function SaveFilesIds(file, assistantFileId, assistantId ) {

    const formData = new FormData();
    formData.append("action", "upload");
    formData.append("fileId", file.id);
    formData.append("fileName", file.title);
    formData.append("fileUrl", file.url);
    formData.append("fileType", file.type);
    formData.append("assistantFileId", assistantFileId);
    formData.append("assistantId", assistantId);

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