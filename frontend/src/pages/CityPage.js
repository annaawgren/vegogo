import React, { Component } from "react";
// import Place from "../components/Place";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import NewsletterSignup from "../components/NewsletterSignup";

class CityPage extends Component {
  render() {
    return (
      <div>
        <SiteHeader />

        <h1>STAD</h1>

        <NewsletterSignup />

        <SiteFooter />
      </div>
    );
  }
}

export default CityPage;
