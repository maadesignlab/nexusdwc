import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Unavailable.css";

function Unavailable() {
  return (
    <>
      <Header />

      <main className="unavailable-page-info">
        <section className="unavailable-card">
          <div className="unavailable-icon">🚧</div>

          <h1>Sección en construcción</h1>
          <p>
            Estamos trabajando para habilitar esta sección muy pronto.
            Queremos que la experiencia valga la espera.
          </p>

          <div className="unavailable-hint">
            Mientras tanto, puedes explorar otros servicios disponibles en Nexus.
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Unavailable;

