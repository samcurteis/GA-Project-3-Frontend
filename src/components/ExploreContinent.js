<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API } from "../lib/api.js";

=======
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { API } from '../lib/api.js';

import { Tooltip } from 'react-tooltip';
>>>>>>> development
import {
  ComposableMap,
  Geographies,
  Geography,
<<<<<<< HEAD
  ZoomableGroup,
} from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { geoReferences } from "../mapping/geoData.js";

const countryValues = {
  France: 5,
  Scotland: 3,
  Spain: 30,
  Portugal: 1,
  Germany: 7,
=======
  ZoomableGroup
} from 'react-simple-maps';

import { europeGeoURL } from '../mapping/countries/europe.js';
import { africaGeoURL } from '../mapping/countries/africa.js';
import { asiaGeoURL } from '../mapping/countries/asia.js';
import { northAmericaGeoURL } from '../mapping/countries/northAmerica.js';
import { oceaniaGeoURL } from '../mapping/countries/oceania.js';
import { southAmericaGeoURL } from '../mapping/countries/southAmerica.js';

const GEOKEYS = {
  Europe: [europeGeoURL, [18.5, 51], 4.55, 'Europe'],
  Africa: [africaGeoURL, [18.5, 2], 2.5, 'Africa'],
  Asia: [asiaGeoURL, [90, 28], 2.2, 'Asia'],
  North_America: [northAmericaGeoURL, [-80, 40], 2.5, 'North America'],
  South_America: [southAmericaGeoURL, [-60, -19], 2.5, 'South America'],
  Australia: [oceaniaGeoURL, [148, -23], 3.75, 'Oceania'],
  Oceania: [oceaniaGeoURL, [148, -23], 3.75, 'Oceania']
>>>>>>> development
};

export default function ExploreContinent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const continent = geoReferences.GEOKEYSV2[id].TITLE;
  const geoUnits = geoReferences.GEOKEYSV2[id].OBJECTS.map(
    (country) => country.properties.geounit
  );
  const [countries, setCountries] = useState();

  const colorScale = scaleQuantile()
    .domain(Object.keys(countryValues).map((d) => countryValues[d]))
    .range(geoReferences.COLORRANGE);

<<<<<<< HEAD
=======
  // console.log(countries);
>>>>>>> development
  const navigateToCountry = (geo) => {
    for (var i = 0; i < countries.length; i++) {
      if (geo.properties.geounit === countries[i].name) {
        navigate(`/countries/${countries[i]._id}`);
      }
    }
  };

  function handleMouseEnter(event) {
    // setMousePos({ x: event.clientX, y: event.clientY });
    console.log(event);
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
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, [geoUnits]);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h2>{continent}</h2>
      <div
        style={{
<<<<<<< HEAD
          width: "75%",
          height: "65%",
=======
          width: '75%',
          height: '65%'
          // borderStyle: "double",
>>>>>>> development
        }}
      >
        <ComposableMap data-tip='' width={1000} height={650}>
          <ZoomableGroup
            zoom={geoReferences.GEOKEYSV2[id].ZOOMLEV}
            center={geoReferences.GEOKEYSV2[id].XYC}
            maxZoom={40}
          >
            <Geographies geography={geoReferences.GEOKEYSV2[id].URL}>
              {({ geographies }) =>
<<<<<<< HEAD
                geographies.map((geo) => {
                  return (
                    <>
                      <Geography
                        geography={geo}
                        fill={
                          Object.keys(countryValues).includes(
                            geo.properties.geounit
                          )
                            ? colorScale(countryValues[geo.properties.geounit])
                            : "#799F56"
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
                })
=======
                geographies.map((geo) => (
                  <Geography
                    geography={geo}
                    fill='#799F56'
                    stroke='lightgrey'
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none', fill: '#EEE' },
                      pressed: { outline: 'none' }
                    }}
                    key={geo.rsmKey}
                    onClick={() => navigateToCountry(geo)}
                    onMouseEnter={() => {
                      const { CONTINENT } = geo.properties;
                      // console.log(geo);
                      // setContent(`${CONTINENT}`);
                    }}
                    onMouseLeave={() => {
                      // setContent("");
                    }}
                  />
                ))
>>>>>>> development
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
}
