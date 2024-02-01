export default async function chatPDFDelete(req, res) {
    try {
        const { sourceId } = req.body
        const apiUrl = "https://api.chatpdf.com/v1/sources/delete"
        const opt = {
            "method": "POST",
            "body" : JSON.stringify({
                sources: [sourceId],
            }),
            "headers": {
                "x-api-key": "sec_cnhGjyyl4Z8iqNd63Ld4WgfWjut4VMAo",
                "Content-Type": "application/json",
            },
        }

        const response = await fetch(apiUrl, opt)
        
        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
        }
    
        res.status(200).json({message:"success"})
    } catch (error) {
        res.status(500).json({ error: "Error uploading file to chatPDF. " + error.message });   
    }
}
