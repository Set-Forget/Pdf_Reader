import { useState, useRef } from "react";
import axios from 'axios'


function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: "User: " + input, sender: "user" }]);
      setIsLoading(true);
      let inputToSend = input
      setInput("");
      try {
        const response = await axios.post("https://3ee5-2600-1f18-762e-6b00-f71e-4c67-c445-5932.ngrok-free.app/test", {
          question: inputToSend,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        setMessages((messages) => [
          ...messages,
          { text: "IA: " + data.message, sender: "ia" },
        ]);
      } catch (error) {
        console.error("There was an error!", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="relative border p-4 rounded h-full flex flex-col bg-white">
      {/* Mensajes del chat */}
      <div className="overflow-auto mb-4 flex-grow">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 my-1 text-sm font-medium rounded-md ${
              message.sender === "user" ? "self-end" : "bg-gray-100 self-start"
            }`}
          >
            {message.text}
          </div>
        ))}

        {isLoading && (
          <div className="overflow-auto mb-4 flex-grow">
            <div className="flex justify-start">
              <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </div>

      {/* Área de entrada de texto */}
      <div className="flex items-center justify-between absolute bottom-4 left-4 right-4">
        <input
          className="border p-2 flex-grow rounded-l-md"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md transition duration-300 ease-in-out ml-4"
          onClick={handleSend}
        >
          Send
        </button>
      </div>

      {/* Botón flotante para subir archivos */}
      <button
        className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-full fixed bottom-16 right-7 z-50 shadow-lg transition-transform transform hover:scale-110 focus:outline-none"
        onClick={handleUploadClick}
        aria-label="Upload file"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      {/* Input oculto para seleccionar archivos */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Notificación de archivo seleccionado */}
      {selectedFile && (
        <div className="fixed bottom-24 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg z-50 shadow-lg transition-all transform">
          <p>
            Selected File:{" "}
            <span className="font-medium">{selectedFile.name}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default ChatComponent;
