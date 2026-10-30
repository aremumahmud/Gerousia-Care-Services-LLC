import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import BackToTop from '../components/BackToTop.jsx';

export default function MainLayout() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
