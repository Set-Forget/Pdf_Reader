'use client'
import { useState, useRef } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import MessageModal from "./MessageModal";
import FilesModal from "./FilesModal";

function HamburguerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isFilesModalOpen, setIsFilesModalOpen] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    uploadFile(file);
  };

  const uploadFile = async (file) => {
    setIsLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      let response = await axios.post(
        "https://11b7-2600-1f18-762e-6b00-f71e-4c67-c445-5932.ngrok-free.app/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const base64 = reader.result.split(",")[1]; 
          const gsFormData = new FormData();
          gsFormData.append("action", "upload");
          gsFormData.append("fileData", base64);
          gsFormData.append("fileName", file.name);
          gsFormData.append("mimeType", file.type);

          const response = await axios.post(
            "https://script.google.com/macros/s/AKfycbxKzgFuBbqI2UsZXJDzR-VcIa1T6eCByAb6wNN65ouFw8ZIr8rU_EMH8TVF3_JZ_LOu1g/exec",
            gsFormData
          );

          if (response.data.success) {
            setMessage("File uploaded successfully ");
            setIsLoading(false); 
          } else {
            throw new Error(
              response.data.error || "Failed to upload to Google Drive"
            );
          }
        };
      } else {
        throw new Error("Failed to upload to your server");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file");
      setIsLoading(false);

    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="relative">
      {isLoading && <Spinner />}
      {message && (
        <MessageModal message={message} onClose={() => setMessage(null)} />
      )}

      <FilesModal
        isOpen={isFilesModalOpen}
        onClose={() => setIsFilesModalOpen(false)}
      />

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 p-2 rounded"
      >
        ☰
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200">
          <button
            onClick={() => setIsFilesModalOpen(true)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            View Files
          </button>
          <button
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={triggerFileInput}
          >
            Upload File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
}

export default HamburguerMenu;
