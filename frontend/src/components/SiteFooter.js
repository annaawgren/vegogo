import React, { Component } from "react";
import { Link } from "react-router-dom";
import logoImg from "../images/vegogo-logo.svg";
import iconInstagram from "../images/icon-instagram.svg";
import iconFacebook from "../images/icon-facebook.svg";
import "./SiteFooter.scss";

class SiteFooter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      debug: false
    };

    this.getHeights = this.getHeights.bind(this);
  }

  getWindowDimensions() {
    const width = Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );

    const height = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );

    return { width, height };
  }

  getHeights() {
    this.setState({
      screenAvailHeight: window.screen.availHeight,
      screenHeight: window.screen.height,
      windowInnerHeight: window.innerHeight, // This changes depending on ios url bar visibility.
      bodyOffsetHeight: document.body.offsetHeight,
      bodyClientHeight: document.body.clientHeight,
      windowDimensionsHeight: this.getWindowDimensions()["height"]
    });
  }

  componentDidMount() {
    // window.addEventListener('resize', this.getHeights);
    // window.addEventListener('scroll', this.getHeights);
    // this.getHeights();
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', this.getHeights);
    // window.removeEventListener('scroll', this.getHeights);
  }

  render() {
    const {
      debug,
      screenAvailHeight,
      screenHeight,
      windowInnerHeight,
      bodyOffsetHeight,
      bodyClientHeight,
      windowDimensionsHeight
    } = this.state;

    return (
      <footer className="SiteFooter">
        {debug && (
          <div>
            <p>
              Debug: on.
              <br />
              screenAvailHeight: {screenAvailHeight}
              <br />
              screenHeight: {screenHeight}
              <br />
              windowInnerHeight: {windowInnerHeight}
              <br />
              bodyOffsetHeight: {bodyOffsetHeight}
              <br />
              bodyClientHeight: {bodyClientHeight}
              <br />
              windowDimensionsHeight: {windowDimensionsHeight}
            </p>
          </div>
        )}
        <p>
          <img src={logoImg} alt="Vegogo logo" className="SiteFooter-logo" />
        </p>

        <p>
          The New Guide to Vegan Eating.
          <br />
          Curated for you with &lt;3.
        </p>

        <ul className="SiteFooter-socialLinks">
          <li className="SiteFooter-socialLink">
            <a href="https://www.instagram.com/go_vegogo/">
              <img src={iconInstagram} alt="Follow us on Instagram" />
            </a>
          </li>
          <li className="SiteFooter-socialLink">
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
    );
  }
}

export default SiteFooter;
