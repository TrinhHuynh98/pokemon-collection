import { createSlice } from "@reduxjs/toolkit";
import {
  generatedPokemonTypes,
  PokemonTypeInitialState,
} from "../../utils/Types";
import { deletePokemonFromUserList } from "../reducers/deletePokemonList";
import { getInitialPokemonData } from "../reducers/getInitalPokemonData";
import { getPokemonData } from "../reducers/getPokemonData";
import { getUserPokemons } from "../reducers/getUserPokemon";

const initialState: PokemonTypeInitialState = {
  allPokemon: undefined,
  randomPokemon: undefined,
  compareQueue: [],
  userPokemon: [],
  currentPokemon: undefined,
};

export const PokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    addCompare: (state, action) => {
      const index = state.compareQueue.findIndex(
        (pk: generatedPokemonTypes) => pk.id === action.payload.id
      );
      if (index === -1) {
        if (state.compareQueue.length === 2) {
          state.compareQueue.pop();
        }
        state.compareQueue.unshift(action.payload);
      }
    },
    removeCompare: (state, action) => {
      const index = state.compareQueue.findIndex(
        (pk: generatedPokemonTypes) => pk.id === action.payload.id
      );
      const compareList = [...state.compareQueue];
      compareList.splice(index, 1);
      state.compareQueue = compareList;
    },
    setCurrentPokemon: (state, action) => {
      state.currentPokemon = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInitialPokemonData.fulfilled, (state, action) => {
      state.allPokemon = action.payload;
    });
    builder.addCase(getPokemonData.fulfilled, (state, action) => {
      state.randomPokemon = action.payload;
    });
    builder.addCase(getUserPokemons.fulfilled, (state, action) => {
      state.userPokemon = action.payload!;
    });
    builder.addCase(deletePokemonFromUserList.fulfilled, (state, action) => {
      const userPokemons = [...state.userPokemon];
      const pkIndex = userPokemons.findIndex(
        (pokemon) => pokemon.firebaseId === action.payload?.id
      );
      userPokemons.splice(pkIndex, 1);
      state.userPokemon = userPokemons;
    });
  },
});

export const { addCompare, removeCompare, setCurrentPokemon } =
  PokemonSlice.actions;
