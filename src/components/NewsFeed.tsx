import React, { useState } from 'react';
import { Newspaper, TrendingUp, TrendingDown, BookOpen, Clock, Calendar } from 'lucide-react';
import { NewsItem } from '../types';

export const NewsFeed: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const news: NewsItem[] = [
    {
      id: 'n1',
      title: 'Global Chip Supply Chains Surge as AI Capital Allocations Double',
      source: 'TechPulse Finance',
      time: '15 mins ago',
      impact: 'BULLISH',
      summary: 'Tech indices rally globally as AI hardware suppliers witness unprecedented multi-quarter capital order surges, triggering massive breakouts.',
      content: 'Major chip manufacturers and technical hardware developers witnessed an absolute surge in multi-quarter forward allocations. According to industry tracking data, capital allocations for AI-grade accelerator pipelines have doubled year-over-year. Analysts predict this can drive a sustainable macro trend in tech and chip sector stocks, yielding technical breakout configurations across leading industry tickers.'
    },
    {
      id: 'n2',
      title: 'Crude Oil Inventories Record Unexpected Build; Gas Futures Decline',
      source: 'PetroMarket News',
      time: '42 mins ago',
      impact: 'BEARISH',
      summary: 'WTI Oil dips below $78 as official energy departments record larger-than-expected commercial stock builds, cooling global energy sector margins.',
      content: 'Crude oil inventories rose by 3.2 million barrels last week, contrary to analysts\' forecasts of a 1.2 million barrel drop. This surprise accumulation of commercial reserves has temporarily cooled pressure on oil pricing structures. Energy futures dipped by 1.8%, cooling commodity-focused sector margins. Swing traders are watching major energy stocks for pullback bounces at weekly horizontal supports.'
    },
    {
      id: 'n3',
      title: 'Inflation Indices Ease as Consumer Discretionary Spending Stabilizes',
      source: 'Federal Balance Report',
      time: '2 hours ago',
      impact: 'BULLISH',
      summary: 'Core inflation metrics decline marginally, increasing the probability of a dovish interest rate stance by monetary policymakers.',
      content: 'The latest core personal consumption expenditure indices stabilized at an annual rate of 2.6%, easing concerns about resurgent inflationary spikes. This stabilization signals positive traction for interest rate cuts, which would provide massive liquidity inflows to equity and option markets. Analysts recommend focusing on rate-sensitive sectors such as real estate, financial tech, and banking index components.'
    },
    {
      id: 'n4',
      title: 'Major E-Commerce Giant Announces 3-for-1 Stock Split Strategy',
      source: 'Equity Daily',
      time: '4 hours ago',
      impact: 'BULLISH',
      summary: 'Board approves stock split to increase retail investor liquidity, sparking a 4.5% pre-market rally.',
      content: 'The board of directors approved a 3-for-1 stock split to make shares more accessible to retail investors and option buyers. The split will take effect next month, triggering massive pre-market buying. Traders utilizing price-action breakout strategies are highlighting the stock as it moves past its multi-month horizontal consolidation zone on heavy volume.'
    }
  ];

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-md text-slate-100">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-1.5">
            <Newspaper className="w-5 h-5 text-emerald-400" />
            Financial News Feed
          </h3>
          <p className="text-xs text-slate-400">Live fundamental catalyst events and sentiment indices</p>
        </div>
      </div>

      {selectedNews ? (
        <div className="bg-slate-950 border border-slate-900 rounded-xl p-3.5 space-y-3 animate-fadeIn">
          <div className="flex justify-between items-start">
            <span
              className={`text-[8px] font-black px-2 py-0.5 rounded ${
                selectedNews.impact === 'BULLISH'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-900'
                  : 'bg-rose-950 text-rose-400 border border-rose-900'
              }`}
            >
              {selectedNews.impact} SENTIMENT
            </span>
            <button
              id="btn-close-news-detail"
              onClick={() => setSelectedNews(null)}
              className="text-slate-500 hover:text-slate-300 text-xs font-bold"
            >
              ← Back to Feed
            </button>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-100">{selectedNews.title}</h4>
            <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-500">
              <span className="font-semibold text-slate-400">{selectedNews.source}</span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3" /> {selectedNews.time}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed pt-1.5 border-t border-slate-900">
            {selectedNews.content}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {news.map((item) => {
            const isBullish = item.impact === 'BULLISH';
            return (
              <div
                key={item.id}
                onClick={() => setSelectedNews(item)}
                className="bg-slate-950 border border-slate-900 rounded-xl p-3 hover:border-slate-800 transition cursor-pointer flex flex-col gap-1.5"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-semibold text-slate-500">{item.source} • {item.time}</span>
                  <span
                    className={`text-[8px] font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5 ${
                      isBullish
                        ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/40'
                        : 'bg-rose-950/40 text-rose-400 border border-rose-900/40'
                    }`}
                  >
                    {isBullish ? <TrendingUp className="w-2 h-2" /> : <TrendingDown className="w-2 h-2" />}
                    {item.impact}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-200 line-clamp-1">{item.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
