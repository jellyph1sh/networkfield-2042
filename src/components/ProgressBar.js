import React from "react";

const ProgressBar = ({ currentLevel, maxLevel }) => {
  const styleProgressBar = {
    gridColumn: `1`,
    height: `10px`,
    width: `80%`,
    display: `grid`,
    backgroundColor: `rgb(20,20,20)`,
    gridTemplateColumns: `${(currentLevel / maxLevel) * 100}% ${
      (1 - currentLevel / maxLevel) * 100
    }%`,
    border: `solid 2px black`,
    alignSelf: `center`,
  };
  const styleLevel = {
    height: `100%`,
    width: `100%`,
    gridColumn: 1,
    backgroundColor: `green`,
  };
  return (
    <div id="data-stat-container">
      <div style={styleProgressBar}>
        <span style={styleLevel}></span>
      </div>
      <p id="data-stat-level">
        {currentLevel}/{maxLevel}
      </p>
    </div>
  );
};

export default ProgressBar;
