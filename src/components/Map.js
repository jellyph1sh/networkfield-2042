import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import countries from "../data/countries.json";
import missions from "../data/missions.json";
import generateMission from "../utils/generateMission.js";

const Map = ({
  width = 1920,
  height = 1080,
  setMissionSelected,
  setShowMissionSelected,
  styleWindow,
  setPlayerData,
  playerData,
}) => {
  const [isZoom, defZoom] = useState(false);
  const [getScale, setScale] = useState(100);
  const [getZoom, setZoom] = useState([0, 0]);
  const [getZone, setZone] = useState(null);
  const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

  const selectGeography = (geography) => {
    let isIn = false;
    countries["continents"].map((continent) => {
      continent["names"].map((country) => {
        if (country == geography.properties.name) {
          isIn = true;
        }
      });
    });
    if (isIn) {
      return (
        <Geography
          key={geography.rsmKey}
          geography={geography}
          style={{
            default: { fill: "#5a5a5a" },
            hover: { fill: "#f92302" },
            pressed: { fill: "#8c1705" },
          }}
          onClick={() => {
            if (isZoom) {
              setScale(100);
              setZoom([0.0, 0.0]);
              defZoom(false);
              setZone(null);
            } else {
              countries["continents"].map((continent) => {
                continent["names"].map((country) => {
                  if (geography.properties.name === country) {
                    setScale(continent.scale);
                    setZoom(continent.coords);
                    defZoom(true);
                    setZone(continent.name);
                    return true;
                  }
                  return false;
                });
                return false;
              });
            }
          }}
        />
      );
    }
    return (
      <Geography
        key={geography.rsmKey}
        geography={geography}
        style={{
          default: { fill: "#5a5a5a" },
          hover: { fill: "#5a5a5a" },
          pressed: { fill: "#5a5a5a" },
        }}
      />
    );
  };

  const selectMarker = (marker) => {
    if (getZone === marker.zone) {
      if (marker.isAvailable) {
        return (
          <Marker
            key={marker.name}
            coordinates={marker.coordinates}
            onClick={() => {
              console.log("HACKING!");
              // while (document.getElementById("close-window-button") != null) {
              document.getElementById("close-window-button").click();
              setTimeout(() => {
                if (document.getElementById("close-window-button") != null) {
                  document.getElementById("close-window-button").click();
                }
              }, 100);
              // }
              generateMission(
                marker.name,
                setMissionSelected,
                setShowMissionSelected,
                styleWindow,
                setPlayerData,
                playerData
              );
            }}
          >
            <circle r={5} fill="#FFF" stroke="#fff" strokeWidth={2} />
            <text
              textAnchor="middle"
              y={marker.markerOffset}
              style={{ fontFamily: "system-ui", fill: "#FFF" }}
            >
              {marker.name}
            </text>
          </Marker>
        );
      } else {
        return (
          <Marker key={marker.name} coordinates={marker.coordinates}>
            <circle r={5} fill="#FFF" stroke="#fff" strokeWidth={2} />
            <text
              textAnchor="middle"
              y={marker.markerOffset}
              style={{ fontFamily: "system-ui", fill: "#FFF" }}
            >
              {marker.name}
            </text>
          </Marker>
        );
      }
    }
  };

  return (
    <ComposableMap
      projection={"geoEqualEarth"}
      projectionConfig={{
        scale: getScale,
        center: getZoom,
      }}
      width={width}
      height={height}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) => geographies.map((geo) => selectGeography(geo))}
      </Geographies>
      {Object.keys(missions["missions"]).map((mission) =>
        selectMarker(missions["missions"][mission])
      )}
    </ComposableMap>
  );
};

export default Map;
