export default function NavList() {
  return (
    <div className="w-1/4 h-screen bg-gray-800">
      <div className="px-0 overflow-auto">
        <div className="h-16 p-3 w-full justify-between flex flex-wrap items-center text-white">
          <div>
            <h1>BIOPARK IMÓVEIS</h1>
          </div>
          <div>
            <button type="button" className="bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2">
              Adicionar
            </button>
          </div>
        </div>
        <ul className="overflow-auto">
          <li className="flex w-full justify-between text-gray-300 cursor-pointer items-center p-4 border-t-2 border-gray-500">
            <a className="flex items-center focus:outline-none focus:ring-2 focus:ring-white ">
              <span className="text-sm">Edifício 1</span>
            </a>
            <a>
              <span>X</span>
            </a>
          </li>
          <li className="flex w-full justify-between text-gray-300 cursor-pointer items-center p-4 border-t-2 border-gray-500">
            <a className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
              <span className="text-sm">Edifício 2</span>
            </a>
            <a>
              <span>X</span>
            </a>
          </li>
          <li className="flex w-full justify-between text-gray-300 cursor-pointer items-center p-4 border-t-2 border-gray-500">
            <a className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
              <span className="text-sm">Edifício 3</span>
            </a>
            <a>
              <span>X</span>
            </a>
          </li>
          <li className="flex w-full justify-between text-gray-300 cursor-pointer items-center p-4 border-t-2 border-gray-500">
            <a className="flex items-center focus:outline-none focus:ring-2 focus:ring-white" >
              <span className="text-sm">Edifício 4</span>
            </a>
            <a>
              <span>X</span>
            </a>
          </li>
          <li className="flex w-full justify-between text-gray-300 cursor-pointer items-center p-4 border-t-2 border-gray-500">
            <a className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
              <span className="text-sm">Edifício 5</span>
            </a>
            <a>
              <span>X</span>
            </a>
          </li>
          <li className="flex w-full justify-between text-gray-300 cursor-pointer items-center p-4 border-t-2 border-gray-500">
            <a className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
              <span className="text-sm">Edifício 6</span>
            </a>
            <a>
              <span>X</span>
            </a>
          </li>
          <li className="flex w-full justify-between text-gray-300 cursor-pointer items-center p-4 border-t-2 border-gray-500">
            <a className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
              <span className="text-sm">Edifício 7</span>
            </a>
            <a>
              <span>X</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
