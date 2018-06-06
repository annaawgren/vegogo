import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "normalize.css";
import "./App.css";
import Home from "./components/Home";
import ExampleComponents from "./components/ExampleComponents";
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
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route
            path="/components"
            render={props => <ExampleComponents places={places} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
