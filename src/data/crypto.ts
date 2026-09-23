export const assets = [
  { id: 'nxr', symbol: 'NXR', name: 'Nexora Token', price: 4.28, change24h: 8.42, marketCap: 428000000, volume24h: 38200000, color: '#3b82f6' },
  { id: 'btc', symbol: 'BTC', name: 'Bitcoin', price: 67842.15, change24h: 1.23, marketCap: 1320000000000, volume24h: 28900000000, color: '#f97316' },
  { id: 'eth', symbol: 'ETH', name: 'Ethereum', price: 3481.90, change24h: -0.87, marketCap: 418000000000, volume24h: 14200000000, color: '#818cf8' },
  { id: 'sol', symbol: 'SOL', name: 'Solana', price: 182.44, change24h: 3.14, marketCap: 82000000000, volume24h: 4100000000, color: '#22c55e' },
  { id: 'usdc', symbol: 'USDC', name: 'USD Coin', price: 1.00, change24h: 0.01, marketCap: 32000000000, volume24h: 6800000000, color: '#2563eb' },
  { id: 'avax', symbol: 'AVAX', name: 'Avalanche', price: 38.72, change24h: -2.31, marketCap: 15800000000, volume24h: 890000000, color: '#ef4444' },
];

export const portfolio = [
  { symbol: 'BTC', name: 'Bitcoin', amount: 0.842, value: 57122.89, allocation: 67.8, change: 1.23, color: '#f97316' },
  { symbol: 'ETH', name: 'Ethereum', amount: 4.21, value: 14658.59, allocation: 17.4, change: -0.87, color: '#818cf8' },
  { symbol: 'SOL', name: 'Solana', amount: 38.5, value: 7023.94, allocation: 8.3, change: 3.14, color: '#22c55e' },
  { symbol: 'NXR', name: 'Nexora Token', amount: 1280, value: 5478.40, allocation: 6.5, change: 8.42, color: '#3b82f6' },
];

export const transactions = [
  { id: 'tx001', type: 'buy', asset: 'BTC', amount: 0.05, value: 3392.11, time: '2m ago', status: 'confirmed' },
  { id: 'tx002', type: 'sell', asset: 'ETH', amount: 1.2, value: 4178.28, time: '1h ago', status: 'confirmed' },
  { id: 'tx003', type: 'receive', asset: 'NXR', amount: 500, value: 2140.00, time: '3h ago', status: 'confirmed' },
  { id: 'tx004', type: 'buy', asset: 'SOL', amount: 10, value: 1824.40, time: '1d ago', status: 'confirmed' },
  { id: 'tx005', type: 'send', asset: 'USDC', amount: 1000, value: 1000.00, time: '2d ago', status: 'confirmed' },
];

export function generateChartData(days: number, basePrice: number, volatility = 0.03) {
  const data = [];
  let price = basePrice * 0.85;
  const now = Date.now();
  for (let i = days; i >= 0; i--) {
    price = price * (1 + (Math.random() - 0.45) * volatility);
    data.push({
      time: new Date(now - i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: Math.round(price * 100) / 100,
    });
  }
  return data;
}

export function fmt(n: number, decimals = 2) {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(1)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(decimals)}`;
}
