import React, { Component } from "react";
import MailchimpSignup from "./MailchimpSignup";
import PlacesListing from "./PlacesListing";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

class ExampleComponents extends Component {
  render() {
    let { places } = this.props;

    return (
      <div>
        <SiteHeader />

        <h1>Components</h1>
        <p>This page lists all the components that we have.</p>

        <PlacesListing places={places} headline="Härliga ställen" />

        <MailchimpSignup />

        <SiteFooter />
      </div>
    );
  }
}

export default ExampleComponents;
