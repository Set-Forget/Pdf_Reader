export default async function chatPDFMsg(req, res) {
    const req = {
        referenceSources: true,
        sourceId: "src_L6XL9ZzNo8HrAof2Hkh7s",
        messages: [
          {
            role: "user",
            content: "what are the verbal VEO requirements for military personnle?",
          },
        ],
    };

    const apiUrl = "https://api.chatpdf.com/v1/chats/message"
    const content = await fetch(apiUrl, {
        "method": "POST",
        "body" : JSON.stringify(req),
        "headers": {
            "x-api-key": process.env.CHATPDF_API_KEY,
            "Content-Type": "application/json",
          },
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log("Result:", data);
        return data.content
    })
    .catch((error) => {
        console.log("Error:", error);
    });

    return content
}
