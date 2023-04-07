import React, { useRef, useState } from 'react';

const Mission = (difficulty=1, isTimer = false, timer=0, inputType="text") => {
    const words = ["ls","pwd","cd","rm","cmd","del","echo","exit","find","getmac","help","ipconfig","md","mkdir","move","netstat","PATH","ping","prompt","run","change","create","delete","end","query","set","shutdown","start","telnet","timeout","tree","xcopy","arp","break","chgport","extract","for","ftp","label","lock","net","nslookup","pause","print","reset","type","scan","grep"];
    const inputRef = useRef(null);
    const [getCounter, setCounter] = React.useState(timer);
    const [getIndex, setIndex] = useState(0);
    const [getWord, setWord] = useState(words[getIndex]);
    const [getErrorMessage, setErrorMessage] = useState("");
    const [isFinish, setFinish] = useState(false);

    const inputWord = <input ref={inputRef} type={inputType} name="enterWord" autoFocus autocomplete="off"/>
    
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

        if (checkIsWord(e.target.enterWord.value, getWord)) {
            if (getIndex === words.length - 1) {
                setFinish(true);
            }
            setErrorMessage("");
            setIndex(getIndex + 1);
            setWord(words[getIndex]);
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
                    <input type="submit" hidden />
                </label>
            </form>
            <p>{getErrorMessage}</p>
        </div>
    );
};

export default Mission;