import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1. HIDRATACIÓN: Al cargar la app, intentamos recuperar el carrito del almacenamiento local
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("nexus_cart");
    // Si existe, lo convertimos de texto a objeto, si no, inicializamos array vacío
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. PERSISTENCIA: Cada vez que el carrito cambie (añadir, quitar, cantidad), guardamos en LocalStorage
  useEffect(() => {
    localStorage.setItem("nexus_cart", JSON.stringify(cart));
  }, [cart]);

  // 3. AÑADIR AL CARRITO: Maneja productos nuevos o incrementa cantidad si ya existe
  const addToCart = (item, quantity = 1) => {
    setCart(prev => {
      // Usamos 'bookId' para coincidir con el ID de tu API
      const exists = prev.find(p => p.bookId === item.bookId);
      if (exists) {
        return prev.map(p =>
          p.bookId === item.bookId
            ? { ...p, cantidad: p.cantidad + quantity } 
            : p
        );
      }
      // Si es nuevo, lo agregamos con la propiedad 'cantidad'
      return [...prev, { ...item, cantidad: quantity }]; 
    });
  };

  // 4. INCREMENTAR: Función directa para el botón "+" del carrito
  const increaseQty = (bookId) => {
    setCart(prev =>
      prev.map(item =>
        item.bookId === bookId ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  // 5. DISMINUIR: Función para el botón "-", si llega a 0 se elimina automáticamente
  const decreaseQty = (bookId) => {
    setCart(prev =>
      prev
        .map(item =>
          item.bookId === bookId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter(item => item.cantidad > 0)
    );
  };

  // 6. ELIMINAR Y LIMPIAR: Para gestión manual o después de una compra exitosa
  const removeFromCart = (bookId) => {
    setCart(prev => prev.filter(item => item.bookId !== bookId));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

