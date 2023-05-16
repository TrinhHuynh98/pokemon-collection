export interface AppTypeInitialState {
  toasts: string[];
  userInfo: undefined | { email: string };
  currentPokemontab: string;
  isLoading: boolean;
}

export interface PokemonTypeInitialState {
  allPokemon: undefined | genericPokemonType[];
  randomPokemon: undefined | generatedPokemonTypes[];
  compareQueue: generatedPokemonTypes[];
  userPokemon: userPokemonTypes[];
  currentPokemon: undefined | currentPokemonType;
}

export interface currentPokemonType {
  id: number;
  name: string;
  types: generatedPokemonTypes[];
  image: string;
  stats: pokemonStatsType[];
  encounters: string[];
  evolutionLevel: number;
  evolution: { level: number; pokemon: { name: string; url: string } }[];
  pokemonAbilities: { abilities: string[]; moves: string[] };
}

export interface genericPokemonType {
  name: string;
  url: string;
}

export interface generatedPokemonTypes {
  name: string;
  id: number;
  image: string;
  types: genericPokemonTypeInterface[];
}

export interface genericPokemonTypeInterface {
  [key: string]: {
    image: string;
    resistance: string[];
    strength: string[];
    weakness: string[];
    vulnerable: string[];
  };
}

export interface userPokemonTypes extends generatedPokemonTypes {
  firebaseId?: string;
}

export interface pokemonStatsType {
  name: string;
  value: string;
}

export type pokemonStatType =
  | "vulnerable"
  | "weakness"
  | "strength"
  | "resistance";

export type pokemonElementType =
  | "bug"
  | "dark"
  | "dragon"
  | "electric"
  | "fairy"
  | "fighting"
  | "fire"
  | "flying"
  | "ghost"
  | "grass"
  | "ground"
  | "ice"
  | "normal"
  | "poison"
  | "psychic"
  | "rock"
  | "steel"
  | "water";

export interface pokemonStatsType {
  name: string;
  value: string;
}
