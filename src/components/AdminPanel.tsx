import React, { useState } from 'react';
import { BarChart, Users, Send, ShieldAlert, Plus, Trash2, Edit, Check, TrendingUp, Info } from 'lucide-react';
import { Strategy } from '../types';

interface AdminPanelProps {
  strategies: Strategy[];
  onAddStrategy: (s: Omit<Strategy, 'id' | 'isCustom'>) => void;
  onDeleteStrategy: (id: string) => void;
  onSendPush: (title: string, message: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  strategies,
  onAddStrategy,
  onDeleteStrategy,
  onSendPush,
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'strategies' | 'push' | 'users'>('analytics');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form States for Custom Strategy
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Intraday Trading');
  const [timeframe, setTimeframe] = useState('15 Minute');
  const [marketConditions, setMarketConditions] = useState('Strong uptrend');
  const [entryRulesInput, setEntryRulesInput] = useState('');
  const [exitRulesInput, setExitRulesInput] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [target, setTarget] = useState('');
  const [riskReward, setRiskReward] = useState('1:2');
  const [advantagesInput, setAdvantagesInput] = useState('');
  const [disadvantagesInput, setDisadvantagesInput] = useState('');
  const [commonMistakesInput, setCommonMistakesInput] = useState('');
  const [chartType, setChartType] = useState<'candle' | 'line' | 'rsi' | 'macd' | 'breakout' | 'vwap' | 'bollinger'>('candle');
  const [isPremium, setIsPremium] = useState(false);

  // Push Notification States
  const [pushTitle, setPushTitle] = useState('');
  const [pushMsg, setPushMsg] = useState('');
  const [isSent, setIsSent] = useState(false);

  // Mock registered users
  const [mockUsers] = useState([
    { id: 'u1', email: 'yallappaGodachi@gmail.com', joined: '2026-07-01', tier: 'Premium (Ad-free)', country: 'India' },
    { id: 'u2', email: 'raj.singh@trading.in', joined: '2026-07-02', tier: 'Free (Ad Supported)', country: 'India' },
    { id: 'u3', email: 'priya_sharma@gmail.com', joined: '2026-07-03', tier: 'Free (Ad Supported)', country: 'India' },
    { id: 'u4', email: 'alex.smith@yahoo.com', joined: '2026-07-04', tier: 'Premium (Ad-free)', country: 'USA' },
    { id: 'u5', email: 'vikram.roy@outlook.com', joined: '2026-07-04', tier: 'Free (Ad Supported)', country: 'India' }
  ]);

  const CATEGORIES = [
    'Intraday Trading', 'Swing Trading', 'F&O Strategies', 'Options Buying', 'Options Selling',
    'Scalping', 'Price Action', 'Candlestick Patterns', 'Chart Patterns', 'Support & Resistance',
    'Breakout Strategies', 'Trend Following', 'Moving Average Strategies', 'RSI Strategies',
    'MACD Strategies', 'VWAP Strategies', 'Bollinger Bands', 'Volume Analysis', 'Risk Management',
    'Trading Psychology'
  ];

  const handleCreateStrategy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !timeframe || !stopLoss || !target) return;

    onAddStrategy({
      name,
      category,
      timeframe,
      marketConditions,
      entryRules: entryRulesInput.split('\n').filter(Boolean),
      exitRules: exitRulesInput.split('\n').filter(Boolean),
      stopLoss,
      target,
      riskReward,
      advantages: advantagesInput.split('\n').filter(Boolean),
      disadvantages: disadvantagesInput.split('\n').filter(Boolean),
      commonMistakes: commonMistakesInput.split('\n').filter(Boolean),
      chartType,
      isPremium,
    });

