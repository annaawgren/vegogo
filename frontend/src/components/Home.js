import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import PageContainer from "../pages/PageContainer";
import AreaIntro from "../components/AreaIntro";
import PlacesListing from "../components/PlacesListing";
import "./Home.css";
import introTextImage from "../images/vegogo-the-new-guide-to-vegan-eating.svg";
import ImageWithRatio from "../components/ImageWithRatio";

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
            <ImageWithRatio
              className="Start-introText"
              src={introTextImage}
              alt="The new guide to vegan eating"
              width="249"
              height="79"
            />
          </Link>
        </p>

        <AreaIntro slug="stockholm" />

        <PlacesListing places={places} />
      </PageContainer>
    );
  }
}

export default Home;
