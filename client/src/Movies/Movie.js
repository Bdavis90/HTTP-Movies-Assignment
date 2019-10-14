import React from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import MovieCard from "./MovieCard";
import UpdateForm from "./UpdateForm";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
    console.log("props, Movie.js: ", props);
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  routeToUpdateForm = id => {
    this.props.history.push(`/update-movie/${this.state.movie.id}`);
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <Route
          path="/update-movie/:id"
          render={props => {
            return <UpdateForm movie={this.state.movie} {...props} />;
          }}
        />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div>
          <button className="update-button" onClick={this.routeToUpdateForm}>
            Update Movie
          </button>
        </div>
      </div>
    );
  }
}
