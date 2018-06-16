import React, { Component } from "react";
import MailchimpSignup from "./MailchimpSignup";
import PlacesListing from "./PlacesListing";
import Place from "./Place";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import "./ExampleComponents.css";

function ExampleComponent(props) {
  let { title } = props;

  return (
    <div className="ExampleComponent">
      <div className="ExampleComponent-meta">
        <div className="ExampleComponent-key">Component</div>
        <div className="ExampleComponent-value">{title}</div>
        <div className="ExampleComponent-arrow">⇢</div>
      </div>
      {props.children}
    </div>
  );
}

class ExampleComponents extends Component {
  render() {
    let { places } = this.props;
    // let place = places ? places[0] : null;

    return (
      <div>
        <ExampleComponent title="<SiteHeader>">
          <SiteHeader />
        </ExampleComponent>

        <h1>Components</h1>
        <p>This page lists all the components that we have.</p>

        <ExampleComponent title="<Place>">
          <Place slug="mahalo" />
        </ExampleComponent>

        <ExampleComponent title="<PlacesListing>">
          <PlacesListing
            places={places}
            headline="Härliga ställen"
            teaser="En massa goa ställen är detta en listning på."
          />
        </ExampleComponent>

        <ExampleComponent title="<MailchimpSignup>">
          <MailchimpSignup />
        </ExampleComponent>

        <ExampleComponent title="<SiteFooter>">
          <SiteFooter />
        </ExampleComponent>
      </div>
    );
  }
}

export default ExampleComponents;
