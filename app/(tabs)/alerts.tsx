import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Plus, Settings, Filter, Bell, Zap } from 'lucide-react-native';
import AlertCard from '@/components/AlertCard';

interface Alert {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  condition: string;
  targetPrice: number;
  currentPrice: number;
  isActive: boolean;
  triggeredAt?: Date;
}

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      symbol: 'BTC',
      type: 'BUY',
      condition: 'Price crosses above $70,000',
      targetPrice: 70000,
      currentPrice: 71200,
      isActive: true,
      triggeredAt: new Date('2024-01-15T10:30:00Z'),
    },
    {
      id: '2',
      symbol: 'ETH',
      type: 'SELL',
      condition: 'Price falls below $4,000',
      targetPrice: 4000,
      currentPrice: 4125,
      isActive: true,
    },
    {
      id: '3',
      symbol: 'SOL',
      type: 'BUY',
      condition: 'RSI drops below 30',
      targetPrice: 200,
      currentPrice: 210,
      isActive: false,
    },
    {
      id: '4',
      symbol: 'ADA',
      type: 'BUY',
      condition: 'Volume increases by 200%',
      targetPrice: 1.0,
      currentPrice: 0.95,
      isActive: true,
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterActive, setFilterActive] = useState<
    'all' | 'active' | 'triggered'
  >('all');

  const handleToggleAlert = (id: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, isActive: !alert.isActive } : alert,
      ),
    );
  };

  const handleAlertOptions = (id: string) => {
    Alert.alert('Alert Options', 'What would you like to do?', [
      { text: 'Edit', onPress: () => console.log('Edit alert', id) },
      { text: 'Delete', style: 'destructive', onPress: () => deleteAlert(id) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const filteredAlerts = alerts.filter((alert) => {
    switch (filterActive) {
      case 'active':
        return alert.isActive && !alert.triggeredAt;
      case 'triggered':
        return alert.triggeredAt;
      default:
        return true;
    }
  });

  const activeAlertsCount = alerts.filter(
    (a) => a.isActive && !a.triggeredAt,
  ).length;
  const triggeredAlertsCount = alerts.filter((a) => a.triggeredAt).length;

  return (
    <View style={styles.container} data-oid="gucwqg7">
      <View style={styles.header} data-oid="btayogx">
        <View data-oid="4nt44a1">
          <Text style={styles.title} data-oid="gdgku_n">
            Trading Alerts
          </Text>
          <Text style={styles.subtitle} data-oid="fq0kyw-">
            {activeAlertsCount} active • {triggeredAlertsCount} triggered today
          </Text>
        </View>
        <TouchableOpacity style={styles.settingsButton} data-oid="zsmqh38">
          <Settings size={24} color="#9CA3AF" data-oid="5k3fh-3" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer} data-oid="ir5go_:">
        <View style={styles.statCard} data-oid="20g_pj_">
          <Bell size={20} color="#10B981" data-oid="afq:x:z" />
          <Text style={styles.statValue} data-oid=".elia:k">
            {activeAlertsCount}
          </Text>
          <Text style={styles.statLabel} data-oid="ft-zmnq">
            Active Alerts
          </Text>
        </View>
        <View style={styles.statCard} data-oid="0tpavzs">
          <Zap size={20} color="#F59E0B" data-oid="-bhyfx6" />
          <Text style={styles.statValue} data-oid=".350o_:">
            {triggeredAlertsCount}
          </Text>
          <Text style={styles.statLabel} data-oid="mn74o85">
            Triggered Today
          </Text>
        </View>
      </View>

      <View style={styles.controls} data-oid="-:iigl:">
        <View style={styles.filterContainer} data-oid="wee0lqy">
          <TouchableOpacity
            style={[
              styles.filterButton,
              filterActive === 'all' && styles.filterButtonActive,
            ]}
            onPress={() => setFilterActive('all')}
            data-oid="8xzptiv"
          >
            <Text
              style={[
                styles.filterText,
                filterActive === 'all' && styles.filterTextActive,
              ]}
              data-oid="ezw.uzm"
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filterActive === 'active' && styles.filterButtonActive,
            ]}
            onPress={() => setFilterActive('active')}
            data-oid="i53u6x5"
          >
            <Text
              style={[
                styles.filterText,
                filterActive === 'active' && styles.filterTextActive,
              ]}
              data-oid="uku1cg7"
            >
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filterActive === 'triggered' && styles.filterButtonActive,
            ]}
            onPress={() => setFilterActive('triggered')}
            data-oid="9pofe87"
          >
            <Text
              style={[
                styles.filterText,
                filterActive === 'triggered' && styles.filterTextActive,
              ]}
              data-oid="_c2o05p"
            >
              Triggered
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setShowCreateModal(true)}
          data-oid="9yqm2:y"
        >
          <Plus size={20} color="#FFFFFF" data-oid="6lz_jg-" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.alertsList}
        showsVerticalScrollIndicator={false}
        data-oid="lua_j4l"
      >
        {filteredAlerts.length === 0 ? (
          <View style={styles.emptyState} data-oid="_-u.x9q">
            <Bell size={48} color="#4B5563" data-oid="3p3kw_." />
            <Text style={styles.emptyTitle} data-oid="9j1fuhq">
              No alerts found
            </Text>
            <Text style={styles.emptyDescription} data-oid="xdzc-y-">
              Create your first alert to get notified about price movements
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => setShowCreateModal(true)}
              data-oid="4:y:_zd"
            >
              <Text style={styles.emptyButtonText} data-oid="g4xyyjr">
                Create Alert
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              id={alert.id}
              symbol={alert.symbol}
              type={alert.type}
              condition={alert.condition}
              targetPrice={alert.targetPrice}
              currentPrice={alert.currentPrice}
              isActive={alert.isActive}
              triggeredAt={alert.triggeredAt}
              onToggle={handleToggleAlert}
              onOptions={handleAlertOptions}
              data-oid="u9mdqn3"
            />
          ))
        )}
      </ScrollView>

      <CreateAlertModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateAlert={(newAlert) => {
          setAlerts([...alerts, { ...newAlert, id: Date.now().toString() }]);
          setShowCreateModal(false);
        }}
        data-oid="q73-kwa"
      />
    </View>
  );
}

