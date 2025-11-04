import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { getUserBookings } from '../../services/bookingService';

export default function ProfileScreen({ navigation, route }) {
  const { user, logout } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || '');
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [refreshCount, setRefreshCount] = useState(0); // Add refresh trigger

  useEffect(() => {
    console.log('ProfileScreen - Component mounted or refreshed');
    if (user) {
      fetchUserBookings();
    }
  }, [user, refreshCount]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('ProfileScreen - Screen focused, refreshing...');
      setRefreshCount(prev => prev + 1);
    });

    return unsubscribe;
  }, [navigation]);

  // Also check for refresh param from ConfirmationScreen
  useEffect(() => {
    if (route.params?.refresh) {
      console.log('ProfileScreen - Refresh triggered from confirmation');
      fetchUserBookings();
      // Clear the refresh param
      navigation.setParams({ refresh: false });
    }
  }, [route.params?.refresh]);

  const fetchUserBookings = async () => {
    try {
      console.log('ProfileScreen - Fetching bookings...');
      setLoadingBookings(true);
      const userBookings = await getUserBookings(user.uid);
      console.log('ProfileScreen - Bookings received:', userBookings.length);
      setBookings(userBookings);
    } catch (error) {
      console.error('ProfileScreen - Error fetching bookings:', error);
      Alert.alert('Error', 'Failed to load bookings');
    } finally {
      setLoadingBookings(false);
    }
  };

  // Manual refresh function
  const handleManualRefresh = () => {
    console.log('Manual refresh triggered');
    fetchUserBookings();
  };

  const handleUpdateProfile = async () => {
    if (!newName.trim()) {
      Alert.alert('Error', 'Name cannot be empty.');
      return;
    }

    try {
      await updateProfile(auth.currentUser, { displayName: newName });
      Alert.alert('Success', 'Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      {/* Add refresh button in header */}
      <View style={styles.headerRow}>
        <Text style={styles.pageTitle}>My Profile</Text>
        <TouchableOpacity onPress={handleManualRefresh} style={styles.refreshButton}>
          <Ionicons name="refresh-outline" size={24} color="#2E86DE" />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={100} color="#2E86DE" />
        {!editing ? (
          <>
            <Text style={styles.name}>{user?.displayName || 'User'}</Text>
            <Text style={styles.email}>{user?.email}</Text>

            <TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
              <Text style={styles.editText}>Edit Profile</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.editContainer}>
            <TextInput
              value={newName}
              onChangeText={setNewName}
              style={styles.input}
              placeholder="Enter new name"
            />
            <View style={styles.editActions}>
              <TouchableOpacity style={styles.saveButton} onPress={handleUpdateProfile}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEditing(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <View style={styles.bookingSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Bookings</Text>
          <TouchableOpacity onPress={handleManualRefresh}>
            <Text style={styles.refreshText}>Refresh</Text>
          </TouchableOpacity>
        </View>

        {loadingBookings ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2E86DE" />
            <Text style={styles.loadingText}>Loading bookings...</Text>
          </View>
        ) : bookings.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={50} color="#ccc" />
            <Text style={styles.noBookings}>No bookings yet</Text>
            <Text style={styles.emptySubtext}>Your bookings will appear here</Text>
          </View>
        ) : (
          <FlatList
            data={bookings}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.bookingCard}>
                <Text style={styles.hotelName}>{item.hotelName}</Text>
                <Text style={styles.hotelLocation}>{item.hotelLocation}</Text>
                <Text style={styles.bookingDates}>
                  {formatDate(item.checkIn)} → {formatDate(item.checkOut)}
                </Text>
                <Text style={styles.bookingDetails}>
                  {item.rooms} room(s) • ${item.total?.toFixed(2) || '0.00'}
                </Text>
                <Text style={styles.bookingStatus}>
                  Status: <Text style={styles.statusConfirmed}>{item.status || 'confirmed'}</Text>
                </Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E86DE',
  },
  refreshButton: {
    padding: 5,
  },
  header: { alignItems: 'center', marginBottom: 25 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#2E86DE', marginTop: 8 },
  email: { color: '#777', fontSize: 15, marginTop: 4 },
  editButton: { marginTop: 15, backgroundColor: '#2E86DE', padding: 10, borderRadius: 8 },
  editText: { color: '#fff', fontWeight: 'bold' },
  editContainer: { alignItems: 'center', width: '100%' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    width: '90%',
    marginVertical: 10,
  },
  editActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '80%' },
  saveButton: { backgroundColor: '#2E86DE', padding: 10, borderRadius: 10 },
  cancelText: { color: '#777', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: '600' },
  bookingSection: { marginTop: 15, flex: 1 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#2E86DE' },
  refreshText: { color: '#2E86DE', fontSize: 14 },
  loadingContainer: { alignItems: 'center', marginTop: 20 },
  loadingText: { marginTop: 10, color: '#666' },
  emptyState: { alignItems: 'center', marginTop: 40 },
  noBookings: { color: '#777', fontSize: 16, marginTop: 10 },
  emptySubtext: { color: '#999', fontSize: 14, marginTop: 5 },
  bookingCard: {
    backgroundColor: '#f5f9ff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  hotelName: { fontSize: 16, fontWeight: 'bold', color: '#2E86DE' },
  hotelLocation: { color: '#666', fontSize: 14, marginTop: 2 },
  bookingDates: { color: '#444', marginTop: 8, fontWeight: '500' },
  bookingDetails: { color: '#555', marginTop: 4 },
  bookingStatus: { color: '#333', marginTop: 8, fontWeight: '500' },
  statusConfirmed: { color: 'green', fontWeight: 'bold' },
  logoutButton: {
    backgroundColor: '#ff3b30',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    width: '90%',
  },
  logoutText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
});