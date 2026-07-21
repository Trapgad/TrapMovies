/* ==================================
        TRAP MOVIES
        script.js
        PART 1
        CORE SYSTEM
================================== */

document.addEventListener("DOMContentLoaded", () => {

"use strict";

/* =========================
        TMDB CONFIG
========================= */

const API_KEY = "YOUR_TMDB_API_KEY";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

/* =========================
        COMMON ELEMENTS
========================= */

const movieContainers =
document.querySelectorAll(".movie-container");

const searchInput =
document.getElementById("searchInput");

const searchResults =
document.getElementById("searchResults");

/* =========================
        FETCH DATA
========================= */

async function fetchTMDB(endpoint){

    try{

        const response = await fetch(
            `${BASE_URL}${endpoint}`
        );

        if(!response.ok){
            throw new Error(
                `HTTP ${response.status}`
            );
        }

        return await response.json();

    }

    catch(error){

        console.error(error);

        return null;

    }

}

/* =========================
        GET MOVIES
========================= */

async function getMovies(endpoint){

    const data = await fetchTMDB(

`${endpoint}?api_key=${API_KEY}&language=en-US`

    );

    return data?.results || [];

}

/* =========================
        MOVIE CARD
========================= */

function createMovieCard(movie){

    const poster = movie.poster_path
    ? IMAGE_URL + movie.poster_path
    : "assets/images/no-image.jpg";

    const title =
    movie.title ||
    movie.name ||
    "Unknown";

    const rating =
    movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";

    return `

<div class="movie-card"
data-id="${movie.id}">

<img
src="${poster}"
alt="${title}"
loading="lazy">

<h3>${title}</h3>

<p>⭐ ${rating}</p>

</div>

`;

}

/* =========================
        LOAD MOVIES
========================= */

async function loadMovies(){

const sections=[

"/trending/movie/week",

"/movie/popular",

"/movie/now_playing",

"/movie/top_rated",

"/movie/upcoming"

];

for(let i=0;i<movieContainers.length;i++){

    if(!sections[i]) continue;

    const movies =
    await getMovies(sections[i]);

    movieContainers[i].innerHTML =

movies.map(createMovieCard).join("");

}

}

/* =========================
        OPEN MOVIE
========================= */

document.addEventListener("click",(e)=>{

const card = e.target.closest(".movie-card");

if(!card) return;

const id = card.dataset.id;

window.location.href =
`movie.html?id=${id}`;

});

/* =========================
        START
========================= */

loadMovies();
/* ==================================
        PART 2
        MENU + SEARCH + SLIDER
================================== */


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

    sideMenu?.classList.add("active");

    overlay?.classList.add("active");

    document.body.style.overflow="hidden";

}



function closeMenu(){

    sideMenu?.classList.remove("active");

    overlay?.classList.remove("active");

    document.body.style.overflow="";

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



let currentSlide = 0;

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


if(currentSlide >= slides.length){

    currentSlide = 0;

}



showSlide(currentSlide);


}




function startSlider(){


clearInterval(sliderTimer);



sliderTimer =
setInterval(
nextSlide,
5000
);


}



dots.forEach(
(dot,index)=>{


dot.addEventListener(
"click",
()=>{


currentSlide=index;


showSlide(index);


startSlider();


});


});



if(slides.length){

showSlide(0);

startSlider();

}









/* =========================
        SEARCH SYSTEM
========================= */


const searchBtn =
document.querySelector(".search-btn");


const searchPage =
document.querySelector(".search-page");


const backSearch =
document.querySelector(".back-search");




function openSearch(){


searchPage?.classList.add(
"active"
);


document.body.style.overflow="hidden";


searchInput?.focus();


}




function closeSearch(){


searchPage?.classList.remove(
"active"
);


document.body.style.overflow="";


}




searchBtn?.addEventListener(
"click",
openSearch
);



backSearch?.addEventListener(
"click",
closeSearch
);







/* =========================
        SEARCH MOVIES
========================= */


async function searchMovies(query){


const data =
await fetchTMDB(

`/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`

);



return data?.results || [];


}




let searchTimer;



searchInput?.addEventListener(
"input",
()=>{


clearTimeout(searchTimer);



searchTimer =
setTimeout(async()=>{


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



searchResults.innerHTML =

movies
.map(createMovieCard)
.join("");



},500);



});








/* =========================
        ESC KEY
========================= */


document.addEventListener(
"keydown",
(e)=>{


if(e.key==="Escape"){


closeMenu();

closeSearch();


}



});
/* ==================================
        PART 3
        REELS + DETAILS + TRAILER
================================== */


/* =========================
        REELS SYSTEM
========================= */

const reels =
document.querySelectorAll(".reel");



if(reels.length){


const observer =
new IntersectionObserver(

(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


increaseViews(entry.target);


}


});


},

