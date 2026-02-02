import "../styles/loader.css";

export default function Loader({ text = "Cargando..." }) {
  return (
    <div className="loader-wrapper">
      <div className="loader-ring"></div>
      <span className="loader-text">{text}</span>
    </div>
  );
}
