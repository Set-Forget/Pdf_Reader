"use client";
import AddFileBtn from "@client/components/HomePage/addFile";
import TableComponent from "@/client/components/HomePage/Table";

export default function Home() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-2 place-items-center text-ross-green">
          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M13 6.5H9a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V7a.5.5 0 0 0-.5-.5m0-6H9a.5.5 0 0 0-.5.5v2.01a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V1a.5.5 0 0 0-.5-.5m-8 0H1a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V1A.5.5 0 0 0 5 .5m0 9.99H1a.5.5 0 0 0-.5.5V13a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-2.01a.5.5 0 0 0-.5-.5" /></svg>
          <h2 className="uppercase font-bold text-2xl text-gray-200">Dashboard</h2>
        </div>
        <div>
          <AddFileBtn />
        </div>
      </div>
      <TableComponent/>
    </section>
  );
}
