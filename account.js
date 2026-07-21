/* ==================================
        TRAP MOVIES
        ACCOUNT SYSTEM
        PREMIUM VERSION
================================== */


document.addEventListener("DOMContentLoaded",()=>{





/* =========================
        USER DATA
========================= */


const username =

document.querySelector("#username");


const email =

document.querySelector("#email");





// Temporary user data
// Replace with Firebase later


const user = {


name:
"TRAP USER",


email:
"user@email.com"


};





if(username){

username.textContent =
user.name;

}



if(email){

email.textContent =
user.email;

}









/* =========================
        WATCHLIST
========================= */


const watchlistContainer =

document.querySelector(
"#watchlistContainer"
);





const movieList =

JSON.parse(

localStorage.getItem(
"watchlist"
)

)

|| [];





const seriesList =

JSON.parse(

localStorage.getItem(
"seriesList"
)

)

|| [];







const allList = [

...movieList,

...seriesList

];







if(watchlistContainer){



watchlistContainer.innerHTML="";





if(!allList.length){



watchlistContainer.innerHTML =

`

<p>

Your watchlist is empty.

</p>

`;



}

else{



allList.forEach(item=>{



watchlistContainer.innerHTML +=


`

<div class="movie-card">


<img src="${
item.poster

?

"https://image.tmdb.org/t/p/w500/"+item.poster

:

"assets/images/no-image.jpg"

}">



<h3>

${item.title || "Unknown"}

</h3>


</div>


`;



});



}



}









/* =========================
        LOGOUT
========================= */


const logoutBtn =

document.querySelector(
"#logoutBtn"
);




logoutBtn?.addEventListener(
"click",
()=>{



localStorage.removeItem(
"watchlist"
);



localStorage.removeItem(
"seriesList"
);




alert(
"Logged out successfully"
);



window.location.href =
"index.html";



});







});