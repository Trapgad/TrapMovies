// ===============================
// TRAP MOVIES MENU SYSTEM
// ===============================


const menuBtn = document.querySelector(".menu-btn");

const closeBtn = document.querySelector(".close-btn");

const sideMenu = document.querySelector(".side-menu");

const overlay = document.querySelector(".overlay-bg");



// OPEN MENU

menuBtn.addEventListener("click",()=>{

    sideMenu.classList.add("active");

    overlay.classList.add("active");

});



// CLOSE MENU

closeBtn.addEventListener("click",()=>{

    sideMenu.classList.remove("active");

    overlay.classList.remove("active");

});



// CLOSE WHEN CLICKING OUTSIDE

overlay.addEventListener("click",()=>{

    sideMenu.classList.remove("active");

    overlay.classList.remove("active");

});



// CLOSE WITH ESC KEY

document.addEventListener("keydown",(e)=>{

    if(e.key === "Escape"){

        sideMenu.classList.remove("active");

        overlay.classList.remove("active");

    }

});