import data from "../data/missions.json";
import countries from "../data/countries.json";

const createLocalStorage = () => {
  localStorage.setItem("data", JSON.stringify(data));
  localStorage.setItem("countries", JSON.stringify(countries));
  console.log(localStorage.getItem("data"));
};

export default createLocalStorage;
