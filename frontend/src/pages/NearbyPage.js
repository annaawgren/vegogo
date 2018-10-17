import React, { Component } from "react";
import SiteHeader from "../components/SiteHeader";
import PlacesListing from "../components/PlacesListing";
import NewsletterSignup from "../components/NewsletterSignup";
import SiteFooter from "../components/SiteFooter";
import "./NearbyPage.scss";
import { API_URL } from "../api-config";

class NearbyPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLocationFound: false,
      isLocating: false,
      isLocateError: false,
      isHaveTriedToGetLocation: false,
      foundLocation: {},
      isLoadingPlaces: false,
      places: []
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

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate()", arguments);
    console.log("prevState", prevState);

    let prevLat = prevState.foundLocation.lat;
    let prevLng = prevState.foundLocation.lng;

    let currentLat = this.state.foundLocation.lat;
    let currentLng = this.state.foundLocation.lng;

    // If updated lat + lng then update places.
    //console.log('prevLat prevLng currentLat currentLng', prevLat, prevLng, currentLat, currentLng);
    if (currentLat !== prevLat || currentLng !== prevLng) {
      console.log("position changed, get places");
      this.getPlaces();
    }
  }

  getPlaces() {
    // let apuUrl = http://localhost:3131/api/place/list/geo/?lat=59.316ping&lng=18.084
    this.setState({ isLoadingPlaces: true });

    let { lat, lng } = this.state.foundLocation;

    let apiUrl = `${API_URL}/place/list/geo/?lat=${lat}&lng=${lng}`;

    fetch(apiUrl)
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({ places: data.places, isLoadingPlaces: false });
      });
  }

  render() {
    const {
      isHaveTriedToGetLocation,
      isLocating,
      isLocateError,
      isLocationFound,
      foundLocation,
      isLoadingPlaces,
      places
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

        <PlacesListing places={places} isLoading={isLoadingPlaces} />

        <NewsletterSignup />

        <SiteFooter />
      </div>
    );
  }
}

export default NearbyPage;
