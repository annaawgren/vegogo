import React from "react";
import { Link } from "react-router-dom";
// import { getAreaPermalink } from "../helpers.js";
import { API_URL } from "../api-config";
import "./AreaIntro.css";
import ImageWithRatio from "../components/ImageWithRatio";
import Loading from "../components/Loading";

let AreaParent = props => {
  const { parentAreas } = props;

  return parentAreas.map(area => (
    <React.Fragment key={area.slug}>
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

let ChildAreas = props => {
  let { childAreas } = props;
  if (!childAreas.length) {
    return null;
  }

  return (
    <ul className="AreaIntro-childAreas">
      {childAreas.map(area => {
        return (
          <li key={area._id} className="AreaIntro-childArea">
            <Link to={area.permalink} className="AreaIntro-childArea-link">
              {area.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

/**
 * Show intro for an area, for example "stockholm" or the region "sofo" in Stockholm.
 * Displays area image and area title and description.
 *
 * Required props:
 *  - slug
 */
class AreaIntro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      area: {},
      isLoading: true,
      isError: true
    };
  }

  /**
   * Fetch area when component is mounted.
   */
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

  /**
   * https://reactjs.org/docs/react-component.html#componentdidupdate
   */
  componentDidUpdate(prevProps) {
    // Fetch new area if area slug is changed.
    if (this.props.slug !== prevProps.slug) {
      this.loadArea();
    }
  }

  render() {
    const { isLoading, isError } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    if (isError) {
      return <p>Error getting area.</p>;
    }

    const {
      name,
      tagline,
      image,
      imageThumb,
      content,
      parentAreas,
      childAreas
    } = this.state.area;
    const { children } = this.props;

    return (
      <div className="AreaIntro">
        <div>
          {imageThumb && (
            <div>
              <ImageWithRatio
                src={imageThumb}
                width={image.width}
                height={image.height}
                alt=""
                className="AreaIntro-image"
              />
            </div>
          )}
        </div>

        <h2 className="AreaIntro-title">{name}</h2>

        <ChildAreas childAreas={childAreas} />

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
