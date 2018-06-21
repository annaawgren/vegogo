import React from "react";
import "./NewsletterSignup.css";

class NewsletterSignup extends React.Component {
  render() {
    return (
      <div className="NewsletterSignup">
        <p className="NewsletterSignup-introtext">
          Love vegan as much as we do? Sign up for our newsletter on what’s to
          come blablabla.
        </p>

        <div id="mc_embed_signup">
          <form
            action="https://vegogo.us18.list-manage.com/subscribe/post?u=ba9f0358f5c621215aca582dc&amp;id=fab6881f8a"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
            noValidate
          >
            <div className="mc-fields-row">
              <div className="mc-fields-col mc-fields-col--email">
                <input
                  type="email"
                  className="signup-field"
                  placeholder="Your email here, pls <3"
                  name="EMAIL"
                  id="mce-EMAIL"
                />
              </div>
              <div className="mc-fields-col mc-fields-col--submit">
                <input
                  type="submit"
                  value="Subscribe"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="signup-button"
                />
              </div>
            </div>

            <div className="mc-fields-row">
              <p>
                (No spamming promise! Just news and deals you don’t want to
                miss!)
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NewsletterSignup;
