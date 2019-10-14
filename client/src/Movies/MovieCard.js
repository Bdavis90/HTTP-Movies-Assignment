import React from "react";
import { Route } from "react-router-dom";
import UpdateForm from "./UpdateForm";

const MovieCard = props => {
  console.log("props MovieCard.js: ", props);
  const { title, director, metascore, stars } = props.movie;
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {/* {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))} */}
    </div>
  );
};

export default MovieCard;
