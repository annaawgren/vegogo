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
    const apiUrl = `${API_URL}/area/listCities`;

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
          {areas.map(city => {
            return (
              <li key={city._id} className="DebugAreas-item">
                <h3 className="DebugAreas-item-title">{city.name}</h3>
                {city.tagline && (
                  <p className="DebugAreas-item-tagline">{city.tagline}</p>
                )}

                {/* Areas within a city, sofo, möllan, and so on */}
                {city.childAreas && (
                  <div>
                    {/* <p>{city.name} has {city.childAreas.length} child areas:</p> */}

                    <ul>
                      {city.childAreas.map(childArea => {
                        return (
                          <li>
                            {childArea.name}
                            {childArea.tagline}
                            {childArea.childAreas && (
                              <div>
                                {/* <p>{childArea.name} has {childArea.childAreas.length} child areas:</p> */}
                                <ul>
                                  {childArea.childAreas.map(childChildArea => {
                                    return (
                                      <li>
                                        {childChildArea.name}
                                        {childChildArea.tagline}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
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
