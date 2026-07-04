import React, { useState } from 'react';
import { Calendar, TrendingUp, TrendingDown, Trash2, Plus, BarChart2, DollarSign, Award } from 'lucide-react';
import { JournalEntry, Strategy } from '../types';

interface JournalSectionProps {
  entries: JournalEntry[];
  strategies: Strategy[];
  onAddEntry: (entry: Omit<JournalEntry, 'id' | 'status' | 'pnl'>) => void;
  onDeleteEntry: (id: string) => void;
  onClearJournal: () => void;
}

export const JournalSection: React.FC<JournalSectionProps> = ({
  entries,
  strategies,
  onAddEntry,
  onDeleteEntry,
  onClearJournal,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [ticker, setTicker] = useState('');
  const [type, setType] = useState<'BUY' | 'SELL'>('BUY');
  const [strategyId, setStrategyId] = useState('');
  const [entryPrice, setEntryPrice] = useState('');
  const [exitPrice, setExitPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Calculations for analytics
  const totalTrades = entries.length;
  const wins = entries.filter((e) => e.status === 'WIN');
  const losses = entries.filter((e) => e.status === 'LOSS');
  const totalPnL = entries.reduce((acc, e) => acc + e.pnl, 0);
  const winRate = totalTrades > 0 ? Math.round((wins.length / totalTrades) * 100) : 0;

  // Calculate streak
  let currentStreak = 0;
  for (let i = entries.length - 1; i >= 0; i--) {
    if (entries[i].status === 'WIN') {
      currentStreak++;
    } else if (entries[i].status === 'LOSS') {
      break;
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticker || !entryPrice || !exitPrice || !quantity) return;

    const selectedStrategy = strategies.find((s) => s.id === strategyId);
    const strategyName = selectedStrategy ? selectedStrategy.name : 'General Trade';

    onAddEntry({
      date,
      ticker: ticker.toUpperCase(),
      type,
      strategyId: strategyId || 'general',
      strategyName,
      entryPrice: Number(entryPrice),
      exitPrice: Number(exitPrice),
      quantity: Number(quantity),
      notes,
    });

    // Reset Form
    setTicker('');
    setEntryPrice('');
    setExitPrice('');
    setQuantity('');
    setNotes('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-4">
      {/* Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-3 text-center">
          <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Total Trades</div>
          <div className="text-xl font-bold font-mono text-slate-100 mt-1">{totalTrades}</div>
        </div>

        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-3 text-center">
          <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Win Rate</div>
          <div className="text-xl font-bold font-mono text-emerald-400 mt-1 flex items-center justify-center gap-1">
            <Award className="w-4 h-4 text-emerald-400" />
            {winRate}%
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-3 text-center">
          <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Net Profit/Loss</div>
          <div
            className={`text-xl font-bold font-mono mt-1 ${
              totalPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {totalPnL >= 0 ? '+' : ''}
            ₹{totalPnL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-3 text-center">
          <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Win Streak</div>
          <div className="text-xl font-bold font-mono text-cyan-400 mt-1 flex items-center justify-center gap-1">
            <BarChart2 className="w-4 h-4 text-cyan-400" />
            {currentStreak}
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-between items-center bg-slate-950 p-1 rounded-xl border border-slate-900">
        <button
          id="btn-toggle-add-trade"
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold px-3 py-2 rounded-lg transition"
        >
          <Plus className="w-4 h-4" />
          Log Practice Trade
        </button>

        {entries.length > 0 && (
          <button
            id="btn-clear-journal"
            onClick={() => {
              if (window.confirm('Are you sure you want to delete all trades in your journal? This cannot be undone.')) {
                onClearJournal();
              }
            }}
            className="text-xs text-rose-400 hover:bg-rose-950/20 hover:text-rose-300 px-3 py-2 rounded-lg transition"
          >
            Reset Journal
          </button>
        )}
      </div>

      {/* Add Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <h4 className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-1.5">New Journal entry</h4>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Ticker / Symbol</label>
              <input
                id="input-journal-ticker"
                type="text"
                required
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                placeholder="NIFTY / AAPL"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Trade Direction</label>
              <div className="grid grid-cols-2 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  id="btn-journal-buy"
                  type="button"
                  onClick={() => setType('BUY')}
                  className={`text-[10px] font-bold py-1 rounded transition ${
                    type === 'BUY' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Long (Buy)
                </button>
                <button
                  id="btn-journal-sell"
                  type="button"
                  onClick={() => setType('SELL')}
                  className={`text-[10px] font-bold py-1 rounded transition ${
                    type === 'SELL' ? 'bg-red-500 text-slate-100' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Short (Sell)
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Entry Price</label>
              <input
                id="input-journal-entry-price"
                type="number"
                step="any"
                required
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                placeholder="116.00"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Exit Price</label>
              <input
                id="input-journal-exit-price"
                type="number"
                step="any"
                required
                value={exitPrice}
                onChange={(e) => setExitPrice(e.target.value)}
                placeholder="134.00"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Quantity</label>
              <input
                id="input-journal-qty"
                type="number"
                required
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="50"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Applied Strategy</label>
              <select
                id="select-journal-strategy"
                value={strategyId}
                onChange={(e) => setStrategyId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="">General Trade (No Strategy)</option>
                {strategies.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Trade Date</label>
              <input
                id="input-journal-date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Observations / Learnings</label>
            <textarea
              id="input-journal-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Followed rules perfectly, exit executed via trailing stop-loss on 9-EMA."
              rows={2}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              id="btn-journal-cancel"
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
            >
              Cancel
            </button>
            <button
              id="btn-journal-submit"
              type="submit"
              className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg text-xs"
            >
              Save entry
            </button>
          </div>
        </form>
      )}

      {/* Trade Log List */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Practice Trade Logs</h3>
        {entries.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800/50 rounded-2xl p-8 text-center">
            <DollarSign className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm text-slate-300 font-semibold">Your Trading Journal is empty</p>
            <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
              Start logging your practice trades here or add assets from the Watchlist to practice strategy simulation!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {entries.map((e) => {
              const isWin = e.status === 'WIN';
              const isLoss = e.status === 'LOSS';
              return (
                <div
                  key={e.id}
                  className="bg-slate-900 border border-slate-800/80 rounded-2xl p-3.5 flex flex-col gap-2.5 hover:border-slate-700 transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                          e.type === 'BUY' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' : 'bg-rose-950 text-rose-400 border border-rose-900'
                        }`}
                      >
                        {e.type === 'BUY' ? 'LONG' : 'SHORT'}
                      </span>
                      <span className="text-sm font-bold text-slate-200">{e.ticker}</span>
                      <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {e.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-sm font-mono font-bold ${
                          isWin ? 'text-emerald-400' : isLoss ? 'text-rose-400' : 'text-slate-400'
                        }`}
                      >
                        {e.pnl >= 0 ? '+' : ''}
                        ₹{e.pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <button
                        id={`btn-delete-trade-${e.id}`}
                        onClick={() => onDeleteEntry(e.id)}
                        className="text-slate-600 hover:text-rose-400 p-1 rounded-lg hover:bg-slate-950 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-950">
                    <div>
                      <div className="text-[9px] text-slate-500">Entry / Exit</div>
                      <div className="text-[11px] font-mono text-slate-300">
                        ₹{e.entryPrice} → ₹{e.exitPrice}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-500">Qty / Capital</div>
                      <div className="text-[11px] font-mono text-slate-300">
                        {e.quantity} (₹{(e.entryPrice * e.quantity).toLocaleString()})
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-500">Applied Strategy</div>
                      <div className="text-[11px] text-emerald-400 truncate font-semibold" title={e.strategyName}>
                        {e.strategyName}
                      </div>
                    </div>
                  </div>

                  {e.notes && (
                    <div className="text-[11px] text-slate-400 bg-slate-950/30 p-2 rounded-xl border border-slate-950/40 italic">
                      💡 {e.notes}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
