// src/hooks/useLoader.js
import { useState } from 'react';

/**
 * Hook para manejar estados de carga.
 * @param {boolean} initialState - Estado inicial (por defecto false).
 * @returns {Array} [isLoading, startLoading, stopLoading]
 */
export const useLoader = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);

  // Función para iniciar carga (opcionalmente por un tiempo fijo)
  const startLoading = (ms = 0) => {
    setIsLoading(true);
    if (ms > 0) {
      setTimeout(() => {
        setIsLoading(false);
      }, ms);
    }
  };

  const stopLoading = () => setIsLoading(false);

  return { isLoading, startLoading, stopLoading };
};