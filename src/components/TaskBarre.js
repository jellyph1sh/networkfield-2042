import React from "react";
import DateTaskBarre from "./DateTaskBarre.js";

const TaskBarre = ({ children }) => {
  return (
    <div id="task-barre">
      <div id="child-container-task-barre">{children}</div>
      <DateTaskBarre />
    </div>
  );
};

export default TaskBarre;
