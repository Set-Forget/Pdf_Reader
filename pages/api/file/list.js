import OpenAI from "openai";

export default async function handlerListFile(req, res) {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
          });
        const list = await openai.files.list();
        res.status(200).json({ message: 'Get file list successfully', data: list })    
    } catch (error) {
        console.error("Error getting file list from OpenAI:", error);
        res.status(500).json({ error: "Error getting file list." });
    }
}