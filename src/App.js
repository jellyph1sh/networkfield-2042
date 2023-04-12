//import react func
import React from "react";

//import compenents
import WindowManager from "./components/WindowManager.js";
import Shop from "./components/Shop.js";

//import styles
import "./styles/components/window.css";
import "./styles/pages/mainPage.css";
import "./styles/components/Shop.css";

//import data
import { playerData } from "./datas/playerObject.js";

const playerTest = playerData;
playerTest.name = "playerTest";
playerTest.money = 9999

const App = () => {
  return (
    <div>
      <h1>Hello Networkfield 2042!</h1>
      <WindowManager
        width={`700px`}
        height={`500px`}
        windowName={"window test"}
        top={"200px"}
        left={"400px"}
        urlIcon={"./shop-icon.png"}
      >
        <Shop playerData={playerTest}></Shop>
      </WindowManager>
    </div>
  );
};

export default App;
