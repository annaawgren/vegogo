import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { StaticGoogleMap, Marker } from "react-static-google-map";
// import { GOOGLE_MAPS_API_KEY, IMAGES_URL } from "../api-config";
// import pinImg from "../images/pin.png";
import Place from "./Place";
import "./PlacesListing.css";

class PlacesListing extends Component {
  render() {
    let { headline, teaser, places } = this.props;
    let placesItems;

    if (places) {
      placesItems = places.map(place => {
        let { slug } = place;

        return (
          <li key={slug} className="PlacesListing-placeItem">
            <Place slug={slug} />
          </li>
        );
      });

      placesItems = <ul className="PlacesListing-placeItems">{placesItems}</ul>;
    }

    return (
      <div className="PlacesListing">
        <h2>{headline}</h2>
        <div>{teaser}</div>
        {placesItems}
      </div>
    );
  }
}

export default PlacesListing;
