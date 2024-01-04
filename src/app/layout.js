import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PDF ChatBot',
  description: 'Chat with OpenAI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex justify-center items-center h-screen bg-ross-green">
          <div className="w-full h-full flex flex-col">
            <Header />
            <div className="flex-1 overflow-auto p-4 flex flex-col">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
