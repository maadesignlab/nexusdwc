import Header from "../components/Header";
import Footer from "../components/Footer";
import PaymentForm from "../components/Payment/PaymentForm";
import { useCart } from "../context/CartContext"; // 1. Importar el hook del carrito
import "../styles/payment.css";

function Payment() {
  // 2. Obtener el carrito del contexto global
  const { cart } = useCart();

  // 3. Calcular el total usando .reduce
  // Recorremos el carrito sumando (precio * cantidad) de cada libro
  const total = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  return (
    <div className="payment-page-layout">
      <Header />
      <main className="payment-container">
        <PaymentForm />
      </main>
      
      {/* Barra Sticky Inferior */}
      <div className="payment-confirmation">
        <div className="confirmation-content">
          <span className="total-text">TOTAL A PAGAR:</span>
          {/* 4. Mostrar el total formateado */}
          <span className="total-price">$ {total.toLocaleString()}</span>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Payment;