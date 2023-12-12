'use client'
import ChatComponent from '../components/ChatComponent';

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen rossColor">
      <div className="w-full h-full flex flex-col">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-white p-2 rounded-full mt-2">
            <img src="favicon.ico" alt="Logo" className="w-12 h-12 rounded-full"/>
          </div>
          <h1 className="text-4xl font-bold text-center text-white">PDF Reader</h1>
        </div>
        <div className="flex-1 overflow-auto">
          <ChatComponent />
        </div>
      </div>
    </div>
  );
  }  

