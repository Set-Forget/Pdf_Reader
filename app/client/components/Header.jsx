import Image from "next/image"
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
          <a
            className="ml-6 flex justify-center items-center gap-1"
            href={`${BASE_URL}home`}
          >
            <Image
              src="/2.png"
              width={24}
              height={24}
              alt="Icon Home Value"
            />
            <span>Home Value</span>
          </a>
          <a
            className="ml-4 flex justify-center items-center gap-1"
            href={`${BASE_URL}calculator`}
          >
            <Image
              src="/4.png"
              width={24}
              height={24}
              alt="Icon Pricing Calculator"
            />
            <span>Pricing Calculator</span>
          </a>
          <a
            className="ml-4 flex justify-center items-center gap-1"
            href={`${BASE_URL}form`}
          >
            <Image
              src="/3.png"
              width={24}
              height={24}
              alt="Icon Pricing Calculator"
            />
            <span>1003 Form</span>
          </a>
          <Link
            className="ml-4 flex justify-center items-center gap-1"
            href="/"
          >
            <Image
              src="/3.png"
              width={24}
              height={24}
              alt="Icon PDF ChatBot"
            />
            <span>PDF ChatBot</span>
          </Link>
        </div>
        <div></div>
      </header>
    )
}

