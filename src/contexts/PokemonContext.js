import { createContext, useState, useEffect, useContext } from 'react'

export const PokemonContext = createContext()

export const PokemonProvider = ({ children }) => {
  const [myPokemon, setMyPokemon] = useState([])

  const addMyPokemon = (pokemon) => {
    setMyPokemon((prevMyPokemon) => {
      // cek apakah kita sudah menambahkan pokemon yang sama sebelumnya
      // jika sudah, tak perlu lakukan penambahan lagi
      if (prevMyPokemon.findIndex((element) => pokemon.id === element.id) >= 0)
        return prevMyPokemon

      prevMyPokemon.push(pokemon)
      return prevMyPokemon
    })
  }

  return (
    <PokemonContext.Provider
      value={{
        myPokemon,
        addMyPokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  )
}

export const usePokemon = () => {
  const context = useContext(PokemonContext)
  if (context === undefined) {
    throw new Error('usePokemon must be used within a CountProvider')
  }
  return context
}
