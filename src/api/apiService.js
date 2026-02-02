const BASE_URL = "https://mock.apidog.com/m1/1129812-1121696-default";

export const apiService = {
  // ---------- LOGIN ----------
  login: async (correo) => {
    const res = await fetch(
      `${BASE_URL}/login?correo=${encodeURIComponent(correo)}`
    );

    if (!res.ok) {
      throw new Error("Error de red");
    }

    const data = await res.json();

    // VALIDACIÓN
    if (!data || !data.id) {
      throw new Error("Usuario y/o contraseña incorrectos");
    }

    return data;
  },

  // ---------- TIENDA ----------
  getProductos: () =>
    fetch(`${BASE_URL}/itemslib`).then(r => r.json()),

  getLibrosFiltrados: (filtros = {}) => {
    const params = new URLSearchParams();
    Object.entries(filtros).forEach(([k, v]) => v && params.append(k, v));
    return fetch(`${BASE_URL}/itemslib?${params}`).then(r => r.json());
  },

  getLibroPorId: (id) =>
    fetch(`${BASE_URL}/itemslib/${id}`).then(r => r.json()),

  getTop10: () =>
    fetch(`${BASE_URL}/itemslib/top10?masVendido=true`).then(r => r.json()),

  getCoworkingSpaces: () =>
    fetch(`${BASE_URL}/coworkingnew/spaces`).then(r => r.json()),

  getCoworkingSpacesById: (id) =>
    fetch(`${BASE_URL}/coworkingnew/spaces/${id}`).then(r => r.json()),

  getPurchasedItems: (id) =>
    fetch(`${BASE_URL}/compras?userId=${id}`).then(r => {
      if (!r.ok) throw new Error("No se encontró historial");
      return r.json();
    })
};
