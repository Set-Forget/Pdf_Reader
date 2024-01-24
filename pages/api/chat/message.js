import OpenAI from "openai";

// // Obtener la última respuesta del asistente
export default async function getChatUpdate(req, res) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    
    try {
        const threadId = req.body.threadId;
        const runId = req.body.runId;
        const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);        
        const messages = await openai.beta.threads.messages.list(threadId);
        const lastMessage = messages.data
        .filter(message => message.run_id === runId && message.role === "assistant")
        .pop();
        
        const msgValue = lastMessage?.content[0]?.text?.value
        
        res.json({ message: lastMessage ? msgValue : "No response from assistant.", status: runStatus.status});
    } catch (error) {
        res.status(error.status).json({ message: error.error.message, error });
    }
}
