const features = [
  {
    title: 'Multi-layer Account Protection',
    desc: 'Your account is protected by AES-256 encryption at rest, TLS 1.3 in transit, and hardware-backed key storage. Every session is isolated and audited.',
    icon: '⬡',
    color: '#3b82f6',
    stats: ['AES-256', 'TLS 1.3', 'HSM Keys'],
  },
  {
    title: 'Two-Factor Authentication',
    desc: 'Enable TOTP-based 2FA via authenticator apps, hardware keys (YubiKey), or biometric verification. Phishing-resistant by design.',
    icon: '◈',
    color: '#818cf8',
    stats: ['TOTP', 'FIDO2', 'Biometric'],
  },
  {
    title: 'Device Verification',
    desc: 'New device sign-ins trigger real-time alerts and require explicit approval. Suspicious logins are blocked automatically.',
    icon: '◻',
    color: '#22c55e',
    stats: ['Device Registry', 'Geo-check', 'Instant Alerts'],
  },
  {
    title: 'Transaction Monitoring',
    desc: 'Every transaction is screened against anomaly detection models trained on millions of on-chain patterns. Unusual activity freezes transfers until you confirm.',
    icon: '∿',
    color: '#f97316',
    stats: ['ML Screening', 'Real-time', 'Auto-freeze'],
  },
  {
    title: 'Cold Storage',
    desc: '95% of user funds are held in geographically distributed cold storage wallets. Hot wallets never hold more than is required for liquidity.',
    icon: '◉',
    color: '#a78bfa',
    stats: ['95% Cold', 'Multi-sig', 'Geo-distributed'],
  },
  {
    title: 'Withdrawal Protection',
    desc: 'Configurable withdrawal limits, address whitelisting, and mandatory confirmation delays protect against unauthorized outflows.',
    icon: '⊙',
    color: '#ef4444',
    stats: ['Whitelist', 'Time-lock', 'Limits'],
  },
];

export default function Security() {
  return (
    <div style={{ background: '#0a0b0f', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '80px 24px 64px', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 28 }}>⬡</div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#f1f5f9', margin: '0 0 20px', lineHeight: 1.1 }}>
          Security is built into<br />every transaction.
        </h1>
        <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.65, maxWidth: 560, margin: '0 auto 40px' }}>
          NEXORA is built from the ground up with institutional-grade security. Your assets are protected at every layer — from login to withdrawal.
        </p>
        <div style={{ display: 'inline-flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[['SOC 2 Type II', '#22c55e'], ['ISO 27001', '#3b82f6'], ['PCI-DSS', '#818cf8']].map(([l, c]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: c as string }} />
              <span style={{ fontSize: 14, color: '#94a3b8', fontWeight: 500 }}>{l} Certified</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
          {features.map(f => (
            <div key={f.title} className="card" style={{ padding: 28, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: f.color + '08', pointerEvents: 'none' }} />
              <div style={{ width: 48, height: 48, borderRadius: 12, background: f.color + '15', border: `1px solid ${f.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16, color: f.color }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9', margin: '0 0 10px', letterSpacing: '-0.02em' }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65, margin: '0 0 16px' }}>{f.desc}</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {f.stats.map(s => (
                  <span key={s} style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 100, background: f.color + '15', color: f.color, letterSpacing: '0.02em' }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust banner */}
      <section style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '60px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: '#f1f5f9', margin: '0 0 16px', letterSpacing: '-0.03em' }}>$0 in security incidents since launch</h2>
          <p style={{ fontSize: 16, color: '#64748b', margin: '0 0 32px', lineHeight: 1.65 }}>Our security team runs 24/7 incident response and conducts quarterly independent penetration tests. No exploits. No breaches. No compromises.</p>
          <div style={{ display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[['24/7', 'Security monitoring'], ['100%', 'Incident response SLA'], ['$50M', 'Insurance coverage']].map(([v, l]) => (
              <div key={v} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 30, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.04em' }}>{v}</div>
                <div style={{ fontSize: 13, color: '#475569', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
