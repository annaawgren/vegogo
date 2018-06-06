import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";

import Helloworld from "./helloworld";
import Signup from "./signup";
import { API_URL } from "./api-config";

class App extends Component {
  componentDidMount() {
    // hej
    let placesApiUrl = `${API_URL}/places`;
    console.log("placesApiUrl", placesApiUrl);
  }

  render() {
    return (
      <div className="App">
        <Helloworld />

        <p className="App-intro">Hello Hola Hej Vegan + World</p>

        <Signup />
      </div>
    );
  }
}

export default App;
