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

        res.json({ threadId:thread.id, runId:run.id });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}
