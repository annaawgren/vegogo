import React, { Component } from "react";
import { API_URL } from "../api-config";
// import closeImg from "../images/icon-close.svg";
import classnames from "classnames";
import { getPlacePermalink } from "../helpers.js";
import { Helmet } from "react-helmet";
// import ImageGallery from "react-image-gallery";
import "./PlacesListing.scss";
// import PlaceImages from "./PlaceImages";
// import PlaceImagesNew from "./PlaceImagesNew";
import PlaceImagesStacked from "./PlaceImagesStacked";
import PlaceTypes from "./PlaceTypes";
import PlaceDetails from "./PlaceDetails";
import { getPlaceDetailsFromGoogle } from "../helpers.js";
import Loading from "./Loading";
import { cleanupHomepage } from "../helpers.js";
import posed from "react-pose";

const Content = posed.div({
  closed: {
    height: 0,
    opacity: 0,
    translateY: -10
  },
  open: {
    height: "auto",
    opacity: 1,
    translateY: 0
  }
});

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
      isLoadingContactDetails: false,
      isContactDetailsOpened: false,
      isOpeningHoursOpened: false,
      openingHours: [],
      openNow: undefined,
      phoneNumber: undefined,
      website: undefined,
      websitePresentation: undefined
    };

    this.handleMoreClick = this.handleMoreClick.bind(this);
    this.handleOpeningHoursClick = this.handleOpeningHoursClick.bind(this);
    this.handleContactDetailsClick = this.handleContactDetailsClick.bind(this);
  }

  // Toogle opening hours.
  handleOpeningHoursClick(e) {
    // Hide and bail if already open.
    if (this.state.isOpeningHoursOpened) {
      this.setState({ isOpeningHoursOpened: false });
      return;
    }

    this.setState({ isLoadingOpeningHours: true });

    this.loadDetails().then(() => {
      this.setState({
        isLoadingOpeningHours: false,
        isOpeningHoursOpened: true
      });
    });
  }

  // Toggle contact details, i.e. homepage and phone number
  handleContactDetailsClick(e) {
    // Hide and bail if already open.
    if (this.state.isContactDetailsOpened) {
      this.setState({ isContactDetailsOpened: false });
      return;
    }

    this.setState({ isLoadingContactDetails: true });

    this.loadDetails().then(() => {
      this.setState({
        isLoadingContactDetails: false,
        isContactDetailsOpened: true
      });
    });
  }

  /**
   * Load details from Google, like opening hours.
   */
  loadDetails() {
    return new Promise((resolve, reject) => {
      let { googlePlaceId: placeId } = this.state.place;

      getPlaceDetailsFromGoogle(placeId)
        .then(res => {
          let { homepagePresentation } = cleanupHomepage(res.website);
          this.setState({
            openNow: res.opening_hours.open_now, // bool
            openingHours: res.opening_hours.weekday_text, // array with strings with opening hours per day
            phoneNumber: res.international_phone_number, // "+46 8 420 565 44"
            website: res.website, // "https://www.mahalosthlm.se/"
            websitePresentation: homepagePresentation // "https://www.mahalosthlm.se/"
          });
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
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
      return <Loading />;
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

    // Distance is in meters and be like 213.79645204214572
    // so we round it a bit because it's not a really safe number to use.
    let { distance: locationDistance } = { ...location };
    if (locationDistance) {
      // Round to closest nn meters.
      locationDistance = Math.round(locationDistance / 50) * 50;
    }

    let {
      openingHours,
      openNow,
      phoneNumber,
      website,
      isLoadingOpeningHours,
      isLoadingContactDetails,
      isContactDetailsOpened,
      isOpeningHoursOpened,
      websitePresentation,
      detailsOpen
    } = this.state;

    let { isSingleView } = this.props;

    let permalink = getPlacePermalink(this.state.place);

    let placeClassNames = classnames({
      PlaceItem: true,
      "PlaceItem--isSingleView": isSingleView,
      "PlaceItem--isOverview": !isSingleView,
      "PlaceItem--expanded": detailsOpen
    });

    /**
     * Tease is the title and some sneak peek of the contents, like food types.
     */

    let contentBriefOut = (
      <>
        {content &&
          content.brief && (
            <div className="PlaceItem-textcontent PlaceItem-textcontent--brief">
              <div dangerouslySetInnerHTML={{ __html: content.brief }} />
              {!isSingleView && (
                <button href="/" className="PlaceItem-more">
                  {"+"}
                </button>
              )}
            </div>
          )}
      </>
    );

    let tease = (
      <div className="PlaceItem-head">
        <h1 className="PlaceItem-name">{name}</h1>
        {locationDistance && <p>{locationDistance} meters away</p>}

        <PlaceTypes foodTypes={foodTypes} />

        {contentBriefOut}
      </div>
    );

    let contentExtendedOut = (
      <>
        {content &&
          content.extended && (
            <div
              className="PlaceItem-textcontent PlaceItem-textcontent--extended"
              dangerouslySetInnerHTML={{ __html: content.extended }}
            />
          )}
      </>
    );

    if (isSingleView) {
      tease = <div className="PlaceItem-teaser">{tease}</div>;
    } else {
      tease = (
        <a
          className="PlaceItem-teaser"
          onClick={this.handleMoreClick}
          href={permalink}
        >
          {tease}
        </a>
      );
    }

    // let imagesMarkup = <PlaceImages {...this.state.place} />;
    //let imagesMarkupNew = <PlaceImagesNew {...this.state.place} />;
    let imagesMarkupStack = <PlaceImagesStacked {...this.state.place} />;

    return (
      <article key={slug} className={placeClassNames}>
        {isSingleView && (
          <Helmet>
            <title>{`${name}`} – Vegogo</title>
          </Helmet>
        )}

        {/* {imagesMarkup} */}

        {imagesMarkupStack}

        {/* {imagesMarkupNew} */}

        <div className="PlaceItem-content">
          {tease}

          {/* Details are shown on details page or when "More" link is clicked. */}
          <Content
            className="PlaceItem-details"
            pose={detailsOpen ? "open" : "closed"}
          >
            {contentExtendedOut}
            <PlaceDetails
              {...{
                location,
                phone,
                name,
                homepage,
                openingHours,
                openNow,
                phoneNumber,
                website,
                websitePresentation,
                isLoadingOpeningHours,
                isLoadingContactDetails,
                isContactDetailsOpened,
                isOpeningHoursOpened
              }}
              handleOpeningHoursClick={this.handleOpeningHoursClick}
              handleContactDetailsClick={this.handleContactDetailsClick}
            />
          </Content>
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
