import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/home.css";

function Home() {
  return (
  <>
    {/*Header*/}
    <Header />

    {/*Seccion CTA*/}
    <section className="hero">
      <div className="hero-content">
        <h1>Nexus: Tu espacio de aprendizaje y creación</h1>
        <p>Libros, coworking y experiencias en un solo lugar.</p>
        <a className="btn-add" href="#servicios">
          Explorar servicios
        </a>
      </div>
    </section>

    {/*Seccion servicios*/}
    <section id="servicios" className="services">
      <h2>Servicios Principales</h2>

      <div className="services-grid">
        <div className="service-card">
          <h3>Librería Universitaria</h3>
          <p>
            Material académico y literario para apoyar tu aprendizaje y proyectos.
          </p>
        </div>

        <div className="service-card">
          <h3>Espacios de Coworking</h3>
          <p>
            Áreas modernas y tranquilas para estudiar, crear y trabajar cómodamente.
          </p>
        </div>

        <div className="service-card">
          <h3>Eventos</h3>
          <p>
            Charlas, talleres y actividades que impulsan tu desarrollo y creatividad.
          </p>
        </div>
      </div>
    </section>

    {/*Footer*/}
    <Footer />
  </>
  );
}

export default Home;
