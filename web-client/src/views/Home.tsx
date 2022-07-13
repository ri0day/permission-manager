import React, { useEffect, useState } from 'react'
import { useUsers } from '../hooks/useUsers'
import { Link } from 'react-router-dom'
import DataTable, { TableColumn } from 'react-data-table-component';
import CreateKubeconfigButton from '../components/CreateKubeconfigButton';

type Row = {
  name: string;
}

const TableLoader = () => {
  return <svg role="status" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg" >
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
  </svg >
}




export default function Home() {
  const { users, removeUser, loading } = useUsers()
  const [tableIsLoading, setTableIsLoading] = useState(loading);
  const [filter, setFilter] = useState("")

  useEffect(() => {
    setTableIsLoading(loading)
  }, [loading])

  const columns: TableColumn<Row>[] = [
    {
      name: "Name",
      selector: row => row.name,
      sortable: true,
      cell: (row) => {
        return <Link to={`/users/${row.name}`} className="text-blue-600 hover:text-blue-300 text-lg font-bold">
          {row.name}
        </Link>
      }
    },
    {
      name: "KubeConfig",
      selector: row => row.name,
      sortable: true,
      cell: ({ name }) => {
        return <CreateKubeconfigButton user={{ name }} customText="SHOW" />
      }
    },
    {
      name: "Action",
      sortable: false,
      cell: (row, index, column, id) => {
        return <button
          tabIndex={-1}
          className="bg-red-600 text-white py-1 px-2 rounded ml-2 text-xs opacity-100 hover:opacity-75"
          onClick={() => handleDelete(row.name)}
        >
          DELETE
        </button>
      },
    }
  ]

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const handleDelete = async (name: string) => {
    const confirmed = window.confirm(
      `Confirm deletion of User ${name}`
    )
    if (confirmed) {
      await removeUser({ id: name })
    }
  }

  const getUsers = () => users.filter((e) => JSON.stringify(e).includes(filter)).map(user => ({
    name: user.name
  }))

  return (
    <div className=" bg-gray-200  pt-16">
      <div className="pr-3 pl-3">
        <div className=" bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
          <div className="mb-2 text-right">
            <Link to="/new-user">
              <button className="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded">
                Create New User
              </button>
            </Link>
          </div>
          <DataTable
            columns={columns}
            data={getUsers()}
            title={
              <div className="flex justify-between items-center">
                <h3>User</h3>
                <div className="pt-2 relative text-gray-600">
                  <input value={filter} onChange={(handleFilterChange)} className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    placeholder="type to search" />
                  <svg className="text-gray-600 h-4 w-4 fill-current absolute" style={{ top: "20px", right: "15px" }} xmlns="http://www.w3.org/2000/svg"
                    version="1.1" id="Capa_1" x="0px" y="0px"
                    viewBox="0 0 56.966 56.966"
                    width="512px" height="512px">
                    <path
                      d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                  </svg>
                </div>
              </div>
            }
            progressPending={tableIsLoading}
            progressComponent={<TableLoader />}
          />
        </div>
      </div>
    </div >
  )
}
