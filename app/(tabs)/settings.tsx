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
    <View style={styles.container} data-oid="jy6l7is">
      <View style={styles.header} data-oid="okvgjw4">
        <Text style={styles.title} data-oid="gwdh7.r">
          Settings
        </Text>
        <Text style={styles.subtitle} data-oid="yi35rh2">
          Configure auto-trading and alerts
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        data-oid="y94ej7v"
      >
        {/* TradingView Integration */}
        <View style={styles.section} data-oid="4z_.9l.">
          <View style={styles.sectionHeader} data-oid="xc:pfz1">
            <TrendingUp size={20} color="#10B981" data-oid="ukk1d-l" />
            <Text style={styles.sectionTitle} data-oid="iogtz.k">
              TradingView Integration
            </Text>
          </View>

          <View style={styles.card} data-oid="81hqqw7">
            <View style={styles.cardHeader} data-oid="nitsr:1">
              <Text style={styles.cardTitle} data-oid="pootftf">
                Auto-Trading
              </Text>
              <Switch
                value={autoTradingEnabled}
                onValueChange={setAutoTradingEnabled}
                trackColor={{ false: '#374151', true: '#10B981' }}
                thumbColor="#FFFFFF"
                data-oid="2_-2eyh"
              />
            </View>
            <Text style={styles.cardDescription} data-oid="r1jen1o">
              Automatically execute trades based on TradingView alerts
            </Text>
          </View>

          <View style={styles.card} data-oid="a3-z-:p">
            <View style={styles.cardHeader} data-oid="9k0uns:">
              <Webhook size={18} color="#3B82F6" data-oid="i9vupz4" />
              <Text style={styles.cardTitle} data-oid="9z2emp:">
                Webhook URL
              </Text>
              <TouchableOpacity
                onPress={copyWebhookUrl}
                style={styles.copyButton}
                data-oid="tw72wbz"
              >
                <Copy size={16} color="#9CA3AF" data-oid="65kykf8" />
              </TouchableOpacity>
            </View>
            <Text style={styles.webhookUrl} data-oid="pvngjg6">
              {webhookUrl}
            </Text>
            <Text style={styles.cardDescription} data-oid="q.lylya">
              Use this URL in your TradingView alert webhook settings
            </Text>
            <TouchableOpacity
              style={styles.instructionsButton}
              data-oid="dn1uwtx"
            >
              <ExternalLink size={16} color="#10B981" data-oid="hx1v.._" />
              <Text style={styles.instructionsText} data-oid="fiq8y5g">
                Setup Instructions
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card} data-oid="2j01jq_">
            <View style={styles.cardHeader} data-oid="71_jrkk">
              <Key size={18} color="#F59E0B" data-oid="gm7pm16" />
              <Text style={styles.cardTitle} data-oid="2pz.mqs">
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
              data-oid="tukqkyt"
            />

            <Text style={styles.cardDescription} data-oid="u4i32un">
              Your secure API key for trade execution
            </Text>
          </View>
        </View>

        {/* Risk Management */}
        <View style={styles.section} data-oid="8c1k.lg">
          <View style={styles.sectionHeader} data-oid="vdupygt">
            <Shield size={20} color="#EF4444" data-oid="yaf:2vs" />
            <Text style={styles.sectionTitle} data-oid="xz8c3rm">
              Risk Management
            </Text>
          </View>

          <View style={styles.card} data-oid="3aqzt2x">
            <Text style={styles.cardTitle} data-oid="7-87smg">
              Trade Limits
            </Text>
            <View style={styles.inputGroup} data-oid=".xx4:xh">
              <Text style={styles.inputLabel} data-oid="-g:qery">
                Max Trade Amount ($)
              </Text>
              <TextInput
                style={styles.input}
                value={maxTradeAmount}
                onChangeText={setMaxTradeAmount}
                placeholder="1000"
                placeholderTextColor="#6B7280"
                keyboardType="numeric"
                data-oid="3m7zggt"
              />
            </View>
            <View style={styles.inputGroup} data-oid="kvthsjh">
              <Text style={styles.inputLabel} data-oid=":.jb_3l">
                Max Daily Trades
              </Text>
              <TextInput
                style={styles.input}
                value={maxDailyTrades}
                onChangeText={setMaxDailyTrades}
                placeholder="10"
                placeholderTextColor="#6B7280"
                keyboardType="numeric"
                data-oid="sjxxj_y"
              />
            </View>
          </View>

          <View style={styles.card} data-oid="_bdu6w7">
            <View style={styles.switchRow} data-oid="lv7hil_">
              <View style={styles.switchInfo} data-oid="s9zmm1-">
                <Text style={styles.cardTitle} data-oid="i0nnlww">
                  Stop Loss
                </Text>
                <Text style={styles.cardDescription} data-oid="s_srjj6">
                  Automatically close losing positions
                </Text>
              </View>
              <Switch
                value={enableStopLoss}
                onValueChange={setEnableStopLoss}
                trackColor={{ false: '#374151', true: '#10B981' }}
                thumbColor="#FFFFFF"
                data-oid="ldiy.e6"
              />
            </View>
            {enableStopLoss && (
              <View style={styles.inputGroup} data-oid="c4lzeep">
                <Text style={styles.inputLabel} data-oid="vz_0jfw">
                  Stop Loss Percentage (%)
                </Text>
                <TextInput
                  style={styles.input}
                  value={stopLossPercentage}
                  onChangeText={setStopLossPercentage}
                  placeholder="5"
                  placeholderTextColor="#6B7280"
                  keyboardType="numeric"
                  data-oid="3lq5ok1"
                />
              </View>
            )}
          </View>

          <View style={styles.card} data-oid="9gblmh7">
            <View style={styles.switchRow} data-oid="rh_mfdq">
              <View style={styles.switchInfo} data-oid="vtzwrho">
                <Text style={styles.cardTitle} data-oid="flyja4p">
                  Take Profit
                </Text>
                <Text style={styles.cardDescription} data-oid="n20_4h.">
                  Automatically close winning positions
                </Text>
              </View>
              <Switch
                value={enableTakeProfit}
                onValueChange={setEnableTakeProfit}
                trackColor={{ false: '#374151', true: '#10B981' }}
                thumbColor="#FFFFFF"
                data-oid="_g3zmuk"
              />
            </View>
            {enableTakeProfit && (
              <View style={styles.inputGroup} data-oid="o:qopsf">
                <Text style={styles.inputLabel} data-oid="bkpk.p9">
                  Take Profit Percentage (%)
                </Text>
                <TextInput
                  style={styles.input}
                  value={takeProfitPercentage}
                  onChangeText={setTakeProfitPercentage}
                  placeholder="10"
                  placeholderTextColor="#6B7280"
                  keyboardType="numeric"
                  data-oid="h.q1xvi"
                />
              </View>
            )}
          </View>
        </View>

        {/* Enabled Symbols */}
        <View style={styles.section} data-oid="obmatea">
          <View style={styles.sectionHeader} data-oid="4l6sszu">
            <Zap size={20} color="#3B82F6" data-oid="7k-k0t9" />
            <Text style={styles.sectionTitle} data-oid="3rfdel0">
              Enabled Symbols
            </Text>
          </View>

          <View style={styles.card} data-oid="u814bk.">
            <Text style={styles.cardTitle} data-oid="obd:dhv">
              Trading Pairs
            </Text>
            <Text style={styles.cardDescription} data-oid="9mquxst">
              Select which cryptocurrencies to auto-trade
            </Text>
            <View style={styles.symbolGrid} data-oid="phyjwv3">
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
                    data-oid="v.9d8th"
                  >
                    <Text
                      style={[
                        styles.symbolChipText,
                        enabledSymbols.includes(symbol) &&
                          styles.symbolChipTextActive,
                      ]}
                      data-oid="m7ebllj"
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
        <View style={styles.section} data-oid="x_yh5xr">
          <View style={styles.sectionHeader} data-oid=":a:b_ef">
            <Bell size={20} color="#F59E0B" data-oid="azjx-uk" />
            <Text style={styles.sectionTitle} data-oid="ofog2xw">
              Alert Configuration
            </Text>
          </View>

          <View style={styles.card} data-oid="xcuyqng">
            <Text style={styles.cardTitle} data-oid=".l0yue0">
              Supported Alert Formats
            </Text>
            <View style={styles.formatList} data-oid="q3:008d">
              <View style={styles.formatItem} data-oid="oo59k2h">
                <Text style={styles.formatTitle} data-oid="5jggubr">
                  Simple Format
                </Text>
                <Text style={styles.formatExample} data-oid="h:9d0s8">
                  BUY BTCUSDT
                </Text>
              </View>
              <View style={styles.formatItem} data-oid="lluezxp">
                <Text style={styles.formatTitle} data-oid="sr:y7bu">
                  Detailed Format
                </Text>
                <Text style={styles.formatExample} data-oid="c7k1b0.">
                  {
                    '{{strategy.order.action}} {{ticker}} price={{close}} sl={{strategy.position_avg_price*0.95}}'
                  }
                </Text>
              </View>
              <View style={styles.formatItem} data-oid="1l.5-fy">
                <Text style={styles.formatTitle} data-oid="wniym1i">
                  JSON Format
                </Text>
                <Text style={styles.formatExample} data-oid=":9ydhd5">
                  {'{"action":"BUY","symbol":"BTCUSDT","price":71200}'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Status */}
        <View style={styles.section} data-oid="xgjmzg2">
          <View style={styles.statusCard} data-oid="lwdk89j">
            <View style={styles.statusHeader} data-oid="cy0uq96">
              <View
                style={[
                  styles.statusIndicator,
                  {
                    backgroundColor: autoTradingEnabled ? '#10B981' : '#6B7280',
                  },
                ]}
                data-oid="5dec-0v"
              />

              <Text style={styles.statusTitle} data-oid="58sh.-_">
                Auto-Trading {autoTradingEnabled ? 'Active' : 'Inactive'}
              </Text>
            </View>
            <Text style={styles.statusDescription} data-oid="aehcnr.">
              {autoTradingEnabled
                ? 'Ready to receive and execute TradingView alerts'
                : 'Enable auto-trading to start receiving alerts'}
            </Text>
            {autoTradingEnabled && (
              <View style={styles.warningContainer} data-oid="p9xsxs9">
                <AlertTriangle size={16} color="#F59E0B" data-oid="zln0mva" />
                <Text style={styles.warningText} data-oid="k62fd-r">
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
