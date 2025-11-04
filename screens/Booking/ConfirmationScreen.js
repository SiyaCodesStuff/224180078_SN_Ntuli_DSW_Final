import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ConfirmationScreen({ route, navigation }) {
  const { hotel, checkIn, checkOut, rooms, total } = route.params;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Confirmed! 🎉</Text>
      <Text style={styles.subtitle}>You've successfully booked:</Text>

      <View style={styles.card}>
        <Text style={styles.hotelName}>{hotel.name}</Text>
        <Text style={styles.detail}>📍 {hotel.location}</Text>
        <Text style={styles.detail}>📅 Check-in: {formatDate(checkIn)}</Text>
        <Text style={styles.detail}>📅 Check-out: {formatDate(checkOut)}</Text>
        <Text style={styles.detail}>🛏️ Rooms: {rooms}</Text>
        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
      </View>

      <Text style={styles.note}>
        Your booking has been saved to your profile. You can view it anytime in the "My Bookings" section.
      </Text>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('ExploreScreen')}>
        <Text style={styles.buttonText}>Back to Explore</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.profileButtonText}>View My Bookings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#2E86DE', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 20, textAlign: 'center' },
  card: {
    backgroundColor: '#f0f8ff',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  hotelName: { fontSize: 20, fontWeight: 'bold', color: '#2E86DE', marginBottom: 5 },
  detail: { fontSize: 16, color: '#444', marginBottom: 5 },
  total: { marginTop: 10, fontSize: 18, color: '#000', fontWeight: '600' },
  note: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20, fontStyle: 'italic' },
  homeButton: { backgroundColor: '#2E86DE', padding: 15, borderRadius: 10, width: '100%', marginBottom: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 18 },
  profileButton: { backgroundColor: 'transparent', padding: 15, borderRadius: 10, width: '100%', borderWidth: 1, borderColor: '#2E86DE' },
  profileButtonText: { color: '#2E86DE', textAlign: 'center', fontSize: 16 },
});