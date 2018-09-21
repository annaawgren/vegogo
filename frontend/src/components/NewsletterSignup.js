import React from "react";
import "./NewsletterSignup.css";

class NewsletterSignup extends React.Component {
  render() {
    return (
      <div className="NewsletterSignup">
        <div className="NewsletterSignup-inner">
          <p className="NewsletterSignup-introtext">
            Love vegan as much as we do? Sign up for our newsletter on what’s to
            come.
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
                    placeholder="Enter your email"
                    name="EMAIL"
                    id="mce-EMAIL"
                  />
                </div>
                <div className="mc-fields-col mc-fields-col--submit">
                  <button
                    type="submit"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="signup-button"
                  >
                    Yes, sign me up!
                  </button>
                </div>
              </div>

              <div className="mc-fields-row">
                <p className="NewsletterSignup-weWillBehave">
                  (No spamming promise! Just news and deals you don’t want to
                  miss!)
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsletterSignup;
