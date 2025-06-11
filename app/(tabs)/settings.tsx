import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Switch,
  Alert
} from 'react-native';
import { Settings, Webhook, Zap, Shield, TrendingUp, Bell, Key, Copy, ExternalLink, TriangleAlert as AlertTriangle } from 'lucide-react-native';

export default function SettingsScreen() {
  const [autoTradingEnabled, setAutoTradingEnabled] = useState(false);
  const [webhookUrl] = useState('https://api.cryptotrader.pro/webhook/tradingview');
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
    setEnabledSymbols(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Configure auto-trading and alerts</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* TradingView Integration */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color="#10B981" />
            <Text style={styles.sectionTitle}>TradingView Integration</Text>
          </View>
          
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Auto-Trading</Text>
              <Switch
                value={autoTradingEnabled}
                onValueChange={setAutoTradingEnabled}
                trackColor={{ false: '#374151', true: '#10B981' }}
                thumbColor="#FFFFFF"
              />
            </View>
            <Text style={styles.cardDescription}>
              Automatically execute trades based on TradingView alerts
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Webhook size={18} color="#3B82F6" />
              <Text style={styles.cardTitle}>Webhook URL</Text>
              <TouchableOpacity onPress={copyWebhookUrl} style={styles.copyButton}>
                <Copy size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            <Text style={styles.webhookUrl}>{webhookUrl}</Text>
            <Text style={styles.cardDescription}>
              Use this URL in your TradingView alert webhook settings
            </Text>
            <TouchableOpacity style={styles.instructionsButton}>
              <ExternalLink size={16} color="#10B981" />
              <Text style={styles.instructionsText}>Setup Instructions</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Key size={18} color="#F59E0B" />
              <Text style={styles.cardTitle}>API Key</Text>
            </View>
            <TextInput
              style={styles.input}
              value={apiKey}
              onChangeText={setApiKey}
              placeholder="Enter your API key"
              placeholderTextColor="#6B7280"
              secureTextEntry
            />
            <Text style={styles.cardDescription}>
              Your secure API key for trade execution
            </Text>
          </View>
        </View>

        {/* Risk Management */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Shield size={20} color="#EF4444" />
            <Text style={styles.sectionTitle}>Risk Management</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Trade Limits</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Max Trade Amount ($)</Text>
              <TextInput
                style={styles.input}
                value={maxTradeAmount}
                onChangeText={setMaxTradeAmount}
                placeholder="1000"
                placeholderTextColor="#6B7280"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Max Daily Trades</Text>
              <TextInput
                style={styles.input}
                value={maxDailyTrades}
                onChangeText={setMaxDailyTrades}
                placeholder="10"
                placeholderTextColor="#6B7280"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.switchRow}>
              <View style={styles.switchInfo}>
                <Text style={styles.cardTitle}>Stop Loss</Text>
                <Text style={styles.cardDescription}>
                  Automatically close losing positions
                </Text>
              </View>
              <Switch
                value={enableStopLoss}
                onValueChange={setEnableStopLoss}
                trackColor={{ false: '#374151', true: '#10B981' }}
                thumbColor="#FFFFFF"
              />
            </View>
            {enableStopLoss && (
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Stop Loss Percentage (%)</Text>
                <TextInput
                  style={styles.input}
                  value={stopLossPercentage}
                  onChangeText={setStopLossPercentage}
                  placeholder="5"
                  placeholderTextColor="#6B7280"
                  keyboardType="numeric"
                />
              </View>
            )}
          </View>

          <View style={styles.card}>
            <View style={styles.switchRow}>
              <View style={styles.switchInfo}>
                <Text style={styles.cardTitle}>Take Profit</Text>
                <Text style={styles.cardDescription}>
                  Automatically close winning positions
                </Text>
              </View>
              <Switch
                value={enableTakeProfit}
                onValueChange={setEnableTakeProfit}
                trackColor={{ false: '#374151', true: '#10B981' }}
                thumbColor="#FFFFFF"
              />
            </View>
            {enableTakeProfit && (
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Take Profit Percentage (%)</Text>
                <TextInput
                  style={styles.input}
                  value={takeProfitPercentage}
                  onChangeText={setTakeProfitPercentage}
                  placeholder="10"
                  placeholderTextColor="#6B7280"
                  keyboardType="numeric"
                />
              </View>
            )}
          </View>
        </View>

        {/* Enabled Symbols */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Zap size={20} color="#3B82F6" />
            <Text style={styles.sectionTitle}>Enabled Symbols</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Trading Pairs</Text>
            <Text style={styles.cardDescription}>
              Select which cryptocurrencies to auto-trade
            </Text>
            <View style={styles.symbolGrid}>
              {['BTC', 'ETH', 'SOL', 'ADA', 'DOT', 'AVAX', 'MATIC', 'LINK'].map((symbol) => (
                <TouchableOpacity
                  key={symbol}
                  style={[
                    styles.symbolChip,
                    enabledSymbols.includes(symbol) && styles.symbolChipActive
                  ]}
                  onPress={() => toggleSymbol(symbol)}
                >
                  <Text style={[
                    styles.symbolChipText,
                    enabledSymbols.includes(symbol) && styles.symbolChipTextActive
                  ]}>
                    {symbol}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Alert Configuration */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Bell size={20} color="#F59E0B" />
            <Text style={styles.sectionTitle}>Alert Configuration</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Supported Alert Formats</Text>
            <View style={styles.formatList}>
              <View style={styles.formatItem}>
                <Text style={styles.formatTitle}>Simple Format</Text>
                <Text style={styles.formatExample}>BUY BTCUSDT</Text>
              </View>
              <View style={styles.formatItem}>
                <Text style={styles.formatTitle}>Detailed Format</Text>
                <Text style={styles.formatExample}>
                  {"{{strategy.order.action}} {{ticker}} price={{close}} sl={{strategy.position_avg_price*0.95}}"}
                </Text>
              </View>
              <View style={styles.formatItem}>
                <Text style={styles.formatTitle}>JSON Format</Text>
                <Text style={styles.formatExample}>
                  {'{"action":"BUY","symbol":"BTCUSDT","price":71200}'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Status */}
        <View style={styles.section}>
          <View style={styles.statusCard}>
            <View style={styles.statusHeader}>
              <View style={[
                styles.statusIndicator,
                { backgroundColor: autoTradingEnabled ? '#10B981' : '#6B7280' }
              ]} />
              <Text style={styles.statusTitle}>
                Auto-Trading {autoTradingEnabled ? 'Active' : 'Inactive'}
              </Text>
            </View>
            <Text style={styles.statusDescription}>
              {autoTradingEnabled 
                ? 'Ready to receive and execute TradingView alerts'
                : 'Enable auto-trading to start receiving alerts'
              }
            </Text>
            {autoTradingEnabled && (
              <View style={styles.warningContainer}>
                <AlertTriangle size={16} color="#F59E0B" />
                <Text style={styles.warningText}>
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