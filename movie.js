/* ==================================
   TRAP MOVIES
   MOVIE DETAILS ENGINE
   PHASE 3 - movie.js
================================== */


document.addEventListener("DOMContentLoaded",()=>{


/* ===============================
        TMDB CONFIG
================================ */


const API_KEY = "17a1834e273320eef8a2a36b38a11964";


const BASE_URL =
"https://api.themoviedb.org/3";


const IMAGE_URL =
"https://image.tmdb.org/t/p/original/";


const POSTER_URL =
"https://image.tmdb.org/t/p/w500/";





/* ===============================
        GET MOVIE ID
================================ */


const params =
new URLSearchParams(
window.location.search
);



const movieID =
params.get("id");




if(!movieID){

console.log(
"No movie ID found"
);

return;

}







/* ===============================
        TMDB FETCH
================================ */


async function fetchMovie(endpoint){


try{


const response = await fetch(

`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`

);



const data =
await response.json();



return data;



}

catch(error){


console.log(
"TMDB ERROR:",
error
);


return null;


}



}









/* ===============================
        LOAD MOVIE DETAILS
================================ */


async function loadMovie(){


const movie =
await fetchMovie(
`/movie/${movieID}`
);



if(!movie)
return;







// BACKDROP


const backdrop =
document.querySelector(
".movie-backdrop"
);



if(backdrop){


backdrop.style.backgroundImage =

`

linear-gradient(
90deg,
#050505,
rgba(0,0,0,.4)
),

url(
${IMAGE_URL}${movie.backdrop_path}
)

`;

}







// POSTER


const poster =
document.querySelector(
"#moviePoster"
);



if(poster){


poster.src = movie.poster_path

?
POSTER_URL + movie.poster_path

:
"assets/images/no-image.jpg";


}









// TITLE


const title =
document.querySelector(
"#movieTitle"
);



if(title){

title.textContent =
movie.title;

}








// RATING


const rating =
document.querySelector(
"#movieRating"
);



if(rating){

rating.innerHTML =

`
⭐ ${movie.vote_average.toFixed(1)}
`;

}








// YEAR


const year =
document.querySelector(
"#movieYear"
);



if(year){

year.textContent =

movie.release_date
?
movie.release_date.substring(0,4)
:
"N/A";

}








// RUNTIME


const runtime =
document.querySelector(
"#movieRuntime"
);



if(runtime){

runtime.textContent =

`${movie.runtime || 0} min`;

}








// DESCRIPTION


const description =
document.querySelector(
"#movieDescription"
);



if(description){

description.textContent =

movie.overview ||
"No description available";

}








// GENRES


const genres =
document.querySelector(
"#movieGenres"
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



}









const watchBtn =
document.querySelector(".watch-trailer");


if(watchBtn){

watchBtn.addEventListener(
"click",
()=>{


document
.querySelector("#trailerBox")
.scrollIntoView({

behavior:"smooth"

});


});


}

/* ===============================
        CAST
================================ */


async function loadCast(){


const data =
await fetchMovie(

`/movie/${movieID}/credits`

);



const container =
document.querySelector(
"#castContainer"
);



if(!container || !data)
return;



container.innerHTML="";





data.cast
.slice(0,10)
.forEach(actor=>{



const image = actor.profile_path

?

POSTER_URL + actor.profile_path

:

"assets/images/no-user.jpg";






container.innerHTML +=

`

<div class="cast-card">


<img src="${image}">


<h3>

${actor.name}

</h3>


<p>

${actor.character}

</p>


</div>

`;



});



}









/* ===============================
        SIMILAR MOVIES
================================ */


async function loadSimilar(){



const data =
await fetchMovie(

`/movie/${movieID}/similar`

);



const container =
document.querySelector(
"#similarMovies"
);



if(!container || !data)
return;



container.innerHTML="";






data.results
.slice(0,10)
.forEach(movie=>{



const poster =
movie.poster_path

?

POSTER_URL + movie.poster_path

:

"assets/images/no-image.jpg";






container.innerHTML +=

`

<div class="movie-card"
onclick="window.location.href='movie.html?id=${movie.id}'">


<img src="${poster}">


<h3>

${movie.title}

</h3>


<p>

⭐ ${movie.vote_average.toFixed(1)}

</p>


</div>

`;



});



}









/* ===============================
        WATCH TRAILER BUTTON
================================ */


const watchBtn =
document.querySelector(
".watch"
);



watchBtn?.addEventListener(
"click",
()=>{


document
.querySelector("#trailerBox")
.scrollIntoView({

behavior:"smooth"

});


});









/* ===============================
        START ENGINE
================================ */


loadMovie();

loadTrailer();

loadCast();

loadSimilar();




});