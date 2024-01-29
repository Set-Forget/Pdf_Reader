async function chatPDFUpload(formData) {    
    const apiUrl = "https://api.chatpdf.com/v1/sources/add-file"
    const opt = {
        "method": "POST",
        "body" : JSON.stringify(formData),
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

    return sourceId
}
