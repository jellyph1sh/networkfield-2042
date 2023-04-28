import React, { useState, useRef } from "react";

const Generic = () => {
  const [currentLore, setCurrentLore] = useState("");
  const loreComplete = useRef({ index: false });
  const allLore = useRef({
    index:
      "The year 2042 is over. The Internet is no longer the free space it used to be. Powerful multinational bodies scan and spy on every corner of the network. People's privacy is being combed through by millions of bots every moment. You will embody the hacker who will restore the Internet to its former freedom by hacking into the various authorities around the world that are plaguing the Internet.",
  });

  React.useEffect(() => {
    if (currentLore.length == allLore.current.index.length) {
      loreComplete.current.index = true;
    }
    if (!loreComplete.current.index) {
      setTimeout(() => {
        setCurrentLore((c) => c + allLore.current.index[c.length]);
      }, 80);
    }
  }, [currentLore]);

  return (
    <div id="lore-container">
      <p id="lore">{currentLore}</p>
    </div>
  );
};

export default Generic;
