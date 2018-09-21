import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import logoImg from "../images/vegogo-logo.svg";
import closeImg from "../images/icon-close.svg";
import "./SiteHeader.css";

// Opened navigation.
let Navigation = function(props) {
  return (
    <nav className="SiteNav">
      <ul className="SiteNav-navItems SiteNav-navItems--places">
        <li>
          <NavLink onClick={props.handleNavClose} to="/sort/alpha">
            A to Ö
          </NavLink>
        </li>
        <li>
          <NavLink onClick={props.handleNavClose} to="/sort/near">
            Near me
          </NavLink>
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
          <NavLink exact onClick={props.handleNavClose} to="/">
            Home
          </NavLink>
        </li>
      </ul>

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
    </nav>
  );
};

class SiteHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navOpen: false
    };

    this.handleNavToggleClick = this.handleNavToggleClick.bind(this);
  }

  handleNavToggleClick(e) {
    this.setState({ navOpen: !this.state.navOpen });
  }

  render() {
    return (
      <header className="SiteHeader">
        <h1 className="SiteHeader-title">
          <Link to="/" className="SiteHeader-titleLink">
            <img src={logoImg} alt="Vegogo" className="SiteHeader-logo" />
          </Link>
        </h1>

        {/* <p className="SiteHeader-tagline">The new guide* to vegan eating *curated for you with &lt;3</p> */}

        <button
          onClick={this.handleNavToggleClick}
          className="SiteHeader-navToggler"
        >
          {!this.state.navOpen &&
            // <img
            //   className="SiteHeader-navToggler-img SiteHeader-navToggler-img--closed"
            //   src={blockcheesenavImg}
            //   alt="☰"
            // />
            "Menu"}
        </button>
        {this.state.navOpen && (
          <Navigation handleNavClose={this.handleNavToggleClick} />
        )}
      </header>
    );
  }
}

export default SiteHeader;
