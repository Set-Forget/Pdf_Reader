'use client'
import Image from 'next/image';
import { useState, useRef } from 'react';
import ChatComponent from '../components/ChatComponent';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Función para manejar la selección del archivo
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Función para manejar la subida del archivo
  const handleUpload = () => {
    if (selectedFile) {
      console.log('Archivo a subir:', selectedFile);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full h-full flex flex-col">
        <h1 className="text-4xl font-bold text-center text-gray-800 py-6">PDF Reader</h1>
        <div className="flex-1 overflow-auto">
          <ChatComponent />
        </div>
      </div>
    </div>
  );
}
