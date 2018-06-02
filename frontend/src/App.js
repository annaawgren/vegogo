import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';

import Helloworld from "./helloworld"
import Signup from "./signup"


class App extends Component {
  render() {
    return (
      <div className="App">

        <Helloworld />

        <p className="App-intro">
          Hello Hola Hej Vegan + World
        </p>

        <Signup />
      </div>
    );
  }
}

export default App;
