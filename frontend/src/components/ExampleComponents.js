import React, { Component } from "react";
import MailchimpSignup from "./MailchimpSignup";
import PlacesListing from "./PlacesListing";
import Place from "./Place";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import Bubble from "./Bubble";
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

    return (
      <div>
        <ExampleComponent title="<Bubble>">
          <Bubble color="dark" text="Awesome Supertasty Another word" />
          <Bubble color="green" />
          <Bubble color="yellow" text="Good place with nice food" />
          <Bubble color="red" />
        </ExampleComponent>

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
