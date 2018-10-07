/**
 * Misc helper functions.
 */

/**
 * Return formatted homepage.
 * @return object
 */
export function cleanupHomepage(homepage) {
  let homepagePresentation = null;
  let homepageWithProtocol = null;

  if (!homepage) {
    return {
      homepagePresentation,
      homepageWithProtocol
    };
  }
  // Remove any http or https. And some other cleaning to make URL presentable.
  homepagePresentation = homepage.replace(/^https?:\/\//i, "");
  homepagePresentation = homepagePresentation.replace(/^www\./i, "");
  homepagePresentation = homepagePresentation.replace(/\/$/i, "");

  // Add http if missing.
  homepageWithProtocol = homepage;
  if (!homepageWithProtocol.match(/^https?:\/\//i)) {
    homepageWithProtocol = `http://${homepageWithProtocol}`;
  }

  return {
    homepagePresentation,
    homepageWithProtocol
  };
}

export function getPlacePermalink(place) {
  return `/place/${place.slug}`;
}

export function getAreaPermalink(area) {
  console.log("getAreaPermalink for area", area);
  return `/area/${area.slug}`;
}

/**
 * Get opening hours, phone number, and website for a placeId from Google.
 *
 * @return Promise
 */
export function getPlaceDetailsFromGoogle(
  placeId = "ChIJwXlpyed3X0YRnArSXmAPX-U"
) {
  let dummyElm = document.createElement("div");
  var service = new window.google.maps.places.PlacesService(dummyElm);

  var request = {
    placeId: placeId,
    fields: [
      "opening_hours",
      "formatted_phone_number",
      "international_phone_number",
      "website"
    ]
  };

  return new Promise(resolve => {
    // https://developers.google.com/maps/documentation/javascript/places
    service.getDetails(request, res => {
      resolve(res);
    });
  });
}
