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
 * Get opening hours for a placeId from Google.
 *
 * @return Promise
 */
export function getPlaceOpeningHours(placeId = "ChIJwXlpyed3X0YRnArSXmAPX-U") {
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
