import axios from 'axios'
import {  useEffect, useState,useRef } from 'react'
import PokeCard from '../PokeCard'
import './index.css'
import { useNavigate } from 'react-router'



const PokeList = () => {
const navigate = useNavigate();
const [pokemons, setPokemons] = useState([])
const [search, setSearch] = useState('')
const [isLoading, setIsLoading] = useState(false)

const searchRef = useRef(null)
useEffect(() => {
    document.addEventListener('keydown', (e) => {
        if(search.length > 0 && e.key === 'Enter'){
            navigate(`/pokemon/${pokemons[0]._id}`)
        }
    })
    console.log('pokemons', pokemons)
}, [pokemons])

const getPokemons = async () => {
    setIsLoading(true)
    
    axios({
        method: 'GET',
        url: `http://localhost:3000/api/pokemons?search=${search}`,
     
    })
    .then((response) =>{
        setIsLoading(false)
        setPokemons(response.data.pokemons)
    })
    .catch((error) => {
        setIsLoading(false)
        console.log('error', error)
    })

}
    useEffect(() => {
        clearTimeout(searchRef.current)


        searchRef.current = setTimeout(() => {
            getPokemons()
        }, 500)

        
    },[search])





    const handleNavigationToDetailPage = (id) => {
        navigate(`/pokemon/${id}`)
    }
    

    return (
        <div>
            <h1>PokeList</h1>
            <input className='search-input' type="text" placeholder='Search' onChange={(e) => setSearch(e.target.value)} />
            <div className='search-container'>
            
                {search && pokemons.slice(0, 5).map(poke => {
               if(isLoading){
                return <div>Loading...</div>
            }
                    return (
                        <div onClick={() => navigate(`/pokemon/${poke._id}`)} className='mini-poke-card'>
                            <img width={100} height={100} src={poke.image} alt={poke.name} />
                            <h3>{poke.name.french}</h3>
                        </div>
                    )
                })}
            </div>
            <div className='poke-list'>
            {pokemons.map(pokemon => {
                return (
                    <div
                    onClick={() => navigate(`/pokemon/${pokemon._id}`)}
                    className='poke-list-item'> 
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