import OpenAI from "openai";

export default async function handleChatQuestion(req, res) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    try {
        const userQuestion = req.body.question;
        const assistantId = req.body.assistantId;
        const thread = await openai.beta.threads.create();
        await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: userQuestion,
        });

        const run = await openai.beta.threads.runs.create(thread.id, {
            assistant_id: assistantId,
        });

        // Esperar hasta que la respuesta esté completa
        let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
        while (runStatus.status !== "completed") {
            await new Promise(resolve => setTimeout(resolve, 1000));
            runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
        }

        // Obtener la última respuesta del asistente
        const messages = await openai.beta.threads.messages.list(thread.id);
        const lastMessage = messages.data
            .filter(message => message.run_id === run.id && message.role === "assistant")
            .pop();

        res.json({ message: lastMessage ? lastMessage.content[0].text.value : "No response from assistant." });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}
