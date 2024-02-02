import { useState } from "react";
import { useContextHook } from "@/client/context/FilesContext";
import { toast } from 'sonner';
import UploadFileAppscript from "@/client/services/uploadFileAppscript";
import SaveFilesIds from "@/client/services/saveFilesOnSheet";
import { ChatFile } from "@/server/models/files";
import endpoints from "@/client/utils/endpoints";

const AddFileBtn = () => {
  const [onLoad, setLoading] = useState(false)

  const {
    setFiles, files
  } = useContextHook()

  const uploadFileChatPdf = async (file) => {
    const formData = new FormData()
    formData.append("file", file)
    const response = await fetch(endpoints.chatPDF.upload, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    return await response.json()
  }

  const handleSubmit = async (file) => {
    if (!file) return;
    setLoading(true)
    try {

      const driveResp = await UploadFileAppscript(file)
      if ( !driveResp.success ) throw new Error(driveResp.error)

      const chatPdfResp = await uploadFileChatPdf(file)
      const sourceId = chatPdfResp.sourceId

      let fileType = file.type
      if (file.type == "application/pdf") fileType = "PDF"
      if (file.type == "application/vnd.google-apps.spreadsheet" || file.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ) fileType = "Sheet"
      
      const newFile = new ChatFile(driveResp.fileName, driveResp.fileId, driveResp.fileUrl, fileType, sourceId)

      SaveFilesIds(newFile, sourceId, null)
      setFiles([newFile, ...files])

    } catch (error) {
      console.error('Error al subir el archivo:', error);
      toast.error('Error on uploading file')
    } finally {
      setLoading(false)
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleSubmit(file);
  };

  return (
    <form
      className="bg-red-900 text-white rounded-xl flex gap-2 places-items-center justify-center transition ease-in-out delay-150 hover:bg-gray-700 hover:scale-110 duration-300"
    >
      {
        onLoad ? <div className="onUpload bg-gray-200 rounded-xl text-xl px-4 py-2"></div> :
          <label htmlFor="selectFileToUpload" className="flex gap-2 cursor-pointer px-4 py-2">
            <input
              type="file"
              name="selectFileToUpload"
              id="selectFileToUpload"
              className="hidden"
              onChange={handleFileChange}
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.5 21.5q-.425 0-.862-.262T4 20.625L1.5 16.25q-.2-.35-.2-.862t.2-.863L8 3.375q.2-.35.638-.613T9.5 2.5h5q.425 0 .863.263t.637.612l4.55 7.8q-.575-.15-1.187-.2t-1.213.05L14.35 4.5h-4.7L3.3 15.4l2.35 4.1h7.9q.275.575.638 1.075t.837.925zM7.25 17l-.725-1.275L11.1 7.75h1.8l2.525 4.4q-.425.325-.787.712t-.638.813L12 10.2L9.25 15h4.1q-.175.475-.262.975T13 17zM18 21v-3h-3v-2h3v-3h2v3h3v2h-3v3z" /></svg>
            Upload File
          </label>
      }
    </form>
  );
};

export default AddFileBtn;
