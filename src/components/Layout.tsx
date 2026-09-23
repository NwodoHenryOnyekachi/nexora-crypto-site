import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from './Nav';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close the mobile drawer automatically whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <Nav onMenuClick={() => setMobileOpen(true)} />
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="app-main">
        {children}
        <Footer />
      </div>
    </>
  );
}
