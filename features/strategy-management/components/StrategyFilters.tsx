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
    <View style={styles.container} data-oid="c9dnp2z">
      <View style={styles.header} data-oid="rx9i453">
        <View style={styles.titleContainer} data-oid="e_h80oe">
          <Filter size={16} color="#9CA3AF" data-oid="-nv3fl:" />
          <Text style={styles.title} data-oid="9-y9tv.">
            Filters
          </Text>
        </View>
        {hasActiveFilters && (
          <TouchableOpacity
            onPress={onClear}
            style={styles.clearButton}
            data-oid="xgrz366"
          >
            <X size={16} color="#9CA3AF" data-oid="o2ih6:9" />
            <Text style={styles.clearText} data-oid="v8u662q">
              Clear
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        data-oid="hpmj9ki"
      >
        <View style={styles.filtersContainer} data-oid="73st-dn">
          {/* Risk Level Filters */}
          <View style={styles.filterGroup} data-oid="u24v_73">
            <Text style={styles.filterGroupTitle} data-oid="3f03hzv">
              Risk Level
            </Text>
            <View style={styles.filterOptions} data-oid="m18wz8l">
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
                  data-oid="x.jc36j"
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filters.riskLevel === risk.value && { color: risk.color },
                    ]}
                    data-oid="upbwdr."
                  >
                    {risk.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Timeframe Filters */}
          <View style={styles.filterGroup} data-oid="mq4b7v1">
            <Text style={styles.filterGroupTitle} data-oid="lqi8g.c">
              Timeframe
            </Text>
            <View style={styles.filterOptions} data-oid="za2p1:m">
              {TIMEFRAMES.map((tf) => (
                <TouchableOpacity
                  key={tf.value}
                  style={[
                    styles.filterOption,
                    filters.timeframe === tf.value && styles.filterOptionActive,
                  ]}
                  onPress={() => handleTimeframeChange(tf.value)}
                  data-oid="q66kgjy"
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filters.timeframe === tf.value &&
                        styles.filterOptionActiveText,
                    ]}
                    data-oid="70xufi1"
                  >
                    {tf.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Category Filters */}
          <View style={styles.filterGroup} data-oid="5fo_ctp">
            <Text style={styles.filterGroupTitle} data-oid="cbydo-v">
              Category
            </Text>
            <View style={styles.filterOptions} data-oid="loiol29">
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.value}
                  style={[
                    styles.filterOption,
                    filters.category === cat.value && styles.filterOptionActive,
                  ]}
                  onPress={() => handleCategoryChange(cat.value)}
                  data-oid="-tcicr_"
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filters.category === cat.value &&
                        styles.filterOptionActiveText,
                    ]}
                    data-oid="pb:z2fm"
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
