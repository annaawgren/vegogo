import React, { Component } from "react";
// import Place from "../components/Place";
import AreaIntro from "../components/AreaIntro";
import PlacesListing from "../components/PlacesListing";
import { API_URL } from "../api-config";
import PageContainer from "../pages/PageContainer";

class CityPage extends Component {
  constructor(props) {
    super(props);

    /*
    city: "stockholm"
    cityArea1: "sodermalm"
    cityArea2: "sofo"
    */
    this.state = {
      isLoading: false,
      places: []
    };
  }

  componentDidMount() {
    const slug = this.getSlugFromParams(this.props.match.params);
    this.getPlaces(slug);
  }

  getSlugFromParams(params) {
    const slug = params.cityArea2 || params.cityArea1 || params.city;
    return slug;
  }

  componentDidUpdate(prevProps) {
    const newSlug = this.getSlugFromParams(this.props.match.params);
    const prevSlug = this.getSlugFromParams(prevProps.match.params);

    if (newSlug !== prevSlug) {
      this.getPlaces(newSlug);
    }
  }

  /**
   * Get places for this city/area.
   *
   * @param string Slug of area to get, for example "stockholm", "sodermalm", "sofo".
   */
  getPlaces(citySlug) {
    if (!citySlug) {
      return;
    }

    this.setState({ isLoading: true });

    let apiUrl = `${API_URL}/place/list/area/${citySlug}`;

    fetch(apiUrl)
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({ places: data.places, isLoading: false });
      });
  }

  render() {
    window.scrollTo(0, 0);
    const { places, isLoading } = this.state;

    let { params } = this.props.match;

    // Use slug from last part of url params.
    let slug = params.cityArea2 || params.cityArea1 || params.city;

    return (
      <PageContainer>
        <AreaIntro slug={slug} />
        <PlacesListing places={places} isLoading={isLoading} />
      </PageContainer>
    );
  }
}

export default CityPage;
