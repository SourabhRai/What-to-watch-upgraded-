import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
// import Login from './Login' ;
import MovieList from "./MovieList";
import MovieListHeading from "./MovieListHeading";
import SearchBox from "./SearchBox";
import AddFavourites from "./AddFavourites";
import RemoveFavourites from "./RemoveFavourites";
import SearchBoxuser from "../SearchBoxuser";
import { db, auth } from "../config/fire";

function Home({ handleLogout }) {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [searchUser, setSearchUser] = useState([]);

  const [favourites, setFavourites] = useState([]);
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=4059f720`;
    const response = await fetch(url);
    const responseJson = await response.json();

    console.log(responseJson);
    // setMovies(responseJson.Search);
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  const addFavouriteMovie = async (movie) => {
    movie.userid = auth.currentUser.uid;
    await db.collection("favorites").doc().set(movie);
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
  };

  const removeFavouriteMovie = async (movie) => {
    const imdbID = movie.imdbID;
    const query = await db
      .collection("favorites")
      .where("imdbID", "==", imdbID)
      .get();
    query.forEach((doc) => {
      doc.ref.delete();
    });
    const newFavouriteList = favourites.filter(
      (movies) => movies.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    (async () => {
      const uid = auth.currentUser.uid;
      const ref = db.collection("favorites");
      const query = await ref.where("userid", "==", uid).get();
      const favorites = [];
      query.docs.forEach((doc) => {
        favorites.push(doc.data());
      });
      setFavourites(favorites);
    })();
  }, []);

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox setSearchValue={setSearchValue} />
        <SearchBoxuser setSearchUser={setSearchUser} />
      </div>

      <div className="row">
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>

      <div className="row">
        <MovieListHeading heading="Favorites" />
      </div>

      <div className="row">
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>

      <div className="btn">
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}
export default Home;
