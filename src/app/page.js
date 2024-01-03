"use client";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="chat" className="p-4 bg-gray-900 text-white rounded-xl" >Chat</Link>
    </>
  );
}
