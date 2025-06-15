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
      data-oid="58j67nn"
    >
      <View style={styles.header} data-oid="bdu9_1m">
        <View style={styles.titleContainer} data-oid="9q-7w9r">
          <Text style={styles.title} data-oid="8fjh4_j">
            {strategy.name}
          </Text>
          <View
            style={[
              styles.riskBadge,
              { backgroundColor: getRiskBgColor(strategy.riskLevel) },
            ]}
            data-oid="-1.upgf"
          >
            <Text
              style={[
                styles.riskText,
                { color: getRiskColor(strategy.riskLevel) },
              ]}
              data-oid=".hoblsd"
            >
              {strategy.riskLevel.toUpperCase()}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.copyButton}
          onPress={() => onCopy(strategy.script)}
          data-oid="jfn92sz"
        >
          <Copy size={18} color="#9CA3AF" data-oid="0byl8on" />
        </TouchableOpacity>
      </View>

      <Text style={styles.description} numberOfLines={2} data-oid="m.0txgl">
        {strategy.description}
      </Text>

      <View style={styles.metricsContainer} data-oid="cw6l2a4">
        <View style={styles.metric} data-oid="g2uopmv">
          <TrendingUp size={16} color="#10B981" data-oid="8o3pcsp" />
          <Text style={styles.metricLabel} data-oid="sulammy">
            Return
          </Text>
          <Text
            style={[styles.metricValue, { color: '#10B981' }]}
            data-oid="9zlzmqq"
          >
            {formatPercentage(strategy.performance.totalReturn)}
          </Text>
        </View>

        <View style={styles.metric} data-oid="snqh_en">
          <Target size={16} color="#3B82F6" data-oid="16sw1pp" />
          <Text style={styles.metricLabel} data-oid="f4ah4:j">
            Win Rate
          </Text>
          <Text style={styles.metricValue} data-oid="821z9x8">
            {strategy.performance.winRate.toFixed(1)}%
          </Text>
        </View>

        <View style={styles.metric} data-oid="i5nond9">
          <TrendingDown size={16} color="#EF4444" data-oid="2m:3rhp" />
          <Text style={styles.metricLabel} data-oid="o_4.5_r">
            Max DD
          </Text>
          <Text
            style={[styles.metricValue, { color: '#EF4444' }]}
            data-oid="q8bnom6"
          >
            {formatPercentage(strategy.performance.maxDrawdown)}
          </Text>
        </View>

        <View style={styles.metric} data-oid="rma8ai2">
          <Clock size={16} color="#F59E0B" data-oid="08zh:.i" />
          <Text style={styles.metricLabel} data-oid="_ra.q1t">
            Avg Duration
          </Text>
          <Text style={styles.metricValue} data-oid=":lqmm6f">
            {formatDuration(strategy.performance.avgTradeDuration)}
          </Text>
        </View>
      </View>

      <View style={styles.footer} data-oid="v-xf57i">
        <View style={styles.timeframes} data-oid="9dapluz">
          {strategy.timeframe.slice(0, 3).map((tf, index) => (
            <View key={index} style={styles.timeframeBadge} data-oid="8achafh">
              <Text style={styles.timeframeText} data-oid=":9op2zs">
                {tf}
              </Text>
            </View>
          ))}
          {strategy.timeframe.length > 3 && (
            <Text style={styles.moreTimeframes} data-oid="47.jl2a">
              +{strategy.timeframe.length - 3}
            </Text>
          )}
        </View>

        <View style={styles.stats} data-oid="77iled6">
          <BarChart3 size={14} color="#6B7280" data-oid="hwfbixr" />
          <Text style={styles.statsText} data-oid="cny:s2v">
            {strategy.performance.totalTrades} trades
          </Text>
        </View>
      </View>

      <View style={styles.tags} data-oid="h3sx_f_">
        {strategy.tags.slice(0, 3).map((tag, index) => (
          <View key={index} style={styles.tag} data-oid="..rw36y">
            <Text style={styles.tagText} data-oid="qp4mi.7">
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
