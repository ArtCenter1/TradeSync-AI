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
    <View style={styles.container} data-oid="-k3c_jw">
      <View style={styles.header} data-oid="_6etp7w">
        <View data-oid="s84p3io">
          <Text style={styles.title} data-oid="veohp-y">
            Analytics
          </Text>
          <Text style={styles.subtitle} data-oid="gx26eme">
            Trading performance overview
          </Text>
        </View>
        <TouchableOpacity style={styles.exportButton} data-oid="42bux7f">
          <Calendar size={20} color="#9CA3AF" data-oid="j6abfu:" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        data-oid="mwrhmud"
      >
        <View style={styles.timeframeSelector} data-oid="qaykreg">
          {(['24H', '7D', '30D', '1Y'] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.timeframeButton,
                selectedTimeframe === period && styles.timeframeButtonActive,
              ]}
              onPress={() => setSelectedTimeframe(period)}
              data-oid="2:gg1f7"
            >
              <Text
                style={[
                  styles.timeframeText,
                  selectedTimeframe === period && styles.timeframeTextActive,
                ]}
                data-oid="602ez5j"
              >
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.metricsGrid} data-oid="-5i0dgr">
          {performanceMetrics.map((metric, index) => (
            <View key={index} style={styles.metricCard} data-oid="bwnprvc">
              <View style={styles.metricHeader} data-oid="0i92-yk">
                <metric.icon
                  size={20}
                  color={metric.color}
                  data-oid="262-6uh"
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
                  data-oid="8.xpgrt"
                >
                  {metric.change >= 0 ? (
                    <TrendingUp size={12} color="#10B981" data-oid="l1p1cse" />
                  ) : (
                    <TrendingDown
                      size={12}
                      color="#EF4444"
                      data-oid="g5i1mm2"
                    />
                  )}
                  <Text
                    style={[
                      styles.changeText,
                      { color: metric.change >= 0 ? '#10B981' : '#EF4444' },
                    ]}
                    data-oid="4dfcmup"
                  >
                    {metric.change >= 0 ? '+' : ''}
                    {metric.change.toFixed(1)}%
                  </Text>
                </View>
              </View>
              <Text style={styles.metricValue} data-oid="3182l-r">
                {metric.value}
              </Text>
              <Text style={styles.metricLabel} data-oid="01s:yvu">
                {metric.label}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.chartPlaceholder} data-oid="y13vper">
          <PieChart size={80} color="#4B5563" data-oid="xyn:bhn" />
          <View style={styles.chartInfo} data-oid="ibv3ksf">
            <Text style={styles.chartTitle} data-oid="j7a1m39">
              Portfolio Performance
            </Text>
            <Text style={styles.chartDescription} data-oid=":6ixttw">
              {selectedTimeframe} period analysis
            </Text>
          </View>
        </View>

        <View style={styles.section} data-oid="6h8zqx.">
          <Text style={styles.sectionTitle} data-oid="bxx6o67">
            Top Performers
          </Text>
          <View style={styles.performersList} data-oid="-fu9ec5">
            {topPerformers.map((performer, index) => (
              <View
                key={performer.symbol}
                style={styles.performerCard}
                data-oid="bj2pvt8"
              >
                <View style={styles.performerRank} data-oid="3q:nahm">
                  <Text style={styles.rankNumber} data-oid="c:m1sm_">
                    {index + 1}
                  </Text>
                </View>
                <View style={styles.performerInfo} data-oid="30-ee0i">
                  <Text style={styles.performerSymbol} data-oid=":9jp9jb">
                    {performer.symbol}
                  </Text>
                  <Text style={styles.performerTrades} data-oid="rb7fr90">
                    {performer.trades} trades
                  </Text>
                </View>
                <View style={styles.performerMetrics} data-oid="7r9nx86">
                  <Text style={styles.performerPnL} data-oid="zqtr-jx">
                    +${performer.pnl.toLocaleString()}
                  </Text>
                  <Text style={styles.performerPercent} data-oid="hxuy:s6">
                    +{performer.pnlPercent}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section} data-oid="8588pcz">
          <Text style={styles.sectionTitle} data-oid="y2:sv1n">
            Recent Alert Trades
          </Text>
          <View style={styles.alertsList} data-oid="7p79g9z">
            {recentAlerts.map((alert, index) => (
              <View key={index} style={styles.alertCard} data-oid="qguavmt">
                <View style={styles.alertHeader} data-oid="34_7u5-">
                  <View style={styles.alertSymbol} data-oid="g-28kfu">
                    <Text style={styles.alertSymbolText} data-oid="nn-6a_5">
                      {alert.symbol}
                    </Text>
                    <Text
                      style={[
                        styles.alertType,
                        { color: alert.type === 'BUY' ? '#10B981' : '#EF4444' },
                      ]}
                      data-oid="mezxfs-"
                    >
                      {alert.type}
                    </Text>
                  </View>
                  <Text style={styles.alertTime} data-oid="tcbffws">
                    {alert.triggered}
                  </Text>
                </View>
                <View style={styles.alertProfit} data-oid="-ymlez.">
                  <Text style={styles.alertProfitValue} data-oid="8rjoc14">
                    +${alert.profit.toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section} data-oid="yzhnyud">
          <Text style={styles.sectionTitle} data-oid="l3mcbnw">
            Trading Insights
          </Text>
          <View style={styles.insightsList} data-oid="7ub68iw">
            <View style={styles.insightCard} data-oid="ay7283k">
              <View style={styles.insightIcon} data-oid="zqcn2k.">
                <TrendingUp size={20} color="#10B981" data-oid=":m19qbe" />
              </View>
              <View style={styles.insightContent} data-oid="4yjjco_">
                <Text style={styles.insightTitle} data-oid="l004pp5">
                  Strong Performance
                </Text>
                <Text style={styles.insightDescription} data-oid="l6wy26q">
                  Your win rate improved by 8% this week
                </Text>
              </View>
            </View>

            <View style={styles.insightCard} data-oid="dqxiqf4">
              <View style={styles.insightIcon} data-oid=".:fp.50">
                <Target size={20} color="#3B82F6" data-oid="lu7_j7a" />
              </View>
              <View style={styles.insightContent} data-oid="z9171yg">
                <Text style={styles.insightTitle} data-oid="ycgpuur">
                  Alert Accuracy
                </Text>
                <Text style={styles.insightDescription} data-oid="5_3c4.t">
                  85% of your alerts resulted in profitable trades
                </Text>
              </View>
            </View>

            <View style={styles.insightCard} data-oid="r.v3u38">
              <View style={styles.insightIcon} data-oid="dks1-h7">
                <BarChart3 size={20} color="#F59E0B" data-oid="0io4.rh" />
              </View>
              <View style={styles.insightContent} data-oid="9symsgs">
                <Text style={styles.insightTitle} data-oid="f8h2uh9">
                  Best Trading Hour
                </Text>
                <Text style={styles.insightDescription} data-oid="m2wg5.2">
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
