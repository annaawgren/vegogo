import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "normalize.css";
import "./App.scss";
import Home from "./components/Home";
import ExampleComponents from "./components/ExampleComponents";
import NotFoundPage from "./pages/NotFound";
import PlacePage from "./pages/PlacePage";
import TextPage from "./pages/TextPage";
import CityPage from "./pages/CityPage";
import NearbyPage from "./pages/NearbyPage";
import ReactGA from "react-ga";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationIsFound: false,
      locationIsLocating: false,
      locationIsLocateError: false,
      locationIsHaveTriedToGetLocation: false,
      locationFoundLocation: {}
    };

    this.GATrackingID = "UA-181460-40";

    this.handleGetLocation = this.handleGetLocation.bind(this);
    this.handleGetLocationSuccess = this.handleGetLocationSuccess.bind(this);
    this.handleGetLocationError = this.handleGetLocationError.bind(this);
  }

  /**
   * Load places when component is mounted.
   */
  componentDidMount() {
    this.initGA();
  }

  handleGetLocation() {
    console.log("getLocation()");

    this.setState({
      locationIsFound: false,
      locationIsLocating: true,
      locationIsLocateError: false,
      locationFoundLocation: {},
      locationIsHaveTriedToGetLocation: true
    });

    navigator.geolocation.getCurrentPosition(
      this.handleGetLocationSuccess,
      this.handleGetLocationError
    );
  }

  handleGetLocationSuccess(position) {
    console.log("handleGetLocationSuccess()", position);

    this.setState({
      locationFoundLocation: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy
      },
      locationIsFound: true,
      locationIsLocating: false
    });
  }

  handleGetLocationError(PositionError) {
    console.log("handleGetLocationError()", PositionError);

    this.setState({
      locationFoundLocation: {},
      locationIsFound: false,
      locationIsLocating: false,
      locationIsLocateError: true
    });
  }

  // loadGoogleAPIs() {
  //   window.gapi.load('client', this.googleAPILoaded);
  // }

  // googleAPILoaded() {
  //   console.log('google loaded');
  //   window.gapi.client.init({
  //     'apiKey': 'AIzaSyCYCr0ilOmynS4WcS-OSOPTcdDWfDpSMw8'
  //   }).then(function() {

  //     var restRequest = window.gapi.client.request({
  //       //'path': 'https://people.googleapis.com/v1/people/me/connections',
  //       'path': 'https://maps.googleapis.com/maps/api/place/details/',
  //       'params': {'sortOrder': 'LAST_NAME_ASCENDING'}
  //     }).then((res) => {
  //       console.log('res', res);
  //     })

  //   });

  //   // console.log('restRequest', restRequest);

  // }

  /**
   * Docs for GA component used:
   * https://github.com/react-ga/react-ga
   */
  initGA() {
    const isDevelopment = process.env.NODE_ENV === "development";

    // Don't track on local development.
    if (isDevelopment) {
      return;
    }

    ReactGA.initialize(this.GATrackingID, {
      debug: true,
      titleCase: false,
      gaOptions: {
        anonymizeIp: true
      }
    });

    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    let {
      locationIsFound,
      locationIsLocating,
      locationIsLocateError,
      locationFoundLocation,
      locationIsHaveTriedToGetLocation
    } = this.state;

    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" render={props => <Home />} />

            <Route
              exact
              path="/page/:pageName?"
              render={props => <TextPage page={props} />}
            />

            <Route
              exact
              path="/place/:place?"
              render={props => <PlacePage place={props} />}
            />

            <Route path="/components" render={props => <ExampleComponents />} />

            <Route
              exact
              path="/nearby/"
              render={props => (
                <NearbyPage
                  {...props}
                  locationIsFound={locationIsFound}
                  locationIsLocating={locationIsLocating}
                  locationIsLocateError={locationIsLocateError}
                  locationFoundLocation={locationFoundLocation}
                  locationIsHaveTriedToGetLocation={
                    locationIsHaveTriedToGetLocation
                  }
                  handleGetLocation={this.handleGetLocation}
                  handleGetLocationSuccess={this.handleGetLocationSuccess}
                  handleGetLocationError={this.handleGetLocationError}
                />
              )}
            />

            <Route
              exact
              path="/:city/:cityArea1?/:cityArea2?"
              render={props => <CityPage {...props} />}
            />

            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
