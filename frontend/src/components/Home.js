import React, { Component } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "./SiteHeader";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <SiteHeader />
        <h1>Vegogo home</h1>

        <Link to="components">Components</Link>
      </React.Fragment>
    );
  }
}

export default Home;
