import "./Movie.css";
import { useEffect, useState } from "react";
export default function Movie({
  movieOverview,
  movieRating,
  movieReleaseDate,
  moviePoster,
}) {
  const [infoClass, setInfoClass] = useState(false);

  return (
    <div
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/w300/${moviePoster}")`,
      }}
      className="movie zoomInDown"
    >
      <div className="movie-rating holder">
        <p className="movie-rating-text">{movieRating}</p>
      </div>
      <button
        onClick={() => setInfoClass((anterior) => !anterior)}
        className="infos-button holder"
      >
        <p className="info-button-text">Info</p>
      </button>
      <div className={"infos " + (infoClass ? "show-infos" : "hide-infos")}>
        <p className="movie-release">{movieReleaseDate}</p>
        <p className="overview">{movieOverview}</p>
      </div>
      <div className="pin-right holder">
        <p className="pin">.</p>
      </div>

      <div className="pin-left holder">
        <p className="pin">.</p>
      </div>
    </div>
  );
}
