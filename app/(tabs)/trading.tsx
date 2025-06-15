import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Plus,
  Search,
  Filter,
  Clock,
} from 'lucide-react-native';
import TradeHistoryItem from '@/components/TradeHistoryItem';

interface Trade {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  amount: number;
  price: number;
  total: number;
  timestamp: Date;
  pnl?: number;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

interface Order {
  symbol: string;
  type: 'BUY' | 'SELL';
  orderType: 'MARKET' | 'LIMIT';
  amount: number;
  price?: number;
}

export default function TradingScreen() {
  const [activeTab, setActiveTab] = useState<'history' | 'orders'>('history');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTradeModal, setShowTradeModal] = useState(false);

  const [trades] = useState<Trade[]>([
    {
      id: '1',
      symbol: 'BTC',
      type: 'BUY',
      amount: 0.1,
      price: 70500,
      total: 7050,
      timestamp: new Date('2024-01-15T14:30:00Z'),
      pnl: 70,
      status: 'COMPLETED',
    },
    {
      id: '2',
      symbol: 'ETH',
      type: 'SELL',
      amount: 2.5,
      price: 4200,
      total: 10500,
      timestamp: new Date('2024-01-15T13:15:00Z'),
      pnl: 300,
      status: 'COMPLETED',
    },
    {
      id: '3',
      symbol: 'SOL',
      type: 'BUY',
      amount: 25,
      price: 205,
      total: 5125,
      timestamp: new Date('2024-01-15T11:45:00Z'),
      status: 'PENDING',
    },
    {
      id: '4',
      symbol: 'ADA',
      type: 'BUY',
      amount: 1000,
      price: 0.94,
      total: 940,
      timestamp: new Date('2024-01-15T10:20:00Z'),
      pnl: 10,
      status: 'COMPLETED',
    },
    {
      id: '5',
      symbol: 'DOT',
      type: 'SELL',
      amount: 50,
      price: 12.5,
      total: 625,
      timestamp: new Date('2024-01-15T09:30:00Z'),
      status: 'FAILED',
    },
  ]);

  const [pendingOrders] = useState<Trade[]>([
    {
      id: '6',
      symbol: 'BTC',
      type: 'BUY',
      amount: 0.05,
      price: 69000,
      total: 3450,
      timestamp: new Date('2024-01-15T15:00:00Z'),
      status: 'PENDING',
    },
    {
      id: '7',
      symbol: 'ETH',
      type: 'SELL',
      amount: 1.0,
      price: 4300,
      total: 4300,
      timestamp: new Date('2024-01-15T14:45:00Z'),
      status: 'PENDING',
    },
  ]);

