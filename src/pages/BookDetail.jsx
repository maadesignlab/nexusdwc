import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch("https://mock.apidog.com/m1/1129812-1121696-default/itemslib")
      .then(res => res.json())
      .then(data => {
        const found = data.find(item => item.id === Number(id));
        setBook(found);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!book) {
    return <p style={{ padding: "2rem" }}>Cargando libro...</p>;
  }

  return (
      <>
      <Header />

      <main className="book-detail">
        <img src={book.imagen} alt={book.titulo} />

        <section className="book-info">
          <h1>{book.titulo}</h1>
          <p className="author">{book.autor}</p>

          <p className="price">${book.precio}</p>

          <p className="sinopsis">{book.sinopsis}</p>

          <ul className="book-meta">
            <li><strong>Categoría:</strong> {book.categoria}</li>
            <li><strong>Editorial:</strong> {book.editorial}</li>
            <li><strong>Año:</strong> {book.año}</li>
            <li><strong>Páginas:</strong> {book.paginas}</li>
            <li><strong>ISBN:</strong> {book.codigo}</li>
            <li><strong>En inventario:</strong> {book.inventario}</li>
            <li><strong>Vendidos:</strong> {book.vendidos}</li>
          </ul>
        </section>
      </main>

      <Footer />
    </>
  )
}
export default BookDetail;