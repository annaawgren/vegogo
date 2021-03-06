import React from "react";
import closeImg from "../images/icon-close.svg";
import { NavLink } from "react-router-dom";

let stockholmSubAreas = [
  {
    name: "City",
    to: "/stockholm/city"
  },

  {
    name: "Kungsholmen",
    to: "/stockholm/kungsholmen"
  },

  {
    name: "Old Town",
    to: "/stockholm/gamla-stan"
  },

  {
    name: "Södermalm",
    to: "/stockholm/sodermalm"
  },

  {
    name: "Vasastan",
    to: "/stockholm/vasastan"
  },

  {
    name: "Östermalm",
    to: "/stockholm/ostermalm "
  }
];

// Opened navigation.
let Navigation = function(props) {
  return (
    <nav className="SiteNav">
      <button
        onClick={props.handleNavClose}
        className="SiteHeader-navToggler SiteHeader-navToggler--close"
      >
        <img
          className="SiteHeader-navToggler-img SiteHeader-navToggler-img--close"
          src={closeImg}
          alt="✕"
        />
      </button>

      <ul className="SiteNav-navItems SiteNav-navItems--places">
        <li>
          <NavLink onClick={props.handleNavClose} to="/">
            A to Ö
          </NavLink>
        </li>
        <li>
          <NavLink onClick={props.handleNavClose} to="/nearby">
            Near me
          </NavLink>
        </li>
        <li>
          <NavLink onClick={props.handleNavClose} to="/stockholm">
            Stockholm
          </NavLink>
          <ul className="SiteNav-navItems-subPlaces">
            {stockholmSubAreas.map(subArea => {
              return (
                <li key={subArea.to}>
                  <NavLink onClick={props.handleNavClose} to={subArea.to}>
                    {subArea.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>

      <ul className="SiteNav-navItems SiteNav-navItems--site">
        <li>
          <NavLink exact onClick={props.handleNavClose} to="/page/about">
            About
          </NavLink>
        </li>
        <li>
          <NavLink exact onClick={props.handleNavClose} to="/page/contact">
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink exact onClick={props.handleNavClose} to="/page/partner">
            Partner
          </NavLink>
        </li>
        <li>
          <NavLink exact onClick={props.handleNavClose} to="/page/newsletter">
            Newsletter
          </NavLink>
        </li>

        <li>
          <NavLink exact onClick={props.handleNavClose} to="/">
            Home
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
