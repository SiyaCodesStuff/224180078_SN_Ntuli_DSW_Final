// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOBYQ7p8-bEzZrxl7JoJ0MIH6gI_p7kjg",
  authDomain: "hotelbookingapp-cfffa.firebaseapp.com",
  projectId: "hotelbookingapp-cfffa",
  storageBucket: "hotelbookingapp-cfffa.firebasestorage.app",
  messagingSenderId: "936974514009",
  appId: "1:936974514009:web:04bf243442baeca95efe48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);