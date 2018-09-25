import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import PageContainer from "../pages/PageContainer";
import AreaIntro from "../components/AreaIntro";
import PlacesListing from "../components/PlacesListing";
import "./Home.css";
import introTextImage from "../images/vegogo-the-new-guide-to-vegan-eating.svg";
// import introIllustration from "../images/illustration-stockholm.png";

class Home extends Component {
  render() {
    window.scrollTo(0, 0);

    let { places } = this.props;

    return (
      <PageContainer>
        <Helmet>
          <title>Vegogo - the new guide to vegan eating</title>
        </Helmet>

        <p className="Start-intro">
          <Link to="/page/about" title="Read more about Vegogo">
            <img
              className="Start-introText"
              src={introTextImage}
              alt="The new guide to vegan eating"
              width="249"
              height="79"
            />
          </Link>
        </p>

        <AreaIntro slug="stockholm" />

        <PlacesListing
          places={places}
          headline="Härliga ställen"
          teaser="En massa goa ställen är detta en listning på."
        />
      </PageContainer>
    );
  }
}

export default Home;
