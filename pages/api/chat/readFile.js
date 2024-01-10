import { updateFileToRead } from "@/server/assistant";

export default async function handlerAssistantReadFile(req, res) {
    const selectedFileId = req.body.selectedFileId;
    const assistantId = req.body.assistantId;
    if (req.method === 'POST') {
        try {
            const assistant = await updateFileToRead(assistantId, selectedFileId)
            res.status(200).json(assistant)
        } catch (error) {
            res.status(500).json({ error: 'Error del servidor' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
