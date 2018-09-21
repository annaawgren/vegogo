import React, { Component } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

class PageContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <SiteHeader />
        {this.props.children}
        <SiteFooter />
      </React.Fragment>
    );
  }
}

export default PageContainer;
