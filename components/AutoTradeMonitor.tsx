import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  CircleCheck as CheckCircle,
  Circle as XCircle,
  Zap,
} from 'lucide-react-native';

interface AutoTrade {
  id: string;
  signal: string;
  symbol: string;
  action: 'BUY' | 'SELL';
  price: number;
  amount: number;
  status: 'EXECUTED' | 'PENDING' | 'FAILED';
  timestamp: Date;
  source: 'TRADINGVIEW' | 'MANUAL';
  pnl?: number;
}

interface AutoTradeMonitorProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function AutoTradeMonitor({
  isVisible,
  onClose,
}: AutoTradeMonitorProps) {
  const [autoTrades, setAutoTrades] = useState<AutoTrade[]>([
    {
      id: '1',
      signal: 'BUY_SIGNAL_RSI_OVERSOLD',
      symbol: 'BTC',
      action: 'BUY',
      price: 71200,
      amount: 0.1,
      status: 'EXECUTED',
      timestamp: new Date('2024-01-15T14:30:00Z'),
      source: 'TRADINGVIEW',
      pnl: 145.5,
    },
    {
      id: '2',
      signal: 'SELL_SIGNAL_MACD_CROSS',
      symbol: 'ETH',
      action: 'SELL',
      price: 4125,
      amount: 2.5,
      status: 'EXECUTED',
      timestamp: new Date('2024-01-15T13:15:00Z'),
      source: 'TRADINGVIEW',
      pnl: -85.25,
    },
    {
      id: '3',
      signal: 'BUY_SIGNAL_BREAKOUT',
      symbol: 'SOL',
      action: 'BUY',
      price: 210,
      amount: 25,
      status: 'PENDING',
      timestamp: new Date('2024-01-15T14:45:00Z'),
      source: 'TRADINGVIEW',
    },
    {
      id: '4',
      signal: 'STOP_LOSS_TRIGGERED',
      symbol: 'ADA',
      action: 'SELL',
      price: 0.92,
      amount: 1000,
      status: 'FAILED',
      timestamp: new Date('2024-01-15T12:20:00Z'),
      source: 'TRADINGVIEW',
    },
  ]);

  const [stats, setStats] = useState({
    totalTrades: 15,
    successRate: 73.3,
    totalPnL: 1250.75,
    todayTrades: 4,
  });

  if (!isVisible) return null;

  const executedTrades = autoTrades.filter(
    (t) => t.status === 'EXECUTED',
  ).length;
  const pendingTrades = autoTrades.filter((t) => t.status === 'PENDING').length;
  const failedTrades = autoTrades.filter((t) => t.status === 'FAILED').length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Auto-Trade Monitor</Text>
          <Text style={styles.subtitle}>
            {executedTrades} executed • {pendingTrades} pending • {failedTrades}{' '}
            failed
          </Text>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Activity size={18} color="#10B981" />
          <Text style={styles.statValue}>{stats.totalTrades}</Text>
          <Text style={styles.statLabel}>Total Trades</Text>
        </View>
        <View style={styles.statCard}>
          <TrendingUp size={18} color="#3B82F6" />
          <Text style={styles.statValue}>{stats.successRate}%</Text>
          <Text style={styles.statLabel}>Success Rate</Text>
        </View>
        <View style={styles.statCard}>
          <Zap size={18} color="#F59E0B" />
          <Text
            style={[
              styles.statValue,
              { color: stats.totalPnL >= 0 ? '#10B981' : '#EF4444' },
            ]}
          >
            ${stats.totalPnL.toFixed(2)}
          </Text>
          <Text style={styles.statLabel}>Total P&L</Text>
        </View>
      </View>

      <ScrollView
        style={styles.tradesList}
        showsVerticalScrollIndicator={false}
      >
        {autoTrades.map((trade) => (
          <AutoTradeItem key={trade.id} trade={trade} />
        ))}
      </ScrollView>
    </View>
  );
}

interface AutoTradeItemProps {
  trade: AutoTrade;
}

function AutoTradeItem({ trade }: AutoTradeItemProps) {
  const isBuy = trade.action === 'BUY';
  const actionColor = isBuy ? '#10B981' : '#EF4444';
  const statusColor = {
    EXECUTED: '#10B981',
    PENDING: '#F59E0B',
    FAILED: '#EF4444',
  }[trade.status];

  const StatusIcon = {
    EXECUTED: CheckCircle,
    PENDING: Clock,
    FAILED: XCircle,
  }[trade.status];

  return (
    <View style={styles.tradeCard}>
      <View style={styles.tradeHeader}>
        <View style={styles.tradeSymbol}>
          <View
            style={[styles.actionIndicator, { backgroundColor: actionColor }]}
          >
            {isBuy ? (
              <TrendingUp size={14} color="#FFFFFF" />
            ) : (
              <TrendingDown size={14} color="#FFFFFF" />
            )}
          </View>
          <View>
            <Text style={styles.symbol}>{trade.symbol}</Text>
            <Text style={[styles.action, { color: actionColor }]}>
              {trade.action}
            </Text>
          </View>
        </View>

        <View style={styles.statusContainer}>
          <StatusIcon size={16} color={statusColor} />
          <Text style={[styles.status, { color: statusColor }]}>
            {trade.status}
          </Text>
        </View>
      </View>

      <View style={styles.signalContainer}>
        <Text style={styles.signalLabel}>Signal</Text>
        <Text style={styles.signal}>{trade.signal}</Text>
      </View>

      <View style={styles.tradeDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Price</Text>
          <Text style={styles.detailValue}>
            ${trade.price.toLocaleString()}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Amount</Text>
          <Text style={styles.detailValue}>
            {trade.amount} {trade.symbol}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total</Text>
          <Text style={styles.detailValue}>
            ${(trade.price * trade.amount).toLocaleString()}
          </Text>
        </View>
        {trade.pnl !== undefined && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>P&L</Text>
            <Text
              style={[
                styles.detailValue,
                { color: trade.pnl >= 0 ? '#10B981' : '#EF4444' },
              ]}
            >
              {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.tradeFooter}>
        <View style={styles.sourceTag}>
          <Text style={styles.sourceText}>{trade.source}</Text>
        </View>
        <Text style={styles.timestamp}>
          {trade.timestamp.toLocaleDateString()}{' '}
          {trade.timestamp.toLocaleTimeString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginTop: 2,
  },
  closeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  closeText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4B5563',
    gap: 6,
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  tradesList: {
    flex: 1,
  },
  tradeCard: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  tradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tradeSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  action: {
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  status: {
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
  },
  signalContainer: {
    marginBottom: 8,
  },
  signalLabel: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginBottom: 2,
  },
  signal: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#D1D5DB',
  },
  tradeDetails: {
    gap: 4,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  detailValue: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  tradeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#4B5563',
  },
  sourceTag: {
    backgroundColor: '#10B981' + '20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  sourceText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  timestamp: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});
