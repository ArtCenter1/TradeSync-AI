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
      data-oid="2hrs8j_"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Portfolio',
          tabBarIcon: ({ size, color }) => (
            <TrendingUp size={size} color={color} data-oid="p_72vm8" />
          ),
        }}
        data-oid="ajdhi82"
      />

      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ size, color }) => (
            <Bell size={size} color={color} data-oid="jm5sgsg" />
          ),
        }}
        data-oid="cpijoze"
      />

      <Tabs.Screen
        name="trading"
        options={{
          title: 'Trading',
          tabBarIcon: ({ size, color }) => (
            <Activity size={size} color={color} data-oid="x0fie3z" />
          ),
        }}
        data-oid="clx_vki"
      />

      <Tabs.Screen
        name="strategies"
        options={{
          title: 'Strategies',
          tabBarIcon: ({ size, color }) => (
            <Brain size={size} color={color} data-oid="r49u8-:" />
          ),
        }}
        data-oid="hh7c3rb"
      />

      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ size, color }) => (
            <BarChart3 size={size} color={color} data-oid="mruzr_7" />
          ),
        }}
        data-oid="14mj_0w"
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} data-oid=".o23obz" />
          ),
        }}
        data-oid="a94isas"
      />
    </Tabs>
  );
}
