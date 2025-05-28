import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
/* for real when not dev testing app use
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
*/

const firebaseConfig = {
  apiKey: "AIzaSyBk0TLky4U5-dW-DPUkjQ4iOZZ4IjmVHZg",
  authDomain: "commshare-16ab2.firebaseapp.com",
  projectId: "commshare-16ab2",
  storageBucket: "commshare-16ab2.firebasestorage.app",
  messagingSenderId: "510044175032",
  appId: "1:510044175032:web:bc69ed6b189c2729de524d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
/* for real when not dev testing app use
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

*/