/* ==================================
   TRAP MOVIES
   PREMIUM MOVIE DETAILS ENGINE V2
   TMDB + TRAILER + CAST + LIST
================================== */


document.addEventListener("DOMContentLoaded",()=>{


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



if(!movieID){

console.log("Movie ID missing");

return;

}







/* =========================
        FETCH SYSTEM
========================= */


async function fetchTMDB(url){


try{


const response =
await fetch(

`${BASE_URL}${url}?api_key=${API_KEY}&language=en-US`

);


return await response.json();


}

catch(error){


console.log(error);

return null;


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



if(!movie) return;







// BACKDROP

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








// POSTER

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


}







// BASIC INFO


updateText(
"movieTitle",
movie.title
);



updateText(
"movieYear",
movie.release_date?.slice(0,4)
);



updateText(
"movieRuntime",
movie.runtime + " min"
);



updateText(
"moviePopularity",
Math.floor(movie.popularity)
+
" Views"
);



updateText(
"movieDescription",
movie.overview
);



updateText(
"storyText",
movie.overview
);









// RATING

const rating =
document.getElementById(
"movieRating"
);



if(rating){

rating.innerHTML =
`
⭐ ${movie.vote_average.toFixed(1)}
`;

}







// GENRES

const genres =
document.getElementById(
"movieGenres"
);



if(genres){


genres.innerHTML="";


movie.genres.forEach(item=>{


genres.innerHTML +=

`
<span>
${item.name}
</span>

`;

});


}









// MONEY


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




loadWatchlist(movie);


}









/* =========================
        TRAILER
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
data.results.find(video=>

video.type==="Trailer"
&&
video.site==="YouTube"

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


box.innerHTML=

`
<p>
Trailer unavailable
</p>

`;

}


}









/* =========================
        CAST
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




data.cast
.slice(0,12)
.forEach(actor=>{



const image =

actor.profile_path

?

IMAGE_URL+actor.profile_path

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









/* =========================
        CREW
========================= */


async function loadCrew(){


const data =
await fetchTMDB(

`/movie/${movieID}/credits`

);



if(!data)
return;





const director =
data.crew.find(
person=>

person.job==="Director"

);



const writers =

data.crew

.filter(person=>

person.job==="Writer"
||
person.job==="Screenplay"

)

.slice(0,3)

.map(person=>

person.name

)

.join(", ");





updateText(
"movieDirector",
director?.name
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

movie.production_companies

?.map(x=>x.name)

.join(", ")

);



updateText(

"movieCountry",

movie.production_countries

?.map(x=>x.name)

.join(", ")

);



updateText(

"movieLanguages",

movie.spoken_languages

?.map(x=>x.english_name)

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

IMAGE_URL+movie.poster_path

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









/* =========================
        MY LIST
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
localStorage.getItem("watchlist")
)

|| [];





button.onclick=()=>{


const exists =

list.find(
item=>item.id===movie.id
);





if(exists){


list =

list.filter(
item=>item.id!==movie.id
);


button.innerHTML=

"+ My List";


}

else{


list.push({

id:movie.id,

title:movie.title,

poster:movie.poster_path

});


button.innerHTML=

"✓ Added";


}





localStorage.setItem(

"watchlist",

JSON.stringify(list)

);


};



}









/* =========================
        TRAILER BUTTON
========================= */


document.querySelector(".watch")
?.addEventListener(
"click",
()=>{


document
.getElementById("trailerBox")
?.scrollIntoView({

behavior:"smooth"

});


});









/* START ENGINE */


loadMovie();

loadTrailer();

loadCast();

loadCrew();

loadCompany();

loadSimilar();



});









window.openMovie=function(id){


window.location.href=

`movie.html?id=${id}`;


};