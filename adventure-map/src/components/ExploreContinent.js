import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Tooltip } from "react-tooltip";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

// import { continentsGeoURL } from "../mapping/continents.js";
import { europeGeoURL } from "../mapping/countries/europe.js";
import { africaGeoURL } from "../mapping/countries/africa.js";
import { asiaGeoURL } from "../mapping/countries/asia.js";
import { northAmericaGeoURL } from "../mapping/countries/northAmerica.js";
import { oceaniaGeoURL } from "../mapping/countries/oceania.js";
import { southAmericaGeoURL } from "../mapping/countries/southAmerica.js";
// TODO antarctica

const GEOKEY = {
  Europe: europeGeoURL,
  Africa: africaGeoURL,
  Asia: asiaGeoURL,
  North_America: northAmericaGeoURL,
  South_America: southAmericaGeoURL,
  Australia: oceaniaGeoURL,
  Oceania: oceaniaGeoURL,
};

//TODO tool tip by mouse
const colors = {
  North_America: "#3366ff",
  South_America: "#cb32ff",
  Europe: "#34ff67",
  Africa: "#ff6632",
  Asia: "#34fecc",
  Australia: "#ffce26",
  Oceania: "#ffce26",
  Antarctica: "#d3b794",
};
//TODO default border remove
//TODO take out styles and put in sass??

// export default function ExploreWorld() {
export default function Home() {
  const navigate = useNavigate();
  const navigateToCountry = (geo) =>
    navigate(`/explorecontinent/${geo.properties.CONTINENT}`);

  const { id } = useParams();
  // console.log(GEOKEY[id]);

  const [content, setContent] = useState("");
  // function handleClick(geo) {
  //   console.log(geo.properties);
  //   console.log(geo.properties.CONTINENT);
  // }
  // const
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Map</h1>
      <Tooltip followCursor={true}>{content}</Tooltip>
      <div
        style={{
          width: "75%",
          height: "65%",
          borderStyle: "double",
        }}
      >
        <ComposableMap data-tip="">
          <ZoomableGroup zoom={1}>
            <Geographies geography={GEOKEY[id]}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    geography={geo}
                    // fill="#EAEAEC"
                    // fill={colors[geo.properties.CONTINENT]}
                    // stroke="grey"
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                    key={geo.rsmKey}
                    onClick={() => navigateToCountry(geo)}
                    onMouseEnter={() => {
                      const { CONTINENT } = geo.properties;
                      setContent(`${CONTINENT}`);
                    }}
                    onMouseLeave={() => {
                      setContent("");
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
}
