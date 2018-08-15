import React, { Component } from "react";
import { Link } from "react-router-dom";
import logoImg from "../images/vegogo-logo.svg";
import "./SiteFooter.css";

class SiteFooter extends Component {
  render() {
    return (
      <footer className="SiteFooter">
        <p>
          <img src={logoImg} alt="Vegogo logo" className="SiteFooter-logo" />
          Vegogo – The new guide* to vegan eating *curated for you with
          <span role="img" aria-labelledby="Green Heart">
            💚
          </span>
        </p>
        <p>This is the site footer.</p>
        <ul>
          <li>
            <Link to="/">Vegogo</Link>
          </li>
          <li>
            <Link to="/components">Components</Link>
          </li>
          <li>Menu?</li>
          <li>Logo?</li>
          <li>Tagline?</li>
          <li>Menu?</li>
        </ul>
      </footer>
    );
  }
}

export default SiteFooter;
