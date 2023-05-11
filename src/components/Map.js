import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import countries from "../data/countries.json";
import generateMission from "../utils/generateMission.js";

const Map = ({
  width = 1920,
  height = 1080,
  setMissionSelected,
  setShowMissionSelected,
  styleWindow,
  setPlayerData,
  playerData,
  setGameFinished,
}) => {
  const [isZoom, defZoom] = useState(false);
  const [getScale, setScale] = useState(100);
  const [getZoom, setZoom] = useState([0, 0]);
  const [getZone, setZone] = useState(null);
  const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

  const missions = JSON.parse(localStorage.getItem("data"));
  const selectGeography = (geography) => {
    let isIn = false;
    const storage = JSON.parse(localStorage.getItem("countries"));
    storage["continents"].map((continent) => {
      if (!continent.isAvailable) {
        return;
      }
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
            default: { fill: "#8c1705" },
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
        let color = "#FFF"
        let strd = 1
        let r = 4
        if (marker.isPrimary) {
          strd = 2
          r = 6
          color = "#f20e02"
        }
        return (
          <Marker
            key={marker.name}
            coordinates={marker.coordinates}
            onClick={() => {
              document.getElementById("close-window-button").click();
              setTimeout(() => {
                if (document.getElementById("close-window-button") != null) {
                  document.getElementById("close-window-button").click();
                }
              }, 100);
              setTimeout(() => {
                if (document.getElementById("close-window-button") != null) {
                  document.getElementById("close-window-button").click();
                }
              }, 100);
              generateMission(
                marker.name,
                setMissionSelected,
                setShowMissionSelected,
                styleWindow,
                setPlayerData,
                playerData,
                setGameFinished
              );
            }}
          >
            <circle r={r} fill="#FFF" stroke={color} strokeWidth={strd} />
            <text
              textAnchor="middle"
              y={marker.offset}
              style={{ fontFamily: "system-ui", fill: "#FFF" }}
            >
              {marker.name}
            </text>
          </Marker>
        );
      } else {
        let color = "#FFF"
        let strd = 1
        let r = 4
        if (marker.isPrimary) {
          strd = 2
          r = 6
          color = "#2b2b2b"
        }
        return (
          <Marker key={marker.name} coordinates={marker.coordinates}>
            <circle r={r} fill="#FFF" stroke={color} strokeWidth={strd} />
            <text
              textAnchor="middle"
              y={marker.offset}
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
