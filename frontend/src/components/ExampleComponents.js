import React, { Component } from "react";
import NewsletterSignup from "./NewsletterSignup";
import PlacesListing from "./PlacesListing";
import Place from "./Place";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import Bubble from "./Bubble";
import SearchArea from "./SearchArea";
import AreaIntro from "./AreaIntro";
import DebugAreas from "./DebugAreas";
import "./ExampleComponents.css";
import { Helmet } from "react-helmet";
// import { API_URL } from "../api-config";

function ExampleComponent(props) {
  let { title } = props;
  const titleId = title.replace(/[<>]/g, "");

  return (
    <div className="ExampleComponent" id={titleId}>
      <div className="ExampleComponent-meta">
        <a href={`#${titleId}`}>
          <div className="ExampleComponent-key">Component</div>
          <div className="ExampleComponent-value">{title}</div>
          <div className="ExampleComponent-arrow" />
        </a>
      </div>
      {props.children}
    </div>
  );
}

class ExampleComponents extends Component {
  componentDidMount() {
    // console.log("componentDidMount", this);
  }

  render() {
    let { places } = this.props;

    return (
      <div>
        <Helmet>
          <title>Example Components – Vegogo</title>
        </Helmet>

        <h1>Components</h1>
        <p>This page lists all the components that we have.</p>

        <ExampleComponent title="<SiteHeader>">
          <SiteHeader />
        </ExampleComponent>

        <ExampleComponent title="<AreaIntro>">
          <AreaIntro slug="sofo" />
        </ExampleComponent>

        <ExampleComponent title="<SearchArea>">
          <SearchArea />
        </ExampleComponent>

        <ExampleComponent title="<Place>">
          <Place slug="mahalo" isSingleView={true} />
        </ExampleComponent>

        <ExampleComponent title="<PlacesListing>">
          <PlacesListing
            places={places}
            headline="Härliga ställen"
            teaser="En massa goa ställen är detta en listning på."
          />
        </ExampleComponent>

        <ExampleComponent title="<Bubble>">
          <Bubble color="dark" text="Awesome Supertasty Another word" />
          <Bubble color="green" />
          <Bubble color="yellow" text="Good place with nice food" />
          <Bubble color="red" />
        </ExampleComponent>

        <ExampleComponent title="<NewsletterSignup>">
          <NewsletterSignup />
        </ExampleComponent>

        <ExampleComponent title="<SiteFooter>">
          <SiteFooter />
        </ExampleComponent>

        <ExampleComponent title="<DebugAreas>">
          <DebugAreas />
        </ExampleComponent>
      </div>
    );
  }
}

export default ExampleComponents;
