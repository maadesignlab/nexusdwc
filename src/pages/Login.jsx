import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useStore } from "../context/StoreContext";
import { House } from "lucide-react"
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const { loadStoreData } = useStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // mock

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email);        // 🔐 AUTH REAL
      await loadStoreData();     // 🛒 TIENDA
      navigate("/dashboard");   // 🚀
    } catch (err) {
      console.error("LOGIN ERROR:", err);
    }
  };

  return (
    <section className="login">
      <div className="login-container">

        <button className="homebtn" onClick={() => navigate("/home")}>
          <House />
          Home
        </button>

        <div className="logo-login">
          <img src="/src/assets/nexus.svg" alt="Nexus" />
        </div>

        <h2>Iniciar sesión</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Usuario"
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
          </div>

          {error && <p className="error">{error}</p>}

          <div className="credentials">
            <p>Credenciales de acceso:</p>
            <p><strong>Usuario:</strong> stiven@gmail.com</p>
            <p><strong>Contraseña:</strong> 123456</p>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Autenticando..." : "Entrar"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
