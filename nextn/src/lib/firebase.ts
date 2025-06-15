// src/lib/firebase.ts
import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
// Firebase Storage is not currently used by the client-side application features.
// If you enable and intend to use Firebase Storage from the client in the future,
// you'll need to re-add getStorage and ensure the NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET is correctly set.
// import { getStorage, type FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || undefined, // Use undefined if empty to avoid SDK error
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// const storage: FirebaseStorage = getStorage(app); // Removed as client-side Firebase Storage is not used.

export { app }; // Export only the app instance now
// export { app, storage };
