import React, { Component } from "react";
import { Link } from "react-router-dom";
import { StaticGoogleMap, Marker } from "react-static-google-map";

class PlacesListing extends Component {
  render() {
    let { headline, places } = this.props;
    let placesItems;

    if (places) {
      placesItems = places.map(place => {
        let {
          name,
          slug,
          budget,
          location,
          content,
          foodTypes,
          foodTimes
        } = place;

        let types = foodTypes.map(type => <li key={type.key}>{type.name}</li>);
        if (types) {
          types = <ul>{types}</ul>;
        }

        let times = foodTimes.map(type => <li key={type.key}>{type.name}</li>);
        if (times) {
          times = <ul>{times}</ul>;
        }

        return (
          <li key={slug}>
            <Link to={slug}>{name}</Link>
            <p>{budget}</p>
            {types}
            {times}
            {location && <p>location.street1</p>}
            {location &&
              location.geo && (
                <div>
                  <p>{location.geo[0]}</p>
                  <p>{location.geo[1]}</p>
                  {/* https://www.npmjs.com/package/react-static-google-map */}
                  <StaticGoogleMap size="400x250" zoom="15">
                    <Marker
                      location={{ lat: location.geo[1], lng: location.geo[0] }}
                      color="green"
                      label="V"
                    />
                  </StaticGoogleMap>
                </div>
              )}
            {content && (
              <div dangerouslySetInnerHTML={{ __html: content.brief }} />
            )}
          </li>
        );
      });

      placesItems = <ul>{placesItems}</ul>;
    }

    return (
      <div className="PlacesListing">
        <h2>{headline}</h2>
        {placesItems}
      </div>
    );
  }
}

export default PlacesListing;
