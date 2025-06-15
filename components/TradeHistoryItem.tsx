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
    <View style={styles.container} data-oid="53oca5k">
      <View style={styles.header} data-oid="7ubqh5e">
        <View style={styles.symbolContainer} data-oid="r_v3z6z">
          <View
            style={[styles.typeIndicator, { backgroundColor: typeColor }]}
            data-oid="usq0xld"
          >
            {isBuy ? (
              <TrendingUp size={16} color="#FFFFFF" data-oid="qvg09c-" />
            ) : (
              <TrendingDown size={16} color="#FFFFFF" data-oid="8hsfxeu" />
            )}
          </View>
          <View data-oid="zd9z4bc">
            <Text style={styles.symbol} data-oid="5q8.i7q">
              {symbol}
            </Text>
            <Text
              style={[styles.type, { color: typeColor }]}
              data-oid="jm3fm65"
            >
              {type}
            </Text>
          </View>
        </View>

        <View style={styles.statusContainer} data-oid="cm5a1ru">
          <View
            style={[styles.statusDot, { backgroundColor: statusColor }]}
            data-oid="zt55ti-"
          />

          <Text
            style={[styles.status, { color: statusColor }]}
            data-oid="uyndnr."
          >
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.detailsContainer} data-oid="gk7-a3j">
        <View style={styles.detailRow} data-oid="a6rkj9j">
          <Text style={styles.detailLabel} data-oid="w7ukkx8">
            Amount
          </Text>
          <Text style={styles.detailValue} data-oid="pc-lhs8">
            {amount.toFixed(8)} {symbol}
          </Text>
        </View>

        <View style={styles.detailRow} data-oid="ojto73h">
          <Text style={styles.detailLabel} data-oid="gqofhc5">
            Price
          </Text>
          <Text style={styles.detailValue} data-oid="_sr2u5z">
            ${price.toLocaleString()}
          </Text>
        </View>

        <View style={styles.detailRow} data-oid="_ns7_kf">
          <Text style={styles.detailLabel} data-oid="q276kkz">
            Total
          </Text>
          <Text style={styles.detailValue} data-oid="9vu1v_z">
            ${total.toLocaleString()}
          </Text>
        </View>

        {pnl !== undefined && (
          <View style={styles.detailRow} data-oid="u-5mdao">
            <Text style={styles.detailLabel} data-oid="c6srbft">
              P&L
            </Text>
            <Text
              style={[
                styles.detailValue,
                { color: pnl >= 0 ? '#10B981' : '#EF4444' },
              ]}
              data-oid="trx:2-n"
            >
              {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.timestampContainer} data-oid="-qdfue9">
        <Clock size={14} color="#6B7280" data-oid="d65--av" />
        <Text style={styles.timestamp} data-oid="l1_eaky">
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
