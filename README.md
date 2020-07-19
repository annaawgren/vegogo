This is an old repo. New and current repo is 👉 https://github.com/vegogo-se/vegogo.se.

---

# Vegogo 🥕🥑🍔

The new guide ⚡️Curated and inspirational ⚡️The best vegan places to eat ⚡️Near you.

The guide will launch soon at [Vegogo.se](https://vegogo.se).

## Tekniker och allmän översikt

- Node version 10. Kör `nvm use` i mappen för att byta till rätt version. Gatsby verkar låsa sig vid build om t.ex. Node 12 används.
- Gatsby JS för att bygga.
- GraphQL för att hämta data.
- Platser som markdown-dokument i
  - `markdown-pages`,
  - `markdown-places`, samt
  - `markdown-areas`.
- Google Place ID används för att hitta adress, geolocation, öppettider för en plats. Använd denna sida för att hitta Place ID för en plats:
  https://developers.google.com/places/place-id.
- [Tailwind CSS](https://tailwindcss.com/docs/) for CSS utilities.
- [styled-jsx](https://github.com/zeit/styled-jsx) for CSS.

## URL-struktur

### Place

A place is a restaurant or a café.
URL:s are created using the following pattern:

`/<country>/<city>/<location>`

Examples:

- `/sweden/stockholm/mahalo`
- `/sweden/stockholm/omnipollos-hatt`

### Areas

An area is an area in a city.
URL:s are created using the following pattern:

`/<country>/<city>/<area>`

Examples:

- `/sweden/stockholm/södermalm`
- `/sweden/stockholm/sofo`

## Todo

- Pågår: Gör sidhuvud i tailwind
  - animerad burger
  - kunna scrolla meny på mindre skärmar
- place: snyggare öppettider
- gör "nära mig"-sidan
  - alla platser som json, lat+lng+slug+title+ev nåt mer i en fil, alla i en annan? eller allt i en, inte så mkt data vi har hur som helst.
- lägg in google places api-nyckel som secret i zeit now.
- Lägg in exempelsida /exempel för komponenter + hur man använder TailWind CSS och styled-jsx.
- Skapa sidor för areas och mattyper.
- Skapa sidor https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/
- Få in platser och areas.
- Använda https://www.gatsbyjs.org/packages/gatsby-plugin-json-output/?=json för att få ut JSON med alla platser, typ api som vi kan använda för geolocation-saker
- Använda https://github.com/Creatiwity/gatsby-plugin-favicon för favicon?
- https://www.gatsbyjs.org/docs/adding-search-with-js-search/
