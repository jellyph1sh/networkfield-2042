import React, { useRef, useState } from 'react';
import { getWords } from "../data/wordsMission.js";

const Mission = ({difficulty=1, nbWords = 10, isTimer = false, timer=30, inputType="text"}) => {
    const words = useRef(getWords(difficulty, nbWords));
    const inputRef = useRef(null);
    const [getCounter, setCounter] = React.useState(timer);
    const index = useRef(0);
    const [getWord, setWord] = useState(words.current[index.current]);
    const [getErrorMessage, setErrorMessage] = useState("");
    const [isFinish, setFinish] = useState(false);

    const inputWord = <input ref={inputRef} type={inputType} name="enterWord" autoFocus autoComplete="off"/>
    
    React.useEffect(() => {
        let timer;
        if (getCounter > 0) {
            timer = setTimeout(() => setCounter(c => c - 1), 1000);
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [getCounter]);

    const checkIsWord = (userWord, correctWord) => {
        if (userWord === correctWord) {
            return true;
        }
        return false;
    }

    const checkWord = (e) => {
        e.preventDefault();

        console.log(checkIsWord(e.target.enterWord.value, getWord))
        if (checkIsWord(e.target.enterWord.value, getWord)) {
            if (index.current === words.current.length - 1) {
                setFinish(true);
            }
            setErrorMessage("");
            index.current = index.current + 1;
            setWord(words.current[index.current]);
        } else {
            setErrorMessage("Wrong word!");
        }
        inputRef.current.value = "";
    }
    
    if (isFinish) {
        return (
            <div>
                <h1>DONE!</h1>
            </div>
        )
    }

    if (isTimer === true && getCounter === 0 && !isFinish) {
        return (
            <div>
                <h1>Time Over!</h1>
                <h2>You lose!</h2>
            </div>
        )
    }
    return (
        <div>
            <form onSubmit={checkWord}>
                {isTimer ? getCounter === 0 ? "" : <div>Countdown: {getCounter} seconds</div> : ""}
                <label>
                    {getWord}
                    {inputWord}
                    <input type="submit" />
                </label>
            </form>
            <p>{getErrorMessage}</p>
        </div>
    );
};

export default Mission;