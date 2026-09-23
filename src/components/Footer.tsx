import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Markets', to: '/markets' },
      { label: 'Trade', to: '/trade' },
      { label: 'Wallet', to: '/wallet' },
      { label: 'Stake', to: '/stake' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Learn', to: '/learn' },
      { label: 'Security', to: '/security' },
      { label: 'Pricing', to: '/pricing' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Portfolio', to: '/portfolio' },
      { label: 'Settings', to: '/settings' },
    ],
  },
];

const socials = [
  { label: 'X', href: 'https://x.com', icon: '𝕏' },
  { label: 'Telegram', href: 'https://t.me', icon: '✈' },
  { label: 'Discord', href: 'https://discord.com', icon: '◈' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #3b82f6, #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 12 }}>N</span>
            </div>
            <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 15, letterSpacing: '-0.03em' }}>NEXORA</span>
          </div>
          <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 20px', maxWidth: 260, lineHeight: 1.6 }}>
            Trade, stake, and grow your crypto portfolio — with monthly and annual earnings built in.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label={s.label}
                title={s.label}
              >
                <span style={{ fontSize: 15 }}>{s.icon}</span>
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
              {col.title}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.links.map((l) => (
                <Link key={l.label} to={l.to} style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 1100, margin: '32px auto 0', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <span style={{ fontSize: 12, color: '#475569' }}>© {new Date().getFullYear()} NEXORA. All rights reserved.</span>
        <span style={{ fontSize: 12, color: '#475569' }}>Not financial advice. Crypto investments carry risk.</span>
      </div>
    </footer>
  );
}
