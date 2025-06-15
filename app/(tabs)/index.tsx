import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import {
  TrendingUp,
  Plus,
  Activity,
  RefreshCw,
  Zap,
} from 'lucide-react-native';
import PortfolioSummary from '@/components/PortfolioSummary';
import PriceCard from '@/components/PriceCard';
import AutoTradeMonitor from '@/components/AutoTradeMonitor';

const { width } = Dimensions.get('window');

interface Holding {
  symbol: string;
  name: string;
  amount: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  pnl: number;
  pnlPercent: number;
}

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

export default function PortfolioScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [showAutoTradeMonitor, setShowAutoTradeMonitor] = useState(false);
  const [holdings, setHoldings] = useState<Holding[]>([
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 0.5432,
      avgPrice: 67500,
      currentPrice: 71200,
      value: 38679.04,
      pnl: 2009.04,
      pnlPercent: 5.48,
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 8.25,
      avgPrice: 3850,
      currentPrice: 4125,
      value: 34031.25,
      pnl: 2268.75,
      pnlPercent: 7.14,
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      amount: 125,
      avgPrice: 185,
      currentPrice: 210,
      value: 26250,
      pnl: 3125,
      pnlPercent: 13.51,
    },
    {
      symbol: 'ADA',
      name: 'Cardano',
      amount: 2500,
      avgPrice: 0.82,
      currentPrice: 0.95,
      value: 2375,
      pnl: 325,
      pnlPercent: 15.85,
    },
  ]);

  const [watchlist] = useState<MarketData[]>([
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 71200,
      change: 1850,
      changePercent: 2.67,
      volume: '23.8B',
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 4125,
      change: -125,
      changePercent: -2.94,
      volume: '12.4B',
    },
    {
      symbol: 'BNB',
      name: 'BNB',
      price: 685,
      change: 25,
      changePercent: 3.79,
      volume: '1.2B',
    },
    {
      symbol: 'XRP',
      name: 'Ripple',
      price: 2.15,
      change: -0.08,
      changePercent: -3.59,
      volume: '8.9B',
    },
  ]);

  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
  const totalPnL = holdings.reduce((sum, holding) => sum + holding.pnl, 0);
  const totalPnLPercent = (totalPnL / (totalValue - totalPnL)) * 100;
  const dayChange = totalValue * 0.0234; // Mock day change
  const dayChangePercent = 2.34;

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <View style={styles.container} data-oid="4d.5x-g">
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#10B981"
            data-oid="6-63_ah"
          />
        }
        showsVerticalScrollIndicator={false}
        data-oid="juabyu8"
      >
        <View style={styles.header} data-oid="yj5mlr-">
          <View data-oid="32lwfzx">
            <Text style={styles.greeting} data-oid="yyr-pus">
              Good morning
            </Text>
            <Text style={styles.title} data-oid="qy9_x91">
              Portfolio Overview
            </Text>
          </View>
          <View style={styles.headerActions} data-oid="bypy3li">
            <TouchableOpacity
              style={styles.autoTradeButton}
              onPress={() => setShowAutoTradeMonitor(true)}
              data-oid="6rb:6mm"
            >
              <Zap size={18} color="#10B981" data-oid="sqf.tdv" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.refreshButton} data-oid="p-d_55b">
              <RefreshCw size={20} color="#9CA3AF" data-oid="0tnp0op" />
            </TouchableOpacity>
          </View>
        </View>

        <PortfolioSummary
          totalValue={totalValue}
          dayChange={dayChange}
          dayChangePercent={dayChangePercent}
          totalPnL={totalPnL}
          activeAlerts={12}
          data-oid="vn6_vnj"
        />

        <View style={styles.section} data-oid="y58e5l1">
          <View style={styles.sectionHeader} data-oid="w223quc">
            <Text style={styles.sectionTitle} data-oid="ow-jn_6">
              Your Holdings
            </Text>
            <TouchableOpacity style={styles.addButton} data-oid="zxy-_d5">
              <Plus size={18} color="#10B981" data-oid="82ui_oe" />
              <Text style={styles.addButtonText} data-oid="ltp7yrq">
                Add
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.holdingsScroll}
            data-oid="_vlzhq4"
          >
            {holdings.map((holding, index) => (
              <View
                key={holding.symbol}
                style={[
                  styles.holdingCard,
                  { marginLeft: index === 0 ? 16 : 0 },
                ]}
                data-oid="i17of-l"
              >
                <View style={styles.holdingHeader} data-oid="s0ew847">
                  <Text style={styles.holdingSymbol} data-oid="91l9.gn">
                    {holding.symbol}
                  </Text>
                  <Text
                    style={[
                      styles.holdingPnL,
                      { color: holding.pnl >= 0 ? '#10B981' : '#EF4444' },
                    ]}
                    data-oid="..bk3gx"
                  >
                    {holding.pnl >= 0 ? '+' : ''}${holding.pnl.toFixed(2)}
                  </Text>
                </View>
                <Text style={styles.holdingName} data-oid="sddu.z:">
                  {holding.name}
                </Text>
                <Text style={styles.holdingAmount} data-oid="tb__e7y">
                  {holding.amount} {holding.symbol}
                </Text>
                <Text style={styles.holdingValue} data-oid="nscd.dd">
                  ${holding.value.toLocaleString()}
                </Text>
                <Text
                  style={[
                    styles.holdingPercent,
                    { color: holding.pnlPercent >= 0 ? '#10B981' : '#EF4444' },
                  ]}
                  data-oid="_r.smq8"
                >
                  {holding.pnlPercent >= 0 ? '+' : ''}
                  {holding.pnlPercent.toFixed(2)}%
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section} data-oid="ojb-oh-">
          <View style={styles.sectionHeader} data-oid="41l1q-y">
            <Text style={styles.sectionTitle} data-oid="wsge6yq">
              Market Watch
            </Text>
            <TouchableOpacity data-oid="w.nymy:">
              <Text style={styles.viewAllText} data-oid="itoaco-">
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.watchlistGrid} data-oid="hrks7q2">
            {watchlist.map((coin) => (
              <View
                key={coin.symbol}
                style={styles.watchlistItem}
                data-oid="s:pygwj"
              >
                <PriceCard
                  symbol={coin.symbol}
                  name={coin.name}
                  price={coin.price}
                  change={coin.change}
                  changePercent={coin.changePercent}
                  volume={coin.volume}
                  data-oid="d.faw4q"
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.quickActions} data-oid="547t1t-">
          <Text style={styles.sectionTitle} data-oid="cgpuvk4">
            Quick Actions
          </Text>
          <View style={styles.actionGrid} data-oid="to5ad3o">
            <TouchableOpacity style={styles.actionCard} data-oid="8ig8vvk">
              <Activity size={24} color="#10B981" data-oid=":m1l:64" />
              <Text style={styles.actionText} data-oid="m-js2hl">
                Start Trading
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => setShowAutoTradeMonitor(true)}
              data-oid="pmlyk-n"
            >
              <Zap size={24} color="#3B82F6" data-oid="sn3ahha" />
              <Text style={styles.actionText} data-oid="r-rk6av">
                Auto-Trades
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={showAutoTradeMonitor}
        animationType="slide"
        presentationStyle="fullScreen"
        data-oid="l7869xp"
      >
        <AutoTradeMonitor
          isVisible={showAutoTradeMonitor}
          onClose={() => setShowAutoTradeMonitor(false)}
          data-oid="00ysu__"
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  autoTradeButton: {
    backgroundColor: '#10B981' + '20',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshButton: {
    padding: 8,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  holdingsScroll: {
    paddingLeft: 0,
  },
  holdingCard: {
    backgroundColor: '#374151',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    width: 160,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  holdingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  holdingSymbol: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  holdingPnL: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  holdingName: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginBottom: 8,
  },
  holdingAmount: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  holdingValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  holdingPercent: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  watchlistGrid: {
    paddingHorizontal: 12,
  },
  watchlistItem: {
    marginBottom: 8,
  },
  quickActions: {
    margin: 16,
    marginTop: 24,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#374151',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});
