import { createContext, useContext, useEffect, useState } from "react";
import { apiService } from "../api/apiService"; 

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    // 1. ESTADOS
    const [libros, setLibros] = useState([]); 
    const [catalogoCompleto, setCatalogoCompleto] = useState(() => {
        const saved = localStorage.getItem("libros_cache");
        return saved ? JSON.parse(saved) : [];
    });
    
    const [top10, setTop10] = useState([]);
    const [coworking, setCoworking] = useState(() => {
        const savedSpaces = localStorage.getItem("coworking_cache");
        return savedSpaces ? JSON.parse(savedSpaces) : [];
    });

    const [purchases, setPurchases] = useState([]); 
    const [loading, setLoading] = useState(false);
    
    // CAMBIO 1: Agregamos 'top' al estado inicial
    const [filtros, setFiltros] = useState({ categoria: "", tipo: "", año: "", top: "" });

    // 2. PERSISTENCIA EN LOCALSTORAGE
    useEffect(() => {
        if (catalogoCompleto.length > 0) {
            localStorage.setItem("libros_cache", JSON.stringify(catalogoCompleto));
        }
        if (coworking.length > 0) {
            localStorage.setItem("coworking_cache", JSON.stringify(coworking));
        }
    }, [catalogoCompleto, coworking]);

    // 3. HIDRATACIÓN INICIAL
    useEffect(() => {
        if (catalogoCompleto.length > 0) {
            setLibros(catalogoCompleto);
        }
    }, [catalogoCompleto]);

    // 4. LÓGICA DE FILTRADO (AQUÍ ESTÁ LA MAGIA)
    useEffect(() => {
        const cargaDatosFiltrados = async () => {
            
            // CASO A: SI EL FILTRO TOP 10 ESTÁ ACTIVO
            if (filtros.top === "top10") {
                // Usamos los datos que ya cargamos en loadStoreData (memoria), es instantáneo
                if (top10.length > 0) {
                    setLibros(top10);
                } else {
                    // Si por alguna razón no están, intentamos pedirlos (fallback)
                    setLoading(true);
                    try {
                        const data = await apiService.getTop10();
                        setLibros(data);
                    } catch (error) {
                        console.error("Error cargando Top 10 fallback", error);
                    } finally {
                        setLoading(false);
                    }
                }
                return; // IMPORTANTE: Detenemos aquí para no mezclar con filtros normales
            }

            // CASO B: FILTROS NORMALES (Categoría, Año, Tipo)
            // Creamos una copia de filtros sin la propiedad 'top' para verificar si hay otros activos
            const filtrosNormales = { ...filtros };
            delete filtrosNormales.top; 

            const hayFiltros = Object.values(filtrosNormales).some(val => val !== "");
            
            if (hayFiltros) {
                setLoading(true);
                try {
                    // Enviamos solo los filtros relevantes a la API
                    const data = await apiService.getLibrosFiltrados(filtrosNormales);
                    setLibros(Array.isArray(data) ? data : []); 
                } catch (error) {
                    console.error("Error al filtrar:", error);
                    setLibros([]); 
                } finally {
                    setLoading(false);
                }
            } else {
                // Si no hay filtros activos, mostramos todo el catálogo
                setLibros(catalogoCompleto);
            }
        };

        cargaDatosFiltrados();
    }, [filtros, catalogoCompleto, top10]); // Agregamos top10 a dependencias

    // 5. CARGA MASIVA
    const loadStoreData = async (userId = 1) => {
        setLoading(true);
        try {
            const [dataLibros, dataTop, dataSpaces, dataPurchases] = await Promise.allSettled([
                apiService.getProductos(),
                apiService.getTop10(),
                apiService.getCoworkingSpaces(),
                apiService.getPurchasedItems(userId)
            ]);

            if (dataLibros.status === 'fulfilled') {
                setLibros(dataLibros.value || []);
                setCatalogoCompleto(dataLibros.value || []);
            }
            if (dataTop.status === 'fulfilled') setTop10(dataTop.value || []);
            if (dataSpaces.status === 'fulfilled') setCoworking(dataSpaces.value || []);
            
            if (dataPurchases.status === 'fulfilled' && dataPurchases.value?.compras) {
                setPurchases(dataPurchases.value.compras);
            } else {
                setPurchases([]);
            }

        } catch (error) {
            console.error("Error crítico en loadStoreData:", error);
        } finally {
            setLoading(false);
        }
    };

    const aplicarFiltro = (nuevoFiltro) => {
        setFiltros(prev => ({ ...prev, ...nuevoFiltro }));
    };

    const limpiarFiltros = () => {
        // CAMBIO 2: Limpiamos también el top
        setFiltros({ categoria: "", tipo: "", año: "", top: "" });
    };

    return (
        <StoreContext.Provider value={{ 
            libros, 
            top10, 
            coworking,
            purchases,
            loading, 
            filtros,
            aplicarFiltro,
            limpiarFiltros,
            loadStoreData 
        }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);