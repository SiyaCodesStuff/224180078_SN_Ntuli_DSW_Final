import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreStack from './ExploreStack';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import DealsScreen from '../screens/deals/DealsScreen'; // Fixed case sensitivity
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2E86DE',
        tabBarInactiveTintColor: '#777',
        tabBarStyle: { backgroundColor: '#fff', paddingBottom: 5 },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Explore') iconName = 'home-outline';
          else if (route.name === 'Deals') iconName = 'pricetag-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Explore" component={ExploreStack} />
      <Tab.Screen 
        name="Deals" 
        component={DealsScreen}
        options={{ title: 'Special Deals' }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}