export interface Strategy {
  id: string;
  name: string;
  category: string;
  timeframe: string;
  marketConditions: string;
  entryRules: string[];
  exitRules: string[];
  stopLoss: string;
  target: string;
  riskReward: string;
  advantages: string[];
  disadvantages: string[];
  commonMistakes: string[];
  chartType: 'candle' | 'line' | 'rsi' | 'macd' | 'breakout' | 'vwap' | 'bollinger';
  isPremium?: boolean;
  isCustom?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index in options
  explanation: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'General' | 'Technical' | 'Options' | 'Psychology';
}

export interface JournalEntry {
  id: string;
  date: string;
  ticker: string;
  type: 'BUY' | 'SELL';
  strategyId: string;
  strategyName: string;
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  pnl: number;
  notes: string;
  status: 'WIN' | 'LOSS' | 'BREAKEVEN';
}

export interface StrategyNote {
  id: string;
  strategyId: string; // "general" or specific strategy id
  strategyName: string;
  title: string;
  content: string;
  updatedAt: string;
}

export interface WatchlistTicker {
  symbol: string;
  name: string;
  price: number;
  change: number; // percentage
  history: number[]; // Sparkline data
  category: 'Stock' | 'Crypto' | 'Indices' | 'Forex';
}

export interface EconomicEvent {
  id: string;
  time: string;
  currency: string;
  event: string;
  importance: 'HIGH' | 'MEDIUM' | 'LOW';
  actual: string;
  forecast: string;
  previous: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  summary: string;
  impact: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  content: string;
}
