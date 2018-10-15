import React, { Component } from "react";
import SiteHeader from "../components/SiteHeader";
import NewsletterSignup from "../components/NewsletterSignup";
import SiteFooter from "../components/SiteFooter";
import "./NearbyPage.scss";

class NearbyPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLocationFound: false,
      isLocating: false,
      isLocateError: false,
      isHaveTriedToGetLocation: false,
      foundLocation: {}
    };

    this.handleGetLocation = this.handleGetLocation.bind(this);
    this.handleGetLocationSuccess = this.handleGetLocationSuccess.bind(this);
    this.handleGetLocationError = this.handleGetLocationError.bind(this);
  }

  handleGetLocation() {
    console.log("getLocation()");

    this.setState({
      isLocationFound: false,
      isLocating: true,
      isLocateError: false,
      foundLocation: {}
    });

    navigator.geolocation.getCurrentPosition(
      this.handleGetLocationSuccess,
      this.handleGetLocationError
    );
  }

  handleGetLocationSuccess(position) {
    console.log("handleGetLocationSuccess()", position);

    this.setState({
      foundLocation: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy
      },
      isLocationFound: true,
      isLocating: false
    });
  }

  handleGetLocationError(PositionError) {
    console.log("handleGetLocationError()", PositionError);

    this.setState({
      foundLocation: {},
      isLocationFound: false,
      isLocating: false,
      isLocateError: true
    });
  }

  render() {
    const {
      isHaveTriedToGetLocation,
      isLocating,
      isLocateError,
      isLocationFound,
      foundLocation
    } = this.state;

    return (
      <div>
        <SiteHeader />

        {/* <PlacesListing places={places} isLoading={isLoading} /> */}

        {isHaveTriedToGetLocation || (
          <div className="NearbyPage-text">
            <p>
              We can show places near your current location. Your webbrowser
              will ask for permission to do this when you click the button
              below.
            </p>
            <p>
              <button onClick={this.handleGetLocation}>
                Show places near my location
              </button>
            </p>
          </div>
        )}

        {isLocating && (
          <div className="NearbyPage-text">
            <p>Hold on! We're trying to get your location...</p>
          </div>
        )}

        {isLocateError && (
          <div className="NearbyPage-text">
            <p>Dang! We could not locate you.</p>
          </div>
        )}

        {isLocationFound && (
          <div className="NearbyPage-text">
            <p>
              Wohoo! We got your location. Here are som great places near you:
            </p>
            <p>
              lat: {foundLocation.lat}
              <br />
              lng: {foundLocation.lng}
              <br />
              accuracy: {foundLocation.accuracy}
            </p>
          </div>
        )}

        <NewsletterSignup />

        <SiteFooter />
      </div>
    );
  }
}

export default NearbyPage;
