import React from "react";
import "./SearchArea.css";
// import pinImg from "../images/vegogo-pin.svg";

export default class UserLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: null,
      lat: null,
      lng: null
    };

    this.handleLocationNearMeClick = this.handleLocationNearMeClick.bind(this);
    this.getLocations = this.getLocations.bind(this);
  }

  handleLocationNearMeClick(e) {
    let that = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      that.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });
  }

  getLocations() {
    this.setState({
      locations: []
    });
  }

  render() {
    let { lat, lng, locations } = this.state;

    if (lat && lng && locations === null) {
      this.getLocations();
    }

    return (
      <div className="UserLocation">
        <p className="UserLocation-row">
          <button onClick={this.handleLocationNearMeClick}>
            Show places near me
          </button>
        </p>
        {lat &&
          lng && (
            <div>
              lat: {lat}
              <br />
              lng: {lng}
            </div>
          )}
      </div>
    );
  }
}
