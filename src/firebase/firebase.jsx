import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtBTe-GOfVpmN2oyfLTevQ4EitPL3wY10",
  authDomain: "service-arc.firebaseapp.com",
  projectId: "service-arc",
  storageBucket: "service-arc.appspot.com",
  messagingSenderId: "248531398860",
  appId: "1:248531398860:web:40a4bcc43a2930302d9269",
  measurementId: "G-MSV6XH2YWX"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
