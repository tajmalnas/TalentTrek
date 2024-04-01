// firebaseConfig.js

import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "codement-12fc1.firebaseapp.com",
  projectId: "codement-12fc1",
  storageBucket: "codement-12fc1.appspot.com",
  messagingSenderId: "655335973865",
  appId: "1:655335973865:web:59b28b1aba13808e61e178",
  measurementId: "G-R052VS7NX2"
};

const app = initializeApp(firebaseConfig);
const imageDb = getStorage(app);

export {imageDb, app}