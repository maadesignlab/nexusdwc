import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Dashboard() {
  return (
    <>
    <Header />
    <section className="shortcuts">
      <h1>Accesos rápidos</h1>
    </section>
    <Footer />
    </>
  )
}

export default Dashboard;