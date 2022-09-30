import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAqpDluhK8saUWR1SfBXDhvFwX3worwRQo",
  authDomain: "homi-hub-dafc9.firebaseapp.com",
  databaseURL: "https://homi-hub-dafc9-default-rtdb.firebaseio.com",
  projectId: "homi-hub-dafc9",
  storageBucket: "homi-hub-dafc9.appspot.com",
  messagingSenderId: "817682980513",
  appId: "1:817682980513:web:d7f96b94d9ed5462f99ae0",
  measurementId: "G-2HWCV1J0EE"
};

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getDatabase(app);
    //const analytics = getAnalytics(app);
  