import { createAssistant } from "@/server/assistant";

export default async function handlerAssistantCreate(req, res) {
    if (req.method === 'POST') {
        try {
            const name = req.body.assistantName
            const assistant = await createAssistant(name)
            res.status(200).json(assistant)
        } catch (error) {
            res.status(500).json({ error: 'Error del servidor' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
