import { GlossaryTerm } from '../types';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Bear Market',
    definition: 'A market condition in which prices are falling, or are expected to fall, typically marked by widespread pessimism and a decline of 20% or more from recent highs.',
    category: 'General'
  },
  {
    term: 'Bull Market',
    definition: 'A financial market state in which prices are rising or are expected to rise, driven by optimism, investor confidence, and strong economic signals.',
    category: 'General'
  },
  {
    term: 'Call Option',
    definition: 'An options contract that gives the buyer the right (but not the obligation) to purchase an underlying stock or asset at a specified strike price within a specific timeframe.',
    category: 'Options'
  },
  {
    term: 'Put Option',
    definition: 'An options contract that gives the buyer the right (but not the obligation) to sell an underlying stock or asset at a specified strike price within a specific timeframe.',
    category: 'Options'
  },
  {
    term: 'Stop Loss',
    definition: 'An order placed with a broker to sell an asset when it reaches a specific price limit. It is designed to limit an investor\'s loss on a security position.',
    category: 'General'
  },
  {
    term: 'Limit Order',
    definition: 'An order to buy or sell a stock with a restriction on the maximum price to be paid or the minimum price to be received.',
    category: 'General'
  },
  {
    term: 'Market Order',
    definition: 'A buy or sell order to be executed immediately at the current best available market price.',
    category: 'General'
  },
  {
    term: 'Implied Volatility (IV)',
    definition: 'A metric that captures the market\'s expectation of future volatility in an underlying asset, heavily impacting option premium pricing.',
    category: 'Options'
  },
  {
    term: 'Theta (Time Decay)',
    definition: 'A Greek measurement representing the rate of decline in the value of an option contract as time passes, accelerating as expiration approaches.',
    category: 'Options'
  },
  {
    term: 'Intraday Trading',
    definition: 'The practice of buying and selling financial instruments within the same trading day, closing out all positions before the market closes.',
    category: 'General'
  },
  {
    term: 'Swing Trading',
    definition: 'A speculative trading strategy in which an asset is held for one to several days or weeks in an effort to profit from price swings or shifts.',
    category: 'General'
  },
  {
    term: 'Scalping',
    definition: 'A very short-term trading style focused on making multiple small profits on very small price changes, holding trades for seconds or minutes.',
    category: 'General'
  },
  {
    term: 'Support',
    definition: 'A price level where a downtrend tends to pause due to a concentration of demand or buying interest.',
    category: 'Technical'
  },
  {
    term: 'Resistance',
    definition: 'A price level where an uptrend tends to pause or reverse due to a concentration of supply or selling interest.',
    category: 'Technical'
  },
  {
    term: 'Breakout',
    definition: 'When an asset\'s price moves above a resistance level or below a support level, usually accompanied by high trading volume.',
    category: 'Technical'
  },
  {
    term: 'VWAP (Volume Weighted Average Price)',
    definition: 'An intraday technical indicator that shows the ratio of the value of a security traded to the total volume traded over a specific session.',
    category: 'Technical'
  },
  {
    term: 'RSI (Relative Strength Index)',
    definition: 'A momentum oscillator that measures the speed and change of price movements, oscillating between 0 and 100 to signal overbought (>70) or oversold (<30) conditions.',
    category: 'Technical'
  },
  {
    term: 'MACD (Moving Average Convergence Divergence)',
    definition: 'A trend-following momentum indicator that shows the relationship between two moving averages of an asset\'s price, plotted with a signal line.',
    category: 'Technical'
  },
  {
    term: 'Bollinger Bands',
    definition: 'A volatility indicator consisting of a simple moving average (usually 20 periods) and two standard deviation bands plotted above and below it.',
    category: 'Technical'
  },
  {
    term: 'Leverage',
    definition: 'The use of borrowed funds (margin) to increase the size of a trading position, multiplying both potential gains and losses.',
    category: 'General'
  },
  {
    term: 'Margin Call',
    definition: 'A broker\'s demand that an investor deposit additional money or securities so that the account is brought up to the minimum required value.',
    category: 'General'
  },
  {
    term: 'Risk to Reward Ratio',
    definition: 'A measure used by traders to compare the expected return of an investment to the amount of risk undertaken to capture that return.',
    category: 'General'
  },
  {
    term: 'Position Sizing',
    definition: 'The calculation of the specific amount of capital or shares a trader will risk on a single trade, adjusted based on volatility and stop-loss distance.',
    category: 'General'
  },
  {
    term: 'Slippage',
    definition: 'The difference between the expected price of a trade and the actual price at which the trade is executed, common during high volatility.',
    category: 'General'
  },
  {
    term: 'FOMO (Fear of Missing Out)',
    definition: 'A psychological bias where a trader rushes into a trade out of fear of missing a sudden massive rally, usually leading to buying at the absolute high.',
    category: 'Psychology'
  },
  {
    term: 'Revenge Trading',
    definition: 'The destructive psychological behavior of entering impulsive trades with increased size immediately after a loss, attempting to "make the money back" rapidly.',
    category: 'Psychology'
  }
];
