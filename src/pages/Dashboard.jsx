import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/dashboard.css";
import Loader from "../components/Loader";

function Dashboard() {
  const navigate = useNavigate();
  const { libros, coworking, loading } = useStore();

  const totalLibros = libros.length;
  const espaciosDisponibles = coworking.filter(s => !s.ocupado).length;

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 600); // ⏱️ delay en ms

      return () => clearTimeout(timer);
    }
  }, [loading]);

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

  return (
    <>

    
      <Header />

      <main className="dashboard-bento">
        {/* HERO */}
        <section className="bento-card bento-hero">
          <h1>Bienvenido a Nexus</h1>
          <p>
            Gestiona tu lectura, espacios de trabajo y actividad académica desde un solo lugar.
          </p>

          <div className="hero-stats">
            <div>
              <strong>{loading ? "…" : totalLibros}</strong>
              <span>Libros</span>
            </div>
            <div>
              <strong>{loading ? "…" : espaciosDisponibles}</strong>
              <span>Espacios libres</span>
            </div>
            <div>
              <strong>2026</strong>
              <span>Año fiscal</span>
            </div>
          </div>
        </section>

        {/* BIBLIOTECA */}
        <section
          className="bento-card bento-service"
          onClick={() => navigate("/library")}
        >
          <span className="bento-icon">📚</span>
          <h2>Librería</h2>
          <p>Explora, reserva y gestiona tus libros favoritos.</p>
        </section>

        {/* COWORKING */}
        <section
          className="bento-card bento-service"
          onClick={() => navigate("/coworking")}
        >
          <span className="bento-icon">🏢</span>
          <h2>Coworking</h2>
          <p>Reserva puestos, salas y espacios creativos.</p>
        </section>

        {/* PERFIL */}
        <section
          className="bento-card bento-service"
          onClick={() => navigate("/account")}
        >
          <span className="bento-icon">👤</span>
          <h2>Mi cuenta</h2>
          <p>Consulta préstamos, reservas y tu historial.</p>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default Dashboard;
