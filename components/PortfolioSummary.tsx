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
    <View style={styles.container} data-oid="7ytz-4_">
      <View style={styles.mainCard} data-oid="3loa76g">
        <View style={styles.valueSection} data-oid="6xt6s8.">
          <Text style={styles.label} data-oid="vg-k82i">
            Total Portfolio Value
          </Text>
          <Text style={styles.totalValue} data-oid="unqmspr">
            ${totalValue.toLocaleString()}
          </Text>

          <View style={styles.changeRow} data-oid="qe1p:pz">
            <TrendingUp size={16} color={dayColor} data-oid=":j.xvfz" />
            <Text
              style={[styles.dayChange, { color: dayColor }]}
              data-oid="lpvexwx"
            >
              {isPositiveDay ? '+' : ''}${dayChange.toFixed(2)} (
              {dayChangePercent.toFixed(2)}%)
            </Text>
            <Text style={styles.timeframe} data-oid="_hr5kn9">
              Today
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.statsGrid} data-oid="iipd0wp">
        <View style={styles.statCard} data-oid="f3e4zg:">
          <DollarSign size={20} color="#10B981" data-oid="3ua-0o5" />
          <Text style={styles.statLabel} data-oid="u610pa4">
            Total P&L
          </Text>
          <Text
            style={[styles.statValue, { color: totalColor }]}
            data-oid="h6afh8w"
          >
            {isPositiveTotal ? '+' : ''}${totalPnL.toLocaleString()}
          </Text>
        </View>

        <View style={styles.statCard} data-oid="xnv2-5v">
          <Target size={20} color="#3B82F6" data-oid="uzi6d7d" />
          <Text style={styles.statLabel} data-oid="bho.h8z">
            Active Alerts
          </Text>
          <Text style={styles.statValue} data-oid="3zu7dbj">
            {activeAlerts}
          </Text>
        </View>

        <View style={styles.statCard} data-oid="fdtu9li">
          <Zap size={20} color="#F59E0B" data-oid="fqnarov" />
          <Text style={styles.statLabel} data-oid="cajrpp6">
            Auto Trading
          </Text>
          <Text
            style={[styles.statValue, { color: '#10B981' }]}
            data-oid="0v17v9m"
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
