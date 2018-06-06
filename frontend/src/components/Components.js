import React, { Component } from "react";
import MailchimpSignup from "./MailchimpSignup";
import PlacesListing from "./PlacesListing";

class Components extends Component {
  render() {
    let { places } = this.props;

    return (
      <div>
        <h1>Components</h1>

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

export default Components;
