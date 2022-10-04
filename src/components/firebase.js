import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "homi-hub-dafc9.firebaseapp.com",
  databaseURL: "https://homi-hub-dafc9-default-rtdb.firebaseio.com",
  projectId: "homi-hub-dafc9",
  storageBucket: "homi-hub-dafc9.appspot.com",
  messagingSenderId: "817682980513",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-2HWCV1J0EE"
}

  // const app = initializeApp(firebaseConfig);
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getDatabase(app);
    //const analytics = getAnalytics(app);
  