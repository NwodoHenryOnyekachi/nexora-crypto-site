import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, KycStatus } from '../context/AuthContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const kycCopy: Record<KycStatus, { label: string; color: string; bg: string; border: string }> = {
  verified: { label: 'Verified', color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)' },
  pending: { label: 'Pending Review', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
  unverified: { label: 'Not Verified', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)' },
};

function Badge({ ok, label, tone }: { ok: boolean; label: string; tone: { color: string; bg: string; border: string } }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 100,
      fontSize: 12, fontWeight: 600, color: tone.color, background: tone.bg, border: `1px solid ${tone.border}`,
    }}>
      <span style={{ fontSize: 11 }}>{ok ? '✓' : '!'}</span> {label}
    </span>
  );
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user } = useAuth();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const kyc = kycCopy[user.kycStatus];

  return (
    <div
      onClick={onClose}
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
          width: '100%', maxWidth: 380,
          background: '#111318', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20, padding: '28px 28px 26px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
            {user.name[0]}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.02em' }}>{user.name}</div>
            <div style={{ fontSize: 12, color: '#64748b' }}>{user.plan}</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <div style={{ fontSize: 11, color: '#475569', marginBottom: 3 }}>Email</div>
              <div style={{ fontSize: 13, color: '#f1f5f9' }}>{user.email}</div>
            </div>
            <Badge ok={user.emailVerified} label={user.emailVerified ? 'Verified' : 'Unverified'} tone={user.emailVerified ? kycCopy.verified : kycCopy.unverified} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <div style={{ fontSize: 11, color: '#475569', marginBottom: 3 }}>Identity (KYC)</div>
              <div style={{ fontSize: 13, color: '#f1f5f9' }}>
                {user.kycStatus === 'verified' ? 'Government ID confirmed' : user.kycStatus === 'pending' ? 'Documents under review' : 'Verification required'}
              </div>
            </div>
            <Badge ok={user.kycStatus === 'verified'} label={kyc.label} tone={kyc} />
          </div>
        </div>

        {user.kycStatus !== 'verified' && (
          <div style={{ fontSize: 12, color: '#64748b', background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: 10, padding: '10px 12px', marginBottom: 18, lineHeight: 1.5 }}>
            Complete identity verification to unlock higher deposit and withdrawal limits.
          </div>
        )}

        <Link
          to="/settings"
          onClick={onClose}
          style={{
            display: 'block', textAlign: 'center', padding: '11px 0', borderRadius: 10, fontWeight: 600, fontSize: 13,
            textDecoration: 'none', color: '#fff', background: 'linear-gradient(135deg, #3b82f6, #818cf8)',
          }}
        >
          Manage in Settings
        </Link>
      </div>
    </div>
  );
}
