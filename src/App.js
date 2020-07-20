import React, { useState, useEffect, useReducer } from 'react';
import './App.css';

import Header from './components/Header'
import Search from './components/Search'
import Movie from './components/Movie'
const apiKey = '1686ed2d';
const MOVIE_API_URL = `https://www.omdbapi.com/?i=tt3896198&s=man&apikey=${apiKey}`;

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
}
const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
}

function App() {

  // const [loading, setLoading] = useState(true);
  // const [movies, setMovies] = useState([]);
  // const [errorMessage, setErrorMessage] = useState(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL).then(res => res.json()).then(jsonRes => {
      // setLoading(false);
      if (jsonRes.Response === "False") {
        // return setErrorMessage(jsonRes.Error);
        dispatch({ type: "SEARCH_MOVIES_FAILURE" });
      } else {
        // setMovies(jsonRes.Search);
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonRes.Search
        })
      }
    }).catch(err => {
      // setErrorMessage(err);
      dispatch({ type: "SEARCH_MOVIES_FAILURE" });
    });
  }, []);

  const search = (searchVal) => {
    // setLoading(false);
    // setErrorMessage(null);
    dispatch({ type: "SEARCH_MOVIES_REQUEST" })
    fetch(`https://www.omdbapi.com/?s=${searchVal}&apikey=${apiKey}`).then(res => res.json())
      .then(jsonRes => {
        // setLoading(false);
        if (jsonRes.Response === "True") {
          // setMovies(jsonRes.Search);
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonRes.Search
          })
        } else {
          // setErrorMessage(jsonRes.Error);
          dispatch({ type: "SEARCH_MOVIES_FAILURE" });
        }
      }).catch(err => {
        // setErrorMessage(err);
        dispatch({ type: "SEARCH_MOVIES_FAILURE" });
      });
  }
  const { loading, movies, errorMessage } = state;
  return (
    <div className="App">
      <Header text="Hooked Movie app" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span className='loading'>loading......</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
              movies.map((movie, index) => (
                <Movie key={`${index}-${movie.Title}`} movie={movie} />
              ))
            )}
      </div>
    </div>
  );
}

export default App;
