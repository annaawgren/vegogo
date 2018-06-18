import React, { Component } from "react";
// import SiteHeader from "./SiteHeader";
// import SiteFooter from "./SiteFooter";
import { StaticGoogleMap, Marker } from "react-static-google-map";
// import pinImg from "../images/pin.png";
import Bubble from "./Bubble";
import { GOOGLE_MAPS_API_KEY, IMAGES_URL, API_URL } from "../api-config";

class Place extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: {}
    };
  }
  componentDidMount() {
    // If match exists then we are coming here via url.
    // Other way to get here is just through a component added on another page.
    let { match, slug } = this.props;

    let placeSlug;

    if (slug) {
      placeSlug = slug;
    } else if (match && match.params.place) {
      placeSlug = match.params.place;
    }

    if (!placeSlug) {
      console.log("no place found :(");
    }

    let placesApiUrl = `${API_URL}/place/slug/${placeSlug}`;

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
      budget,
      location,
      content,
      foodTypes = [],
      foodTimes = [],
      image,
      tagline
    } = this.state.place;

    let types = foodTypes.map(type => <li key={type.key}>{type.name}</li>);
    if (types) {
      types = <ul>{types}</ul>;
    }

    let times = foodTimes.map(type => <li key={type.key}>{type.name}</li>);
    if (times) {
      times = <ul>{times}</ul>;
    }

    let imageMarkup;
    if (image) {
      imageMarkup = (
        <p className="PlaceItem-photo">
          <img
            src={`${IMAGES_URL}/places/${image.filename}`}
            alt=""
            className="PlaceItem-photo-img"
          />
          {tagline && <Bubble text={tagline} color="yellow" />}
        </p>
      );
    }

    return (
      <article key={slug} className="PlacesListing-placeItem">
        {imageMarkup}

        <div className="PlaceItem-head">
          <h1 className="PlaceItem-name">{name}</h1>
          <a href="/" className="PlaceItem-more">
            more
          </a>
        </div>

        <p>{budget}</p>
        {types}
        {times}
        {location && <p>{location.street1}</p>}
        {location &&
          location.geo && (
            <div>
              {/* https://www.npmjs.com/package/react-static-google-map */}
              <StaticGoogleMap
                size="300x200"
                zoom="15"
                scale="2"
                apiKey={GOOGLE_MAPS_API_KEY}
                className="PlacesListing-placeItem-mapImage"
              >
                <Marker
                  location={{ lat: location.geo[1], lng: location.geo[0] }}
                  color="green"
                  label="V"
                  iconURL="https://beta.vegogo.se/favicon-32x32.png"
                />
              </StaticGoogleMap>
            </div>
          )}
        {content && <div dangerouslySetInnerHTML={{ __html: content.brief }} />}
      </article>
    );
  }
}

export default Place;
