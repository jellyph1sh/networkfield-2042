import React from "react";
import Window from "./components/Window.js";
import "./styles/components/window.css";

const App = () => {
  return (
    <div>
      <h1>Hello Networkfield 2042!</h1>
      <Window
        width={`700px`}
        height={`900px`}
        name={"window test"}
        top={"200px"}
        left={"400px"}
      ></Window>
    </div>
  );
};

export default App;
