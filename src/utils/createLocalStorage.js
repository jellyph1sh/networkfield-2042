import data from "../data/missions.json";

const createLocalStorage = () => {
  localStorage.setItem("data", JSON.stringify(data));
  console.log(localStorage.getItem("data"));
};

export default createLocalStorage;
