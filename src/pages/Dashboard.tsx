import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { portfolio, transactions, generateChartData, fmt } from '../data/crypto';

const portfolioChart = generateChartData(30, 84250, 0.025);

export default function Dashboard() {
  return (
    <div className="page-pad">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: '#f1f5f9', margin: 0, letterSpacing: '-0.03em' }}>Good morning, Stephen</h1>
            <p style={{ fontSize: 14, color: '#475569', margin: '4px 0 0' }}>Here's your portfolio overview.</p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#111318', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16 }}>🔔</div>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff' }}>S</div>
          </div>
        </div>

        {/* Portfolio card + stats */}
        <div className="grid-stat-3" style={{ marginBottom: 24 }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(129,140,248,0.08))', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 16, padding: '24px 28px' }}>
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>Total Balance</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.04em', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>$84,250.42</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e', padding: '3px 10px', borderRadius: 100, fontSize: 13, fontWeight: 600 }}>+1.55%</span>
              <span style={{ fontSize: 13, color: '#64748b' }}>+$1,284.16 today</span>
            </div>
          </div>
          <div className="card" style={{ padding: '24px 20px' }}>
            <div style={{ fontSize: 12, color: '#475569', marginBottom: 4 }}>30D Return</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#22c55e', letterSpacing: '-0.03em' }}>+18.4%</div>
            <div style={{ fontSize: 12, color: '#475569', marginTop: 4 }}>+$13,142</div>
          </div>
          <div className="card" style={{ padding: '24px 20px' }}>
            <div style={{ fontSize: 12, color: '#475569', marginBottom: 4 }}>Assets</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.03em' }}>5</div>
            <div style={{ fontSize: 12, color: '#475569', marginTop: 4 }}>Across 2 wallets</div>
          </div>
        </div>

        {/* Charts row */}
        <div className="grid-main-side" style={{ marginBottom: 24 }}>
          <div className="card" style={{ padding: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9', marginBottom: 20 }}>Portfolio Performance</div>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={portfolioChart}>
                  <defs>
                    <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#475569' }} tickLine={false} axisLine={false} interval={4} />
                  <YAxis tick={{ fontSize: 10, fill: '#475569' }} tickLine={false} axisLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} width={44} />
                  <Tooltip contentStyle={{ background: '#1e2130', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12, color: '#f1f5f9' }} formatter={(v: any) => [`$${v.toLocaleString()}`, 'Value']} />
                  <Area type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} fill="url(#pg)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9', marginBottom: 16 }}>Allocation</div>
            <div style={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PieChart width={160} height={160}>
                <Pie data={portfolio} cx={80} cy={80} innerRadius={50} outerRadius={72} dataKey="allocation" strokeWidth={0}>
                  {portfolio.map((p, i) => <Cell key={i} fill={p.color} />)}
                </Pie>
              </PieChart>
            </div>
            <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {portfolio.map(p => (
                <div key={p.symbol} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>{p.symbol}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#f1f5f9' }}>{p.allocation}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Holdings + Activity */}
        <div className="grid-2">
          <div className="card" style={{ padding: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9', marginBottom: 16 }}>Holdings</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {portfolio.map(p => (
                <div key={p.symbol} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: p.color + '20', border: `1px solid ${p.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: p.color, flexShrink: 0 }}>{p.symbol[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>{p.name}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9', fontFamily: 'var(--font-mono)' }}>${p.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                      <span style={{ fontSize: 12, color: '#475569' }}>{p.amount} {p.symbol}</span>
                      <span style={{ fontSize: 12, color: p.change >= 0 ? '#22c55e' : '#ef4444' }}>{p.change >= 0 ? '+' : ''}{p.change.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9', marginBottom: 16 }}>Recent Activity</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {transactions.map(tx => (
                <div key={tx.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: tx.type === 'buy' || tx.type === 'receive' ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                    {tx.type === 'buy' ? '↓' : tx.type === 'sell' ? '↑' : tx.type === 'receive' ? '⤵' : '⤴'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9', textTransform: 'capitalize' }}>{tx.type} {tx.asset}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9', fontFamily: 'var(--font-mono)' }}>${tx.value.toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                      <span style={{ fontSize: 12, color: '#475569' }}>{tx.amount} {tx.asset}</span>
                      <span style={{ fontSize: 12, color: '#475569' }}>{tx.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
}
