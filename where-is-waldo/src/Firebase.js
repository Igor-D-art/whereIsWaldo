// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';

// const firebaseConfig = {
//     apiKey: "AIzaSyD7H6719iM5MEQSWWhBnIoA0YwCaG8shog",
//     authDomain: "where-is-waldo-3ff60.firebaseapp.com",
//     databaseURL: "https://where-is-waldo-3ff60-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "where-is-waldo-3ff60",
//     storageBucket: "where-is-waldo-3ff60.appspot.com",
//     messagingSenderId: "39938823508",
//     appId: "1:39938823508:web:0853f4f4c19f2349cd64c1"
//   };

//   firebase.initializeApp(firebaseConfig);

//   export default firebase;




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;