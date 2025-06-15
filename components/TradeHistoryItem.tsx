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
    <View style={styles.container} data-oid="t:84-ke">
      <View style={styles.header} data-oid="s85p00j">
        <View style={styles.symbolContainer} data-oid="ph7-855">
          <View
            style={[styles.typeIndicator, { backgroundColor: typeColor }]}
            data-oid="6xnxyb7"
          >
            {isBuy ? (
              <TrendingUp size={16} color="#FFFFFF" data-oid="pcem037" />
            ) : (
              <TrendingDown size={16} color="#FFFFFF" data-oid="8-172tq" />
            )}
          </View>
          <View data-oid="6g8jgg4">
            <Text style={styles.symbol} data-oid="byooyis">
              {symbol}
            </Text>
            <Text
              style={[styles.type, { color: typeColor }]}
              data-oid="iolok9z"
            >
              {type}
            </Text>
          </View>
        </View>

        <View style={styles.statusContainer} data-oid="9kr9ecx">
          <View
            style={[styles.statusDot, { backgroundColor: statusColor }]}
            data-oid="xn5-qyf"
          />

          <Text
            style={[styles.status, { color: statusColor }]}
            data-oid=".4kqaor"
          >
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.detailsContainer} data-oid="fjgh_:x">
        <View style={styles.detailRow} data-oid="9.rarbd">
          <Text style={styles.detailLabel} data-oid="px_goit">
            Amount
          </Text>
          <Text style={styles.detailValue} data-oid="d76y2-l">
            {amount.toFixed(8)} {symbol}
          </Text>
        </View>

        <View style={styles.detailRow} data-oid="-4laz1n">
          <Text style={styles.detailLabel} data-oid="yzdopsu">
            Price
          </Text>
          <Text style={styles.detailValue} data-oid="5a2bwmu">
            ${price.toLocaleString()}
          </Text>
        </View>

        <View style={styles.detailRow} data-oid="3vnqhr8">
          <Text style={styles.detailLabel} data-oid="jckxxml">
            Total
          </Text>
          <Text style={styles.detailValue} data-oid="ku3ucjl">
            ${total.toLocaleString()}
          </Text>
        </View>

        {pnl !== undefined && (
          <View style={styles.detailRow} data-oid="5rlyuxc">
            <Text style={styles.detailLabel} data-oid="jlm3lzg">
              P&L
            </Text>
            <Text
              style={[
                styles.detailValue,
                { color: pnl >= 0 ? '#10B981' : '#EF4444' },
              ]}
              data-oid="u9mous9"
            >
              {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.timestampContainer} data-oid="ozb-uyv">
        <Clock size={14} color="#6B7280" data-oid="-l9j7gd" />
        <Text style={styles.timestamp} data-oid="8dufsz.">
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
