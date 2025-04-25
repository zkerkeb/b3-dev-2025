import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import PokeCard from "../../components/PokeCard";
import { useNavigate } from "react-router";
const PokemonDetailPage = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:3000/api/pokemons/${id}`,
    })
      .then((response) => {
        console.log(response.data.pokemon);
        setPokemon(response.data.pokemon);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const HandleAlertPokemonStats = () => {
    alert(`${pokemon.name?.french} has ${pokemon.base.HP} HP, ${pokemon.base.Attack} Attack, ${pokemon.base.Defense} Defense, ${pokemon.base.Speed} Speed, ${pokemon.base.Speed} Speed`);
  }


  return (
    <div>
      <h1>Detail Page Pokemon {id}</h1>
      <PokeCard
        frenchName={pokemon.name?.french}
        englishName={pokemon.name?.english}
        type={pokemon.type}
        image={pokemon.image}
        base={pokemon.base}
        onClick={HandleAlertPokemonStats}
      />
    </div>
  );
};

export default PokemonDetailPage;
