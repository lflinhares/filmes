import "./App.css";
import Movie from "./Movie";
import { useEffect, useState } from "react";
import PageButton from "./PageButton";
import GenreListItem from "./GenreListItem";
function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [genresDropboxClass, setGenresDropboxClass] = useState(false);
  const [genreFilter, setGenreFilter] = useState("");
  const [genreFilterName, setGenreFilterName] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const apiKey = "078156dd673bf235bf77c9a7c83d01af";
  async function getMovies() {
    const movies = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&vote_average.gte=${ratingFilter}&vote_count.gte=100&with_genres=${genreFilter}`
    ).then((response) => response.json().then((movies) => movies));
    setMovies(movies.results);
  }

  async function getGenres() {
    const genres = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=078156dd673bf235bf77c9a7c83d01af`
    ).then((response) => response.json().then((genres) => genres));
    genres.genres.push({ id: "", name: "None" });
    setGenres(genres.genres);

    console.log(genres);
  }

  useEffect(() => {
    getMovies();
    getGenres();
  }, []);

  useEffect(() => setPage(1), [genreFilter]);
  useEffect(() => getMovies(), [genreFilter]);

  useEffect(() => getMovies(), [page]);

  return (
    <div className="App">
      <div className="buttons-container">
        <div className="genre-dropbox-container">
          <button
            className={"genre-dropbox-button"}
            onClick={() => setGenresDropboxClass((anterior) => !anterior)}
          >
            {genreFilter === "" ? "Genres" : genreFilterName}
          </button>
          <div
            className={
              "genres-dropbox " + (genresDropboxClass ? "show" : "hide")
            }
          >
            {genres?.map((genre) => (
              <GenreListItem
                genreName={genre.name}
                id={genre.id}
                key={genre.id}
                functionWrapper={() => {
                  setGenreFilter(genre.id);
                  setGenreFilterName(genre.name);
                  setGenresDropboxClass((anterior) => !anterior);
                }}
              />
            ))}
          </div>
        </div>
        <PageButton
          funcao={() =>
            setPage((anterior) => (anterior > 1 ? anterior - 1 : anterior))
          }
        >
          {"<"}
        </PageButton>
        <PageButton funcao={() => setPage((anterior) => anterior + 1)}>
          {">"}
        </PageButton>

        <button className="placeholder-button"></button>
      </div>
      <div className="movies-container">
        {movies?.map((movie) => (
          <Movie
            key={movie.id}
            movieOverview={movie.overview}
            movieRating={movie.vote_average}
            movieReleaseDate={movie.release_date}
            moviePoster={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
