import React, { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { addPokemonList } from "../app/reducers/addPokemonList";
import { setPokemonTab } from "../app/slices/AppSlice";
import { pokemonTypes } from "../utils";
import { pokemonTabs } from "../utils/Constants";
import { currentPokemonType, pokemonStatsType } from "../utils/Types";

const Info = ({ data }: { data: currentPokemonType | undefined }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const progressBars = document.querySelectorAll("progress");
    progressBars.forEach((progressBar) => {
      progressBar.style.width = "10rem";
    });
  }, []);

  const createStatsArray = (types: string[], statType: string) => {
    const statSet = new Set();
    types.forEach((type: string) => {
      // @ts-ignore
      pokemonTypes[type][statType].forEach((stat: string) => {
        if (!statSet.has(stat)) {
          statSet.add(stat[0].toLowerCase() + stat.slice(1));
        }
      });
    });
    return Array.from(statSet);
  };

  return (
    <>
      <div className="details">
        <div className="name">{data?.name}</div>
        <h3> Type: {data?.types.join("-")}</h3>
        <h3>Evolution: {data?.evolutionLevel}</h3>
        <button onClick={() => dispatch(setPokemonTab(pokemonTabs.evolution))}>
          See next evolution
        </button>
      </div>
      <div className="stats">
        <ul>
          {data?.stats.map((stat: pokemonStatsType) => (
            <li key={stat.name}>
              {stat.name} : {stat.value}
              <progress max={100} value={stat.value} />
            </li>
          ))}
        </ul>
      </div>
      <div className="battle-stats">
        <ul>
          <li>
            <span>Strengths:</span>
            <span>
              {createStatsArray(
                data?.types as unknown as string[],
                "strength"
              ).join(", ")}
            </span>
          </li>
          <li>
            <span>Weakness:</span>
            <span>
              {createStatsArray(
                data?.types as unknown as string[],
                "weakness"
              ).join(", ")}
            </span>
          </li>
          <li>
            <span>Resistant:</span>
            <span>
              {createStatsArray(
                data?.types as unknown as string[],
                "resistance"
              ).join(", ")}
            </span>
          </li>
          <li>
            <span>Vulnerable:</span>
            <span>
              {createStatsArray(
                data?.types as unknown as string[],
                "vulnerable"
              ).join(", ")}
            </span>
          </li>
        </ul>
        <button
          //@ts-ignore
          onClick={() => dispatch(addPokemonList(data!))}
          className="add-pokemon"
        >
          Add Pokemon
        </button>
      </div>
    </>
  );
};

export default Info;
