import { useState } from 'react';
import { transactions as base } from '../data/crypto';

const extra = [
  { id: 'tx006', type: 'buy', asset: 'AVAX', amount: 22, value: 852.0, time: '3d ago', status: 'confirmed' },
  { id: 'tx007', type: 'sell', asset: 'BTC', amount: 0.02, value: 1356.8, time: '4d ago', status: 'confirmed' },
  { id: 'tx008', type: 'receive', asset: 'USDC', amount: 300, value: 300.0, time: '5d ago', status: 'confirmed' },
  { id: 'tx009', type: 'send', asset: 'ETH', amount: 0.5, value: 1740.9, time: '6d ago', status: 'confirmed' },
];

const allTx = [...base, ...extra];
const filters = ['all', 'buy', 'sell', 'send', 'receive'] as const;

export default function Transactions() {
  const [filter, setFilter] = useState<typeof filters[number]>('all');
  const rows = filter === 'all' ? allTx : allTx.filter((t) => t.type === filter);

  return (
    <div className="page-pad">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#f1f5f9', margin: '0 0 4px', letterSpacing: '-0.03em' }}>Transactions</h1>
        <p style={{ fontSize: 14, color: '#475569', margin: 0 }}>Every buy, sell, send and receive across your account.</p>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '7px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize',
              border: '1px solid', borderColor: filter === f ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.08)',
              background: filter === f ? 'rgba(59,130,246,0.12)' : 'transparent',
              color: filter === f ? '#60a5fa' : '#64748b',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: 560 }}>
            {rows.map((tx, i) => (
              <div key={tx.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: tx.type === 'buy' || tx.type === 'receive' ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                  {tx.type === 'buy' ? '↓' : tx.type === 'sell' ? '↑' : tx.type === 'receive' ? '⤵' : '⤴'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9', textTransform: 'capitalize' }}>{tx.type} {tx.asset}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9', fontFamily: 'var(--font-mono)' }}>${tx.value.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                    <span style={{ fontSize: 12, color: '#475569' }}>{tx.amount} {tx.asset} · {tx.status}</span>
                    <span style={{ fontSize: 12, color: '#475569' }}>{tx.time}</span>
                  </div>
                </div>
              </div>
            ))}
            {rows.length === 0 && (
              <div style={{ padding: 40, textAlign: 'center', color: '#475569', fontSize: 13 }}>No transactions of this type yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
