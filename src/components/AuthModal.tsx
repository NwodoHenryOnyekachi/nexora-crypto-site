import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthModal } from '../context/AuthModalContext';
import { useAuth } from '../context/AuthContext';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.95v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.95A9 9 0 0 0 0 9c0 1.45.35 2.83.95 4.03l3-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58A8.64 8.64 0 0 0 9 0 9 9 0 0 0 .95 4.97l3 2.33C4.66 5.17 6.65 3.58 9 3.58z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="#fff" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.15 9.53c-.02-2.06 1.68-3.05 1.76-3.1-.96-1.4-2.45-1.6-2.98-1.62-1.27-.13-2.48.75-3.12.75-.65 0-1.63-.73-2.68-.71-1.38.02-2.65.8-3.36 2.03-1.43 2.48-.37 6.16 1.03 8.18.68.99 1.5 2.1 2.57 2.06 1.03-.04 1.42-.66 2.67-.66 1.24 0 1.6.66 2.68.64 1.11-.02 1.81-1.01 2.49-2.01.78-1.15 1.11-2.27 1.13-2.33-.02-.01-2.17-.83-2.19-3.3z" />
      <path d="M11.13 3.4c.57-.7.96-1.66.85-2.63-.82.03-1.82.55-2.41 1.24-.53.61-.99 1.6-.86 2.54.92.07 1.86-.46 2.42-1.15z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="#fff" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.64 7.85 16.6 1h-1.41l-5.17 5.94L5.9 1H1l6.26 8.9L1 16.1h1.41l5.46-6.27 4.36 6.27H17l-6.36-9.15zM8.69 9.03l-.63-.9L3.03 2.04h2.17l4.06 5.79.63.9 5.28 7.53h-2.17L8.69 9.03z" />
    </svg>
  );
}

const socialButtonStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  padding: '11px 0',
  borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.04)',
  color: '#f1f5f9',
  fontSize: 13,
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'background-color 0.15s, border-color 0.15s',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.03)',
  color: '#f1f5f9',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
};

export default function AuthModal() {
  const { isOpen, mode, redirectTo, closeModal, setMode } = useAuthModal();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend is wired up yet — this simulates a successful auth
    // and sends the user wherever they were headed (dashboard by default).
    login();
    closeModal();
    setName('');
    setEmail('');
    setPassword('');
    navigate(redirectTo);
  };

  const handleSocial = (_provider: 'google' | 'apple' | 'x') => {
    login();
    closeModal();
    navigate(redirectTo);
  };

  return (
    <div
      onClick={closeModal}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(5,6,9,0.7)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 400,
          background: '#111318', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20, padding: '28px 28px 32px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        <button
          onClick={closeModal}
          aria-label="Close"
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 30, height: 30, borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)',
            color: '#94a3b8', fontSize: 15, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          ✕
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #3b82f6, #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 13 }}>N</span>
          </div>
          <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 16, letterSpacing: '-0.03em' }}>NEXORA</span>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 4, marginBottom: 22 }}>
          {(['login', 'register'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                flex: 1, padding: '8px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 600,
                background: mode === m ? 'rgba(59,130,246,0.15)' : 'transparent',
                color: mode === m ? '#f1f5f9' : '#64748b',
                transition: 'background-color 0.15s, color 0.15s',
              }}
            >
              {m === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        <h2 style={{ fontSize: 19, fontWeight: 700, color: '#f1f5f9', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h2>
        <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 20px' }}>
          {mode === 'login' ? 'Sign in to access your portfolio.' : 'Start investing with NEXORA in seconds.'}
        </p>

        {/* Social buttons */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          <button type="button" style={socialButtonStyle} onClick={() => handleSocial('google')} aria-label="Continue with Google">
            <GoogleIcon />
          </button>
          <button type="button" style={{ ...socialButtonStyle, background: '#000', borderColor: '#000' }} onClick={() => handleSocial('apple')} aria-label="Continue with Apple">
            <AppleIcon />
          </button>
          <button type="button" style={{ ...socialButtonStyle, background: '#000', borderColor: '#000' }} onClick={() => handleSocial('x')} aria-label="Continue with X">
            <XIcon />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '0 0 18px' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          <span style={{ fontSize: 12, color: '#475569' }}>or continue with email</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {mode === 'register' && (
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={inputStyle}
          />

          {mode === 'login' && (
            <div style={{ textAlign: 'right', marginTop: -6 }}>
              <button type="button" style={{ background: 'none', border: 'none', color: '#60a5fa', fontSize: 12, cursor: 'pointer', padding: 0 }}>
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            style={{
              marginTop: 6, padding: '12px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontWeight: 700, fontSize: 14, color: '#fff',
              background: 'linear-gradient(135deg, #3b82f6, #818cf8)',
              boxShadow: '0 0 30px rgba(59,130,246,0.25)',
            }}
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p style={{ fontSize: 12, color: '#475569', textAlign: 'center', marginTop: 18 }}>
          {mode === 'login' ? (
            <>Don't have an account?{' '}
              <button type="button" onClick={() => setMode('register')} style={{ background: 'none', border: 'none', color: '#60a5fa', fontSize: 12, cursor: 'pointer', padding: 0 }}>
                Create one
              </button>
            </>
          ) : (
            <>Already have an account?{' '}
              <button type="button" onClick={() => setMode('login')} style={{ background: 'none', border: 'none', color: '#60a5fa', fontSize: 12, cursor: 'pointer', padding: 0 }}>
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
