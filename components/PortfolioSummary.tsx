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
    <View style={styles.container}>
      <View style={styles.mainCard}>
        <View style={styles.valueSection}>
          <Text style={styles.label}>Total Portfolio Value</Text>
          <Text style={styles.totalValue}>${totalValue.toLocaleString()}</Text>

          <View style={styles.changeRow}>
            <TrendingUp size={16} color={dayColor} />
            <Text style={[styles.dayChange, { color: dayColor }]}>
              {isPositiveDay ? '+' : ''}${dayChange.toFixed(2)} (
              {dayChangePercent.toFixed(2)}%)
            </Text>
            <Text style={styles.timeframe}>Today</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <DollarSign size={20} color="#10B981" />
          <Text style={styles.statLabel}>Total P&L</Text>
          <Text style={[styles.statValue, { color: totalColor }]}>
            {isPositiveTotal ? '+' : ''}${totalPnL.toLocaleString()}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Target size={20} color="#3B82F6" />
          <Text style={styles.statLabel}>Active Alerts</Text>
          <Text style={styles.statValue}>{activeAlerts}</Text>
        </View>

        <View style={styles.statCard}>
          <Zap size={20} color="#F59E0B" />
          <Text style={styles.statLabel}>Auto Trading</Text>
          <Text style={[styles.statValue, { color: '#10B981' }]}>ON</Text>
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
