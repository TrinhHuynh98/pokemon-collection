import { async } from "@firebase/util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDoc, doc } from "firebase/firestore";
import { pokemonListRef } from "../../utils/FirebaseConfig";

export const deletePokemonFromUserList = createAsyncThunk(
  "pokemon/deletePokemonFromList",
  async ({ id }: { id: string }) => {
    try {
      await deleteDoc(doc(pokemonListRef, id));
      return { id };
    } catch (error) {}
  }
);
