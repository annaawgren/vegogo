import React, { Component } from "react";
import { Link } from "react-router-dom";
import { StaticGoogleMap, Marker } from "react-static-google-map";
import { GOOGLE_MAPS_API_KEY, IMAGES_URL } from "../api-config";
import pinImg from "../images/pin.png";
import "./PlacesListing.css";

class PlacesListing extends Component {
  render() {
    let { headline, teaser, places } = this.props;
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
          foodTimes,
          image
        } = place;

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
            <p>
              <img
                src={`${IMAGES_URL}/places/${image.filename}`}
                alt=""
                className="PlaceItem-photo-img"
              />
            </p>
          );
        }

        return (
          <li key={slug} className="PlacesListing-placeItem">
            <Link to={`/place/${slug}`}>{name}</Link>
            {imageMarkup}
            <p>{budget}</p>
            {types}
            {times}
            {location && <p>{location.street1}</p>}
            {location &&
              location.geo && (
                <div>
                  <p>{location.geo[0]}</p>
                  <p>{location.geo[1]}</p>
                  {/* https://www.npmjs.com/package/react-static-google-map */}
                  <StaticGoogleMap
                    size="300x200"
                    zoom="15"
                    apiKey={GOOGLE_MAPS_API_KEY}
                    className="PlacesListing-placeItem-mapImage"
                  >
                    <Marker
                      location={{ lat: location.geo[1], lng: location.geo[0] }}
                      color="green"
                      label="V"
                      xiconURL={document.location.origin + pinImg}
                      xxxiconURL="https://goo.gl/1oTJ9Y"
                      iconURL="http://beta.vegogo.se/static/media/pin.46fd9ba2.png"
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
