import React, { Component } from "react";
import PageContainer from "../pages/PageContainer";
import { Helmet } from "react-helmet";
import "./Home.css";
import introTextImage from "../images/vegogo-the-new-guide-to-vegan-eating.svg";
import introIllustration from "../images/illustration-stockholm.png";

class Home extends Component {
  render() {
    return (
      <PageContainer>
        <Helmet>
          <title>Vegogo - the new guide to vegan eating</title>
        </Helmet>

        <p className="Start-intro">
          <img
            className="Start-introText"
            src={introTextImage}
            alt="The new guide to vegan eating"
          />

          <img className="Start-introImage" src={introIllustration} alt="" />
        </p>
      </PageContainer>
    );
  }
}

export default Home;
