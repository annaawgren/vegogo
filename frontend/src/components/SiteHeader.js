import React, { Component } from "react";
import { Link } from "react-router-dom";
import logoImg from "../images/vegogo-logo.svg";
import "./SiteHeader.css";

class SiteHeader extends Component {
  render() {
    return (
      <header className="SiteHeader">
        <h1 className="SiteHeader-title">
          <Link to="/">
            <img src={logoImg} alt="Vegogo logo" className="SiteHeader-logo" />
            Vegogo
          </Link>
        </h1>
        <p>The new guide* to vegan eating *curated for you with &lt;3</p>
      </header>
    );
  }
}

export default SiteHeader;
