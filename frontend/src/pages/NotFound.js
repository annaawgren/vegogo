import React, { Component } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

class NotFound extends Component {
  render() {
    return (
      <div>
        <SiteHeader />
        <h1>Page not found</h1>
        <SiteFooter />
      </div>
    );
  }
}

export default NotFound;
