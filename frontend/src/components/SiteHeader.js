import React, { Component } from "react";
import { Link } from "react-router-dom";
import logoImg from "../images/vegogo-logo.svg";
import "./SiteHeader.scss";
import Navigation from "./Navigation";

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
      <React.Fragment>
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
            {!this.state.navOpen && "Menu"}
          </button>
        </header>

        {this.state.navOpen && (
          <Navigation handleNavClose={this.handleNavToggleClick} />
        )}
      </React.Fragment>
    );
  }
}

export default SiteHeader;
