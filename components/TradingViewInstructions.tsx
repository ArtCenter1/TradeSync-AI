import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ExternalLink, Copy, CircleCheck as CheckCircle } from 'lucide-react-native';

interface TradingViewInstructionsProps {
  webhookUrl: string;
  onClose: () => void;
}

export default function TradingViewInstructions({ webhookUrl, onClose }: TradingViewInstructionsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TradingView Setup Instructions</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Step 1: Create Your Trading Strategy</Text>
          <Text style={styles.description}>
            First, create or open your trading strategy/indicator in TradingView Pine Script editor.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Step 2: Add Alert Conditions</Text>
          <Text style={styles.description}>
            In your Pine Script, add alert conditions using the `alertcondition()` function:
          </Text>
          <View style={styles.codeBlock}>
            <Text style={styles.code}>
{`// Example: RSI Buy Signal
rsi = ta.rsi(close, 14)
buy_signal = ta.crossover(rsi, 30)
alertcondition(buy_signal, "Buy Signal", "BUY {{ticker}}")

// Example: RSI Sell Signal  
sell_signal = ta.crossunder(rsi, 70)
alertcondition(sell_signal, "Sell Signal", "SELL {{ticker}}")`}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Step 3: Create Alert</Text>
          <View style={styles.stepList}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>Right-click on your chart and select "Add Alert"</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>Choose your indicator/strategy from the dropdown</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>Select the alert condition (Buy Signal, Sell Signal, etc.)</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Step 4: Configure Webhook</Text>
          <View style={styles.webhookSection}>
            <Text style={styles.description}>
              In the "Notifications" tab of the alert dialog:
            </Text>
            <View style={styles.webhookConfig}>
              <Text style={styles.configLabel}>Webhook URL:</Text>
              <View style={styles.urlContainer}>
                <Text style={styles.webhookUrl}>{webhookUrl}</Text>
                <TouchableOpacity style={styles.copyButton}>
                  <Copy size={16} color="#10B981" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Step 5: Alert Message Format</Text>
          <Text style={styles.description}>
            Use one of these message formats in the alert message field:
          </Text>
          
          <View style={styles.formatSection}>
            <Text style={styles.formatTitle}>Simple Format (Recommended)</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.code}>{"{{strategy.order.action}} {{ticker}}"}</Text>
            </View>
            <Text style={styles.formatDescription}>
              This will send "BUY BTCUSDT" or "SELL BTCUSDT" based on your signal.
            </Text>
          </View>

          <View style={styles.formatSection}>
            <Text style={styles.formatTitle}>JSON Format (Advanced)</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.code}>
{`{
  "action": "{{strategy.order.action}}",
  "symbol": "{{ticker}}",
  "price": {{close}},
  "signal": "RSI_SIGNAL"
}`}
              </Text>
            </View>
            <Text style={styles.formatDescription}>
              Provides more detailed information including current price and signal type.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Step 6: Test Your Setup</Text>
          <View style={styles.testSection}>
            <View style={styles.testStep}>
              <CheckCircle size={16} color="#10B981" />
              <Text style={styles.testText}>Create a test alert with a simple condition</Text>
            </View>
            <View style={styles.testStep}>
              <CheckCircle size={16} color="#10B981" />
              <Text style={styles.testText}>Trigger the alert manually to test webhook delivery</Text>
            </View>
            <View style={styles.testStep}>
              <CheckCircle size={16} color="#10B981" />
              <Text style={styles.testText}>Check the Auto-Trade Monitor for received signals</Text>
            </View>
          </View>
        </View>

        <View style={styles.warningSection}>
          <Text style={styles.warningTitle}>⚠️ Important Notes</Text>
          <Text style={styles.warningText}>
            • Always test with small amounts first{'\n'}
            • Monitor your trades regularly{'\n'}
            • Set appropriate stop-loss and take-profit levels{'\n'}
            • TradingView alerts require a Pro subscription for webhooks{'\n'}
            • Never share your webhook URL publicly
          </Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  closeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  closeText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#D1D5DB',
    lineHeight: 20,
  },
  codeBlock: {
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  code: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#10B981',
    lineHeight: 16,
  },
  stepList: {
    marginTop: 12,
    gap: 12,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#D1D5DB',
  },
  webhookSection: {
    marginTop: 12,
  },
  webhookConfig: {
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  configLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginBottom: 6,
  },
  urlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  webhookUrl: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#10B981',
  },
  copyButton: {
    padding: 4,
  },
  formatSection: {
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  formatTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  formatDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginTop: 8,
  },
  testSection: {
    marginTop: 12,
    gap: 8,
  },
  testStep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  testText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#D1D5DB',
  },
  warningSection: {
    backgroundColor: '#F59E0B' + '20',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#F59E0B' + '40',
  },
  warningTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#F59E0B',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#F59E0B',
    lineHeight: 18,
  },
});