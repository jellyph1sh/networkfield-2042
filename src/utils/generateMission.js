import React from "react";
import Window from "../components/Window.js";
import Mission from "../components/Mission.js";

const generateMission = (
  missionName,
  setMissionSelected,
  setShowMissionSelected,
  styleWindow,
  setPlayerData,
  playerData
) => {
  const data = JSON.parse(localStorage.getItem("data"));
  const dataMission = data["missions"][missionName];
  console.log("test gen mission");
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
        />
      }
    />
  );
  setShowMissionSelected(true);
};

export default generateMission;
