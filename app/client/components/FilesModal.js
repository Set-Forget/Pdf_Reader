import React, { useState, useEffect } from "react";
import axios from "axios";
import MessageModal from "./MessageModal";
import Spinner from "./Spinner";

function FilesModal({ isOpen, onClose }) {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmation, setConfirmation] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const headers = {
          "ngrok-skip-browser-warning": "true",
        };

        const response = await axios.get(
          "https://11b7-2600-1f18-762e-6b00-f71e-4c67-c445-5932.ngrok-free.app/files",
          { headers }
        );

        console.log("Response:", response);

        const filesData = response.data.files || {};

        const filesArray = Object.entries(filesData).map(([name, id]) => ({
          name,
          id,
        }));

        setFiles(filesArray);
        console.log(filesArray);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching files:", error);
        setFiles([]);
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchFiles();
    }
  }, [isOpen]);

  const handleDeleteConfirmation = (fileId, filename) => {
    setConfirmation({ fileId, filename });
  };

  const handleDelete = async (fileId, filename) => {
    setIsLoading(true);
    setMessage("");
    try {
      await axios.delete(
        "https://11b7-2600-1f18-762e-6b00-f71e-4c67-c445-5932.ngrok-free.app/file",
        { data: { fileId, filename } }
      );

      const gsFormData = new FormData();
      gsFormData.append("action", "delete");
      gsFormData.append("fileName", filename);

      const response = await axios.post(
        "https://script.google.com/macros/s/AKfycbxKzgFuBbqI2UsZXJDzR-VcIa1T6eCByAb6wNN65ouFw8ZIr8rU_EMH8TVF3_JZ_LOu1g/exec",
        gsFormData
      );

      if (response.data.success) {
        setMessage("File deleted successfully");
        setConfirmation(null);
        setFiles(files.filter((file) => file.id !== fileId));
      } else {
        throw new Error(
          response.data.error || "Failed to delete from Google Drive"
        );
      }

      setFiles(files.filter((file) => file.id !== fileId));
    } catch (error) {
      console.error("Error deleting file:", error);

      setMessage("Error deleting file.");
    } finally {
      setIsLoading(false);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      {isLoading && (
        <div className="absolute z-60 flex justify-center items-center w-full h-full">
          <Spinner />
        </div>
      )}
      <div className="bg-white p-6 m-4 rounded-lg shadow-xl w-1/2 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-lg font-bold text-gray-700 hover:text-gray-500"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Files</h2>
        {files.length > 0 ? (
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-2 rounded-lg bg-blue-100"
              >
                <span>{file.name}</span>
                <button
                  onClick={() => handleDeleteConfirmation(file.id, file.name)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 mt-4">No files to display.</div>
        )}
      </div>
      {!isLoading && confirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <p className="text-xl font-semibold mb-4">
              Are you sure you want to delete {confirmation.filename}?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() =>
                  handleDelete(confirmation.fileId, confirmation.filename)
                }
                className="px-4 py-2 mr-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmation(null)}
                className="px-4 py-2 bg-gray-300 text-gray-600 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {message && (
        <MessageModal message={message} onClose={() => setMessage(null)} />
      )}
    </div>
  );
}

export default FilesModal;
