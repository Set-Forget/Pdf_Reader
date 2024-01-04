import Link from "next/link";

export default function TableBodyComponent({files}) {
    return(
    <tbody className="divide-y divide-gray-200">
    { files.length > 0 ?
      files.map((file) => (
        <tr key={file.id}>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
            {file.title}
          </td>
          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium flex gap-2 justify-end">
            <Link href={`chat/${file.id}`} className="px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-600">Chat</Link>
            <button className="px-4 py-2 rounded-xl border hover:border-red-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.5em" viewBox="0 0 896 1024"><path fill="red" d="M831.405 1024h-767q-27 0-45.5-18.5T.405 960V65q0-27 18.5-45.5T64.405 1h448v352q0 13 9 22.5t23 9.5h351v575q0 27-18.5 45.5t-45.5 18.5m-242-439q18-18 18-43.5t-18-43.5t-43.5-18t-43.5 18l-119 119l-119-119q-18-18-43.5-18t-43.5 18t-18 43.5t18 43.5l119 119l-119 119q-18 18-18 43.5t18 43.5t43.5 18t43.5-18l119-119l119 119q18 18 43.5 18t43.5-18t18-43.5t-18-43.5l-119-119zm-13-585q26 0 44 18l256 257q19 19 19 46h-319z"/></svg>
            </button>
          </td>
        </tr>
      ))
    : <tr className="text-gray-500">
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
          No files to display.
        </td>
      </tr>}
  </tbody>)
}
