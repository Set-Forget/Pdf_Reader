"use client";
import HamburguerMenu from "@/components/HamburgerMenu";
import ChatComponent from "../components/ChatComponent";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen rossColor">
      <div className="w-full h-full flex flex-col">
        <div className="flex justify-between items-center p-4 bg-white shadow-md">
          <HamburguerMenu />
          <div className="flex items-center">
            <img
              src="favicon.ico"
              alt="Logo"
              className="w-12 h-12 rounded-full mr-3"
            />
            <h1 className="text-xl font-bold">
              PDF Reader
            </h1>
          </div>
          <div className="w-12 h-12"></div> {/* Espacio para equilibrar el layout */}
        </div>

        <div className="flex-1 overflow-auto p-4">
          <ChatComponent />
        </div>
      </div>
    </div>
  );
}
