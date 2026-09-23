import { useAuthModal } from '../context/AuthModalContext';

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/month',
    desc: 'For curious investors getting started.',
    features: ['Basic portfolio tracking', 'Real-time market data', 'Watchlists (up to 10)', '5 assets', 'Email support'],
    cta: 'Get started free',
    link: '/dashboard',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    desc: 'For active investors who want clarity.',
    features: ['Everything in Starter', 'Advanced portfolio analytics', 'Portfolio performance insights', 'Price alerts (unlimited)', 'Tax & gain/loss reports', 'Priority support', '50 assets'],
    cta: 'Start Pro trial',
    link: '/dashboard',
    highlight: true,
  },
  {
    name: 'Pro+',
    price: '$49',
    period: '/month',
    desc: 'For serious investors and builders.',
    features: ['Everything in Pro', 'Advanced trading tools', 'Full REST & WebSocket API', 'Unlimited assets', 'Custom alerts & webhooks', 'Advanced portfolio analytics', 'Dedicated account manager'],
    cta: 'Talk to sales',
    link: '/dashboard',
    highlight: false,
  },
];

const faqs = [
  { q: 'Can I switch plans at any time?', a: 'Yes. Upgrades take effect immediately; downgrades apply at the next billing cycle.' },
  { q: 'Is there a free trial for Pro?', a: 'Pro includes a 14-day free trial with no credit card required.' },
  { q: 'How does billing work?', a: 'All plans are billed monthly. Annual billing is available at a 20% discount.' },
  { q: 'What payment methods are accepted?', a: 'We accept all major credit cards, bank transfers, and select cryptocurrencies.' },
];

export default function Pricing() {
  const { openModal } = useAuthModal();
  return (
    <div style={{ background: '#0a0b0f', minHeight: '100vh' }}>
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '72px 24px 56px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#f1f5f9', margin: '0 0 16px', lineHeight: 1.1 }}>Simple, transparent pricing.</h1>
        <p style={{ fontSize: 17, color: '#64748b', margin: 0 }}>Start free. Scale when you're ready. No hidden fees.</p>
      </section>

      <section className="grid-3" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px', alignItems: 'start' }}>
        {plans.map(p => (
          <div key={p.name} style={{
            background: p.highlight ? 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(129,140,248,0.08))' : '#111318',
            border: `1px solid ${p.highlight ? 'rgba(59,130,246,0.35)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: 20, padding: 28, position: 'relative',
            boxShadow: p.highlight ? '0 0 60px rgba(59,130,246,0.12)' : 'none'
          }}>
            {p.highlight && (
              <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #3b82f6, #818cf8)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 100, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Most Popular</div>
            )}
            <div style={{ marginBottom: 4, fontSize: 14, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{p.name}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
              <span style={{ fontSize: 40, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.04em' }}>{p.price}</span>
              <span style={{ fontSize: 14, color: '#475569' }}>{p.period}</span>
            </div>
            <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 24px', lineHeight: 1.5 }}>{p.desc}</p>
            <button onClick={() => openModal('register')} style={{
              display: 'block', width: '100%', textAlign: 'center', padding: '11px 20px', borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: 'pointer', marginBottom: 24,
              background: p.highlight ? 'linear-gradient(135deg, #3b82f6, #818cf8)' : 'rgba(255,255,255,0.06)',
              color: p.highlight ? '#fff' : '#94a3b8',
              border: p.highlight ? 'none' : '1px solid rgba(255,255,255,0.1)'
            }}>{p.cta}</button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {p.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ color: '#22c55e', fontSize: 14, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.45 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px 80px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: '#f1f5f9', margin: '0 0 32px', letterSpacing: '-0.03em', textAlign: 'center' }}>Common questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {faqs.map(f => (
            <details key={f.q} style={{ padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer' }}>
              <summary style={{ fontSize: 15, fontWeight: 600, color: '#f1f5f9', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                {f.q} <span style={{ color: '#475569' }}>+</span>
              </summary>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65, margin: '12px 0 0' }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
