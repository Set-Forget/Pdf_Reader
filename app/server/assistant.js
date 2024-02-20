import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const instructions = `You are a personalized pdf reader,
Your goal is to receive my query and search the uploaded files for a specific answer.
It is important that you only respond with information found in the files and not online.
At the end of each answer you must provide the name of the file in which you found the information and the exact page where you found it, all this starting with an information : the information provided is from de file (file X) page (x).
Always provide a single page and not a range of pages.`
const chatModel = "gpt-4-1106-preview"

export async function createAssistant(name = "PDF_READER" ) {

  const assistant = await openai.beta.assistants.create({
    instructions: instructions,
    name: name,
    tools: [{ type: "retrieval" }],
    model: chatModel,
  });

  return assistant
}

export async function listAssistant() {
  const myAssistants = await openai.beta.assistants.list({
    order: "desc",
    limit: "20",
  });

  return myAssistants.data
}

export async function getAssistant() {
    const assistants = await listAssistant()
    let assistant = assistants?.find( a => a.name === 'PDF_READER')
    if ( assistants.length === 0 || !assistant ) assistant = await createAssistant()
    return assistant
}

export async function updateFileToRead(assistantId, fileId) {
  const file_ids = []
  if (fileId) file_ids.push(fileId)
  await openai.beta.assistants.update(assistantId, {
      file_ids: file_ids,
  });
}

async function uploadAssistantFile(assistantId, fileId) {
  const myAssistantFile = await openai.beta.assistants.files.create(
    assistantId,
    {
      file_id: fileId
    }
  );
  return myAssistantFile
}

export async function deleteAssistant(assistantId) {
  const response = await openai.beta.assistants.del(assistantId);
  return response
}
