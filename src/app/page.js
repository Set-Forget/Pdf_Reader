"use client";
import AddFileBtn from "@/components/HomePage/addFile";
import TableSkeletonComponent from "@/components/HomePage/TableSkeleton";
import TableBodyComponent from "@/components/HomePage/TableBody";
import { useEffect, useState } from "react";
import GetAllFiles from "@/services/getAllFiles";

const FilesList = [
  {title: "file 1", id: "a"},
  {title: "file 2", id: "ab"},
  {title: "file 3", id: "abc"},
  {title: "file 4", id: "abcd"},
]

export default function Home() {
  const [files, setFiles] = useState([])
  const [loadFiles, setLoadFiles] = useState(true)

  const getFiles = () => {
    GetAllFiles().then( list => {
      console.log(list);
    })
  }

  useEffect( ()=>{
    getFiles()
    setTimeout(() => {
      setFiles(FilesList)
      setLoadFiles(false)
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
          <AddFileBtn />
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
      { loadFiles ? 
      <TableSkeletonComponent />
      :
      <TableBodyComponent files={files} />
      }
      </table>
    </section>
  );
}
