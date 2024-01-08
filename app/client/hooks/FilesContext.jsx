'use client'
import { createContext, useContext, useState } from 'react';

const FileContext = createContext();

export function useContextHook() {
  return useContext(FileContext);
}

export function AppContext({ children }) {
    const [files, setFiles] = useState([])
    
    return (
      <FileContext.Provider value={{
        files, setFiles
       }}>
        { children }
      </FileContext.Provider>
    );
  }  

export default FileContext;
