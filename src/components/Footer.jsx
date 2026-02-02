import "../styles/footer.css";

function Footer() {
  return (
    <footer id="contacto" className="footer">
      <div className="footer-container">
        
        {/* Caja 1: Eslogan y Logo */}
        <section className="footer-column">
          <div style={{ marginBottom: '20px' }}>
             {/* Logo Nexus */}
             <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>NEXUS</span>
          </div>
          <p>
            Nexus apoya a la comunidad universitaria con recursos digitales y espacios de coworking diseñados para el futuro.
          </p>
        </section>

        {/* Caja 2: Links Rápidos */}
        <nav className="footer-column">
          <h2>Producto</h2>
          <ul>
            <li><a href="/library">Librería</a></li>
            <li><a href="/coworking">Coworking</a></li>
            <li><a href="/cart">Carrito</a></li>
          </ul>
        </nav>

        {/* Caja 3: Soporte */}
        <nav className="footer-column">
          <h2>Contacto</h2>
          <ul>
            <li><a href="mailto:info@nexus.es">Soporte técnico</a></li>
            <li><a href="#">Privacidad</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </nav>

        {/* Caja 4: Badge Estilo UIcons */}
        <section className="footer-column" style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
          <h2 style={{ marginBottom: '10px' }}>Reconocimientos</h2>
          <div style={{ color: 'white', fontSize: '0.9rem', marginBottom: '15px' }}>
            Awwwards <span style={{ color: '#555' }}>Honors</span>
          </div>
          <div style={{
            background: '#000',
            border: '1px solid #333',
            padding: '8px 12px',
            borderRadius: '12px',
            fontSize: '0.7rem',
            width: '100%'
          }}>
            <span style={{ color: '#888' }}>FEATURED ON</span> <br/>
            <strong style={{ color: 'white' }}>PRODUCT HUNT</strong>
          </div>
        </section>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Nexus by Miguel Arias - Todos los derechos reservados.</p>
        <div className="footer-legal-links">
          <a href="#">License</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer> 
  );
}

export default Footer;