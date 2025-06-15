import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  TrendingUp,
  TrendingDown,
  Copy,
  Clock,
  Target,
  BarChart3,
} from 'lucide-react-native';
import { Strategy } from '../types';

interface StrategyCardProps {
  strategy: Strategy;
  onPress: (strategy: Strategy) => void;
  onCopy: (script: string) => void;
}

export default function StrategyCard({
  strategy,
  onPress,
  onCopy,
}: StrategyCardProps) {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return '#10B981';
      case 'medium':
        return '#F59E0B';
      case 'high':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getRiskBgColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return '#064E3B';
      case 'medium':
        return '#78350F';
      case 'high':
        return '#7F1D1D';
      default:
        return '#374151';
    }
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(strategy)}
      activeOpacity={0.8}
      data-oid="gmvzq:t"
    >
      <View style={styles.header} data-oid="vk3av_1">
        <View style={styles.titleContainer} data-oid="c0:.cte">
          <Text style={styles.title} data-oid="3y_cipq">
            {strategy.name}
          </Text>
          <View
            style={[
              styles.riskBadge,
              { backgroundColor: getRiskBgColor(strategy.riskLevel) },
            ]}
            data-oid="l_luk.i"
          >
            <Text
              style={[
                styles.riskText,
                { color: getRiskColor(strategy.riskLevel) },
              ]}
              data-oid="bkrxv8i"
            >
              {strategy.riskLevel.toUpperCase()}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.copyButton}
          onPress={() => onCopy(strategy.script)}
          data-oid="byxd6ol"
        >
          <Copy size={18} color="#9CA3AF" data-oid="ciki80o" />
        </TouchableOpacity>
      </View>

      <Text style={styles.description} numberOfLines={2} data-oid="h:4ecjn">
        {strategy.description}
      </Text>

      <View style={styles.metricsContainer} data-oid="8syumtf">
        <View style={styles.metric} data-oid="fv83b0r">
          <TrendingUp size={16} color="#10B981" data-oid="nti41d2" />
          <Text style={styles.metricLabel} data-oid="zl.b.qg">
            Return
          </Text>
          <Text
            style={[styles.metricValue, { color: '#10B981' }]}
            data-oid="0nl27:9"
          >
            {formatPercentage(strategy.performance.totalReturn)}
          </Text>
        </View>

        <View style={styles.metric} data-oid=".5fo9j_">
          <Target size={16} color="#3B82F6" data-oid="v854gat" />
          <Text style={styles.metricLabel} data-oid="f0lft1o">
            Win Rate
          </Text>
          <Text style={styles.metricValue} data-oid="zup_vzy">
            {strategy.performance.winRate.toFixed(1)}%
          </Text>
        </View>

        <View style={styles.metric} data-oid="ua:rq1y">
          <TrendingDown size={16} color="#EF4444" data-oid="my41t4j" />
          <Text style={styles.metricLabel} data-oid="vwl.7gm">
            Max DD
          </Text>
          <Text
            style={[styles.metricValue, { color: '#EF4444' }]}
            data-oid="2om.mrt"
          >
            {formatPercentage(strategy.performance.maxDrawdown)}
          </Text>
        </View>

        <View style={styles.metric} data-oid="m8_qpp_">
          <Clock size={16} color="#F59E0B" data-oid="re5w.an" />
          <Text style={styles.metricLabel} data-oid="842tjo0">
            Avg Duration
          </Text>
          <Text style={styles.metricValue} data-oid="x5ysmut">
            {formatDuration(strategy.performance.avgTradeDuration)}
          </Text>
        </View>
      </View>

      <View style={styles.footer} data-oid="s2ll.rz">
        <View style={styles.timeframes} data-oid="iy6.u:o">
          {strategy.timeframe.slice(0, 3).map((tf, index) => (
            <View key={index} style={styles.timeframeBadge} data-oid="icwuyar">
              <Text style={styles.timeframeText} data-oid="88m19s8">
                {tf}
              </Text>
            </View>
          ))}
          {strategy.timeframe.length > 3 && (
            <Text style={styles.moreTimeframes} data-oid="-wngzd3">
              +{strategy.timeframe.length - 3}
            </Text>
          )}
        </View>

        <View style={styles.stats} data-oid="v0hw2a-">
          <BarChart3 size={14} color="#6B7280" data-oid="k_4un:l" />
          <Text style={styles.statsText} data-oid="m55g6vu">
            {strategy.performance.totalTrades} trades
          </Text>
        </View>
      </View>

      <View style={styles.tags} data-oid="a_ejuat">
        {strategy.tags.slice(0, 3).map((tag, index) => (
          <View key={index} style={styles.tag} data-oid="y19xegg">
            <Text style={styles.tagText} data-oid="8-qhjcv">
              {tag}
            </Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  riskText: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  copyButton: {
    padding: 4,
  },
  description: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
    marginBottom: 12,
    fontFamily: 'Inter-Regular',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metric: {
    alignItems: 'center',
    gap: 2,
  },
  metricLabel: {
    fontSize: 10,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeframes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeframeBadge: {
    backgroundColor: '#374151',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  timeframeText: {
    fontSize: 10,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  moreTimeframes: {
    fontSize: 10,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statsText: {
    fontSize: 10,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  tags: {
    flexDirection: 'row',
    gap: 6,
  },
  tag: {
    backgroundColor: '#111827',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#374151',
  },
  tagText: {
    fontSize: 10,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
});