  const filteredTrades = trades.filter((trade) =>
    trade.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredOrders = pendingOrders.filter((order) =>
    order.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const completedTrades = trades.filter((t) => t.status === 'COMPLETED').length;
  const pendingCount =
    trades.filter((t) => t.status === 'PENDING').length + pendingOrders.length;
  const totalVolume = trades
    .filter((t) => t.status === 'COMPLETED')
    .reduce((sum, t) => sum + t.total, 0);

  return (
    <View style={styles.container} data-oid="zfmu-qw">
      <View style={styles.header} data-oid="pxme3tl">
        <View data-oid="v_zwenv">
          <Text style={styles.title} data-oid="11n9-9x">
            Trading
          </Text>
          <Text style={styles.subtitle} data-oid=".odmgdu">
            {completedTrades} completed • {pendingCount} pending
          </Text>
        </View>
        <TouchableOpacity
          style={styles.tradeButton}
          onPress={() => setShowTradeModal(true)}
          data-oid="ny:wa1m"
        >
          <Plus size={20} color="#FFFFFF" data-oid="v:5wj6q" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer} data-oid="0_fzwp:">
        <View style={styles.statCard} data-oid="x2ulpz5">
          <Activity size={20} color="#10B981" data-oid="vp9ky50" />
          <Text style={styles.statValue} data-oid="6el7o2i">
            {completedTrades}
          </Text>
          <Text style={styles.statLabel} data-oid="5_srl-j">
            Completed
          </Text>
        </View>
        <View style={styles.statCard} data-oid="5w:i02a">
          <Clock size={20} color="#F59E0B" data-oid="3j61xgj" />
          <Text style={styles.statValue} data-oid="kt5b-h3">
            {pendingCount}
          </Text>
          <Text style={styles.statLabel} data-oid="gayc7n6">
            Pending
          </Text>
        </View>
        <View style={styles.statCard} data-oid="pcy_bug">
          <TrendingUp size={20} color="#3B82F6" data-oid="gktex.." />
          <Text style={styles.statValue} data-oid="p:laeul">
            ${(totalVolume / 1000).toFixed(1)}K
          </Text>
          <Text style={styles.statLabel} data-oid="guzmhh4">
            Volume
          </Text>
        </View>
      </View>

      <View style={styles.searchContainer} data-oid="8hgs09y">
        <View style={styles.searchBar} data-oid="igriwwq">
          <Search size={20} color="#9CA3AF" data-oid="ee8mtc6" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search trades..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
            data-oid="oybyhd-"
          />
        </View>
        <TouchableOpacity style={styles.filterButton} data-oid="2._0bz.">
          <Filter size={20} color="#9CA3AF" data-oid="k6vis.0" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer} data-oid="6i9l0tz">
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.tabActive]}
          onPress={() => setActiveTab('history')}
          data-oid="swac-nv"
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'history' && styles.tabTextActive,
            ]}
            data-oid="048247g"
          >
            History
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'orders' && styles.tabActive]}
          onPress={() => setActiveTab('orders')}
          data-oid="98paj5f"
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'orders' && styles.tabTextActive,
            ]}
            data-oid="7d3xg:m"
          >
            Open Orders
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.tradesList}
        showsVerticalScrollIndicator={false}
        data-oid="qmjj1ov"
      >
        {activeTab === 'history' ? (
          filteredTrades.length === 0 ? (
            <View style={styles.emptyState} data-oid="eh9.nju">
              <Activity size={48} color="#4B5563" data-oid="hjsju7f" />
              <Text style={styles.emptyTitle} data-oid="g:3dm_e">
                No trades found
              </Text>
              <Text style={styles.emptyDescription} data-oid="zoeo225">
                Your trading history will appear here
              </Text>
            </View>
          ) : (
            filteredTrades.map((trade) => (
              <TradeHistoryItem
                key={trade.id}
                id={trade.id}
                symbol={trade.symbol}
                type={trade.type}
                amount={trade.amount}
                price={trade.price}
                total={trade.total}
                timestamp={trade.timestamp}
                pnl={trade.pnl}
                status={trade.status}
                data-oid="vkz6cgw"
              />
            ))
          )
        ) : filteredOrders.length === 0 ? (
          <View style={styles.emptyState} data-oid="o0lv7uj">
            <Clock size={48} color="#4B5563" data-oid="9o4gqa-" />
            <Text style={styles.emptyTitle} data-oid="k3dx-9u">
              No open orders
            </Text>
            <Text style={styles.emptyDescription} data-oid="lf6-751">
              Your pending orders will appear here
            </Text>
          </View>
        ) : (
          filteredOrders.map((order) => (
            <TradeHistoryItem
              key={order.id}
              id={order.id}
              symbol={order.symbol}
              type={order.type}
              amount={order.amount}
              price={order.price}
              total={order.total}
              timestamp={order.timestamp}
              status={order.status}
              data-oid="tql9rtg"
            />
          ))
        )}
      </ScrollView>

      <TradeModal
        visible={showTradeModal}
        onClose={() => setShowTradeModal(false)}
        onExecuteTrade={(order) => {
          Alert.alert(
            'Trade Executed',
            `${order.type} order for ${order.amount} ${order.symbol} placed successfully`,
          );
          setShowTradeModal(false);
        }}
        data-oid=":.pdcw3"
      />
    </View>
  );
}

interface TradeModalProps {
  visible: boolean;
  onClose: () => void;
  onExecuteTrade: (order: Order) => void;
}

