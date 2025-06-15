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
    <View style={styles.container} data-oid="md4:gmq">
      <View style={styles.header} data-oid="z6x2p_4">
        <View style={styles.symbolContainer} data-oid="gljeb1r">
          <View
            style={[styles.typeIndicator, { backgroundColor: typeColor }]}
            data-oid="v_zo8if"
          >
            {isBuy ? (
              <TrendingUp size={16} color="#FFFFFF" data-oid="6ivpnax" />
            ) : (
              <TrendingDown size={16} color="#FFFFFF" data-oid="4:yof.d" />
            )}
          </View>
          <View data-oid="khvhx_e">
            <Text style={styles.symbol} data-oid="zetsbzk">
              {symbol}
            </Text>
            <Text
              style={[styles.type, { color: typeColor }]}
              data-oid="m:po48d"
            >
              {type}
            </Text>
          </View>
        </View>

        <View style={styles.statusContainer} data-oid="i7eeudg">
          <View
            style={[styles.statusDot, { backgroundColor: statusColor }]}
            data-oid="cgmnknd"
          />
          <Text
            style={[styles.status, { color: statusColor }]}
            data-oid="pd9h02b"
          >
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.detailsContainer} data-oid="uejnm37">
        <View style={styles.detailRow} data-oid="y75e9ex">
          <Text style={styles.detailLabel} data-oid="ghu4mvp">
            Amount
          </Text>
          <Text style={styles.detailValue} data-oid="07i5dvp">
            {amount.toFixed(8)} {symbol}
          </Text>
        </View>

        <View style={styles.detailRow} data-oid="iyq_4dt">
          <Text style={styles.detailLabel} data-oid="58-729t">
            Price
          </Text>
          <Text style={styles.detailValue} data-oid="t7ohpi.">
            ${price.toLocaleString()}
          </Text>
        </View>

        <View style={styles.detailRow} data-oid="a4e2sya">
          <Text style={styles.detailLabel} data-oid="dxmqj2b">
            Total
          </Text>
          <Text style={styles.detailValue} data-oid="njh5p-8">
            ${total.toLocaleString()}
          </Text>
        </View>

        {pnl !== undefined && (
          <View style={styles.detailRow} data-oid="15fi9rc">
            <Text style={styles.detailLabel} data-oid="xzv7a0y">
              P&L
            </Text>
            <Text
              style={[
                styles.detailValue,
                { color: pnl >= 0 ? '#10B981' : '#EF4444' },
              ]}
              data-oid="3920r-z"
            >
              {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.timestampContainer} data-oid="y-t7d99">
        <Clock size={14} color="#6B7280" data-oid="lvy80oy" />
        <Text style={styles.timestamp} data-oid="odwikr.">
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
