'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchAssistant } from '@client/services/getAssistant';
import GetAssistantFiles from '../services/getAssistantFileList';

const FileContext = createContext();

export function useContextHook() {
  return useContext(FileContext);
}

export function AppContext({ children }) {
    const [files, setFiles] = useState([])
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
    
    return (
      <FileContext.Provider value={{
        files, setFiles,
        assistant, assistantFiles
       }}>
        { children }
      </FileContext.Provider>
    );
  }  

export default FileContext;
