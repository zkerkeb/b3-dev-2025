import axios from 'axios'
import {  useEffect, useState } from 'react'
import PokeCard from '../PokeCard'
import './index.css'


const PokeList = () => {
const [pokemons, setPokemons] = useState([])

useEffect(() => {
    console.log('pokemons', pokemons)
}, [pokemons])

    useEffect(() => {

        axios({
            method: 'GET',
            url: 'http://localhost:3000/api/pokemons'
        })
        .then((response) =>{
            setPokemons(response.data.pokemons)
        })
        .catch((error) => {
            console.log('error', error)
        })

        
    },[])

    return (
        <div>
            <h1>PokeList</h1>
            <div className='poke-list'>
            {pokemons.map(pokemon => {
                return (
                    <div className='poke-list-item'> 
                   <PokeCard frenchName={pokemon.name.french} englishName={pokemon.name.english} type={pokemon.type}
                   image={pokemon.image}
                   base={pokemon.base}
                />
                </div>
                )
            })}
            </div>
        </div>
    )
}

export default PokeList;