'use client'
import { useState } from "react";
import { useContextHook } from "@/client/context/FilesContext";

import FileView from "@/client/components/ChatPage/FileViewer";
import AskToChat from "@/client/services/askChat";

function ChatPage() {
  const {
    selectedFileId,
    assistant, assistantFiles
  } = useContextHook()
  const id = selectedFileId
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: "User: " + input, sender: "user" }]);
      setIsLoading(true);
      let inputToSend = input;
      setInput("");

      try {
        // Enviar la pregunta al chatbot
        const response = await AskToChat(inputToSend, assistant.id)

        const data = response?.data;
        console.log(data.message);

        const infoRegex = /Information: ([^,]+),/;

        const infoMatch = infoRegex.exec(data.message);
        console.log(infoMatch);
        if (infoMatch) {
          const fileInfo = infoMatch[1].split(".");
          console.log(fileInfo + " fileInfo");
          const pageMatch = data.message.match(/page (\d+)/);
          pageMatch ? setPageNum(parseInt(pageMatch[1], 10)) : null;
        } else {
          setMessages((messages) => [
            ...messages,
            { text: "IA: " + data.message, sender: "ia" },
          ]);
        }
      } catch (error) {
        console.error("There was an error!", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePdfClick = () => {
    const viewerUrl = `https://docs.google.com/viewer?srcid=${id}&pid=explorer&efh=false&a=v&chrome=false&embedded=true&usp=sharing`;
    setPdfUrl(viewerUrl);
    setIsIframeOpen(true);
  };

  return (
    <div className="flex flex-col md:flex-row h-full bg-white border rounded overflow-hidden">
      {/* Contenedor del chat */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col p-4">
        {/* Mensajes del chat */}
        <div className="overflow-auto mb-4 flex-grow" onClick={handlePdfClick}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 my-1 text-sm font-medium rounded-md ${message.sender === "user"
                  ? "self-end bg-blue-100"
                  : "bg-gray-100 self-start"
                }`}
            >
              {message.sender === "ia" ? (
                <div dangerouslySetInnerHTML={{ __html: message.text }} />
              ) : (
                message.text
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>

        {/* Área fija de entrada de texto y botones */}
        <div className="mt-auto flex items-center space-x-2 px-2">
          <input
            className="border p-2 rounded-l-md flex-grow"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
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
