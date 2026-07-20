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