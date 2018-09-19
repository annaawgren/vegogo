import React, { Component } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <SiteHeader />
        <SiteFooter />

        <Link to="components">Components</Link>
      </React.Fragment>
    );
  }
}

export default Home;
