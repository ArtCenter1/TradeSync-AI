import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';

interface PriceCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: string;
}

export default function PriceCard({
  symbol,
  name,
  price,
  change,
  changePercent,
  volume,
}: PriceCardProps) {
  const isPositive = change >= 0;
  const changeColor = isPositive ? '#10B981' : '#EF4444';

  return (
    <View style={styles.container} data-oid="cazwj9w">
      <View style={styles.header} data-oid="u_4oc-f">
        <View style={styles.symbolContainer} data-oid="z3zdkgu">
          <Text style={styles.symbol} data-oid="zzx8non">
            {symbol}
          </Text>
          <Text style={styles.name} data-oid="h6di3lk">
            {name}
          </Text>
        </View>
        <View
          style={[
            styles.changeContainer,
            { backgroundColor: changeColor + '20' },
          ]}
          data-oid="xmi-o-c"
        >
          {isPositive ? (
            <TrendingUp size={16} color={changeColor} data-oid="swvoa0_" />
          ) : (
            <TrendingDown size={16} color={changeColor} data-oid="a.pppm1" />
          )}
          <Text
            style={[styles.changePercent, { color: changeColor }]}
            data-oid="l4hqvt8"
          >
            {changePercent.toFixed(2)}%
          </Text>
        </View>
      </View>

      <View style={styles.priceContainer} data-oid="_1xkhyb">
        <Text style={styles.price} data-oid="lya3gyi">
          ${price.toLocaleString()}
        </Text>
        <Text
          style={[styles.change, { color: changeColor }]}
          data-oid="ehx6i26"
        >
          {isPositive ? '+' : ''}${change.toFixed(2)}
        </Text>
      </View>

      {volume && (
        <Text style={styles.volume} data-oid="g.mbgom">
          Vol: {volume}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#374151',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  symbolContainer: {
    flex: 1,
  },
  symbol: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  name: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  changePercent: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  change: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  volume: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});
