import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";

function Library() {
  const [items, setItems] = useState([]);

    useEffect(() => {
    fetch("https://mock.apidog.com/m1/1129812-1121696-default/itemslib")
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
    }, []);

  return (
    <>
      <Header />

      <main className="library-page">

        <section className="catalogo-and-filtros">
          <section className="filtros">
            <h2>Filtros</h2>
          </section>

          <section className="catalogo">
            <div className="productos-grid">
              
              {/* AQUÍ VA */}
              {items.map(item => (
                <BookCard key={item.id} libro={item} />
              ))}

            </div>
          </section>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Library;
