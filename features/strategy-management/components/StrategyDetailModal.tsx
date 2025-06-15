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
      data-oid=":dm_w2p"
    >
      {/* Description */}
      <View style={styles.section} data-oid=":lrbk1l">
        <Text style={styles.sectionTitle} data-oid="4gkh.pu">
          Description
        </Text>
        <Text style={styles.description} data-oid="76aeieh">
          {strategy.description}
        </Text>
      </View>

      {/* Performance Metrics */}
      <View style={styles.section} data-oid="81n1akb">
        <Text style={styles.sectionTitle} data-oid="ol9r:8c">
          Performance Metrics
        </Text>
        <View style={styles.metricsGrid} data-oid="lp_oz91">
          <View style={styles.metricCard} data-oid="q81fvf3">
            <TrendingUp size={20} color="#10B981" data-oid="7_zt08." />
            <Text style={styles.metricLabel} data-oid="s5k4skf">
              Total Return
            </Text>
            <Text
              style={[styles.metricValue, { color: '#10B981' }]}
              data-oid="os3w9v2"
            >
              {formatPercentage(strategy.performance.totalReturn)}
            </Text>
          </View>

          <View style={styles.metricCard} data-oid="1xx68np">
            <Target size={20} color="#3B82F6" data-oid="6tpoo:f" />
            <Text style={styles.metricLabel} data-oid="pjmcacx">
              Win Rate
            </Text>
            <Text style={styles.metricValue} data-oid="k1xz9q3">
              {strategy.performance.winRate.toFixed(1)}%
            </Text>
          </View>

          <View style={styles.metricCard} data-oid="fwcexhy">
            <TrendingDown size={20} color="#EF4444" data-oid="ee6os.i" />
            <Text style={styles.metricLabel} data-oid="bpir0gb">
              Max Drawdown
            </Text>
            <Text
              style={[styles.metricValue, { color: '#EF4444' }]}
              data-oid="3:pet9q"
            >
              {formatPercentage(strategy.performance.maxDrawdown)}
            </Text>
          </View>

          <View style={styles.metricCard} data-oid="mzh9yj8">
            <BarChart3 size={20} color="#F59E0B" data-oid="w08b8pr" />
            <Text style={styles.metricLabel} data-oid="42c:td3">
              Sharpe Ratio
            </Text>
            <Text style={styles.metricValue} data-oid="hex31g.">
              {strategy.performance.sharpeRatio.toFixed(2)}
            </Text>
          </View>

          <View style={styles.metricCard} data-oid="lui.l_m">
            <Clock size={20} color="#8B5CF6" data-oid=".dnmp:b" />
            <Text style={styles.metricLabel} data-oid="g-xmww0">
              Avg Duration
            </Text>
            <Text style={styles.metricValue} data-oid="2idb:17">
              {formatDuration(strategy.performance.avgTradeDuration)}
            </Text>
          </View>

          <View style={styles.metricCard} data-oid="6k4o-k4">
            <Calendar size={20} color="#06B6D4" data-oid="diem7bw" />
            <Text style={styles.metricLabel} data-oid="hpu46c0">
              Total Trades
            </Text>
            <Text style={styles.metricValue} data-oid="fqxqxvu">
              {strategy.performance.totalTrades}
            </Text>
          </View>
        </View>
      </View>

      {/* Timeframes */}
      <View style={styles.section} data-oid="y2twq.-">
        <Text style={styles.sectionTitle} data-oid="3cftqe5">
          Supported Timeframes
        </Text>
        <View style={styles.timeframes} data-oid="8v42:p_">
          {strategy.timeframe.map((tf, index) => (
            <View key={index} style={styles.timeframeBadge} data-oid="lbzh_ws">
              <Text style={styles.timeframeText} data-oid="8z8m6.8">
                {tf}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tags */}
      <View style={styles.section} data-oid="qs:bn8y">
        <Text style={styles.sectionTitle} data-oid="yag07hs">
          Tags
        </Text>
        <View style={styles.tags} data-oid="u4j03wp">
          {strategy.tags.map((tag, index) => (
            <View key={index} style={styles.tag} data-oid="gtm771p">
              <Text style={styles.tagText} data-oid="r86d8x6">
                {tag}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Backtest Period */}
      <View style={styles.section} data-oid="7pah-w.">
        <Text style={styles.sectionTitle} data-oid=".xzakoa">
          Backtest Period
        </Text>
        <Text style={styles.backtestPeriod} data-oid="fz080nf">
          {strategy.performance.backtestPeriod}
        </Text>
      </View>
    </ScrollView>
  );

  const renderScriptTab = () => (
    <ScrollView
      style={styles.tabContent}
      showsVerticalScrollIndicator={false}
      data-oid="64-79x0"
    >
      <View style={styles.section} data-oid="8u9yiey">
        <View style={styles.scriptHeader} data-oid=".6w1fr9">
          <Text style={styles.sectionTitle} data-oid="tobiaox">
            Pine Script Code
          </Text>
          <TouchableOpacity
            style={styles.copyScriptButton}
            onPress={() => onCopy(strategy.script)}
            data-oid="wggnrbj"
          >
            <Copy size={16} color="#FFFFFF" data-oid="i65yz9s" />
            <Text style={styles.copyScriptText} data-oid="cvom.yb">
              Copy Script
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.codeContainer} data-oid="3ww4im:">
          <Text style={styles.codeText} data-oid="bl89klu">
            {strategy.script}
          </Text>
        </View>
      </View>

      <View style={styles.section} data-oid="3kjnwj_">
        <Text style={styles.sectionTitle} data-oid="dbdz74t">
          Alert Template
        </Text>
        <View style={styles.alertTemplateContainer} data-oid="pr_o8yk">
          <Text style={styles.alertTemplateText} data-oid="23y15d_">
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
      data-oid="0o4g6q2"
    >
      <View style={styles.section} data-oid="jhhy-dd">
        <Text style={styles.sectionTitle} data-oid="7ogngx:">
          Setup Instructions
        </Text>
        <View style={styles.setupSteps} data-oid="u6o0wnr">
          <View style={styles.setupStep} data-oid="sme9eed">
            <View style={styles.stepNumber} data-oid="_hcssiy">
              <Text style={styles.stepNumberText} data-oid="p7p2lge">
                1
              </Text>
            </View>
            <View style={styles.stepContent} data-oid="4wmw7fm">
              <Text style={styles.stepTitle} data-oid="nssgfe1">
                Copy Pine Script
              </Text>
              <Text style={styles.stepDescription} data-oid="rmepv0:">
                Copy the Pine Script code and paste it into TradingView's Pine
                Editor
              </Text>
            </View>
          </View>

          <View style={styles.setupStep} data-oid="3goohev">
            <View style={styles.stepNumber} data-oid="88vbj7m">
              <Text style={styles.stepNumberText} data-oid="dqsoqm1">
                2
              </Text>
            </View>
            <View style={styles.stepContent} data-oid="j0jajjd">
              <Text style={styles.stepTitle} data-oid="fa7w923">
                Add to Chart
              </Text>
              <Text style={styles.stepDescription} data-oid="g6ozov-">
                Save and add the strategy to your chart with your preferred
                settings
              </Text>
            </View>
          </View>

          <View style={styles.setupStep} data-oid="kjqz:13">
            <View style={styles.stepNumber} data-oid="6q5n_67">
              <Text style={styles.stepNumberText} data-oid="3vq2lwl">
                3
              </Text>
            </View>
            <View style={styles.stepContent} data-oid="tpltq4n">
              <Text style={styles.stepTitle} data-oid="a5ib4kh">
                Create Alerts
              </Text>
              <Text style={styles.stepDescription} data-oid="86pw7ff">
                Set up alerts using the provided template to receive
                notifications
              </Text>
            </View>
          </View>

          <View style={styles.setupStep} data-oid="6:qzbk:">
            <View style={styles.stepNumber} data-oid="r5-mng9">
              <Text style={styles.stepNumberText} data-oid="vdq6cad">
                4
              </Text>
            </View>
            <View style={styles.stepContent} data-oid="5__p1m:">
              <Text style={styles.stepTitle} data-oid="kpye62p">
                Configure Automation
              </Text>
              <Text style={styles.stepDescription} data-oid="a-w4-ny">
                Connect alerts to TradeSync-AI for automated trading (optional)
              </Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.setupButton} data-oid="-ruo9ez">
        <Zap size={20} color="#FFFFFF" data-oid="27o.dpx" />
        <Text style={styles.setupButtonText} data-oid="2l_z9qi">
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
      data-oid="42r9_am"
    >
      <View style={styles.container} data-oid="m66x4ie">
        {/* Header */}
        <View style={styles.header} data-oid="kj5250t">
          <View style={styles.headerLeft} data-oid="ug-.u92">
            <Text style={styles.title} data-oid=":qn_0m3">
              {strategy.name}
            </Text>
            <View style={styles.headerInfo} data-oid="m-jf__8">
              <View
                style={[
                  styles.riskBadge,
                  { backgroundColor: getRiskBgColor(strategy.riskLevel) },
                ]}
                data-oid="vc3m773"
              >
                <Text
                  style={[
                    styles.riskText,
                    { color: getRiskColor(strategy.riskLevel) },
                  ]}
                  data-oid=".wnfc5."
                >
                  {strategy.riskLevel.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.category} data-oid="7bpcfjn">
                {strategy.category}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            data-oid="i6invqz"
          >
            <X size={24} color="#9CA3AF" data-oid="oh6.aie" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabs} data-oid="g6woary">
          <TouchableOpacity
            style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
            onPress={() => setActiveTab('overview')}
            data-oid="vh09na4"
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'overview' && styles.activeTabText,
              ]}
              data-oid="fdv0jiy"
            >
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'script' && styles.activeTab]}
            onPress={() => setActiveTab('script')}
            data-oid="klf2-bt"
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'script' && styles.activeTabText,
              ]}
              data-oid="ft:p71x"
            >
              Script
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'setup' && styles.activeTab]}
            onPress={() => setActiveTab('setup')}
            data-oid="an1k5u6"
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'setup' && styles.activeTabText,
              ]}
              data-oid="qaoqcpo"
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
