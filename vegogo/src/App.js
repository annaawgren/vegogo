import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Helloworld from "./helloworld"

class App extends Component {
  render() {
    return (
      <div className="App">

        <Helloworld />

        <p className="App-intro">
          Hello vegan
        </p>
      </div>
    );
  }
}

export default App;
