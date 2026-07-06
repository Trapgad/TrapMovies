// ===============================
// TRAP MOVIES - MOVIE DETAILS JS
// ===============================

const API_KEY = "17a1834e273320eef8a2a36b38a11964";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const movieDetails = document.getElementById("movieDetails");


// ===============================
// GET MOVIE ID FROM URL
// ===============================

const params = new URLSearchParams(
    window.location.search
);

const movieId = params.get("id");


// ===============================
// LOAD MOVIE DETAILS
// ===============================

async function loadMovieDetails(){

    if(!movieId){
        movieDetails.innerHTML =
        "<h2>Movie not found</h2>";
        return;
    }


    try{

        const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`
        );


        const movie = await response.json();



        const poster = movie.poster_path
        ? IMAGE_URL + movie.poster_path
        : "https://via.placeholder.com/500x750?text=No+Image";



        movieDetails.innerHTML = `

        <div class="movie-main">


            <img src="${poster}" alt="${movie.title}">


            <div class="movie-info">


                <h1>${movie.title}</h1>


                <p>
                ⭐ Rating: ${movie.vote_average}
                </p>


                <p>
                📅 Release:
                ${movie.release_date}
                </p>


                <p>
                🎭 Genres:
                ${movie.genres.map(g=>g.name).join(", ")}
                </p>


                <p>
                ${movie.overview}
                </p>


            </div>


        </div>


        `;



        loadTrailer(movie.videos.results);



    }
    catch(error){

        console.log(error);

        movieDetails.innerHTML =
        "<h2>Error loading movie</h2>";

    }


}



// ===============================
// TRAILER
// ===============================

function loadTrailer(videos){


    const trailer =
    videos.find(
    video => video.type === "Trailer"
    );


    if(!trailer) return;



    movieDetails.innerHTML += `

    <section class="trailer">

    <h2>Trailer</h2>


    <iframe

    width="100%"
    height="400"

    src="https://www.youtube.com/embed/${trailer.key}"

    frameborder="0"

    allowfullscreen>

    </iframe>


    </section>

    `;


}



// START

loadMovieDetails();