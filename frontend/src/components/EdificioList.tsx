import { TrashIcon } from "@heroicons/react/24/solid";
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
        alert("Edificio adicionado com sucesso!")
        fechar();
        window.location.reload()
      })
      .catch(() => console.log("Não foi possivel excluir"))
  }

  return (
    <div className="w-1/4 bg-gray-800">
      <div className="w-full">
        <div className="h-[10vh] p-3 w-full justify-between flex flex-wrap items-center text-white">
          <div>
            <h1 className="cursor-pointer" onClick={() => window.location.reload()}>BIOPARK IMÓVEIS</h1>
          </div>
          <div>
            <Modal
              builder={(open) => (
                <button onClick={() => open()} type="button" className="bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2">
                  Adicionar
                </button>
              )}
              title={"Adicionar Edificio"}
              body={(fechar) => (
                <>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nome</label>
                      <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900
                       text-sm rounded-lg block w-full p-2.5" placeholder="Nome do edificio"
                        onChange={(v) => setNome(v.target.value)}
                        required />
                    </div>
                    <button onClick={() => createEdificio(fechar)} type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
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
                <li key={value.id} className="flex w-full justify-between text-gray-300 cursor-pointer items-center px-4 border-t-2 border-gray-500 hover:bg-slate-900">
                  <div onClick={() => setIdEdificio(value.id)} className="flex-1 py-4 items-center focus:outline-none focus:ring-2 focus:ring-white ">
                    <span className="text-lg">{value.nome}</span>
                  </div>
                  <div className="z-50 p-2 bg-gray-600 rounded-md hover:bg-red-500" onClick={() => deleteEdificio(value.id)}><TrashIcon className="h-5 w-5" /></div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}
