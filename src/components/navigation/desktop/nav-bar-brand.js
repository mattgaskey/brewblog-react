import React from "react";
import { NavLink } from "react-router-dom";

export const NavBarBrand = () => {
  return (
    <div className="nav-bar__brand">
      <NavLink to="/">
        <img
          className="nav-bar__logo"
          src="/homebrew.svg"
          alt="Brewery Blog logo"
          width="50"
          height="50"
        />
      </NavLink>
    </div>
  );
};
