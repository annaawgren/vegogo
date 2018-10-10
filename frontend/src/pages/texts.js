import React from "react";

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
        "https://res.cloudinary.com/vegogo/image/upload/v1537550390/about.jpg",
      width: 612,
      height: 669
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
    preTitle: "👋🏻",
    title: "Say hello!",
    body: (
      <React.Fragment>
        <p>
          We would love to hear from you if you have tips on awesom places to
          eat or any feeback, or just want to get in touch and talk food.{" "}
        </p>

        <p>
          Email us <a href="mailto:hello@vegogo.se">hello@vegogo.se</a>
        </p>

        <p>Or follow us </p>
        <p>
          on <a href="https://www.instagram.com/go_vegogo/">instagram</a>
        </p>

        <p>
          or{" "}
          <a href="https://www.facebook.com/Vegogo-666861027033967">facebook</a>
        </p>
      </React.Fragment>
    )
  },
  partner: {
    preTitle: "😍",
    title: "Yes, become a partner!",
    body: (
      <React.Fragment>
        <p>
          We are looking for partners who share our mission to make really good
          vegan food accessible for everyone. Do not hesitate to contact us if
          you see an opportunity to collaborate and shape vegogo together with
          us!
        </p>

        <p>
          Contact <a href="mailto:anna@vegogo.se">anna@vegogo.se</a>
        </p>
      </React.Fragment>
    )
  }
};

export default texts;
