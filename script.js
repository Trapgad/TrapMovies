/* =========================
   TRAP MOVIES SCRIPT
   PHASE 2 FINAL FIX
   TMDB + MENU + SLIDER + SEARCH
========================= */


document.addEventListener("DOMContentLoaded",()=>{


/* =========================
        TMDB CONFIG
========================= */


const API_KEY = "17a1834e273320eef8a2a36b38a11964";

const BASE_URL =
"https://api.themoviedb.org/3";

const IMAGE_URL =
"https://image.tmdb.org/t/p/w500/";



/* =========================
        MOVIE LOADING
========================= */


const movieContainers =
document.querySelectorAll(".movie-container");



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







function createMovieCard(movie){


const poster = movie.poster_path

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


<img
src="${poster}"
alt="${title}"
>


<h3>
${title}
</h3>


<p>
⭐ ${rating}
</p>


</div>


`;



}









async function loadMovies(){



const sections=[


"/trending/movie/week",

"/movie/popular",

"/movie/now_playing",

"/movie/top_rated",

"/movie/upcoming"


];




for(let i=0;i<movieContainers.length;i++){



const movies =
await getMovies(sections[i]);



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


const overlayBg =
document.querySelector(".overlay-bg");





function openMenu(){


sideMenu?.classList.add("active");


overlayBg?.classList.add("active");


document.body.style.overflow="hidden";


}





function closeMenu(){


sideMenu?.classList.remove("active");


overlayBg?.classList.remove("active");


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



overlayBg?.addEventListener(
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


let currentSlide=0;


let timer;





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


if(currentSlide >= slides.length){

currentSlide=0;

}


showSlide(currentSlide);


}






function startSlider(){


timer=setInterval(

nextSlide,

5000

);


}





dots.forEach((dot,index)=>{


dot.onclick=()=>{


currentSlide=index;


showSlide(index);


clearInterval(timer);


startSlider();


};


});






if(slides.length){


showSlide(0);


startSlider();


}









/* =========================
        SEARCH
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


const response = await fetch(

`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`

);


const data =
await response.json();


return data.results || [];


}








function showSearchResults(movies){


searchResults.innerHTML="";



movies.forEach(movie=>{


searchResults.innerHTML +=

createMovieCard(movie);


});


}








searchInput?.addEventListener(
"input",
async()=>{


const value =
searchInput.value.trim();



if(value===""){


searchResults.innerHTML="";


return;


}




searchResults.innerHTML=

`
<div class="loading">
Searching...
</div>
`;



const movies =
await searchMovies(value);



showSearchResults(movies);



}

);






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


window.openMovie = function(id){

    window.location.href =
    `movie.html?id=${id}`;

};
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