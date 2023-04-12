import React, { useRef, useState } from "react";
import Window from "./Window.js";

const WindowManager = ({
  width,
  height,
  windowName,
  left,
  top,
  urlIcon,
  children,
}) => {
  const [showWindow, setShowWindow] = useState(false);

  const ButtonWindow = (urlIcon) => {
    return (
      <div
        onClick={() => {
          setShowWindow(() => {
            if (showWindow) {
              return false;
            }
            return true;
          });
        }}
        className="buttonWindow"
      >
        <img src={urlIcon} />
      </div>
    );
  };

  const element = showWindow ? (
    <div>
      <Window
        width={width}
        height={height}
        windowName={windowName}
        top={top}
        left={left}
        setShowWindow={setShowWindow}
        children={children}
      ></Window>
      <ButtonWindow urlIcon={urlIcon} />
    </div>
  ) : (
    <div>
      <ButtonWindow urlIcon={urlIcon} />
    </div>
  );

  return <div>{element}</div>;
};

export default WindowManager;
