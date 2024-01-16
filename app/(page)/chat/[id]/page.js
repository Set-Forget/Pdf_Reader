'use client'
import { useEffect, useState } from "react";
import { useContextHook } from "@/client/context/FilesContext";

import FileView from "@/client/components/ChatPage/FileViewer";
import AskToChat from "@/client/services/askChat";
import getChatResponse from "@/client/services/getChatResponse";
import Spinner from "@/client/components/Spinner";
import Dialogue from "@/client/components/ChatPage/dialogeComponent";

function ChatPage() {
  const {
    assistant, isLoadingAssistant, setIsLoadingAssistant
  } = useContextHook()
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    setIsLoadingAssistant(!assistant?.id)
  }, [assistant])

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: "User: " + input, sender: "user" }]);
      setIsLoading(true);
      let inputToSend = input;
      setInput("");

      try {
        // Enviar la pregunta al chatbot
        const startChat = await AskToChat(inputToSend, assistant.id)
        let chatResponseStatus = "incolmplete"
        let chat
        do {
          chat = await getChatResponse(startChat.threadId, startChat.runId)
          console.log(chat);
          chatResponseStatus = chat?.status
          await new Promise(resolve => setTimeout(resolve, 3500));
        } while (chatResponseStatus != "completed");
        
        setMessages((messages) => [
          ...messages,
          { text: "IA: " + chat?.message, sender: "ia" },
        ]);
      } catch (error) {
        console.error("There was an error!", error);
        setMessages((messages) => [
          ...messages,
          { text: "IA: an error occurred.", sender: "ia" },
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
        { isLoadingAssistant ? <Spinner/> : <Dialogue messages={messages} isLoading={isLoading} /> }
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
