import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import os from 'os';

export default async function chatPDFUpload(req, res) {
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

        const tempDir = os.tmpdir()
        const savedFilePath = path.join(tempDir, file.originalFilename)
        fs.renameSync(file.filepath, savedFilePath);
        console.log("temp filepath: ", savedFilePath);

        const apiUrl = "https://api.chatpdf.com/v1/sources/add-file"
        const opt = {
            "method": "POST",
            "body" : JSON.stringify({
                "file": fs.createReadStream(savedFilePath)
            }),
            "headers": {
                "x-api-key": process.env.CHATPDF_API_KEY,
                "Content-Type": "application/json",
            },
        }

        const sourceId = await fetch(apiUrl, opt)
        .then((response) => response.json())
        .then((data) => {
            console.log("Source ID:", data.sourceId);
            return data?.sourceId
        })
        .catch((error) => {
            console.log("Error:", error.message);
        });

        fs.unlinkSync(savedFilePath);
        res.status(200).json({ message: 'File uploaded successfully', fileId: sourceId })
    } catch (error) {
        res.status(500).json({ error: "Error uploading file to chatPDF." });   
    }
}
