const endpoints = {
    chat: {
        assistant: "api/chat/assistant",
        question: "api/chat/question",
        upload: "api/file/upload",
        deleteFile: "api/file/delete",
        files: "https://script.google.com/macros/s/AKfycbz6VzWyjBIXQguEkzk_oS9gQiGWOuZEHDsJh8j0JZiBWRSpUuiKcD1dg647-DIYnKBhGQ/exec",
    },
    files: {
        urlBase: "https://script.google.com/macros/s/AKfycbxKzgFuBbqI2UsZXJDzR-VcIa1T6eCByAb6wNN65ouFw8ZIr8rU_EMH8TVF3_JZ_LOu1g/exec?",
        list: "route=getFiles"
    }
}

export default endpoints