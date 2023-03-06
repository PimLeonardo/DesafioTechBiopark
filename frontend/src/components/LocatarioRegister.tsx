import { useCallback, useState } from "react";
import { CreditCardIcon } from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import Modal from "./Modal";
import { api } from "../utils/api";
import { MaskCpf } from "../utils/mask";

type Props = {
  idApartamento: number
  apartamentos: (string | number | any)[]
  getApartamentos: any
}

export default function LocatarioRegister({ getApartamentos, idApartamento, apartamentos }: Props) {
  const [locatario, setLocatario] = useState("");
  const [cpf, setCpf] = useState("");

  async function registerLocatario(fechar: () => void) {
    let body = {
      "nome": locatario,
      "cpf": cpf,
      "id_apartamento": idApartamento
    }

    await fetch(`${api}/locatario`, {
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
        toast.success('Locatário criado com sucesso.')
        updateApartamento(fechar);
      })
      .catch(() => toast.error('Erro na hora de cadastrar o locatário, verifique que não há outro já cadastrado com esse CPF.'))
  }

  async function updateApartamento(fechar: () => void) {
    await fetch(`${api}/apartamentos/${idApartamento}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "locatario": locatario,
        "disponivel": false
      }),
    })
      .then((response) => response.json())
      .then(() => {
        fechar();
      })
      .catch(() => toast.error('Erro na hora de atualizar status do apartamento.'))
      .finally(() => { getApartamentos(); })
  }

  const handleMaskCpf = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    MaskCpf(e)
  }, [])

  return (
    <>
      <Modal
        builder={(open) => (
          <button onClick={() => open()} className="font-medium gap-1 flex text-primary-100 hover:text-green-500 hover:underline">Alugar<CreditCardIcon className="h-5 w-5 hover:text-green-500" />
          </button>
        )}
        title={"Adicionar Locatário"}
        body={(fechar) => (
          <>
            <div className="space-y-6">
              <div>
                <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900">Nome</label>
                <input type="text" name="nome" id="nome" autoComplete="off" className="bg-gray-50 border border-gray-300 text-gray-900
                text-sm rounded-lg block w-full p-2.5" placeholder="Nome do locatário " onChange={(v) => setLocatario(v.target.value)} />
              </div>

              <div>
                <label htmlFor="cpf" className="block mb-2 text-sm font-medium text-gray-900">CPF</label>
                <input type="text" name="cpf" id="cpf" autoComplete="off" className="bg-gray-50 border border-gray-300 text-gray-900
                text-sm rounded-lg block w-full p-2.5" placeholder="CPF do locatário " onKeyUp={handleMaskCpf} onChange={(v) => setCpf(v.target.value)} />
              </div>
              <button onClick={() => {
                if (locatario.length < 2 || cpf.length < 11) {
                  toast.error('Verifique os dados e preencha corretamente.')
                } else {
                  registerLocatario(fechar)
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
    </>
  )
}
