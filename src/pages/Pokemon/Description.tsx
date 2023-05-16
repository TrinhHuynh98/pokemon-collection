import React from "react";
import { useAppSelector } from "../../app/hooks";
import Info from "../../components/Info";
import PokemonContainer from "../../components/PokemonContainer";

const Description = () => {
  const descriptionData = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );
  return (
    // <div className="page">
    <div className="page">
      <Info data={descriptionData} />
      {descriptionData && <PokemonContainer image={descriptionData.image} />}
    </div>

    // </div>
  );
};

export default Description;
