import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDTAas1droAkeShhrnvoJhDCc74uJQQhEA",
  authDomain: "esp32-parking-8feef.firebaseapp.com",
  databaseURL: "https://esp32-parking-8feef-default-rtdb.firebaseio.com",
  projectId: "esp32-parking-8feef",
  storageBucket: "esp32-parking-8feef.appspot.com",
  messagingSenderId: "89076263554",
  appId: "1:89076263554:web:61669b435d5c272307e29b",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);