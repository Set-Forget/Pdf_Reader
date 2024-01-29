import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@client/components/Header";
import { AppContext } from "@/client/context/FilesContext";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PDF ChatBot",
  description: "Chat with OpenAI",
  favicon: "./favicon.ico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContext>
          <Toaster position="top-right" richColors closeButton />
          <div className="flex justify-center items-center h-screen bg-ross-green">
            <div className="w-full h-full flex flex-col">
              <Header />
              <div
                className="flex-1 overflow-auto p-4 flex flex-col"
                style={{
                  background: "linear-gradient(180deg, #05293e, #033652)",
                }}
              >
                {children}
              </div>
            </div>
          </div>
        </AppContext>
      </body>
    </html>
  );
}
