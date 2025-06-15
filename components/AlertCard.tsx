import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Bell,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
} from 'lucide-react-native';

interface AlertCardProps {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  condition: string;
  targetPrice: number;
  currentPrice: number;
  isActive: boolean;
  triggeredAt?: Date;
  onToggle: (id: string) => void;
  onOptions: (id: string) => void;
}

export default function AlertCard({
  id,
  symbol,
  type,
  condition,
  targetPrice,
  currentPrice,
  isActive,
  triggeredAt,
  onToggle,
  onOptions,
}: AlertCardProps) {
  const isBuy = type === 'BUY';
  const typeColor = isBuy ? '#10B981' : '#EF4444';
  const isTriggered = triggeredAt !== undefined;
  const progress = Math.min((currentPrice / targetPrice) * 100, 100);

  return (
    <TouchableOpacity
      style={[styles.container, { borderLeftColor: typeColor }]}
      onPress={() => onToggle(id)}
      data-oid="5k2:d20"
    >
      <View style={styles.header} data-oid="wc45h87">
        <View style={styles.symbolContainer} data-oid="7g5_s0n">
          <View
            style={[styles.typeIndicator, { backgroundColor: typeColor }]}
            data-oid="-7.eq1w"
          >
            {isBuy ? (
              <TrendingUp size={14} color="#FFFFFF" data-oid="tw7fo:t" />
            ) : (
              <TrendingDown size={14} color="#FFFFFF" data-oid="n:b5ft6" />
            )}
          </View>
          <View data-oid="0sl7f_c">
            <Text style={styles.symbol} data-oid="bfvz-db">
              {symbol}
            </Text>
            <Text style={styles.type} data-oid="s:l7-p1">
              {type} SIGNAL
            </Text>
          </View>
        </View>

        <View style={styles.statusContainer} data-oid="q3_t64s">
          <View
            style={[
              styles.statusIndicator,
              { backgroundColor: isActive ? '#10B981' : '#6B7280' },
            ]}
            data-oid="_507:e-"
          />

          <TouchableOpacity onPress={() => onOptions(id)} data-oid="4yi7dit">
            <MoreHorizontal size={20} color="#9CA3AF" data-oid="ah1jesm" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.conditionContainer} data-oid="seppvva">
        <Text style={styles.conditionLabel} data-oid="8619p3m">
          Condition
        </Text>
        <Text style={styles.condition} data-oid="iz11zyn">
          {condition}
        </Text>
      </View>

      <View style={styles.priceContainer} data-oid="xvmz:s9">
        <View style={styles.priceRow} data-oid="1kdahn2">
          <Text style={styles.priceLabel} data-oid="3ir5dya">
            Target
          </Text>
          <Text style={styles.targetPrice} data-oid="h3i.8n8">
            ${targetPrice.toLocaleString()}
          </Text>
        </View>
        <View style={styles.priceRow} data-oid="kxze9p4">
          <Text style={styles.priceLabel} data-oid="zq81y71">
            Current
          </Text>
          <Text style={styles.currentPrice} data-oid="f-e2mly">
            ${currentPrice.toLocaleString()}
          </Text>
        </View>
      </View>

      {!isTriggered && (
        <View style={styles.progressContainer} data-oid="o9e.ox5">
          <View style={styles.progressBar} data-oid="9y:olgo">
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%`, backgroundColor: typeColor },
              ]}
              data-oid="9-ag16y"
            />
          </View>
          <Text style={styles.progressText} data-oid="_mmf2ua">
            {progress.toFixed(1)}%
          </Text>
        </View>
      )}

      {isTriggered && (
        <View style={styles.triggeredContainer} data-oid="8ju8md.">
          <Bell size={16} color="#10B981" data-oid="-7plen_" />
          <Text style={styles.triggeredText} data-oid="jybrp_.">
            Triggered on {triggeredAt.toLocaleDateString()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#374151',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#4B5563',
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  symbolContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  typeIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  type: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  conditionContainer: {
    marginBottom: 12,
  },
  conditionLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginBottom: 4,
  },
  condition: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceRow: {
    alignItems: 'center',
    gap: 4,
  },
  priceLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  targetPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  currentPrice: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#4B5563',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#9CA3AF',
    minWidth: 40,
  },
  triggeredContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#10B981' + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  triggeredText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
  },
});
