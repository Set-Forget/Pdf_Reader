import TableSkeletonComponent from "@client/components/HomePage/TableSkeleton";
import TableBodyComponent from "@client/components/HomePage/TableBody";
import { useContextHook } from "@/client/context/FilesContext";

export default function TableComponent() {
  const {
    loadFiles
  } = useContextHook()

    return(
    <table className="min-w-full divide-y divide-gray-300 bg-gray-50 rounded-lg">
        <thead>
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 uppercase">
              File Name
            </th>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm text-gray-900 uppercase">
              File Type
            </th>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm text-gray-900 uppercase">
              File Link
            </th>
          </tr>
        </thead>
        {loadFiles ?
          <TableSkeletonComponent />
          :
          <TableBodyComponent />
        }
    </table>
    )
}