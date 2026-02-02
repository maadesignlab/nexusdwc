import "../../styles/coworkingsitecard.css";

function CoworkingSiteCard({ space, onClick }) {
    if (!space) return null;

    // Si es booleano y funcionaba antes, lo dejamos directo.
    // Usamos el valor tal cual viene de la API.
    const estaOcupado = space.ocupado;

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
      <span className={`availability ${estaOcupado ? "no" : "ok"}`}>
        {estaOcupado ? "Ocupado" : "Disponible"}
      </span>
    </article>
    );
}

export default CoworkingSiteCard;