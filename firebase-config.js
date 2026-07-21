// ==================================
// TRAP MOVIES
// Firebase Configuration
// ==================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyB_YteMZbVXjSY8gqBfAnSbN-Tw8Jofw4g",
    authDomain: "trapmovies-ec66b.firebaseapp.com",
    projectId: "trapmovies-ec66b",
    storageBucket: "trapmovies-ec66b.firebasestorage.app",
    messagingSenderId: "301692175074",
    appId: "1:301692175074:web:b128b31fe77b44945ed4bb",
    measurementId: "G-F5YNMBZZYS"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { app, auth, db, storage, analytics };