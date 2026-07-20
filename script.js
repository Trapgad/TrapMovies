/* =========================
   TRAP MOVIES JAVASCRIPT
========================= */


document.addEventListener("DOMContentLoaded", () => {



/* =========================
      SIDE MENU SYSTEM
========================= */


const menuBtn = document.querySelector(".menu-btn");

const closeBtn = document.querySelector(".close-btn");

const sideMenu = document.querySelector(".side-menu");

const overlayBg = document.querySelector(".overlay-bg");




function openMenu(){

    if(sideMenu && overlayBg){

        sideMenu.classList.add("active");

        overlayBg.classList.add("active");

    }

}





function closeMenu(){

    if(sideMenu && overlayBg){

        sideMenu.classList.remove("active");

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
      HERO SLIDER SYSTEM
========================= */


const slides = document.querySelectorAll(".slide");

const dots = document.querySelectorAll(".slider-dots span");


let currentSlide = 0;

let sliderTimer;





function showSlide(index){


    slides.forEach((slide)=>{

        slide.classList.remove("active");

    });



    dots.forEach((dot)=>{

        dot.classList.remove("active");

    });




    if(slides[index]){

        slides[index].classList.add("active");

    }



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




function restartSlider(){


    clearInterval(sliderTimer);

    startSlider();


}






// Dot Click Navigation

dots.forEach((dot,index)=>{


    dot.addEventListener(
        "click",
        ()=>{


            currentSlide = index;


            showSlide(currentSlide);


            restartSlider();


        }
    );


});






if(slides.length > 0){


    showSlide(0);


    startSlider();


}






/* =========================
      KEYBOARD CONTROL
========================= */


document.addEventListener(
"keydown",
(e)=>{


    if(e.key === "Escape"){


        closeMenu();


    }



});





});