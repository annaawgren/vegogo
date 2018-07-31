import React, { Component } from "react";
// import SiteHeader from "./SiteHeader";
// import SiteFooter from "./SiteFooter";
import { StaticGoogleMap, Marker } from "react-static-google-map";
// import pinImg from "../images/pin.png";
import Bubble from "./Bubble";
import { GOOGLE_MAPS_API_KEY, API_URL } from "../api-config";
import closeImg from "../images/icon-close.svg";
import classnames from "classnames";
import { cleanupHomepage, getPlacePermalink } from "../helpers.js";
import { Helmet } from "react-helmet";
import ImageGallery from "react-image-gallery";

function PlaceTypes({ foodTypes }) {
  let types = foodTypes.map(type => (
    <li key={type.key} className="PlaceItem-features-item">
      <span>{type.name}</span>
    </li>
  ));

  if (types && types.length) {
    types = (
      <div className="PlaceItem-features">
        <h3 className="PlaceItem-features-title">Food to find</h3>
        <ul className="PlaceItem-features-items">{types}</ul>
      </div>
    );
  }

  return types;
}

function PlaceTimes({ foodTimes }) {
  let times = foodTimes.map(type => (
    <li key={type.key} className="PlaceItem-features-item">
      <span>{type.name}</span>
    </li>
  ));

  if (times && times.length) {
    times = (
      <div className="PlaceItem-features">
        <h3 className="PlaceItem-features-title">Great for</h3>
        <ul className="PlaceItem-features-items">{times}</ul>
      </div>
    );
  }

  return times;
}

class PlaceLocation extends Component {
  render() {
    let { location, phone, homepage, name } = this.props;
    let homepageOut = null;
    let locationAndMap = null;
    let { homepagePresentation, homepageWithProtocol } = cleanupHomepage(
      homepage
    );

    if (homepagePresentation && homepageWithProtocol) {
      homepageOut = (
        <p className="PlaceItem-meta-item">
          <a target="_blank" rel="noopener" href={homepageWithProtocol}>
            {homepagePresentation}
          </a>
        </p>
      );
    }

    if (location && location.geo) {
      let googleLink = `http://maps.google.com/?q=${name}, ${
        location.street1
      }, ${location.state}, ${location.country}`;

      locationAndMap = (
        <div className="PlaceItem-meta">
          <p className="PlaceItem-meta-item">
            <a target="_blank" ref="noopener" href={googleLink}>
              {location.street1}
            </a>
          </p>
          {phone && (
            <p className="PlaceItem-meta-item">
              <a href={`tel:${phone}`}>{phone}</a>
            </p>
          )}
          {homepageOut}
          {/* https://www.npmjs.com/package/react-static-google-map */}
          <p className="PlaceItem-staticMap">
            <a href={googleLink} target="_blank" rel="noopener">
              <StaticGoogleMap
                size="300x200"
                zoom="15"
                scale="2"
                apiKey={GOOGLE_MAPS_API_KEY}
                className="PlaceItem-meta-item PlacesListing-placeItem-mapImage"
              >
                <Marker
                  location={{ lat: location.geo[1], lng: location.geo[0] }}
                  color="green"
                  label="V"
                  iconURL="https://beta.vegogo.se/favicon-32x32.png"
                />
              </StaticGoogleMap>
            </a>
          </p>
        </div>
      );
    }

    return locationAndMap;
  }
}

/**
 * Place can get what to render from a slug + props with full place object, for example when being used in a listing
 * or from props match when viewing a place permalink.
 */
class Place extends Component {
  constructor(props) {
    super(props);

    this.state = {
      place: {},
      detailsOpen: false
    };

    this.handleMoreClick = this.handleMoreClick.bind(this);
  }

  handleMoreClick(e) {
    // If cmd on mac or ? on windows is pressed then let the browser open the place in new window or tab.
    // } else if ( event.ctrlKey || event.metaKey ) {
    if (e.ctrlKey || e.metaKey) {
    } else {
      this.setState({ detailsOpen: !this.state.detailsOpen });
      e.preventDefault();
    }
  }

