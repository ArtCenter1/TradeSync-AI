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
    <View style={styles.container} data-oid="u-qw9k3">
      <View style={styles.header} data-oid="gkm3tia">
        <Text style={styles.title} data-oid="x9kj1a0">
          TradingView Setup Instructions
        </Text>
        <TouchableOpacity
          onPress={onClose}
          style={styles.closeButton}
          data-oid="pywi2dj"
        >
          <Text style={styles.closeText} data-oid="z9qxdpy">
            Close
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        data-oid="-fl_sbx"
      >
        <View style={styles.section} data-oid="tuhglne">
          <Text style={styles.sectionTitle} data-oid="hc:8yj3">
            Step 1: Create Your Trading Strategy
          </Text>
          <Text style={styles.description} data-oid=".1e6-0e">
            First, create or open your trading strategy/indicator in TradingView
            Pine Script editor.
          </Text>
        </View>

        <View style={styles.section} data-oid="g3z:-13">
          <Text style={styles.sectionTitle} data-oid="q:3bq.g">
            Step 2: Add Alert Conditions
          </Text>
          <Text style={styles.description} data-oid="k6kkqbc">
            In your Pine Script, add alert conditions using the
            `alertcondition()` function:
          </Text>
          <View style={styles.codeBlock} data-oid="kt5shft">
            <Text style={styles.code} data-oid="7f86pem">
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

        <View style={styles.section} data-oid="j5oel2u">
          <Text style={styles.sectionTitle} data-oid="ambx15s">
            Step 3: Create Alert
          </Text>
          <View style={styles.stepList} data-oid="bcalyf:">
            <View style={styles.step} data-oid="14evsn:">
              <View style={styles.stepNumber} data-oid="qw-ptnk">
                <Text style={styles.stepNumberText} data-oid="r8-nqlk">
                  1
                </Text>
              </View>
              <Text style={styles.stepText} data-oid="v:fsu4t">
                Right-click on your chart and select "Add Alert"
              </Text>
            </View>
            <View style={styles.step} data-oid="5ge2m93">
              <View style={styles.stepNumber} data-oid="63g681m">
                <Text style={styles.stepNumberText} data-oid="33zywc5">
                  2
                </Text>
              </View>
              <Text style={styles.stepText} data-oid="sgzrz15">
                Choose your indicator/strategy from the dropdown
              </Text>
            </View>
            <View style={styles.step} data-oid="5g.md:m">
              <View style={styles.stepNumber} data-oid="gdb0msy">
                <Text style={styles.stepNumberText} data-oid="_5_7axc">
                  3
                </Text>
              </View>
              <Text style={styles.stepText} data-oid="xiz-fjm">
                Select the alert condition (Buy Signal, Sell Signal, etc.)
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section} data-oid="unj_63g">
          <Text style={styles.sectionTitle} data-oid="bqv-gs4">
            Step 4: Configure Webhook
          </Text>
          <View style={styles.webhookSection} data-oid="44_x9wx">
            <Text style={styles.description} data-oid=".pkn_4g">
              In the "Notifications" tab of the alert dialog:
            </Text>
            <View style={styles.webhookConfig} data-oid="36cdjmv">
              <Text style={styles.configLabel} data-oid="jn8itja">
                Webhook URL:
              </Text>
              <View style={styles.urlContainer} data-oid="ibwdm:i">
                <Text style={styles.webhookUrl} data-oid="p94usdu">
                  {webhookUrl}
                </Text>
                <TouchableOpacity style={styles.copyButton} data-oid="q3zehbw">
                  <Copy size={16} color="#10B981" data-oid="lf.wd39" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section} data-oid="je:pd:2">
          <Text style={styles.sectionTitle} data-oid="pjetqve">
            Step 5: Alert Message Format
          </Text>
          <Text style={styles.description} data-oid="d9mw8zg">
            Use one of these message formats in the alert message field:
          </Text>

          <View style={styles.formatSection} data-oid="zu9r.ug">
            <Text style={styles.formatTitle} data-oid="9wj:fla">
              Simple Format (Recommended)
            </Text>
            <View style={styles.codeBlock} data-oid="1h07jy4">
              <Text style={styles.code} data-oid="yzkacp0">
                {'{{strategy.order.action}} {{ticker}}'}
              </Text>
            </View>
            <Text style={styles.formatDescription} data-oid="8.dj_8e">
              This will send "BUY BTCUSDT" or "SELL BTCUSDT" based on your
              signal.
            </Text>
          </View>

          <View style={styles.formatSection} data-oid=".t2hji8">
            <Text style={styles.formatTitle} data-oid="h4y9ibu">
              JSON Format (Advanced)
            </Text>
            <View style={styles.codeBlock} data-oid="t1:uxrz">
              <Text style={styles.code} data-oid="39ygfjf">
                {`{
  "action": "{{strategy.order.action}}",
  "symbol": "{{ticker}}",
  "price": {{close}},
  "signal": "RSI_SIGNAL"
}`}
              </Text>
            </View>
            <Text style={styles.formatDescription} data-oid="-pk1yr_">
              Provides more detailed information including current price and
              signal type.
            </Text>
          </View>
        </View>

        <View style={styles.section} data-oid="f6t_hj2">
          <Text style={styles.sectionTitle} data-oid="gpp8xgl">
            Step 6: Test Your Setup
          </Text>
          <View style={styles.testSection} data-oid="zarrs33">
            <View style={styles.testStep} data-oid="sidsx1z">
              <CheckCircle size={16} color="#10B981" data-oid="i:wf2-c" />
              <Text style={styles.testText} data-oid="9l02:hd">
                Create a test alert with a simple condition
              </Text>
            </View>
            <View style={styles.testStep} data-oid="gsp9qy-">
              <CheckCircle size={16} color="#10B981" data-oid="tg9xbs:" />
              <Text style={styles.testText} data-oid="9h084ta">
                Trigger the alert manually to test webhook delivery
              </Text>
            </View>
            <View style={styles.testStep} data-oid="lvkatyt">
              <CheckCircle size={16} color="#10B981" data-oid="w0s-v8y" />
              <Text style={styles.testText} data-oid="8:0940j">
                Check the Auto-Trade Monitor for received signals
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.warningSection} data-oid="qibmzly">
          <Text style={styles.warningTitle} data-oid="2q7bq2y">
            ⚠️ Important Notes
          </Text>
          <Text style={styles.warningText} data-oid="4dpaq90">
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
