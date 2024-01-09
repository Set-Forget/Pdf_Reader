"use client";
import AddFileBtn from "@client/components/HomePage/addFile";
import GetAllFiles from "@client/services/getAllFiles";
import { useContextHook } from "@/client/context/FilesContext";
import { useEffect, useState } from "react";
import TableComponent from "@/client/components/HomePage/Table";

export default function Home() {
  const {
    files, setFiles
  } = useContextHook()
  const [loadFiles, setLoadFiles] = useState(files.length == 0)

  useEffect(() => {

    GetAllFiles().then(list => {
      const excels = list.files.excels.map(f => { return { title: f.name, id: f.id, url: f.url, type: "Excel" } })
      const pdfs = list.files.pdfs.map(f => { return { title: f.name, id: f.id, url: f.url, type: "PDF" } })
      const fileList = [...pdfs, ...excels]
      setFiles(fileList)
      setLoadFiles(false)
    })
  }, [])

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-2 place-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M13 6.5H9a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V7a.5.5 0 0 0-.5-.5m0-6H9a.5.5 0 0 0-.5.5v2.01a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V1a.5.5 0 0 0-.5-.5m-8 0H1a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V1A.5.5 0 0 0 5 .5m0 9.99H1a.5.5 0 0 0-.5.5V13a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-2.01a.5.5 0 0 0-.5-.5" /></svg>
          <h2 className="uppercase font-bold text-2xl">Dashboard</h2>
        </div>
        <div>
          <AddFileBtn />
        </div>
      </div>
      <TableComponent loadFiles={loadFiles} />
    </section>
  );
}
