import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simular login exitoso
    login();
    navigate("/dashboard");
  };

  return (
    <section className="login">
      <div className="login-container">
        <h1>Iniciar sesión</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" id="email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" />
          </div>

          <button type="submit" className="btn-add">
            Entrar
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;