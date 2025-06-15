import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react-native';

interface TradeHistoryItemProps {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  amount: number;
  price: number;
  total: number;
  timestamp: Date;
  pnl?: number;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

export default function TradeHistoryItem({
  symbol,
  type,
  amount,
  price,
  total,
  timestamp,
  pnl,
  status,
}: TradeHistoryItemProps) {
  const isBuy = type === 'BUY';
  const typeColor = isBuy ? '#10B981' : '#EF4444';
  const statusColor = {
    COMPLETED: '#10B981',
    PENDING: '#F59E0B',
    FAILED: '#EF4444',
  }[status];

  return (
    <View style={styles.container} data-oid="9t51i7v">
      <View style={styles.header} data-oid="d5m1qvq">
        <View style={styles.symbolContainer} data-oid="ng:qpfp">
          <View
            style={[styles.typeIndicator, { backgroundColor: typeColor }]}
            data-oid="snehr6b"
          >
            {isBuy ? (
              <TrendingUp size={16} color="#FFFFFF" data-oid=".rl0hh2" />
            ) : (
              <TrendingDown size={16} color="#FFFFFF" data-oid="xpbwaky" />
            )}
          </View>
          <View data-oid="vsil13f">
            <Text style={styles.symbol} data-oid="m7i0puo">
              {symbol}
            </Text>
            <Text
              style={[styles.type, { color: typeColor }]}
              data-oid="c5zwlj-"
            >
              {type}
            </Text>
          </View>
        </View>

        <View style={styles.statusContainer} data-oid="evfca.w">
          <View
            style={[styles.statusDot, { backgroundColor: statusColor }]}
            data-oid="hi.b3:9"
          />

          <Text
            style={[styles.status, { color: statusColor }]}
            data-oid="48bsyjo"
          >
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.detailsContainer} data-oid="xd2l7ak">
        <View style={styles.detailRow} data-oid="-otcj0s">
          <Text style={styles.detailLabel} data-oid="eh9854t">
            Amount
          </Text>
          <Text style={styles.detailValue} data-oid="6asnd94">
            {amount.toFixed(8)} {symbol}
          </Text>
        </View>

        <View style={styles.detailRow} data-oid="zgvor0-">
          <Text style={styles.detailLabel} data-oid="rbakwie">
            Price
          </Text>
          <Text style={styles.detailValue} data-oid="ym8f9of">
            ${price.toLocaleString()}
          </Text>
        </View>

        <View style={styles.detailRow} data-oid="2:kmvjj">
          <Text style={styles.detailLabel} data-oid="jdgzb:h">
            Total
          </Text>
          <Text style={styles.detailValue} data-oid="on0::bb">
            ${total.toLocaleString()}
          </Text>
        </View>

        {pnl !== undefined && (
          <View style={styles.detailRow} data-oid="pkl6ub.">
            <Text style={styles.detailLabel} data-oid="f.8m-r6">
              P&L
            </Text>
            <Text
              style={[
                styles.detailValue,
                { color: pnl >= 0 ? '#10B981' : '#EF4444' },
              ]}
              data-oid="g4skm39"
            >
              {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.timestampContainer} data-oid=":p0dfa_">
        <Clock size={14} color="#6B7280" data-oid="em20v5l" />
        <Text style={styles.timestamp} data-oid="axic276">
          {timestamp.toLocaleDateString()} {timestamp.toLocaleTimeString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#374151',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  symbolContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  typeIndicator: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  type: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  status: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  detailsContainer: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  detailValue: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#4B5563',
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});
