import { async } from "@firebase/util";
import axios from "axios";
import extractColors from "extract-colors";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setPokemonTab } from "../app/slices/AppSlice";
import { setCurrentPokemon } from "../app/slices/PokemonSlice";
import Loader from "../components/Loader";
import Wrapper from "../sections/Wrapper";
import { defaultImages, images } from "../utils";
import {
  pokemonRoute,
  pokemonSpeciesRoute,
  pokemonTabs,
} from "../utils/Constants";
import CapableMoves from "./Pokemon/CapableMoves";
import Description from "./Pokemon/Description";
import Evolution from "./Pokemon/Evolution";
import Locations from "./Pokemon/Locations";

const Pokemon = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [isDataLoading, setIsDataLoading] = useState(true);

  const currentPokemonTabData = useAppSelector(
    ({ app: { currentPokemontab } }) => currentPokemontab
  );
  const currentPokemon = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );

  useEffect(() => {
    dispatch(setPokemonTab(pokemonTabs.description));
  }, [dispatch]);

  const getRecursiveEvolution = useCallback(
    // @ts-ignore
    (evolutionChain, level, evolutionData) => {
      if (!evolutionChain.evolves_to.length) {
        return evolutionData.push({
          pokemon: {
            ...evolutionChain.species,
            url: evolutionChain.species.url.replace(
              "pokemon-species",
              "pokemon"
            ),
          },
          level,
        });
      }
      evolutionData.push({
        pokemon: {
          ...evolutionChain.species,
          url: evolutionChain.species.url.replace("pokemon-species", "pokemon"),
        },
        level,
      });
      return getRecursiveEvolution(
        evolutionChain.evolves_to[0],
        level + 1,
        evolutionData
      );
    },
    []
  );

  const getEvolutionData = useCallback(
    // @ts-ignore
    (evolutionChain) => {
      const evolutionData: any[] = [];
      getRecursiveEvolution(evolutionChain, 1, evolutionData);
      return evolutionData;
    },
    [getRecursiveEvolution]
  );

  const getPokemonInfo = useCallback(
    async (image: any) => {
      const { data } = await axios.get(`${pokemonRoute}/${params.id}`);
      const { data: dataEncounters } = await axios.get(
        data.location_area_encounters
      );

      const {
        data: {
          evolution_chain: { url: evolutionURL },
        },
      } = await axios.get(`${pokemonSpeciesRoute}/${data.id}`);
      const { data: evolutionData } = await axios.get(evolutionURL);

      const pokemonAbilities = {
        abilities: data.abilities.map(
          ({ ability }: { ability: any }) => ability.name
        ),
        moves: data.moves.map(({ move }: { move: any }) => move.name),
      };

      const encounters: any[] = [];
      const evolution = getEvolutionData(evolutionData.chain);
      let evolutionLevel;
      evolutionLevel = evolution.find(
        ({ pokemon }) => pokemon.name === data.name
      ).level;
      dataEncounters.forEach((encounter: any) => {
        encounters.push(
          encounter.location_area.name.toUpperCase().split("-").join(" ")
        );
      });
      const stats = await data.stats.map(
        ({ stat, base_stat }: { stat: any; base_stat: any }) => ({
          name: stat.name,
          value: base_stat,
        })
      );
      dispatch(
        setCurrentPokemon({
          id: data.id,
          name: data.name,
          types: data.types.map(
            ({ type: { name } }: { type: { name: any } }) => name
          ),
          image,
          stats,
          encounters,
          evolutionLevel,
          evolution,
          pokemonAbilities,
        })
      );
      setIsDataLoading(false);
    },
    [params.id, dispatch, getEvolutionData]
  );

  useEffect(() => {
    const imageElemet = document.createElement("img");
    // @ts-ignore
    imageElemet.src = images[params.id];

    const options = {
      pixels: 10000,
      distance: 1,
      splitPower: 10,
      // @ts-ignore
      colorValidator: (red, green, blue, alpha = 255) => alpha > 250,
      saturationDistance: 0.2,
      lightnessDistance: 0.2,
      hueDistance: 0.083333333,
    };

    const getColor = async () => {
      // @ts-ignore
      const color = await extractColors(imageElemet.src, options);
      console.log("color", color);
      // console.log("color detail", color[0].hex.split('"')[0]);
      const root = document.documentElement;
      root.style.setProperty("--accent-color", color[0].hex.split('"')[0]);
    };
    getColor();
    // @ts-ignore
    let image = images[params.id];
    if (!image) {
      // @ts-ignore
      image = defaultImages[params.id];
    }

    getPokemonInfo(image);
  }, [params.id]);
  return (
    <>
      {currentPokemon ? (
        <>
          {currentPokemonTabData === pokemonTabs.description && <Description />}
          {currentPokemonTabData === pokemonTabs.evolution && <Evolution />}
          {currentPokemonTabData === pokemonTabs.locations && <Locations />}
          {currentPokemonTabData === pokemonTabs.moves && <CapableMoves />}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Wrapper(Pokemon);
