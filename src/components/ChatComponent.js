import { useState, useRef } from "react";
import axios from "axios";
import HamburguerMenu from "./HamburgerMenu";

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isIframeOpen, setIsIframeOpen] = useState(false);
  const [fileInfo, setFileInfo] = useState({});

  const openPdf = (url) => {
    setPdfUrl(url);
  };

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

        const infoRegex =
          /^Information: The information provided is from the file '(.+?)', page \d+\.$/m;
        const infoMatch = infoRegex.exec(data.message);
        console.log(infoMatch);
        if (infoMatch) {
          const fileInfo = infoMatch[1].split(".");
          const filename = fileInfo[0];
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
            const modifiedMessage = `Information: The information provided is from the file <span class="pdf-link" data-url="${viewerUrl}">${file.name}</span>, page ${pageNum}`;
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

  const closePdf = () => {
    setIsIframeOpen(false);
  };

  const handlePdfClick = (e) => {
    const url = e.target.getAttribute("data-url");
    if (url) {
      setPdfUrl(url);
      setIsIframeOpen(true);
    } else {
      console.error("URL no encontrada");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        setIsLoading(true);
        const response = await axios.post(
          "https://11b7-2600-1f18-762e-6b00-f71e-4c67-c445-5932.ngrok-free.app/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.data.message) {
          alert("File uploaded successfully");
        }

        setSelectedFile(null);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
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
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-500 italic">No PDF selected</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatComponent;
