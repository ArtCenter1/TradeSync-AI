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
    <ScrollView
      style={styles.tabContent}
      showsVerticalScrollIndicator={false}
      data-oid="63jpjuj"
    >
      {/* Description */}
      <View style={styles.section} data-oid="o.1i4e9">
        <Text style={styles.sectionTitle} data-oid="2v6uqcm">
          Description
        </Text>
        <Text style={styles.description} data-oid="ami7ul-">
          {strategy.description}
        </Text>
      </View>

      {/* Performance Metrics */}
      <View style={styles.section} data-oid="r573sdd">
        <Text style={styles.sectionTitle} data-oid="1i88o91">
          Performance Metrics
        </Text>
        <View style={styles.metricsGrid} data-oid="m50d3f0">
          <View style={styles.metricCard} data-oid="w:-2quq">
            <TrendingUp size={20} color="#10B981" data-oid="baj1jzk" />
            <Text style={styles.metricLabel} data-oid="40teb05">
              Total Return
            </Text>
            <Text
              style={[styles.metricValue, { color: '#10B981' }]}
              data-oid="okdgus6"
            >
              {formatPercentage(strategy.performance.totalReturn)}
            </Text>
          </View>

          <View style={styles.metricCard} data-oid="33a_w26">
            <Target size={20} color="#3B82F6" data-oid="lpa55iq" />
            <Text style={styles.metricLabel} data-oid="ag5ias9">
              Win Rate
            </Text>
            <Text style={styles.metricValue} data-oid="ct6z82f">
              {strategy.performance.winRate.toFixed(1)}%
            </Text>
          </View>

          <View style={styles.metricCard} data-oid="eypxxij">
            <TrendingDown size={20} color="#EF4444" data-oid="-4uo-dn" />
            <Text style={styles.metricLabel} data-oid="dm2wlz-">
              Max Drawdown
            </Text>
            <Text
              style={[styles.metricValue, { color: '#EF4444' }]}
              data-oid="0:tb:n3"
            >
              {formatPercentage(strategy.performance.maxDrawdown)}
            </Text>
          </View>

          <View style={styles.metricCard} data-oid="k5b9osi">
            <BarChart3 size={20} color="#F59E0B" data-oid="qywonud" />
            <Text style={styles.metricLabel} data-oid="vb0_0jo">
              Sharpe Ratio
            </Text>
            <Text style={styles.metricValue} data-oid="w7m::5k">
              {strategy.performance.sharpeRatio.toFixed(2)}
            </Text>
          </View>

          <View style={styles.metricCard} data-oid="1ha1fr4">
            <Clock size={20} color="#8B5CF6" data-oid="pig3tw6" />
            <Text style={styles.metricLabel} data-oid="707ogvt">
              Avg Duration
            </Text>
            <Text style={styles.metricValue} data-oid="3argncw">
              {formatDuration(strategy.performance.avgTradeDuration)}
            </Text>
          </View>

          <View style={styles.metricCard} data-oid="jajgid3">
            <Calendar size={20} color="#06B6D4" data-oid="hdz-apg" />
            <Text style={styles.metricLabel} data-oid=":pb4:qd">
              Total Trades
            </Text>
            <Text style={styles.metricValue} data-oid="qhcf5j5">
              {strategy.performance.totalTrades}
            </Text>
          </View>
        </View>
      </View>

      {/* Timeframes */}
      <View style={styles.section} data-oid="stewi2v">
        <Text style={styles.sectionTitle} data-oid="8xwg5yf">
          Supported Timeframes
        </Text>
        <View style={styles.timeframes} data-oid="kgyiseg">
          {strategy.timeframe.map((tf, index) => (
            <View key={index} style={styles.timeframeBadge} data-oid="vnk44:-">
              <Text style={styles.timeframeText} data-oid="rq95:p:">
                {tf}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tags */}
      <View style={styles.section} data-oid="rk:qrwr">
        <Text style={styles.sectionTitle} data-oid="gijgma:">
          Tags
        </Text>
        <View style={styles.tags} data-oid="k5p8dqn">
          {strategy.tags.map((tag, index) => (
            <View key={index} style={styles.tag} data-oid="qg.9otd">
              <Text style={styles.tagText} data-oid="-_k3cvm">
                {tag}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Backtest Period */}
      <View style={styles.section} data-oid="nw8u25:">
        <Text style={styles.sectionTitle} data-oid="demdcy.">
          Backtest Period
        </Text>
        <Text style={styles.backtestPeriod} data-oid="ztliv4o">
          {strategy.performance.backtestPeriod}
        </Text>
      </View>
    </ScrollView>
  );

  const renderScriptTab = () => (
    <ScrollView
      style={styles.tabContent}
      showsVerticalScrollIndicator={false}
      data-oid="6ihxsv_"
    >
      <View style={styles.section} data-oid="hc0snvr">
        <View style={styles.scriptHeader} data-oid="uygdjs6">
          <Text style={styles.sectionTitle} data-oid="51_s0tl">
            Pine Script Code
          </Text>
          <TouchableOpacity
            style={styles.copyScriptButton}
            onPress={() => onCopy(strategy.script)}
            data-oid="0wb.re0"
          >
            <Copy size={16} color="#FFFFFF" data-oid="zafh6c6" />
            <Text style={styles.copyScriptText} data-oid="b:7iyfl">
              Copy Script
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.codeContainer} data-oid="l8:xcv0">
          <Text style={styles.codeText} data-oid="23xsfhh">
            {strategy.script}
          </Text>
        </View>
      </View>

      <View style={styles.section} data-oid="3msxifh">
        <Text style={styles.sectionTitle} data-oid="pxlpbyf">
          Alert Template
        </Text>
        <View style={styles.alertTemplateContainer} data-oid=".gdeqz3">
          <Text style={styles.alertTemplateText} data-oid="2v7qcma">
            {strategy.alertTemplate}
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderSetupTab = () => (
    <ScrollView
      style={styles.tabContent}
      showsVerticalScrollIndicator={false}
      data-oid="x8nw0m-"
    >
      <View style={styles.section} data-oid="6tffuh2">
        <Text style={styles.sectionTitle} data-oid="c9ntsma">
          Setup Instructions
        </Text>
        <View style={styles.setupSteps} data-oid="s6ak-ox">
          <View style={styles.setupStep} data-oid="ji0-i36">
            <View style={styles.stepNumber} data-oid="ns--45z">
              <Text style={styles.stepNumberText} data-oid="lbui__r">
                1
              </Text>
            </View>
            <View style={styles.stepContent} data-oid="rrlcit1">
              <Text style={styles.stepTitle} data-oid="e7fhodq">
                Copy Pine Script
              </Text>
              <Text style={styles.stepDescription} data-oid="ojmp.st">
                Copy the Pine Script code and paste it into TradingView's Pine
                Editor
              </Text>
            </View>
          </View>

          <View style={styles.setupStep} data-oid=".g.1og-">
            <View style={styles.stepNumber} data-oid="qdz3fr_">
              <Text style={styles.stepNumberText} data-oid="y88id9-">
                2
              </Text>
            </View>
            <View style={styles.stepContent} data-oid="qr5olmg">
              <Text style={styles.stepTitle} data-oid="3a9q2s_">
                Add to Chart
              </Text>
              <Text style={styles.stepDescription} data-oid="i-.zzet">
                Save and add the strategy to your chart with your preferred
                settings
              </Text>
            </View>
          </View>

          <View style={styles.setupStep} data-oid=".j-1omw">
            <View style={styles.stepNumber} data-oid="gnrpe_d">
              <Text style={styles.stepNumberText} data-oid="auds.82">
                3
              </Text>
            </View>
            <View style={styles.stepContent} data-oid="xfklo2x">
              <Text style={styles.stepTitle} data-oid="dbiuppn">
                Create Alerts
              </Text>
              <Text style={styles.stepDescription} data-oid="br_:mcu">
                Set up alerts using the provided template to receive
                notifications
              </Text>
            </View>
          </View>

          <View style={styles.setupStep} data-oid="ib155mu">
            <View style={styles.stepNumber} data-oid="fht29bw">
              <Text style={styles.stepNumberText} data-oid="beztwp9">
                4
              </Text>
            </View>
            <View style={styles.stepContent} data-oid="wzinf8l">
              <Text style={styles.stepTitle} data-oid="gfow.so">
                Configure Automation
              </Text>
              <Text style={styles.stepDescription} data-oid="8b0x_6c">
                Connect alerts to TradeSync-AI for automated trading (optional)
              </Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.setupButton} data-oid=".0fkcfr">
        <Zap size={20} color="#FFFFFF" data-oid="gn9cg2f" />
        <Text style={styles.setupButtonText} data-oid="ro-krj8">
          Setup Automated Trading
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      data-oid="p2zy0l."
    >
      <View style={styles.container} data-oid="jvzfijt">
        {/* Header */}
        <View style={styles.header} data-oid="mhknto8">
          <View style={styles.headerLeft} data-oid="ci4yult">
            <Text style={styles.title} data-oid="-hzw-6t">
              {strategy.name}
            </Text>
            <View style={styles.headerInfo} data-oid="gtp37rq">
              <View
                style={[
                  styles.riskBadge,
                  { backgroundColor: getRiskBgColor(strategy.riskLevel) },
                ]}
                data-oid=":d6pcgd"
              >
                <Text
                  style={[
                    styles.riskText,
                    { color: getRiskColor(strategy.riskLevel) },
                  ]}
                  data-oid="tb:77fw"
                >
                  {strategy.riskLevel.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.category} data-oid="4rnplnh">
                {strategy.category}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            data-oid="3jabrg1"
          >
            <X size={24} color="#9CA3AF" data-oid="_0.qtd8" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabs} data-oid="7pqouwh">
          <TouchableOpacity
            style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
            onPress={() => setActiveTab('overview')}
            data-oid="1lsvqvn"
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'overview' && styles.activeTabText,
              ]}
              data-oid="pf-6zd-"
            >
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'script' && styles.activeTab]}
            onPress={() => setActiveTab('script')}
            data-oid="lqma888"
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'script' && styles.activeTabText,
              ]}
              data-oid="goam2aj"
            >
              Script
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'setup' && styles.activeTab]}
            onPress={() => setActiveTab('setup')}
            data-oid="2m:_c3f"
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'setup' && styles.activeTabText,
              ]}
              data-oid="m8.-fzr"
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
