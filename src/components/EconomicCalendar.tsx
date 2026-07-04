import React from 'react';
import { Calendar, Globe, AlertOctagon, TrendingUp, HelpCircle } from 'lucide-react';
import { EconomicEvent } from '../types';

export const EconomicCalendar: React.FC = () => {
  const events: EconomicEvent[] = [
    { id: 'ev1', time: '11:30 PM (Today)', currency: 'USD', event: 'Fed Interest Rate Decision', importance: 'HIGH', actual: '--', forecast: '5.25%', previous: '5.25%' },
    { id: 'ev2', time: '11:45 PM (Today)', currency: 'USD', event: 'FOMC Press Conference', importance: 'HIGH', actual: '--', forecast: '--', previous: '--' },
    { id: 'ev3', time: '05:30 PM (Tomorrow)', currency: 'INR', event: 'RBI Inflation Rate YoY', importance: 'HIGH', actual: '--', forecast: '4.80%', previous: '5.01%' },
    { id: 'ev4', time: '06:00 PM (Tomorrow)', currency: 'USD', event: 'CPI MoM (Inflation)', importance: 'HIGH', actual: '--', forecast: '0.20%', previous: '0.30%' },
    { id: 'ev5', time: '06:00 PM (In 2 Days)', currency: 'USD', event: 'Initial Jobless Claims', importance: 'MEDIUM', actual: '--', forecast: '215K', previous: '210K' },
    { id: 'ev6', time: '08:30 AM (In 3 Days)', currency: 'EUR', event: 'ECB President Lagarde Speech', importance: 'MEDIUM', actual: '--', forecast: '--', previous: '--' }
  ];

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-md text-slate-100">
      <div className="flex justify-between items-center mb-3.5">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-1.5">
            <Calendar className="w-5 h-5 text-emerald-400" />
            Economic Calendar
          </h3>
          <p className="text-xs text-slate-400">Key macroeconomic metrics impacting stock markets</p>
        </div>
        <Globe className="w-4 h-4 text-slate-500" />
      </div>

      <div className="space-y-2">
        {events.map((ev) => {
          const isHigh = ev.importance === 'HIGH';
          return (
            <div
              key={ev.id}
              className="bg-slate-950 border border-slate-900 rounded-xl p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 hover:border-slate-800 transition"
            >
              <div className="flex items-start gap-2.5">
                <span className="text-[9px] font-bold font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded uppercase mt-0.5">
                  {ev.currency}
                </span>

                <div>
                  <h4 className="text-xs font-bold text-slate-200">{ev.event}</h4>
                  <div className="text-[10px] text-slate-500 mt-0.5 font-mono">{ev.time}</div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 border-slate-900 pt-2 sm:pt-0">
                <div className="flex items-center gap-3 font-mono text-[10px]">
                  <div>
                    <span className="text-slate-500 block text-[8px] uppercase">Forecast</span>
                    <span className="text-slate-300 font-bold">{ev.forecast}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[8px] uppercase">Previous</span>
                    <span className="text-slate-400">{ev.previous}</span>
                  </div>
                </div>

                <span
                  className={`text-[8.5px] font-black px-2 py-0.5 rounded-full ${
                    isHigh
                      ? 'bg-rose-950 text-rose-400 border border-rose-900/60'
                      : 'bg-amber-950 text-amber-400 border border-amber-900/40'
                  }`}
                >
                  {ev.importance} IMPACT
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-[10px] text-slate-400 leading-relaxed bg-[#0d121f]/50 p-2.5 rounded-lg border border-slate-800 flex items-start gap-1.5">
        <AlertOctagon className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="text-slate-300 font-semibold">Trading Tip:</span> High-impact macroeconomic calendar events can induce huge option volatility crushes (IV crushes). It is highly advised to downsize positions or avoid options buying right before CPI/Fed announcements.
        </div>
      </div>
    </div>
  );
};