    // Reset Form
    setName('');
    setCategory('Intraday Trading');
    setTimeframe('15 Minute');
    setMarketConditions('Strong uptrend');
    setEntryRulesInput('');
    setExitRulesInput('');
    setStopLoss('');
    setTarget('');
    setRiskReward('1:2');
    setAdvantagesInput('');
    setDisadvantagesInput('');
    setCommonMistakesInput('');
    setChartType('candle');
    setIsPremium(false);
    setShowAddForm(false);
  };

  const handleSendPush = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pushTitle || !pushMsg) return;
    onSendPush(pushTitle, pushMsg);
    setPushTitle('');
    setPushMsg('');
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="grid grid-cols-4 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-900">
        <button
          id="btn-admin-tab-analytics"
          onClick={() => setActiveTab('analytics')}
          className={`text-[10px] font-bold py-1.5 rounded-lg transition flex flex-col items-center gap-0.5 ${
            activeTab === 'analytics' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart className="w-3.5 h-3.5" />
          <span>Analytics</span>
        </button>
        <button
          id="btn-admin-tab-strategies"
          onClick={() => setActiveTab('strategies')}
          className={`text-[10px] font-bold py-1.5 rounded-lg transition flex flex-col items-center gap-0.5 ${
            activeTab === 'strategies' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Strategies</span>
        </button>
        <button
          id="btn-admin-tab-push"
          onClick={() => setActiveTab('push')}
          className={`text-[10px] font-bold py-1.5 rounded-lg transition flex flex-col items-center gap-0.5 ${
            activeTab === 'push' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>Push Alerts</span>
        </button>
        <button
          id="btn-admin-tab-users"
          onClick={() => setActiveTab('users')}
          className={`text-[10px] font-bold py-1.5 rounded-lg transition flex flex-col items-center gap-0.5 ${
            activeTab === 'users' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Users</span>
        </button>
      </div>

      {/* Analytics Dashboard */}
      {activeTab === 'analytics' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl">
              <div className="text-[9px] text-slate-500 uppercase font-black">Ad Impressions</div>
              <div className="text-lg font-mono font-bold text-slate-100 mt-1">45,124</div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+12% this week</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl">
              <div className="text-[9px] text-slate-500 uppercase font-black">Est. Ad Earnings</div>
              <div className="text-lg font-mono font-bold text-slate-100 mt-1">$142.35</div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+$18.40 today</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl">
              <div className="text-[9px] text-slate-500 uppercase font-black">Active App users</div>
              <div className="text-lg font-mono font-bold text-slate-100 mt-1">2,480</div>
              <span className="text-[9px] text-slate-500 font-sans block mt-1">75% from Android App SDK</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl">
              <div className="text-[9px] text-slate-500 uppercase font-black">Unlock conversions</div>
              <div className="text-lg font-mono font-bold text-slate-100 mt-1">84%</div>
              <span className="text-[9px] text-emerald-400 font-sans block mt-1">Highly engaging Rewarded ads</span>
            </div>
          </div>

          {/* Graphical Representation (SVG) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <h4 className="text-xs font-bold text-slate-300 mb-3">Popularity of Categories (Views)</h4>
            <div className="h-28 w-full flex items-end justify-between gap-1.5 pt-2">
              {[
                { label: 'Intraday', val: 92 },
                { label: 'Options', val: 78 },
                { label: 'F&O', val: 65 },
                { label: 'Price Act', val: 88 },
                { label: 'Patterns', val: 54 },
                { label: 'Scalp', val: 75 },
                { label: 'Risk', val: 82 }
              ].map((bar, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1 group">
                  <div className="text-[9px] text-slate-400 mb-1 group-hover:text-emerald-400 font-mono">{bar.val}0</div>
                  <div className="w-full bg-slate-950 rounded-md overflow-hidden h-16 relative">
                    <div
                      style={{ height: `${(bar.val / 100) * 100}%` }}
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-b"
                    />
                  </div>
                  <span className="text-[8px] text-slate-500 truncate w-full text-center mt-1">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Strategies Creator */}
      {activeTab === 'strategies' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400">Educational Catalog ({strategies.length})</span>
            <button
              id="btn-toggle-add-strategy-form"
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-[10px] px-2.5 py-1 rounded transition"
            >
              {showAddForm ? 'Close Editor' : 'Add Custom Strategy'}
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleCreateStrategy} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-1.5">Create Strategy Template</h4>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] text-slate-400 block mb-0.5">Strategy Name</label>
                  <input
                    id="input-strat-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Pivot Breakout"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-slate-400 block mb-0.5">Category</label>
                  <select
                    id="select-strat-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-100"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[9px] text-slate-400 block mb-0.5">Timeframe</label>
                  <input
                    id="input-strat-timeframe"
                    type="text"
                    required
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    placeholder="15 Min"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-slate-400 block mb-0.5">Target Level</label>
                  <input
                    id="input-strat-target"
                    type="text"
                    required
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder="Resistance / 2% up"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-slate-400 block mb-0.5">Stop Loss</label>
                  <input
                    id="input-strat-stoploss"
                    type="text"
                    required
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    placeholder="Pivot / 1% below"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] text-slate-400 block mb-0.5">Risk:Reward Ratio</label>
                  <input
                    id="input-strat-rr"
                    type="text"
                    required
                    value={riskReward}
                    onChange={(e) => setRiskReward(e.target.value)}
                    placeholder="1:2"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-slate-400 block mb-0.5">Chart overlay type</label>
                  <select
                    id="select-strat-chart-type"
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-100"
                  >
                    <option value="candle">Standard Candlestick</option>
                    <option value="line">Line Graph</option>
                    <option value="rsi">RSI Oscillator</option>
                    <option value="macd">MACD Histogram</option>
                    <option value="breakout">Channel Breakout</option>
                    <option value="vwap">VWAP Overlay</option>
                    <option value="bollinger">Bollinger Bands</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[9px] text-slate-400 block mb-0.5">Entry Rules (one per line)</label>
                <textarea
                  id="input-strat-entry-rules"
                  value={entryRulesInput}
                  onChange={(e) => setEntryRulesInput(e.target.value)}
                  placeholder="e.g. Wait for 5-minute close above range."
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] text-slate-400 block mb-0.5">Pros (one per line)</label>
                  <textarea
                    id="input-strat-pros"
                    value={advantagesInput}
                    onChange={(e) => setAdvantagesInput(e.target.value)}
                    rows={2}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-slate-400 block mb-0.5">Cons (one per line)</label>
                  <textarea
                    id="input-strat-cons"
                    value={disadvantagesInput}
                    onChange={(e) => setDisadvantagesInput(e.target.value)}
                    rows={2}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-100"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  id="checkbox-strat-premium"
                  type="checkbox"
                  checked={isPremium}
                  onChange={(e) => setIsPremium(e.target.checked)}
                  className="w-3.5 h-3.5 rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-0"
                />
                <label htmlFor="checkbox-strat-premium" className="text-[10px] text-slate-300 font-bold flex items-center gap-1">
                  Mark as Premium (Unlockable via Rewarded Ads)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  id="btn-strat-cancel"
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1 bg-slate-850 hover:bg-slate-800 text-slate-300 rounded text-xs"
                >
                  Cancel
                </button>
                <button
                  id="btn-strat-submit"
                  type="submit"
                  className="px-3.5 py-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded text-xs"
                >
                  Publish Strategy
                </button>
              </div>
            </form>
          )}

          <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
            {strategies.map((strat) => (
              <div
                key={strat.id}
                className="bg-slate-950 border border-slate-900 rounded-xl p-2.5 flex justify-between items-center text-xs"
              >
                <div>
                  <div className="font-bold text-slate-200 flex items-center gap-1.5">
                    {strat.name}
                    {strat.isPremium && <span className="text-[8px] bg-amber-950 text-amber-400 border border-amber-900 px-1 rounded">PREMIUM</span>}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{strat.category} • {strat.timeframe}</div>
                </div>

                {strat.isCustom ? (
                  <button
                    id={`btn-delete-custom-strat-${strat.id}`}
                    onClick={() => onDeleteStrategy(strat.id)}
                    className="text-slate-500 hover:text-red-400 p-1 rounded hover:bg-slate-900 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="text-[8.5px] font-mono text-slate-600 select-none bg-slate-900/60 px-1.5 py-0.5 rounded border border-slate-950">SYSTEM</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Push Notifications Console */}
      {activeTab === 'push' && (
        <form onSubmit={handleSendPush} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800/60">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold text-slate-200">Push Notifications Control System</h4>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Notification Title</label>
            <input
              id="input-push-title"
              type="text"
              required
              value={pushTitle}
              onChange={(e) => setPushTitle(e.target.value)}
              placeholder="🔴 Market Alert: High Volatility Expected"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Message Body</label>
            <textarea
              id="input-push-msg"
              required
              value={pushMsg}
              onChange={(e) => setPushMsg(e.target.value)}
              placeholder="Federal interest rate outcome announced today at 11:30 PM. Watch option margins closely!"
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:outline-none"
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              This simulates live client-side broadcast alerts
            </span>
            <button
              id="btn-send-push"
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs py-1.5 px-4 rounded-lg flex items-center gap-1 transition"
            >
              <Send className="w-3.5 h-3.5" />
              Broadcast Alert
            </button>
          </div>

          {isSent && (
            <div className="text-emerald-400 text-xs font-mono text-center flex items-center justify-center gap-1 bg-emerald-950/20 p-2 rounded-xl border border-emerald-900/40">
              <Check className="w-4 h-4" /> Alert Broadcasted Successfully! (Simulated)
            </div>
          )}
        </form>
      )}

      {/* Registered Users */}
      {activeTab === 'users' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <h4 className="text-xs font-bold text-slate-200 mb-2 pb-1 border-b border-slate-800">Mock Accounts Management</h4>
          <div className="space-y-1.5 max-h-[220px] overflow-y-auto">
            {mockUsers.map((user) => (
              <div
                key={user.id}
                className="bg-slate-950 border border-slate-900 rounded-xl p-2.5 flex justify-between items-center text-xs"
              >
                <div>
                  <div className="font-bold text-slate-200 truncate max-w-[150px]" title={user.email}>{user.email}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Joined: {user.joined} • {user.country}</div>
                </div>

                <span
                  className={`text-[8px] font-bold font-mono px-2 py-0.5 rounded-full ${
                    user.tier.includes('Premium')
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/50'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {user.tier.includes('Premium') ? 'PREMIUM' : 'FREE'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
