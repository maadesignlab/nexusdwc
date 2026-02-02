import "../../styles/coworkingmodal.css";

function CoworkingModal({ space, onClose, onStartBooking }) {
  // 1. Validación de seguridad: si no hay espacio, no renderiza nada
  if (!space) return null;

  // 2. Estado de ocupación actual (proviene de tu StoreContext)
  const isOccupiedNow = space.ocupado;

  // 3. Horarios sugeridos para la vista rápida
  const horariosHoy = ["12:00h", "13:00h", "17:00h"];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Botón para cerrar el modal informativo */}
        <button className="modal-close" onClick={onClose} aria-label="Cerrar modal">
          ×
        </button>
        
        <h2 id="modal-title">{space.nombre}</h2>
        
        <div className="modal-info-space">
          <ul className="modal-info-list">
            <li><strong>Tipo:</strong> {space.tipo}</li>
            <li><strong>Capacidad:</strong> {space.capacidad} personas</li>
            <li><strong>Ubicación:</strong> {space.ubicacion}</li>
            <li>
              <strong>Estado Actual:</strong> 
              <span className={isOccupiedNow ? "status-occupied" : "status-available"}>
                {isOccupiedNow ? " Ocupado ahora" : " Disponible"}
              </span>
            </li>
          </ul>
        </div>

        <div className="modal-space-schedule">
          <h3>Próximos horarios disponibles</h3>
          
          <div className="schedule-container">
            <h4>Hoy</h4>
            {horariosHoy.map((hora) => {
              /** * REGLA DE NEGOCIO: 
               * El horario de las 17:00h siempre está habilitado para reserva futura.
               * Los demás dependen de la ocupación actual del espacio.
               */
              const isSlotAvailable = hora === "17:00h" || !isOccupiedNow;

              return (
                <div className="schedule-item" key={hora}>
                  <p>{hora}</p>
                  <button 
                    className={`schedule-buttons ${isSlotAvailable ? 'btn-active' : 'btn-disabled'}`}
                    disabled={!isSlotAvailable}
                    // IMPORTANTE: Al hacer clic, enviamos la hora para saltar al paso 2 del BookingFlow
                    onClick={() => onStartBooking(hora)} 
                  >
                    {isSlotAvailable ? "Reservar" : "Bloqueado"}
                  </button>
                </div>
              );
            })}
          </div>
          
          {/* Opción para abrir el calendario completo (Paso 1 del BookingFlow) */}
          <div className="schedule-buttons-footer">
            <button 
              onClick={() => onStartBooking(null)} 
              className="btn-active-footer"
            >
              Reservar en otro horario o fecha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoworkingModal;