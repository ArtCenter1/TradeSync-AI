import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  ExternalLink,
  Copy,
  CircleCheck as CheckCircle,
} from 'lucide-react-native';

interface TradingViewInstructionsProps {
  webhookUrl: string;
  onClose: () => void;
}

export default function TradingViewInstructions({
  webhookUrl,
  onClose,
}: TradingViewInstructionsProps) {
  return (
    <View style={styles.container} data-oid="y-j08q7">
      <View style={styles.header} data-oid="169zb3y">
        <Text style={styles.title} data-oid="crbvt5t">
          TradingView Setup Instructions
        </Text>
        <TouchableOpacity
          onPress={onClose}
          style={styles.closeButton}
          data-oid="hez53c0"
        >
          <Text style={styles.closeText} data-oid="cd:efie">
            Close
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        data-oid="xp7h3oz"
      >
        <View style={styles.section} data-oid="0:ae6z2">
          <Text style={styles.sectionTitle} data-oid="5wzjtp1">
            Step 1: Create Your Trading Strategy
          </Text>
          <Text style={styles.description} data-oid="simqlst">
            First, create or open your trading strategy/indicator in TradingView
            Pine Script editor.
          </Text>
        </View>

        <View style={styles.section} data-oid="vemq4og">
          <Text style={styles.sectionTitle} data-oid="mjeh7s6">
            Step 2: Add Alert Conditions
          </Text>
          <Text style={styles.description} data-oid=":djdhwg">
            In your Pine Script, add alert conditions using the
            `alertcondition()` function:
          </Text>
          <View style={styles.codeBlock} data-oid="t4:h4he">
            <Text style={styles.code} data-oid="yzntvnu">
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

        <View style={styles.section} data-oid="l2x3:es">
          <Text style={styles.sectionTitle} data-oid="7h5xsyq">
            Step 3: Create Alert
          </Text>
          <View style={styles.stepList} data-oid="zhyck.r">
            <View style={styles.step} data-oid="d8shus3">
              <View style={styles.stepNumber} data-oid="u-49lh3">
                <Text style={styles.stepNumberText} data-oid="ykpc-ic">
                  1
                </Text>
              </View>
              <Text style={styles.stepText} data-oid="s:svawv">
                Right-click on your chart and select "Add Alert"
              </Text>
            </View>
            <View style={styles.step} data-oid="vnlmh4d">
              <View style={styles.stepNumber} data-oid="8jcm--j">
                <Text style={styles.stepNumberText} data-oid="j:8k0p6">
                  2
                </Text>
              </View>
              <Text style={styles.stepText} data-oid="r76ln.l">
                Choose your indicator/strategy from the dropdown
              </Text>
            </View>
            <View style={styles.step} data-oid="hzr69v_">
              <View style={styles.stepNumber} data-oid="a5hvvqw">
                <Text style={styles.stepNumberText} data-oid="xgqyp28">
                  3
                </Text>
              </View>
              <Text style={styles.stepText} data-oid="abqvm8w">
                Select the alert condition (Buy Signal, Sell Signal, etc.)
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section} data-oid=".tv0tfm">
          <Text style={styles.sectionTitle} data-oid="hag9c4e">
            Step 4: Configure Webhook
          </Text>
          <View style={styles.webhookSection} data-oid="3r2szv2">
            <Text style={styles.description} data-oid="xmpnuse">
              In the "Notifications" tab of the alert dialog:
            </Text>
            <View style={styles.webhookConfig} data-oid="t3k3.nz">
              <Text style={styles.configLabel} data-oid="du:4_ni">
                Webhook URL:
              </Text>
              <View style={styles.urlContainer} data-oid="yc2q8ap">
                <Text style={styles.webhookUrl} data-oid="91n25-3">
                  {webhookUrl}
                </Text>
                <TouchableOpacity style={styles.copyButton} data-oid="6g7bt85">
                  <Copy size={16} color="#10B981" data-oid="_295n.x" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section} data-oid="9csb0mj">
          <Text style={styles.sectionTitle} data-oid="g:hamu2">
            Step 5: Alert Message Format
          </Text>
          <Text style={styles.description} data-oid="u0y:jwe">
            Use one of these message formats in the alert message field:
          </Text>

          <View style={styles.formatSection} data-oid="oe7anjf">
            <Text style={styles.formatTitle} data-oid="5r8jh92">
              Simple Format (Recommended)
            </Text>
            <View style={styles.codeBlock} data-oid=".hoqw0y">
              <Text style={styles.code} data-oid="8ppwdlg">
                {'{{strategy.order.action}} {{ticker}}'}
              </Text>
            </View>
            <Text style={styles.formatDescription} data-oid="mwpjxs3">
              This will send "BUY BTCUSDT" or "SELL BTCUSDT" based on your
              signal.
            </Text>
          </View>

          <View style={styles.formatSection} data-oid="3qkg9-t">
            <Text style={styles.formatTitle} data-oid="db5jxrs">
              JSON Format (Advanced)
            </Text>
            <View style={styles.codeBlock} data-oid="4i-kogc">
              <Text style={styles.code} data-oid="k::b9ju">
                {`{
  "action": "{{strategy.order.action}}",
  "symbol": "{{ticker}}",
  "price": {{close}},
  "signal": "RSI_SIGNAL"
}`}
              </Text>
            </View>
            <Text style={styles.formatDescription} data-oid="69gsuv1">
              Provides more detailed information including current price and
              signal type.
            </Text>
          </View>
        </View>

        <View style={styles.section} data-oid="6az41ft">
          <Text style={styles.sectionTitle} data-oid="b5ompzk">
            Step 6: Test Your Setup
          </Text>
          <View style={styles.testSection} data-oid="6.pbddw">
            <View style={styles.testStep} data-oid="yh.83.9">
              <CheckCircle size={16} color="#10B981" data-oid="00chaz_" />
              <Text style={styles.testText} data-oid="ajkr548">
                Create a test alert with a simple condition
              </Text>
            </View>
            <View style={styles.testStep} data-oid="mx6oh1y">
              <CheckCircle size={16} color="#10B981" data-oid="7_7-:5f" />
              <Text style={styles.testText} data-oid="vr78_xe">
                Trigger the alert manually to test webhook delivery
              </Text>
            </View>
            <View style={styles.testStep} data-oid=":-fd:t2">
              <CheckCircle size={16} color="#10B981" data-oid="gu_gtbm" />
              <Text style={styles.testText} data-oid="0y.q7x1">
                Check the Auto-Trade Monitor for received signals
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.warningSection} data-oid="bsxb2vy">
          <Text style={styles.warningTitle} data-oid="cxaqmn8">
            ⚠️ Important Notes
          </Text>
          <Text style={styles.warningText} data-oid="kjv0cz7">
            • Always test with small amounts first{'\n'}• Monitor your trades
            regularly{'\n'}• Set appropriate stop-loss and take-profit levels
            {'\n'}• TradingView alerts require a Pro subscription for webhooks
            {'\n'}• Never share your webhook URL publicly
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
