import { Strategy } from '../types';

export const DEFAULT_STRATEGIES: Strategy[] = [
  {
    id: 'orb-intraday',
    name: '9:20 AM Opening Range Breakout (ORB)',
    category: 'Intraday Trading',
    timeframe: '5 Minute',
    marketConditions: 'High volatility, first 30 minutes of the market session.',
    entryRules: [
      'Identify the high and low of the first 15 minutes of the trading session (9:15 AM - 9:30 AM).',
      'Wait for a 5-minute candle to close above the opening range high (for long) or below the opening range low (for short).',
      'Ensure volume on the breakout candle is higher than the average volume of the previous 5 candles.'
    ],
    exitRules: [
      'Take partial profit (50%) at Target 1.',
      'Trail the remaining position with the 9-period EMA (Exponential Moving Average) as a dynamic exit guide.',
      'Exit immediately if a bearish engulfing candle patterns forms against your direction on high volume.'
    ],
    stopLoss: 'Placed at the midpoint of the opening 15-minute range, or just below the breakout candle low.',
    target: '1.5x to 2x the range height added to the breakout level.',
    riskReward: '1:1.5 to 1:2',
    advantages: [
      'Captures early morning momentum which often yields fast moves.',
      'Objectively defined entry and exit levels based on clear price boundaries.',
      'Reduces overtrading by focusing only on the opening segment.'
    ],
    disadvantages: [
      'High rate of false breakouts (whipsaws) on choppy or sideways days.',
      'Requires rapid, disciplined execution to avoid slippage.',
      'Not suitable for slow-moving, low-volume stocks.'
    ],
    commonMistakes: [
      'Entering before the 5-minute candle closes (jumping the gun).',
      'Ignoring wider market context (trading long breakouts when the overall index is crashing).',
      'Failing to adjust position sizing to account for large opening volatility.'
    ],
    chartType: 'breakout'
  },
  {
    id: 'pivot-swing',
    name: 'Support Pivot Pullback Strategy',
    category: 'Swing Trading',
    timeframe: 'Daily / 4 Hour',
    marketConditions: 'Established medium-to-long term bullish uptrend.',
    entryRules: [
      'Identify a stock in a strong uptrend making higher highs and higher lows.',
      'Wait for a pullback to a major historical support level or the 50-day Simple Moving Average (SMA).',
      'Look for a bullish reversal candle (e.g., Hammer, Pin Bar, or Engulfing) forming exactly at this support zone.'
    ],
    exitRules: [
      'Sell 50% of the position near the previous swing high.',
      'Let the rest run with a trailing stop-loss set below subsequent higher lows on the daily chart.',
      'Exit if the price closes below the 50-day SMA on high volume.'
    ],
    stopLoss: 'Placed 1-2% below the recent swing low / support pivot.',
    target: 'The previous swing high level or a 10-15% price gain from entry.',
    riskReward: '1:2 to 1:3',
    advantages: [
      'High win-rate due to trading in the direction of the established trend.',
      'Allows for tight stop-loss placement near structural pivot zones.',
      'Less time-consuming than intraday trading; requires only daily review.'
    ],
    disadvantages: [
      'Requires patience as pullbacks can take days or weeks to materialize.',
      'Can result in missed opportunities if the stock continues to rally without pulling back.',
      'Subject to overnight gap risk.'
    ],
    commonMistakes: [
      'Buying a stock that is crashing due to poor fundamentals (thinking it is just a "pullback").',
      'Placing the stop-loss too tight, leading to premature exit before the move begins.',
      'Not waiting for a bullish confirmation candle at support.'
    ],
    chartType: 'candle'
  },
  {
    id: 'bull-call-fo',
    name: 'Bull Call Spread Strategy',
    category: 'F&O Strategies',
    timeframe: 'Daily / Weekly',
    marketConditions: 'Moderately bullish view on the underlying asset with limited upside expectation.',
    entryRules: [
      'Buy 1 In-The-Money (ITM) Call Option (e.g., strike price close to current spot price).',
      'Simultaneously sell 1 Out-Of-The-Money (OTM) Call Option with a higher strike price in the same expiry.',
      'Ensure the net premium paid is kept minimal, representing the maximum risk of the trade.'
    ],
    exitRules: [
      'Exit the entire spread together before expiry if the target spot price is reached.',
      'Hold until expiry if the underlying asset finishes above the short call strike to achieve maximum profit.'
    ],
    stopLoss: 'Mental exit if the underlying price breaks below a major weekly support zone.',
    target: 'Underlying asset reaching the strike price of the sold OTM Call option.',
    riskReward: '1:1.2 to 1:1.8',
    advantages: [
      'Risk is strictly capped to the net premium paid.',
      'Lower margin requirement than naked option writing.',
      'Reduces the impact of time decay (theta) compared to buying a single naked call.'
    ],
    disadvantages: [
      'Upside potential is capped at the strike price of the short call minus premium paid.',
      'Requires the stock to move in the desired direction; sideways movement leads to gradual premium loss.'
    ],
    commonMistakes: [
      'Choosing strikes that are too far apart, which makes it behave like a risky naked call.',
      'Ignoring implied volatility (IV) levels before entering.',
      'Trading in illiquid contracts with massive bid-ask spreads.'
    ],
    chartType: 'line'
  },
  {
    id: 'momentum-buy-options',
    name: 'Momentum Breakout Option Buying',
    category: 'Options Buying',
    timeframe: '15 Minute / 5 Minute',
    marketConditions: 'High momentum, volume expansion, trend days.',
    entryRules: [
      'Identify a consolidation pattern (e.g., flag or rectangle) on the 15-minute chart.',
      'Wait for a clean breakout with a volume spike on the underlying stock.',
      'Buy an At-The-Money (ATM) or Slightly In-The-Money (ITM) call option of the current weekly series.'
    ],
    exitRules: [
      'Sell 100% of the contract if momentum stalls or option price declines by 20% from entry.',
      'Take partial profits as soon as the option premium doubles (100% gain).',
      'Exit option when the underlying price reaches its structural resistance target.'
    ],
    stopLoss: 'Set at a maximum of 25-30% of the option premium, or if the underlying asset breaks back inside the consolidation range.',
    target: 'Option premium appreciating by 50% to 100%.',
    riskReward: '1:2 to 1:3',
    advantages: [
      'Provides high leverage and massive return percentage on successful momentum thrusts.',
      'Defined maximum risk (premium paid).',
      'Fast turnover of capital.'
    ],
    disadvantages: [
      'Extremely high time decay (theta) decay, especially closer to expiry.',
      'Whipsaws can wipe out option premiums quickly due to volatility crush (IV crush).',
      'Low win rate requires strict discipline.'
    ],
    commonMistakes: [
      'Buying deep Out-Of-The-Money (OTM) options because they are cheap (zero delta traps).',
      'Holding option buying positions overnight when the market is sideways.',
      'Averaging down on a losing option position.'
    ],
    chartType: 'line'
  },
  {
    id: 'iron-condor-selling',
    name: 'Iron Condor Income Strategy',
    category: 'Options Selling',
    timeframe: 'Daily / Weekly',
    marketConditions: 'Low volatility, sideways consolidated range-bound markets.',
    entryRules: [
      'Sell 1 Out-Of-The-Money (OTM) Put option and buy a further OTM Put option (Bull Put Spread).',
      'Sell 1 OTM Call option and buy a further OTM Call option (Bear Call Spread).',
      'Set strike prices around standard deviation boundaries (e.g., delta of 0.15 for short options).'
    ],
    exitRules: [
      'Exit the entire iron condor when 50% to 60% of the maximum credit is captured.',
      'Exit if the underlying breaches either of the short strike boundaries (risk management trigger).'
    ],
    stopLoss: 'Exit the breached side if the spot price crosses the short option strike.',
    target: 'Keep 50% of the initial credit premium received.',
    riskReward: '2:1 to 3:1 (Risk is typically higher than reward, but probability of success is 75%+)',
    advantages: [
      'High probability of winning trades.',
      'Benefits greatly from time decay (Theta) and volatility contraction (Vega).',
      'Clearly defined risk boundaries on both sides.'
    ],
    disadvantages: [
      'A single large gap-up or gap-down can wipe out multiple profitable trade cycles.',
      'Requires margin and carries capped but larger relative risk than reward.'
    ],
    commonMistakes: [
      'Not initiating the trade with sufficient margin buffer.',
      'Failing to adjust or exit the losing side when the market trends strongly.',
      'Setting short strikes too close to the money for slightly more premium.'
    ],
    chartType: 'line'
  },
  {
    id: 'ema-scalper',
    name: '1-Minute EMA Cross Scalper',
    category: 'Scalping',
    timeframe: '1 Minute',
    marketConditions: 'Active session hours with continuous high-volume order flows.',
    entryRules: [
      'Plot 9 EMA (Exponential Moving Average) and 21 EMA on a 1-minute chart.',
      'Enter long when the 9 EMA crosses above the 21 EMA and the price is also above the VWAP.',
      'Enter short when the 9 EMA crosses below the 21 EMA and the price is below the VWAP.'
    ],
    exitRules: [
      'Exit instantly on a 1-minute candle closing back across the 9 EMA in the opposite direction.',
      'Take quick profits as soon as a 1:1 risk-reward or 10-15 pips/points are gained.'
    ],
    stopLoss: 'Placed just below the low/high of the setup candle (usually very tight).',
    target: 'Quick 1:1 or 1:1.5 return on risk within 3 to 10 candles.',
    riskReward: '1:1 to 1:1.5',
    advantages: [
      'Very short exposure time to market risk (minutes).',
      'Numerous trading setups generated throughout the day.',
      'Provides high psychological satisfaction for traders who prefer fast actions.'
    ],
    disadvantages: [
      'High commissions and transaction charges can eat up a large portion of profits.',
      'Requires intense, undivided attention and ultra-fast reaction times.',
      'Prone to slippage and technical delay errors.'
    ],
    commonMistakes: [
      'Trading during lunch hours when volume is thin and market is choppy.',
      'Letting a scalp turn into an intraday or positional investment because of refusal to cut losses.',
      'Overtrading (taking 50+ low-quality trades a day).'
    ],
    chartType: 'vwap'
  },
  {
    id: 'pinbar-reversal',
    name: 'Pin Bar Price Action Reversal',
    category: 'Price Action',
    timeframe: '15 Minute / 1 Hour / Daily',
    marketConditions: 'Market reaching overextended horizontal resistance/support levels or key moving averages.',
    entryRules: [
      'Identify a well-defined support or resistance horizontal zone.',
      'Wait for the price to spike through the zone but reject it, creating a Pin Bar (candle with a tiny body at one end and a long nose/shadow pointing away).',
      'Enter on the close of the confirmational Pin Bar, or place a limit order at the 50% retracement level of the pin bar tail.'
    ],
    exitRules: [
      'Take partial profits at the next immediate structural support/resistance pivot.',
      'Hold the rest to capture a complete swing reversal.'
    ],
    stopLoss: 'Placed exactly 1-2 pips/points beyond the extreme end of the pin bar tail.',
    target: 'The next logical major structural key support/resistance zone.',
    riskReward: '1:2 to 1:4',
    advantages: [
      'Highly visual and objective setup with precise risk limits.',
      'Sourced directly from basic supply and demand dynamics without lag.',
      'Allows high risk-to-reward ratios because the stop loss is compact.'
    ],
    disadvantages: [
      'Requires discretionary interpretation of "high-quality" pin bars vs normal spikes.',
      'Whipsaw breakouts can trigger stops before reversing back.'
    ],
    commonMistakes: [
      'Trading pin bars that form in the middle of a tight, sideways congestion range.',
      'Trading tiny pin bars with very short tails that do not represent strong rejection.',
      'Ignoring the direction of the long-term trend (trading weak bullish pin bars in a structural bear market).'
    ],
    chartType: 'candle'
  },
  {
    id: 'bullish-engulfing',
    name: 'Bullish Engulfing Trend Reversal',
    category: 'Candlestick Patterns',
    timeframe: '15 Minute / 75 Minute / Daily',
    marketConditions: 'Following a sustained, multi-candle downward price swing.',
    entryRules: [
      'Ensure the asset has been in a short-term downward correction.',
      'Look for a small bearish candle followed immediately by a large bullish candle whose body completely engulfs (covers) the previous candle body.',
      'Confirm with a surge in trading volume on the engulfing candle.'
    ],
    exitRules: [
      'Exit if price breaks back below the entry candle low.',
      'Take profit when the price reaches recent local swing highs or minor resistance levels.'
    ],
    stopLoss: 'Placed just below the lowest point of the engulfing candle.',
    target: 'Next logical swing high resistance level.',
    riskReward: '1:1.5 to 1:2.5',
    advantages: [
      'Extremely easy to identify visually on any chart.',
      'Indicates a strong shift in market control from bears to bulls.',
      'Highly reliable when combined with support levels.'
    ],
    disadvantages: [
      'If the engulfing candle is massive, the stop-loss becomes very wide, reducing the risk-reward ratio.',
      'Does not work well in range-bound (flat) market conditions.'
    ],
    commonMistakes: [
      'Entering a trade when the engulfing candle occurs inside a sideways range.',
      'Failing to verify volume expansion on the bullish reversal candle.'
    ],
    chartType: 'candle'
  },
  {
    id: 'double-bottom',
    name: 'Double Bottom Chart Reversal Pattern',
    category: 'Chart Patterns',
    timeframe: '1 Hour / Daily',
    marketConditions: 'At the end of a prolonged bearish downtrend.',
    entryRules: [
      'Identify two distinct price lows at approximately the same level, separated by a peak in-between (creating a "W" shape).',
      'Locate the high of the peak between the two bottoms, which is known as the "Neckline".',
      'Wait for the price to break above and close above this Neckline on heavy volume.'
    ],
    exitRules: [
      'Take profit at the target level which is calculated using the height of the pattern.',
      'Use a trailing stop-loss below the neckline if the trend continues to accelerate upward.'
    ],
    stopLoss: 'Placed below the breakout candle, or below the midpoint of the entire double bottom pattern.',
    target: 'Calculated by measuring the vertical distance from the bottom to the neckline, and projecting that same distance upward from the neckline breakout point.',
    riskReward: '1:2',
    advantages: [
      'One of the most reliable and researched trend reversal patterns in technical analysis.',
      'Clear, mathematical price target projection.',
      'Easy to scan across multiple stocks.'
    ],
    disadvantages: [
      'Can take weeks or months to fully form on daily charts.',
      'False breakouts at the neckline can occur, trapping breakout traders.'
    ],
    commonMistakes: [
      'Buying early when the second bottom is forming, before the neckline is actually broken (anticipating the breakout).',
      'Ignoring wider sector trends (buying a reversal pattern on a stock when its entire industry is crashing).'
    ],
    chartType: 'candle'
  },
  {
    id: 'sr-squeeze',
    name: 'Support & Resistance Bounce Play',
    category: 'Support & Resistance',
    timeframe: '15 Minute / 1 Hour',
    marketConditions: 'Steady horizontal range-bound consolidated market.',
    entryRules: [
      'Identify a horizontal range where price has bounced off a support zone at least twice and rejected a resistance zone at least twice.',
      'When price touches the support line again, look for bullish candle rejection (like a hammer) and buy.',
      'When price touches the resistance line, look for a bearish rejection and short.'
    ],
    exitRules: [
      'Sell 100% of long positions at the opposite resistance boundary.',
      'Sell short positions at the opposite support boundary.'
    ],
    stopLoss: 'Strictly placed 0.5% to 1% outside the range boundaries.',
    target: 'The opposite boundary of the horizontal channel.',
    riskReward: '1:2 to 1:4 (depending on the height of the range channel)',
    advantages: [
      'Highly repetitive setups in consolidated markets.',
      'Very clear, tight risk levels.'
    ],
    disadvantages: [
      'Ranges eventually breakout, which results in guaranteed losses on the breakout trade if you try to trade the bounce.',
      'Requires constant patience to buy only at the absolute extremes.'
    ],
    commonMistakes: [
      'Buying in the middle of the range where the risk-reward is 1:1 or worse.',
      'Holding on to range-bounce positions when a breakout begins with huge volume.'
    ],
    chartType: 'candle'
  },
  {
    id: 'vol-breakout',
    name: 'Volume-Backed Channel Breakout',
    category: 'Breakout Strategies',
    timeframe: '15 Minute / Daily',
    marketConditions: 'Exit from long-term consolidation or flag pattern.',
    entryRules: [
      'Draw trendlines bounding a consolidation channel (e.g., flat channel or symmetrical triangle).',
      'Identify a candle that closes outside the boundaries on volume that is at least 2x the 20-day average volume.',
      'Buy immediately on the close of the breakout candle.'
    ],
    exitRules: [
      'Trail with a 20-day EMA trailing stop.',
      'Take 50% profit when the price reaches a major historical structural resistance level.'
    ],
    stopLoss: 'Placed back inside the channel, just below the breakout candle or the consolidation mid-point.',
    target: '1.5x the height of the channel projected from the breakout point.',
    riskReward: '1:2',
    advantages: [
      'High momentum moves which run fast once initiated.',
      'Volume confirmation filters out a large percentage of false breakouts.'
    ],
    disadvantages: [
      'Breakout candles can be very long, forcing a wide stop loss.',
      'Slippage during fast market moves can worsen the execution price.'
    ],
    commonMistakes: [
      'Chasing breakouts that have already moved 5-10% without waiting for a retest or initial consolidation.',
      'Trading breakouts without checking volume expansion.'
    ],
    chartType: 'breakout'
  },
  {
    id: 'donchian-trend',
    name: 'Donchian Channel Trend Rider',
    category: 'Trend Following',
    timeframe: 'Daily',
    marketConditions: 'Highly trending, macro bull or bear markets.',
    entryRules: [
      'Plot a 20-period Donchian Channel on the daily chart (shows the 20-day high and 20-day low).',
      'Go long when the price closes above the upper channel boundary (new 20-day high).',
      'Go short when the price closes below the lower channel boundary (new 20-day low).'
    ],
    exitRules: [
      'Exit long position when the price drops below and touches the lower 20-day Donchian Channel line.',
      'Exit short position when the price rallies and touches the upper 20-day channel line.'
    ],
    stopLoss: 'Placed at the middle line of the Donchian Channel (representing the 20-day average price).',
    target: 'Open target, holding as long as the market continues to establish new highs/lows.',
    riskReward: '1:3 to 1:5 (Wins are large, though win-rate is typically lower around 35-40%)',
    advantages: [
      'Ensures you never miss a massive trending move in the market.',
      '100% systematic, eliminating emotional trading decisions.'
    ],
    disadvantages: [
      'Prone to severe drawdowns and repetitive small losses during flat, range-bound markets.',
      'Requires strong psychological resilience to hold trades through deep pullbacks.'
    ],
    commonMistakes: [
      'Exiting early because of minor profit targets, missing the multi-month trend.',
      'Changing the channel settings frequently to match past data (curve fitting).'
    ],
    chartType: 'line'
  },
  {
    id: 'golden-cross-ma',
    name: 'Golden Cross (50-EMA & 200-EMA)',
    category: 'Moving Average Strategies',
    timeframe: 'Daily / 1 Hour',
    marketConditions: 'Long-term trend reversal from bearish to bullish.',
    entryRules: [
      'Plot the 50-period Exponential Moving Average (EMA) and 200-period Exponential Moving Average (EMA).',
      'Wait for the faster 50 EMA to cross above the slower 200 EMA (The "Golden Cross").',
      'Verify that the overall sector index is also showing bullish strength.'
    ],
    exitRules: [
      'Exit when the 50 EMA crosses back below the 200 EMA (The "Death Cross").',
      'Alternatively, trail with a 100-day simple moving average to protect profits earlier.'
    ],
    stopLoss: 'Placed below the recent swing low formed before the cross occurred.',
    target: 'Open-ended trend ride, catching major long-term market rallies.',
    riskReward: '1:3 to 1:10',
    advantages: [
      'Filters out short-term market noise, focusing strictly on major macro trends.',
      'Highly watched by institutional investors, giving it self-fulfilling reliability.'
    ],
    disadvantages: [
      'A lagging indicator; the crossover occurs after a significant portion of the trend has already moved.',
      'Very expensive whipsaws in volatile sideways markets.'
    ],
    commonMistakes: [
      'Trading crossovers on very small timeframes (like 1-minute charts) where they generate constant noise.',
      'Not maintaining patience during pullbacks after the cross.'
    ],
    chartType: 'candle'
  },
  {
    id: 'rsi-divergence',
    name: 'RSI Divergence & Reversal',
    category: 'RSI Strategies',
    timeframe: '15 Minute / 1 Hour / Daily',
    marketConditions: 'Overextended markets showing momentum exhaustion.',
    entryRules: [
      'Look for price to make a "Lower Low" while the Relative Strength Index (RSI) makes a "Higher Low" (Bullish Divergence).',
      'Look for price to make a "Higher High" while the RSI makes a "Lower High" (Bearish Divergence).',
      'Ensure the RSI is in oversold (<30) or overbought (>70) territory when the divergence occurs.',
      'Enter on the close of a candle that confirms reversal (e.g., a green candle following bullish divergence).'
    ],
    exitRules: [
      'Take 50% profit when RSI returns to the neutral 50 level.',
      'Exit the remaining position when RSI reaches the opposite extreme (e.g., 70 for longs).'
    ],
    stopLoss: 'Placed just below the local swing low (for longs) or above the local swing high (for shorts).',
    target: 'The next structural key pivot resistance or support level.',
    riskReward: '1:2 to 1:3',
    advantages: [
      'Allows traders to enter near the very beginning of a trend reversal.',
      'Provides objective momentum confirmation.',
      'Reduces the risk of buying high or selling low.'
    ],
    disadvantages: [
      'Divergences can persist for a long time in extremely strong trends, leading to premature entries.',
      'Requires strict stop-loss discipline as the counter-trend move can be violent.'
    ],
    commonMistakes: [
      'Entering a trade immediately when a divergence appears, before any price reversal confirmation.',
      'Trading divergence against an extremely strong fundamental macro trend.'
    ],
    chartType: 'rsi'
  },
  {
    id: 'macd-centerline',
    name: 'MACD Centerline Crossover',
    category: 'MACD Strategies',
    timeframe: '1 Hour / 15 Minute',
    marketConditions: 'Strong emerging momentum following consolidation.',
    entryRules: [
      'Plot the standard MACD (12, 26, 9) indicator.',
      'Wait for the MACD line and Signal line to both cross above the zero centerline (for bullish entry).',
      'Wait for both lines to cross below the zero centerline (for bearish entry).',
      'Ensure the MACD histogram is expanding in the direction of the trade.'
    ],
    exitRules: [
      'Exit long trades when the MACD line crosses below the Signal line.',
      'Exit short trades when the MACD line crosses above the Signal line.'
    ],
    stopLoss: 'Placed below the nearest local swing pivot point on the price chart.',
    target: 'Next structural support or resistance, or trail the swing with the MACD crossover line.',
    riskReward: '1:1.5 to 1:2',
    advantages: [
      'Filters out minor whipsaws that occur on simple MACD signal-line crosses below the zero line.',
      'Confirms that macro momentum has turned bullish/bearish.'
    ],
    disadvantages: [
      'A lagging indicator that can delay entry during very sharp, fast reversals.',
      'Can result in small losses if the trend fails to sustain after the crossover.'
    ],
    commonMistakes: [
      'Taking trades when the MACD lines are flat and hugging the zero line (representing no volume/trend).',
      'Using default parameters on extremely fast-moving instruments without testing.'
    ],
    chartType: 'macd'
  },
  {
    id: 'vwap-pullback',
    name: 'VWAP Pullback Play',
    category: 'VWAP Strategies',
    timeframe: '5 Minute / 15 Minute',
    marketConditions: 'Strong intraday trending stock with high volume.',
    entryRules: [
      'Ensure the price is trading above the Volume Weighted Average Price (VWAP) for long setups, or below for shorts.',
      'Wait for the price to pull back and touch or come extremely close to the VWAP line.',
      'Wait for a bullish rejection candle (e.g., Hammer or strong green engulfing) to close, confirming support at VWAP.'
    ],
    exitRules: [
      'Sell 50% of the position at the intraday high/low of the day.',
      'Hold the rest and exit if the price closes below the VWAP on high volume.'
    ],
    stopLoss: 'Placed strictly 2-3 tick intervals below the VWAP line or below the pullback candle low.',
    target: 'Test of the previous high of the day (for long) or low of the day (for short).',
    riskReward: '1:2 to 1:3',
    advantages: [
      'VWAP is the most watched intraday technical indicator used by institutional algorithms.',
      'Allows entries with high-precision, low-risk stop-losses near institutional average price.',
      'Keeps you on the right side of the institutional flow.'
    ],
    disadvantages: [
      'Does not apply to daily or weekly charts (only active during intraday sessions).',
      'Can result in sharp stop-outs if the stock breaks the VWAP line with high institutional selling.'
    ],
    commonMistakes: [
      'Buying on VWAP touch when the stock is falling on panic selling volume.',
      'Using VWAP on illiquid stocks with sporadic volume.'
    ],
    chartType: 'vwap'
  },
  {
    id: 'bb-squeeze',
    name: 'Bollinger Band Squeeze & Expansion',
    category: 'Bollinger Bands',
    timeframe: '15 Minute / 1 Hour',
    marketConditions: 'Ultra-low volatility consolidation followed by sudden high volatility expansion.',
    entryRules: [
      'Wait for the upper and lower Bollinger Bands (20, 2) to contract to their narrowest width in at least 50 candles (representing a "squeeze").',
      'Go long when a candle breaks out and closes above the upper Bollinger Band.',
      'Go short when a candle breaks down and closes below the lower Bollinger Band.',
      'Confirm the breakout direction with volume expansion.'
    ],
    exitRules: [
      'Exit the trade when the price crosses and closes back over the central 20-period simple moving average line.'
    ],
    stopLoss: 'Placed at the middle band line (20 SMA) of the Bollinger Bands.',
    target: 'Hold as long as the price continues to walk up/down the outer band boundary.',
    riskReward: '1:2 to 1:3.5',
    advantages: [
      'Volatility squeeze represents a coil spring; the resulting breakout is often explosive.',
      'Highly objective rules with dynamic boundaries.'
    ],
    disadvantages: [
      'False breakouts can trigger stops and instantly reverse to test the opposite band ("head fakes").',
      'Requires waiting during long periods of sideways consolidation.'
    ],
    commonMistakes: [
      'Trading breakouts when the bands are still wide and flat.',
      'Not checking volume; low-volume band breaches often fail.'
    ],
    chartType: 'bollinger'
  },
  {
    id: 'volume-climax',
    name: 'Volume Climax Reversal Strategy',
    category: 'Volume Analysis',
    timeframe: '5 Minute / 15 Minute',
    marketConditions: 'Highly overextended price moves, either up or down.',
    entryRules: [
      'Identify a stock that has been rising or falling rapidly for multiple candles.',
      'Look for an exceptionally large volume spike (at least 3-4x the recent average volume) accompanied by a candle with a wide range and a closing position that shows a struggle (e.g., shooting star or deep hammer).',
      'Enter counter-trend on the next candle confirming reversal.'
    ],
    exitRules: [
      'Exit quickly near the nearest technical moving average support or resistance.',
      'Do not hold for long trend runs, as this captures a sudden sharp capitulation bounce.'
    ],
    stopLoss: 'Placed strictly above/below the high/low of the high-volume climax candle.',
    target: '38.2% to 50% Fibonacci retracement of the climax trend wave.',
    riskReward: '1:1.5 to 1:2',
    advantages: [
      'Captures institutional capitulation blocks where panic peaks.',
      'Can yield very rapid profits in a matter of minutes.'
    ],
    disadvantages: [
      'Extremely high risk as you are "catching a falling knife" or shorting a vertical rocket.',
      'Requires absolute discipline; a single failure without stop-loss can wipe out accounts.'
    ],
    commonMistakes: [
      'Failing to use a physical stop-loss order.',
      'Entering before the climax candle has actually closed.'
    ],
    chartType: 'candle'
  },
  {
    id: 'risk-onepercent-premium',
    name: '👑 Advanced Capital Protection & 1% Risk Rule Strategy',
    category: 'Risk Management',
    timeframe: 'All Timeframes',
    marketConditions: 'All market conditions; foundational risk management architecture.',
    entryRules: [
      'Determine your total trading capital (e.g., $10,000).',
      'Calculate 1% of this capital ($100). This is the maximum amount you are allowed to lose on a single trade.',
      'Identify the technical stop-loss distance of your trade setup (e.g., $2 difference between entry and stop-loss on a stock).',
      'Calculate exact position size: Position Size = Maximum Risk ($100) / Stop-Loss Distance ($2) = 50 Shares.'
    ],
    exitRules: [
      'Cut the loss immediately if the pre-calculated stop-loss is reached; never average down or shift stop losses wider.',
      'Take partial profit at 2% risk-to-reward ($200) to maintain a positive expectancy.'
    ],
    stopLoss: 'Defined strictly by technical structures before entering.',
    target: 'Minimum 2x the stop-loss distance to ensure a 1:2 risk-reward ratio.',
    riskReward: '1:2 minimum',
    advantages: [
      'Completely prevents account blowups and large emotional drawdowns.',
      'Allows a trader to lose 10-15 trades in a row and still have 85%+ of their capital.',
      'Takes the emotional calculation out of position sizing.'
    ],
    disadvantages: [
      'Requires tedious calculation before every trade (solved by utilizing calculators).',
      'May result in small initial profits on smaller accounts, which tests patience.'
    ],
    commonMistakes: [
      'Rounding up position sizes because of "gut feeling".',
      'Failing to account for slippage or overnight gap risks when calculating size.',
      'Increasing risk percentage after a string of wins (greed cycle).'
    ],
    chartType: 'line',
    isPremium: true
  },
  {
    id: 'fomo-psychology-premium',
    name: '👑 Trading Psychology: The Rule-Based Impulse Mitigation Protocol',
    category: 'Trading Psychology',
    timeframe: 'Daily / Continuous',
    marketConditions: 'Highly volatile, rapid breakout days when stocks shoot up 10%+ in minutes.',
    entryRules: [
      'Establish a strict "No Chasing" rule: If a stock has already moved more than 3% away from a technical breakout point, do not touch it.',
      'Create a checklist of 4 criteria (Trend, Support/Resistance, Volume, Reversal Confirmation). Only enter if at least 3 of 4 are met.',
      'If you feel an intense urge to buy a stock because of social media or quick green candles, force yourself to write down the trade plan on paper first, wait 5 minutes, and then re-evaluate.'
    ],
    exitRules: [
      'Exit according to pre-defined technical criteria, not based on fear or greed fluctuations.'
    ],
    stopLoss: 'Always set in the system, never kept "mentally" where emotional overrides can happen.',
    target: 'Exit on target levels, not when you feel "too rich" or "too scared".',
    riskReward: '1:2 minimum expectancy',
    advantages: [
      'Saves thousands of dollars in emotional buying at the absolute peak of hype cycles.',
      'Develops iron-clad professional discipline and consistency.',
      'Helps you transition from a gambler to a professional business operator.'
    ],
    disadvantages: [
      'Requires active self-control, which is mentally taxing.',
      'You will miss some extreme rocket moves that continue without logic (though you protect capital).'
    ],
    commonMistakes: [
      'Believing "this time is different" and overriding rules.',
      'Revenge trading to recover a loss immediately.'
    ],
    chartType: 'line',
    isPremium: true
  }
];
