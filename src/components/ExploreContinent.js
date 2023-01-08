import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API } from "../lib/api.js";

import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { geoReferences } from "../mapping/geoData.js";

export default function ExploreContinent() {
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

  function handleMouseEnter(event) {
    // setMousePos({ x: event.clientX, y: event.clientY });
    // console.log(event);
  }
  function handleMouseLeave() {
    // setContent("out");
  }

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

  const navigate = useNavigate();
  const { id } = useParams();
  const continent = geoReferences.GEOKEYSV2[id].TITLE;
  const geoUnits = geoReferences.GEOKEYSV2[id].OBJECTS.map(
    (country) => country.properties.geounit
  );

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
      <h2>{continent}</h2>
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
                      .range(["#ffedea", "#ff5233"]);

                    return (
                      <>
                        <Geography
                          geography={geo}
                          fill={
                            // "#799F56"
                            // colorScale(5)
                            colorScale(colourGrade[unit])
                          }
                          stroke="lightgrey"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: "none" },
                            hover: { outline: "none", fill: "lightblue" },
                            pressed: { outline: "red" },
                          }}
                          key={geo.rsmKey}
                          onClick={() => navigateToCountry(geo)}
                          // onClick={(e) => {
                          //   console.log(e.screenX);
                          //   console.log(e.screenY);
                          // }}
                          onMouseEnter={handleMouseEnter}
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
  );
}
