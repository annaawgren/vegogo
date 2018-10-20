import React, { Component } from "react";
import PlacesListing from "../components/PlacesListing";
import VegogoButton from "../components/VegogoButton";
import "./NearbyPage.scss";
import { API_URL } from "../api-config";
import locationImg from "../images/baseline-my_location-24px.svg";
import PageContainer from "../pages/PageContainer";
import { Helmet } from "react-helmet";

class NearbyPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingPlaces: false,
      places: []
    };

    this.handleGetLocation = props.handleGetLocation;
  }

  componentDidMount() {
    const { locationIsFound } = this.props;
    if (locationIsFound) {
      this.getPlaces();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate()", arguments);
    console.log("prevState", prevState);

    let prevLat = prevProps.locationFoundLocation.lat;
    let prevLng = prevProps.locationFoundLocation.lng;

    let currentLat = this.props.locationFoundLocation.lat;
    let currentLng = this.props.locationFoundLocation.lng;

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

    let { lat, lng } = this.props.locationFoundLocation;

    if (!lat || !lng) {
      return false;
    }

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
      locationIsHaveTriedToGetLocation,
      locationIsLocating,
      locationIsLocateError,
      locationIsFound
    } = this.props;

    const { isLoadingPlaces, places } = this.state;

    window.scrollTo(0, 0);

    return (
      <PageContainer>
        <Helmet>
          <title>Vegan places near you</title>
        </Helmet>

        {/* <PlacesListing places={places} isLoading={isLoading} /> */}

        <div className="NearbyPage">
          <h1>Great vegan places near you</h1>

          {locationIsHaveTriedToGetLocation || (
            <div className="NearbyPage-text">
              <p>
                Allow us to use your current position and we will show you the
                best vegan places to eat nearby!
              </p>
              <p>
                <VegogoButton
                  onClick={this.handleGetLocation}
                  icon={locationImg}
                >
                  Show great vegan places nearby
                </VegogoButton>
              </p>
            </div>
          )}

          {locationIsLocating && (
            <div className="NearbyPage-text">
              <p>Hold on! We're trying to get your location...</p>
            </div>
          )}

          {locationIsLocateError && (
            <div className="NearbyPage-text">
              <p>Dang! We could not locate you.</p>
              <VegogoButton onClick={this.handleGetLocation} icon={locationImg}>
                Try to locate me again
              </VegogoButton>
            </div>
          )}

          {locationIsFound && (
            <div className="NearbyPage-text">
              <p>
                Nice! We got your location.{" "}
                <VegogoButton
                  onClick={this.handleGetLocation}
                  icon={locationImg}
                >
                  Update location
                </VegogoButton>
              </p>
              <p>Here are som great vegan places near you.</p>
            </div>
          )}
        </div>

        <PlacesListing
          places={places}
          isLoading={isLoadingPlaces}
          showDivider={false}
        />
      </PageContainer>
    );
  }
}

export default NearbyPage;
