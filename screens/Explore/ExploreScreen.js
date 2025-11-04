import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import HotelCard from '../../components/HotelCard';

const hotelsData = [
  {
    id: '1',
    name: 'Seaside Paradise Resort',
    location: 'Cape Town, South Africa',
    rating: 4.8,
    price: 120,
    image: { uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' },
  },
  {
    id: '2',
    name: 'Mountain Escape Lodge',
    location: 'Drakensberg, South Africa',
    rating: 4.5,
    price: 95,
    image: { uri: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400' },
  },
  {
    id: '3',
    name: 'Urban Luxury Suites',
    location: 'Johannesburg, South Africa',
    rating: 4.7,
    price: 150,
    image: { uri: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400' },
  },
];

export default function ExploreScreen({ navigation }) {
  const [hotels, setHotels] = useState(hotelsData);
  const [sortBy, setSortBy] = useState('none');

  const sortHotels = (criteria) => {
    let sorted = [...hotels];
    if (criteria === 'price') sorted.sort((a, b) => a.price - b.price);
    else if (criteria === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    setHotels(sorted);
    setSortBy(criteria);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Discover Your Next Stay</Text>
      <View style={styles.sortButtons}>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortBy === 'price' && { backgroundColor: '#2E86DE' },
          ]}
          onPress={() => sortHotels('price')}>
          <Text
            style={[
              styles.sortText,
              sortBy === 'price' && { color: '#fff' },
            ]}>
            Sort by Price
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.sortButton,
            sortBy === 'rating' && { backgroundColor: '#2E86DE' },
          ]}
          onPress={() => sortHotels('rating')}>
          <Text
            style={[
              styles.sortText,
              sortBy === 'rating' && { color: '#fff' },
            ]}>
            Sort by Rating
          </Text>
        </TouchableOpacity>
      </View>

      {hotels.length > 0 ? (
        <FlatList
          data={hotels}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HotelCard
              hotel={item}
              onPress={() => navigation.navigate('HotelDetails', { hotel: item })}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.emptyText}>No hotels available.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f9f9f9' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#2E86DE', marginBottom: 10 },
  sortButtons: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 },
  sortButton: {
    borderWidth: 1,
    borderColor: '#2E86DE',
    borderRadius: 25,
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  sortText: { color: '#2E86DE', fontWeight: '500' },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 20 },
});