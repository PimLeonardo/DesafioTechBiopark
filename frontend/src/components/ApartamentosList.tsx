export default function ApartamentosList() {
  return (
    <div>
      <div className="text-sm font-medium flex justify-center text-center text-gray-500 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <a className="inline-block cursor-pointer p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">Todos</a>
          </li>
          <li className="mr-2">
            <a className="inline-block cursor-pointer p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active">Disponivel</a>
          </li>
          <li className="mr-2">
            <a className="inline-block cursor-pointer p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">Ocupado</a>
          </li>
        </ul>
        <button type="button" className="bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2 m-2 text-white">
          Adicionar
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Apartamento nº
              </th>
              <th scope="col" className="px-6 py-3">
                locatario
              </th>
              <th scope="col" className="px-6 py-3">
                Condição
              </th>
              <th scope="col" className="px-6 py-3">
                Aluguel
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                305
              </th>
              <td className="px-6 py-4">
                Nenhum
              </td>
              <td className="px-6 py-4">
                Disponivel
              </td>
              <td className="px-6 py-4">
                $2999
              </td>
              <td className="px-6 py-4 text-right">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                401
              </th>
              <td className="px-6 py-4">
                Jorge
              </td>
              <td className="px-6 py-4">
                Ocupado
              </td>
              <td className="px-6 py-4">
                $1999
              </td>
              <td className="px-6 py-4 text-right">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                809
              </th>
              <td className="px-6 py-4">
                Nenhum
              </td>
              <td className="px-6 py-4">
                Disponivel
              </td>
              <td className="px-6 py-4">
                $99
              </td>
              <td className="px-6 py-4 text-right">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
