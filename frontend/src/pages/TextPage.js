import React, { Component } from "react";
// import Place from "../components/Place";
import PageContainer from "../pages/PageContainer";
// import NewsletterSignup from "../components/NewsletterSignup";
import "./TextPage.css";

let texts = {
  forOhFour: {
    title: "Page not found",
    body: (
      <React.Fragment>
        <p>Sorry, the page could not be found.</p>
        <p>
          Nerdy error code:
          <br />
          <code>Error 404</code>
        </p>
      </React.Fragment>
    )
  },
  about: {
    title: "About Vegogo",
    heroImg: {
      src:
        "https://res.cloudinary.com/vegogo/image/upload/v1537550390/about.jpg"
    },
    body: (
      <React.Fragment>
        <p>
          vegogo is the new guide for vegan eating, curated for you with &lt;3.
        </p>
        <p>
          We want to spread the love for really good food – and make it easy for
          you to find.
        </p>

        <p>
          Everything on this site is tested and tried by the vegogo team, and is
          guaranteed to be good. Therefor you will not find any stars or
          reviews. We would though love to hear from you if you have tips on
          great vegan places to eat or feeback, or just want to get in touch!
          Please do.
        </p>

        <p>
          vegogo was founded by passionate foodie, art director and designer of
          several veggie cookbooks Anna Ågren together with developer Pär
          Thernström and writer/designer Emma Lindell Nilsson.
        </p>

        <p>
          <a href="mailto:hello@vegogo.se">hello@vegogo.se</a>
        </p>
      </React.Fragment>
    )
  },
  contact: {
    title: "Contact Vegogo",
    body: (
      <React.Fragment>
        <p>contact us text here.</p>
        <p>Dolor nesciunt mollitia mollitia ipsam iure error aut quibusdam.</p>
        <p>
          Et et qui est quibusdam nam. Facilis qui et dignissimos. Illum autem
          et molestiae in molestiae voluptatum nulla eligendi et.
        </p>
        <p>
          <a href="mailto:hello@vegogo.se">hello@vegogo.se</a>
        </p>
      </React.Fragment>
    )
  }
};

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

    return (
      <PageContainer>
        <div className="TextPage">
          {heroImg && (
            <p>
              <img
                className="TextPage-Image TextPage-Image--hero"
                src="https://res.cloudinary.com/vegogo/image/upload/v1537550390/about.jpg"
                alt=""
              />
            </p>
          )}
          <h1 className="TextPage-Headline">{text.title}</h1>
          {text.body}
        </div>
      </PageContainer>
    );
  }
}

export default TextPage;
