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
    <View style={styles.container} data-oid="1b2i:i6">
      <View style={styles.header} data-oid="tc8eww9">
        <Text style={styles.title} data-oid="5q05qim">
          Settings
        </Text>
        <Text style={styles.subtitle} data-oid="-6ak9q.">
          Configure auto-trading and alerts
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        data-oid="l6gbufq"
      >
        {/* TradingView Integration */}
        <View style={styles.section} data-oid="qtbxs6b">
          <View style={styles.sectionHeader} data-oid=".e64m9k">
            <TrendingUp size={20} color="#10B981" data-oid="844wp4h" />
            <Text style={styles.sectionTitle} data-oid="qsoxr86">
              TradingView Integration
            </Text>
          </View>

          <View style={styles.card} data-oid="kso1m_7">
            <View style={styles.cardHeader} data-oid="vvxc:24">
              <Text style={styles.cardTitle} data-oid="zsdn9gu">
                Auto-Trading
              </Text>
              <Switch
                value={autoTradingEnabled}
                onValueChange={setAutoTradingEnabled}
                trackColor={{ false: '#374151', true: '#10B981' }}
                thumbColor="#FFFFFF"
                data-oid="a_1rxjt"
              />
            </View>
            <Text style={styles.cardDescription} data-oid="9l4yilf">
              Automatically execute trades based on TradingView alerts
            </Text>
          </View>

          <View style={styles.card} data-oid="k.bar87">
            <View style={styles.cardHeader} data-oid="z5cw_o.">
              <Webhook size={18} color="#3B82F6" data-oid="k_zc1i4" />
              <Text style={styles.cardTitle} data-oid="4dvvs7n">
                Webhook URL
              </Text>
              <TouchableOpacity
                onPress={copyWebhookUrl}
                style={styles.copyButton}
                data-oid="p66eahb"
              >
                <Copy size={16} color="#9CA3AF" data-oid="3b4me_q" />
              </TouchableOpacity>
            </View>
            <Text style={styles.webhookUrl} data-oid="0z:ob44">
              {webhookUrl}
            </Text>
            <Text style={styles.cardDescription} data-oid="0cv2utx">
              Use this URL in your TradingView alert webhook settings
            </Text>
            <TouchableOpacity
              style={styles.instructionsButton}
              data-oid="bjzzoq9"
            >
              <ExternalLink size={16} color="#10B981" data-oid="yoptvsp" />
              <Text style={styles.instructionsText} data-oid="r:9rizx">
                Setup Instructions
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card} data-oid="w-76fhw">
            <View style={styles.cardHeader} data-oid="ol5tjq7">
              <Key size={18} color="#F59E0B" data-oid="o9ylgx_" />
              <Text style={styles.cardTitle} data-oid="0rl.sus">
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
              data-oid="2.xjx2a"
            />

            <Text style={styles.cardDescription} data-oid="_b5s4dt">
              Your secure API key for trade execution
            </Text>
          </View>
        </View>

        {/* Risk Management */}
        <View style={styles.section} data-oid="lf.9gkj">
          <View style={styles.sectionHeader} data-oid="f0kdagy">
            <Shield size={20} color="#EF4444" data-oid=":-:ro0t" />
            <Text style={styles.sectionTitle} data-oid="s1ofkqv">
              Risk Management
            </Text>
          </View>

          <View style={styles.card} data-oid="9.itbpt">
            <Text style={styles.cardTitle} data-oid="phnbe16">
              Trade Limits
            </Text>
            <View style={styles.inputGroup} data-oid="wp53o98">
              <Text style={styles.inputLabel} data-oid="j-1ja9_">
                Max Trade Amount ($)
              </Text>
              <TextInput
                style={styles.input}
                value={maxTradeAmount}
                onChangeText={setMaxTradeAmount}
                placeholder="1000"
                placeholderTextColor="#6B7280"
                keyboardType="numeric"
                data-oid="gu0gmxn"
              />
            </View>
            <View style={styles.inputGroup} data-oid="vvzhax3">
              <Text style={styles.inputLabel} data-oid="hrl7nyd">
                Max Daily Trades
              </Text>
              <TextInput
                style={styles.input}
                value={maxDailyTrades}
                onChangeText={setMaxDailyTrades}
                placeholder="10"
                placeholderTextColor="#6B7280"
                keyboardType="numeric"
                data-oid="-j:y69t"
              />
            </View>
          </View>

          <View style={styles.card} data-oid="ydkd_:o">
            <View style={styles.switchRow} data-oid="s-5etmg">
              <View style={styles.switchInfo} data-oid="00bbgvy">
                <Text style={styles.cardTitle} data-oid="hh.brh3">
                  Stop Loss
                </Text>
                <Text style={styles.cardDescription} data-oid="c99_8q2">
                  Automatically close losing positions
                </Text>
              </View>
              <Switch
                value={enableStopLoss}
                onValueChange={setEnableStopLoss}
                trackColor={{ false: '#374151', true: '#10B981' }}
                thumbColor="#FFFFFF"
                data-oid="0.7oq5r"
              />
            </View>
            {enableStopLoss && (
              <View style={styles.inputGroup} data-oid="d-3qgx3">
                <Text style={styles.inputLabel} data-oid="k21jnjv">
                  Stop Loss Percentage (%)
                </Text>
                <TextInput
                  style={styles.input}
                  value={stopLossPercentage}
                  onChangeText={setStopLossPercentage}
                  placeholder="5"
                  placeholderTextColor="#6B7280"
                  keyboardType="numeric"
                  data-oid="r-g6sqs"
                />
              </View>
            )}
          </View>

          <View style={styles.card} data-oid="w.0l:13">
            <View style={styles.switchRow} data-oid="4.uiru4">
              <View style={styles.switchInfo} data-oid="-_a4f_g">
                <Text style={styles.cardTitle} data-oid="7i7pif6">
                  Take Profit
                </Text>
                <Text style={styles.cardDescription} data-oid="l3bip5u">
                  Automatically close winning positions
                </Text>
              </View>
              <Switch
                value={enableTakeProfit}
                onValueChange={setEnableTakeProfit}
                trackColor={{ false: '#374151', true: '#10B981' }}
                thumbColor="#FFFFFF"
                data-oid=":_pjl9i"
              />
            </View>
            {enableTakeProfit && (
              <View style={styles.inputGroup} data-oid="fiaj.vf">
                <Text style={styles.inputLabel} data-oid="-e1x:aw">
                  Take Profit Percentage (%)
                </Text>
                <TextInput
                  style={styles.input}
                  value={takeProfitPercentage}
                  onChangeText={setTakeProfitPercentage}
                  placeholder="10"
                  placeholderTextColor="#6B7280"
                  keyboardType="numeric"
                  data-oid="awj-6sn"
                />
              </View>
            )}
          </View>
        </View>

        {/* Enabled Symbols */}
        <View style={styles.section} data-oid="coab0dh">
          <View style={styles.sectionHeader} data-oid="gg15_y1">
            <Zap size={20} color="#3B82F6" data-oid="pck4b:f" />
            <Text style={styles.sectionTitle} data-oid="cnbrz01">
              Enabled Symbols
            </Text>
          </View>

          <View style={styles.card} data-oid="4gkxf9f">
            <Text style={styles.cardTitle} data-oid="hhwaa96">
              Trading Pairs
            </Text>
            <Text style={styles.cardDescription} data-oid="s_--eu3">
              Select which cryptocurrencies to auto-trade
            </Text>
            <View style={styles.symbolGrid} data-oid="tn2bob4">
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
                    data-oid="s:t2l-o"
                  >
                    <Text
                      style={[
                        styles.symbolChipText,
                        enabledSymbols.includes(symbol) &&
                          styles.symbolChipTextActive,
                      ]}
                      data-oid="chn03ma"
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
        <View style={styles.section} data-oid="rho2r3y">
          <View style={styles.sectionHeader} data-oid="4bul3kz">
            <Bell size={20} color="#F59E0B" data-oid="-qgpz-n" />
            <Text style={styles.sectionTitle} data-oid="ilxkog_">
              Alert Configuration
            </Text>
          </View>

          <View style={styles.card} data-oid="hvclarb">
            <Text style={styles.cardTitle} data-oid="e_tjuxe">
              Supported Alert Formats
            </Text>
            <View style={styles.formatList} data-oid="xk1:i04">
              <View style={styles.formatItem} data-oid="z90rtcd">
                <Text style={styles.formatTitle} data-oid="rdxx0ka">
                  Simple Format
                </Text>
                <Text style={styles.formatExample} data-oid="wfoljjf">
                  BUY BTCUSDT
                </Text>
              </View>
              <View style={styles.formatItem} data-oid="-t4ai96">
                <Text style={styles.formatTitle} data-oid="scpza:x">
                  Detailed Format
                </Text>
                <Text style={styles.formatExample} data-oid="hlqcctv">
                  {
                    '{{strategy.order.action}} {{ticker}} price={{close}} sl={{strategy.position_avg_price*0.95}}'
                  }
                </Text>
              </View>
              <View style={styles.formatItem} data-oid="nr3y1av">
                <Text style={styles.formatTitle} data-oid="8gh_7fl">
                  JSON Format
                </Text>
                <Text style={styles.formatExample} data-oid="jdsa.kn">
                  {'{"action":"BUY","symbol":"BTCUSDT","price":71200}'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Status */}
        <View style={styles.section} data-oid="k4te65:">
          <View style={styles.statusCard} data-oid="e-k1vf:">
            <View style={styles.statusHeader} data-oid="-tezbm:">
              <View
                style={[
                  styles.statusIndicator,
                  {
                    backgroundColor: autoTradingEnabled ? '#10B981' : '#6B7280',
                  },
                ]}
                data-oid="pukj79."
              />

              <Text style={styles.statusTitle} data-oid="3ssb71_">
                Auto-Trading {autoTradingEnabled ? 'Active' : 'Inactive'}
              </Text>
            </View>
            <Text style={styles.statusDescription} data-oid="waa.eq0">
              {autoTradingEnabled
                ? 'Ready to receive and execute TradingView alerts'
                : 'Enable auto-trading to start receiving alerts'}
            </Text>
            {autoTradingEnabled && (
              <View style={styles.warningContainer} data-oid="31myq1o">
                <AlertTriangle size={16} color="#F59E0B" data-oid="pr5tb2_" />
                <Text style={styles.warningText} data-oid=":9zs4.7">
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
