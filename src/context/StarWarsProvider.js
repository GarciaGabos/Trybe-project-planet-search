import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import StarWarsContext from './StarWarsContext';
import fetchPlanets from '../fetchPlanets/fetchPlanets';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [searchName, setSearchName] = useState('');
  // const [searchFilters, setSearchFilters] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  useEffect(() => {
    fetchPlanets().then((data) => setPlanets(data));
  }, []);

  const planetState = { planets, setPlanets };
  const searchNameState = {
    filters: {
      searchName,
    },
    setSearchName,
  };
  const filterState = { filterByNumericValues, setFilterByNumericValues };
  return (
    <StarWarsContext.Provider value={ { planetState, searchNameState, filterState } }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}.isRequired;

export default StarWarsProvider;
