import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

import { continentsGeoURL } from "../mapping/continents.js";

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

  const navigateToContinent = (geo) =>
    navigate(`/explorecontinent/${geo.properties.CONTINENT}`);
  //!testing with home
  // const navigateToContinent = () => navigate(`/`);

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
            <Geographies geography={continentsGeoURL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    geography={geo}
                    // fill="#EAEAEC"
                    fill={colors[geo.properties.CONTINENT]}
                    // stroke="grey"
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
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
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
}
