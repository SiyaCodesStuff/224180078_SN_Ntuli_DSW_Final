import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Image
} from 'react-native';
import { fetchRecommendedHotels } from '../../services/apiService';

export default function DealsScreen() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadDeals = async () => {
    try {
      setError(null);
      const recommendedHotels = await fetchRecommendedHotels();
      setDeals(recommendedHotels);
    } catch (err) {
      setError('Failed to load deals');
      console.error('Error loading deals:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDeals();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadDeals();
  };

  const renderDealItem = ({ item }) => (
  <View style={styles.dealCard}>
    {item.image && item.image.uri ? (
      <Image 
        source={item.image} 
        style={styles.dealImage}
        onError={() => console.log('Image failed to load')}
      />
    ) : (
      <View style={[styles.dealImage, styles.placeholderDealImage]}>
        <Ionicons name="business-outline" size={40} color="#ccc" />
        <Text style={styles.placeholderDealText}>Hotel Image</Text>
      </View>
    )}
    <View style={styles.dealInfo}>
      <Text style={styles.dealName}>{item.name}</Text>
      <Text style={styles.dealLocation}>{item.location}</Text>
      <View style={styles.dealDetails}>
        <Text style={styles.dealRating}>⭐ {item.rating}</Text>
        <Text style={styles.dealPrice}>${item.price}/night</Text>
      </View>
      <Text style={styles.dealBadge}>🔥 Special Deal</Text>
    </View>
  </View>
);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2E86DE" />
        <Text style={styles.loadingText}>Loading amazing deals...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retryText} onPress={loadDeals}>
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Special Deals</Text>
      <Text style={styles.subheader}>
        Exclusive offers from our partners
      </Text>

      <FlatList
        data={deals}
        renderItem={renderDealItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No deals available at the moment</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E86DE',
    marginBottom: 5,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
    textAlign: 'center',
    marginBottom: 10,
  },
  retryText: {
    color: '#2E86DE',
    fontSize: 16,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 50,
    fontSize: 16,
  },
  dealCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  dealImage: {
    width: '100%',
    height: 180,
  },
  dealInfo: {
    padding: 15,
  },
  dealName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E86DE',
    marginBottom: 5,
  },
  dealLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  dealDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dealRating: {
    fontSize: 14,
    color: '#444',
  },
  dealPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E86DE',
  },
  dealBadge: {
    backgroundColor: '#FF6B6B',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  placeholderDealImage: {
  backgroundColor: '#f5f5f5',
  justifyContent: 'center',
  alignItems: 'center',
},
placeholderDealText: {
  color: '#999',
  marginTop: 5,
  fontSize: 12,
},
});