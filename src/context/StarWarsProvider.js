import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import StarWarsContext from './StarWarsContext';
import fetchPlanets from '../fetchPlanets/fetchPlanets';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    fetchPlanets().then((data) => setPlanets(data));
  }, []);

  const planetState = { planets, setPlanets };
  // const searchNameState = { searchName, setSearchName };
  const searchNameState = {
    filters: {
      searchName,
    },
    setSearchName,
  };

  return (
    <StarWarsContext.Provider value={ { planetState, searchNameState } }>
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
