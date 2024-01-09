'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchAssistant } from '@client/services/getAssistant';
import GetAssistantFiles from '@client/services/getAssistantFileList';

const FileContext = createContext();

export function useContextHook() {
  return useContext(FileContext);
}

export function AppContext({ children }) {
    const [files, setFiles] = useState([])
    const [selectedFile, setSelectedFile] = useState({})
    const [selectedFileId, setSelectedFileId] = useState("")
    const [assistant, setAssistant] = useState({})
    const [assistantFiles, setAssistantFiles] = useState({})

    useEffect(() => {
      fetchAssistant().then( a => setAssistant(a))
    }, [])

    useEffect(()=>{
      GetAssistantFiles().then(
        fileList => setAssistantFiles(fileList)
      )
    }, [files])

    useEffect(()=>{
      setSelectedFile(files.find(f => f.id == selectedFileId))
    }, [selectedFileId])
    
    return (
      <FileContext.Provider value={{
        files, setFiles, selectedFile,
        assistant, assistantFiles,
        selectedFileId, setSelectedFileId
       }}>
        { children }
      </FileContext.Provider>
    );
  }  

export default FileContext;
