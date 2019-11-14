import React, { useState, useEffect } from "react";
import axios from "axios";

const initialForm = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: "",
}

const UpdateMovie = props => {
    const [updatedMovie, setUpdatedMovie] = useState(initialForm);

    const changeHandler = event => {
        event.persist();
        setUpdatedMovie({
            ...updatedMovie,
            [event.target.name]: event.target.value,
        });
    };



    const fetchMovie = id => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            setUpdatedMovie({
                id: res.data.id,
                title: res.data.title,
                director: res.data.director,
                metascore: res.data.metascore,
                stars: res.data.stars,
            })
        })
        .catch(err => console.log(err.response));
    };

    useEffect(() => {
        fetchMovie(props.match.params.id);
    }, []);

    const handleSubmit = e => {
        // PUT request
        e.preventDefault();
        console.log(updatedMovie);
        axios
            .put(`http://localhost:5000/api/movies/${updatedMovie.id}`, updatedMovie)
            .then(res => {
            console.log(res);
            props.history.push(`/movies/${updatedMovie.id}`);
            })
            .catch(err => {
            console.log(err);
            });
    };

    return(
        <div className="save-wrapper">
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    value={updatedMovie.title}
                /><br />

                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    value={updatedMovie.director}
                /><br />

                <input
                    type="text"
                    name="metascore"
                    onChange={changeHandler}
                    value={updatedMovie.metascore}
                /><br />

                <input
                    type="text"
                    name="stars"
                    onChange={changeHandler}
                    value={updatedMovie.stars}
                /><br />

                <button className="update-button">Update</button>

            </form>
        </div>
    )
}

export default UpdateMovie;