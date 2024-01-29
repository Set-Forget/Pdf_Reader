import { getAssistant } from "@/server/assistant";

export default async function handlerAssister(req, res) {
    if (req.method === 'GET') {
        try {
            const assistant = await getAssistant()
            res.status(200).json(assistant)
        } catch (error) {
            res.status(500).json({ error: 'Error del servidor' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
