import { useState } from "react";
import ApartamentoList from "./components/ApartamentoList"
import EdificioList from "./components/EdificioList"

function App() {
  const [idEdificio, setIdEdificio] = useState<number | null>();

  return (
    <div className="w-full h-full flex relative">
      <EdificioList
        setIdEdificio={setIdEdificio}
      />
      <ApartamentoList
        idEdificio={idEdificio}
      />
    </div>
  )
}

export default App
