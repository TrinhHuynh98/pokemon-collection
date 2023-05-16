import { signOut } from "firebase/auth";
import React from "react";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setPokemonTab, setToast, setUserInfo } from "../app/slices/AppSlice";
import { pokemonTabs } from "../utils/Constants";
import { firebaseAuth } from "../utils/FirebaseConfig";

const Footer = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const handleLogout = () => {
    signOut(firebaseAuth);
    dispatch(setUserInfo(undefined));
    dispatch(setToast("Logout successfully"));
  };
  const currentPokemonTab = useAppSelector(
    ({ app: { currentPokemontab } }) => currentPokemontab
  );
  const routes = [
    {
      name: pokemonTabs.description,
      value: "Description",
    },
    {
      name: pokemonTabs.evolution,
      value: "Evolution",
    },
    {
      name: pokemonTabs.locations,
      value: "Catching",
    },
    {
      name: pokemonTabs.moves,
      value: "Capable Moves",
    },
  ];

  return (
    <footer>
      <div className="block"></div>
      <div className="data">
        {location.pathname.includes("/pokemon") && (
          <ul>
            {routes.map((item) => (
              <li
                key={item.name}
                className={` ${currentPokemonTab === item.name ? "active" : ""} 
                
              `}
                onClick={() => dispatch(setPokemonTab(item.name))}
              >
                {item.value}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="block">
        <MdOutlinePowerSettingsNew onClick={handleLogout} />
      </div>
    </footer>
  );
};

export default Footer;
