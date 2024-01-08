import formidable from 'formidable';
import fs from 'fs';
import { OpenAI } from 'openai';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    const data = await new Promise(function(resolve, reject) {
        const form = formidable({})
    
        form.parse(req, function(err, fields, files) {
          if (err) return reject(err)
          resolve({ fields, files })
        });
    });

    const file = data.files.file[0]
    if (!file) {
        return res.status(400).json({ error: "No file uploaded." })
    }
    
    if (!file.path) {
        return res.status(400).json({ error: "File path is undefined." })
    }
    
    const filePath = file.filepath
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openaiFile = await openai.files.create({
        file: fs.createReadStream(filePath),
        purpose: "assistants",
    });

    console.log(openaiFile);
    res.status(200).json({ message: 'File uploaded successfully', fileId: openaiFile.id })
}
