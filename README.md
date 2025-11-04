Hotel Booking App
A mobile app for booking hotels with user accounts, real bookings, reviews, and live data.

Quick Start
1. Install & Run

# Install dependencies
npm install

# Start the app
npx expo start
Press i for iOS simulator

Press a for Android emulator

Scan QR code with Expo Go app for physical device

2. Firebase Setup
Create project at Firebase Console

Enable Authentication with Email/Password

Create Firestore Database in test mode

Copy your config to src/firebase/firebaseConfig.js

3. (Optional) Weather API
Get free key from OpenWeatherMap for live weather data.

What It Does
Onboarding - Welcome screens for new users

Accounts - Secure sign up, login, password reset

Browse Hotels - View hotels with photos, ratings, prices

Book Stays - Easy booking with date selection

Reviews - Rate and review hotels

Profile - View booking history & manage account

Deals - Special offers from partners

Weather - Current conditions at destinations

Built With
React Native + Expo

Firebase (Auth & Database)

React Navigation

External APIs for deals & weather

Need Help?
Bookings not showing?

Go to Profile tab and pull down to refresh

Or click the refresh button in top-right

Firebase errors?

Check Firestore rules allow read/write

Verify your project ID in firebaseConfig.js

App won't start?

bash
npx expo start -c  # Clear cache
Ready to explore and book!
