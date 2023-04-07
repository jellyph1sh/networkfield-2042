import React, { useRef, useState } from "react";

const Window = ({ width, height, windowName, left, top, setShowWindow }) => {
  const styleWindow = useRef({
    index: {
      left: `${left}`,
      top: `${top}`,
      width: `${width}`,
      height: `${height}`,
    },
    pressHeader: {
      height: `8rem`,
      width: `120%`,
    },
    defaultHeader: {
      height: `5rem`,
      width: `100%`,
    },
  });
  const styleHeader = useRef({ style: styleWindow.defaultHeader });
  let moveInX, moveInY;
  console.log(styleHeader.current.style);
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
        onMouseDown={dragging}
        onMouseUp={freeze}
        style={styleWindow.current.styleHeader}
      >
        <button
          onClick={() => {
            setShowWindow(false);
          }}
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default Window;
