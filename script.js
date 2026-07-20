/* =========================
   TRAP MOVIES SCRIPT
========================= */


document.addEventListener("DOMContentLoaded",()=>{



/* =========================
      TMDB API SETUP
========================= */


const TMDB_API_KEY = "17a1834e273320eef8a2a36b38a11964";


const TMDB_BASE_URL =
"https://api.themoviedb.org/3";


const IMAGE_URL =
"https://image.tmdb.org/t/p/w500";







/* =========================
      ELEMENTS
========================= */


const menuBtn =
document.querySelector(".menu-btn");


const closeBtn =
document.querySelector(".close-btn");


const sideMenu =
document.querySelector(".side-menu");


const overlayBg =
document.querySelector(".overlay-bg");



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







/* =========================
      SIDE MENU
========================= */


function openMenu(){


if(sideMenu){

sideMenu.classList.add("active");

}



if(overlayBg){

overlayBg.classList.add("active");

}


}





function closeMenu(){


if(sideMenu){

sideMenu.classList.remove("active");

}



if(overlayBg){

overlayBg.classList.remove("active");

}


}





if(menuBtn){

menuBtn.onclick = openMenu;

}



if(closeBtn){

closeBtn.onclick = closeMenu;

}



if(overlayBg){

overlayBg.onclick = closeMenu;

}








/* =========================
      SEARCH OVERLAY
========================= */


function openSearch(){


if(searchPage){


searchPage.classList.add("active");


document.body.style.overflow="hidden";



setTimeout(()=>{


if(searchInput){

searchInput.focus();

}


},300);



}


}







function closeSearch(){


if(searchPage){


searchPage.classList.remove("active");


document.body.style.overflow="";


}



}





if(searchBtn){

searchBtn.onclick=openSearch;

}



if(backSearch){

backSearch.onclick=closeSearch;

}









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









/* =========================
      HERO SLIDER
========================= */


const slides =
document.querySelectorAll(".slide");


const dots =
document.querySelectorAll(".slider-dots span");



let currentSlide = 0;


let sliderTimer;







function showSlide(index){


if(!slides.length)
return;



slides.forEach(slide=>{


slide.classList.remove("active");


});




dots.forEach(dot=>{


dot.classList.remove("active");


});






slides[index].classList.add("active");




if(dots[index]){


dots[index].classList.add("active");


}



}








function nextSlide(){


currentSlide++;



if(currentSlide >= slides.length){


currentSlide = 0;


}




showSlide(currentSlide);



}







function startSlider(){


sliderTimer =
setInterval(
nextSlide,
5000
);


}







function resetSlider(){


clearInterval(sliderTimer);


startSlider();


}






dots.forEach((dot,index)=>{


dot.onclick=()=>{


currentSlide=index;


showSlide(currentSlide);


resetSlider();



};


});







if(slides.length){


showSlide(0);


startSlider();


}
/* =========================
      TMDB MOVIE LOADER
========================= */


async function getMovies(type, container){


try{


const response = await fetch(

`${TMDB_BASE_URL}/movie/${type}?api_key=${TMDB_API_KEY}&language=en-US&page=1`

);



const data = await response.json();



container.innerHTML="";



data.results.forEach(movie=>{


const card = document.createElement("div");


card.classList.add("movie-card");



card.innerHTML = `


<img 
src="${
movie.poster_path 
? IMAGE_URL + movie.poster_path
: "assets/images/no-image.jpg"
}"

alt="${movie.title}">



<h3>

${movie.title}

</h3>



<p>

⭐ ${movie.vote_average.toFixed(1)}

</p>


`;



container.appendChild(card);



});



}

catch(error){


console.log(
"TMDB Error:",
error
);


}



}








/* =========================
      LOAD MOVIE SECTIONS
========================= */


const movieContainers =
document.querySelectorAll(".movie-container");



if(movieContainers.length){



// 🔥 Trending

getMovies(
"popular",
movieContainers[0]
);



// ⭐ Popular

getMovies(
"popular",
movieContainers[1]
);



// 🎬 Latest Releases

getMovies(
"now_playing",
movieContainers[2]
);



// ❤️ Top Rated

getMovies(
"top_rated",
movieContainers[3]
);



// 🎭 Genres

getMovies(
"popular",
movieContainers[4]
);



}









/* =========================
      TMDB SEARCH
========================= */


if(searchInput){



searchInput.addEventListener(
"input",
async()=>{



let query =
searchInput.value.trim();




if(query===""){


searchResults.innerHTML="";


return;


}





try{



const response =
await fetch(

`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`

);



const data =
await response.json();




searchResults.innerHTML="";





data.results.slice(0,10)
.forEach(movie=>{



const card =
document.createElement("div");



card.classList.add(
"search-card"
);





card.innerHTML=`


<img

src="${
movie.poster_path
?
IMAGE_URL + movie.poster_path
:
"assets/images/no-image.jpg"
}"

>




<h3>

${movie.title}

</h3>



<p>

⭐ ${movie.vote_average}

</p>



`;



searchResults.appendChild(card);



});





}


catch(error){


console.log(
"Search Error:",
error
);


}




});



}







/* =========================
      SEARCH FILTERS
========================= */


const filters =
document.querySelectorAll(".filter");



filters.forEach(filter=>{



filter.onclick=()=>{



filters.forEach(btn=>{


btn.classList.remove("active");


});



filter.classList.add("active");



};



});







});