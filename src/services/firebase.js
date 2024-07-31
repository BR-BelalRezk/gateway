// firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFNsQY-4qG8jyJh88VB29iX28yHrn-7go",
    authDomain: "gateway-9bd56.firebaseapp.com",
    databaseURL: "https://gateway-9bd56-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gateway-9bd56",
    storageBucket: "gateway-9bd56.appspot.com",
    messagingSenderId: "1097963311636",
    appId: "1:1097963311636:web:1d2f2defd14e498ddfcd01"
  };
  



  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  export default firebase;
