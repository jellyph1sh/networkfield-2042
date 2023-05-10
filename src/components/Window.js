import React, { useRef, useState, useEffect } from "react";
import playSoundEffect from "../utils/playSoundEffect.js";
import soundCloseWindow from "../sound/mouse-click2.mp3";

const Window = ({
  width,
  height,
  windowName,
  setShowWindow,
  children,
  styleWindow,
  canCloseWindow = true,
}) => {
  let moveInX, moveInY;
  const move = (event) => {
    const element = document.getElementById(windowName);
    element.style.left = `${event.pageX - moveInX}px`;
    element.style.top = `${event.pageY - moveInY}px`;
    styleWindow.current.index = {
      left: element.style.left,
      top: element.style.top,
      width: width,
      height: height,
    };
  };

  const dragging = (event) => {
    const element = event.target;
    moveInX = event.clientX - element.getBoundingClientRect().left;
    moveInY = event.clientY - element.getBoundingClientRect().top;
    document
      .getElementById("main-container")
      .addEventListener("mousemove", move);
  };

  const freeze = (event) => {
    document
      .getElementById("main-container")
      .removeEventListener("mousemove", move);
  };

  return (
    <div
      style={styleWindow.current.index}
      id={windowName}
      className="window"
    >
      <div
        className="header-window"
        onPointerDown={dragging}
        onPointerUp={freeze}
      >
        <h3>{windowName}</h3>
        {canCloseWindow ? (
          <button
            id="close-window-button"
            onClick={() => {
              playSoundEffect(soundCloseWindow);
              setShowWindow(false);
            }}
          >
            ❌
          </button>
        ) : null}
      </div>
      <div id="child-container">{children}</div>
    </div>
  );
};

export default Window;
