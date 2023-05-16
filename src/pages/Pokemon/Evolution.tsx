import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPokemonData } from "../../app/reducers/getPokemonData";
import Loader from "../../components/Loader";
import PokemonCardGrid from "../../components/PokemonCardGrid";
import { genericPokemonType } from "../../utils/Types";

const Evolution = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const pokemonData = useAppSelector(({ pokemon }) => pokemon);

  useEffect(() => {
    const fetchData = async () => {
      const pokemons: genericPokemonType[] =
        pokemonData.currentPokemon!.evolution.map(
          ({ pokemon }: { pokemon: genericPokemonType }) => pokemon
        );
      await dispatch(getPokemonData(pokemons));
      setLoaded(true);
    };
    fetchData();
  }, []);
  return (
    <div className="page">
      {loaded ? (
        <PokemonCardGrid pokemons={pokemonData.randomPokemon!} />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Evolution;
