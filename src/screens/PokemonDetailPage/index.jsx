import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import PokeCard from "../../components/PokeCard";


const PokemonDetailPage = () => {
    const { id } = useParams();
    console.log("🚀 ~ PokemonDetailPage ~ params:", id)
    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3000/api/pokemons/${id}`)
            .then((response) => {
                console.log("🚀 ~ PokemonDetailPage ~ response:", response.data.pokemon)
                setPokemon(response.data.pokemon)
            })
            .catch((error) => {
                console.log("🚀 ~ PokemonDetailPage ~ error:", error)
            })

    }, [])


    return (
        <div>
            <h1>PokemonDetailPage {id} </h1>
            <h2>ATTAQUE SPE {pokemon?.base?.['Sp. Attack']}</h2>
            <h2>DEFENSE SPE {pokemon?.base?.['Sp. Defense']}</h2>
            <PokeCard
                frenchName={pokemon.name?.french}
                englishName={pokemon.name?.english}
                type={pokemon.type }
                image={pokemon.image}
                base={pokemon.base}
            />
        </div>
    )
}


export default PokemonDetailPage;
