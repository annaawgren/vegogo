/**
 * Approach from
 * https://daveceddia.com/multiple-environments-with-react/
 */
const hostname = window && window.location && window.location.hostname;
let apiUrl;

if (hostname === "localhost") {
  apiUrl = "http://localhost:3131/keystone/api";
} else if (hostname === "beta.vegogo.se") {
  apiUrl = "http://beta.vegogo.se:3131/keystone/api";
}

export const API_URL = apiUrl;
