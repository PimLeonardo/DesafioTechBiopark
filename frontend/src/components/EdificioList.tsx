import { XCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { edificioInterface } from "../utils/types";
import Modal from "./Modal";

type Props = {
  setIdEdificio: React.Dispatch<React.SetStateAction<number | null | undefined>>
}

export default function NavList({ setIdEdificio }: Props) {
  const [edificios, setEdificios] = useState<edificioInterface[]>([])
  const [nome, setNome] = useState('')
  const [idPage, setIdPage] = useState(0)

  useEffect(() => {
    getEdificios()
  }, [])

  async function getEdificios() {
    await fetch(`${api}/edificios`, { method: 'GET', })
      .then((response) => response.json())
      .then((data) => setEdificios(data))
      .catch((err) => console.log(err))
  }

  async function deleteEdificio(id: number) {
    await fetch(`${api}/edificios/${id}`, { method: 'DELETE', })
      .then((response) => response.json())
      .then(() => {
        alert("Edificio excluido com sucesso!")
        window.location.reload()
      })
      .catch(() => console.log("Não foi possivel excluir"))
  }

  async function createEdificio(fechar: () => void) {
    console.log(nome)
    await fetch(`${api}/edificios`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome: nome }),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Edifício adicionado com sucesso!")
        fechar();
        window.location.reload()
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="w-1/4 bg-gray-800">
      <div className="w-full">
        <div className="h-[10vh] p-4 w-full justify-between flex items-center text-white border-b-2 border-gray-500">
          <div>
            <img src="./logo_nav.png" className="w-13 h-8 cursor-pointer" onClick={() => window.location.reload()} />
          </div>
          <div>
            <Modal
              builder={(open) => (
                <button onClick={() => open()} type="button" className="bg-secondary-100 hover:bg-secondary-200 rounded-lg text-sm p-2">
                  Adicionar
                </button>
              )}
              title={"Adicionar Edifício"}
              body={(fechar) => (
                <>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nome</label>
                      <input type="text" name="name" id="name" autoComplete="off" className="bg-gray-50 border border-gray-300 text-gray-900
                       text-sm rounded-lg block w-full p-2.5" placeholder="Nome do edifício" onChange={(v) => setNome(v.target.value)} />
                    </div>
                    <button onClick={() => createEdificio(fechar)} type="button" className="w-full text-white bg-secondary-100 hover:bg-secondary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                      Cadastrar
                    </button>
                  </div>
                </>
              )}
            />
          </div>
        </div>
        <div className="h-[90vh] scrollbar overflow-y-auto">
          <ul>
            {
              edificios.map((value) => (
                <li key={value.id} className={`flex w-full justify-between ${value.id === idPage ? "bg-primary-200" : ""} text-gray-50 cursor-pointer items-center px-4 border-b-2 border-gray-500 hover:bg-primary-200`}>
                  <div onClick={() => { setIdEdificio(value.id); setIdPage(value.id) }} className="flex-1 py-4 items-center">
                    <span className="text-lg">{value.nome}</span>
                  </div>
                  <Modal
                    builder={(open) => (
                      <div className="z-50 p-2 bg-gray-600 rounded-lg hover:bg-red-500" onClick={() => open()}><XCircleIcon className="h-5 w-5 text-gray-50 " /></div>

                    )}
                    title={"Excluir Edifício"}
                    body={(fechar) => (
                      <>
                        <div className="space-y-6">
                          <div>
                            Tem certeza que deseja excluir o Edifício?
                          </div>
                          <div className="flex justify-between gap-2">
                            <button onClick={() => fechar()} type="button" className="w-full text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                              Cancelar
                            </button>
                            <button onClick={() => deleteEdificio(value.id)} type="button" className="w-full text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                              Excluir
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  />
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div >
  )
}
