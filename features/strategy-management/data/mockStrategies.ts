import { Strategy } from '../types';

export const mockStrategies: Strategy[] = [
  {
    id: '1',
    name: 'RSI Momentum Strategy',
    description: 'A proven momentum strategy using RSI divergence and volume confirmation for crypto markets. Perfect for identifying oversold and overbought conditions.',
    script: `// RSI Momentum Strategy
//@version=5
strategy("RSI Momentum", overlay=true)

// Parameters
rsi_length = input.int(14, "RSI Length")
rsi_oversold = input.int(30, "RSI Oversold")
rsi_overbought = input.int(70, "RSI Overbought")

// Calculate RSI
rsi = ta.rsi(close, rsi_length)

// Entry conditions
long_condition = ta.crossover(rsi, rsi_oversold)
short_condition = ta.crossunder(rsi, rsi_overbought)

// Strategy entries
if (long_condition)
    strategy.entry("Long", strategy.long)
if (short_condition)
    strategy.entry("Short", strategy.short)

// Plot RSI
plot(rsi, "RSI", color=color.purple)
hline(rsi_overbought, "Overbought", color=color.red)
hline(rsi_oversold, "Oversold", color=color.green)`,
    riskLevel: 'medium',
    timeframe: ['15m', '1h', '4h'],
    performance: {
      totalReturn: 34.5,
      sharpeRatio: 1.42,
      maxDrawdown: -12.3,
      winRate: 67.8,
      backtestPeriod: '2023-01-01 to 2024-01-01',
      totalTrades: 156,
      avgTradeDuration: 180
    },
    category: 'Momentum',
    tags: ['RSI', 'Momentum', 'Crypto', 'Scalping'],
    alertTemplate: 'RSI Momentum: {{strategy.order.action}} {{ticker}} at {{close}}',
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    name: 'EMA Crossover Conservative',
    description: 'Low-risk strategy using EMA crossovers with strict risk management for stable returns. Ideal for beginners and conservative traders.',
    script: `// EMA Crossover Conservative
//@version=5
strategy("EMA Conservative", overlay=true)

// Parameters
fast_ema = input.int(9, "Fast EMA")
slow_ema = input.int(21, "Slow EMA")
stop_loss = input.float(2.0, "Stop Loss %")

// Calculate EMAs
ema_fast = ta.ema(close, fast_ema)
ema_slow = ta.ema(close, slow_ema)

// Entry conditions
long_condition = ta.crossover(ema_fast, ema_slow)
short_condition = ta.crossunder(ema_fast, ema_slow)

// Strategy entries with stop loss
if (long_condition)
    strategy.entry("Long", strategy.long)
    strategy.exit("Long Exit", "Long", stop=close*(1-stop_loss/100))

if (short_condition)
    strategy.entry("Short", strategy.short)
    strategy.exit("Short Exit", "Short", stop=close*(1+stop_loss/100))

// Plot EMAs
plot(ema_fast, "Fast EMA", color=color.blue)
plot(ema_slow, "Slow EMA", color=color.red)`,
    riskLevel: 'low',
    timeframe: ['1h', '4h', '1d'],
    performance: {
      totalReturn: 18.2,
      sharpeRatio: 1.78,
      maxDrawdown: -6.1,
      winRate: 72.4,
      backtestPeriod: '2023-01-01 to 2024-01-01',
      totalTrades: 89,
      avgTradeDuration: 320
    },
    category: 'Trend Following',
    tags: ['EMA', 'Conservative', 'Low Risk', 'Trend'],
    alertTemplate: 'EMA Cross: {{strategy.order.action}} {{ticker}} at {{close}}',
    isActive: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '3',
    name: 'Bollinger Bands Breakout',
    description: 'High-frequency strategy using Bollinger Bands for breakout detection. Captures strong momentum moves with tight risk management.',
    script: `// Bollinger Bands Breakout
//@version=5
strategy("BB Breakout", overlay=true)

// Parameters
length = input.int(20, "BB Length")
mult = input.float(2.0, "BB Multiplier")
volume_threshold = input.float(1.5, "Volume Threshold")

// Calculate Bollinger Bands
basis = ta.sma(close, length)
dev = mult * ta.stdev(close, length)
upper = basis + dev
lower = basis - dev

// Volume condition
vol_avg = ta.sma(volume, 20)
high_volume = volume > vol_avg * volume_threshold

// Entry conditions
long_condition = close > upper and high_volume
short_condition = close < lower and high_volume

// Strategy entries
if (long_condition)
    strategy.entry("Long", strategy.long)
if (short_condition)
    strategy.entry("Short", strategy.short)

// Plot Bollinger Bands
plot(basis, "Basis", color=color.orange)
plot(upper, "Upper", color=color.red)
plot(lower, "Lower", color=color.green)`,
    riskLevel: 'high',
    timeframe: ['5m', '15m', '30m'],
    performance: {
      totalReturn: 52.8,
      sharpeRatio: 1.15,
      maxDrawdown: -18.7,
      winRate: 58.3,
      backtestPeriod: '2023-01-01 to 2024-01-01',
      totalTrades: 234,
      avgTradeDuration: 45
    },
    category: 'Breakout',
    tags: ['Bollinger Bands', 'Breakout', 'High Frequency', 'Volume'],
    alertTemplate: 'BB Breakout: {{strategy.order.action}} {{ticker}} at {{close}}',
    isActive: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-22')
  }
];

export const mockChatResponses = {
  greeting: "Hello! I'm here to help you find the perfect trading strategy. What's your experience level with crypto trading?",
  riskAssessment: "Based on your answers, I'd recommend starting with low to medium risk strategies. Would you like to see some conservative momentum strategies?",
  strategyRecommendation: "For your risk profile, I suggest the 'EMA Crossover Conservative' strategy. It has a 72% win rate with only 6% max drawdown. Would you like me to explain how it works?",
  explanation: "This strategy uses two Exponential Moving Averages - when the faster one crosses above the slower one, it signals a potential uptrend. The built-in stop loss helps protect your capital.",
  riskManagement: "Great question! Risk management is crucial. I recommend never risking more than 2% of your portfolio per trade, and always use stop losses. Would you like me to show you how to set these up?",
  backtesting: "Backtesting shows how a strategy would have performed historically. The RSI Momentum strategy, for example, had a 67% win rate over the past year with a Sharpe ratio of 1.42, indicating good risk-adjusted returns."
};
