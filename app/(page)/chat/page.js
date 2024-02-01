'use client'
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useContextHook } from "@/client/context/FilesContext";

import FileView from "@/client/components/ChatPage/FileViewer";
import Dialogue from "@/client/components/ChatPage/dialogeComponent";

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
        
        // Enviar la pregunta al chatbot
        const chatResponse = await fetch("/api/chatPDF/chat",{
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            sourceId: chatId,
            userMessage: input
          })
        })
        let data = await chatResponse.json()
        
        setMessages((messages) => [
          ...messages,
          { text: "IA: " + data?.content, sender: "ia" },
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