/* ==================================
   TRAP MOVIES
   MOVIE DETAILS ENGINE
   PREMIUM VERSION
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



const movieID =
new URLSearchParams(
window.location.search
).get("id");



if(!movieID){

console.log("Movie ID missing");

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

console.log(
"TMDB ERROR",
error
);

return null;

}


}







function setText(id,value){


const element =
document.querySelector(id);


if(element){

element.textContent =
value || "N/A";

}


}









/* ===============================
        MAIN MOVIE DATA
================================ */


async function loadMovie(){


const movie =
await fetchMovie(
`/movie/${movieID}`
);



if(!movie)
return;





const backdrop =
document.querySelector(
".movie-backdrop"
);



if(backdrop && movie.backdrop_path){


backdrop.style.backgroundImage =

`
linear-gradient(
90deg,
#050505,
rgba(0,0,0,.35)
),
url(${IMAGE_URL}${movie.backdrop_path})
`;

}






const poster =
document.querySelector(
"#moviePoster"
);



if(poster){

poster.src =
movie.poster_path

?
POSTER_URL + movie.poster_path

:
"assets/images/no-image.jpg";

}





setText(
"#movieTitle",
movie.title
);



setText(
"#movieYear",
movie.release_date
?
movie.release_date.substring(0,4)
:
"N/A"
);



setText(
"#movieRuntime",
`${movie.runtime || 0} min`
);



setText(
"#movieDescription",
movie.overview ||
"No description available"
);





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





const genres =
document.querySelector(
"#movieGenres"
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






/* EXTRA INFORMATION */


setText(
"#movieLanguage",
movie.original_language?.toUpperCase()
);



setText(
"#moviePopularity",
movie.popularity?.toFixed(0)
);



setText(
"#movieBudget",
movie.budget
?
"$"+movie.budget.toLocaleString()
:
"N/A"
);



setText(
"#movieRevenue",
movie.revenue
?
"$"+movie.revenue.toLocaleString()
:
"N/A"
);



loadWatchlist(movie);


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
document.querySelector(
"#trailerBox"
);



if(!box || !data)
return;



const trailer =
data.results.find(video=>

video.type === "Trailer" &&
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
<p>
Trailer not available
</p>
`;

}


}









/* ===============================
        DIRECTOR + WRITERS
================================ */


async function loadCrew(){


const data =
await fetchMovie(

`/movie/${movieID}/credits`

);



if(!data)
return;



const director =
data.crew.find(
person =>
person.job === "Director"
);



const writers =
data.crew
.filter(
person =>
person.job === "Writer" ||
person.job === "Screenplay"
)
.slice(0,3)
.map(
person=>person.name
)
.join(", ");





setText(
"#movieDirector",
director?.name
);



setText(
"#movieWriter",
writers
);



}









/* ===============================
        PRODUCTION INFO
================================ */


async function loadProduction(){


const movie =
await fetchMovie(
`/movie/${movieID}`
);



if(!movie)
return;




const companies =
movie.production_companies
?.slice(0,3)
.map(
company=>company.name
)
.join(", ");





const countries =
movie.production_countries
?.map(
country=>country.name
)
.join(", ");





const languages =
movie.spoken_languages
?.map(
lang=>lang.english_name
)
.join(", ");





setText(
"#movieCompanies",
companies
);



setText(
"#movieCountry",
countries
);



setText(
"#movieLanguages",
languages
);



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
document.querySelector(
"#castContainer"
);



if(!box || !data)
return;



box.innerHTML="";



data.cast
.slice(0,10)
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
document.querySelector(
"#similarMovies"
);



if(!box || !data)
return;



box.innerHTML="";



data.results
.slice(0,10)
.forEach(movie=>{


box.innerHTML +=

`

<div class="movie-card"

onclick="openMovie(${movie.id})">


<img src="${
movie.poster_path
?
POSTER_URL + movie.poster_path
:
"assets/images/no-image.jpg"
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
        WATCHLIST
================================ */


function loadWatchlist(movie){


const button =
document.querySelector(
"#watchlistBtn"
);



if(!button)
return;



let list =
JSON.parse(
localStorage.getItem("watchlist")
)
|| [];



const exists =
list.some(
item=>item.id === movie.id
);




if(exists){

button.innerHTML =
"✓ Added To My List";

}






button.onclick = ()=>{


let movies =
JSON.parse(
localStorage.getItem("watchlist")
)
|| [];



const found =
movies.find(
item=>item.id === movie.id
);



if(found){


movies =
movies.filter(
item=>item.id !== movie.id
);


button.innerHTML =
"+ Add To My List";


}

else{


movies.push({

id:movie.id,

title:movie.title,

poster:movie.poster_path

});



button.innerHTML =
"✓ Added To My List";


}



localStorage.setItem(

"watchlist",

JSON.stringify(movies)

);


};


}









/* ===============================
        BUTTON SCROLL
================================ */


document
.querySelector(".watch")
?.addEventListener(
"click",
()=>{


document
.querySelector("#trailerBox")
?.scrollIntoView({

behavior:"smooth"

});


});









/* ===============================
        OPEN MOVIE
================================ */


window.openMovie =
function(id){

window.location.href =
`movie.html?id=${id}`;

};









/* ===============================
        START ENGINE
================================ */


loadMovie();

loadTrailer();

loadCrew();

loadProduction();

loadCast();

loadSimilar();



});
/* =========================
 MOVIE INFORMATION BOXES
========================= */


.movie-extra-info{

margin:50px 20px;

}



.movie-extra-info h2{

font-size:28px;

margin-bottom:25px;

}




.info-grid{

display:grid;

grid-template-columns:
repeat(auto-fit,minmax(220px,1fr));

gap:20px;

}





.info-box{

padding:25px;

border-radius:25px;

background:
rgba(255,255,255,.08);

backdrop-filter:
blur(20px);

border:
1px solid rgba(255,255,255,.15);

}



.info-box h3{

color:#e50914;

margin-bottom:10px;

}



.info-box p{

color:#ddd;

line-height:1.5;

}