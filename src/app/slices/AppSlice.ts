import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pokemonTabs } from "../../utils/Constants";
import { AppTypeInitialState } from "../../utils/Types";

const initialState: AppTypeInitialState = {
  toasts: [],
  userInfo: undefined,
  currentPokemontab: pokemonTabs.description,
  isLoading: true,
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToast: (state, action) => {
      const mesg = [...state.toasts];
      mesg.push(action.payload);
      state.toasts = mesg;
    },
    clearToast: (state) => {
      state.toasts = [];
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setPokemonTab: (state, action) => {
      state.currentPokemontab = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setToast, clearToast, setUserInfo, setPokemonTab, setLoading } =
  AppSlice.actions;
