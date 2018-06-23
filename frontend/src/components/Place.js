import React, { Component } from "react";
// import SiteHeader from "./SiteHeader";
// import SiteFooter from "./SiteFooter";
import { StaticGoogleMap, Marker } from "react-static-google-map";
// import pinImg from "../images/pin.png";
import Bubble from "./Bubble";
import { GOOGLE_MAPS_API_KEY, IMAGES_URL, API_URL } from "../api-config";
import closeImg from "../images/icon-close.svg";
import classnames from "classnames";
import { cleanupHomepage } from "../helpers.js";

class Place extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: {},
      detailsOpen: false
    };

    this.handleMoreClick = this.handleMoreClick.bind(this);
  }

  handleMoreClick(e) {
    console.log("handleMoreClick");
    this.setState({ detailsOpen: !this.state.detailsOpen });
    e.preventDefault();
  }

  componentDidMount() {
    // If match exists then we are coming here via url.
    // Other way to get here is just through a component added on another page.
    let { match, slug } = this.props;

    this.placeSlug = null;

    if (slug) {
      this.placeSlug = slug;
    } else if (match && match.params.place) {
      this.placeSlug = match.params.place;
    }

    if (!this.placeSlug) {
      console.log("no place found :(");
    }

    this.loadPlaceFromApi();
  }

  loadPlaceFromApi() {
    let placesApiUrl = `${API_URL}/place/slug/${this.placeSlug}`;

    fetch(placesApiUrl)
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({ place: data.place });
      });
  }

  render() {
    let {
      name,
      slug,
      location,
      content,
      foodTypes = [],
      foodTimes = [],
      image,
      tagline,
      phone,
      homepage
    } = this.state.place;

    let types = foodTypes.map(type => (
      <li key={type.key} className="PlaceItem-features-item">
        <span>{type.name}</span>
      </li>
    ));

    if (types && types.length) {
      types = (
        <div className="PlaceItem-features">
          <h3 className="PlaceItem-features-title">Food to find</h3>
          <ul className="PlaceItem-features-items">{types}</ul>
        </div>
      );
    }

    let times = foodTimes.map(type => (
      <li key={type.key} className="PlaceItem-features-item">
        <span>{type.name}</span>
      </li>
    ));

    if (times && times.length) {
      times = (
        <div className="PlaceItem-features">
          <h3 className="PlaceItem-features-title">Great for</h3>
          <ul className="PlaceItem-features-items">{times}</ul>
        </div>
      );
    }

    let imageMarkup;
    if (image) {
      imageMarkup = (
        <div className="PlaceItem-photo">
          <img
            src={`${IMAGES_URL}/places/${image.filename}`}
            alt=""
            className="PlaceItem-photo-img"
          />
          {tagline && <Bubble text={tagline} color="yellow" />}
        </div>
      );
    }

    let homepageOut;
    let { homepagePresentation, homepageWithProtocol } = cleanupHomepage(
      homepage
    );
    if (homepagePresentation && homepageWithProtocol) {
      homepageOut = (
        <p className="PlaceItem-meta-item">
          <a target="_blank" rel="noopener" href={homepageWithProtocol}>
            {homepagePresentation}
          </a>
        </p>
      );
    }

    let locationAndMap;
    if (location && location.geo) {
      let googleLink = `http://maps.google.com/?q=${name}, ${
        location.street1
      }, ${location.state}, ${location.country}`;
      locationAndMap = (
        <div className="PlaceItem-meta">
          <p className="PlaceItem-meta-item">
            <a target="_blank" ref="noopener" href={googleLink}>
              {location.street1}
            </a>
          </p>
          {phone && (
            <p className="PlaceItem-meta-item">
              <a href={`tel:${phone}`}>{phone}</a>
            </p>
          )}
          {homepageOut}
          {/* https://www.npmjs.com/package/react-static-google-map */}
          <a href={googleLink} target="_blank" rel="noopener">
            <StaticGoogleMap
              size="300x200"
              zoom="15"
              scale="2"
              apiKey={GOOGLE_MAPS_API_KEY}
              className="PlaceItem-meta-item PlacesListing-placeItem-mapImage"
            >
              <Marker
                location={{ lat: location.geo[1], lng: location.geo[0] }}
                color="green"
                label="V"
                iconURL="https://beta.vegogo.se/favicon-32x32.png"
              />
            </StaticGoogleMap>
          </a>
        </div>
      );
    }

    let placeClassNames = classnames({
      placeItem: true,
      "PlaceItem--expanded": this.state.detailsOpen
    });

    return (
      <article key={slug} className={placeClassNames}>
        <div className="PlaceItem-tease" onClick={this.handleMoreClick}>
          {imageMarkup}

          <div className="PlaceItem-head">
            <h1 className="PlaceItem-name">{name}</h1>
            <a href="/" className="PlaceItem-more">
              {this.state.detailsOpen && <img src={closeImg} alt="✖" />}

              {!this.state.detailsOpen && "more"}
            </a>
          </div>
        </div>

        {/* Details are shown on details page or when "More" link is clicked. */}
        {this.state.detailsOpen && (
          <div className="PlaceItem-details">
            {locationAndMap}
            {types}
            {times}
            {content && (
              <div
                className="PlaceItem-textcontent PlaceItem-textcontent--brief"
                dangerouslySetInnerHTML={{ __html: content.brief }}
              />
            )}
          </div>
        )}
      </article>
    );
  }
}

export default Place;
