import React, { Component } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import NewsletterSignup from "../components/NewsletterSignup";

class PageContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <SiteHeader />

        {this.props.children}

        <NewsletterSignup />
        <SiteFooter />
      </React.Fragment>
    );
  }
}

export default PageContainer;
