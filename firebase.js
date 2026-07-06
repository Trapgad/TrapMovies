// ===============================
// TRAP MOVIES - FIREBASE.JS
// ===============================

import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";


import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged

} from 
"https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";



// FIREBASE CONFIG

const firebaseConfig = {

  apiKey: "AIzaSyBLHlSlMPvwSS5MB8Jg2JB1R-ANIopQZU",

  authDomain: "trap-270792.firebaseapp.com",

  projectId: "trap-270792",

  storageBucket: "trap-270792.firebasestorage.app",

  messagingSenderId: "248838190395",

  appId: "1:248838190395:web:9d319e9732b0550670331e",

  measurementId: "G-ZCHXNX0LX8"

};



// INITIALIZE FIREBASE

const app = initializeApp(firebaseConfig);


// AUTH

export const auth = getAuth(app);



// EXPORT FUNCTIONS

export {

  createUserWithEmailAndPassword,

  signInWithEmailAndPassword,

  signOut,

  onAuthStateChanged

};