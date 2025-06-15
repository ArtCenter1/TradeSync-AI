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
      data-oid="qq3c4yx"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Portfolio',
          tabBarIcon: ({ size, color }) => (
            <TrendingUp size={size} color={color} data-oid="x5lwj.u" />
          ),
        }}
        data-oid="vnd7lbq"
      />

      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ size, color }) => (
            <Bell size={size} color={color} data-oid="7.dvhwg" />
          ),
        }}
        data-oid="o8b.4r8"
      />

      <Tabs.Screen
        name="trading"
        options={{
          title: 'Trading',
          tabBarIcon: ({ size, color }) => (
            <Activity size={size} color={color} data-oid="lakcjkr" />
          ),
        }}
        data-oid="bcjafge"
      />

      <Tabs.Screen
        name="strategies"
        options={{
          title: 'Strategies',
          tabBarIcon: ({ size, color }) => (
            <Brain size={size} color={color} data-oid="jqb5pp_" />
          ),
        }}
        data-oid="vcz1bk2"
      />

      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ size, color }) => (
            <BarChart3 size={size} color={color} data-oid="x9sg_ke" />
          ),
        }}
        data-oid="b-pmx40"
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} data-oid="gl7::bs" />
          ),
        }}
        data-oid="1z_fmgg"
      />
    </Tabs>
  );
}
