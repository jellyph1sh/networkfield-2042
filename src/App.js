<<<<<<< HEAD
import React from 'react';
import Mission from './components/Mission';
=======
//import react func
import React from "react";

//import compenents
import Window from "./components/Window.js";
import WindowManager from "./components/WindowManager.js";

//import styles
import "./styles/components/window.css";
import "./styles/pages/mainPage.css";
>>>>>>> dev

const App = () => {
  return (
    <div>
<<<<<<< HEAD
      <Mission />
=======
      <h1>Hello Networkfield 2042!</h1>
      <WindowManager
        width={`700px`}
        height={`900px`}
        windowName={"window test"}
        top={"200px"}
        left={"400px"}
        urlIcon={"./shop-icon.png"}
      ></WindowManager>
>>>>>>> dev
    </div>
  );
};

export default App;