  componentDidMount() {
    // If match exists then we are coming here via url.
    // Other way to get here is just through a component added on another page.
    let { match, slug, isSingleView } = this.props;

    this.placeSlug = null;

    if (slug) {
      this.placeSlug = slug;
    } else if (match && match.params.place) {
      this.placeSlug = match.params.place;
    }

    if (!this.placeSlug) {
      console.log("no place found :(");
    }

    if (isSingleView) {
      this.setState({
        detailsOpen: true
      });
    }

    // Check if data needs to be loaded.
    if (
      this.props.name &&
      this.props.slug &&
      this.props.state &&
      this.props.location
    ) {
      // Seems like the place has some place props, so set state with that.
      this.setState({ place: this.props });
    } else {
      // Needed data not found in props, so load from API.
      this.loadPlaceFromApi();
    }
  }

  loadPlaceFromApi() {
    let placesApiUrl = `${API_URL}/place/slug/${this.placeSlug}`;

    fetch(placesApiUrl)
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({ place: data.place });
      });
  }

  render() {
    let {
      name,
      slug,
      location,
      content,
      foodTypes = [],
      foodTimes = [],
      imageThumb,
      imagesThumbs,
      tagline,
      phone,
      homepage
    } = this.state.place;

    let { isSingleView } = this.props;

    let permalink = getPlacePermalink(this.state.place);

    let imageMarkup;
    if (imageThumb) {
      // imageMarkup = (
      //   <div className="PlaceItem-photo">
      //     <img src={imageThumb} alt="" className="PlaceItem-photo-img" />
      //     {tagline && <Bubble text={tagline} color="yellow" />}
      //   </div>
      // );
    }

    let imagesMarkup;
    if (imageThumb || imagesThumbs) {
      let galleryImagesThumbs = [];
      imageThumb && galleryImagesThumbs.push(imageThumb);
      imagesThumbs && galleryImagesThumbs.push(...imagesThumbs);

      let ImageGalleryImages = galleryImagesThumbs.map(image => {
        return {
          original: image
        };
      });

      imagesMarkup = (
        <div className="PlaceItem-photos">
          {/* {imagesThumbs.map((image) => {
            return (
              <img
                src={image}
                key={image}
                alt=""
                className="PlaceItem-photos-img"
              />
            );
          })} */}
          <ImageGallery
            items={ImageGalleryImages}
            lazyLoad={true}
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
            showBullets={ImageGalleryImages.length > 1}
          />
        </div>
      );
    }

    let placeClassNames = classnames({
      placeItem: true,
      "PlaceItem--isSingleView": isSingleView,
      "PlaceItem--isOverview": !isSingleView,
      "PlaceItem--expanded": this.state.detailsOpen
    });

    let tease = (
      <div>
        {imageMarkup}
        <div className="PlaceItem-head">
          <h1 className="PlaceItem-name">{name}</h1>
          {!isSingleView && (
            <button href="/" className="PlaceItem-more">
              {this.state.detailsOpen && <img src={closeImg} alt="✖" />}
              {!this.state.detailsOpen && "more"}
            </button>
          )}
        </div>
      </div>
    );

    let contentOut;
    if (content) {
      contentOut = (
        <div
          className="PlaceItem-textcontent PlaceItem-textcontent--brief"
          dangerouslySetInnerHTML={{ __html: content.brief }}
        />
      );
    }

    if (isSingleView) {
      tease = <div className="PlaceItem-tease">{tease}</div>;
    } else {
      tease = (
        <a
          className="PlaceItem-tease"
          onClick={this.handleMoreClick}
          href={permalink}
        >
          {tease}
        </a>
      );
    }

    return (
      <article key={slug} className={placeClassNames}>
        <Helmet>
          <title>{`${name}`} – Vegogo</title>
        </Helmet>

        {tease}
        {imagesMarkup}

        {/* Details are shown on details page or when "More" link is clicked. */}
        {this.state.detailsOpen && (
          <div className="PlaceItem-details">
            <div className="PlaceItem-featuresWrap">
              <PlaceTypes foodTypes={foodTypes} />
              <PlaceTimes foodTimes={foodTimes} />
            </div>
            {contentOut}
            <PlaceLocation {...{ location, phone, name, homepage }} />
          </div>
        )}
      </article>
    );
  }
}

export default Place;
