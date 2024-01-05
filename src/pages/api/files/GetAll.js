const getAllFiles = async (req, res) => {

    if (req.method === 'GET') {

      const files = await fetch()
  
      res.status(200).json(files);
    } else {
      // Maneja cualquier otro tipo de solicitud HTTP
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default getAllFiles
  