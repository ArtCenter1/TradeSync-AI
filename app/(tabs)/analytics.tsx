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
    <View style={styles.container} data-oid="sym.o89">
      <View style={styles.header} data-oid="7yu_m1w">
        <View data-oid="r5_8q7l">
          <Text style={styles.title} data-oid="vv23y4o">
            Analytics
          </Text>
          <Text style={styles.subtitle} data-oid="cp:_o:f">
            Trading performance overview
          </Text>
        </View>
        <TouchableOpacity style={styles.exportButton} data-oid="i.f2qjn">
          <Calendar size={20} color="#9CA3AF" data-oid="aumxqb-" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        data-oid="s_9hbit"
      >
        <View style={styles.timeframeSelector} data-oid="c.3v4ho">
          {(['24H', '7D', '30D', '1Y'] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.timeframeButton,
                selectedTimeframe === period && styles.timeframeButtonActive,
              ]}
              onPress={() => setSelectedTimeframe(period)}
              data-oid="b.umern"
            >
              <Text
                style={[
                  styles.timeframeText,
                  selectedTimeframe === period && styles.timeframeTextActive,
                ]}
                data-oid="7:vl2m0"
              >
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.metricsGrid} data-oid="k0q7-35">
          {performanceMetrics.map((metric, index) => (
            <View key={index} style={styles.metricCard} data-oid="dhegj9o">
              <View style={styles.metricHeader} data-oid="00e7wn-">
                <metric.icon
                  size={20}
                  color={metric.color}
                  data-oid="z:3s49p"
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
                  data-oid="x:xqonw"
                >
                  {metric.change >= 0 ? (
                    <TrendingUp size={12} color="#10B981" data-oid="g3s7u4_" />
                  ) : (
                    <TrendingDown
                      size={12}
                      color="#EF4444"
                      data-oid="m:ru8iq"
                    />
                  )}
                  <Text
                    style={[
                      styles.changeText,
                      { color: metric.change >= 0 ? '#10B981' : '#EF4444' },
                    ]}
                    data-oid="k3_y2ew"
                  >
                    {metric.change >= 0 ? '+' : ''}
                    {metric.change.toFixed(1)}%
                  </Text>
                </View>
              </View>
              <Text style={styles.metricValue} data-oid="7f6gg4w">
                {metric.value}
              </Text>
              <Text style={styles.metricLabel} data-oid="0p4psyk">
                {metric.label}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.chartPlaceholder} data-oid=".b-_sc6">
          <PieChart size={80} color="#4B5563" data-oid="c-258qg" />
          <View style={styles.chartInfo} data-oid="4z7p-5v">
            <Text style={styles.chartTitle} data-oid="_bk4u1y">
              Portfolio Performance
            </Text>
            <Text style={styles.chartDescription} data-oid="ahtvlun">
              {selectedTimeframe} period analysis
            </Text>
          </View>
        </View>

        <View style={styles.section} data-oid="35m9a5_">
          <Text style={styles.sectionTitle} data-oid="39pskp2">
            Top Performers
          </Text>
          <View style={styles.performersList} data-oid="0bzsqqf">
            {topPerformers.map((performer, index) => (
              <View
                key={performer.symbol}
                style={styles.performerCard}
                data-oid="mxoz6xi"
              >
                <View style={styles.performerRank} data-oid="iqg1wr8">
                  <Text style={styles.rankNumber} data-oid="w2f871w">
                    {index + 1}
                  </Text>
                </View>
                <View style={styles.performerInfo} data-oid="vpads1t">
                  <Text style={styles.performerSymbol} data-oid="paxdz8e">
                    {performer.symbol}
                  </Text>
                  <Text style={styles.performerTrades} data-oid="s.cp7s-">
                    {performer.trades} trades
                  </Text>
                </View>
                <View style={styles.performerMetrics} data-oid="j-zxqhi">
                  <Text style={styles.performerPnL} data-oid="cqfz52-">
                    +${performer.pnl.toLocaleString()}
                  </Text>
                  <Text style={styles.performerPercent} data-oid="vfsybh_">
                    +{performer.pnlPercent}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section} data-oid="sjqy6e0">
          <Text style={styles.sectionTitle} data-oid="31owf.p">
            Recent Alert Trades
          </Text>
          <View style={styles.alertsList} data-oid="grwfl48">
            {recentAlerts.map((alert, index) => (
              <View key={index} style={styles.alertCard} data-oid="j.u3xpz">
                <View style={styles.alertHeader} data-oid="2m51s4_">
                  <View style={styles.alertSymbol} data-oid="v2uinx_">
                    <Text style={styles.alertSymbolText} data-oid="gp1xuko">
                      {alert.symbol}
                    </Text>
                    <Text
                      style={[
                        styles.alertType,
                        { color: alert.type === 'BUY' ? '#10B981' : '#EF4444' },
                      ]}
                      data-oid="v.r0v1v"
                    >
                      {alert.type}
                    </Text>
                  </View>
                  <Text style={styles.alertTime} data-oid="n6g.d_o">
                    {alert.triggered}
                  </Text>
                </View>
                <View style={styles.alertProfit} data-oid="xqvvi4q">
                  <Text style={styles.alertProfitValue} data-oid="eutjwaj">
                    +${alert.profit.toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section} data-oid="98v::.a">
          <Text style={styles.sectionTitle} data-oid="njfoprh">
            Trading Insights
          </Text>
          <View style={styles.insightsList} data-oid="_udk2a.">
            <View style={styles.insightCard} data-oid="1ah366e">
              <View style={styles.insightIcon} data-oid="vgo18as">
                <TrendingUp size={20} color="#10B981" data-oid="syzdqud" />
              </View>
              <View style={styles.insightContent} data-oid="duuflvz">
                <Text style={styles.insightTitle} data-oid="54jy1:.">
                  Strong Performance
                </Text>
                <Text style={styles.insightDescription} data-oid="it4.h11">
                  Your win rate improved by 8% this week
                </Text>
              </View>
            </View>

            <View style={styles.insightCard} data-oid="t79l8z:">
              <View style={styles.insightIcon} data-oid="0.58a.9">
                <Target size={20} color="#3B82F6" data-oid="p2w9rxy" />
              </View>
              <View style={styles.insightContent} data-oid="j96lp0u">
                <Text style={styles.insightTitle} data-oid="q90:qet">
                  Alert Accuracy
                </Text>
                <Text style={styles.insightDescription} data-oid="en-yde1">
                  85% of your alerts resulted in profitable trades
                </Text>
              </View>
            </View>

            <View style={styles.insightCard} data-oid="tbc_12t">
              <View style={styles.insightIcon} data-oid="6e821u1">
                <BarChart3 size={20} color="#F59E0B" data-oid="93_vhw6" />
              </View>
              <View style={styles.insightContent} data-oid="ej-7r9g">
                <Text style={styles.insightTitle} data-oid="gtne6s9">
                  Best Trading Hour
                </Text>
                <Text style={styles.insightDescription} data-oid="cq16qef">
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
