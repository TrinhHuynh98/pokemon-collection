import React from "react";
import { useAppSelector } from "../../app/hooks";

const CapableMoves = () => {
  const locationData = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );
  return (
    <div className="page pokemon-moves">
      <h1 className="pokemon-moves-title">Abilities</h1>
      <ul className="pokemon-moves-list">
        {locationData?.pokemonAbilities.abilities?.map((ability: string) => (
          <li key={ability} className="pokemon-move">
            {ability}
          </li>
        ))}
      </ul>
      <h1 className="pokemon-moves-title">Moves</h1>
      <ul className="pokemon-moves-list">
        {locationData?.pokemonAbilities.moves?.map((move: string) => (
          <li key={move} className="pokemon-move">
            {move}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CapableMoves;
