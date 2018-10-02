import React, { Component } from "react";
// import Place from "../components/Place";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import NewsletterSignup from "../components/NewsletterSignup";
import AreaIntro from "../components/AreaIntro";
import PlacesListing from "../components/PlacesListing";
import { API_URL } from "../api-config";

class CityPage extends Component {
  constructor(props) {
    super(props);

    /*
    city: "stockholm"
    cityArea1: "sodermalm"
    cityArea2: "sofo"
     */
    console.log("citypage props", props);
    // console.log('city params', props.city.match.params);
    const { params } = props.match;

    this.slug = params.cityArea2 || params.cityArea1 || params.city;

    this.state = {
      places: []
    };
  }

  componentDidMount() {
    this.getPlaces();
  }

  /**
   * Get places for this city/area
   */
  getPlaces() {
    const slug = this.slug;

    if (!slug) {
      return;
    }

    let apiUrl = `${API_URL}/place/list/area/${slug}`;
    fetch(apiUrl)
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({ places: data.places });
      });
  }

  render() {
    console.log("CityPage render");
    window.scrollTo(0, 0);
    const { places } = this.state;

    let { params } = this.props.match;

    // Use slug from last part of url params.
    let slug = params.cityArea2 || params.cityArea1 || params.city;

    return (
      <div>
        <SiteHeader />

        <AreaIntro slug={slug} />

        <PlacesListing places={places} />

        <NewsletterSignup />

        <SiteFooter />
      </div>
    );
  }
}

export default CityPage;
