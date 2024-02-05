'use client'
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useContextHook } from "@/client/context/FilesContext";

import FileView from "@/client/components/ChatPage/FileViewer";
import Dialogue from "@/client/components/ChatPage/dialogeComponent";
import endpoints from "@/client/utils/endpoints";

function ChatPage() {
  const query = useSearchParams()
  const fileId = query.get("fileId")
  const chatId = query.get("chatId")

  const {
    setSelectedFileId
  } = useContextHook()

  useEffect(()=>{
    setSelectedFileId(fileId)
  }, [])
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: "User: " + input, sender: "user" }]);
      setIsLoading(true);
      setInput("");
      try {

        if (!chatId || chatId == "undefined") throw new Error("Assistant not found")
        // const chatForm = new FormData()
        // chatForm.append('userMessage', input)
        // chatForm.append('sourceId', chatId)
        // // Enviar la pregunta al chatbot  
        // const apiUrl = endpoints.chatPDF.chat
        // const response = await fetch(apiUrl, {
        //     "method": "POST",
        //     "body" : chatForm,
        // })

        const userMsg = {
              referenceSources: true,
              sourceId: chatId,
              messages: [
                {
                  role: "user",
                  content: input,
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
        
        console.log(response);
        if (!response.ok) {            
          const errorBody = await response.text();
          throw new Error(`Server responded with ${response.status}: ${response.statusText}. Details: ${errorBody}`);
        }

        const data = await response.json()

        const content = data?.content
        const ref = data?.references
        setMessages((messages) => [
          ...messages,
          { text: "IA: " + content, sender: "ia" },
        ]);
      } catch (error) {
        console.error("There was an error!", error);
        setMessages((messages) => [
          ...messages,
          { text: "IA: an error occurred. " + error.message, sender: "ia" },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full bg-white border rounded overflow-hidden">
      {/* Contenedor del chat */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col p-4">
        {/* Mensajes del chat */}
        <Dialogue messages={messages} isLoading={isLoading} />
        {/* Área fija de entrada de texto y botones */}
        <div className="mt-auto flex items-center space-x-2 px-2">
          <input
            className="border p-2 rounded-l-md flex-grow"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>

      <FileView/>
    </div>
  );
}

export default ChatPage;
