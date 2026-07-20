/* =========================
   TRAP MOVIES SCRIPT
   PART 1/4
   CORE SETUP + TMDB ENGINE
========================= */


document.addEventListener("DOMContentLoaded",()=>{



/* =========================
        TMDB CONFIG
========================= */


const API_KEY = "17a1834e273320eef8a2a36b38a11964";


const BASE_URL = "https://api.themoviedb.org/3";


const IMAGE_URL = "https://image.tmdb.org/t/p/w500/";





/* =========================
        MOVIE CONTAINERS
========================= */


const movieContainers = document.querySelectorAll(
".movie-container"
);





/* =========================
        FETCH MOVIES
========================= */


async function getMovies(url){


    try{


        const response = await fetch(

            `${BASE_URL}${url}?api_key=${API_KEY}`

        );


        const data = await response.json();


        return data.results;


    }


    catch(error){


        console.log(
            "Movie loading error:",
            error
        );


        return [];


    }


}







/* =========================
        CREATE MOVIE CARD
========================= */


function createMovieCard(movie){



    const card = document.createElement("div");


    card.classList.add(
        "movie-card"
    );




    const poster = movie.poster_path

    ? IMAGE_URL + movie.poster_path

    : "assets/images/no-image.jpg";





    const title = movie.title || "Unknown";



    const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";






    card.innerHTML = `


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


    `;



    return card;



}







/* =========================
        DISPLAY MOVIES
========================= */


function displayMovies(
movies,
container
){



    if(!container)
    return;



    container.innerHTML="";




    movies.forEach(movie=>{


        const card =
        createMovieCard(movie);



        container.appendChild(card);



    });



}









/* =========================
        MOVIE SECTIONS API
========================= */


const movieSections = [



{

title:"Trending",

url:"/trending/movie/week"

},



{

title:"Popular",

url:"/movie/popular"

},



{

title:"Latest",

url:"/movie/now_playing"

},



{

title:"Top Rated",

url:"/movie/top_rated"

}



];








/* =========================
        LOAD ALL MOVIES
========================= */


async function loadMovies(){



    const moviesData = await Promise.all(


        movieSections.map(section=>

            getMovies(section.url)

        )


    );






    movieContainers.forEach(
    (container,index)=>{


        if(moviesData[index]){


            displayMovies(

                moviesData[index],

                container

            );


        }



    });





}






loadMovies();





});
/* =========================
        SIDE MENU
========================= */


const menuBtn = document.querySelector(".menu-btn");

const closeBtn = document.querySelector(".close-btn");

const sideMenu = document.querySelector(".side-menu");

const overlayBg = document.querySelector(".overlay-bg");





function openMenu(){


    if(sideMenu){

        sideMenu.classList.add("active");

    }


    if(overlayBg){

        overlayBg.classList.add("active");

    }


    document.body.style.overflow="hidden";


}






function closeMenu(){


    if(sideMenu){

        sideMenu.classList.remove("active");

    }


    if(overlayBg){

        overlayBg.classList.remove("active");

    }


    document.body.style.overflow="";


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









// Dot navigation


dots.forEach((dot,index)=>{


    dot.addEventListener(
    "click",
    ()=>{


        currentSlide = index;


        showSlide(currentSlide);


        resetSlider();


    });


});









// Start slider


if(slides.length > 0){


    showSlide(0);


    startSlider();


}
/* =========================
        SEARCH SYSTEM
========================= */


const searchBtn = document.querySelector(".search-btn");

const searchPage = document.querySelector(".search-page");

const backSearch = document.querySelector(".back-search");

const searchInput = document.querySelector("#searchInput");

const searchResults = document.querySelector("#searchResults");






/* OPEN SEARCH */


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







/* CLOSE SEARCH */


function closeSearch(){


    if(searchPage){


        searchPage.classList.remove("active");


        document.body.style.overflow="";


    }


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
        SEARCH API
========================= */


async function searchMovies(query){



    try{



        const response = await fetch(

        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`

        );



        const data = await response.json();



        return data.results;



    }


    catch(error){


        console.log(error);


        return [];


    }


}










/* =========================
        DISPLAY SEARCH RESULTS
========================= */


function displaySearchResults(movies){



    if(!searchResults)
    return;




    searchResults.innerHTML="";





    if(movies.length === 0){


        searchResults.innerHTML=`

        <div class="loading">

        No movies found

        </div>

        `;


        return;


    }








    movies.forEach(movie=>{



        const poster = movie.poster_path

        ? IMAGE_URL + movie.poster_path

        : "assets/images/no-image.jpg";





        const title = movie.title || "Unknown";



        const rating = movie.vote_average

        ? movie.vote_average.toFixed(1)

        : "N/A";







        searchResults.innerHTML += `


        <div class="movie-card">


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




    });



}










/* =========================
        SEARCH INPUT
========================= */


if(searchInput){



searchInput.addEventListener(

"input",

async()=>{



    const value = searchInput.value.trim();





    if(value === ""){


        searchResults.innerHTML="";


        return;


    }






    searchResults.innerHTML=`

    <div class="loading">

    Searching...

    </div>

    `;







    const movies = await searchMovies(value);





    displaySearchResults(movies);





}



);



}








/* ESC CLOSE SEARCH */


document.addEventListener(
"keydown",
(e)=>{


    if(e.key==="Escape"){


        closeSearch();


    }


});