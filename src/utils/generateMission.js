import React from "react";
import Window from "../components/Window.js";
import Mission from "../components/Mission.js";

const generateMission = (
  missionName,
  setMissionSelected,
  setShowMissionSelected,
  styleWindow,
  setPlayerData,
  playerData,
  setGameFinished
) => {
  const data = JSON.parse(localStorage.getItem("data"));
  const dataMission = data["missions"][missionName];
  setMissionSelected(
    <Window
      width={"400px"}
      height={"500px"}
      windowName={missionName}
      styleWindow={styleWindow}
      setShowWindow={setShowMissionSelected}
      canCloseWindow={false}
      children={
        <Mission
          malus={dataMission["malus"]}
          difficulty={dataMission["difficulty"]}
          nbWords={dataMission["nbWords"]}
          isTimer={dataMission["isTimer"]}
          timer={dataMission["timer"]}
          inputType={dataMission["inputType"]}
          winMessage={dataMission["winMessage"]}
          looseMessage={dataMission["looseMessage"]}
          playerData={playerData}
          setPlayerData={setPlayerData}
          setShowWindow={setShowMissionSelected}
          reward={dataMission["reward"]}
          nextStage={dataMission["nextStage"]}
          setGameFinished={setGameFinished}
        />
      }
    />
  );
  setShowMissionSelected(true);
};

export default generateMission;
