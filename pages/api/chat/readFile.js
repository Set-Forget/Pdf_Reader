import { updateFileToRead } from "@/server/assistant";

export default async function handlerAssistantReadFile(req, res) {
    const selectedFileId = req.body.selectedFileId;
    const assistantId = req.body.assistantId;
    if (req.method === 'POST') {
        try {
            await updateFileToRead(assistantId, selectedFileId)
            res.status(200)
        } catch (error) {
            res.status(500).json({ error: 'Error del servidor' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
