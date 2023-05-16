import { async } from "@firebase/util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc } from "firebase/firestore";
import { pokemonListRef } from "../../utils/FirebaseConfig";
import {
  genericPokemonTypeInterface,
  pokemonStatsType,
  userPokemonTypes,
} from "../../utils/Types";
import { setToast } from "../slices/AppSlice";
import { RootState } from "../store";
import { getUserPokemons } from "./getUserPokemon";

export const addPokemonList = createAsyncThunk(
  "pokemon/createPokemon",
  async (
    pokemon: {
      id: number;
      name: string;
      types: genericPokemonTypeInterface[] | string[];
      stats?: pokemonStatsType[];
    },
    { getState, dispatch }
  ) => {
    try {
      const {
        app: { userInfo },
        pokemon: { userPokemon },
      } = getState() as RootState;
      if (!userInfo?.email) {
        return dispatch(setToast("Please login to add pokemon"));
      }
      const index = userPokemon.findIndex((userPokemon: userPokemonTypes) => {
        return userPokemon.name === pokemon.name;
      });
      if (index === -1) {
        let types: string[] = [];
        // types = pokemon.types as string[];
        if (!pokemon.stats) {
          pokemon.types.forEach((type: any) =>
            types.push(Object.keys(type).toString())
          );
        } else {
          types = pokemon.types as string[];
        }
        await addDoc(pokemonListRef, {
          pokemon: { id: pokemon.id, name: pokemon.name, types },
          email: userInfo.email,
        });
        await dispatch(getUserPokemons());
        return dispatch(setToast(`${pokemon.name} add to your collection.`));
      } else {
        return dispatch(
          setToast(`This ${pokemon.name} already at your collection.`)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
);
