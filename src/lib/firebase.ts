
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig: FirebaseOptions = {
  "projectId": "grade-journey",
  "appId": "1:846832458349:web:64ef7cf818f1140d4a7d64",
  "storageBucket": "grade-journey.firebasestorage.app",
  "apiKey": "AIzaSyAXkK7cZWgU93M5loyVDl9xXieG2w_34Xw",
  "authDomain": "grade-journey.firebaseapp.com",
  "measurementId": "G-GHBB7RYZ41",
  "messagingSenderId": "846832458349"
};


// Initialize Firebase
let app;
if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully.");
  } catch (error) {
    console.error("Firebase initialization error:", error);
    // If there's an error during initialization, app might be undefined.
    // We can throw the error or handle it as appropriate for the app.
    // For now, logging and letting it proceed (auth will likely fail too).
  }
} else {
  app = getApp();
  console.log("Firebase app already initialized.");
}

// Ensure app is defined before calling getAuth or getFirestore
const auth = app ? getAuth(app) : null;
if (!auth && app) { // Log error only if app was initialized but auth failed
    console.error("Firebase auth could not be initialized.");
}

const db = app ? getFirestore(app) : null;
if (!db && app) { // Log error only if app was initialized but db failed
    console.error("Firebase Firestore could not be initialized.");
}

export { app, auth, db };
