import Link from "next/link"

export default function Header() {
  const BASE_URL = "https://david-ross-loans-cardinal-financial.vercel.app/"

    return(
      <header className="w-full p-4 grid grid-cols-2 gap-2 place-items-center shadow-md bg-white dark:bg-slate-700 dark:text-white">
        <div className="flex justify-center items-center">
          <img
              src="favicon.ico"
              alt="Logo"
              className="w-10 h-10 rounded-full"
              />
          <Link
            className="ml-6 flex justify-center items-center gap-1"
            href={`${BASE_URL}home`}
          >
            <img
              src="2.png"
              width={24}
              height={24}
              alt="Icon Home Value"
            />
            <span>Home Value</span>
          </Link>
          <Link
            className="ml-4 flex justify-center items-center gap-1"
            href="/"
          >
            <img
              src="3.png"
              width={24}
              height={24}
              alt="Icon PDF ChatBot"
            />
            <span>PDF ChatBot</span>
          </Link>
          <Link
            className="ml-4 flex justify-center items-center gap-1"
            href={`${BASE_URL}calculator`}
          >
            <img
              src="4.png"
              width={24}
              height={24}
              alt="Icon Pricing Calculator"
            />
            <span>Pricing Calculator</span>
          </Link>
        </div>
        <div></div>
      </header>
    )
}

