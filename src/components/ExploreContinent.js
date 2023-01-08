import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { API } from '../lib/api.js';

import { Tooltip } from 'react-tooltip';
import {
  ComposableMap,
  Geographies,
  Geography,
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
};

// export default function ExploreWorld() {
export default function Home() {
  const navigate = useNavigate();
  const { id } = useParams();
  const continent = GEOKEYS[id][3];

  const [countries, setCountries] = useState();

  useEffect(() => {
    API.GET(API.ENDPOINTS.allCountries)
      .then(({ data }) => {
        setCountries(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  // console.log(countries);
  const navigateToCountry = (geo) => {
    for (var i = 0; i < countries.length; i++) {
      if (geo.properties.geounit === countries[i].name) {
        navigate(`/countries/${countries[i]._id}`);
      }
    }
  };

  // const [content, setContent] = useState("");
  // function handleClick(geo) {
  //   console.log(geo.properties);
  //   console.log(geo.properties.CONTINENT);
  // }
  // const
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
          width: '75%',
          height: '65%'
          // borderStyle: "double",
        }}
      >
        <ComposableMap data-tip='' width={1000} height={650}>
          <ZoomableGroup
            zoom={GEOKEYS[id][2]}
            center={GEOKEYS[id][1]}
            maxZoom={40}
          >
            <Geographies geography={GEOKEYS[id][0]}>
              {({ geographies }) =>
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
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
}
