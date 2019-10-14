import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./Movies/UpdateForm";

const App = () => {
  const [movies, setMovies] = useState([]);
  console.log(movies);
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        console.log(res);
        setMovies(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return (
            <Movie {...props} addToSavedList={addToSavedList} movie={movies} />
          );
        }}
      />
      <Route
        exact
        path="/update-movie/:id"
        render={props => {
          return (
            <UpdateForm {...props} movie={movies} updateMovie={setMovies} />
          );
        }}
      />
    </>
  );
};

export default App;
