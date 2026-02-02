import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, CalendarDays, ShoppingBag, Settings, LogOut } from 'lucide-react';

function AccountSidebar({ onTabChange, activeTab }) {
  
  const menuItems = [
    { id: 'perfil', label: 'Mi Perfil', icon: <User size={18} /> },
    { id: 'divisor', label: 'ACTIVIDAD', isTitle: true }, // Separador visual
    { id: 'historial-reservas', label: 'Mis Reservas', icon: <CalendarDays size={18} /> },
    { id: 'historial-compras', label: 'Mis Compras', icon: <ShoppingBag size={18} /> },
    { id: 'divisor-2', label: 'AJUSTES', isTitle: true },
    { id: 'preferencias', label: 'Preferencias', icon: <Settings size={18} /> }
  ];

    // 2. Manejo de Cierre de Sesión
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  return (
    <aside className="account-nav-sidebar">
      <div className="sidebar-top">
        <nav className="sidebar-menu">
          {menuItems.map((item, index) => {
            if (item.isTitle) {
              return <p key={index} className="sidebar-section-title">{item.label}</p>;
            }
            return (
              <button 
                key={item.id}
                className={`nav-button ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => onTabChange(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <button className="nav-button logout" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Salir</span>
        </button>
      </div>
    </aside>
  );
}

export default AccountSidebar;