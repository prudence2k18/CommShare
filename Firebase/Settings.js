import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: "AIzaSyBk0TLky4U5-dW-DPUkjQ4iOZZ4IjmVHZg",
  // authDomain: "commshare-16ab2.firebaseapp.com",
  // projectId: "commshare-16ab2",
  // storageBucket: "commshare-16ab2.firebasestorage.app",
  // messagingSenderId: "510044175032",
  // appId: "1:510044175032:web:bc69ed6b189c2729de524d"
  apiKey: "AIzaSyBpuHeiWgqh1RIx8Io0EFUB8qVfMUqZ41s",
  authDomain: "x-note-5fd32.firebaseapp.com",
  projectId: "x-note-5fd32",
  storageBucket: "x-note-5fd32.appspot.com",
  messagingSenderId: "220127384688",
  appId: "1:220127384688:web:f92c5814eba1d18c1050b5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// apiKey: "AIzaSyBk0TLky4U5-dW-DPUkjQ4iOZZ4IjmVHZg",
// authDomain: "commshare-16ab2.firebaseapp.com",
// projectId: "commshare-16ab2",
// storageBucket: "commshare-16ab2.firebasestorage.app",
// messagingSenderId: "510044175032",
// appId: "1:510044175032:web:bc69ed6b189c2729de524d"
