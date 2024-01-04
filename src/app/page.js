"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const FilesList = [
  {title: "file 1"},
  {title: "file 2"},
  {title: "file 3"},
  {title: "file 4"},
]

export default function Home() {
  const [files, setFiles] = useState([])

  useEffect( ()=>{
    setFiles(FilesList)
  }, [])

  return (
    <section className="">
      <Link href="chat" className="p-4 bg-gray-900 text-white rounded-xl" >Chat</Link>
    </section>
  );
}
