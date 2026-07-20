/* ==================================
        TRAP MOVIES JAVASCRIPT
        PHASE 2 FINAL FIX
        PART 1/3

        TMDB + MENU + SLIDER + SEARCH
================================== */


document.addEventListener("DOMContentLoaded", () => {



/* =========================
        TMDB CONFIG
========================= */


const API_KEY = "17a1834e273320eef8a2a36b38a11964";

const BASE_URL =
"https://api.themoviedb.org/3";

const IMAGE_URL =
"https://image.tmdb.org/t/p/w500/";





/* =========================
        GET MOVIES
========================= */


async function getMovies(endpoint){


try{


const response = await fetch(

`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`

);


const data = await response.json();


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







/* =========================
        MOVIE CARD
========================= */


function createMovieCard(movie){


const poster =
movie.poster_path

?

IMAGE_URL + movie.poster_path

:

"assets/images/no-image.jpg";



const title =
movie.title || "Unknown";



const rating =
movie.vote_average

?

movie.vote_average.toFixed(1)

:

"N/A";





return `

<div class="movie-card"
onclick="openMovie(${movie.id})">


<img src="${poster}" alt="${title}">


<h3>${title}</h3>


<p>
⭐ ${rating}
</p>


</div>

`;



}







/* =========================
        LOAD HOME MOVIES
========================= */


const movieContainers =
document.querySelectorAll(".movie-container");



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



if(!sections[i]) continue;



const movies =
await getMovies(sections[i]);



movieContainers[i].innerHTML = "";



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
document.querySelectorAll(".slider-dots span");



let currentSlide = 0;

let sliderTimer = null;





function showSlide(index){


slides.forEach(slide=>{

slide.classList.remove("active");

});


dots.forEach(dot=>{

dot.classList.remove("active");

});



slides[index]?.classList.add("active");


dots[index]?.classList.add("active");


}







function nextSlide(){


currentSlide++;



if(
currentSlide >= slides.length
){

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


const searchInput =
document.querySelector("#searchInput");


const searchResults =
document.querySelector("#searchResults");







function openSearch(){


searchPage?.classList.add("active");


document.body.style.overflow="hidden";


searchInput?.focus();


}






function closeSearch(){


searchPage?.classList.remove("active");


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


console.log(error);


return [];


}


}







let searchTimeout;





searchInput?.addEventListener(
"input",
()=>{


clearTimeout(searchTimeout);



searchTimeout =
setTimeout(async()=>{



const value =
searchInput.value.trim();




if(value===""){


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



},500);



});







/* =========================
        ESC CLOSE
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
/* ==================================
        TRAP MOVIES REELS SYSTEM
        PART 2/3
================================== */


document.addEventListener("DOMContentLoaded",()=>{



const reels =
document.querySelectorAll(".reel");





/* =========================
        AUTO PLAY OBSERVER
========================= */


const reelObserver =
new IntersectionObserver(

(entries)=>{


entries.forEach(entry=>{


const reel =
entry.target;


const video =
reel.querySelector("video");



if(entry.isIntersecting){



if(video){


video.play()
.catch(()=>{});


}



increaseViews(reel);



}

else{



if(video){


video.pause();


}



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









/* =========================
        REMOVE LOADER
========================= */


document
.querySelectorAll(".reel video")
.forEach(video=>{



const loader =
video
.closest(".reel")
?.querySelector(".loading");





video.addEventListener(
"loadeddata",
()=>{


if(loader){


loader.style.display="none";


}


});



});









/* =========================
        LIKE SYSTEM
========================= */


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





if(
button.classList.contains("liked")
){


button.innerHTML="❤️";


}

else{


button.innerHTML="🤍";


}




});



});









/* =========================
        DOUBLE TAP LIKE
========================= */


reels.forEach(reel=>{



let lastTap = 0;





reel.addEventListener(
"click",
(e)=>{



// prevent button clicks

if(
e.target.closest("button")
)return;





const current =
Date.now();





if(
current - lastTap < 300
){



const likeBtn =
reel.querySelector(
".like-btn"
);



if(likeBtn){



likeBtn.classList.add(
"liked"
);



likeBtn.innerHTML="❤️";



showHeart(reel);



}



}



lastTap=current;



});



});










/* =========================
        BIG HEART EFFECT
========================= */


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









/* =========================
        MUTE BUTTON
========================= */


document
.querySelectorAll(".mute-btn")
.forEach(button=>{



button.addEventListener(
"click",
(e)=>{


e.stopPropagation();




const reel =
button.closest(".reel");



const video =
reel.querySelector("video");





if(video){



video.muted =
!video.muted;




button.innerHTML =

video.muted

?

"🔇"

:

"🔊";



}



});



});









/* =========================
        VIEW COUNTER
========================= */


function increaseViews(reel){



const viewText =
reel.querySelector(".views");



if(!viewText)
return;





if(
reel.dataset.viewed
)
return;





let views =
Number(
viewText.dataset.views || 0
);





views++;





reel.dataset.viewed =
"true";





viewText.dataset.views =
views;





viewText.innerHTML =

views + " views";



}









/* =========================
        BUTTON POP ANIMATION
========================= */


document
.querySelectorAll(".reel-actions button")
.forEach(button=>{



button.addEventListener(
"click",
()=>{



button.style.transform =
"scale(1.25)";





setTimeout(()=>{


button.style.transform =
"scale(1)";



},200);



});



});





});
/* ==================================
        TRAP MOVIES SYSTEM
        PART 3/3

        MOVIE PAGE
        TRAILER
        WATCHLIST
================================== */


document.addEventListener("DOMContentLoaded",()=>{



/* =========================
        GLOBAL CONFIG
========================= */


const API_KEY =
"17a1834e273320eef8a2a36b38a11964";


const BASE_URL =
"https://api.themoviedb.org/3";





/* =========================
        OPEN MOVIE PAGE
========================= */


window.openMovie = function(id){


window.location.href =
`movie.html?id=${id}`;


};









/* =========================
        MOVIE DETAILS PAGE
========================= */


const movieDetails =
document.querySelector(".movie-details");




async function getMovieDetails(id){



try{


const response =
await fetch(

`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`

);



return await response.json();


}

catch(error){


console.log(error);


return null;


}


}








async function loadMovieDetails(){



const params =
new URLSearchParams(
window.location.search
);



const movieId =
params.get("id");




if(!movieId)
return;





const movie =
await getMovieDetails(movieId);





if(!movie)
return;





const poster =

movie.poster_path

?

"https://image.tmdb.org/t/p/w500/" 
+
movie.poster_path

:

"assets/images/no-image.jpg";






movieDetails.innerHTML = `


<div class="details-poster">

<img src="${poster}">

</div>




<div class="details-info">


<h1>
${movie.title}
</h1>


<p>

${movie.overview}

</p>


<h3>

⭐ ${movie.vote_average.toFixed(1)}

</h3>



<button class="trailer-btn">

▶ Watch Trailer

</button>



<button class="watch-btn">

+ Add Watchlist

</button>



</div>


`;





getTrailer(movieId);



}





if(movieDetails){


loadMovieDetails();


}









/* =========================
        TRAILER SYSTEM
========================= */


const trailerModal =
document.querySelector(".trailer-modal");


const trailerFrame =
document.querySelector("#trailerFrame");



const closeTrailer =
document.querySelector(".close-trailer");






async function getTrailer(id){



try{


const response =
await fetch(

`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`

);



const data =
await response.json();





const trailer =
data.results.find(

video=>

video.type==="Trailer"

&&

video.site==="YouTube"

);





if(trailer){



const btn =
document.querySelector(
".trailer-btn"
);



btn?.addEventListener(
"click",
()=>{



trailerModal.classList.add(
"active"
);




trailerFrame.src =

`https://www.youtube.com/embed/${trailer.key}`;



});



}




}

catch(error){


console.log(error);


}



}








closeTrailer?.addEventListener(
"click",
()=>{



trailerModal.classList.remove(
"active"
);



trailerFrame.src="";



});









/* =========================
        WATCHLIST SYSTEM
        (Firebase Ready)
========================= */


document.addEventListener(
"click",
(e)=>{



if(
e.target.classList.contains(
"watch-btn"
)
){



const button =
e.target;



button.classList.toggle(
"saved"
);





if(
button.classList.contains(
"saved"
)
){


button.innerHTML =
"✓ Saved";



}

else{


button.innerHTML =
"+ Add Watchlist";



}



}



});









/* =========================
        BACK BUTTON
========================= */


const backBtn =
document.querySelector(".back-btn");



backBtn?.addEventListener(
"click",
()=>{


history.back();


});







});
