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
// const firebaseConfig = {
//   apiKey: "AIzaSyCIYrnTlFw4LBqutlQjjYbVhW3aTAh20uw",
//   authDomain: "chatapp-1aa77.firebaseapp.com",
//   projectId: "chatapp-1aa77",
//   storageBucket: "chatapp-1aa77.appspot.com",
//   messagingSenderId: "104804537007",
//   appId: "1:104804537007:web:961b51c03b03dd72923a5a",
//   measurementId: "G-WJBYZ4P95P"
// };
const firebaseConfig = {
  apiKey: "AIzaSyAlZ9lwFw_pJ2CL3J4sxS7IhMymJdG0QzI",
  authDomain: "rnchatapp-fad0b.firebaseapp.com",
  projectId: "rnchatapp-fad0b",
  storageBucket: "rnchatapp-fad0b.appspot.com",
  messagingSenderId: "686308561041",
  appId: "1:686308561041:web:4c7e397785e4bb6fdc2f30",
  measurementId: "G-Z32ZY8K06P"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyBeFrmAzw9xyqIOE7bvcaQ16Dzh9N6wFGQ",
//   authDomain: "chatapp-72c39.firebaseapp.com",
//   projectId: "chatapp-72c39",
//   storageBucket: "chatapp-72c39.appspot.com",
//   messagingSenderId: "533644480186",
//   appId: "1:533644480186:web:436f7768a02f5bd8b5bc83",
//   measurementId: "G-MCJYXSKY4M"
// };


// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const FirebaseAuth = initializeAuth(FirebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const FirebaseFireStore = getFirestore(FirebaseApp);

export { FirebaseApp, FirebaseAuth, FirebaseFireStore };