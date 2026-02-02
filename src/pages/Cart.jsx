import Footer from "../components/Footer";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../styles/cart.css";

function Cart() {
  // Extraemos las funciones y el estado del context actualizado
  const { cart, increaseQty, decreaseQty } = useCart();

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <section className="cart empty">
          <h2>Tu carrito está vacío</h2>
          <Link to="/library">Explorar librería</Link>
        </section>
        <Footer />
      </>
    );
  }

  // CAMBIO: Usamos item.precio e item.cantidad para el cálculo del total
  const total = cart.reduce(
    (acc, item) => acc + (item.precio * item.cantidad),
    0
  );

  return (
    <>
      <Header />

      <section className="cart">
        <h1>Carrito</h1>

        <ul className="cart-list">
          {cart.map(item => (
            /* CAMBIO: Usamos bookId como key */
            <li key={item.bookId} className="cart-item">
              <div className="cart-info">
                <img src={`/${item.imagen}`} alt={item.titulo} />
                <div className="item-details">
                  <strong>{item.titulo}</strong>
                  <span className="author">{item.autor}</span>
                  {/* CAMBIO: .toLocaleString() para formato de moneda profesional */}
                  <strong>${item.precio.toLocaleString()}</strong>
                </div>
              </div>

              <div className="cart-qty">
                {/* CAMBIO: Pasamos bookId a las funciones de control */}
                <button onClick={() => decreaseQty(item.bookId)}>-</button>
                <span>{item.cantidad}</span>
                <button onClick={() => increaseQty(item.bookId)}>+</button>
              </div>

              <span className="cart-subtotal">
                {/* CAMBIO: precio * cantidad */}
                ${(item.precio * item.cantidad).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>

        <footer className="cart-footer">
          <strong>Total: ${total.toLocaleString()}</strong>

          <button className="btn-primary">
            <Link to="/payment">Finalizar compra</Link>
          </button>
        </footer>
      </section>

      <Footer />
    </>
  );
}

export default Cart;