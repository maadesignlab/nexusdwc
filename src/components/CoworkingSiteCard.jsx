import { Link } from "react-router-dom";

function CoworkingSiteCard({ space, onClick }) {
    if (!space) return null;

    return (
     <article className="coworking-card" onClick={onClick}>
      
      {/* Header */}
      <div className="card-header">
        <h3>{space.nombre}</h3>
      </div>

      {/* Tipo */}
      <span className="tag">
        {space.tipo}
      </span>

      {/* Info */}
      <ul className="card-info">
        <li>👥 Capacidad: {space.capacidad} personas</li>
      </ul>

      <hr />

      {/* Estado */}
      <span className={`availability ${space.ocupado ? "no" : "ok"}`}>
        {space.ocupado ? "Ocupado" : "Disponible"}
      </span>
    </article>
    );
}

export default CoworkingSiteCard;