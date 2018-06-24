import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "normalize.css";
import "./App.css";
import Home from "./components/Home";
import ExampleComponents from "./components/ExampleComponents";
import Place from "./components/Place";
import NotFoundPage from "./pages/NotFound";
import PlacePage from "./pages/Place";
import { API_URL } from "./api-config";
import ReactGA from "react-ga";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: []
    };

    this.GATrackingID = "UA-181460-40";
  }
  /**
   * Load places when component is mounted.
   */
  componentDidMount() {
    let placesApiUrl = `${API_URL}/place/list`;
    fetch(placesApiUrl)
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({ places: data.places });
      });

    this.initGA();
  }

  /**
   * Docs for GA component used:
   * https://github.com/react-ga/react-ga
   */
  initGA() {
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
    let { places } = this.state;

    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/place/:place"
              render={props => <PlacePage {...props} />}
            />
            <Route
              path="/components"
              render={props => <ExampleComponents places={places} />}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
