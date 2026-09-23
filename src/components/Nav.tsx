import { Link, useNavigate } from 'react-router-dom';
import { useAuthModal } from '../context/AuthModalContext';
import { useAuth } from '../context/AuthContext';

interface NavProps {
  onMenuClick: () => void;
}

export default function Nav({ onMenuClick }: NavProps) {
  const { openModal } = useAuthModal();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleDeposit = () => {
    if (isLoggedIn) navigate('/wallet');
    else openModal('login', '/wallet');
  };

  return (
    <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,11,15,0.9)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 80, height: 64 }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 16px', height: 64, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={onMenuClick}
          className="mobile-menu-btn"
          aria-label="Open menu"
          style={{
            width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)', color: '#f1f5f9', cursor: 'pointer',
            alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0,
          }}
        >
          ☰
        </button>

        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #3b82f6, #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>N</span>
          </div>
          <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 18, letterSpacing: '-0.03em' }}>NEXORA</span>
        </Link>

        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto', alignItems: 'center' }}>
          <button onClick={() => openModal('login')} style={{
            padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500,
            color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent',
            cursor: 'pointer', whiteSpace: 'nowrap',
          }}>Sign In</button>
          <button onClick={handleDeposit} style={{
            padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #3b82f6, #818cf8)', color: '#fff', whiteSpace: 'nowrap',
          }}>Deposit</button>
        </div>
      </div>
    </nav>
  );
}
