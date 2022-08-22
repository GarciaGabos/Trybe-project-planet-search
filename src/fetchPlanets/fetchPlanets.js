const fetchPlanets = async () => {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const json = await fetch(url);
  const data = await json.json();
  const planetData = data.results.filter((planet) => delete planet.residents);
  return planetData;
};

export default fetchPlanets;
