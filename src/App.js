import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=c1472918";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  return (
    <div className="app">
      <h1>MovieDen</h1>

      <div className="search">
        <input
          placeholder="Serach movie"
          value={searchTerm}
          onChange={(event) => {setSearchTerm(event.target.value)}}
        ></input>
        <img src={SearchIcon} alt="Search" onClick={() => {searchMovies(searchTerm)}} />
      </div>

      {movies?.length > 0 ? (
        <div className="Container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h1>No movie found</h1>
        </div>
      )}
    </div>
  );
};

export default App;
