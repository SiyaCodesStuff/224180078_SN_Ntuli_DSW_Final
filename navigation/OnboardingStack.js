import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding1 from '../screens/Onboarding/Onboarding1';
import Onboarding2 from '../screens/Onboarding/Onboarding2';
import Onboarding3 from '../screens/Onboarding/Onboarding3';

const Stack = createStackNavigator();

export default function OnboardingStack({ onComplete }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding1">
        {(props) => <Onboarding1 {...props} onComplete={onComplete} />}
      </Stack.Screen>
      <Stack.Screen name="Onboarding2">
        {(props) => <Onboarding2 {...props} onComplete={onComplete} />}
      </Stack.Screen>
      <Stack.Screen name="Onboarding3">
        {(props) => <Onboarding3 {...props} onComplete={onComplete} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}