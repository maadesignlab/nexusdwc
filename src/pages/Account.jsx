import React, { useState, useEffect } from 'react';
import { useStore } from "../context/StoreContext";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import AccountSidebar from "../components/Account/AccountSidebar";
import HistoryItem from '../components/Account/HistoryItem'; 
import "../styles/account.css";

// Componente auxiliar para renderizar una reserva (Estilo Tarjeta)
const ReservationCard = ({ reserva }) => {
  return (
    <div className="history-card">
      <div className="card-info">
        <h4>{reserva.espacio}</h4>
        <span>Fecha: {reserva.fecha}</span>
        <span>Horario: 09:00 AM - 12:00 PM</span>
      </div>
      <div className="card-status">
        <span className={`tag-status ${reserva.estadoClass}`}>
          {reserva.estadoLabel}
        </span>
      </div>
    </div>
  );
};

function Account() {
  // 1. Contextos y Hooks
  const { coworking, libros, purchases, loading, loadStoreData } = useStore();
  const { user } = useAuth(); // Extraemos el usuario real y la función logout
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('perfil');

  // 3. Carga de datos del Store basada en el usuario real
  useEffect(() => {
    if (user && user.id) {
      // Asumiendo que tu objeto 'user' tiene una propiedad 'id' o 'usuarioId'
      loadStoreData(user.id); 
    } else {
      // Fallback por si no hay ID (o podrías no cargar nada)
      loadStoreData(1);
    }
  }, [user]); // Se ejecuta cuando el usuario cambia

  // 4. Mapeo de datos para la UI (Perfil)
  // Usamos optional chaining (?.) para evitar errores si user es null momentáneamente
  const userProfile = {
    nombre: user?.nombre || "Usuario Nexus",
    email: user?.correo || user?.email || "usuario@nexus.com.co",
    rol: user?.rol || "Miembro", // Si tu API devuelve el rol, úsalo aquí
    avatar: user?.avatar || "/img/avatar-default.png"
  };

  // 5. Datos Mock para Reservas
  const reservasMock = [
    { id: 1, espacio: "Sala de Juntas Axial", fecha: "29/01/2026", estadoLabel: "Confirmado", estadoClass: "done" },
    { id: 2, espacio: "Puesto Individual #02", fecha: "22/01/2026", estadoLabel: "Finalizado", estadoClass: "done" },
    { id: 3, espacio: "Sala Creativa B", fecha: "05/02/2026", estadoLabel: "Pendiente", estadoClass: "pending" }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'perfil':
        return (
          <div className="account-tab-content animate-fade">
            <section className="user-profile-hero">
              <div className="avatar-wrapper">
                <img src="https://placehold.net/avatar-4.svg" alt="User Avatar" />
              </div>
              <div className="user-details">
                {/* Aquí mostramos los datos reales del contexto */}
                <h1>{userProfile.nombre}</h1>
                <span className="badge-status">{userProfile.rol}</span>
                <p>{userProfile.email}</p>
              </div>
            </section>
            
            <div className="account-summary-grid">
              <div className="summary-card">
                <h4>Libro en Préstamo</h4>
                <p>{libros.length > 0 ? libros[0].titulo : "No tienes libros actualmente"}</p>
              </div>
              <div className="summary-card">
                <h4>Próximo Coworking</h4>
                <p>{coworking.find(s => s.ocupado)?.nombre || "Sin reservas activas"}</p>
              </div>
            </div>
          </div>
        );

      case 'historial-reservas':
        return (
          <div className="account-tab-content animate-fade">
            <div className="tab-header">
              <h2>Historial de Reservas</h2>
              <p>Gestión de tus espacios de coworking y salas.</p>
            </div>
            <div className="history-items-container">
              {reservasMock.length > 0 ? (
                reservasMock.map((reserva) => (
                  <ReservationCard key={reserva.id} reserva={reserva} />
                ))
              ) : (
                <div className="empty-history">
                  <p>No tienes reservas registradas aún.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'historial-compras':
        return (
          <div className="account-tab-content animate-fade">
            <div className="tab-header">
              <h2>Historial de Compras</h2>
              <p>Registro de tus adquisiciones y suscripciones.</p>
            </div>
            <div className="history-items-container">
              {loading ? (
                <div className="loading-placeholder">Cargando historial...</div>
              ) : purchases.length > 0 ? (
                purchases.map((compra) => (
                  <HistoryItem key={compra.purchaseId} compra={compra} />
                ))
              ) : (
                <div className="empty-history">
                  <p>No tienes compras registradas aún.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'preferencias':
        return (
          <div className="account-tab-content animate-fade">
            <div className="tab-header">
               <h2>Preferencias del Sistema</h2>
            </div>
            <div className="preferences-list">
              <div className="pref-item">
                <div className="pref-info">
                  <strong>Notificaciones</strong>
                  <p>Recibir alertas de mis reservas por email</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="pref-item">
                <div className="pref-info">
                  <strong>Idioma</strong>
                  <p>Selecciona tu idioma de preferencia</p>
                </div>
                <select className="nexus-select">
                  <option>Español (Colombia)</option>
                  <option>English</option>
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="nexus-main-layout">
      <Header />
      <div className="account-page-layout">
        <AccountSidebar 
          onTabChange={setActiveTab} 
          activeTab={activeTab}
        />
        <main className="account-main-viewport">
          {renderTabContent()}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Account;