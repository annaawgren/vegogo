import React, { Component } from "react";
import { StaticGoogleMap, Marker } from "react-static-google-map";
import { GOOGLE_MAPS_API_KEY, API_URL } from "../api-config";
import closeImg from "../images/icon-close.svg";
import classnames from "classnames";
import { cleanupHomepage, getPlacePermalink } from "../helpers.js";
import { Helmet } from "react-helmet";
// import ImageGallery from "react-image-gallery";
import "./PlacesListing.css";
import PlaceImages from "./PlaceImages";
import PlaceTypes from "./PlaceTypes";
import PlaceLocation from "./PlaceLocation";

/**
 * Get opening hours for a placeId from Google.
 *
 * @return Promise
 */
function getPlaceOpeningHours(placeId = "ChIJwXlpyed3X0YRnArSXmAPX-U") {
  let dummyElm = document.createElement("div");
  var service = new window.google.maps.places.PlacesService(dummyElm);

  var request = {
    placeId: placeId,
    fields: ["opening_hours"]
  };

  return new Promise(resolve => {
    service.getDetails(request, res => {
      resolve(res);
    });
  });
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
      detailsOpen: false,
      isLoading: false,
      isLoadingOpeningHours: false,
      openingHours: []
    };

    this.handleMoreClick = this.handleMoreClick.bind(this);
    this.handleOpeningHoursClick = this.handleOpeningHoursClick.bind(this);
  }

  handleOpeningHoursClick(e) {
    if (this.state.openingHours.length > 0) {
      this.setState({
        openingHours: []
      });
    } else {
      this.setState({ isLoadingOpeningHours: true });
      getPlaceOpeningHours().then(res => {
        this.setState({
          openingHours: res.opening_hours.weekday_text,
          isLoadingOpeningHours: false
        });
      });
    }
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
      this.setState({ place: this.props, isLoading: false });
    } else {
      // Needed data not found in props, so load from API.
      this.loadPlaceFromApi();
    }
  }

  loadPlaceFromApi() {
    let placesApiUrl = `${API_URL}/place/slug/${this.placeSlug}`;
    this.setState({ isLoading: true });

    fetch(placesApiUrl)
      .then(data => {
        if (data.ok) {
          return data.json();
        } else {
          throw new Error("Error getting place from API");
        }
      })
      .then(data => {
        this.setState({ place: data.place, isLoading: false, isError: false });
      })
      .catch(err => {
        this.setState({ place: {}, isLoading: false, isError: true });
      });
  }

  render() {
    const { isLoading, isError } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (isError) {
      return <p>Error loading place...</p>;
    }

    let {
      name,
      slug,
      location,
      content,
      phone,
      homepage,
      foodTypes = []
    } = this.state.place;

    let { openingHours, isLoadingOpeningHours } = this.state;

    let { isSingleView } = this.props;

    let permalink = getPlacePermalink(this.state.place);

    let placeClassNames = classnames({
      PlaceItem: true,
      "PlaceItem--isSingleView": isSingleView,
      "PlaceItem--isOverview": !isSingleView,
      "PlaceItem--expanded": this.state.detailsOpen
    });

    let tease = (
      <div>
        <div className="PlaceItem-head">
          <h1 className="PlaceItem-name">{name}</h1>

          {!isSingleView && (
            <button href="/" className="PlaceItem-more">
              {this.state.detailsOpen && <img src={closeImg} alt="✖" />}
              {!this.state.detailsOpen && "more"}
            </button>
          )}

          <PlaceTypes foodTypes={foodTypes} />
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

    let imagesMarkup = <PlaceImages {...this.state.place} />;

    return (
      <article key={slug} className={placeClassNames}>
        {isSingleView && (
          <Helmet>
            <title>{`${name}`} – Vegogo</title>
          </Helmet>
        )}

        {imagesMarkup}

        <div className="PlaceItem-content">
          {tease}

          {/* Details are shown on details page or when "More" link is clicked. */}
          {this.state.detailsOpen && (
            <div className="PlaceItem-details">
              <div className="PlaceItem-featuresWrap" />
              {contentOut}
              <PlaceLocation
                {...{
                  location,
                  phone,
                  name,
                  homepage,
                  openingHours,
                  isLoadingOpeningHours
                }}
                handleOpeningHoursClick={this.handleOpeningHoursClick}
              />
            </div>
          )}
        </div>
      </article>
    );
  }
}

export default Place;

// function PlaceTimes({ foodTimes }) {
//   let times = foodTimes.map(type => (
//     <li key={type.key} className="PlaceItem-features-item">
//       <span>{type.name}</span>
//     </li>
//   ));

//   if (times && times.length) {
//     times = (
//       <div className="PlaceItem-features">
//         <h3 className="PlaceItem-features-title">Great for</h3>
//         <ul className="PlaceItem-features-items">{times}</ul>
//       </div>
//     );
//   }

//   return times;
// }
