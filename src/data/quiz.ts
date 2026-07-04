import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'If you have a $10,000 trading account and follow the strict 1% Risk Rule, what is the maximum dollar amount you should lose on any single trade?',
    options: [
      '$50',
      '$100',
      '$200',
      '$1,000'
    ],
    correctAnswer: 1,
    explanation: 'The 1% risk rule dictates that you should never risk more than 1% of your total account value on a single trade. 1% of $10,000 is $100. This protects your account from deep losing streaks.'
  },
  {
    id: 'q2',
    question: 'Which of the following option Greeks measures the rate of decay over time, often known as the option\'s "silent killer" for buyers?',
    options: [
      'Delta',
      'Gamma',
      'Theta',
      'Vega'
    ],
    correctAnswer: 2,
    explanation: 'Theta represents the rate of time decay of an option contract. As expiration approaches, Theta decay accelerates, eroding the option\'s premium value daily.'
  },
  {
    id: 'q3',
    question: 'A trader buys a stock because they saw it rally 10% in 5 minutes on a social media tip, without doing any technical analysis. This behavior is a prime example of which psychological pitfall?',
    options: [
      'FOMO (Fear Of Missing Out)',
      'Revenge Trading',
      'Confirmation Bias',
      'Gambler\'s Fallacy'
    ],
    correctAnswer: 0,
    explanation: 'FOMO occurs when a trader experiences anxiety that others are making money while they are left behind, leading to impulsive, unplanned buys at the peak of momentum.'
  },
  {
    id: 'q4',
    question: 'What does a "Bullish Divergence" on the RSI (Relative Strength Index) indicate?',
    options: [
      'Price is making lower lows, and RSI is also making lower lows.',
      'Price is making higher highs, and RSI is making lower highs.',
      'Price is making lower lows, but RSI is making higher lows, suggesting downward momentum is weakening.',
      'RSI is flat at the 50 level.'
    ],
    correctAnswer: 2,
    explanation: 'Bullish Divergence occurs when the price action makes a new low, but the RSI oscillator makes a higher low. This indicates that despite falling prices, the sellers are losing steam and a bullish reversal may be imminent.'
  },
  {
    id: 'q5',
    question: 'Which indicator calculates the cumulative average price based on both price and volume, and is extensively watched by institutional intraday traders?',
    options: [
      'RSI',
      'VWAP (Volume Weighted Average Price)',
      'Simple Moving Average (SMA)',
      'MACD'
    ],
    correctAnswer: 1,
    explanation: 'VWAP is an intraday-only indicator that weights prices by volume traded at each level. It represents the true average price traded, and is highly watched by institutional execution algorithms.'
  },
  {
    id: 'q6',
    question: 'When selling (writing) options, what is the primary source of benefit/profit if the underlying stock remains flat?',
    options: [
      'Delta appreciation',
      'Theta decay (Time decay capturing)',
      'IV spikes (implied volatility rising)',
      'Intrinsic value expansion'
    ],
    correctAnswer: 1,
    explanation: 'Option sellers collect premium upfront. If the underlying asset stays flat and time moves closer to expiry, the option premium erodes due to Theta (Time decay), allowing the seller to buy back the option cheaper or let it expire worthless to keep the entire premium.'
  },
  {
    id: 'q7',
    question: 'What is "Revenge Trading"?',
    options: [
      'Trading against your rival traders.',
      'Entering a trade with double the size right after a loss, driven by anger, to "win back" losses rapidly.',
      'Buying an asset when its competitors are falling.',
      'Taking profits too early to secure gains.'
    ],
    correctAnswer: 1,
    explanation: 'Revenge trading is an emotional response to a losing trade. Out of frustration, the trader bypasses risk controls, increases position sizing, and takes low-probability trades, which usually leads to a much larger loss or account blow-up.'
  },
  {
    id: 'q8',
    question: 'In chart analysis, what constitutes a valid "Double Bottom" pattern reversal?',
    options: [
      'Two consecutive days of red candle closes.',
      'Two distinct price troughs at similar levels, followed by a break and close above the peak high in between (the neckline).',
      'A series of lower highs and lower lows.',
      'When volume drops by exactly 50%.'
    ],
    correctAnswer: 1,
    explanation: 'A Double Bottom is a bullish reversal pattern resembling a "W". It is confirmed only when the price breaks and closes above the central swing high peak (the neckline) on strong volume.'
  }
];
