import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  measurementId: "G-X1J947VK2K",
  projectId: "super-service-27f41",
  messagingSenderId: "122560399605",
  storageBucket: "super-service-27f41.appspot.com",
  apiKey: "AIzaSyATebj-lJVQ6vscNvIqCuPo7GdOWnjvYSw",
  authDomain: "super-service-27f41.firebaseapp.com",
  appId: "1:122560399605:web:47ecd215c03a173ed7ddbc",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
