import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Filter, X } from 'lucide-react-native';
import { StrategyFilters as FiltersType } from '../types';

interface StrategyFiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
  onClear: () => void;
}

const RISK_LEVELS = [
  { value: 'low', label: 'Low Risk', color: '#10B981' },
  { value: 'medium', label: 'Medium Risk', color: '#F59E0B' },
  { value: 'high', label: 'High Risk', color: '#EF4444' },
];

const TIMEFRAMES = [
  { value: '1m', label: '1m' },
  { value: '5m', label: '5m' },
  { value: '15m', label: '15m' },
  { value: '30m', label: '30m' },
  { value: '1h', label: '1h' },
  { value: '4h', label: '4h' },
  { value: '1d', label: '1d' },
];

const CATEGORIES = [
  { value: 'momentum', label: 'Momentum' },
  { value: 'trend-following', label: 'Trend Following' },
  { value: 'breakout', label: 'Breakout' },
  { value: 'mean-reversion', label: 'Mean Reversion' },
  { value: 'scalping', label: 'Scalping' },
];

export default function StrategyFilters({
  filters,
  onFiltersChange,
  onClear,
}: StrategyFiltersProps) {
  const hasActiveFilters =
    filters.riskLevel || filters.timeframe || filters.category;

  const handleRiskLevelChange = (riskLevel: 'low' | 'medium' | 'high') => {
    onFiltersChange({
      ...filters,
      riskLevel: filters.riskLevel === riskLevel ? undefined : riskLevel,
    });
  };

  const handleTimeframeChange = (timeframe: string) => {
    onFiltersChange({
      ...filters,
      timeframe: filters.timeframe === timeframe ? undefined : timeframe,
    });
  };

  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      ...filters,
      category: filters.category === category ? undefined : category,
    });
  };

  return (
    <View style={styles.container} data-oid="d-88wg4">
      <View style={styles.header} data-oid=":wha44i">
        <View style={styles.titleContainer} data-oid="s6huz.g">
          <Filter size={16} color="#9CA3AF" data-oid="p7dlwdj" />
          <Text style={styles.title} data-oid="oynyliw">
            Filters
          </Text>
        </View>
        {hasActiveFilters && (
          <TouchableOpacity
            onPress={onClear}
            style={styles.clearButton}
            data-oid="b4b3nfa"
          >
            <X size={16} color="#9CA3AF" data-oid="yacrw5e" />
            <Text style={styles.clearText} data-oid="8ob4s_a">
              Clear
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        data-oid="9t699pt"
      >
        <View style={styles.filtersContainer} data-oid="h96w54:">
          {/* Risk Level Filters */}
          <View style={styles.filterGroup} data-oid="m-:lqa0">
            <Text style={styles.filterGroupTitle} data-oid="ojl2st9">
              Risk Level
            </Text>
            <View style={styles.filterOptions} data-oid="79mw:y7">
              {RISK_LEVELS.map((risk) => (
                <TouchableOpacity
                  key={risk.value}
                  style={[
                    styles.filterOption,
                    filters.riskLevel === risk.value && [
                      styles.filterOptionActive,
                      { borderColor: risk.color },
                    ],
                  ]}
                  onPress={() =>
                    handleRiskLevelChange(
                      risk.value as 'low' | 'medium' | 'high',
                    )
                  }
                  data-oid="1fyu8p_"
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filters.riskLevel === risk.value && { color: risk.color },
                    ]}
                    data-oid="_4r._gh"
                  >
                    {risk.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Timeframe Filters */}
          <View style={styles.filterGroup} data-oid="hbo790n">
            <Text style={styles.filterGroupTitle} data-oid="g3hc2wd">
              Timeframe
            </Text>
            <View style={styles.filterOptions} data-oid="i084qg0">
              {TIMEFRAMES.map((tf) => (
                <TouchableOpacity
                  key={tf.value}
                  style={[
                    styles.filterOption,
                    filters.timeframe === tf.value && styles.filterOptionActive,
                  ]}
                  onPress={() => handleTimeframeChange(tf.value)}
                  data-oid="_-9yqdb"
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filters.timeframe === tf.value &&
                        styles.filterOptionActiveText,
                    ]}
                    data-oid="r:8--h3"
                  >
                    {tf.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Category Filters */}
          <View style={styles.filterGroup} data-oid="b1f_:ee">
            <Text style={styles.filterGroupTitle} data-oid="xn.6dkr">
              Category
            </Text>
            <View style={styles.filterOptions} data-oid="p-m.u7c">
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.value}
                  style={[
                    styles.filterOption,
                    filters.category === cat.value && styles.filterOptionActive,
                  ]}
                  onPress={() => handleCategoryChange(cat.value)}
                  data-oid="fuei3h9"
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filters.category === cat.value &&
                        styles.filterOptionActiveText,
                    ]}
                    data-oid=":i6zenc"
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  clearText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  scrollView: {
    marginHorizontal: -16,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  filterGroup: {
    marginBottom: 16,
  },
  filterGroupTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
    marginBottom: 8,
    fontFamily: 'Inter-Medium',
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#374151',
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  filterOptionActive: {
    backgroundColor: '#111827',
    borderColor: '#10B981',
  },
  filterOptionText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  filterOptionActiveText: {
    color: '#10B981',
  },
});
