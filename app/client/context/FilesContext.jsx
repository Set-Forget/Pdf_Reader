'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchAssistant } from '@client/services/getAssistant';
import GetAssistantFiles from '@client/services/getAssistantFileList';
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
    const [isLoadingAssistant, setIsLoadingAssistant] = useState(false)

    useEffect(() => {
      GetAllFiles().then(list => {
        const excels = list.files.excels.map(f => { return { title: f.name, id: f.id, url: f.url, type: "Excel" } })
        const pdfs = list.files.pdfs.map(f => { return { title: f.name, id: f.id, url: f.url, type: "PDF" } })
        const fileList = [...pdfs, ...excels]
        setFiles(fileList)
        setLoadFiles(false)
      })
      fetchAssistant().then( a => {
        setAssistant(a)}
      )
    }, [])

    useEffect(()=>{
      GetAssistantFiles().then(
        fileList => {
          setAssistantFiles(fileList)
        }
      )
    }, [files])

    useEffect(()=>{
      setSelectedFile(files.find(f => f.id == selectedFileId))
      if (assistantFiles[selectedFileId]?.assistantId) setAssistant({id:assistantFiles[selectedFileId]?.assistantId})
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
