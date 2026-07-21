/* ==================================
        TRAP MOVIES
        ACCOUNT SYSTEM
        FIREBASE VERSION
================================== */


import { auth, db } from "./firebase-config.js";


import {

onAuthStateChanged,
signOut

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



import {

doc,
getDoc

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";






document.addEventListener("DOMContentLoaded",()=>{





/* =========================
        USER DATA
========================= */


const username =
document.querySelector("#username");


const email =
document.querySelector("#email");






onAuthStateChanged(auth, async(user)=>{



if(user){



// Display Firebase user data

if(username){

username.textContent =
user.displayName || "TRAP USER";

}



if(email){

email.textContent =
user.email;

}





// Get extra user data from Firestore

const userRef =
doc(db,"users",user.uid);


const userSnap =
await getDoc(userRef);



if(userSnap.exists()){


const data =
userSnap.data();



if(username){

username.textContent =
data.name;

}


}




}

else{


// No user logged in

window.location.href="login.html";


}



});









/* =========================
        LOAD LIST DATA
========================= */


const movieList =

JSON.parse(

localStorage.getItem("watchlist")

)

|| [];





const seriesList =

JSON.parse(

localStorage.getItem("seriesList")

)

|| [];





const allList = [

...movieList,

...seriesList

];









/* =========================
        ACCOUNT STATS
========================= */


const movieCount =
document.querySelector("#movieCount");


const seriesCount =
document.querySelector("#seriesCount");


const saveCount =
document.querySelector("#saveCount");




if(movieCount){

movieCount.textContent =
movieList.length;

}



if(seriesCount){

seriesCount.textContent =
seriesList.length;

}



if(saveCount){

saveCount.textContent =
allList.length;

}









/* =========================
        WATCHLIST DISPLAY
========================= */


const watchlistContainer =

document.querySelector("#watchlistContainer");





if(watchlistContainer){



if(allList.length === 0){



watchlistContainer.innerHTML =

`

<div class="empty-list">


<i class="fa-solid fa-film"></i>


<h3>
Your watchlist is empty
</h3>


<p>
Start saving movies and series you love.
</p>


</div>

`;



}

else{



allList.forEach(item=>{


const poster =

item.poster

?

"https://image.tmdb.org/t/p/w500/"+item.poster

:

"assets/images/no-image.jpg";



watchlistContainer.innerHTML +=


`

<div class="movie-card">


<img src="${poster}">


<h3>
${item.title || item.name || "Unknown"}
</h3>


<p>
Saved
</p>


</div>


`;



});



}



}









/* =========================
        LOGOUT
========================= */


const logoutBtn =
document.querySelector("#logoutBtn");




logoutBtn?.addEventListener("click",()=>{



signOut(auth)

.then(()=>{


alert("Logged out successfully");


window.location.href="login.html";


});



});





});