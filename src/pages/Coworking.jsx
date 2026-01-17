import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CoworkingModal from '../components/CoworkingModal';
import CoworkingSiteCard from '../components/CoworkingSiteCard';

function Coworking() {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    fetch("https://mock.apidog.com/m1/1129812-1121696-default/coworkingnew/spaces")
      .then(res => res.json())
      .then(data => setSpaces(data))
      .catch(err => console.error(err));
  }, []);

  const piso1 = spaces.filter(space => space.ubicacion === "piso 1");
  const piso2 = spaces.filter(space => space.ubicacion === "piso 2");

  const slotsPiso1 = [
    piso1[0],
    piso1[1]
  ];

  const slotsPiso2 = [
    piso2[0],
    piso2[1],
    piso2[2],
    piso2[3]
  ];

  const [selectedSpace, setSelectedSpace] = useState(null);

  // Abrir modal
  const openModal = (space) => {
    setSelectedSpace(space);
  };

  // Cerrar modal
  const closeModal = () => {
    setSelectedSpace(null);
  };


  return (
    <>
    <Header />

    <section className="coworking-container-main">
      <aside className="coworking-filtros">
        <h2>Filtros</h2>
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
            <CoworkingSiteCard space={slotsPiso1[1]} />
          </div>
        </div>
        <div className="floors piso2">
          <h3>Piso 2</h3>
          <div className="site-container site1">
            <CoworkingSiteCard space={slotsPiso2[0]} />
          </div>
          <div className="site-container site2">
            <CoworkingSiteCard space={slotsPiso2[1]} />
          </div>
          <div className="site-container site3">
            <CoworkingSiteCard space={slotsPiso2[2]} />
          </div>
          <div className="site-container site4">
            <CoworkingSiteCard space={slotsPiso2[3]} />
          </div>
        </div>
      </div>
    </section>
    {/* AGREGA ESTO AQUÍ: Renderizado condicional del modal */}
      {selectedSpace && (
        <CoworkingModal 
          space={selectedSpace} 
          onClose={closeModal} 
        />
      )}

    <Footer />
    </>
  );
}

export default Coworking;