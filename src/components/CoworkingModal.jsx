import { Link } from 'react-router-dom';

function CoworkingModal({ space, onClose }) {
if (!space) return null;

return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2>{space.nombre}</h2>

        <ul>
          <li>Tipo: {space.tipo}</li>
          <li>Capacidad: {space.capacidad}</li>
          <li>Ubicación: {space.ubicacion}</li>
          <li>Estado: {space.estado}</li>
        </ul>
      </div>
    </div>
    );
}

export default CoworkingModal;