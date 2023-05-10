const unlockContinent = (name) => {
  const countries = JSON.parse(localStorage.getItem("countries"));
  const result = countries.continents.map((continent) => {
    if (continent.name == name) {
      continent.isAvailable = true;
    }
    return continent;
  });
  localStorage.setItem("countries", JSON.stringify({ continents: result }));
};

export default unlockContinent;
