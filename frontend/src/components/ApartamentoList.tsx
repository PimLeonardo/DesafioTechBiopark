import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import ApartamentoDetails from "./ApartamentoDetails";
import LocatarioRegister from "./LocatarioRegister";
import CreateApartamento from "./CreateApartamento";
import Modal from "./Modal";
import { apartamentoInterface } from "../utils/types";
import { api } from "../utils/api";
import { delay } from "../utils/utils";

type Props = {
  idEdificio: number | null | undefined
}

export default function ApartamentosList({ idEdificio }: Props) {
  const [apartamentos, setApartamentos] = useState<apartamentoInterface[]>([])
  const [loading, setLoading] = useState(false)
  const [navStatus, setNavStatus] = useState('todos')

  useEffect(() => {
    if (idEdificio) {
      getApartamentos()
    }
  }, [idEdificio])

  async function getApartamentos() {
    setLoading(true)
    await delay(500)
    await fetch(`${api}/apartamentos/${idEdificio}`, { method: 'GET', })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then((data) => setApartamentos(data))
      .catch(() => toast.error('Erro na hora de carregar os apartamentos.'))
      .finally(() => setLoading(false));
  }

  async function deleteApartamentos(id: number) {
    await fetch(`${api}/apartamentos/${id}`, { method: 'DELETE', })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then(() => {
        toast.success('Apartamento excluído com sucesso. ')
        getApartamentos()
      })
      .catch(() => toast.error('Erro na hora de excluir o apartamento, verifique se não tem nenhum locatário cadastrado nele.'))
  }

  if (loading === true) {
    return (
      <div className="w-full flex items-center justify-center h-screen bg-gray-100 relative">
        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  if (idEdificio === null || idEdificio === undefined) {
    return (
      <div className="w-full h-screen bg-gray-100 bg-center bg-no-repeat bg-contain bg-[url('./background_logo.png')] relative">
      </div>
    )
  }

  if (apartamentos.length <= 0) {
    return (
      <div className="flex justify-center w-full h-screen bg-gray-100 relative">
        <p className="mt-10 text-xl font-bold">Nenhum apartamento registrado.</p>
        <CreateApartamento getApartamentos={getApartamentos} idEdificio={idEdificio} />
      </div>
    )
  }

  return (
    <div className="w-full h-screen bg-gray-100 relative">
      <div className="h-[6vh] text-sm font-medium flex justify-center text-center text-gray-500 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <a onClick={() => setNavStatus('todos')} className={`inline-block cursor-pointer p-4 border-b-2 rounded-t-lg ${navStatus === 'todos' ? 'text-blue-700 border-blue-700' : 'hover:text-blue-700 border-transparent'}`}>
              Todos
            </a>
          </li>
          <li className="mr-2">
            <a onClick={() => setNavStatus('disponivel')} className={`inline-block cursor-pointer p-4 border-b-2 rounded-t-lg ${navStatus === 'disponivel' ? 'text-green-400 border-green-400' : 'hover:text-green-400 border-transparent'}`}>
              Disponivel
            </a>
          </li>
          <li className="mr-2">
            <a onClick={() => setNavStatus('ocupado')} className={`inline-block cursor-pointer p-4 border-b-2 rounded-t-lg ${navStatus === 'ocupado' ? 'text-red-400 border-red-400' : 'hover:text-red-400 border-transparent'}`}>
              Ocupado
            </a>
          </li>
        </ul>
      </div>
      <div className="h-[94vh] p-2 scrollbar relative overflow-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-900">
          <thead className="text-xs text-gray-900 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Apartamento nº
              </th>
              <th scope="col" className="px-6 py-3">
                Locatário
              </th>
              <th scope="col" className="px-6 py-3">
                Condição
              </th>
              <th scope="col" className="px-6 py-3">
                Aluguel
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Botões de ação</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              apartamentos
                .filter((apartamentos) => {
                  if (navStatus === 'todos') {
                    return apartamentos
                  } else if (navStatus === 'disponivel') {
                    return apartamentos.disponivel === true
                  } else if (navStatus === 'ocupado') {
                    return apartamentos.disponivel === false
                  }
                })
                .map((value) => (
                  <tr key={value.id} className="bg-white border-b hover:bg-gray-50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      Nº {value.numero}
                    </th>
                    <td className="px-6 py-4">
                      {value.locatario.length > 0 ? value.locatario : "Nenhum"}
                    </td>
                    <td className="px-6 py-4">
                      {value.disponivel ? <p className="text-green-500">Disponivel</p> : <p className="text-red-500">Ocupado</p>}
                    </td>
                    <td className="px-6 py-4">
                      R$ {value.aluguel}
                    </td>
                    <td className="px-6 text-right">
                      <div className="flex gap-2 justify-end items-center">
                        {
                          value.disponivel === true
                            ?
                            <>
                              <LocatarioRegister getApartamentos={getApartamentos} idApartamento={value.id} apartamentos={apartamentos} />
                              <Modal
                                builder={(open) => (
                                  <button onClick={() => open()} className="font-medium gap-1 flex text-primary-100 hover:text-red-500 hover:underline">Excluir<TrashIcon className="h-5 w-5 hover:text-red-500" /></button>
                                )}
                                title={"Excluir Apartamento"}
                                body={(fechar) => (
                                  <>
                                    <div className="space-y-6">
                                      <div>
                                        Tem certeza que deseja excluir o Apartamento?
                                      </div>
                                      <div className="flex justify-between gap-2">
                                        <button onClick={() => fechar()} type="button" className="w-full text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                          Cancelar
                                        </button>
                                        <button onClick={() => deleteApartamentos(value.id)} type="button" className="w-full text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                          Excluir
                                        </button>
                                      </div>
                                    </div>
                                  </>
                                )} />
                            </>
                            :
                            <ApartamentoDetails getApartamentos={getApartamentos} idApartamento={value.id} apartamentos={apartamentos} />
                        }
                      </div>
                    </td>
                  </tr>))
            }
          </tbody>
        </table>
      </div>
      <CreateApartamento getApartamentos={getApartamentos} idEdificio={idEdificio} />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            textAlign: 'center',
            padding: '25px'
          },
        }}
      />
    </div>
  )
}
