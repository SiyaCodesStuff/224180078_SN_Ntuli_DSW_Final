import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext, AuthProvider } from './context/AuthContext';
import OnboardingStack from './navigation/OnboardingStack';
import AuthStack from './navigation/AuthStack';
import AppTabs from './navigation/AppTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

function NavigationHandler() {
  const { user, loading } = useContext(AuthContext);
  const [firstLaunch, setFirstLaunch] = useState(null);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      await AsyncStorage.removeItem('hasSeenOnboarding');
      
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      console.log('App.js - Onboarding status:', hasSeenOnboarding);
      setFirstLaunch(hasSeenOnboarding === null);
      setOnboardingCompleted(hasSeenOnboarding === 'true');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setFirstLaunch(true);
    }
  };

  const handleOnboardingComplete = () => {
    setOnboardingCompleted(true);
  };

  if (loading || firstLaunch === null) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#2E86DE" />
      </View>
    );
  }

  console.log('App.js - Showing:', firstLaunch && !onboardingCompleted ? 'Onboarding' : (user ? 'AppTabs' : 'AuthStack'));

  if (firstLaunch && !onboardingCompleted) {
    return <OnboardingStack onComplete={handleOnboardingComplete} />;
  }

  return user ? <AppTabs /> : <AuthStack />;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <NavigationHandler />
      </NavigationContainer>
    </AuthProvider>
  );
}