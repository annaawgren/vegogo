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
                <h3 className="DebugAreas-item-title">
                  {city.name}
                  {city.tagline && (
                    <span className="DebugAreas-item-tagline">
                      {city.tagline}
                    </span>
                  )}
                </h3>

                {/* Areas within a city, sofo, möllan, and so on */}
                {city.childAreas && (
                  <ul className="DebugArea-childAreaList">
                    {city.childAreas.map(childArea => {
                      return (
                        <li>
                          <p className="DebugArea-childArea-title">
                            {childArea.name}
                            {childArea.tagline && (
                              <span className="DebugArea-childArea-tagline">
                                {childArea.tagline}
                              </span>
                            )}
                          </p>
                          {childArea.childAreas && (
                            <ul class="DebugArea-childChildAreaList">
                              {childArea.childAreas.map(childChildArea => {
                                return (
                                  <li>
                                    <p className="DebugArea-childArea-title">
                                      {childChildArea.name}
                                      {childChildArea.tagline && (
                                        <span className="DebugArea-childArea-tagline">
                                          {childChildArea.tagline}
                                        </span>
                                      )}
                                    </p>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
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
