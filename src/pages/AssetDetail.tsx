import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { assets, generateChartData, fmt } from '../data/crypto';

const timeframes = ['1H', '1D', '1W', '1M', '1Y', 'ALL'];

export default function AssetDetail() {
  const { id } = useParams();
  const asset = assets.find(a => a.id === id) || assets[0];
  const [tf, setTf] = useState('1W');
  const [tab, setTab] = useState('buy');

  const days = tf === '1H' ? 1 : tf === '1D' ? 1 : tf === '1W' ? 7 : tf === '1M' ? 30 : tf === '1Y' ? 365 : 730;
  const chartData = generateChartData(days, asset.price, 0.04);

  const stats = [
    { label: 'Market Cap', value: fmt(asset.marketCap) },
    { label: '24h Volume', value: fmt(asset.volume24h) },
    { label: '24h High', value: `$${(asset.price * 1.04).toFixed(2)}` },
    { label: '24h Low', value: `$${(asset.price * 0.96).toFixed(2)}` },
    { label: 'Circulating Supply', value: '100M NXR' },
    { label: 'Total Supply', value: '200M NXR' },
  ];

  return (
    <div style={{ background: '#0a0b0f', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Link to="/markets" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748b', textDecoration: 'none', marginBottom: 28 }}>← Back to Markets</Link>

        <div className="grid-asset-side" style={{ alignItems: 'start' }}>
          {/* Left */}
          <div>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: asset.color + '25', border: `1px solid ${asset.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: asset.color }}>
                {asset.symbol[0]}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <h1 style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9', margin: 0, letterSpacing: '-0.03em' }}>{asset.name}</h1>
                  <span style={{ fontSize: 13, color: '#475569', background: '#181a22', padding: '3px 8px', borderRadius: 6 }}>{asset.symbol}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 4 }}>
                  <span style={{ fontSize: 32, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.04em', fontFamily: 'var(--font-mono)' }}>
                    ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <span style={{ fontSize: 15, fontWeight: 600, color: asset.change24h >= 0 ? '#22c55e' : '#ef4444' }}>
                    {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="card" style={{ padding: 24, marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
                {timeframes.map(t => (
                  <button key={t} onClick={() => setTf(t)} style={{
                    padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none',
                    background: tf === t ? 'rgba(59,130,246,0.2)' : 'transparent',
                    color: tf === t ? '#60a5fa' : '#64748b', outline: 'none'
                  }}>{t}</button>
                ))}
              </div>
              <div style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ left: 0, right: 0, top: 5, bottom: 0 }}>
                    <defs>
                      <linearGradient id="cgrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={asset.color} stopOpacity={0.25} />
                        <stop offset="100%" stopColor={asset.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#475569' }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
                    <YAxis tick={{ fontSize: 11, fill: '#475569' }} tickLine={false} axisLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} width={50} />
                    <Tooltip
                      contentStyle={{ background: '#1e2130', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 13, color: '#f1f5f9' }}
                      formatter={(v: any) => [`$${v.toLocaleString()}`, 'Price']}
                    />
                    <Area type="monotone" dataKey="price" stroke={asset.color} strokeWidth={2.5} fill="url(#cgrad)" dot={false} activeDot={{ r: 4, fill: asset.color }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Stats */}
            <div className="card" style={{ padding: 24, marginBottom: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#f1f5f9', margin: '0 0 16px' }}>Statistics</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                {stats.map(s => (
                  <div key={s.label}>
                    <div style={{ fontSize: 12, color: '#475569', marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#f1f5f9', fontFamily: 'var(--font-mono)' }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#f1f5f9', margin: '0 0 12px' }}>About {asset.symbol}</h3>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, margin: 0 }}>
                {asset.id === 'nxr'
                  ? 'Nexora Token (NXR) is the native utility token of the NEXORA platform. It powers governance, fee discounts, staking rewards, and premium feature access across the ecosystem. NXR holders receive a share of platform revenue proportional to their staked position.'
                  : `${asset.name} (${asset.symbol}) is a leading digital asset with deep liquidity, broad exchange support, and a large developer ecosystem. It is widely used for both value storage and decentralized application settlement.`}
              </p>
            </div>
          </div>

          {/* Right - Trade panel */}
          <div>
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: '#0a0b0f', borderRadius: 10, padding: 4 }}>
                {['buy', 'sell'].map(t => (
                  <button key={t} onClick={() => setTab(t)} style={{
                    flex: 1, padding: '9px', borderRadius: 7, fontSize: 14, fontWeight: 600, cursor: 'pointer', border: 'none',
                    background: tab === t ? (t === 'buy' ? '#22c55e' : '#ef4444') : 'transparent',
                    color: tab === t ? '#fff' : '#64748b', textTransform: 'capitalize'
                  }}>{t}</button>
                ))}
              </div>

              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, color: '#475569', marginBottom: 6 }}>Amount (USD)</div>
                <input placeholder="0.00" style={{
                  width: '100%', padding: '11px 14px', background: '#0a0b0f',
                  border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#f1f5f9',
                  fontSize: 16, fontFamily: 'var(--font-mono)', outline: 'none', boxSizing: 'border-box'
                }} />
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: '#475569', marginBottom: 6 }}>You receive ({asset.symbol})</div>
                <input placeholder="0.00000" style={{
                  width: '100%', padding: '11px 14px', background: '#0a0b0f',
                  border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#94a3b8',
                  fontSize: 16, fontFamily: 'var(--font-mono)', outline: 'none', boxSizing: 'border-box'
                }} readOnly />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#475569', marginBottom: 8 }}>
                <span>Available</span><span style={{ color: '#f1f5f9', fontFamily: 'var(--font-mono)' }}>$12,480.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#475569', marginBottom: 20 }}>
                <span>Est. fee</span><span style={{ color: '#f1f5f9', fontFamily: 'var(--font-mono)' }}>0.25%</span>
              </div>

              <button style={{
                width: '100%', padding: '13px', borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: 'pointer', border: 'none',
                background: tab === 'buy' ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
                color: '#fff', letterSpacing: '-0.01em'
              }}>Review {tab === 'buy' ? 'Purchase' : 'Sale'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
