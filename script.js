/* ==================================
        TRAP MOVIES
        script.js
        PART 1/3
        CORE SYSTEM
        CLEAN VERSION
================================== */


document.addEventListener("DOMContentLoaded", () => {

"use strict";



/* =========================
        TMDB CONFIG
========================= */


const API_KEY = "YOUR_TMDB_API_KEY";

const BASE_URL =
"https://api.themoviedb.org/3";


const IMAGE_URL =
"https://image.tmdb.org/t/p/w500/";






/* =========================
        GLOBAL ELEMENTS
========================= */


const movieContainers =
document.querySelectorAll(".movie-container");






/* =========================
        TMDB FETCH SYSTEM
========================= */


async function fetchTMDB(endpoint){


try{


const response = await fetch(

`${BASE_URL}${endpoint}`

);



if(!response.ok){

throw new Error(
"TMDB Request Failed"
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








async function getMovies(endpoint){


const data = await fetchTMDB(

`${endpoint}?api_key=${API_KEY}&language=en-US`

);



return data?.results || [];


}









/* =========================
        MOVIE CARD SYSTEM
========================= */


function createMovieCard(movie){



const poster = movie.poster_path

?

IMAGE_URL + movie.poster_path

:

"assets/images/no-image.jpg";




const title =

movie.title ||

movie.name ||

"Unknown";




const rating =

movie.vote_average

?

movie.vote_average.toFixed(1)

:

"N/A";





return `


<div class="movie-card"

data-id="${movie.id}">



<img

src="${poster}"

alt="${title}"

loading="lazy">





<h3>

${title}

</h3>



<p>

⭐ ${rating}

</p>




</div>


`;



}









/* =========================
        LOAD HOME MOVIES
========================= */


async function loadMovies(){



const sections = [


"/trending/movie/week",


"/movie/popular",


"/movie/now_playing",


"/movie/top_rated",


"/movie/upcoming"


];






for(
let i = 0;
i < movieContainers.length;
i++
){



if(!sections[i])
continue;




const movies = await getMovies(
sections[i]
);




movieContainers[i].innerHTML =

movies
.map(createMovieCard)
.join("");



}



}








/* =========================
        MOVIE CLICK SYSTEM
========================= */


document.addEventListener(
"click",
(e)=>{


const card =

e.target.closest(
".movie-card"
);




if(!card)
return;




const id =
card.dataset.id;



if(id){


window.location.href =

`movie.html?id=${id}`;


}



});









/* =========================
        WATCH HISTORY SAVE
========================= */


function saveHistory(movie){



let history =

JSON.parse(

localStorage.getItem(
"watchHistory"
)

)

|| [];




const exists =

history.some(

item=>item.id === movie.id

);





if(!exists){


history.unshift(movie);



history = history.slice(
0,
50
);



localStorage.setItem(

"watchHistory",

JSON.stringify(history)

);



}



}









/* =========================
        FAVORITE SYSTEM
========================= */


window.addFavorite = function(movie){



let favorites =

JSON.parse(

localStorage.getItem(
"favorites"
)

)

|| [];





const exists =

favorites.some(

item=>item.id === movie.id

);





if(!exists){



favorites.push(movie);



localStorage.setItem(

"favorites",

JSON.stringify(favorites)

);



}



};









/* =========================
        START CORE
========================= */


loadMovies();



});
/* ==================================
        TRAP MOVIES
        script.js
        PART 2/3
        MENU + SEARCH + SLIDER
================================== */



/* =========================
        SIDE MENU SYSTEM
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



document.body.style.overflow =
"hidden";


}






function closeMenu(){


sideMenu?.classList.remove(
"active"
);



overlay?.classList.remove(
"active"
);



document.body.style.overflow =
"";


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
document.querySelectorAll(
".slide"
);



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



if(
currentSlide >= slides.length
){


currentSlide = 0;


}





showSlide(
currentSlide
);



}








function startSlider(){



clearInterval(
sliderTimer
);



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


currentSlide = index;


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



document.body.style.overflow =
"hidden";



searchInput?.focus();



}








function closeSearch(){



searchPage?.classList.remove(
"active"
);



document.body.style.overflow =
"";


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



const data = await fetchTMDB(


`/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`


);



return data?.results || [];


}









let searchTimer;






searchInput?.addEventListener(

"input",

()=>{



clearTimeout(
searchTimer
);





searchTimer =

setTimeout(async()=>{



const value =

searchInput.value.trim();





if(!value){



searchResults.innerHTML = "";

return;


}






searchResults.innerHTML =

`

<div class="loading">

Searching...

</div>

`;






const movies =

await searchMovies(
value
);







searchResults.innerHTML =

movies

.map(createMovieCard)

.join("");





},500);




});









/* =========================
        ESC KEY CLOSE
========================= */


document.addEventListener(

"keydown",

(e)=>{



if(e.key === "Escape"){



closeMenu();


closeSearch();



}



});
/* ==================================
        PART 3
        REELS + MOVIE DETAILS
        TRAILER + WATCHLIST
================================== */


/* =========================
        REELS SYSTEM
========================= */


const reels =
document.querySelectorAll(".reel");


if(reels.length){


const reelObserver = new IntersectionObserver(

(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){

increaseViews(entry.target);

}


});


},

{
threshold:0.75
}


);



reels.forEach(reel=>{

reelObserver.observe(reel);

});





/* LIKE BUTTON */


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






/* DOUBLE TAP LIKE */


reels.forEach(reel=>{


let lastTap = 0;



reel.addEventListener(
"click",
(e)=>{


if(e.target.closest("button"))
return;



const now =
Date.now();



if(now - lastTap < 300){


const likeBtn =
reel.querySelector(".like-btn");



if(likeBtn){


likeBtn.classList.add(
"liked"
);


likeBtn.innerHTML="❤️";


showHeart(reel);


}


}



lastTap = now;



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



const views =
reel.querySelector(".views");



if(!views)
return;



if(reel.dataset.viewed)
return;



let count =
Number(
views.dataset.views || 0
);



count++;


views.dataset.views =
count;


views.textContent =
count+" views";



reel.dataset.viewed =
true;


}









/* =========================
        MOVIE DETAILS PAGE
========================= */


const movieContent =
document.querySelector(
".movie-content"
);



async function loadMovieDetails(){



const params =
new URLSearchParams(
window.location.search
);



const id =
params.get("id");



if(!id || !movieContent)
return;





const movie =
await fetchTMDB(

`/movie/${id}?api_key=${API_KEY}&language=en-US`

);



if(!movie)
return;





const poster =

movie.poster_path

?

IMAGE_URL + movie.poster_path

:

"assets/images/no-image.jpg";





movieContent.innerHTML = `


<div class="movie-poster">

<img 
src="${poster}"
alt="${movie.title}">

</div>




<div class="movie-info-box">


<h1>

${movie.title}

</h1>



<p>

${movie.overview || 
"No description available"}

</p>




<div class="movie-meta">


<span>
⭐ ${movie.vote_average?.toFixed(1) || "N/A"}
</span>


<br>


<span>
📅 ${movie.release_date || "Unknown"}
</span>


</div>




<button class="trailer-btn">

▶ Watch Trailer

</button>




<button class="watch-btn">

+ Add Watchlist

</button>



</div>



`;




saveHistory(movie);


loadTrailer(id);


}





loadMovieDetails();









/* =========================
        WATCH HISTORY
========================= */


function saveHistory(movie){


let history =

JSON.parse(

localStorage.getItem(
"watchHistory"
)

)

|| [];




const exists =

history.some(

item=>item.id === movie.id

);



if(!exists){


history.unshift({

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

movie.release_date.substring(0,4)

:

"N/A"


});



history =

history.slice(0,30);



localStorage.setItem(

"watchHistory",

JSON.stringify(history)

);



}



}









/* =========================
        TRAILER SYSTEM
========================= */


async function loadTrailer(id){



const button =
document.querySelector(
".trailer-btn"
);



const modal =
document.querySelector(
".trailer-modal"
);



const frame =
document.getElementById(
"trailerFrame"
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

`https://www.youtube.com/embed/${trailer.key}`;

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
        WATCHLIST SYSTEM
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



const params =
new URLSearchParams(
window.location.search
);



const id =
params.get("id");



if(!id)
return;





let watchlist =

JSON.parse(

localStorage.getItem(
"watchlist"
)

)

|| [];






const saved =

watchlist.some(

movie=>movie.id == id

);





if(saved){


watchlist =

watchlist.filter(

movie=>movie.id != id

);



button.innerHTML =
"+ Add Watchlist";



button.classList.remove(
"saved"
);



}

else{


watchlist.push({

id:id,

title:

document.querySelector(
".movie-info-box h1"
)?.textContent,


poster:

document.querySelector(
".movie-poster img"
)?.src.replace(
IMAGE_URL,
""
)


});





button.innerHTML =
"✓ Saved";


button.classList.add(
"saved"
);


}







localStorage.setItem(

"watchlist",

JSON.stringify(watchlist)

);



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