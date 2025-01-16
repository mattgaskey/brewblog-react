import React from "react";
import { NavLink } from "react-router-dom";

export const MobileNavBarBrand = ({ handleClick }) => {
  return (
    <div onClick={handleClick} className="mobile-nav-bar__brand">
      <NavLink to="/">
        <img
          className="mobile-nav-bar__logo"
          src="/homebrew.svg"
          alt="Brewery Blog logo"
          width="50"
          height="50"
        />
      </NavLink>
    </div>
  );
};
