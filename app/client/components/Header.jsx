import Link from "next/link"

export default function Header() {
  const BASE_URL = "https://david-ross-loans-cardinal-financial.vercel.app/"

    return(
      <div className="flex justify-center items-center p-4 shadow-md bg-white dark:bg-slate-700 dark:text-white">
        <img
            src="favicon.ico"
            alt="Logo"
            className="w-12 h-12 rounded-full mr-3"
            />
        <Link
          className="ml-6 flex justify-center items-center gap-1"
          href={`${BASE_URL}home`}
        >
          <img
            src="/assets/2.png"
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
            src="/assets/2.png"
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
            src="/assets/2.png"
            width={24}
            height={24}
            alt="Icon Pricing Calculator"
          />
          <span>Pricing Calculator</span>
        </Link>
      </div>
    )
}

