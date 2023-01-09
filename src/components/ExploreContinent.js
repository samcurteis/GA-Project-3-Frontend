import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API } from "../lib/api.js";
import { Tooltip } from "react-tooltip";

import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { geoReferences } from "../mapping/geoData.js";

import "../styles/explorecontinent.css";

export default function ExploreContinent() {
  const colorVals = ["#D0E89B", "#4B6417"];
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [countries, setCountries] = useState();
  const [visitValues, setVisitValues] = useState();
  const [colourGrade, setColourGrade] = useState();
  const navigateToCountry = (geo) => {
    for (var i = 0; i < countries.length; i++) {
      if (geo.properties.geounit === countries[i].name) {
        navigate(`/countries/${countries[i]._id}`);
      }
    }
  };

  function handleMouseEnter(geo) {
    setContent(`${geo}`);
  }
  function handleMouseLeave() {
    setContent("");
  }

  const handleBack = () => navigate("/exploreworld");

  useEffect(() => {
    API.GET(API.ENDPOINTS.allCountries)
      .then(({ data }) => {
        const continentCountries = data.filter((country) =>
          geoUnits.includes(country.name)
        );
        setCountries(continentCountries);

        const vvals = continentCountries.map((row) => row.entries.length);
        setVisitValues([Math.min(...vvals), Math.max(...vvals)]);

        const mapped = continentCountries.map(({ name, entries }) => [
          name,
          entries.length,
        ]);

        const obj = {};
        mapped.forEach((element) => {
          obj[element[0]] = element[1];
        });
        setColourGrade(obj);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  const { id } = useParams();
  const continent = geoReferences.GEOKEYSV2[id].TITLE;
  const geoUnits = geoReferences.GEOKEYSV2[id].OBJECTS.map(
    (country) => country.properties.geounit
  );

  return (
    <>
      <div className="map-pane">
        <button onClick={handleBack}>{"<- Back 🌍"}</button>
        <div>
          <h3>{` ${continent}:`} </h3>
          <h3>
            <Tooltip class="tooltip">{content}</Tooltip>
          </h3>
        </div>
        <div className="visits-scale">
          <h4
            style={{
              backgroundColor: colorVals[0],
            }}
          >
            {"0"}
          </h4>
          <h3>{"Visits -->"}</h3>
          <h4 style={{ backgroundColor: colorVals[1], width: "55px" }}>
            {"MOST"}
          </h4>
        </div>
      </div>

      <div className="map-container">
        <div
          style={{
            width: "75%",
            height: "65%",
          }}
        >
          <ComposableMap data-tip="" width={1000} height={650}>
            <ZoomableGroup
              zoom={geoReferences.GEOKEYSV2[id].ZOOMLEV}
              center={geoReferences.GEOKEYSV2[id].XYC}
              maxZoom={40}
            >
              <Geographies geography={geoReferences.GEOKEYSV2[id].URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const unit = geo.properties.geounit;
                    console.log(unit);
                    if (colourGrade && visitValues) {
                      const colorScale = scaleLinear()
                        .domain(visitValues)
                        .range(colorVals);
                      return (
                        <>
                          <Geography
                            geography={geo}
                            fill={colorScale(colourGrade[unit])}
                            stroke="lightgrey"
                            strokeWidth={0.5}
                            style={{
                              default: { outline: "none" },
                              hover: { outline: "none", fill: "#FF9101" },
                              pressed: { outline: "red" },
                            }}
                            key={geo.rsmKey}
                            onClick={() => navigateToCountry(geo)}
                            onMouseEnter={() => {
                              handleMouseEnter(unit);
                            }}
                            onMouseLeave={handleMouseLeave}
                          />
                        </>
                      );
                    }
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>
    </>
  );
}
