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
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Trading Alerts</Text>
          <Text style={styles.subtitle}>
            {activeAlertsCount} active • {triggeredAlertsCount} triggered today
          </Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Bell size={20} color="#10B981" />
          <Text style={styles.statValue}>{activeAlertsCount}</Text>
          <Text style={styles.statLabel}>Active Alerts</Text>
        </View>
        <View style={styles.statCard}>
          <Zap size={20} color="#F59E0B" />
          <Text style={styles.statValue}>{triggeredAlertsCount}</Text>
          <Text style={styles.statLabel}>Triggered Today</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filterActive === 'all' && styles.filterButtonActive,
            ]}
            onPress={() => setFilterActive('all')}
          >
            <Text
              style={[
                styles.filterText,
                filterActive === 'all' && styles.filterTextActive,
              ]}
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
          >
            <Text
              style={[
                styles.filterText,
                filterActive === 'active' && styles.filterTextActive,
              ]}
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
          >
            <Text
              style={[
                styles.filterText,
                filterActive === 'triggered' && styles.filterTextActive,
              ]}
            >
              Triggered
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.alertsList}
        showsVerticalScrollIndicator={false}
      >
        {filteredAlerts.length === 0 ? (
          <View style={styles.emptyState}>
            <Bell size={48} color="#4B5563" />
            <Text style={styles.emptyTitle}>No alerts found</Text>
            <Text style={styles.emptyDescription}>
              Create your first alert to get notified about price movements
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => setShowCreateModal(true)}
            >
              <Text style={styles.emptyButtonText}>Create Alert</Text>
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
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.modalCancel}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Create Alert</Text>
          <TouchableOpacity onPress={handleCreate}>
            <Text style={styles.modalCreate}>Create</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Symbol</Text>
            <TextInput
              style={styles.input}
              value={symbol}
              onChangeText={setSymbol}
              placeholder="BTC, ETH, SOL..."
              placeholderTextColor="#6B7280"
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Alert Type</Text>
            <View style={styles.typeSelector}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === 'BUY' && styles.typeButtonActive,
                ]}
                onPress={() => setType('BUY')}
              >
                <Text
                  style={[
                    styles.typeText,
                    type === 'BUY' && styles.typeTextActive,
                  ]}
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
              >
                <Text
                  style={[
                    styles.typeText,
                    type === 'SELL' && styles.typeTextActive,
                  ]}
                >
                  SELL
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Condition</Text>
            <TextInput
              style={styles.input}
              value={condition}
              onChangeText={setCondition}
              placeholder="Price crosses above $50,000"
              placeholderTextColor="#6B7280"
              multiline
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Target Price</Text>
            <TextInput
              style={styles.input}
              value={targetPrice}
              onChangeText={setTargetPrice}
              placeholder="50000"
              placeholderTextColor="#6B7280"
              keyboardType="numeric"
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
