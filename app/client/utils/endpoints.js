const endpoints = {
    chat: {
        urlBase: "https://11b7-2600-1f18-762e-6b00-f71e-4c67-c445-5932.ngrok-free.app/",
        upload: "api/file/upload",
        assistant: "api/chat/assistant",
        deleteFile: "api/file/delete",
        files: "https://script.google.com/macros/s/AKfycbz6VzWyjBIXQguEkzk_oS9gQiGWOuZEHDsJh8j0JZiBWRSpUuiKcD1dg647-DIYnKBhGQ/exec",
    },
    files: {
        urlBase: "https://script.google.com/macros/s/AKfycbxKzgFuBbqI2UsZXJDzR-VcIa1T6eCByAb6wNN65ouFw8ZIr8rU_EMH8TVF3_JZ_LOu1g/exec?",
        list: "route=getFiles"
    }
}

export default endpoints