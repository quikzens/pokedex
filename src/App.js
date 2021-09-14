import React from "react"
import { PokemonProvider } from "./contexts/PokemonContext"

import PokemonList from "./components/PokemonList/PokemonList"

const App = () => {
  return (
    <PokemonProvider>
      <PokemonList />
    </PokemonProvider>
  )
}

export default App
