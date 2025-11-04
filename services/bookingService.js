import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, getDocs, query, where, doc, setDoc } from 'firebase/firestore';

// Save booking to Firestore
export const saveBooking = async (bookingData) => {
  try {
    const { userId, hotel, checkIn, checkOut, rooms, total } = bookingData;
    
    const booking = {
      userId,
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelLocation: hotel.location,
      hotelPrice: hotel.price,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      rooms: parseInt(rooms),
      total: parseFloat(total),
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    const userBookingsRef = collection(db, 'users', userId, 'bookings');
    const docRef = await addDoc(userBookingsRef, booking);
    
    console.log('Booking saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving booking:', error);
    throw error;
  }
};

export const getUserBookings = async (userId) => {
  try {
    const userBookingsRef = collection(db, 'users', userId, 'bookings');
    const q = query(userBookingsRef);
    const querySnapshot = await getDocs(q);
    
    const bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    return bookings;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};