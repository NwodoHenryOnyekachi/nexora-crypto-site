import { useState } from 'react';
import { Link } from 'react-router-dom';
import { assets, fmt } from '../data/crypto';

const categories = ['All', 'Trending', 'Layer 1', 'DeFi', 'Stablecoins'];

export default function Markets() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');

  const filtered = assets.filter(a =>
    (a.name.toLowerCase().includes(search.toLowerCase()) || a.symbol.toLowerCase().includes(search.toLowerCase()))
  );

  const trending = assets.filter(a => Math.abs(a.change24h) > 1).slice(0, 4);

  return (
    <div style={{ background: '#0a0b0f', minHeight: '100vh', padding: '48px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.04em', color: '#f1f5f9', margin: '0 0 8px' }}>Markets</h1>
          <p style={{ fontSize: 15, color: '#64748b', margin: 0 }}>Live prices and market data for 120+ digital assets.</p>
        </div>

        {/* Trending */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>Trending</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {trending.map(a => (
              <Link key={a.id} to={`/asset/${a.id}`} style={{ textDecoration: 'none' }}>
                <div className="card card-hover" style={{ padding: '16px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: a.color + '25', border: `1px solid ${a.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: a.color }}>{a.symbol[0]}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>{a.symbol}</div>
                      <div style={{ fontSize: 11, color: '#475569' }}>{a.name}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9', fontFamily: 'var(--font-mono)' }}>
                      {a.price >= 1000 ? fmt(a.price) : `$${a.price.toFixed(2)}`}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, padding: '3px 8px', borderRadius: 6, background: a.change24h >= 0 ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)', color: a.change24h >= 0 ? '#22c55e' : '#ef4444' }}>
                      {a.change24h >= 0 ? '+' : ''}{a.change24h.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Search + filter */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#475569', fontSize: 15 }}>⌕</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search assets..."
              style={{
                width: '100%', padding: '10px 14px 10px 40px', background: '#111318',
                border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#f1f5f9',
                fontSize: 14, outline: 'none', boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{
                padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                border: 'none', transition: 'all 0.15s',
                background: cat === c ? 'rgba(59,130,246,0.2)' : '#111318',
                color: cat === c ? '#60a5fa' : '#64748b',
                outline: cat === c ? '1px solid rgba(59,130,246,0.4)' : '1px solid rgba(255,255,255,0.06)'
              }}>{c}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['#', 'Asset', 'Price', '24h Change', 'Market Cap', '24h Volume'].map(h => (
                  <th key={h} style={{ padding: '14px 20px', textAlign: h === '#' || h === 'Asset' ? 'left' : 'right', fontSize: 12, fontWeight: 600, color: '#475569', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <tr key={a.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.15s', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  onClick={() => window.location.href = `/asset/${a.id}`}
                >
                  <td style={{ padding: '16px 20px', fontSize: 13, color: '#475569' }}>{i + 1}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: a.color + '20', border: `1px solid ${a.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: a.color }}>{a.symbol[0]}</span>
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9' }}>{a.name}</div>
                        <div style={{ fontSize: 12, color: '#475569' }}>{a.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'right', fontSize: 14, fontWeight: 600, color: '#f1f5f9', fontFamily: 'var(--font-mono)' }}>
                    {a.price >= 1000 ? `$${a.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : `$${a.price.toFixed(2)}`}
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, padding: '4px 10px', borderRadius: 6, background: a.change24h >= 0 ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: a.change24h >= 0 ? '#22c55e' : '#ef4444' }}>
                      {a.change24h >= 0 ? '+' : ''}{a.change24h.toFixed(2)}%
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'right', fontSize: 13, color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>{fmt(a.marketCap)}</td>
                  <td style={{ padding: '16px 20px', textAlign: 'right', fontSize: 13, color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>{fmt(a.volume24h)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
