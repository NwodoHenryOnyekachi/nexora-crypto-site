import { useState } from 'react';

const walletAssets = [
  { symbol: 'BTC', name: 'Bitcoin', balance: 0.842, value: 57122.89, address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7Divf', color: '#f97316' },
  { symbol: 'ETH', name: 'Ethereum', balance: 4.21, value: 14658.59, address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', color: '#818cf8' },
  { symbol: 'NXR', name: 'Nexora Token', balance: 1280, value: 5478.40, address: 'nxr1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx', color: '#3b82f6' },
  { symbol: 'USDC', name: 'USD Coin', balance: 6990.54, value: 6990.54, address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', color: '#2563eb' },
];

const networks = ['Ethereum', 'Bitcoin', 'Solana', 'Nexora'];

export default function Wallet() {
  const [modal, setModal] = useState<typeof walletAssets[0] | null>(null);
  const [net, setNet] = useState('Ethereum');
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const total = walletAssets.reduce((s, a) => s + a.value, 0);

  return (
    <div className="page-pad">
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#f1f5f9', margin: '0 0 4px', letterSpacing: '-0.03em' }}>Wallet</h1>
          <p style={{ fontSize: 14, color: '#475569', margin: 0 }}>Manage your digital assets and addresses.</p>
        </div>

        {/* Balance overview */}
        <div className="grid-3" style={{ marginBottom: 28 }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(129,140,248,0.08))', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 16, padding: '22px 24px' }}>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Total Wallet Balance</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.04em', fontFamily: 'var(--font-mono)' }}>${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          </div>
          <div className="card" style={{ padding: '22px 24px' }}>
            <div style={{ fontSize: 12, color: '#475569', marginBottom: 4 }}>Available Balance</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.03em', fontFamily: 'var(--font-mono)' }}>${(total * 0.94).toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          </div>
          <div className="card" style={{ padding: '22px 24px' }}>
            <div style={{ fontSize: 12, color: '#475569', marginBottom: 4 }}>Pending</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#f97316', letterSpacing: '-0.03em', fontFamily: 'var(--font-mono)' }}>${(total * 0.06).toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
          {[['Send', '↑', '#ef4444'], ['Receive', '↓', '#22c55e'], ['Buy', '+', '#3b82f6'], ['Swap', '⇄', '#818cf8']].map(([label, icon, color]) => (
            <button key={label} onClick={() => label === 'Receive' && setModal(walletAssets[0])} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer',
              background: color + '15', border: `1px solid ${color}30`, color: color as string
            }}>
              <span style={{ fontSize: 16 }}>{icon}</span> {label}
            </button>
          ))}
        </div>

        {/* Asset cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
          {walletAssets.map(a => (
            <div key={a.symbol} className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: a.color + '20', border: `1px solid ${a.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: a.color }}>{a.symbol[0]}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9' }}>{a.name}</div>
                    <div style={{ fontSize: 12, color: '#475569' }}>{a.symbol}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9', fontFamily: 'var(--font-mono)' }}>{a.balance.toLocaleString()} {a.symbol}</div>
                  <div style={{ fontSize: 13, color: '#64748b', fontFamily: 'var(--font-mono)' }}>${a.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                </div>
              </div>
              <div style={{ background: '#0a0b0f', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: '#475569', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>{a.address}</span>
                <button onClick={() => setModal(a)} style={{ fontSize: 11, color: '#60a5fa', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, flexShrink: 0, marginLeft: 8 }}>Receive</button>
              </div>
            </div>
          ))}
        </div>

      {/* Receive modal */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }} onClick={() => setModal(null)}>
          <div style={{ background: '#111318', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 32, width: 380, maxWidth: '90vw' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9' }}>Receive {modal.symbol}</div>
              <button onClick={() => setModal(null)} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: 20 }}>×</button>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: '#475569', marginBottom: 8 }}>Network</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {networks.map(n => (
                  <button key={n} onClick={() => setNet(n)} style={{ padding: '6px 12px', borderRadius: 7, fontSize: 12, fontWeight: 500, cursor: 'pointer', border: '1px solid', borderColor: net === n ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.08)', background: net === n ? 'rgba(59,130,246,0.12)' : 'transparent', color: net === n ? '#60a5fa' : '#64748b' }}>{n}</button>
                ))}
              </div>
            </div>

            {/* QR placeholder */}
            <div style={{ width: 200, height: 200, margin: '0 auto 20px', background: '#ffffff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, padding: 16 }}>
                {Array.from({ length: 49 }, (_, i) => (
                  <div key={i} style={{ width: '100%', paddingBottom: '100%', background: Math.random() > 0.4 ? '#000' : '#fff', borderRadius: 1 }} />
                ))}
              </div>
            </div>

            <div style={{ background: '#0a0b0f', borderRadius: 10, padding: 12, marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: '#475569', marginBottom: 4 }}>Wallet Address</div>
              <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#94a3b8', wordBreak: 'break-all', lineHeight: 1.5 }}>{modal.address}</div>
            </div>
            <button onClick={() => copy(modal.address)} style={{ width: '100%', padding: '11px', borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: 'pointer', border: '1px solid rgba(59,130,246,0.3)', background: 'rgba(59,130,246,0.1)', color: '#60a5fa' }}>
              {copied ? '✓ Copied!' : 'Copy Address'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
