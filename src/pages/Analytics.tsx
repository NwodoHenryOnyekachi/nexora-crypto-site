import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { generateChartData, portfolio } from '../data/crypto';

const perf = generateChartData(90, 84250, 0.02);
const best = [...portfolio].sort((a, b) => b.change - a.change)[0];
const worst = [...portfolio].sort((a, b) => a.change - b.change)[0];

export default function Analytics() {
  return (
    <div className="page-pad">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#f1f5f9', margin: '0 0 4px', letterSpacing: '-0.03em' }}>Analytics</h1>
        <p style={{ fontSize: 14, color: '#475569', margin: 0 }}>How your portfolio has performed over time.</p>
      </div>

      <div className="grid-stat-3" style={{ marginBottom: 24 }}>
        <div className="card" style={{ padding: '22px 20px' }}>
          <div style={{ fontSize: 12, color: '#475569', marginBottom: 4 }}>90D Return</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#22c55e' }}>+31.2%</div>
        </div>
        <div className="card" style={{ padding: '22px 20px' }}>
          <div style={{ fontSize: 12, color: '#475569', marginBottom: 4 }}>Best Performer</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#22c55e' }}>{best.symbol} +{best.change.toFixed(2)}%</div>
        </div>
        <div className="card" style={{ padding: '22px 20px' }}>
          <div style={{ fontSize: 12, color: '#475569', marginBottom: 4 }}>Worst Performer</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: worst.change >= 0 ? '#22c55e' : '#ef4444' }}>{worst.symbol} {worst.change >= 0 ? '+' : ''}{worst.change.toFixed(2)}%</div>
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9', marginBottom: 20 }}>90-Day Portfolio Performance</div>
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={perf}>
              <defs>
                <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#475569' }} tickLine={false} axisLine={false} interval={9} />
              <YAxis tick={{ fontSize: 10, fill: '#475569' }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} width={44} />
              <Tooltip contentStyle={{ background: '#1e2130', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12, color: '#f1f5f9' }} formatter={(v: any) => [`$${v.toLocaleString()}`, 'Value']} />
              <Area type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} fill="url(#ag)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
