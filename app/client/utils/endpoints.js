const endpoints = {
    chat: {
        create: "/api/chat/create",
        assistant: "/api/chat/assistant",
        question: "/api/chat/question",
        message: "/api/chat/message",
        renewFile: "/api/chat/readFile",
        delete: "/api/chat/delete",
        upload: "https://8894-2600-1f18-762e-6b00-8243-1c75-9919-137c.ngrok-free.app/upload",
        deleteFile: "/api/file/delete",
        files: process.env.SPREADSHEET_API_UR,
    },
    files: {
        urlBase: `${process.env.DRIVE_API_URL}?`,
        list: "route=getFiles"
    }
}

export default endpoints