import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function chatPDFUpload(req, res) {
    
    if (req.method === 'POST') {
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
    
            const filesDir = path.join(process.cwd(), 'app', 'server', 'files');
            if (!fs.existsSync(filesDir)) {
                fs.mkdirSync(filesDir, { recursive: true });
            }

            const savedFilePath = path.join(filesDir, file.originalFilename);
            fs.renameSync(file.filepath, savedFilePath);

            const formData = new FormData();
            formData.append("file", fs.createReadStream(savedFilePath));

            const apiUrl = "https://api.chatpdf.com/v1/sources/add-file";
            const response = await fetch(apiUrl, {
                method: "POST",
                body: formData,
                headers: {
                    "x-api-key": process.env.CHATPDF_API_KEY,
                    ...formData.getHeaders(),
                },
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
            }
    
            const {sourceId} = await response.json()
    
            fs.unlinkSync(savedFilePath);
            res.status(200).json({ message: 'File uploaded successfully', id: sourceId })
        } catch (error) {
            res.status(500).json({ error: "Error uploading file to chatPDF. " + error.message });   
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
