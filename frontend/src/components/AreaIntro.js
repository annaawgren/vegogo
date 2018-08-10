import React from "react";
import "./AreaIntro.css";
import { API_URL } from "../api-config";

let AreaParent = props => {
  const { parentAreas } = props;

  return parentAreas.map(area => (
    <React.Fragment>
      <AreaParent parentAreas={area.parentAreas} />
      <li className="AreaIntro-parentAreasListing-item">{area.name}</li>
    </React.Fragment>
  ));
};

let AreaParents = props => {
  const { parentAreas } = props;

  const parents = <AreaParent parentAreas={parentAreas} />;

  return parents ? (
    <ul className="AreaIntro-parentAreasListing">
      <AreaParent parentAreas={parentAreas} />
    </ul>
  ) : null;
};

class AreaIntro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      area: {},
      isLoading: true,
      isError: true
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
        if (!data || data.error) {
          this.setState({ area: {}, isLoading: false, isError: true });
        } else {
          this.setState({ area: data.area, isLoading: false, isError: false });
        }
      });
  }

  render() {
    const { isLoading, isError } = this.state;

    if (isLoading) {
      return <p>Loading area...</p>;
    }

    if (isError) {
      return <p>Error getting area.</p>;
    }

    const { name, tagline, imageThumb, content, parentAreas } = this.state.area;
    const { children } = this.props;

    return (
      <div className="AreaIntro">
        <div>
          {imageThumb && (
            <img src={imageThumb} alt="" className="AreaIntro-image" />
          )}
        </div>

        <h2 className="AreaIntro-title">{name}</h2>

        <AreaParents parentAreas={parentAreas} />

        {tagline && <p className="AreaIntro-tagline">{tagline}</p>}

        {content &&
          content.brief && (
            <div
              className="AreaIntro-content AreaIntro-content--brief"
              dangerouslySetInnerHTML={{ __html: content.brief }}
            />
          )}

        {content &&
          content.extended && (
            <div
              className="AreaIntro-content AreaIntro-content--extended"
              dangerouslySetInnerHTML={{ __html: content.extended }}
            />
          )}

        {children}
      </div>
    );
  }
}

export default AreaIntro;
