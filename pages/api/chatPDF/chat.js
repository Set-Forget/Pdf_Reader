export default async function chatPDFMsg(req, res) {
    try {
        const { sourceId, userMessage } = req.body

        
        const userMsg = {
            referenceSources: true,
            sourceId: sourceId,
            messages: [
              {
                role: "user",
                content: userMessage,
              },
            ],
        };
    
        const apiUrl = "https://api.chatpdf.com/v1/chats/message"
        const response = await fetch(apiUrl, {
            "method": "POST",
            "body" : JSON.stringify(userMsg),
            "headers": {
                "x-api-key": "sec_cnhGjyyl4Z8iqNd63Ld4WgfWjut4VMAo",
                "Content-Type": "application/json",
              },
        })
    
        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
        }
        const content = await response.json()
        res.status(200).json(content)
    } catch (error) {
        res.status(500).json({ error: "Error uploading file to chatPDF. " + error.message });   
    }
}
