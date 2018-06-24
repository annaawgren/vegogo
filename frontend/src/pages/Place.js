import React, { Component } from "react";
import Place from "../components/Place";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

class NotFound extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <SiteHeader />

        <Place isSingleView={true} />

        <SiteFooter />
      </div>
    );
  }
}

export default NotFound;
