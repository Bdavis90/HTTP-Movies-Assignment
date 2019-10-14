import React, { useState, useEffect } from "react";
import Axios from "axios";

const UpdateForm = props => {
  console.log("props updateForm.js: ", props);

  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: []
  });

  const handleChanges = e => {
    e.preventDefault();
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const movieID = props.match.params.id;
  const editMovie = (e, id) => {
    e.preventDefault();
    Axios.put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        console.log(res);
        props.updateMovie(res.data);
        props.movie.map(movie => {
          return movie.id === res.data.id ? res.data : movie;
        });
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={() => editMovie(movieID)}>
      <div>
        <label>Title</label>
        <input name="title" onChange={handleChanges} value={movie.title} />
      </div>
      <div>
        <label>Director</label>
        <input
          name="director"
          onChange={handleChanges}
          value={movie.director}
        />
      </div>
      <div>
        <label>Metascore</label>
        <input
          name="metascore"
          onChange={handleChanges}
          value={movie.metascore}
        />
      </div>
      <div>
        <label>Stars</label>
        <input name="stars" onChange={handleChanges} value={movie.stars} />
      </div>
      <button>Submit</button>
    </form>
  );
};

export default UpdateForm;
