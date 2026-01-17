import { Link } from "react-router-dom";

function Footer() {
    return (
    <footer id="contacto" className="footer">
      <div className="footer-container">
        <section className="footer-column">
          <h2>Nexus Librería Universitaria</h2>
          <p>Calle Ejemplo 123, Aranjuez (Madrid)</p>
          <p>
            Tel: <a href="tel:+34600000000">+34 600 000 000</a>
          </p>
          <p>
            Email: <a href="mailto:info@nexuslibreria.es">info@nexuslibreria.es</a>
          </p>
        </section>

        <nav className="footer-column">
          <h2>Redes sociales</h2>
          <ul>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Facebook</a></li>
          </ul>
        </nav>

        <nav className="footer-column">
          <h2>Legal</h2>
          <ul>
            <li><a href="#">Aviso legal</a></li>
            <li><a href="#">Política de privacidad</a></li>
          </ul>
        </nav>
      </div>

      <p className="footer-copy">
        © 2025 Nexus Librería Universitaria. Todos los derechos reservados.
      </p>
    </footer>     
    );
}

export default Footer;