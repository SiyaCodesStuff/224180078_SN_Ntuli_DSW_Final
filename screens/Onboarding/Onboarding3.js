import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Onboarding3({ navigation, onComplete }) {
  const finishOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      console.log('Onboarding completed - AsyncStorage updated');
      
      onComplete();
      
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/onboarding/onboarding3.png')} style={styles.image} />
      <Text style={styles.title}>Enjoy Your Stay</Text>
      <Text style={styles.subtitle}>
        Read reviews, leave feedback, and make every trip memorable.
      </Text>
      <TouchableOpacity style={styles.startButton} onPress={finishOnboarding}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  image: { width: 300, height: 300, resizeMode: 'contain' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2E86DE', marginTop: 30 },
  subtitle: { fontSize: 16, textAlign: 'center', color: '#555', marginTop: 10 },
  startButton: { backgroundColor: '#2E86DE', paddingVertical: 14, paddingHorizontal: 50, borderRadius: 30, marginTop: 40 },
  buttonText: { color: '#fff', fontSize: 18 },
});