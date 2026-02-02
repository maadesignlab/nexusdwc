import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { StoreProvider } from "./context/StoreContext";

function App() {
  return (

    <AuthProvider>  
      <BrowserRouter>
        <StoreProvider>
          <CartProvider>
            <AppRouter />
          </CartProvider>
        </StoreProvider>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
