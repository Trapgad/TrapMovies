/* ==================================
   TRAP MOVIES
   MOVIE DETAILS ENGINE
   PHASE 3 FINAL FIX
================================== */


document.addEventListener("DOMContentLoaded",()=>{


const API_KEY =
"17a1834e273320eef8a2a36b38a11964";


const BASE_URL =
"https://api.themoviedb.org/3";


const IMAGE_URL =
"https://image.tmdb.org/t/p/original/";


const POSTER_URL =
"https://image.tmdb.org/t/p/w500/";




const params =
new URLSearchParams(
window.location.search
);


const movieID =
params.get("id");



if(!movieID){

console.log("No movie ID");

return;

}





async function fetchMovie(endpoint){


try{


const response =
await fetch(

`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`

);


return await response.json();


}

catch(error){

console.log(error);

return null;

}


}








/* ===============================
        MOVIE DETAILS
================================ */


async function loadMovie(){


const movie =
await fetchMovie(
`/movie/${movieID}`
);



if(!movie)
return;




const backdrop =
document.querySelector(".movie-backdrop");



if(backdrop && movie.backdrop_path){


backdrop.style.backgroundImage =

`
linear-gradient(
90deg,
#050505,
rgba(0,0,0,.3)
),
url(${IMAGE_URL}${movie.backdrop_path})
`;

}






const poster =
document.querySelector("#moviePoster");


if(poster){

poster.src = movie.poster_path

?
POSTER_URL + movie.poster_path

:
"assets/images/no-image.jpg";

}







document.querySelector("#movieTitle")
.textContent =
movie.title;






document.querySelector("#movieRating")
.innerHTML =
`
⭐ ${movie.vote_average.toFixed(1)}
`;






document.querySelector("#movieYear")
.textContent =
movie.release_date
?
movie.release_date.substring(0,4)
:
"N/A";






document.querySelector("#movieRuntime")
.textContent =
`${movie.runtime || 0} min`;






document.querySelector("#movieDescription")
.textContent =
movie.overview ||
"No description available";






const genres =
document.querySelector("#movieGenres");



genres.innerHTML="";



movie.genres.forEach(g=>{


genres.innerHTML +=

`
<span>${g.name}</span>
`;


});


}










/* ===============================
        TRAILER
================================ */


async function loadTrailer(){


const data =
await fetchMovie(

`/movie/${movieID}/videos`

);



const box =
document.querySelector("#trailerBox");



if(!box)
return;



const trailer =
data.results.find(video=>

video.type==="Trailer"
&&
video.site==="YouTube"

);





if(trailer){


box.innerHTML =

`

<iframe

width="100%"

height="400"

src="https://www.youtube.com/embed/${trailer.key}"

allowfullscreen>

</iframe>

`;



}

else{


box.innerHTML=

`
<p>
Trailer not available
</p>
`;

}



}










/* ===============================
        CAST
================================ */


async function loadCast(){


const data =
await fetchMovie(

`/movie/${movieID}/credits`

);



const box =
document.querySelector("#castContainer");


if(!box)
return;



box.innerHTML="";



data.cast.slice(0,10)
.forEach(actor=>{


const image =
actor.profile_path

?
POSTER_URL + actor.profile_path

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



const box =
document.querySelector("#similarMovies");



if(!box)
return;



box.innerHTML="";



data.results.slice(0,10)
.forEach(movie=>{


box.innerHTML +=


`

<div class="movie-card"

onclick="location.href='movie.html?id=${movie.id}'">


<img src="${
movie.poster_path
?
POSTER_URL + movie.poster_path
:
'assets/images/no-image.jpg'
}">


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
        TRAILER BUTTON
================================ */


document.querySelector(".watch")
?.addEventListener(
"click",
()=>{


document
.querySelector("#trailerBox")
.scrollIntoView({

behavior:"smooth"

});


});







/* START */

loadMovie();

loadTrailer();

loadCast();

loadSimilar();



});