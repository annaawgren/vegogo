import React, { Component } from "react";
import PageContainer from "../pages/PageContainer";
import { Helmet } from "react-helmet";
import "./TextPage.scss";
import texts from "./texts.js";

class TextPage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    let pageName = this.props.page.match.params.pageName;
    let text = texts[pageName];

    if (!text) {
      text = texts.forOhFour;
    }

    let heroImg = text.heroImg;
    let preTitle = text.preTitle;

    window.scrollTo(0, 0);

    return (
      <PageContainer>
        <Helmet>
          <title>{text.title}</title>
        </Helmet>
        <div className={`TextPage TextPage-${pageName}`}>
          {heroImg && (
            <p>
              <img
                className="TextPage-Image TextPage-Image--hero"
                src={heroImg.src}
                width={heroImg.width}
                height={heroImg.height}
                alt=""
              />
            </p>
          )}
          {text.preTitle && (
            <div className="TextPage-preHeadline">{preTitle}</div>
          )}
          <h1 className="TextPage-Headline">{text.title}</h1>
          {text.body}
        </div>
      </PageContainer>
    );
  }
}

export default TextPage;
