import React from "react";

const Window = ({ width, height, name, left, top }) => {
  const styleWindow = useRef({
    index: {
      left: `${left}`,
      top: `${top}`,
      widht: `${width}`,
      height: `${height}`,
    },
  });
  let moveInX, moveInY;

  const move = (event) => {
    const element = document.getElementById(levelName);
    element.style.left = `${event.pageX - moveInX}px`;
    element.style.top = `${event.pageY - moveInY}px`;
    styleWindow.current.index = {
      left: element.style.left,
      top: element.style.top,
      widht: width,
      height: height,
    };
  };

  const dragging = (event) => {
    const element = event.target;
    moveInX = event.clientX - element.getBoundingClientRect().left;
    moveInY = event.clientY - element.getBoundingClientRect().top;
    element.addEventListener("mousemove", move);
  };

  const freeze = (event) => {
    const element = event.target;
    element.removeEventListener("mousemove", move);
  };

  return (
    <div style={styleWindow} id={name} className="window">
      <div className="header-window" onMouseDown={dragging} onMouseUp={freeze}>
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
