import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import getAPI from '../services/getAPI';

export default function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    getAPI(setPlanets);
  }, []);

  const finalPlanets = {
    planets,
  };

  return (
    <PlanetContext.Provider value={ finalPlanets }>
      { children }
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