{
threshold:.75
}

);



reels.forEach(reel=>{

observer.observe(reel);

});



/* LIKE SYSTEM */

document
.querySelectorAll(".like-btn")
.forEach(button=>{


button.addEventListener(
"click",
(e)=>{


e.stopPropagation();


button.classList.toggle(
"liked"
);



button.innerHTML =

button.classList.contains("liked")

?

"❤️"

:

"🤍";


});

});





/* DOUBLE TAP */


reels.forEach(reel=>{


let lastTap = 0;


reel.addEventListener(
"click",
(e)=>{


if(e.target.closest("button"))
return;



const now =
Date.now();



if(now-lastTap <300){


const like =
reel.querySelector(
".like-btn"
);



if(like){


like.classList.add(
"liked"
);


like.innerHTML="❤️";


showHeart(reel);


}


}


lastTap=now;


});



});



}



function showHeart(reel){


const heart =
document.createElement("div");


heart.className =
"double-heart";


heart.innerHTML="❤️";


reel.appendChild(heart);



setTimeout(()=>{


heart.remove();


},800);


}






function increaseViews(reel){


const view =
reel.querySelector(".views");



if(!view ||
reel.dataset.viewed)

return;



let count =
Number(
view.dataset.views || 0
);



count++;


reel.dataset.viewed="true";


view.dataset.views=count;


view.textContent =
count+" views";


}










/* =========================
        MOVIE DETAILS
========================= */


const movieContent =
document.querySelector(
".movie-content"
);



async function loadMovieDetails(){


const params =
new URLSearchParams(
location.search
);



const id =
params.get("id");



if(!id || !movieContent)
return;



const data =
await fetchTMDB(

`/movie/${id}?api_key=${API_KEY}&language=en-US`

);



if(!data)
return;



const poster =
data.poster_path

?

IMAGE_URL + data.poster_path

:

"assets/images/no-image.jpg";




movieContent.innerHTML = `


<div class="movie-poster">

<img 
src="${poster}"
alt="${data.title}">

</div>



<div class="movie-info-box">


<h1>
${data.title}
</h1>



<p>

${data.overview ||
"No description available"}

</p>



<div class="movie-meta">

⭐ ${data.vote_average?.toFixed(1)}

<br>

📅 ${data.release_date}

</div>



<button class="trailer-btn">

▶ Watch Trailer

</button>



<button class="watch-btn">

+ Add Watchlist

</button>


</div>

`;



loadTrailer(id);


}



loadMovieDetails();









/* =========================
        TRAILER
========================= */


async function loadTrailer(id){


const modal =
document.querySelector(
".trailer-modal"
);


const frame =
document.getElementById(
"trailerFrame"
);



const button =
document.querySelector(
".trailer-btn"
);



if(!button)
return;



const data =
await fetchTMDB(

`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`

);



const trailer =
data?.results?.find(

video=>

video.type==="Trailer"

&&

video.site==="YouTube"

);



if(!trailer)
return;



button.addEventListener(
"click",
()=>{


modal?.classList.add(
"active"
);



if(frame){

frame.src =
`https://youtube.com/embed/${trailer.key}`;

}


});




document
.querySelector(".close-trailer")
?.addEventListener(
"click",
()=>{


modal?.classList.remove(
"active"
);


if(frame)
frame.src="";


});


}









/* =========================
        WATCHLIST
========================= */


document.addEventListener(
"click",
(e)=>{


const button =
e.target.closest(
".watch-btn"
);



if(!button)
return;



button.classList.toggle(
"saved"
);



button.innerHTML =

button.classList.contains("saved")

?

"✓ Saved"

:

"+ Add Watchlist";


});









/* =========================
        BACK BUTTON
========================= */


document
.querySelector(".back-btn")
?.addEventListener(
"click",
()=>{


history.back();


});