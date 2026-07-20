/* =========================
   TRAP MOVIES SCRIPT
========================= */


document.addEventListener("DOMContentLoaded",()=>{



/* =========================
      ELEMENTS
========================= */


const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const sideMenu = document.querySelector(".side-menu");
const overlayBg = document.querySelector(".overlay-bg");


const searchBtn = document.querySelector(".search-btn");
const searchPage = document.querySelector(".search-page");
const backSearch = document.querySelector(".back-search");
const searchInput = document.querySelector("#searchInput");
const searchResults = document.querySelector("#searchResults");





/* =========================
      SIDE MENU
========================= */


function openMenu(){

    if(sideMenu)
    sideMenu.classList.add("active");


    if(overlayBg)
    overlayBg.classList.add("active");

}



function closeMenu(){

    if(sideMenu)
    sideMenu.classList.remove("active");


    if(overlayBg)
    overlayBg.classList.remove("active");

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
      ESCAPE KEY
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


const slides=document.querySelectorAll(".slide");

const dots=document.querySelectorAll(".slider-dots span");


let currentSlide=0;

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

currentSlide=0;

}


showSlide(currentSlide);


}





function startSlider(){


sliderTimer=setInterval(

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
      SEARCH FILTERS
========================= */


const filters=document.querySelectorAll(".filter");



filters.forEach(filter=>{


filter.onclick=()=>{


filters.forEach(btn=>{

btn.classList.remove("active");

});



filter.classList.add("active");


};


});









/* =========================
      SEARCH INPUT
========================= */


if(searchInput){


searchInput.addEventListener(
"input",
()=>{


let value=searchInput.value.trim();



if(!searchResults)
return;



if(value===""){


searchResults.innerHTML="";


return;


}





searchResults.innerHTML=`

<div class="search-card">

<h3>
${value}
</h3>

<p>
Searching TRAP MOVIES database...
</p>


</div>

`;



}

);


}





});