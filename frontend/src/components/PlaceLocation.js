import React, { Component } from "react";
import ToggleIcon from "./ToggleIcon";
import { cleanupHomepage } from "../helpers.js";
import { StaticGoogleMap, Marker } from "react-static-google-map";
import { GOOGLE_MAPS_API_KEY } from "../api-config";

/**
 * Component with meta data for a place:
 * - Adress
 * - Map
 * - Opening hours
 */
class PlaceLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMapOpened: false
    };
    this.handleShowMapClick = this.handleShowMapClick.bind(this);
  }

  handleShowMapClick() {
    this.setState({
      isMapOpened: !this.state.isMapOpened
    });
  }

  render() {
    let {
      location,
      phone,
      homepage,
      name,
      openingHours,
      handleOpeningHoursClick,
      isLoadingOpeningHours
    } = this.props;
    let homepageOut = null;
    let locationAndMap = null;
    let { homepagePresentation, homepageWithProtocol } = cleanupHomepage(
      homepage
    );
    let { isMapOpened } = this.state;

    // Homepage.
    if (homepagePresentation && homepageWithProtocol) {
      homepageOut = (
        <p className="PlaceItem-meta-item">
          <a target="_blank" rel="noopener" href={homepageWithProtocol}>
            {homepagePresentation}
          </a>
        </p>
      );
    }

    // Location / Street address.
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
          <p>
            <button
              onClick={this.handleShowMapClick}
              className="PlaceItem-map-viewBtn"
            >
              <ToggleIcon opened={isMapOpened} />
              View on map
            </button>
          </p>

          {isMapOpened && (
            <p className="PlaceItem-staticMap">
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
            </p>
          )}

          {homepageOut}
          {/* https://www.npmjs.com/package/react-static-google-map */}

          <div className="PlaceOpeningHours">
            <p>
              <button
                onClick={handleOpeningHoursClick}
                className="PlaceItem-openingHours-viewBtn"
              >
                <ToggleIcon
                  opened={openingHours.length}
                  loading={isLoadingOpeningHours}
                />
                View opening hours
              </button>
            </p>

            {openingHours.length > 0 && (
              <ul className="PlaceItem-openingHours">
                {openingHours.map((dayHours, index) => (
                  <li className="PlaceItem-openingHours-dayHours" key={index}>
                    {dayHours}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {phone && (
            <p className="PlaceItem-meta-item">
              <a href={`tel:${phone}`}>{phone}</a>
            </p>
          )}
        </div>
      );
    }

    return locationAndMap;
  }
}

export default PlaceLocation;
