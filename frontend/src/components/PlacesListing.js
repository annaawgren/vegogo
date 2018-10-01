import React, { Component } from "react";
import Place from "./Place";
import "./PlacesListing.css";

/**
 * Renders places with passed slug
 */
class PlacesListing extends Component {
  render() {
    let { headline, teaser, places } = this.props;
    let placesItems;

    if (places) {
      placesItems = places.map(place => {
        let { slug } = place;

        return (
          <li key={slug} className="PlacesListing-placeItem">
            <Place {...place} />
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
