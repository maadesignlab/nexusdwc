import { useStore } from "../context/StoreContext"; 
import { useState, useEffect } from "react"; // 🟢 CORRECCIÓN: Se agregó useEffect
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookCard from "../components/Library/BookCard";
import Loader from "../components/Loader";
import LibraryFilters from "../components/Library/Filters";
import "../styles/library.css"

function Library() {
  const { libros, loading } = useStore();
  const [showLoader, setShowLoader] = useState(true);

  // Lógica para mantener el loader un mínimo de 600ms para evitar parpadeos
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 600); 

      return () => clearTimeout(timer);
    }
  }, [loading]);

  // 1. Renderizado de Carga (Cubre tanto la carga de datos como el delay artificial)
  if (loading || showLoader) {
    return (
      <>
        <Header />
        <main className="dashboard-wrapper">
          <Loader text="Cargando tu información..." />
        </main>
        <Footer />
      </>
    );
  }

  // 2. Renderizado Principal (Solo ocurre cuando loading y showLoader son false)
  return (
    <>
      <Header />

      <main className="library-page">
        <section className="catalogo-and-filtros">
          
          {/* Sección lateral de filtros */}
          <aside className="filtros">
            <LibraryFilters />          
          </aside>

          {/* Sección principal del catálogo */}
          <section className="catalogo">
            {/* 🟢 OPTIMIZACIÓN: Eliminamos el check de loading redundante aquí */}
            <div className="productos-grid">
              {libros && libros.length > 0 ? (
                libros.map((item) => (
                  <BookCard key={item.id} libro={item} />
                ))
              ) : (
                <div className="no-data">
                  <p>No hay libros disponibles en este momento.</p>
                </div>
              )}
            </div>
          </section>

        </section>
      </main>

      <Footer />
    </>
  );
}

export default Library;
