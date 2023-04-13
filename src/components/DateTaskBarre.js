import React, { useState, useEffect } from "react";

const DateTaskBarre = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const getNewDate = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
  }, []);

  const formatDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return day + "/" + month + "/" + year;
  };

  const formatHourMin = (date) => {
    let hour = currentDate.getHours();
    let min = currentDate.getMinutes();
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (min < 10) {
      min = "0" + min;
    }
    return hour + ":" + min;
  };

  return (
    <div id="date-container">
      <p>{formatHourMin(currentDate)}</p>
      <p>{formatDate(currentDate)}</p>
    </div>
  );
};

export default DateTaskBarre;
