'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import GetAllFiles from "@client/services/getAllFiles";
import { ChatFile } from '@/server/models/files';

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
    const [loadFiles, setLoadFiles] = useState(files?.length == 0)
    const [isLoadingAssistant, setIsLoadingAssistant] = useState(true)
    const [sheetData, setSheetData] = useState([])

    useEffect(() => {
      GetAllFiles().then(
        res => {
          if ( res && res.success ) {
            const list = res?.data?.map( l => new ChatFile(l.fileName, l.fileId, `https://drive.google.com/file/d/${l.fileId}/view`, l.fileType, l.assistantFileID ) )
            setFiles(list)
          }
          setLoadFiles(false)
        }
      )
    }, [])
    
    return (
      <FileContext.Provider value={{
        files, setFiles, selectedFile,
        loadFiles, setLoadFiles,
        assistant, assistantFiles, isLoadingAssistant, setIsLoadingAssistant, 
        selectedFileId, setSelectedFileId
       }}>
        { children }
      </FileContext.Provider>
    );
  }  

export default FileContext;
