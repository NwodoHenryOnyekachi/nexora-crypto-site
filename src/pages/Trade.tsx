import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { generateChartData } from '../data/crypto';

const chart = generateChartData(7, 67842, 0.04);

const orderBook = {
  asks: [
    { price: 67920.00, amount: 0.824, total: 55989.41 },
    { price: 67890.50, amount: 1.240, total: 84184.22 },
    { price: 67860.25, amount: 0.542, total: 36779.86 },
    { price: 67843.10, amount: 2.100, total: 142470.51 },
  ],
  bids: [
    { price: 67842.15, amount: 0.650, total: 44097.40 },
    { price: 67830.00, amount: 1.100, total: 74613.00 },
    { price: 67810.50, amount: 0.380, total: 25767.99 },
    { price: 67800.00, amount: 3.200, total: 216960.00 },
  ]
};

const recentTrades = [
  { price: 67842.15, amount: 0.124, side: 'buy', time: '14:32:01' },
  { price: 67838.90, amount: 0.820, side: 'sell', time: '14:31:58' },
  { price: 67845.00, amount: 0.041, side: 'buy', time: '14:31:55' },
  { price: 67840.50, amount: 0.290, side: 'buy', time: '14:31:52' },
  { price: 67836.00, amount: 0.600, side: 'sell', time: '14:31:49' },
];

export default function Trade() {
  const [side, setSide] = useState('buy');
  const [orderType, setOrderType] = useState('market');
  const [amount, setAmount] = useState('');

  return (
    <div className="trade-grid">
        {/* Chart area */}
        <div style={{ borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f9731625', border: '1px solid #f9731640', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#f97316' }}>B</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9' }}>BTC / USDT</div>
                <div style={{ fontSize: 11, color: '#475569' }}>Bitcoin</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.03em', fontFamily: 'var(--font-mono)' }}>$67,842.15</div>
              <div style={{ fontSize: 12, color: '#22c55e' }}>+$834 · +1.24% today</div>
            </div>
            <div style={{ display: 'flex', gap: 24, marginLeft: 16 }}>
              {[['24H High', '$69,120'], ['24H Low', '$66,480'], ['24H Vol', '$28.9B']].map(([l, v]) => (
                <div key={l}>
                  <div style={{ fontSize: 11, color: '#475569' }}>{l}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, padding: '20px 24px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chart}>
                <defs>
                  <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#475569' }} tickLine={false} axisLine={false} interval={1} />
                <YAxis tick={{ fontSize: 10, fill: '#475569' }} tickLine={false} axisLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} width={48} domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ background: '#1e2130', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12, color: '#f1f5f9' }} formatter={(v: any) => [`$${v.toLocaleString()}`, 'Price']} />
                <Area type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} fill="url(#tg)" dot={false} activeDot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order form */}
        <div style={{ borderRight: '1px solid rgba(255,255,255,0.06)', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 4, background: '#0a0b0f', borderRadius: 10, padding: 4 }}>
            {['buy', 'sell'].map(s => (
              <button key={s} onClick={() => setSide(s)} style={{
                flex: 1, padding: '9px', borderRadius: 7, fontSize: 14, fontWeight: 600, cursor: 'pointer', border: 'none',
                background: side === s ? (s === 'buy' ? '#22c55e' : '#ef4444') : 'transparent',
                color: side === s ? '#fff' : '#64748b', textTransform: 'capitalize'
              }}>{s}</button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 4 }}>
            {['market', 'limit'].map(t => (
              <button key={t} onClick={() => setOrderType(t)} style={{
                flex: 1, padding: '7px', borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                border: '1px solid', transition: 'all 0.15s',
                borderColor: orderType === t ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.08)',
                background: orderType === t ? 'rgba(59,130,246,0.12)' : 'transparent',
                color: orderType === t ? '#60a5fa' : '#64748b', textTransform: 'capitalize'
              }}>{t}</button>
            ))}
          </div>

          {orderType === 'limit' && (
            <div>
              <div style={{ fontSize: 12, color: '#475569', marginBottom: 6 }}>Limit Price (USDT)</div>
              <input placeholder="67,842.15" style={{ width: '100%', padding: '10px 12px', background: '#111318', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#f1f5f9', fontSize: 14, fontFamily: 'var(--font-mono)', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          )}

          <div>
            <div style={{ fontSize: 12, color: '#475569', marginBottom: 6 }}>Amount (BTC)</div>
            <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00000" style={{ width: '100%', padding: '10px 12px', background: '#111318', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#f1f5f9', fontSize: 14, fontFamily: 'var(--font-mono)', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', gap: 6 }}>
            {['25%', '50%', '75%', '100%'].map(p => (
              <button key={p} style={{ flex: 1, padding: '6px 0', fontSize: 11, fontWeight: 600, background: '#111318', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, color: '#64748b', cursor: 'pointer' }}>{p}</button>
            ))}
          </div>

          <div style={{ background: '#111318', borderRadius: 10, padding: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 8 }}>
              <span style={{ color: '#475569' }}>Available</span>
              <span style={{ color: '#f1f5f9', fontFamily: 'var(--font-mono)' }}>$12,480.00 USDT</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 8 }}>
              <span style={{ color: '#475569' }}>Order Value</span>
              <span style={{ color: '#f1f5f9', fontFamily: 'var(--font-mono)' }}>$0.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <span style={{ color: '#475569' }}>Fee (0.25%)</span>
              <span style={{ color: '#f1f5f9', fontFamily: 'var(--font-mono)' }}>$0.00</span>
            </div>
          </div>

          <button style={{
            width: '100%', padding: '13px', borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: 'pointer', border: 'none',
            background: side === 'buy' ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: '#fff'
          }}>Review Order</button>
        </div>

        {/* Order book + trades */}
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ flex: 1, padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', overflow: 'auto' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 12, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Order Book</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, marginBottom: 8 }}>
              {['Price', 'Amount', 'Total'].map(h => <div key={h} style={{ fontSize: 10, color: '#475569', textAlign: 'right' }}>{h}</div>)}
            </div>
            {orderBook.asks.map((o, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, padding: '3px 0' }}>
                <div style={{ fontSize: 11, color: '#ef4444', fontFamily: 'var(--font-mono)' }}>{o.price.toFixed(2)}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'var(--font-mono)', textAlign: 'right' }}>{o.amount.toFixed(3)}</div>
                <div style={{ fontSize: 11, color: '#64748b', fontFamily: 'var(--font-mono)', textAlign: 'right' }}>{o.total.toFixed(2)}</div>
              </div>
            ))}
            <div style={{ padding: '8px 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', margin: '6px 0' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#22c55e', fontFamily: 'var(--font-mono)' }}>67,842.15</div>
            </div>
            {orderBook.bids.map((o, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, padding: '3px 0' }}>
                <div style={{ fontSize: 11, color: '#22c55e', fontFamily: 'var(--font-mono)' }}>{o.price.toFixed(2)}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'var(--font-mono)', textAlign: 'right' }}>{o.amount.toFixed(3)}</div>
                <div style={{ fontSize: 11, color: '#64748b', fontFamily: 'var(--font-mono)', textAlign: 'right' }}>{o.total.toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div style={{ flex: 1, padding: '16px 20px', overflow: 'auto' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 12, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Recent Trades</div>
            {recentTrades.map((t, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: t.side === 'buy' ? '#22c55e' : '#ef4444' }}>{t.price.toFixed(2)}</span>
                <span style={{ color: '#64748b' }}>{t.amount.toFixed(3)}</span>
                <span style={{ color: '#475569' }}>{t.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
