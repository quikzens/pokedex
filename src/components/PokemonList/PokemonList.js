import React, { useEffect, useState } from 'react'
import { usePokemon } from '../../contexts/PokemonContext'
import { useGet } from '../../hooks/useGet'

import dec1 from '../../assets/img/dec/opacity.png'

import { BsArrowLeft, BsFillGridFill } from 'react-icons/bs'
import { FaList, FaSlidersH } from 'react-icons/fa'
import PokemonDetail from '../PokemonDetail/PokemonDetail'
import './PokemonList.css'

const PokemonList = () => {
  const [pokemons, setPokemons] = useState(null)
  const [showDetail, setShowDetail] = useState(false)
  const [pokemonDetail, setPokemonDetail] = useState(null)
  const [showMyPokemon, setShowMyPokemon] = useState(false)

  const { myPokemon } = usePokemon()
  let { data: pokemonsData } = useGet('/pokemon')

  useEffect(() => {
    if (!pokemonsData.results) return
    ;(async () => {
      let datas = await Promise.all(
        pokemonsData.results.map(async (pokemon) => {
          let data
          let species

          try {
            // get details of each pokemon
            let response = await fetch(pokemon.url)
            data = await response.json()

            // get associate color color of each pokemon
            response = await fetch(
              `https://pokeapi.co/api/v2/pokemon-species/${data.id}/`
            )
            species = await response.json()
          } catch (err) {
            console.log(err)
          }

          return Promise.resolve({ ...data, color: species.color.name })
        })
      )
      setPokemons(datas)
    })()
  }, [pokemonsData])

  return (
    <>
      <div className='container pokemon-list'>
        <img src={dec1} alt='' className='decoration-1' />
        <div className='decoration-2'>
          <FaSlidersH />
        </div>
        <div className='nav'>
          <div className='back-btn btn'>
            <BsArrowLeft />
          </div>
          <div
            className='my-pokemon-btn btn'
            onClick={() => setShowMyPokemon(!showMyPokemon)}
          >
            {showMyPokemon ? <BsFillGridFill /> : <FaList />}
          </div>
        </div>
        <h1 className='title'>{showMyPokemon ? 'My Pokemon' : 'Pokedex'}</h1>
        {showMyPokemon ? (
          <div className='list'>
            {myPokemon &&
              myPokemon.map((pokemon, index) => (
                <div
                  className={`pokemon-item ${pokemon.color}`}
                  key={index}
                  onClick={() => {
                    setShowDetail(true)
                    setPokemonDetail(pokemon)
                  }}
                >
                  <h3>{pokemon.name}</h3>
                  <div className='pokemon-types'>
                    {pokemon.types.map((type, index) => (
                      <div className='pokemon-type' key={index}>
                        {type.type.name}
                      </div>
                    ))}
                  </div>
                  <img
                    src={
                      pokemon.sprites.other['official-artwork'].front_default
                    }
                  />
                </div>
              ))}
          </div>
        ) : (
          <div className='list'>
            {pokemons &&
              pokemons.map((pokemon, index) => {
                return (
                  <div
                    className={`pokemon-item ${pokemon.color}`}
                    key={index}
                    onClick={() => {
                      setShowDetail(true)
                      setPokemonDetail(pokemon)
                    }}
                  >
                    <h3>{pokemon.name}</h3>
                    <div className='pokemon-types'>
                      {pokemon.types.map((type, index) => (
                        <div className='pokemon-type' key={index}>
                          {type.type.name}
                        </div>
                      ))}
                    </div>
                    <img
                      src={
                        pokemon.sprites.other['official-artwork'].front_default
                      }
                    />
                  </div>
                )
              })}
          </div>
        )}
      </div>
      <PokemonDetail
        show={showDetail}
        setShow={setShowDetail}
        pokemon={pokemonDetail}
      />
    </>
  )
}

export default PokemonList
