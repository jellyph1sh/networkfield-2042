const unlockPrimaryMission = (playerData) => {
  const missions = JSON.parse(localStorage.getItem("data"));
  const result = { missions: {} };
  Object.keys(missions["missions"]).forEach((key) => {
    if (
      !missions.missions[key].isAvailable &&
      missions.missions[key].isPrimary == true &&
      checkIfMissionIsPlayable(missions.missions[key], playerData)
    ) {
      missions.missions[key].isAvailable = true;
    }
    result.missions[key] = missions.missions[key];
  });
  console.log(result);
  localStorage.setItem("data", JSON.stringify(result));
};

export default unlockPrimaryMission;

const checkIfMissionIsPlayable = (mission, playerData) => {
  for (const [key, val] of Object.entries(playerData.computer)) {
    if (val.currentLevel < mission.requiredStats[key]) {
      return false;
    }
  }
  return true;
};