interface CreateAlertModalProps {
  visible: boolean;
  onClose: () => void;
  onCreateAlert: (alert: Omit<Alert, 'id'>) => void;
}

function CreateAlertModal({
  visible,
  onClose,
  onCreateAlert,
}: CreateAlertModalProps) {
  const [symbol, setSymbol] = useState('');
  const [type, setType] = useState<'BUY' | 'SELL'>('BUY');
  const [condition, setCondition] = useState('');
  const [targetPrice, setTargetPrice] = useState('');

  const handleCreate = () => {
    if (!symbol || !condition || !targetPrice) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    onCreateAlert({
      symbol: symbol.toUpperCase(),
      type,
      condition,
      targetPrice: parseFloat(targetPrice),
      currentPrice: parseFloat(targetPrice) * 0.95, // Mock current price
      isActive: true,
    });

    // Reset form
    setSymbol('');
    setCondition('');
    setTargetPrice('');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
      data-oid="ps8c3xm"
    >
      <View style={styles.modalContainer} data-oid="qrht1l7">
        <View style={styles.modalHeader} data-oid="qs58o8e">
          <TouchableOpacity onPress={onClose} data-oid="ekoaazt">
            <Text style={styles.modalCancel} data-oid="94ibsbg">
              Cancel
            </Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle} data-oid="2xmhqpq">
            Create Alert
          </Text>
          <TouchableOpacity onPress={handleCreate} data-oid="tvht62b">
            <Text style={styles.modalCreate} data-oid="jax:hmv">
              Create
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent} data-oid="1apse13">
          <View style={styles.inputGroup} data-oid="37snwzf">
            <Text style={styles.inputLabel} data-oid="i5eh2e-">
              Symbol
            </Text>
            <TextInput
              style={styles.input}
              value={symbol}
              onChangeText={setSymbol}
              placeholder="BTC, ETH, SOL..."
              placeholderTextColor="#6B7280"
              autoCapitalize="characters"
              data-oid="j9hn9h."
            />
          </View>

          <View style={styles.inputGroup} data-oid="lsngcwn">
            <Text style={styles.inputLabel} data-oid="b.yp8y2">
              Alert Type
            </Text>
            <View style={styles.typeSelector} data-oid="a7d-u4p">
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === 'BUY' && styles.typeButtonActive,
                ]}
                onPress={() => setType('BUY')}
                data-oid="3qzl9.c"
              >
                <Text
                  style={[
                    styles.typeText,
                    type === 'BUY' && styles.typeTextActive,
                  ]}
                  data-oid="n1v9_n5"
                >
                  BUY
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === 'SELL' && styles.typeButtonActive,
                ]}
                onPress={() => setType('SELL')}
                data-oid="xl93idh"
              >
                <Text
                  style={[
                    styles.typeText,
                    type === 'SELL' && styles.typeTextActive,
                  ]}
                  data-oid="psskn.h"
                >
                  SELL
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup} data-oid="s1ghj2y">
            <Text style={styles.inputLabel} data-oid="-nf6jv:">
              Condition
            </Text>
            <TextInput
              style={styles.input}
              value={condition}
              onChangeText={setCondition}
              placeholder="Price crosses above $50,000"
              placeholderTextColor="#6B7280"
              multiline
              data-oid="rx5sukk"
            />
          </View>

          <View style={styles.inputGroup} data-oid="0-ql3ys">
            <Text style={styles.inputLabel} data-oid="q3l.w7u">
              Target Price
            </Text>
            <TextInput
              style={styles.input}
              value={targetPrice}
              onChangeText={setTargetPrice}
              placeholder="50000"
              placeholderTextColor="#6B7280"
              keyboardType="numeric"
              data-oid="ymvjv1k"
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
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
  settingsButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#374151',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4B5563',
    gap: 8,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 4,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  filterButtonActive: {
    backgroundColor: '#10B981',
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  createButton: {
    backgroundColor: '#10B981',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertsList: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    marginTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#111827',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  modalCancel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  modalCreate: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 4,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  typeButtonActive: {
    backgroundColor: '#10B981',
  },
  typeText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#9CA3AF',
  },
  typeTextActive: {
    color: '#FFFFFF',
  },
});
