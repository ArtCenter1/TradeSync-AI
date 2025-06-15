import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, DollarSign, Target, Zap } from 'lucide-react-native';

interface PortfolioSummaryProps {
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
  totalPnL: number;
  activeAlerts: number;
}

export default function PortfolioSummary({
  totalValue,
  dayChange,
  dayChangePercent,
  totalPnL,
  activeAlerts,
}: PortfolioSummaryProps) {
  const isPositiveDay = dayChange >= 0;
  const isPositiveTotal = totalPnL >= 0;
  const dayColor = isPositiveDay ? '#10B981' : '#EF4444';
  const totalColor = isPositiveTotal ? '#10B981' : '#EF4444';

  return (
    <View style={styles.container} data-oid="kfdjek:">
      <View style={styles.mainCard} data-oid="z3y3yim">
        <View style={styles.valueSection} data-oid="8v.-n62">
          <Text style={styles.label} data-oid="77nxjbs">
            Total Portfolio Value
          </Text>
          <Text style={styles.totalValue} data-oid="4c2meqg">
            ${totalValue.toLocaleString()}
          </Text>

          <View style={styles.changeRow} data-oid=".r3loqh">
            <TrendingUp size={16} color={dayColor} data-oid="my9gx-b" />
            <Text
              style={[styles.dayChange, { color: dayColor }]}
              data-oid="n3z9nc4"
            >
              {isPositiveDay ? '+' : ''}${dayChange.toFixed(2)} (
              {dayChangePercent.toFixed(2)}%)
            </Text>
            <Text style={styles.timeframe} data-oid="c92qp2o">
              Today
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.statsGrid} data-oid="5u.8f7g">
        <View style={styles.statCard} data-oid="8zy9u-4">
          <DollarSign size={20} color="#10B981" data-oid="0focml8" />
          <Text style={styles.statLabel} data-oid="pe:29yj">
            Total P&L
          </Text>
          <Text
            style={[styles.statValue, { color: totalColor }]}
            data-oid="-c1:-b9"
          >
            {isPositiveTotal ? '+' : ''}${totalPnL.toLocaleString()}
          </Text>
        </View>

        <View style={styles.statCard} data-oid="kdyvl7z">
          <Target size={20} color="#3B82F6" data-oid=".nhmzjl" />
          <Text style={styles.statLabel} data-oid="ou9747i">
            Active Alerts
          </Text>
          <Text style={styles.statValue} data-oid="z.lbhd2">
            {activeAlerts}
          </Text>
        </View>

        <View style={styles.statCard} data-oid="-6r.8ja">
          <Zap size={20} color="#F59E0B" data-oid="790a5nt" />
          <Text style={styles.statLabel} data-oid=".tw__wz">
            Auto Trading
          </Text>
          <Text
            style={[styles.statValue, { color: '#10B981' }]}
            data-oid="ufn_zql"
          >
            ON
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  mainCard: {
    backgroundColor: '#374151',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  valueSection: {
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginBottom: 8,
  },
  totalValue: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dayChange: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  timeframe: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#374151',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4B5563',
    gap: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
