import React, { Component } from "react";
import { Link } from "react-router-dom";
import Place from "./Place";
import Loading from "./Loading";
import "./PlacesListing.scss";

/**
 * Renders places with passed places.
 */
class PlacesListing extends Component {
  render() {
    let { headline, teaser, places, isLoading } = this.props;
    let placesItems;

    if (places) {
      let prevPlaceFirstChar;
      placesItems = places.map(place => {
        let { slug } = place;
        let charDivider;
        let placeFirstChar = place.name.charAt(0);

        if (!prevPlaceFirstChar || prevPlaceFirstChar !== placeFirstChar) {
          charDivider = (
            <li className="PlacesListing-charDivider" key={placeFirstChar}>
              {placeFirstChar}
            </li>
          );
          prevPlaceFirstChar = placeFirstChar;
        }

        let fragmentKey = `${placeFirstChar}/${slug}`;

        return (
          <React.Fragment key={fragmentKey}>
            {charDivider}
            <li key={slug} className="PlacesListing-placeItem">
              <Place {...place} />
            </li>
          </React.Fragment>
        );
      });

      placesItems = <ul className="PlacesListing-placeItems">{placesItems}</ul>;
    }

    let navbar = (
      <div className="PlacesListing-NavBar">
        <ul className="PlacesListing-NavBar-items">
          <li className="PlacesListing-NavBar-item">
            <Link className="PlacesListing-NavBar-itemLink" to="/">
              A to Ö
            </Link>
          </li>
          <li className="PlacesListing-NavBar-item">
            <Link className="PlacesListing-NavBar-itemLink" to="/nearby">
              Near me
            </Link>
          </li>
        </ul>
      </div>
    );

    return (
      <div className="PlacesListing">
        {headline && <h2>{headline}</h2>}
        {teaser && <div>{teaser}</div>}
        {/* {navbar} */}
        {isLoading && <Loading />}
        {placesItems}
      </div>
    );
  }
}

export default PlacesListing;
