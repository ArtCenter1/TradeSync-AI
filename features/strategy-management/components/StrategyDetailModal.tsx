import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  X,
  Copy,
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  BarChart3,
  Calendar,
  Zap,
  Settings,
} from 'lucide-react-native';
import { Strategy } from '../types';

interface StrategyDetailModalProps {
  strategy: Strategy;
  visible: boolean;
  onClose: () => void;
  onCopy: (script: string) => void;
}

const { height } = Dimensions.get('window');

export default function StrategyDetailModal({
  strategy,
  visible,
  onClose,
  onCopy,
}: StrategyDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'script' | 'setup'>(
    'overview',
  );

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

  const renderOverviewTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{strategy.description}</Text>
      </View>

      {/* Performance Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Metrics</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <TrendingUp size={20} color="#10B981" />
            <Text style={styles.metricLabel}>Total Return</Text>
            <Text style={[styles.metricValue, { color: '#10B981' }]}>
              {formatPercentage(strategy.performance.totalReturn)}
            </Text>
          </View>

          <View style={styles.metricCard}>
            <Target size={20} color="#3B82F6" />
            <Text style={styles.metricLabel}>Win Rate</Text>
            <Text style={styles.metricValue}>
              {strategy.performance.winRate.toFixed(1)}%
            </Text>
          </View>

          <View style={styles.metricCard}>
            <TrendingDown size={20} color="#EF4444" />
            <Text style={styles.metricLabel}>Max Drawdown</Text>
            <Text style={[styles.metricValue, { color: '#EF4444' }]}>
              {formatPercentage(strategy.performance.maxDrawdown)}
            </Text>
          </View>

          <View style={styles.metricCard}>
            <BarChart3 size={20} color="#F59E0B" />
            <Text style={styles.metricLabel}>Sharpe Ratio</Text>
            <Text style={styles.metricValue}>
              {strategy.performance.sharpeRatio.toFixed(2)}
            </Text>
          </View>

          <View style={styles.metricCard}>
            <Clock size={20} color="#8B5CF6" />
            <Text style={styles.metricLabel}>Avg Duration</Text>
            <Text style={styles.metricValue}>
              {formatDuration(strategy.performance.avgTradeDuration)}
            </Text>
          </View>

          <View style={styles.metricCard}>
            <Calendar size={20} color="#06B6D4" />
            <Text style={styles.metricLabel}>Total Trades</Text>
            <Text style={styles.metricValue}>
              {strategy.performance.totalTrades}
            </Text>
          </View>
        </View>
      </View>

      {/* Timeframes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Supported Timeframes</Text>
        <View style={styles.timeframes}>
          {strategy.timeframe.map((tf, index) => (
            <View key={index} style={styles.timeframeBadge}>
              <Text style={styles.timeframeText}>{tf}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tags */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tags</Text>
        <View style={styles.tags}>
          {strategy.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Backtest Period */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Backtest Period</Text>
        <Text style={styles.backtestPeriod}>
          {strategy.performance.backtestPeriod}
        </Text>
      </View>
    </ScrollView>
  );

  const renderScriptTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <View style={styles.scriptHeader}>
          <Text style={styles.sectionTitle}>Pine Script Code</Text>
          <TouchableOpacity
            style={styles.copyScriptButton}
            onPress={() => onCopy(strategy.script)}
          >
            <Copy size={16} color="#FFFFFF" />
            <Text style={styles.copyScriptText}>Copy Script</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.codeContainer}>
          <Text style={styles.codeText}>{strategy.script}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alert Template</Text>
        <View style={styles.alertTemplateContainer}>
          <Text style={styles.alertTemplateText}>{strategy.alertTemplate}</Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderSetupTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Setup Instructions</Text>
        <View style={styles.setupSteps}>
          <View style={styles.setupStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Copy Pine Script</Text>
              <Text style={styles.stepDescription}>
                Copy the Pine Script code and paste it into TradingView's Pine
                Editor
              </Text>
            </View>
          </View>

          <View style={styles.setupStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Add to Chart</Text>
              <Text style={styles.stepDescription}>
                Save and add the strategy to your chart with your preferred
                settings
              </Text>
            </View>
          </View>

          <View style={styles.setupStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Create Alerts</Text>
              <Text style={styles.stepDescription}>
                Set up alerts using the provided template to receive
                notifications
              </Text>
            </View>
          </View>

          <View style={styles.setupStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Configure Automation</Text>
              <Text style={styles.stepDescription}>
                Connect alerts to TradeSync-AI for automated trading (optional)
              </Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.setupButton}>
        <Zap size={20} color="#FFFFFF" />
        <Text style={styles.setupButtonText}>Setup Automated Trading</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>{strategy.name}</Text>
            <View style={styles.headerInfo}>
              <View
                style={[
                  styles.riskBadge,
                  { backgroundColor: getRiskBgColor(strategy.riskLevel) },
                ]}
              >
                <Text
                  style={[
                    styles.riskText,
                    { color: getRiskColor(strategy.riskLevel) },
                  ]}
                >
                  {strategy.riskLevel.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.category}>{strategy.category}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
            onPress={() => setActiveTab('overview')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'overview' && styles.activeTabText,
              ]}
            >
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'script' && styles.activeTab]}
            onPress={() => setActiveTab('script')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'script' && styles.activeTabText,
              ]}
            >
              Script
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'setup' && styles.activeTab]}
            onPress={() => setActiveTab('setup')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'setup' && styles.activeTabText,
              ]}
            >
              Setup
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'script' && renderScriptTab()}
        {activeTab === 'setup' && renderSetupTab()}
      </View>
    </Modal>
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
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  riskText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  category: {
    fontSize: 14,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  closeButton: {
    padding: 8,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#10B981',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9CA3AF',
    fontFamily: 'Inter-Medium',
  },
  activeTabText: {
    color: '#10B981',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
    fontFamily: 'Inter-SemiBold',
  },
  description: {
    fontSize: 16,
    color: '#D1D5DB',
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
    borderWidth: 1,
    borderColor: '#374151',
  },
  metricLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  timeframes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeframeBadge: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  timeframeText: {
    fontSize: 14,
    color: '#D1D5DB',
    fontFamily: 'Inter-Regular',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  tagText: {
    fontSize: 14,
    color: '#D1D5DB',
    fontFamily: 'Inter-Regular',
  },
  backtestPeriod: {
    fontSize: 16,
    color: '#D1D5DB',
    fontFamily: 'Inter-Regular',
  },
  scriptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  copyScriptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  copyScriptText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  codeContainer: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  codeText: {
    fontSize: 12,
    color: '#D1D5DB',
    fontFamily: 'monospace',
    lineHeight: 18,
  },
  alertTemplateContainer: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  alertTemplateText: {
    fontSize: 14,
    color: '#D1D5DB',
    fontFamily: 'Inter-Regular',
  },
  setupSteps: {
    gap: 16,
  },
  setupStep: {
    flexDirection: 'row',
    gap: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  stepDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  setupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 40,
  },
  setupButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
});
