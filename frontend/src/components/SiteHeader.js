import React, { Component } from "react";
import { Link } from "react-router-dom";

class SiteHeader extends Component {
  render() {
    return (
      <header>
        <h1>
          <Link to="/">Vegogo</Link>
        </h1>
        <p>The new guide* to vegan eating *curated for you with &lt;3</p>
      </header>
    );
  }
}

export default SiteHeader;
