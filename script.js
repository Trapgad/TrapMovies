/* =========================
   TRAP MOVIES SCRIPT
========================= */


document.addEventListener("DOMContentLoaded",()=>{



/* =========================
      SIDE MENU
========================= */


const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const sideMenu = document.querySelector(".side-menu");
const overlayBg = document.querySelector(".overlay-bg");



function openMenu(){

    sideMenu.classList.add("active");
    overlayBg.classList.add("active");

}



function closeMenu(){

    sideMenu.classList.remove("active");
    overlayBg.classList.remove("active");

}




if(menuBtn){

menuBtn.addEventListener(
"click",
openMenu
);

}



if(closeBtn){

closeBtn.addEventListener(
"click",
closeMenu
);

}



if(overlayBg){

overlayBg.addEventListener(
"click",
closeMenu
);

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


const slides = document.querySelectorAll(".slide");

const dots = document.querySelectorAll(".slider-dots span");


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


sliderTimer = setInterval(

nextSlide,

5000

);


}




function resetSlider(){


clearInterval(sliderTimer);

startSlider();


}






dots.forEach((dot,index)=>{


dot.addEventListener(
"click",
()=>{


currentSlide=index;


showSlide(currentSlide);


resetSlider();


}

);


});





if(slides.length){


showSlide(0);

startSlider();


}








/* =========================
       SEARCH OVERLAY
========================= */


const searchBtn = document.querySelector(".search-btn");

const searchPage = document.querySelector(".search-page");

const backSearch = document.querySelector(".back-search");

const searchInput = document.querySelector("#searchInput");





function openSearch(){


searchPage.classList.add("active");


document.body.style.overflow="hidden";


setTimeout(()=>{


if(searchInput){

searchInput.focus();

}


},300);



}





function closeSearch(){


if(!searchPage)
return;


searchPage.classList.remove("active");


document.body.style.overflow="";


}




if(searchBtn){

searchBtn.addEventListener(

"click",

openSearch

);

}




if(backSearch){

backSearch.addEventListener(

"click",

closeSearch

);

}







/* =========================
      SEARCH FILTER BUTTONS
========================= */


const filters = document.querySelectorAll(".filter");



filters.forEach(button=>{


button.addEventListener(
"click",
()=>{


filters.forEach(btn=>{

btn.classList.remove("active");

});



button.classList.add("active");


}

);


});







/* =========================
      SEARCH INPUT DEMO
========================= */


if(searchInput){


searchInput.addEventListener(

"input",

()=>{


let value = searchInput.value.toLowerCase();



const results = document.querySelector("#searchResults");



if(value===""){

results.innerHTML="";

return;

}





results.innerHTML = `

<div class="search-card">

<h3>${value}</h3>

<p>
Search results coming soon...
</p>

</div>

`;



}

);



}






});