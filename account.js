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



const user = {

name:"TRAP USER",

email:"user@email.com"

};




if(username){

username.textContent = user.name;

}



if(email){

email.textContent = user.email;

}









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

document.querySelector(
"#watchlistContainer"
);





if(watchlistContainer){



watchlistContainer.innerHTML="";





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

"https://image.tmdb.org/t/p/w500/" + item.poster

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




location.href="index.html";



});





});