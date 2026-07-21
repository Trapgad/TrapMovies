/* ==================================
   TRAP MOVIES
   PREMIUM MOVIE DETAILS ENGINE V3

   FEATURES:
   TMDB DETAILS
   SAFE FETCH SYSTEM
   LOADING ENGINE
   POSTER
   BACKDROP
   RATING
   GENRES
================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


/* =========================
        TMDB CONFIG
========================= */


const API_KEY =
"17a1834e273320eef8a2a36b38a11964";


const BASE_URL =
"https://api.themoviedb.org/3";


const IMAGE_URL =
"https://image.tmdb.org/t/p/w500/";


const ORIGINAL_IMAGE =
"https://image.tmdb.org/t/p/original/";




const movieID =

new URLSearchParams(

window.location.search

).get("id");





let currentMovie = null;




if(!movieID){


console.log(
"Movie ID missing"
);


return;


}








/* =========================
        SAFE FETCH
========================= */


async function fetchTMDB(url){


try{


const separator =

url.includes("?")

?

"&"

:

"?";



const response =

await fetch(

`${BASE_URL}${url}${separator}api_key=${API_KEY}&language=en-US`

);





if(!response.ok){


throw new Error(
"TMDB request failed"
);


}





return await response.json();



}



catch(error){



console.error(

"TMDB ERROR:",

error

);



return null;



}


}









/* =========================
        LOADING SYSTEM
========================= */


function showLoading(id){


const element =

document.getElementById(id);



if(element){


element.innerHTML =

`

<div class="loading">

<i class="fa-solid fa-spinner fa-spin"></i>

Loading...

</div>

`;


}


}






function updateText(id,text){



const element =

document.getElementById(id);





if(element){



element.textContent =

text || "N/A";



}



}









/* =========================
        LOAD MOVIE
========================= */


async function loadMovie(){



const movie =

await fetchTMDB(

`/movie/${movieID}`

);





if(!movie){



showError();



return;



}






currentMovie = movie;









/* =========================
        BACKDROP
========================= */



const backdrop =

document.querySelector(

".movie-backdrop"

);





if(

backdrop

&&

movie.backdrop_path

){



backdrop.style.backgroundImage =



`

linear-gradient(

90deg,

rgba(5,5,5,.95),

rgba(5,5,5,.35)

),

url(

${ORIGINAL_IMAGE}${movie.backdrop_path}

)

`;



}









/* =========================
        POSTER
========================= */



const poster =

document.getElementById(

"moviePoster"

);





if(poster){



poster.src =



movie.poster_path



?



IMAGE_URL + movie.poster_path



:



"assets/images/no-image.jpg";





poster.alt = movie.title;



}









/* =========================
        BASIC INFO
========================= */


updateText(

"movieTitle",

movie.title

);



updateText(

"movieYear",

movie.release_date

?

movie.release_date.slice(0,4)

:

"N/A"

);





updateText(

"movieRuntime",

movie.runtime

?

movie.runtime+" min"

:

"N/A"

);







updateText(

"moviePopularity",

movie.popularity

?

Math.floor(movie.popularity)

+

" Views"

:

"N/A"

);







updateText(

"movieDescription",

movie.overview

);






updateText(

"storyText",

movie.overview

);









/* =========================
        RATING
========================= */


const rating =

document.getElementById(

"movieRating"

);






if(rating){



rating.innerHTML =



`

⭐

${
movie.vote_average

?

movie.vote_average.toFixed(1)

:

"N/A"

}

`;



}









/* =========================
        GENRES
========================= */


const genres =

document.getElementById(

"movieGenres"

);





if(genres){



genres.innerHTML = "";





(movie.genres || [])

.forEach(item=>{





genres.innerHTML +=



`

<span>

${item.name}

</span>

`;





});



}










/* =========================
        FINANCIAL INFO
========================= */



updateText(

"movieBudget",

movie.budget

?

"$"+movie.budget.toLocaleString()

:

"N/A"

);







updateText(

"movieRevenue",

movie.revenue

?

"$"+movie.revenue.toLocaleString()

:

"N/A"

);









// Load saved state


loadWatchlist(movie);



}









/* =========================
        ERROR MESSAGE
========================= */


function showError(){


const box =

document.querySelector(

".movie-info-box"

);



if(box){


box.innerHTML =

`

<h2>

Movie unavailable

</h2>


<p>

Unable to load movie information.

</p>

`;



}



}









/* =========================
        EXPORT FOR PART 2
========================= */


