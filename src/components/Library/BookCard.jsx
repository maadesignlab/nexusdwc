import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../../styles/bookcard.css";

function BookCard({ libro }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const getImageSrc = (img) => {
    if (!img) return "/placeholder.jpg";
    if (img.startsWith("http")) return img;
    if (img.startsWith("/")) return img;
    return `/${img}`;
  };

  // --- CORRECCIÓN AQUÍ ---
  const handleAddToCart = (e) => {
    // Si tuvieras un Link envolviendo la card, esto evita que se abra el detalle
    if (e) e.stopPropagation(); 

    // Creamos el objeto con la estructura exacta que tu Contexto espera
    const itemParaCarrito = {
      ...libro,
      bookId: libro.id // Mapeamos id -> bookId
    };

    addToCart(itemParaCarrito);
  };

  return (
    <article className="book-card">
      <img
        src={getImageSrc(libro.imagen)}
        alt={libro.titulo}
        // Opcional: Si quieres que la imagen también lleve al detalle
        onClick={() => navigate(`/library/${libro.id}`)}
        style={{ cursor: "pointer" }}
      />

      {libro.masVendido && (
        <span className="badge">Más vendido</span>
      )}

      <h3>{libro.titulo}</h3>
      <p className="author">{libro.autor}</p>
      <p className="category">{libro.categoria}</p>

      <p className="price">${libro.precio.toLocaleString()}</p> {/* Agregué toLocaleString para formato */}

      <button
        className="btn"
        onClick={() => navigate(`/library/${libro.id}`)}
      >
        Ver detalle
      </button>

      <button
        className="btn-cart"
        onClick={handleAddToCart} /* Usamos la función corregida */
      >
        Añadir al carrito
      </button>

    </article>
  );
}

export default BookCard;