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
        files: "https://script.google.com/macros/s/AKfycbz6VzWyjBIXQguEkzk_oS9gQiGWOuZEHDsJh8j0JZiBWRSpUuiKcD1dg647-DIYnKBhGQ/exec",
    },
    files: {
        urlBase: "https://script.google.com/macros/s/AKfycbxKzgFuBbqI2UsZXJDzR-VcIa1T6eCByAb6wNN65ouFw8ZIr8rU_EMH8TVF3_JZ_LOu1g/exec?",
        list: "route=getFiles"
    }
}

export default endpoints