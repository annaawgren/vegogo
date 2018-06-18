import React from "react";
import "./SearchArea.css";
import pinImg from "../images/vegogo-pin.svg";

class SearchArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };

    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(e) {
    this.setState({ searchText: e.target.value });
  }

  render() {
    let { searchText } = this.state;

    return (
      <div className="SearchArea">
        <p className="SearchArea-row">
          <input
            className="SearchArea-searchInput"
            type="text"
            placeholder="Search what where to eat"
            value={searchText}
            onChange={this.handleTextChange}
          />
        </p>

        <p className="SearchArea-row">
          <img className="SearchArea-nearPin" src={pinImg} alt="" />
          or find out{" "}
          <button className="SearchArea-nearButton">what's near</button>
        </p>
      </div>
    );
  }
}

export default SearchArea;
