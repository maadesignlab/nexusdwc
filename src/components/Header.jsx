import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Asegúrate que este sea el que tiene la lógica actualizada
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react"
import "../styles/Header.css";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart, increaseQty, decreaseQty } = useCart();

  const [openAccount, setOpenAccount] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const cartRef = useRef(null);
  const accountRef = useRef(null);

  // --- CAMBIO: Actualización de nombres de propiedades (cantidad y bookId) ---
  const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  const handleLogout = () => {
    logout();
    setOpenAccount(false);
    navigate("/home");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (openCart && cartRef.current && !cartRef.current.contains(e.target)) {
        setOpenCart(false);
      }
      if (openAccount && accountRef.current && !accountRef.current.contains(e.target)) {
        setOpenAccount(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openCart, openAccount]);

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/dashboard")} style={{ cursor: 'pointer' }}>
        <img src="/src/assets/nexus.svg" alt="" />
      </div>

      <nav className="desktop-nav">
        {!user && <Link to="/login">Login</Link>}

        {user && (
          <>
            <Link to="/library">Librería</Link>
            <Link to="/coworking">Coworking</Link>
            <Link to="/unavailable">Cafetería</Link>
            <Link to="/unavailable">Eventos</Link>

            {/* 🛒 Carrito */}
            <span className="cart-wrapper" ref={cartRef} style={{ position: 'relative' }}>
              <span
                className="cart-icon"
                role="button"
                tabIndex={0}
                onClick={() => setOpenCart(!openCart)}
                onKeyDown={(e) => e.key === "Enter" && setOpenCart(!openCart)}
              >
                Carrito
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </span>

              {openCart && (
                <div className="mini-cart">
                  {cart.length === 0 ? (
                    <p>Carrito vacío</p>
                  ) : (
                    <>
                      {cart.map((item) => (
                        /* --- CAMBIO: Usar bookId en lugar de id --- */
                        <div className="mini-cart-item" key={item.bookId}>
                          <div className="mini-cart-book-info">
                            <img src={`/${item.imagen}`} alt={item.titulo} />
                            <span className="mini-cart-title">{item.titulo}</span>
                          </div>
                          <div className="mini-qty">
                            {/* --- CAMBIO: Usar bookId y cantidad --- */}
                            <button onClick={() => decreaseQty(item.bookId)}>-</button>
                            <span>{item.cantidad}</span>
                            <button onClick={() => increaseQty(item.bookId)}>+</button>
                          </div>
                          {/* --- CAMBIO: Precio por cantidad --- */}
                          <span>${(item.precio * item.cantidad).toLocaleString()}</span>
                        </div>
                      ))}
                      <hr />
                      <div className="mini-cart-total">
                        <strong>Total: ${total.toLocaleString()}</strong>
                      </div>
                      <button 
                        className="btn-view-cart" 
                        onClick={() => { setOpenCart(false); navigate("/cart"); }}
                      >
                        Ver carrito completo
                      </button>
                    </>
                  )}
                </div>
              )}
            </span>

            {/* 👤 Cuenta de Usuario */}
            <div
              className="menu-item"
              ref={accountRef}
              style={{ position: 'relative' }}
            >
              <button
                className="user-label" 
                onClick={() => setOpenAccount(!openAccount)}
                style={{ cursor: 'pointer' }}
              >
                Hola, {user?.nombre}
              </button>

              {openAccount && (
                <ul className="submenu">
                  <li><Link to="/account" onClick={() => setOpenAccount(false)}>Mi cuenta</Link></li>
                  <li>
                    <button onClick={handleLogout} className="logout-btn">
                      <LogOut />
                      Salir
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;