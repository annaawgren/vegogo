import React, { Component } from "react";
import MailchimpSignup from "./MailchimpSignup";
import PlacesListing from "./PlacesListing";
import SiteHeader from "./SiteHeader";

class ExampleComponents extends Component {
  render() {
    let { places } = this.props;

    return (
      <div>
        <h1>Components</h1>
        <p>This page lists all the components that we have.</p>

        <h2>
          <code>Header</code>
        </h2>
        <SiteHeader />

        <h2>
          <code>Placeslisting</code>
        </h2>
        <PlacesListing places={places} headline="Härliga ställen" />

        <h2>
          <code>MailchimpSignup</code>
        </h2>
        <MailchimpSignup />
      </div>
    );
  }
}

export default ExampleComponents;
