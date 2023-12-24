// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIYrnTlFw4LBqutlQjjYbVhW3aTAh20uw",
  authDomain: "chatapp-1aa77.firebaseapp.com",
  projectId: "chatapp-1aa77",
  storageBucket: "chatapp-1aa77.appspot.com",
  messagingSenderId: "104804537007",
  appId: "1:104804537007:web:961b51c03b03dd72923a5a",
  measurementId: "G-WJBYZ4P95P"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const FirebaseAuth = initializeAuth(FirebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const FirebaseFireStore = getFirestore(FirebaseApp);

export { FirebaseApp, FirebaseAuth, FirebaseFireStore };