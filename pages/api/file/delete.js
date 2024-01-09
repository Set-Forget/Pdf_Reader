import OpenAI from "openai";

export default async function handlerDelete(req, res) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { fileId } = req.body;
  if (!fileId || typeof fileId !== 'string') {
    res.status(400).json({ error: "Invalid or missing fileId." });
    return;
  }

  try {
    const file = await openai.files.del(fileId);
    res.status(200).json({ message: 'File deleted successfully', file: file });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting file." });
  }
}
