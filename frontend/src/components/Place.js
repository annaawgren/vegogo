import React, { Component } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

class Place extends Component {
  render() {
    return (
      <div>
        <SiteHeader />

        <h1>Place</h1>
        <p>This page shows a single place.</p>

        <SiteFooter />
      </div>
    );
  }
}

export default Place;
