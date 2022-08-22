import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { planetState: { planets } } = useContext(StarWarsContext);
  const { searchNameState: { filters: { searchName },
    setSearchName } } = useContext(StarWarsContext);

  return (
    <>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Search planet"
        value={ searchName }
        onChange={ (event) => setSearchName(event.target.value) }
      />
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
