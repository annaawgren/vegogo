import React, { Component } from "react";
import { Link } from "react-router-dom";
import logoImg from "../images/vegogo-logo.svg";
import blockcheesenavImg from "../images/icon-blockcheesenav.svg";
import closeImg from "../images/icon-close.svg";
import "./SiteHeader.css";

let Navigation = function(props) {
  return (
    <nav>
      <h3>Vegogo Navigation</h3>
      <ul>
        <li>
          <a href="#">nav item one</a>
        </li>
        <li>
          <a href="#">nav item two</a>
        </li>
        <li>
          <a href="#">A short one</a>
        </li>
        <li>
          <a href="#">And a long one, because everything must work, right?</a>
        </li>
      </ul>
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
          <Link to="/">
            <img src={logoImg} alt="Vegogo" className="SiteHeader-logo" />
          </Link>
        </h1>
        <p>The new guide* to vegan eating *curated for you with &lt;3</p>

        <button
          onClick={this.handleNavToggleClick}
          className="SiteHeader-navToggler"
        >
          {!this.state.navOpen && (
            <img
              className="SiteHeader-navToggler-img SiteHeader-navToggler-img--closed"
              src={blockcheesenavImg}
              alt="☰"
            />
          )}
          {this.state.navOpen && (
            <img
              className="SiteHeader-navToggler-img SiteHeader-navToggler-img--opened"
              src={closeImg}
              alt="✕"
            />
          )}
        </button>
        {this.state.navOpen && <Navigation />}
      </header>
    );
  }
}

export default SiteHeader;
