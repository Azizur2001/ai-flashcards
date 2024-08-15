import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC5EABmyrZv9m1bDaJ1z4dnUG5X0ms14ms",
  authDomain: "flashcards-app-c678d.firebaseapp.com",
  projectId: "flashcards-app-c678d",
  storageBucket: "flashcards-app-c678d.appspot.com",
  messagingSenderId: "255213674105",
  appId: "1:255213674105:web:28d227be803fb548d9fea8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db}
