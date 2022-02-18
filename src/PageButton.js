import "./PageButton.css";
export default function PageButton(props) {
  return (
    <button className="page-button" onClick={props.funcao}>
      {props.children}
    </button>
  );
}
