import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AuthModal from './components/AuthModal';
import { AuthModalProvider } from './context/AuthModalContext';
import { AuthProvider } from './context/AuthContext';
import Landing from './pages/Landing';
import Markets from './pages/Markets';
import AssetDetail from './pages/AssetDetail';
import Dashboard from './pages/Dashboard';
import Trade from './pages/Trade';
import Wallet from './pages/Wallet';
import Stake from './pages/Stake';
import Portfolio from './pages/Portfolio';
import Transactions from './pages/Transactions';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Security from './pages/Security';
import Learn from './pages/Learn';
import Pricing from './pages/Pricing';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthModalProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/asset/:id" element={<AssetDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/trade" element={<Trade />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/stake" element={<Stake />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/security" element={<Security />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="*" element={<Landing />} />
            </Routes>
          </Layout>
          <AuthModal />
        </AuthModalProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
