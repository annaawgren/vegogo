import React, { Component } from "react";

class PlacesListing extends Component {
  render() {
    let { headline, places } = this.props;

    let placesItems = places.map(place => {
      return <li key={place.slug}>{place.name}</li>;
    });

    return (
      <div className="PlacesListing">
        <h2>{headline}</h2>
        {placesItems}
      </div>
    );
  }
}

export default PlacesListing;
