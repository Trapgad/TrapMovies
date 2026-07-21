/* ==================================
   TRAP MOVIES
   PREMIUM MOVIE DETAILS ENGINE V4

   FIXED:
   - TMDB DETAILS
   - SAFE FETCH
   - POSTER
   - BACKDROP
   - RATING
   - GENRES
   - CLEAN SCOPE
================================== */


document.addEventListener("DOMContentLoaded",()=>{


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

console.log("Movie ID missing");

return;

}



/* =========================
        SAFE FETCH
========================= */


async function fetchTMDB(endpoint){

try{


const response =
await fetch(

`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`

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
        TEXT UPDATE
========================= */


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

console.log(
"Movie not found"
);

return;

}



currentMovie = movie;





/* BACKDROP */


const backdrop =
document.querySelector(
".movie-backdrop"
);



if(backdrop && movie.backdrop_path){


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





/* POSTER */


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



poster.alt =
movie.title;


}







/* BASIC INFO */


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
Math.floor(movie.popularity)+" Views"
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







/* RATING */


const rating =
document.getElementById(
"movieRating"
);



if(rating){


rating.innerHTML =

`

⭐ ${

movie.vote_average

?

movie.vote_average.toFixed(1)

:

"N/A"

}

`;

}



/* GENRES */


const genres =
document.getElementById(
"movieGenres"
);



if(genres){


genres.innerHTML="";



movie.genres.forEach(genre=>{


genres.innerHTML +=

`

<span>
${genre.name}
</span>

`;


});


}





loadExtraFeatures(movie);



}









/* =========================
        EXPORT
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
        EXTRA FEATURES
========================= */


async function loadExtraFeatures(movie){


await loadTrailer();

await loadCast();

await loadCrew();

await loadCompany();

await loadSimilar();

loadWatchlist(movie);

setupFavourite(movie);

saveAccountStats();


}







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




box.innerHTML="";



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

.find(person=>

person.job === "Director"

);





const writers =

(data.crew || [])

.filter(person=>

person.job === "Writer"

||

person.job === "Screenplay"

)

.map(person=>person.name)

.slice(0,3)

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
        COMPANY SYSTEM
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




box.innerHTML="";



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

⭐ ${

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
        WATCHLIST SYSTEM
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
item=>item.id === movie.id
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
item=>item.id === movie.id
);





if(exists){


list =

list.filter(

item=>item.id !== movie.id

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

item=>item.id === movie.id

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

item=>item.id === movie.id

);





if(exists){


favourites =

favourites.filter(

item=>item.id !== movie.id

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
        WATCH HISTORY
========================= */


function addToHistory(movie){


let history =

JSON.parse(

localStorage.getItem(
"watchHistory"
)

)

|| [];





history =

history.filter(

item=>item.id !== movie.id

);





history.unshift(movie);





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


let list =

JSON.parse(

localStorage.getItem(
"continueWatching"
)

)

|| [];






list =

list.filter(

item=>item.id !== movie.id

);







list.unshift({

id:movie.id,

title:movie.title,

poster:

movie.poster_path

?

IMAGE_URL + movie.poster_path

:

"assets/images/no-image.jpg",


time:

Date.now()


});





list =

list.slice(0,20);





localStorage.setItem(

"continueWatching",

JSON.stringify(list)

);



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



}

);









/* =========================
        ACCOUNT STATS
========================= */


function saveAccountStats(){



const history =

JSON.parse(

localStorage.getItem(
"watchHistory"
)

)

|| [];




const favourites =

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
favourites.length;




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
        START ENGINE
========================= */


const checkMovie =

setInterval(()=>{



const movie =

TRAP_MOVIE.getCurrentMovie();





if(movie){



saveAccountStats();



clearInterval(checkMovie);



}



},300);




});
const checkMovie = setInterval(()=>{

const movie = TRAP_MOVIE.getCurrentMovie();

if(movie){

saveAccountStats();

clearInterval(checkMovie);

}

},300);


});