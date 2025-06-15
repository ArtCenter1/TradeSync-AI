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
      data-oid="q9emx:o"
    >
      <View style={styles.header} data-oid="-g5xx_r">
        <View style={styles.symbolContainer} data-oid="px0x6cq">
          <View
            style={[styles.typeIndicator, { backgroundColor: typeColor }]}
            data-oid="osdn1zw"
          >
            {isBuy ? (
              <TrendingUp size={14} color="#FFFFFF" data-oid="dp63bm4" />
            ) : (
              <TrendingDown size={14} color="#FFFFFF" data-oid="xtj5irx" />
            )}
          </View>
          <View data-oid="0s2re85">
            <Text style={styles.symbol} data-oid="3kgihl8">
              {symbol}
            </Text>
            <Text style={styles.type} data-oid="n_ay4ut">
              {type} SIGNAL
            </Text>
          </View>
        </View>

        <View style={styles.statusContainer} data-oid="2kka_pk">
          <View
            style={[
              styles.statusIndicator,
              { backgroundColor: isActive ? '#10B981' : '#6B7280' },
            ]}
            data-oid="6k-tolv"
          />

          <TouchableOpacity onPress={() => onOptions(id)} data-oid="9q85fi0">
            <MoreHorizontal size={20} color="#9CA3AF" data-oid="pnnrsp1" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.conditionContainer} data-oid="5g.:xn:">
        <Text style={styles.conditionLabel} data-oid="5svt03f">
          Condition
        </Text>
        <Text style={styles.condition} data-oid="7rpq31d">
          {condition}
        </Text>
      </View>

      <View style={styles.priceContainer} data-oid="adeh2_4">
        <View style={styles.priceRow} data-oid="q4su1bg">
          <Text style={styles.priceLabel} data-oid="f83gpap">
            Target
          </Text>
          <Text style={styles.targetPrice} data-oid="dc3ut3h">
            ${targetPrice.toLocaleString()}
          </Text>
        </View>
        <View style={styles.priceRow} data-oid="-93vceu">
          <Text style={styles.priceLabel} data-oid="897-kxj">
            Current
          </Text>
          <Text style={styles.currentPrice} data-oid="7rguksm">
            ${currentPrice.toLocaleString()}
          </Text>
        </View>
      </View>

      {!isTriggered && (
        <View style={styles.progressContainer} data-oid="63jv5u2">
          <View style={styles.progressBar} data-oid="fieqozq">
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%`, backgroundColor: typeColor },
              ]}
              data-oid="3o1bfna"
            />
          </View>
          <Text style={styles.progressText} data-oid="_xle6z-">
            {progress.toFixed(1)}%
          </Text>
        </View>
      )}

      {isTriggered && (
        <View style={styles.triggeredContainer} data-oid="_2jk9vh">
          <Bell size={16} color="#10B981" data-oid="-fsx74_" />
          <Text style={styles.triggeredText} data-oid="1_cx8y0">
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
