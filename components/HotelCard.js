import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HotelCard({ hotel, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={hotel.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{hotel.name}</Text>
        <Text style={styles.location}>{hotel.location}</Text>
        <View style={styles.row}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{hotel.rating}</Text>
          <Text style={styles.price}>  •  ${hotel.price}/night</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: { width: '100%', height: 180 },
  info: { padding: 10 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#2E86DE' },
  location: { color: '#555', marginTop: 2 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  rating: { color: '#333', marginLeft: 4, fontWeight: '500' },
  price: { color: '#333', marginLeft: 4 },
});
