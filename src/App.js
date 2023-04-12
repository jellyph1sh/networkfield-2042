import React from "react";

//import compenents
import Mission from "./components/Mission";
import WindowManager from "./components/WindowManager.js";
import Shop from "./components/Shop.js";
import TaskBarre from "./components/TaskBarre.js";

//import styles
import "./styles/components/window.css";
import "./styles/pages/mainPage.css";
import "./styles/components/Shop.css";
import "./styles/components/taskBarre.css";

//import data
import { playerData } from "./datas/playerObject.js";

const playerTest = playerData;
playerTest.name = "playerTest";
playerTest.money = 9999;

const App = () => {
  return (
    <div id="main-container">
      {/* <Mission></Mission>
      <h1>Hello Networkfield 2042!</h1> */}
      <TaskBarre>
        <WindowManager
          width={`700px`}
          height={`500px`}
          windowName={"window test"}
          top={"200px"}
          left={"400px"}
          urlIcon={"https://cdn-icons-png.flaticon.com/512/2423/2423208.png"}
          children={<Shop playerData={playerTest}></Shop>}
        ></WindowManager>
        <WindowManager
          width={`700px`}
          height={`500px`}
          windowName={"window test"}
          top={"200px"}
          left={"400px"}
          urlIcon={"https://cdn-icons-png.flaticon.com/512/3019/3019021.png"}
        ></WindowManager>
      </TaskBarre>
    </div>
  );
};

export default App;
