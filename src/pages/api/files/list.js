import endpoints from '../endpoints';

const getFileList = async (req, res) => {

  if (req.method === 'GET') {
    const baseUrl = endpoints.files.urlBase;
    const endpoint = endpoints.files.list;
    const files = await fetch(baseUrl + endpoint)

    res.status(200).json(files);
  } else {
    // Maneja cualquier otro tipo de solicitud HTTP
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default getFileList
