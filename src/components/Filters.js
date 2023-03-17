import React, { useContext } from 'react';

import PlanetContext from '../context/PlanetContext';

export default function Filters() {
  const {
    nameFilter,
    setNameFilter,
    columnFilter,
    setColumnFilter,
    filterColumn,
    options,
    setOptions,
  } = useContext(PlanetContext);

  const handleChange = ({ target }) => {
    const { value } = target;
    setNameFilter(value);
  };

  const filterHandleChange = ({ target: { name, value } }) => {
    setColumnFilter({ ...columnFilter, [name]: value });
  };

  const handleClick = () => {
    filterColumn();
    const updatedOptions = options
      .filter((option) => option.value !== columnFilter.column);
    setOptions(updatedOptions);
  };

  return (
    <div>
      <input
        placeholder="Filtro por Nome"
        type="text"
        onChange={ handleChange }
        name="name"
        value={ nameFilter }
        data-testid="name-filter"
      />
      <div>
        <select
          name="column"
          data-testid="column-filter"
          onChange={ filterHandleChange }
          value={ columnFilter.column }
        >
          { options.map((el) => (
            <option key={ el.value } value={ el.value }>
              { el.label }
            </option>))}
        </select>
        <select
          name="comparison"
          data-testid="comparison-filter"
          onChange={ filterHandleChange }
          value={ columnFilter.comparison }
        >
          <option
            value="maior que"
          >
            maior que
          </option>
          <option
            value="menor que"
          >
            menor que
          </option>
          <option
            value="igual a"
          >
            igual a
          </option>

        </select>
        <input
          name="value"
          type="number"
          data-testid="value-filter"
          value={ columnFilter.value }
          onChange={ filterHandleChange }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </div>
    </div>
  );
}
