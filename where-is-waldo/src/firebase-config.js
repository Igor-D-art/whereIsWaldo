const config = {
  apiKey: "AIzaSyD7H6719iM5MEQSWWhBnIoA0YwCaG8shog",
  authDomain: "where-is-waldo-3ff60.firebaseapp.com",
  databaseURL: "https://where-is-waldo-3ff60-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "where-is-waldo-3ff60",
  storageBucket: "where-is-waldo-3ff60.appspot.com",
  messagingSenderId: "39938823508",
  appId: "1:39938823508:web:0853f4f4c19f2349cd64c1"
};
  
  export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
      throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.js');
    } else {
      return config;
    }
}
