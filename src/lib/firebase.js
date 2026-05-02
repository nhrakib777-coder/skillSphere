import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCBPHwa1SrJ0HG0Z6GCQzYo6d1Nh3QYESo",
  authDomain: "skillsphere-f9df4.firebaseapp.com",
  projectId: "skillsphere-f9df4",
  storageBucket: "skillsphere-f9df4.firebasestorage.app",
  messagingSenderId: "336731012457",
  appId: "1:336731012457:web:02d49b0a85576e9d7511f8",
  measurementId: "G-VJFZQGSTN7",
};

// Prevent duplicate initialization (IMPORTANT for Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Auth
const auth = getAuth(app);

// Analytics (only in browser)
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((ok) => {
    if (ok) {
      analytics = getAnalytics(app);
    }
  });
}

// ✅ EXPORTS (THIS WAS MISSING)
export { app, auth, analytics };