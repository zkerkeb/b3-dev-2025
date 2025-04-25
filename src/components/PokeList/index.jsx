import axios from 'axios'
import {  useEffect, useState } from 'react'
import PokeCard from '../PokeCard'
import './index.css'
import { useNavigate } from 'react-router'


const PokeList = () => {
const navigate = useNavigate();
const [pokemons, setPokemons] = useState([])



useEffect(() => {
    console.log('pokemons', pokemons)
}, [pokemons])

    useEffect(() => {

        axios({
            method: 'GET',
            url: 'http://localhost:3000/api/pokemons',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((response) =>{
            setPokemons(response.data.pokemons)
        })
        .catch((error) => {
            if (error.response.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            }
            console.log('error', error)
        })

        
    },[])



    const handleNavigationToDetailPage = (id) => {
        navigate(`/pokemon/${id}`)
    }
    

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
                   id={pokemon.id}
                   onClick={() => handleNavigationToDetailPage(pokemon.id)}
                />
                </div>
                )
            })}
            </div>
        </div>
    )
}

export default PokeList;