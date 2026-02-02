import React from "react";
import "../../styles/HistoryItem.css";

function HistoryItem({ compra }) {
  // 1. Blindaje: Si por alguna razón 'compra' es undefined, no renderizamos nada.
  if (!compra) return null;

  // 2. Formateo de fecha (Ejemplo: 10 ene. 2025)
  const fechaFormateada = new Date(compra.fechaCompra).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <article className="history-item-card">
      {/* Imagen con fallback de Picsum basado en el bookId */}
      <div className="history-item-image">
        <img 
          src={compra.imagen} 
          alt={compra.titulo} 
          loading="lazy"
        />
      </div>

      <div className="history-item-content">
        <div className="history-item-header">
          <span className="purchase-badge">Completado</span>
          <span className="purchase-date">{fechaFormateada}</span>
        </div>
        
        <div className="history-item-body">
          <h3 className="history-item-title">{compra.titulo}</h3>
          <p className="history-item-id">Orden #{compra.purchaseId}</p>
        </div>
        
        <div className="history-item-footer">
          <div className="history-item-price">
            <span className="price-label">Precio total</span>
            <span className="price-value">${compra.precioPagado.toLocaleString()}</span>
          </div>
          <button className="btn-details" onClick={() => console.log("Ver detalle de:", compra.purchaseId)}>
            Ver detalles
          </button>
        </div>
      </div>
    </article>
  );
}

export default HistoryItem;