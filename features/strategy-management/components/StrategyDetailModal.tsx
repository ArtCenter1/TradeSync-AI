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
      data-oid="8pv0a7w"
    >
      {/* Description */}
      <View style={styles.section} data-oid="zqutes:">
        <Text style={styles.sectionTitle} data-oid="47mnlus">
          Description
        </Text>
        <Text style={styles.description} data-oid="4uuwcho">
          {strategy.description}
        </Text>
      </View>

      {/* Performance Metrics */}
      <View style={styles.section} data-oid="7dwi4.w">
        <Text style={styles.sectionTitle} data-oid="ru1ssdx">
          Performance Metrics
        </Text>
        <View style={styles.metricsGrid} data-oid="brm6l.8">
          <View style={styles.metricCard} data-oid="i_h.:jr">
            <TrendingUp size={20} color="#10B981" data-oid="-i_2pd5" />
            <Text style={styles.metricLabel} data-oid="0uqngv6">
              Total Return
            </Text>
            <Text
              style={[styles.metricValue, { color: '#10B981' }]}
              data-oid="lghj--h"
            >
              {formatPercentage(strategy.performance.totalReturn)}
            </Text>
          </View>

          <View style={styles.metricCard} data-oid="0t0cxgy">
            <Target size={20} color="#3B82F6" data-oid="_dkl.j3" />
            <Text style={styles.metricLabel} data-oid="gfolkhn">
              Win Rate
            </Text>
            <Text style={styles.metricValue} data-oid="oms-cfz">
              {strategy.performance.winRate.toFixed(1)}%
            </Text>
          </View>

          <View style={styles.metricCard} data-oid="bxv5c22">
            <TrendingDown size={20} color="#EF4444" data-oid="5f2gedq" />
            <Text style={styles.metricLabel} data-oid="z6k.txe">
              Max Drawdown
            </Text>
            <Text
              style={[styles.metricValue, { color: '#EF4444' }]}
              data-oid="2x8f_0m"
            >
              {formatPercentage(strategy.performance.maxDrawdown)}
            </Text>
          </View>

          <View style={styles.metricCard} data-oid="9kes34t">
            <BarChart3 size={20} color="#F59E0B" data-oid="tzkz806" />
            <Text style={styles.metricLabel} data-oid="xyt.2nm">
              Sharpe Ratio
            </Text>
            <Text style={styles.metricValue} data-oid="q40i90b">
              {strategy.performance.sharpeRatio.toFixed(2)}
            </Text>
          </View>

          <View style={styles.metricCard} data-oid="h85elw6">
            <Clock size={20} color="#8B5CF6" data-oid="g:5h:xb" />
            <Text style={styles.metricLabel} data-oid="_-rm5dq">
              Avg Duration
            </Text>
            <Text style={styles.metricValue} data-oid="aq_0r9k">
              {formatDuration(strategy.performance.avgTradeDuration)}
            </Text>
          </View>

          <View style={styles.metricCard} data-oid="kzuu310">
            <Calendar size={20} color="#06B6D4" data-oid="i3an79g" />
            <Text style={styles.metricLabel} data-oid="3:i6a.7">
              Total Trades
            </Text>
            <Text style={styles.metricValue} data-oid="pqu:.h8">
              {strategy.performance.totalTrades}
            </Text>
          </View>
        </View>
      </View>

      {/* Timeframes */}
      <View style={styles.section} data-oid=":ojv3ue">
        <Text style={styles.sectionTitle} data-oid="w3wr.mi">
          Supported Timeframes
        </Text>
        <View style={styles.timeframes} data-oid="hob--a:">
          {strategy.timeframe.map((tf, index) => (
            <View key={index} style={styles.timeframeBadge} data-oid="vebk3gs">
              <Text style={styles.timeframeText} data-oid="j6xaa2i">
                {tf}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tags */}
      <View style={styles.section} data-oid="jwet6hh">
        <Text style={styles.sectionTitle} data-oid="0qb.z5v">
          Tags
        </Text>
        <View style={styles.tags} data-oid="y00zr12">
          {strategy.tags.map((tag, index) => (
            <View key={index} style={styles.tag} data-oid="c3k0pkl">
              <Text style={styles.tagText} data-oid="y1aqj.3">
                {tag}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Backtest Period */}
      <View style={styles.section} data-oid="id5bxrv">
        <Text style={styles.sectionTitle} data-oid="fw64o.e">
          Backtest Period
        </Text>
        <Text style={styles.backtestPeriod} data-oid="02s48em">
          {strategy.performance.backtestPeriod}
        </Text>
      </View>
    </ScrollView>
  );

  const renderScriptTab = () => (
    <ScrollView
      style={styles.tabContent}
      showsVerticalScrollIndicator={false}
      data-oid="n.gt4zp"
    >
      <View style={styles.section} data-oid="_9t3.6-">
        <View style={styles.scriptHeader} data-oid="6f67qgy">
          <Text style={styles.sectionTitle} data-oid="k2xyrrz">
            Pine Script Code
          </Text>
          <TouchableOpacity
            style={styles.copyScriptButton}
            onPress={() => onCopy(strategy.script)}
            data-oid="dp.9bwx"
          >
            <Copy size={16} color="#FFFFFF" data-oid="b2vv65a" />
            <Text style={styles.copyScriptText} data-oid="6ely2qp">
              Copy Script
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.codeContainer} data-oid="vque977">
          <Text style={styles.codeText} data-oid="nry8u_a">
            {strategy.script}
          </Text>
        </View>
      </View>

      <View style={styles.section} data-oid="-.amocl">
        <Text style={styles.sectionTitle} data-oid="6gsxbij">
          Alert Template
        </Text>
        <View style={styles.alertTemplateContainer} data-oid="iiye8xj">
          <Text style={styles.alertTemplateText} data-oid="pchlw8g">
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
      data-oid="a90m9-n"
    >
      <View style={styles.section} data-oid="-e.r6j4">
        <Text style={styles.sectionTitle} data-oid="31q-_zd">
          Setup Instructions
        </Text>
        <View style={styles.setupSteps} data-oid="hzvydqu">
          <View style={styles.setupStep} data-oid="86343l6">
            <View style={styles.stepNumber} data-oid="3axq98v">
              <Text style={styles.stepNumberText} data-oid="ro-d47-">
                1
              </Text>
            </View>
            <View style={styles.stepContent} data-oid="lri_z5a">
              <Text style={styles.stepTitle} data-oid="fio40rz">
                Copy Pine Script
              </Text>
              <Text style={styles.stepDescription} data-oid="vlm4aro">
                Copy the Pine Script code and paste it into TradingView's Pine
                Editor
              </Text>
            </View>
          </View>

          <View style={styles.setupStep} data-oid="5qyu5yc">
            <View style={styles.stepNumber} data-oid="v6r-d98">
              <Text style={styles.stepNumberText} data-oid="k2s05k3">
                2
              </Text>
            </View>
            <View style={styles.stepContent} data-oid="qo52m-l">
              <Text style={styles.stepTitle} data-oid="nqqan78">
                Add to Chart
              </Text>
              <Text style={styles.stepDescription} data-oid="tv1d5si">
                Save and add the strategy to your chart with your preferred
                settings
              </Text>
            </View>
          </View>

          <View style={styles.setupStep} data-oid="a-c-1vg">
            <View style={styles.stepNumber} data-oid="z6orztq">
              <Text style={styles.stepNumberText} data-oid="rk37i6w">
                3
              </Text>
            </View>
            <View style={styles.stepContent} data-oid="_wsa4dg">
              <Text style={styles.stepTitle} data-oid="are28pg">
                Create Alerts
              </Text>
              <Text style={styles.stepDescription} data-oid="emrwaos">
                Set up alerts using the provided template to receive
                notifications
              </Text>
            </View>
          </View>

          <View style={styles.setupStep} data-oid="8a0hxc5">
            <View style={styles.stepNumber} data-oid="18k5_e1">
              <Text style={styles.stepNumberText} data-oid="a46qwve">
                4
              </Text>
            </View>
            <View style={styles.stepContent} data-oid="mqzyu67">
              <Text style={styles.stepTitle} data-oid="0zvo2b-">
                Configure Automation
              </Text>
              <Text style={styles.stepDescription} data-oid="8h-nyti">
                Connect alerts to TradeSync-AI for automated trading (optional)
              </Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.setupButton} data-oid="r8pk7_c">
        <Zap size={20} color="#FFFFFF" data-oid="l69vds5" />
        <Text style={styles.setupButtonText} data-oid="bs20:rg">
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
      data-oid="6b.rp5x"
    >
      <View style={styles.container} data-oid="k09zki-">
        {/* Header */}
        <View style={styles.header} data-oid="p3ksti1">
          <View style={styles.headerLeft} data-oid="3meoarq">
            <Text style={styles.title} data-oid="n18v00u">
              {strategy.name}
            </Text>
            <View style={styles.headerInfo} data-oid="1h_3:bl">
              <View
                style={[
                  styles.riskBadge,
                  { backgroundColor: getRiskBgColor(strategy.riskLevel) },
                ]}
                data-oid="w6dtuvn"
              >
                <Text
                  style={[
                    styles.riskText,
                    { color: getRiskColor(strategy.riskLevel) },
                  ]}
                  data-oid="uf3_.c."
                >
                  {strategy.riskLevel.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.category} data-oid="0-jq_07">
                {strategy.category}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            data-oid="31208sy"
          >
            <X size={24} color="#9CA3AF" data-oid="cj.1f:m" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabs} data-oid="wlguo87">
          <TouchableOpacity
            style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
            onPress={() => setActiveTab('overview')}
            data-oid="-iuowu3"
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'overview' && styles.activeTabText,
              ]}
              data-oid="7ljz_z3"
            >
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'script' && styles.activeTab]}
            onPress={() => setActiveTab('script')}
            data-oid="9wjlg0s"
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'script' && styles.activeTabText,
              ]}
              data-oid="ywp0v3t"
            >
              Script
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'setup' && styles.activeTab]}
            onPress={() => setActiveTab('setup')}
            data-oid="fca36:2"
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'setup' && styles.activeTabText,
              ]}
              data-oid="prxt2ff"
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
