import { Link, useNavigate } from "react-router-dom";
import{ useAuth } from "../context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

    return (
    <header className="header">
      {/* Logo */}
      <div className="logo">NEXUS</div>

      {/* Navegación escritorio */}
      <nav className="desktop-nav">
        {!user && (
          <Link to="/login">Login</Link>
        )}

        {user && (
          <>
            <Link to="/library">Librería</Link>
            <Link to="/coworking">Coworking</Link>
            <Link to="/purchases">Compras</Link>
            <button onClick={handleLogout} className="logout-btn">
              Salir
            </button>
          </>
        )}
      </nav>
    </header>
    );
}

export default Header;