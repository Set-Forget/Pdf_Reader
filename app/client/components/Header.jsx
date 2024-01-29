import Link from "next/link"

export default function Header() {
    return(
      <div className="flex justify-center items-center p-4 shadow-md bg-white dark:bg-slate-700 dark:text-white">
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
      </div>
    )
}