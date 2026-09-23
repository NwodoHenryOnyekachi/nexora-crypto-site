import { useState } from 'react';

const categories = ['All', 'Crypto Basics', 'Investing', 'DeFi', 'Security', 'Market Insights'];

const articles = [
  { title: 'What is blockchain?', cat: 'Crypto Basics', read: '5 min', desc: 'A practical introduction to distributed ledger technology and why it matters for digital assets.', badge: 'Beginner' },
  { title: 'How crypto wallets work', cat: 'Crypto Basics', read: '7 min', desc: 'Understand the difference between hot and cold wallets, custody models, and seed phrase security.', badge: 'Beginner' },
  { title: 'Understanding market volatility', cat: 'Market Insights', read: '8 min', desc: 'Why crypto markets move faster than traditional markets, and how to build a position-sizing strategy.', badge: 'Intermediate' },
  { title: 'Centralized vs decentralized exchanges', cat: 'DeFi', read: '6 min', desc: 'A clear comparison of CEX and DEX models — liquidity, custody, fees, and regulatory implications.', badge: 'Intermediate' },
  { title: '5 ways to protect your crypto wallet', cat: 'Security', read: '4 min', desc: 'Practical operational security habits that reduce your attack surface and protect your private keys.', badge: 'Beginner' },
  { title: 'Portfolio rebalancing strategies', cat: 'Investing', read: '10 min', desc: 'When and how to rebalance a crypto portfolio using threshold-based and calendar-based approaches.', badge: 'Advanced' },
  { title: 'Understanding DeFi yield farming', cat: 'DeFi', read: '12 min', desc: 'How liquidity provision works, impermanent loss explained, and how to evaluate risk-adjusted yields.', badge: 'Advanced' },
  { title: 'Reading on-chain data', cat: 'Market Insights', read: '9 min', desc: 'Key on-chain metrics for Bitcoin and Ethereum: MVRV, SOPR, exchange reserves, and active addresses.', badge: 'Intermediate' },
];

const badgeColor: Record<string, string> = {
  Beginner: '#22c55e',
  Intermediate: '#f97316',
  Advanced: '#818cf8',
};

export default function Learn() {
  const [cat, setCat] = useState('All');

  const filtered = cat === 'All' ? articles : articles.filter(a => a.cat === cat);

  return (
    <div style={{ background: '#0a0b0f', minHeight: '100vh' }}>
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '72px 24px 48px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#f1f5f9', margin: '0 0 16px', lineHeight: 1.1 }}>
          Learn crypto without<br className="gradient-text" /> the jargon.
        </h1>
        <p style={{ fontSize: 17, color: '#64748b', margin: 0, lineHeight: 1.65 }}>Practical guides written for investors, not developers.</p>
      </section>

      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Categories */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: '8px 18px', borderRadius: 100, fontSize: 13, fontWeight: 500, cursor: 'pointer', border: '1px solid',
              borderColor: cat === c ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.08)',
              background: cat === c ? 'rgba(59,130,246,0.12)' : 'transparent',
              color: cat === c ? '#60a5fa' : '#64748b'
            }}>{c}</button>
          ))}
        </div>

        {/* Articles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {filtered.map(a => (
            <div key={a.title} className="card card-hover" style={{ padding: 24, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 100, background: badgeColor[a.badge] + '15', color: badgeColor[a.badge] }}>{a.badge}</span>
                <span style={{ fontSize: 12, color: '#475569' }}>{a.read} read</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9', margin: '0 0 10px', letterSpacing: '-0.02em', lineHeight: 1.3 }}>{a.title}</h3>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65, margin: '0 0 14px' }}>{a.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#475569', background: '#181a22', padding: '3px 8px', borderRadius: 6 }}>{a.cat}</span>
                <span style={{ fontSize: 13, color: '#60a5fa', fontWeight: 500 }}>Read →</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
