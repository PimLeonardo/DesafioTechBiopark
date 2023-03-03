import ApartamentosList from "./components/ApartamentosList"
import NavList from "./components/NavList"

function App() {

  return (
    <div className="w-full h-full flex">
      <NavList />
      <div className="w-full h-screen bg-gray-100 bg-center bg-no-repeat bg-contain bg-[url('./background_logo.png')]">
        <ApartamentosList />
      </div>
    </div>
  )
}

export default App
