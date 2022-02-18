import "./GenreListItem.css";
export default function GenreListItem(props) {
  return (
    <button onClick={props.functionWrapper} className="genreDropboxItem">
      {props.genreName}
    </button>
  );
}
