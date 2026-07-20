/* ==================================
   TRAP MOVIES
   MAIN SCRIPT ENGINE
   TMDB + MENU + SLIDER + SEARCH
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






/* =========================
        MOVIE CARDS
========================= */


const movieContainers =
document.querySelectorAll(".movie-container");





async function getMovies(endpoint){


try{


const response =
await fetch(

`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`

);


const data =
await response.json();


return data.results || [];


}

catch(error){


console.log(
"TMDB ERROR:",
error
);


return [];

}


}







function createMovieCard(movie){


const poster =

movie.poster_path

?

IMAGE_URL + movie.poster_path

:

"assets/images/no-image.jpg";



return `


<div class="movie-card"
onclick="openMovie(${movie.id})">


<img src="${poster}">


<h3>
${movie.title || "Unknown"}
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

}









async function loadMovies(){


const sections = [

"/trending/movie/week",

"/movie/popular",

"/movie/now_playing",

"/movie/top_rated",

"/movie/upcoming"

];



for(
let i=0;
i<movieContainers.length;
i++
){


const movies =
await getMovies(
sections[i]
);



movieContainers[i].innerHTML="";



movies.forEach(movie=>{


movieContainers[i].innerHTML +=

createMovieCard(movie);


});


}


}


loadMovies();








/* =========================
        SIDE MENU
========================= */


const menuBtn =
document.querySelector(".menu-btn");


const closeBtn =
document.querySelector(".close-btn");


const sideMenu =
document.querySelector(".side-menu");


const overlay =
document.querySelector(".overlay-bg");







function openMenu(){


sideMenu?.classList.add(
"active"
);


overlay?.classList.add(
"active"
);


}





function closeMenu(){


sideMenu?.classList.remove(
"active"
);


overlay?.classList.remove(
"active"
);


}







menuBtn?.addEventListener(
"click",
openMenu
);



closeBtn?.addEventListener(
"click",
closeMenu
);



overlay?.addEventListener(
"click",
closeMenu
);









/* =========================
        HERO SLIDER
========================= */


const slides =
document.querySelectorAll(".slide");


const dots =
document.querySelectorAll(
".slider-dots span"
);


let currentSlide=0;


let sliderTimer;







function showSlide(index){


slides.forEach(slide=>{

slide.classList.remove(
"active"
);

});


dots.forEach(dot=>{

dot.classList.remove(
"active"
);

});



slides[index]?.classList.add(
"active"
);


dots[index]?.classList.add(
"active"
);


}







function nextSlide(){


currentSlide++;


if(
currentSlide >= slides.length
){

currentSlide=0;

}


showSlide(
currentSlide
);


}






function startSlider(){


sliderTimer =
setInterval(
nextSlide,
5000
);


}






dots.forEach(
(dot,index)=>{


dot.onclick=()=>{


currentSlide=index;


showSlide(index);


clearInterval(
sliderTimer
);


startSlider();


};


});






if(slides.length){


showSlide(0);


startSlider();


}










/* =========================
        SEARCH SYSTEM
========================= */


const searchBtn =
document.querySelector(
".search-btn"
);


const searchPage =
document.querySelector(
".search-page"
);



const backSearch =
document.querySelector(
".back-search"
);



const searchInput =
document.querySelector(
"#searchInput"
);



const searchResults =
document.querySelector(
"#searchResults"
);









function openSearch(){


searchPage?.classList.add(
"active"
);


searchInput?.focus();


}







function closeSearch(){


searchPage?.classList.remove(
"active"
);


}








searchBtn?.addEventListener(
"click",
openSearch
);



backSearch?.addEventListener(
"click",
closeSearch
);









async function searchMovies(query){


try{


const response =
await fetch(

`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`

);


const data =
await response.json();


return data.results || [];


}

catch(error){


return [];

}


}








searchInput?.addEventListener(
"input",
async()=>{


const value =
searchInput.value.trim();



if(!value){


searchResults.innerHTML="";


return;


}



searchResults.innerHTML =

`
<div class="loading">
Searching...
</div>
`;



const movies =
await searchMovies(value);



searchResults.innerHTML="";



movies.forEach(movie=>{


searchResults.innerHTML +=

createMovieCard(movie);


});


}

);









/* =========================
        KEYBOARD CONTROL
========================= */


document.addEventListener(
"keydown",
(e)=>{


if(e.key==="Escape"){


closeMenu();

closeSearch();


}


});





});








/* =========================
        OPEN MOVIE PAGE
========================= */


function openMovie(id){


window.location.href =
`movie.html?id=${id}`;


}
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


const ORIGINAL_IMAGE =
"https://image.tmdb.org/t/p/original/";


const IMAGE_URL =
"https://image.tmdb.org/t/p/w500/";



const movieID =
new URLSearchParams(
window.location.search
).get("id");



if(!movieID){

console.log(
"No movie ID found"
);

return;

}





async function fetchData(endpoint){


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







function setText(selector,value){


const element =
document.querySelector(selector);



if(element){

element.textContent =
value || "N/A";

}


}









/* =========================
        MOVIE DETAILS
========================= */


async function loadMovie(){


const movie =
await fetchData(
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
rgba(5,5,5,.95),
rgba(5,5,5,.3)
),

url(${ORIGINAL_IMAGE}${movie.backdrop_path})

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

IMAGE_URL + movie.poster_path

:

"assets/images/no-image.jpg";


}






setText(
"#movieTitle",
movie.title
);



setText(
"#movieYear",
movie.release_date?.substring(0,4)
);



setText(
"#movieRuntime",
`${movie.runtime || 0} min`
);



setText(
"#movieDescription",
movie.overview
);



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


movie.genres.forEach(
genre=>{


genres.innerHTML +=

`

<span>
${genre.name}
</span>

`;

});


}





loadWatchlist(movie);


}









/* =========================
        TRAILER
========================= */


async function loadTrailer(){


const data =
await fetchData(
`/movie/${movieID}/videos`
);



const box =
document.querySelector(
"#trailerBox"
);



if(!box || !data)
return;





const trailer =
data.results.find(
video=>

video.type==="Trailer"
&&
video.site==="YouTube"

);






if(trailer){


box.innerHTML =

`

<iframe

src="
https://www.youtube.com/embed/${trailer.key}
"

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









/* =========================
        CAST
========================= */


async function loadCast(){


const data =
await fetchData(

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
.slice(0,12)
.forEach(actor=>{


const image =

actor.profile_path

?

IMAGE_URL + actor.profile_path

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









/* =========================
        CREW
========================= */


async function loadCrew(){


const data =
await fetchData(

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
.filter(
person=>

person.job==="Writer"
||
person.job==="Screenplay"

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









/* =========================
        PRODUCTION
========================= */


async function loadProduction(){


const movie =
await fetchData(
`/movie/${movieID}`
);



if(!movie)
return;





setText(

"#movieCompanies",

movie.production_companies
?.map(
company=>company.name
)
.join(", ")

);




setText(

"#movieCountry",

movie.production_countries
?.map(
country=>country.name
)
.join(", ")

);





setText(

"#movieLanguages",

movie.spoken_languages
?.map(
lang=>lang.english_name
)
.join(", ")

);


}









/* =========================
        SIMILAR MOVIES
========================= */


async function loadSimilar(){


const data =
await fetchData(

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




button.onclick=()=>{


let exists =
list.find(
item=>item.id===movie.id
);




if(exists){


list =
list.filter(
item=>item.id!==movie.id
);


button.innerHTML =
"+ Add To My List";


}

else{


list.push({

id:movie.id,

title:movie.title,

poster:movie.poster_path

});


button.innerHTML =
"✓ Added To My List";


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








/* START */

loadMovie();

loadTrailer();

loadCast();

loadCrew();

loadProduction();

loadSimilar();



});








function openMovie(id){

window.location.href =
`movie.html?id=${id}`;

}