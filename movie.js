/* ==================================
   TRAP MOVIES - MOVIE DETAILS JS
   PHASE 3
   TMDB MOVIE DETAILS ENGINE
================================== */


document.addEventListener("DOMContentLoaded",()=>{


/* ===============================
        TMDB CONFIG
================================ */


const API_KEY = "17a1834e273320eef8a2a36b38a11964";

const BASE_URL = "https://api.themoviedb.org/3";

const IMAGE_URL = 
"https://image.tmdb.org/t/p/original/";

const POSTER_URL =
"https://image.tmdb.org/t/p/w500/";




/* ===============================
        GET MOVIE ID
================================ */


const urlParams = new URLSearchParams(
window.location.search
);


const movieID = urlParams.get("id");



if(!movieID){

console.log("No movie selected");

return;

}






/* ===============================
        FETCH FUNCTION
================================ */


async function fetchMovie(url){


try{


const response = await fetch(

`${BASE_URL}${url}?api_key=${API_KEY}`

);



const data = await response.json();


return data;



}

catch(error){

console.log(error);

}


}








/* ===============================
        MOVIE DETAILS
================================ */


async function loadMovie(){


const movie = await fetchMovie(

`/movie/${movieID}`

);



if(!movie)
return;





/* BACKGROUND */


const backdrop = document.querySelector(
".movie-backdrop"
);



if(backdrop){


backdrop.style.backgroundImage =

`
linear-gradient(
90deg,
#050505,
transparent
),
url(
${IMAGE_URL + movie.backdrop_path}
)
`;

}







/* POSTER */


const poster = document.querySelector(
".movie-poster"
);



if(poster){

poster.src =

POSTER_URL + movie.poster_path;


}





/* TITLE */


const title = document.querySelector(
".movie-title"
);



if(title){

title.textContent =
movie.title;


}







/* OVERVIEW */


const overview = document.querySelector(
".movie-description"
);



if(overview){

overview.textContent =
movie.overview;


}







/* RATING */


const rating = document.querySelector(
".movie-rating"
);



if(rating){

rating.innerHTML =

`
⭐ ${movie.vote_average.toFixed(1)}
`;

}








/* RELEASE DATE */


const date = document.querySelector(
".movie-date"
);



if(date){

date.textContent =
movie.release_date;


}









/* RUNTIME */


const runtime = document.querySelector(
".movie-runtime"
);



if(runtime){

runtime.textContent =

`${movie.runtime} min`;

}







/* GENRES */


const genres = document.querySelector(
".movie-genres"
);



if(genres){


genres.innerHTML="";


movie.genres.forEach(g=>{


genres.innerHTML +=

`
<span>
${g.name}
</span>
`;


});


}






}









/* ===============================
        TRAILER
================================ */


async function loadTrailer(){



const data = await fetchMovie(

`/movie/${movieID}/videos`

);





if(!data)
return;




const trailer = data.results.find(video=>

video.type==="Trailer" &&
video.site==="YouTube"

);






const trailerBtn =
document.querySelector(
".watch-trailer"
);




if(trailerBtn && trailer){



trailerBtn.onclick=()=>{


window.open(

`https://youtube.com/watch?v=${trailer.key}`,

"_blank"

);


};


}




}










/* ===============================
        CAST
================================ */


async function loadCast(){


const data = await fetchMovie(

`/movie/${movieID}/credits`

);




const castBox =
document.querySelector(
".cast-container"
);




if(!castBox)
return;




castBox.innerHTML="";



data.cast.slice(0,10).forEach(person=>{



const image = person.profile_path

?
POSTER_URL + person.profile_path

:
"assets/images/no-user.jpg";





castBox.innerHTML +=


`

<div class="cast-card">


<img src="${image}">


<h3>
${person.name}
</h3>


<p>
${person.character}
</p>


</div>

`;



});



}









/* ===============================
        SIMILAR MOVIES
================================ */


async function loadSimilar(){



const movies = await fetchMovie(

`/movie/${movieID}/similar`

);




const container =
document.querySelector(
".similar-container"
);




if(!container)
return;





container.innerHTML="";




movies.results.slice(0,10)
.forEach(movie=>{



const poster = movie.poster_path

?
POSTER_URL + movie.poster_path

:
"assets/images/no-image.jpg";





container.innerHTML +=


`

<div class="movie-card"
onclick="
location.href='movie.html?id=${movie.id}'
">


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
        RUN ALL
================================ */


loadMovie();

loadTrailer();

loadCast();

loadSimilar();





});