import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import OnboardingStack from './navigation/OnboardingStack';
import AuthStack from './navigation/AuthStack';

export default function App() {
  const [firstLaunch, setFirstLaunch] = useState(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      setFirstLaunch(hasSeenOnboarding === null);
    };
    checkOnboardingStatus();
  }, []);

  if (firstLaunch === null) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#2E86DE" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {firstLaunch ? <OnboardingStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
