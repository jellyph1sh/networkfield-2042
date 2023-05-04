import React, { useRef, useState } from "react";
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
  const styleHeader = useRef({ style: styleWindow.defaultHeader });
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
    styleHeader.current.style = styleWindow.current.pressHeader;
    const element = event.target;
    moveInX = event.clientX - element.getBoundingClientRect().left;
    moveInY = event.clientY - element.getBoundingClientRect().top;
    element.addEventListener("mousemove", move);
  };

  const freeze = (event) => {
    styleHeader.current.style = styleWindow.current.defaultHeader;
    const element = event.target;
    element.removeEventListener("mousemove", move);
  };

  return (
    <div style={styleWindow.current.index} id={windowName} className="window">
      <div
        className="header-window"
        onPointerDown={dragging}
        onPointerUp={freeze}
        style={styleWindow.current.styleHeader}
      >
        <h3>{windowName}</h3>
        {canCloseWindow ? (
          <button
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
