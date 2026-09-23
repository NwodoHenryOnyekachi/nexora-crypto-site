import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [twoFA, setTwoFA] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const Toggle = ({ on, onClick }: { on: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      style={{
        width: 42, height: 24, borderRadius: 100, border: 'none', cursor: 'pointer', position: 'relative',
        background: on ? '#3b82f6' : 'rgba(255,255,255,0.1)', transition: 'background-color 0.15s', flexShrink: 0,
      }}
    >
      <span style={{
        position: 'absolute', top: 3, left: on ? 21 : 3, width: 18, height: 18, borderRadius: '50%',
        background: '#fff', transition: 'left 0.15s',
      }} />
    </button>
  );

  return (
    <div className="page-pad">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#f1f5f9', margin: '0 0 4px', letterSpacing: '-0.03em' }}>Settings</h1>
        <p style={{ fontSize: 14, color: '#475569', margin: 0 }}>Manage your profile, security, and notification preferences.</p>
      </div>

      <div className="grid-2" style={{ marginBottom: 20 }}>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9', marginBottom: 16 }}>Profile</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, color: '#475569', marginBottom: 6 }}>Full name</div>
              <input defaultValue="Stephen W." style={{ width: '100%', padding: '10px 12px', background: '#0a0b0f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#f1f5f9', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#475569', marginBottom: 6 }}>Email address</div>
              <input defaultValue="stephen@nexora.io" style={{ width: '100%', padding: '10px 12px', background: '#0a0b0f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#f1f5f9', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <button style={{ alignSelf: 'flex-start', marginTop: 4, padding: '10px 20px', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', border: 'none', color: '#fff', background: 'linear-gradient(135deg, #3b82f6, #818cf8)' }}>
              Save Changes
            </button>
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9', marginBottom: 16 }}>Security</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#f1f5f9' }}>Two-factor authentication</div>
                <div style={{ fontSize: 12, color: '#475569' }}>Extra layer of protection at sign-in.</div>
              </div>
              <Toggle on={twoFA} onClick={() => setTwoFA((v) => !v)} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#f1f5f9' }}>Email alerts</div>
                <div style={{ fontSize: 12, color: '#475569' }}>Get notified of new sign-ins.</div>
              </div>
              <Toggle on={emailAlerts} onClick={() => setEmailAlerts((v) => !v)} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#f1f5f9' }}>Price alerts</div>
                <div style={{ fontSize: 12, color: '#475569' }}>Notify me on big market moves.</div>
              </div>
              <Toggle on={priceAlerts} onClick={() => setPriceAlerts((v) => !v)} />
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9' }}>Sign out of NEXORA</div>
          <div style={{ fontSize: 12, color: '#475569' }}>You'll need to sign in again to access your account.</div>
        </div>
        <button
          onClick={handleLogout}
          style={{ padding: '10px 22px', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', border: '1px solid rgba(239,68,68,0.25)', background: 'rgba(239,68,68,0.08)', color: '#f87171' }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
