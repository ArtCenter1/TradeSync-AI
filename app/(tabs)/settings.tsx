import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import {
  Settings,
  Webhook,
  Zap,
  Shield,
  TrendingUp,
  Bell,
  Key,
  Copy,
  ExternalLink,
  TriangleAlert as AlertTriangle,
} from 'lucide-react-native';

export default function SettingsScreen() {
  const [autoTradingEnabled, setAutoTradingEnabled] = useState(false);
  const [webhookUrl] = useState(
    'https://api.cryptotrader.pro/webhook/tradingview',
  );
  const [apiKey, setApiKey] = useState('ct_live_1234567890abcdef');
  const [maxTradeAmount, setMaxTradeAmount] = useState('1000');
  const [maxDailyTrades, setMaxDailyTrades] = useState('10');
  const [enableStopLoss, setEnableStopLoss] = useState(true);
  const [stopLossPercentage, setStopLossPercentage] = useState('5');
  const [enableTakeProfit, setEnableTakeProfit] = useState(true);
  const [takeProfitPercentage, setTakeProfitPercentage] = useState('10');
  const [enabledSymbols, setEnabledSymbols] = useState(['BTC', 'ETH', 'SOL']);

  const copyWebhookUrl = () => {
    // In a real app, this would copy to clipboard
    Alert.alert('Copied!', 'Webhook URL copied to clipboard');
  };

  const toggleSymbol = (symbol: string) => {
    setEnabledSymbols((prev) =>
      prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol],
    );
  };

  return (
    <View style={styles.container} data-oid=":1a-8qa">
      <View style={styles.header} data-oid="s3w1_jq">
        <Text style={styles.title} data-oid=".6ebeb-">
          Settings
        </Text>
        <Text style={styles.subtitle} data-oid="0aynjik">
          Configure auto-trading and alerts
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        data-oid="iypvav0"
      >
        {/* TradingView Integration */}
        <View style={styles.section} data-oid="wq0gd24">
          <View style={styles.sectionHeader} data-oid="jcijexu">
            <TrendingUp size={20} color="#10B981" data-oid="rvbvbx_" />
            <Text style={styles.sectionTitle} data-oid="d46tinr">
              TradingView Integration
            </Text>
          </View>

          <View style={styles.card} data-oid="smj-ec9">
            <View style={styles.cardHeader} data-oid="_w331en">
              <Text style={styles.cardTitle} data-oid="ijxe3r8">
                Auto-Trading
              </Text>
              <Switch
                value={autoTradingEnabled}
                onValueChange={setAutoTradingEnabled}
                trackColor={{ false: '#374151', true: '#10B981' }}
                thumbColor="#FFFFFF"
                data-oid="7lzsn7r"
              />
            </View>
            <Text style={styles.cardDescription} data-oid="ev8hh54">
              Automatically execute trades based on TradingView alerts
            </Text>
          </View>

          <View style={styles.card} data-oid="0bb4ir-">
            <View style={styles.cardHeader} data-oid="jf-_q3:">
              <Webhook size={18} color="#3B82F6" data-oid="y541w-." />
              <Text style={styles.cardTitle} data-oid="zkvmkgp">
                Webhook URL
              </Text>
              <TouchableOpacity
                onPress={copyWebhookUrl}
                style={styles.copyButton}
                data-oid="o5gh-r5"
              >
                <Copy size={16} color="#9CA3AF" data-oid="u.myl2-" />
              </TouchableOpacity>
            </View>
            <Text style={styles.webhookUrl} data-oid="rb2.4en">
              {webhookUrl}
            </Text>
            <Text style={styles.cardDescription} data-oid="4hfn14j">
              Use this URL in your TradingView alert webhook settings
            </Text>
            <TouchableOpacity
              style={styles.instructionsButton}
              data-oid=".ypifx0"
            >
              <ExternalLink size={16} color="#10B981" data-oid="l:zcwno" />
              <Text style={styles.instructionsText} data-oid="ey3jwmc">
                Setup Instructions
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card} data-oid="wt3k:tv">
            <View style={styles.cardHeader} data-oid="qc2.vq5">
              <Key size={18} color="#F59E0B" data-oid="igrixfv" />
              <Text style={styles.cardTitle} data-oid="2x.7tkg">
                API Key
              </Text>
            </View>
            <TextInput
              style={styles.input}
              value={apiKey}
              onChangeText={setApiKey}
              placeholder="Enter your API key"
              placeholderTextColor="#6B7280"
              secureTextEntry
              data-oid="za-wogo"
            />

            <Text style={styles.cardDescription} data-oid="aonf2l.">
              Your secure API key for trade execution
            </Text>
          </View>
        </View>

        {/* Risk Management */}
        <View style={styles.section} data-oid="p5lbpln">
          <View style={styles.sectionHeader} data-oid="-yxjthh">
            <Shield size={20} color="#EF4444" data-oid="_37fxfz" />
            <Text style={styles.sectionTitle} data-oid="evolz.2">
              Risk Management
            </Text>
          </View>

          <View style={styles.card} data-oid="thc7n.r">
            <Text style={styles.cardTitle} data-oid="wpgxipu">
              Trade Limits
            </Text>
            <View style={styles.inputGroup} data-oid="p-4uliz">
              <Text style={styles.inputLabel} data-oid="p2t:eeo">
                Max Trade Amount ($)
              </Text>
              <TextInput
                style={styles.input}
                value={maxTradeAmount}
                onChangeText={setMaxTradeAmount}
                placeholder="1000"
                placeholderTextColor="#6B7280"
                keyboardType="numeric"
                data-oid="1cmnvd4"
              />
            </View>
            <View style={styles.inputGroup} data-oid="-j61pyz">
              <Text style={styles.inputLabel} data-oid="pjxgf-r">
                Max Daily Trades
              </Text>
              <TextInput
                style={styles.input}
                value={maxDailyTrades}
                onChangeText={setMaxDailyTrades}
                placeholder="10"
                placeholderTextColor="#6B7280"
                keyboardType="numeric"
                data-oid="7th8-i."
              />
            </View>
          </View>

          <View style={styles.card} data-oid=":3l7ay_">
            <View style={styles.switchRow} data-oid="ies7i_a">
              <View style={styles.switchInfo} data-oid="5m:8.s5">
                <Text style={styles.cardTitle} data-oid="7yk:dll">
                  Stop Loss
                </Text>
                <Text style={styles.cardDescription} data-oid="c:l4yzc">
                  Automatically close losing positions
                </Text>
              </View>
              <Switch
                value={enableStopLoss}
                onValueChange={setEnableStopLoss}
                trackColor={{ false: '#374151', true: '#10B981' }}
                thumbColor="#FFFFFF"
                data-oid="g5_1ya2"
              />
            </View>
            {enableStopLoss && (
              <View style={styles.inputGroup} data-oid="61zwjv1">
                <Text style={styles.inputLabel} data-oid="9s7gvqx">
                  Stop Loss Percentage (%)
                </Text>
                <TextInput
                  style={styles.input}
                  value={stopLossPercentage}
                  onChangeText={setStopLossPercentage}
                  placeholder="5"
                  placeholderTextColor="#6B7280"
                  keyboardType="numeric"
                  data-oid="5a6a7ap"
                />
              </View>
            )}
          </View>

          <View style={styles.card} data-oid="vxsfspr">
            <View style={styles.switchRow} data-oid="9e100ye">
              <View style={styles.switchInfo} data-oid="5932ca1">
                <Text style={styles.cardTitle} data-oid="rsmv:b5">
                  Take Profit
                </Text>
                <Text style={styles.cardDescription} data-oid="ydv5iz5">
                  Automatically close winning positions
                </Text>
              </View>
              <Switch
                value={enableTakeProfit}
                onValueChange={setEnableTakeProfit}
                trackColor={{ false: '#374151', true: '#10B981' }}
                thumbColor="#FFFFFF"
                data-oid="35izngz"
              />
            </View>
            {enableTakeProfit && (
              <View style={styles.inputGroup} data-oid="jbgz:1d">
                <Text style={styles.inputLabel} data-oid="8zgogja">
                  Take Profit Percentage (%)
                </Text>
                <TextInput
                  style={styles.input}
                  value={takeProfitPercentage}
                  onChangeText={setTakeProfitPercentage}
                  placeholder="10"
                  placeholderTextColor="#6B7280"
                  keyboardType="numeric"
                  data-oid="2_71fcq"
                />
              </View>
            )}
          </View>
        </View>

        {/* Enabled Symbols */}
        <View style={styles.section} data-oid="jjep4jd">
          <View style={styles.sectionHeader} data-oid="x-bzokl">
            <Zap size={20} color="#3B82F6" data-oid="jg317ot" />
            <Text style={styles.sectionTitle} data-oid="3qc8a-j">
              Enabled Symbols
            </Text>
          </View>

          <View style={styles.card} data-oid="4mx4i8b">
            <Text style={styles.cardTitle} data-oid="ydzmil9">
              Trading Pairs
            </Text>
            <Text style={styles.cardDescription} data-oid="7dor8qm">
              Select which cryptocurrencies to auto-trade
            </Text>
            <View style={styles.symbolGrid} data-oid="pvrjm8w">
              {['BTC', 'ETH', 'SOL', 'ADA', 'DOT', 'AVAX', 'MATIC', 'LINK'].map(
                (symbol) => (
                  <TouchableOpacity
                    key={symbol}
                    style={[
                      styles.symbolChip,
                      enabledSymbols.includes(symbol) &&
                        styles.symbolChipActive,
                    ]}
                    onPress={() => toggleSymbol(symbol)}
                    data-oid="cbri45r"
                  >
                    <Text
                      style={[
                        styles.symbolChipText,
                        enabledSymbols.includes(symbol) &&
                          styles.symbolChipTextActive,
                      ]}
                      data-oid="qxvh6pg"
                    >
                      {symbol}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </View>
          </View>
        </View>

        {/* Alert Configuration */}
        <View style={styles.section} data-oid=":-du7ju">
          <View style={styles.sectionHeader} data-oid="95zl9i_">
            <Bell size={20} color="#F59E0B" data-oid="ce168g0" />
            <Text style={styles.sectionTitle} data-oid="2yljy43">
              Alert Configuration
            </Text>
          </View>

          <View style={styles.card} data-oid="1_51a0y">
            <Text style={styles.cardTitle} data-oid="xg4xs4t">
              Supported Alert Formats
            </Text>
            <View style={styles.formatList} data-oid="14wktzj">
              <View style={styles.formatItem} data-oid="8paxh8d">
                <Text style={styles.formatTitle} data-oid="k57ngnu">
                  Simple Format
                </Text>
                <Text style={styles.formatExample} data-oid="hkvm-si">
                  BUY BTCUSDT
                </Text>
              </View>
              <View style={styles.formatItem} data-oid="vlud5c0">
                <Text style={styles.formatTitle} data-oid="af3x0pr">
                  Detailed Format
                </Text>
                <Text style={styles.formatExample} data-oid="pjh8gy1">
                  {
                    '{{strategy.order.action}} {{ticker}} price={{close}} sl={{strategy.position_avg_price*0.95}}'
                  }
                </Text>
              </View>
              <View style={styles.formatItem} data-oid="_58ibif">
                <Text style={styles.formatTitle} data-oid="nurnkc2">
                  JSON Format
                </Text>
                <Text style={styles.formatExample} data-oid="9l4u:ix">
                  {'{"action":"BUY","symbol":"BTCUSDT","price":71200}'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Status */}
        <View style={styles.section} data-oid="th-az7g">
          <View style={styles.statusCard} data-oid="l.vzohb">
            <View style={styles.statusHeader} data-oid="9ihezyc">
              <View
                style={[
                  styles.statusIndicator,
                  {
                    backgroundColor: autoTradingEnabled ? '#10B981' : '#6B7280',
                  },
                ]}
                data-oid="htwsdk2"
              />

              <Text style={styles.statusTitle} data-oid="_:lhpiq">
                Auto-Trading {autoTradingEnabled ? 'Active' : 'Inactive'}
              </Text>
            </View>
            <Text style={styles.statusDescription} data-oid="t_gs8u8">
              {autoTradingEnabled
                ? 'Ready to receive and execute TradingView alerts'
                : 'Enable auto-trading to start receiving alerts'}
            </Text>
            {autoTradingEnabled && (
              <View style={styles.warningContainer} data-oid="3no9fb3">
                <AlertTriangle size={16} color="#F59E0B" data-oid="2k2fdbc" />
                <Text style={styles.warningText} data-oid="cshs7-8">
                  Auto-trading is active. Monitor your positions regularly.
                </Text>
              </View>
            )}
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
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
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
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#374151',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    flex: 1,
  },
  cardDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    lineHeight: 20,
  },
  copyButton: {
    padding: 4,
  },
  webhookUrl: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#10B981',
    backgroundColor: '#10B981' + '20',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  instructionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  instructionsText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  inputGroup: {
    marginTop: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#4B5563',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#6B7280',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  switchInfo: {
    flex: 1,
  },
  symbolGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  symbolChip: {
    backgroundColor: '#4B5563',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6B7280',
  },
  symbolChipActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  symbolChipText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#9CA3AF',
  },
  symbolChipTextActive: {
    color: '#FFFFFF',
  },
  formatList: {
    marginTop: 12,
    gap: 12,
  },
  formatItem: {
    backgroundColor: '#4B5563',
    padding: 12,
    borderRadius: 8,
  },
  formatTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
    marginBottom: 4,
  },
  formatExample: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#D1D5DB',
  },
  statusCard: {
    backgroundColor: '#374151',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  statusDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginBottom: 12,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F59E0B' + '20',
    padding: 8,
    borderRadius: 8,
  },
  warningText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#F59E0B',
    flex: 1,
  },
});
