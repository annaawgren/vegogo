import React from "react";
import "./Bubble.css";

class SearchArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "123"
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
        <input
          type="text"
          placeholder="Search what where to eat"
          value={searchText}
          onChange={this.handleTextChange}
        />
      </div>
    );
  }
}

export default SearchArea;
