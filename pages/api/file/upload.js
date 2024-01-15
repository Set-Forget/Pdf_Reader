import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handlerUpload(req, res) {
    try {
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

        const tempDir = "/temp";
        const savedFilePath = path.join(tempDir, file.originalFilename);
        // const savedFilePath = `/app/server/files/${file.originalFilename}`;
        fs.renameSync(file.filepath, savedFilePath);

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const openaiFile = await openai.files.create({
            file: fs.createReadStream(savedFilePath),
            purpose: "assistants",
        });
        
        fs.unlinkSync(savedFilePath);
        res.status(200).json({ message: 'File uploaded successfully', fileId: openaiFile.id })
    } catch (error) {
        console.error("Error uploading file to OpenAI:", error);
        res.status(500).json({ error: "Error uploading file." });
    }
}
