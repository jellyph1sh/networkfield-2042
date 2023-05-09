import React, { useState, useEffect } from "react";

const End = () => {
  const totalMessageEnd = "Congratulation you save the world !!!";
  const [currentMessageEnd, setcurrentMessageEnd] = useState("");
  let currentIndex = 0;
  useEffect(
    () => {
      if (totalMessageEnd.length > currentMessageEnd.length)
        setTimeout(() => {
          currentIndex++;
          setcurrentMessageEnd((s) => s + totalMessageEnd[currentIndex]);
        }, 30);
    },
    { totalMessageEnd }
  );

  return (
    <div>
      <div>
        <h1>Congratulation you save the world !!!</h1>
      </div>
      <div id="info-container">
        <p>{currentMessageEnd}</p>
      </div>
      <div>
        <button onClick={() => window.location.reload()}>Reset ?</button>
      </div>
    </div>
  );
};

export default End;
