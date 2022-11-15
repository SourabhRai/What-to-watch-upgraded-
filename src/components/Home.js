import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
// import Login from './Login' ;
import MovieList from './MovieList';
import MovieListHeading from './MovieListHeading';
import SearchBox from './SearchBox';
import AddFavourites from './AddFavourites';
import RemoveFavourites from './RemoveFavourites';
import SearchBoxuser from '../SearchBoxuser';

function Home({ handleLogout }) {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [searchUser, setSearchUser] = useState([]);

  const [favourites, setFavourites] = useState([
    {
      Poster:"https://m.media-amazon.com/images/M/MV5BMWY3NTljMjEtYzRiMi00NWM2LTkzNjItZTVmZjE0MTdjMjJhL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTQ4NTc5OTU@._V1_SX300.jpg",Title:"Sherlock",Type:"series",Year:"2010–2017",imdbID:"tt1475582"
    }
  ]);
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=4059f720`;
    // const url = `http://www.omdbapi.com/?s=sherlock&apikey=4059f720`;

    const response = await fetch(url);
    const responseJson = await response.json();
    // console.log(responseJson);
    // setMovies(responseJson.Search);
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }

  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };
  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((movies) => movies.imdbID !== movie.imdbID);
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'));
    setFavourites(favourites);

    // if(favourites)
    // setFavourites(favourites);

  }, []);


  return (
    <div className='container-fluid movie-app'>

      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox setSearchValue={setSearchValue} />
        <SearchBoxuser setSearchUser={setSearchUser} />
      </div>

      <div className='row'>
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>

      <div className='row'>
        <MovieListHeading heading='Favorites' />
      </div>

      <div className='row'>
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>

      <div className="btn"><button onClick={handleLogout} >Log Out</button></div>

    </div>
  );
}
export default Home;
