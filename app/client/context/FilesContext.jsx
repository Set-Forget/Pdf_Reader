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
    const [loadFiles, setLoadFiles] = useState(files?.length == 0)

    useEffect(() => {
      GetAllFiles().then(
        res => {
          if ( res && res.success ) {
            const list = res?.data?.map( l => new ChatFile(l.fileName, l.fileId, `https://drive.google.com/file/d/${l.fileId}/view`, l.fileType, l.assistantId, l.assistantFileId ) )
            setFiles(list)
          }
          setLoadFiles(false)
        }
      )
    }, [])

    const searchFileInfoById = (list) => {
      if (selectedFileId) {
        const fileSelected = list.find( f => f.id == selectedFileId )
        setSelectedFile(fileSelected)
      }
    }

    useEffect(()=>{
      if (files.length == 0 ) {
        GetAllFiles()
        .then( res => {
            if ( res && res.success ) {
              const list = res?.data?.map( l => new ChatFile(l.fileName, l.fileId, `https://drive.google.com/file/d/${l.fileId}/view`, l.fileType, l.assistantId, l.assistantFileId ) )
              searchFileInfoById(list)
            }
        })
      } else {
        searchFileInfoById(files)
      }
    }, [selectedFileId])
    
    return (
      <FileContext.Provider value={{
        files, setFiles,
        loadFiles, setLoadFiles,
        selectedFileId, setSelectedFileId,
        selectedFile
       }}>
        { children }
      </FileContext.Provider>
    );
  }  

export default FileContext;