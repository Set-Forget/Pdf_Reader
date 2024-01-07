import formidable from 'formidable';
import fs from 'fs';
import axios from "axios";
import endpoints from '../endpoints';

export default async function handlerUploadFile(req, res) {
  if (req.method === 'POST') {
    const form = formidable({});
    let fields;
    let files;
    try {
      [fields, files] = await form.parse(req);
      console.log("Files: ", files)
      // Leer el archivo y convertirlo a base64
      // const fileData = fs.readFileSync(files.file.filepath);
      // const base64 = fileData.toString('base64');

      // Preparar FormData para la API externa
      const gsFormData = new FormData();
      gsFormData.append("action", "upload");
      // gsFormData.append("fileData", base64);
      gsFormData.append("fileName", files.file.originalFilename);
      gsFormData.append("mimeType", files.file.mimetype);

      // Enviar a la API externa
      const urlAppscript = endpoints.files.urlBase;
      // const response = await axios.post(urlAppscript, gsFormData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });

      // const data = response.data;
      res.status(200).json({ message: 'Archivo subido con éxito', data: gsFormData });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al procesar la carga del archivo' });
      return;
    }
  }
  else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
