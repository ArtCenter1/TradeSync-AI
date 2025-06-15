import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  RefreshControl,
  Modal,
} from 'react-native';
import {
  Search,
  MessageCircle,
  Brain,
  Copy,
  CheckCircle,
} from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import { mockStrategies } from '@/features/strategy-management/data/mockStrategies';
import {
  Strategy,
  StrategyFilters as StrategyFiltersType,
} from '@/features/strategy-management/types';
import StrategyCard from '@/features/strategy-management/components/StrategyCard';
import StrategyFilters from '@/features/strategy-management/components/StrategyFilters';
import StrategyDetailModal from '@/features/strategy-management/components/StrategyDetailModal';
import AIChat from '@/features/strategy-management/components/AIChat';

export default function StrategiesScreen() {
  const [strategies, setStrategies] = useState<Strategy[]>(mockStrategies);
  const [filteredStrategies, setFilteredStrategies] =
    useState<Strategy[]>(mockStrategies);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<StrategyFiltersType>({});
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(
    null,
  );
  const [showAIChat, setShowAIChat] = useState(false);
  const [copiedScript, setCopiedScript] = useState<string | null>(null);

  const applyFilters = useCallback(() => {
    let filtered = strategies;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (strategy) =>
          strategy.name.toLowerCase().includes(query) ||
          strategy.description.toLowerCase().includes(query) ||
          strategy.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          strategy.category.toLowerCase().includes(query),
      );
    }

    // Apply risk level filter
    if (filters.riskLevel) {
      filtered = filtered.filter(
        (strategy) => strategy.riskLevel === filters.riskLevel,
      );
    }

    // Apply timeframe filter
    if (filters.timeframe) {
      filtered = filtered.filter((strategy) =>
        strategy.timeframe.includes(filters.timeframe!),
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter((strategy) =>
        strategy.category
          .toLowerCase()
          .includes(filters.category!.toLowerCase()),
      );
    }

    setFilteredStrategies(filtered);
  }, [strategies, searchQuery, filters]);

  React.useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, []);

  const handleStrategyPress = (strategy: Strategy) => {
    setSelectedStrategy(strategy);
  };

  const handleCopyScript = async (script: string) => {
    try {
      await Clipboard.setStringAsync(script);
      setCopiedScript(script);
      Alert.alert('Success', 'Pine Script copied to clipboard!');

      // Clear the copied indicator after 2 seconds
      setTimeout(() => setCopiedScript(null), 2000);
    } catch (error) {
      Alert.alert('Error', 'Failed to copy script to clipboard');
    }
  };

  const handleFiltersChange = (newFilters: StrategyFiltersType) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  const getFilteredCount = () => {
    return filteredStrategies.length;
  };

  return (
    <View style={styles.container} data-oid="5-bpy44">
      {/* Header */}
      <View style={styles.header} data-oid="2.t24r.">
        <View data-oid="wbxei73">
          <Text style={styles.title} data-oid="rot_gvf">
            Trading Strategies
          </Text>
          <Text style={styles.subtitle} data-oid=":xh9k_y">
            {getFilteredCount()} of {strategies.length} strategies
          </Text>
        </View>
        <TouchableOpacity
          style={styles.aiChatButton}
          onPress={() => setShowAIChat(true)}
          data-oid="vux-f3b"
        >
          <Brain size={20} color="#FFFFFF" data-oid="tdcelza" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer} data-oid="nw-fbwu">
        <Search size={20} color="#9CA3AF" data-oid="zsvjq9p" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search strategies, tags, or categories..."
          placeholderTextColor="#6B7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
          data-oid="py9mshv"
        />
      </View>

      {/* Filters */}
      <StrategyFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClear={handleClearFilters}
        data-oid="749jv_9"
      />

      {/* Strategy List */}
      <ScrollView
        style={styles.strategiesList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#10B981"
            data-oid="kkpdi99"
          />
        }
        showsVerticalScrollIndicator={false}
        data-oid="cpp6y45"
      >
        {filteredStrategies.length === 0 ? (
          <View style={styles.emptyState} data-oid="anbaijj">
            <Brain size={48} color="#4B5563" data-oid="p_tlm8-" />
            <Text style={styles.emptyTitle} data-oid="5dlthlo">
              No strategies found
            </Text>
            <Text style={styles.emptyDescription} data-oid="yf9l--3">
              Try adjusting your search or filters to find strategies
            </Text>
            <TouchableOpacity
              style={styles.aiSuggestButton}
              onPress={() => setShowAIChat(true)}
              data-oid="x.sic:-"
            >
              <MessageCircle size={16} color="#FFFFFF" data-oid="h98lims" />
              <Text style={styles.aiSuggestText} data-oid="nnpt.s8">
                Ask AI for recommendations
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredStrategies.map((strategy) => (
            <StrategyCard
              key={strategy.id}
              strategy={strategy}
              onPress={handleStrategyPress}
              onCopy={handleCopyScript}
              data-oid="3.q5vyd"
            />
          ))
        )}

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} data-oid="ok7u4ha" />
      </ScrollView>

      {/* Strategy Detail Modal */}
      {selectedStrategy && (
        <StrategyDetailModal
          strategy={selectedStrategy}
          visible={!!selectedStrategy}
          onClose={() => setSelectedStrategy(null)}
          onCopy={handleCopyScript}
          data-oid="6ee6i.s"
        />
      )}

      {/* AI Chat Modal */}
      <Modal
        visible={showAIChat}
        animationType="slide"
        presentationStyle="fullScreen"
        data-oid="rszcc7c"
      >
        <AIChat
          isVisible={showAIChat}
          onClose={() => setShowAIChat(false)}
          strategies={strategies}
          onStrategyRecommend={handleStrategyPress}
          data-oid="h2:w:ek"
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  aiChatButton: {
    backgroundColor: '#10B981',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
  },
  strategiesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
    fontFamily: 'Inter-SemiBold',
  },
  emptyDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
    fontFamily: 'Inter-Regular',
  },
  aiSuggestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  aiSuggestText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  bottomSpacing: {
    height: 100,
  },
});
