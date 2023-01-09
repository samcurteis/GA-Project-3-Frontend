import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Graticule,
  Marker,
} from "react-simple-maps";
// import { geoReferences } from "../mapping/geoData.js";
// import { geoCentroid } from "d3-geo";

import { continentsGeoURL } from "../mapping/continents.js";
import SearchCountry from "./common/SearchCountry";
import { API } from "../lib/api.js";
// import './styles/styles.scss';

//!copied from continents for xy centroids
const GEOKEYS = {
  Europe: ["europeGeoURL", [18.5, 51], 4.55, "Europe", [19.292002, 48.73989]],
  Africa: ["africaGeoURL", [18.5, 2], 2.5, "Africa", [18.5, 13]],
  Asia: ["asiaGeoURL", [90, 28], 2.2, "Asia", [90, 45]],
  North_America: [
    "northAmericaGeoURL",
    [-80, 40],
    2.5,
    "North America",
    [-100, 40],
  ],
  South_America: [
    "southAmericaGeoURL",
    [-60, -19],
    2.5,
    "South America",
    [-59, -8],
  ],
  Australia: ["oceaniaGeoURL", [148, -23], 3.75, "Oceania", [160, -30]],
  Oceania: ["oceaniaGeoURL", [50, -23], 3.75, "Oceania", [160, -30]],
  Antarctica: ["antarcticaGeoURL", [148, -23], 3.75, "Antarctica", [120, -105]],
};

const colors = {
  North_America: "#338699",
  South_America: "#C5D1EB",
  Europe: "#8FBE74",
  Africa: "#FF9470",
  Asia: "#D6FFFE",
  Australia: "#FFF399",
  Oceania: "#FFF399",
  Antarctica: "#d3b794",
};

export default function ExploreWorld() {
  const [antarcticaID, setAntarcticaID] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    API.GET(API.ENDPOINTS.allCountries)
      .then(({ data }) => {
        console.log(data[0]._id);
        setAntarcticaID(data[0]._id);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  const navigateToContinent = (geo) => {
    if (geo.properties.CONTINENT === "Antarctica") {
      navigate(`/countries/${antarcticaID}`);
    } else {
      navigate(`/explorecontinent/${geo.properties.CONTINENT}`);
    }
  };

  const [content, setContent] = useState("");
  // {/* <Tooltip followCursor={true}>{content}</Tooltip> */}

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "lightgrey",
        }}
      >
        <h3>Or choose a continent on the map, OR...</h3>
        <SearchCountry />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          width: "100%",
          height: "100vh",
          backgroundColor: "#80CED8",
        }}
      >
        <ComposableMap data-tip="" width={1000} height={500}>
          <ZoomableGroup zoom={1}>
            <Graticule stroke="grey" />
            <Geographies geography={continentsGeoURL}>
              {({ geographies }) => (
                <>
                  {geographies.map((geo) => (
                    <Geography
                      geography={geo}
                      // fill={colors[geo.properties.CONTINENT]}
                      fill={"#719523"}
                      stroke={"#22847F"}
                      style={{
                        default: { outline: "black" },
                        hover: { outline: "none", fill: "#626868" },
                        pressed: { outline: "none" },
                      }}
                      key={geo.rsmKey}
                      onClick={() => navigateToContinent(geo)}
                      onMouseEnter={() => {
                        const { CONTINENT } = geo.properties;
                        setContent(`${CONTINENT}`);
                      }}
                      onMouseLeave={() => {
                        setContent("");
                      }}
                    />
                  ))}
                  {geographies.map((geo) => {
                    const centroid = GEOKEYS[geo.properties.CONTINENT][4];
                    return (
                      <>
                        <g key={geo.rsmKey + "-name"}></g>;
                        <Marker coordinates={centroid}>
                          <text y="2" fontSize={14} textAnchor="middle">
                            {content === geo.properties.CONTINENT
                              ? GEOKEYS[content][3]
                              : ""}
                          </text>
                        </Marker>
                      </>
                    );
                  })}
                </>
              )}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </>
  );
}
