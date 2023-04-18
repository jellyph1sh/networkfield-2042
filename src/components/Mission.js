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
}) => {
  const words = useRef(getWords(difficulty, nbWords));
  const inputRef = useRef(null);
  const [getCounter, setCounter] = React.useState(timer);
  const index = useRef(0);
  const [getWord, setWord] = useState(words.current[index.current]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isFinish, setFinish] = useState(false);
  const allTry = useRef({ trials: [] });

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
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [getCounter]);

  const checkIsWord = (userWord, correctWord) => {
    if (userWord === correctWord) {
      return true;
    }
    return false;
  };

  const checkWord = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    allTry.current.trials.push("$ " + e.target.enterWord.value);
    console.log(checkIsWord(e.target.enterWord.value, getWord));
    if (checkIsWord(e.target.enterWord.value, getWord)) {
      if (index.current === words.current.length - 1) {
        setFinish(true);
      }
      index.current = index.current + 1;
      setWord(words.current[index.current]);
    } else {
      setErrorMessage(<p id="error-message">Wrong command!</p>);
    }
    inputRef.current.value = "";
  };

  if (isFinish) {
    return (
      <div id="mission-container-finished">
        <h1> DONE!</h1>
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
    if (malus) {
      setPlayerData((playerData) => ({
        ...playerData,
        money: playerData.money * 0.7,
      }));
    }

    return (
      <div id="mission-container-finished">
        <h1 className="loose-text">Time Over!</h1>
        <h2 className="loose-text">You lose!</h2>
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
      ) : null}
      <div id="trials-container">
        {Object.keys(allTry.current.trials).map((key, i) => {
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
