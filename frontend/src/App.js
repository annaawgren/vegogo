import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "normalize.css";
import "./App.css";
import MailchimpSignup from "./components/MailchimpSignup";
import PlacesListing from "./components/PlacesListing";
import { API_URL } from "./api-config";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: []
    };
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
  }

  render() {
    let { places } = this.state;

    return (
      <div className="App">
        <PlacesListing places={places} headline="Härliga ställen" />

        <MailchimpSignup />
      </div>
    );
  }
}

export default App;
