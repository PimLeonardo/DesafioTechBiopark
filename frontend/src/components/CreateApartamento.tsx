import { useState } from "react";
import { api } from "../utils/api";
import Modal from "./Modal";

type Props = {
  getApartamentos: any;
  idEdificio: number;
}

export default function CreateApartamento({ getApartamentos, idEdificio }: Props) {
  const [locatario, setLocatario] = useState("");
  const [numero, setNumero] = useState("");
  const [aluguel, setAluguel] = useState("");

  async function createApartamento(fechar: () => void) {
    let body = {
      "numero": Number(numero),
      "aluguel": Number(aluguel),
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
      .then((response) => response.json())
      .then(() => {
        alert("Apartamento adicionado com sucesso!")
        fechar();
      })
      .catch(() => console.log("Erro ao adicionar apartamento"))
      .finally(() => { getApartamentos(); })
  }

  return (
    <div className={`absolute right-0 bottom-0 ${idEdificio === null || idEdificio === undefined ? 'hidden' : 'visible'}`}>
      <Modal
        builder={(open) => (
          <button onClick={() => open()} type="button" className="w-24 h-24 m-5 bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm text-white">
            Adicionar
          </button>
        )}
        title={"Adicionar Apartamento"}
        body={(fechar) => (
          <>
            <div className="space-y-6">
              <div>
                <label htmlFor="numero" className="block mb-2 text-sm font-medium text-gray-900">Número</label>
                <input type="number" name="numero" id="numero" className="bg-gray-50 border border-gray-300 text-gray-900
                text-sm rounded-lg block w-full p-2.5" placeholder="Número do apartamento"
                  onChange={(v) => setNumero(v.target.value)}
                  required />
              </div>

              <div>
                <label htmlFor="aluguel" className="block mb-2 text-sm font-medium text-gray-900">Aluguel</label>
                <input type="number" name="aluguel" id="aluguel" className="bg-gray-50 border border-gray-300 text-gray-900
                text-sm rounded-lg block w-full p-2.5" placeholder="Preço do aluguel"
                  onChange={(v) => setAluguel(v.target.value)}
                  required />
              </div>
              <button onClick={() => createApartamento(fechar)} type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Cadastrar
              </button>
            </div>
          </>
        )}
      />
    </div>
  )
}
