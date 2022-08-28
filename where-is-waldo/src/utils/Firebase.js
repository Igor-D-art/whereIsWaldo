// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7H6719iM5MEQSWWhBnIoA0YwCaG8shog",
  authDomain: "where-is-waldo-3ff60.firebaseapp.com",
  databaseURL: "https://where-is-waldo-3ff60-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "where-is-waldo-3ff60",
  storageBucket: "where-is-waldo-3ff60.appspot.com",
  messagingSenderId: "39938823508",
  appId: "1:39938823508:web:0853f4f4c19f2349cd64c1"
};

// Initialize Firebase
export const fireBaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(fireBaseApp);
export const functions = getFunctions(fireBaseApp, "europe-west1");


// Switching to emulator for dev purposes when running on localhost
if (window.location.hostname === "localhost") {
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectFirestoreEmulator(db,  "localhost", 8080)
}

