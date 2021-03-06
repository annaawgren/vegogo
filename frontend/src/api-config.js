/**
 * Approach from
 * https://daveceddia.com/multiple-environments-with-react/
 */
const hostname = window && window.location && window.location.hostname;
let apiUrl;
let googleMapPublicApiKey;
let imagesUrl = "https://vegogo-files.s3-eu-west-1.amazonaws.com";

if (hostname === "localhost") {
  apiUrl = "http://localhost:3131/api";
  googleMapPublicApiKey = "AIzaSyCYCr0ilOmynS4WcS-OSOPTcdDWfDpSMw8";
} else if (hostname === "beta.vegogo.se") {
  apiUrl = "https://beta-admin.vegogo.se/api";
  googleMapPublicApiKey = "AIzaSyCYCr0ilOmynS4WcS-OSOPTcdDWfDpSMw8";
}

export const API_URL = apiUrl;
export const GOOGLE_MAPS_API_KEY = googleMapPublicApiKey;
export const IMAGES_URL = imagesUrl;
