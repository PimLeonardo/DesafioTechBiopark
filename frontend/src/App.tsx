import { useState } from "react";
import ApartamentosList from "./components/ApartamentosList"
import EdificioList from "./components/EdificioList"
import Modal from "./components/Modal";
import { api } from "./utils/api";

function App() {
  const [idEdificio, setIdEdificio] = useState<number | null>();

  return (
    <div className="w-full h-full flex relative">
      <EdificioList
        setIdEdificio={setIdEdificio}
      />
      <ApartamentosList
        idEdificio={idEdificio}
      />
    </div>
  )
}

export default App
