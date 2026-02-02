import React, { useEffect, useState } from "react";
import { useLoader } from "../../hooks/useLoader";
import { useCart } from "../../context/CartContext";
import "../../styles/paymentform.css";

export default function PaymentForm() {
  const [activeStep, setActiveStep] = useState(1);
  const [completed, setCompleted] = useState([]);
  
  // NUEVO: Inicializamos el hook
  const { isLoading, startLoading } = useLoader(false); 

  const { clearCart } = useCart();

  useEffect(() => {
    const element = document.querySelector(`[data-accordion="${activeStep}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeStep]);

  const nextStep = (e) => {
    e.stopPropagation();
    setCompleted((prev) => prev.includes(activeStep) ? prev : [...prev, activeStep]);
    if (activeStep < 3) setActiveStep(activeStep + 1);
  };

  const prevStep = (e) => {
    e.stopPropagation();
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  // NUEVO: Función para manejar el clic en Finalizar
  const handleFinalizar = () => {
    // 1. Iniciamos la carga por 2 segundos (simulando API)
    startLoading(2000);

    // 2. Esperamos a que termine para mostrar el mensaje
    setTimeout(() => {
        clearCart();
        alert("¡Pedido Confirmado Exitosamente!");
        window.location.href = "/dashboard";
    }, 2100);
  };

  const stepLabels = { 1: "Datos", 2: "Envío", 3: "Pago" };

  return (
    <div className="payment-view-wrapper" style={{ position: 'relative' }}>
      
      {/* NUEVO: Overlay del Loader */}
      {isLoading && (
        <div className="overlay-loader">
          <div className="spinner"></div>
          <p>Procesando tu pago...</p>
        </div>
      )}

      {/* STEPPER */}
      <div className="payment-stepper-container">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`step-node ${activeStep === s ? "active" : ""} ${completed.includes(s) ? "completed" : ""}`}
            onClick={() => !isLoading && setActiveStep(s)} // Bloqueamos cambio si carga
          >
            <div className="step-circle">
              {completed.includes(s) ? "✓" : s}
            </div>
            <span className="step-label">{stepLabels[s]}</span>
          </div>
        ))}
      </div>

      {/* STEPS */}
      <div className="steps-container">
        <Accordion id={1} title="1. Datos" active={activeStep} onOpen={setActiveStep}>
          <div className="form-group"><input type="text" placeholder="Nombre" /></div>
          <div className="form-group"><input type="text" placeholder="Apellido" /></div>
          <div className="form-actions">
            <button className="btn-nexus-next" onClick={nextStep}>Siguiente</button>
          </div>
        </Accordion>

        <Accordion id={2} title="2. Envío" active={activeStep} onOpen={setActiveStep}>
          <div className="form-group"><input type="text" placeholder="Dirección" /></div>
          <div className="form-actions">
            <button className="btn-nexus-prev" onClick={prevStep}>Atrás</button>
            <button className="btn-nexus-next" onClick={nextStep}>Siguiente</button>
          </div>
        </Accordion>

        <Accordion id={3} title="3. Pago" active={activeStep} onOpen={setActiveStep}>
          <p>Selecciona método...</p>
          <div className="form-actions">
            <button className="btn-nexus-prev" onClick={prevStep} disabled={isLoading}>Atrás</button>
            
            {/* NUEVO: Botón conectado al loader */}
            <button 
                className="btn-nexus-finish" 
                onClick={handleFinalizar}
                disabled={isLoading}
                style={{ opacity: isLoading ? 0.7 : 1 }}
            >
              {isLoading ? "Procesando..." : "Finalizar"}
            </button>
          </div>
        </Accordion>
      </div>
    </div>
  );
}

// ... El componente Accordion se queda igual ...
function Accordion({ id, title, active, children, onOpen }) {
  const isOpen = active === id;
  return (
    <div className={`nexus-step-card ${isOpen ? "is-open" : ""}`} data-accordion={id}>
      <div className="step-card-header" onClick={() => onOpen(id)}>
        <h3>{title}</h3>
      </div>
      {isOpen && <div className="step-content">{children}</div>}
    </div>
  );
}