import React, { useEffect, useState } from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs'
import { usePokemon } from '../../contexts/PokemonContext'

import dec1 from '../../assets/img/dec/opacity-3.png'
import { BsArrowLeft } from 'react-icons/bs'
import { FaRegHeart, FaHeart, FaMars, FaMercury } from 'react-icons/fa'
import './PokemonDetail.css'

const PokemonDetail = ({ show, setShow, pokemon }) => {
  const { myPokemon, addMyPokemon } = usePokemon()
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (myPokemon.findIndex((element) => pokemon.id === element.id) >= 0) {
      setIsFavorite(true)
    } else {
      setIsFavorite(false)
    }
    console.log(pokemon)
  }, [pokemon])

  return (
    <>
      {pokemon && (
        <div
          className={`container pokemon-detail ${pokemon.color} ${
            show && 'show'
          }`}
        >
          <img src={dec1} alt='' className='decoration-1' />
          <div className='decoration-2'></div>
          <div className='nav'>
            <div className='back-btn btn'>
              <BsArrowLeft onClick={() => setShow(false)} />
            </div>
            <div
              className='add-favorite btn'
              onClick={() => {
                addMyPokemon(pokemon)
                setIsFavorite(true)
              }}
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </div>
          </div>
          <>
            <div className='heading'>
              <div>
                <h1>{pokemon.name}</h1>
                <div className='pokemon-types'>
                  {pokemon.types.map((type, index) => (
                    <div className='pokemon-type' key={index}>
                      {type.type.name}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p>#{pokemon.id.toString().padStart(3, '0')}</p>
              </div>
            </div>
            <div className='description'>
              <img
                className='desc-image'
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt=''
              />
              <Tabs>
                <TabList>
                  <Tab>About</Tab>
                  <Tab>Base Stats</Tab>
                  <Tab>Evolution</Tab>
                  <Tab>Moves</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {/* About */}
                    <div className='desc-row'>
                      <div className='desc-col-1'>Species</div>
                      <div className='desc-col-2'>Seed</div>
                    </div>
                    <div className='desc-row'>
                      <div className='desc-col-1'>Height</div>
                      <div className='desc-col-2'>{pokemon.height}</div>
                    </div>
                    <div className='desc-row'>
                      <div className='desc-col-1'>Weight</div>
                      <div className='desc-col-2'>{pokemon.weight}</div>
                    </div>
                    <div className='desc-row'>
                      <div className='desc-col-1'>Abilities</div>
                      <div className='desc-col-2 text-capitalize'>
                        {pokemon.abilities.map((ability, index) => (
                          <span key={index}>{ability.ability.name}, </span>
                        ))}
                      </div>
                    </div>
                    <h3>Breeding</h3>
                    <div className='desc-row'>
                      <div className='desc-col-1'>Gender</div>
                      <div className='desc-col-2'>
                        <div className='flex gap-1'>
                          <div>
                            <FaMars className='clr-blue' /> 87.5%
                          </div>
                          <div>
                            <FaMercury className='clr-red' /> 12.5%
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='desc-row'>
                      <div className='desc-col-1'>Egg Groups</div>
                      <div className='desc-col-2'>Monster</div>
                    </div>
                    <div className='desc-row'>
                      <div className='desc-col-1'>Egg Cycle</div>
                      <div className='desc-col-2'>Grass</div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    {/* Base Stats */}
                    <div className='desc-row'>
                      <div className='desc-col-1'>HP</div>
                      <div className='desc-col-2 progress'>
                        <p>{pokemon.stats[0].base_stat}</p>
                        <div className='progress-bar'>
                          <span
                            style={{
                              display: 'block',
                              width: `${pokemon.stats[0].base_stat}%`,
                              backgroundColor: 'var(--green)',
                            }}
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div className='desc-row'>
                      <div className='desc-col-1'>Attack</div>
                      <div className='desc-col-2 progress'>
                        <p>{pokemon.stats[1].base_stat}</p>
                        <div className='progress-bar'>
                          <span
                            style={{
                              display: 'block',
                              width: `${pokemon.stats[1].base_stat}%`,
                              backgroundColor: 'var(--red)',
                            }}
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div className='desc-row'>
                      <div className='desc-col-1'>Defense</div>
                      <div className='desc-col-2 progress'>
                        <p>{pokemon.stats[2].base_stat}</p>
                        <div className='progress-bar'>
                          <span
                            style={{
                              display: 'block',
                              width: `${pokemon.stats[2].base_stat}%`,
                              backgroundColor: 'var(--green)',
                            }}
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div className='desc-row'>
                      <div className='desc-col-1'>Sp. Atk</div>
                      <div className='desc-col-2 progress'>
                        <p>{pokemon.stats[3].base_stat}</p>
                        <div className='progress-bar'>
                          <span
                            style={{
                              display: 'block',
                              width: `${pokemon.stats[3].base_stat}%`,
                              backgroundColor: 'var(--red)',
                            }}
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div className='desc-row'>
                      <div className='desc-col-1'>Sp. Def</div>
                      <div className='desc-col-2 progress'>
                        <p>{pokemon.stats[4].base_stat}</p>
                        <div className='progress-bar'>
                          <span
                            style={{
                              display: 'block',
                              width: `${pokemon.stats[4].base_stat}%`,
                              backgroundColor: 'var(--green)',
                            }}
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div className='desc-row'>
                      <div className='desc-col-1'>Speed</div>
                      <div className='desc-col-2 progress'>
                        <p>{pokemon.stats[5].base_stat}</p>
                        <div className='progress-bar'>
                          <span
                            style={{
                              display: 'block',
                              width: `${pokemon.stats[5].base_stat}%`,
                              backgroundColor: 'var(--green)',
                            }}
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div className='desc-row'>
                      <div className='desc-col-1'>Total</div>
                      <div className='desc-col-2 progress'>
                        <p>
                          {pokemon.stats[0].base_stat +
                            pokemon.stats[1].base_stat +
                            pokemon.stats[2].base_stat +
                            pokemon.stats[3].base_stat +
                            pokemon.stats[4].base_stat +
                            pokemon.stats[5].base_stat}
                        </p>
                        <div className='progress-bar'>
                          <span
                            style={{
                              display: 'block',
                              width: `${
                                ((pokemon.stats[0].base_stat +
                                  pokemon.stats[1].base_stat +
                                  pokemon.stats[2].base_stat +
                                  pokemon.stats[3].base_stat +
                                  pokemon.stats[4].base_stat +
                                  pokemon.stats[5].base_stat) /
                                  500) *
                                100
                              }%`,
                              backgroundColor: 'var(--green)',
                            }}
                          ></span>
                        </div>
                      </div>
                    </div>
                    <h3>Type defenses</h3>
                    <p className='clr-gray'>
                      The effectiveness of each type on Charmander.
                    </p>
                  </TabPanel>
                  <TabPanel>
                    <p>evolution panel</p>
                  </TabPanel>
                  <TabPanel>
                    {/* Moves Panel */}
                    {pokemon.moves.map((move) => (
                      <p className='text-capitalize'>{move.move.name}</p>
                    ))}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </>
        </div>
      )}
    </>
  )
}

export default PokemonDetail
