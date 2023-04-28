import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import countries from "../data/countries.json";

const Map = ({width=1920, height=1080}) => {
  const [isZoom, defZoom] = useState(false);
  const [getScale, setScale] = useState(100);
  const [getZoom, setZoom] = useState([0, 0])

  const markers = [
    {
      markerOffset: -15,
      name: "Sau Paulo",
      coordinates: [-58.3816, -34.6037],
    },
  ]
  
  const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

  const selectGeography = (geography) => {
    let isIn = false;
    countries["continents"].map(continent => {
      continent["names"].map(country => {
        if (country == geography.properties.name) {
          isIn = true;
        }
      })
    })
    if (isIn) {
      return <Geography key={geography.rsmKey} geography={geography} style={{
        default: { fill: "#5a5a5a" },
        hover: { fill: "#f92302" },
        pressed: { fill: "#8c1705" },
      }} onClick = {() => {
        if (isZoom) {
          setScale(100)
          setZoom([0.0, 0.0])
          defZoom(false)
        } else {
          countries["continents"].map((continent) => {
            continent["names"].map((country) => {
              if (geography.properties.name === country) {
                setScale(continent.scale)
                setZoom(continent.coords)
                defZoom(true)
                return true
              }
              return false
            })
            return false
          })
        }
      }} />
    }
    return <Geography key={geography.rsmKey} geography={geography} style={{
      default: { fill: "#5a5a5a" },
      hover: { fill: "#5a5a5a" },
      pressed: { fill: "#5a5a5a" },
    }}/>
  }

  return (
    <ComposableMap projection={"geoEqualEarth"} projectionConfig={{
      scale: getScale,
      center: getZoom,
    }} width={width} height={height}>
      <Geographies geography={geoUrl}>
        {({geographies}) => 
          geographies.map((geo) => (
            selectGeography(geo)
          ))
        }
      </Geographies>
      {
        markers.map(({name, coordinates, markerOffset}) => (
          <Marker key={name} coordinates={coordinates} onClick = {() => {
            console.log("HACKING!")
          }}>
            <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2}/>
            <text textAnchor="middle" y={markerOffset} style={{ fontFamily: "system-ui", fill: "#5D5A6D"}}>{name}</text>
          </Marker>
        ))
      }
    </ComposableMap>);
};

export default Map;