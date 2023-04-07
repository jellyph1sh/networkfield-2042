import React, { useRef, useState } from "react";
import Window from "./Window.js";

const WindowManager = ({ width, height, name, left, top, urlIcon }) => {
  const [showWindow, setShowWindow] = useState(false);

  const ButtonWindow = (urlIcon) => {
    return (
      <div
        onClick={() => {
          setShowWindow(true);
        }}
        className="buttonWindow"
      >
        <img src={urlIcon} />
      </div>
    );
  };

  const element = showWindow ? (
    <Window
      width={`700px`}
      height={`900px`}
      name={"window test"}
      top={"200px"}
      left={"400px"}
    ></Window>
  ) : (
    <ButtonWindow urlIcon={urlIcon} />
  );

  return <div>{element}</div>;
};

export default WindowManager;
