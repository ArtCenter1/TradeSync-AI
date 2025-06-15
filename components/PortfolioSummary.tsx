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
    <View style={styles.container} data-oid=".-mw92h">
      <View style={styles.mainCard} data-oid="wjmux.9">
        <View style={styles.valueSection} data-oid="1hg5z0s">
          <Text style={styles.label} data-oid="uvgz_6m">
            Total Portfolio Value
          </Text>
          <Text style={styles.totalValue} data-oid="vii.av7">
            ${totalValue.toLocaleString()}
          </Text>

          <View style={styles.changeRow} data-oid="-891kik">
            <TrendingUp size={16} color={dayColor} data-oid="3eu.v9d" />
            <Text
              style={[styles.dayChange, { color: dayColor }]}
              data-oid="9vhq6:i"
            >
              {isPositiveDay ? '+' : ''}${dayChange.toFixed(2)} (
              {dayChangePercent.toFixed(2)}%)
            </Text>
            <Text style={styles.timeframe} data-oid="6uy1v1y">
              Today
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.statsGrid} data-oid="stdtt:1">
        <View style={styles.statCard} data-oid="mm:0_m8">
          <DollarSign size={20} color="#10B981" data-oid="4y2zc7d" />
          <Text style={styles.statLabel} data-oid="dafuqhj">
            Total P&L
          </Text>
          <Text
            style={[styles.statValue, { color: totalColor }]}
            data-oid="uc272cz"
          >
            {isPositiveTotal ? '+' : ''}${totalPnL.toLocaleString()}
          </Text>
        </View>

        <View style={styles.statCard} data-oid="bxx039s">
          <Target size={20} color="#3B82F6" data-oid="wwfgpv4" />
          <Text style={styles.statLabel} data-oid="ioss1_d">
            Active Alerts
          </Text>
          <Text style={styles.statValue} data-oid="co9-1op">
            {activeAlerts}
          </Text>
        </View>

        <View style={styles.statCard} data-oid=":vs1ilj">
          <Zap size={20} color="#F59E0B" data-oid="ih:6zmq" />
          <Text style={styles.statLabel} data-oid="2:bwxw6">
            Auto Trading
          </Text>
          <Text
            style={[styles.statValue, { color: '#10B981' }]}
            data-oid="-:1_n56"
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
