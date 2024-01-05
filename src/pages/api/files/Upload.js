import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Configurar el cliente de autenticación de Google
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY,
        },
        scopes: ['https://www.googleapis.com/auth/drive.file'],
      });

      const drive = google.drive({ version: 'v3', auth });

      // Aquí va la lógica para subir el archivo a Google Drive
      // ...

      res.status(200).json({ message: 'Archivo subido con éxito' });
    } catch (error) {
      res.status(500).json({ error: 'Error al subir el archivo' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
