import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import getAPI from '../services/getAPI';

export default function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterCheck, setFilterCheck] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const [execPlanets, setExecPlanets] = useState(planets);
  const [options, setOptions] = useState([
    { value: 'orbital_period', label: 'orbital_period' },
    { value: 'population', label: 'population' },
    { value: 'diameter', label: 'diameter' },
    { value: 'rotation_period', label: 'rotation_period' },
    { value: 'surface_water', label: 'surface_water' },
  ]);
  const [sortAux, setSortAux] = useState({
    order: { column: 'population', sort: 'ASC' },
  });

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

  const removeAllFilter = () => {
    setExecPlanets(planets);
  };

  const sortHandleClick = () => {
    const { order: { column, sort } } = sortAux;
    let sortedPlanets = [];
    if (column === 'population') {
      const definedPlanets = planets
        .filter((element) => element.population !== 'unknown');
      const unknownPlanets = planets
        .filter((element) => element.population === 'unknown');
      const sortDefinedPlanets = definedPlanets.sort((planetA, planetB) => {
        switch (sort) {
        case 'ASC':
          return (planetA[column]) - (planetB[column]);
        default:
          return (planetB[column]) - (planetA[column]);
        }
      });
      sortedPlanets = ([...sortDefinedPlanets, ...unknownPlanets]);
    } else {
      const sortDefinedPlanets = planets.sort((planetA, planetB) => {
        switch (sort) {
        case 'ASC':
          return (planetA[column]) - (planetB[column]);
        default:
          return (planetB[column]) - (planetA[column]);
        }
      });
      sortedPlanets = sortDefinedPlanets;
    }
    setExecPlanets(sortedPlanets);
  };

  const context = {
    planets,
    nameFilter,
    setNameFilter,
    columnFilter,
    setColumnFilter,
    filterColumn,
    execPlanets,
    options,
    setOptions,
    filterCheck,
    setFilterCheck,
    removeAllFilter,
    sortAux,
    setSortAux,
    sortHandleClick,
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
