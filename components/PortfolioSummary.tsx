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
    <View style={styles.container} data-oid="rr--rc7">
      <View style={styles.mainCard} data-oid="9csz7t3">
        <View style={styles.valueSection} data-oid="m:9l0ik">
          <Text style={styles.label} data-oid="7:mhstd">
            Total Portfolio Value
          </Text>
          <Text style={styles.totalValue} data-oid="v8-0wd9">
            ${totalValue.toLocaleString()}
          </Text>

          <View style={styles.changeRow} data-oid="b:429vd">
            <TrendingUp size={16} color={dayColor} data-oid="x3q-ch0" />
            <Text
              style={[styles.dayChange, { color: dayColor }]}
              data-oid="98d.qo1"
            >
              {isPositiveDay ? '+' : ''}${dayChange.toFixed(2)} (
              {dayChangePercent.toFixed(2)}%)
            </Text>
            <Text style={styles.timeframe} data-oid="oq3z32t">
              Today
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.statsGrid} data-oid="f46ww_o">
        <View style={styles.statCard} data-oid="w80ma4r">
          <DollarSign size={20} color="#10B981" data-oid="ykq7vp1" />
          <Text style={styles.statLabel} data-oid="9cj9qox">
            Total P&L
          </Text>
          <Text
            style={[styles.statValue, { color: totalColor }]}
            data-oid="gynucu1"
          >
            {isPositiveTotal ? '+' : ''}${totalPnL.toLocaleString()}
          </Text>
        </View>

        <View style={styles.statCard} data-oid="_fqw:3d">
          <Target size={20} color="#3B82F6" data-oid="11l9d1f" />
          <Text style={styles.statLabel} data-oid="2sldmcy">
            Active Alerts
          </Text>
          <Text style={styles.statValue} data-oid="bph7qfy">
            {activeAlerts}
          </Text>
        </View>

        <View style={styles.statCard} data-oid=":ge2bij">
          <Zap size={20} color="#F59E0B" data-oid="wmfw7.c" />
          <Text style={styles.statLabel} data-oid="dfk7g_g">
            Auto Trading
          </Text>
          <Text
            style={[styles.statValue, { color: '#10B981' }]}
            data-oid="_3vpu1-"
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
