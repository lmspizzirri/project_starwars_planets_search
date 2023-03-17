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
  const [execPlanets, setExecPlanets] = useState(planets);
  const [defaultDisabled, setDefaultDisabled] = useState('');
  const [options, setOptions] = useState([
    { value: 'population', label: 'population' },
    { value: 'orbital_period', label: 'orbital_period' },
    { value: 'diameter', label: 'diameter' },
    { value: 'rotation_period', label: 'rotation_period' },
    { value: 'surface_water', label: 'surface_water' },
  ]);

  useEffect(() => { getAPI(setPlanets); }, []);

  useEffect(() => { setExecPlanets(planets); }, [planets]);

  useEffect(() => {
    const data = (planets.filter((element) => element
      .name.toLowerCase().includes(nameFilter)));
    setExecPlanets(data);
  }, [nameFilter, planets]);

  const filterColumn = () => {
    let filterPlanets = [];
    const { column, comparison, value } = columnFilter;
    switch (comparison) {
    case 'maior que':
      filterPlanets = execPlanets
        .filter((element) => Number(element[column]) > Number(value));
      break;
    case 'menor que':
      filterPlanets = execPlanets
        .filter((element) => Number(element[column]) < Number(value));
      break;
    case 'igual a':
      filterPlanets = execPlanets
        .filter((element) => Number(element[column]) === Number(value));
      break;
    default:
      filterPlanets = execPlanets;
    }
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
    defaultDisabled,
    options,
    setOptions,
    setDefaultDisabled,
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
