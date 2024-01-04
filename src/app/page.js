"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const FilesList = [
  {title: "file 1", id: "a"},
  {title: "file 2", id: "ab"},
  {title: "file 3", id: "abc"},
  {title: "file 4", id: "abcd"},
]

export default function Home() {
  const [files, setFiles] = useState([])

  useEffect( ()=>{
    setTimeout(() => {
      setFiles(FilesList)
    }, 2000);
  }, [])

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-2 place-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M13 6.5H9a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V7a.5.5 0 0 0-.5-.5m0-6H9a.5.5 0 0 0-.5.5v2.01a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V1a.5.5 0 0 0-.5-.5m-8 0H1a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V1A.5.5 0 0 0 5 .5m0 9.99H1a.5.5 0 0 0-.5.5V13a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-2.01a.5.5 0 0 0-.5-.5"/></svg>
          <h2 className="uppercase font-bold text-2xl">Dashboard</h2>
        </div>
        <div>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-xl flex gap-2 places-items-center justify-center transition ease-in-out delay-150 hover:bg-gray-700 hover:scale-110 duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.5 21.5q-.425 0-.862-.262T4 20.625L1.5 16.25q-.2-.35-.2-.862t.2-.863L8 3.375q.2-.35.638-.613T9.5 2.5h5q.425 0 .863.263t.637.612l4.55 7.8q-.575-.15-1.187-.2t-1.213.05L14.35 4.5h-4.7L3.3 15.4l2.35 4.1h7.9q.275.575.638 1.075t.837.925zM7.25 17l-.725-1.275L11.1 7.75h1.8l2.525 4.4q-.425.325-.787.712t-.638.813L12 10.2L9.25 15h4.1q-.175.475-.262.975T13 17zM18 21v-3h-3v-2h3v-3h2v3h3v2h-3v3z"/></svg>
            Upload File
          </button>
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-300 bg-gray-50 rounded-lg">
      <thead>
        <tr>
          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 uppercase">
            File Name
          </th>
        </tr>
      </thead>
        <TableComponent files={files} />
      </table>
    </section>
  );
}

function TableComponent({files}) {
  return(
  <tbody className="divide-y divide-gray-200">
  {files.map((file) => (
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
  ))}
</tbody>)
}