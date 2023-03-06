import { useCallback, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import Modal from "./Modal";
import { api } from "../utils/api";
import { MaskMoney, MaskMoneyConvert } from "../utils/mask";

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
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then(() => {
        toast.success('Locatário excluído com sucesso.')
        updateApartamento(fechar);
      })
      .catch(() => toast.error('Erro na hora de excluir o locatário.'))
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
      .catch(() => toast.error('Erro na hora de atualizar o apartamento.'))
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
        "aluguel": MaskMoneyConvert(aluguel)
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then(() => {
        toast.success('Aluguel atualizado com sucesso.')
        fechar();
      })
      .catch(() => toast.error('Erro na hora de atualizar o aluguel.'))
      .finally(() => { getApartamentos(); })
  }

  const handleMaskMoney = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    MaskMoney(e)
  }, [])

  return (
    <>
      <Modal
        builder={(open) => (
          <button onClick={() => open()} className="font-medium gap-1 flex text-primary-100 hover:text-yellow-500 hover:underline">Detalhes<PencilSquareIcon className="h-5 w-5 hover:text-yellow-500" />
          </button>
        )}
        title={"Detalhes do apartamento"}
        body={(fechar) => (
          <>
            {
              modalStatus === "aluguel"
                ?
                <div>
                  <input type="text" name="aluguel" id="aluguel" autoComplete="off" className="bg-gray-50 border border-gray-300 text-gray-900text-sm rounded-lg 
                  block w-full p-2.5" placeholder="Digite um novo aluguel" onKeyUp={handleMaskMoney} onChange={(v) => setAluguel(v.target.value)} />
                  <div className="flex justify-between gap-2 my-5">
                    <button onClick={() => getApartamentos()} type="button" className="w-full text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                      Cancelar
                    </button>
                    <button onClick={() => {
                      if (aluguel.length < 3) {
                        toast.error('Verifique os dados e preencha corretamente.')
                      } else {
                        updateAluguel(fechar)
                      }
                    }} type="button" className={"w-full text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"}>
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
                          Nome do locatário : {value.locatario}
                        </div>
                        <div>
                          Aluguel: R$ {value.aluguel}
                        </div>
                      </div>
                      <div className="flex justify-between gap-2">
                        <button onClick={() => setModalStatus("aluguel")} type="button" className="w-full text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                          Alterar aluguel
                        </button>
                        <button onClick={() => deleteLocatario(fechar)} type="button" className="w-full text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                          Remover locatário
                        </button>
                      </div>
                    </div>
                  ))
            }
          </>
        )
        }
      />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            textAlign: 'center',
            padding: '25px'
          },
        }}
      />
    </>
  )
}
