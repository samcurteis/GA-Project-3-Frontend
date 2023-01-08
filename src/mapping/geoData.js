// import continentsGeoURL from "./continents.js";

import { europeGeoURL } from "./countries/europe.js";
import { africaGeoURL } from "./countries/africa.js";
import { asiaGeoURL } from "./countries/asia.js";
import { northAmericaGeoURL } from "./countries/northAmerica.js";
import { oceaniaGeoURL } from "./countries/oceania.js";
import { southAmericaGeoURL } from "./countries/southAmerica.js";

const GEOKEYSV2 = {
  Europe: {
    URL: europeGeoURL,
    XYC: [18.5, 51],
    ZOOMLEV: 4.55,
    TITLE: "Europe",
    OBJECTS: europeGeoURL.objects.continent_Europe_subunits.geometries,
    GEOUNITS: () => {
      this.Europe.OBJECTS.map((country) => country.properties.geounit);
    },
  },

  Africa: {
    URL: africaGeoURL,
    XYC: [18.5, 2],
    ZOOMLEV: 2.5,
    TITLE: "Africa",
    OBJECTS: africaGeoURL.objects.continent_Africa_subunits.geometries,
    GEOUNITS: () => {
      this.Africa.OBJECTS.map((country) => country.properties.geounit);
    },
  },
  Asia: {
    URL: asiaGeoURL,
    XYC: [90, 28],
    ZOOMLEV: 2.2,
    TITLE: "Asia",
    OBJECTS: asiaGeoURL.objects.continent_Asia_subunits.geometries,
    GEOUNITS: () => {
      this.Asia.OBJECTS.map((country) => country.properties.geounit);
    },
  },

  North_America: {
    URL: northAmericaGeoURL,
    XYC: [-80, 40],
    ZOOMLEV: 2.5,
    TITLE: "North America",
    OBJECTS:
      northAmericaGeoURL.objects.continent_North_America_subunits.geometries,
    GEOUNITS: () => {
      this.North_America.OBJECTS.map((country) => country.properties.geounit);
    },
  },

  South_America: {
    URL: southAmericaGeoURL,
    XYC: [-60, -19],
    ZOOMLEV: 2.5,
    TITLE: "South America",
    OBJECTS:
      southAmericaGeoURL.objects.continent_South_America_subunits.geometries,
    GEOUNITS: () => {
      this.South_America.OBJECTS.map((country) => country.properties.geounit);
    },
  },
  Australia: {
    URL: oceaniaGeoURL,
    XYC: [148, -23],
    ZOOMLEV: 3.75,
    TITLE: "Oceania",
    OBJECTS: oceaniaGeoURL.objects.continent_Oceania_subunits.geometries,
    GEOUNITS: () => {
      this.Australia.OBJECTS.map((country) => country.properties.geounit);
    },
  },
  Oceania: {
    URL: oceaniaGeoURL,
    XYC: [148, -23],
    ZOOMLEV: 3.75,
    TITLE: "Oceania",
    OBJECTS: oceaniaGeoURL.objects.continent_Oceania_subunits.geometries,
    GEOUNITS: () => {
      this.Oceania.OBJECTS.map((country) => country.properties.geounit);
    },
  },
};

const COLORRANGE = [
  "#F2F8F6",
  "#D8E9E3",
  "#BDDBD0",
  "#A2CDBD",
  "#88BFAB",
  "#6DB099",
  "#47856F",
  "#47856F",
  "#396A5A",
];

export const geoReferences = { GEOKEYSV2, COLORRANGE };
