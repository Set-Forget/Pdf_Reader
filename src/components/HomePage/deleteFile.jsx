import { useState } from "react"
import { toast } from 'sonner';
import endpoints from "@/pages/api/endpoints";
import { useContextHook } from "@/context/FilesContext";

export default function DeleteFileBtn({file}) {
    const [onDelete, setLoading] = useState(false)

    const { 
        setFiles, files
      } = useContextHook()

      const deleteFileRow = () => {
        const newFileList = files.filter( f => f.id != file.id )
        setFiles(newFileList)
      }
    
    const handleClick = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData();
        formData.append("action", "delete");
        formData.append("fileName", file.title);
        try {
            const url = endpoints.files.urlBase
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            deleteFileRow()
        } catch (error) {
            console.error("Error al intentar borrar el archivo")
            toast.error('Error on deleting file')
        } finally {
            setLoading(false)
        }
    }

    return(
        onDelete ? 
        <div className="px-4 py-2 rounded-xl border">
            <div className="onDelete"/>
        </div>:
        <button 
         className="px-4 py-2 rounded-xl border hover:border-red-900"
         onClick={handleClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.5em" viewBox="0 0 896 1024"><path fill="red" d="M831.405 1024h-767q-27 0-45.5-18.5T.405 960V65q0-27 18.5-45.5T64.405 1h448v352q0 13 9 22.5t23 9.5h351v575q0 27-18.5 45.5t-45.5 18.5m-242-439q18-18 18-43.5t-18-43.5t-43.5-18t-43.5 18l-119 119l-119-119q-18-18-43.5-18t-43.5 18t-18 43.5t18 43.5l119 119l-119 119q-18 18-18 43.5t18 43.5t43.5 18t43.5-18l119-119l119 119q18 18 43.5 18t43.5-18t18-43.5t-18-43.5l-119-119zm-13-585q26 0 44 18l256 257q19 19 19 46h-319z"/></svg>
        </button>
    )
}