import React, { Component } from "react";
import PageContainer from "../pages/PageContainer";
import { Helmet } from "react-helmet";
import "./Home.css";
import introText from "../images/vegogo-the-new-guide-to-vegan-eating.svg";

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
            src={introText}
            alt="The new guide to vegan eating"
          />
        </p>
      </PageContainer>
    );
  }
}

export default Home;
