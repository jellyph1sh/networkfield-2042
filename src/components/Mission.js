import React, { useRef, useState } from "react";
import { getWords } from "../data/wordsMission.js";
import ProgressBar from "./ProgressBar.js";

const Mission = ({
  difficulty = 1,
  nbWords = 10,
  isTimer = false,
  timer = 30,
  inputType = "text",
  setShowWindow,
  malus = false,
  setPlayerData,
  playerData,
  winMessage,
  looseMessage,
}) => {
  const words = useRef(getWords(difficulty, nbWords));
  const inputRef = useRef(null);
  const [getCounter, setCounter] = React.useState(timer);
  const index = useRef(0);
  const [getWord, setWord] = useState(words.current[index.current]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isFinish, setFinish] = useState(false);
  const allTry = useRef({ trials: [] });
  // console.log("test reload hack window");
  const inputWord = (
    <input
      ref={inputRef}
      type={inputType}
      name="enterWord"
      autoFocus
      autoComplete="off"
    ></input>
  );

  React.useEffect(() => {
    let timer;
    if (getCounter > 0) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    } else {
      if (malus) {
        console.log(
          Math.round((playerData.money - playerData.money * 0.25) * 100) / 100
        );
        malus = false;
        setPlayerData((playerData) => ({
          ...playerData,
          money:
            Math.round((playerData.money - playerData.money * 0.25) * 100) /
            100,
        }));
        console.log(playerData.money);
      }
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [getCounter]);

  const removeLastSpaces = (word) => {
    let result = word;
    while (result.length > 0) {
      if (result[result.length - 1] == " ") {
        result = result.slice(0, -1);
      } else {
        break;
      }
    }
    return result;
  };

  const checkIsWord = (userWord, correctWord) => {
    if (removeLastSpaces(userWord) === correctWord) {
      return true;
    }
    return false;
  };

  const checkWord = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    console.log(checkIsWord(e.target.enterWord.value, getWord));
    if (checkIsWord(e.target.enterWord.value, getWord)) {
      allTry.current.trials.push("$ " + e.target.enterWord.value);
      if (index.current === words.current.length - 1) {
        setFinish(true);
      }
      index.current = index.current + 1;
      setWord(words.current[index.current]);
    } else {
      allTry.current.trials.push("$ Error : Invalid command");
      setErrorMessage(<p id="error-message">Wrong command!</p>);
    }
    if (allTry.current.trials.length > 19) {
      allTry.current.trials = allTry.current.trials.splice(
        1,
        allTry.current.trials.length
      );
    }
    inputRef.current.value = "";
  };

  if (isFinish) {
    return (
      <div id="mission-container-finished">
        <h1> DONE!</h1>
        <h3 id="endMessage">{winMessage}</h3>
        <button
          onClick={() => {
            setShowWindow(false);
          }}
          autoFocus
        >
          close
        </button>
      </div>
    );
  }

  if (isTimer === true && getCounter === 0 && !isFinish) {
    return (
      <div id="mission-container-finished">
        <h1 className="loose-text">Time Over!</h1>
        <h2 className="loose-text">You lose!</h2>
        <h3 id="endMessage">{looseMessage}</h3>
        <button
          onClick={() => {
            setShowWindow(false);
          }}
          autoFocus
        >
          close
        </button>
      </div>
    );
  }

  return (
    <div id="mission-container">
      {isTimer ? (
        getCounter === 0 ? null : (
          <div id="countdown-container">
            <p>Countdown: {getCounter} seconds</p>
          </div>
        )
      ) : (
        <div id="countdown-container"></div>
      )}
      <div id="trials-container">
        {Object.keys(allTry.current.trials).map((key, i) => {
          if (allTry.current.trials[key] == "$ Error : Invalid command") {
            return (
              <li key={i} style={{ color: "red" }}>
                {allTry.current.trials[key]}
              </li>
            );
          }
          return <li key={i}>{allTry.current.trials[key]}</li>;
        })}
      </div>
      <form onSubmit={checkWord}>
        <label>
          <p id="word-to-write">{getWord}</p>
          {inputWord}
          <input type="submit" hidden />
          <ProgressBar
            currentLevel={index.current}
            maxLevel={words.current.length}
          ></ProgressBar>
        </label>
      </form>
      {errorMessage}
    </div>
  );
};

export default Mission;
