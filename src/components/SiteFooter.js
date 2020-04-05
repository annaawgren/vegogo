import React, { Component } from "react";
import { Link } from "gatsby";
import logoImg from "../images/vegogo-logo.svg";
import iconInstagram from "../images/icon-instagram.svg";
import iconFacebook from "../images/icon-facebook.svg";

class SiteFooter extends Component {
  render() {
    return (
      <React.Fragment>
        <style jsx>{`
          p {
            @apply mt-6;
          }
        `}</style>

        <footer className="bg-vegogo-grey text-center py-16">
          <p>
            <img src={logoImg} alt="Vegogo logo" className="m-auto" />
          </p>

          <p>
            The New Guide to Vegan Eating.
            <br />
            Curated for you with &lt;3.
          </p>

          <ul className="mt-6">
            <li className="inline-block mx-6">
              <a href="https://www.instagram.com/go_vegogo/">
                <img src={iconInstagram} alt="Follow us on Instagram" />
              </a>
            </li>
            <li className="inline-block mx-6">
              <a href="https://www.facebook.com/pg/Vegogo-666861027033967/">
                <img src={iconFacebook} alt="Follow us on Facebook" />
              </a>
            </li>
          </ul>

          <p>
            Want to collaborate and become a vegogo partner?
            <br />
            <Link to="/page/partner">We would love to hear from you!</Link>
          </p>

          <p>
            contact us at
            <br />
            <a href="mailto:hello@vegogo.se">hello@vegogo.se</a>
          </p>

          <p>
            Illustrations by
            <br />
            <a href="http://www.christineroesch.de/">Christine Rösch</a>
          </p>

          <p>© vegogo 2018</p>

          <p>
            <Link to="/components">Components</Link>
          </p>
        </footer>
      </React.Fragment>
    );
  }
}

export default SiteFooter;
