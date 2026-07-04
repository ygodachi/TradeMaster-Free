import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle2, TrendingUp, HelpCircle } from 'lucide-react';

interface InteractiveChartProps {
  chartType: 'candle' | 'line' | 'rsi' | 'macd' | 'breakout' | 'vwap' | 'bollinger';
  strategyName: string;
}

export const InteractiveChart: React.FC<InteractiveChartProps> = ({ chartType, strategyName }) => {
  const [step, setStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [tradeStatus, setTradeStatus] = useState<'idle' | 'running' | 'win' | 'loss'>('idle');

  // Hardcoded highly detailed candle data to render realistic movements
  const baseCandles = [
    { x: 40, open: 120, close: 115, high: 122, low: 114 }, // Bearish
    { x: 80, open: 115, close: 110, high: 117, low: 108 }, // Bearish
    { x: 120, open: 110, close: 108, high: 112, low: 105 }, // Bearish (touching support)
    { x: 160, open: 108, close: 112, high: 114, low: 107 }, // Reversal Hammer
    { x: 200, open: 112, close: 116, high: 118, low: 111 }, // Bullish engulfing
    // --- Entry Point triggers here around index 5 ---
    { x: 240, open: 116, close: 119, high: 121, low: 115 }, // Confirmed up
    { x: 280, open: 119, close: 123, high: 125, low: 118 }, // Up
    { x: 320, open: 123, close: 121, high: 126, low: 120 }, // Slight pullback
    { x: 360, open: 121, close: 128, high: 129, low: 120 }, // Breakout acceleration
    { x: 400, open: 128, close: 134, high: 136, low: 127 }, // Heading to target
    { x: 440, open: 134, close: 132, high: 138, low: 131 }, // Hit Target limit
  ];

  const currentCandles = isPlaying ? baseCandles.slice(0, step + 1) : baseCandles;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      if (step < baseCandles.length - 1) {
        timer = setTimeout(() => {
          setStep((prev) => prev + 1);
        }, 800);
      } else {
        setIsPlaying(false);
        // Randomize outcome slightly to simulate a real educational probability distribution,
        // but default to "win" to reward learning, or 50% split.
        const won = Math.random() > 0.3;
        setTradeStatus(won ? 'win' : 'loss');
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, step]);

  const handleStartSimulation = () => {
    setStep(2); // start right before entry
    setIsPlaying(true);
    setTradeStatus('running');
  };

  const handleReset = () => {
    setIsPlaying(false);
    setStep(0);
    setTradeStatus('idle');
  };

  const supportLevel = 106;
  const resistanceLevel = 135;
  const entryLevel = 116;
  const stopLossLevel = 109;
  const targetLevel = 134;

  const yScaler = (val: number) => {
    // scale 100-140 to 180-20
    const minP = 100;
    const maxP = 140;
    const height = 200;
    const margin = 20;
    return height - margin - ((val - minP) / (maxP - minP)) * (height - 2 * margin);
  };

  return (
    <div id="interactive-chart" className="bg-[#151c2c] border border-slate-800 rounded-xl p-4 shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-900/50">
            Strategy Blueprint: {chartType.toUpperCase()}
          </span>
          <h4 className="text-sm font-semibold text-slate-100 mt-1">Live Technical Sandbox</h4>
        </div>

        <div className="flex items-center gap-2">
          {tradeStatus === 'idle' && (
            <button
              id="btn-simulate-trade"
              onClick={handleStartSimulation}
              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg transition"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Simulate Trade
            </button>
          )}

          {tradeStatus === 'running' && (
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-mono bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-900/50 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Position Active...
            </div>
          )}

          {(tradeStatus === 'win' || tradeStatus === 'loss') && (
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border ${
                  tradeStatus === 'win'
                    ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50'
                    : 'bg-red-950/40 text-red-400 border-red-900/50'
                }`}
              >
                {tradeStatus === 'win' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Target Hit! +2.5R Profit
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Stop Loss Triggered (-1R)
                  </>
                )}
              </div>
              <button
                id="btn-reset-simulation"
                onClick={handleReset}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-1.5 rounded-lg transition"
                title="Reset simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SVG Canvas Chart */}
      <div className="relative bg-[#0d121f] rounded-lg border border-slate-900 overflow-hidden h-[210px] w-full">
        <svg className="w-full h-full select-none" viewBox="0 0 480 200" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1={yScaler(110)} x2="480" y2={yScaler(110)} stroke="#1e293b" strokeDasharray="3,3" />
          <line x1="0" y1={yScaler(120)} x2="480" y2={yScaler(120)} stroke="#1e293b" strokeDasharray="3,3" />
          <line x1="0" y1={yScaler(130)} x2="480" y2={yScaler(130)} stroke="#1e293b" strokeDasharray="3,3" />

          {/* S&R Zones */}
          {chartType === 'breakout' ? (
            <>
              {/* Channel Lines */}
              <line x1="0" y1={yScaler(116)} x2="480" y2={yScaler(116)} stroke="#e2e8f0" strokeOpacity="0.2" strokeWidth="2" />
              <line x1="0" y1={yScaler(108)} x2="480" y2={yScaler(108)} stroke="#e2e8f0" strokeOpacity="0.2" strokeWidth="2" />
              <rect x="0" y={yScaler(116)} width="480" height={yScaler(108) - yScaler(116)} fill="#94a3b8" fillOpacity="0.05" />
              <text x="10" y={yScaler(116) - 5} fill="#94a3b8" fontSize="8" fontFamily="monospace">CHANNEL CEILING</text>
            </>
          ) : chartType === 'bollinger' ? (
            <>
              {/* Bollinger Bands */}
              <path
                d={`M 10 ${yScaler(125)} Q 120 ${yScaler(128)}, 240 ${yScaler(134)} T 480 ${yScaler(139)}`}
                fill="none"
                stroke="#6366f1"
                strokeWidth="1.5"
                strokeOpacity="0.7"
              />
              <path
                d={`M 10 ${yScaler(110)} Q 120 ${yScaler(106)}, 240 ${yScaler(110)} T 480 ${yScaler(112)}`}
                fill="none"
                stroke="#6366f1"
                strokeWidth="1.5"
                strokeOpacity="0.7"
              />
              <path
                d={`M 10 ${yScaler(117.5)} Q 120 ${yScaler(117)}, 240 ${yScaler(122)} T 480 ${yScaler(125.5)}`}
                fill="none"
                stroke="#6366f1"
                strokeWidth="1"
                strokeDasharray="2,2"
                strokeOpacity="0.4"
              />
              <text x="10" y="30" fill="#6366f1" fontSize="8" fontFamily="monospace">UPPER BAND</text>
            </>
          ) : chartType === 'vwap' ? (
            <>
              <path
                d={`M 10 ${yScaler(113)} Q 120 ${yScaler(114)}, 240 ${yScaler(116)} T 480 ${yScaler(122)}`}
                fill="none"
                stroke="#d97706"
                strokeWidth="2"
                strokeOpacity="0.8"
              />
              <text x="10" y="45" fill="#d97706" fontSize="8" fontFamily="monospace">VWAP LINE</text>
            </>
          ) : (
            <>
              {/* Support & Resistance zones */}
              <line x1="0" y1={yScaler(supportLevel)} x2="480" y2={yScaler(supportLevel)} stroke="#22c55e" strokeOpacity="0.25" strokeWidth="1.5" />
              <text x="10" y={yScaler(supportLevel) - 4} fill="#22c55e" fontSize="8" className="font-mono">STRONG SUPPORT ZONE</text>

              <line x1="0" y1={yScaler(resistanceLevel)} x2="480" y2={yScaler(resistanceLevel)} stroke="#ef4444" strokeOpacity="0.2" strokeWidth="1.5" />
              <text x="10" y={yScaler(resistanceLevel) + 12} fill="#ef4444" fontSize="8" className="font-mono">MAJOR RESISTANCE</text>
            </>
          )}

          {/* Render candles */}
          {currentCandles.map((c, idx) => {
            const isGreen = c.close >= c.open;
            const strokeColor = isGreen ? '#10b981' : '#f43f5e';
            const fillColor = isGreen ? '#10b981' : '#f43f5e';
            const bodyY = yScaler(Math.max(c.open, c.close));
            const bodyHeight = Math.max(1.5, Math.abs(yScaler(c.open) - yScaler(c.close)));
            const wickTop = yScaler(c.high);
            const wickBottom = yScaler(c.low);

            return (
              <g key={idx} className="transition-all duration-300">
                {/* Wick */}
                <line x1={c.x} y1={wickTop} x2={c.x} y2={wickBottom} stroke={strokeColor} strokeWidth="1.5" />
                {/* Body */}
                <rect
                  x={c.x - 6}
                  y={bodyY}
                  width="12"
                  height={bodyHeight}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth="1"
                  rx="1"
                />
              </g>
            );
          })}

          {/* Render Trade Guidelines when position is running or closed */}
          {tradeStatus !== 'idle' && step >= 4 && (
            <>
              {/* Stop Loss Line */}
              <line x1="180" y1={yScaler(stopLossLevel)} x2="480" y2={yScaler(stopLossLevel)} stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4,4" />
              <rect x="420" y={yScaler(stopLossLevel) - 7} width="55" height="14" fill="#991b1b" rx="2" />
              <text x="424" y={yScaler(stopLossLevel) + 3} fill="#fecaca" fontSize="7" fontFamily="monospace" fontWeight="bold">SL: {stopLossLevel}</text>

              {/* Entry Level Line */}
              <line x1="180" y1={yScaler(entryLevel)} x2="480" y2={yScaler(entryLevel)} stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="3,3" />
              <rect x="420" y={yScaler(entryLevel) - 7} width="55" height="14" fill="#334155" rx="2" />
              <text x="424" y={yScaler(entryLevel) + 3} fill="#f1f5f9" fontSize="7" fontFamily="monospace" fontWeight="bold">ENTRY: {entryLevel}</text>

              {/* Target Level Line */}
              <line x1="180" y1={yScaler(targetLevel)} x2="480" y2={yScaler(targetLevel)} stroke="#10b981" strokeWidth="1.5" strokeDasharray="4,4" />
              <rect x="420" y={yScaler(targetLevel) - 7} width="55" height="14" fill="#065f46" rx="2" />
              <text x="424" y={yScaler(targetLevel) + 3} fill="#d1fae5" fontSize="7" fontFamily="monospace" fontWeight="bold">TGT: {targetLevel}</text>

              {/* Green/Red Profit-Loss zones */}
              <rect x="180" y={yScaler(targetLevel)} width="240" height={yScaler(entryLevel) - yScaler(targetLevel)} fill="#10b981" fillOpacity="0.04" />
              <rect x="180" y={yScaler(entryLevel)} width="240" height={yScaler(stopLossLevel) - yScaler(entryLevel)} fill="#ef4444" fillOpacity="0.04" />

              {/* Highlight Trigger Marker */}
              <circle cx="200" cy={yScaler(entryLevel)} r="6" fill="#f8fafc" stroke="#10b981" strokeWidth="2" />
              <text x="210" y={yScaler(entryLevel) - 8} fill="#f8fafc" fontSize="8" fontWeight="bold" fontFamily="monospace" className="bg-[#0f172a] px-1 py-0.5 rounded">ENTRY BUY</text>
            </>
          )}

          {/* Dynamic Outcomes overlay */}
          {tradeStatus === 'win' && (
            <g>
              <circle cx="440" cy={yScaler(targetLevel)} r="8" fill="#10b981" className="animate-ping" />
              <circle cx="440" cy={yScaler(targetLevel)} r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
            </g>
          )}
          {tradeStatus === 'loss' && (
            <g>
              <circle cx="280" cy={yScaler(stopLossLevel)} r="8" fill="#ef4444" className="animate-ping" />
              <circle cx="280" cy={yScaler(stopLossLevel)} r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
            </g>
          )}
        </svg>

        {/* Floating Indicator Title */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-[9px] font-mono text-slate-400 bg-slate-950/80 px-2 py-1 rounded border border-slate-800">
          <TrendingUp className="w-3 h-3 text-emerald-400" />
          <span>Interactive Playback Active</span>
        </div>
      </div>

      <div className="mt-2.5 text-[11px] text-slate-400 leading-relaxed bg-[#0d121f]/50 p-2 rounded-lg border border-slate-800/60 flex items-start gap-1.5">
        <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <div>
          <span className="text-slate-200 font-semibold">How to study this:</span> The chart shows the real-time build-up of the entry trigger. Click <span className="text-emerald-400 font-bold">Simulate Trade</span> to watch the candles construct and execute standard buy order at confirmed reversal structures!
        </div>
      </div>
    </div>
  );
};
