import { useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../context/StoreContext"; 
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/bookdetail.css";

function BookDetail() {
  const { id } = useParams();
  const { libros } = useStore();
  const { addToCart } = useCart();
  const [cantidad, setCantidad] = useState(1);

  const book = libros.find(item => item.id === Number(id));

  if (!book) return <div className="loading-state">Cargando...</div>;

  // CORRECCIÓN LÓGICA: Adaptamos el objeto para que tu Contexto lo entienda
  const handleAddToCart = () => {
    const itemParaCarrito = {
      ...book,
      bookId: book.id, // Tu contexto espera 'bookId', el store tiene 'id'
    };
    addToCart(itemParaCarrito, cantidad);
  };

  return (
    <>
      <Header />
      {/* Usamos una clase que herede altura mínima para empujar el footer */}
      <main className="book-detail-page">
        <div className="book-detail-card">
          
          <div className="book-image-column">
            <img src={`/${book.imagen}`} alt={book.titulo} />
          </div>

          <section className="book-info-column">
            <span className="badge-category">{book.categoria}</span>
            <h1>{book.titulo}</h1>
            <p className="author">{book.autor}</p>
            <p className="price">${book.precio.toLocaleString()}</p>
            <p className="sinopsis">{book.sinopsis}</p>

            <div className="purchase-wrapper">
              <div className="qty-control">
                <button onClick={() => setCantidad(c => Math.max(1, c - 1))}>−</button>
                <span>{cantidad}</span>
                <button onClick={() => setCantidad(c => c + 1)}>+</button>
              </div>
              <button className="btn-add-cart" onClick={handleAddToCart}>
                Añadir al carrito
              </button>
            </div>

            <div className="divider"></div>

            <ul className="meta-grid">
              <li><strong>Editorial:</strong> {book.editorial}</li>
              <li><strong>Año:</strong> {book.año}</li>
              <li><strong>Páginas:</strong> {book.paginas}</li>
              <li><strong>ISBN:</strong> {book.codigo}</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default BookDetail;