window.TRAP_MOVIE = {

movieID,

fetchTMDB,

IMAGE_URL,

ORIGINAL_IMAGE,

getCurrentMovie:()=>currentMovie

};






/* START */

loadMovie();



});
/* =========================
        TRAILER SYSTEM
========================= */


async function loadTrailer(){


const data =

await fetchTMDB(

`/movie/${movieID}/videos`

);





const box =

document.getElementById(

"trailerBox"

);





if(!box || !data)

return;






const trailer =

(data.results || [])

.find(video =>


video.type === "Trailer"

&&

video.site === "YouTube"


);







if(trailer){



box.innerHTML =


`

<iframe

src="https://www.youtube.com/embed/${trailer.key}"

allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

allowfullscreen>

</iframe>

`;



}

else{


box.innerHTML =


`

<p class="no-trailer">

Trailer unavailable

</p>

`;



}



}









/* =========================
        CAST SYSTEM
========================= */


async function loadCast(){


const data =

await fetchTMDB(

`/movie/${movieID}/credits`

);





const box =

document.getElementById(

"castContainer"

);





if(!box || !data)

return;





box.innerHTML = "";






(data.cast || [])

.slice(0,12)

.forEach(actor=>{





const image =


actor.profile_path


?


IMAGE_URL + actor.profile_path


:


"assets/images/no-user.jpg";







box.innerHTML +=



`

<div class="cast-card">


<img src="${image}">


<h3>

${actor.name}

</h3>


<p>

${actor.character || "Unknown"}

</p>


</div>

`;



});



}









/* =========================
        CREW SYSTEM
========================= */


async function loadCrew(){



const data =

await fetchTMDB(

`/movie/${movieID}/credits`

);






if(!data)

return;





const director =


(data.crew || [])

.find(person =>

person.job === "Director"

);







const writers =


(data.crew || [])

.filter(person =>


person.job === "Writer"

||

person.job === "Screenplay"


)

.slice(0,3)

.map(person=>person.name)

.join(", ");








updateText(

"movieDirector",

director

?

director.name

:

"N/A"

);







updateText(

"movieWriter",

writers

);



}









/* =========================
        COMPANY INFO
========================= */


async function loadCompany(){


const movie =

await fetchTMDB(

`/movie/${movieID}`

);





if(!movie)

return;






updateText(

"movieCompanies",

(movie.production_companies || [])

.map(company=>company.name)

.join(", ")

);







updateText(

"movieCountry",

(movie.production_countries || [])

.map(country=>country.name)

.join(", ")

);







updateText(

"movieLanguages",

(movie.spoken_languages || [])

.map(language=>language.english_name)

.join(", ")

);



}









/* =========================
        SIMILAR MOVIES
========================= */


async function loadSimilar(){


const data =

await fetchTMDB(

`/movie/${movieID}/similar`

);





const box =

document.getElementById(

"similarMovies"

);





if(!box || !data)

return;





box.innerHTML = "";






(data.results || [])

.slice(0,10)

.forEach(movie=>{





box.innerHTML +=



`

<div class="movie-card"

onclick="openMovie(${movie.id})">



<img src="

${
movie.poster_path

?

IMAGE_URL + movie.poster_path

:

"assets/images/no-image.jpg"

}

">



<h3>

${movie.title}

</h3>



<p>

⭐ 

${
movie.vote_average

?

movie.vote_average.toFixed(1)

:

"N/A"

}

</p>



</div>

`;





});



}









/* =========================
        WATCHLIST / MY LIST
========================= */


function loadWatchlist(movie){



const button =

document.getElementById(

"watchlistBtn"

);





if(!button)

return;






let list =


JSON.parse(

localStorage.getItem(

"watchlist"

)

)

|| [];







function updateButton(){



const exists =


list.some(

item=>item.id===movie.id

);





button.innerHTML =


exists

?

`

<i class="fa-solid fa-check"></i>

Added

`

:

`

<i class="fa-solid fa-plus"></i>

My List

`;



}





updateButton();








button.onclick = ()=>{



const exists =


list.some(

item=>item.id===movie.id

);







if(exists){



list =


list.filter(

item=>item.id!==movie.id

);



}

else{



list.push({


id:movie.id,


title:movie.title,


poster:

movie.poster_path

?

IMAGE_URL + movie.poster_path

:

"assets/images/no-image.jpg",



rating:

movie.vote_average,



year:

movie.release_date

?

movie.release_date.slice(0,4)

:

"N/A"



});



}





localStorage.setItem(

"watchlist",

JSON.stringify(list)

);





updateButton();



};



}









/* =========================
        WATCH BUTTON
========================= */


document

