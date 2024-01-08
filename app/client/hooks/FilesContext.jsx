'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchAssistant } from '@client/services/getAssistant';

const FileContext = createContext();

export function useContextHook() {
  return useContext(FileContext);
}

export function AppContext({ children }) {
    const [files, setFiles] = useState([])
    const [assistant, setAssistant] = useState({})

    useEffect(() => {
      fetchAssistant().then( a => setAssistant(a))
    }, [])
    
    return (
      <FileContext.Provider value={{
        files, setFiles,
        assistant
       }}>
        { children }
      </FileContext.Provider>
    );
  }  

export default FileContext;
