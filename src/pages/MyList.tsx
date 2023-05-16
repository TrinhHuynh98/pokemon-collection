import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUserPokemons } from "../app/reducers/getUserPokemon";
import Login from "../components/Login";
import PokemonCardGrid from "../components/PokemonCardGrid";
import Wrapper from "../sections/Wrapper";

const MyList = () => {
  const { userInfo } = useAppSelector(({ app }) => app);
  const { userPokemon } = useAppSelector(({ pokemon }) => pokemon);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserPokemons());
  }, [userInfo, dispatch]);
  return (
    <div className="list">
      {userInfo ? <PokemonCardGrid pokemons={userPokemon} /> : <Login />}
    </div>
  );
};

export default Wrapper(MyList);
