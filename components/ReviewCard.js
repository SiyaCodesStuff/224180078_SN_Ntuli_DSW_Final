import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ReviewCard({ review }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={30} color="#2E86DE" />
        <Text style={styles.name}>{review.name}</Text>
      </View>
      <View style={styles.ratingRow}>
        {[...Array(review.rating)].map((_, i) => (
          <Ionicons key={i} name="star" size={16} color="#FFD700" />
        ))}
      </View>
      <Text style={styles.text}>{review.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  name: { marginLeft: 8, fontWeight: '600', color: '#333' },
  ratingRow: { flexDirection: 'row', marginBottom: 4 },
  text: { color: '#555', fontSize: 14, lineHeight: 18 },
});

