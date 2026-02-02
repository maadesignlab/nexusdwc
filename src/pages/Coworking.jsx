import { useState } from 'react';
import { useStore } from '../context/StoreContext'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import CoworkingModal from '../components/Coworking/CoworkingModal.jsx';
import CoworkingSiteCard from '../components/Coworking/CoworkingSiteCard.jsx';
import BookingFlow from '../components/Coworking/CoworkingModalBooking.jsx';
import "../styles/coworking.css";

function Coworking() {
  // Espacios que ya cargó el StoreContext al inicio
  const { coworking: spaces } = useStore(); 

  // Lógica de filtrado por pisos
  const piso1 = spaces.filter(space => space.ubicacion === "piso 1");
  const piso2 = spaces.filter(space => space.ubicacion === "piso 2");

  // Slots
  const slotsPiso1 = [piso1[0], piso1[1]];
  const slotsPiso2 = [piso2[0], piso2[1], piso2[2], piso2[3]];

  const [selectedSpace, setSelectedSpace] = useState(null);
  const [isBooking, setIsBooking] = useState(false); // Controla si estamos en info o en reserva

  const openModal = (space) => {
    setSelectedSpace(space);
  };

  const closeModal = () => {
    setSelectedSpace(null);
    setIsBooking(false);
  };

  return (
    <>
      <Header />
      <main className="coworking-main">
        <section className="coworking-container-main">

          <aside className="aside-cards">
            <div className="aside-card recomendations">
              <div className="spaces-stats">
                <div className="stat-item">
                  <h4>Espacios totales</h4>
                  <h2>{spaces.length}</h2>
                </div>
                <div className="stat-item">
                  <h4>Espacios disponibles</h4>
                  <h2>{spaces.filter(s => s.estado === "disponible").length}</h2>
                </div>
                <div className="stat-item">
                  <h4>Espacios ocupados</h4>
                  <h2>{spaces.filter(s => s.estado === "ocupado").length}</h2>
                </div>
              </div>
            </div>
          </aside>

          <div className="coworking-sites">
            <h1>Espacios de Coworking</h1>
            
            <div className="floors piso1">
              <h3>Piso 1</h3>
              <div className="site-container site1">
                <CoworkingSiteCard 
                  space={slotsPiso1[0]} 
                  onClick={() => openModal(slotsPiso1[0])}
                />
              </div>
              <div className="site-container site2">
                <CoworkingSiteCard 
                  space={slotsPiso1[1]} 
                  onClick={() => openModal(slotsPiso1[1])}
                />
              </div>
            </div>

            <div className="floors piso2">
              <h3>Piso 2</h3>
              <div className="site-container site1">
                <CoworkingSiteCard space={slotsPiso2[0]} onClick={() => openModal(slotsPiso2[0])} />
              </div>
              <div className="site-container site2">
                <CoworkingSiteCard space={slotsPiso2[1]} onClick={() => openModal(slotsPiso2[1])} />
              </div>
              <div className="site-container site3">
                <CoworkingSiteCard space={slotsPiso2[2]} onClick={() => openModal(slotsPiso2[2])} />
              </div>
              <div className="site-container site4">
                <CoworkingSiteCard space={slotsPiso2[3]} onClick={() => openModal(slotsPiso2[3])} />
              </div>
            </div>
          </div>
        </section>
      </main>

      {selectedSpace && (
        !isBooking ? (
          <CoworkingModal 
            space={selectedSpace} 
            onClose={closeModal} 
            onStartBooking={() => setIsBooking(true)} 
          />
        ) : (
          <BookingFlow 
            space={selectedSpace} 
            onClose={closeModal} 
          />
        )
      )}

      <Footer />
    </>
  );
}

export default Coworking;