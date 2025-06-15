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
    <View style={styles.container} data-oid="nlk5o5o">
      <View style={styles.header} data-oid="smconky">
        <View style={styles.titleContainer} data-oid="bt68wzv">
          <Filter size={16} color="#9CA3AF" data-oid="y_qpp9t" />
          <Text style={styles.title} data-oid=":wutau8">
            Filters
          </Text>
        </View>
        {hasActiveFilters && (
          <TouchableOpacity
            onPress={onClear}
            style={styles.clearButton}
            data-oid="--t7jey"
          >
            <X size={16} color="#9CA3AF" data-oid="vw8iqh9" />
            <Text style={styles.clearText} data-oid="3_50:.q">
              Clear
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        data-oid="gdi:-y6"
      >
        <View style={styles.filtersContainer} data-oid="kgbs6fh">
          {/* Risk Level Filters */}
          <View style={styles.filterGroup} data-oid="cwtemfb">
            <Text style={styles.filterGroupTitle} data-oid="x3mg7r8">
              Risk Level
            </Text>
            <View style={styles.filterOptions} data-oid=".0lh3:f">
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
                  data-oid="jvybstm"
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filters.riskLevel === risk.value && { color: risk.color },
                    ]}
                    data-oid="6bkm2z-"
                  >
                    {risk.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Timeframe Filters */}
          <View style={styles.filterGroup} data-oid="prtg_au">
            <Text style={styles.filterGroupTitle} data-oid="yiw9b2v">
              Timeframe
            </Text>
            <View style={styles.filterOptions} data-oid="5067l27">
              {TIMEFRAMES.map((tf) => (
                <TouchableOpacity
                  key={tf.value}
                  style={[
                    styles.filterOption,
                    filters.timeframe === tf.value && styles.filterOptionActive,
                  ]}
                  onPress={() => handleTimeframeChange(tf.value)}
                  data-oid="sw2nis3"
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filters.timeframe === tf.value &&
                        styles.filterOptionActiveText,
                    ]}
                    data-oid="4dpsxoo"
                  >
                    {tf.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Category Filters */}
          <View style={styles.filterGroup} data-oid="vu3hi6v">
            <Text style={styles.filterGroupTitle} data-oid="91j.2i4">
              Category
            </Text>
            <View style={styles.filterOptions} data-oid="n0m:2ub">
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.value}
                  style={[
                    styles.filterOption,
                    filters.category === cat.value && styles.filterOptionActive,
                  ]}
                  onPress={() => handleCategoryChange(cat.value)}
                  data-oid="u.1nthg"
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filters.category === cat.value &&
                        styles.filterOptionActiveText,
                    ]}
                    data-oid="n5kif3e"
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
