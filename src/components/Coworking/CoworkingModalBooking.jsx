import React, { useState } from 'react';
import { useLoader } from "../../hooks/useLoader"
import '../../styles/coworkingmodalbooking.css';

/**
 * @param {Object} space - Objeto con la info del espacio seleccionado.
 * @param {Function} onClose - Función para cerrar el modal.
 * @param {String} selectedHour - Hora proveniente del CoworkingModal (ej: "17:00h").
 */
function BookingFlow({ space, onClose, selectedHour }) {
  // 1. DETERMINAR PASO INICIAL
  // Si ya seleccionó una hora en la vista anterior, saltamos al paso 2.
  const [step, setStep] = useState(selectedHour ? 2 : 1);

  // 2. ESTADO DE LA RESERVA
  const [bookingData, setBookingData] = useState({
    // Limpiamos la 'h' para que coincida con nuestro grid (ej: "17:00h" -> "17:00")
    hora: selectedHour ? selectedHour.replace('h', '') : '',
    celular: '',
    notas: ''
  });

  // 3. CONFIGURACIÓN DE HORARIOS
  const horariosDisponibles = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  // NUEVO: Inicializamos el hook
    const { isLoading, startLoading } = useLoader(false);

  // 4. VALIDACIÓN DE OCUPADOS
  // Importante: El array 'space.horariosOcupados' debe venir de tu API/Contexto
  const ocupados = space.horariosOcupados || [];

  const handleConfirm = () => {
    startLoading(2000);
    setTimeout(() => {
      console.log("Reserva Finalizada:", { space: space.nombre, ...bookingData });
      alert(`¡Reserva Exitosa en ${space.nombre} a las ${bookingData.hora}h!`);
      onClose();
      window.location.href = "/dashboard";
    }, 2100);


  };

  return (

    <div className="modal-overlay" onClick={onClose}>

      {/* NUEVO: Overlay del Loader */}
      {isLoading && (
        <div className="overlay-loader">
          <div className="spinner"></div>
          <p>Procesando tu reserva...</p>
        </div>
      )}

      <div className="modal-content booking-stepper" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar modal">×</button>
        
        {/* Indicador de progreso (Stepper) */}
        <div className="stepper-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`line ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`line ${step >= 3 ? 'active' : ''}`}></div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>

        {/* PASO 1: SELECCIÓN DE HORARIO */}
        {step === 1 && (
          <div className="step-content">
            <h2>Selecciona tu horario</h2>
            <p className="booking-target">Espacio: <strong>{space.nombre}</strong></p>
            
            <div className="schedule-grid">
              {horariosDisponibles.map(h => {
                const estaOcupado = ocupados.includes(h);
                return (
                  <button 
                    key={h} 
                    disabled={estaOcupado}
                    className={`time-slot ${bookingData.hora === h ? 'selected' : ''} ${estaOcupado ? 'disabled' : ''}`}
                    onClick={() => setBookingData({...bookingData, hora: h})}
                  >
                    {h}
                    {estaOcupado && <small className="status-tag">Ocupado</small>}
                  </button>
                );
              })}
            </div>
            
            <div className="step-actions">
              <button className="btn-back" onClick={onClose}>Cancelar</button>
              <button 
                className="btn-next" 
                disabled={!bookingData.hora} 
                onClick={() => setStep(2)}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* PASO 2: DATOS DE CONTACTO */}
        {step === 2 && (
          <div className="step-content">
            <h2>Detalles de contacto</h2>
            <p>Horario elegido: <strong>{bookingData.hora}h</strong></p>
            
            <div className="form-group">
              <label htmlFor="celular">Número celular alternativo</label>
              <input 
                type="tel"
                id="celular"
                placeholder="Ej: 3001234567"
                value={bookingData.celular}
                onChange={(e) => setBookingData({...bookingData, celular: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label htmlFor="notas">¿Alguna necesidad especial?</label>
              <textarea 
                id="notas"
                placeholder="Ej: Tablero, monitor extra, acceso para silla de ruedas..."
                value={bookingData.notas}
                onChange={(e) => setBookingData({...bookingData, notas: e.target.value})}
              />
            </div>
            
            <div className="step-actions">
              <button className="btn-back" onClick={() => setStep(1)}>Atrás</button>
              <button className="btn-next" disabled={!bookingData.celular} onClick={() => setStep(3)}>
                Revisar
              </button>
            </div>
          </div>
        )}

        {/* PASO 3: CONFIRMACIÓN FINAL */}
        {step === 3 && (
          <div className="step-content confirmation">
            <h2>Revisa tu reserva</h2>
            <div className="summary-card">
              <p><strong>Ubicación:</strong> {space.ubicacion}</p>
              <p><strong>Espacio:</strong> {space.nombre}</p>
              <p><strong>Hora:</strong> {bookingData.hora}h</p>
              <p><strong>Contacto:</strong> {bookingData.celular}</p>
              <p><strong>Notas:</strong> {bookingData.notas || 'Ninguna'}</p>
            </div>
            <p className="policy-text">Al confirmar, aceptas las normas de Nexus.</p>
            <div className="step-actions">
              <button className="btn-back" onClick={() => setStep(2)}>Atrás</button>
              <button className="btn-confirm" onClick={handleConfirm}>
                Confirmar Reserva
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingFlow;