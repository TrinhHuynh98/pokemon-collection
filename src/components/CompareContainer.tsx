import React from "react";
import {
  genericPokemonTypeInterface,
  pokemonStatType,
  userPokemonTypes,
} from "../utils/Types";
import { FaPlus } from "react-icons/fa";
import { useAppDispatch } from "../app/hooks";
import { pokemonTypes } from "../utils";
import { removeCompare } from "../app/slices/PokemonSlice";
import { useNavigate } from "react-router-dom";
import { addPokemonList } from "../app/reducers/addPokemonList";

export const CompareContainer = ({
  pokemon = undefined,
  isEmpty = undefined,
}: {
  pokemon?: userPokemonTypes;
  isEmpty?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const createStatsArray = (
    types: genericPokemonTypeInterface[],
    statType: pokemonStatType
  ) => {
    const statsArray: { name: string; image: string }[] = [];
    const statsSet = new Set<string>();
    types.forEach((type: genericPokemonTypeInterface) => {
      const key = Object.keys(type)[0];
      type[key][statType].forEach((stat: string) => {
        if (!statsSet.has(stat)) {
          // @ts-ignore
          statsArray.push({ name: stat, image: pokemonTypes[stat].image });
          statsSet.add(stat);
        }
      });
    });
    return statsArray;
  };
  const getStats = () => {
    return (
      <>
        <div className="pk-types">
          <h4 className="pk-type-title">Strength</h4>
          <div className="pk-type-icons">
            {createStatsArray(pokemon?.types!, "strength").map(
              (stat: { image: string }) => (
                <div className="pk-type">
                  <img src={stat?.image} alt="" className="pk-type-image" />
                </div>
              )
            )}
          </div>
        </div>
        <div className="pk-types">
          <h4 className="pk-type-title">Weakness</h4>
          <div className="pk-type-icons">
            {createStatsArray(pokemon?.types!, "weakness").map(
              (stat: { image: string }) => (
                <div className="pk-type">
                  <img src={stat?.image} alt="" className="pk-type-image" />
                </div>
              )
            )}
          </div>
        </div>
        <div className="pk-types">
          <h4 className="pk-type-title">Resistance</h4>
          <div className="pk-type-icons">
            {createStatsArray(pokemon?.types!, "resistance").map(
              (stat: { image: string }) => (
                <div className="pk-type">
                  <img src={stat?.image} alt="" className="pk-type-image" />
                </div>
              )
            )}
          </div>
        </div>
        <div className="pk-types">
          <h4 className="pk-type-title">Vulnerable</h4>
          <div className="pk-type-icons">
            {createStatsArray(pokemon?.types!, "vulnerable").map(
              (stat: { image: string }) => (
                <div className="pk-type">
                  <img src={stat?.image} alt="" className="pk-type-image" />
                </div>
              )
            )}
          </div>
        </div>
      </>
    );
  };
  //   console.log("pokemon", pokemon);
  return (
    <div className="compare-container">
      {isEmpty && (
        <div className="empty">
          <button onClick={() => navigate("/search")}>
            <FaPlus />
          </button>
          <h3>Add Pokemon for comparation</h3>
        </div>
      )}
      {pokemon && (
        <div className="compare-element" key={pokemon?.id}>
          <div className="compare-info">
            <div className="compare-details">
              <h3>{pokemon?.name}</h3>
              <img src={pokemon?.image} alt="" className="compare-image" />
            </div>
            <div className="compare-type-container">
              <div className="pk-types">
                <h4 className="pk-type-title">Type</h4>
                <div className="pk-type-icons">
                  {pokemon?.types.map((type: genericPokemonTypeInterface) => {
                    const key = Object.keys(type);
                    return (
                      <div className="pk-type">
                        <img
                          src={type[key[0]].image}
                          alt="pk type"
                          className="pk-type-image"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              {getStats()}
            </div>
          </div>
          <div className="compare-action-buttons">
            <button
              className="compare-btn"
              onClick={() => dispatch(addPokemonList(pokemon))}
            >
              Add
            </button>
            <button
              className="compare-btn"
              onClick={() => navigate({ pathname: `/pokemon/${pokemon?.id}` })}
            >
              View
            </button>
            <button
              className="compare-btn"
              onClick={() => dispatch(removeCompare({ id: pokemon?.id }))}
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
