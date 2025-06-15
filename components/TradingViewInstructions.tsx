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
    <View style={styles.container} data-oid="a132j:j">
      <View style={styles.header} data-oid="uhvd7iz">
        <Text style={styles.title} data-oid=".:9ng4r">
          TradingView Setup Instructions
        </Text>
        <TouchableOpacity
          onPress={onClose}
          style={styles.closeButton}
          data-oid="68lqscp"
        >
          <Text style={styles.closeText} data-oid="n7lj15u">
            Close
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        data-oid="ztucm:7"
      >
        <View style={styles.section} data-oid="85f6koc">
          <Text style={styles.sectionTitle} data-oid="thr3um6">
            Step 1: Create Your Trading Strategy
          </Text>
          <Text style={styles.description} data-oid="f317x:0">
            First, create or open your trading strategy/indicator in TradingView
            Pine Script editor.
          </Text>
        </View>

        <View style={styles.section} data-oid="wd:rl7n">
          <Text style={styles.sectionTitle} data-oid="xcr9ht0">
            Step 2: Add Alert Conditions
          </Text>
          <Text style={styles.description} data-oid="w4mwfj1">
            In your Pine Script, add alert conditions using the
            `alertcondition()` function:
          </Text>
          <View style={styles.codeBlock} data-oid="h_y5796">
            <Text style={styles.code} data-oid="swwse0f">
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

        <View style={styles.section} data-oid="q6z_u39">
          <Text style={styles.sectionTitle} data-oid="9y85rds">
            Step 3: Create Alert
          </Text>
          <View style={styles.stepList} data-oid="51c35lb">
            <View style={styles.step} data-oid="jbknms-">
              <View style={styles.stepNumber} data-oid="zafuqjb">
                <Text style={styles.stepNumberText} data-oid="ayh7w06">
                  1
                </Text>
              </View>
              <Text style={styles.stepText} data-oid="n4o:ubf">
                Right-click on your chart and select "Add Alert"
              </Text>
            </View>
            <View style={styles.step} data-oid="2_jv.uu">
              <View style={styles.stepNumber} data-oid="2j815vn">
                <Text style={styles.stepNumberText} data-oid=":6i33sl">
                  2
                </Text>
              </View>
              <Text style={styles.stepText} data-oid="q7lndn1">
                Choose your indicator/strategy from the dropdown
              </Text>
            </View>
            <View style={styles.step} data-oid="vqu8xtg">
              <View style={styles.stepNumber} data-oid="e_tk73s">
                <Text style={styles.stepNumberText} data-oid="exfszmt">
                  3
                </Text>
              </View>
              <Text style={styles.stepText} data-oid="e.081t4">
                Select the alert condition (Buy Signal, Sell Signal, etc.)
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section} data-oid="4ekbi8g">
          <Text style={styles.sectionTitle} data-oid="ygnu6-_">
            Step 4: Configure Webhook
          </Text>
          <View style={styles.webhookSection} data-oid="f11oeqe">
            <Text style={styles.description} data-oid="dsj3tyx">
              In the "Notifications" tab of the alert dialog:
            </Text>
            <View style={styles.webhookConfig} data-oid="k_rgs77">
              <Text style={styles.configLabel} data-oid="cuzo9d.">
                Webhook URL:
              </Text>
              <View style={styles.urlContainer} data-oid="qzdv_4g">
                <Text style={styles.webhookUrl} data-oid="ydp9mo9">
                  {webhookUrl}
                </Text>
                <TouchableOpacity style={styles.copyButton} data-oid="61lwnp6">
                  <Copy size={16} color="#10B981" data-oid="qmu5g:v" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section} data-oid="6spm1ei">
          <Text style={styles.sectionTitle} data-oid="v43kn9z">
            Step 5: Alert Message Format
          </Text>
          <Text style={styles.description} data-oid="69egr6h">
            Use one of these message formats in the alert message field:
          </Text>

          <View style={styles.formatSection} data-oid="2bhnxn3">
            <Text style={styles.formatTitle} data-oid="o4r4xyk">
              Simple Format (Recommended)
            </Text>
            <View style={styles.codeBlock} data-oid="h7684gh">
              <Text style={styles.code} data-oid="r2l3y0z">
                {'{{strategy.order.action}} {{ticker}}'}
              </Text>
            </View>
            <Text style={styles.formatDescription} data-oid=":555-5l">
              This will send "BUY BTCUSDT" or "SELL BTCUSDT" based on your
              signal.
            </Text>
          </View>

          <View style={styles.formatSection} data-oid="yksbox5">
            <Text style={styles.formatTitle} data-oid="--ta8bl">
              JSON Format (Advanced)
            </Text>
            <View style={styles.codeBlock} data-oid="m9c31bd">
              <Text style={styles.code} data-oid="1xkp130">
                {`{
  "action": "{{strategy.order.action}}",
  "symbol": "{{ticker}}",
  "price": {{close}},
  "signal": "RSI_SIGNAL"
}`}
              </Text>
            </View>
            <Text style={styles.formatDescription} data-oid="l_vf34h">
              Provides more detailed information including current price and
              signal type.
            </Text>
          </View>
        </View>

        <View style={styles.section} data-oid="p:ytb0y">
          <Text style={styles.sectionTitle} data-oid="42omk5h">
            Step 6: Test Your Setup
          </Text>
          <View style={styles.testSection} data-oid="gnw1xaw">
            <View style={styles.testStep} data-oid="4bavh22">
              <CheckCircle size={16} color="#10B981" data-oid="1ey8.n1" />
              <Text style={styles.testText} data-oid="t06gma2">
                Create a test alert with a simple condition
              </Text>
            </View>
            <View style={styles.testStep} data-oid="vhcoy92">
              <CheckCircle size={16} color="#10B981" data-oid="2s2cjex" />
              <Text style={styles.testText} data-oid="sb-77k.">
                Trigger the alert manually to test webhook delivery
              </Text>
            </View>
            <View style={styles.testStep} data-oid="t8gtzvm">
              <CheckCircle size={16} color="#10B981" data-oid="ump7:a-" />
              <Text style={styles.testText} data-oid="jkq0nt9">
                Check the Auto-Trade Monitor for received signals
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.warningSection} data-oid="8568t5j">
          <Text style={styles.warningTitle} data-oid="nl7hzil">
            ⚠️ Important Notes
          </Text>
          <Text style={styles.warningText} data-oid="qs.8drc">
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
