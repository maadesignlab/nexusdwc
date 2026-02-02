import { useStore } from "../../context/StoreContext";
import "../../styles/libraryFilters.css";

function SidebarFilters() {
  const { aplicarFiltro, limpiarFiltros, filtros } = useStore();

  const categorias = ["Drama", "Ficción", "Clásico", "Economía", "Arte y Cultura", "Estilo de vida"];
  const años = ["2002", "2006", "2023", "2024"];

  // Función auxiliar para categorías y tipos (mantiene la lógica de toggle)
  const toggleFiltro = (key, value) => {
    aplicarFiltro({
      [key]: filtros[key] === value ? "" : value,
      top: "" // Si selecciono una categoría, desactivo el Top 10 automáticamente
    });
  };

  return (
    <aside className="sidebar-filters">
      <h3 className="sidebar-title">Filtros</h3>

      {/* --- Top 10 --- */}
      <div className="filter-group">
        <h4>Destacados</h4>
        <button
          className={`filter-btn ${filtros.top === "top10" ? "active" : ""}`}
          onClick={() =>
            aplicarFiltro({
              // Toggle del Top 10
              top: filtros.top === "top10" ? "" : "top10",
              // Al activar Top 10, limpiamos los otros para evitar conflictos
              categoria: "",
              año: "",
              tipo: ""
            })
          }
        >
          🔥 Top 10 más vendidos
        </button>
      </div>

      {/* --- Categoría --- */}
      <div className="filter-group">
        <h4>Categoría</h4>
        <div className="filter-options">
          {categorias.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filtros.categoria === cat ? "active" : ""}`}
              onClick={() => toggleFiltro("categoria", cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- Tipo --- */}
      <div className="filter-group">
        <h4>Tipo</h4>
        <div className="filter-options-row">
          <button
            className={`filter-btn ${filtros.tipo === "libro" ? "active" : ""}`}
            onClick={() => toggleFiltro("tipo", "libro")}
          >
            Libros
          </button>

          <button
            className={`filter-btn ${filtros.tipo === "revista" ? "active" : ""}`}
            onClick={() => toggleFiltro("tipo", "revista")}
          >
            Revistas
          </button>
        </div>
      </div>

      {/* --- Año --- */}
      <div className="filter-group">
        <h4>Año de publicación</h4>
        <div className="select-wrapper">
          <select
            className="filter-select"
            value={filtros.año}
            onChange={(e) =>
              aplicarFiltro({
                año: filtros.año === e.target.value ? "" : e.target.value,
                top: "" // Al cambiar año, desactivamos Top 10
              })
            }
          >
            <option value="">Todos los años</option>
            {años.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>

      <button className="btn-reset" onClick={limpiarFiltros}>
        Limpiar filtros
      </button>
    </aside>
  );
}

export default SidebarFilters;
