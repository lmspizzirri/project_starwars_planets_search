import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import getAPI from '../services/getAPI';

export default function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const [filteredByName, setFilteredByName] = useState('');
  const [execPlanets, setExecPlanets] = useState(planets);

  useEffect(() => { getAPI(setPlanets); }, []);

  useEffect(() => { setExecPlanets(planets); }, [planets]);

  useEffect(() => {
    setFilteredByName(planets.filter((element) => element.name.includes(nameFilter)));
  }, [nameFilter, planets]);

  const filterColumn = () => {
    let filterPlanets = [];
    const { column, comparison, value } = columnFilter;
    switch (comparison) {
    case 'maior que':
      filterPlanets = filteredByName
        .filter((element) => Number(element[column]) > Number(value));
      break;
    case 'menor que':
      filterPlanets = filteredByName
        .filter((element) => Number(element[column]) < Number(value));
      break;
    case 'igual a':
      filterPlanets = filteredByName
        .filter((element) => Number(element[column]) === Number(value));
      break;
    default:
      filterPlanets = filteredByName;
    }
    console.log(filterPlanets);
    return setExecPlanets(filterPlanets);
  };

  const context = {
    planets,
    nameFilter,
    setNameFilter,
    columnFilter,
    setColumnFilter,
    filterColumn,
    execPlanets,
    filteredByName,
  };

  return (
    <PlanetContext.Provider value={ context }>
      { children }
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
