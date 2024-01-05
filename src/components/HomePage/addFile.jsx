'use client'
import { useRef } from "react";

function AddFileBtnDeprecated() {
    const fileInputRef = useRef(null);
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        uploadFile(file);
      };
    
      const uploadFile = async (file) => {
        // setIsLoading(true);
        // setMessage("");
    
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
                // setMessage("File uploaded successfully ");
                // setIsLoading(false); 
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
        //   setMessage("Error uploading file");
        //   setIsLoading(false);
    
        }
    };

    return(
        <>
        <button
         onClick={triggerFileInput}
         className="px-4 py-2 bg-gray-900 text-white rounded-xl flex gap-2 places-items-center justify-center transition ease-in-out delay-150 hover:bg-gray-700 hover:scale-110 duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.5 21.5q-.425 0-.862-.262T4 20.625L1.5 16.25q-.2-.35-.2-.862t.2-.863L8 3.375q.2-.35.638-.613T9.5 2.5h5q.425 0 .863.263t.637.612l4.55 7.8q-.575-.15-1.187-.2t-1.213.05L14.35 4.5h-4.7L3.3 15.4l2.35 4.1h7.9q.275.575.638 1.075t.837.925zM7.25 17l-.725-1.275L11.1 7.75h1.8l2.525 4.4q-.425.325-.787.712t-.638.813L12 10.2L9.25 15h4.1q-.175.475-.262.975T13 17zM18 21v-3h-3v-2h3v-3h2v3h3v2h-3v3z"/></svg>
            Upload File
        </button>
        <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
        />
        </>
    )
}

const AddFileBtn = () => {

  const handleSubmit = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleSubmit(file);
  };

  return (
    <form
      className="px-4 py-2 bg-gray-900 text-white rounded-xl flex gap-2 places-items-center justify-center transition ease-in-out delay-150 hover:bg-gray-700 hover:scale-110 duration-300"
      >
      <label htmlFor="selectFileToUpload" className="flex gap-2">
        <input 
        type="file"
        name="selectFileToUpload"
        id="selectFileToUpload"
        className="hidden"
        onChange={handleFileChange}
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.5 21.5q-.425 0-.862-.262T4 20.625L1.5 16.25q-.2-.35-.2-.862t.2-.863L8 3.375q.2-.35.638-.613T9.5 2.5h5q.425 0 .863.263t.637.612l4.55 7.8q-.575-.15-1.187-.2t-1.213.05L14.35 4.5h-4.7L3.3 15.4l2.35 4.1h7.9q.275.575.638 1.075t.837.925zM7.25 17l-.725-1.275L11.1 7.75h1.8l2.525 4.4q-.425.325-.787.712t-.638.813L12 10.2L9.25 15h4.1q-.175.475-.262.975T13 17zM18 21v-3h-3v-2h3v-3h2v3h3v2h-3v3z"/></svg>
        Upload File
      </label>
    </form>
  );
};

export default AddFileBtn;
