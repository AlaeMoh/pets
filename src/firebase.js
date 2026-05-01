import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAgXpoDr-_S2xZC4pnEevtrWfWjqtncaGA",
  authDomain: "pethoven-beb86.firebaseapp.com",
  projectId: "pethoven-beb86",
  storageBucket: "pethoven-beb86.appspot.com",
  messagingSenderId: "746223058981",
  appId: "1:746223058981:web:e27728d6fb935e10823fcc",
  measurementId: "G-92PGQW1DEH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics (safe for Next.js / SSR)
let analytics = null;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { analytics };