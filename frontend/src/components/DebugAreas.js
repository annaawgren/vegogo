import React, { Component } from "react";
import { API_URL } from "../api-config";
import "./DebugAreas.css";

class DebugAreas extends Component {
  constructor() {
    super();
    this.state = {
      areas: [],
      isLoading: false,
      isError: false
    };
  }
  componentDidMount() {
    this.load();
  }

  load() {
    const apiUrl = `${API_URL}/area/list`;

    this.setState({ isLoading: true, isError: false });

    fetch(apiUrl)
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({ areas: data.areas, isLoading: false, isError: false });
      });
  }

  render() {
    const { children } = this.props;
    const { isLoading, areas } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <section className="DebugAreas">
        <h2 className="DebugAreas-title">All areas</h2>
        {children}
        <ul class="DebugAreas-items">
          {areas.map(area => {
            return (
              <li key={area._id} className="DebugAreas-item">
                <h3 className="DebugAreas-item-title">{area.name}</h3>
                {area.tagline && (
                  <p className="DebugAreas-item-tagline">{area.tagline}</p>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default DebugAreas;
