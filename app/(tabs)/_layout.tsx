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
      data-oid="cek77tl"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Portfolio',
          tabBarIcon: ({ size, color }) => (
            <TrendingUp size={size} color={color} data-oid="805qa-s" />
          ),
        }}
        data-oid="6i66vay"
      />

      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ size, color }) => (
            <Bell size={size} color={color} data-oid="7-nrwem" />
          ),
        }}
        data-oid=":k78igj"
      />

      <Tabs.Screen
        name="trading"
        options={{
          title: 'Trading',
          tabBarIcon: ({ size, color }) => (
            <Activity size={size} color={color} data-oid="8efi8:b" />
          ),
        }}
        data-oid="1q0wipn"
      />

      <Tabs.Screen
        name="strategies"
        options={{
          title: 'Strategies',
          tabBarIcon: ({ size, color }) => (
            <Brain size={size} color={color} data-oid="yhxxtk-" />
          ),
        }}
        data-oid="53sksql"
      />

      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ size, color }) => (
            <BarChart3 size={size} color={color} data-oid="6j6xv:s" />
          ),
        }}
        data-oid="-plh3d8"
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} data-oid="u5ic6o2" />
          ),
        }}
        data-oid="-i:crvm"
      />
    </Tabs>
  );
}
