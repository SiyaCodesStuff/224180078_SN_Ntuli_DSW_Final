import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../screens/Explore/ExploreScreen';
import HotelDetails from '../screens/Explore/HotelDetails';
import BookingScreen from '../screens/Booking/BookingScreen';
import ConfirmationScreen from '../screens/Booking/ConfirmationScreen';

const Stack = createStackNavigator();

export default function ExploreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{ title: 'Explore Hotels', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="HotelDetails"
        component={HotelDetails}
        options={{ title: 'Hotel Details', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="BookingScreen"
        component={BookingScreen}
        options={{ title: 'Book Your Stay', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="ConfirmationScreen"
        component={ConfirmationScreen}
        options={{ title: 'Booking Confirmed', headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  );
}
