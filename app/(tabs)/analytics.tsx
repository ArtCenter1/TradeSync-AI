import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Target,
  Calendar,
  DollarSign,
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
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    '24H' | '7D' | '30D' | '1Y'
  >('7D');

  const timeframeData: Record<string, TimeframeData> = {
    '24H': {
      period: '24H',
      pnl: 234.56,
      pnlPercent: 2.1,
      winRate: 75,
      totalTrades: 8,
    },
    '7D': {
      period: '7D',
      pnl: 1456.78,
      pnlPercent: 12.4,
      winRate: 68,
      totalTrades: 24,
    },
    '30D': {
      period: '30D',
      pnl: 5234.12,
      pnlPercent: 38.7,
      winRate: 72,
      totalTrades: 89,
    },
    '1Y': {
      period: '1Y',
      pnl: 18750.45,
      pnlPercent: 124.8,
      winRate: 69,
      totalTrades: 312,
    },
  };

  const currentData = timeframeData[selectedTimeframe];

  const performanceMetrics: PerformanceMetric[] = [
    {
      label: 'Total P&L',
      value: `$${currentData.pnl.toLocaleString()}`,
      change: currentData.pnlPercent,
      icon: DollarSign,
      color: currentData.pnl >= 0 ? '#10B981' : '#EF4444',
    },
    {
      label: 'Win Rate',
      value: `${currentData.winRate}%`,
      change: 2.3,
      icon: Target,
      color: '#10B981',
    },
    {
      label: 'Total Trades',
      value: currentData.totalTrades.toString(),
      change: 15.2,
      icon: BarChart3,
      color: '#3B82F6',
    },
    {
      label: 'Avg Trade',
      value: `$${(currentData.pnl / currentData.totalTrades).toFixed(2)}`,
      change: 8.7,
      icon: TrendingUp,
      color: '#F59E0B',
    },
  ];

  const topPerformers = [
    { symbol: 'SOL', pnl: 2150.3, pnlPercent: 24.8, trades: 12 },
    { symbol: 'BTC', pnl: 1875.45, pnlPercent: 18.2, trades: 8 },
    { symbol: 'ETH', pnl: 1234.67, pnlPercent: 15.7, trades: 15 },
    { symbol: 'ADA', pnl: 567.89, pnlPercent: 12.3, trades: 18 },
  ];

  const recentAlerts = [
    { symbol: 'BTC', type: 'BUY', triggered: '2h ago', profit: 145.67 },
    { symbol: 'ETH', type: 'SELL', triggered: '4h ago', profit: 89.23 },
    { symbol: 'SOL', type: 'BUY', triggered: '6h ago', profit: 234.12 },
  ];

  return (
    <View style={styles.container} data-oid="-sbeg_p">
      <View style={styles.header} data-oid="yuuop6e">
        <View data-oid="_s5rqp4">
          <Text style={styles.title} data-oid="7us4ntn">
            Analytics
          </Text>
          <Text style={styles.subtitle} data-oid="y6.nv7q">
            Trading performance overview
          </Text>
        </View>
        <TouchableOpacity style={styles.exportButton} data-oid="x4l9wuy">
          <Calendar size={20} color="#9CA3AF" data-oid="gf9jcyo" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        data-oid="j72uo9p"
      >
        <View style={styles.timeframeSelector} data-oid="7:g-rfh">
          {(['24H', '7D', '30D', '1Y'] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.timeframeButton,
                selectedTimeframe === period && styles.timeframeButtonActive,
              ]}
              onPress={() => setSelectedTimeframe(period)}
              data-oid="90a32qc"
            >
              <Text
                style={[
                  styles.timeframeText,
                  selectedTimeframe === period && styles.timeframeTextActive,
                ]}
                data-oid="iosycjh"
              >
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.metricsGrid} data-oid="x57jb2d">
          {performanceMetrics.map((metric, index) => (
            <View key={index} style={styles.metricCard} data-oid=".4ukc9-">
              <View style={styles.metricHeader} data-oid="u-9fn8x">
                <metric.icon
                  size={20}
                  color={metric.color}
                  data-oid="opl8mlr"
                />

                <View
                  style={[
                    styles.changeIndicator,
                    {
                      backgroundColor:
                        metric.change >= 0
                          ? '#10B981' + '20'
                          : '#EF4444' + '20',
                    },
                  ]}
                  data-oid="y2tobp:"
                >
                  {metric.change >= 0 ? (
                    <TrendingUp size={12} color="#10B981" data-oid="0y5b01a" />
                  ) : (
                    <TrendingDown
                      size={12}
                      color="#EF4444"
                      data-oid="5zp5c9j"
                    />
                  )}
                  <Text
                    style={[
                      styles.changeText,
                      { color: metric.change >= 0 ? '#10B981' : '#EF4444' },
                    ]}
                    data-oid="nhbzv-6"
                  >
                    {metric.change >= 0 ? '+' : ''}
                    {metric.change.toFixed(1)}%
                  </Text>
                </View>
              </View>
              <Text style={styles.metricValue} data-oid="pcx2z9a">
                {metric.value}
              </Text>
              <Text style={styles.metricLabel} data-oid="x:blgt-">
                {metric.label}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.chartPlaceholder} data-oid="s2fm9kf">
          <PieChart size={80} color="#4B5563" data-oid="i2l68pq" />
          <View style={styles.chartInfo} data-oid="zxz9aw-">
            <Text style={styles.chartTitle} data-oid="523bznq">
              Portfolio Performance
            </Text>
            <Text style={styles.chartDescription} data-oid="0kw4nce">
              {selectedTimeframe} period analysis
            </Text>
          </View>
        </View>

        <View style={styles.section} data-oid="c97hvdw">
          <Text style={styles.sectionTitle} data-oid="vhx2s5g">
            Top Performers
          </Text>
          <View style={styles.performersList} data-oid="-s4l--l">
            {topPerformers.map((performer, index) => (
              <View
                key={performer.symbol}
                style={styles.performerCard}
                data-oid="9r4qpay"
              >
                <View style={styles.performerRank} data-oid="4eije3a">
                  <Text style={styles.rankNumber} data-oid="zz1n:ef">
                    {index + 1}
                  </Text>
                </View>
                <View style={styles.performerInfo} data-oid=":1c3:1d">
                  <Text style={styles.performerSymbol} data-oid="ss5kuxg">
                    {performer.symbol}
                  </Text>
                  <Text style={styles.performerTrades} data-oid="nkyqnr6">
                    {performer.trades} trades
                  </Text>
                </View>
                <View style={styles.performerMetrics} data-oid="3zdwp7p">
                  <Text style={styles.performerPnL} data-oid="w:636.m">
                    +${performer.pnl.toLocaleString()}
                  </Text>
                  <Text style={styles.performerPercent} data-oid="cdg4px5">
                    +{performer.pnlPercent}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section} data-oid="871iqdp">
          <Text style={styles.sectionTitle} data-oid="3a35k8a">
            Recent Alert Trades
          </Text>
          <View style={styles.alertsList} data-oid="1b5uu5.">
            {recentAlerts.map((alert, index) => (
              <View key={index} style={styles.alertCard} data-oid=":0_.b1i">
                <View style={styles.alertHeader} data-oid="4rsiygd">
                  <View style={styles.alertSymbol} data-oid="d7-jsse">
                    <Text style={styles.alertSymbolText} data-oid="jlhvea-">
                      {alert.symbol}
                    </Text>
                    <Text
                      style={[
                        styles.alertType,
                        { color: alert.type === 'BUY' ? '#10B981' : '#EF4444' },
                      ]}
                      data-oid="wfqr7iq"
                    >
                      {alert.type}
                    </Text>
                  </View>
                  <Text style={styles.alertTime} data-oid="c62sm0c">
                    {alert.triggered}
                  </Text>
                </View>
                <View style={styles.alertProfit} data-oid="6:vtkru">
                  <Text style={styles.alertProfitValue} data-oid="am3o84d">
                    +${alert.profit.toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section} data-oid="ptvpr-i">
          <Text style={styles.sectionTitle} data-oid="l8ah760">
            Trading Insights
          </Text>
          <View style={styles.insightsList} data-oid="-3j-ot8">
            <View style={styles.insightCard} data-oid="u4b3qxu">
              <View style={styles.insightIcon} data-oid="zvfc:co">
                <TrendingUp size={20} color="#10B981" data-oid="latt2_r" />
              </View>
              <View style={styles.insightContent} data-oid="5-8l4j_">
                <Text style={styles.insightTitle} data-oid="rng2rr2">
                  Strong Performance
                </Text>
                <Text style={styles.insightDescription} data-oid="vc39g:9">
                  Your win rate improved by 8% this week
                </Text>
              </View>
            </View>

            <View style={styles.insightCard} data-oid="tupmwa:">
              <View style={styles.insightIcon} data-oid="cd2qxd8">
                <Target size={20} color="#3B82F6" data-oid="p97wrv8" />
              </View>
              <View style={styles.insightContent} data-oid="ed:mz9u">
                <Text style={styles.insightTitle} data-oid="ggy353h">
                  Alert Accuracy
                </Text>
                <Text style={styles.insightDescription} data-oid="899h7e_">
                  85% of your alerts resulted in profitable trades
                </Text>
              </View>
            </View>

            <View style={styles.insightCard} data-oid="g8w5d40">
              <View style={styles.insightIcon} data-oid="aw0i3ah">
                <BarChart3 size={20} color="#F59E0B" data-oid="e0ed:2c" />
              </View>
              <View style={styles.insightContent} data-oid="o:dvip1">
                <Text style={styles.insightTitle} data-oid="5qlk.87">
                  Best Trading Hour
                </Text>
                <Text style={styles.insightDescription} data-oid="6h_ljqo">
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
