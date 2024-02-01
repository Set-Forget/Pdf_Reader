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
        files: "https://script.google.com/macros/s/AKfycbw42kyIkKTlUhLkSNevITMbUMC3brTiDlyGsGhTovsZeEdgNweSTJCE3DrnAZk3IpK8Hw/exec", // spreadsheet api
    },
    files: {
        urlBase: "https://script.google.com/macros/s/AKfycbzt7wl2pJmi1vJ_CzlnZQW5RtSFivwzmKNHQy4SSHhNc_fGA-ADOLS5cof7fAb4a764/exec" + "?", // drive api
        list: "route=getFiles"
    }
}

export default endpoints