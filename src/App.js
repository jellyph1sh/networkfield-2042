import React, { useState, useEffect, useRef } from "react";

//import compenents
import Mission from "./components/Mission";
import WindowManager from "./components/WindowManager.js";
import Shop from "./components/Shop.js";
import TaskBarre from "./components/TaskBarre.js";
import Window from "./components/Window.js";
import Generic from "./components/Generic.js";

//import styles
import "./styles/components/window.css";
import "./styles/pages/mainPage.css";
import "./styles/components/Shop.css";
import "./styles/components/taskBarre.css";
import "./styles/components/mission.css";
import "./styles/pages/genericPage.css";

//import data
import { playerData } from "./datas/playerObject.js";

const playerTest = playerData;
playerTest.name = "playerTest";
playerTest.money = 0.0;

const App = () => {
  const moneyStage = useRef({ stage: 1 });
  const [playerData, setPlayerData] = useState(playerTest);
  const [showHackingWindow, setShowHackingWindow] = useState(false);
  const styleWindowHack = useRef({
    index: {
      left: `${"400px"}`,
      top: `${"100px"}`,
      width: `${"400px"}`,
      height: `${"500px"}`,
    },
  });
  const [lorePassed, setLorePassed] = useState(false);

  let hackPlayerMission = (
    <Window
      width={styleWindowHack.current.index.width}
      height={styleWindowHack.current.index.height}
      windowName={"you are being hacked !!"}
      setShowWindow={setShowHackingWindow}
      styleWindow={styleWindowHack}
      children={
        <Mission
          malus={true}
          isTimer={true}
          difficulty={playerData.currentLevel}
          setShowWindow={setShowHackingWindow}
          winMessage="Congrats you block the attack"
          looseMessage={"The hacker still you some money"}
          setPlayerData={setPlayerData}
          playerData={playerData}
        ></Mission>
      }
      canCloseWindow={false}
    ></Window>
  );

  useEffect(() => {
    if (playerData.money >= moneyStage.current.stage) {
      moneyStage.current.stage = moneyStage.current.stage * 10;
      console.log(moneyStage);
      hackPlayerMission = (
        <Window
          width={styleWindowHack.current.index.width}
          height={styleWindowHack.current.index.height}
          windowName={"you are being hacked !!"}
          setShowWindow={setShowHackingWindow}
          styleWindow={styleWindowHack}
          children={
            <Mission
              malus={true}
              isTimer={true}
              difficulty={playerData.currentLevel}
              setShowWindow={setShowHackingWindow}
              winMessage="Congrats you block the attack"
              looseMessage={"The hacker still you some money ฿"}
              setPlayerData={setPlayerData}
              playerData={playerData}
            ></Mission>
          }
          canCloseWindow={false}
        ></Window>
      );
      setShowHackingWindow(true);
    }
  }, [playerData]);

  if (!lorePassed) {
    return (
      <div
        id="generic-container"
        onContextMenu={(event) => event.preventDefault()}
      >
        <Generic />
        <button
          id="button-skip-lore"
          onClick={() => {
            setLorePassed(true);
          }}
        >
          Play
        </button>
      </div>
    );
  }

  return (
    <div id="main-container" onContextMenu={(event) => event.preventDefault()}>
      <div id="background-container"></div>
      {showHackingWindow ? hackPlayerMission : null}
      {/* <button
        onClick={() => {
          console.log(playerData.money);
          setPlayerData((playerData) => ({
            ...playerData,
            ...{ money: playerData.money + 1.0 },
          }));
        }}
      ></button> */}
      <TaskBarre>
        <WindowManager
          width={`700px`}
          height={`500px`}
          windowName={"Shop"}
          top={"200px"}
          left={"400px"}
          urlIcon={"https://cdn-icons-png.flaticon.com/512/894/894117.png"}
          children={
            <Shop playerData={playerData} setPlayerData={setPlayerData}></Shop>
          }
        ></WindowManager>
        <WindowManager
          width={`700px`}
          height={`500px`}
          windowName={"Map"}
          top={"200px"}
          left={"400px"}
          urlIcon={"https://img.icons8.com/fluency/256/internet.png"}
        ></WindowManager>
      </TaskBarre>
    </div>
  );
};

export default App;
