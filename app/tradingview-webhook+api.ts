export async function POST(request: Request) {
  try {
    const body = await request.text();
    console.log('Received TradingView webhook:', body);

    // Parse the alert message
    const alert = parseAlert(body);
    
    if (!alert) {
      return new Response('Invalid alert format', { status: 400 });
    }

    // Validate the alert
    if (!isValidAlert(alert)) {
      return new Response('Invalid alert data', { status: 400 });
    }

    // Execute the trade
    const tradeResult = await executeTrade(alert);
    
    return Response.json({
      success: true,
      trade: tradeResult,
      message: 'Trade executed successfully'
    });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

interface ParsedAlert {
  action: 'BUY' | 'SELL';
  symbol: string;
  price?: number;
  amount?: number;
  stopLoss?: number;
  takeProfit?: number;
  signal?: string;
}

function parseAlert(message: string): ParsedAlert | null {
  try {
    // Try parsing as JSON first
    const jsonAlert = JSON.parse(message);
    if (jsonAlert.action && jsonAlert.symbol) {
      return {
        action: jsonAlert.action.toUpperCase(),
        symbol: jsonAlert.symbol.toUpperCase(),
        price: jsonAlert.price,
        amount: jsonAlert.amount,
        stopLoss: jsonAlert.stopLoss || jsonAlert.sl,
        takeProfit: jsonAlert.takeProfit || jsonAlert.tp,
        signal: jsonAlert.signal || 'CUSTOM'
      };
    }
  } catch {
    // Not JSON, try text parsing
  }

  // Simple text format: "BUY BTCUSDT" or "SELL ETHUSDT"
  const simpleMatch = message.match(/^(BUY|SELL)\s+([A-Z]+)/i);
  if (simpleMatch) {
    return {
      action: simpleMatch[1].toUpperCase() as 'BUY' | 'SELL',
      symbol: simpleMatch[2].toUpperCase(),
      signal: 'SIMPLE_ALERT'
    };
  }

  // TradingView strategy format with variables
  const strategyMatch = message.match(/{{strategy\.order\.action}}\s+([A-Z]+)/i);
  if (strategyMatch) {
    const action = message.includes('strategy.order.action') ? 'BUY' : 'SELL'; // Default fallback
    return {
      action: action as 'BUY' | 'SELL',
      symbol: strategyMatch[1].toUpperCase(),
      signal: 'STRATEGY_ALERT'
    };
  }

  // Price-based alerts: "BTC price 71200 BUY"
  const priceMatch = message.match(/([A-Z]+).*?(\d+\.?\d*).*(BUY|SELL)/i);
  if (priceMatch) {
    return {
      action: priceMatch[3].toUpperCase() as 'BUY' | 'SELL',
      symbol: priceMatch[1].toUpperCase(),
      price: parseFloat(priceMatch[2]),
      signal: 'PRICE_ALERT'
    };
  }

  return null;
}

function isValidAlert(alert: ParsedAlert): boolean {
  // Check if action is valid
  if (!['BUY', 'SELL'].includes(alert.action)) {
    return false;
  }

  // Check if symbol is supported (you can expand this list)
  const supportedSymbols = ['BTC', 'ETH', 'SOL', 'ADA', 'DOT', 'AVAX', 'MATIC', 'LINK'];
  const baseSymbol = alert.symbol.replace(/USDT|USD|BUSD/g, '');
  if (!supportedSymbols.includes(baseSymbol)) {
    return false;
  }

  // Add more validation rules as needed
  return true;
}

async function executeTrade(alert: ParsedAlert) {
  // In a real application, this would:
  // 1. Check if auto-trading is enabled
  // 2. Validate trade limits and risk management rules
  // 3. Connect to crypto exchange API (Binance, Coinbase, etc.)
  // 4. Execute the actual trade
  // 5. Apply stop-loss and take-profit orders
  // 6. Store trade record in database
  // 7. Send notifications

  // Mock trade execution
  const mockTrade = {
    id: Date.now().toString(),
    symbol: alert.symbol,
    action: alert.action,
    price: alert.price || getCurrentPrice(alert.symbol),
    amount: alert.amount || getDefaultAmount(alert.symbol),
    status: 'EXECUTED',
    timestamp: new Date().toISOString(),
    signal: alert.signal || 'WEBHOOK_ALERT'
  };

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

  return mockTrade;
}

function getCurrentPrice(symbol: string): number {
  // Mock current prices - in real app, fetch from exchange API
  const prices: Record<string, number> = {
    'BTC': 71200,
    'ETH': 4125,
    'SOL': 210,
    'ADA': 0.95,
    'DOT': 12.5,
    'AVAX': 65,
    'MATIC': 1.8,
    'LINK': 25
  };
  
  const baseSymbol = symbol.replace(/USDT|USD|BUSD/g, '');
  return prices[baseSymbol] || 100; // Default price
}

function getDefaultAmount(symbol: string): number {
  // Default trade amounts based on symbol - in real app, calculate based on portfolio allocation
  const amounts: Record<string, number> = {
    'BTC': 0.01,
    'ETH': 0.1,
    'SOL': 1,
    'ADA': 100,
    'DOT': 5,
    'AVAX': 2,
    'MATIC': 50,
    'LINK': 5
  };
  
  const baseSymbol = symbol.replace(/USDT|USD|BUSD/g, '');
  return amounts[baseSymbol] || 1;
}