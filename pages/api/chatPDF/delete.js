export default async function chatPDFDelete(req, res) {
    const apiUrl = "https://api.chatpdf.com/v1/sources/delete"
    const opt = {
        "method": "POST",
        "body" : JSON.stringify({
            sources: [sourceId],
          }),
        "headers": {
            "x-api-key": process.env.CHATPDF_API_KEY,
            "Content-Type": "application/json",
          },
    }

    const res = await fetch(apiUrl, opt)
    .then((response) => response.json())
    .then((data) => {
        console.log("Source ID:", data);
        return data
    })
    .catch((error) => {
        console.log("Error:", error.message);
    });
    
    return res
}
