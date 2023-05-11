import React, { useState, useEffect, useRef } from "react";

//import components
import Mission from "./components/Mission";
import WindowManager from "./components/WindowManager.js";
import Shop from "./components/Shop.js";
import TaskBarre from "./components/TaskBarre.js";
import Window from "./components/Window.js";
import Generic from "./components/Generic.js";
import Map from "./components/Map";
import End from "./components/End";
import InfoMainMission from "./components/InfoMainMission";

//import styles
import "./styles/components/window.css";
import "./styles/pages/mainPage.css";
import "./styles/components/Shop.css";
import "./styles/components/taskBarre.css";
import "./styles/components/mission.css";
import "./styles/pages/genericPage.css";
import "./styles/pages/endPage.css";
import "./styles/components/infosMainMission.css";

//import data
import { playerData } from "./data/playerObject.js";

//import utils
import createLocalStorage from "./utils/createLocalStorage.js";
import playSoundEffect from "./utils/playSoundEffect.js";
import showChargingBar from "./utils/showChargingBar.js";

//import sound
import chargingBarSound from "./sound/charging-bar-sound.mp3";

const playerTest = playerData;
playerTest.name = "playerTest";
playerTest.money = 0.9;

const App = () => {
  const moneyStage = useRef({ stage: 1 });
  const [playerData, setPlayerData] = useState(playerTest);
  const [missionSelected, setMissionSelected] = useState();
  const [showMissionSelected, setShowMissionSelected] = useState(false);
  const [showHackingWindow, setShowHackingWindow] = useState(false);
  const styleWindowHack = useRef({
    index: {
      left: `${"500px"}`,
      top: `${"100px"}`,
      width: `${"600px"}`,
      height: `${"500px"}`,
    },
  });
  const [lorePassed, setLorePassed] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

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
          winMessage="Congrats you blocked the attack"
          looseMessage={"The hacker stole you some money"}
          setPlayerData={setPlayerData}
          playerData={playerData}
        ></Mission>
      }
      canCloseWindow={false}
    ></Window>
  );

  const handlerOnKeyDown = (e) => {
    if (e.key == "Tab") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handlerOnKeyDown);
    return () => document.removeEventListener("keydown", handlerOnKeyDown);
  }, []);

  useEffect(() => {
    if (playerData.money >= moneyStage.current.stage) {
      moneyStage.current.stage = moneyStage.current.stage + 1;
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
              winMessage="Congrats you blocked the attack"
              looseMessage={"The hacker stole you some money ฿"}
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

  if (gameFinished) {
    return (
      <div id="main-end-container">
        <End />
      </div>
    );
  }

  if (!gameStart) {
    return (
      <div id="main-start-container">
        <h1>NetworkField 2042</h1>
        <button
          id="button-start-game"
          onClick={() => {
            playSoundEffect(chargingBarSound);
            showChargingBar();
            setTimeout(() => {
              setGameStart(true);
              createLocalStorage();
              document.getElementById("button-start-game").hidden = false;
              document.getElementById("total-bar-generic").hidden = true;
            }, 4000);
          }}
        >
          Start
        </button>
      </div>
    );
  }

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
      {/* <button onClick={() => setGameFinished(true)}></button> */}
      {showMissionSelected ? missionSelected : null}
      <TaskBarre>
        <WindowManager
          width={`350px`}
          height={`550px`}
          windowName={"Infos"}
          top={"100px"}
          left={"30px"}
          urlIcon={"https://cdn-icons-png.flaticon.com/128/9195/9195785.png"}
          children={<InfoMainMission />}
        ></WindowManager>
        <WindowManager
          width={`700px`}
          height={`500px`}
          windowName={"Shop"}
          top={"30px"}
          left={"30px"}
          urlIcon={"https://cdn-icons-png.flaticon.com/512/894/894117.png"}
          children={
            <Shop playerData={playerData} setPlayerData={setPlayerData}></Shop>
          }
        ></WindowManager>
        <WindowManager
          width={`1000px`}
          height={`600px`}
          windowName={"Map"}
          top={"100px"}
          left={"500px"}
          urlIcon={"https://img.icons8.com/fluency/256/internet.png"}
          children={
            <Map
              width={250}
              height={250}
              setMissionSelected={setMissionSelected}
              setShowMissionSelected={setShowMissionSelected}
              styleWindow={styleWindowHack}
              setPlayerData={setPlayerData}
              playerData={playerData}
              setGameFinished={setGameFinished}
            ></Map>
          }
        ></WindowManager>
      </TaskBarre>
    </div>
  );
};

export default App;
