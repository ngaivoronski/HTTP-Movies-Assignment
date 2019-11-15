import React, { useState, useEffect } from "react";
import axios from "axios";

const initialForm = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: "",
}

const AddMovie = props => {
    const [newMovie, setNewMovie] = useState(initialForm);

    const changeHandler = event => {
        event.persist();
        if (event.target.name === 'stars') {
            setNewMovie({
                ...newMovie,
                stars: event.target.value.split(","),
            });
        }else {
            setNewMovie({
                ...newMovie,
                [event.target.name]: event.target.value,
            });
        }
    };

    const handleSubmit = e => {
        // POST request
        e.preventDefault();
        console.log(newMovie);
        axios
            .post(`http://localhost:5000/api/movies/`, newMovie)
            .then(res => {
            console.log(res);
            props.history.push(`/`);
            })
            .catch(err => {
            console.log(err);
            });
    };

    return(
        <div className="save-wrapper">
            <h2>Add a Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    value={newMovie.title}
                    placeholder="Title"
                /><br />

                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    value={newMovie.director}
                    placeholder="Director"
                /><br />

                <input
                    type="text"
                    name="metascore"
                    onChange={changeHandler}
                    value={newMovie.metascore}
                    placeholder="Metascore"
                /><br />

                <input
                    type="text"
                    name="stars"
                    onChange={changeHandler}
                    value={newMovie.stars}
                    placeholder="Stars"
                /><br />

                <button className="update-button">Add Movie</button>

            </form>
        </div>
    )
}

export default AddMovie;