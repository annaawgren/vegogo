import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Vegogo home</h1>

        <Link to="components">Components</Link>
      </div>
    );
  }
}

export default Home;
