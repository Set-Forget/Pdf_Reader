import OpenAI from "openai";

export default async function retrieveAssistant(req, res) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const assistantId = req.body.assistantId;
    const assistant = await openai.beta.assistants.retrieve( assistantId );
    res.json({ success: true, assistant });
  } catch (error) {
    res.status(error.status).json({ success:false, message: error.error.message });
  }  
}
