// ==================================
// TRAP MOVIES
// ACCOUNT SYSTEM
// FIREBASE PREMIUM CLEAN VERSION
// ==================================


import { auth, db, storage } 
from "./firebase-config.js";


import {

onAuthStateChanged,
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





document.addEventListener(
"DOMContentLoaded",
()=>{





// ===============================
// ELEMENTS
// ===============================


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


const watchlistContainer =
document.querySelector("#watchlistContainer");



const movieCount =
document.querySelector("#movieCount");


const seriesCount =
document.querySelector("#seriesCount");


const saveCount =
document.querySelector("#saveCount");









// ===============================
// AUTH STATE
// ===============================


onAuthStateChanged(

auth,

async(user)=>{


if(!user){


location.href="login.html";

return;


}





// BASIC INFO


if(username)

username.textContent =
user.displayName || "TRAP USER";



if(email)

email.textContent =
user.email;






// PROFILE PHOTO


if(profileImage){


profileImage.src =

user.photoURL ||

"assets/images/default-user.png";


}







// FIRESTORE DATA


try{


const userRef =
doc(
db,
"users",
user.uid
);



const snapshot =
await getDoc(userRef);



if(snapshot.exists()){


const data =
snapshot.data();



if(username)

username.textContent =
data.name || "TRAP USER";



if(editName)

editName.value =
data.name || "";



}



}


catch(error){


console.error(
"PROFILE ERROR:",
error
);


}





// SAVE PROFILE


saveProfile?.addEventListener(

"click",

async()=>{


const newName =
editName.value.trim();



if(!newName){


alert(
"Enter a username"
);


return;


}



try{


await updateProfile(

user,

{

displayName:newName

}

);



await setDoc(

doc(
db,
"users",
user.uid
),

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



alert(
"Profile updated successfully"
);



}


catch(error){


console.error(error);


alert(
"Unable to update profile"
);



}



});








// PROFILE IMAGE UPLOAD


imageUpload?.addEventListener(

"change",

async()=>{



const file =
imageUpload.files[0];



if(!file)
return;





if(!file.type.startsWith("image/")){


alert(
"Only image files are allowed"
);


return;


}






if(file.size > 2 * 1024 * 1024){


alert(
"Image must be below 2MB"
);


return;


}






try{


const imageRef =

ref(

storage,

"profileImages/"+user.uid

);






await uploadBytes(

imageRef,

file

);






const url =

await getDownloadURL(

imageRef

);






await updateProfile(

user,

{

photoURL:url

}

);






if(profileImage)

profileImage.src=url;





alert(
"Profile picture updated"
);



}


catch(error){


console.error(
"UPLOAD ERROR:",
error
);



alert(
"Image upload failed"
);



}



});






});









// ===============================
// WATCHLIST SYSTEM
// ===============================


const movies =

JSON.parse(

localStorage.getItem(
"watchlist"
)

)

|| [];




const series =

JSON.parse(

localStorage.getItem(
"seriesList"
)

)

|| [];





const allItems = [

...movies,

...series

];






if(movieCount)

movieCount.textContent =
movies.length;



if(seriesCount)

seriesCount.textContent =
series.length;



if(saveCount)

saveCount.textContent =
allItems.length;







if(watchlistContainer){



if(allItems.length===0){



watchlistContainer.innerHTML=`

<div class="empty-list">

<i class="fa-solid fa-film"></i>

<h3>
Your watchlist is empty
</h3>

<p>
Save movies and series to see them here.
</p>


</div>

`;



}

else{


watchlistContainer.innerHTML =

allItems.map(item=>{


const poster =

item.poster

?

"https://image.tmdb.org/t/p/w500/"+item.poster

:

"assets/images/no-image.jpg";



return `


<div class="movie-card">


<img src="${poster}" alt="${item.title || item.name}">


<h3>

${item.title || item.name || "Unknown"}

</h3>



<p>

Saved ✓

</p>


</div>


`;


}).join("");



}



}






});