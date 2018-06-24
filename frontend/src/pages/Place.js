import React, { Component } from "react";
import Place from "../components/Place";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

class NotFound extends Component {
  render() {
    return (
      <div>
        <SiteHeader />

        <Place isSingleView={true} {...this.props.place} />

        <SiteFooter />
      </div>
    );
  }
}

export default NotFound;
