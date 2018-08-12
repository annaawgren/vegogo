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
    // console.log('city params', props.city.match.params);
    const { params } = props.city.match;

    let slug = params.cityArea2 || params.cityArea1 || params.city;

    this.state = {
      slug
    };
  }

  componentDidMount() {
    this.getPlaces();
  }

  /**
   * Get places for this city/area
   */
  getPlaces() {
    const { slug } = this.state;
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
    const { slug, places } = this.state;

    return (
      <div>
        <SiteHeader />

        <AreaIntro slug={slug} />

        <PlacesListing
          places={places}
          headline="Härliga ställen"
          teaser="En massa goa ställen är detta en listning på."
        />

        <NewsletterSignup />

        <SiteFooter />
      </div>
    );
  }
}

export default CityPage;
