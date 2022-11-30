import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
import {getFirestore, serverTimestamp} from "firebase/firestore"
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

  // const app = initializeApp(firebaseConfig);
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getDatabase(app);
  export const storage = getStorage(app);
  export const firestore = getFirestore(app);
  export const timestamp = serverTimestamp(app);
    //const analytics = getAnalytics(app);
  