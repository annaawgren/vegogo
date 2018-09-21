import React, { Component } from "react";
import NewsletterSignup from "./NewsletterSignup";
import PlacesListing from "./PlacesListing";
import Place from "./Place";
import SiteFooter from "./SiteFooter";
import Bubble from "./Bubble";
import SearchArea from "./SearchArea";
import UserLocation from "./UserLocation";
import AreaIntro from "./AreaIntro";
import DebugAreas from "./DebugAreas";
import "./ExampleComponents.css";
import { Helmet } from "react-helmet";
import PageContainer from "../pages/PageContainer";

/* 
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
*/

class ExampleComponents extends Component {
  componentDidMount() {
    // console.log("componentDidMount", this);
  }

  render() {
    let { places } = this.props;

    return (
      <PageContainer>
        <Helmet>
          <title>Example Components – Vegogo</title>
        </Helmet>

        <h1>Components</h1>
        <p>This page lists all the components that we have.</p>

        <p>
          This page is wrapped in a<code> &lt;PageContainer&gt; </code>
          and the header is using
          <code> &lt;SiteHeader&gt; </code>
        </p>

        <UserLocation />

        <AreaIntro slug="sofo" />

        <SearchArea />

        <Place slug="mahalo" isSingleView={true} />

        <PlacesListing
          places={places}
          headline="Härliga ställen"
          teaser="En massa goa ställen är detta en listning på."
        />

        <Bubble color="dark" text="Awesome Supertasty Another word" />
        <Bubble color="green" />
        <Bubble color="yellow" text="Good place with nice food" />
        <Bubble color="red" />

        <NewsletterSignup />

        <SiteFooter />

        <DebugAreas />
      </PageContainer>
    );
  }
}

export default ExampleComponents;
