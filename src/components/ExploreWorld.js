<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
=======
import React, { useEffect, useState } from 'react';
// import { Tooltip } from "react-tooltip";
import { useNavigate } from 'react-router-dom';
>>>>>>> development
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Graticule,
  Marker
} from 'react-simple-maps';

import { geoCentroid } from 'd3-geo';

import { continentsGeoURL } from '../mapping/continents.js';
import SearchCountry from './common/SearchCountry';
// import './styles/styles.scss';

//TODO tool tip by mouse
//TODO label countries

//!copied from continents for xy centroids
const GEOKEYS = {
  Europe: ['europeGeoURL', [18.5, 51], 4.55, 'Europe'],
  Africa: ['africaGeoURL', [18.5, 2], 2.5, 'Africa'],
  Asia: ['asiaGeoURL', [90, 28], 2.2, 'Asia'],
  North_America: ['northAmericaGeoURL', [-80, 40], 2.5, 'North America'],
  South_America: ['southAmericaGeoURL', [-60, -19], 2.5, 'South America'],
  Australia: ['oceaniaGeoURL', [148, -23], 3.75, 'Oceania'],
  Oceania: ['oceaniaGeoURL', [148, -23], 3.75, 'Oceania'],
  Antarctica: ['antarcticaGeoURL', [148, -23], 3.75, 'Antarctica']
};

const colors = {
  North_America: '#338699',
  South_America: '#C5D1EB',
  Europe: '#8FBE74',
  Africa: '#FF9470',
  Asia: '#D6FFFE',
  Australia: '#FFF399',
  Oceania: '#FFF399',
  Antarctica: '#d3b794'
};

// export default function ExploreWorld() {
export default function ExploreWorld() {
  const navigate = useNavigate();

  const navigateToContinent = (geo) => {
    if (geo.properties.CONTINENT === 'Antarctica') {
      navigate(`/`);
    } else {
      navigate(`/explorecontinent/${geo.properties.CONTINENT}`);
    }
  };

  const [content, setContent] = useState('');

  return (
    <>
      {/* <h3>Where would you like to go?</h3> */}
      {/* <Tooltip followCursor={true}>{content}</Tooltip> */}
      <SearchCountry />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          width: '100%',
          height: '100vh'
        }}
      >
        <ComposableMap data-tip='' width={1000} height={500}>
          <ZoomableGroup zoom={1}>
            <Graticule stroke='#DAD6D2' />
            <Geographies geography={continentsGeoURL}>
              {({ geographies }) => (
                <>
                  {geographies.map((geo) => (
                    <Geography
                      geography={geo}
                      // fill="#EAEAEC"
                      fill={colors[geo.properties.CONTINENT]}
                      // stroke="grey"
                      style={{
                        default: { outline: 'none' },
                        hover: { outline: 'none', fill: '#626868' },
                        pressed: { outline: 'none' }
                      }}
                      key={geo.rsmKey}
                      onClick={() => navigateToContinent(geo)}
                      onMouseEnter={() => {
                        const { CONTINENT } = geo.properties;
                        setContent(`${CONTINENT}`);
                      }}
                      onMouseLeave={() => {
                        setContent('');
                      }}
                    />
                  ))}
                  {geographies.map((geo) => {
                    const centroid =
                      geo.properties.CONTINENT === "Europe"
                        ? [19.292002, 48.73989]
                        : geoCentroid(geo);
                    return (
                      <>
                        <g key={geo.rsmKey + '-name'}></g>;
                        <Marker coordinates={centroid}>
                          <text y="2" fontSize={14} textAnchor="middle">
                            {content === geo.properties.CONTINENT
                              ? GEOKEYS[content][3]
                              : ''}
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
