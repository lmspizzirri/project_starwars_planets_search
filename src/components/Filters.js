import React, { useContext } from 'react';

import PlanetContext from '../context/PlanetContext';

export default function Filters() {
  const { nameFilter, setNameFilter } = useContext(PlanetContext);
  const handleChange = ({ target }) => {
    const { value } = target;
    setNameFilter(value);
  };

  return (
    <div>
      <input
        placeholder="Filtro por Nome"
        type="text"
        onChange={ handleChange }
        name="name"
        value={ nameFilter }
      />
    </div>
  );
}
