import Link from "next/link";
import DeleteFileBtn from "./deleteFile";
import { MagicMotion } from "react-magic-motion";
import { useContextHook } from "@/client/hooks/FilesContext";

export default function TableBodyComponent() {
  const {
    files
  } = useContextHook()

    return(
    <tbody className="divide-y divide-gray-200">
      <MagicMotion>
      { files.length > 0 ?
        files.map((file) => (
          <TableRow key={file.id} file={file}/>
        ))
        : 
        <tr className="text-gray-500">
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
            No files to display.
          </td>
        </tr>
      }
      </MagicMotion>
  </tbody>)
}

function TableRow({file}) {
  return(
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-gray-900 w-1/3">
        {file.title}
      </td>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-gray-900 w-1/3">
        {file.type}
      </td>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-ross-green w-1/3">
        <a href={file.url} target="_blank">LINK</a>
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium flex gap-2 justify-end">
        <Link href={`chat/${file.id}`} className="px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-600">Chat</Link>
        <DeleteFileBtn file={file} />
      </td>
    </tr>
  )
}