import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ReviewCard from '../../components/ReviewCard';
import { fetchWeatherData } from '../../services/apiService';

export default function HotelDetails({ route, navigation }) {
  const { hotel } = route.params;
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Jessica P.', rating: 5, text: 'Amazing stay! Beautiful view and great staff.' },
    { id: 2, name: 'Thabo M.', rating: 4, text: 'Comfortable rooms and excellent service.' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Extract city from location (e.g., "Cape Town, South Africa" → "Cape Town")
  const getCityFromLocation = (location) => {
    return location.split(',')[0].trim();
  };

  useEffect(() => {
    loadWeatherData();
  }, [hotel.location]);

  const loadWeatherData = async () => {
    try {
      setWeatherLoading(true);
      const city = getCityFromLocation(hotel.location);
      const weatherData = await fetchWeatherData(city);
      setWeather(weatherData);
    } catch (error) {
      console.error('Error loading weather:', error);
    } finally {
      setWeatherLoading(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleSubmitReview = () => {
    if (!reviewText || rating === 0) {
      Alert.alert('Incomplete', 'Please provide a rating and comment.');
      return;
    }

    const newReview = {
      id: Date.now(),
      name: 'You',
      rating,
      text: reviewText,
    };

    setReviews([newReview, ...reviews]);
    setModalVisible(false);
    setSubmitted(true);
    setReviewText('');
    setRating(0);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Hotel Image with better error handling */}
      {!imageError ? (
        <Image 
          source={hotel.image} 
          style={styles.image}
          onError={handleImageError}
        />
      ) : (
        <View style={[styles.image, styles.placeholderImage]}>
          <Ionicons name="business-outline" size={50} color="#ccc" />
          <Text style={styles.placeholderText}>Hotel Image</Text>
        </View>
      )}
      
      <View style={styles.info}>
        <Text style={styles.name}>{hotel.name}</Text>
        <Text style={styles.location}>{hotel.location}</Text>
        <Text style={styles.rating}>⭐ {hotel.rating} / 5</Text>
        <Text style={styles.price}>${hotel.price} per night</Text>

        {/* WEATHER SECTION */}
        <View style={styles.weatherSection}>
          <Text style={styles.sectionTitle}>Current Weather</Text>
          {weatherLoading ? (
            <Text style={styles.weatherLoading}>Loading weather...</Text>
          ) : weather ? (
            <View style={styles.weatherCard}>
              <View style={styles.weatherMain}>
                <Text style={styles.temperature}>{weather.temperature}°C</Text>
                <Text style={styles.weatherDesc}>{weather.description}</Text>
              </View>
              <View style={styles.weatherDetails}>
                <Text style={styles.weatherDetail}>💧 Humidity: {weather.humidity}%</Text>
                <Text style={styles.weatherDetail}>💨 Wind: {weather.windSpeed} km/h</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.weatherError}>Weather unavailable</Text>
          )}
        </View>

        <Text style={styles.desc}>
          Experience luxury and comfort in the heart of {getCityFromLocation(hotel.location)}. 
          Enjoy world-class amenities, fine dining, and scenic views during your stay.
          {hotel.description && ` ${hotel.description}`}
        </Text>

        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate('BookingScreen', { hotel })}>
          <Text style={styles.bookText}>Book Now</Text>
        </TouchableOpacity>

        {/* REVIEWS SECTION */}
        <View style={styles.reviewSection}>
          <Text style={styles.reviewHeader}>Guest Reviews</Text>

          {reviews.length === 0 ? (
            <Text style={styles.noReviews}>No reviews yet. Be the first to share your experience!</Text>
          ) : (
            reviews.map((r) => <ReviewCard key={r.id} review={r} />)
          )}

          {!submitted ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.addButtonText}>Add Review</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.thankYou}>Thanks for your review!</Text>
          )}
        </View>
      </View>

      {/* ADD REVIEW MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add a Review</Text>

            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Ionicons
                    name={star <= rating ? 'star' : 'star-outline'}
                    size={28}
                    color="#FFD700"
                    style={{ marginHorizontal: 4 }}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.input}
              placeholder="Write your review..."
              multiline
              value={reviewText}
              onChangeText={setReviewText}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
              <Text style={styles.submitText}>Submit Review</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { 
    width: '100%', 
    height: 250,
  },
  placeholderImage: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#999',
    marginTop: 8,
    fontSize: 16,
  },
  info: { padding: 20 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#2E86DE' },
  location: { fontSize: 16, color: '#666', marginTop: 4 },
  rating: { fontSize: 16, color: '#444', marginTop: 4 },
  price: { fontSize: 18, color: '#000', marginVertical: 8 },
  desc: { fontSize: 15, color: '#555', marginVertical: 10, lineHeight: 22 },
  bookButton: { backgroundColor: '#2E86DE', padding: 15, borderRadius: 10, marginTop: 15 },
  bookText: { color: '#fff', textAlign: 'center', fontSize: 18 },
  
  // Weather Styles
  weatherSection: { marginTop: 20, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2E86DE', marginBottom: 10 },
  weatherCard: {
    backgroundColor: '#f0f8ff',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#2E86DE',
  },
  weatherMain: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  temperature: { fontSize: 24, fontWeight: 'bold', color: '#2E86DE' },
  weatherDesc: { fontSize: 16, color: '#666', textTransform: 'capitalize' },
  weatherDetails: { flexDirection: 'row', justifyContent: 'space-between' },
  weatherDetail: { fontSize: 14, color: '#555' },
  weatherLoading: { color: '#666', fontStyle: 'italic' },
  weatherError: { color: '#ff3b30' },
  
  // Review Styles
  reviewSection: { marginTop: 25 },
  reviewHeader: { fontSize: 20, fontWeight: 'bold', color: '#2E86DE', marginBottom: 10 },
  noReviews: { color: '#777', fontStyle: 'italic', marginBottom: 10 },
  addButton: { backgroundColor: '#2E86DE', padding: 12, borderRadius: 10, marginTop: 10 },
  addButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  thankYou: { color: 'green', textAlign: 'center', marginTop: 10, fontWeight: '600' },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '85%',
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#2E86DE', marginBottom: 15 },
  starRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  submitButton: { backgroundColor: '#2E86DE', padding: 12, borderRadius: 10 },
  submitText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  cancelText: { textAlign: 'center', color: '#777', marginTop: 10 },
});