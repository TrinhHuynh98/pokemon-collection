import React from "react";

const PokemonContainer = ({ image }: { image: string }) => {
  return (
    <>
      <div className="image-container">
        <div className="outer-image">
          <div className="inter-image">
            <img src={image} alt="pokemon-image" />
          </div>
        </div>
        <div className="lines">
          <div className="line line-1"> </div>
          <div className="line line-2"> </div>
        </div>
      </div>
    </>
  );
};

export default PokemonContainer;
