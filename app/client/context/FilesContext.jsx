'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import GetAllFiles from "@client/services/getAllFiles";

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
    const [loadFiles, setLoadFiles] = useState(files.length == 0)
    const [isLoadingAssistant, setIsLoadingAssistant] = useState(true)
    const [sheetData, setSheetData] = useState([])

    const updateAssistantList = () => {
      const list = {}
      for (let i = 0; i < sheetData.length; i++) {
        const row = sheetData[i];
        list[row.fileId] = { assistantId:row.assistantId, assistantFileId: row.assistantFileId }
      }
      setAssistantFiles(list)
    }

    const loadAssistant = () => {
      setSelectedFile(files.find(f => f.id == selectedFileId))
      if (assistantFiles[selectedFileId]?.assistantId) {
        setAssistant({id:assistantFiles[selectedFileId]?.assistantId})
      }
      if (Object.keys(assistantFiles).length != 0) setIsLoadingAssistant(false)
    }

    useEffect(() => {
      GetAllFiles().then(
        res => {
          const list = res.data.map( l => { return { title: l.fileName, id: l.fileId, url: `https://drive.google.com/file/d/${l.fileId}/view`, type: l.fileType }})
          setFiles(list)
          setLoadFiles(false)
          setSheetData(res.data)
          updateAssistantList()
          loadAssistant()
        }
      )
    }, [])

    useEffect(()=>{
      updateAssistantList()
    }, [files])

    useEffect(()=>{
      loadAssistant()
    }, [selectedFileId, files])
    
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
