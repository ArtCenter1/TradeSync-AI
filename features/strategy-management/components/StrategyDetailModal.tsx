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
      data-oid="qwl7n1d"
    >
      {/* Description */}
      <View style={styles.section} data-oid="xqs8npw">
        <Text style={styles.sectionTitle} data-oid="-e63u2a">
          Description
        </Text>
        <Text style={styles.description} data-oid="wvwhp30">
          {strategy.description}
        </Text>
      </View>

      {/* Performance Metrics */}
      <View style={styles.section} data-oid="2o1rjki">
        <Text style={styles.sectionTitle} data-oid="8-si1z2">
          Performance Metrics
        </Text>
        <View style={styles.metricsGrid} data-oid="eb:u0cj">
          <View style={styles.metricCard} data-oid="xuye6cb">
            <TrendingUp size={20} color="#10B981" data-oid="hnju2m:" />
            <Text style={styles.metricLabel} data-oid="ayo_e46">
              Total Return
            </Text>
            <Text
              style={[styles.metricValue, { color: '#10B981' }]}
              data-oid="qz0--g0"
            >
              {formatPercentage(strategy.performance.totalReturn)}
            </Text>
          </View>

          <View style={styles.metricCard} data-oid="mywrn-s">
            <Target size={20} color="#3B82F6" data-oid="ni-r:c4" />
            <Text style={styles.metricLabel} data-oid=".168kva">
              Win Rate
            </Text>
            <Text style={styles.metricValue} data-oid="rx03bw6">
              {strategy.performance.winRate.toFixed(1)}%
            </Text>
          </View>

          <View style={styles.metricCard} data-oid="mdfv6ir">
            <TrendingDown size={20} color="#EF4444" data-oid="ms6_tk5" />
            <Text style={styles.metricLabel} data-oid="kcwdsl4">
              Max Drawdown
            </Text>
            <Text
              style={[styles.metricValue, { color: '#EF4444' }]}
              data-oid="k0zeni:"
            >
              {formatPercentage(strategy.performance.maxDrawdown)}
            </Text>
          </View>

          <View style={styles.metricCard} data-oid="9nmb1fl">
            <BarChart3 size={20} color="#F59E0B" data-oid="lqf1zgg" />
            <Text style={styles.metricLabel} data-oid="cir3.82">
              Sharpe Ratio
            </Text>
            <Text style={styles.metricValue} data-oid="8h4wn63">
              {strategy.performance.sharpeRatio.toFixed(2)}
            </Text>
          </View>

          <View style={styles.metricCard} data-oid="c-f30e_">
            <Clock size={20} color="#8B5CF6" data-oid="p53xli3" />
            <Text style={styles.metricLabel} data-oid="ipto-t0">
              Avg Duration
            </Text>
            <Text style={styles.metricValue} data-oid="a7vfr.y">
              {formatDuration(strategy.performance.avgTradeDuration)}
            </Text>
          </View>

          <View style={styles.metricCard} data-oid="v62e9k5">
            <Calendar size={20} color="#06B6D4" data-oid="0a738td" />
            <Text style={styles.metricLabel} data-oid="l16t9q0">
              Total Trades
            </Text>
            <Text style={styles.metricValue} data-oid="b-4mqcl">
              {strategy.performance.totalTrades}
            </Text>
          </View>
        </View>
      </View>

      {/* Timeframes */}
      <View style={styles.section} data-oid=":otkzaa">
        <Text style={styles.sectionTitle} data-oid="-w2k8hu">
          Supported Timeframes
        </Text>
        <View style={styles.timeframes} data-oid="nl7flxu">
          {strategy.timeframe.map((tf, index) => (
            <View key={index} style={styles.timeframeBadge} data-oid="dgx15w:">
              <Text style={styles.timeframeText} data-oid="1qw.voh">
                {tf}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tags */}
      <View style={styles.section} data-oid="gjex7kk">
        <Text style={styles.sectionTitle} data-oid="des9p0r">
          Tags
        </Text>
        <View style={styles.tags} data-oid="pg2zudz">
          {strategy.tags.map((tag, index) => (
            <View key={index} style={styles.tag} data-oid="34tooxk">
              <Text style={styles.tagText} data-oid="zb0myvo">
                {tag}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Backtest Period */}
      <View style={styles.section} data-oid="6_d.nyv">
        <Text style={styles.sectionTitle} data-oid="y-.ozp.">
          Backtest Period
        </Text>
        <Text style={styles.backtestPeriod} data-oid="x-08lt-">
          {strategy.performance.backtestPeriod}
        </Text>
      </View>
    </ScrollView>
  );

  const renderScriptTab = () => (
    <ScrollView
      style={styles.tabContent}
      showsVerticalScrollIndicator={false}
      data-oid="hv10u5p"
    >
      <View style={styles.section} data-oid="9byh3zu">
        <View style={styles.scriptHeader} data-oid="1n037k.">
          <Text style={styles.sectionTitle} data-oid="mzwd_.k">
            Pine Script Code
          </Text>
          <TouchableOpacity
            style={styles.copyScriptButton}
            onPress={() => onCopy(strategy.script)}
            data-oid="vdf:mr2"
          >
            <Copy size={16} color="#FFFFFF" data-oid=".ykthi7" />
            <Text style={styles.copyScriptText} data-oid="_hv6:1_">
              Copy Script
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.codeContainer} data-oid="sn:1:92">
          <Text style={styles.codeText} data-oid="p643j1s">
            {strategy.script}
          </Text>
        </View>
      </View>

      <View style={styles.section} data-oid="kswq_15">
        <Text style={styles.sectionTitle} data-oid="5yez656">
          Alert Template
        </Text>
        <View style={styles.alertTemplateContainer} data-oid="msu4bp-">
          <Text style={styles.alertTemplateText} data-oid="_ajf2_7">
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
      data-oid="z27uggj"
    >
      <View style={styles.section} data-oid="ooz4dn7">
        <Text style={styles.sectionTitle} data-oid="keexjuf">
          Setup Instructions
        </Text>
        <View style={styles.setupSteps} data-oid="s1rrwqv">
          <View style={styles.setupStep} data-oid="hb:qr87">
            <View style={styles.stepNumber} data-oid="vc114yh">
              <Text style={styles.stepNumberText} data-oid="rkur2wh">
                1
              </Text>
            </View>
            <View style={styles.stepContent} data-oid="a1ss7gd">
              <Text style={styles.stepTitle} data-oid="yw1g.:8">
                Copy Pine Script
              </Text>
              <Text style={styles.stepDescription} data-oid="vl6zb9i">
                Copy the Pine Script code and paste it into TradingView's Pine
                Editor
              </Text>
            </View>
          </View>

          <View style={styles.setupStep} data-oid="ufk0a25">
            <View style={styles.stepNumber} data-oid="jc3s2e5">
              <Text style={styles.stepNumberText} data-oid=":38hjle">
                2
              </Text>
            </View>
            <View style={styles.stepContent} data-oid="jg0ukjj">
              <Text style={styles.stepTitle} data-oid="e6cvyxk">
                Add to Chart
              </Text>
              <Text style={styles.stepDescription} data-oid=".zxb3z1">
                Save and add the strategy to your chart with your preferred
                settings
              </Text>
            </View>
          </View>

          <View style={styles.setupStep} data-oid="t8hyph0">
            <View style={styles.stepNumber} data-oid="mph1.i3">
              <Text style={styles.stepNumberText} data-oid="f58et:i">
                3
              </Text>
            </View>
            <View style={styles.stepContent} data-oid="j6ov7ku">
              <Text style={styles.stepTitle} data-oid="rjqdara">
                Create Alerts
              </Text>
              <Text style={styles.stepDescription} data-oid="vtq6k5h">
                Set up alerts using the provided template to receive
                notifications
              </Text>
            </View>
          </View>

          <View style={styles.setupStep} data-oid="t411o4d">
            <View style={styles.stepNumber} data-oid="cnvw1sc">
              <Text style={styles.stepNumberText} data-oid="4hy1vmr">
                4
              </Text>
            </View>
            <View style={styles.stepContent} data-oid="617kfib">
              <Text style={styles.stepTitle} data-oid="qsscvry">
                Configure Automation
              </Text>
              <Text style={styles.stepDescription} data-oid="mifw5t:">
                Connect alerts to TradeSync-AI for automated trading (optional)
              </Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.setupButton} data-oid="3r3aqi1">
        <Zap size={20} color="#FFFFFF" data-oid="_8127zn" />
        <Text style={styles.setupButtonText} data-oid="a3p_ncv">
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
      data-oid="0vl.y7m"
    >
      <View style={styles.container} data-oid="nlqzlfb">
        {/* Header */}
        <View style={styles.header} data-oid="iz:4282">
          <View style={styles.headerLeft} data-oid="z:cdim9">
            <Text style={styles.title} data-oid="huo:zbi">
              {strategy.name}
            </Text>
            <View style={styles.headerInfo} data-oid="3q.un15">
              <View
                style={[
                  styles.riskBadge,
                  { backgroundColor: getRiskBgColor(strategy.riskLevel) },
                ]}
                data-oid=":57n0yh"
              >
                <Text
                  style={[
                    styles.riskText,
                    { color: getRiskColor(strategy.riskLevel) },
                  ]}
                  data-oid="p-migrp"
                >
                  {strategy.riskLevel.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.category} data-oid="jsqcpdl">
                {strategy.category}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            data-oid="p7.3n34"
          >
            <X size={24} color="#9CA3AF" data-oid="s0x0jhf" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabs} data-oid="9e8-e-t">
          <TouchableOpacity
            style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
            onPress={() => setActiveTab('overview')}
            data-oid="74:2sth"
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'overview' && styles.activeTabText,
              ]}
              data-oid="8idu0l8"
            >
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'script' && styles.activeTab]}
            onPress={() => setActiveTab('script')}
            data-oid="opk-dst"
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'script' && styles.activeTabText,
              ]}
              data-oid="0fujye-"
            >
              Script
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'setup' && styles.activeTab]}
            onPress={() => setActiveTab('setup')}
            data-oid="acsackv"
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'setup' && styles.activeTabText,
              ]}
              data-oid="fa-_ffu"
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
