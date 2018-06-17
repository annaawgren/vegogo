import React from "react";
import "./SearchArea.css";

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
        <p>
          <input
            type="text"
            placeholder="Search what where to eat"
            value={searchText}
            onChange={this.handleTextChange}
          />
        </p>

        <p>
          Or find out{" "}
          <button className="SearchArea-nearButton">what's near</button>
        </p>
      </div>
    );
  }
}

export default SearchArea;
