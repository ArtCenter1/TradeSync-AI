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
      data-oid="0r:8cee"
    >
      <View style={styles.header} data-oid="ca.:xwr">
        <View style={styles.symbolContainer} data-oid="i:defc7">
          <View
            style={[styles.typeIndicator, { backgroundColor: typeColor }]}
            data-oid="i8kh:js"
          >
            {isBuy ? (
              <TrendingUp size={14} color="#FFFFFF" data-oid="b4e6n:v" />
            ) : (
              <TrendingDown size={14} color="#FFFFFF" data-oid="cof6f3d" />
            )}
          </View>
          <View data-oid="jmbs.az">
            <Text style={styles.symbol} data-oid="wrh0xws">
              {symbol}
            </Text>
            <Text style={styles.type} data-oid="k1l-mz_">
              {type} SIGNAL
            </Text>
          </View>
        </View>

        <View style={styles.statusContainer} data-oid="uc7sr3l">
          <View
            style={[
              styles.statusIndicator,
              { backgroundColor: isActive ? '#10B981' : '#6B7280' },
            ]}
            data-oid=".by5tzr"
          />

          <TouchableOpacity onPress={() => onOptions(id)} data-oid="4ebgv.r">
            <MoreHorizontal size={20} color="#9CA3AF" data-oid="tlug:bb" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.conditionContainer} data-oid="ak_w0sw">
        <Text style={styles.conditionLabel} data-oid="z3i2.:.">
          Condition
        </Text>
        <Text style={styles.condition} data-oid="44ezeb6">
          {condition}
        </Text>
      </View>

      <View style={styles.priceContainer} data-oid="idc0rr.">
        <View style={styles.priceRow} data-oid="vgqkl93">
          <Text style={styles.priceLabel} data-oid=".irw:j1">
            Target
          </Text>
          <Text style={styles.targetPrice} data-oid="6ibz_od">
            ${targetPrice.toLocaleString()}
          </Text>
        </View>
        <View style={styles.priceRow} data-oid="noavu1w">
          <Text style={styles.priceLabel} data-oid="5_24f1l">
            Current
          </Text>
          <Text style={styles.currentPrice} data-oid="zp2p9c2">
            ${currentPrice.toLocaleString()}
          </Text>
        </View>
      </View>

      {!isTriggered && (
        <View style={styles.progressContainer} data-oid="-0zx822">
          <View style={styles.progressBar} data-oid="b72.ar_">
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%`, backgroundColor: typeColor },
              ]}
              data-oid="s6c9e-a"
            />
          </View>
          <Text style={styles.progressText} data-oid="e4z:t7d">
            {progress.toFixed(1)}%
          </Text>
        </View>
      )}

      {isTriggered && (
        <View style={styles.triggeredContainer} data-oid="jk74jku">
          <Bell size={16} color="#10B981" data-oid="3kk9dl0" />
          <Text style={styles.triggeredText} data-oid="oesq916">
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
