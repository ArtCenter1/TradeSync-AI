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
    <View style={styles.container} data-oid="w2.i-xs">
      <View style={styles.header} data-oid="h54iz_u">
        <Text style={styles.title} data-oid="j_2uk6m">
          Settings
        </Text>
        <Text style={styles.subtitle} data-oid="bq463dg">
          Configure auto-trading and alerts
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        data-oid=".sr1:9u"
      >
        {/* TradingView Integration */}
        <View style={styles.section} data-oid="xd2uf4f">
          <View style={styles.sectionHeader} data-oid="p2ivnjx">
            <TrendingUp size={20} color="#10B981" data-oid=".9d8kvg" />
            <Text style={styles.sectionTitle} data-oid="ou6nqwl">
              TradingView Integration
            </Text>
          </View>

          <View style={styles.card} data-oid="1-.oa00">
            <View style={styles.cardHeader} data-oid="0o7vxz1">
              <Text style={styles.cardTitle} data-oid="5qm:8i.">
                Auto-Trading
              </Text>
              <Switch
                value={autoTradingEnabled}
                onValueChange={setAutoTradingEnabled}
                trackColor={{ false: '#374151', true: '#10B981' }}
                thumbColor="#FFFFFF"
                data-oid="igjp_iw"
              />
            </View>
            <Text style={styles.cardDescription} data-oid="-.z2rd9">
              Automatically execute trades based on TradingView alerts
            </Text>
          </View>

          <View style={styles.card} data-oid="yb8a.95">
            <View style={styles.cardHeader} data-oid="l-fyeag">
              <Webhook size={18} color="#3B82F6" data-oid="cq5gzp1" />
              <Text style={styles.cardTitle} data-oid="gn3q9lv">
                Webhook URL
              </Text>
              <TouchableOpacity
                onPress={copyWebhookUrl}
                style={styles.copyButton}
                data-oid="4r2z7q5"
              >
                <Copy size={16} color="#9CA3AF" data-oid="f5hf.x9" />
              </TouchableOpacity>
            </View>
            <Text style={styles.webhookUrl} data-oid="kiwq9hl">
              {webhookUrl}
            </Text>
            <Text style={styles.cardDescription} data-oid="8t2lxq9">
              Use this URL in your TradingView alert webhook settings
            </Text>
            <TouchableOpacity
              style={styles.instructionsButton}
              data-oid="n1_e9lm"
            >
              <ExternalLink size={16} color="#10B981" data-oid="yadh1le" />
              <Text style={styles.instructionsText} data-oid="utfb.v3">
                Setup Instructions
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card} data-oid="liiukmr">
            <View style={styles.cardHeader} data-oid="04afkxf">
              <Key size={18} color="#F59E0B" data-oid="-gf8vf4" />
              <Text style={styles.cardTitle} data-oid="nkq9si8">
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
              data-oid="sf9m-h4"
            />

            <Text style={styles.cardDescription} data-oid=":m19a7n">
              Your secure API key for trade execution
            </Text>
          </View>
        </View>

        {/* Risk Management */}
        <View style={styles.section} data-oid="fxcu:6w">
          <View style={styles.sectionHeader} data-oid="x-9eudo">
            <Shield size={20} color="#EF4444" data-oid="c.gjj3f" />
            <Text style={styles.sectionTitle} data-oid="1q1t26.">
              Risk Management
            </Text>
          </View>

          <View style={styles.card} data-oid="l130hc4">
            <Text style={styles.cardTitle} data-oid="doezhy_">
              Trade Limits
            </Text>
            <View style={styles.inputGroup} data-oid="e68k1n3">
              <Text style={styles.inputLabel} data-oid="_meoj4a">
                Max Trade Amount ($)
              </Text>
              <TextInput
                style={styles.input}
                value={maxTradeAmount}
                onChangeText={setMaxTradeAmount}
                placeholder="1000"
                placeholderTextColor="#6B7280"
                keyboardType="numeric"
                data-oid="lv0_700"
              />
            </View>
            <View style={styles.inputGroup} data-oid="p::b:7o">
              <Text style={styles.inputLabel} data-oid="5z8:fxn">
                Max Daily Trades
              </Text>
              <TextInput
                style={styles.input}
                value={maxDailyTrades}
                onChangeText={setMaxDailyTrades}
                placeholder="10"
                placeholderTextColor="#6B7280"
                keyboardType="numeric"
                data-oid="gzm6o2t"
              />
            </View>
          </View>

          <View style={styles.card} data-oid="bwu2c0g">
            <View style={styles.switchRow} data-oid="2tf8ja7">
              <View style={styles.switchInfo} data-oid="bwwlx9j">
                <Text style={styles.cardTitle} data-oid="oo545p6">
                  Stop Loss
                </Text>
                <Text style={styles.cardDescription} data-oid="g.z9svk">
                  Automatically close losing positions
                </Text>
              </View>
              <Switch
                value={enableStopLoss}
                onValueChange={setEnableStopLoss}
                trackColor={{ false: '#374151', true: '#10B981' }}
                thumbColor="#FFFFFF"
                data-oid="0mv2e-a"
              />
            </View>
            {enableStopLoss && (
              <View style={styles.inputGroup} data-oid="a.fd5st">
                <Text style={styles.inputLabel} data-oid="3qjnwh0">
                  Stop Loss Percentage (%)
                </Text>
                <TextInput
                  style={styles.input}
                  value={stopLossPercentage}
                  onChangeText={setStopLossPercentage}
                  placeholder="5"
                  placeholderTextColor="#6B7280"
                  keyboardType="numeric"
                  data-oid="8t4u69q"
                />
              </View>
            )}
          </View>

          <View style={styles.card} data-oid="v_1kd-a">
            <View style={styles.switchRow} data-oid="gkdy8p.">
              <View style={styles.switchInfo} data-oid="btkw32r">
                <Text style={styles.cardTitle} data-oid="jd818-r">
                  Take Profit
                </Text>
                <Text style={styles.cardDescription} data-oid="3e1ptxc">
                  Automatically close winning positions
                </Text>
              </View>
              <Switch
                value={enableTakeProfit}
                onValueChange={setEnableTakeProfit}
                trackColor={{ false: '#374151', true: '#10B981' }}
                thumbColor="#FFFFFF"
                data-oid="z:kqpsy"
              />
            </View>
            {enableTakeProfit && (
              <View style={styles.inputGroup} data-oid="9so:9pz">
                <Text style={styles.inputLabel} data-oid="pvu5-61">
                  Take Profit Percentage (%)
                </Text>
                <TextInput
                  style={styles.input}
                  value={takeProfitPercentage}
                  onChangeText={setTakeProfitPercentage}
                  placeholder="10"
                  placeholderTextColor="#6B7280"
                  keyboardType="numeric"
                  data-oid="z7t.cvi"
                />
              </View>
            )}
          </View>
        </View>

        {/* Enabled Symbols */}
        <View style={styles.section} data-oid="p42lbkn">
          <View style={styles.sectionHeader} data-oid="wvdg8k_">
            <Zap size={20} color="#3B82F6" data-oid="tmhoh4h" />
            <Text style={styles.sectionTitle} data-oid="ps.jbpf">
              Enabled Symbols
            </Text>
          </View>

          <View style={styles.card} data-oid="o2j9pjp">
            <Text style={styles.cardTitle} data-oid="60_57uq">
              Trading Pairs
            </Text>
            <Text style={styles.cardDescription} data-oid="1n_glg:">
              Select which cryptocurrencies to auto-trade
            </Text>
            <View style={styles.symbolGrid} data-oid="91z6iub">
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
                    data-oid="k-.u8t."
                  >
                    <Text
                      style={[
                        styles.symbolChipText,
                        enabledSymbols.includes(symbol) &&
                          styles.symbolChipTextActive,
                      ]}
                      data-oid="yzbdtiy"
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
        <View style={styles.section} data-oid="vl98grl">
          <View style={styles.sectionHeader} data-oid="b-lv80z">
            <Bell size={20} color="#F59E0B" data-oid="e_z8vai" />
            <Text style={styles.sectionTitle} data-oid="yo3y17n">
              Alert Configuration
            </Text>
          </View>

          <View style={styles.card} data-oid="pwemc1d">
            <Text style={styles.cardTitle} data-oid="xkqovjy">
              Supported Alert Formats
            </Text>
            <View style={styles.formatList} data-oid="5uelgmm">
              <View style={styles.formatItem} data-oid="872al83">
                <Text style={styles.formatTitle} data-oid="fn0ju_u">
                  Simple Format
                </Text>
                <Text style={styles.formatExample} data-oid="3p717si">
                  BUY BTCUSDT
                </Text>
              </View>
              <View style={styles.formatItem} data-oid="v_86jx.">
                <Text style={styles.formatTitle} data-oid="wpnyom5">
                  Detailed Format
                </Text>
                <Text style={styles.formatExample} data-oid="mz8duj3">
                  {
                    '{{strategy.order.action}} {{ticker}} price={{close}} sl={{strategy.position_avg_price*0.95}}'
                  }
                </Text>
              </View>
              <View style={styles.formatItem} data-oid="9s3u8mv">
                <Text style={styles.formatTitle} data-oid="vjxut:m">
                  JSON Format
                </Text>
                <Text style={styles.formatExample} data-oid="xc5ttvn">
                  {'{"action":"BUY","symbol":"BTCUSDT","price":71200}'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Status */}
        <View style={styles.section} data-oid="5.gwgzk">
          <View style={styles.statusCard} data-oid="dw531:f">
            <View style={styles.statusHeader} data-oid="hto9yq3">
              <View
                style={[
                  styles.statusIndicator,
                  {
                    backgroundColor: autoTradingEnabled ? '#10B981' : '#6B7280',
                  },
                ]}
                data-oid="6zwd24u"
              />

              <Text style={styles.statusTitle} data-oid="uu-o8bu">
                Auto-Trading {autoTradingEnabled ? 'Active' : 'Inactive'}
              </Text>
            </View>
            <Text style={styles.statusDescription} data-oid="rc9pjcu">
              {autoTradingEnabled
                ? 'Ready to receive and execute TradingView alerts'
                : 'Enable auto-trading to start receiving alerts'}
            </Text>
            {autoTradingEnabled && (
              <View style={styles.warningContainer} data-oid="rcd2:22">
                <AlertTriangle size={16} color="#F59E0B" data-oid="t_tc1f-" />
                <Text style={styles.warningText} data-oid="77uv4pr">
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
