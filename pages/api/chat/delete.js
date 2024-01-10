import { deleteAssistant } from "@/server/assistant";

export default async function handlerAssistantReadFile(req, res) {
    const assistantId = req.body.assistantId;
    if (req.method === 'DELETE') {
        try {
            const assistant = await deleteAssistant(assistantId)
            res.status(200).json(assistant)
        } catch (error) {
            res.status(500).json({ error: 'Error del servidor' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
