import React, { useState, useEffect, useRef } from "react";

const End = () => {
  const [currentMessageEnd, setcurrentMessageEnd] = useState("");
  const totalMessageEnd = useRef("Congratulation you save the world !!!");
  useEffect(() => {
    if (totalMessageEnd.current.length > currentMessageEnd.length)
      setTimeout(() => {
        setcurrentMessageEnd((s) => s + totalMessageEnd.current[s.length]);
      }, 30);
  }, [currentMessageEnd]);

  return (
    <div id="end-container">
      <div>
        <h1>{currentMessageEnd}</h1>
      </div>
      <button onClick={() => window.location.reload()} id="button-retry">
        Retry ?
      </button>
    </div>
  );
};

export default End;
