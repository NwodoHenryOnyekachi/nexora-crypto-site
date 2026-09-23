// import { Link, useNavigate } from 'react-router-dom';
// import { useAuthModal } from '../context/AuthModalContext';
// import { useAuth } from '../context/AuthContext';

// interface NavProps {
//   onMenuClick: () => void;
// }

// export default function Nav({ onMenuClick }: NavProps) {
//   const { openModal } = useAuthModal();
//   const { isLoggedIn } = useAuth();
//   const navigate = useNavigate();

//   const handleDeposit = () => {
//     if (isLoggedIn) navigate('/wallet');
//     else openModal('login', '/wallet');
//   };

//   return (
//         <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,11,15,0.9)', backdropFilter: 'blur(20px)', position: 'fixed', top: 0, left: 0, right: 0, width: '100%', zIndex: 9999, height: 64 }}>
//       <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 16px', height: 64, display: 'flex', alignItems: 'center', gap: 12 }}>
//         <button
//           onClick={onMenuClick}
//           className="mobile-menu-btn"
//           aria-label="Open menu"
//           style={{
//             width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)',
//             background: 'rgba(255,255,255,0.03)', color: '#f1f5f9', cursor: 'pointer',
//             alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0,
//           }}
//         >
//           ☰
//         </button>

//         <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
//           <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #3b82f6, #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//             <span style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>N</span>
//           </div>
//           <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 18, letterSpacing: '-0.03em' }}>NEXORA</span>
//         </Link>

//         <div style={{ display: 'flex', gap: 8, marginLeft: 'auto', alignItems: 'center' }}>
//           <button onClick={() => openModal('login')} style={{
//             padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500,
//             color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent',
//             cursor: 'pointer', whiteSpace: 'nowrap',
//           }}>Sign In</button>
//           <button onClick={handleDeposit} style={{
//             padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
//             background: 'linear-gradient(135deg, #3b82f6, #818cf8)', color: '#fff', whiteSpace: 'nowrap',
//           }}>Deposit</button>
//         </div>
//       </div>
//     </nav>
//   );
// }



import { Link, useNavigate } from 'react-router-dom';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { generateChartData } from '../data/crypto';
import { useAuthModal } from '../context/AuthModalContext';
import { useAuth } from '../context/AuthContext';

const miniChart = generateChartData(14, 67000, 0.04);

const stats = [
  { value: '$2.8B+', label: 'Assets Tracked' },
  { value: '180K+', label: 'Users' },
  { value: '99.99%', label: 'Platform Uptime' },
  { value: '120+', label: 'Assets' },
];

const features = [
  { title: 'Real-time Portfolio Intelligence', desc: 'Live updates across all your digital assets with unified performance analytics and intelligent alerts.', icon: '◈' },
  { title: 'Institutional-grade Security', desc: 'Multi-sig wallets, 2FA, device management, and real-time transaction monitoring protect every interaction.', icon: '⬡' },
  { title: 'Cross-asset Trading', desc: 'Execute trades across 120+ assets with deep liquidity, transparent fees, and instant settlement.', icon: '⇄' },
  { title: 'Tax & Reporting Tools', desc: 'Automated cost-basis tracking, realized/unrealized gain reports, and exportable transaction history.', icon: '≡' },
  { title: 'Smart Alerts', desc: 'Price movement triggers, unusual activity detection, and portfolio milestone notifications.', icon: '∿' },
  { title: 'API Access', desc: 'Full REST and WebSocket API for developers building on top of NEXORA infrastructure.', icon: '⊙' },
];

