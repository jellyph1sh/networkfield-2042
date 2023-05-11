import React, { useState } from "react";
import ProgressBar from "./ProgressBar.js";
import playSoundEffect from "../utils/playSoundEffect.js";
import buySoundEffect from "../sound/cash-register-fake-88639.mp3";
import maxLevelButtonSound from "../sound/button-inactive.mp3";
import unlockPrimaryMission from "../utils/unlockPrimaryMission";

const Shop = ({ playerData, setPlayerData }) => {
  const [playerMoney, setPlayerMoney] = useState(playerData.money);
  const [classErrorMessage, setClassErrorMessage] = useState("hidden");

  const getPrice = (price, currentLevel) => {
    return Math.round(price * currentLevel * 1000) / 100000;
  };
  const VerifBuy = (price, stat) => {
    console.log(typeof playerMoney);
    if (playerMoney * 100000 >= price * 100000) {
      playSoundEffect(buySoundEffect);
      setPlayerData((playerData) => ({
        ...playerData,
        ...{ money: Math.round((playerData.money - price) * 10000) / 10000 },
      }));
      stat.currentLevel++;
      if (playerData.money < 0) {
        setPlayerData((playerData) => ({
          ...playerData,
          ...{ money: 0.0 },
        }));
        setPlayerMoney(0);
      } else {
        setPlayerMoney(playerData.money);
      }
      unlockPrimaryMission(playerData);
    } else {
      setClassErrorMessage("showError");
      setTimeout(() => {
        setClassErrorMessage("hidden");
      }, 5000);
    }
  };

  return (
    <div id="main-upgrade-container">
      <div id="player-money-container">
        <span id="money">{playerMoney}฿</span>
      </div>
      <span className={classErrorMessage}>You cannot buy this</span>
      <div id="upgrade-container">
        {Object.values(playerData.computer).map((stat, i) => {
          const buttonForStat =
            stat.currentLevel == stat.maxLevel ? (
              <button
                onClick={() => {
                  playSoundEffect(maxLevelButtonSound);
                }}
                style={{ backgroundColor: `grey`, color: `rgb(0,102,0)` }}
              >
                maxLevel
              </button>
            ) : (
              <button
                onClick={() => {
                  VerifBuy(getPrice(stat.price, stat.currentLevel), stat);
                }}
                style={{ backgroundColor: `green`, color: `white` }}
              >
                {getPrice(stat.price, stat.currentLevel)}
              </button>
            );
          {
            return (
              <div className="one-upgrade" key={i}>
                <h3>{stat.name}</h3>
                <ProgressBar
                  currentLevel={stat.currentLevel}
                  maxLevel={stat.maxLevel}
                />
                {buttonForStat}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Shop;
