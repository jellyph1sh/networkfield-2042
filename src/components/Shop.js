import React, { useState } from "react";
import ProgressBar from "./ProgressBar.js";

const Shop = ({ playerData }) => {
  const [playerMoney, setPlayerMoney] = useState(playerData.money);
  const [classErrorMessage, setClassErrorMessage] = useState("hidden");

  const getPrice = (price, currentLevel) => {
    return Math.round(price * currentLevel * 1000) / 1000000;
  };
  const VerifBuy = (price, stat) => {
    if (playerMoney > price) {
      playerData.money = Math.round((playerData.money - price) * 1000) / 1000;
      stat.currentLevel++;
      setPlayerMoney(playerData.money);
    } else {
      setClassErrorMessage("showError");
      setTimeout(() => {
        setClassErrorMessage("hidden");
      }, 5000);
    }
  };

  return (
    <div id="upgrade-container">
      <div id="player-money-container">
        <span id="money">{playerMoney}฿</span>
      </div>
      <span className={classErrorMessage}>You cannot buy this</span>
      {Object.values(playerData.computer).map((stat, i) => {
        console.log(stat);
        const buttonForStat =
          stat.currentLevel == stat.maxLevel ? (
            <button disable style={{ backgroundColor: `grey`, color: `black` }}>
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
  );
};

export default Shop;