export default function Landing() {
  const { openModal } = useAuthModal();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleDeposit = () => {
    if (isLoggedIn) navigate('/wallet');
    else openModal('login', '/wallet');
  };

  return (
    <div style={{ background: '#0a0b0f', minHeight: '100vh', paddingTop: 64 }}>
      {/* Hero */}
      <section style={{ maxWidth: 1440, margin: '0 auto', padding: '40px 16px 80px' }}>
        <div className="hero-grid">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 100, padding: '6px 14px', marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }} />
              <span style={{ fontSize: 13, color: '#60a5fa', fontWeight: 500 }}>Now in public beta — join 180,000 investors</span>
            </div>
            <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.04em', color: '#f1f5f9', margin: '0 0 20px' }}>
              Crypto investing,<br />
              <span className="gradient-text">made intelligently.</span>
            </h1>
            <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.65, margin: '0 0 36px', maxWidth: 480 }}>
              Track, manage, and grow your digital assets from one secure platform built for clarity.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={handleDeposit} style={{
                padding: '14px 28px', borderRadius: 10, fontWeight: 600, fontSize: 15, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #3b82f6, #818cf8)', color: '#fff',
                boxShadow: '0 0 40px rgba(59,130,246,0.3)'
              }}>Deposit</button>
              <Link to="/markets" style={{
                padding: '14px 28px', borderRadius: 10, fontWeight: 500, fontSize: 15, textDecoration: 'none',
                color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)',
              }}>Explore Markets →</Link>
            </div>
          </div>

          {/* Dashboard preview */}
          <div style={{ position: 'relative', marginTop: 32 }}>
            <div style={{
              position: 'absolute', inset: -60, background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.15) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
            <div style={{
              background: '#111318', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20,
              padding: 24, boxShadow: '0 40px 100px rgba(0,0,0,0.6)', position: 'relative'
            }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: '#475569', marginBottom: 4 }}>Total Portfolio Value</div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.03em' }}>$84,250.42</div>
                <div style={{ fontSize: 14, color: '#22c55e', fontWeight: 500, marginTop: 2 }}>+$1,284.16 · +1.55% today</div>
              </div>

              <div style={{ height: 80, marginBottom: 20 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={miniChart}>
                    <defs>
                      <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} fill="url(#grad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {[
                  { sym: 'BTC', price: '$67,842', change: '+1.23%', color: '#f97316' },
                  { sym: 'ETH', price: '$3,481', change: '-0.87%', color: '#818cf8' },
                  { sym: 'NXR', price: '$4.28', change: '+8.42%', color: '#3b82f6' },
                  { sym: 'SOL', price: '$182.44', change: '+3.14%', color: '#22c55e' },
                ].map(a => (
                  <div key={a.sym} style={{ background: '#181a22', borderRadius: 10, padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: a.color + '30', border: `1px solid ${a.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color: a.color }}>{a.sym[0]}</span>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8' }}>{a.sym}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#f1f5f9' }}>{a.price}</div>
                      <div style={{ fontSize: 11, color: a.change.startsWith('+') ? '#22c55e' : '#ef4444' }}>{a.change}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 12, padding: '10px 12px', background: '#181a22', borderRadius: 10 }}>
                <div style={{ fontSize: 11, color: '#475569', marginBottom: 6 }}>Recent Activity</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 500 }}>Bought BTC</span>
                    <span style={{ fontSize: 12, color: '#475569' }}> · 0.05 BTC</span>
                  </div>
                  <span style={{ fontSize: 12, color: '#f1f5f9', fontWeight: 500 }}>$3,392</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '48px 16px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ fontSize: 13, color: '#475569', textAlign: 'center', marginBottom: 16, width: '100%' }}>Trusted by modern digital investors</div>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.04em', color: '#f1f5f9' }}>{s.value}</div>
              <div style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ maxWidth: 1440, margin: '0 auto', padding: '100px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 42, fontWeight: 800, letterSpacing: '-0.04em', color: '#f1f5f9', margin: '0 0 16px' }}>
            Everything your portfolio needs
          </h2>
          <p style={{ fontSize: 17, color: '#64748b', maxWidth: 480, margin: '0 auto' }}>
            Purpose-built tools for the modern digital asset investor — from day one to institutional scale.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {features.map(f => (
            <div key={f.title} className="card card-hover" style={{ padding: 28 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 16, color: '#60a5fa' }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#f1f5f9', margin: '0 0 10px', letterSpacing: '-0.02em' }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1440, margin: '0 auto', padding: '0 16px 120px' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(129,140,248,0.1))', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 24, padding: '72px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#f1f5f9', margin: '0 0 16px' }}>
            Your assets. Your future.<br />One intelligent platform.
          </h2>
          <p style={{ fontSize: 17, color: '#94a3b8', marginBottom: 36 }}>Join 180,000 investors already on NEXORA.</p>
          <button onClick={() => openModal('register')} style={{
            padding: '16px 36px', borderRadius: 10, fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #3b82f6, #818cf8)', color: '#fff',
            boxShadow: '0 0 60px rgba(59,130,246,0.35)'
          }}>Create Free Account</button>
        </div>
      </section>
    </div>
  );
}