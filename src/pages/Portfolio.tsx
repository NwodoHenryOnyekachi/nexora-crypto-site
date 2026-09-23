import { PieChart, Pie, Cell } from 'recharts';
import { portfolio } from '../data/crypto';

export default function Portfolio() {
  const total = portfolio.reduce((s, p) => s + p.value, 0);

  return (
    <div className="page-pad">
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#f1f5f9', margin: '0 0 4px', letterSpacing: '-0.03em' }}>Portfolio</h1>
        <p style={{ fontSize: 14, color: '#475569', margin: 0 }}>A full breakdown of everything you hold.</p>
      </div>

      <div className="grid-main-side" style={{ marginBottom: 24 }}>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontSize: 12, color: '#475569', marginBottom: 4 }}>Total Portfolio Value</div>
          <div style={{ fontSize: 34, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.04em', fontFamily: 'var(--font-mono)', marginBottom: 20 }}>
            ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {portfolio.map((p) => (
              <div key={p.symbol} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: p.color + '20', border: `1px solid ${p.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: p.color, flexShrink: 0 }}>
                  {p.symbol[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>{p.name}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9', fontFamily: 'var(--font-mono)' }}>${p.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                    <span style={{ fontSize: 12, color: '#475569' }}>{p.amount} {p.symbol} · {p.allocation}%</span>
                    <span style={{ fontSize: 12, color: p.change >= 0 ? '#22c55e' : '#ef4444' }}>{p.change >= 0 ? '+' : ''}{p.change.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9', marginBottom: 16 }}>Allocation</div>
          <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PieChart width={180} height={180}>
              <Pie data={portfolio} cx={90} cy={90} innerRadius={55} outerRadius={80} dataKey="allocation" strokeWidth={0}>
                {portfolio.map((p, i) => <Cell key={i} fill={p.color} />)}
              </Pie>
            </PieChart>
          </div>
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {portfolio.map((p) => (
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
    </div>
  );
}
