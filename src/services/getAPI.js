const getAPI = async (set) => {
  const response = await fetch('https://swapi.dev/api/planets');
  const data = await response.json();
  const planets = data.results.map((element) => {
    delete element.residents;
    return element;
  });
  set(planets);
};

export default getAPI;
