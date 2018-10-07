import React, { Component } from "react";
import ToggleIcon from "./ToggleIcon";
// import { cleanupHomepage } from "../helpers.js";
import { StaticGoogleMap, Marker } from "react-static-google-map";
import { GOOGLE_MAPS_API_KEY } from "../api-config";

/**
 * Component with meta data for a place:
 * - Adress
 * - Map
 * - Opening hours
 */
class PlaceDetails extends Component {
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
      phoneNumber,
      website,
      websitePresentation,
      name,
      openingHours,
      handleOpeningHoursClick,
      handleContactDetailsClick,
      isLoadingOpeningHours,
      isLoadingContactDetails,
      isOpeningHoursOpened,
      isContactDetailsOpened
    } = this.props;

    let locationAndMap = null;
    let { isMapOpened } = this.state;

    // Location / Street address.
    if (location && location.geo) {
      let googleLink = `http://maps.google.com/?q=${name}, ${
        location.street1
      }, ${location.state}, ${location.country}`;

      let street = (
        <p className="PlaceItem-meta-item">
          <a target="_blank" rel="noopener noreferrer" href={googleLink}>
            {location.street1}
          </a>
        </p>
      );

      let mapButton = (
        <p className="PlaceItem-infoToggler PlaceViewOnMap">
          <button
            onClick={this.handleShowMapClick}
            className="PlaceItem-infoToggler-button PlaceItem-map-viewBtn"
          >
            <ToggleIcon opened={isMapOpened} />
            View on map
          </button>
        </p>
      );

      // https://www.npmjs.com/package/react-static-google-map
      let map = (
        <React.Fragment>
          {isMapOpened && (
            <div className="PlaceItem-infoToggler-toggledContent">
              <p className="PlaceItem-staticMap">
                <a href={googleLink} target="_blank" rel="noopener noreferrer">
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
            </div>
          )}
        </React.Fragment>
      );

      let openingHoursOutput = (
        <React.Fragment>
          <p className="PlaceItem-infoToggler PlaceOpeningHours">
            <button
              onClick={handleOpeningHoursClick}
              className="PlaceItem-infoToggler-button PlaceItem-openingHours-viewBtn"
            >
              <ToggleIcon
                opened={isOpeningHoursOpened}
                loading={isLoadingOpeningHours}
              />
              Show opening hours
            </button>
          </p>

          {isOpeningHoursOpened && (
            <div className="PlaceItem-infoToggler-toggledContent">
              <ul className="PlaceItem-openingHours">
                {openingHours.map((dayHours, index) => (
                  <li className="PlaceItem-openingHours-dayHours" key={index}>
                    {dayHours}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </React.Fragment>
      );

      let toggleHomepageAndPhone = (
        <React.Fragment>
          <p className="PlaceItem-infoToggler PlaceToggleContactOptions">
            <button
              onClick={handleContactDetailsClick}
              className="PlaceItem-infoToggler-button PlaceItem-map-viewBtn"
            >
              <ToggleIcon
                opened={isContactDetailsOpened}
                loading={isLoadingContactDetails}
              />
              Show homepage & phone number
            </button>
          </p>

          {isContactDetailsOpened && (
            <>
              <div className="PlaceItem-infoToggler-toggledContent">
                <p className="PlaceItem-meta-item">
                  <a target="_blank" rel="noopener noreferrer" href={website}>
                    {websitePresentation}
                  </a>
                </p>

                <p className="PlaceItem-meta-item">
                  <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
                </p>
              </div>
            </>
          )}
        </React.Fragment>
      );

      locationAndMap = (
        <div className="PlaceItem-meta">
          {street}
          {toggleHomepageAndPhone}
          {/* {homepageOut}
          {phoneOutput} */}
          {mapButton}
          {map}
          {openingHoursOutput}
        </div>
      );
    }

    return locationAndMap;
  }
}

export default PlaceDetails;
