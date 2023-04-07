import React, { useState } from 'react';

const Mission = (difficulty=1, isTimer=false) => {
    const words = ["ls","pwd","cd","rm","cmd","del","echo","exit","find","getmac","help","ipconfig","md","mkdir","move","netstat","PATH","ping","prompt","run","change","create","delete","end","query","set","shutdown","start","telnet","timeout","tree","xcopy","arp","break","chgport","extract","for","ftp","label","lock","net","nslookup","pause","print","reset","type","scan","grep"];
    let i = 0;
    const word = words[i];
    const [value, setValue] = useState("");
    const input = <input type="text" name="enterWord" onChange={e => setValue(e.target.value)} />;
    
    const checkIsWord = (userWord, correctWord) => {
        if (userWord === correctWord) {
            return true;
        }
        return false;
    }

    if (checkIsWord(value, words[i])) {
        if (i === words.length - 1) {
            return (
                <div>
                    <h1>DONE!</h1>
                </div>
            )
        }
        i += 1;
    }
    
    return (
        <div>
            <label>
                {word}
                {input}
            </label>
        </div>
    );
};

export default Mission;