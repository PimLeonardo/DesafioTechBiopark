import { CreditCardIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { api } from "../utils/api";
import Modal from "./Modal";

type Props = {
  idApartamento: number
  apartamentos: (string | number | any)[]
  getApartamentos: any
}

export default function LocatarioRegister({ getApartamentos, idApartamento, apartamentos }: Props) {
  const [locatario, setLocatario] = useState("");
  const [cpf, setCpf] = useState("");

  async function registerApartamento(fechar: () => void) {
    let body = {
      "nome": locatario,
      "cpf": parseInt(cpf),
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
      .then((response) => response.json())
      .then(() => {
        updateApartamento(fechar);
        alert("Locatario adicionado com sucesso!")
      })
      .catch(() => console.log("Erro ao adicionar locatario"))
      .finally(() => { getApartamentos(); })
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
      .catch(() => console.log("Erro ao atualizar apartamento"))
      .finally(() => { getApartamentos(); })
  }

  return (
    <>
      <Modal
        builder={(open) => (
          <button onClick={() => open()} className="font-medium gap-1 flex text-primary-100 hover:text-green-500 hover:underline">Alugar<CreditCardIcon className="h-5 w-5 hover:text-green-500" />
          </button>
        )}
        title={"Adicionar Apartamento"}
        body={(fechar) => (
          <>
            <div className="space-y-6">
              <div>
                <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900">Nome</label>
                <input type="text" name="nome" id="nome" className="bg-gray-50 border border-gray-300 text-gray-900
                text-sm rounded-lg block w-full p-2.5" placeholder="Nome do locatario"
                  onChange={(v) => setLocatario(v.target.value)}
                  required />
              </div>

              <div>
                <label htmlFor="cpf" className="block mb-2 text-sm font-medium text-gray-900">CPF</label>
                <input type="number" name="cpf" id="cpf" className="bg-gray-50 border border-gray-300 text-gray-900
                text-sm rounded-lg block w-full p-2.5" placeholder="CPF do locatario"
                  onChange={(v) => setCpf(v.target.value)}
                  required />
              </div>
              <button onClick={() => registerApartamento(fechar)} type="button" className="w-full text-white bg-secondary-100 hover:bg-secondary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Cadastrar
              </button>
            </div>
          </>
        )}
      />
    </>
  )
}
