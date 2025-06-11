import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Target,
  Calendar,
  DollarSign
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface PerformanceMetric {
  label: string;
  value: string;
  change: number;
  icon: any;
  color: string;
}

interface TimeframeData {
  period: '24H' | '7D' | '30D' | '1Y';
  pnl: number;
  pnlPercent: number;
  winRate: number;
  totalTrades: number;
}

export default function AnalyticsScreen() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24H' | '7D' | '30D' | '1Y'>('7D');
  
  const timeframeData: Record<string, TimeframeData> = {
    '24H': { period: '24H', pnl: 234.56, pnlPercent: 2.1, winRate: 75, totalTrades: 8 },
    '7D': { period: '7D', pnl: 1456.78, pnlPercent: 12.4, winRate: 68, totalTrades: 24 },
    '30D': { period: '30D', pnl: 5234.12, pnlPercent: 38.7, winRate: 72, totalTrades: 89 },
    '1Y': { period: '1Y', pnl: 18750.45, pnlPercent: 124.8, winRate: 69, totalTrades: 312 }
  };

  const currentData = timeframeData[selectedTimeframe];

  const performanceMetrics: PerformanceMetric[] = [
    {
      label: 'Total P&L',
      value: `$${currentData.pnl.toLocaleString()}`,
      change: currentData.pnlPercent,
      icon: DollarSign,
      color: currentData.pnl >= 0 ? '#10B981' : '#EF4444'
    },
    {
      label: 'Win Rate',
      value: `${currentData.winRate}%`,
      change: 2.3,
      icon: Target,
      color: '#10B981'
    },
    {
      label: 'Total Trades',
      value: currentData.totalTrades.toString(),
      change: 15.2,
      icon: BarChart3,
      color: '#3B82F6'
    },
    {
      label: 'Avg Trade',
      value: `$${(currentData.pnl / currentData.totalTrades).toFixed(2)}`,
      change: 8.7,
      icon: TrendingUp,
      color: '#F59E0B'
    }
  ];

  const topPerformers = [
    { symbol: 'SOL', pnl: 2150.30, pnlPercent: 24.8, trades: 12 },
    { symbol: 'BTC', pnl: 1875.45, pnlPercent: 18.2, trades: 8 },
    { symbol: 'ETH', pnl: 1234.67, pnlPercent: 15.7, trades: 15 },
    { symbol: 'ADA', pnl: 567.89, pnlPercent: 12.3, trades: 18 }
  ];

  const recentAlerts = [
    { symbol: 'BTC', type: 'BUY', triggered: '2h ago', profit: 145.67 },
    { symbol: 'ETH', type: 'SELL', triggered: '4h ago', profit: 89.23 },
    { symbol: 'SOL', type: 'BUY', triggered: '6h ago', profit: 234.12 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Analytics</Text>
          <Text style={styles.subtitle}>Trading performance overview</Text>
        </View>
        <TouchableOpacity style={styles.exportButton}>
          <Calendar size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.timeframeSelector}>
          {(['24H', '7D', '30D', '1Y'] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.timeframeButton,
                selectedTimeframe === period && styles.timeframeButtonActive
              ]}
              onPress={() => setSelectedTimeframe(period)}
            >
              <Text style={[
                styles.timeframeText,
                selectedTimeframe === period && styles.timeframeTextActive
              ]}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.metricsGrid}>
          {performanceMetrics.map((metric, index) => (
            <View key={index} style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <metric.icon size={20} color={metric.color} />
                <View style={[
                  styles.changeIndicator,
                  { backgroundColor: metric.change >= 0 ? '#10B981' + '20' : '#EF4444' + '20' }
                ]}>
                  {metric.change >= 0 ? (
                    <TrendingUp size={12} color="#10B981" />
                  ) : (
                    <TrendingDown size={12} color="#EF4444" />
                  )}
                  <Text style={[
                    styles.changeText,
                    { color: metric.change >= 0 ? '#10B981' : '#EF4444' }
                  ]}>
                    {metric.change >= 0 ? '+' : ''}{metric.change.toFixed(1)}%
                  </Text>
                </View>
              </View>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricLabel}>{metric.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.chartPlaceholder}>
          <PieChart size={80} color="#4B5563" />
          <View style={styles.chartInfo}>
            <Text style={styles.chartTitle}>Portfolio Performance</Text>
            <Text style={styles.chartDescription}>
              {selectedTimeframe} period analysis
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Performers</Text>
          <View style={styles.performersList}>
            {topPerformers.map((performer, index) => (
              <View key={performer.symbol} style={styles.performerCard}>
                <View style={styles.performerRank}>
                  <Text style={styles.rankNumber}>{index + 1}</Text>
                </View>
                <View style={styles.performerInfo}>
                  <Text style={styles.performerSymbol}>{performer.symbol}</Text>
                  <Text style={styles.performerTrades}>{performer.trades} trades</Text>
                </View>
                <View style={styles.performerMetrics}>
                  <Text style={styles.performerPnL}>
                    +${performer.pnl.toLocaleString()}
                  </Text>
                  <Text style={styles.performerPercent}>
                    +{performer.pnlPercent}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Alert Trades</Text>
          <View style={styles.alertsList}>
            {recentAlerts.map((alert, index) => (
              <View key={index} style={styles.alertCard}>
                <View style={styles.alertHeader}>
                  <View style={styles.alertSymbol}>
                    <Text style={styles.alertSymbolText}>{alert.symbol}</Text>
                    <Text style={[
                      styles.alertType,
                      { color: alert.type === 'BUY' ? '#10B981' : '#EF4444' }
                    ]}>
                      {alert.type}
                    </Text>
                  </View>
                  <Text style={styles.alertTime}>{alert.triggered}</Text>
                </View>
                <View style={styles.alertProfit}>
                  <Text style={styles.alertProfitValue}>
                    +${alert.profit.toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trading Insights</Text>
          <View style={styles.insightsList}>
            <View style={styles.insightCard}>
              <View style={styles.insightIcon}>
                <TrendingUp size={20} color="#10B981" />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Strong Performance</Text>
                <Text style={styles.insightDescription}>
                  Your win rate improved by 8% this week
                </Text>
              </View>
            </View>
            
            <View style={styles.insightCard}>
              <View style={styles.insightIcon}>
                <Target size={20} color="#3B82F6" />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Alert Accuracy</Text>
                <Text style={styles.insightDescription}>
                  85% of your alerts resulted in profitable trades
                </Text>
              </View>
            </View>
            
            <View style={styles.insightCard}>
              <View style={styles.insightIcon}>
                <BarChart3 size={20} color="#F59E0B" />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Best Trading Hour</Text>
                <Text style={styles.insightDescription}>
                  Most profitable trades happen at 10:00 AM
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginTop: 4,
  },
  exportButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  timeframeSelector: {
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  timeframeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  timeframeButtonActive: {
    backgroundColor: '#10B981',
  },
  timeframeText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#9CA3AF',
  },
  timeframeTextActive: {
    color: '#FFFFFF',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    backgroundColor: '#374151',
    borderRadius: 16,
    padding: 16,
    width: (width - 44) / 2,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 2,
  },
  changeText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
  metricValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  chartPlaceholder: {
    backgroundColor: '#374151',
    borderRadius: 16,
    margin: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4B5563',
    gap: 16,
  },
  chartInfo: {
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  chartDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  section: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  performersList: {
    gap: 12,
  },
  performerCard: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  performerRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  performerInfo: {
    flex: 1,
  },
  performerSymbol: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  performerTrades: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginTop: 2,
  },
  performerMetrics: {
    alignItems: 'flex-end',
  },
  performerPnL: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
  },
  performerPercent: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
    marginTop: 2,
  },
  alertsList: {
    gap: 8,
  },
  alertCard: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  alertSymbolText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  alertType: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  alertTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  alertProfit: {
    alignItems: 'flex-end',
  },
  alertProfitValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  insightsList: {
    gap: 12,
  },
  insightCard: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4B5563',
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    lineHeight: 18,
  },
});