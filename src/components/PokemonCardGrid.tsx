import React from "react";
import { genericPokemonTypeInterface, userPokemonTypes } from "../utils/Types";
import { IoGitCompare } from "react-icons/io5";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { addCompare, setCurrentPokemon } from "../app/slices/PokemonSlice";
import { setPokemonTab, setToast } from "../app/slices/AppSlice";
import { addPokemonList } from "../app/reducers/addPokemonList";
import { deletePokemonFromUserList } from "../app/reducers/deletePokemonList";
import { pokemonTabs } from "../utils/Constants";

const PokemonCardGrid = ({ pokemons }: { pokemons: userPokemonTypes[] }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div className="pokemon-card-grid-container">
      <div className="pokemon-card-grid">
        {pokemons &&
          pokemons.length > 0 &&
          pokemons?.map((data: any) => {
            return (
              <div className="pokemon-card" key={data.id}>
                <div className="pokemon-card-list">
                  {location.pathname.includes("./pokemon") ? (
                    <FaPlus
                      className="plus"
                      onClick={() => dispatch(addPokemonList(data))}
                    />
                  ) : location.pathname.includes("/search") ? (
                    <FaPlus
                      className="plus"
                      onClick={() => dispatch(addPokemonList(data))}
                    />
                  ) : (
                    <FaTrash
                      className="trash"
                      onClick={async () => {
                        await dispatch(
                          deletePokemonFromUserList({ id: data.firebaseId! })
                        );
                        dispatch(setToast("Pokemon deleted successfully"));
                      }}
                    />
                  )}
                </div>
                <div className="pokemon-card-compare">
                  <IoGitCompare
                    onClick={() => {
                      dispatch(addCompare(data));
                      dispatch(
                        setToast(`${data.name} has been added to comapre list`)
                      );
                    }}
                  />
                </div>
                <h3 className="pokemon-card-title">{data.name}</h3>
                <img
                  src={data.image}
                  alt=""
                  className="pokemon-card-image"
                  loading="lazy"
                  onClick={() => {
                    dispatch(setPokemonTab(pokemonTabs.description));
                    dispatch(setCurrentPokemon(undefined));
                    navigate(`/pokemon/${data.id}`);
                  }}
                />
                <div className="pokemon-card-types">
                  {data.types.map(
                    (item: genericPokemonTypeInterface, index: number) => {
                      const keys = Object.keys(item);
                      return (
                        <div className="pokemon-card-types-type" key={index}>
                          <img
                            src={item[keys[0]].image}
                            alt="pokemon type"
                            loading="lazy"
                            className="pokemon-card-types-type-image"
                          />
                          <h6 className="pokemon-card-types-type-text">
                            {keys[0]}
                          </h6>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PokemonCardGrid;
