import React, { useState, useEffect } from 'react';
import { Plus, Search, TrendingUp, TrendingDown, Trash2, Activity, Wallet, RefreshCw } from 'lucide-react';
import { WatchlistTicker } from '../types';

interface WatchlistSimulatorProps {
  onPaperTrade: (ticker: string, price: number, type: 'BUY' | 'SELL') => void;
}

export const WatchlistSimulator: React.FC<WatchlistSimulatorProps> = ({ onPaperTrade }) => {
  const [tickers, setTickers] = useState<WatchlistTicker[]>([
    { symbol: 'NIFTY 50', name: 'Nifty 50 Index', price: 24345.50, change: 1.25, history: [24100, 24150, 24220, 24180, 24290, 24345], category: 'Indices' },
    { symbol: 'AAPL', name: 'Apple Inc.', price: 184.20, change: 0.85, history: [181, 182.5, 181.8, 183.2, 183.9, 184.2], category: 'Stock' },
    { symbol: 'BTC/USDT', name: 'Bitcoin', price: 62450.00, change: -2.40, history: [64100, 63800, 63100, 63400, 62900, 62450], category: 'Crypto' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 177.60, change: -1.15, history: [180, 179.2, 178.5, 179.9, 176.8, 177.6], category: 'Stock' },
    { symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.0845, change: 0.05, history: [1.083, 1.084, 1.0838, 1.0842, 1.0845, 1.0845], category: 'Forex' },
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2945.00, change: 1.82, history: [2890, 2910, 2925, 2905, 2930, 2945], category: 'Stock' }
  ]);

  const [search, setSearch] = useState('');
  const [newSymbol, setNewSymbol] = useState('');
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('100');
  const [newCategory, setNewCategory] = useState<'Stock' | 'Crypto' | 'Indices' | 'Forex'>('Stock');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Selected ticker for quick order modal
  const [selectedTicker, setSelectedTicker] = useState<WatchlistTicker | null>(null);
  const [tradeQty, setTradeQty] = useState<number>(10);

  // Tick generator to simulate live price streams
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prev) =>
        prev.map((t) => {
          const tickPercent = (Math.random() - 0.49) * 0.4; // slight upward or downward bias
          const diff = t.price * (tickPercent / 100);
          const nextPrice = Math.max(0.0001, Number((t.price + diff).toFixed(t.category === 'Forex' ? 4 : 2)));
          const nextChange = Number((t.change + tickPercent).toFixed(2));
          const nextHistory = [...t.history.slice(1), nextPrice];
          return {
            ...t,
            price: nextPrice,
            change: nextChange,
            history: nextHistory,
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleAddTicker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSymbol) return;
    const priceNum = Number(newPrice) || 100;
    const ticker: WatchlistTicker = {
      symbol: newSymbol.toUpperCase(),
      name: newName || newSymbol.toUpperCase(),
      price: priceNum,
      change: 0.00,
      history: [priceNum * 0.98, priceNum * 0.99, priceNum * 1.01, priceNum * 1.0, priceNum],
      category: newCategory
    };
    setTickers([ticker, ...tickers]);
    setNewSymbol('');
    setNewName('');
    setNewPrice('100');
    setShowAddForm(false);
  };

  const handleDeleteTicker = (symbol: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTickers(tickers.filter((t) => t.symbol !== symbol));
    if (selectedTicker?.symbol === symbol) {
      setSelectedTicker(null);
    }
  };

  const filteredTickers = tickers.filter((t) =>
    t.symbol.toLowerCase().includes(search.toLowerCase()) ||
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-md text-slate-100">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-emerald-400" />
            Watchlist Simulator
          </h3>
          <p className="text-xs text-slate-400">Mock real-time price streams & order execution</p>
        </div>
        <button
          id="btn-toggle-add-ticker"
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 p-2 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-lg shadow-emerald-950/20"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Ticker</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddTicker} className="bg-slate-900 border border-slate-800 rounded-xl p-3 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Symbol (e.g. BTC, META)</label>
              <input
                id="input-new-symbol"
                type="text"
                required
                value={newSymbol}
                onChange={(e) => setNewSymbol(e.target.value)}
                placeholder="TSLA"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Company/Asset Name</label>
              <input
                id="input-new-name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Tesla Motors"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Base Price ($ / ₹)</label>
              <input
                id="input-new-price"
                type="number"
                step="any"
                required
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="100"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Asset Category</label>
              <select
                id="select-new-category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="Stock">Stock</option>
                <option value="Crypto">Crypto</option>
                <option value="Indices">Indices</option>
                <option value="Forex">Forex</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-1">
            <button
              id="btn-cancel-add-ticker"
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
            >
              Cancel
            </button>
            <button
              id="btn-submit-add-ticker"
              type="submit"
              className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg text-xs"
            >
              Add Asset
            </button>
          </div>
        </form>
      )}

      {/* Search Input */}
      <div className="relative mb-3">
        <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
        <input
          id="input-search-watchlist"
          type="text"
          placeholder="Filter watchlist by symbol or name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/80"
        />
      </div>

      {/* Ticker List */}
      <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
        {filteredTickers.map((t) => {
          const isPositive = t.change >= 0;
          return (
            <div
              key={t.symbol}
              onClick={() => setSelectedTicker(t)}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition cursor-pointer ${
                selectedTicker?.symbol === t.symbol
                  ? 'bg-slate-900 border-emerald-500/50'
                  : 'bg-slate-950 hover:bg-slate-900/60 border-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-1.5 h-8 rounded-full ${
                    isPositive ? 'bg-emerald-500' : 'bg-red-500'
                  }`}
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-200">{t.symbol}</span>
                    <span className="text-[9px] bg-slate-800 text-slate-400 px-1 rounded font-mono uppercase">
                      {t.category}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 truncate max-w-[120px]">{t.name}</div>
                </div>
              </div>

              {/* Sparkline mini-graph */}
              <div className="hidden sm:block w-16 h-8">
                <svg className="w-full h-full" viewBox="0 0 60 20">
                  <path
                    d={`M ${t.history
                      .map((val, idx) => {
                        const min = Math.min(...t.history);
                        const max = Math.max(...t.history);
                        const range = max - min || 1;
                        const x = (idx / (t.history.length - 1)) * 58 + 1;
                        const y = 19 - ((val - min) / range) * 18;
                        return `${x} ${y}`;
                      })
                      .join(' L ')}`}
                    fill="none"
                    stroke={isPositive ? '#10b981' : '#f43f5e'}
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              {/* Price & Change */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-slate-100">
                    {t.category === 'Forex' ? t.price.toFixed(4) : t.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <div
                    className={`text-[10px] font-mono flex items-center justify-end gap-0.5 ${
                      isPositive ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {isPositive ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                    {isPositive ? '+' : ''}
                    {t.change}%
                  </div>
                </div>
                <button
                  id={`btn-delete-ticker-${t.symbol}`}
                  onClick={(e) => handleDeleteTicker(t.symbol, e)}
                  className="text-slate-600 hover:text-red-400 p-1 rounded-lg hover:bg-slate-900 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredTickers.length === 0 && (
          <div className="text-center py-6 text-xs text-slate-500">No assets match your search filters</div>
        )}
      </div>

      {/* Quick Trade Panel (if selected) */}
      {selectedTicker && (
        <div className="mt-3 bg-slate-950 border border-slate-800 rounded-xl p-3 animate-fadeIn">
          <div className="flex justify-between items-center mb-2 pb-1 border-b border-slate-900">
            <span className="text-xs font-bold text-slate-200">
              ⚡ Paper Trade: <span className="text-emerald-400">{selectedTicker.symbol}</span>
            </span>
            <span className="text-xs font-mono text-slate-400">
              Price: <span className="text-slate-100 font-bold">{selectedTicker.price}</span>
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400">Qty:</span>
              <input
                id="input-trade-qty"
                type="number"
                min="1"
                value={tradeQty}
                onChange={(e) => setTradeQty(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-xs text-slate-100 text-center font-mono focus:outline-none"
              />
            </div>

            <div className="flex gap-1.5 shrink-0">
              <button
                id="btn-paper-buy"
                onClick={() => {
                  onPaperTrade(selectedTicker.symbol, selectedTicker.price, 'BUY');
                  setSelectedTicker(null);
                }}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-black px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
              >
                Buy (Long)
              </button>
              <button
                id="btn-paper-sell"
                onClick={() => {
                  onPaperTrade(selectedTicker.symbol, selectedTicker.price, 'SELL');
                  setSelectedTicker(null);
                }}
                className="bg-red-500 hover:bg-red-600 text-slate-100 text-xs font-black px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
              >
                Sell (Short)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
