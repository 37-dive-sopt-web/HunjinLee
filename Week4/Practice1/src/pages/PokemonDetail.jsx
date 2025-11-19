import {useEffect, useState } from 'react';
import {useParams, Link } from "react-router";
import axios from "axios";

const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(res.data);
      } catch(err) {
        console.error("정보를 불러오는데 실패", err)
      }
    }
    fetchData();
  }, [name])

  return (
    <div style={{ padding: "2rem" }}>
      <Link to="/">← 목록으로</Link>
      <h1>{pokemon.name.toUpperCase()}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} width={150} />
      <p>
        <strong>Type:</strong>
        {pokemon.types.map((t) => t.type.name).join(", ")}
      </p>
    </div>
  );
};

export default PokemonDetail;
