import React from "react";
import "./AreaIntro.css";
import { API_URL } from "../api-config";

class AreaIntro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      area: {},
      isLoading: true
    };
  }

  componentDidMount() {
    this.loadArea();
  }

  loadArea() {
    let slug = this.props.slug;

    if (!slug) {
      return;
    }

    let apiUrl = `${API_URL}/area/slug/${slug}`;

    fetch(apiUrl)
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({ area: data.area, isLoading: false });
      });
  }

  render() {
    if (this.state.isLoading) {
      return <p>Loading area...</p>;
    }

    return (
      <div className="AreaIntro">
        <div>
          {this.state.area.imageThumb && (
            <img
              src={this.state.area.imageThumb}
              alt=""
              className="AreaIntro-image"
            />
          )}
        </div>
        <h2 className="AreaIntro-title">{this.state.area.name}</h2>
        <p>{this.state.area.tagline}</p>
        <div
          className=""
          dangerouslySetInnerHTML={{ __html: this.state.area.content.brief }}
        />
        <div
          className=""
          dangerouslySetInnerHTML={{ __html: this.state.area.content.extended }}
        />
      </div>
    );
  }
}

export default AreaIntro;
