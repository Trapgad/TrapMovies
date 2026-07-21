/* ==================================
        TRAP MOVIES
        ACCOUNT SYSTEM
        FIREBASE PREMIUM VERSION
================================== */


import { auth, db, storage } from "./firebase-config.js";


import {

onAuthStateChanged,
signOut,
updateProfile

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



import {

doc,
getDoc,
setDoc

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



import {

ref,
uploadBytes,
getDownloadURL

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";






document.addEventListener("DOMContentLoaded",()=>{





/* =========================
        USER PROFILE
========================= */


const username =
document.querySelector("#username");


const email =
document.querySelector("#email");


const profileImage =
document.querySelector("#profileImage");


const imageUpload =
document.querySelector("#imageUpload");


const editName =
document.querySelector("#editName");


const saveProfile =
document.querySelector("#saveProfile");






onAuthStateChanged(auth, async(user)=>{



if(user){



// Show account details

if(username){

username.textContent =
user.displayName || "TRAP USER";

}



if(email){

email.textContent =
user.email;

}






// Load profile photo

if(profileImage && user.photoURL){

profileImage.src =
user.photoURL;

}






// Load Firestore data

const userRef =
doc(db,"users",user.uid);



const userSnap =
await getDoc(userRef);



if(userSnap.exists()){


const data =
userSnap.data();



if(username){

username.textContent =
data.name || user.displayName;

}



if(editName){

editName.value =
data.name || "";

}



}




// Save username

saveProfile?.addEventListener("click", async()=>{


const newName =
editName.value.trim();



if(newName){


await updateProfile(user,{

displayName:newName

});



await setDoc(

doc(db,"users",user.uid),

{

name:newName,

email:user.email

},

{

merge:true

}

);



username.textContent =
newName;



alert("Profile updated successfully");


}



});







// Upload profile picture

imageUpload?.addEventListener("change",async()=>{



const file =
imageUpload.files[0];



if(file){



const imageRef =
ref(

storage,

"profileImages/"+user.uid

);



await uploadBytes(

imageRef,

file

);



const imageURL =
await getDownloadURL(imageRef);





await updateProfile(user,{

photoURL:imageURL

});





profileImage.src =
imageURL;



alert("Profile picture updated");


}



});






}

else{


window.location.href="login.html";


}



});









/* =========================
        LOAD WATCHLIST
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





if(movieCount)
movieCount.textContent =
movieList.length;



if(seriesCount)
seriesCount.textContent =
seriesList.length;



if(saveCount)
saveCount.textContent =
allList.length;









/* =========================
        DISPLAY WATCHLIST
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



const poster = item.poster

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