.getElementById("watchBtn")

?.addEventListener(

"click",

()=>{



const movie =

TRAP_MOVIE.getCurrentMovie();




if(movie){



addToHistory({

id:movie.id,


title:movie.title,


poster:

movie.poster_path

?

IMAGE_URL + movie.poster_path

:

"assets/images/no-image.jpg",


year:

movie.release_date

?

movie.release_date.slice(0,4)

:

"N/A"



});



}





}

);







/* START PART 2 */


loadTrailer();

loadCast();

loadCrew();

loadCompany();

loadSimilar();
/* =========================
        WATCH HISTORY SYSTEM
========================= */


function addToHistory(movie){


let history =

JSON.parse(

localStorage.getItem(

"watchHistory"

)

)

|| [];





// Remove duplicate


history =

history.filter(

item => item.id !== movie.id

);





// Add newest first


history.unshift(movie);





// Keep last 50 movies


history =

history.slice(0,50);





localStorage.setItem(

"watchHistory",

JSON.stringify(history)

);



}









/* =========================
        CONTINUE WATCHING
========================= */


function saveContinueWatching(movie){



let continueList =


JSON.parse(

localStorage.getItem(

"continueWatching"

)

)

|| [];







continueList =


continueList.filter(

item=>item.id !== movie.id

);







continueList.unshift({


id:movie.id,


title:movie.title,


poster:

movie.poster_path

?

IMAGE_URL + movie.poster_path

:

"assets/images/no-image.jpg",


time:

new Date().getTime()


});







continueList =

continueList.slice(0,20);







localStorage.setItem(

"continueWatching",

JSON.stringify(continueList)

);



}









/* =========================
        FAVOURITE SYSTEM
========================= */


function setupFavourite(movie){



const button =

document.getElementById(

"favoriteBtn"

);





if(!button)

return;






let favourites =


JSON.parse(

localStorage.getItem(

"favorites"

)

)

|| [];







function updateFavourite(){



const exists =


favourites.some(

item=>item.id===movie.id

);





button.innerHTML =



exists


?


`

<i class="fa-solid fa-heart"></i>

Liked

`


:


`

<i class="fa-regular fa-heart"></i>

Favourite

`;



}







updateFavourite();







button.onclick = ()=>{



const exists =


favourites.some(

item=>item.id===movie.id

);







if(exists){



favourites =


favourites.filter(

item=>item.id!==movie.id

);



}

else{



favourites.push({


id:movie.id,


title:movie.title,


poster:

movie.poster_path

?

IMAGE_URL + movie.poster_path

:

"assets/images/no-image.jpg",


rating:

movie.vote_average



});



}







localStorage.setItem(

"favorites",

JSON.stringify(favourites)

);







updateFavourite();



};



}









/* =========================
        WATCH EVENT UPDATE
========================= */


document

.getElementById(

"watchBtn"

)

?.addEventListener(

"click",

()=>{



const movie =

TRAP_MOVIE.getCurrentMovie();






if(movie){



const data = {



id:movie.id,


title:movie.title,


poster:

movie.poster_path

?

IMAGE_URL + movie.poster_path

:

"assets/images/no-image.jpg",


year:

movie.release_date

?

movie.release_date.slice(0,4)

:

"N/A",


rating:

movie.vote_average



};





addToHistory(data);


saveContinueWatching(movie);



}



});









/* =========================
        ACCOUNT STORAGE
========================= */


function saveAccountStats(){



const history =


JSON.parse(

localStorage.getItem(

"watchHistory"

)

)

|| [];






const favorites =


JSON.parse(

localStorage.getItem(

"favorites"

)

)

|| [];






const watchlist =


JSON.parse(

localStorage.getItem(

"watchlist"

)

)

|| [];








const watchedCount =

document.getElementById(

"watchedCount"

);




const favoriteCount =

document.getElementById(

"favoriteCount"

);




const listCount =

document.getElementById(

"listCount"

);








if(watchedCount)

watchedCount.textContent =

history.length;







if(favoriteCount)

favoriteCount.textContent =

favorites.length;







if(listCount)

listCount.textContent =

watchlist.length;



}









/* =========================
        OPEN MOVIE
========================= */


window.openMovie = function(id){



window.location.href =


"movie.html?id=" +

encodeURIComponent(id);



};









/* =========================
        FINAL ENGINE START
========================= */


const movieReady =

setInterval(()=>{



const movie =

TRAP_MOVIE.getCurrentMovie();





if(movie){



setupFavourite(movie);


saveAccountStats();



clearInterval(movieReady);



}



},300);







});