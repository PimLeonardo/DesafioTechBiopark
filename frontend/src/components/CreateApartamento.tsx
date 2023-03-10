import { useCallback, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Modal from "./Modal";
import { MaskMoney, MaskMoneyConvert } from "../utils/mask";
import { api } from "../utils/api";

type Props = {
  getApartamentos: () => Promise<void>
  idEdificio: number
}

export default function CreateApartamento({ getApartamentos, idEdificio }: Props) {
  const [locatario, setLocatario] = useState("");
  const [numero, setNumero] = useState("");
  const [aluguel, setAluguel] = useState("");

  async function createApartamento(fechar: () => void) {
    let body = {
      "numero": Number(numero),
      "aluguel": MaskMoneyConvert(aluguel),
      "locatario": locatario,
      "locador": "Biopark",
      "disponivel": true,
      "id_edificio": idEdificio
    }

    await fetch(`${api}/apartamentos`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then(() => {
        toast.success('Apartamento registrado com sucesso.')
        fechar();
      })
      .catch(() => toast.error('Erro ao registrar apartamento'))
      .finally(() => { getApartamentos(); })
  }

  const handleMaskMoney = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    MaskMoney(e)
  }, [])

  return (
    <div className={`absolute right-0 top-0 ${idEdificio === null || idEdificio === undefined ? 'hidden' : 'visible'}`}>
      <Modal
        builder={(open) => (
          <button onClick={() => open()} type="button" className="h-8 p-1 mr-2 mt-2 bg-secondary-100 hover:bg-secondary-200 font-medium rounded-lg text-sm text-white">
            Adicionar
          </button>
        )}
        title={"Adicionar Apartamento"}
        body={(fechar) => (
          <>
            <div className="space-y-6">
              <div>
                <label htmlFor="numero" className="block mb-2 text-sm font-medium text-gray-900">N??mero</label>
                <input type="number" name="numero" id="numero" autoComplete="off" className="bg-gray-50 border border-gray-300 text-gray-900
                text-sm rounded-lg block w-full p-2.5" placeholder="N??mero do apartamento" onChange={(v) => setNumero(v.target.value)} />
              </div>

              <div>
                <label htmlFor="aluguel" className="block mb-2 text-sm font-medium text-gray-900">Aluguel</label>
                <input type="text" name="aluguel" id="aluguel" autoComplete="off" className="bg-gray-50 border border-gray-300 text-gray-900
                text-sm rounded-lg block w-full p-2.5" placeholder="Pre??o do aluguel" onChange={(v) => setAluguel(v.target.value)} onKeyUpCapture={handleMaskMoney} />
              </div>
              <button onClick={() => {
                if (aluguel.length < 3 || numero == "") {
                  toast.error('Verifique os dados e preencha corretamente.')
                } else {
                  createApartamento(fechar)
                }
              }} type="button" className="w-full text-white bg-secondary-100 hover:bg-secondary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Cadastrar
              </button>
            </div>
          </>
        )}
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
    </div>
  )
}