function TradeModal({ visible, onClose, onExecuteTrade }: TradeModalProps) {
  const [symbol, setSymbol] = useState('BTC');
  const [type, setType] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  const handleExecute = () => {
    if (!amount) {
      Alert.alert('Error', 'Please enter an amount');
      return;
    }

    if (orderType === 'LIMIT' && !price) {
      Alert.alert('Error', 'Please enter a price for limit order');
      return;
    }

    onExecuteTrade({
      symbol,
      type,
      orderType,
      amount: parseFloat(amount),
      price: orderType === 'LIMIT' ? parseFloat(price) : undefined,
    });

    // Reset form
    setAmount('');
    setPrice('');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
      data-oid="jcgwdef"
    >
      <View style={styles.modalContainer} data-oid="b69yy81">
        <View style={styles.modalHeader} data-oid="29w9z:y">
          <TouchableOpacity onPress={onClose} data-oid="j_nyx2n">
            <Text style={styles.modalCancel} data-oid="2yoryca">
              Cancel
            </Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle} data-oid="r3qtg6j">
            New Trade
          </Text>
          <TouchableOpacity onPress={handleExecute} data-oid="lz-:ole">
            <Text style={styles.modalExecute} data-oid="on4gino">
              Execute
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent} data-oid="lkiw5ed">
          <View style={styles.inputGroup} data-oid="fb9:eoz">
            <Text style={styles.inputLabel} data-oid="22kz:ky">
              Symbol
            </Text>
            <View style={styles.symbolSelector} data-oid="o4.2:st">
              {['BTC', 'ETH', 'SOL', 'ADA'].map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[
                    styles.symbolButton,
                    symbol === s && styles.symbolButtonActive,
                  ]}
                  onPress={() => setSymbol(s)}
                  data-oid="j33drxb"
                >
                  <Text
                    style={[
                      styles.symbolText,
                      symbol === s && styles.symbolTextActive,
                    ]}
                    data-oid="_axqywl"
                  >
                    {s}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup} data-oid="5nw:ez0">
            <Text style={styles.inputLabel} data-oid="j.kgiex">
              Trade Type
            </Text>
            <View style={styles.typeSelector} data-oid="oz46:ts">
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === 'BUY' && styles.buyButtonActive,
                ]}
                onPress={() => setType('BUY')}
                data-oid="4h.1s1d"
              >
                <TrendingUp
                  size={16}
                  color={type === 'BUY' ? '#FFFFFF' : '#10B981'}
                  data-oid="a4hq7ew"
                />

                <Text
                  style={[
                    styles.typeText,
                    type === 'BUY' && styles.typeTextActive,
                  ]}
                  data-oid="n6vxy9-"
                >
                  BUY
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === 'SELL' && styles.sellButtonActive,
                ]}
                onPress={() => setType('SELL')}
                data-oid="tbircm:"
              >
                <TrendingDown
                  size={16}
                  color={type === 'SELL' ? '#FFFFFF' : '#EF4444'}
                  data-oid="pzb8kn."
                />

                <Text
                  style={[
                    styles.typeText,
                    type === 'SELL' && styles.typeTextActive,
                  ]}
                  data-oid="ueanyis"
                >
                  SELL
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup} data-oid="ft.i-dm">
            <Text style={styles.inputLabel} data-oid="5ckyu9_">
              Order Type
            </Text>
            <View style={styles.orderTypeSelector} data-oid="8hi3slr">
              <TouchableOpacity
                style={[
                  styles.orderTypeButton,
                  orderType === 'MARKET' && styles.orderTypeButtonActive,
                ]}
                onPress={() => setOrderType('MARKET')}
                data-oid="15jj0k9"
              >
                <Text
                  style={[
                    styles.orderTypeText,
                    orderType === 'MARKET' && styles.orderTypeTextActive,
                  ]}
                  data-oid="ky:mkmd"
                >
                  Market
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.orderTypeButton,
                  orderType === 'LIMIT' && styles.orderTypeButtonActive,
                ]}
                onPress={() => setOrderType('LIMIT')}
                data-oid="wm4asla"
              >
                <Text
                  style={[
                    styles.orderTypeText,
                    orderType === 'LIMIT' && styles.orderTypeTextActive,
                  ]}
                  data-oid="iro1wii"
                >
                  Limit
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup} data-oid="3gt2def">
            <Text style={styles.inputLabel} data-oid="v34pe.2">
              Amount
            </Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="0.1"
              placeholderTextColor="#6B7280"
              keyboardType="numeric"
              data-oid="pzmu_hy"
            />
          </View>

          {orderType === 'LIMIT' && (
            <View style={styles.inputGroup} data-oid="qhho0_c">
              <Text style={styles.inputLabel} data-oid="jxs1rsw">
                Price
              </Text>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="70000"
                placeholderTextColor="#6B7280"
                keyboardType="numeric"
                data-oid="eef.cn0"
              />
            </View>
          )}

          <View style={styles.estimateContainer} data-oid="z:g:l:_">
            <Text style={styles.estimateLabel} data-oid="otoxemz">
              Estimated Total
            </Text>
            <Text style={styles.estimateValue} data-oid="towa-qf">
              $
              {amount && orderType === 'MARKET'
                ? (parseFloat(amount || '0') * 71200).toLocaleString()
                : '--'}
            </Text>
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
  tradeButton: {
    backgroundColor: '#10B981',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    borderRadius: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    paddingVertical: 12,
  },
  filterButton: {
    backgroundColor: '#374151',
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#10B981',
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  tabTextActive: {
    color: '#10B981',
  },
  tradesList: {
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
  modalExecute: {
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
  symbolSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  symbolButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#374151',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  symbolButtonActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  symbolText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#9CA3AF',
  },
  symbolTextActive: {
    color: '#FFFFFF',
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#374151',
    borderRadius: 12,
    gap: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  buyButtonActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  sellButtonActive: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  typeText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#9CA3AF',
  },
  typeTextActive: {
    color: '#FFFFFF',
  },
  orderTypeSelector: {
    flexDirection: 'row',
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 4,
  },
  orderTypeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  orderTypeButtonActive: {
    backgroundColor: '#10B981',
  },
  orderTypeText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#9CA3AF',
  },
  orderTypeTextActive: {
    color: '#FFFFFF',
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
  estimateContainer: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  estimateLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  estimateValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});
