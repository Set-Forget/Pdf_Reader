import Link from "next/link"

export default function Header() {
    return(
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <Link href="/" className="flex items-center">
          <img
            src="favicon.ico"
            alt="Logo"
            className="w-12 h-12 rounded-full mr-3"
            />
          <h1 className="text-xl font-bold">
            PDF Reader
          </h1>
        </Link>
        <div className="w-12 h-12"></div> {/* Espacio para equilibrar el layout */}
      </div>
    )
}