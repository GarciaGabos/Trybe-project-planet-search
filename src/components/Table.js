import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { planetState: { planets } } = useContext(StarWarsContext);
  const { searchNameState: { filters: { searchName },
    setSearchName } } = useContext(StarWarsContext);

  const { filterState:
    { filterByNumericValues, setFilterByNumericValues } } = useContext(StarWarsContext);

  const [filter, setFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  // const sendFilter = () => {
  //   const filterArray = searchFilters;
  // };
  console.log(planets);

  const Columnfilter = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const collumFilterForDiferenc = Columnfilter.filter(
    (column) => !filterByNumericValues.some((e) => column === e.column),
  );

  useEffect(() => {
    setFilter((p) => ({ ...p, column: collumFilterForDiferenc[0] }));
  }, [filterByNumericValues]);

  const onInputChange = ({ target }) => {
    const { name } = target;
    setFilter({ ...filter, [name]: target.value });
  };

  return (
    <>
      <h1>Star Wars Planets Info</h1>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Search planet"
        value={ searchName }
        onChange={ (event) => setSearchName(event.target.value) }
      />
      <label htmlFor="column-filter">
        Filtrar por:
        <select
          data-testid="column-filter"
          name="column"
          value={ filter.column }
          onChange={ onInputChange }
        >
          {collumFilterForDiferenc.map((collumn) => (
            <option key={ collumn } value={ collumn }>
              {collumn}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison-filter">
        <select
          data-testid="comparison-filter"
          name="comparison"
          value={ filter.comparison }
          onChange={ onInputChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        value={ filter.value }
        onChange={ onInputChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => setFilterByNumericValues([...filterByNumericValues, filter]) }
      >
        Filter Search

      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planets
            .filter((planet) => planet.name.includes(searchName))
            .filter((planet) => filterByNumericValues
              .every(({ column, comparison, value }) => {
                if (comparison === 'menor que') {
                  return +planet[column] < +value;
                } if (comparison === 'maior que') {
                  return +planet[column] > +value;
                }
                return +planet[column] === +value;
              }))
            .map((planet) => (
              <tr key={ planet.name }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edite}</td>
                <td>{planet.url}</td>
              </tr>))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
