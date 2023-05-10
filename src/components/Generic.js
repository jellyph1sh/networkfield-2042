import React, { useState, useRef, useEffect } from "react";
import playSoundEffect from "../utils/playSoundEffect.js";
import oneLetterTyping from "../sound/typing_one_letter.mp3";

const Generic = () => {
  const [currentLore, setCurrentLore] = useState("");
  const allLore = useRef(
    "The year 2042 is over. The Internet is no longer the free space it used to be. Powerful multinational bodies scan and spy on every corner of the network. People's privacy is being combed through by millions of bots every moment. You will embody the hacker who will restore the Internet to its former freedom by hacking into the various authorities around the world that are plaguing the Internet."
  );

  useEffect(() => {
    if (currentLore.length != allLore.current.length) {
      setTimeout(() => {
        setCurrentLore((c) => c + allLore.current[c.length]);
      }, 70);
      if (currentLore[currentLore.length - 1] != " ") {
        playSoundEffect(oneLetterTyping);
      }
    }
  }, [currentLore]);

  return (
    <div id="lore-container">
      <p id="lore">{currentLore}</p>
    </div>
  );
};

export default Generic;
