'use client'

import { useContextHook } from "@/client/context/FilesContext";
import { useState } from "react";

export default function FileView({}) {
    const [isIframeOpen, setIsIframeOpen] = useState(true);

    const {
        selectedFile, selectedFileId
    } = useContextHook()

    const viewerUrl = `https://docs.google.com/viewer?srcid=${selectedFileId}&pid=explorer&efh=false&a=v&chrome=false&embedded=true&usp=sharing`;

    return(
        <div className="flex-grow overflow-auto md:w-1/2 bg-gray-100 relative">
        {isIframeOpen && selectedFileId ? (
          <>
            <iframe
              src={viewerUrl}
              className="w-full h-full"
              title="PDF Viewer"
            ></iframe>
            <button
              onClick={() => setIsIframeOpen(false)}
              className="absolute top-2 left-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Close PDF
            </button>
          </>
        ) : (
          <div className="w-full h-full flex justify-center items-center p-4">
            <div className="flex flex-col items-center">
                <button
                  key={selectedFileId}
                  onClick={() => setIsIframeOpen(true)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                >
                  { selectedFile?.title ? selectedFile?.title :  "View file" }
                </button>
            </div>
          </div>
        )}
      </div>
    )
}