import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Onboarding1({ navigation, onComplete }) {
  const skipOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      console.log('Onboarding skipped - AsyncStorage updated');
      
      onComplete();
      
    } catch (error) {
      console.error('Error skipping onboarding:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/onboarding/onboarding1.png')} style={styles.image} />
      <Text style={styles.title}>Discover Beautiful Hotels</Text>
      <Text style={styles.subtitle}>
        Explore amazing destinations and find the perfect stay for your vacation.
      </Text>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('Onboarding2')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={skipOnboarding}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  image: { width: 300, height: 300, resizeMode: 'contain' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2E86DE', marginTop: 30 },
  subtitle: { fontSize: 16, textAlign: 'center', color: '#555', marginTop: 10 },
  nextButton: { backgroundColor: '#2E86DE', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 30, marginTop: 30 },
  buttonText: { color: '#fff', fontSize: 18 },
  skipText: { color: '#777', fontSize: 14, marginTop: 15 },
});