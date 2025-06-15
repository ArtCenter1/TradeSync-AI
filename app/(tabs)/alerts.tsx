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
    <View style={styles.container} data-oid=":6k34iz">
      <View style={styles.header} data-oid="714xdlp">
        <View data-oid="4909m3b">
          <Text style={styles.title} data-oid="hz6xk:s">
            Trading Alerts
          </Text>
          <Text style={styles.subtitle} data-oid="0n65-77">
            {activeAlertsCount} active • {triggeredAlertsCount} triggered today
          </Text>
        </View>
        <TouchableOpacity style={styles.settingsButton} data-oid="og._4y2">
          <Settings size={24} color="#9CA3AF" data-oid="-8mtc:o" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer} data-oid="4qj5_:5">
        <View style={styles.statCard} data-oid="i6z-i.c">
          <Bell size={20} color="#10B981" data-oid="s-s3kcq" />
          <Text style={styles.statValue} data-oid="9_bia_f">
            {activeAlertsCount}
          </Text>
          <Text style={styles.statLabel} data-oid="69.e4og">
            Active Alerts
          </Text>
        </View>
        <View style={styles.statCard} data-oid="6zg2114">
          <Zap size={20} color="#F59E0B" data-oid="ke5wls0" />
          <Text style={styles.statValue} data-oid="q:gdmgt">
            {triggeredAlertsCount}
          </Text>
          <Text style={styles.statLabel} data-oid="mpj54vt">
            Triggered Today
          </Text>
        </View>
      </View>

      <View style={styles.controls} data-oid="frpt_uv">
        <View style={styles.filterContainer} data-oid="cq_pcmi">
          <TouchableOpacity
            style={[
              styles.filterButton,
              filterActive === 'all' && styles.filterButtonActive,
            ]}
            onPress={() => setFilterActive('all')}
            data-oid="7v:ck_k"
          >
            <Text
              style={[
                styles.filterText,
                filterActive === 'all' && styles.filterTextActive,
              ]}
              data-oid="v-1gt0w"
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
            data-oid="62:.yl6"
          >
            <Text
              style={[
                styles.filterText,
                filterActive === 'active' && styles.filterTextActive,
              ]}
              data-oid="s3x0vko"
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
            data-oid="cuejzs7"
          >
            <Text
              style={[
                styles.filterText,
                filterActive === 'triggered' && styles.filterTextActive,
              ]}
              data-oid="x8e:.j8"
            >
              Triggered
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setShowCreateModal(true)}
          data-oid="5cpfsin"
        >
          <Plus size={20} color="#FFFFFF" data-oid="f37tdkv" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.alertsList}
        showsVerticalScrollIndicator={false}
        data-oid="fign3g6"
      >
        {filteredAlerts.length === 0 ? (
          <View style={styles.emptyState} data-oid="3f49ycw">
            <Bell size={48} color="#4B5563" data-oid="i8qfwld" />
            <Text style={styles.emptyTitle} data-oid="ausc7q5">
              No alerts found
            </Text>
            <Text style={styles.emptyDescription} data-oid="s5nbig9">
              Create your first alert to get notified about price movements
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => setShowCreateModal(true)}
              data-oid="4lxx48t"
            >
              <Text style={styles.emptyButtonText} data-oid="a9x7aiw">
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
              data-oid="v.na:w:"
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
        data-oid="lnqksz7"
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
      data-oid="fe6cw0w"
    >
      <View style={styles.modalContainer} data-oid="tcmdr6j">
        <View style={styles.modalHeader} data-oid="2n7vomn">
          <TouchableOpacity onPress={onClose} data-oid="ex.3iv1">
            <Text style={styles.modalCancel} data-oid="u:v0czo">
              Cancel
            </Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle} data-oid="3.smv6r">
            Create Alert
          </Text>
          <TouchableOpacity onPress={handleCreate} data-oid="7pmkzq1">
            <Text style={styles.modalCreate} data-oid="6gnflip">
              Create
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent} data-oid="7ao89qh">
          <View style={styles.inputGroup} data-oid="u-84t5-">
            <Text style={styles.inputLabel} data-oid="np5dnh_">
              Symbol
            </Text>
            <TextInput
              style={styles.input}
              value={symbol}
              onChangeText={setSymbol}
              placeholder="BTC, ETH, SOL..."
              placeholderTextColor="#6B7280"
              autoCapitalize="characters"
              data-oid="m4pg84w"
            />
          </View>

          <View style={styles.inputGroup} data-oid="_g314h5">
            <Text style={styles.inputLabel} data-oid="peytd8r">
              Alert Type
            </Text>
            <View style={styles.typeSelector} data-oid="q7sffn2">
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === 'BUY' && styles.typeButtonActive,
                ]}
                onPress={() => setType('BUY')}
                data-oid="hxr7.dm"
              >
                <Text
                  style={[
                    styles.typeText,
                    type === 'BUY' && styles.typeTextActive,
                  ]}
                  data-oid="uhd_vno"
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
                data-oid="2vtjya1"
              >
                <Text
                  style={[
                    styles.typeText,
                    type === 'SELL' && styles.typeTextActive,
                  ]}
                  data-oid="0psf22m"
                >
                  SELL
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup} data-oid="jbtshuz">
            <Text style={styles.inputLabel} data-oid="mvx._1s">
              Condition
            </Text>
            <TextInput
              style={styles.input}
              value={condition}
              onChangeText={setCondition}
              placeholder="Price crosses above $50,000"
              placeholderTextColor="#6B7280"
              multiline
              data-oid="6dmgv-q"
            />
          </View>

          <View style={styles.inputGroup} data-oid="eo8fuwt">
            <Text style={styles.inputLabel} data-oid="rtb4xd.">
              Target Price
            </Text>
            <TextInput
              style={styles.input}
              value={targetPrice}
              onChangeText={setTargetPrice}
              placeholder="50000"
              placeholderTextColor="#6B7280"
              keyboardType="numeric"
              data-oid="-2:rwz-"
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
