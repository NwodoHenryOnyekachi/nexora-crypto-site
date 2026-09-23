import { useMemo, useState } from 'react';
import { assets, portfolio } from '../data/crypto';

const lockOptions = [
  { label: 'Flexible', multiplier: 1 },
  { label: '30 Days', multiplier: 1.2 },
  { label: '90 Days', multiplier: 1.5 },
];

const baseApy: Record<string, number> = {
  NXR: 14.5,
  BTC: 4.5,
  ETH: 6.2,
  SOL: 9.8,
  USDC: 5.0,
  AVAX: 8.1,
};

const stakingPools = assets.map((a) => ({ ...a, apy: baseApy[a.symbol] ?? 5 }));

const totalPortfolioValue = portfolio.reduce((s, p) => s + p.value, 0);

interface StakedPosition {
  symbol: string;
  usd: number;
  apy: number;
  lockLabel: string;
}

export default function Stake() {
  const [positions, setPositions] = useState<StakedPosition[]>([
    { symbol: 'NXR', usd: 1500, apy: 14.5 * 1.2, lockLabel: '30 Days' },
  ]);
  const [lockIndex, setLockIndex] = useState<Record<string, number>>({});
  const [amountDraft, setAmountDraft] = useState<Record<string, string>>({});
  const [period, setPeriod] = useState<'monthly' | 'annually'>('monthly');
  const [confirmSymbol, setConfirmSymbol] = useState<string | null>(null);

  const totalStakedUsd = useMemo(() => positions.reduce((s, p) => s + p.usd, 0), [positions]);
  const percentOfFunds = totalPortfolioValue > 0 ? (totalStakedUsd / totalPortfolioValue) * 100 : 0;
  const totalPoints = Math.round(totalStakedUsd * 12);

  const blendedApy = totalStakedUsd > 0
    ? positions.reduce((s, p) => s + p.apy * p.usd, 0) / totalStakedUsd
    : 0;
  const projectedAnnual = totalStakedUsd * (blendedApy / 100);
  const projectedMonthly = projectedAnnual / 12;

  const handleStake = (symbol: string, price: number) => {
    const raw = parseFloat(amountDraft[symbol] || '0');
    if (!raw || raw <= 0) return;
    const lockIdx = lockIndex[symbol] ?? 0;
    const lock = lockOptions[lockIdx];
    const pool = stakingPools.find((p) => p.symbol === symbol)!;
    const usd = raw * price;
    setPositions((prev) => [...prev, { symbol, usd, apy: pool.apy * lock.multiplier, lockLabel: lock.label }]);
    setAmountDraft((prev) => ({ ...prev, [symbol]: '' }));
    setConfirmSymbol(symbol);
    setTimeout(() => setConfirmSymbol(null), 2000);
  };

  return (
    <div className="page-pad">
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#f1f5f9', margin: '0 0 4px', letterSpacing: '-0.03em' }}>Stake</h1>
        <p style={{ fontSize: 14, color: '#475569', margin: 0 }}>Put your funded balance to work and earn monthly or annually.</p>
      </div>

      {/* Summary cards */}
      <div className="grid-stat-3" style={{ marginBottom: 24 }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(129,140,248,0.08))', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 16, padding: '22px 24px' }}>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Total Staked</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.04em', fontFamily: 'var(--font-mono)' }}>
            ${totalStakedUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 6 }}>{percentOfFunds.toFixed(1)}% of your total funds</div>
        </div>
        <div className="card" style={{ padding: '22px 20px' }}>
          <div style={{ fontSize: 12, color: '#475569', marginBottom: 4 }}>Total Points</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.03em' }}>{totalPoints.toLocaleString()}</div>
          <div style={{ fontSize: 12, color: '#475569', marginTop: 6 }}>Earn 12 pts per $1 staked</div>
        </div>
        <div className="card" style={{ padding: '22px 20px' }}>
          <div style={{ fontSize: 12, color: '#475569', marginBottom: 4 }}>Blended APY</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#22c55e', letterSpacing: '-0.03em' }}>{blendedApy.toFixed(1)}%</div>
          <div style={{ fontSize: 12, color: '#475569', marginTop: 6 }}>Across all active positions</div>
        </div>
      </div>

      {/* Earnings projection */}
      <div className="card" style={{ padding: 24, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9', marginBottom: 6 }}>Projected earnings</div>
          <div style={{ fontSize: 30, fontWeight: 800, color: '#22c55e', letterSpacing: '-0.03em', fontFamily: 'var(--font-mono)' }}>
            +${(period === 'monthly' ? projectedMonthly : projectedAnnual).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
            Based on your current staked balance, paid out {period === 'monthly' ? 'every month' : 'every year'}.
          </div>
        </div>
        <div className="toggle-pill">
          <button className={period === 'monthly' ? 'active' : ''} onClick={() => setPeriod('monthly')}>Monthly</button>
          <button className={period === 'annually' ? 'active' : ''} onClick={() => setPeriod('annually')}>Annually</button>
        </div>
      </div>

      {/* Staking pools */}
      <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9', marginBottom: 14 }}>Available pools</div>
      <div className="grid-2">
        {stakingPools.map((pool) => {
          const lockIdx = lockIndex[pool.symbol] ?? 0;
          const effectiveApy = (pool.apy * lockOptions[lockIdx].multiplier).toFixed(1);
          return (
            <div key={pool.symbol} className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: pool.color + '20', border: `1px solid ${pool.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: pool.color }}>
                    {pool.symbol[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9' }}>{pool.name}</div>
                    <div style={{ fontSize: 12, color: '#475569' }}>{pool.symbol}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#22c55e' }}>{effectiveApy}% APY</div>
                </div>
              </div>

              <div className="toggle-pill" style={{ marginBottom: 12, width: '100%' }}>
                {lockOptions.map((lock, i) => (
                  <button
                    key={lock.label}
                    className={lockIdx === i ? 'active' : ''}
                    style={{ flex: 1 }}
                    onClick={() => setLockIndex((prev) => ({ ...prev, [pool.symbol]: i }))}
                  >
                    {lock.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  value={amountDraft[pool.symbol] || ''}
                  onChange={(e) => setAmountDraft((prev) => ({ ...prev, [pool.symbol]: e.target.value }))}
                  placeholder={`Amount (${pool.symbol})`}
                  style={{ flex: 1, padding: '10px 12px', background: '#0a0b0f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#f1f5f9', fontSize: 13, fontFamily: 'var(--font-mono)', outline: 'none', minWidth: 0 }}
                />
                <button
                  onClick={() => handleStake(pool.symbol, pool.price)}
                  style={{ padding: '10px 18px', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer', border: 'none', color: '#fff', background: 'linear-gradient(135deg, #3b82f6, #818cf8)', flexShrink: 0 }}
                >
                  {confirmSymbol === pool.symbol ? '✓ Staked' : 'Stake'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active positions */}
      {positions.length > 0 && (
        <div style={{ marginTop: 28 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9', marginBottom: 14 }}>Your active positions</div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {positions.map((p, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: i < positions.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>{p.symbol}</span>
                  <span style={{ fontSize: 12, color: '#64748b' }}>{p.lockLabel}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: 13, color: '#22c55e' }}>{p.apy.toFixed(1)}% APY</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9', fontFamily: 'var(--font-mono)' }}>${p.usd.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
