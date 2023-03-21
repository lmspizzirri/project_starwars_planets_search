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
    filterCheck,
    setFilterCheck,
    removeAllFilter,
    setSortAux,
    sortAux,
    sortHandleClick,
  } = useContext(PlanetContext);

  const handleChange = ({ target }) => {
    const { value } = target;
    setNameFilter(value);
  };

  const filterHandleChange = ({ target: { name, value } }) => {
    setColumnFilter({ ...columnFilter, [name]: value });
  };

  const sortHandleChange = ({ target: { name, value } }) => {
    setSortAux({
      order: {
        ...sortAux.order,
        [name]: value,
      },
    });
  };

  const handleClick = () => {
    filterColumn();
    setFilterCheck({
      ...filterCheck,
      column: columnFilter.column,
      comparison: columnFilter.comparison,
      value: columnFilter.value,
    });
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
        <button
          type="button"
          onClick={ removeAllFilter }
          data-testid="button-remove-filters"
        >
          Remove All Filters
        </button>
        {/* <div>
          { filterCheck.length > 0
          && filterCheck.map((filter, index) => (
            <p key={ index } data-testid="filter">
              {filter.column}
              {filter.comparison}
              {filter.value}
            </p>
          ))}
        </div> */}
        <div>
          <select
            data-testid="column-sort"
            onChange={ sortHandleChange }
            name="column"
          >
            <option value="population"> population </option>
            <option value="orbital_period"> orbital_period </option>
            <option value="diameter"> diameter </option>
            <option value="rotation_period"> rotation_period </option>
            <option value="surface_water"> surface_water </option>
          </select>
          <label htmlFor="ascending">Ascending</label>
          <input
            type="radio"
            value="ASC"
            name="sort"
            data-testid="column-sort-input-asc"
            onChange={ sortHandleChange }
          />
          <label htmlFor="descending">Descending</label>
          <input
            type="radio"
            value="DESC"
            name="sort"
            data-testid="column-sort-input-desc"
            onChange={ sortHandleChange }
          />
          <button
            data-testid="column-sort-button"
            type="button"
            onClick={ sortHandleClick }
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
}
