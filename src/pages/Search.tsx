import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getInitialPokemonData } from "../app/reducers/getInitalPokemonData";
import { getPokemonData } from "../app/reducers/getPokemonData";
import { setLoading } from "../app/slices/AppSlice";
import Loader from "../components/Loader";
import PokemonCardGrid from "../components/PokemonCardGrid";
import Wrapper from "../sections/Wrapper";
import { debounce } from "../utils/Debounce";

const Search = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(({ app: { isLoading } }) => isLoading);
  const { allPokemon, randomPokemon } = useAppSelector(
    ({ pokemon }) => pokemon
  );
  useEffect(() => {
    dispatch(getInitialPokemonData());
  }, [dispatch]);

  useEffect(() => {
    if (allPokemon) {
      const clonedPokemon = [...allPokemon];
      const randomPokemonId = clonedPokemon
        .sort(() => Math.random() - Math.random())
        .slice(0, 20);
      dispatch(getPokemonData(randomPokemonId));
    }
  }, [allPokemon, dispatch]);

  const getPokemon = async (value: string) => {
    if (value.length) {
      const pokemons = allPokemon?.filter((item) =>
        item.name.includes(value.toLowerCase())
      );
      dispatch(getPokemonData(pokemons!));
    } else {
      const clonedPokemon = [...(allPokemon as [])];
      const randomPokemonId = clonedPokemon
        .sort(() => Math.random() - Math.random())
        .slice(0, 20);
      dispatch(getPokemonData(randomPokemonId));
    }
  };
  const handleChange = debounce((value: string) => getPokemon(value), 300);
  useEffect(() => {
    if (randomPokemon) {
      dispatch(setLoading(false));
    }
  }, [randomPokemon, dispatch]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="search">
          <input
            type="text"
            className="pokemon-searchbar"
            placeholder="Search Pokemon"
            onChange={(e) => {
              handleChange(e.target.value);
            }}
          />
          <PokemonCardGrid pokemons={randomPokemon!} />
        </div>
      )}
    </>
  );
};

export default Wrapper(Search);
