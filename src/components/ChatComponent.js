import { useState, useRef, useEffect } from "react";
import axios from "axios";
import HamburguerMenu from "./HamburgerMenu";

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isIframeOpen, setIsIframeOpen] = useState(false);
  const [fileInfo, setFileInfo] = useState({});
  const [availablePdfs, setAvailablePdfs] = useState([]);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: "User: " + input, sender: "user" }]);
      setIsLoading(true);
      let inputToSend = input;
      setInput("");

      try {
        // Obtener la información de los archivos
        const filesInfo = await axios.get(
          "https://script.google.com/macros/s/AKfycbxKzgFuBbqI2UsZXJDzR-VcIa1T6eCByAb6wNN65ouFw8ZIr8rU_EMH8TVF3_JZ_LOu1g/exec?route=getFiles"
        );

        // Enviar la pregunta al chatbot
        const response = await axios.post(
          "https://11b7-2600-1f18-762e-6b00-f71e-4c67-c445-5932.ngrok-free.app/chat",
          {
            question: inputToSend,
          }
        );

        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }

        console.log(filesInfo);
        const data = response.data;
        console.log(data.message);

        const infoRegex = /Information: ([^,]+),/;

        const infoMatch = infoRegex.exec(data.message);
        console.log(infoMatch);
        if (infoMatch) {
          const fileInfo = infoMatch[1].split(".");
          console.log(fileInfo + " fileInfo");
          const filename = fileInfo[1];
          const filetype = fileInfo[1];
          const pageMatch = data.message.match(/page (\d+)/);
          const pageNum = pageMatch ? parseInt(pageMatch[1], 10) : null;

          let file;
          if (filetype === "pdf") {
            file = filesInfo.data.files.pdfs.find((f) =>
              f.name.includes(filename)
            );
          } else if (filetype === "xlsx") {
            file = filesInfo.data.files.excels.find((f) =>
              f.name.includes(filename)
            );
          } else if (filetype === "txt") {
            file = filesInfo.data.files.txts.find((f) =>
              f.name.includes(filename)
            );
          }

          if (file) {
            const viewerUrl = `https://docs.google.com/viewer?srcid=${file.id}&pid=explorer&efh=false&a=v&chrome=false&embedded=true&usp=sharing`;
            setFileInfo({ id: file.id, url: viewerUrl, page: pageNum });
            let modifiedMessage;
            if (pageNum) {
              modifiedMessage = `<span class="pdf-link" data-url="${viewerUrl}">${file.name}</span>, page ${pageNum}`;
            } else {
              modifiedMessage = `<span class="pdf-link" data-url="${viewerUrl}">${file.name}</span>`;
            }
            const messageWithHtml = data.message.replace(
              infoMatch[0],
              modifiedMessage
            );
            console.log(messageWithHtml);
            setPdfUrl(file.id);
            setMessages((messages) => [
              ...messages,
              { text: messageWithHtml, sender: "ia" },
            ]);
          } else {
            setMessages((messages) => [
              ...messages,
              { text: "IA: " + data.message, sender: "ia" },
            ]);
          }
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

  const handlePdfClick = (file) => {
    const viewerUrl = `https://docs.google.com/viewer?srcid=${file.id}&pid=explorer&efh=false&a=v&chrome=false&embedded=true&usp=sharing`;
    setPdfUrl(viewerUrl);
    setIsIframeOpen(true);
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          "https://script.google.com/macros/s/AKfycbxKzgFuBbqI2UsZXJDzR-VcIa1T6eCByAb6wNN65ouFw8ZIr8rU_EMH8TVF3_JZ_LOu1g/exec?route=getFiles"
        );
        setAvailablePdfs(response.data.files.pdfs);
      } catch (error) {
        console.error("Error al obtener archivos:", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-full bg-white border rounded overflow-hidden">
      {/* Contenedor del chat */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col p-4">
        {/* Mensajes del chat */}
        <div className="overflow-auto mb-4 flex-grow" onClick={handlePdfClick}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 my-1 text-sm font-medium rounded-md ${
                message.sender === "user"
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

      {/* Contenedor del visor de PDF */}

      <div className="flex-grow overflow-auto md:w-1/2 bg-gray-100 relative">
        {isIframeOpen && pdfUrl ? (
          <>
            <iframe
              src={pdfUrl}
              className="w-full h-full"
              title="PDF Viewer"
            ></iframe>
            <button
              onClick={() => setIsIframeOpen(false)}
              className="absolute top-2 left-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Close PDF
            </button>
          </>
        ) : (
          <div className="w-full h-full flex justify-center items-center p-4">
            <div className="flex flex-col items-center">
              {availablePdfs.map((file) => ( 
                <button
                  key={file.id}
                  onClick={() => handlePdfClick(file)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                >
                  {file.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatComponent;
