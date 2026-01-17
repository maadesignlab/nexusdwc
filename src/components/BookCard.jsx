import { Link } from "react-router-dom";

function BookCard({ libro }) {

    return (
    <article className="book-card">
      <img src={libro.imagen} alt={libro.titulo} />

      {libro.masVendido && (
        <span className="badge">Más vendido</span>
      )}

      <h3>{libro.titulo}</h3>
      <p className="author">{libro.autor}</p>
      <p className="category">{libro.categoria}</p>

      <p className="price">${libro.precio}</p>

      <Link to={`/library/${libro.id}`} className="btn-add">
        Ver detalles
      </Link>
    </article>
    );
}

export default BookCard;
 