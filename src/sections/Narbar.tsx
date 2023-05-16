import React, { useEffect, useState } from "react";
import pokeballIcon from "../assets/pokeball-icon.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";

const navigationRoutes = [
  {
    name: "Search",
    route: "/search",
  },
  {
    name: "Compare",
    route: "/compare",
  },
  {
    name: "Pokemon",
    route: "/pokemon",
  },
  {
    name: "My List",
    route: "/list",
  },
  {
    name: "About",
    route: "/about",
  },
];

const Narbar = () => {
  const location = useLocation();

  useEffect(() => {
    const index = navigationRoutes.findIndex(({ route }) =>
      location.pathname.includes(route)
    );

    activeNavItem(index);
  }, [location.pathname, navigationRoutes]);

  const activeNavItem = (index: number) => {
    const underlines = document.querySelectorAll<HTMLElement>(".underline");

    for (let i = 0; i < underlines.length; i++) {
      underlines[i].style.transform = "translate3d(" + index * 100 + "%,0,0)";
    }
  };
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <>
      <nav>
        <div className="block">
          <img src={pokeballIcon} alt="" />
        </div>

        <div className="data">
          <ul>
            <div className="underline"></div>
            <div className="underline"></div>
            <div className="underline"></div>
            {navigationRoutes.map(({ name, route }, index) => (
              <Link key={index} to={route}>
                <li>{name}</li>
              </Link>
            ))}
          </ul>
        </div>

        <div className="menu">
          <GiHamburgerMenu onClick={() => setOpenDropdown(!openDropdown)} />
        </div>
      </nav>
      {openDropdown && (
        <div className="dropdown">
          {navigationRoutes.map(({ name, route }, index) => (
            <Link key={index} to={route}>
              <a href="">{name}</a>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Narbar;
