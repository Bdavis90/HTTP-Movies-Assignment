import React, { Component } from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import UpdateForm from "./UpdateForm";
import MovieCard from "./MovieCard";
export default class MovieList extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err.response));
  }

  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
        {/* <Route
          exact
          path="/update-movie/:id"
          render={props => {
            return <UpdateForm {...props} movie={this.state.movies} />;
          }}
        /> */}
      </div>
    );
  }
}

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}
