import { Tabs } from 'expo-router';
import {
  TrendingUp,
  Bell,
  Activity,
  BarChart3,
  Settings,
  Brain,
} from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1F2937',
          borderTopColor: '#374151',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: 'Inter-Medium',
          marginTop: 4,
        },
      }}
      data-oid="h8ik603"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Portfolio',
          tabBarIcon: ({ size, color }) => (
            <TrendingUp size={size} color={color} data-oid="8qh-a83" />
          ),
        }}
        data-oid="d6eepom"
      />

      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ size, color }) => (
            <Bell size={size} color={color} data-oid="7sdbl21" />
          ),
        }}
        data-oid="ul6rccg"
      />

      <Tabs.Screen
        name="trading"
        options={{
          title: 'Trading',
          tabBarIcon: ({ size, color }) => (
            <Activity size={size} color={color} data-oid="8ua41uf" />
          ),
        }}
        data-oid="extgri8"
      />

      <Tabs.Screen
        name="strategies"
        options={{
          title: 'Strategies',
          tabBarIcon: ({ size, color }) => (
            <Brain size={size} color={color} data-oid="th36bm2" />
          ),
        }}
        data-oid="dsyy1pc"
      />

      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ size, color }) => (
            <BarChart3 size={size} color={color} data-oid="cc17vrp" />
          ),
        }}
        data-oid="5oize9o"
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} data-oid="b.3il05" />
          ),
        }}
        data-oid="ovkmvq6"
      />
    </Tabs>
  );
}
