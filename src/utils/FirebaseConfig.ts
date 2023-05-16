// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFa9B8HbbwK8I5tMNdnnV8x7v_4g58qtU",

  authDomain: "pokestore-9d594.firebaseapp.com",

  projectId: "pokestore-9d594",

  storageBucket: "pokestore-9d594.appspot.com",

  messagingSenderId: "621073462297",

  appId: "1:621073462297:web:0e7659d0a0dc669da96688",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDb = getFirestore(app);

export const usersRef = collection(firebaseDb, "users");
export const pokemonListRef = collection(firebaseDb, "pokemonList");
