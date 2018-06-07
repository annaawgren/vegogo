import React, { Component } from "react";
import { Link } from "react-router-dom";

class SiteFooter extends Component {
  render() {
    return (
      <footer>
        <h1>
          <Link to="/">Vegogo</Link>
        </h1>
        <p>The new guide* to vegan eating *curated for you with &lt;3</p>
      </footer>
    );
  }
}

export default SiteFooter;
