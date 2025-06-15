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
    <View style={styles.container} data-oid="b3fq:6g">
      <View style={styles.header} data-oid="sbej.bb">
        <Text style={styles.title} data-oid="2opluba">
          TradingView Setup Instructions
        </Text>
        <TouchableOpacity
          onPress={onClose}
          style={styles.closeButton}
          data-oid="cxueclz"
        >
          <Text style={styles.closeText} data-oid="txwxy0d">
            Close
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        data-oid="sz9thmi"
      >
        <View style={styles.section} data-oid="67m1sle">
          <Text style={styles.sectionTitle} data-oid="ga7z7xh">
            Step 1: Create Your Trading Strategy
          </Text>
          <Text style={styles.description} data-oid="ch_2lx8">
            First, create or open your trading strategy/indicator in TradingView
            Pine Script editor.
          </Text>
        </View>

        <View style={styles.section} data-oid="tg-2io9">
          <Text style={styles.sectionTitle} data-oid=":l6_szw">
            Step 2: Add Alert Conditions
          </Text>
          <Text style={styles.description} data-oid="lt0z.zs">
            In your Pine Script, add alert conditions using the
            `alertcondition()` function:
          </Text>
          <View style={styles.codeBlock} data-oid="k1v377v">
            <Text style={styles.code} data-oid="d75:i7z">
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

        <View style={styles.section} data-oid="4lqmnbq">
          <Text style={styles.sectionTitle} data-oid="g75ss4-">
            Step 3: Create Alert
          </Text>
          <View style={styles.stepList} data-oid="_syei-w">
            <View style={styles.step} data-oid="b49-ti7">
              <View style={styles.stepNumber} data-oid="pekp:v6">
                <Text style={styles.stepNumberText} data-oid="et1mkkk">
                  1
                </Text>
              </View>
              <Text style={styles.stepText} data-oid="ij679dr">
                Right-click on your chart and select "Add Alert"
              </Text>
            </View>
            <View style={styles.step} data-oid="9b_2un8">
              <View style={styles.stepNumber} data-oid="_dq08wo">
                <Text style={styles.stepNumberText} data-oid="bkwuc:y">
                  2
                </Text>
              </View>
              <Text style={styles.stepText} data-oid="a81afto">
                Choose your indicator/strategy from the dropdown
              </Text>
            </View>
            <View style={styles.step} data-oid="8wk5-.l">
              <View style={styles.stepNumber} data-oid="jfu9zp:">
                <Text style={styles.stepNumberText} data-oid="lb9qldu">
                  3
                </Text>
              </View>
              <Text style={styles.stepText} data-oid="5:24me5">
                Select the alert condition (Buy Signal, Sell Signal, etc.)
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section} data-oid="fimhw6o">
          <Text style={styles.sectionTitle} data-oid="aogqgzg">
            Step 4: Configure Webhook
          </Text>
          <View style={styles.webhookSection} data-oid="shvb4fx">
            <Text style={styles.description} data-oid="c-d36yr">
              In the "Notifications" tab of the alert dialog:
            </Text>
            <View style={styles.webhookConfig} data-oid=".7kewvd">
              <Text style={styles.configLabel} data-oid="mr092me">
                Webhook URL:
              </Text>
              <View style={styles.urlContainer} data-oid="zy540_j">
                <Text style={styles.webhookUrl} data-oid="jjm70j8">
                  {webhookUrl}
                </Text>
                <TouchableOpacity style={styles.copyButton} data-oid="a0q7_12">
                  <Copy size={16} color="#10B981" data-oid="yhezyq1" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section} data-oid="r8cs84e">
          <Text style={styles.sectionTitle} data-oid="hytyr8g">
            Step 5: Alert Message Format
          </Text>
          <Text style={styles.description} data-oid=":e-v7oq">
            Use one of these message formats in the alert message field:
          </Text>

          <View style={styles.formatSection} data-oid="d_jflft">
            <Text style={styles.formatTitle} data-oid="pg7ae.8">
              Simple Format (Recommended)
            </Text>
            <View style={styles.codeBlock} data-oid="u6bbrfo">
              <Text style={styles.code} data-oid="pjgd5.:">
                {'{{strategy.order.action}} {{ticker}}'}
              </Text>
            </View>
            <Text style={styles.formatDescription} data-oid="6i0.es6">
              This will send "BUY BTCUSDT" or "SELL BTCUSDT" based on your
              signal.
            </Text>
          </View>

          <View style={styles.formatSection} data-oid="pn-6zh2">
            <Text style={styles.formatTitle} data-oid="jq_:wxj">
              JSON Format (Advanced)
            </Text>
            <View style={styles.codeBlock} data-oid="8zquxul">
              <Text style={styles.code} data-oid="aovjr6o">
                {`{
  "action": "{{strategy.order.action}}",
  "symbol": "{{ticker}}",
  "price": {{close}},
  "signal": "RSI_SIGNAL"
}`}
              </Text>
            </View>
            <Text style={styles.formatDescription} data-oid="uesp1dl">
              Provides more detailed information including current price and
              signal type.
            </Text>
          </View>
        </View>

        <View style={styles.section} data-oid="6bfoanw">
          <Text style={styles.sectionTitle} data-oid="klo0fa:">
            Step 6: Test Your Setup
          </Text>
          <View style={styles.testSection} data-oid="2.xxwxf">
            <View style={styles.testStep} data-oid="y8s2m1v">
              <CheckCircle size={16} color="#10B981" data-oid="jzlsjum" />
              <Text style={styles.testText} data-oid=".otevty">
                Create a test alert with a simple condition
              </Text>
            </View>
            <View style={styles.testStep} data-oid="uec.48t">
              <CheckCircle size={16} color="#10B981" data-oid="2niqi-o" />
              <Text style={styles.testText} data-oid="2nvan3q">
                Trigger the alert manually to test webhook delivery
              </Text>
            </View>
            <View style={styles.testStep} data-oid="i_b.yq0">
              <CheckCircle size={16} color="#10B981" data-oid="-f1s::2" />
              <Text style={styles.testText} data-oid="qv.pyd4">
                Check the Auto-Trade Monitor for received signals
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.warningSection} data-oid="1x08jjc">
          <Text style={styles.warningTitle} data-oid="7j3i7l1">
            ⚠️ Important Notes
          </Text>
          <Text style={styles.warningText} data-oid="fbosh.c">
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
