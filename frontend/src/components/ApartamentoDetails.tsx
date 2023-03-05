import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { api } from "../utils/api";
import Modal from "./Modal";

type Props = {
  idApartamento: number
  apartamentos: (string | number | any)[]
  getApartamentos: any
}

export default function ApartamentoDetails({ getApartamentos, idApartamento, apartamentos }: Props) {
  const [modalStatus, setModalStatus] = useState("default")
  const [aluguel, setAluguel] = useState("")

  async function deleteLocatario(fechar: () => void) {
    await fetch(`${api}/locatario/${idApartamento}`, { method: 'DELETE', })
      .then((response) => response.json())
      .then(() => {
        alert("Locatario excluido com sucesso!")
      })
      .catch(() => console.log("Não foi possivel excluir o locatario"))
      .finally(() => { updateApartamento(fechar); })
  }

  async function updateApartamento(fechar: () => void) {
    await fetch(`${api}/apartamentos/${idApartamento}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "locatario": "",
        "disponivel": true
      }),
    })
      .then((response) => response.json())
      .then(() => {
        fechar();
      })
      .catch(() => console.log("Erro ao atualizar apartamento"))
      .finally(() => { getApartamentos(); })
  }

  async function updateAluguel(fechar: () => void) {
    await fetch(`${api}/apartamentos/${idApartamento}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "aluguel": parseInt(aluguel)
      }),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Aluguel atualizado com sucesso!")
        fechar();
      })
      .catch(() => console.log("Erro ao atualizar aluguel"))
      .finally(() => { getApartamentos(); })
  }

  return (
    <>
      <Modal
        builder={(open) => (
          <button onClick={() => open()} className="font-medium gap-1 flex text-blue-600 hover:text-yellow-500 hover:underline">Detalhes<PencilSquareIcon className="h-5 w-5 hover:text-yellow-500" />
          </button>
        )}
        title={"Detalhes do apartamento"}
        body={(fechar) => (
          <>
            {
              modalStatus === "aluguel"
                ?
                <div>
                  <p>Aluguel atual: {apartamentos.map((value) => (value.aluguel))}$</p>
                  <input type="number" name="aluguel" id="aluguel" className="bg-gray-50 border border-gray-300 text-gray-900text-sm rounded-lg block w-full p-2.5"
                    placeholder="Digite um novo aluguel" onChange={(v) => setAluguel(v.target.value)} required />
                  <div className="flex justify-between gap-2 my-5">
                    <button onClick={() => fechar} type="button" className="w-full text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                      Cancelar
                    </button>
                    <button onClick={() => updateAluguel(fechar)} type="button" className="w-full text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                      Confirmar
                    </button>
                  </div>
                </div>
                :
                apartamentos
                  .filter((apartamento) => {
                    if (apartamento.id == idApartamento) {
                      return apartamento
                    }
                  })
                  .map((value) => (
                    <div key={value.id}>
                      <div className="my-5">
                        <div>
                          Numero do apartamento: {value.numero}
                        </div>
                        <div>
                          Nome do locador: {value.locador}
                        </div>
                        <div>
                          Nome do locatario: {value.locatario}
                        </div>
                        <div>
                          Aluguel: {value.aluguel} $
                        </div>
                      </div>
                      <div className="flex justify-between gap-2">
                        <button onClick={() => setModalStatus("aluguel")} type="button" className="w-full text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                          Alterar aluguel
                        </button>
                        <button onClick={() => deleteLocatario(fechar)} type="button" className="w-full text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                          Remover locatario
                        </button>
                      </div>
                    </div>
                  ))
            }
          </>
        )
        }
      />
    </>
  )
}
