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
    <View style={styles.container} data-oid="r9v6kin">
      <View style={styles.header} data-oid="dz86dcn">
        <View data-oid="hg0rrmv">
          <Text style={styles.title} data-oid="b:g4-ih">
            Auto-Trade Monitor
          </Text>
          <Text style={styles.subtitle} data-oid="gx2_lts">
            {executedTrades} executed • {pendingTrades} pending • {failedTrades}{' '}
            failed
          </Text>
        </View>
        <TouchableOpacity
          onPress={onClose}
          style={styles.closeButton}
          data-oid="s6uy-0m"
        >
          <Text style={styles.closeText} data-oid="3igz3a2">
            Close
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer} data-oid=":m_v:3u">
        <View style={styles.statCard} data-oid="q42nrmx">
          <Activity size={18} color="#10B981" data-oid="0xymr9d" />
          <Text style={styles.statValue} data-oid="ilxmhxr">
            {stats.totalTrades}
          </Text>
          <Text style={styles.statLabel} data-oid="_z85e2r">
            Total Trades
          </Text>
        </View>
        <View style={styles.statCard} data-oid="j-f6zwk">
          <TrendingUp size={18} color="#3B82F6" data-oid="-u0vjk_" />
          <Text style={styles.statValue} data-oid="1f73.si">
            {stats.successRate}%
          </Text>
          <Text style={styles.statLabel} data-oid="dpgeth2">
            Success Rate
          </Text>
        </View>
        <View style={styles.statCard} data-oid="z14i9.l">
          <Zap size={18} color="#F59E0B" data-oid="zw1tt5k" />
          <Text
            style={[
              styles.statValue,
              { color: stats.totalPnL >= 0 ? '#10B981' : '#EF4444' },
            ]}
            data-oid="5:w-kh:"
          >
            ${stats.totalPnL.toFixed(2)}
          </Text>
          <Text style={styles.statLabel} data-oid=":t6emr5">
            Total P&L
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.tradesList}
        showsVerticalScrollIndicator={false}
        data-oid="kv5c4v-"
      >
        {autoTrades.map((trade) => (
          <AutoTradeItem key={trade.id} trade={trade} data-oid="ewqu4zh" />
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
    <View style={styles.tradeCard} data-oid="cqog_1e">
      <View style={styles.tradeHeader} data-oid="r-0s.cz">
        <View style={styles.tradeSymbol} data-oid="1oawcvk">
          <View
            style={[styles.actionIndicator, { backgroundColor: actionColor }]}
            data-oid="a_buar."
          >
            {isBuy ? (
              <TrendingUp size={14} color="#FFFFFF" data-oid="ur10y1x" />
            ) : (
              <TrendingDown size={14} color="#FFFFFF" data-oid="aj1ezgb" />
            )}
          </View>
          <View data-oid="eakdp9r">
            <Text style={styles.symbol} data-oid="cxjm5pz">
              {trade.symbol}
            </Text>
            <Text
              style={[styles.action, { color: actionColor }]}
              data-oid="ppn1mxu"
            >
              {trade.action}
            </Text>
          </View>
        </View>

        <View style={styles.statusContainer} data-oid="nreze-w">
          <StatusIcon size={16} color={statusColor} data-oid="knmpby-" />
          <Text
            style={[styles.status, { color: statusColor }]}
            data-oid="v2l4iv6"
          >
            {trade.status}
          </Text>
        </View>
      </View>

      <View style={styles.signalContainer} data-oid="ymt4b-v">
        <Text style={styles.signalLabel} data-oid=":lt_ld0">
          Signal
        </Text>
        <Text style={styles.signal} data-oid="9ywuk:m">
          {trade.signal}
        </Text>
      </View>

      <View style={styles.tradeDetails} data-oid="41ru9kx">
        <View style={styles.detailRow} data-oid="w4mbu2o">
          <Text style={styles.detailLabel} data-oid="9j4.dd8">
            Price
          </Text>
          <Text style={styles.detailValue} data-oid="z61a191">
            ${trade.price.toLocaleString()}
          </Text>
        </View>
        <View style={styles.detailRow} data-oid="7rv34.k">
          <Text style={styles.detailLabel} data-oid="n0tp34v">
            Amount
          </Text>
          <Text style={styles.detailValue} data-oid="y8x:u2l">
            {trade.amount} {trade.symbol}
          </Text>
        </View>
        <View style={styles.detailRow} data-oid="e74ykn0">
          <Text style={styles.detailLabel} data-oid="78pid:k">
            Total
          </Text>
          <Text style={styles.detailValue} data-oid="8ldphw.">
            ${(trade.price * trade.amount).toLocaleString()}
          </Text>
        </View>
        {trade.pnl !== undefined && (
          <View style={styles.detailRow} data-oid="xkdovpn">
            <Text style={styles.detailLabel} data-oid="pz86_4r">
              P&L
            </Text>
            <Text
              style={[
                styles.detailValue,
                { color: trade.pnl >= 0 ? '#10B981' : '#EF4444' },
              ]}
              data-oid="6ikl3i1"
            >
              {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.tradeFooter} data-oid="y83tt6w">
        <View style={styles.sourceTag} data-oid=".pupz05">
          <Text style={styles.sourceText} data-oid="8n5u.b5">
            {trade.source}
          </Text>
        </View>
        <Text style={styles.timestamp} data-oid="7l4nez6">
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
