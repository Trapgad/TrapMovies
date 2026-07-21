// ==================================
// TRAP MOVIES
// Firebase Configuration
// CLEAN VERSION
// ==================================


import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import { getAuth } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import { getFirestore } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


import { getStorage } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";


import { getAnalytics, isSupported } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";





const firebaseConfig = {


apiKey:
"AIzaSyB_YteMZbVXjSY8gqBfAnSbN-Tw8Jofw4g",


authDomain:
"trapmovies-ec66b.firebaseapp.com",


projectId:
"trapmovies-ec66b",


storageBucket:
"trapmovies-ec66b.firebasestorage.app",


messagingSenderId:
"301692175074",


appId:
"1:301692175074:web:b128b31fe77b44945ed4bb",


measurementId:
"G-F5YNMBZZYS"

};







// Initialize Firebase

const app = initializeApp(firebaseConfig);





// Firebase Services

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);






// Analytics (optional)

let analytics = null;


isSupported()

.then((supported)=>{


if(supported){

analytics = getAnalytics(app);

}


});







export {

app,

auth,

db,

storage,

analytics

};