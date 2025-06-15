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
      data-oid="74q7o:v"
    >
      <View style={styles.header} data-oid="6sq34wz">
        <View style={styles.symbolContainer} data-oid="c4hydfb">
          <View
            style={[styles.typeIndicator, { backgroundColor: typeColor }]}
            data-oid="x1e6dsi"
          >
            {isBuy ? (
              <TrendingUp size={14} color="#FFFFFF" data-oid="tt3l85f" />
            ) : (
              <TrendingDown size={14} color="#FFFFFF" data-oid="_p:rax0" />
            )}
          </View>
          <View data-oid=":-8rwdv">
            <Text style={styles.symbol} data-oid="y:y-yb.">
              {symbol}
            </Text>
            <Text style={styles.type} data-oid="o:k79-0">
              {type} SIGNAL
            </Text>
          </View>
        </View>

        <View style={styles.statusContainer} data-oid="p:-9bdm">
          <View
            style={[
              styles.statusIndicator,
              { backgroundColor: isActive ? '#10B981' : '#6B7280' },
            ]}
            data-oid="zih1t_3"
          />

          <TouchableOpacity onPress={() => onOptions(id)} data-oid="97e-.8w">
            <MoreHorizontal size={20} color="#9CA3AF" data-oid="v2wsm56" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.conditionContainer} data-oid="j-ga52f">
        <Text style={styles.conditionLabel} data-oid="j97sa9r">
          Condition
        </Text>
        <Text style={styles.condition} data-oid="vf57diq">
          {condition}
        </Text>
      </View>

      <View style={styles.priceContainer} data-oid="w:73ih8">
        <View style={styles.priceRow} data-oid="p-f55uw">
          <Text style={styles.priceLabel} data-oid="2m1r7bc">
            Target
          </Text>
          <Text style={styles.targetPrice} data-oid="pjpakn9">
            ${targetPrice.toLocaleString()}
          </Text>
        </View>
        <View style={styles.priceRow} data-oid="tq6vd_x">
          <Text style={styles.priceLabel} data-oid="4-05h.8">
            Current
          </Text>
          <Text style={styles.currentPrice} data-oid="twaqp6g">
            ${currentPrice.toLocaleString()}
          </Text>
        </View>
      </View>

      {!isTriggered && (
        <View style={styles.progressContainer} data-oid="9.mftk3">
          <View style={styles.progressBar} data-oid=":06mua5">
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%`, backgroundColor: typeColor },
              ]}
              data-oid="18.iu5g"
            />
          </View>
          <Text style={styles.progressText} data-oid="pwq6.rs">
            {progress.toFixed(1)}%
          </Text>
        </View>
      )}

      {isTriggered && (
        <View style={styles.triggeredContainer} data-oid=":o2b00f">
          <Bell size={16} color="#10B981" data-oid="crs0vrq" />
          <Text style={styles.triggeredText} data-oid="87301nd">
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
