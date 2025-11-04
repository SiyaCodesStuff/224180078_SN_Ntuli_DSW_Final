import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../../context/AuthContext';
import { saveBooking } from '../../services/bookingService';

export default function BookingScreen({ route, navigation }) {
  const { hotel } = route.params;
  const { user } = useContext(AuthContext);

  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date(new Date().setDate(new Date().getDate() + 1))); // Default to tomorrow
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [rooms, setRooms] = useState('1');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const calcTotal = (checkInDate, checkOutDate, roomCount) => {
    const diffTime = checkOutDate - checkInDate;
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const validNights = nights > 0 ? nights : 0;
    const totalCost = validNights * hotel.price * roomCount;
    setTotal(totalCost);
  };

  const handleConfirm = async () => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (!user) {
      Alert.alert('Login Required', 'Please sign in to make a booking.');
      navigation.navigate('SignIn');
      return;
    }

    if (checkOutDate <= checkInDate) {
      Alert.alert('Error', 'Check-out date must be after check-in date.');
      return;
    }

    if (parseInt(rooms) < 1) {
      Alert.alert('Error', 'Please select at least 1 room.');
      return;
    }

    setLoading(true);

    try {
      // Save booking to Firebase
      const bookingData = {
        userId: user.uid,
        hotel,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        rooms,
        total
      };

      await saveBooking(bookingData);
      
      // Navigate to confirmation
      navigation.navigate('ConfirmationScreen', {
        hotel,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        rooms,
        total,
      });
      
    } catch (error) {
      Alert.alert('Booking Failed', 'There was an error processing your booking. Please try again.');
      console.error('Booking error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking for {hotel.name}</Text>

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowCheckIn(true)}>
        <Text style={styles.dateText}>Check-in: {checkIn.toDateString()}</Text>
      </TouchableOpacity>

      {showCheckIn && (
        <DateTimePicker
          value={checkIn}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={(e, selected) => {
            setShowCheckIn(false);
            if (selected) {
              setCheckIn(selected);
              calcTotal(selected, checkOut, parseInt(rooms));
            }
          }}
        />
      )}

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowCheckOut(true)}>
        <Text style={styles.dateText}>Check-out: {checkOut.toDateString()}</Text>
      </TouchableOpacity>

      {showCheckOut && (
        <DateTimePicker
          value={checkOut}
          mode="date"
          display="default"
          minimumDate={new Date(checkIn.getTime() + 24 * 60 * 60 * 1000)} // Minimum: check-in + 1 day
          onChange={(e, selected) => {
            setShowCheckOut(false);
            if (selected) {
              setCheckOut(selected);
              calcTotal(checkIn, selected, parseInt(rooms));
            }
          }}
        />
      )}

      <TextInput
        placeholder="Number of rooms"
        style={styles.input}
        keyboardType="numeric"
        value={rooms}
        onChangeText={(text) => {
          setRooms(text);
          calcTotal(checkIn, checkOut, parseInt(text) || 1);
        }}
      />

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleConfirm}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Processing...' : 'Confirm Booking'}
        </Text>
      </TouchableOpacity>

      {total > 0 && (
        <Text style={styles.totalText}>
          Estimated Total: ${total.toFixed(2)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2E86DE', marginBottom: 20 },
  dateButton: {
    borderWidth: 1,
    borderColor: '#2E86DE',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  dateText: { color: '#333', fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  button: { backgroundColor: '#2E86DE', padding: 15, borderRadius: 10 },
  buttonDisabled: { backgroundColor: '#ccc' },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 18 },
  totalText: { textAlign: 'center', marginTop: 15, color: '#444', fontSize: 16 },
});